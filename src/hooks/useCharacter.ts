'use client';

import { useShallow } from 'zustand/react/shallow';
import { useCharacterStore } from '@/store';
import type { Character } from '@/types/character';

/**
 * Retorna o Character completo com comparação shallow para evitar re-renders
 * causados por referências novas de objetos idênticos (infinite loop bug com
 * useSyncExternalStore do React 19 + Zustand + Next.js App Router).
 */
export function useCharacter(): Character {
  return useCharacterStore(
    useShallow(
      (s): Character => ({
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
        atualizadoEm: s.atualizadoEm,
      })
    )
  );
}
