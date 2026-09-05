import { EventTypeItem, SpaceFeature, GalleryImage, BuffetItem, Testimonial, InstagramPost } from '../types';

export const LUMIER_CONTACT = {
  phone: '(61) 3397-2794',
  phoneClean: '556133972794',
  instagram: '@espacolumier',
  instagramUrl: 'https://instagram.com/espacolumier',
  address: 'Rua 07, Chácara 330, Lote 08 – Vicente Pires, Brasília - DF',
  city: 'Vicente Pires — Brasília, DF',
  email: 'contato@espacolumier.com.br',
  hours: 'Atendimento e Visitas com agendamento prévio: Terça a Sábado das 09h às 19h',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.237330773641!2d-48.04546192398463!3d-15.802034184838637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a32f61fec68cd%3A0xdb473c431db6d1cb!2sEspa%C3%A7o%20Lumier!5e0!3m2!1spt-BR!2sbr!4v1740000000000',
  mapsLink: 'https://maps.app.goo.gl/jEkj5dNbpUxHjG9f8'
};

export const getWhatsAppUrl = (customMessage?: string) => {
  const defaultText = encodeURIComponent(
    'Olá! Estive navegando no site do Espaço Lumier e gostaria de solicitar um orçamento e saber sobre datas disponíveis.'
  );
  const message = customMessage ? encodeURIComponent(customMessage) : defaultText;
  return `https://wa.me/${LUMIER_CONTACT.phoneClean}?text=${message}`;
};

export const EVENT_TYPES: EventTypeItem[] = [
  {
    id: 'casamentos',
    title: 'Casamentos',
    subtitle: 'Um cenário pensado para celebrar histórias de amor.',
    description: 'Do altar floral aos lustres de cristal e ao buffet exclusivo, criamos o ambiente perfeito para o dia mais importante da sua vida.',
    fullDescription: 'No Espaço Lumier, seu casamento é tratado como uma obra de arte única. Integramos cerimônia ao ar livre ou no salão climatizado com cenografia personalizada, alta gastronomia e suporte integral de coordenação.',
    category: 'casamento',
    image: '/casamentos/casamento_01.webp',
    gallery: [
      '/casamentos/casamento_01.webp',
      '/casamentos/casamento_02.webp',
      '/casamentos/casamento_03.webp',
      '/casamentos/casamento_04.webp',
      '/casamentos/casamento_05.webp',
      '/casamentos/casamento_06.webp',
      '/casamentos/casamento_07.webp',
      '/casamentos/casamento_08.webp'
    ],
    highlights: ['Cerimônia no Local', 'Suíte da Noiva Exclusiva', 'Lustres e Iluminação Cênica', 'Gastronomia Harmonizada', 'Mobiliário de Alto Padrão'],
    guestCapacity: 'De 80 a 300 convidados'
  },
  {
    id: '15anos',
    title: '15 Anos',
    subtitle: 'Uma celebração inesquecível para um momento único.',
    description: 'A transição dos sonhos para a realidade com cenografia contemporânea, pista de dança de última geração e experiências gastronômicas para todas as idades.',
    fullDescription: 'Projetamos festas de 15 anos marcantes e sofisticadas, combinando elegância atemporal com elementos modernos de luz, som e cenografia imersiva.',
    category: '15anos',
    image: '/15%20anos/15anos_01.webp',
    gallery: [
      '/15%20anos/15anos_01.webp',
      '/15%20anos/15anos_02.webp',
      '/15%20anos/15anos_03.webp',
      '/15%20anos/15anos_04.webp',
      '/15%20anos/15anos_05.webp',
      '/15%20anos/15anos_06.webp',
      '/15%20anos/15anos_07.webp'
    ],
    highlights: ['Pista de Led e Som Acústico', 'Ilha de Mocktails & Drinks', 'Espaço Lounge para Jovens', 'Cenografia Instagramável', 'Camarim Privativo'],
    guestCapacity: 'De 80 a 300 convidados'
  },
  {
    id: 'sociais',
    title: 'Eventos Sociais',
    subtitle: 'Momentos especiais merecem um ambiente à altura.',
    description: 'Bodas, formaturas, aniversários marcantes e celebrações familiares com a sofisticação e o acolhimento característicos do Lumier.',
    fullDescription: 'Seja para comemorar bodas de prata, uma formatura inesquecível ou um aniversário especial, o Lumier oferece o equilíbrio perfeito entre aconchego, sofisticação e excelência no serviço.',
    category: 'social',
    image: '/eventos%20sociais/foto_013.webp',
    gallery: [
      '/eventos%20sociais/foto_013.webp',
      '/eventos%20sociais/foto_015.webp',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop'
    ],
    highlights: ['Ambientes Flexíveis e Modulares', 'Buffet Personalizado', 'Atendimento Acolhedor', 'Estacionamento Próprio', 'Espaço Kids Adaptável'],
    guestCapacity: 'De 50 a 300 convidados'
  },
  {
    id: 'corporativos',
    title: 'Eventos Corporativos',
    subtitle: 'Estrutura e experiência para encontros que precisam deixar uma marca.',
    description: 'Jantares de gala, premiações, confraternizações de final de ano e lançamentos com tecnologia de ponta, climatização impecável e buffet requintado.',
    fullDescription: 'Conectamos sua marca a momentos de impacto. Nossa infraestrutura conta com isolamento acústico de ponta, internet de alta velocidade e layout configurável para palestras, workshops ou banquetes formais.',
    category: 'corporativo',
    image: '/eventos%20corporativos/foto_025.webp',
    gallery: [
      '/eventos%20corporativos/foto_025.webp',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop'
    ],
    highlights: ['Climatização e Conforto Total', 'Acústica e Som Profissional', 'Cardápios Executivos e Coquetéis', 'Facilidade de Acesso em Vicente Pires', 'Segurança Privada Integrada'],
    guestCapacity: 'De 60 a 300 participantes'
  }
];

