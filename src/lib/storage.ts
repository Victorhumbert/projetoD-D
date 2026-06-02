import type { Character } from '@/types/character';

const STORAGE_KEY = 'dnd-character-v1';

export function loadCharacter(): Character | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Character;
  } catch {
    return null;
  }
}

export function saveCharacter(char: Character): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
  } catch {
    // localStorage pode estar cheio ou indisponível (modo privado restrito)
    console.warn('[storage] Falha ao salvar personagem no localStorage');
  }
}

export function clearCharacter(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
