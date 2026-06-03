import type { AtributoNome, DadoDeVida } from '@/types/character';

export interface Subclasse {
  id: string;
  nome: string;
  descricao: string;
  slots_magia?: boolean;
  tipo_conjurador?: 'third' | null;
  atributo_conjuracao?: 'inteligencia' | null;
  restricao_escolas?: string[];
  tem_truques?: boolean;
  fonte?: 'LDJ' | 'Xanathar';
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
      { id: 'berserker', nome: 'Caminho do Berserker', descricao: 'Frenesi: ataque bônus cada turno durante Fúria. Mente Intemerata: imunidade a charme/medo durante Fúria.', fonte: 'LDJ' },
      { id: 'totem', nome: 'Caminho do Guerreiro Totêmico', descricao: 'Espírito totêmico (Urso/Águia/Lobo) concede habilidades passivas únicas. Urso: resistência a quase todo tipo de dano.', fonte: 'LDJ' },
      { id: 'ancestral', nome: 'Caminho dos Ancestrais Furiosos', descricao: 'Convocar espíritos ancestrais que protegem aliados e prejudicam inimigos.', fonte: 'LDJ' },
      { id: 'tempestade', nome: 'Caminho da Tempestade Herald', descricao: 'Dano de raio/trovão, voar temporariamente em níveis altos.', fonte: 'LDJ' },
      { id: 'guardiao_ancestral', nome: 'Caminho do Guardião Ancestral', fonte: 'Xanathar', descricao: 'Espíritos ancestrais aparecem ao entrar em Fúria. O primeiro inimigo atingido por turno tem desvantagem em ataques contra aliados. Escudo Espiritual: reduzir dano de aliados com reação (2d8→3d8→4d8).' },
      { id: 'arauto_tempestade', nome: 'Caminho do Arauto da Tempestade', fonte: 'Xanathar', descricao: 'Emana aura de tempestade em 3m durante a Fúria. Escolhe ambiente: Deserto (dano de fogo), Mar (dano elétrico), Tundra (PV temporários). Resistências passivas baseadas no ambiente.' },
      { id: 'fanatico', nome: 'Caminho do Fanático', fonte: 'Xanathar', descricao: 'Fúria Divina: dano necrótico ou radiante extra (1d6 + metade do nível) no primeiro ataque por turno. Guerreiro dos Deuses: magias de ressurreição sem componentes materiais. Foco Fanático: refazer 1 teste de resistência por Fúria.' },
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
      { id: 'lore', nome: 'Colégio do Saber', descricao: 'Segredos Mágicos antecipado (nível 6). Palavras Cortantes: usar Inspiração Bárdica contra inimigos.', fonte: 'LDJ' },
      { id: 'valor', nome: 'Colégio do Valor', descricao: 'Proficiência em armaduras médias, escudos e armas marciais. Ataque extra no nível 6.', fonte: 'LDJ' },
      { id: 'espadas', nome: 'Colégio das Espadas', descricao: 'Floreios de Lâmina: manobras de combate usando Inspiração Bárdica. Armadura de scimitar.', fonte: 'LDJ' },
      { id: 'sussurros', nome: 'Colégio dos Sussurros', descricao: 'Palavras Psíquicas: dano psíquico extra. Roubar persona de humanóide morto.', fonte: 'LDJ' },
      { id: 'glamour', nome: 'Colégio do Glamour', descricao: 'Inspiração Sedutora: bônus de movimento e ação bônus. Manto de Majestade.', fonte: 'LDJ' },
      { id: 'colegio_glamour', nome: 'Colégio do Glamour', fonte: 'Xanathar', descricao: 'Manto da Inspiração: ação bônus concede PV temporários e movimento sem ataques de oportunidade. Performance Deslumbrante: encantar humanoides. Majestade Inquebrável: atacantes fazem teste de Carisma ou não podem te atacar.' },
      { id: 'colegio_espadas', nome: 'Colégio das Espadas', fonte: 'Xanathar', descricao: 'Proficiência com armadura média e cimitarras. Floreio de Lâminas: gastar Inspiração para Floreio Defensivo (+CA), Floreio Cortante (dano em área) ou Floreio Móvel (reposicionar). Ataque Extra no nível 6.' },
      { id: 'colegio_sussurros', nome: 'Colégio dos Sussurros', fonte: 'Xanathar', descricao: 'Lâminas Psíquicas: gastar Inspiração para 2d6 dano psíquico extra. Manto dos Sussurros: capturar sombra de humanoide morto e assumir sua identidade por 1 hora. Conhecimento das Sombras: encantar criatura por 8h.' },
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
      { id: 'vida', nome: 'Domínio da Vida', descricao: 'Melhor curador do jogo. Proficiência em armadura pesada. Bênção do Curandeiro.', fonte: 'LDJ' },
      { id: 'luz', nome: 'Domínio da Luz', descricao: 'DPS de fogo/radiante. Warding Flare: impor desvantagem em ataque contra você.', fonte: 'LDJ' },
      { id: 'guerra', nome: 'Domínio da Guerra', descricao: 'Armadura pesada + armas marciais. Ataque de Guerra: bônus em jogadas de ataque.', fonte: 'LDJ' },
      { id: 'tempestade', nome: 'Domínio da Tempestade', descricao: 'Dano de raio/trovão. Ira da Tempestade: dano automático a atacantes.', fonte: 'LDJ' },
      { id: 'morte', nome: 'Domínio da Morte', descricao: 'Controle de mortos-vivos. Toque necrótico potenciado. (Geralmente vilões/antiheróis)', fonte: 'LDJ' },
      { id: 'natureza', nome: 'Domínio da Natureza', descricao: 'Proficiência em armadura pesada. Afinidade com animais e plantas.', fonte: 'LDJ' },
      { id: 'conhecimento', nome: 'Domínio do Conhecimento', descricao: 'Proficiência e expertise em perícias de conhecimento. Visão Abençoada da Mente.', fonte: 'LDJ' },
      { id: 'enganacao', nome: 'Domínio do Engano', descricao: 'Duplicata sombria, troca de lugar com cópia ilusória. Bênção do Trapaceiro.', fonte: 'LDJ' },
      { id: 'dominio_forja', nome: 'Domínio da Forja', fonte: 'Xanathar', descricao: 'Proficiência com armadura pesada e ferramentas de ferreiro. Bênção da Forja: +1 mágico em arma ou armadura por descanso longo. Alma da Forja (6): resistência a fogo e +1 CA. Santo da Forja (17): imunidade a fogo.' },
      { id: 'dominio_sepultura', nome: 'Domínio da Sepultura', fonte: 'Xanathar', descricao: 'Círculo da Mortalidade: curas em criatura a 0 PV usam valor máximo. Olhos da Sepultura: detectar mortos-vivos em 18m. Sentinela (6): transformar crítico em acerto normal como reação. Guardião das Almas (17): curar aliado quando inimigo morre próximo.' },
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
      { id: 'lua', nome: 'Círculo da Lua', descricao: 'Forma Selvagem de combate desde nível 2. CR máximo muito superior ao padrão.', fonte: 'LDJ' },
      { id: 'terra', nome: 'Círculo da Terra', descricao: 'Recuperação Natural: recuperar slots. Magias extras por bioma escolhido.', fonte: 'LDJ' },
      { id: 'esporos', nome: 'Círculo dos Esporos', descricao: 'Animar mortos com fungos. Halo de Esporos: dano necrótico a adjacentes.', fonte: 'LDJ' },
      { id: 'sonhos', nome: 'Círculo dos Sonhos', descricao: 'Balm of the Summer Court: cura em pool. Travessia pelo mundo feérico.', fonte: 'LDJ' },
      { id: 'circulo_sonhos', nome: 'Círculo dos Sonhos', fonte: 'Xanathar', descricao: 'Bálsamo da Corte de Verão: pool de d6 (= nível) para curar aliados como ação bônus + PV temporários. Lareira de Sombra e Luar: esfera de 9m durante descanso que oculta luz e dá +5 em Furtividade e Percepção. Caminhos Ocultos (10): teleporte de 18m como ação bônus.' },
      { id: 'circulo_pastor', nome: 'Círculo do Pastor', fonte: 'Xanathar', descricao: 'Voz da Natureza: fala Silvestre e animais entendem sua fala. Espírito Totêmico: invocar espírito (Urso, Falcão ou Unicórnio) com aura de 9m beneficiando aliados. Invocador Poderoso (6): criaturas conjuradas ganham PV máximos e bônus de ataque.' },
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
      { id: 'campeao', nome: 'Campeão', descricao: 'Crítico em 19–20. Estilo de combate adicional. Simples, mas consistente.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, fonte: 'LDJ' },
      { id: 'mestre_batalha', nome: 'Mestre de Batalha', descricao: 'Manobras de combate com Dados de Superioridade. Alta versatilidade tática.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, fonte: 'LDJ' },
      { id: 'cavaleiro_arcano', nome: 'Cavaleiro Arcano', descricao: 'Combina maestria marcial com magia de Mago. Abjuração e Evocação. Vínculo com armas e armadura.', slots_magia: true, tipo_conjurador: 'third', atributo_conjuracao: 'inteligencia', restricao_escolas: ['abjuracao', 'evocacao'], fonte: 'LDJ' },
      { id: 'arqueiro_arcano', nome: 'Arqueiro Arcano', descricao: 'Mistura arquearia com magia élfica. Aprende 1 truque (Prestidigitação ou Druidismo) mas NÃO possui slots. Disparo Arcano: 2 usos/descanso — flechas com efeitos mágicos (Explosão, Sedução, Banimento, Perseguidora e mais).', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, tem_truques: true, fonte: 'Xanathar' },
      { id: 'samurai', nome: 'Samurai', descricao: 'Espírito de Combate: vantagem em todos os ataques por 1 turno, usos = mod. Sabedoria/descanso longo. Determinação Elegante (7): proficiência em Sabedoria. Sobreviver à Derrota (15): 1 PV ao cair a 0 (1x/descanso longo).', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, fonte: 'Xanathar' },
      { id: 'cavaleiro', nome: 'Cavaleiro', descricao: 'Desafio de Cavaleiro: forçar inimigo a atacar você com desvantagem contra outros. Golpe Aterrorizante: ataque que pode assustar o alvo. Penhor de Hostilidade: ataque de reação se inimigo ignorar você.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, fonte: 'Xanathar' },
      { id: 'cavaleiro_runa', nome: 'Cavaleiro de Runas', descricao: 'Runas mágicas em armas/armadura. Crescimento gigante temporário.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, fonte: 'LDJ' },
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
      { id: 'mao_aberta', nome: 'Caminho da Mão Aberta', descricao: 'Técnica da Mão Aberta: empurrar, derrubar ou negar reação ao Flurry of Blows.', fonte: 'LDJ' },
      { id: 'sombra', nome: 'Caminho da Sombra', descricao: 'Magias de Mago de Ilusão/Conjuração. Teletransporte entre sombras.', fonte: 'LDJ' },
      { id: 'quatro_elementos', nome: 'Caminho dos Quatro Elementos', descricao: 'Disciplinas elementais usando Ki: projéteis de fogo, surf em água, etc.', fonte: 'LDJ' },
      { id: 'sol', nome: 'Caminho do Sol', descricao: 'Ataques de radiante. Golpe Fulminante: dano de trovão em área.', fonte: 'LDJ' },
      { id: 'borracao', nome: 'Caminho da Borracha (Borrão)', descricao: 'Absorver e redirecionar dano. Alta sobrevivência.', fonte: 'LDJ' },
      { id: 'mestre_bebado', nome: 'Estilo do Mestre Bêbado', fonte: 'Xanathar', descricao: 'Técnica Bêbada: ao usar Rajada de Golpes, ganha Desengajar e +3m de deslocamento. Balanço Bêbado (6): levantar do chão com 3m; redirecionar ataques errados com reação gastando 1 Ki. Frenesi do Bêbado (17): até 5 ataques na Rajada, cada um contra criatura diferente.' },
      { id: 'kensei', nome: 'Estilo do Kensei', fonte: 'Xanathar', descricao: 'Armas Kensei: 2 tipos de arma com bônus especiais. Esquiva Rápida: +2 CA ao segurar arma Kensei. Tiro do Kensei: 1d4 extra à distância. Uno com a Lâmina (6): armas Kensei contam como mágicas; 1 Ki para dano extra.' },
      { id: 'alma_solar', nome: 'Estilo da Alma Solar', fonte: 'Xanathar', descricao: 'Raio Solar Radiante: ataque à distância de 9m causando dano radiante. 1 Ki para atacar duas vezes. Golpe do Arco Abrasador (6): 2 Ki para conjurar Mãos Flamejantes como ação bônus. Explosão Calcinante (11): orbe radiante em esfera de 8m.' },
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
      { id: 'devocao', nome: 'Juramento de Devoção', descricao: 'Arma Sagrada: adicionar Carisma ao ataque. Escudo Sagrado. O paladino clássico.', fonte: 'LDJ' },
      { id: 'ancestrais', nome: 'Juramento dos Anciãos', descricao: 'Aura de Proteção contra magia. Resistência a dano de magias.', fonte: 'LDJ' },
      { id: 'vinganca', nome: 'Juramento de Vingança', descricao: 'Inimigo Jurado: vantagem vs um alvo. Misty Step e Hold Person. Alto DPS.', fonte: 'LDJ' },
      { id: 'conquista', nome: 'Juramento de Conquista', descricao: 'Semear o Terror: medo em área. Aura de Conquista: velocidade 0 em criaturas amedrontadas.', fonte: 'LDJ' },
      { id: 'redencao', nome: 'Juramento de Redenção', descricao: 'Foco em resolver conflitos sem violência. Absorver dano de aliados.', fonte: 'LDJ' },
      { id: 'quebrado', nome: 'Paladino Caído (Juramento Quebrado)', descricao: 'Perde habilidades do Juramento. Deve se reconciliar ou trocar para Antipaladino.', fonte: 'LDJ' },
      { id: 'juramento_conquista', nome: 'Juramento da Conquista', fonte: 'Xanathar', descricao: 'Presença Conquistadora: criaturas em 9m fazem teste de Sabedoria ou ficam com medo. Aura da Conquista (7): criaturas com medo têm deslocamento 0 e tomam dano psíquico. Repreensão Arrogante (15): atacante recebe dano psíquico = mod. Carisma.' },
      { id: 'juramento_redencao', nome: 'Juramento da Redenção', fonte: 'Xanathar', descricao: 'Emissário da Paz: +5 em testes de Carisma para interação. Jurar Inimigo: desvantagem no inimigo que atacar aliado. Aura do Guardião (7): redirecionar dano de aliados para si mesmo. Punição Protetora: dano de energia ao atacante ao usar Aura.' },
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
      { id: 'cacador', nome: 'Caçador', descricao: 'Presa do Caçador: dano extra no inimigo marcado. Defesas especializadas contra hordas ou grandes criaturas.', fonte: 'LDJ' },
      { id: 'mestre_besta', nome: 'Mestre das Bestas', descricao: 'Companheiro animal que age no seu turno. Vínculo profundo com o animal.', fonte: 'LDJ' },
      { id: 'deslizador', nome: 'Deslizador Feral', descricao: 'Combate com duas armas potenciado. Ferrão sombrio extra.', fonte: 'LDJ' },
      { id: 'horizonte', nome: 'Sentinela do Horizonte', descricao: 'Detectar o invisível. Ataque de oportunidade a 9m de distância.', fonte: 'LDJ' },
      { id: 'perseguidor_obscuro', nome: 'Perseguidor Obscuro', fonte: 'Xanathar', descricao: 'Emboscador Terrível: bônus em iniciativa = mod. Sabedoria; +1d8 no primeiro ataque. Visão Umbral: invisível para criaturas com visão no escuro nas trevas. Mente de Ferro (7): proficiência em resistências de Sabedoria. Evasiva Sombria (15): desvantagem em ataque como reação.' },
      { id: 'andarilho_horizonte', nome: 'Andarilho do Horizonte', fonte: 'Xanathar', descricao: 'Detectar Portais: portal mais próximo em 1,5km. Guerreiro Planar: 1d8 de energia bônus no primeiro ataque. Passo Etéreo (7): Forma Etérea como ação bônus. Ataque Distante (11): teleportar 3m antes de cada ataque.' },
      { id: 'exterminador_monstros', nome: 'Exterminador de Monstros', fonte: 'Xanathar', descricao: 'Caçador: detectar imunidades/resistências de uma criatura como ação. Exterminador de Presas: marcar criatura alvo para dano extra e bônus em resistências contra suas magias. Fúria do Caçador (7): ataque extra contra criatura marcada que tentar se mover.' },
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
      { id: 'trapaceiro_arcano', nome: 'Trapaceiro Arcano', descricao: 'Complementa furtividade com magias de Encantamento e Ilusão. Mão Mágica potenciada.', slots_magia: true, tipo_conjurador: 'third', atributo_conjuracao: 'inteligencia', restricao_escolas: ['encantamento', 'ilusao'], fonte: 'LDJ' },
      { id: 'assassino', nome: 'Assassino', descricao: 'Dano massivo na surpresa. Infiltrar identidades falsas. Venenos.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, fonte: 'LDJ' },
      { id: 'alma_ladrona', nome: 'Alma Ladrona', descricao: 'Subclasse de suporte/controle. Roubar habilidades de inimigos.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, fonte: 'LDJ' },
      { id: 'inquisidor', nome: 'Inquisidor Místico', descricao: 'Detectar mentiras. Resistência psíquica. Proficiência em Religião e Arcanismo.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, fonte: 'LDJ' },
      { id: 'fantasma', nome: 'Fantasma', descricao: 'Atravessar objetos, possuir criaturas. Alta mobilidade sobrenatural.', slots_magia: false, tipo_conjurador: null, atributo_conjuracao: null, fonte: 'LDJ' },
      { id: 'inquiridor', nome: 'Inquiridor', fonte: 'Xanathar', descricao: 'Ouvir do Enganador: resultados ≤7 em Intuição são tratados como 8. Combatente Perspicaz: Ataque Furtivo sem vantagem por 1 min. Olhar Constante (9): vantagem em Percepção/Investigação sem mover-se muito. Olhar da Fraqueza (17): +3d6 no Ataque Furtivo.' },
      { id: 'mentor', nome: 'Mentor', fonte: 'Xanathar', descricao: 'Mestre da Intriga: kit de disfarce, falsificação, 2 idiomas, imitar sotaques. Mestre de Tática: Ajuda como ação bônus com alcance de 9m. Manipulador Perspicaz (9): comparar atributos de criatura. Redirecionar (13): desviar ataque para criatura adjacente como reação.' },
      { id: 'batedor', nome: 'Batedor', fonte: 'Xanathar', descricao: 'Escaramuça: mover metade do deslocamento como reação sem ataque de oportunidade. Sobrevivente: expertise em Natureza e Sobrevivência. Mobilidade Superior (9): Disparada como ação bônus. Golpe Súbito (17): Ataque Furtivo sem aliado adjacente 3x/descanso.' },
      { id: 'espadachim', nome: 'Espadachim', fonte: 'Xanathar', descricao: 'Audácia Devassa: bônus de iniciativa = mod. Carisma. Ataque Furtivo sem aliado adjacente a 1,5m. Penachar (9): Persuasão vs Intuição para encantar. Reflexo Elegante (13): após errar, mover 1,5m sem ataque de oportunidade.' },
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
      { id: 'draconico', nome: 'Linhagem Dracônica', descricao: 'PV extra por nível. CA natural (13 + Des). Asas dracônicas no nível 14.', fonte: 'LDJ' },
      { id: 'magia_selvagem', nome: 'Magia Selvagem', descricao: 'Surto de Magia Selvagem: efeitos aleatórios ao lançar. Dobrar dado de Sorte de Tasha.', fonte: 'LDJ' },
      { id: 'divino', nome: 'Alma Divina', descricao: 'Acesso à lista de magias do Clérigo. Restauração Divina: recuperar PV.', fonte: 'LDJ' },
      { id: 'sombra', nome: 'Magia das Sombras', descricao: 'Olhos da Escuridão: visão no escuro mágica. Força das Trevas.', fonte: 'LDJ' },
      { id: 'tempestade', nome: 'Magia da Tempestade', descricao: 'Wind Speaker: linguagem Primordial. Tempestade de Fúria: resistência a raio/trovão.', fonte: 'LDJ' },
      { id: 'alma_favorecida', nome: 'Alma Favorecida', fonte: 'Xanathar', descricao: 'Magia Divina: acesso à lista de magias do Clérigo. Escolhe alinhamento para tipo de dano bônus. Asas Espectrais (14): asas etéreas que concedem voo de 9m.' },
      { id: 'magia_sombras', nome: 'Magia das Sombras', fonte: 'Xanathar', descricao: 'Olhos da Escuridão: truque Escuridão; 1 ponto para conjurar sem componentes. Força das Trevas: visão no escuro. Rascunhos das Sombras (6): Armas dos Espíritos de sombra. Sombra Protetora (14): teleportar para local escuro com 1 PV ao cair a 0 (1x/descanso longo).' },
      { id: 'magia_tempestade', nome: 'Magia da Tempestade', fonte: 'Xanathar', descricao: 'Orador dos Ventos: fala Primordial (Auran). Fúria da Tempestade: resistência a raio/trovão; 1d6 raio/trovão em criatura a 3m ao conjurar magia. Coração da Tempestade (6): resistência e dano a criaturas próximas. Alma Tempestuosa (14): forma de água, voar em tempestades.' },
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
      { id: 'archfey', nome: 'O Arquifeérico', descricao: 'Presença Fae: encantar ou assustar em área. Escape Brumoso: Misty Step como reação.', fonte: 'LDJ' },
      { id: 'fiend', nome: 'O Demônio', descricao: 'Bênção do Mundo das Trevas: PV temporários ao matar. Lista de magias de fogo poderosa.', fonte: 'LDJ' },
      { id: 'great_old_one', nome: 'O Grande Ancião', descricao: 'Despertar Mental: telepatia. Conhecimento proibido de entidades além da compreensão.', fonte: 'LDJ' },
      { id: 'celestial', nome: 'O Celestial', descricao: 'Cura com slots de Bruxo. Lista de magias sagradas. Chama Curativa.', fonte: 'LDJ' },
      { id: 'genie', nome: 'O Gênio', descricao: 'Vaso do Gênio: espaço extradimensional de descanso. Bônus por tipo de gênio.', fonte: 'LDJ' },
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
      { id: 'abjuracao', nome: 'Escola de Abjuração', descricao: 'Arcane Ward: escudo de PV absorvedores recarregado ao lançar magias de abjuração.', fonte: 'LDJ' },
      { id: 'conjuracao', nome: 'Escola de Conjuração', descricao: 'Teleporte menor desde nível 2. Conjurar criaturas mais fortes.', fonte: 'LDJ' },
      { id: 'adivinhacao', nome: 'Escola de Adivinhação', descricao: 'Presságios: 2x por dia, substituir qualquer d20 por resultado pré-rolado.', fonte: 'LDJ' },
      { id: 'encantamento', nome: 'Escola de Encantamento', descricao: 'Hipnótico: encantar múltiplos humanóides. Roubar controle de criaturas encantadas.', fonte: 'LDJ' },
      { id: 'evocacao', nome: 'Escola de Evocação', descricao: 'Esculpir Magias: excluir aliados da área de efeito. Potencializar Magias: rerrolar dano.', fonte: 'LDJ' },
      { id: 'ilusao', nome: 'Escola de Ilusão', descricao: 'Ilusão Maleável: mover ilusões instantaneamente. Ilusão Iluminada: real ao toque.', fonte: 'LDJ' },
      { id: 'necromancia', nome: 'Escola de Necromancia', descricao: 'Comandar horda de mortos-vivos. Ceifar Vida: curar ao matar com magia.', fonte: 'LDJ' },
      { id: 'transmutacao', nome: 'Escola de Transmutação', descricao: 'Alquimista: transformar materiais. Pedra do Transmutador: bônus adaptáveis.', fonte: 'LDJ' },
      { id: 'mago_guerra', nome: 'Mago de Guerra', fonte: 'Xanathar', descricao: 'Deflexão Arcana: +2 CA ou +4 em resistência como reação (mas só truques até o próximo turno). Astúcia Tática: bônus de iniciativa = mod. Inteligência. Surto de Poder (6): dano extra = metade do nível. Magia Duradoura (10): +2 CA e testes de resistência ao manter concentração.' },
    ],
  },
];

/** Nomes das classes que NÃO possuem magia de slots. */
export const CLASSES_SEM_MAGIA = new Set(
  CLASSES.filter((c) => !c.slotsMagia).map((c) => c.nome)
);
