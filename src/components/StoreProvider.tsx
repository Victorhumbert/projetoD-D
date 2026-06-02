'use client';

import { useEffect } from 'react';
import { hydrateStore } from '@/store';

/**
 * Provider que hidrata o Zustand store a partir do LocalStorage.
 * Deve ficar no topo da árvore React (root layout).
 * A hidratação ocorre apenas uma vez, no mount do cliente.
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    hydrateStore();
  }, []);

  return <>{children}</>;
}
