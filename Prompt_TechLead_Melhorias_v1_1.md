# PROMPT DE MELHORIA — TECH LEAD
## Projeto: rpg-character-manager
## Sprint: Melhorias de UX, Selects Pré-configurados e Otimização Mobile

---

> **Instrução:** Leia este documento completo antes de acionar os agentes. Distribua as tarefas conforme indicado em cada seção. Esta sprint tem dois focos principais: (1) substituir campos de texto livre por selects inteligentes com dados pré-carregados do LDJ, e (2) corrigir e otimizar toda a experiência mobile da aplicação.

---

## MAPA DE ACIONAMENTO

| Agente | Tarefa Principal |
|---|---|
| UI/UX Designer | Redesenhar os selects de Raça e Classe com painel de detalhes, e auditar toda a interface mobile identificando elementos inacessíveis |
| Dev Frontend | Implementar os selects com dados estáticos do LDJ, aplicar correções mobile (incluindo o campo de nível) e ajustar layout responsivo |
| Dev Backend | A critério do Tech Lead — pode apoiar na estruturação dos dados estáticos de classes e raças em arquivos `.ts` separados, servindo como "mini data layer" client-side |

---

## MELHORIA 1 — SELECTS PRÉ-CONFIGURADOS: RAÇA E CLASSE

### Contexto

Atualmente os campos de Raça e Classe são inputs de texto livre, o que gera inconsistência nos dados e não aproveita as informações ricas do LDJ. Ambos devem ser substituídos por componentes `<select>` (ou dropdown customizado) com todos os dados pré-carregados.

---

### 1.1 — Select de Raça com Sub-raça dinâmica

Ao selecionar uma Raça, um segundo select de Sub-raça deve aparecer automaticamente (quando aplicável). Cada raça deve exibir seus bônus de atributo e traços passivos para guiar o jogador.

**Dados a implementar — todas as raças do LDJ com seus bônus:**

