/**
 * CineCast — Camada central de copy (i18n-ready).
 *
 * Toda a comunicação textual do produto vive aqui. Componentes consomem
 * constantes deste arquivo, nunca strings hardcoded. Isso facilita:
 *  - revisão editorial em um único lugar
 *  - internacionalização futura
 *  - consistência terminológica (ex.: sempre "produção", nunca "projeto")
 *
 * Tom: seguro, elegante, cinematográfico, humano, profissional.
 * Inspiração: Letterboxd, IMDb Pro, Stage32, Mandy, Backstage,
 *              Vimeo, Sundance, TIFF, Berlinale Talents, A24, Film Independent.
 */

export const home = {
  hero: {
    eyebrow: "Plataforma para o audiovisual brasileiro",
    headline: "Conecte projetos e pessoas que fazem cinema acontecer",
    subheadline:
      "Descubra talentos, monte equipes e encontre oportunidades em todas as etapas da produção audiovisual.",
    ctaPrimary: "Publicar produção",
    ctaSecondary: "Explorar produções",
  },
  featured: {
    title: "Produções em destaque",
    subtitle:
      "Projetos selecionados por relevância, fase de produção e potencial de elenco",
    empty: {
      title: "Nenhuma produção em destaque no momento",
      description:
        "Seleções editoriais de projetos ativos. Publique sua produção ou explore o catálogo.",
      ctaPublish: "Publicar produção",
      ctaExplore: "Explorar produções",
    },
  },
};

export const explorer = {
  searchPlaceholder:
    "Buscar por título, diretor, cidade, função ou palavra-chave",
  empty: {
    title: "Nenhum resultado encontrado",
    description: "Não há produções compatíveis com os filtros atuais.",
    cta: "Limpar filtros",
  },
  filters: {
    type: "Tipo",
    status: "Fase",
    city: "Cidade",
    all: "Todas",
    allTypes: "Todos",
    allPhases: "Todas",
  },
  results: (count: number) => ({
    singular: "produção encontrada",
    plural: "produções encontradas",
    count,
  }),
};

export const productionCard = {
  labels: {
    direction: "Direção",
    city: "Cidade",
    phase: "Fase",
    production: "Produção",
  },
  status: {
    open: "Chamadas abertas",
    inProduction: "Em produção",
    postProduction: "Pós-produção",
    development: "Desenvolvimento",
    closed: "Encerrado",
  },
  badges: {
    urgent: "Vaga urgente",
    casting: "Casting aberto",
    crew: "Equipe técnica",
    independent: "Independente",
    festivalReady: "Festival-ready",
  },
  microcopy: {
    scheduledShoots: "Filmagens previstas",
    applicationsReceived: "Candidaturas recebidas",
    professionalVisibility: "Visibilidade profissional",
  },
};

export const productionPage = {
  titleSuffix: "— ficha do projeto",
  meta: {
    direction: "Direção",
    productionCompany: "Produtora",
    phase: "Fase",
    location: "Local",
    productionContact: "Contato de produção",
  },
  cta: {
    apply: "Candidatar-se",
    share: "Compartilhar projeto",
    newCall: "+ Nova chamada",
    edit: "Editar produção",
  },
  sections: {
    about: {
      intro:
        "Conheça a proposta criativa, o estágio atual de produção e as principais referências do projeto.",
    },
    crew: {
      intro:
        "Profissionais responsáveis pelas áreas criativas, técnicas e operacionais da produção.",
    },
    cast: {
      intro:
        "Papéis confirmados e oportunidades de casting ainda abertas.",
    },
    calls: {
      title: "Vagas abertas",
      heading: "Vagas abertas",
      intro: "Vagas abertas para elenco e equipe técnica.",
      microcopy: "Leia os requisitos e envie seu material.",
      empty: {
        owner: "Clique em “Nova chamada” para começar.",
        visitor: "Volte mais tarde.",
      },
      singular: "vaga",
      plural: "vagas",
    },
    credits: {
      intro: "Ficha técnica e artística da produção.",
    },
  },
  opportunityStatus: {
    open: "● Aberta",
    draft: "Rascunho",
  },
  opportunityTypes: {
    cast: "Elenco",
    crew: "Equipe",
    extra: "Extra",
    internship: "Estágio",
    volunteer: "Voluntário",
  },
  paidTag: "Remunerada",
  applied: {
    success: "Candidatura enviada com sucesso.",
    alreadyApplied: "Você já se candidatou a uma vaga desta produção.",
  },
  applicationsReceived: (count: number) =>
    `Candidaturas recebidas (${count})`,
  noApplications: "Nenhuma candidatura recebida ainda.",
  youApplied: "Você já se candidatou a esta vaga.",
  loginToApply: "Faça login",
  loginToApplySuffix: "para se candidatar.",
  viewPortfolio: "Ver portfólio",
  status: {
    development: "Em desenvolvimento",
    pre_production: "Pré-produção",
    production: "Em produção",
    post_production: "Pós-produção",
    released: "Lançado",
  },
  types: {
    film: "Filme",
    series: "Série",
    short: "Curta-metragem",
    documentary: "Documentário",
    commercial: "Comercial / Vídeo",
    other: "Outro",
  },
};

