'use client';

import { useCharacterStore } from '@/store';
import { RACAS, type Raca } from '@/data/racas';
import type { AtributoNome } from '@/types/character';
import { cn } from '@/lib/utils';

const SELECT_CLASS = cn(
  'w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2.5',
  'text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
  'min-h-[44px]'
);

/**
 * Computa o mapa de bônus combinados (raça + sub-raça).
 */
function getBonusCombinado(
  raca: Raca | undefined,
  subRacaId: string
): Partial<Record<AtributoNome, number>> {
  if (!raca) return {};
  const bonus: Partial<Record<AtributoNome, number>> = { ...raca.bonusAtributos };
  const sub = raca.subRacas.find((s) => s.id === subRacaId);
  if (sub) {
    for (const [attr, val] of Object.entries(sub.bonusAtributos) as [AtributoNome, number][]) {
      bonus[attr] = (bonus[attr] ?? 0) + val;
    }
  }
  return bonus;
}

/**
 * Selects de raça e sub-raça com aplicação automática de bônus nos atributos.
 * Ao trocar de raça: subtrai os bônus antigos e soma os novos.
 */
export function RacaSelect() {
  const raca = useCharacterStore((s) => s.identificacao.raca);
  const subRaca = useCharacterStore((s) => s.identificacao.subRaca ?? '');
  const setIdentificacao = useCharacterStore((s) => s.setIdentificacao);
  const atributos = useCharacterStore((s) => s.atributos);
  const setAtributo = useCharacterStore((s) => s.setAtributo);
  const setCombate = useCharacterStore((s) => s.setCombate);

  const racaAtual = RACAS.find((r) => r.id === raca);

  function aplicarBonusRaca(novaRacaId: string, novaSubRacaId: string) {
    const bonusAntigo = getBonusCombinado(racaAtual, subRaca);
    const novaRaca = RACAS.find((r) => r.id === novaRacaId);
    const bonusNovo = getBonusCombinado(novaRaca, novaSubRacaId);

    // Atributos afetados por um dos dois conjuntos de bônus
    const attrs = new Set([
      ...Object.keys(bonusAntigo),
      ...Object.keys(bonusNovo),
    ]) as Set<AtributoNome>;

    for (const attr of attrs) {
      const valorAtual = atributos[attr].valor;
      const antigo = bonusAntigo[attr] ?? 0;
      const novo = bonusNovo[attr] ?? 0;
      const diff = novo - antigo;
      if (diff !== 0) {
        setAtributo(attr, valorAtual + diff);
      }
    }

    if (novaRaca) {
      setCombate({ deslocamento: novaRaca.deslocamento });
    }
  }

  function handleRacaChange(novaRacaId: string) {
    aplicarBonusRaca(novaRacaId, '');
    setIdentificacao({ raca: novaRacaId, subRaca: '' });
  }

  function handleSubRacaChange(novaSubRacaId: string) {
    // Para sub-raça, reaplica considerando a mesma raça-mãe mas nova sub-raça
    aplicarBonusRaca(raca, novaSubRacaId);
    setIdentificacao({ subRaca: novaSubRacaId });
  }

  const tracosRaca = racaAtual?.tracos ?? [];
  const subRacaSelecionada = racaAtual?.subRacas.find((s) => s.id === subRaca);
  const tracosSubRaca = subRacaSelecionada?.tracos ?? [];
  const todosTracos = [...tracosRaca, ...tracosSubRaca];

  return (
    <div className="flex flex-col gap-3">
      {/* Select de raça */}
      <div className="flex flex-col gap-1">
        <label htmlFor="select-raca" className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
          Raça
        </label>
        <select
          id="select-raca"
          value={raca}
          onChange={(e) => handleRacaChange(e.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">Selecionar raça...</option>
          {RACAS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Select de sub-raça (condicional) */}
      {racaAtual && racaAtual.subRacas.length > 0 && (
        <div className="flex flex-col gap-1">
          <label htmlFor="select-subraca" className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
            Sub-raça
          </label>
          <select
            id="select-subraca"
            value={subRaca}
            onChange={(e) => handleSubRacaChange(e.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">Selecionar sub-raça...</option>
            {racaAtual.subRacas.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Informações da raça */}
      {racaAtual && (
        <div className="flex flex-col gap-1.5 rounded-lg border border-border-subtle bg-bg-raised px-3 py-2.5">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="font-semibold">Deslocamento:</span>
            <span>{racaAtual.deslocamento}m</span>
          </div>

          {racaAtual.nota && (
            <p className="text-xs text-accent italic">{racaAtual.nota}</p>
          )}

          {todosTracos.length > 0 && (
            <ul className="flex flex-col gap-0.5 mt-0.5" aria-label={`Traços de ${racaAtual.nome}`}>
              {todosTracos.map((traco) => (
                <li key={traco} className="text-xs text-text-secondary flex items-start gap-1.5">
                  <span className="text-accent mt-px" aria-hidden="true">·</span>
                  {traco}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
