# 🔒 Sistema de permissões da equipe

Este projeto usa **3 camadas independentes** de proteção contra modificações não autorizadas. Mesmo se uma falhar, as outras seguram. Defesa em profundidade.

## Camada 1 — Restrição de ferramentas no agente (`tools:`)

Cada sub-agent declara explicitamente quais ferramentas pode usar no frontmatter:

```yaml
---
name: tech-lead-senior
tools: Read, Glob, Grep, WebFetch   # ← só lê. Não tem Edit/Write/Bash.
---
```

Se um agente **não tem** `Edit`, `Write` ou `Bash`, ele **fisicamente não consegue** modificar nada — mesmo que o system prompt mande.

### Mapa de permissões por agente

| Agente | Categoria | Ferramentas | Pode modificar? |
|---|---|---|---|
| `tech-lead-senior` | 🔍 read-only | Read, Glob, Grep, WebFetch | ❌ |
| `analista-sistemas` | 🔍 read-only | Read, Glob, Grep, WebFetch | ❌ |
| `ux-ui-designer` | 🔍 read-only | Read, Glob, Grep, WebFetch | ❌ |
| `product-manager` | 🔍 read-only | Read, Glob, Grep, WebFetch | ❌ |
| `pesquisa-mercado` | 🔍 read-only | Read, Glob, Grep, WebSearch, WebFetch | ❌ |
| `security-analyst` | 🔍 read-only* | Read, Glob, Grep, Bash, WebFetch | ❌ (Bash só p/ scan) |
| `frontend-dev` | ✏️ pode escrever | Read, Glob, Grep, Bash, Edit, Write, WebFetch | ✅ com confirmação |
| `backend-dev` | ✏️ pode escrever | Read, Glob, Grep, Bash, Edit, Write, WebFetch | ✅ com confirmação |
| `qa-engineer` | ✏️ pode escrever | Read, Glob, Grep, Bash, Edit, Write | ✅ com confirmação |
| `devops-sre` | ✏️ pode escrever | Read, Glob, Grep, Bash, Edit, Write, WebFetch | ✅ com confirmação |
| `data-analyst` | ✏️ pode escrever | Read, Glob, Grep, Bash, Edit, Write | ✅ com confirmação |
| `tech-writer` | ✏️ pode escrever | Read, Glob, Grep, Edit, Write | ✅ docs apenas |

\* `security-analyst` tem `Bash` apenas para rodar **ferramentas de análise read-only** (`npm audit`, `gitleaks detect`, `osv-scanner`, etc.). O hook de bash bloqueia comandos destrutivos de qualquer jeito.

## Camada 2 — Protocolo no system prompt

Todos os agentes têm uma seção de protocolo logo no início do prompt:

### Para agentes read-only (Categoria A)
Instruções para **propor artefatos no chat**, nunca executar. Cobertura inclui pensamento crítico obrigatório, discordância respeitosa entre agentes, e honestidade sobre baixa confiança.

### Para agentes que escrevem (Categoria B)
Instruções para **anunciar a intenção em formato estruturado** antes de qualquer modificação:

```
🟡 Proposta de alteração
- O quê: [...]
- Onde: [...]
- Por quê: [...]
- Impacto: [...]
- Reversibilidade: [...]
- Risco: [...]

Aguardando autorização para prosseguir.
```

E esperar resposta explícita do **usuário humano** (não de outro agente).

## Camada 3 — Hooks do Claude Code (rede de segurança real)

System prompts orientam comportamento; **hooks impõem comportamento**. Mesmo se um agente "esquecer" o protocolo, o hook bloqueia antes da execução.

### Hook 1: `pre-bash-firewall.sh`

Roda **antes** de qualquer comando Bash. Retorna exit code 2 (bloqueio) para:

