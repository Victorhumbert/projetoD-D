# D&D 5e — Gerenciador de Personagem

Ficha digital de personagem para Dungeons & Dragons 5a Edição. Aplicação web responsiva com persistência local, sem backend.

## Stack

- **Next.js 16** (App Router, SSR/SSG)
- **TypeScript** estrito (`strict: true`, `noUncheckedIndexedAccess: true`)
- **Tailwind CSS v4** (tokens via `@theme` no `globals.css`)
- **Zustand** (estado global por slices, debounce 500ms + flush em `beforeunload`)
- **Zod** (disponível para validação de schema no import JSON)
- **Vitest** (23 testes das funções de cálculo do domínio D&D)

## Funcionalidades

- **Aba Status**: atributos editáveis com modificadores calculados, bônus de proficiência, CA, iniciativa, deslocamento, PV com barra de cor dinâmica (verde/amarela/vermelha), testes de resistência, testes de morte
- **Aba Perícias**: percepção passiva, 18 perícias com proficiência e especialidade (double prof), bônus calculados
- **Aba Inventário**: CRUD de itens com modal, toggle de equipado, peso total
- **Aba Magias**: slots de magia níveis 1-9 (clicáveis), caso especial Bruxo (Slots do Pacto — descanso curto), CD de magia e bônus de ataque calculados, magias agrupadas por nível (colapsáveis), habilidades de classe com tracker de usos
- **Export/Import JSON**: serializa o personagem completo para download; importa com validação básica de campos
- **Personagem padrão**: Tharivol Lúmen, Elfo da Floresta, Guerreiro nível 3 — carregado na primeira visita

## Design

- Tema escuro inspirado em pergaminho e pedra (fundo `#0c0a09`, acentos âmbar)
- Responsivo: TabBar horizontal no desktop, bottom navigation no mobile
- Modais viram bottom sheets em telas pequenas
- Acessibilidade: HTML semântico, `aria-label`, `role`, `aria-checked`, `aria-live`, foco visível

## Regras de negócio

- **NUNCA persiste valores calculados**: modificadores, CD de magia, bônus de ataque e de perícia são sempre derivados na camada de render a partir dos valores brutos
- **Hydration gate**: `useHydration` evita mismatch SSR/CSR ao ler o `localStorage`
- **Seletores granulares no Zustand**: cada componente seleciona apenas o que precisa

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # Vitest (23 testes)
npm run build      # Build de produção
```

## Estrutura

```
src/
├── app/                     # Rotas Next.js (App Router)
│   └── personagem/          # Abas: status, pericias, inventario, magias
├── components/
│   ├── ui/                  # Primitivos: Button, Input, Modal, Toggle, Card...
│   ├── status/              # AtributoCard, BarraVida, TestesMorte
│   ├── pericias/            # PericiaRow
│   ├── inventario/          # ItemCard, ItemForm
│   └── magias/              # SlotTracker, SpellCard, HabilidadeCard
├── domain/
│   ├── calc.ts              # Funções puras D&D 5e (testadas)
│   ├── constants.ts         # Configurações de perícias, atributos, XP
│   └── defaultCharacter.ts  # Tharivol Lúmen (personagem de exemplo)
├── store/                   # Zustand — slices + persistência
├── hooks/                   # useHydration
├── lib/                     # storage.ts, utils.ts
└── types/                   # character.ts (todos os tipos D&D)
```
