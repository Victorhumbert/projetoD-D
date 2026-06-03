# INSTRUÇÕES PARA O AGENTE TECHLEAD
## Projeto: Gerenciador de Personagens de RPG — D&D 5e

---

> **Você é o Tech Lead deste projeto.** Sua responsabilidade é ler este documento completo, compreender o escopo, e acionar os agentes da equipe nas suas respectivas funções. As instruções abaixo definem como você deve coordenar o time.

---

## MAPA DE ACIONAMENTO DA EQUIPE

### 🎨 Agente UI/UX Designer — Acionar PRIMEIRO

O Designer deve ser o primeiro a ser acionado, pois o Frontend depende dos seus entregáveis para começar a implementação.

**Briefing para o Designer:**

- O produto é uma ficha de personagem de D&D 5e em formato digital. A referência visual é a ficha de papel oficial do Livro do Jogador — organizada, densa e funcional.
- A interface deve ser dividida em **4 abas principais:** Status, Perícias, Inventário, Magias.
- Deve funcionar bem tanto em **desktop** quanto em **smartphone** (o jogador consulta a ficha na mesa de jogo pelo celular).
- Entregar: wireframes ou protótipo de alta fidelidade das 4 abas, com especificação de componentes reutilizáveis (campos de atributo, toggles de proficiência, tracker de slots de magia, cards de inventário).
- Paleta e tipografia devem remeter ao universo de fantasia medieval sem sacrificar legibilidade. Fundo escuro é bem-vindo, desde que o contraste seja adequado.
- **Output esperado:** Especificação visual (Figma, imagens ou descrição detalhada de layout) para guiar o Dev Frontend.

---

### 💻 Agente Dev Frontend — Acionar APÓS o Designer

O Frontend é o agente central deste projeto. Como não há backend real, ele é responsável por toda a lógica de negócio, cálculos e persistência.

**Briefing para o Frontend:**

- Stack: **Next.js + TypeScript + Tailwind CSS + Zustand**
- Implementar todas as telas e componentes conforme especificação do Designer
- Responsável por toda a lógica de cálculo (modificadores, bônus de proficiência, slots de magia)
- Responsável pela persistência em **LocalStorage** e pela funcionalidade de **import/export JSON**
- Seguir rigorosamente o **JSON Schema** definido na Seção 5 deste documento
- Seguir as **Regras de Ouro** da Seção 8 — especialmente: nunca armazenar bônus calculados, apenas valores brutos
- Criar e manter o repositório no **GitHub** (`rpg-character-manager`) com a estrutura de pastas da Seção 7
- Configurar o deploy na **Vercel** conforme Seção 2.2
- **Output esperado:** Aplicação funcional deployada na Vercel, código versionado no GitHub com commits semânticos.

---

### ⚙️ Agente Dev Backend — Acionar a critério do Tech Lead

Este projeto é **100% client-side** — não há servidor, banco de dados ou API. O Dev Backend não é estritamente necessário.

**Porém, o Tech Lead deve acionar o Backend se identificar necessidade em:**

- Apoio ao Frontend em lógicas complexas de cálculo (ex: sistema de slots do Bruxo, cálculo de PV por nível com dados de vida variáveis por classe)
- Implementação de validação robusta do schema JSON no import/export
- Definição e documentação de tipos TypeScript compartilhados (`character.ts`) que sirvam como contrato entre componentes
- Qualquer necessidade de otimização de performance no gerenciamento de estado com Zustand

> **Decisão fica a cargo do Tech Lead:** avalie após o Frontend iniciar se há gargalos onde o Backend pode agregar. Se o Frontend for autossuficiente nas funcionalidades, o Backend pode ser dispensado nesta sprint.

---

## ORDEM DE EXECUÇÃO SUGERIDA

