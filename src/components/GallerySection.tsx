import React, { useState } from 'react';
import { GALLERY_ITEMS, getWhatsAppUrl } from '../data/lumierData';
import { GalleryImage } from '../types';
import { Sparkles, Maximize2, MessageCircle, Filter } from 'lucide-react';

interface GallerySectionProps {
  onOpenLightbox: (item: GalleryImage) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Momentos' },
    { id: 'casamentos', label: 'Casamentos' },
    { id: '15anos', label: '15 Anos' },
    { id: 'decoracao', label: 'Decoração' },
    { id: 'buffet', label: 'Buffet' },
    { id: 'celebracoes', label: 'Celebrações' },
  ];

  const filteredItems = selectedFilter === 'todos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <section id="galeria" className="py-20 sm:py-32 bg-[#FAF8F5] text-[#2C2825] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#785E34] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Portfólio Fotográfico</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1E1B19] tracking-tight mb-4">
            Galeria de Momentos Reais
          </h2>

          <p className="text-base sm:text-lg text-[#6B6158] font-light max-w-2xl mx-auto leading-relaxed">
            Fotografias de celebrações reais realizadas no Espaço Lumier em Brasília. Navegue pelas categorias e encante-se.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs uppercase tracking-[0.16em] font-medium rounded-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1E1B19] text-[#FAF8F5] shadow-sm'
                    : 'bg-[#F5F0EB] text-[#6B6158] hover:bg-[#EFE9E1] hover:text-[#1E1B19]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry / Editorial Dynamic Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid group relative rounded-sm overflow-hidden bg-[#E8DFD3] border border-[#E8DFD3] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              onClick={() => onOpenLightbox(item)}
            >
              {/* Image with adaptive aspect ratio */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19]/85 via-[#1E1B19]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                
                {/* Category Badge & Expand Icon */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-[#FAF8F5]/90 text-[#1E1B19] text-[9px] uppercase tracking-widest font-semibold rounded-sm">
                    {item.categoryLabel}
                  </span>
                  <span className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Caption Info */}
                <div>
                  <h3 className="font-serif text-lg font-light text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D9CFC4] font-light line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#85796E] uppercase tracking-widest mb-3">
            Gostou de algum dos nossos cenários?
          </p>
          <a
            href={getWhatsAppUrl('Olá! Estive vendo a galeria de fotos do Espaço Lumier e amei as montagens. Gostaria de solicitar um orçamento para o meu evento!')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-sm hover:bg-[#20bd5a] transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Quero um Evento com Essa Identidade</span>
          </a>
        </div>

      </div>
    </section>
  );
};