/* ============================================================
   PROFILE — Cartão profissional, currículo, portfólio, ficha
   ============================================================ */

export const profile = {
  // Page title
  titleSuffix: "— perfil profissional",
  subtitleTemplate: (
    role: string,
    city: string,
    availability: string
  ) => `${role} · ${city} · ${availability}`,

  // Empty / incomplete states
  empty: {
    bio: {
      title: "Sem biografia ainda",
      description:
        "Apresente sua trajetória, experiência e principais trabalhos.",
      cta: "Editar perfil",
    },
    incomplete: {
      title: "Perfil incompleto",
      description:
        "Perfis completos costumam receber mais visualizações e convites para produções.",
      cta: "Completar perfil",
    },
    complete: {
      title: "Perfil pronto",
      description: "Seu perfil está preparado para receber oportunidades.",
      cta: "Compartilhar perfil",
    },
  },

  // Form (EditProfile) — campos completos do cartão profissional
  form: {
    title: "Meu perfil",
    sectionIdentity: "Identidade",
    sectionPresence: "Presença profissional",
    fullName: "Nome completo",
    role: "Função principal",
    rolePlaceholder: "Ex.: Diretor de fotografia, Atriz, Produtora",
    city: "Cidade base",
    bio: "Biografia profissional",
    bioPlaceholder:
      "Diretor de fotografia com experiência em curtas, publicidade e documentários. Trabalhou em produções exibidas em festivais nacionais e projetos independentes.",
    avatar: "URL da foto de perfil",
    avatarHint:
      "Por enquanto, use um link de imagem. Upload direto virá depois.",
    instagram: "Instagram",
    instagramPlaceholder: "@seuuser",
    website: "Site / Portfólio",
    websitePlaceholder: "https://",
    reel: "Reel (Vimeo, YouTube ou site)",
    reelPlaceholder: "https://vimeo.com/seu-reel",
    save: "Salvar alterações",
    cancel: "Cancelar",
    saved: "Perfil salvo com sucesso!",
  },

  // CTAs por contexto
  cta: {
    contact: "Entrar em contato",
    share: "Compartilhar perfil",
    edit: "Editar perfil",
  },

  // HERO
  hero: {
    backToCatalog: "Voltar ao catálogo",
    stats: {
      credits: "créditos",
      productions: "produções",
      applications: "candidaturas",
      views: "visualizações",
    },
  },

  // Seções editoriais
  sections: {
    about: "Sobre",
    stats: "Em números",
    specialties: "Especialidades",
    filmography: "Filmografia",
    credits: "Créditos profissionais",
    reel: "Reel e portfólio",
    education: "Formação",
    awards: "Festivais e premiações",
    availability: "Disponibilidade",
    location: "Localização",
    languages: "Idiomas",
    equipment: "Equipamentos próprios",
    social: "Redes profissionais",
    recommendations: "Recomendações",
    looking: "Em busca de",
    contact: "Contato",
  },

  // Disponibilidade
  availability: {
    available: "Disponível",
    partial: "Disponibilidade parcial",
    unavailable: "Indisponível",
    availableForTravel: "Disponível para viagens",
  },

  // Idiomas disponíveis
  languageOptions: {
    pt: "Português",
    en: "Inglês",
    es: "Espanhol",
    fr: "Francês",
  },

  // Em Busca de
  lookingFor: {
    looking: "Buscando",
    notLooking: "Não busca",
    formats: {
      film: "Longas",
      series: "Séries",
      documentary: "Documentários",
      short: "Curtas",
      commercial: "Publicidade",
      musicVideo: "Videoclipes",
      event: "Eventos",
    },
  },

  // Contato / contratação
  contact: {
    title: "Entrar em contato",
    description:
      "Para convites, propostas e oportunidades de trabalho, entre em contato com a produção.",
    areasLabel: "Áreas de atuação",
    formatsLabel: "Formatos aceitos",
    backToProfile: "Voltar ao perfil",
  },

  // Microcopy "Em números"
  stats: {
    title: "Em números",
    credits: "Créditos",
    productions: "Produções",
    applications: "Candidaturas",
    views: "Visualizações",
  },

  // Microcopy "Buscar"
  filmography: {
    title: "Filmografia",
    emptyTitle: "Sem filmografia publicada",
    emptyDescription:
      "Adicione suas produções anteriores ou participe de uma para construir seu portfólio público.",
    functionLabel: "Função exercida",
    yearLabel: "Ano",
    statusLabel: "Status",
  },

  credits: {
    title: "Créditos profissionais",
    groupLabel: "créditos",
    emptyTitle: "Sem créditos registrados",
    emptyDescription:
      "Os créditos profissionais são a base do seu portfólio no CineCast. Mantenha-os atualizados para aumentar suas chances em futuras chamadas.",
  },

  reel: {
    title: "Reel e portfólio",
    emptyTitle: "Adicione seu reel",
    emptyDescription:
      "Produtores avaliam reel em segundos. Mostre seus melhores trabalhos em vídeo.",
    cta: "Adicionar link de portfólio",
    ctaHint: "Vimeo, YouTube ou site pessoal",
  },

  education: {
    title: "Formação",
    emptyTitle: "Sem formação registrada",
    emptyDescription:
      "Universidades, cursos livres, workshops e certificações ajudam a contar sua história profissional.",
  },

  awards: {
    title: "Festivais e premiações",
    emptyTitle: "Sem festivais ou premiações",
    emptyDescription:
      "Adicione os festivais e prêmios do seu currículo. Mesmo seleções em mostras regionais contam.",
    festivals: [
      "Festival de Gramado",
      "Mostra Internacional de Cinema de São Paulo",
      "Festival do Rio",
      "Curta Kinoforum",
      "Berlinale Talents",
    ],
  },

  specialties: {
    title: "Especialidades",
    emptyTitle: "Adicione suas especialidades",
    emptyDescription:
      "Liste as áreas em que você atua para ser encontrado nas buscas certas.",
  },

  equipment: {
    title: "Equipamentos próprios",
    emptyTitle: "Sem equipamentos registrados",
    emptyDescription:
      "Para técnicos: liste os equipamentos que você leva para o set.",
  },

  social: {
    title: "Redes profissionais",
    emptyTitle: "Adicione suas redes",
    emptyDescription:
      "IMDb, Vimeo, Letterboxd, Instagram profissional e site — tudo em um só lugar.",
  },

  recommendations: {
    title: "Recomendações",
    emptyTitle: "Sem recomendações ainda",
    emptyDescription:
      "Recomendações de colegas e diretores aumentam sua credibilidade. Em breve você poderá pedir e receber recomendações dentro da plataforma.",
    comingSoon: "Em breve",
  },
};

