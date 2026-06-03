'use client';

import type { ItemInventario } from '@/types/character';
import { useCharacterStore } from '@/store';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { getCategoria } from '@/data/itemCategories';

interface ItemCardProps {
  item: ItemInventario;
  onEdit: (item: ItemInventario) => void;
}

export function ItemCard({ item, onEdit }: ItemCardProps) {
  const toggleItemEquipado = useCharacterStore((s) => s.toggleItemEquipado);
  const removeItem = useCharacterStore((s) => s.removeItem);

  const pesoTotal = (item.quantidade * item.pesoKg).toFixed(2);
  const cat = getCategoria(item.categoria);

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg border transition-all',
        item.equipado
          ? 'border-accent bg-accent-subtle'
          : 'border-border-subtle bg-bg-surface'
      )}
      role="article"
      aria-label={`${item.nome}${item.equipado ? ' (equipado)' : ''}`}
    >
      {/* Toggle equipado */}
      <button
        type="button"
        role="switch"
        aria-checked={item.equipado}
        aria-label={item.equipado ? `Desequipar ${item.nome}` : `Equipar ${item.nome}`}
        onClick={() => toggleItemEquipado(item.id)}
        className={cn(
          'mt-0.5 h-5 w-5 rounded-full border-2 shrink-0 transition-all',
          item.equipado
            ? 'bg-accent border-accent'
            : 'bg-transparent border-border-default hover:border-accent'
        )}
      />

      {/* Informações */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className={cn(
              'font-medium text-sm truncate',
              item.equipado ? 'text-accent' : 'text-text-primary'
            )}
          >
            {item.nome}
          </span>
          {item.quantidade > 1 && (
            <span className="text-xs text-text-muted">x{item.quantidade}</span>
          )}
          <span className="text-xs text-text-muted" aria-label={`Categoria: ${cat.nome}`}>
            {cat.icone}
          </span>
        </div>
        {item.descricao && (
          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
            {item.descricao}
          </p>
        )}
        <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
          <span>
            {item.pesoKg} kg/un · {pesoTotal} kg total
          </span>
          {item.equipado && (
            <span className="text-accent font-medium">Equipado</span>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-1 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(item)}
          aria-label={`Editar ${item.nome}`}
          className="px-2 py-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (window.confirm(`Remover "${item.nome}" do inventário?`))
              removeItem(item.id);
          }}
          aria-label={`Remover ${item.nome}`}
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
