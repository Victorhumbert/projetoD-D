'use client';

import { useCharacterStore } from '@/store';
import { RACAS, type Raca, type SubRaca } from '@/data/racas';
import { PERICIAS_CONFIG } from '@/domain/constants';
import type { AtributoNome, PericiaNome, BonusRacaEscolhidos } from '@/types/character';
import { cn } from '@/lib/utils';

const SELECT_CLASS = cn(
  'w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2.5',
  'text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
  'min-h-[44px]'
);

const ATRIBUTOS_LABELS: Record<AtributoNome, string> = {
  forca: 'Força',
  destreza: 'Destreza',
  constituicao: 'Constituição',
  inteligencia: 'Inteligência',
  sabedoria: 'Sabedoria',
  carisma: 'Carisma',
};
const ATRIBUTOS_ORDEM: AtributoNome[] = [
  'forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma',
];

/**
 * Computa o mapa de bônus combinados (raça + sub-raça + escolhas livres).
 * Quando a sub-raça tem sobrescreverBonusBase, os bônus da raça-mãe são ignorados.
 */
function getBonusCombinado(
  raca: Raca | undefined,
  subRacaId: string,
  escolhasAtributos: AtributoNome[] = []
): Partial<Record<AtributoNome, number>> {
  if (!raca) return {};
  const sub: SubRaca | undefined = raca.subRacas.find((s) => s.id === subRacaId);

  const bonus: Partial<Record<AtributoNome, number>> = sub?.sobrescreverBonusBase
    ? {}
    : { ...raca.bonusAtributos };

  if (sub) {
    for (const [attr, val] of Object.entries(sub.bonusAtributos) as [AtributoNome, number][]) {
      bonus[attr] = (bonus[attr] ?? 0) + val;
    }
  }

  for (const attr of escolhasAtributos) {
    bonus[attr] = (bonus[attr] ?? 0) + 1;
  }

  return bonus;
}

