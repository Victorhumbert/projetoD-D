import type { AtributoNome } from '@/types/character';

export interface SubRaca {
  id: string;
  nome: string;
  bonusAtributos: Partial<Record<AtributoNome, number>>;
  tracos: string[];
}

export interface Raca {
  id: string;
  nome: string;
  deslocamento: number;
  bonusAtributos: Partial<Record<AtributoNome, number>>;
  tracos: string[];
  subRacas: SubRaca[];
  nota?: string;
}

export const RACAS: Raca[] = [
  {
    id: 'anao',
    nome: 'Anão',
    deslocamento: 7.5,
    bonusAtributos: { constituicao: 2 },
    tracos: [
      'Visão no escuro 18m',
      'Resistência anã (+2 em testes vs veneno)',
      'Proficiência: Machados e martelos de guerra',
    ],
    subRacas: [
      {
        id: 'anao_montanha',
        nome: 'Anão da Montanha',
        bonusAtributos: { forca: 2 },
        tracos: ['Proficiência com armaduras leves e médias'],
      },
      {
        id: 'anao_colina',
        nome: 'Anão da Colina',
        bonusAtributos: { sabedoria: 1 },
        tracos: ['Tenacidade anã: +1 PV por nível'],
      },
    ],
  },
  {
    id: 'elfo',
    nome: 'Elfo',
    deslocamento: 9,
    bonusAtributos: { destreza: 2 },
    tracos: [
      'Visão no escuro 18m',
      'Sentidos aguçados (proficiência em Percepção)',
      'Ancestral feérico (imune a sono mágico)',
      'Transe (meditação 4h substitui sono)',
    ],
    subRacas: [
      {
        id: 'elfo_floresta',
        nome: 'Elfo da Floresta',
        bonusAtributos: { sabedoria: 1 },
        tracos: ['Passo élfico: deslocamento 10,5m', 'Máscara da natureza selvagem'],
      },
      {
        id: 'elfo_sol',
        nome: 'Elfo do Sol (Alto Elfo)',
        bonusAtributos: { inteligencia: 1 },
        tracos: ['Conhece 1 truque do Mago', 'Proficiência em espadas longas e arcos'],
      },
      {
        id: 'drow',
        nome: 'Drow (Elfo Negro)',
        bonusAtributos: { carisma: 1 },
        tracos: ['Visão no escuro superior 36m', 'Sensibilidade à luz solar', 'Magia Drow'],
      },
    ],
  },
  {
    id: 'halfling',
    nome: 'Halfling',
    deslocamento: 7.5,
    bonusAtributos: { destreza: 2 },
    tracos: [
      'Sortudo: rolar 1 novamente em d20',
      'Bravura: vantagem contra medo',
      'Agilidade halfling',
    ],
    subRacas: [
      {
        id: 'halfling_pe_leve',
        nome: 'Pé-Leve',
        bonusAtributos: { carisma: 1 },
        tracos: ['Pode se esconder atrás de criaturas maiores'],
      },
      {
        id: 'halfling_robusto',
        nome: 'Robusto',
        bonusAtributos: { constituicao: 1 },
        tracos: ['Vantagem contra veneno, resistência a dano de veneno'],
      },
    ],
  },
  {
    id: 'humano',
    nome: 'Humano',
    deslocamento: 9,
    bonusAtributos: {
      forca: 1,
      destreza: 1,
      constituicao: 1,
      inteligencia: 1,
      sabedoria: 1,
      carisma: 1,
    },
    tracos: ['Bônus +1 em todos os atributos', '1 idioma extra à escolha'],
    subRacas: [],
  },
  {
    id: 'draconato',
    nome: 'Draconato',
    deslocamento: 9,
    bonusAtributos: { forca: 2, carisma: 1 },
    tracos: [
      'Sopro dracônico (dano em área)',
      'Resistência ao tipo de dano da linhagem',
    ],
    subRacas: [],
    nota: 'Escolher linhagem dracônica ao criar',
  },
  {
    id: 'gnomo',
    nome: 'Gnomo',
    deslocamento: 7.5,
    bonusAtributos: { inteligencia: 2 },
    tracos: [
      'Visão no escuro 18m',
      'Astúcia gnômica: vantagem em testes de resistência vs magia',
    ],
    subRacas: [
      {
        id: 'gnomo_floresta',
        nome: 'Gnomo da Floresta',
        bonusAtributos: { destreza: 1 },
        tracos: ['Truque Minor Illusion', 'Falar com pequenos animais'],
      },
      {
        id: 'gnomo_rocha',
        nome: 'Gnomo da Rocha',
        bonusAtributos: { constituicao: 1 },
        tracos: ['Proficiência dupla em Ferramentas de Artesão'],
      },
    ],
  },
  {
    id: 'meio_elfo',
    nome: 'Meio-Elfo',
    deslocamento: 9,
    bonusAtributos: { carisma: 2 },
    tracos: [
      'Bônus +1 em 2 atributos à escolha (exceto Carisma)',
      'Visão no escuro 18m',
      'Proficiência em 2 perícias à escolha',
      'Imune a sono mágico',
    ],
    subRacas: [],
  },
  {
    id: 'meio_orc',
    nome: 'Meio-Orc',
    deslocamento: 9,
    bonusAtributos: { forca: 2, constituicao: 1 },
    tracos: [
      'Visão no escuro 18m',
      'Proficiência em Intimidação',
      'Resistência implacável: ficar com 1 PV ao invés de 0 (1x/desc. longo)',
      'Ataques selvagens: dano extra no crítico',
    ],
    subRacas: [],
  },
  {
    id: 'tiefling',
    nome: 'Tiefling',
    deslocamento: 9,
    bonusAtributos: { inteligencia: 1, carisma: 2 },
    tracos: [
      'Visão no escuro 18m',
      'Resistência a dano de fogo',
      'Legado infernal: Thaumaturgy, Hellish Rebuke (nível 3), Darkness (nível 5)',
    ],
    subRacas: [],
  },
];
