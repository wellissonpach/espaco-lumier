import React, { useState, useEffect } from 'react';
import { SPACE_FEATURES, getWhatsAppUrl } from '../data/lumierData';
import { Sparkles, Maximize2, ArrowRight, ChevronLeft, ChevronRight, Images, X, MessageCircle } from 'lucide-react';
import { SpaceFeature } from '../types';

const HALL2_CAPTIONS: string[] = [
  'Visão panorâmica do Salão Nobre com mesas montadas e arcos clássicos com vista para o jardim',
  'Ambiente amplo com mesas redondas, arranjos nobres e iluminação aconchegante',
  'Integração harmoniosa entre o salão interno climatizado e os jardins externos',
  'Perspectiva de profundidade do salão principal preparado para acomodar até 300 convidados',
  'Lustres de cristal e sancas iluminadas que conferem sofisticação e requinte ao espaço',
  'Atmosfera noturna intimista com iluminação cênica e visual elegante',
  'Simetria dos arcos clássicos de vidro com excelente iluminação natural e vista verde',
  'Ampla circulação e layout modulável para recepções, jantares e pista de dança'
];

const MESAS_CAPTIONS: string[] = [
  'Mesa posta de convidados com sousplats metalizados, taças de cristal lapidado e guardanapos em cetim verde esmeralda',
  'Mesa de doces e bolo com mesas ripadas em madeira nobre, orquídeas e arranjos florais em tons quentes',
  'Mobiliário nobre em madeira maciça com bolo nupcial clássico e composição floral exuberante',
  'Mesa redonda de convidados com imponente arranjo floral em taça de vidro e cadeiras de design clássico',
  'Mesa clássica entalhada dourada com iluminação cênica de velas e lustres suntuosos',
  'Mesa espelhada moderna para celebrações de 15 anos com globos espelhados e bolo cenográfico',
  'Mesa temática ricamente ornamentada com peças de antiquário, arranjos florais e doces finos',
  'Composição de arranjos florais com flores nobres e folhagens tropicais valorizando o mobiliário',
  'Aparadores rústico-chiques em madeira com bandejas em prata e peças de design autoral',
  'Louçaria refinada com pratos oitavados, talheres em inox e sousplats em tons metálicos',
  'Mesa de bolo com cascata floral e iluminação personalizada de alta definição',
  'Mobiliário de apoio com mesas de centro orgânicas e vasos com arranjos delicados'
];

const ILUMINACAO_CAPTIONS: string[] = [
  'Lustre suntuoso de cristal nobre sobre a mesa principal, com sancas iluminadas e cortina de fairy lights',
  'Composição luminotécnica intimista com velas flutuantes em cilindros de vidro e bandejas douradas',
  'Mesa imperial com iluminação cênica acolhedora, taças âmbar e cortina de micro-lâmpadas ao fundo',
  'Iluminação cênica dinâmica com refletores LED valorizando parede verde tropical e lounge de recepção',
  'Redoma de vidro com micro-lâmpadas fairy lights iluminando rosa encantada com toque de magia',
  'Estação de café colonial e welcome drink com iluminação pontual sobre samovares e louçaria fina',
  'Detalhe de iluminação quente refletida em taças lapidadas âmbar e tampo de madeira rústico-chique'
];

