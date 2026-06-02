import { describe, it, expect } from 'vitest';
import {
  calcModificador,
  calcBonusProficiencia,
  calcBonusPericia,
  calcBonusTesteResistencia,
  calcCdMagia,
  calcBonusAtaqueMagia,
  calcIniciativa,
  formatModificador,
} from './calc';
import { defaultCharacter } from './defaultCharacter';

describe('calcModificador', () => {
  it('retorna -5 para valor 1', () => {
    expect(calcModificador(1)).toBe(-5);
  });
  it('retorna 0 para valor 10', () => {
    expect(calcModificador(10)).toBe(0);
  });
  it('retorna 0 para valor 11', () => {
    expect(calcModificador(11)).toBe(0);
  });
  it('retorna +3 para valor 16', () => {
    expect(calcModificador(16)).toBe(3);
  });
  it('retorna +5 para valor 20', () => {
    expect(calcModificador(20)).toBe(5);
  });
});

describe('calcBonusProficiencia', () => {
  it('retorna 2 para nível 1', () => expect(calcBonusProficiencia(1)).toBe(2));
  it('retorna 2 para nível 4', () => expect(calcBonusProficiencia(4)).toBe(2));
  it('retorna 3 para nível 5', () => expect(calcBonusProficiencia(5)).toBe(3));
  it('retorna 4 para nível 9', () => expect(calcBonusProficiencia(9)).toBe(4));
  it('retorna 5 para nível 13', () => expect(calcBonusProficiencia(13)).toBe(5));
  it('retorna 6 para nível 17', () => expect(calcBonusProficiencia(17)).toBe(6));
  it('retorna 6 para nível 20', () => expect(calcBonusProficiencia(20)).toBe(6));
});

describe('calcBonusPericia — Tharivol nível 3 (BP=2)', () => {
  // atletismo: FOR 16 (mod +3), proficiente + especialidade = +3 + 2 + 2 = +7
  it('atletismo com especialidade = +7', () => {
    expect(calcBonusPericia(defaultCharacter, 'atletismo')).toBe(7);
  });
  // percepção: SAB 12 (mod +1), proficiente = +1 + 2 = +3
  it('percepcao proficiente = +3', () => {
    expect(calcBonusPericia(defaultCharacter, 'percepcao')).toBe(3);
  });
  // acrobacia: DES 14 (mod +2), não proficiente = +2
  it('acrobacia sem proficiência = +2', () => {
    expect(calcBonusPericia(defaultCharacter, 'acrobacia')).toBe(2);
  });
  // arcanismo: INT 10 (mod 0), não proficiente = 0
  it('arcanismo sem proficiência = 0', () => {
    expect(calcBonusPericia(defaultCharacter, 'arcanismo')).toBe(0);
  });
});

describe('calcBonusTesteResistencia — Tharivol nível 3 (BP=2)', () => {
  // FOR 16 (mod +3), proficiente: +3+2 = +5
  it('forca proficiente = +5', () => {
    expect(calcBonusTesteResistencia(defaultCharacter, 'forca')).toBe(5);
  });
  // DES 14 (mod +2), não proficiente: +2
  it('destreza não proficiente = +2', () => {
    expect(calcBonusTesteResistencia(defaultCharacter, 'destreza')).toBe(2);
  });
});

describe('calcCdMagia e calcBonusAtaqueMagia', () => {
  it('retorna null quando não há atributo de conjuração', () => {
    expect(calcCdMagia(defaultCharacter)).toBeNull();
    expect(calcBonusAtaqueMagia(defaultCharacter)).toBeNull();
  });
});

describe('calcIniciativa', () => {
  // DES 14 -> mod +2
  it('retorna modificador de DES', () => {
    expect(calcIniciativa(defaultCharacter)).toBe(2);
  });
});

describe('formatModificador', () => {
  it('formata positivo com +', () => expect(formatModificador(3)).toBe('+3'));
  it('formata zero com +', () => expect(formatModificador(0)).toBe('+0'));
  it('formata negativo sem +', () => expect(formatModificador(-2)).toBe('-2'));
});