```
1. Tech Lead lê o documento completo e valida o entendimento
2. Tech Lead aciona o UI/UX Designer com o briefing acima
3. Designer entrega wireframes/especificação visual
4. Tech Lead aciona o Dev Frontend com a especificação do Designer + este documento
5. Frontend inicia: setup do repositório GitHub + estrutura Next.js + deploy base na Vercel
6. Tech Lead avalia se aciona o Dev Backend para suporte pontual
7. Desenvolvimento iterativo com deploys de preview na branch dev
8. Merge em main após validação = deploy de produção automático na Vercel
```

---

## CRITÉRIOS DE ENTREGA

O projeto está completo quando:

- [ ] Repositório criado no GitHub com README e estrutura de pastas correta
- [ ] Deploy funcionando na Vercel (URL de produção acessível)
- [ ] As 4 abas implementadas: Status, Perícias, Inventário, Magias
- [ ] Cálculos automáticos funcionando: modificadores de atributo, bônus de proficiência, bônus de perícias
- [ ] Tracker de slots de magia funcionando (incluindo caso especial do Bruxo)
- [ ] Persistência em LocalStorage — dados sobrevivem ao refresh
- [ ] Export/Import de ficha em JSON funcionando com validação
- [ ] Layout responsivo validado em desktop e mobile

---

---

# DOCUMENTO DE ELICITAÇÃO DE REQUISITOS
## Gerenciador de Personagens de RPG — D&D 5e
**Versão 2.0 — Revisada e Ampliada**
Deploy: Vercel | Versionamento: GitHub

---

## 1. Visão Geral do Projeto

O objetivo deste projeto é desenvolver uma aplicação web de página única (SPA) focada na criação, edição e gerenciamento de fichas de personagens de RPG, utilizando como base as regras do Livro do Jogador (LDJ) de D&D 5ª Edição.

A aplicação será de uso pessoal, dispensando servidores ou bancos de dados em nuvem. O sistema deve atender a um grupo de até 5 usuários, operando de forma independente no navegador de cada um.

---

## 2. Arquitetura e Tecnologias

### 2.1 Stack Definida

- **Frontend:** Next.js com TypeScript (`.tsx`)
- **Estilização:** Tailwind CSS (recomendado — velocidade de desenvolvimento supera o custo da dependência para este escopo)
- **Armazenamento:** LocalStorage com `JSON.stringify` / `JSON.parse` (suficiente para fichas de até 5 personagens; limite de ~5 MB não será atingido)
- **Estado Global:** Zustand (preferível a React Context puro — evita re-renders granulares ao editar campos individuais de atributos)
- **Backend:** Inexistente — toda a lógica e persistência ocorrem no cliente

### 2.2 Versionamento e Deploy

O projeto deve ser versionado no **GitHub** e implantado na **Vercel**.

| Etapa | Instrução para os Agentes |
|---|---|
| Repositório | Criar repositório público ou privado no GitHub com o nome `rpg-character-manager`. Inicializar com `README.md` e `.gitignore` para Node.js. |
| Branches | Usar `main` como produção. Criar branch `dev` para desenvolvimento. Pull Requests obrigatórios para merge em `main`. |
| Commits | Commits semânticos: `feat:`, `fix:`, `docs:`, `chore:`. Exemplo: `feat: add spell slot tracker component` |
| Vercel | Conectar o repositório GitHub à Vercel via dashboard (vercel.com). Definir o framework preset como Next.js. Branch de produção: `main`. Branch de preview: `dev`. |
| Variáveis de Ambiente | Este projeto não possui variáveis de ambiente sensíveis — toda a lógica é client-side. Nenhuma chave de API deve ser exposta. |
| Deploy Automático | A cada push em `main`, a Vercel realiza deploy automático. A cada push em `dev`, gera uma URL de preview para validação antes do merge. |

---

## 3. Requisitos Funcionais (RF)

### RF01 — Criação e Identificação do Personagem

O sistema deve permitir o cadastro de um novo personagem contendo os seguintes campos obrigatórios:

