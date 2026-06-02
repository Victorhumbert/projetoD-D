'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useCharacterStore } from '@/store';
import { useHydration } from '@/hooks/useHydration';
import type { Character } from '@/types/character';

/**
 * Botões de Export e Import JSON no header.
 * Export: gera download do JSON do personagem atual.
 * Import: abre file picker, valida campos obrigatórios e carrega o personagem.
 */
export function HeaderActions() {
  const hydrated = useHydration();
  const toCharacter = useCharacterStore((s) => s.toCharacter);
  const loadFromCharacter = useCharacterStore((s) => s.loadFromCharacter);
  const nome = useCharacterStore((s) => s.identificacao.nome);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  const handleExport = () => {
    const char = toCharacter();
    const json = JSON.stringify(char, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${char.identificacao.nome.replace(/\s+/g, '-').toLowerCase() || 'personagem'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      const parsed: unknown = JSON.parse(text);

      // Validação básica de campos obrigatórios
      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        !('id' in parsed) ||
        !('identificacao' in parsed) ||
        !('atributos' in parsed)
      ) {
        alert('Arquivo inválido: JSON não corresponde a uma ficha D&D 5e.');
        return;
      }

      const confirmed = window.confirm(
        `Importar personagem "${(parsed as Character).identificacao?.nome ?? 'desconhecido'}"?\nIsso substituirá o personagem atual.`
      );
      if (!confirmed) return;

      loadFromCharacter(parsed as Character);
    } catch {
      alert('Erro ao ler o arquivo. Verifique se é um JSON válido.');
    } finally {
      setImporting(false);
      // Reseta o input para permitir reimport do mesmo arquivo
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!hydrated) return null;

  return (
    <div className="flex items-center gap-2">
      {nome && (
        <span className="text-xs text-text-muted hidden md:inline truncate max-w-32">
          {nome}
        </span>
      )}
      <Button variant="ghost" size="sm" onClick={handleExport} aria-label="Exportar personagem como JSON">
        Export
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleImportClick}
        loading={importing}
        aria-label="Importar personagem de arquivo JSON"
      >
        Import
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Arquivo de importação"
        tabIndex={-1}
      />
    </div>
  );
}
