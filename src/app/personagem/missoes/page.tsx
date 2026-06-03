'use client';

import { useState } from 'react';
import { useCharacterStore } from '@/store';
import { useHydration } from '@/hooks/useHydration';
import { MissaoCard } from '@/components/missoes/MissaoCard';
import { MissaoForm } from '@/components/missoes/MissaoForm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Quest, QuestStatus } from '@/types/character';

type FiltroStatus = QuestStatus | 'todas';

export default function MissoesPage() {
  const hydrated = useHydration();
  const missoes = useCharacterStore((s) => s.missoes);
  const addQuest = useCharacterStore((s) => s.addQuest);
  const updateQuest = useCharacterStore((s) => s.updateQuest);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('todas');
  const [filtroLocal, setFiltroLocal] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingQuest(null);
    setModalOpen(true);
  };

  const handleEdit = (q: Quest) => {
    setEditingQuest(q);
    setModalOpen(true);
  };

  const handleSave = (q: Quest) => {
    if (editingQuest) {
      updateQuest(q.id, q);
    } else {
      addQuest(q);
    }
    setModalOpen(false);
    setEditingQuest(null);
  };

  const questsFiltradas = missoes.quests.filter((q) => {
    if (filtroStatus !== 'todas' && q.status !== filtroStatus) return false;
    if (filtroLocal && q.local !== filtroLocal) return false;
    return true;
  });

  const principais = questsFiltradas.filter((q) => q.tipo === 'principal');
  const sidequests = questsFiltradas.filter((q) => q.tipo === 'sidequest');

  const STATUS_FILTROS: { value: FiltroStatus; label: string }[] = [
    { value: 'todas', label: 'Todas' },
    { value: 'ativa', label: '🟡 Ativas' },
    { value: 'concluida', label: '✅ Concluídas' },
    { value: 'falhou', label: '❌ Falharam' },
  ];

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-20">
        <div
          className="animate-spin h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
          aria-label="Carregando..."
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Missões</h1>
          <p className="text-xs text-text-muted mt-0.5">
            {missoes.quests.length} {missoes.quests.length === 1 ? 'missão' : 'missões'} registradas
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={handleAdd}>
          + Nova Missão
        </Button>
      </div>

      {/* Filtros de status */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
        {STATUS_FILTROS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFiltroStatus(f.value)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-all border',
              filtroStatus === f.value
                ? 'bg-accent text-white border-accent'
                : 'bg-bg-surface border-border-default text-text-secondary hover:border-accent'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Filtros de local */}
      {missoes.locais.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por local">
          <button
            type="button"
            onClick={() => setFiltroLocal(null)}
            className={cn(
              'px-3 py-1 rounded-full text-xs transition-all border',
              filtroLocal === null
                ? 'bg-accent text-white border-accent'
                : 'bg-bg-surface border-border-default text-text-muted hover:border-accent'
            )}
          >
            📍 Todos os locais
          </button>
          {missoes.locais.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setFiltroLocal(l === filtroLocal ? null : l)}
              className={cn(
                'px-3 py-1 rounded-full text-xs transition-all border',
                filtroLocal === l
                  ? 'bg-accent text-white border-accent'
                  : 'bg-bg-surface border-border-default text-text-muted hover:border-accent'
              )}
            >
              📍 {l}
            </button>
          ))}
        </div>
      )}

      {/* Estado vazio */}
      {missoes.quests.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <p className="text-text-secondary text-sm">Nenhuma missão registrada</p>
          <p className="text-text-muted text-xs max-w-xs">
            Registre quests principais e sidequests da sua aventura.
          </p>
          <Button variant="secondary" onClick={handleAdd}>
            Adicionar primeira missão
          </Button>
        </div>
      ) : questsFiltradas.length === 0 ? (
        <p className="text-sm text-text-muted text-center py-8">
          Nenhuma missão com esse filtro.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Missões Principais */}
          {principais.length > 0 && (
            <section aria-labelledby="principais-heading">
              <h2
                id="principais-heading"
                className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3 border-b border-border-subtle pb-1"
              >
                Missões Principais
              </h2>
              <div className="flex flex-col gap-2">
                {principais.map((q) => (
                  <MissaoCard key={q.id} quest={q} onEdit={handleEdit} />
                ))}
              </div>
            </section>
          )}

          {/* Sidequests */}
          {sidequests.length > 0 && (
            <section aria-labelledby="sidequests-heading">
              <h2
                id="sidequests-heading"
                className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3 border-b border-border-subtle pb-1"
              >
                Sidequests
              </h2>
              <div className="flex flex-col gap-2">
                {sidequests.map((q) => (
                  <MissaoCard key={q.id} quest={q} onEdit={handleEdit} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingQuest(null); }}
        title={editingQuest ? 'Editar Missão' : 'Nova Missão'}
      >
        <MissaoForm
          initial={editingQuest ?? undefined}
          locaisExistentes={missoes.locais}
          onSave={handleSave}
          onCancel={() => { setModalOpen(false); setEditingQuest(null); }}
        />
      </Modal>
    </div>
  );
}
