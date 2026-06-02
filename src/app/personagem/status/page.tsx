'use client';

import { useCharacterStore } from '@/store';
import { useCharacter } from '@/hooks/useCharacter';
import { useHydration } from '@/hooks/useHydration';
import { AtributoCard } from '@/components/status/AtributoCard';
import { BarraVida } from '@/components/status/BarraVida';
import { TestesMorte } from '@/components/status/TestesMorte';
import { TestesResistenciaList } from '@/components/status/TestesResistenciaList';
import { Card } from '@/components/ui/Card';
import { ATRIBUTOS_ORDEM, XP_POR_NIVEL, DADO_DE_VIDA_POR_CLASSE } from '@/domain/constants';
import {
  calcBonusProficiencia,
  calcIniciativa,
  formatModificador,
} from '@/domain/calc';
import { cn } from '@/lib/utils';

function XpProgressBar({ xp, nivel }: { xp: number; nivel: number }) {
  const xpNivelAtual = XP_POR_NIVEL[nivel] ?? 0;
  const xpProximoNivel = XP_POR_NIVEL[nivel + 1];
  if (!xpProximoNivel) {
    return (
      <div className="text-xs text-accent font-semibold">Nível Máximo</div>
    );
  }
  const progresso = Math.min(
    1,
    (xp - xpNivelAtual) / (xpProximoNivel - xpNivelAtual)
  );
  return (
    <div className="flex flex-col gap-1 w-full max-w-xs">
      <div className="flex justify-between text-xs text-text-muted">
        <span>{xp.toLocaleString('pt-BR')} XP</span>
        <span>Próximo: {xpProximoNivel.toLocaleString('pt-BR')}</span>
      </div>
      <div
        className="h-1.5 rounded-full bg-bg-overlay"
        role="progressbar"
        aria-valuenow={xp}
        aria-valuemin={xpNivelAtual}
        aria-valuemax={xpProximoNivel}
        aria-label="Progresso de XP"
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${progresso * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function StatusPage() {
  const hydrated = useHydration();

  // Seletores granulares — evita re-render da árvore toda
  const identificacao = useCharacterStore((s) => s.identificacao);
  const combate = useCharacterStore((s) => s.combate);
  const setCombate = useCharacterStore((s) => s.setCombate);
  const setIdentificacao = useCharacterStore((s) => s.setIdentificacao);

  const character = useCharacter();

  const bp = calcBonusProficiencia(identificacao.nivel);
  const iniciativa = calcIniciativa(character);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 rounded-full border-2 border-accent border-t-transparent" aria-label="Carregando..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* ─── Header do personagem ──────────────────────────────── */}
      <section aria-labelledby="header-personagem">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <input
              id="header-personagem"
              type="text"
              value={identificacao.nome}
              placeholder="Nome do personagem"
              aria-label="Nome do personagem"
              onChange={(e) => setIdentificacao({ nome: e.target.value })}
              className={cn(
                'text-2xl font-bold bg-transparent border-b border-transparent',
                'hover:border-border-default focus:border-accent focus:outline-none',
                'text-text-primary placeholder:text-text-muted transition-colors w-full'
              )}
            />
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-text-secondary">
              <input
                type="text"
                value={identificacao.raca}
                placeholder="Raça"
                aria-label="Raça"
                onChange={(e) => setIdentificacao({ raca: e.target.value })}
                className="bg-transparent border-b border-transparent hover:border-border-subtle focus:border-accent focus:outline-none w-24 text-sm"
              />
              {identificacao.subRaca && (
                <>
                  <span className="text-text-muted">·</span>
                  <input
                    type="text"
                    value={identificacao.subRaca}
                    placeholder="Sub-raça"
                    aria-label="Sub-raça"
                    onChange={(e) =>
                      setIdentificacao({ subRaca: e.target.value })
                    }
                    className="bg-transparent border-b border-transparent hover:border-border-subtle focus:border-accent focus:outline-none w-24 text-sm"
                  />
                </>
              )}
              <span className="text-text-muted">·</span>
              <input
                type="text"
                value={identificacao.classe}
                placeholder="Classe"
                aria-label="Classe"
                onChange={(e) => {
                  const classe = e.target.value;
                  const dadoDeVida =
                    DADO_DE_VIDA_POR_CLASSE[classe] ?? combate.dadoDeVida;
                  setIdentificacao({ classe });
                  setCombate({ dadoDeVida });
                }}
                className="bg-transparent border-b border-transparent hover:border-border-subtle focus:border-accent focus:outline-none w-24 text-sm"
              />
              <span className="text-text-muted">·</span>
              <span>Nível</span>
              <input
                type="number"
                value={identificacao.nivel}
                min={1}
                max={20}
                aria-label="Nível"
                onChange={(e) => {
                  const nivel = parseInt(e.target.value, 10);
                  if (!isNaN(nivel) && nivel >= 1 && nivel <= 20)
                    setIdentificacao({ nivel });
                }}
                className="bg-transparent border-b border-transparent hover:border-border-subtle focus:border-accent focus:outline-none w-10 text-sm text-center"
              />
            </div>

            <div className="mt-1">
              <XpProgressBar xp={identificacao.xp} nivel={identificacao.nivel} />
            </div>
          </div>

          {/* Inspiração */}
          <button
            type="button"
            role="switch"
            aria-checked={identificacao.inspiracao}
            aria-label="Inspiração"
            onClick={() =>
              setIdentificacao({ inspiracao: !identificacao.inspiracao })
            }
            className={cn(
              'flex flex-col items-center gap-1 px-4 py-2 rounded-lg border-2 transition-all duration-150',
              'text-xs font-semibold uppercase tracking-wide',
              identificacao.inspiracao
                ? 'border-accent bg-accent-subtle text-accent'
                : 'border-border-subtle text-text-muted hover:border-border-default'
            )}
          >
            <span className="text-lg" aria-hidden="true">
              {identificacao.inspiracao ? '★' : '☆'}
            </span>
            Inspiração
          </button>
        </div>
      </section>

      {/* ─── Bônus de Proficiência ─────────────────────────────── */}
      <Card variant="accent" className="flex items-center gap-4 py-3">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-accent">{formatModificador(bp)}</span>
          <span className="text-xs text-text-secondary uppercase tracking-wide">
            Bônus de Proficiência
          </span>
        </div>
        <div className="text-xs text-text-muted">
          Baseado no nível {identificacao.nivel}
        </div>
      </Card>

      {/* ─── Grid de Atributos ─────────────────────────────────── */}
      <section aria-labelledby="atributos-heading">
        <h2
          id="atributos-heading"
          className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3"
        >
          Atributos
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" role="list">
          {ATRIBUTOS_ORDEM.map((atributo) => (
            <div key={atributo} role="listitem">
              <AtributoCard nome={atributo} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Estatísticas de Combate ───────────────────────────── */}
      <section aria-labelledby="combate-heading">
        <h2
          id="combate-heading"
          className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3"
        >
          Combate
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* CA */}
          <Card>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-text-secondary uppercase">CA</span>
              <input
                type="number"
                value={combate.classeArmadura}
                min={0}
                max={30}
                aria-label="Classe de armadura"
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v)) setCombate({ classeArmadura: v });
                }}
                className="w-16 text-center text-2xl font-bold bg-transparent border-b border-border-default focus:border-accent focus:outline-none text-text-primary"
              />
            </div>
          </Card>

          {/* Iniciativa */}
          <Card>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-text-secondary uppercase">Iniciativa</span>
              <span className="text-2xl font-bold text-text-primary">
                {formatModificador(iniciativa)}
              </span>
              <span className="text-xs text-text-muted">(auto)</span>
            </div>
          </Card>

          {/* Deslocamento */}
          <Card>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-text-secondary uppercase">Deslocamento</span>
              <div className="flex items-baseline gap-1">
                <input
                  type="number"
                  value={combate.deslocamento}
                  min={0}
                  max={20}
                  aria-label="Deslocamento em quadrados"
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v)) setCombate({ deslocamento: v });
                  }}
                  className="w-12 text-center text-2xl font-bold bg-transparent border-b border-border-default focus:border-accent focus:outline-none text-text-primary"
                />
                <span className="text-xs text-text-muted">quad</span>
              </div>
            </div>
          </Card>

          {/* Dados de vida */}
          <Card>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-text-secondary uppercase">Dados de Vida</span>
              <div className="flex items-baseline gap-1">
                <input
                  type="number"
                  value={combate.dadosDeVidaDisponiveis}
                  min={0}
                  max={20}
                  aria-label="Dados de vida disponíveis"
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v))
                      setCombate({ dadosDeVidaDisponiveis: v });
                  }}
                  className="w-10 text-center text-2xl font-bold bg-transparent border-b border-border-default focus:border-accent focus:outline-none text-text-primary"
                />
                <span className="text-sm font-semibold text-accent">
                  {combate.dadoDeVida}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ─── PV + Testes de Resistência + Testes de Morte ──────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card>
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">
            Pontos de Vida
          </h2>
          <BarraVida />
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">
              Testes de Resistência
            </h2>
            <TestesResistenciaList />
          </Card>

          <Card>
            <TestesMorte />
          </Card>
        </div>
      </div>
    </div>
  );
}
