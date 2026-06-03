'use client';

import { useState } from 'react';
import { useCharacterStore } from '@/store';
import { useHydration } from '@/hooks/useHydration';
import { ItemCard } from '@/components/inventario/ItemCard';
import { ItemForm } from '@/components/inventario/ItemForm';
import { Carteira } from '@/components/inventario/Carteira';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { ItemInventario } from '@/types/character';

export default function InventarioPage() {
  const hydrated = useHydration();
  const inventario = useCharacterStore((s) => s.inventario);
  const addItem = useCharacterStore((s) => s.addItem);
  const updateItem = useCharacterStore((s) => s.updateItem);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemInventario | null>(null);

  const pesoTotal = inventario.reduce(
    (acc, item) => acc + item.quantidade * item.pesoKg,
    0
  );

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item: ItemInventario) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSave = (item: ItemInventario) => {
    if (editingItem) {
      updateItem(item.id, item);
    } else {
      addItem(item);
    }
    setModalOpen(false);
  };

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
      {/* Carteira */}
      <Carteira />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Inventário</h1>
          <p className="text-xs text-text-muted mt-0.5">
            {inventario.length} {inventario.length === 1 ? 'item' : 'itens'} ·{' '}
            Peso total: {pesoTotal.toFixed(2)} kg
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={handleAdd}>
          + Adicionar Item
        </Button>
      </div>

      {/* Lista ou estado vazio */}
      {inventario.length === 0 ? (
        <div
          className="flex flex-col items-center gap-3 py-16 text-center"
          role="status"
          aria-live="polite"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-muted"
            aria-hidden="true"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <p className="text-text-secondary text-sm">Inventário vazio</p>
          <p className="text-text-muted text-xs max-w-xs">
            Adicione armas, armaduras, itens e equipamentos do seu personagem.
          </p>
          <Button variant="secondary" onClick={handleAdd}>
            Adicionar primeiro item
          </Button>
        </div>
      ) : (
        <div
          className="flex flex-col gap-2"
          role="list"
          aria-label="Itens do inventário"
        >
          {inventario.map((item) => (
            <div key={item.id} role="listitem">
              <ItemCard item={item} onEdit={handleEdit} />
            </div>
          ))}
        </div>
      )}

      {/* Modal de adicionar/editar */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Editar Item' : 'Adicionar Item'}
      >
        <ItemForm
          initial={editingItem ?? undefined}
          onSave={handleSave}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
