import React, { useState, useEffect } from 'react';
import { Award, Sparkles, HeartHandshake, UtensilsCrossed, Palette, Building2, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getWhatsAppUrl } from '../data/lumierData';

const HALL_IMAGES = [
  {
    src: '/hall/autoridade.webp',
    alt: 'Espaço Lumier - Decoração cenográfica nobre e mesa do bolo com túnel floral'
  },
  {
    src: '/hall/hall.webp',
    alt: 'Espaço Lumier - Hall nobre de entrada e salão com lustres de cristal'
  },
  {
    src: '/hall/foto_068.webp',
    alt: 'Espaço Lumier - Salão climatizado com mesas postas e iluminação cênica'
  },
  {
    src: '/hall/hall_decoracao.webp',
    alt: 'Espaço Lumier - Detalhes de ambientação e arranjos florais exclusivos'
  }
];

export const AboutSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HALL_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + HALL_IMAGES.length) % HALL_IMAGES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % HALL_IMAGES.length);
  };

  const pillars = [
    {
      icon: Building2,
      title: 'Ambiente Sofisticado',
      desc: 'Salão nobre com pé direito duplo, climatização acústica de ponta e capacidade para até 300 pessoas em Vicente Pires.'
    },
    {
      icon: Palette,
      title: 'Decoração Cenográfica',
      desc: 'Projetos florais exclusivos, lustres suntuosos em cristal e mobiliário nobre que transformam o salão em uma galeria viva.'
    },
    {
      icon: UtensilsCrossed,
      title: 'Gastronomia Autoral',
      desc: 'Cardápios refinados, coquetéis artesanais e ilhas gastronômicas que encantam os paladares mais exigentes.'
    },
    {
      icon: HeartHandshake,
      title: 'Experiência & Coordenação',
      desc: 'Mais de 20 anos garantindo pontualidade, atendimento afetuoso e tranquilidade absoluta para anfitriões e famílias.'
    }
  ];

  return (
    <section id="sobre" className="py-20 sm:py-28 bg-[#FAF8F5] text-[#2C2825] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Editorial Photo Column with Authority Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Image Frame with 2-second alternating WebP slideshow and navigation arrows */}
              <div
                className="group relative overflow-hidden rounded-sm shadow-xl aspect-[4/5] bg-[#EFE9E1]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {HALL_IMAGES.map((item, idx) => (
                  <img
                    key={item.src}
                    src={item.src}
                    alt={item.alt}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
                      idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                ))}
                
                {/* Subtle luxury gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B19]/50 via-transparent to-transparent z-10 pointer-events-none"></div>

                {/* Seta de voltar (Previous Button) */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#1E1B19]/60 hover:bg-[#1E1B19]/90 border border-[#C5A880]/40 text-white hover:text-[#C5A880] flex items-center justify-center backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-xl hover:scale-105 active:scale-95 touch-manipulation"
                  aria-label="Voltar foto anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Seta de avançar (Next Button) */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#1E1B19]/60 hover:bg-[#1E1B19]/90 border border-[#C5A880]/40 text-white hover:text-[#C5A880] flex items-center justify-center backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-xl hover:scale-105 active:scale-95 touch-manipulation"
                  aria-label="Avançar próxima foto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Minimalist Slide Indicators */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-1.5 bg-[#1E1B19]/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10">
                  {HALL_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                        idx === currentImageIndex ? 'w-5 bg-[#C5A880]' : 'w-1.5 bg-white/50 hover:bg-white'
                      }`}
                      aria-label={`Ver imagem ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Overlapping Detail Photo */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-48 sm:w-56 aspect-square rounded-sm overflow-hidden shadow-2xl border-4 border-[#FAF8F5]">
                <img
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop"
                  alt="Detalhes florais do Espaço Lumier"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Authority Badge Card */}
              <div className="absolute top-6 left-6 bg-[#FAF8F5]/95 backdrop-blur-md p-4 sm:p-5 rounded-sm border border-[#E8DFD3] shadow-lg max-w-[200px]">
                <div className="flex items-center gap-2 text-[#B89758] mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#785E34]">
                    Autoridade
                  </span>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-normal text-[#1E1B19]">
                  20+ Anos
                </div>
                <p className="text-[11px] text-[#6B6158] leading-tight mt-0.5">
                  de tradição e excelência em Brasília
                </p>
              </div>

            </div>
          </div>

          {/* Text & Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 text-[#785E34] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
              <span>Mais do que um espaço</span>
            </div>

            <h2
              id="about-title"
              className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#1E1B19] leading-[1.2] tracking-tight mb-6"
            >
              Há mais de duas décadas, transformando celebrações em memórias.
            </h2>

            <p className="text-base sm:text-lg text-[#554D46] leading-relaxed mb-6 font-light">
              No <strong className="font-medium text-[#1E1B19]">Espaço Lumier</strong>, cada evento é pensado para ser vivido e lembrado. Unimos ambiente, decoração e gastronomia para criar experiências que refletem a personalidade de cada celebração.
            </p>

            <p className="text-sm sm:text-base text-[#6B6158] leading-relaxed mb-8">
              Acreditamos que o segredo de uma festa perfeita está na harmonia entre todos os elementos. Por isso, oferecemos uma solução integrada onde arquitetura nobre, gastronomia refinada e design floral dialogam perfeitamente do início ao fim.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 mb-8">
              {pillars.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-sm bg-[#F5F0EB]/70 border border-[#E8DFD3] transition-all duration-300 hover:bg-[#F5F0EB] hover:border-[#C5A880]/50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#785E34] border border-[#E8DFD3]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-base font-semibold text-[#1E1B19]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#6B6158] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Direct WhatsApp Prompt */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={getWhatsAppUrl('Olá! Gostaria de agendar uma visita para conhecer o Espaço Lumier pessoalmente.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#1E1B19] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.18em] rounded-sm hover:bg-[#38332F] transition-colors"
              >
                Agendar Visita ao Espaço
              </a>
              <span className="text-xs text-[#85796E] flex items-center gap-1.5 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                Atendimento personalizado em Vicente Pires
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