export const navbar = {
  links: {
    explore: "Explorar",
    publish: "Publicar",
    myApplications: "Minhas candidaturas",
    messages: "Mensagens",
    notifications: "Notificações",
  },
  ctaPublish: "Publicar produção",
  searchPlaceholder: "Buscar projetos, pessoas ou funções",
  myProfile: "Meu perfil",
  myProductions: "Minhas produções",
  signOut: "Sair",
  signIn: "Entrar",
  createAccount: "Criar conta",
  openMenu: "Abrir menu",
  closeMenu: "Fechar menu",
};

export const myProductions = {
  title: "Minhas produções",
  subtitle: "Gerencie seus projetos e chamadas.",
  empty: "Você ainda não criou nenhuma produção.",
  emptyCta: "Criar a primeira",
  newProduction: "Nova produção",
  viewPage: "Ver página",
  edit: "Editar",
  newCall: "Nova chamada",
};

export const newProduction = {
  title: "Nova produção",
  submit: "Criar produção",
  form: {
    title: "Título *",
    projectType: "Tipo de projeto",
    status: "Status",
    city: "Cidade",
    synopsis: "Sinopse",
    instagram: "Instagram",
    website: "Site",
    cover: "URL da imagem de capa",
    coverHint:
      "Por enquanto, cole um link de imagem. Upload no Supabase virá depois.",
  },
};

