'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-bg-base font-semibold hover:bg-accent-hover active:scale-95',
  secondary:
    'bg-bg-raised border border-border-default text-text-primary hover:bg-bg-overlay active:scale-95',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-bg-raised active:scale-95',
  danger:
    'bg-danger text-white font-semibold hover:bg-red-700 active:scale-95',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1 text-sm rounded',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-lg',
};

/**
 * Botão base do design system. Suporta variantes primary, secondary, ghost e danger.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'secondary', size = 'md', loading, className, children, disabled, ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        aria-busy={loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...rest}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
