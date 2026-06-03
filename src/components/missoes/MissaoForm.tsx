'use client';

import { useState, useRef, useEffect } from 'react';
import type { Quest, QuestTipo, QuestStatus } from '@/types/character';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { generateId } from '@/lib/utils';

interface MissaoFormProps {
  initial?: Quest;
  locaisExistentes: string[];
  onSave: (quest: Quest) => void;
  onCancel: () => void;
}

export function MissaoForm({ initial, locaisExistentes, onSave, onCancel }: MissaoFormProps) {
  const [titulo, setTitulo] = useState(initial?.titulo ?? '');
  const [descricao, setDescricao] = useState(initial?.descricao ?? '');
  const [tipo, setTipo] = useState<QuestTipo>(initial?.tipo ?? 'sidequest');
  const [status, setStatus] = useState<QuestStatus>(initial?.status ?? 'ativa');
  const [local, setLocal] = useState(initial?.local ?? '');
  const [recompensa, setRecompensa] = useState(initial?.recompensa ?? '');
  const [recompensa_indefinida, setRecompensaIndefinida] = useState(initial?.recompensa_indefinida ?? false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Autocomplete
  const [sugestoes, setSugestoes] = useState<string[]>([]);
  const [showSugestoes, setShowSugestoes] = useState(false);
  const localRef = useRef<HTMLInputElement>(null);

  const filtrarSugestoes = (valor: string) => {
    if (!valor.trim()) {
      setSugestoes(locaisExistentes);
    } else {
      setSugestoes(
        locaisExistentes.filter((l) =>
          l.toLowerCase().includes(valor.toLowerCase())
        )
      );
    }
  };

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocal(e.target.value);
    filtrarSugestoes(e.target.value);
    setShowSugestoes(true);
  };

  const handleLocalFocus = () => {
    filtrarSugestoes(local);
    setShowSugestoes(true);
  };

  const selecionarLocal = (l: string) => {
    setLocal(l);
    setShowSugestoes(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (localRef.current && !localRef.current.contains(e.target as Node)) {
        setShowSugestoes(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!titulo.trim()) errs['titulo'] = 'Título é obrigatório.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onSave({
      id: initial?.id ?? generateId(),
      titulo: titulo.trim(),
      descricao: descricao.trim() || undefined,
      tipo,
      status,
      local: local.trim() || undefined,
      recompensa: recompensa_indefinida ? undefined : (recompensa.trim() || undefined),
      recompensa_indefinida,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        error={errors['titulo']}
        placeholder="Nome da missão"
        autoFocus
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="tipo-quest" className="text-xs font-medium text-text-secondary uppercase tracking-wide">
            Tipo
          </label>
          <select
            id="tipo-quest"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as QuestTipo)}
            className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
          >
            <option value="principal">Principal</option>
            <option value="sidequest">Sidequest</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="status-quest" className="text-xs font-medium text-text-secondary uppercase tracking-wide">
            Status
          </label>
          <select
            id="status-quest"
            value={status}
            onChange={(e) => setStatus(e.target.value as QuestStatus)}
            className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
          >
            <option value="ativa">🟡 Ativa</option>
            <option value="concluida">✅ Concluída</option>
            <option value="falhou">❌ Falhou</option>
          </select>
        </div>
      </div>

      {/* Local com autocomplete */}
      <div className="flex flex-col gap-1 relative" ref={localRef}>
        <label htmlFor="local-quest" className="text-xs font-medium text-text-secondary uppercase tracking-wide">
          Local (opcional)
        </label>
        <input
          id="local-quest"
          type="text"
          value={local}
          onChange={handleLocalChange}
          onFocus={handleLocalFocus}
          placeholder={locaisExistentes.length > 0 ? 'Digite ou selecione um local...' : 'Digite um local...'}
          className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          autoComplete="off"
        />
        {showSugestoes && sugestoes.length > 0 && (
          <ul className="absolute top-full mt-1 left-0 right-0 z-10 rounded-md border border-border-default bg-bg-raised shadow-lg max-h-40 overflow-y-auto">
            {sugestoes.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  onMouseDown={() => selecionarLocal(l)}
                  className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-bg-overlay transition-colors"
                >
                  📍 {l}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
          Descrição (opcional)
        </label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Objetivos, contexto, notas..."
          rows={2}
          className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none"
        />
      </div>

      {/* Recompensa */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={recompensa_indefinida}
            onChange={(e) => setRecompensaIndefinida(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-text-secondary">Recompensa a definir</span>
        </label>
        {!recompensa_indefinida && (
          <Input
            label="Recompensa (opcional)"
            value={recompensa}
            onChange={(e) => setRecompensa(e.target.value)}
            placeholder="Ex: 500 PO + favor do sacerdote"
          />
        )}
      </div>

      <div className="flex gap-2 justify-end pt-1">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {initial ? 'Salvar' : 'Adicionar'}
        </Button>
      </div>
    </form>
  );
}
