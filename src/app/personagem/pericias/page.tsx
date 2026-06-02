'use client';

import { useCharacter } from '@/hooks/useCharacter';
import { useHydration } from '@/hooks/useHydration';
import { PericiaRow } from '@/components/pericias/PericiaRow';
import { Card } from '@/components/ui/Card';
import { PERICIAS_ORDEM } from '@/domain/constants';
import { calcPercepacaoPassiva } from '@/domain/calc';

export default function PericiasPage() {
  const hydrated = useHydration();

  const character = useCharacter();

  const percepcaoPassiva = calcPercepacaoPassiva(character);

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

  // Divide as perícias em 2 colunas
  const metade = Math.ceil(PERICIAS_ORDEM.length / 2);
  const coluna1 = PERICIAS_ORDEM.slice(0, metade);
  const coluna2 = PERICIAS_ORDEM.slice(metade);

  return (
    <div className="flex flex-col gap-5">
      {/* Percepção Passiva */}
      <Card variant="accent" className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-accent">{percepcaoPassiva}</span>
          <span className="text-xs text-text-secondary uppercase tracking-wide">
            Percepção Passiva
          </span>
        </div>
        <p className="text-xs text-text-muted max-w-xs">
          10 + bônus de Percepção. Usado pelo Mestre quando você não está procurando ativamente.
        </p>
      </Card>

      {/* Lista de Perícias */}
      <section aria-labelledby="pericias-heading">
        <div className="flex items-center justify-between mb-3">
          <h2
            id="pericias-heading"
            className="text-xs font-semibold text-text-secondary uppercase tracking-widest"
          >
            Perícias
          </h2>
          <p className="text-xs text-text-muted">
            Clique no círculo para marcar proficiência · Ponto azul = especialidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {/* Coluna 1 */}
          <div className="flex flex-col">
            {coluna1.map((nome) => (
              <PericiaRow key={nome} nome={nome} character={character} />
            ))}
          </div>
          {/* Coluna 2 */}
          <div className="flex flex-col">
            {coluna2.map((nome) => (
              <PericiaRow key={nome} nome={nome} character={character} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
