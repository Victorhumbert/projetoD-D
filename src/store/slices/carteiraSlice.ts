import type { StateCreator } from 'zustand';
import type { Carteira } from '@/types/character';

export interface CarteiraSlice {
  carteira: Carteira;
  setCarteira: (partial: Partial<Carteira>) => void;
}

export const createCarteiraSlice: StateCreator<
  CarteiraSlice,
  [],
  [],
  CarteiraSlice
> = (set) => ({
  carteira: {
    cobre: 0,
    prata: 0,
    electrum: 0,
    ouro: 0,
    platina: 0,
  },
  setCarteira: (partial) =>
    set((state) => ({
      carteira: { ...state.carteira, ...partial },
    })),
});
