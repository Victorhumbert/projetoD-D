import type { StateCreator } from 'zustand';
import type { Habilidade } from '@/types/character';

export interface HabilidadesSlice {
  habilidades: Habilidade[];
  addHabilidade: (h: Habilidade) => void;
  removeHabilidade: (id: string) => void;
  usarHabilidade: (id: string) => void;
  recuperarHabilidade: (id: string) => void;
  resetHabilidade: (id: string) => void;
  updateHabilidade: (id: string, partial: Partial<Habilidade>) => void;
}

export const createHabilidadesSlice: StateCreator<
  HabilidadesSlice,
  [],
  [],
  HabilidadesSlice
> = (set) => ({
  habilidades: [],

  addHabilidade: (h) =>
    set((state) => ({ habilidades: [...state.habilidades, h] })),

  removeHabilidade: (id) =>
    set((state) => ({
      habilidades: state.habilidades.filter((h) => h.id !== id),
    })),

  usarHabilidade: (id) =>
    set((state) => ({
      habilidades: state.habilidades.map((h) => {
        if (h.id !== id) return h;
        if (h.usosMaximos === null) return h;
        if (h.usosAtuais <= 0) return h;
        return { ...h, usosAtuais: h.usosAtuais - 1 };
      }),
    })),

  recuperarHabilidade: (id) =>
    set((state) => ({
      habilidades: state.habilidades.map((h) => {
        if (h.id !== id) return h;
        if (h.usosMaximos === null) return h;
        if (h.usosAtuais >= h.usosMaximos) return h;
        return { ...h, usosAtuais: h.usosAtuais + 1 };
      }),
    })),

  resetHabilidade: (id) =>
    set((state) => ({
      habilidades: state.habilidades.map((h) =>
        h.id === id && h.usosMaximos !== null
          ? { ...h, usosAtuais: h.usosMaximos }
          : h
      ),
    })),

  updateHabilidade: (id, partial) =>
    set((state) => ({
      habilidades: state.habilidades.map((h) =>
        h.id === id ? { ...h, ...partial } : h
      ),
    })),
});
