'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Input de texto base. Inclui label acessível e mensagem de erro.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, hint, className, id, ...rest }, ref) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-text-secondary uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : hint
                ? `${inputId}-hint`
                : undefined
          }
          className={cn(
            'w-full rounded-md border bg-bg-raised px-3 py-2 text-sm text-text-primary',
            'placeholder:text-text-muted',
            'transition-colors duration-150',
            error
              ? 'border-danger focus:border-danger'
              : 'border-border-default focus:border-accent',
            'focus:outline-none',
            className
          )}
          {...rest}
        />
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-danger">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
