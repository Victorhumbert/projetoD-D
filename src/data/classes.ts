import type { AtributoNome, DadoDeVida } from '@/types/character';

export interface CharacterClass {
  id: string;
  nome: string;
  dadoVida: DadoDeVida;
  atributoPrincipal: string;
  testesResistencia: [AtributoNome, AtributoNome];
  proficienciasArmadura: string[];
  proficienciasArma: string[];
  estilo: string;
  pros: string[];
  contras: string[];
  slotsMagia: boolean;
  /** Bruxo: slots do pacto recuperam em descanso curto */
  slotsEspeciais?: boolean;
}

export const CLASSES: CharacterClass[] = [
  {
    id: 'barbaro',
    nome: 'Bárbaro',
    dadoVida: 'd12',
    atributoPrincipal: 'Força',
    testesResistencia: ['forca', 'constituicao'],
    proficienciasArmadura: ['Leve', 'Média', 'Escudos'],
    proficienciasArma: ['Simples', 'Marciais'],
    estilo:
      'Combate corpo a corpo. Fúria concede vantagem em testes de Força e resistência a dano físico.',
    pros: [
      'Maior pool de PV do jogo (d12)',
      'Fúria: resistência a dano físico',
      'CA sem armadura = 10 + Des + Con',
      'Ataques imprudentes garantem vantagem',
    ],
    contras: [
      'Não pode conjurar magias em Fúria',
      'Fúria tem usos limitados',
      'Fraco à distância',
    ],
    slotsMagia: false,
  },
  {
    id: 'bardo',
    nome: 'Bardo',
    dadoVida: 'd8',
    atributoPrincipal: 'Carisma',
    testesResistencia: ['destreza', 'carisma'],
    proficienciasArmadura: ['Leve'],
    proficienciasArma: ['Simples', 'Espada longa', 'Rapieira', 'Arco curto'],
    estilo:
      'Suporte, controle e conjuração. Inspiração bárdica e acesso à lista completa de magias.',
    pros: [
      'Acesso a magias de qualquer classe (Segredos Mágicos)',
      'Inspiração bárdica para aliados',
      'Expertise em perícias',
    ],
    contras: ['d8 — frágil', 'Menos slots inicialmente', 'Depende de Carisma'],
    slotsMagia: true,
  },
  {
    id: 'clerigo',
    nome: 'Clérigo',
    dadoVida: 'd8',
    atributoPrincipal: 'Sabedoria',
    testesResistencia: ['sabedoria', 'carisma'],
    proficienciasArmadura: ['Leve', 'Média', 'Escudos'],
    proficienciasArma: ['Simples'],
    estilo: 'Suporte divino e cura. Domínio define o arquétipo (guerra, vida, luz, etc.).',
    pros: [
      'Melhor curador do jogo',
      'Lista completa de magias divinas',
      'Versátil por domínio',
    ],
    contras: ['Depende de Sabedoria', 'Papel de curador cria expectativas'],
    slotsMagia: true,
  },
  {
    id: 'druida',
    nome: 'Druida',
    dadoVida: 'd8',
    atributoPrincipal: 'Sabedoria',
    testesResistencia: ['inteligencia', 'sabedoria'],
    proficienciasArmadura: ['Leve', 'Média', 'Escudos (não metálicos)'],
    proficienciasArma: ['Clava', 'Adaga', 'Lança', 'Bordão', 'Cimitarra'],
    estilo:
      'Controle de campo, transformação e conjuração. Forma Selvagem permite virar animais.',
    pros: [
      'Forma Selvagem: PV separados',
      'Magias de controle de terreno',
      'Versátil em exploração',
    ],
    contras: ['Sem armadura metálica', 'Complexo de gerenciar', 'Sabedoria é essencial'],
    slotsMagia: true,
  },
  {
    id: 'guerreiro',
    nome: 'Guerreiro',
    dadoVida: 'd10',
    atributoPrincipal: 'Força ou Destreza',
    testesResistencia: ['forca', 'constituicao'],
    proficienciasArmadura: ['Todas as armaduras', 'Escudos'],
    proficienciasArma: ['Simples', 'Marciais'],
    estilo: 'Combate especializado. Surto de Ação: ação extra. Segundo ataque em nível 5.',
    pros: [
      'Usa qualquer armadura e arma',
      'Surto de Ação: dobra ações em turno',
      '3 ataques no nível 5 com Surto',
    ],
    contras: ['Sem magia no subtipo base', 'Menos utilidade fora do combate'],
    slotsMagia: false,
  },
  {
    id: 'monge',
    nome: 'Monge',
    dadoVida: 'd8',
    atributoPrincipal: 'Destreza e Sabedoria',
    testesResistencia: ['forca', 'destreza'],
    proficienciasArmadura: ['Nenhuma'],
    proficienciasArma: ['Simples', 'Espadas curtas'],
    estilo: 'Combate rápido sem armadura. Ki alimenta habilidades. CA = 10 + Des + Sab.',
    pros: [
      'Movimento extra progressivo',
      'Ataques desarmados escalam',
      'Stunning Strike',
      'Evasão',
    ],
    contras: [
      'Ki limitado nos níveis iniciais',
      'Fraco em dano bruto',
      'Dois atributos dependentes',
    ],
    slotsMagia: false,
  },
  {
    id: 'paladino',
    nome: 'Paladino',
    dadoVida: 'd10',
    atributoPrincipal: 'Força e Carisma',
    testesResistencia: ['sabedoria', 'carisma'],
    proficienciasArmadura: ['Todas as armaduras', 'Escudos'],
    proficienciasArma: ['Simples', 'Marciais'],
    estilo: 'Tanque sagrado. Divine Smite converte slots em dano. Imposição de Mãos cura PV.',
    pros: [
      'Divine Smite: dano explosivo com slots',
      'Aura de Proteção (nível 6)',
      'Armadura pesada + magias',
    ],
    contras: [
      'Requer Força e Carisma altos',
      'Conjurador de meio-período',
      'Juramento impõe restrições',
    ],
    slotsMagia: true,
  },
  {
    id: 'patrulheiro',
    nome: 'Patrulheiro',
    dadoVida: 'd10',
    atributoPrincipal: 'Destreza e Sabedoria',
    testesResistencia: ['forca', 'destreza'],
    proficienciasArmadura: ['Leve', 'Média', 'Escudos'],
    proficienciasArma: ['Simples', 'Marciais'],
    estilo: 'Caçador e rastreador. Inimigo e terreno favorito. Acesso a magias.',
    pros: [
      'Melhor explorador',
      'Dupla arma e arqueiro são builds de alto dano',
      'Magias de utilidade',
    ],
    contras: [
      'Inimigo favorito situacional',
      'Conjurador de meio-período',
      'Depende de Des e Sab',
    ],
    slotsMagia: true,
  },
  {
    id: 'ladino',
    nome: 'Ladino',
    dadoVida: 'd8',
    atributoPrincipal: 'Destreza',
    testesResistencia: ['destreza', 'inteligencia'],
    proficienciasArmadura: ['Leve'],
    proficienciasArma: ['Simples', 'Besta de mão', 'Espada longa', 'Rapieira'],
    estilo: 'Dano single-target com Ataque Furtivo. Expertise dobra bônus em perícias.',
    pros: [
      'Ataque Furtivo escalável (até 10d6)',
      'Expertise: dobrar bônus de proficiência',
      'Ação Ardilosa: reposicionar como bônus',
    ],
    contras: ['Apenas 1 ataque por turno', 'd8 — frágil', 'Depende de posicionamento'],
    slotsMagia: false,
  },
  {
    id: 'feiticeiro',
    nome: 'Feiticeiro',
    dadoVida: 'd6',
    atributoPrincipal: 'Carisma',
    testesResistencia: ['constituicao', 'carisma'],
    proficienciasArmadura: ['Nenhuma'],
    proficienciasArma: ['Adaga', 'Dardo', 'Bordão', 'Besta leve'],
    estilo: 'Poder bruto. Metamagia e Pontos de Feitiçaria modificam magias.',
    pros: [
      'Metamagia: ampliar, gêmear, empoderar magias',
      'Pontos de Feitiçaria: slots extras',
      'Melhor DPS de magia com Twinned Spell',
    ],
    contras: ['Menor lista de magias', 'd6 — extremamente frágil', 'Magias fixas, sem preparar'],
    slotsMagia: true,
  },
  {
    id: 'bruxo',
    nome: 'Bruxo',
    dadoVida: 'd8',
    atributoPrincipal: 'Carisma',
    testesResistencia: ['sabedoria', 'carisma'],
    proficienciasArmadura: ['Leve'],
    proficienciasArma: ['Simples'],
    estilo:
      'ATENÇÃO — Slots do Pacto recuperam em DESCANSO CURTO. Poucos slots, todos do mesmo nível.',
    pros: [
      'Eldritch Blast escalável',
      'Slots recuperam em descanso CURTO',
      'Invocações: personalização extrema',
    ],
    contras: ['1–4 slots apenas', 'Lista de magias pequena', 'Fraco sem descansos curtos frequentes'],
    slotsMagia: true,
    slotsEspeciais: true,
  },
  {
    id: 'mago',
    nome: 'Mago',
    dadoVida: 'd6',
    atributoPrincipal: 'Inteligência',
    testesResistencia: ['inteligencia', 'sabedoria'],
    proficienciasArmadura: ['Nenhuma'],
    proficienciasArma: ['Adaga', 'Dardo', 'Bordão', 'Besta leve'],
    estilo: 'Conjurador mais versátil. Aprende magias de grimórios. Prepara diariamente.',
    pros: [
      'Maior lista de magias do jogo',
      'Copia magias encontradas na aventura',
      'Arcane Recovery: slots em descanso curto',
    ],
    contras: ['d6 — o mais frágil', 'Sem armadura', 'Totalmente dependente de Inteligência'],
    slotsMagia: true,
  },
];

/** Nomes das classes que NÃO possuem magia de slots. */
export const CLASSES_SEM_MAGIA = new Set(
  CLASSES.filter((c) => !c.slotsMagia).map((c) => c.nome)
);
