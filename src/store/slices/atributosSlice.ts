import type { StateCreator } from 'zustand';
import type {
  Atributos,
  TestesResistencia,
  AtributoNome,
} from '@/types/character';

export interface AtributosSlice {
  atributos: Atributos;
  testesResistencia: TestesResistencia;
  setAtributo: (nome: AtributoNome, valor: number) => void;
  toggleTesteResistencia: (nome: AtributoNome) => void;
  /** Reseta todos para false e marca os dois atributos da classe como proficientes. */
  setTestesResistenciaDaClasse: (atributos: [AtributoNome, AtributoNome]) => void;
}

const atributosDefault: Atributos = {
  forca: { valor: 10 },
  destreza: { valor: 10 },
  constituicao: { valor: 10 },
  inteligencia: { valor: 10 },
  sabedoria: { valor: 10 },
  carisma: { valor: 10 },
};

const testesDefault: TestesResistencia = {
  forca: { proficiente: false },
  destreza: { proficiente: false },
  constituicao: { proficiente: false },
  inteligencia: { proficiente: false },
  sabedoria: { proficiente: false },
  carisma: { proficiente: false },
};

export const createAtributosSlice: StateCreator<
  AtributosSlice,
  [],
  [],
  AtributosSlice
> = (set) => ({
  atributos: atributosDefault,
  testesResistencia: testesDefault,
  setAtributo: (nome, valor) =>
    set((state) => ({
      atributos: {
        ...state.atributos,
        [nome]: { valor: Math.max(1, Math.min(30, valor)) },
      },
    })),
  toggleTesteResistencia: (nome) =>
    set((state) => ({
      testesResistencia: {
        ...state.testesResistencia,
        [nome]: {
          proficiente: !state.testesResistencia[nome].proficiente,
        },
      },
    })),
  setTestesResistenciaDaClasse: ([a, b]) =>
    set(() => ({
      testesResistencia: {
        forca: { proficiente: false },
        destreza: { proficiente: false },
        constituicao: { proficiente: false },
        inteligencia: { proficiente: false },
        sabedoria: { proficiente: false },
        carisma: { proficiente: false },
        [a]: { proficiente: true },
        [b]: { proficiente: true },
      },
    })),
});