- Nome do personagem
- Raça (Anão, Elfo, Halfling, Humano, Draconato, Gnomo, Meio-Elfo, Meio-Orc, Tiefling — conforme Cap. 2 do LDJ)
- Sub-raça (quando aplicável, ex: Elfo da Floresta, Elfo do Sol, Anão da Montanha)
- Classe (ver lista completa em RF09)
- Nível (1 a 20)
- Antecedente (ex: Criminoso, Herói do Povo, Sábio, Soldado — conforme Cap. 4 do LDJ)
- Pontos de Experiência (XP) — o LDJ define marcos de XP por nível; o sistema deve exibi-los
- Inspiração — campo booleano (tem / não tem); concede vantagem em testes conforme Cap. 4 do LDJ

---

### RF02 — Atributos Base e Modificadores

O usuário deve conseguir inserir e editar os valores dos 6 atributos principais. O sistema deve calcular automaticamente o modificador de cada atributo usando a fórmula oficial do LDJ (Cap. 7):

```
modificador = ⌊ (valor − 10) ÷ 2 ⌋  (arredondar para baixo)
```

Tabela de referência completa (valores 1–30):

| Valor | Modificador | Valor | Modificador |
|---|---|---|---|
| 1 | −5 | 16–17 | +3 |
| 2–3 | −4 | 18–19 | +4 |
| 4–5 | −3 | 20–21 | +5 |
| 6–7 | −2 | 22–23 | +6 |
| 8–9 | −1 | 24–25 | +7 |
| 10–11 | +0 | 26–27 | +8 |
| 12–13 | +1 | 28–29 | +9 |
| 14–15 | +2 | 30 | +10 |

---

### RF03 — Status de Combate

Campos editáveis na ficha:

- Classe de Armadura (CA)
- Iniciativa — calculada automaticamente a partir do Modificador de Destreza
- Deslocamento base em metros (padrão: 9m para a maioria das raças; 7,5m para Anões e Halflings)
- Pontos de Vida Máximos
- Pontos de Vida Atuais
- Pontos de Vida Temporários — campo separado; absorvem dano antes dos PVs reais
- Dados de Vida disponíveis — para recuperação em descanso curto

---

### RF04 — Bônus de Proficiência

**CRÍTICO:** O Bônus de Proficiência é calculado automaticamente pelo nível do personagem, conforme tabela oficial do LDJ (Cap. 1). Deve ser exibido em destaque na ficha e usado no cálculo de Perícias e Testes de Resistência.

| Níveis | Bônus de Proficiência |
|---|---|
| 1°–4° | +2 |
| 5°–8° | +3 |
| 9°–12° | +4 |
| 13°–16° | +5 |
| 17°–20° | +6 |

---

### RF05 — Perícias (18 perícias — obrigatórias)

**CRÍTICO:** O sistema deve exibir as 18 perícias do LDJ, cada uma vinculada ao seu atributo base. O usuário marca quais possui proficiência. O bônus total exibido deve ser calculado automaticamente:

```
bônus total da perícia = modificador do atributo + bônus de proficiência (se proficiente)
```

| Perícia | Atributo Base |
|---|---|
| Acrobacia | Destreza |
| Adestramento de Animais | Sabedoria |
| Arcanismo | Inteligência |
| Atletismo | Força |
| Atuação | Carisma |
| Enganação | Carisma |
| Furtividade | Destreza |
| História | Inteligência |
| Intimidação | Carisma |
| Intuição | Sabedoria |
| Investigação | Inteligência |
| Medicina | Sabedoria |
| Natureza | Inteligência |
| Percepção | Sabedoria |
| Persuasão | Carisma |
| Prestidigitação | Destreza |
| Religião | Inteligência |
| Sobrevivência | Sabedoria |

---

### RF06 — Testes de Resistência

Cada personagem tem proficiência em 2 Testes de Resistência, determinados pela sua classe. O sistema deve listar os 6 testes (um por atributo) e permitir marcar os que o personagem possui proficiência.

