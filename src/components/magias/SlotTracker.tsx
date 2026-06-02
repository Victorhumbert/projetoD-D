'use client';

import { useCharacterStore } from '@/store';
import { cn } from '@/lib/utils';
import type { NivelMagia } from '@/types/character';

const NIVEIS: NivelMagia[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Tracker de slots de magia: níveis 1-9 com círculos clicáveis.
 * Cheio = disponível (âmbar), vazio = usado (cinza).
 * Inclui seção especial para Slots do Pacto (Bruxo).
 */
export function SlotTracker() {
  const slots = useCharacterStore((s) => s.magias.slots);
  const slotsPacto = useCharacterStore((s) => s.magias.slotsPacto);
  const usarSlot = useCharacterStore((s) => s.usarSlot);
  const recuperarSlot = useCharacterStore((s) => s.recuperarSlot);
  const recuperarTodosSlots = useCharacterStore((s) => s.recuperarTodosSlots);
  const usarSlotPacto = useCharacterStore((s) => s.usarSlotPacto);
  const recuperarSlotsPacto = useCharacterStore((s) => s.recuperarSlotsPacto);

  const niveisAtivos = NIVEIS.filter((n) => slots[n].total > 0);

  if (niveisAtivos.length === 0 && !slotsPacto) {
    return (
      <p className="text-xs text-text-muted italic">
        Sem slots de magia configurados. Ajuste os totais abaixo.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Slots normais */}
      {niveisAtivos.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary uppercase tracking-wide">
              Slots de Magia
            </span>
            <button
              type="button"
              onClick={recuperarTodosSlots}
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
              aria-label="Recuperar todos os slots (descanso longo)"
            >
              Descanso Longo
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {niveisAtivos.map((nivel) => {
              const slot = slots[nivel];
              const disponiveis = slot.total - slot.usados;
              return (
                <div key={nivel} className="flex flex-col items-center gap-1">
                  <span className="text-xs text-text-muted">{nivel}°</span>
                  <div
                    role="group"
                    aria-label={`Slots de nível ${nivel}: ${disponiveis} de ${slot.total} disponíveis`}
                    className="flex gap-1"
                  >
                    {Array.from({ length: slot.total }, (_, i) => {
                      const isDisponivel = i < disponiveis;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            isDisponivel
                              ? usarSlot(nivel)
                              : recuperarSlot(nivel)
                          }
                          aria-label={`Slot ${nivel}° ${i + 1}: ${isDisponivel ? 'usar' : 'recuperar'}`}
                          className={cn(
                            'h-5 w-5 rounded-full border-2 transition-all duration-150 hover:scale-110',
                            'focus-visible:outline-2 focus-visible:outline-accent',
                            isDisponivel
                              ? 'bg-accent border-accent'
                              : 'bg-bg-overlay border-border-subtle'
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Slots do Pacto — caso especial Bruxo */}
      {slotsPacto && (
        <div className="flex flex-col gap-2 p-3 rounded-lg border border-info/40 bg-info/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-info uppercase tracking-wide">
                Slots do Pacto
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-info/20 text-info font-medium">
                Nível {slotsPacto.nivel}
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-info/10 text-info border border-info/30">
                Descanso Curto
              </span>
            </div>
            <button
              type="button"
              onClick={recuperarSlotsPacto}
              className="text-xs text-info/70 hover:text-info transition-colors"
              aria-label="Recuperar slots do pacto (descanso curto)"
            >
              Recuperar
            </button>
          </div>

          <div
            role="group"
            aria-label={`Slots do Pacto: ${slotsPacto.total - slotsPacto.usados} de ${slotsPacto.total} disponíveis`}
            className="flex gap-1.5"
          >
            {Array.from({ length: slotsPacto.total }, (_, i) => {
              const isDisponivel = i < slotsPacto.total - slotsPacto.usados;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    isDisponivel ? usarSlotPacto() : recuperarSlotsPacto()
                  }
                  aria-label={`Slot do Pacto ${i + 1}: ${isDisponivel ? 'usar' : 'recuperar'}`}
                  className={cn(
                    'h-5 w-5 rounded-full border-2 transition-all duration-150 hover:scale-110',
                    'focus-visible:outline-2 focus-visible:outline-accent',
                    isDisponivel
                      ? 'bg-info border-info'
                      : 'bg-bg-overlay border-border-subtle'
                  )}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
