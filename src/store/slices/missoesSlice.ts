import type { StateCreator } from 'zustand';
import type { Missoes, Quest } from '@/types/character';

export interface MissoesSlice {
  missoes: Missoes;
  addQuest: (quest: Quest) => void;
  updateQuest: (id: string, partial: Partial<Quest>) => void;
  removeQuest: (id: string) => void;
  addLocal: (local: string) => void;
  removeLocalUnused: () => void;
}

const defaultMissoes: Missoes = {
  locais: [],
  quests: [],
};

export const createMissoesSlice: StateCreator<
  MissoesSlice,
  [],
  [],
  MissoesSlice
> = (set) => ({
  missoes: defaultMissoes,

  addQuest: (quest) =>
    set((state) => {
      const locais = quest.local && !state.missoes.locais.includes(quest.local)
        ? [...state.missoes.locais, quest.local]
        : state.missoes.locais;
      return { missoes: { ...state.missoes, quests: [...state.missoes.quests, quest], locais } };
    }),

  updateQuest: (id, partial) =>
    set((state) => {
      const quests = state.missoes.quests.map((q) =>
        q.id === id ? { ...q, ...partial } : q
      );
      const locais = [...state.missoes.locais];
      if (partial.local && !locais.includes(partial.local)) {
        locais.push(partial.local);
      }
      return { missoes: { ...state.missoes, quests, locais } };
    }),

  removeQuest: (id) =>
    set((state) => {
      const quests = state.missoes.quests.filter((q) => q.id !== id);
      const usados = new Set(quests.map((q) => q.local).filter(Boolean));
      const locais = state.missoes.locais.filter((l) => usados.has(l));
      return { missoes: { ...state.missoes, quests, locais } };
    }),

  addLocal: (local) =>
    set((state) => {
      if (state.missoes.locais.includes(local)) return state;
      return { missoes: { ...state.missoes, locais: [...state.missoes.locais, local] } };
    }),

  removeLocalUnused: () =>
    set((state) => {
      const usados = new Set(state.missoes.quests.map((q) => q.local).filter(Boolean));
      const locais = state.missoes.locais.filter((l) => usados.has(l));
      return { missoes: { ...state.missoes, locais } };
    }),
});
