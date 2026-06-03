/** Tabela de slots: chave = nível da magia, valor = quantidade de slots */
export type SpellSlotTable = { [spellLevel: number]: number };

export type WarlockEntry = {
  quantidade: number;
  nivel_slot: number;
  invocacoes_conhecidas: number;
  magias_conhecidas: number;
};

// Full Casters — Mago, Clérigo, Bardo, Druida, Feiticeiro
export const SLOTS_FULL_CASTER: Record<number, SpellSlotTable> = {
  1:  { 1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  2:  { 1: 3, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  3:  { 1: 4, 2: 2, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  4:  { 1: 4, 2: 3, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  5:  { 1: 4, 2: 3, 3: 2, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  6:  { 1: 4, 2: 3, 3: 3, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  7:  { 1: 4, 2: 3, 3: 3, 4: 1, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  8:  { 1: 4, 2: 3, 3: 3, 4: 2, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  9:  { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0 },
  10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 0, 7: 0, 8: 0, 9: 0 },
  11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 0, 8: 0, 9: 0 },
  12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 0, 8: 0, 9: 0 },
  13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 0, 9: 0 },
  14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 0, 9: 0 },
  15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 0 },
  16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 0 },
  17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
};

// Half Casters — Paladino, Patrulheiro
export const SLOTS_HALF_CASTER: Record<number, SpellSlotTable> = {
  1:  { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  2:  { 1: 2, 2: 0, 3: 0, 4: 0, 5: 0 },
  3:  { 1: 3, 2: 0, 3: 0, 4: 0, 5: 0 },
  4:  { 1: 3, 2: 0, 3: 0, 4: 0, 5: 0 },
  5:  { 1: 4, 2: 2, 3: 0, 4: 0, 5: 0 },
  6:  { 1: 4, 2: 2, 3: 0, 4: 0, 5: 0 },
  7:  { 1: 4, 2: 3, 3: 0, 4: 0, 5: 0 },
  8:  { 1: 4, 2: 3, 3: 0, 4: 0, 5: 0 },
  9:  { 1: 4, 2: 3, 3: 2, 4: 0, 5: 0 },
  10: { 1: 4, 2: 3, 3: 2, 4: 0, 5: 0 },
  11: { 1: 4, 2: 3, 3: 3, 4: 0, 5: 0 },
  12: { 1: 4, 2: 3, 3: 3, 4: 0, 5: 0 },
  13: { 1: 4, 2: 3, 3: 3, 4: 1, 5: 0 },
  14: { 1: 4, 2: 3, 3: 3, 4: 1, 5: 0 },
  15: { 1: 4, 2: 3, 3: 3, 4: 2, 5: 0 },
  16: { 1: 4, 2: 3, 3: 3, 4: 2, 5: 0 },
  17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
};

// 1/3 Caster — Cavaleiro Arcano (subclasse de Guerreiro), começa no nível 3
export const SLOTS_ELDRITCH_KNIGHT: Record<number, SpellSlotTable> = {
  3:  { 1: 2, 2: 0, 3: 0, 4: 0 },
  4:  { 1: 3, 2: 0, 3: 0, 4: 0 },
  5:  { 1: 3, 2: 0, 3: 0, 4: 0 },
  6:  { 1: 3, 2: 0, 3: 0, 4: 0 },
  7:  { 1: 4, 2: 2, 3: 0, 4: 0 },
  8:  { 1: 4, 2: 2, 3: 0, 4: 0 },
  9:  { 1: 4, 2: 2, 3: 0, 4: 0 },
  10: { 1: 4, 2: 3, 3: 0, 4: 0 },
  11: { 1: 4, 2: 3, 3: 0, 4: 0 },
  12: { 1: 4, 2: 3, 3: 0, 4: 0 },
  13: { 1: 4, 2: 3, 3: 2, 4: 0 },
  14: { 1: 4, 2: 3, 3: 2, 4: 0 },
  15: { 1: 4, 2: 3, 3: 2, 4: 0 },
  16: { 1: 4, 2: 3, 3: 3, 4: 0 },
  17: { 1: 4, 2: 3, 3: 3, 4: 0 },
  18: { 1: 4, 2: 3, 3: 3, 4: 0 },
  19: { 1: 4, 2: 3, 3: 3, 4: 1 },
  20: { 1: 4, 2: 3, 3: 3, 4: 1 },
};

// 1/3 Caster — Trapaceiro Arcano (subclasse de Ladino), começa no nível 3
export const SLOTS_ARCANE_TRICKSTER: Record<number, SpellSlotTable> = {
  3:  { 1: 2, 2: 0, 3: 0, 4: 0 },
  4:  { 1: 3, 2: 0, 3: 0, 4: 0 },
  5:  { 1: 3, 2: 0, 3: 0, 4: 0 },
  6:  { 1: 3, 2: 0, 3: 0, 4: 0 },
  7:  { 1: 4, 2: 2, 3: 0, 4: 0 },
  8:  { 1: 4, 2: 2, 3: 0, 4: 0 },
  9:  { 1: 4, 2: 2, 3: 0, 4: 0 },
  10: { 1: 4, 2: 3, 3: 0, 4: 0 },
  11: { 1: 4, 2: 3, 3: 0, 4: 0 },
  12: { 1: 4, 2: 3, 3: 0, 4: 0 },
  13: { 1: 4, 2: 3, 3: 2, 4: 0 },
  14: { 1: 4, 2: 3, 3: 2, 4: 0 },
  15: { 1: 4, 2: 3, 3: 2, 4: 0 },
  16: { 1: 4, 2: 3, 3: 3, 4: 0 },
  17: { 1: 4, 2: 3, 3: 3, 4: 0 },
  18: { 1: 4, 2: 3, 3: 3, 4: 0 },
  19: { 1: 4, 2: 3, 3: 3, 4: 1 },
  20: { 1: 4, 2: 3, 3: 3, 4: 1 },
};

// Bruxo — sistema especial de Slots do Pacto (recupera em descanso curto)
export const SLOTS_WARLOCK: Record<number, WarlockEntry> = {
  1:  { quantidade: 1, nivel_slot: 1, invocacoes_conhecidas: 0, magias_conhecidas: 2  },
  2:  { quantidade: 2, nivel_slot: 1, invocacoes_conhecidas: 2, magias_conhecidas: 3  },
  3:  { quantidade: 2, nivel_slot: 2, invocacoes_conhecidas: 2, magias_conhecidas: 4  },
  4:  { quantidade: 2, nivel_slot: 2, invocacoes_conhecidas: 2, magias_conhecidas: 5  },
  5:  { quantidade: 2, nivel_slot: 3, invocacoes_conhecidas: 3, magias_conhecidas: 6  },
  6:  { quantidade: 2, nivel_slot: 3, invocacoes_conhecidas: 3, magias_conhecidas: 7  },
  7:  { quantidade: 2, nivel_slot: 4, invocacoes_conhecidas: 4, magias_conhecidas: 8  },
  8:  { quantidade: 2, nivel_slot: 4, invocacoes_conhecidas: 4, magias_conhecidas: 9  },
  9:  { quantidade: 2, nivel_slot: 5, invocacoes_conhecidas: 5, magias_conhecidas: 10 },
  10: { quantidade: 2, nivel_slot: 5, invocacoes_conhecidas: 5, magias_conhecidas: 10 },
  11: { quantidade: 3, nivel_slot: 5, invocacoes_conhecidas: 5, magias_conhecidas: 11 },
  12: { quantidade: 3, nivel_slot: 5, invocacoes_conhecidas: 6, magias_conhecidas: 11 },
  13: { quantidade: 3, nivel_slot: 5, invocacoes_conhecidas: 6, magias_conhecidas: 12 },
  14: { quantidade: 3, nivel_slot: 5, invocacoes_conhecidas: 6, magias_conhecidas: 12 },
  15: { quantidade: 3, nivel_slot: 5, invocacoes_conhecidas: 7, magias_conhecidas: 13 },
  16: { quantidade: 3, nivel_slot: 5, invocacoes_conhecidas: 7, magias_conhecidas: 13 },
  17: { quantidade: 4, nivel_slot: 5, invocacoes_conhecidas: 7, magias_conhecidas: 14 },
  18: { quantidade: 4, nivel_slot: 5, invocacoes_conhecidas: 8, magias_conhecidas: 14 },
  19: { quantidade: 4, nivel_slot: 5, invocacoes_conhecidas: 8, magias_conhecidas: 15 },
  20: { quantidade: 4, nivel_slot: 5, invocacoes_conhecidas: 8, magias_conhecidas: 15 },
};