export const SPACE_FEATURES: SpaceFeature[] = [
  {
    id: 'salao-nobre',
    title: 'Salão Nobre Principal',
    tag: 'Arquitetura e Conforto',
    description: 'Amplo salão climatizado com imponentes arcos clássicos de vidro integrados ao jardim externo, lustres de cristal com iluminação cênica acolhedora e layout versátil para até 300 convidados.',
    image: '/hall2/hall2_01.webp',
    gallery: [
      '/hall2/hall2_01.webp',
      '/hall2/hall2_02.webp',
      '/hall2/hall2_03.webp',
      '/hall2/hall2_04.webp',
      '/hall2/hall2_05.webp',
      '/hall2/hall2_06.webp',
      '/hall2/hall2_07.webp',
      '/hall2/hall2_08.webp'
    ]
  },
  {
    id: 'mesas-montadas',
    title: 'Mesas Postas & Mobiliário Nobre',
    tag: 'Elegância Editorial',
    description: 'Composições sofisticadas com mesas postas completas, sousplats refinados, taças em cristal lapidado e mobiliário nobre que combina peças clássicas entalhadas, espelhadas e aparadores com arranjos florais de alto padrão.',
    image: '/mesas-postas/mesas_23.webp',
    gallery: [
      '/mesas-postas/mesas_23.webp',
      '/mesas-postas/mesas_03.webp',
      '/mesas-postas/mesas_06.webp',
      '/mesas-postas/mesas_22.webp',
      '/mesas-postas/mesas_30.webp',
      '/mesas-postas/mesas_19.webp',
      '/mesas-postas/mesas_38.webp',
      '/mesas-postas/mesas_04.webp',
      '/mesas-postas/mesas_07.webp',
      '/mesas-postas/mesas_12.webp',
      '/mesas-postas/mesas_14.webp',
      '/mesas-postas/mesas_24.webp',
      '/mesas-postas/mesas_34.webp',
      '/mesas-postas/mesas_35.webp',
      '/mesas-postas/mesas_37.webp',
      '/mesas-postas/mesas_41.webp',
      '/mesas-postas/mesas_01.webp',
      '/mesas-postas/mesas_02.webp',
      '/mesas-postas/mesas_05.webp',
      '/mesas-postas/mesas_08.webp',
      '/mesas-postas/mesas_09.webp',
      '/mesas-postas/mesas_10.webp',
      '/mesas-postas/mesas_11.webp',
      '/mesas-postas/mesas_13.webp',
      '/mesas-postas/mesas_15.webp',
      '/mesas-postas/mesas_16.webp',
      '/mesas-postas/mesas_17.webp',
      '/mesas-postas/mesas_18.webp',
      '/mesas-postas/mesas_20.webp',
      '/mesas-postas/mesas_21.webp',
      '/mesas-postas/mesas_25.webp',
      '/mesas-postas/mesas_26.webp',
      '/mesas-postas/mesas_27.webp',
      '/mesas-postas/mesas_28.webp',
      '/mesas-postas/mesas_29.webp',
      '/mesas-postas/mesas_31.webp',
      '/mesas-postas/mesas_32.webp',
      '/mesas-postas/mesas_33.webp',
      '/mesas-postas/mesas_36.webp',
      '/mesas-postas/mesas_39.webp',
      '/mesas-postas/mesas_40.webp',
      '/mesas-postas/mesas_42.webp'
    ]
  },
  {
    id: 'iluminacao-cenica',
    title: 'Iluminação Cênica & Lustres',
    tag: 'Atmosfera e Emoção',
    description: 'Projeto luminotécnico exclusivo com lustres suntuosos de cristal, cortinas de micro-lâmpadas fairy lights, velas em cilindros de vidro e refletores cênicos que valorizam a decoração e criam uma atmosfera acolhedora.',
    image: '/iluminacao/iluminacao_01.webp',
    gallery: [
      '/iluminacao/iluminacao_01.webp',
      '/iluminacao/iluminacao_02.webp',
      '/iluminacao/iluminacao_03.webp',
      '/iluminacao/iluminacao_04.webp',
      '/iluminacao/iluminacao_05.webp',
      '/iluminacao/iluminacao_06.webp',
      '/iluminacao/iluminacao_07.webp'
    ]
  },
  {
    id: 'area-externa',
    title: 'Jardim & Área Externa Acolhedora',
    tag: 'Natureza e Romantismo',
    description: 'Pérgola coberta com teto em vidro e piso em pedra natural, integrada a um exuberante paisagismo tropical, altar para cerimônias e cenários encantadores protegidos de qualquer clima.',
    image: '/jardim/jardim_01.webp',
    gallery: [
      '/jardim/jardim_01.webp',
      '/jardim/jardim_02.webp',
      '/jardim/jardim_03.webp',
      '/jardim/jardim_04.webp',
      '/jardim/jardim_05.webp',
      '/jardim/jardim_06.webp',
      '/jardim/jardim_07.webp',
      '/jardim/jardim_08.webp',
      '/jardim/jardim_09.webp',
      '/jardim/jardim_10.webp',
      '/jardim/jardim_11.webp',
      '/jardim/jardim_12.webp',
      '/jardim/jardim_13.webp',
      '/jardim/jardim_14.webp',
      '/jardim/jardim_15.webp'
    ]
  },
  {
    id: 'suite-noiva',
    title: 'Suíte Exclusiva dos Noivos / Camarim',
    tag: 'Privacidade & Requinte',
    description: 'Ampla suíte VIP climatizada com camarim profissional para cabelo e maquiagem, espelhos com moldura clássica, poltronas hidráulicas e sala de estar privativa com lustre de cristal.',
    image: '/suite/suite_01.webp',
    gallery: [
      '/suite/suite_01.webp',
      '/suite/suite_02.webp',
      '/suite/suite_03.webp'
    ]
  },
  {
    id: 'pista-lounge',
    title: 'Pista de Dança & Lounge Contemporâneo',
    tag: 'Celebração e Energia',
    description: 'Pista de dança Paris iluminada em vidro com micro-lâmpadas, estrutura box truss com globos espelhados, cabine de DJ profissional e iluminação cênica integrada.',
    image: '/pista/pista_01.webp',
    gallery: [
      '/pista/pista_01.webp',
      '/pista/pista_02.webp',
      '/pista/pista_03.webp',
      '/pista/pista_04.webp'
    ]
  }
];

