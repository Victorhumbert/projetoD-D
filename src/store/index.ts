'use client';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Character } from '@/types/character';
import { loadCharacter, saveCharacter } from '@/lib/storage';
import { defaultCharacter } from '@/domain/defaultCharacter';

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
// Chamado uma única vez no cliente (no Provider).
let hydrated = false;

export function hydrateStore(): void {
  if (hydrated) return;
  hydrated = true;

  const saved = loadCharacter();
  const char = saved ?? defaultCharacter;
  useCharacterStore.getState().loadFromCharacter(char);
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

  // Flush imediato ao fechar a aba.
  window.addEventListener('beforeunload', () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    const char = useCharacterStore.getState().toCharacter();
    saveCharacter(char);
  });
}
