'use client';

import { useCharacterStore } from '@/store';
import { TabBar } from '@/components/ui/TabBar';
import { HeaderActions } from '@/components/HeaderActions';
import { temMagiaAtiva } from '@/domain/calc';

const ALL_TABS = [
  {
    href: '/personagem/status',
    label: 'Status',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    href: '/personagem/pericias',
    label: 'Perícias',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    href: '/personagem/inventario',
    label: 'Inventário',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    href: '/personagem/magias',
    label: 'Magias',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function PersonagemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const classeNome = useCharacterStore((s) => s.identificacao.classe);
  const subclasseId = useCharacterStore((s) => s.identificacao.subclasse);
  const nivel = useCharacterStore((s) => s.identificacao.nivel);
  const temMagia = !classeNome || temMagiaAtiva(classeNome, subclasseId, nivel);

  const tabs = temMagia
    ? ALL_TABS
    : ALL_TABS.filter((t) => t.href !== '/personagem/magias');

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-bg-surface border-b border-border-subtle">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-accent font-bold text-lg tracking-wide" aria-label="D&D 5e">
              D&amp;D 5e
            </span>
            <span className="text-border-subtle text-lg" aria-hidden="true">|</span>
            <span className="text-text-secondary text-sm hidden sm:inline">
              Gerenciador de Personagem
            </span>
          </div>
          <HeaderActions />
        </div>
        <TabBar tabs={tabs} />
      </header>

      <main
        id="main-content"
        className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 pb-24 md:pb-6"
      >
        {children}
      </main>
    </div>
  );
}
