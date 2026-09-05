import React from 'react';
import { TESTIMONIALS, getWhatsAppUrl } from '../data/lumierData';
import { Sparkles, Star, Quote, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 sm:py-32 bg-[#F5F0EB] text-[#2C2825] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#785E34] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <Heart className="w-3.5 h-3.5 text-[#B89758] fill-current" />
            <span>Histórias & Provas de Amor</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1E1B19] tracking-tight mb-4">
            Palavras de quem viveu o sonho.
          </h2>

          <p className="text-base sm:text-lg text-[#6B6158] font-light max-w-2xl mx-auto leading-relaxed">
            Mais de 1.800 casamentos, 15 anos e encontros inesquecíveis celebrados com a dedicação e o carinho do Espaço Lumier.
          </p>
        </div>

        {/* Minimalist Editorial Testimonial Cards (3 Colunas para 6 Depoimentos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF8F5] p-6 sm:p-7 rounded-sm border border-[#E8DFD3] shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#C5A880]/50 transition-all duration-300"
            >
              <div>
                {/* 5 Stars Rating + Google Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#B89758]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] text-[#785E34] bg-[#F5F0EB] px-2 py-0.5 rounded-full font-medium">
                    <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    Google
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed italic mb-6 font-light">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#E8DFD3] flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#C5A880]/40 shrink-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-sm font-semibold text-[#1E1B19] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#785E34] uppercase tracking-wider font-medium truncate">
                    {item.eventType} • {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Authority Trust Stats */}
        <div className="mt-16 bg-[#FAF8F5] border border-[#E8DFD3] rounded-sm p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
          <div>
            <span className="font-serif text-3xl sm:text-4xl text-[#1E1B19] font-light">1.800+</span>
            <p className="text-xs text-[#6B6158] uppercase tracking-wider mt-1">Sonhos Realizados</p>
          </div>
          <div className="hidden sm:block w-[1px] h-12 bg-[#E8DFD3]"></div>
          <div>
            <span className="font-serif text-3xl sm:text-4xl text-[#1E1B19] font-light">99.8%</span>
            <p className="text-xs text-[#6B6158] uppercase tracking-wider mt-1">Satisfação dos Noivos</p>
          </div>
          <div className="hidden sm:block w-[1px] h-12 bg-[#E8DFD3]"></div>
          <div>
            <span className="font-serif text-3xl sm:text-4xl text-[#1E1B19] font-light">20+ Anos</span>
            <p className="text-xs text-[#6B6158] uppercase tracking-wider mt-1">Tradição em Brasília</p>
          </div>
        </div>

      </div>
    </section>
  );
};
