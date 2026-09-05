import React, { useState } from 'react';
import { BUFFET_EXPERIENCES, BUFFET_GALLERY_PHOTOS, getWhatsAppUrl } from '../data/lumierData';
import { Utensils, CheckCircle2, ArrowRight, MessageCircle, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';
import { BuffetItem } from '../types';

interface BuffetSectionProps {
  onOpenBudgetModal: (initialEvent?: string) => void;
  onSelectImageForLightbox?: (image: string, title: string, caption: string) => void;
}

export const BuffetSection: React.FC<BuffetSectionProps> = ({ onOpenBudgetModal, onSelectImageForLightbox }) => {
  const [activeItem, setActiveItem] = useState<BuffetItem>(BUFFET_EXPERIENCES[0]);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const handleSelectItem = (item: BuffetItem) => {
    setActiveItem(item);
    setActiveImageIdx(0);
  };

  const currentGallery = activeItem.gallery && activeItem.gallery.length > 0 
    ? activeItem.gallery 
    : [activeItem.image];
  const currentImage = currentGallery[activeImageIdx] || activeItem.image;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === 0 ? currentGallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % currentGallery.length);
  };

  return (
    <section id="buffet" className="py-20 sm:py-32 bg-[#FAF8F5] text-[#2C2825] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#785E34] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <Utensils className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Gastronomia de Alto Padrão</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1E1B19] tracking-tight mb-4">
            Uma experiência que também se saboreia.
          </h2>

          <p className="text-base sm:text-lg text-[#6B6158] font-light max-w-2xl mx-auto leading-relaxed">
            Do primeiro detalhe da mesa ao último sabor da celebração, cada elemento faz parte da experiência.
          </p>
        </div>

        {/* Interactive Gastronomic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Menu Selector (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#785E34] font-semibold mb-4 px-1">
              Selecione uma experiência do nosso cardápio:
            </div>

            {BUFFET_EXPERIENCES.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`w-full text-left p-4 sm:p-5 rounded-sm transition-all duration-300 border flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-[#F5F0EB] border-[#C5A880] shadow-sm'
                      : 'bg-[#FAF8F5] border-[#E8DFD3] hover:bg-[#F5F0EB]/60 hover:border-[#D9CFC4]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#785E34] block mb-0.5">
                      {item.category}
                    </span>
                    <h3 className={`font-serif text-lg font-normal transition-colors ${
                      isSelected ? 'text-[#1E1B19]' : 'text-[#4A433E] group-hover:text-[#1E1B19]'
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  <span className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? 'bg-[#C5A880] scale-125' : 'bg-[#E8DFD3] group-hover:bg-[#C5A880]/50'
                  }`}></span>
                </button>
              );
            })}
          </div>

          {/* Active Dish Feature Display (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] rounded-sm border border-[#E8DFD3] overflow-hidden shadow-xl">
              
              <div 
                className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#E8DFD3] cursor-pointer group"
                onClick={() => onSelectImageForLightbox && onSelectImageForLightbox(currentImage, activeItem.title, activeItem.description)}
                title="Clique para ampliar a foto"
              >
                <img
                  key={currentImage}
                  src={currentImage}
                  alt={activeItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19]/75 via-transparent to-transparent pointer-events-none"></div>
                
                {activeItem.tag && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-sm text-[10px] uppercase font-bold tracking-widest text-[#1E1B19] rounded-sm shadow-sm pointer-events-none z-10">
                    {activeItem.tag}
                  </span>
                )}

                {/* Lightbox Trigger Button */}
                {onSelectImageForLightbox && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectImageForLightbox(currentImage, activeItem.title, activeItem.description);
                    }}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm cursor-pointer transition-transform hover:scale-110 shadow-md"
                    title="Ampliar foto"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Multiple photos navigation arrows */}
                {currentGallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer shadow-lg"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer shadow-lg"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Counter Pill */}
                    <div className="absolute top-4 right-14 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-[11px] font-medium text-white/95 rounded-full border border-white/10 shadow-sm">
                      {activeImageIdx + 1} / {currentGallery.length}
                    </div>
                  </>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest text-[#D9CFC4] font-medium">
                    {activeItem.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-white">
                    {activeItem.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <p className="text-sm text-[#554D46] leading-relaxed max-w-md">
                  {activeItem.description}
                </p>

                <a
                  href={getWhatsAppUrl(`Olá! Gostaria de conhecer as opções de cardápio e degustação de buffet do Espaço Lumier (interesse em ${activeItem.title}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#20bd5a] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Degustação / Menu</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Visual Gastronomic Gallery Strip */}
        <div className="mb-16 pt-8 border-t border-[#E8DFD3]">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[#785E34] text-xs font-semibold uppercase tracking-[0.25em] mb-1">
                <Camera className="w-3.5 h-3.5 text-[#B89758]" />
                <span>Registros da Nossa Gastronomia</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1B19] font-normal">
                Pratos servidos em rechauds de prata, saladas e pâtisserie.
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#6B6158] font-light max-w-sm">
              Fotos reais do buffet e dos banquetes preparados com maestria para casamentos e eventos no Espaço Lumier.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {BUFFET_GALLERY_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => onSelectImageForLightbox && onSelectImageForLightbox(photo.image, photo.title, photo.description)}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-[#E8DFD3] border border-[#E8DFD3] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                title="Clique para ampliar"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
                
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-1.5 py-0.5 bg-white/90 backdrop-blur-xs text-[9px] font-semibold uppercase tracking-wider text-[#1E1B19] rounded-xs shadow-xs">
                    {photo.category}
                  </span>
                </div>

                <div className="absolute bottom-2 inset-x-2 z-10">
                  <p className="text-[11px] font-serif text-white font-normal line-clamp-1 group-hover:text-[#C5A880] transition-colors leading-tight">
                    {photo.title}
                  </p>
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-black/60 rounded-full text-white z-10">
                  <Maximize2 className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Value Propositions for Buffet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 mb-14">
          <div className="p-6 rounded-sm bg-[#F5F0EB] border border-[#E8DFD3]">
            <CheckCircle2 className="w-5 h-5 text-[#785E34] mb-3" />
            <h4 className="font-serif text-lg text-[#1E1B19] mb-1">Cardápios Personalizados</h4>
            <p className="text-xs text-[#6B6158] leading-relaxed">
              Opções adaptadas para intolerâncias, dietas vegetarianas, veganas e restrições alimentares com a mesma elegância.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#F5F0EB] border border-[#E8DFD3]">
            <CheckCircle2 className="w-5 h-5 text-[#785E34] mb-3" />
            <h4 className="font-serif text-lg text-[#1E1B19] mb-1">Equipe de Salão Impecável</h4>
            <p className="text-xs text-[#6B6158] leading-relaxed">
              Maitres experientes, garçons treinados e serviço contínuo para garantir que nenhum convidado fique desatendido.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#F5F0EB] border border-[#E8DFD3]">
            <CheckCircle2 className="w-5 h-5 text-[#785E34] mb-3" />
            <h4 className="font-serif text-lg text-[#1E1B19] mb-1">Degustação dos Noivos</h4>
            <p className="text-xs text-[#6B6158] leading-relaxed">
              Sessão exclusiva de prova de pratos e harmonização para aprovação de cada detalhe antes do grande dia.
            </p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <button
            onClick={() => onOpenBudgetModal('Buffet & Gastronomia')}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#1E1B19] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#38332F] transition-all shadow-md hover:shadow-xl cursor-pointer"
          >
            <span>Conhecer as Possibilidades de Cardápio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
