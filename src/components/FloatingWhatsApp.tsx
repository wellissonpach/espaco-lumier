import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, SlidersHorizontal, Sparkles, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../data/lumierData';

interface FloatingWhatsAppProps {
  onOpenBudgetModal?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenBudgetModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOpenModal = () => {
    setIsOpen(false);
    if (onOpenBudgetModal) {
      onOpenBudgetModal();
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      
      {/* Luxury Action Menu Popover */}
      {isOpen && (
        <div className="mb-3.5 w-[270px] sm:w-[290px] bg-[#1A1715]/95 backdrop-blur-md border border-[#C5A880]/35 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.85)] p-3.5 space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-200 select-none">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-1">
            <div className="flex items-center gap-1.5 text-[#C5A880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                Atendimento Lumier
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#D9CFC4] hover:text-white p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Fechar opções"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Option 1: Simular Orçamento */}
          <button
            type="button"
            onClick={handleOpenModal}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-[#C5A880]/15 border border-white/10 hover:border-[#C5A880]/40 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] group-hover:scale-105 transition-transform">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-wide">
                  Simular Orçamento
                </span>
                <span className="text-[11px] text-[#D9CFC4]/75">
                  Calcule valores do seu evento
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Option 2: Falar pelo WhatsApp */}
          <a
            href={getWhatsAppUrl('Olá! Gostaria de conversar com a equipe do Espaço Lumier pelo WhatsApp.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/60 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-wide">
                  Falar pelo WhatsApp
                </span>
                <span className="text-[11px] text-[#D9CFC4]/75">
                  Conversar com nossa equipe
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#25D366] group-hover:translate-x-0.5 transition-transform" />
          </a>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        id="floating-whatsapp-trigger"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#d4b383] via-[#C5A880] to-[#9b7643] shadow-[0_6px_30px_rgba(197,168,128,0.55)] border border-[#F5E6D0]/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#C5A880]/40 cursor-pointer"
        aria-label="Abrir opções de atendimento WhatsApp ou Simulação"
      >
        {isOpen ? (
          <X className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform duration-200 rotate-90 animate-in spin-in-90" />
        ) : (
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
        )}
      </button>

    </div>
  );
};