export const DECORATION_PILLARS = [
  {
    title: 'Flores Nobres',
    description: 'Composições com orquídeas, rosas importadas, hortênsias e folhagens nobres selecionadas uma a uma.',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=900&auto=format&fit=crop'
  },
  {
    title: 'Mesas de Doces & Bolos',
    description: 'Cenários monumentais que se tornam o ponto focal da celebração, com bandejas em cristal, prata e suporte floral aéreo.',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=900&auto=format&fit=crop'
  },
  {
    title: 'Iluminação & Velas',
    description: 'Centenas de velas flutuantes e pendentes, cortinas de luzes e lustres para aquecer o olhar e criar um clima de conto de fadas.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900&auto=format&fit=crop'
  },
  {
    title: 'Ambientação & Cenografia',
    description: 'Tapetes nobres, pergolados revestidos, cortinados em linho puro e lounges confortáveis para os convidados desfrutarem.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=900&auto=format&fit=crop'
  }
];

export const BUFFET_EXPERIENCES: BuffetItem[] = [
  {
    id: 'entradas-verrines',
    title: 'Entradas Gourmet & Verrines Volantes',
    category: 'Boas-Vindas',
    description: 'Apresentação refinada de saladas gourmet servidas em verrines individuais em bandeja de prata, com mix de folhas nobres, cubos de manga fresca, uvas selecionadas e tomatinhos sweet grape.',
    image: '/gastronomia/gastro_01.webp',
    tag: 'Finger Foods',
    gallery: ['/gastronomia/gastro_01.webp']
  },
  {
    id: 'banquete-franco-americano',
    title: 'Banquete Franco-Americano com Rechauds em Prata',
    category: 'Pratos Principais',
    description: 'Bancada suntuosa de banquetes montada sob os arcos coloniais com rechauds em prata cinzelada, assados nobres finalizados com nozes, filé mignon ao molho madeira com lâminas de champignon e guarnições.',
    image: '/gastronomia/gastro_03.webp',
    tag: 'Banquete Quente',
    gallery: ['/gastronomia/gastro_03.webp', '/gastronomia/gastro_04.webp', '/gastronomia/gastro_02.webp']
  },
  {
    id: 'linha-massas-guarnicoes',
    title: 'Estação de Massas & Guarnições Nobres',
    category: 'Massas & Guarnições',
    description: 'Massa talharim fresca, arroz aromatizado com brócolis e salada de fusilli tricolor com legumes e queijos, servidos aquecidos em rechauds de prata com apresentação impecável.',
    image: '/gastronomia/gastro_02.webp',
    tag: 'Serviço Aquecido',
    gallery: ['/gastronomia/gastro_02.webp', '/gastronomia/gastro_04.webp']
  },
  {
    id: 'patisserie-tarteletes',
    title: 'Tarteletes de Amoras & Pâtisserie Artesanal',
    category: 'Sobremesas & Doces',
    description: 'Tarteletes finas artesanais com massa crocante amanteigada recheadas com amoras frescas e folhas de hortelã, servidas em requintadas bandejas de cristal lapidado.',
    image: '/gastronomia/gastro_05.webp',
    tag: 'Pâtisserie Fina',
    gallery: ['/gastronomia/gastro_05.webp', '/gastronomia/gastro_06.webp']
  },
  {
    id: 'torre-doces-finos',
    title: 'Torre de Doces Finos & Finalização',
    category: 'Doces Finos',
    description: 'Docinhos finos de coco enrolados artesanalmente em forminhas verde-menta, dispostos em elegante torre de ferro e madeira ao lado de arranjos florais.',
    image: '/gastronomia/gastro_06.webp',
    tag: 'Doces Nobres',
    gallery: ['/gastronomia/gastro_06.webp', '/gastronomia/gastro_05.webp']
  },
  {
    id: 'openbar-mixologia',
    title: 'Estação de Drinks & Coquetelaria',
    category: 'Bebidas & Coquetéis',
    description: 'Ilha de caipirinhas com frutas frescas da estação (limão, morango, maracujá), drinks contemporâneos e serviço de bar dinâmico.',
    image: '/pista/pista_03.webp',
    tag: 'Mixologia & Drinks',
    gallery: ['/pista/pista_03.webp']
  }
];

