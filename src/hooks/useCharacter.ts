'use client';

import { useCharacterStore } from '@/store';
import type { Character } from '@/types/character';

/**
 * Retorna o Character completo usando seletores individuais por slice.
 * Cada seletor retorna uma referência estável do store (não cria novo objeto),
 * evitando o loop infinito com useSyncExternalStore no React 19 + Next.js App Router.
 * O objeto Character montado é novo a cada render, mas isso é seguro porque
 * não é passado como argumento de subscription — apenas usado para cálculos derivados.
 */
export function useCharacter(): Character {
  const characterId = useCharacterStore((s) => s.characterId);
  const versaoSchema = useCharacterStore((s) => s.versaoSchema);
  const identificacao = useCharacterStore((s) => s.identificacao);
  const combate = useCharacterStore((s) => s.combate);
  const testesMorte = useCharacterStore((s) => s.testesMorte);
  const atributos = useCharacterStore((s) => s.atributos);
  const testesResistencia = useCharacterStore((s) => s.testesResistencia);
  const pericias = useCharacterStore((s) => s.pericias);
  const magias = useCharacterStore((s) => s.magias);
  const habilidades = useCharacterStore((s) => s.habilidades);
  const inventario = useCharacterStore((s) => s.inventario);
  const carteira = useCharacterStore((s) => s.carteira);
  const atualizadoEm = useCharacterStore((s) => s.atualizadoEm);

  return {
    id: characterId,
    versaoSchema,
    identificacao,
    combate,
    testesMorte,
    atributos,
    testesResistencia,
    pericias,
    magias,
    habilidades,
    inventario,
    carteira,
    atualizadoEm,
  };
}
