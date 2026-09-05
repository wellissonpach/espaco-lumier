import React, { useState, useEffect } from 'react';
import { EVENT_TYPES, getWhatsAppUrl } from '../data/lumierData';
import { EventTypeItem } from '../types';
import { ArrowRight, Sparkles, Users, CheckCircle, X, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface EventCardCarouselProps {
  images: string[];
  title: string;
}

const EventCardCarousel: React.FC<EventCardCarouselProps> = ({ images, title }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 2500);
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
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`Espaço Lumier - ${title} ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
            idx === currentIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          loading={idx === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Navigation arrows (revealed on hover) */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Photo Counter Pill at Top-Right */}
          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white/95 font-medium tracking-wider border border-white/10">
            {currentIdx + 1} / {images.length}
          </div>

          {/* Mini progress dots */}
          <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-1 px-4 pointer-events-none">
            {images.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  dotIdx === currentIdx ? 'w-4 bg-[#C5A880]' : 'w-1 bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

interface EventTypesSectionProps {
  onOpenBudgetModal: (eventType?: string) => void;
}

export const EventTypesSection: React.FC<EventTypesSectionProps> = ({ onOpenBudgetModal }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventTypeItem | null>(null);

  return (
    <section id="historias" className="py-20 sm:py-28 bg-[#F5F0EB] text-[#2C2825] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[#785E34] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Celebrações Sob Medida</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1E1B19] tracking-tight mb-4">
            Um espaço para diferentes histórias.
          </h2>
          <p className="text-base sm:text-lg text-[#6B6158] font-light max-w-2xl mx-auto leading-relaxed">
            Cada celebração tem seu próprio ritmo e emoção. Desenvolvemos cenografias e experiências personalizadas para marcar para sempre cada momento.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {EVENT_TYPES.map((event) => (
            <div
              key={event.id}
              id={`event-card-${event.id}`}
              className="group bg-[#FAF8F5] rounded-sm overflow-hidden border border-[#E8DFD3] flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Card Image with Parallax & Hover Zoom / Carousel */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E8DFD3]">
                {event.gallery && event.gallery.length > 1 ? (
                  <EventCardCarousel images={event.gallery} title={event.title} />
                ) : (
                  <img
                    src={event.image}
                    alt={`Espaço Lumier - ${event.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19]/80 via-[#1E1B19]/20 to-transparent pointer-events-none"></div>
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-sm text-[10px] uppercase tracking-widest font-semibold text-[#1E1B19] rounded-sm">
                    {event.title}
                  </span>
                </div>

                {/* Bottom Overlay Info on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#E8DFD3] font-light mb-1">
                    <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{event.guestCapacity}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-tight">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-serif italic text-sm text-[#785E34] mb-2">
                    "{event.subtitle}"
                  </p>
                  <p className="text-xs text-[#6B6158] leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DFD3]/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="text-xs font-semibold text-[#1E1B19] uppercase tracking-wider hover:text-[#B89758] flex items-center gap-1 transition-colors"
                  >
                    <span>Ver Detalhes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={getWhatsAppUrl(`Olá! Gostaria de um orçamento personalizado para ${event.title} no Espaço Lumier.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#25D366] hover:bg-[#25D366]/10 rounded-full transition-colors"
                    title={`Solicitar orçamento de ${event.title} no WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Simulator Callout */}
        <div className="mt-16 bg-[#FAF8F5] border border-[#E8DFD3] p-8 rounded-sm shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1E1B19]">
              Planejando outro formato ou comemoração especial?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6158] mt-1">
              Adaptamos nossa gastronomia, cenografia e layout para jantares intimistas, bodas, mini weddings e formaturas.
            </p>
          </div>
          <button
            onClick={() => onOpenBudgetModal()}
            className="whitespace-nowrap px-6 py-3 bg-[#1E1B19] text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#38332F] transition-colors rounded-sm"
          >
            Personalizar Meu Evento
          </button>
        </div>

      </div>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#FAF8F5] rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8DFD3] relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#1E1B19] transition-colors shadow-sm"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E8DFD3]">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#D9CFC4]">Experiência Lumier</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">{selectedEvent.title}</h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <p className="font-serif italic text-base sm:text-lg text-[#785E34] mb-2">
                  "{selectedEvent.subtitle}"
                </p>
                <p className="text-sm text-[#554D46] leading-relaxed">
                  {selectedEvent.fullDescription}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1E1B19] mb-3">
                  O que está incluso e diferenciais
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedEvent.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#554D46] bg-[#F5F0EB] p-2.5 rounded-sm">
                      <CheckCircle className="w-4 h-4 text-[#785E34] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Mini Gallery */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1E1B19] mb-3">
                  Galeria de Fotos
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedEvent.gallery.map((imgUrl, idx) => (
                    <div key={idx} className="aspect-square rounded-sm overflow-hidden bg-[#E8DFD3]">
                      <img
                        src={imgUrl}
                        alt={`${selectedEvent.title} detalhe ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E8DFD3] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const evt = selectedEvent.title;
                    setSelectedEvent(null);
                    onOpenBudgetModal(evt);
                  }}
                  className="px-5 py-3 border border-[#C5A880] text-[#785E34] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A880]/10 transition-colors rounded-sm"
                >
                  Simular com Convidados
                </button>

                <a
                  href={getWhatsAppUrl(`Olá! Gostaria de consultar datas e valores para ${selectedEvent.title} no Espaço Lumier.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20bd5a] transition-colors rounded-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Orçar {selectedEvent.title} no WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