| Atributo | Classes Proficientes (exemplos) |
|---|---|
| Força | Bárbaro, Guerreiro, Paladino |
| Destreza | Ladino, Patrulheiro, Monge |
| Constituição | Bárbaro, Guerreiro, Feiticeiro |
| Inteligência | Mago, Ladino |
| Sabedoria | Clérigo, Druida, Paladino |
| Carisma | Bardo, Bruxo, Feiticeiro |

O bônus do teste de resistência segue a mesma lógica das perícias:
```
bônus = modificador do atributo + bônus de proficiência (se proficiente)
```

---

### RF07 — Dados de Vida por Classe

**CRÍTICO:** O cálculo de Pontos de Vida Máximos depende do Dado de Vida da classe.

- **Nível 1:** `PV_max = valor máximo do dado + modificador de Constituição`
- **Níveis seguintes:** `PV_max += rolagem do dado + modificador de Constituição` por nível

| Classes | Dado de Vida |
|---|---|
| Bárbaro | d12 |
| Guerreiro, Paladino, Patrulheiro | d10 |
| Bardo, Clérigo, Druida, Ladino, Monge, Bruxo | d8 |
| Feiticeiro, Mago | d6 |

---

### RF08 — Inventário e Equipamento

Seção para adicionar, remover e gerenciar itens. Campos por item:

- Nome do item
- Quantidade
- Peso (opcional, em kg)
- Equipado (boolean — influencia CA e ataques)
- Descrição curta (opcional)

---

### RF09 — Gerenciamento de Habilidades e Magias

**CRÍTICO:** O sistema de magia do LDJ é estruturado em três componentes distintos. Implementar separadamente:

#### RF09a — Truques (Cantrips)

Magias de nível 0 — não consomem slots. São usadas ilimitadamente. O personagem as conhece permanentemente. Devem ser listadas separadamente dos outros níveis de magia.

#### RF09b — Slots de Magia por Nível

Classes que conjuram magias possuem uma tabela de slots por nível de magia (1° ao 9°), variando por classe e nível do personagem. O sistema deve rastrear **slots totais** e **slots usados** para cada nível.

Exemplo de distribuição de slots no nível 5:

| Classe | Slot 1° | Slot 2° | Slot 3° | Recuperação |
|---|---|---|---|---|
| Mago | 4 | 3 | 2 | Descanso longo |
| Clérigo | 4 | 3 | 2 | Descanso longo |
| Bardo | 4 | 3 | 2 | Descanso longo |
| Druida | 4 | 3 | 2 | Descanso longo |
| Paladino | 4 | 2 | — | Descanso longo |
| Bruxo* | — | 2* | — | **Descanso CURTO** |

> ⚠️ **ATENÇÃO — Bruxo:** O Bruxo usa Slots do Pacto — poucos slots (1–4), todos do mesmo nível (determinado pelo nível do Bruxo), recuperados em **DESCANSO CURTO**, não longo. Implementar como caso especial no modelo de dados.

#### RF09c — Habilidades de Classe com Usos Diários

Habilidades como Fúria do Bárbaro, Surto de Ação do Guerreiro e Imposição de Mãos do Paladino possuem número máximo de usos por descanso. O sistema deve:

- Permitir registrar nome e descrição da habilidade
- Configurar usos máximos e usos atuais
- Indicar se recupera em descanso curto ou longo
- Ter botão de reset por tipo de descanso

---

### RF10 — Persistência Local

O sistema deve salvar automaticamente a ficha no LocalStorage do navegador. Não deve haver perda de dados ao recarregar a página. Salvar a cada alteração de campo com debounce de ~500ms para evitar writes excessivos.

---

### RF11 — Importação / Exportação JSON

- Exportar a ficha como arquivo `.json` para backup e compartilhamento
- Importar um arquivo `.json` previamente exportado, sobrescrevendo a ficha atual (com confirmação do usuário)
- Validar o JSON importado contra o schema esperado antes de aceitar

---

### RF12 — Morte e Estabilização (Opcional Recomendado)

Quando os PVs atingem 0, o personagem fica inconsciente. A cada turno, realiza um Teste de Resistência contra Morte (d20, sem modificadores):

