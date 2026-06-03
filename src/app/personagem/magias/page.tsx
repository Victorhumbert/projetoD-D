'use client';

import { useState } from 'react';
import { useCharacterStore } from '@/store';
import { useCharacter } from '@/hooks/useCharacter';
import { useHydration } from '@/hooks/useHydration';
import { SlotTracker } from '@/components/magias/SlotTracker';
import { SlotConfig } from '@/components/magias/SlotConfig';
import { SpellCard } from '@/components/magias/SpellCard';
import { HabilidadeCard } from '@/components/magias/HabilidadeCard';
import { AddMagiaForm } from '@/components/magias/AddMagiaForm';
import { AddHabilidadeForm } from '@/components/magias/AddHabilidadeForm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ATRIBUTOS_CONFIG } from '@/domain/constants';
import {
  calcCdMagia,
  calcBonusAtaqueMagia,
  formatModificador,
} from '@/domain/calc';
import type { MagiaConhecida, Habilidade } from '@/types/character';

export default function MagiasPage() {
  const hydrated = useHydration();

  const [modalMagia, setModalMagia] = useState(false);
  const [editingMagia, setEditingMagia] = useState<MagiaConhecida | null>(null);
  const [modalHabilidade, setModalHabilidade] = useState(false);
  const [editingHabilidade, setEditingHabilidade] = useState<Habilidade | null>(null);
  const [spellsColapsed, setSpellsColapsed] = useState<Record<string, boolean>>({});

  const character = useCharacter();

  const atributoConjuracao = useCharacterStore((s) => s.magias.atributoConjuracao);
  const magiasConhecidas = useCharacterStore((s) => s.magias.magiasConhecidas);
  const habilidades = useCharacterStore((s) => s.habilidades);
  const addMagia = useCharacterStore((s) => s.addMagia);
  const updateMagia = useCharacterStore((s) => s.updateMagia);
  const addHabilidade = useCharacterStore((s) => s.addHabilidade);
  const updateHabilidade = useCharacterStore((s) => s.updateHabilidade);

  const cdMagia = calcCdMagia(character);
  const bonusAtaque = calcBonusAtaqueMagia(character);

  const truques = magiasConhecidas.filter((m) => m.nivel === 0);
  const porNivel = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce<Record<number, MagiaConhecida[]>>(
    (acc, n) => {
      const grupo = magiasConhecidas.filter((m) => m.nivel === n);
      if (grupo.length > 0) acc[n] = grupo;
      return acc;
    },
    {}
  );

  const toggleNivel = (nivel: string) => {
    setSpellsColapsed((prev) => ({ ...prev, [nivel]: !prev[nivel] }));
  };

  const handleEditMagia = (m: MagiaConhecida) => {
    setEditingMagia(m);
    setModalMagia(true);
  };

  const handleSaveMagia = (m: MagiaConhecida) => {
    if (editingMagia) {
      updateMagia(m.id, m);
    } else {
      addMagia(m);
    }
    setModalMagia(false);
    setEditingMagia(null);
  };

  const handleEditHabilidade = (h: Habilidade) => {
    setEditingHabilidade(h);
    setModalHabilidade(true);
  };

  const handleSaveHabilidade = (h: Habilidade) => {
    if (editingHabilidade) {
      updateHabilidade(h.id, h);
    } else {
      addHabilidade(h);
    }
    setModalHabilidade(false);
    setEditingHabilidade(null);
  };

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

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Bloco de Conjuração ──────────────────────────── */}
      {atributoConjuracao && (
        <Card variant="accent">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-accent">
                {cdMagia ?? '—'}
              </span>
              <span className="text-xs text-text-secondary uppercase tracking-wide">
                CD de Magia
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-accent">
                {bonusAtaque !== null ? formatModificador(bonusAtaque) : '—'}
              </span>
              <span className="text-xs text-text-secondary uppercase tracking-wide">
                Bônus de Ataque
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold text-text-primary">
                {ATRIBUTOS_CONFIG[atributoConjuracao].label}
              </span>
              <span className="text-xs text-text-secondary uppercase tracking-wide">
                Atributo Conjuração
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* ─── Tracker de Slots ─────────────────────────────── */}
      <section aria-labelledby="slots-heading">
        <h2
          id="slots-heading"
          className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3"
        >
          Slots de Magia
        </h2>
        <SlotTracker />
      </section>

      {/* Configuração */}
      <SlotConfig />

      {/* ─── Magias Conhecidas ───────────────────────────── */}
      <section aria-labelledby="magias-heading">
        <div className="flex items-center justify-between mb-3">
          <h2
            id="magias-heading"
            className="text-xs font-semibold text-text-secondary uppercase tracking-widest"
          >
            Magias Conhecidas
          </h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => { setEditingMagia(null); setModalMagia(true); }}
          >
            + Adicionar
          </Button>
        </div>

        {magiasConhecidas.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <svg
              width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" className="text-text-muted" aria-hidden="true"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <p className="text-text-secondary text-sm">Nenhuma magia adicionada</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Truques */}
            {truques.length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">
                  Truques
                </h3>
                <div className="flex flex-col gap-1.5">
                  {truques.map((m) => (
                    <SpellCard key={m.id} magia={m} onEdit={handleEditMagia} />
                  ))}
                </div>
              </div>
            )}

            {/* Por nível */}
            {Object.entries(porNivel).map(([nivel, magias]) => {
              const collapsed = spellsColapsed[nivel] ?? false;
              return (
                <div key={nivel}>
                  <button
                    type="button"
                    onClick={() => toggleNivel(nivel)}
                    aria-expanded={!collapsed}
                    className="flex items-center gap-2 w-full text-xs font-medium text-text-muted uppercase tracking-wide mb-2 hover:text-text-secondary transition-colors"
                  >
                    <svg
                      className={`h-3 w-3 transition-transform duration-200 ${collapsed ? '-rotate-90' : ''}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    {nivel}° Nível ({magias.length})
                  </button>
                  {!collapsed && (
                    <div className="flex flex-col gap-1.5">
                      {magias.map((m) => (
                        <SpellCard key={m.id} magia={m} onEdit={handleEditMagia} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── Habilidades de Classe ───────────────────────── */}
      <section aria-labelledby="habilidades-heading">
        <div className="flex items-center justify-between mb-3">
          <h2
            id="habilidades-heading"
            className="text-xs font-semibold text-text-secondary uppercase tracking-widest"
          >
            Habilidades de Classe
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setEditingHabilidade(null); setModalHabilidade(true); }}
          >
            + Adicionar
          </Button>
        </div>

        {habilidades.length === 0 ? (
          <p className="text-sm text-text-muted italic">
            Nenhuma habilidade adicionada.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {habilidades.map((h) => (
              <HabilidadeCard key={h.id} habilidade={h} onEdit={handleEditHabilidade} />
            ))}
          </div>
        )}
      </section>

      {/* Modais */}
      <Modal
        open={modalMagia}
        onClose={() => { setModalMagia(false); setEditingMagia(null); }}
        title={editingMagia ? 'Editar Magia' : 'Adicionar Magia'}
      >
        <AddMagiaForm
          initial={editingMagia ?? undefined}
          onSave={handleSaveMagia}
          onCancel={() => { setModalMagia(false); setEditingMagia(null); }}
        />
      </Modal>

      <Modal
        open={modalHabilidade}
        onClose={() => { setModalHabilidade(false); setEditingHabilidade(null); }}
        title={editingHabilidade ? 'Editar Habilidade' : 'Adicionar Habilidade'}
      >
        <AddHabilidadeForm
          initial={editingHabilidade ?? undefined}
          onSave={handleSaveHabilidade}
          onCancel={() => { setModalHabilidade(false); setEditingHabilidade(null); }}
        />
      </Modal>
    </div>
  );
}
