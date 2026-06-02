'use client';

import { useState } from 'react';
import { useCharacterStore } from '@/store';
import { Button } from '@/components/ui/Button';
import { ATRIBUTOS_CONFIG, ATRIBUTOS_ORDEM } from '@/domain/constants';
import type { AtributoNome, NivelMagia } from '@/types/character';
import { cn } from '@/lib/utils';

const NIVEIS: NivelMagia[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Painel colapsável de configuração dos slots de magia.
 * Permite ajustar totais de cada nível e configurar o atributo de conjuração.
 */
export function SlotConfig() {
  const [open, setOpen] = useState(false);
  const slots = useCharacterStore((s) => s.magias.slots);
  const atributoConjuracao = useCharacterStore(
    (s) => s.magias.atributoConjuracao
  );
  const slotsPacto = useCharacterStore((s) => s.magias.slotsPacto);
  const setAtributoConjuracao = useCharacterStore(
    (s) => s.setAtributoConjuracao
  );
  const setCombate = useCharacterStore((s) => s.setCombate);

  // Acesso interno ao set do store para mudar slots
  const store = useCharacterStore.getState;

  const updateSlotTotal = (nivel: NivelMagia, total: number) => {
    useCharacterStore.setState((state) => ({
      magias: {
        ...state.magias,
        slots: {
          ...state.magias.slots,
          [nivel]: {
            ...state.magias.slots[nivel],
            total: Math.max(0, total),
            usados: Math.min(
              state.magias.slots[nivel].usados,
              Math.max(0, total)
            ),
          },
        },
      },
    }));
  };

  const toggleSlotsPacto = () => {
    useCharacterStore.setState((state) => ({
      magias: {
        ...state.magias,
        slotsPacto: state.magias.slotsPacto
          ? null
          : { nivel: 1, total: 1, usados: 0 },
      },
    }));
  };

  const updateSlotsPacto = (
    field: 'nivel' | 'total',
    value: number
  ) => {
    useCharacterStore.setState((state) => {
      if (!state.magias.slotsPacto) return state;
      return {
        magias: {
          ...state.magias,
          slotsPacto: {
            ...state.magias.slotsPacto,
            [field]:
              field === 'nivel'
                ? (Math.max(1, Math.min(9, value)) as NivelMagia)
                : Math.max(1, value),
            usados: 0,
          },
        },
      };
    });
  };

  return (
    <div className="border border-border-subtle rounded-lg">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <span>Configurar Slots e Conjuração</span>
        <svg
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            open && 'rotate-180'
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-border-subtle px-4 pb-4 pt-3 flex flex-col gap-4">
          {/* Atributo de Conjuração */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="atributo-conjuracao"
              className="text-xs text-text-secondary uppercase tracking-wide"
            >
              Atributo de Conjuração
            </label>
            <select
              id="atributo-conjuracao"
              value={atributoConjuracao ?? ''}
              onChange={(e) =>
                setAtributoConjuracao(
                  (e.target.value as AtributoNome) || null
                )
              }
              className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
            >
              <option value="">Nenhum (não conjurador)</option>
              {ATRIBUTOS_ORDEM.map((a) => (
                <option key={a} value={a}>
                  {ATRIBUTOS_CONFIG[a].label}
                </option>
              ))}
            </select>
          </div>

          {/* Totais por nível */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-secondary uppercase tracking-wide">
              Slots por Nível
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {NIVEIS.map((n) => (
                <div key={n} className="flex flex-col items-center gap-1">
                  <span className="text-xs text-text-muted">{n}°</span>
                  <input
                    type="number"
                    value={slots[n].total}
                    min={0}
                    max={4}
                    aria-label={`Total de slots de nível ${n}`}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!isNaN(v)) updateSlotTotal(n, v);
                    }}
                    className="w-12 text-center rounded border border-border-default bg-bg-surface py-1 text-sm text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slots do Pacto */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!slotsPacto}
                onChange={toggleSlotsPacto}
                className="rounded"
              />
              <span className="text-sm text-text-secondary">
                Habilitar Slots do Pacto (Bruxo)
              </span>
            </label>

            {slotsPacto && (
              <div className="flex gap-3 ml-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-text-muted">Nível</span>
                  <input
                    type="number"
                    value={slotsPacto.nivel}
                    min={1}
                    max={9}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!isNaN(v)) updateSlotsPacto('nivel', v);
                    }}
                    className="w-14 text-center rounded border border-border-default bg-bg-surface py-1 text-sm text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-text-muted">Qtd</span>
                  <input
                    type="number"
                    value={slotsPacto.total}
                    min={1}
                    max={4}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!isNaN(v)) updateSlotsPacto('total', v);
                    }}
                    className="w-14 text-center rounded border border-border-default bg-bg-surface py-1 text-sm text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
