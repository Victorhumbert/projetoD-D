'use client';

import { useCharacterStore } from '@/store';
import { ATRIBUTOS_CONFIG } from '@/domain/constants';
import { calcModificador, formatModificador } from '@/domain/calc';
import type { AtributoNome } from '@/types/character';
import { cn } from '@/lib/utils';

interface AtributoCardProps {
  nome: AtributoNome;
}

/**
 * Card de atributo D&D: exibe sigla, valor editável e modificador calculado.
 */
export function AtributoCard({ nome }: AtributoCardProps) {
  const valor = useCharacterStore((s) => s.atributos[nome].valor);
  const setAtributo = useCharacterStore((s) => s.setAtributo);
  const config = ATRIBUTOS_CONFIG[nome];
  const mod = calcModificador(valor);
  const modFormatado = formatModificador(mod);

  return (
    <div className="flex flex-col items-center gap-1 bg-bg-raised border border-border-subtle rounded-lg p-3 min-w-[80px]">
      <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
        {config.sigla}
      </span>
      <span
        className={cn(
          'text-2xl font-bold',
          mod >= 3
            ? 'text-success'
            : mod <= -2
              ? 'text-danger'
              : 'text-text-primary'
        )}
      >
        {modFormatado}
      </span>
      <input
        type="number"
        inputMode="numeric"
        value={valor}
        min={1}
        max={30}
        aria-label={`${config.label}: valor`}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!isNaN(v)) setAtributo(nome, v);
        }}
        className={cn(
          'w-12 text-center rounded border border-border-default bg-bg-surface',
          'py-1.5 text-base text-text-primary focus:border-accent focus:outline-none min-h-11'
        )}
      />
      <span className="text-xs text-text-muted">{config.label}</span>
    </div>
  );
}
