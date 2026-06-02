import type { StateCreator } from 'zustand';
import type { Pericias, PericiaNome } from '@/types/character';
import { PERICIAS_CONFIG } from '@/domain/constants';

export interface PericiasSlice {
  pericias: Pericias;
  togglePericiaProf: (nome: PericiaNome) => void;
  togglePericiaEspecialidade: (nome: PericiaNome) => void;
}

function buildDefaultPericias(): Pericias {
  const entries = Object.entries(PERICIAS_CONFIG).map(
    ([key, cfg]) =>
      [
        key,
        { proficiente: false, especialidade: false, atributo: cfg.atributo },
      ] as const
  );
  return Object.fromEntries(entries) as Pericias;
}

export const createPericiasSlice: StateCreator<
  PericiasSlice,
  [],
  [],
  PericiasSlice
> = (set) => ({
  pericias: buildDefaultPericias(),
  togglePericiaProf: (nome) =>
    set((state) => ({
      pericias: {
        ...state.pericias,
        [nome]: {
          ...state.pericias[nome],
          proficiente: !state.pericias[nome].proficiente,
          // Se desativar proficiência, remove especialidade também
          especialidade: state.pericias[nome].proficiente
            ? false
            : state.pericias[nome].especialidade,
        },
      },
    })),
  togglePericiaEspecialidade: (nome) =>
    set((state) => ({
      pericias: {
        ...state.pericias,
        [nome]: {
          ...state.pericias[nome],
          especialidade: !state.pericias[nome].especialidade,
        },
      },
    })),
});
