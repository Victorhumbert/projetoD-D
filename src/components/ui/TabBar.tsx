'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface TabItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface TabBarProps {
  tabs: TabItem[];
}

/**
 * Barra de navegação entre abas.
 * Desktop: horizontal no topo.
 * Mobile: fixa na parte inferior (bottom navigation).
 */
export function TabBar({ tabs }: TabBarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: top bar */}
      <nav
        aria-label="Navegação das abas"
        className="hidden md:flex border-b border-border-subtle bg-bg-surface"
      >
        <div className="max-w-5xl mx-auto px-4 flex">
          {tabs.map((tab) => {
            const active = pathname === tab.href || pathname.startsWith(tab.href + '/');
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors duration-150',
                  active
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-default'
                )}
              >
                <span aria-hidden="true" className="h-4 w-4">{tab.icon}</span>
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile: bottom bar */}
      <nav
        aria-label="Navegação entre abas"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border-subtle bg-bg-surface"
      >
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const active = pathname === tab.href || pathname.startsWith(tab.href + '/');
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition-colors duration-150 flex-1',
                  active ? 'text-accent' : 'text-text-secondary'
                )}
              >
                <span aria-hidden="true" className="h-5 w-5">{tab.icon}</span>
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
