import React from 'react';
import { MessageCircle, Sparkles, Calendar, Heart } from 'lucide-react';
import { getWhatsAppUrl } from '../data/lumierData';

interface FinalCtaSectionProps {
  onOpenBudgetModal: (initialEvent?: string) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBudgetModal }) => {
  return (
    <section className="relative py-28 sm:py-36 bg-[#1E1B19] text-white overflow-hidden">
      
      {/* Cinematic Background Image with Emotional Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop"
          alt="Celebração inesquecível no Espaço Lumier"
          className="w-full h-full object-cover object-center scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19] via-[#1E1B19]/75 to-[#1E1B19]/70"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Subtle Icon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/50 text-[#F5F0EB] text-xs uppercase tracking-[0.25em] mb-6">
          <Heart className="w-3.5 h-3.5 text-[#C5A880] fill-current" />
          <span>Realizando Sonhos em Brasília</span>
        </div>

        {/* Requested Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#FAF8F5] leading-tight tracking-tight mb-6 text-balance">
          Seu próximo grande momento pode começar aqui.
        </h2>

        {/* Requested Subtext */}
        <p className="text-base sm:text-xl text-[#E8DFD3] font-light max-w-2xl leading-relaxed mb-10 text-balance">
          Conheça o Espaço Lumier e descubra como podemos tornar sua celebração inesquecível.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none">
          {/* Requested Button */}
          <a
            id="final-cta-whatsapp-btn"
            href={getWhatsAppUrl('Olá! Gostaria de conversar com o Concierge do Espaço Lumier sobre a realização do meu evento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#25D366] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#20bd5a] transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Falar com Concierge</span>
          </a>

          <button
            onClick={() => onOpenBudgetModal()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FAF8F5] text-[#1E1B19] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#EFE9E1] transition-all shadow-lg hover:scale-[1.02]"
          >
            <Calendar className="w-4 h-4" />
            <span>Simular Orçamento</span>
          </button>
        </div>

        <p className="text-xs text-[#D9CFC4] mt-8 font-light tracking-wide">
          Atendimento humanizado • Resposta rápida no WhatsApp • Vicente Pires, Brasília - DF
        </p>

      </div>
    </section>
  );
};
