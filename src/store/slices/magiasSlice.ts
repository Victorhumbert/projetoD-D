import type { StateCreator } from 'zustand';
import type {
  Magias,
  AtributoNome,
  NivelMagia,
  MagiaConhecida,
} from '@/types/character';

export interface MagiasSlice {
  magias: Magias;
  setAtributoConjuracao: (atributo: AtributoNome | null) => void;
  usarSlot: (nivel: NivelMagia) => void;
  recuperarSlot: (nivel: NivelMagia) => void;
  recuperarTodosSlots: () => void;
  usarSlotPacto: () => void;
  recuperarSlotsPacto: () => void;
  addMagia: (magia: MagiaConhecida) => void;
  removeMagia: (id: string) => void;
  toggleMagiaPreparada: (id: string) => void;
}

function buildDefaultSlots(): Magias['slots'] {
  return {
    1: { total: 0, usados: 0 },
    2: { total: 0, usados: 0 },
    3: { total: 0, usados: 0 },
    4: { total: 0, usados: 0 },
    5: { total: 0, usados: 0 },
    6: { total: 0, usados: 0 },
    7: { total: 0, usados: 0 },
    8: { total: 0, usados: 0 },
    9: { total: 0, usados: 0 },
  };
}

const defaultMagias: Magias = {
  atributoConjuracao: null,
  slots: buildDefaultSlots(),
  slotsPacto: null,
  magiasConhecidas: [],
};

export const createMagiasSlice: StateCreator<
  MagiasSlice,
  [],
  [],
  MagiasSlice
> = (set) => ({
  magias: defaultMagias,

  setAtributoConjuracao: (atributo) =>
    set((state) => ({
      magias: { ...state.magias, atributoConjuracao: atributo },
    })),

  usarSlot: (nivel) =>
    set((state) => {
      const slot = state.magias.slots[nivel];
      if (slot.usados >= slot.total) return state;
      return {
        magias: {
          ...state.magias,
          slots: {
            ...state.magias.slots,
            [nivel]: { ...slot, usados: slot.usados + 1 },
          },
        },
      };
    }),

  recuperarSlot: (nivel) =>
    set((state) => {
      const slot = state.magias.slots[nivel];
      if (slot.usados <= 0) return state;
      return {
        magias: {
          ...state.magias,
          slots: {
            ...state.magias.slots,
            [nivel]: { ...slot, usados: slot.usados - 1 },
          },
        },
      };
    }),

  recuperarTodosSlots: () =>
    set((state) => {
      const niveis = Object.keys(state.magias.slots).map(Number) as NivelMagia[];
      const slotsReset = Object.fromEntries(
        niveis.map((n) => [n, { ...state.magias.slots[n], usados: 0 }])
      ) as Magias['slots'];
      return { magias: { ...state.magias, slots: slotsReset } };
    }),

  usarSlotPacto: () =>
    set((state) => {
      const sp = state.magias.slotsPacto;
      if (!sp || sp.usados >= sp.total) return state;
      return {
        magias: {
          ...state.magias,
          slotsPacto: { ...sp, usados: sp.usados + 1 },
        },
      };
    }),

  recuperarSlotsPacto: () =>
    set((state) => {
      const sp = state.magias.slotsPacto;
      if (!sp) return state;
      return {
        magias: {
          ...state.magias,
          slotsPacto: { ...sp, usados: 0 },
        },
      };
    }),

  addMagia: (magia) =>
    set((state) => ({
      magias: {
        ...state.magias,
        magiasConhecidas: [...state.magias.magiasConhecidas, magia],
      },
    })),

  removeMagia: (id) =>
    set((state) => ({
      magias: {
        ...state.magias,
        magiasConhecidas: state.magias.magiasConhecidas.filter(
          (m) => m.id !== id
        ),
      },
    })),

  toggleMagiaPreparada: (id) =>
    set((state) => ({
      magias: {
        ...state.magias,
        magiasConhecidas: state.magias.magiasConhecidas.map((m) =>
          m.id === id ? { ...m, preparada: !m.preparada } : m
        ),
      },
    })),
});