```typescript
// src/data/racas.ts

export const RACAS = [
  {
    id: "anao",
    nome: "Anão",
    deslocamento: 7.5,
    bonus_atributos: { constituicao: +2 },
    tracos: ["Visão no escuro 18m", "Resistência anã (+2 em testes vs veneno)", "Proficiência: Machados e martelos de guerra"],
    sub_racas: [
      {
        id: "anao_montanha",
        nome: "Anão da Montanha",
        bonus_atributos: { forca: +2 },
        tracos: ["Proficiência com armaduras leves e médias"]
      },
      {
        id: "anao_colina",
        nome: "Anão da Colina",
        bonus_atributos: { sabedoria: +1 },
        tracos: ["Tenacidade anã: +1 PV por nível"]
      }
    ]
  },
  {
    id: "elfo",
    nome: "Elfo",
    deslocamento: 9,
    bonus_atributos: { destreza: +2 },
    tracos: ["Visão no escuro 18m", "Sentidos aguçados (proficiência em Percepção)", "Ancestral feérico (imune a sono mágico)", "Transe (meditação 4h substitui sono)"],
    sub_racas: [
      {
        id: "elfo_floresta",
        nome: "Elfo da Floresta",
        bonus_atributos: { sabedoria: +1 },
        tracos: ["Passo élfico: deslocamento 10,5m", "Máscara da natureza selvagem (Furtividade em terreno natural)"]
      },
      {
        id: "elfo_sol",
        nome: "Elfo do Sol (Alto Elfo)",
        bonus_atributos: { inteligencia: +1 },
        tracos: ["Conhece 1 truque do Mago", "Proficiência em espadas longas, curtas, arcos curtos e longos"]
      },
      {
        id: "drow",
        nome: "Drow (Elfo Negro)",
        bonus_atributos: { carisma: +1 },
        tracos: ["Visão no escuro superior 36m", "Sensibilidade à luz solar (desvantagem com luz solar)", "Magia Drow: Luzes Dançantes, Escuridão (nível 5), Fogo das Fadas (nível 3)"]
      }
    ]
  },
  {
    id: "halfling",
    nome: "Halfling",
    deslocamento: 7.5,
    bonus_atributos: { destreza: +2 },
    tracos: ["Sortudo: rolar 1 novamente em d20", "Bravura: vantagem contra medo", "Agilidade halfling: passa pelo espaço de criaturas maiores"],
    sub_racas: [
      {
        id: "halfling_pe_leve",
        nome: "Pé-Leve",
        bonus_atributos: { carisma: +1 },
        tracos: ["Naturally stealthy: pode se esconder atrás de criaturas maiores"]
      },
      {
        id: "halfling_robusto",
        nome: "Robusto",
        bonus_atributos: { constituicao: +1 },
        tracos: ["Resistência robusta: vantagem contra veneno, resistência a dano de veneno"]
      }
    ]
  },
  {
    id: "humano",
    nome: "Humano",
    deslocamento: 9,
    bonus_atributos: { forca: +1, destreza: +1, constituicao: +1, inteligencia: +1, sabedoria: +1, carisma: +1 },
    tracos: ["Bônus +1 em todos os atributos", "1 idioma extra à escolha"],
    sub_racas: []
  },
  {
    id: "draconato",
    nome: "Draconato",
    deslocamento: 9,
    bonus_atributos: { forca: +2, carisma: +1 },
    tracos: ["Sopro dracônico (dano em área baseado na linhagem)", "Resistência ao tipo de dano da linhagem"],
    sub_racas: [],
    nota: "Escolher linhagem dracônica ao criar (determina tipo de sopro e resistência)"
  },
  {
    id: "gnomo",
    nome: "Gnomo",
    deslocamento: 7.5,
    bonus_atributos: { inteligencia: +2 },
    tracos: ["Visão no escuro 18m", "Astúcia gnômica: vantagem em testes de resistência de Int/Sab/Car vs magia"],
    sub_racas: [
      {
        id: "gnomo_floresta",
        nome: "Gnomo da Floresta",
        bonus_atributos: { destreza: +1 },
        tracos: ["Ilusionismo natural: truque Minor Illusion", "Falar com pequenos animais"]
      },
      {
        id: "gnomo_rocha",
        nome: "Gnomo da Rocha",
        bonus_atributos: { constituicao: +1 },
        tracos: ["Conhecimento artificioso: proficiência dupla em Ferramentas de Artesão", "Engenhoca: criar dispositivos simples com materiais"]
      }
    ]
  },
  {
    id: "meio_elfo",
    nome: "Meio-Elfo",
    deslocamento: 9,
    bonus_atributos: { carisma: +2 },
    tracos: ["Bônus +1 em 2 atributos à escolha (exceto Carisma)", "Visão no escuro 18m", "Proficiência em 2 perícias à escolha", "Ancestral feérico: imune a sono mágico"],
    sub_racas: []
  },
  {
    id: "meio_orc",
    nome: "Meio-Orc",
    deslocamento: 9,
    bonus_atributos: { forca: +2, constituicao: +1 },
    tracos: ["Visão no escuro 18m", "Ameaçador: proficiência em Intimidação", "Resistência implacável: ficar com 1 PV ao invés de cair a 0 (1x/descanso longo)", "Ataques selvagens: dano extra no crítico"],
    sub_racas: []
  },
  {
    id: "tiefling",
    nome: "Tiefling",
    deslocamento: 9,
    bonus_atributos: { inteligencia: +1, carisma: +2 },
    tracos: ["Visão no escuro 18m", "Resistência infernal: resistência a dano de fogo", "Legado infernal: Thaumaturgy (nível 1), Hellish Rebuke (nível 3), Darkness (nível 5)"],
    sub_racas: []
  }
]
```

---

### 1.2 — Select de Classe com painel de detalhes

Ao selecionar uma Classe, um painel deve exibir automaticamente os principais atributos e características daquela classe. Isso ajuda o jogador a entender os prós e contras antes de confirmar.

**Dados a implementar — todas as classes do LDJ:**

