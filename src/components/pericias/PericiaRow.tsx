'use client';

import { useCharacterStore } from '@/store';
import { ProficiencyToggle } from '@/components/ui/ProficiencyToggle';
import { PERICIAS_CONFIG, ATRIBUTOS_CONFIG } from '@/domain/constants';
import { calcBonusPericia, formatModificador } from '@/domain/calc';
import type { PericiaNome, Character } from '@/types/character';
import { cn } from '@/lib/utils';

interface PericiaRowProps {
  nome: PericiaNome;
  character: Character;
}

/**
 * Linha de perícia: toggle de proficiência, sigla do atributo, nome e bônus calculado.
 */
export function PericiaRow({ nome, character }: PericiaRowProps) {
  const pericia = useCharacterStore((s) => s.pericias[nome]);
  const togglePericiaProf = useCharacterStore((s) => s.togglePericiaProf);
  const togglePericiaEspecialidade = useCharacterStore(
    (s) => s.togglePericiaEspecialidade
  );

  const cfg = PERICIAS_CONFIG[nome];
  const atribCfg = ATRIBUTOS_CONFIG[cfg.atributo];
  const bonus = calcBonusPericia(character, nome);

  return (
    <div
      className={cn(
        'flex items-center gap-2 py-1 px-2 rounded transition-colors hover:bg-bg-raised group'
      )}
    >
      {/* Toggle proficiência */}
      <ProficiencyToggle
        checked={pericia.proficiente}
        onChange={() => togglePericiaProf(nome)}
        label={`Proficiência em ${cfg.label}`}
        shape="circle"
      />

      {/* Toggle especialidade (double prof) — aparece ao hover se proficiente */}
      <button
        type="button"
        role="checkbox"
        aria-checked={!!pericia.especialidade}
        aria-label={`Especialidade em ${cfg.label}`}
        onClick={() => {
          if (pericia.proficiente) togglePericiaEspecialidade(nome);
        }}
        disabled={!pericia.proficiente}
        className={cn(
          'h-3 w-3 rounded-full border-2 transition-all duration-150 flex-shrink-0',
          'focus-visible:outline-2 focus-visible:outline-accent',
          pericia.especialidade
            ? 'bg-info border-info'
            : 'bg-transparent border-border-subtle',
          !pericia.proficiente && 'opacity-0 group-hover:opacity-40 cursor-not-allowed'
        )}
        title={pericia.proficiente ? 'Especialidade (dobro do bônus)' : 'Requer proficiência'}
      />

      {/* Sigla do atributo */}
      <span className="text-xs text-text-muted w-7 font-mono">
        {atribCfg.sigla}
      </span>

      {/* Nome da perícia */}
      <span
        className={cn(
          'flex-1 text-sm',
          pericia.proficiente ? 'text-text-primary' : 'text-text-secondary'
        )}
      >
        {cfg.label}
        {pericia.especialidade && (
          <span className="ml-1 text-xs text-info" aria-label="especialidade">
            ★
          </span>
        )}
      </span>

      {/* Bônus calculado */}
      <span
        className={cn(
          'text-sm font-semibold font-mono w-8 text-right',
          pericia.proficiente ? 'text-accent' : 'text-text-secondary'
        )}
      >
        {formatModificador(bonus)}
      </span>
    </div>
  );
}
