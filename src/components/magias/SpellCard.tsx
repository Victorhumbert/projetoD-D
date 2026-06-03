'use client';

import type { MagiaConhecida } from '@/types/character';
import { useCharacterStore } from '@/store';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SpellCardProps {
  magia: MagiaConhecida;
  onEdit?: (magia: MagiaConhecida) => void;
}

export function SpellCard({ magia, onEdit }: SpellCardProps) {
  const toggleMagiaPreparada = useCharacterStore(
    (s) => s.toggleMagiaPreparada
  );
  const removeMagia = useCharacterStore((s) => s.removeMagia);

  const nivelLabel =
    magia.nivel === 0 ? 'Truque' : `${magia.nivel}° nível`;

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg border transition-all',
        magia.preparada
          ? 'border-accent/60 bg-accent-subtle'
          : 'border-border-subtle bg-bg-surface'
      )}
      role="article"
      aria-label={`${magia.nome} — ${nivelLabel}${magia.preparada ? ' (preparada)' : ''}`}
    >
      {/* Toggle preparada (apenas para magia de nível > 0) */}
      {magia.nivel > 0 ? (
        <button
          type="button"
          role="switch"
          aria-checked={magia.preparada}
          aria-label={magia.preparada ? `Desmarcar ${magia.nome} como preparada` : `Preparar ${magia.nome}`}
          onClick={() => toggleMagiaPreparada(magia.id)}
          className={cn(
            'mt-0.5 h-4 w-4 rounded-full border-2 shrink-0 transition-all',
            magia.preparada
              ? 'bg-accent border-accent'
              : 'bg-transparent border-border-default hover:border-accent'
          )}
        />
      ) : (
        <div className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}

      {/* Informações */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'font-medium text-sm',
              magia.preparada ? 'text-accent' : 'text-text-primary'
            )}
          >
            {magia.nome}
          </span>
          <span className="text-xs text-text-muted">{nivelLabel}</span>
        </div>
        {magia.descricao && (
          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
            {magia.descricao}
          </p>
        )}
      </div>

      {/* Ações */}
      <div className="flex gap-1 shrink-0">
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(magia)}
            aria-label={`Editar ${magia.nome}`}
            className="px-2 py-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (window.confirm(`Remover "${magia.nome}" da lista?`))
              removeMagia(magia.id);
          }}
          aria-label={`Remover ${magia.nome}`}
          className="px-2 py-1 text-danger hover:text-danger"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