- **3 sucessos** = personagem estabilizado
- **3 falhas** = personagem morto

Implementar como modal ou seção colapsável na aba de Status.

---

## 4. Requisitos Não Funcionais (RNF)

- **RNF01 — Usabilidade:** Interface dividida em abas (Status, Perícias, Inventário, Magias). Imitar a organização lógica de uma ficha de papel.
- **RNF02 — Desempenho:** Carregamento instantâneo — aplicação servida estaticamente pela Vercel, sem requisições de rede para dados.
- **RNF03 — Privacidade:** Nenhum dado trafegado externamente. Todo o estado permanece no LocalStorage do navegador do usuário.
- **RNF04 — Responsividade:** Layout adaptável para desktop e smartphone. O jogador deve conseguir consultar a ficha confortavelmente na mesa de jogo pelo celular.
- **RNF05 — Acessibilidade mínima:** Labels semânticos em todos os campos de formulário. Contraste adequado para leitura em ambientes com iluminação reduzida.

---

## 5. Estrutura de Dados — JSON Schema Completo

Versão corrigida e expandida. Todos os campos ausentes no documento anterior foram adicionados:

```json
{
  "id": "char-12345",
  "identificacao": {
    "nome": "Tharivol",
    "raca": "Elfo",
    "sub_raca": "Elfo da Floresta",
    "classe": "Guerreiro (Arqueiro Arcano)",
    "nivel": 3,
    "antecedente": "Soldado",
    "xp": 900,
    "xp_proximo_nivel": 2700,
    "inspiracao": false
  },
  "combate": {
    "bonus_proficiencia": 2,
    "dado_de_vida": "d10",
    "dados_de_vida_disponiveis": 3,
    "pontos_vida_max": 28,
    "pontos_vida_atual": 28,
    "pontos_vida_temporarios": 0,
    "classe_armadura": 16,
    "iniciativa": 4,
    "deslocamento": 9
  },
  "testes_morte": {
    "sucessos": 0,
    "falhas": 0
  },
  "atributos": {
    "forca":        { "valor": 10, "modificador": 0 },
    "destreza":     { "valor": 18, "modificador": 4 },
    "constituicao": { "valor": 14, "modificador": 2 },
    "inteligencia": { "valor": 12, "modificador": 1 },
    "sabedoria":    { "valor": 13, "modificador": 1 },
    "carisma":      { "valor": 10, "modificador": 0 }
  },
  "testes_resistencia": {
    "forca":        { "proficiente": true  },
    "destreza":     { "proficiente": false },
    "constituicao": { "proficiente": true  },
    "inteligencia": { "proficiente": false },
    "sabedoria":    { "proficiente": false },
    "carisma":      { "proficiente": false }
  },
  "pericias": {
    "acrobacia":            { "proficiente": false, "atributo": "destreza" },
    "adestramento_animais": { "proficiente": false, "atributo": "sabedoria" },
    "arcanismo":            { "proficiente": false, "atributo": "inteligencia" },
    "atletismo":            { "proficiente": true,  "atributo": "forca" },
    "atuacao":              { "proficiente": false, "atributo": "carisma" },
    "enganacao":            { "proficiente": false, "atributo": "carisma" },
    "furtividade":          { "proficiente": true,  "atributo": "destreza" },
    "historia":             { "proficiente": false, "atributo": "inteligencia" },
    "intimidacao":          { "proficiente": true,  "atributo": "carisma" },
    "intuicao":             { "proficiente": false, "atributo": "sabedoria" },
    "investigacao":         { "proficiente": false, "atributo": "inteligencia" },
    "medicina":             { "proficiente": false, "atributo": "sabedoria" },
    "natureza":             { "proficiente": false, "atributo": "inteligencia" },
    "percepcao":            { "proficiente": true,  "atributo": "sabedoria" },
    "persuasao":            { "proficiente": false, "atributo": "carisma" },
    "prestidigitacao":      { "proficiente": false, "atributo": "destreza" },
    "religiao":             { "proficiente": false, "atributo": "inteligencia" },
    "sobrevivencia":        { "proficiente": true,  "atributo": "sabedoria" }
  },
  "magias": {
    "atributo_conjuracao": "inteligencia",
    "cd_teste_resistencia": 13,
    "bonus_ataque_magia": 5,
    "truques": [
      { "nome": "Mão Mágica", "descricao": "Cria uma mão espectral flutuante..." }
    ],
    "slots": {
      "nivel_1": { "total": 4, "usados": 1 },
      "nivel_2": { "total": 3, "usados": 0 },
      "nivel_3": { "total": 2, "usados": 0 },
      "nivel_4": { "total": 0, "usados": 0 },
      "nivel_5": { "total": 0, "usados": 0 }
    },
    "magias_conhecidas": [
      { "nome": "Projétil Mágico", "nivel": 1, "descricao": "..." }
    ]
  },
  "habilidades": [
    {
      "nome": "Tiro Perfurante",
      "tipo": "Tiro Arcano",
      "descricao": "A flecha perfura inimigos em linha...",
      "usos_maximos": 2,
      "usos_atuais": 2,
      "recupera_em": "descanso_longo"
    }
  ],
  "inventario": [
    { "item": "Arco Longo", "quantidade": 1, "peso_kg": 0.9, "equipado": true  },
    { "item": "Flechas",    "quantidade": 40, "peso_kg": 0.9, "equipado": false }
  ]
}
```

