'use client';

import { useState } from 'react';
import type { Habilidade, RecuperaEm } from '@/types/character';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { generateId } from '@/lib/utils';

interface AddHabilidadeFormProps {
  initial?: Habilidade;
  onSave: (h: Habilidade) => void;
  onCancel: () => void;
}

const RECUPERA_OPTIONS: { value: RecuperaEm; label: string }[] = [
  { value: 'descanso_curto', label: 'Descanso Curto' },
  { value: 'descanso_longo', label: 'Descanso Longo' },
  { value: 'amanhecer', label: 'Amanhecer' },
  { value: 'nunca', label: 'Passiva (sem usos)' },
];

export function AddHabilidadeForm({ initial, onSave, onCancel }: AddHabilidadeFormProps) {
  const isPassivaInicial = initial ? initial.usosMaximos === null : false;
  const [nome, setNome] = useState(initial?.nome ?? '');
  const [descricao, setDescricao] = useState(initial?.descricao ?? '');
  const [usosMaximos, setUsosMaximos] = useState(String(initial?.usosMaximos ?? '1'));
  const [passiva, setPassiva] = useState(isPassivaInicial);
  const [recuperaEm, setRecuperaEm] = useState<RecuperaEm>(
    isPassivaInicial ? 'descanso_longo' : (initial?.recuperaEm ?? 'descanso_longo')
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!nome.trim()) errs['nome'] = 'Nome é obrigatório.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const maxUsos = passiva ? null : Math.max(1, parseInt(usosMaximos, 10) || 1);
    onSave({
      id: initial?.id ?? generateId(),
      nome: nome.trim(),
      descricao: descricao.trim(),
      usosMaximos: maxUsos,
      usosAtuais: initial ? (initial.usosAtuais) : (maxUsos ?? 0),
      recuperaEm: passiva ? 'nunca' : recuperaEm,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Nome da habilidade"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        error={errors['nome']}
        placeholder="Ex: Surto de Ação"
        autoFocus
      />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
          Descrição
        </label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="O que essa habilidade faz?"
          rows={2}
          className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={passiva}
          onChange={(e) => setPassiva(e.target.checked)}
          className="rounded"
        />
        <span className="text-sm text-text-secondary">Habilidade passiva (sem rastreamento de usos)</span>
      </label>

      {!passiva && (
        <>
          <Input
            label="Usos máximos"
            type="number"
            value={usosMaximos}
            onChange={(e) => setUsosMaximos(e.target.value)}
            min="1"
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="recupera-em"
              className="text-xs font-medium text-text-secondary uppercase tracking-wide"
            >
              Recupera em
            </label>
            <select
              id="recupera-em"
              value={recuperaEm}
              onChange={(e) => setRecuperaEm(e.target.value as RecuperaEm)}
              className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
            >
              {RECUPERA_OPTIONS.filter((o) => o.value !== 'nunca').map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

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
