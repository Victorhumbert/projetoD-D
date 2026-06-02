'use client';

import type { Habilidade } from '@/types/character';
import { useCharacterStore } from '@/store';
import { ResourceTracker } from '@/components/ui/ResourceTracker';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const RECUPERA_LABEL: Record<string, string> = {
  descanso_curto: 'Descanso Curto',
  descanso_longo: 'Descanso Longo',
  amanhecer: 'Amanhecer',
  nunca: 'Passiva',
};

interface HabilidadeCardProps {
  habilidade: Habilidade;
}

/**
 * Card de habilidade de classe com tracker de usos e botão de reset.
 */
export function HabilidadeCard({ habilidade: h }: HabilidadeCardProps) {
  const usarHabilidade = useCharacterStore((s) => s.usarHabilidade);
  const recuperarHabilidade = useCharacterStore((s) => s.recuperarHabilidade);
  const resetHabilidade = useCharacterStore((s) => s.resetHabilidade);
  const removeHabilidade = useCharacterStore((s) => s.removeHabilidade);

  const temUsos = h.usosMaximos !== null;
  const esgotado = temUsos && h.usosAtuais === 0;

  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-3 rounded-lg border transition-all',
        esgotado
          ? 'border-border-subtle opacity-70 bg-bg-surface'
          : 'border-border-default bg-bg-surface'
      )}
      role="article"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-text-primary">
              {h.nome}
            </span>
            <span
              className={cn(
                'text-xs px-1.5 py-0.5 rounded-full font-medium',
                h.recuperaEm === 'descanso_curto'
                  ? 'bg-info/20 text-info'
                  : h.recuperaEm === 'descanso_longo'
                    ? 'bg-accent-subtle text-accent'
                    : 'bg-bg-overlay text-text-muted'
              )}
            >
              {RECUPERA_LABEL[h.recuperaEm] ?? h.recuperaEm}
            </span>
            {esgotado && (
              <span className="text-xs text-danger font-medium">Esgotado</span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
            {h.descricao}
          </p>
        </div>

        {/* Ações */}
        <div className="flex gap-1 flex-shrink-0">
          {temUsos && (
            <button
              type="button"
              onClick={() => resetHabilidade(h.id)}
              aria-label={`Resetar usos de ${h.nome}`}
              className="text-xs text-text-muted hover:text-text-secondary transition-colors px-2 py-1 rounded hover:bg-bg-raised"
            >
              Reset
            </button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (
                window.confirm(`Remover habilidade "${h.nome}"?`)
              )
                removeHabilidade(h.id);
            }}
            aria-label={`Remover ${h.nome}`}
            className="px-2 py-1 text-danger hover:text-danger"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Tracker de usos */}
      {temUsos && h.usosMaximos !== null && (
        <div className="flex items-center gap-3">
          <ResourceTracker
            total={h.usosMaximos}
            usados={h.usosMaximos - h.usosAtuais}
            onToggle={(_, isAtivando) => {
              if (isAtivando) recuperarHabilidade(h.id);
              else usarHabilidade(h.id);
            }}
            size="sm"
            label={`${h.usosAtuais}/${h.usosMaximos} usos`}
          />
        </div>
      )}
    </div>
  );
}
