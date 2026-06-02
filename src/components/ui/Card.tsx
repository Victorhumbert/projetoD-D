import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'raised' | 'accent';
}

/**
 * Container de superfície. Variante 'accent' usa borda âmbar.
 */
export function Card({
  variant = 'default',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        variant === 'default' && 'bg-bg-surface border-border-subtle',
        variant === 'raised' && 'bg-bg-raised border-border-default',
        variant === 'accent' &&
          'bg-accent-subtle border-border-accent',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
