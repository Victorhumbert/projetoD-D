import type { StateCreator } from 'zustand';
import type { ItemInventario } from '@/types/character';

export interface InventarioSlice {
  inventario: ItemInventario[];
  addItem: (item: ItemInventario) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, partial: Partial<ItemInventario>) => void;
  toggleItemEquipado: (id: string) => void;
}

export const createInventarioSlice: StateCreator<
  InventarioSlice,
  [],
  [],
  InventarioSlice
> = (set) => ({
  inventario: [],

  addItem: (item) =>
    set((state) => ({ inventario: [...state.inventario, item] })),

  removeItem: (id) =>
    set((state) => ({
      inventario: state.inventario.filter((i) => i.id !== id),
    })),

  updateItem: (id, partial) =>
    set((state) => ({
      inventario: state.inventario.map((i) =>
        i.id === id ? { ...i, ...partial } : i
      ),
    })),

  toggleItemEquipado: (id) =>
    set((state) => ({
      inventario: state.inventario.map((i) =>
        i.id === id ? { ...i, equipado: !i.equipado } : i
      ),
    })),
});
