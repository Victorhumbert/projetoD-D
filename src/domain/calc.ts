import type {
  Character,
  AtributoNome,
  PericiaNome,
} from '@/types/character';

export function calcModificador(valor: number): number {
  return Math.floor((valor - 10) / 2);
}

export function calcBonusProficiencia(nivel: number): number {
  if (nivel <= 4) return 2;
  if (nivel <= 8) return 3;
  if (nivel <= 12) return 4;
  if (nivel <= 16) return 5;
  return 6;
}

export function modDe(
  character: Character,
  atributo: AtributoNome
): number {
  return calcModificador(character.atributos[atributo].valor);
}

export function calcBonusPericia(
  character: Character,
  pericia: PericiaNome
): number {
  const p = character.pericias[pericia];
  const bp = calcBonusProficiencia(character.identificacao.nivel);
  const mod = modDe(character, p.atributo);
  const bonus = p.proficiente ? bp : 0;
  const expertise = p.especialidade ? bp : 0;
  return mod + bonus + expertise;
}

export function calcBonusTesteResistencia(
  character: Character,
  atributo: AtributoNome
): number {
  const bp = calcBonusProficiencia(character.identificacao.nivel);
  const mod = modDe(character, atributo);
  const prof = character.testesResistencia[atributo].proficiente ? bp : 0;
  return mod + prof;
}

export function calcCdMagia(character: Character): number | null {
  if (!character.magias.atributoConjuracao) return null;
  const bp = calcBonusProficiencia(character.identificacao.nivel);
  const mod = modDe(character, character.magias.atributoConjuracao);
  return 8 + bp + mod;
}

export function calcBonusAtaqueMagia(character: Character): number | null {
  if (!character.magias.atributoConjuracao) return null;
  const bp = calcBonusProficiencia(character.identificacao.nivel);
  const mod = modDe(character, character.magias.atributoConjuracao);
  return bp + mod;
}

export function calcIniciativa(character: Character): number {
  return modDe(character, 'destreza');
}

export function formatModificador(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function calcPercepacaoPassiva(character: Character): number {
  return 10 + calcBonusPericia(character, 'percepcao');
}
