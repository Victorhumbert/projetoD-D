'use client';

import { useEffect, useState } from 'react';

/**
 * Hook para evitar mismatch de hidratação SSR/CSR.
 * Retorna false no servidor e em primeiro render do cliente,
 * true depois que o componente foi montado no browser.
 *
 * Use para condicionar qualquer leitura de localStorage ou window.
 */
export function useHydration(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
