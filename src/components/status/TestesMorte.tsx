'use client';

import { useCharacterStore } from '@/store';
import { cn } from '@/lib/utils';

/**
 * Testes de morte: 3 círculos de sucesso (verde) + 3 de falha (vermelho).
 * Clicar em um círculo incrementa/decrementa o contador.
 */
export function TestesMorte() {
  const sucessos = useCharacterStore((s) => s.testesMorte.sucessos);
  const falhas = useCharacterStore((s) => s.testesMorte.falhas);
  const setTestesMorte = useCharacterStore((s) => s.setTestesMorte);
  const resetTestesMorte = useCharacterStore((s) => s.resetTestesMorte);

  const toggleSucesso = (index: number) => {
    const novoValor = index < sucessos ? index : index + 1;
    setTestesMorte({
      sucessos: Math.min(3, Math.max(0, novoValor)) as 0 | 1 | 2 | 3,
    });
  };

  const toggleFalha = (index: number) => {
    const novoValor = index < falhas ? index : index + 1;
    setTestesMorte({
      falhas: Math.min(3, Math.max(0, novoValor)) as 0 | 1 | 2 | 3,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
          Testes de Morte
        </span>
        <button
          type="button"
          onClick={resetTestesMorte}
          className="text-xs text-text-muted hover:text-text-secondary transition-colors"
          aria-label="Resetar testes de morte"
        >
          Resetar
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {/* Sucessos */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-success w-16">Sucesso</span>
          <div role="group" aria-label="Sucessos nos testes de morte" className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={`Sucesso ${i + 1}: ${i < sucessos ? 'marcado' : 'vazio'}`}
                aria-pressed={i < sucessos}
                onClick={() => toggleSucesso(i)}
                className={cn(
                  'h-5 w-5 rounded-full border-2 transition-all duration-150 hover:scale-110',
                  'focus-visible:outline-2 focus-visible:outline-accent',
                  i < sucessos
                    ? 'bg-success border-success'
                    : 'bg-transparent border-border-default'
                )}
              />
            ))}
          </div>
        </div>

        {/* Falhas */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-danger w-16">Falha</span>
          <div role="group" aria-label="Falhas nos testes de morte" className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={`Falha ${i + 1}: ${i < falhas ? 'marcado' : 'vazio'}`}
                aria-pressed={i < falhas}
                onClick={() => toggleFalha(i)}
                className={cn(
                  'h-5 w-5 rounded-full border-2 transition-all duration-150 hover:scale-110',
                  'focus-visible:outline-2 focus-visible:outline-accent',
                  i < falhas
                    ? 'bg-danger border-danger'
                    : 'bg-transparent border-border-default'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
