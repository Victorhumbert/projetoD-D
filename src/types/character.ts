export type AtributoNome =
  | 'forca'
  | 'destreza'
  | 'constituicao'
  | 'inteligencia'
  | 'sabedoria'
  | 'carisma';

export type PericiaNome =
  | 'acrobacia'
  | 'arcanismo'
  | 'atletismo'
  | 'atuacao'
  | 'enganacao'
  | 'furtividade'
  | 'historia'
  | 'intimidacao'
  | 'intuicao'
  | 'investigacao'
  | 'lidarComAnimais'
  | 'medicina'
  | 'natureza'
  | 'percepcao'
  | 'persuasao'
  | 'prestidigitacao'
  | 'religiao'
  | 'sobrevivencia';

export type NivelMagia = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type DadoDeVida = 'd6' | 'd8' | 'd10' | 'd12';
export type RecuperaEm =
  | 'descanso_curto'
  | 'descanso_longo'
  | 'amanhecer'
  | 'nunca';

export interface BonusRacaEscolhidos {
  atributos: AtributoNome[];
  pericias: PericiaNome[];
}

export interface Identificacao {
  nome: string;
  raca: string;
  subRaca?: string;
  classe: string;
  subclasse?: string;
  nivel: number;
  antecedente: string;
  xp: number;
  inspiracao: boolean;
  bonusRacaEscolhidos?: BonusRacaEscolhidos;
}

export interface Combate {
  dadoDeVida: DadoDeVida;
  dadosDeVidaDisponiveis: number;
  pontosVidaMax: number;
  pontosVidaAtual: number;
  pontosVidaTemporarios: number;
  classeArmadura: number;
  deslocamento: number;
}

export interface TestesMorte {
  sucessos: 0 | 1 | 2 | 3;
  falhas: 0 | 1 | 2 | 3;
}

export interface AtributoBruto {
  valor: number;
}
export type Atributos = Record<AtributoNome, AtributoBruto>;
export type TestesResistencia = Record<
  AtributoNome,
  { proficiente: boolean }
>;

export interface Pericia {
  proficiente: boolean;
  especialidade?: boolean;
  atributo: AtributoNome;
}
export type Pericias = Record<PericiaNome, Pericia>;

export interface SlotsMagia {
  total: number;
  usados: number;
}

export interface MagiaConhecida {
  id: string;
  nome: string;
  nivel: 0 | NivelMagia;
  preparada: boolean;
  descricao?: string;
}

export interface Magias {
  atributoConjuracao: AtributoNome | null;
  slots: Record<NivelMagia, SlotsMagia>;
  slotsPacto: {
    nivel: NivelMagia;
    total: number;
    usados: number;
  } | null;
  magiasConhecidas: MagiaConhecida[];
}

export interface Habilidade {
  id: string;
  nome: string;
  descricao: string;
  usosMaximos: number | null;
  usosAtuais: number;
  recuperaEm: RecuperaEm;
}

export interface ItemInventario {
  id: string;
  nome: string;
  quantidade: number;
  pesoKg: number;
  equipado: boolean;
  descricao?: string;
  categoria?: string;
}

export type QuestTipo = 'principal' | 'sidequest';
export type QuestStatus = 'ativa' | 'concluida' | 'falhou';

export interface Quest {
  id: string;
  titulo: string;
  descricao?: string;
  tipo: QuestTipo;
  status: QuestStatus;
  local?: string;
  recompensa?: string;
  recompensa_indefinida: boolean;
}

export interface Missoes {
  locais: string[];
  quests: Quest[];
}

export interface Carteira {
  cobre: number;
  prata: number;
  electrum: number;
  ouro: number;
  platina: number;
}

export interface Character {
  id: string;
  versaoSchema: number;
  identificacao: Identificacao;
  combate: Combate;
  testesMorte: TestesMorte;
  atributos: Atributos;
  testesResistencia: TestesResistencia;
  pericias: Pericias;
  magias: Magias;
  habilidades: Habilidade[];
  inventario: ItemInventario[];
  carteira: Carteira;
  missoes: Missoes;
  atualizadoEm: string;
}