export const auth = {
  login: {
    title: "Entrar",
    subtitle: "Acesse sua conta para criar produções e se candidatar.",
    email: "E-mail",
    password: "Senha",
    submit: "Entrar",
    submitting: "Entrando...",
    noAccount: "Não tem conta?",
    createAccount: "Criar conta",
    invalid: "E-mail ou senha incorretos. Tente novamente.",
  },
  register: {
    title: "Criar conta",
    subtitle: "Cadastre-se para publicar projetos ou se candidatar.",
    fullName: "Nome completo",
    email: "E-mail",
    password: "Senha",
    passwordHint: "Mínimo de 6 caracteres.",
    submit: "Criar conta",
    submitting: "Criando...",
    haveAccount: "Já tem conta?",
    signIn: "Entrar",
    emailSent:
      "Conta criada! Verifique seu e-mail e clique no link para ativar.",
  },
};

export const opportunityForm = {
  title: {
    label: "Título da chamada *",
    placeholder: "Ex.: Atriz 25–35 anos",
  },
  type: "Tipo *",
  status: "Status",
  statusOpen: "Aberta",
  statusDraft: "Rascunho",
  description: "Descrição",
  requirements: "Requisitos",
  paid: "Vaga remunerada",
  cast: {
    section: "Detalhes — Elenco",
    characterName: "Nome da personagem *",
    ageRange: "Faixa etária",
    ageRangePlaceholder: "Ex.: 25–35",
    gender: "Gênero",
    genderAny: "Qualquer",
    genderFemale: "Feminino",
    genderMale: "Masculino",
    genderNonBinary: "Não binário",
    genderNotSpecified: "Não especificado",
    personality: "Personalidade",
    observations: "Observações",
  },
  crew: {
    section: "Detalhes — Equipe",
    position: "Cargo *",
    positionPlaceholder: "Ex.: Diretor de fotografia",
    experience: "Experiência necessária",
    experienceBeginner: "Iniciante",
    experienceIntermediate: "Intermediário",
    experienceAdvanced: "Avançado",
    experienceProfessional: "Profissional",
    observations: "Observações",
  },
  submit: "Publicar chamada",
};

export const applyForm = {
  message: {
    label: "Mensagem *",
    placeholder: "Conte por que você é ideal para esta vaga...",
  },
  portfolio: "Link do portfólio",
  portfolioPlaceholder: "https://",
  submit: "Enviar candidatura",
  back: "Voltar para a produção",
};

export const emptyStates = {
  productions: {
    title: "Ainda não há produções publicadas.",
    cta: "Publicar produção",
  },
  applications: {
    title: "Você ainda não enviou candidaturas.",
    cta: "Explorar chamadas",
  },
  calls: {
    title: "Nenhuma chamada aberta neste projeto.",
    cta: "Seguir projeto",
  },
  crew: {
    title: "A equipe ainda não foi divulgada.",
    cta: "Voltar mais tarde",
  },
};

export const success = {
  productionPublished: {
    title: "Produção publicada",
    description: "Seu projeto já pode receber visualizações e candidaturas.",
    cta: "Publicar chamada",
  },
  profileUpdated: {
    title: "Perfil atualizado",
    description: "Suas informações foram salvas com sucesso.",
  },
  applicationSent: {
    title: "Candidatura enviada",
    description: "Seu material foi encaminhado para a produção.",
  },
};

export const errors = {
  publish: "Não foi possível publicar a produção.",
  application: "Não foi possível enviar sua candidatura.",
  permission: "Você não tem acesso a este recurso.",
  messageRequired: "Mensagem é obrigatória.",
  callClosed: "Esta chamada não está aberta.",
  ownProduction: "Você não pode se candidatar à sua própria produção.",
  alreadyApplied: "Você já se candidatou a esta vaga.",
  requiredFields: "Preencha os campos obrigatórios.",
  characterRequired: "Nome da personagem é obrigatório para elenco/extra.",
  positionRequired: "Cargo é obrigatório para equipe/estágio/voluntário.",
  titleRequired: "Título é obrigatório.",
  invalidData: "Dados inválidos.",
  cannotEdit: "Você não pode editar esta produção.",
  cannotCreateCall: "Você não pode criar chamadas nesta produção.",
};

export const footer = {
  tagline:
    "CineCast — infraestrutura profissional para o audiovisual brasileiro",
  description:
    "Conectamos produções, talentos e equipes por meio de ferramentas pensadas para a realidade do set.",
  links: {
    about: "Sobre",
    howItWorks: "Como funciona",
    help: "Ajuda",
    contact: "Contato",
    terms: "Termos",
    privacy: "Privacidade",
  },
};