---

## 6. Decisões Técnicas

| Ponto | Decisão | Justificativa |
|---|---|---|
| Tailwind vs CSS Puro | **Tailwind CSS** | Velocidade de desenvolvimento supera o custo da dependência para este escopo e time pequeno. |
| LocalStorage vs IndexedDB | **LocalStorage** | Fichas completas de D&D 5e ficam em ~50–100 KB. O limite de 5 MB do LocalStorage é mais do que suficiente para 5 personagens. |
| Context vs Zustand | **Zustand** | Campos de ficha são editados com alta frequência e de forma granular. Zustand permite subscrições seletivas, evitando re-renders desnecessários que o Context causaria. |

---

## 7. Estrutura de Pastas Sugerida (Next.js)

```
rpg-character-manager/
├── .github/
│   └── workflows/           # CI opcional (lint, type-check)
├── public/
├── src/
│   ├── app/                 # App Router do Next.js
│   │   ├── page.tsx         # Página principal (lista de personagens)
│   │   └── [id]/
│   │       └── page.tsx     # Ficha individual do personagem
│   ├── components/
│   │   ├── tabs/            # StatusTab, SkillsTab, InventoryTab, SpellsTab
│   │   ├── fields/          # AtributoField, SlotTracker, HabilidadeCard
│   │   └── ui/              # Botões, modais, inputs reutilizáveis
│   ├── store/
│   │   └── characterStore.ts   # Zustand store
│   ├── types/
│   │   └── character.ts     # Tipos TypeScript do JSON schema
│   └── utils/
│       ├── calculations.ts  # Modificadores, bônus de proficiência
│       └── storage.ts       # LocalStorage helpers + import/export JSON
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 8. Regras de Ouro para a Equipe

> **Nunca armazenar bônus calculados no estado.** Apenas os valores brutos devem ser persistidos (atributos, nível, proficiências marcadas). Todos os bônus — modificador de atributo, bônus de perícia, CD de magia — devem ser derivados na camada de apresentação a partir dos valores brutos. Isso evita inconsistências ao subir de nível ou alterar proficiências.

> **O Bruxo é um caso especial.** Implementar Slots do Pacto separadamente no store. Recuperam em descanso curto (não longo) e são sempre do nível determinado pelo nível do personagem, não pelo nível da magia escolhida.

> **Para qualquer dúvida de regra não coberta aqui**, consultar o capítulo indicado em cada seção do LDJ antes de tomar decisões de implementação.