const JARDIM_CAPTIONS: string[] = [
  'Nave cerimonial com passadeira branca, estrutura em vidro e paisagismo tropical sob a pérgola',
  'Cerimônia ao entardecer sob teto de vidro com globos luminosos e plantas ornamentais',
  'Mesa de bolo e doces no jardim com orquídeas brancas, samambaias e cristaleira rústica',
  'Entrada da noiva ladeada por imponentes ânforas de rosas brancas, lírios e cortinas em voil',
  'Altar cerimonial com arco em tecido azul celeste e branco, arranjos de hortênsias e passadeira em juta',
  'Cristaleira clássica em madeira decorada com porta-retratos, doces finos e folhagens tropicais',
  'Decoração estilo boho-chic com tapetes persas sobre pedra natural e arranjos de bougainvillea',
  'Flores em tons suaves e folhagens nobres valorizando o corredor da cerimônia ao ar livre',
  'Detalhe dos arranjos em cestaria rústica com rosas brancas e lírios ao longo da passadeira',
  'Perspectiva lateral da pérgola envidraçada com cadeiras para convidados e vista para a natureza',
  'Luminárias suspensas estilo lanterna japonesa criando iluminação suave e romântica',
  'Cenário acolhedor com integração total entre a área verde do jardim e o salão de festas',
  'Ambiente arborizado com palmeiras, samambaias e costelas-de-adão de porte maduro',
  'Mesa de apoio no jardim com detalhes florais e composição cenográfica personalizada',
  'Visão dos arcos e da arquitetura do Espaço Lumier integrada aos jardins externos'
];

const SUITE_CAPTIONS: string[] = [
  'Suíte VIP completa com camarim profissional para maquiagem e penteado, poltronas hidráulicas e sala de estar',
  'Ambiente climatizado com bancada de produção, espelhos com moldura clássica e lustre de cristal nobre',
  'Lounge privativo em patamar elevado de granito preto com poltronas confortáveis para descanso e retoques'
];

const PISTA_CAPTIONS: string[] = [
  'Valsa dos noivos sobre a pista de dança Paris iluminada com micro-lâmpadas sob vidro e globos espelhados',
  'Visão frontal da pista com estrutura metálica suspensa, múltiplos globos de espelho, moving heads e cabine de DJ',
  'Pista interativa com módulos LED multicoloridos vista a partir da estação de drinks com DJ ao vivo',
  'Celebração e balada com convidados, personagens performáticos prateados com LED e efeitos especiais de luz'
];

interface TheSpaceSectionProps {
  onSelectImageForLightbox?: (image: string, title: string, caption: string) => void;
}

interface CatalogModalState {
  id: string;
  title: string;
  description: string;
  images: string[];
  currentIndex: number;
}

interface SpaceCardCarouselProps {
  images: string[];
  title: string;
  onOpenCatalog: (index: number) => void;
}

