'use client';

import { useCharacterStore } from '@/store';
import { cn } from '@/lib/utils';

/**
 * Barra de pontos de vida com cor dinâmica:
 * >50% max → verde, 25-50% → amarelo, <25% → vermelho.
 */
export function BarraVida() {
  const pvMax = useCharacterStore((s) => s.combate.pontosVidaMax);
  const pvAtual = useCharacterStore((s) => s.combate.pontosVidaAtual);
  const pvTemp = useCharacterStore((s) => s.combate.pontosVidaTemporarios);
  const setPvAtual = useCharacterStore((s) => s.setPvAtual);
  const setPvTemp = useCharacterStore((s) => s.setPvTemp);
  const setCombate = useCharacterStore((s) => s.setCombate);

  const ratio = pvMax > 0 ? pvAtual / pvMax : 0;
  const barColor =
    ratio > 0.5
      ? 'bg-success'
      : ratio > 0.25
        ? 'bg-accent'
        : 'bg-danger';

  const borderColor =
    ratio > 0.5
      ? 'border-success'
      : ratio > 0.25
        ? 'border-accent'
        : 'border-danger';

  return (
    <div className="flex flex-col gap-3">
      {/* Barra visual */}
      <div>
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>Pontos de Vida</span>
          <span>
            {pvAtual} / {pvMax}
          </span>
        </div>
        <div
          className="h-3 rounded-full bg-bg-overlay overflow-hidden"
          role="progressbar"
          aria-valuenow={pvAtual}
          aria-valuemin={0}
          aria-valuemax={pvMax}
          aria-label="Pontos de vida"
        >
          <div
            className={cn('h-full rounded-full transition-all duration-300', barColor)}
            style={{ width: `${Math.max(0, Math.min(100, ratio * 100))}%` }}
          />
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-secondary uppercase tracking-wide">
            PV Máx
          </label>
          <input
            type="number"
            value={pvMax}
            min={1}
            max={999}
            aria-label="Pontos de vida máximos"
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v) && v > 0) setCombate({ pontosVidaMax: v });
            }}
            className={cn(
              'rounded border bg-bg-raised px-2 py-1 text-sm text-text-primary',
              'focus:border-accent focus:outline-none border-border-default'
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-secondary uppercase tracking-wide">
            PV Atual
          </label>
          <input
            type="number"
            value={pvAtual}
            min={0}
            max={pvMax}
            aria-label="Pontos de vida atuais"
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) setPvAtual(v);
            }}
            className={cn(
              'rounded border-2 bg-bg-raised px-2 py-1 text-sm text-text-primary font-semibold',
              'focus:outline-none transition-colors',
              borderColor
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-secondary uppercase tracking-wide">
            PV Temp
          </label>
          <input
            type="number"
            value={pvTemp}
            min={0}
            max={999}
            aria-label="Pontos de vida temporários"
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) setPvTemp(v);
            }}
            className={cn(
              'rounded border bg-bg-raised px-2 py-1 text-sm text-text-primary',
              'focus:border-info focus:outline-none border-border-default'
            )}
          />
        </div>
      </div>
    </div>
  );
}
