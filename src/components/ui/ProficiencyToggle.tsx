'use client';

import { cn } from '@/lib/utils';

interface ProficiencyToggleProps {
  checked: boolean;
  onChange?: () => void;
  label: string;
  /** 'circle' = proficiência normal, 'diamond' = teste de resistência */
  shape?: 'circle' | 'diamond';
  className?: string;
}

/**
 * Toggle de proficiência estilo D&D — círculo ou losango clicável.
 */
export function ProficiencyToggle({
  checked,
  onChange,
  label,
  shape = 'circle',
  className,
}: ProficiencyToggleProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative flex-shrink-0 focus-visible:outline-2 focus-visible:outline-accent',
        'transition-all duration-150',
        shape === 'circle' ? 'h-4 w-4 rounded-full' : 'h-4 w-4',
        className
      )}
    >
      {shape === 'circle' ? (
        <div
          className={cn(
            'h-4 w-4 rounded-full border-2 transition-colors duration-150',
            checked
              ? 'bg-accent border-accent'
              : 'bg-transparent border-border-default'
          )}
        />
      ) : (
        <div
          className={cn(
            'h-3.5 w-3.5 rotate-45 border-2 transition-colors duration-150',
            checked
              ? 'bg-accent border-accent'
              : 'bg-transparent border-border-default'
          )}
        />
      )}
    </button>
  );
}