```typescript
// src/data/classes.ts

export const CLASSES = [
  {
    id: "barbaro",
    nome: "Bárbaro",
    dado_vida: "d12",
    atributo_principal: "Força",
    testes_resistencia: ["forca", "constituicao"],
    proficiencias_armadura: ["Leve", "Média", "Escudos"],
    proficiencias_arma: ["Simples", "Marciais"],
    estilo: "Combate corpo a corpo. Alta resistência a dano. Fúria concede vantagem em testes de Força e resistência a dano físico.",
    pros: [
      "Maior pool de PV do jogo (d12)",
      "Fúria: resistência a dano cortante, perfurante e de concussão",
      "Não precisa usar armadura (CA = 10 + mod. Des + mod. Con)",
      "Ataques reckless garantem vantagem constante"
    ],
    contras: [
      "Não pode conjurar magias enquanto em Fúria",
      "Fúria tem usos limitados por descanso longo",
      "Fraco em combate à distância",
      "Inteligência e Carisma são dump stats típicos"
    ],
    slots_magia: false
  },
  {
    id: "bardo",
    nome: "Bardo",
    dado_vida: "d8",
    atributo_principal: "Carisma",
    testes_resistencia: ["destreza", "carisma"],
    proficiencias_armadura: ["Leve"],
    proficiencias_arma: ["Simples", "Espada longa", "Rapieira", "Arco curto"],
    estilo: "Suporte, controle e conjuração. Inspiração bárdica concede bônus a aliados. Acesso a quase toda a lista de magias.",
    pros: [
      "Acesso à lista completa de magias de qualquer classe (Segredos Mágicos)",
      "Inspiração bárdica: bônus de dado para aliados",
      "Perícias versáteis: expertise em perícias dobra o bônus",
      "Extremamente flexível — funciona como suporte ou DPS"
    ],
    contras: [
      "d8 de vida — frágil em combate direto",
      "Menos slots de magia que Mago ou Clérigo no início",
      "Depende muito de Carisma para interações sociais",
      "Magia de concentração limita opções simultâneas"
    ],
    slots_magia: true
  },
  {
    id: "clerigo",
    nome: "Clérigo",
    dado_vida: "d8",
    atributo_principal: "Sabedoria",
    testes_resistencia: ["sabedoria", "carisma"],
    proficiencias_armadura: ["Leve", "Média", "Escudos"],
    proficiencias_arma: ["Simples"],
    estilo: "Suporte divino e cura. Domínio escolhido define o arquétipo (guerra, vida, luz, tempestade, etc.).",
    pros: [
      "Melhor curador do jogo (Channel Divinity + magias de cura)",
      "Acesso a toda a lista de magias divinas preparadas diariamente",
      "Domínio concede armadura pesada para alguns subtipos",
      "Versátil: pode ser tanque, suporte ou DPS dependendo do domínio"
    ],
    contras: [
      "Depende de Sabedoria como atributo principal",
      "Sem domínio de combate, é fragil no front",
      "Concentração limita magias simultâneas",
      "Papel de curador cria expectativa do grupo"
    ],
    slots_magia: true
  },
  {
    id: "druida",
    nome: "Druida",
    dado_vida: "d8",
    atributo_principal: "Sabedoria",
    testes_resistencia: ["inteligencia", "sabedoria"],
    proficiencias_armadura: ["Leve", "Média", "Escudos (não metálicos)"],
    proficiencias_arma: ["Clava", "Adaga", "Dardo", "Lança", "Bordão", "Cimitarra", "Foice", "Funda"],
    estilo: "Controle de campo, transformação e conjuração. Forma Selvagem permite transformar em animais.",
    pros: [
      "Forma Selvagem: transformar em animais com PV separados (escudo extra)",
      "Lista de magias poderosa para controle de terreno",
      "Circle of the Moon: forma selvagem de combate em nível 2",
      "Extremamente versátil em exploração"
    ],
    contras: [
      "Não usa armadura metálica por convicção",
      "Forma Selvagem não permite conjurar magias (exceto Circle of Spores)",
      "Sabedoria como dump stat anula a classe",
      "Complexo para gerenciar formas + magias preparadas"
    ],
    slots_magia: true
  },
  {
    id: "guerreiro",
    nome: "Guerreiro",
    dado_vida: "d10",
    atributo_principal: "Força ou Destreza",
    testes_resistencia: ["forca", "constituicao"],
    proficiencias_armadura: ["Todas as armaduras", "Escudos"],
    proficiencias_arma: ["Simples", "Marciais"],
    estilo: "Combate especializado. Surto de Ação: ação extra 1x por descanso curto. Segundo ataque em nível 5.",
    pros: [
      "Segundo Ataque mais cedo que qualquer classe (nível 5 = 3 ataques com Surto de Ação)",
      "Usa qualquer armadura e arma do jogo",
      "Surto de Ação: dobra ações em um turno",
      "Arqueiro Arcano e Cavaleiro Élfico têm acesso a magias"
    ],
    contras: [
      "Sem magia no subtipo base — dependente de itens mágicos",
      "Menos recursos de utilidade fora do combate",
      "Action Surge tem apenas 1 uso até nível 17",
      "Fraco em exploração e interação social comparado a outras classes"
    ],
    slots_magia: false
  },
  {
    id: "monge",
    nome: "Monge",
    dado_vida: "d8",
    atributo_principal: "Destreza e Sabedoria",
    testes_resistencia: ["forca", "destreza"],
    proficiencias_armadura: ["Nenhuma"],
    proficiencias_arma: ["Simples", "Espadas curtas"],
    estilo: "Combate rápido sem armadura. Ki alimenta habilidades especiais. CA = 10 + mod. Des + mod. Sab.",
    pros: [
      "Movimento extra progressivo (até +9m no nível 18)",
      "Ataques desarmados escalam com o nível (d10 no nível 17)",
      "Stunning Strike: atordoar inimigo com Ki",
      "Evasão: dano zero em testes de Des bem-sucedidos"
    ],
    contras: [
      "Ki é recurso muito limitado nos níveis iniciais",
      "Fraco em dano bruto comparado a Bárbaro e Guerreiro",
      "Não usa armadura — vulnerável a acertos",
      "Dois atributos dependentes (Des e Sab) exige build cuidadosa"
    ],
    slots_magia: false
  },
  {
    id: "paladino",
    nome: "Paladino",
    dado_vida: "d10",
    atributo_principal: "Força e Carisma",
    testes_resistencia: ["sabedoria", "carisma"],
    proficiencias_armadura: ["Todas as armaduras", "Escudos"],
    proficiencias_arma: ["Simples", "Marciais"],
    estilo: "Tanque sagrado com magias de suporte. Imposição de Mãos cura PV. Divine Smite: dano extra com slots de magia.",
    pros: [
      "Divine Smite: converter slots de magia em dano extra (2d8 por slot + 1d8 por nível acima do 1°)",
      "Aura de Proteção: bônus de Carisma em todos os testes de resistência (nível 6)",
      "Imposição de Mãos: pool de cura flexível",
      "Usa armadura pesada e tem acesso a magias"
    ],
    contras: [
      "Requer dois atributos altos (Força e Carisma)",
      "Conjurador de meio-período — menos slots que Clérigo",
      "Juramento impõe restrições roleplay (pode cair se quebrado)",
      "Fraco em ataques à distância"
    ],
    slots_magia: true
  },
  {
    id: "patrulheiro",
    nome: "Patrulheiro",
    dado_vida: "d10",
    atributo_principal: "Destreza e Sabedoria",
    testes_resistencia: ["forca", "destreza"],
    proficiencias_armadura: ["Leve", "Média", "Escudos"],
    proficiencias_arma: ["Simples", "Marciais"],
    estilo: "Caçador e rastreador. Inimigo favorito e terreno favorito concedem bônus em exploração. Acesso a magias.",
    pros: [
      "Melhor explorador do jogo (rastreamento, sobrevivência, terreno favorito)",
      "Dupla arma e arqueiro são builds de alto dano",
      "Acesso a magias de utilidade (Passagem sem Rastro, Escuridão)",
      "Inimigo favorito: vantagem em rastreamento e informações sobre inimigos específicos"
    ],
    contras: [
      "Inimigo e terreno favorito são situacionais dependendo da campanha",
      "Conjurador de meio-período — menos slots",
      "Companheiro animal fraco nos níveis iniciais",
      "Depende de Destreza E Sabedoria"
    ],
    slots_magia: true
  },
  {
    id: "ladino",
    nome: "Ladino",
    dado_vida: "d8",
    atributo_principal: "Destreza",
    testes_resistencia: ["destreza", "inteligencia"],
    proficiencias_armadura: ["Leve"],
    proficiencias_arma: ["Simples", "Besta de mão", "Espada longa", "Rapieira", "Espada curta"],
    estilo: "Dano single-target com Ataque Furtivo. Ação Ardilosa para reposicionar. Expertise dobra bônus em perícias.",
    pros: [
      "Ataque Furtivo: dano escalável (1d6 por 2 níveis, até 10d6)",
      "Expertise: dobrar bônus de proficiência em 2 perícias (depois 4)",
      "Evasão: dano zero em testes de Des bem-sucedidos (nível 7)",
      "Ação Ardilosa: Disparada, Desengajar ou Esconder como ação bônus"
    ],
    contras: [
      "Dano limitado a 1 ataque por turno (Ataque Furtivo só 1x por rodada)",
      "d8 de vida — frágil",
      "Sem acesso a magias (exceto Trapaceiro Arcano)",
      "Depende de posicionamento para Ataque Furtivo"
    ],
    slots_magia: false
  },
  {
    id: "feiticeiro",
    nome: "Feiticeiro",
    dado_vida: "d6",
    atributo_principal: "Carisma",
    testes_resistencia: ["constituicao", "carisma"],
    proficiencias_armadura: ["Nenhuma"],
    proficiencias_arma: ["Adaga", "Dardo", "Funda", "Bordão", "Besta leve"],
    estilo: "Conjurador de poder bruto. Pontos de Feitiçaria permitem modificar magias (metamagia) ou criar slots adicionais.",
    pros: [
      "Metamagia: ampliar, gêmear, empoderar ou estender magias",
      "Pontos de Feitiçaria: converter em slots extras ou vice-versa",
      "Origem dracônica: PV extra e CA sem armadura (13 + mod. Des)",
      "Melhor DPS de magia com Twinned Spell em Haste ou Slow"
    ],
    contras: [
      "Menor lista de magias conhecidas do jogo",
      "d6 de vida — extremamente frágil",
      "Sem armadura ou habilidades de sobrevivência",
      "Menos versatilidade que o Mago (magias fixas, não preparadas)"
    ],
    slots_magia: true
  },
  {
    id: "bruxo",
    nome: "Bruxo",
    dado_vida: "d8",
    atributo_principal: "Carisma",
    testes_resistencia: ["sabedoria", "carisma"],
    proficiencias_armadura: ["Leve"],
    proficiencias_arma: ["Simples"],
    estilo: "ATENÇÃO — sistema de slots único. Slots do Pacto recuperam em DESCANSO CURTO. Poucos slots, todos do mesmo nível.",
    pros: [
      "Eldritch Blast: dano escalável com Invocações (alcance 36m, força)",
      "Slots do Pacto recuperam em descanso CURTO — alta sustentação",
      "Invocações: personalização extrema de habilidades",
      "Patrono concede habilidades únicas por subtipo"
    ],
    contras: [
      "1–4 slots apenas, todos do mesmo nível — explosividade limitada",
      "Lista de magias pequena",
      "Fraco se o grupo não faz descansos curtos frequentes",
      "Depende muito do DM para ter oportunidades de descanso curto"
    ],
    slots_magia: true,
    slots_especiais: true
  },
  {
    id: "mago",
    nome: "Mago",
    dado_vida: "d6",
    atributo_principal: "Inteligência",
    testes_resistencia: ["inteligencia", "sabedoria"],
    proficiencias_armadura: ["Nenhuma"],
    proficiencias_arma: ["Adaga", "Dardo", "Funda", "Bordão", "Besta leve"],
    estilo: "Conjurador mais versátil. Aprende magias de qualquer grimório encontrado. Prepara magias diariamente.",
    pros: [
      "Maior lista de magias do jogo",
      "Pode copiar magias de grimórios encontrados na aventura",
      "Preparar magias diariamente = máxima flexibilidade",
      "Arcane Recovery: recuperar slots gastos 1x por descanso curto"
    ],
    contras: [
      "d6 de vida — o mais frágil do jogo",
      "Sem armadura, sem proficiências de combate",
      "Totalmente dependente de Inteligência",
      "Custo de ouro e tempo para copiar magias ao grimório"
    ],
    slots_magia: true
  }
]
```

