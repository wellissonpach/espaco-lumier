import React from 'react';
import { LUMIER_CONTACT, getWhatsAppUrl } from '../data/lumierData';
import { Instagram, MessageCircle, MapPin, Phone, Mail, Heart, Sparkles, ArrowUp } from 'lucide-react';
import logoImg from '../assets/logo-lumier-transparente.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const seoKeywords = [
    'espaço para eventos em Brasília',
    'espaço para casamento em Brasília',
    'salão de festas em Brasília',
    'buffet para eventos em Brasília',
    'espaço para eventos em Vicente Pires',
    'salão de festas em Vicente Pires',
    'casamentos em Brasília',
    'festa de 15 anos DF',
    'decoração de luxo Brasília'
  ];

  return (
    <footer className="bg-[#181513] text-[#FAF8F5] pt-16 sm:pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Column (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="inline-block group focus:outline-none">
              <img
                src={logoImg}
                alt="Espaço Lumier - Eventos, Buffet e Decoração"
                className="h-20 sm:h-24 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Espaço para eventos, buffet e decoração.
            </p>

            <p className="text-xs text-[#D9CFC4] leading-relaxed max-w-md font-light pt-1">
              Há mais de duas décadas realizando casamentos memoráveis, festas de 15 anos e encontros exclusivos com arquitetura nobre, gastronomia autoral e cenografia floral em Vicente Pires, Brasília.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={LUMIER_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram Espaço Lumier"
              >
                <Instagram className="w-4 h-4 text-[#C5A880]" />
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp Espaço Lumier"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </a>

              <a
                href={LUMIER_CONTACT.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Google Maps Espaço Lumier"
              >
                <MapPin className="w-4 h-4 text-[#C5A880]" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-[#C5A880]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#D9CFC4]">
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">Mais que um espaço</a>
              </li>
              <li>
                <a href="#historias" className="hover:text-white transition-colors">Casamentos & 15 Anos</a>
              </li>
              <li>
                <a href="#espaco" className="hover:text-white transition-colors">Infraestrutura & Fotos</a>
              </li>
              <li>
                <a href="#decoracao" className="hover:text-white transition-colors">Decoração Floral</a>
              </li>
              <li>
                <a href="#buffet" className="hover:text-white transition-colors">Buffet & Gastronomia</a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a>
              </li>
            </ul>
          </div>

          {/* Contact & Location (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-[#C5A880]">
              Atendimento & Localização
            </h4>

            <div className="space-y-2.5 text-xs text-[#D9CFC4]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{LUMIER_CONTACT.address}</span>
              </p>
              
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={LUMIER_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] transition-colors"
                >
                  {LUMIER_CONTACT.instagram}
                </a>
              </p>

              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  WhatsApp: {LUMIER_CONTACT.phone}
                </a>
              </p>

              <p className="pt-2 text-[11px] text-[#85796E]">
                Visitas e reuniões com agendamento prévio.
              </p>
            </div>
          </div>

        </div>

        {/* SEO Keywords Tag Cloud */}
        <div className="py-6 border-b border-white/5 text-[11px] text-[#85796E] leading-relaxed">
          <span className="text-[#C5A880] uppercase tracking-wider font-semibold mr-2">
            Principais Pesquisas:
          </span>
          {seoKeywords.map((kw, i) => (
            <span key={kw}>
              {kw}{i < seoKeywords.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#85796E]">
          <p>
            © {new Date().getFullYear()} Espaço Lumier. Todos os direitos reservados. Vicente Pires — Brasília, DF.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#D9CFC4] hover:text-white transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