- `rm -rf` em caminhos perigosos (raiz, home, wildcards)
- `sudo`
- `mkfs`, `dd if=... of=/dev/...`, `shred`, `wipefs`
- `chmod 777`, `chmod 666`
- Fork bombs
- `git push --force` ou `git push -f`
- `git reset --hard`
- `git push` para `main`/`master`/`prod`
- `DROP DATABASE`, `DROP TABLE`, `TRUNCATE TABLE` em CLI
- `cat`/`mv`/`cp`/`rm` em arquivos `.env`
- `npm install -g` (instalação global)
- `kubectl delete`, `terraform apply/destroy`, `aws ... delete`, etc.
- `curl ... | sh` (vetor de RCE)

A mensagem de bloqueio é enviada de volta ao Claude via stderr, então ele "aprende" e tenta outra abordagem.

### Hook 2: `pre-edit-protect-paths.sh`

Roda antes de `Edit` ou `Write`. Bloqueia escrita em:

- `.env`, `.env.local`, `.env.production`, `.envrc`
- Qualquer coisa dentro de `.git/`
- Arquivos `.pem`, `.key`, `.p12`, `.pfx`
- Chaves SSH (`id_rsa`, `id_ed25519`)
- `~/.aws/credentials`, `.npmrc`, `.netrc`
- `secrets.yaml`, `secrets.yml`, etc.

### Configuração dos hooks (`settings.json`)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "bash .claude/hooks/pre-bash-firewall.sh" }]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "bash .claude/hooks/pre-edit-protect-paths.sh" }]
      }
    ]
  },
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(git push --force *)",
      "Edit(.env*)",
      ...
    ]
  }
}
```

A lista `permissions.deny` é a segunda linha de defesa nativa do Claude Code — funciona mesmo se um hook der pau.

## 🧪 Como testar

```bash
# Teste 1: comando seguro (deve passar)
echo '{"tool_name":"Bash","tool_input":{"command":"ls -la"}}' \
  | bash .claude/hooks/pre-bash-firewall.sh
echo "exit=$?"   # esperado: exit=0

# Teste 2: comando perigoso (deve bloquear)
echo '{"tool_name":"Bash","tool_input":{"command":"rm -rf /"}}' \
  | bash .claude/hooks/pre-bash-firewall.sh
echo "exit=$?"   # esperado: exit=2 com mensagem em stderr

# Teste 3: editar .env (deve bloquear)
echo '{"tool_name":"Edit","tool_input":{"file_path":".env"}}' \
  | bash .claude/hooks/pre-edit-protect-paths.sh
echo "exit=$?"   # esperado: exit=2
```

## 🛠️ Customizando

### Adicionar mais padrões bloqueados

Edite `.claude/hooks/pre-bash-firewall.sh` ou `.claude/hooks/pre-edit-protect-paths.sh`. Use exit code 2 + mensagem em stderr para bloquear.

### Permitir um comando específico
Se um bloqueio for falso-positivo no seu fluxo, ajuste o regex correspondente. Mas considere se vale: o hook existe para te proteger de você mesmo e de erros de agente.

### Para projetos específicos
- `.claude/settings.json` — versionado, aplicado por projeto (compartilhado com o time).
- `.claude/settings.local.json` — não versionado, suas customizações pessoais.
- `~/.claude/settings.json` — global do seu usuário.

Precedência: `local` > `project` > `user`.

## ⚠️ Limitações conhecidas

- **Hooks são por sessão local** — outros desenvolvedores precisam ter o repo clonado e os hooks executáveis.
- **Hooks podem ser desabilitados** pelo próprio usuário humano. Eles protegem contra **agentes**, não contra um humano malicioso.
- **Não substitui revisão de PR** — código gerado por agente, mesmo com hooks, deve passar por revisão antes do merge.
- **Não substitui CI** — sua pipeline de CI deve ter linter, testes e SAST de qualquer forma.

## 📚 Referências oficiais

- Hooks: https://code.claude.com/docs/en/hooks
- Sub-agents: https://code.claude.com/docs/en/sub-agents
- Permissões: https://code.claude.com/docs/en/settings#permissions
