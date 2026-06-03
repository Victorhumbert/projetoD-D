#!/usr/bin/env bash
# Hook PreToolUse para bloquear comandos Bash destrutivos.
# Exit code 0 = permite | Exit code 2 = bloqueia (mensagem em stderr volta para o Claude).
#
# Recebe JSON via stdin com a estrutura:
# { "tool_name": "Bash", "tool_input": { "command": "..." } }

set -euo pipefail

# Garante que jq esteja disponível; se não, faz fallback grep grosseiro
if command -v jq >/dev/null 2>&1; then
  command=$(jq -r '.tool_input.command // ""' 2>/dev/null || echo "")
else
  payload=$(cat)
  command=$(printf '%s' "$payload" | grep -oE '"command"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed -E 's/.*"command"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/')
fi

if [[ -z "${command:-}" ]]; then
  exit 0
fi

# Função utilitária para bloquear
block() {
  local reason="$1"
  echo "🛑 BLOQUEADO PELO HOOK DE SEGURANÇA" >&2
  echo "Comando: $command" >&2
  echo "Motivo: $reason" >&2
  echo "" >&2
  echo "Se você realmente precisa executar isso, peça autorização explícita ao usuário humano e ele deverá rodar manualmente ou ajustar o hook em .claude/hooks/pre-bash-firewall.sh." >&2
  exit 2
}

# ============================================================================
# Padrões REALMENTE perigosos — bloqueio total
# ============================================================================

# rm recursivo / força em raiz, home, sistema
if echo "$command" | grep -qE '(^|[^a-zA-Z0-9_])rm\s+([^|]*\s)?-[a-zA-Z]*[rf][a-zA-Z]*\s+(/|~|\$HOME|\.{1,2}/|\*)'; then
  block "rm -rf em caminho perigoso (raiz, home ou wildcard)"
fi

# sudo qualquer coisa
if echo "$command" | grep -qE '(^|[^a-zA-Z0-9_])sudo(\s|$)'; then
  block "sudo não é permitido nessa sessão"
fi

# Reformatação / wipe de disco
if echo "$command" | grep -qE '\b(mkfs|dd\s+if=.*of=/dev/|shred|wipefs)\b'; then
  block "comando de manipulação de disco/sistema"
fi

# chmod / chown em raiz ou massivo
if echo "$command" | grep -qE '\bchmod\s+(-R\s+)?(777|666)\b'; then
  block "chmod 777/666 é inseguro"
fi

# Fork bomb e similares
if echo "$command" | grep -qE ':\(\)\{.*:\|:&\};:'; then
  block "fork bomb detectado"
fi

# ============================================================================
# Padrões que exigem confirmação humana real — bloqueia e força aprovação
# ============================================================================

# git push --force / force-with-lease em main/master/produção
if echo "$command" | grep -qE '\bgit\s+push\s+.*(--force|-f\b)'; then
  block "git push --force exige autorização humana explícita; rode manualmente"
fi

# git reset --hard
if echo "$command" | grep -qE '\bgit\s+reset\s+.*--hard'; then
  block "git reset --hard é destrutivo; exige autorização humana"
fi

# git push para main/master/prod sem confirmação
if echo "$command" | grep -qE '\bgit\s+push\s+\w+\s+(main|master|prod|production)\b'; then
  block "push para main/master/prod exige autorização humana explícita"
fi

# Drop de banco / truncate em comando direto
if echo "$command" | grep -qiE '\b(drop\s+(database|table|schema)|truncate\s+table)\b'; then
  block "operação destrutiva em banco; exige autorização humana"
fi

# Acesso a arquivos .env / credenciais
if echo "$command" | grep -qE '\b(cat|less|more|head|tail|cp|mv|rm)\s+[^|]*\.env(\.|$|\s)'; then
  block "manipulação de arquivo .env exige autorização humana"
fi

# Instalação de dependências global / -g
if echo "$command" | grep -qE '\b(npm|pnpm|yarn)\s+(i|install|add)\s+.*\b(-g|--global)\b'; then
  block "instalação global de pacote exige autorização humana"
fi

# Deploy / rollback
if echo "$command" | grep -qiE '\b(kubectl\s+(apply|delete|rollout|drain)|terraform\s+(apply|destroy)|aws\s+\w+\s+(delete|terminate)|gcloud\s+\w+\s+delete|vercel\s+(--prod|deploy)|netlify\s+deploy.*--prod)\b'; then
  block "comando de deploy/infra exige autorização humana explícita"
fi

# curl/wget pipe para shell (RCE clássico)
if echo "$command" | grep -qE '\b(curl|wget)\b.*\|\s*(sh|bash|zsh)\b'; then
  block "curl/wget pipe para shell é vetor de RCE; bloqueado"
fi

# Permite tudo o que sobrou
exit 0
