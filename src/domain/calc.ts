import type {
  Character,
  AtributoNome,
  NivelMagia,
  PericiaNome,
} from '@/types/character';
import { CLASSES } from '@/data/classes';
import {
  SLOTS_FULL_CASTER,
  SLOTS_HALF_CASTER,
  SLOTS_ELDRITCH_KNIGHT,
  SLOTS_ARCANE_TRICKSTER,
  SLOTS_WARLOCK,
  type SpellSlotTable,
  type WarlockEntry,
} from '@/data/spellSlots';

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

export function resolverAtributoConjuracao(
  classeNome: string,
  subclasseId?: string
): AtributoNome | null {
  const classeData = CLASSES.find((c) => c.nome === classeNome);
  if (!classeData) return null;
  if (classeData.atributo_conjuracao) return classeData.atributo_conjuracao as AtributoNome;
  if (subclasseId) {
    const subData = classeData.subclasses.find((s) => s.id === subclasseId);
    if (subData?.atributo_conjuracao) return subData.atributo_conjuracao as AtributoNome;
  }
  return null;
}

export type ResolvedSlots =
  | { tipo: 'full' | 'half' | 'third'; tabela: SpellSlotTable; pacto: null }
  | { tipo: 'warlock'; tabela: null; pacto: WarlockEntry }
  | null;

export function resolverSlots(
  classeNome: string,
  subclasseId: string | undefined,
  nivel: number
): ResolvedSlots {
  const classeData = CLASSES.find((c) => c.nome === classeNome);
  if (!classeData) return null;

  if (classeData.tipo_conjurador === 'warlock') {
    const pacto = SLOTS_WARLOCK[nivel] ?? null;
    return pacto ? { tipo: 'warlock', tabela: null, pacto } : null;
  }

  if (classeData.tipo_conjurador === 'full') {
    return { tipo: 'full', tabela: SLOTS_FULL_CASTER[nivel] ?? {}, pacto: null };
  }

  if (classeData.tipo_conjurador === 'half') {
    return { tipo: 'half', tabela: SLOTS_HALF_CASTER[nivel] ?? {}, pacto: null };
  }

  if (subclasseId && nivel >= 3) {
    const subData = classeData.subclasses.find((s) => s.id === subclasseId);
    if (subData?.tipo_conjurador === 'third') {
      const tabela =
        subData.id === 'cavaleiro_arcano'
          ? SLOTS_ELDRITCH_KNIGHT[nivel]
          : subData.id === 'trapaceiro_arcano'
          ? SLOTS_ARCANE_TRICKSTER[nivel]
          : undefined;
      return tabela ? { tipo: 'third', tabela, pacto: null } : null;
    }
  }

  return null;
}

export function temTruquesAtivos(
  classeNome: string,
  subclasseId: string | undefined,
): boolean {
  const classeData = CLASSES.find((c) => c.nome === classeNome);
  if (!classeData) return false;
  if (subclasseId) {
    const subData = classeData.subclasses.find((s) => s.id === subclasseId);
    if (subData?.tem_truques) return true;
  }
  return false;
}

export function temMagiaAtiva(
  classeNome: string,
  subclasseId: string | undefined,
  nivel: number
): boolean {
  if (resolverSlots(classeNome, subclasseId, nivel) !== null) return true;
  return temTruquesAtivos(classeNome, subclasseId);
}

const SPELL_LEVELS: NivelMagia[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function buildSlotTotals(tabela: SpellSlotTable): Record<NivelMagia, number> {
  const result = {} as Record<NivelMagia, number>;
  for (const n of SPELL_LEVELS) {
    result[n] = tabela[n] ?? 0;
  }
  return result;
}