const SpaceCardCarousel: React.FC<SpaceCardCarouselProps> = ({ images, title, onOpenCatalog }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative w-full h-full cursor-pointer group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenCatalog(currentIdx)}
      title="Clique para abrir o catálogo de fotos"
    >
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`${title} - Foto ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            idx === currentIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          loading={idx === 0 ? 'eager' : 'lazy'}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19]/70 via-transparent to-transparent pointer-events-none"></div>

      {/* Prev / Next Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 touch-manipulation"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 touch-manipulation"
        aria-label="Próxima foto"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Photo Counter Pill */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-white/95 font-medium tracking-wider border border-white/10 shadow-sm">
        <Images className="w-3 h-3 text-[#C5A880]" />
        <span>{currentIdx + 1} / {images.length}</span>
      </div>

      {/* Center "Abrir Catálogo" hint on hover */}
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="px-3.5 py-1.5 bg-black/75 backdrop-blur-md text-white text-xs font-medium tracking-wider rounded-full flex items-center gap-1.5 shadow-xl border border-white/20">
          <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
          Ver Catálogo Completo
        </span>
      </div>

      {/* Mini Progress Dots */}
      <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center items-center gap-1 px-4">
        {images.map((_, dotIdx) => (
          <button
            type="button"
            key={dotIdx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx(dotIdx);
            }}
            aria-label={`Ir para foto ${dotIdx + 1} de ${title}`}
            className="p-1.5 cursor-pointer touch-manipulation focus:outline-none"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === currentIdx ? 'w-4 bg-[#C5A880]' : 'w-1.5 bg-white/50 hover:bg-white'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export const TheSpaceSection: React.FC<TheSpaceSectionProps> = ({ onSelectImageForLightbox }) => {
  const [catalogModal, setCatalogModal] = useState<CatalogModalState | null>(null);

  useEffect(() => {
    if (!catalogModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCatalogModal(null);
      if (e.key === 'ArrowLeft') {
        setCatalogModal((prev) =>
          prev
            ? {
                ...prev,
                currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
              }
            : null
        );
      }
      if (e.key === 'ArrowRight') {
        setCatalogModal((prev) =>
          prev
            ? {
                ...prev,
                currentIndex: (prev.currentIndex + 1) % prev.images.length
              }
            : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [catalogModal !== null]);

  const openCatalog = (feature: SpaceFeature, initialIndex: number = 0) => {
    if (feature.gallery && feature.gallery.length > 0) {
      setCatalogModal({
        id: feature.id,
        title: feature.title,
        description: feature.description,
        images: feature.gallery,
        currentIndex: initialIndex
      });
    } else if (onSelectImageForLightbox) {
      onSelectImageForLightbox(feature.image, feature.title, feature.description);
    }
  };

  const handleModalPrev = () => {
    setCatalogModal((prev) =>
      prev
        ? {
            ...prev,
            currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
          }
        : null
    );
  };

  const handleModalNext = () => {
    setCatalogModal((prev) =>
      prev
        ? {
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.images.length
          }
        : null
    );
  };

  return (
    <section id="espaco" className="py-20 sm:py-28 bg-[#FAF8F5] text-[#2C2825] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#785E34] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Infraestrutura Completa em Vicente Pires</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1E1B19] tracking-tight mb-4">
            Um cenário que se transforma para cada ocasião.
          </h2>
          <p className="text-base sm:text-lg text-[#6B6158] font-light max-w-2xl mx-auto leading-relaxed">
            Cada detalhe é pensado para criar uma atmosfera única, elegante e acolhedora para o seu evento.
          </p>
        </div>

        {/* Visual Composition of Space Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPACE_FEATURES.map((item) => {
            const hasGallery = item.gallery && item.gallery.length > 1;

            return (
              <div
                key={item.id}
                className="group relative bg-[#FAF8F5] rounded-sm overflow-hidden border border-[#E8DFD3] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                {/* Image with Tag / Carousel */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E8DFD3]">
                  {hasGallery ? (
                    <SpaceCardCarousel
                      images={item.gallery!}
                      title={item.title}
                      onOpenCatalog={(idx) => openCatalog(item, idx)}
                    />
                  ) : (
                    <>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19]/70 via-transparent to-transparent"></div>

                      {onSelectImageForLightbox && (
                        <button
                          onClick={() => onSelectImageForLightbox(item.image, item.title, item.description)}
                          className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer touch-manipulation shadow-sm"
                          aria-label="Ampliar foto"
                          title="Ampliar foto"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#FAF8F5]/90 backdrop-blur-sm text-[11px] font-semibold tracking-wider text-[#1E1B19] uppercase rounded-sm shadow-sm pointer-events-none">
                    {item.tag}
                  </span>
                </div>

                {/* Text info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-xl font-normal text-[#1E1B19] group-hover:text-[#785E34] transition-colors">
                        {item.title}
                      </h3>
                      {hasGallery && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#785E34] bg-[#785E34]/10 px-2 py-0.5 rounded-full">
                          <Images className="w-3 h-3" />
                          Catálogo
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#6B6158] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {hasGallery && (
                    <div className="pt-4 mt-4 border-t border-[#E8DFD3]/60">
                      <button
                        onClick={() => openCatalog(item, 0)}
                        className="w-full py-3 px-4 bg-[#1E1B19] hover:bg-[#785E34] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer group/btn min-h-[44px] touch-manipulation"
                      >
                        <Images className="w-4 h-4 text-[#C5A880] group-hover/btn:scale-110 transition-transform" />
                        <span>Ver Catálogo de Fotos ({item.gallery!.length} fotos)</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href={getWhatsAppUrl('Olá! Gostaria de agendar uma visita presencial para conhecer o Salão Nobre e a estrutura completa do Espaço Lumier.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#785E34] hover:text-[#C5A880] transition-colors group cursor-pointer py-2 min-h-[44px]"
          >
            <span>Deseja conhecer nosso salão pessoalmente? Agende uma visita guiada</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* PHOTO CATALOG MODAL */}
      {catalogModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Catálogo de Fotos — ${catalogModal.title}`}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-6 pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)] bg-black/92 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
          onClick={() => setCatalogModal(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1E1B19] rounded-sm overflow-hidden border border-[#C5A880]/30 shadow-2xl flex flex-col max-h-[calc(100dvh-2.5rem)] sm:max-h-[95vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#161413]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-full text-[#C5A880]">
                  <Images className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-lg sm:text-xl text-white font-normal leading-snug">
                    Catálogo de Fotos — {catalogModal.title}
                  </h4>
                  <p className="text-[11px] text-[#A89F91]">
                    {catalogModal.id === 'mesas-montadas'
                      ? 'Espaço Lumier • Vicente Pires — Acervo de mesas postas e mobiliário nobre'
                      : catalogModal.id === 'iluminacao-cenica'
                      ? 'Espaço Lumier • Vicente Pires — Projeto luminotécnico, lustres e micro-lâmpadas'
                      : catalogModal.id === 'area-externa'
                      ? 'Espaço Lumier • Vicente Pires — Cerimônias ao ar livre e jardim com teto em vidro'
                      : catalogModal.id === 'suite-noiva'
                      ? 'Espaço Lumier • Vicente Pires — Suíte VIP dos noivos e camarim profissional'
                      : catalogModal.id === 'pista-lounge'
                      ? 'Espaço Lumier • Vicente Pires — Pista Paris iluminada, estrutura de som e DJ'
                      : 'Espaço Lumier • Vicente Pires — Fotos oficiais do espaço'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/90 font-medium">
                  {catalogModal.currentIndex + 1} de {catalogModal.images.length}
                </div>
                <button
                  onClick={() => setCatalogModal(null)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer touch-manipulation"
                  aria-label="Fechar catálogo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Area */}
            <div className="relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[460px] max-h-[60vh] overflow-hidden">
              <img
                src={catalogModal.images[catalogModal.currentIndex]}
                alt={`${catalogModal.title} - Foto ${catalogModal.currentIndex + 1}`}
                className="w-full h-full max-h-[60vh] object-contain transition-opacity duration-300"
                key={catalogModal.images[catalogModal.currentIndex]}
              />

              {/* Navigation Arrows */}
              <button
                onClick={handleModalPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-105 cursor-pointer shadow-xl border border-white/10 touch-manipulation"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleModalNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-105 cursor-pointer shadow-xl border border-white/10 touch-manipulation"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] text-white/90 border border-white/15">
                {catalogModal.currentIndex + 1} / {catalogModal.images.length}
              </div>
            </div>

            {/* Caption & Context Bar */}
            <div className="p-4 sm:p-5 bg-[#1A1816] border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-[#F5F0EB] font-light leading-relaxed">
                  {catalogModal.id === 'hall-nobre'
                    ? (HALL2_CAPTIONS[catalogModal.currentIndex] || catalogModal.description)
                    : catalogModal.id === 'mesas-montadas'
                    ? (MESAS_CAPTIONS[catalogModal.currentIndex] || catalogModal.description)
                    : catalogModal.id === 'iluminacao-cenica'
                    ? (ILUMINACAO_CAPTIONS[catalogModal.currentIndex] || catalogModal.description)
                    : catalogModal.id === 'area-externa'
                    ? (JARDIM_CAPTIONS[catalogModal.currentIndex] || catalogModal.description)
                    : catalogModal.id === 'suite-noiva'
                    ? (SUITE_CAPTIONS[catalogModal.currentIndex] || catalogModal.description)
                    : catalogModal.id === 'pista-lounge'
                    ? (PISTA_CAPTIONS[catalogModal.currentIndex] || catalogModal.description)
                    : catalogModal.description}
                </p>
              </div>
            </div>

            {/* Thumbnails Strip */}
            <div className="p-3 sm:p-4 bg-[#161413] border-t border-white/10">
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#C5A880]/40 scrollbar-track-transparent">
                {catalogModal.images.map((thumb, idx) => {
                  const isActive = idx === catalogModal.currentIndex;
                  return (
                    <button
                      key={thumb}
                      onClick={() => setCatalogModal({ ...catalogModal, currentIndex: idx })}
                      className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-sm overflow-hidden border-2 transition-all cursor-pointer touch-manipulation ${
                        isActive
                          ? 'border-[#C5A880] ring-2 ring-[#C5A880]/50 scale-105 opacity-100'
                          : 'border-transparent opacity-50 hover:opacity-85'
                      }`}
                      aria-label={`Ver foto ${idx + 1}`}
                    >
                      <img
                        src={thumb}
                        alt={`Miniatura ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-0.5 right-1 text-[11px] bg-black/70 px-1 rounded text-white font-mono">
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Bar */}
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-[#A89F91] text-[11px] hidden sm:inline">
                  Dica: use as setas do teclado (← →) para navegar pelas fotos ou ESC para fechar.
                </span>

                <a
                  href={getWhatsAppUrl(
                    catalogModal.id === 'mesas-montadas'
                      ? 'Olá! Estava vendo o catálogo de Mesas Postas e Mobiliário Nobre do Espaço Lumier e gostaria de mais informações para o meu evento.'
                      : catalogModal.id === 'iluminacao-cenica'
                      ? 'Olá! Estava vendo o catálogo de Iluminação Cênica & Lustres do Espaço Lumier e gostaria de saber mais sobre o projeto de iluminação para o meu evento.'
                      : catalogModal.id === 'area-externa'
                      ? 'Olá! Estava vendo o catálogo de Jardim e Área Externa do Espaço Lumier e gostaria de agendar uma visita para conhecer o espaço de cerimônia ao ar livre.'
                      : catalogModal.id === 'suite-noiva'
                      ? 'Olá! Estava vendo o catálogo da Suíte Exclusiva dos Noivos / Camarim do Espaço Lumier e gostaria de agendar uma visita para conhecer a estrutura do camarim.'
                      : catalogModal.id === 'pista-lounge'
                      ? 'Olá! Estava vendo o catálogo da Pista de Dança Paris & Iluminação do Espaço Lumier e gostaria de saber mais sobre a estrutura para DJ e festa.'
                      : 'Olá! Estava vendo o catálogo de fotos do Salão Nobre Principal e gostaria de agendar uma visita presencial para conhecer o espaço.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C5A880] hover:bg-[#b89758] text-[#1E1B19] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md min-h-[44px] cursor-pointer touch-manipulation"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-[#1E1B19]" />
                  <span>
                    {catalogModal.id === 'mesas-montadas'
                      ? 'Quero Personalizar a Decoração do Meu Evento'
                      : catalogModal.id === 'iluminacao-cenica'
                      ? 'Quero Conhecer o Projeto de Iluminação'
                      : catalogModal.id === 'area-externa'
                      ? 'Quero Realizar Minha Cerimônia no Jardim'
                      : catalogModal.id === 'suite-noiva'
                      ? 'Quero Conhecer a Suíte dos Noivos'
                      : catalogModal.id === 'pista-lounge'
                      ? 'Quero Saber Mais Sobre a Pista e DJ'
                      : 'Quero Conhecer Este Espaço Presencialmente'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
