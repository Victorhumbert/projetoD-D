'use client';

import { useState } from 'react';
import type { ItemInventario } from '@/types/character';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { generateId } from '@/lib/utils';

interface ItemFormProps {
  initial?: ItemInventario;
  onSave: (item: ItemInventario) => void;
  onCancel: () => void;
}

/**
 * Formulário para adicionar ou editar um item do inventário.
 */
export function ItemForm({ initial, onSave, onCancel }: ItemFormProps) {
  const [nome, setNome] = useState(initial?.nome ?? '');
  const [quantidade, setQuantidade] = useState(String(initial?.quantidade ?? '1'));
  const [pesoKg, setPesoKg] = useState(String(initial?.pesoKg ?? '0'));
  const [equipado, setEquipado] = useState(initial?.equipado ?? false);
  const [descricao, setDescricao] = useState(initial?.descricao ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!nome.trim()) errs['nome'] = 'Nome é obrigatório.';
    const qtd = parseInt(quantidade, 10);
    if (isNaN(qtd) || qtd < 1) errs['quantidade'] = 'Mínimo 1.';
    const peso = parseFloat(pesoKg);
    if (isNaN(peso) || peso < 0) errs['pesoKg'] = 'Peso inválido.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      id: initial?.id ?? generateId(),
      nome: nome.trim(),
      quantidade: parseInt(quantidade, 10),
      pesoKg: parseFloat(pesoKg),
      equipado,
      descricao: descricao.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-4">
        <Input
          label="Nome do item"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          error={errors['nome']}
          placeholder="Ex: Espada Longa"
          autoFocus
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Quantidade"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            error={errors['quantidade']}
            min="1"
          />
          <Input
            label="Peso (kg/un)"
            type="number"
            value={pesoKg}
            onChange={(e) => setPesoKg(e.target.value)}
            error={errors['pesoKg']}
            step="0.01"
            min="0"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
            Descrição (opcional)
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Dano, propriedades, notas..."
            rows={2}
            className="rounded-md border border-border-default bg-bg-raised px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none"
          />
        </div>

        <Toggle
          checked={equipado}
          onChange={setEquipado}
          label="Equipado"
        />

        <div className="flex gap-2 justify-end pt-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {initial ? 'Salvar' : 'Adicionar'}
          </Button>
        </div>
      </div>
    </form>
  );
}