---

### 1.3 — Comportamento esperado dos Selects

- Ao selecionar uma Raça → aplicar automaticamente os **bônus de atributo** no store e exibir os **traços passivos** como texto informativo abaixo do campo
- Ao selecionar uma Classe → exibir painel com **dado de vida, atributo principal, testes de resistência, prós e contras**
- Ao selecionar uma Classe → pré-selecionar automaticamente os **testes de resistência** correspondentes na ficha (o jogador pode ajustar)
- Ao selecionar uma Classe → pré-configurar o **dado de vida** no campo de combate
- Se a Classe tiver `slots_magia: false` → ocultar ou desabilitar a aba de Magias
- Se a Classe tiver `slots_especiais: true` (Bruxo) → renderizar o componente de Slots do Pacto em vez da tabela padrão

---

## MELHORIA 2 — OTIMIZAÇÃO MOBILE

### Contexto

A aplicação apresenta problemas de usabilidade em telas pequenas. O campo de Nível, por exemplo, não consegue ser editado no mobile. A auditoria deve cobrir toda a interface.

---

### 2.1 — Problemas Identificados (mínimo a corrigir)

| Componente | Problema | Correção |
|---|---|---|
| Campo de Nível | Input não responsivo no mobile, área de toque muito pequena | Aumentar altura mínima para `min-h-[44px]`, usar `text-lg`, garantir `type="number"` com `inputMode="numeric"` |
| Campos de atributos (Força, Des, etc.) | Inputs numéricos pequenos demais para toque preciso | Mínimo `48x48px` de área de toque, usar `inputMode="numeric"` |
| Tabela de Perícias | Rolagem horizontal em telas pequenas | Refatorar para layout de lista vertical em mobile |
| Tracker de slots de magia | Botões de + e − muito próximos | Espaçamento mínimo de `8px` entre botões, tamanho mínimo de `40x40px` |
| Campos numéricos de PV | Difícil de editar PV atual em combate (situação de alta urgência) | Botões de +1 / −1 visíveis ao lado do campo em mobile |
| Abas de navegação | Texto das abas pode ser cortado em telas menores | Usar ícones + texto curto, ou só ícones em telas `< 380px` |

