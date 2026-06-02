import type { AtributoNome, PericiaNome, DadoDeVida } from '@/types/character';

export const PERICIAS_CONFIG: Record<
  PericiaNome,
  { label: string; atributo: AtributoNome }
> = {
  acrobacia: { label: 'Acrobacia', atributo: 'destreza' },
  arcanismo: { label: 'Arcanismo', atributo: 'inteligencia' },
  atletismo: { label: 'Atletismo', atributo: 'forca' },
  atuacao: { label: 'Atuação', atributo: 'carisma' },
  enganacao: { label: 'Enganação', atributo: 'carisma' },
  furtividade: { label: 'Furtividade', atributo: 'destreza' },
  historia: { label: 'História', atributo: 'inteligencia' },
  intimidacao: { label: 'Intimidação', atributo: 'carisma' },
  intuicao: { label: 'Intuição', atributo: 'sabedoria' },
  investigacao: { label: 'Investigação', atributo: 'inteligencia' },
  lidarComAnimais: { label: 'Lidar com Animais', atributo: 'sabedoria' },
  medicina: { label: 'Medicina', atributo: 'sabedoria' },
  natureza: { label: 'Natureza', atributo: 'inteligencia' },
  percepcao: { label: 'Percepção', atributo: 'sabedoria' },
  persuasao: { label: 'Persuasão', atributo: 'carisma' },
  prestidigitacao: { label: 'Prestidigitação', atributo: 'destreza' },
  religiao: { label: 'Religião', atributo: 'inteligencia' },
  sobrevivencia: { label: 'Sobrevivência', atributo: 'sabedoria' },
};

export const ATRIBUTOS_CONFIG: Record<
  AtributoNome,
  { label: string; sigla: string }
> = {
  forca: { label: 'Força', sigla: 'FOR' },
  destreza: { label: 'Destreza', sigla: 'DES' },
  constituicao: { label: 'Constituição', sigla: 'CON' },
  inteligencia: { label: 'Inteligência', sigla: 'INT' },
  sabedoria: { label: 'Sabedoria', sigla: 'SAB' },
  carisma: { label: 'Carisma', sigla: 'CAR' },
};

export const ATRIBUTOS_ORDEM: AtributoNome[] = [
  'forca',
  'destreza',
  'constituicao',
  'inteligencia',
  'sabedoria',
  'carisma',
];

export const PERICIAS_ORDEM: PericiaNome[] = [
  'acrobacia',
  'arcanismo',
  'atletismo',
  'atuacao',
  'enganacao',
  'furtividade',
  'historia',
  'intimidacao',
  'intuicao',
  'investigacao',
  'lidarComAnimais',
  'medicina',
  'natureza',
  'percepcao',
  'persuasao',
  'prestidigitacao',
  'religiao',
  'sobrevivencia',
];

export const XP_POR_NIVEL: Record<number, number> = {
  1: 0,
  2: 300,
  3: 900,
  4: 2700,
  5: 6500,
  6: 14000,
  7: 23000,
  8: 34000,
  9: 48000,
  10: 64000,
  11: 85000,
  12: 100000,
  13: 120000,
  14: 140000,
  15: 165000,
  16: 195000,
  17: 225000,
  18: 265000,
  19: 305000,
  20: 355000,
};

export const DADO_DE_VIDA_POR_CLASSE: Record<string, DadoDeVida> = {
  Bárbaro: 'd12',
  Guerreiro: 'd10',
  Paladino: 'd10',
  Patrulheiro: 'd10',
  Bardo: 'd8',
  Clérigo: 'd8',
  Druida: 'd8',
  Ladino: 'd8',
  Monge: 'd8',
  Bruxo: 'd8',
  Feiticeiro: 'd6',
  Mago: 'd6',
};

export const SCHEMA_VERSION = 1;
