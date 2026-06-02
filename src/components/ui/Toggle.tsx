'use client';

import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

/**
 * Toggle switch acessível com label visível.
 */
export function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <label
      className={cn('flex items-center gap-2 cursor-pointer select-none', className)}
    >
      <span
        role="switch"
        aria-checked={checked}
        aria-label={label}
        tabIndex={0}
        onClick={() => onChange(!checked)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent',
          'transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent',
          checked ? 'bg-accent' : 'bg-bg-overlay'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm',
            'transition-transform duration-200',
            checked ? 'translate-x-4' : 'translate-x-0'
          )}
        />
      </span>
      <span className="text-sm text-text-secondary">{label}</span>
    </label>
  );
}
