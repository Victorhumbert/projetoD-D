'use client';

import { cn } from '@/lib/utils';

interface ResourceTrackerProps {
  /** Total de recursos disponíveis */
  total: number;
  /** Quantidade usada */
  usados: number;
  /** Callback ao clicar em um slot */
  onToggle?: (index: number, isUsado: boolean) => void;
  /** Cor dos slots cheios */
  colorFull?: string;
  /** Tamanho dos círculos */
  size?: 'sm' | 'md';
  label?: string;
  className?: string;
}

/**
 * Tracker visual de recursos (slots de magia, usos de habilidade).
 * Círculos clicáveis — cheio = disponível, vazio = usado.
 */
export function ResourceTracker({
  total,
  usados,
  onToggle,
  colorFull = '#f59e0b',
  size = 'md',
  label,
  className,
}: ResourceTrackerProps) {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <span className="text-xs text-text-secondary uppercase tracking-wide">
          {label}
        </span>
      )}
      <div
        role="group"
        aria-label={label ?? 'Tracker de recursos'}
        className="flex flex-wrap gap-1.5"
      >
        {Array.from({ length: total }, (_, i) => {
          const isDisponivel = i >= usados;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Slot ${i + 1}: ${isDisponivel ? 'disponível' : 'usado'}`}
              aria-pressed={!isDisponivel}
              onClick={() => onToggle?.(i, !isDisponivel)}
              className={cn(
                sizeClass,
                'rounded-full border-2 transition-all duration-150',
                'focus-visible:outline-2 focus-visible:outline-accent',
                isDisponivel
                  ? 'border-amber-500'
                  : 'border-border-subtle bg-bg-overlay'
              )}
              style={isDisponivel ? { backgroundColor: colorFull } : undefined}
            />
          );
        })}
        {total === 0 && (
          <span className="text-xs text-text-muted italic">—</span>
        )}
      </div>
    </div>
  );
}
