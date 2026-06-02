import type { StateCreator } from 'zustand';
import type { Identificacao } from '@/types/character';

export interface IdentificacaoSlice {
  identificacao: Identificacao;
  setIdentificacao: (partial: Partial<Identificacao>) => void;
}

export const createIdentificacaoSlice: StateCreator<
  IdentificacaoSlice,
  [],
  [],
  IdentificacaoSlice
> = (set) => ({
  identificacao: {
    nome: '',
    raca: '',
    subRaca: undefined,
    classe: '',
    nivel: 1,
    antecedente: '',
    xp: 0,
    inspiracao: false,
  },
  setIdentificacao: (partial) =>
    set((state) => ({
      identificacao: { ...state.identificacao, ...partial },
    })),
});
