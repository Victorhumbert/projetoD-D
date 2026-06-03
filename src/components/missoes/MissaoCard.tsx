'use client';

import type { Quest } from '@/types/character';
import { useCharacterStore } from '@/store';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const STATUS_ICON: Record<Quest['status'], string> = {
  ativa: '🟡',
  concluida: '✅',
  falhou: '❌',
};

const STATUS_LABEL: Record<Quest['status'], string> = {
  ativa: 'Ativa',
  concluida: 'Concluída',
  falhou: 'Falhou',
};

const TIPO_LABEL: Record<Quest['tipo'], string> = {
  principal: 'Principal',
  sidequest: 'Sidequest',
};

interface MissaoCardProps {
  quest: Quest;
  onEdit: (quest: Quest) => void;
}

export function MissaoCard({ quest, onEdit }: MissaoCardProps) {
  const updateQuest = useCharacterStore((s) => s.updateQuest);
  const removeQuest = useCharacterStore((s) => s.removeQuest);

  const concluir = () => updateQuest(quest.id, { status: 'concluida' });
  const falhou = () => updateQuest(quest.id, { status: 'falhou' });
  const reativar = () => updateQuest(quest.id, { status: 'ativa' });

  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-3 rounded-lg border transition-all',
        quest.status === 'concluida'
          ? 'border-border-subtle bg-bg-surface opacity-70'
          : quest.status === 'falhou'
            ? 'border-danger/30 bg-bg-surface opacity-60'
            : 'border-border-default bg-bg-surface'
      )}
      role="article"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base" aria-hidden="true">{STATUS_ICON[quest.status]}</span>
            <span className="font-medium text-sm text-text-primary">{quest.titulo}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-bg-overlay text-text-muted">
              {TIPO_LABEL[quest.tipo]}
            </span>
          </div>

          {quest.local && (
            <p className="text-xs text-text-muted mt-0.5">
              📍 {quest.local}
            </p>
          )}

          {(quest.recompensa || quest.recompensa_indefinida) && (
            <p className="text-xs text-text-muted mt-0.5">
              💰 {quest.recompensa_indefinida ? 'A definir' : quest.recompensa}
            </p>
          )}

          {quest.descricao && (
            <p className="text-xs text-text-muted mt-1 line-clamp-2">
              {quest.descricao}
            </p>
          )}
        </div>

        {/* Ações de editar/remover */}
        <div className="flex gap-1 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(quest)}
            aria-label={`Editar ${quest.titulo}`}
            className="px-2 py-1"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm(`Remover missão "${quest.titulo}"?`))
                removeQuest(quest.id);
            }}
            aria-label={`Remover ${quest.titulo}`}
            className="px-2 py-1 text-danger hover:text-danger"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Botões de status */}
      {quest.status === 'ativa' && (
        <div className="flex gap-2 pt-1">
          <Button variant="secondary" size="sm" onClick={concluir} className="text-xs">
            ✅ Concluir
          </Button>
          <Button variant="ghost" size="sm" onClick={falhou} className="text-xs text-danger hover:text-danger">
            ❌ Falhou
          </Button>
        </div>
      )}
      {quest.status !== 'ativa' && (
        <button
          type="button"
          onClick={reativar}
          className="text-xs text-text-muted hover:text-text-secondary self-start transition-colors"
        >
          ↩ Reativar
        </button>
      )}
    </div>
  );
}