export const BUFFET_GALLERY_PHOTOS = [
  {
    image: '/gastronomia/gastro_01.webp',
    title: 'Verrines Gourmet de Salada',
    category: 'Entradas Volantes',
    description: 'Mix de folhas nobres, manga fresca, uvas e tomate sweet grape servidos em taças individuais em bandeja de prata cinzelada.'
  },
  {
    image: '/gastronomia/gastro_03.webp',
    title: 'Banquete Completo em Rechauds de Prata',
    category: 'Pratos Principais',
    description: 'Apresentação suntuosa do buffet franco-americano do Espaço Lumier com rechauds aquecidos, assados com nozes e flores naturais.'
  },
  {
    image: '/gastronomia/gastro_04.webp',
    title: 'Filé ao Molho Madeira e Pratos Quentes',
    category: 'Linha Quente',
    description: 'Filé mignon ao molho madeira com champignon laminado, estrogonofe cremoso e acompanhamentos servidos fumegantes.'
  },
  {
    image: '/gastronomia/gastro_02.webp',
    title: 'Estação de Massas e Arroz com Brócolis',
    category: 'Guarnições & Massas',
    description: 'Talharim artesanal, arroz com brócolis e salada de massa com legumes servidos em rechauds de prata com identificação personalizada.'
  },
  {
    image: '/gastronomia/gastro_05.webp',
    title: 'Tarteletes de Amoras Frescas',
    category: 'Pâtisserie Fina',
    description: 'Tarteletes artesanais com amoras frescas e hortelã em bandeja de cristal lapidado ao lado da mesa de bolos.'
  },
  {
    image: '/gastronomia/gastro_06.webp',
    title: 'Torre de Doces Finos',
    category: 'Mesa de Doces',
    description: 'Docinhos de coco finos em forminhas verde-menta dispostos em torre ornamental de dois andares com hortênsias.'
  }
];

