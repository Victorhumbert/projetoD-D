/**
 * Concatena classnames condicionalmente.
 * Alternativa leve ao clsx/classnames sem dependência adicional.
 */
export function cn(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Gera um ID único baseado em crypto.randomUUID quando disponível,
 * com fallback para Math.random em ambientes mais antigos.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 11);
}
