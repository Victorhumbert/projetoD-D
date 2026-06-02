'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

/**
 * Input numérico com botões +/- acessíveis.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    { label, value, onChange, min = 0, max = 999, className, id, 'aria-label': ariaLabel },
    ref
  ) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    const decrement = () => {
      if (value > min) onChange(value - 1);
    };
    const increment = () => {
      if (value < max) onChange(value + 1);
    };

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-text-secondary uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={decrement}
            disabled={value <= min}
            aria-label={`Diminuir ${label ?? ariaLabel ?? 'valor'}`}
            className={cn(
              'h-8 w-8 flex items-center justify-center rounded border border-border-default',
              'bg-bg-raised text-text-primary hover:bg-bg-overlay transition-colors',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'text-lg leading-none'
            )}
          >
            −
          </button>
          <input
            ref={ref}
            id={inputId}
            type="number"
            value={value}
            min={min}
            max={max}
            aria-label={ariaLabel ?? label}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) onChange(Math.max(min, Math.min(max, v)));
            }}
            className={cn(
              'w-14 text-center rounded border border-border-default bg-bg-raised',
              'py-1 text-sm text-text-primary',
              'focus:border-accent focus:outline-none'
            )}
          />
          <button
            type="button"
            onClick={increment}
            disabled={value >= max}
            aria-label={`Aumentar ${label ?? ariaLabel ?? 'valor'}`}
            className={cn(
              'h-8 w-8 flex items-center justify-center rounded border border-border-default',
              'bg-bg-raised text-text-primary hover:bg-bg-overlay transition-colors',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'text-lg leading-none'
            )}
          >
            +
          </button>
        </div>
      </div>
    );
  }
);