---

### 2.2 — Diretrizes Gerais de Mobile

```
Área de toque mínima: 44x44px (Apple HIG) / 48x48px (Material Design)
Font-size mínimo em inputs: 16px (evita zoom automático no iOS)
Usar inputMode="numeric" em TODOS os campos numéricos
Evitar position: fixed em elementos que conflitem com o teclado virtual
Testar com teclado virtual aberto — verificar se campos ficam visíveis
Padding interno dos inputs: mínimo py-3 px-4 no Tailwind
```

---

### 2.3 — Layout Mobile Sugerido por Aba

**Aba Status (mobile):**
```
┌─────────────────────────────┐
│  Nome          Nível: [  3 ]│  ← nível editável com botões +/−
│  Raça: [Select ▼          ] │
│  Classe: [Select ▼        ] │
├─────────────────────────────┤
│  FOR  DES  CON  INT  SAB  CAR│
│ [ 10] [18] [14] [12] [13][10]│  ← inputs grandes, toque fácil
│  +0   +4   +2   +1   +1  +0 │  ← modificadores automáticos
├─────────────────────────────┤
│ PV: [−] [ 28 / 28 ] [+]    │  ← botões +/− para combat tracking
│ CA: [16]  Inic: [+4]        │
└─────────────────────────────┘
```

