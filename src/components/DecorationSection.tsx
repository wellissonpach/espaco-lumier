import React from 'react';
import { Sparkles, Flower2, Gem, Eye, MessageCircle } from 'lucide-react';
import { DECORATION_PILLARS, getWhatsAppUrl } from '../data/lumierData';

interface DecorationSectionProps {
  onSelectImageForLightbox?: (image: string, title: string, caption: string) => void;
}

export const DecorationSection: React.FC<DecorationSectionProps> = ({ onSelectImageForLightbox }) => {
  const highlightTags = ['Flores Nobres', 'Mesas Postas', 'Iluminação Cênica', 'Ambientação', 'Cenografia'];

  return (
    <section id="decoracao" className="py-20 sm:py-32 bg-[#1E1B19] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Decorative subtle gold glow in background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#C5A880] text-xs font-semibold uppercase tracking-[0.28em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Floral & Cenografia</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight mb-5">
            Cada detalhe faz parte da experiência.
          </h2>

          {/* Editorial Tags Pill Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#D9CFC4] font-light">
            {highlightTags.map((tag, i) => (
              <React.Fragment key={tag}>
                <span className="hover:text-white transition-colors">{tag}</span>
                {i < highlightTags.length - 1 && (
                  <span className="text-[#C5A880]/60">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Editorial Magazine Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Main Heroic Card (Left) */}
          <div className="md:col-span-7 group relative rounded-sm overflow-hidden min-h-[420px] sm:min-h-[520px] bg-[#2C2825] border border-white/10 shadow-2xl flex flex-col justify-end">
            <img
              src="/mesas/mesa_doces_aerea.webp"
              alt="Mesa de doces monumental e arranjo aéreo de flores no Espaço Lumier"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19] via-[#1E1B19]/40 to-transparent"></div>

            <div className="relative z-10 p-6 sm:p-10">
              <span className="px-3 py-1 bg-[#C5A880] text-[#1E1B19] text-[10px] uppercase font-bold tracking-widest rounded-sm mb-3 inline-block">
                Cenografia Monumental
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white mb-2 leading-tight">
                Mesas de Doces & Projetos Aéreos
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DFD3] font-light max-w-xl leading-relaxed">
                Lustres de cristal pendentes, bandejas nobres e um design floral volumoso que transforma o momento do bolo na grande obra de arte do evento.
              </p>
            </div>
          </div>

          {/* Right Column with 2 Stacked Editorial Cards */}
          <div className="md:col-span-5 flex flex-col gap-6 sm:gap-8">
            
            {/* Upper Card */}
            <div className="group relative rounded-sm overflow-hidden flex-1 min-h-[240px] bg-[#2C2825] border border-white/10 shadow-xl flex flex-col justify-end">
              <img
                src="/mesas/mesa_posta_destaque.webp"
                alt="Mesa posta de convidados com louçaria fina e arranjo floral no Espaço Lumier"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19] via-[#1E1B19]/30 to-transparent"></div>
              
              <div className="relative z-10 p-6">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  Mobiliário & Acabamentos
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-white font-light mt-1">
                  Mesas Postas
                </h4>
              </div>
            </div>

            {/* Lower Card */}
            <div className="group relative rounded-sm overflow-hidden flex-1 min-h-[240px] bg-[#2C2825] border border-white/10 shadow-xl flex flex-col justify-end">
              <img
                src="/iluminacao/iluminacao_02.webp"
                alt="Iluminação cênica e velas flutuantes no Espaço Lumier"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19] via-[#1E1B19]/30 to-transparent"></div>
              
              <div className="relative z-10 p-6">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  Luminotécnica & Velas
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-white font-light mt-1">
                  Atmosfera Romântica & Acolhedora
                </h4>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Pillars Mini Showcase */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DECORATION_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm bg-white/5 border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300"
            >
              <h4 className="font-serif text-lg text-[#FAF8F5] mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                {pillar.title}
              </h4>
              <p className="text-xs text-[#D9CFC4] font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* WhatsApp Decoration Quote Action */}
        <div className="mt-14 text-center">
          <a
            href={getWhatsAppUrl('Olá! Fiquei encantada(o) com a decoração do Espaço Lumier e gostaria de saber mais sobre os projetos de cenografia para o meu evento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#20bd5a] transition-all shadow-md hover:shadow-xl"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Conversar sobre a Decoração do Meu Sonho</span>
          </a>
        </div>

      </div>
    </section>
  );
};
