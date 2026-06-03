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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={pvMax}
            aria-label="Pontos de vida máximos"
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, '');
              const v = raw === '' ? 1 : Math.max(1, parseInt(raw, 10));
              setCombate({ pontosVidaMax: v });
            }}
            onFocus={(e) => e.target.select()}
            className={cn(
              'rounded border bg-bg-raised px-2 py-1 text-sm text-text-primary min-h-11',
              'focus:border-accent focus:outline-none border-border-default'
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-secondary uppercase tracking-wide">
            PV Atual
          </label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Diminuir PV"
              onClick={() => setPvAtual(Math.max(0, pvAtual - 1))}
              className="w-9 h-9 rounded-lg bg-bg-raised border border-border-subtle text-text-primary hover:bg-danger/20 hover:border-danger flex items-center justify-center text-lg font-bold active:scale-95 transition-all shrink-0"
            >−</button>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pvAtual}
              aria-label="Pontos de vida atuais"
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, '');
                setPvAtual(raw === '' ? 0 : parseInt(raw, 10));
              }}
              onFocus={(e) => e.target.select()}
              className={cn(
                'w-full rounded border-2 bg-bg-raised px-2 py-1 text-base text-text-primary font-semibold text-center',
                'focus:outline-none transition-colors min-h-11',
                borderColor
              )}
            />
            <button
              type="button"
              aria-label="Aumentar PV"
              onClick={() => setPvAtual(Math.min(pvMax, pvAtual + 1))}
              className="w-9 h-9 rounded-lg bg-bg-raised border border-border-subtle text-text-primary hover:bg-success/20 hover:border-success flex items-center justify-center text-lg font-bold active:scale-95 transition-all shrink-0"
            >+</button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-secondary uppercase tracking-wide">
            PV Temp
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={pvTemp}
            aria-label="Pontos de vida temporários"
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, '');
              setPvTemp(raw === '' ? 0 : parseInt(raw, 10));
            }}
            onFocus={(e) => e.target.select()}
            className={cn(
              'rounded border bg-bg-raised px-2 py-1 text-sm text-text-primary min-h-11',
              'focus:border-info focus:outline-none border-border-default'
            )}
          />
        </div>
      </div>
    </div>
  );
}
