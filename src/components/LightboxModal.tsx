import React, { useEffect } from 'react';
import { X, MessageCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { getWhatsAppUrl } from '../data/lumierData';
import { GalleryImage } from '../types';

interface LightboxModalProps {
  image: GalleryImage | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  image,
  onClose,
  onPrev,
  onNext
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    if (image) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [image, onClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#1E1B19] rounded-sm overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
          aria-label="Fechar visualização"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Area */}
        <div className="relative md:w-2/3 bg-black flex items-center justify-center min-h-[350px] sm:min-h-[480px]">
          <img
            src={image.image}
            alt={image.title}
            className="w-full h-full max-h-[75vh] object-contain"
            referrerPolicy="no-referrer"
          />

          {/* Navigation Arrows */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Image Details Sidebar */}
        <div className="md:w-1/3 p-6 sm:p-8 bg-[#181513] text-[#FAF8F5] flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#C5A880] text-[10px] uppercase font-bold tracking-widest mb-3">
              <Sparkles className="w-3 h-3" />
              <span>{image.categoryLabel} • Espaço Lumier</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-light text-white mb-3">
              {image.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#D9CFC4] font-light leading-relaxed mb-6">
              {image.caption}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href={getWhatsAppUrl(`Olá! Vi a foto "${image.title}" na galeria do Espaço Lumier e gostaria de solicitar um orçamento para um estilo parecido!`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#20bd5a] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Quero Este Estilo no WhatsApp</span>
            </a>

            <p className="text-[10px] text-center text-[#85796E]">
              Vicente Pires — Brasília, DF
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
