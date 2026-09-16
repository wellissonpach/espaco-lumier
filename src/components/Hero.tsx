import React, { useEffect, useRef } from 'react';

interface HeroProps {
  onOpenBudgetModal: (initialEvent?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBudgetModal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Garantir atributos essenciais para autoplay sem restrição de navegadores
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const startPlayback = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Se o navegador bloquear autoplay inicial, dispara no primeiro toque ou scroll
          const onUserGesture = () => {
            video.muted = true;
            video.play().catch(() => {});
            ['touchstart', 'touchend', 'click', 'scroll'].forEach((evt) =>
              window.removeEventListener(evt, onUserGesture)
            );
          };
          ['touchstart', 'touchend', 'click', 'scroll'].forEach((evt) =>
            window.addEventListener(evt, onUserGesture, { once: true, passive: true })
          );
        });
      }
    };

    // Tentar iniciar imediatamente e nos eventos de carregamento
    startPlayback();
    video.addEventListener('loadeddata', startPlayback);
    video.addEventListener('canplay', startPlayback);

    // Otimização de GPU 1: Pausar o vídeo quando a seção Hero sair da tela
    let isHeroInView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInView = entry.isIntersecting;
        if (isHeroInView && !document.hidden) {
          startPlayback();
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Otimização de GPU 2: Pausar vídeo ao trocar de aba ou minimizar aplicativo
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isHeroInView) {
        startPlayback();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      video.removeEventListener('loadeddata', startPlayback);
      video.removeEventListener('canplay', startPlayback);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleScrollToSection = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-screen min-h-[100dvh] w-full flex items-center overflow-hidden bg-[#0D0C0B]"
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Desktop: Imagem fotográfica de alta resolução otimizada em WebP */}
        <img
          src="/back1.webp"
          alt="Espaço Lumier - Salão nobre para casamentos e eventos em Brasília"
          className="hidden sm:block w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />

        {/* Mobile: Vídeo ultra-otimizado com poster em WebP */}
        <video
          ref={videoRef}
          src="/video-lumier-mobile.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/video-lumier-mobile-poster.webp"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          className="sm:hidden w-full h-full object-cover object-center"
          style={{ transform: 'translateZ(0)' }}
          onCanPlay={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          onLoadedData={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            e.currentTarget.play().catch(() => {});
          }}
        >
          <source src="/video-lumier-mobile.mp4" type="video/mp4" />
        </video>

        {/* Mobile: Sombra gradiente da esquerda para a direita (como solicitado) */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-r from-[#0D0C0B]/95 via-[#0D0C0B]/70 to-[#0D0C0B]/20 pointer-events-none" />

        {/* Mobile: Suave vinheta vertical e base 100% escura para a barra do Safari */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-[#0D0C0B]/80 via-transparent to-[#0D0C0B] pointer-events-none" />

        {/* Desktop: Gradientes atmosféricos */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#0D0C0B]/95 via-[#0D0C0B]/85 to-transparent sm:from-[#0D0C0B] sm:via-[#0D0C0B]/85 sm:to-transparent pointer-events-none" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-b from-[#0D0C0B]/90 via-transparent to-[#0D0C0B]/90 pointer-events-none" />
        <div className="hidden sm:block absolute inset-0 bg-radial from-transparent via-[#0D0C0B]/30 to-[#0D0C0B]/70 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-28 pb-20 sm:pt-44 sm:pb-32 lg:pt-48 flex flex-col justify-center">
        <div className="max-w-2xl text-left flex flex-col items-start">
          
          {/* Badge Pill */}
          <div
            id="hero-badge"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A880]/35 bg-black/40 backdrop-blur-md text-[#F5F0EB] text-[11px] uppercase tracking-[0.22em] font-medium mb-6 sm:mb-8 shadow-sm -translate-y-6 sm:translate-y-0"
          >
            <span className="text-[#C5A880] text-xs leading-none">✦</span>
            <span>Mais de duas décadas realizando sonhos</span>
          </div>

          {/* Headline H1 (Single H1 for SEO, incorporating primary keywords with editorial elegance) */}
          <h1
            id="hero-main-title"
            className="font-serif text-[38px] sm:text-6xl md:text-7xl lg:text-[76px] font-light text-[#FAF8F5] leading-[1.12] sm:leading-[1.08] tracking-tight"
          >
            <span className="sr-only">Espaço para Casamentos e Eventos em Brasília — </span>
            O cenário para<br />
            os momentos que<br />
            merecem ser<br />
            <span className="italic font-normal text-[#C5A880]">inesquecíveis.</span>
          </h1>

          {/* Editorial Golden Divider */}
          <div className="flex items-center gap-3 my-5 sm:my-6 w-36 sm:w-44">
            <div className="h-[1px] bg-[#C5A880]/40 flex-1"></div>
            <span className="text-[#C5A880] text-xs leading-none">✦</span>
            <div className="h-[1px] bg-[#C5A880]/40 flex-1"></div>
          </div>

          {/* Subtitle */}
          <p
            id="hero-subtitle"
            className="text-sm sm:text-base text-[#D9CFC4] font-light max-w-lg sm:max-w-xl leading-relaxed tracking-wide mb-8 sm:mb-10"
          >
            Salão nobre climatizado, alta gastronomia e decoração cenográfica para casamentos, 15 anos e eventos em <span className="text-[#C5A880] font-normal">Vicente Pires — Brasília.</span>
          </p>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            {/* Primary Gold CTA */}
            <button
              id="hero-cta-primary"
              onClick={() => handleScrollToSection('espaco')}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-3 px-6 sm:px-8 py-4 bg-[#C5A880] hover:bg-[#b89758] text-[#1E1B19] text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-all duration-300 shadow-[0_6px_28px_rgba(197,168,128,0.4)] hover:shadow-xl hover:translate-y-[-1px] cursor-pointer touch-manipulation min-h-[48px]"
            >
              <span className="text-[#785E34] text-xs">✦</span>
              <span className="flex-1 text-center sm:flex-initial">QUERO CONHECER O ESPAÇO</span>
              <span className="text-base font-normal">→</span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Mouse / Swipe Indicator + Line */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 pointer-events-none px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => handleScrollToSection('espaco')}
            className="flex items-center gap-3 sm:gap-4 pointer-events-auto group focus:outline-none cursor-pointer"
            aria-label="Arrastar para explorar o Espaço Lumier"
          >
            {/* Capsule outline icon with center dot */}
            <div className="w-5 h-8 rounded-full border border-[#C5A880]/70 flex items-center justify-center">
              <span className="w-1 h-1.5 bg-[#C5A880] rounded-full animate-pulse"></span>
            </div>
            
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#C5A880]/85 sm:text-white/70 font-medium whitespace-nowrap">
              <span className="sm:hidden">ARRASTE PARA EXPLORAR</span>
              <span className="hidden sm:inline">ROLE PARA EXPLORAR</span>
            </span>

            {/* Thin horizontal line spanning across */}
            <div className="h-[1px] bg-[#C5A880]/35 w-20 sm:w-60 md:w-80 block"></div>
          </button>
        </div>
      </div>
    </section>
  );
};