export function RacaSelect() {
  const raca = useCharacterStore((s) => s.identificacao.raca);
  const subRaca = useCharacterStore((s) => s.identificacao.subRaca ?? '');
  const bonusRacaEscolhidos = useCharacterStore((s) => s.identificacao.bonusRacaEscolhidos);
  const setIdentificacao = useCharacterStore((s) => s.setIdentificacao);
  const atributos = useCharacterStore((s) => s.atributos);
  const setAtributo = useCharacterStore((s) => s.setAtributo);
  const setCombate = useCharacterStore((s) => s.setCombate);

  const racaAtual = RACAS.find((r) => r.id === raca);
  const subAtual = racaAtual?.subRacas.find((s) => s.id === subRaca);
  const escolhasAtributos = bonusRacaEscolhidos?.atributos ?? [];
  const escolhasPericias = bonusRacaEscolhidos?.pericias ?? [];

  function aplicarBonusRaca(
    novaRacaId: string,
    novaSubRacaId: string,
    novasEscolhas: AtributoNome[]
  ) {
    const bonusAntigo = getBonusCombinado(racaAtual, subRaca, escolhasAtributos);
    const novaRaca = RACAS.find((r) => r.id === novaRacaId);
    const bonusNovo = getBonusCombinado(novaRaca, novaSubRacaId, novasEscolhas);

    const attrs = new Set([
      ...Object.keys(bonusAntigo),
      ...Object.keys(bonusNovo),
    ]) as Set<AtributoNome>;

    for (const attr of attrs) {
      const valorAtual = atributos[attr].valor;
      const antigo = bonusAntigo[attr] ?? 0;
      const novo = bonusNovo[attr] ?? 0;
      const diff = novo - antigo;
      if (diff !== 0) setAtributo(attr, valorAtual + diff);
    }

    if (novaRaca) setCombate({ deslocamento: novaRaca.deslocamento });
  }

  function handleRacaChange(novaRacaId: string) {
    aplicarBonusRaca(novaRacaId, '', []);
    setIdentificacao({ raca: novaRacaId, subRaca: '', bonusRacaEscolhidos: undefined });
  }

  function handleSubRacaChange(novaSubRacaId: string) {
    aplicarBonusRaca(raca, novaSubRacaId, []);
    setIdentificacao({ subRaca: novaSubRacaId, bonusRacaEscolhidos: undefined });
  }

  function handleEscolhaAtributo(index: number, novoAttr: AtributoNome | '') {
    const novas = [...escolhasAtributos];
    if (novoAttr === '') {
      novas.splice(index, 1);
    } else {
      novas[index] = novoAttr;
    }
    aplicarBonusRaca(raca, subRaca, novas);
    const next: BonusRacaEscolhidos = {
      atributos: novas,
      pericias: escolhasPericias,
    };
    setIdentificacao({ bonusRacaEscolhidos: next });
  }

  function handleEscolhaPericia(index: number, novaPericia: PericiaNome | '') {
    const novas = [...escolhasPericias];
    if (novaPericia === '') {
      novas.splice(index, 1);
    } else {
      novas[index] = novaPericia;
    }
    setIdentificacao({
      bonusRacaEscolhidos: { atributos: escolhasAtributos, pericias: novas },
    });
  }

  const tracosRaca = racaAtual?.tracos ?? [];
  const tracosSubRaca = subAtual?.tracos ?? [];
  const todosTracos = [...tracosRaca, ...tracosSubRaca];
  const numEscolhaAtributos = subAtual?.escolhaAtributos ?? 0;
  const numEscolhaPericias = subAtual?.escolhaPericias ?? 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Select de raça */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="select-raca"
          className="text-xs font-semibold text-text-secondary uppercase tracking-wide"
        >
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
          <label
            htmlFor="select-subraca"
            className="text-xs font-semibold text-text-secondary uppercase tracking-wide"
          >
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

      {/* Seletores de atributos livres (Humano Variante) */}
      {numEscolhaAtributos > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
            Atributos com +1 (escolha {numEscolhaAtributos})
          </p>
          {Array.from({ length: numEscolhaAtributos }).map((_, i) => {
            const valor = escolhasAtributos[i] ?? '';
            const outrasEscolhas = escolhasAtributos.filter((_, j) => j !== i);
            return (
              <select
                key={i}
                value={valor}
                aria-label={`Atributo ${i + 1} com bônus +1`}
                onChange={(e) =>
                  handleEscolhaAtributo(i, e.target.value as AtributoNome | '')
                }
                className={SELECT_CLASS}
              >
                <option value="">Escolher atributo...</option>
                {ATRIBUTOS_ORDEM.map((a) => (
                  <option
                    key={a}
                    value={a}
                    disabled={outrasEscolhas.includes(a)}
                  >
                    {ATRIBUTOS_LABELS[a]}
                  </option>
                ))}
              </select>
            );
          })}
        </div>
      )}

      {/* Seletor de perícia livre (Humano Variante) */}
      {numEscolhaPericias > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
            Perícia com proficiência (escolha {numEscolhaPericias})
          </p>
          {Array.from({ length: numEscolhaPericias }).map((_, i) => {
            const valor = escolhasPericias[i] ?? '';
            const outras = escolhasPericias.filter((_, j) => j !== i);
            return (
              <select
                key={i}
                value={valor}
                aria-label={`Perícia ${i + 1} com proficiência bônus`}
                onChange={(e) =>
                  handleEscolhaPericia(i, e.target.value as PericiaNome | '')
                }
                className={SELECT_CLASS}
              >
                <option value="">Escolher perícia...</option>
                {(Object.keys(PERICIAS_CONFIG) as PericiaNome[]).map((p) => (
                  <option key={p} value={p} disabled={outras.includes(p)}>
                    {PERICIAS_CONFIG[p].label}
                  </option>
                ))}
              </select>
            );
          })}
          <p className="text-xs text-text-muted italic">
            Marque a proficiência manualmente na aba Perícias.
          </p>
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
            <ul
              className="flex flex-col gap-0.5 mt-0.5"
              aria-label={`Traços de ${racaAtual.nome}`}
            >
              {todosTracos.map((traco) => (
                <li
                  key={traco}
                  className="text-xs text-text-secondary flex items-start gap-1.5"
                >
                  <span className="text-accent mt-px" aria-hidden="true">
                    ·
                  </span>
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
