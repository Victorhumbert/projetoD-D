import type { AtributoNome, DadoDeVida } from '@/types/character';

export interface Subclasse {
  id: string;
  nome: string;
  descricao: string;
  slots_magia?: boolean;
  tipo_conjurador?: 'third' | null;
  atributo_conjuracao?: 'inteligencia' | null;
  restricao_escolas?: string[];
}

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
  tipo_conjurador: 'full' | 'half' | 'warlock' | null;
  atributo_conjuracao: 'inteligencia' | 'sabedoria' | 'carisma' | null;
  /** Bruxo: slots do pacto recuperam em descanso curto */
  slotsEspeciais?: boolean;
  nivel_subclasse: number;
  subclasses: Subclasse[];
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
    tipo_conjurador: null,
    atributo_conjuracao: null,
    nivel_subclasse: 3,
    subclasses: [
      { id: 'berserker', nome: 'Caminho do Berserker', descricao: 'Frenesi: ataque bônus cada turno durante Fúria. Mente Intemerata: imunidade a charme/medo durante Fúria.' },
      { id: 'totem', nome: 'Caminho do Guerreiro Totêmico', descricao: 'Espírito totêmico (Urso/Águia/Lobo) concede habilidades passivas únicas. Urso: resistência a quase todo tipo de dano.' },
      { id: 'ancestral', nome: 'Caminho dos Ancestrais Furiosos', descricao: 'Convocar espíritos ancestrais que protegem aliados e prejudicam inimigos.' },
      { id: 'tempestade', nome: 'Caminho da Tempestade Herald', descricao: 'Dano de raio/trovão, voar temporariamente em níveis altos.' },
    ],
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
    tipo_conjurador: 'full',
    atributo_conjuracao: 'carisma',
    nivel_subclasse: 3,
    subclasses: [
      { id: 'lore', nome: 'Colégio do Saber', descricao: 'Segredos Mágicos antecipado (nível 6). Palavras Cortantes: usar Inspiração Bárdica contra inimigos.' },
      { id: 'valor', nome: 'Colégio do Valor', descricao: 'Proficiência em armaduras médias, escudos e armas marciais. Ataque extra no nível 6.' },
      { id: 'espadas', nome: 'Colégio das Espadas', descricao: 'Floreios de Lâmina: manobras de combate usando Inspiração Bárdica. Armadura de scimitar.' },
      { id: 'sussurros', nome: 'Colégio dos Sussurros', descricao: 'Palavras Psíquicas: dano psíquico extra. Roubar persona de humanóide morto.' },
      { id: 'glamour', nome: 'Colégio do Glamour', descricao: 'Inspiração Sedutora: bônus de movimento e ação bônus. Manto de Majestade.' },
    ],
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
    tipo_conjurador: 'full',
    atributo_conjuracao: 'sabedoria',
    nivel_subclasse: 1,
    subclasses: [
      { id: 'vida', nome: 'Domínio da Vida', descricao: 'Melhor curador do jogo. Proficiência em armadura pesada. Bênção do Curandeiro.' },
      { id: 'luz', nome: 'Domínio da Luz', descricao: 'DPS de fogo/radiante. Warding Flare: impor desvantagem em ataque contra você.' },
      { id: 'guerra', nome: 'Domínio da Guerra', descricao: 'Armadura pesada + armas marciais. Ataque de Guerra: bônus em jogadas de ataque.' },
      { id: 'tempestade', nome: 'Domínio da Tempestade', descricao: 'Dano de raio/trovão. Ira da Tempestade: dano automático a atacantes.' },
      { id: 'morte', nome: 'Domínio da Morte', descricao: 'Controle de mortos-vivos. Toque necrótico potenciado. (Geralmente vilões/antiheróis)' },
      { id: 'natureza', nome: 'Domínio da Natureza', descricao: 'Proficiência em armadura pesada. Afinidade com animais e plantas.' },
      { id: 'conhecimento', nome: 'Domínio do Conhecimento', descricao: 'Proficiência e expertise em perícias de conhecimento. Visão Abençoada da Mente.' },
      { id: 'enganacao', nome: 'Domínio do Engano', descricao: 'Duplicata sombria, troca de lugar com cópia ilusória. Bênção do Trapaceiro.' },
    ],
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
    tipo_conjurador: 'full',
    atributo_conjuracao: 'sabedoria',
    nivel_subclasse: 2,
    subclasses: [
      { id: 'lua', nome: 'Círculo da Lua', descricao: 'Forma Selvagem de combate desde nível 2. CR máximo muito superior ao padrão.' },
      { id: 'terra', nome: 'Círculo da Terra', descricao: 'Recuperação Natural: recuperar slots. Magias extras por bioma escolhido.' },
      { id: 'esporos', nome: 'Círculo dos Esporos', descricao: 'Animar mortos com fungos. Halo de Esporos: dano necrótico a adjacentes.' },
      { id: 'sonhos', nome: 'Círculo dos Sonhos', descricao: 'Balm of the Summer Court: cura em pool. Travessia pelo mundo feérico.' },
    ],
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
    tipo_conjurador: null,
    atributo_conjuracao: null,
    nivel_subclasse: 3,
    subclasses: [
      { id: 'campeao', nome: 'Campeão', descricao: 'Crítico em 19–20. Estilo de combate adicional. Simples, mas consistente.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null },
      { id: 'mestre_batalha', nome: 'Mestre de Batalha', descricao: 'Manobras de combate com Dados de Superioridade. Alta versatilidade tática.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null },
      { id: 'cavaleiro_arcano', nome: 'Cavaleiro Arcano', descricao: 'Combina maestria marcial com magia de Mago. Abjuração e Evocação. Vínculo com armas e armadura.', slots_magia: true, tipo_conjurador: 'third', atributo_conjuracao: 'inteligencia', restricao_escolas: ['abjuracao', 'evocacao'] },
      { id: 'arqueiro_arcano', nome: 'Arqueiro Arcano', descricao: 'Flechas mágicas com efeitos especiais. Tiro certeiro para ignorar cobertura.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null },
      { id: 'samurai', nome: 'Samurai', descricao: 'Determinação de Combate: vantagem em todos ataques por 1 turno. Espírito inquebrável.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null },
      { id: 'cavaleiro_runa', nome: 'Cavaleiro de Runas', descricao: 'Runas mágicas em armas/armadura. Crescimento gigante temporário.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null },
    ],
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
    tipo_conjurador: null,
    atributo_conjuracao: null,
    nivel_subclasse: 3,
    subclasses: [
      { id: 'mao_aberta', nome: 'Caminho da Mão Aberta', descricao: 'Técnica da Mão Aberta: empurrar, derrubar ou negar reação ao Flurry of Blows.' },
      { id: 'sombra', nome: 'Caminho da Sombra', descricao: 'Magias de Mago de Ilusão/Conjuração. Teletransporte entre sombras.' },
      { id: 'quatro_elementos', nome: 'Caminho dos Quatro Elementos', descricao: 'Disciplinas elementais usando Ki: projéteis de fogo, surf em água, etc.' },
      { id: 'sol', nome: 'Caminho do Sol', descricao: 'Ataques de radiante. Golpe Fulminante: dano de trovão em área.' },
      { id: 'borracao', nome: 'Caminho da Borracha (Borrão)', descricao: 'Absorver e redirecionar dano. Alta sobrevivência.' },
    ],
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
    tipo_conjurador: 'half',
    atributo_conjuracao: 'carisma',
    nivel_subclasse: 3,
    subclasses: [
      { id: 'devocao', nome: 'Juramento de Devoção', descricao: 'Arma Sagrada: adicionar Carisma ao ataque. Escudo Sagrado. O paladino clássico.' },
      { id: 'ancestrais', nome: 'Juramento dos Anciãos', descricao: 'Aura de Proteção contra magia. Resistência a dano de magias.' },
      { id: 'vinganca', nome: 'Juramento de Vingança', descricao: 'Inimigo Jurado: vantagem vs um alvo. Misty Step e Hold Person. Alto DPS.' },
      { id: 'conquista', nome: 'Juramento de Conquista', descricao: 'Semear o Terror: medo em área. Aura de Conquista: velocidade 0 em criaturas amedrontadas.' },
      { id: 'redencao', nome: 'Juramento de Redenção', descricao: 'Foco em resolver conflitos sem violência. Absorver dano de aliados.' },
      { id: 'quebrado', nome: 'Paladino Caído (Juramento Quebrado)', descricao: 'Perde habilidades do Juramento. Deve se reconciliar ou trocar para Antipaladino.' },
    ],
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
    tipo_conjurador: 'half',
    atributo_conjuracao: 'sabedoria',
    nivel_subclasse: 3,
    subclasses: [
      { id: 'cacador', nome: 'Caçador', descricao: 'Presa do Caçador: dano extra no inimigo marcado. Defesas especializadas contra hordas ou grandes criaturas.' },
      { id: 'mestre_besta', nome: 'Mestre das Bestas', descricao: 'Companheiro animal que age no seu turno. Vínculo profundo com o animal.' },
      { id: 'deslizador', nome: 'Deslizador Feral', descricao: 'Combate com duas armas potenciado. Ferrão sombrio extra.' },
      { id: 'horizonte', nome: 'Sentinela do Horizonte', descricao: 'Detectar o invisível. Ataque de oportunidade a 9m de distância.' },
    ],
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
    tipo_conjurador: null,
    atributo_conjuracao: null,
    nivel_subclasse: 3,
    subclasses: [
      { id: 'trapaceiro_arcano', nome: 'Trapaceiro Arcano', descricao: 'Complementa furtividade com magias de Encantamento e Ilusão. Mão Mágica potenciada.', slots_magia: true, tipo_conjurador: 'third', atributo_conjuracao: 'inteligencia', restricao_escolas: ['encantamento', 'ilusao'] },
      { id: 'assassino', nome: 'Assassino', descricao: 'Dano massivo na surpresa. Infiltrar identidades falsas. Venenos.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null },
      { id: 'alma_ladrona', nome: 'Alma Ladrona', descricao: 'Subclasse de suporte/controle. Roubar habilidades de inimigos.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null },
      { id: 'inquisidor', nome: 'Inquisidor Místico', descricao: 'Detectar mentiras. Resistência psíquica. Proficiência em Religião e Arcanismo.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null },
      { id: 'fantasma', nome: 'Fantasma', descricao: 'Atravessar objetos, possuir criaturas. Alta mobilidade sobrenatural.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null },
    ],
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
    tipo_conjurador: 'full',
    atributo_conjuracao: 'carisma',
    nivel_subclasse: 1,
    subclasses: [
      { id: 'draconico', nome: 'Linhagem Dracônica', descricao: 'PV extra por nível. CA natural (13 + Des). Asas dracônicas no nível 14.' },
      { id: 'magia_selvagem', nome: 'Magia Selvagem', descricao: 'Surto de Magia Selvagem: efeitos aleatórios ao lançar. Dobrar dado de Sorte de Tasha.' },
      { id: 'divino', nome: 'Alma Divina', descricao: 'Acesso à lista de magias do Clérigo. Restauração Divina: recuperar PV.' },
      { id: 'sombra', nome: 'Magia das Sombras', descricao: 'Olhos da Escuridão: visão no escuro mágica. Força das Trevas.' },
      { id: 'tempestade', nome: 'Magia da Tempestade', descricao: 'Wind Speaker: linguagem Primordial. Tempestade de Fúria: resistência a raio/trovão.' },
    ],
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
    tipo_conjurador: 'warlock',
    atributo_conjuracao: 'carisma',
    slotsEspeciais: true,
    nivel_subclasse: 1,
    subclasses: [
      { id: 'archfey', nome: 'O Arquifeérico', descricao: 'Presença Fae: encantar ou assustar em área. Escape Brumoso: Misty Step como reação.' },
      { id: 'fiend', nome: 'O Demônio', descricao: 'Bênção do Mundo das Trevas: PV temporários ao matar. Lista de magias de fogo poderosa.' },
      { id: 'great_old_one', nome: 'O Grande Ancião', descricao: 'Despertar Mental: telepatia. Conhecimento proibido de entidades além da compreensão.' },
      { id: 'celestial', nome: 'O Celestial', descricao: 'Cura com slots de Bruxo. Lista de magias sagradas. Chama Curativa.' },
      { id: 'genie', nome: 'O Gênio', descricao: 'Vaso do Gênio: espaço extradimensional de descanso. Bônus por tipo de gênio.' },
    ],
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
    tipo_conjurador: 'full',
    atributo_conjuracao: 'inteligencia',
    nivel_subclasse: 2,
    subclasses: [
      { id: 'abjuracao', nome: 'Escola de Abjuração', descricao: 'Arcane Ward: escudo de PV absorvedores recarregado ao lançar magias de abjuração.' },
      { id: 'conjuracao', nome: 'Escola de Conjuração', descricao: 'Teleporte menor desde nível 2. Conjurar criaturas mais fortes.' },
      { id: 'adivinhacao', nome: 'Escola de Adivinhação', descricao: 'Presságios: 2x por dia, substituir qualquer d20 por resultado pré-rolado.' },
      { id: 'encantamento', nome: 'Escola de Encantamento', descricao: 'Hipnótico: encantar múltiplos humanóides. Roubar controle de criaturas encantadas.' },
      { id: 'evocacao', nome: 'Escola de Evocação', descricao: 'Esculpir Magias: excluir aliados da área de efeito. Potencializar Magias: rerrolar dano.' },
      { id: 'ilusao', nome: 'Escola de Ilusão', descricao: 'Ilusão Maleável: mover ilusões instantaneamente. Ilusão Iluminada: real ao toque.' },
      { id: 'necromancia', nome: 'Escola de Necromancia', descricao: 'Comandar horda de mortos-vivos. Ceifar Vida: curar ao matar com magia.' },
      { id: 'transmutacao', nome: 'Escola de Transmutação', descricao: 'Alquimista: transformar materiais. Pedra do Transmutador: bônus adaptáveis.' },
    ],
  },
];

/** Nomes das classes que NÃO possuem magia de slots. */
export const CLASSES_SEM_MAGIA = new Set(
  CLASSES.filter((c) => !c.slotsMagia).map((c) => c.nome)
);