export const GALLERY_ITEMS: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Cerimônia Noturna com Lustres e Flores Brancas',
    category: 'casamentos',
    categoryLabel: 'Casamentos',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'landscape',
    caption: 'Composição de casamento com mesa de noivos emoldurada por arcos florais e iluminação quente.'
  },
  {
    id: 'gal-2',
    title: 'Mesa de Doces Monumental com Lustres de Cristal',
    category: 'decoracao',
    categoryLabel: 'Decoração',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'portrait',
    caption: 'Mesa principal com arranjos aéreos em folhagens nobres e hortênsias.'
  },
  {
    id: 'gal-3',
    title: 'Ilha Gastronômica de Antepastos Finos',
    category: 'buffet',
    categoryLabel: 'Buffet',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'square',
    caption: 'Apresentação refinada com queijos nobres, favos de mel e frutas da estação.'
  },
  {
    id: 'gal-4',
    title: 'Festa de 15 Anos com Cenografia Espelhada',
    category: '15anos',
    categoryLabel: '15 Anos',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'portrait',
    caption: 'Debutante com ambientação contemporânea em tons rosé gold e lustres pendentes.'
  },
  {
    id: 'gal-5',
    title: 'Mesa Imperial com Velas e Taças de Cristal',
    category: 'decoracao',
    categoryLabel: 'Decoração',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'landscape',
    caption: 'Mesa posta imperial para banquete com arranjo floral contínuo.'
  },
  {
    id: 'gal-6',
    title: 'Jantar Principal Empratado Contemporâneo',
    category: 'buffet',
    categoryLabel: 'Buffet',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'square',
    caption: 'Gastronomia sofisticada com ingredientes selecionados e finalização impecável.'
  },
  {
    id: 'gal-7',
    title: 'Jardim Iluminado para Cerimônias ao Ar Livre',
    category: 'celebracoes',
    categoryLabel: 'Celebrações',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'landscape',
    caption: 'Área externa arborizada decorada com microlâmpadas e passarela de madeira nobre.'
  },
  {
    id: 'gal-8',
    title: 'Brinde com Espumante e Taças Harmonizadas',
    category: 'celebracoes',
    categoryLabel: 'Celebrações',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'portrait',
    caption: 'Serviço de open bar com rótulos selecionados para momentos inesquecíveis.'
  },
  {
    id: 'gal-9',
    title: 'Festa de 15 Anos com Pista de Led e Lounge',
    category: '15anos',
    categoryLabel: '15 Anos',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'landscape',
    caption: 'Área da pista com som de alta fidelidade e efeitos visuais imersivos.'
  },
  {
    id: 'gal-10',
    title: 'Entrada Triunfal dos Noivos sob Chuva de Luzes',
    category: 'casamentos',
    categoryLabel: 'Casamentos',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'square',
    caption: 'A emoção dos noivos recebendo seus convidados em atmosfera mágica.'
  },
  {
    id: 'gal-11',
    title: 'Doces Finos e Chocolates Belgas Artesanais',
    category: 'buffet',
    categoryLabel: 'Buffet',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'landscape',
    caption: 'Forminhas artesanais em tecido nobre e doces finos de alta confeitaria.'
  },
  {
    id: 'gal-12',
    title: 'Arranjos Florais e Detalhes de Cenografia Nobre',
    category: 'decoracao',
    categoryLabel: 'Decoração',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'portrait',
    caption: 'Texturas orgânicas e flores nobres em harmonia com o ambiente do salão.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Jefferson Roberto Felgueiras',
    eventType: 'Avaliação no Google',
    date: 'Local Guide',
    quote: 'Super recomendável. Trabalho sério e de qualidade inigualável. A proprietária é super responsável, as instalações são ótimas, a decoração super atual, o atendimento de primeira, o acesso e localização são privilegiados, a comida é farta e deliciosa e o buffet é super variado.',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWEEL-Mplm3zvwQ_8t_qa9gpoAunMf_o8n8pJ4U8L_TC-lDSzQt=s120-c-rp-mo-ba12-br100',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Sabrina de Souza',
    eventType: 'Avaliação no Google',
    date: 'Cliente Verificada',
    quote: 'Salão de eventos com muitas possibilidades para festas. Escadaria, salão de tamanho muito bom e um belo terraço em frente. Muito bonito!',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUkPBV8AfWigtnJQI9MdCUVfEV6PunRmrOyrr9greRwntWfoAb8DQ=s120-c-rp-mo-ba12-br100',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Edna Teodoro',
    eventType: 'Avaliação no Google',
    date: 'Cliente Verificada',
    quote: 'Excelente salão para festas, localização privilegiada em Vicente Pires, muito fácil chegar.',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjU06dUK7_kCg-Nro7oG803-_aRub17czaAFl_IC7FnIOy1BK78R=s120-c-rp-mo-ba12-br100',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'Walison Alvim',
    eventType: 'Avaliação no Google',
    date: 'Cliente Verificado',
    quote: 'Espaço amplo para fazer um evento dos sonhos. Recomendo muito o Espaço Lumier!',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjW84nDvuh_H7JPFNP0_en1ckv3U-hm-DLJrvwpUC00ZWKOyDuo-=s120-c-rp-mo-ba12-br100',
    rating: 5
  },
  {
    id: 'test-5',
    name: 'Maria Luzinete Morais',
    eventType: 'Avaliação no Google',
    date: 'Cliente Verificada',
    quote: 'Muito lindo! Um espaço para eventos simplesmente perfeito.',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVia1-o2cxGpQ-wZ7qZw93-G1SxNzf81ZpibYpdw_O5NF_YKj7m9w=s120-c-rp-mo-ba12-br100',
    rating: 5
  },
  {
    id: 'test-6',
    name: 'Vagner Martins',
    eventType: 'Avaliação no Google',
    date: 'Cliente Verificado',
    quote: 'Atendimento muito bom, equipe atenciosa e o espaço é lindo.',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJodnd5DxA1CrP-FNXflYN9TIAeKlg7iiVAzhnce6X3ZS_N4g=s120-c-rp-mo-ba12-br100',
    rating: 5
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'insta-1',
    image: '/iluminacao/iluminacao_01.webp',
    likes: 1240,
    caption: 'A suntuosidade dos nossos lustres de cristal e a mesa de bolo com orquídeas que encanta todos os olhares. ✨💎 #EspacoLumier #LustresDeCristal #CasamentoBrasilia #DecoracaoLuxo',
    date: 'Há 2 dias'
  },
  {
    id: 'insta-2',
    image: '/iluminacao/iluminacao_02.webp',
    likes: 985,
    caption: 'Romantismo em cada detalhe: velas flutuantes e arranjos florais clássicos criando uma atmosfera calorosa e inesquecível. 🕯️🌹 #IluminacaoCenica #EspacoLumier #NoivasDF #AmbienteAcolhedor',
    date: 'Há 4 dias'
  },
  {
    id: 'insta-3',
    image: '/iluminacao/iluminacao_03.webp',
    likes: 1420,
    caption: 'Mesas imperiais sob iluminação cênica acolhedora e taças nobres para receber os convidados com sofisticação. 🕊️✨ #MesaPosta #CasamentosDF #VicentePires #EspacoDeEventos',
    date: 'Há 6 dias'
  },
  {
    id: 'insta-4',
    image: '/iluminacao/iluminacao_04.webp',
    likes: 876,
    caption: 'O charme da nossa área externa e jardim com iluminação cênica dinâmica valorizando o paisagismo tropical. 🌿✨ #Cenografia #JardimLumier #EventosBrasilia',
    date: 'Há 1 semana'
  },
  {
    id: 'insta-5',
    image: '/iluminacao/iluminacao_05.webp',
    likes: 1530,
    caption: 'A magia dos detalhes: redoma encantada com micro-lâmpadas fairy lights para marcar celebrações inesquecíveis. 💖✨ #15AnosBrasilia #DebutantesDF #LuzesCenicas #EspacoLumier',
    date: 'Há 1 semana'
  },
  {
    id: 'insta-6',
    image: '/iluminacao/iluminacao_06.webp',
    likes: 1115,
    caption: 'Mesa de encerramento colonial com prataria fina e iluminação cênica para brindar aos grandes momentos. ☕🥂 #BuffetDeLuxo #GastronomiaAutoral #EspacoLumier',
    date: 'Há 2 semanas'
  }
];

export const VENUE_KEY_SPECS = [
  { label: 'Capacidade', value: 'Até 300 Convidados', sub: 'Salão com layout modular' },
  { label: 'Tradição', value: '20+ Anos', sub: 'Realizando sonhos em Brasília' },
  { label: 'Estrutura', value: 'Climatizado', sub: 'Com isolamento acústico' },
  { label: 'Estacionamento', value: 'Segurança Contínua', sub: 'Do início ao fim' },
  { label: 'Conforto', value: 'Suíte dos Noivos', sub: 'Camarim exclusivo privativo' },
  { label: 'Localização', value: 'Vicente Pires - DF' }
];