**Aba Perícias (mobile):**
```
┌─────────────────────────────┐
│ ☑ Atletismo     FOR   +4   │
│ ☐ Acrobacia     DES   +4   │
│ ☑ Percepção     SAB   +3   │
│  ... (lista vertical)       │
└─────────────────────────────┘
```

---

## CRITÉRIOS DE ACEITE DESTA SPRINT

- [ ] Campo de Raça é um `<select>` com todas as raças do LDJ — sem input de texto livre
- [ ] Campo de Sub-raça aparece dinamicamente após seleção da raça (quando aplicável)
- [ ] Bônus de atributos da raça são aplicados automaticamente no store
- [ ] Traços passivos da raça são exibidos como texto informativo na ficha
- [ ] Campo de Classe é um `<select>` com todas as 12 classes do LDJ
- [ ] Painel de detalhes da classe exibe: dado de vida, atributos principais, prós e contras
- [ ] Testes de resistência são pré-selecionados conforme a classe escolhida
- [ ] Aba de Magias é ocultada para classes sem magia (Bárbaro, Guerreiro base, Monge, Ladino base)
- [ ] Bruxo renderiza componente de Slots do Pacto diferenciado
- [ ] Campo de Nível editável no mobile com área de toque adequada
- [ ] Todos os inputs numéricos com `inputMode="numeric"` e tamanho mínimo de toque 44px
- [ ] Tabela de Perícias em layout de lista vertical no mobile
- [ ] Campos de PV com botões +/− visíveis no mobile
- [ ] Validado em viewport 375px (iPhone SE) e 390px (iPhone 14)

---

## NOTAS FINAIS PARA O TECH LEAD

> Os dados de Raças e Classes devem viver em arquivos estáticos em `src/data/` — nunca hard-coded dentro dos componentes. Isso permite manutenção fácil futura (adicionar Raças de expansões, por exemplo).

> O Dev Backend pode ser acionado para estruturar os tipos TypeScript (`Race`, `CharacterClass`) que serão consumidos pelo Frontend, garantindo consistência entre os dados estáticos e o schema do personagem.

> Priorizar as correções mobile primeiro se o time tiver capacidade paralela limitada — os selects são melhoria de UX, os bugs mobile são bloqueadores de uso real.
MARKDOWN