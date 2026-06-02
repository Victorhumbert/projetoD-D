import type { StateCreator } from 'zustand';
import type { Combate, TestesMorte } from '@/types/character';

export interface CombateSlice {
  combate: Combate;
  testesMorte: TestesMorte;
  setCombate: (partial: Partial<Combate>) => void;
  setPvAtual: (valor: number) => void;
  setPvTemp: (valor: number) => void;
  setTestesMorte: (partial: Partial<TestesMorte>) => void;
  resetTestesMorte: () => void;
}

export const createCombateSlice: StateCreator<
  CombateSlice,
  [],
  [],
  CombateSlice
> = (set) => ({
  combate: {
    dadoDeVida: 'd8',
    dadosDeVidaDisponiveis: 1,
    pontosVidaMax: 8,
    pontosVidaAtual: 8,
    pontosVidaTemporarios: 0,
    classeArmadura: 10,
    deslocamento: 9,
  },
  testesMorte: { sucessos: 0, falhas: 0 },
  setCombate: (partial) =>
    set((state) => ({
      combate: { ...state.combate, ...partial },
    })),
  setPvAtual: (valor) =>
    set((state) => ({
      combate: {
        ...state.combate,
        pontosVidaAtual: Math.max(
          0,
          Math.min(valor, state.combate.pontosVidaMax)
        ),
      },
    })),
  setPvTemp: (valor) =>
    set((state) => ({
      combate: {
        ...state.combate,
        pontosVidaTemporarios: Math.max(0, valor),
      },
    })),
  setTestesMorte: (partial) =>
    set((state) => ({
      testesMorte: { ...state.testesMorte, ...partial },
    })),
  resetTestesMorte: () =>
    set(() => ({ testesMorte: { sucessos: 0, falhas: 0 } })),
});
