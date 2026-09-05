import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { LUMIER_CONTACT, getWhatsAppUrl } from '../data/lumierData';
import logoImg from '../assets/logo-lumier-transparente.png';

interface HeaderProps {
  onOpenBudgetModal: (initialEvent?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBudgetModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'O Espaço', href: '#espaco' },
    { label: 'Celebrações', href: '#historias' },
    { label: 'Decoração', href: '#decoracao' },
    { label: 'Buffet', href: '#buffet' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Instagram', href: '#instagram' },
    { label: 'Localização', href: '#localizacao' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFD3] py-3 text-[#2C2825]'
          : 'bg-gradient-to-b from-[#1E1B19]/80 via-[#1E1B19]/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex items-center group focus:outline-none select-none py-0.5"
          >
            <img
              src={logoImg}
              alt="Espaço Lumier - Eventos, Buffet e Decoração"
              className={`w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'h-14 sm:h-16' : 'h-18 sm:h-22 lg:h-26'
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-7" aria-label="Navegação Principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[11px] uppercase tracking-[0.16em] font-medium transition-colors duration-200 relative py-1 group ${
                  isScrolled ? 'text-[#4A433E] hover:text-[#C5A880]' : 'text-[#E8DFD3] hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions & WhatsApp CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              id="header-quote-btn"
              onClick={() => onOpenBudgetModal()}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 rounded-md border cursor-pointer ${
                isScrolled
                  ? 'border-[#C5A880]/60 text-[#785E34] hover:bg-[#C5A880]/10'
                  : 'border-white/35 bg-black/20 hover:border-white/70 hover:bg-white/10 text-white backdrop-blur-sm'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              <span>Simular Evento</span>
            </button>

            <a
              id="header-whatsapp-btn"
              href={getWhatsAppUrl('Olá! Gostaria de conversar com a equipe do Espaço Lumier sobre a disponibilidade de datas e orçamento.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] bg-[#C5A880] hover:bg-[#b89758] text-white transition-all duration-300 rounded-md shadow-sm hover:shadow-md cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-sm text-[#C5A880] hover:bg-[#C5A880]/10 transition-colors focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7 text-[#C5A880]" /> : <Menu className="w-7 h-7 text-[#C5A880]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E8DFD3] text-[#2C2825] shadow-xl animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E8DFD3]">
              <img
                src={logoImg}
                alt="Espaço Lumier"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1E1B19]">
                  Espaço Lumier
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#85796E]">
                  Vicente Pires — Brasília, DF
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs uppercase tracking-[0.16em] font-medium text-[#4A433E] hover:text-[#C5A880] py-2 border-b border-dashed border-[#E8DFD3]/60"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <button
                id="mobile-drawer-quote-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBudgetModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 border border-[#C5A880] text-[#785E34] text-xs font-semibold uppercase tracking-widest hover:bg-[#C5A880]/10 transition-colors rounded-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Simular Orçamento / Visita</span>
              </button>

              <a
                id="mobile-drawer-whatsapp-btn"
                href={getWhatsAppUrl('Olá! Gostaria de conversar com a equipe do Espaço Lumier pelo WhatsApp.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A880] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#b89758] transition-colors shadow-sm rounded-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
