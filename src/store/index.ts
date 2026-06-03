'use client';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import type { Character, Magias, NivelMagia } from '@/types/character';
import { loadCharacter, saveCharacter } from '@/lib/storage';
import { defaultCharacter } from '@/domain/defaultCharacter';
import {
  resolverSlots,
  resolverAtributoConjuracao,
  buildSlotTotals,
} from '@/domain/calc';

import {
  createIdentificacaoSlice,
  type IdentificacaoSlice,
} from './slices/identificacaoSlice';
import {
  createCombateSlice,
  type CombateSlice,
} from './slices/combateSlice';
import {
  createAtributosSlice,
  type AtributosSlice,
} from './slices/atributosSlice';
import {
  createPericiasSlice,
  type PericiasSlice,
} from './slices/periciasSlice';
import {
  createMagiasSlice,
  type MagiasSlice,
} from './slices/magiasSlice';
import {
  createHabilidadesSlice,
  type HabilidadesSlice,
} from './slices/habilidadesSlice';
import {
  createInventarioSlice,
  type InventarioSlice,
} from './slices/inventarioSlice';
import {
  createCarteiraSlice,
  type CarteiraSlice,
} from './slices/carteiraSlice';

// Metadados extras no store (id, versão, etc.)
interface MetaSlice {
  characterId: string;
  versaoSchema: number;
  atualizadoEm: string;
  /** Carrega um personagem completo no store (importação ou hidratação inicial). */
  loadFromCharacter: (char: Character) => void;
  /** Serializa o estado atual como Character. */
  toCharacter: () => Character;
}

export type CharacterStore = IdentificacaoSlice &
  CombateSlice &
  AtributosSlice &
  PericiasSlice &
  MagiasSlice &
  HabilidadesSlice &
  InventarioSlice &
  CarteiraSlice &
  MetaSlice;

export const useCharacterStore = create<CharacterStore>()(
  subscribeWithSelector((set, get, api) => ({
    ...createIdentificacaoSlice(set, get, api),
    ...createCombateSlice(set, get, api),
    ...createAtributosSlice(set, get, api),
    ...createPericiasSlice(set, get, api),
    ...createMagiasSlice(set, get, api),
    ...createHabilidadesSlice(set, get, api),
    ...createInventarioSlice(set, get, api),
    ...createCarteiraSlice(set, get, api),

    // --- Meta ---
    characterId: defaultCharacter.id,
    versaoSchema: defaultCharacter.versaoSchema,
    atualizadoEm: defaultCharacter.atualizadoEm,

    loadFromCharacter: (char: Character) => {
      set({
        characterId: char.id,
        versaoSchema: char.versaoSchema,
        atualizadoEm: char.atualizadoEm,
        identificacao: char.identificacao,
        combate: char.combate,
        testesMorte: char.testesMorte,
        atributos: char.atributos,
        testesResistencia: char.testesResistencia,
        pericias: char.pericias,
        magias: char.magias,
        habilidades: char.habilidades,
        inventario: char.inventario,
        carteira: char.carteira ?? { cobre: 0, prata: 0, electrum: 0, ouro: 0, platina: 0 },
      });
    },

    toCharacter: (): Character => {
      const s = get();
      return {
        id: s.characterId,
        versaoSchema: s.versaoSchema,
        identificacao: s.identificacao,
        combate: s.combate,
        testesMorte: s.testesMorte,
        atributos: s.atributos,
        testesResistencia: s.testesResistencia,
        pericias: s.pericias,
        magias: s.magias,
        habilidades: s.habilidades,
        inventario: s.inventario,
        carteira: s.carteira,
        atualizadoEm: new Date().toISOString(),
      };
    },
  }))
);

// ─── Hidratação inicial ──────────────────────────────────────────────────────
let hydrated = false;

export function hydrateStore(): void {
  if (hydrated) return;
  hydrated = true;

  const saved = loadCharacter();
  const char = saved ?? defaultCharacter;
  useCharacterStore.getState().loadFromCharacter(char);
  syncMagicState();
}

// ─── Sincronização automática de slots ───────────────────────────────────────
// Recalcula totais de slots quando classe / nível / subclasse mudam.
// Nunca zera usados — apenas clamp para não exceder o novo total.
function syncMagicState(): void {
  const state = useCharacterStore.getState();
  const { classe, nivel, subclasse } = state.identificacao;

  const atributoConjuracao = resolverAtributoConjuracao(classe, subclasse);
  const resolved = resolverSlots(classe, subclasse, nivel);

  useCharacterStore.setState((s) => {
    const magias = s.magias;

    if (resolved?.tipo === 'warlock') {
      const pacto = resolved.pacto;
      const slotsZerados = Object.fromEntries(
        ([1, 2, 3, 4, 5, 6, 7, 8, 9] as NivelMagia[]).map((n) => [
          n,
          { total: 0, usados: 0 },
        ])
      ) as Magias['slots'];
      return {
        magias: {
          ...magias,
          atributoConjuracao,
          slots: slotsZerados,
          slotsPacto: {
            nivel: pacto.nivel_slot as NivelMagia,
            total: pacto.quantidade,
            usados: Math.min(magias.slotsPacto?.usados ?? 0, pacto.quantidade),
          },
        },
      };
    }

    if (resolved?.tabela) {
      const totais = buildSlotTotals(resolved.tabela);
      const newSlots = { ...magias.slots } as Magias['slots'];
      for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9] as NivelMagia[]) {
        newSlots[n] = {
          total: totais[n],
          usados: Math.min(magias.slots[n].usados, totais[n]),
        };
      }
      return {
        magias: {
          ...magias,
          atributoConjuracao,
          slots: newSlots,
          slotsPacto: null,
        },
      };
    }

    // Sem magia — zera totais, mantém usados clamped em 0
    const slotsZerados = Object.fromEntries(
      ([1, 2, 3, 4, 5, 6, 7, 8, 9] as NivelMagia[]).map((n) => [
        n,
        { total: 0, usados: 0 },
      ])
    ) as Magias['slots'];
    return {
      magias: {
        ...magias,
        atributoConjuracao: null,
        slots: slotsZerados,
        slotsPacto: null,
      },
    };
  });
}

// ─── Persistência com debounce ───────────────────────────────────────────────
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSave(): void {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const char = useCharacterStore.getState().toCharacter();
    saveCharacter(char);
  }, 500);
}

// Escuta qualquer mudança de estado e agenda o save.
// subscribeWithSelector não precisa de seletor — apenas subscribe genérico.
if (typeof window !== 'undefined') {
  useCharacterStore.subscribe(scheduleSave);

  // Auto-sync de slots quando classe / nível / subclasse mudam
  useCharacterStore.subscribe(
    (s) => ({
      classe: s.identificacao.classe,
      nivel: s.identificacao.nivel,
      subclasse: s.identificacao.subclasse,
    }),
    syncMagicState,
    { equalityFn: shallow }
  );

  window.addEventListener('beforeunload', () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    const char = useCharacterStore.getState().toCharacter();
    saveCharacter(char);
  });
}
