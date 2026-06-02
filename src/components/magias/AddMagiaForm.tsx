'use client';

import { useState } from 'react';
import type { MagiaConhecida, NivelMagia } from '@/types/character';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { generateId } from '@/lib/utils';

interface AddMagiaFormProps {
  onSave: (magia: MagiaConhecida) => void;
  onCancel: () => void;
}

/**
 * Formulário para adicionar uma nova magia/truque.
 */
export function AddMagiaForm({ onSave, onCancel }: AddMagiaFormProps) {
  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState<string>('0');
  const [descricao, setDescricao] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!nome.trim()) errs['nome'] = 'Nome é obrigatório.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const nivelNum = parseInt(nivel, 10);
    onSave({
      id: generateId(),
      nome: nome.trim(),
      nivel: (isNaN(nivelNum) ? 0 : Math.max(0, Math.min(9, nivelNum))) as
        | 0
        | NivelMagia,
      preparada: nivelNum === 0,
      descricao: descricao.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Nome da magia"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        error={errors['nome']}
        placeholder="Ex: Bola de Fogo"
        autoFocus
      />

      <div className="flex flex-col gap-1">
        <label
          htmlFor="nivel-magia"
          className="text-xs font-medium text-text-secondary uppercase tracking-wide"
        >
          Nível (0 = Truque)
        </label>
        <select
          id="nivel-magia"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
        >
          <option value="0">Truque (0)</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <option key={n} value={String(n)}>
              {n}° nível
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
          Descrição (opcional)
        </label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Escola, alcance, dano, efeito..."
          rows={2}
          className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none"
        />
      </div>

      <div className="flex gap-2 justify-end pt-1">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Adicionar
        </Button>
      </div>
    </form>
  );
}
