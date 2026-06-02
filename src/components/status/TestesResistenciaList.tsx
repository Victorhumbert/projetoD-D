'use client';

import { useCharacterStore } from '@/store';
import { ProficiencyToggle } from '@/components/ui/ProficiencyToggle';
import { ATRIBUTOS_CONFIG, ATRIBUTOS_ORDEM } from '@/domain/constants';
import { calcBonusTesteResistencia, formatModificador } from '@/domain/calc';
import type { Character } from '@/types/character';

/**
 * Lista os 6 testes de resistência com toggle de proficiência e bônus calculado.
 */
export function TestesResistenciaList() {
  const character = useCharacterStore((s): Character => ({
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
  }));
  const toggleTesteResistencia = useCharacterStore(
    (s) => s.toggleTesteResistencia
  );

  return (
    <div className="flex flex-col gap-0.5">
      {ATRIBUTOS_ORDEM.map((atributo) => {
        const cfg = ATRIBUTOS_CONFIG[atributo];
        const prof = character.testesResistencia[atributo].proficiente;
        const bonus = calcBonusTesteResistencia(character, atributo);
        return (
          <div
            key={atributo}
            className="flex items-center gap-2 py-0.5"
          >
            <ProficiencyToggle
              checked={prof}
              onChange={() => toggleTesteResistencia(atributo)}
              label={`Proficiência em ${cfg.label}`}
              shape="diamond"
            />
            <span className="text-xs text-text-secondary w-8 font-mono">
              {cfg.sigla}
            </span>
            <span className="text-xs text-text-primary flex-1">{cfg.label}</span>
            <span className="text-sm font-semibold text-text-primary w-8 text-right font-mono">
              {formatModificador(bonus)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
