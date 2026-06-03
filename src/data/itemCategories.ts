export interface CategoriaItem {
  id: string;
  nome: string;
  icone: string;
}

export const CATEGORIAS_ITEM: readonly CategoriaItem[] = [
  { id: 'armas',          nome: 'Armas',               icone: '⚔️' },
  { id: 'armaduras',      nome: 'Armaduras e Escudos',  icone: '🛡️' },
  { id: 'consumiveis',    nome: 'Consumíveis',           icone: '🧪' },
  { id: 'ferramentas',    nome: 'Ferramentas',           icone: '🔧' },
  { id: 'itens_aventura', nome: 'Itens de Aventura',     icone: '🎒' },
  { id: 'itens_magicos',  nome: 'Itens Mágicos',         icone: '✨' },
  { id: 'tesouros',       nome: 'Tesouros',              icone: '💎' },
  { id: 'diversos',       nome: 'Diversos',              icone: '📦' },
] as const;

export const CATEGORIA_PADRAO = 'diversos';

export function getCategoria(id: string | undefined): CategoriaItem {
  return (
    CATEGORIAS_ITEM.find((c) => c.id === id) ??
    CATEGORIAS_ITEM.find((c) => c.id === CATEGORIA_PADRAO)!
  );
}
