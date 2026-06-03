'use client';

import { useCharacterStore } from '@/store';
import { CLASSES, type CharacterClass } from '@/data/classes';
import { cn } from '@/lib/utils';

const SELECT_CLASS = cn(
  'w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2.5',
  'text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
  'min-h-[44px]'
);

function ClasseDetalhe({ classe }: { classe: CharacterClass }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border-subtle bg-bg-raised px-3 py-2.5 text-xs">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-bold text-accent text-sm">{classe.dadoVida}</span>
        <span className="font-semibold text-text-primary">{classe.nome}</span>
        <span className="text-text-muted">—</span>
        <span className="text-text-secondary">{classe.atributoPrincipal}</span>
      </div>

      {/* Estilo */}
      <p className="text-text-secondary italic leading-relaxed">{classe.estilo}</p>

      {/* Prós */}
      <div>
        <span className="font-semibold text-success uppercase tracking-wide">Prós</span>
        <ul className="mt-1 flex flex-col gap-0.5" aria-label={`Vantagens de ${classe.nome}`}>
          {classe.pros.map((pro) => (
            <li key={pro} className="flex items-start gap-1.5 text-text-secondary">
              <span className="text-success mt-px" aria-hidden="true">✓</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Contras */}
      <div>
        <span className="font-semibold text-danger uppercase tracking-wide">Contras</span>
        <ul className="mt-1 flex flex-col gap-0.5" aria-label={`Desvantagens de ${classe.nome}`}>
          {classe.contras.map((contra) => (
            <li key={contra} className="flex items-start gap-1.5 text-text-secondary">
              <span className="text-danger mt-px" aria-hidden="true">✗</span>
              {contra}
            </li>
          ))}
        </ul>
      </div>

      {/* Aviso de slots especiais (Bruxo) */}
      {classe.slotsEspeciais && (
        <p className="text-accent font-semibold bg-accent-subtle rounded px-2 py-1">
          Slots do Pacto recuperam em descanso curto.
        </p>
      )}
    </div>
  );
}

/**
 * Select de classe com painel de detalhes e auto-configuração do dado de vida
 * e testes de resistência ao selecionar.
 */
export function ClasseSelect() {
  const classe = useCharacterStore((s) => s.identificacao.classe);
  const setIdentificacao = useCharacterStore((s) => s.setIdentificacao);
  const setCombate = useCharacterStore((s) => s.setCombate);
  const setTestesResistenciaDaClasse = useCharacterStore(
    (s) => s.setTestesResistenciaDaClasse
  );

  const classeAtual = CLASSES.find((c) => c.nome === classe) ?? null;

  function handleClasseChange(novaClasNome: string) {
    const novaClasse = CLASSES.find((c) => c.nome === novaClasNome);
    setIdentificacao({ classe: novaClasNome });
    if (novaClasse) {
      setCombate({ dadoDeVida: novaClasse.dadoVida });
      setTestesResistenciaDaClasse(novaClasse.testesResistencia);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="select-classe" className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
          Classe
        </label>
        <select
          id="select-classe"
          value={classe}
          onChange={(e) => handleClasseChange(e.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">Selecionar classe...</option>
          {CLASSES.map((c) => (
            <option key={c.id} value={c.nome}>
              {c.nome} ({c.dadoVida})
            </option>
          ))}
        </select>
      </div>

      {classeAtual && <ClasseDetalhe classe={classeAtual} />}
    </div>
  );
}
