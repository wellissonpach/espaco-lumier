import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

const TOTAL_FRAMES = 186;
const getFrameUrl = (index: number) =>
  `/tour-frames/frame_${String(index).padStart(3, '0')}.webp`;

export const TourSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const isInViewRef = useRef<boolean>(false);

  const [initialFrameReady, setInitialFrameReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Initialize and preload frames
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);

    // 1. Load frame 0 immediately
    const img0 = new Image();
    img0.src = getFrameUrl(0);
    img0.onload = () => {
      imagesRef.current[0] = img0;
      loadedFramesRef.current.add(0);
      setInitialFrameReady(true);
      drawFrame(0);
    };

    // 2. Preload remaining frames in staged background batches
    let isCancelled = false;

    const preloadBatch = (indices: number[], onDone?: () => void) => {
      let remaining = indices.length;
      if (remaining === 0) {
        if (onDone) onDone();
        return;
      }
      indices.forEach((i) => {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i] = img;
          loadedFramesRef.current.add(i);
          remaining--;
          if (remaining === 0 && onDone) onDone();
        };
        img.onerror = () => {
          remaining--;
          if (remaining === 0 && onDone) onDone();
        };
      });
    };

    // First batch: next 25 frames
    const firstBatch = Array.from({ length: 25 }, (_, idx) => idx + 1);
    preloadBatch(firstBatch, () => {
      if (isCancelled) return;

      // Second batch: all remaining frames in groups of 20
      const remainingIndices = Array.from(
        { length: TOTAL_FRAMES - 26 },
        (_, idx) => idx + 26
      );

      const chunkSize = 20;
      let currentIndex = 0;

      const loadNextChunk = () => {
        if (isCancelled || currentIndex >= remainingIndices.length) return;
        const chunk = remainingIndices.slice(currentIndex, currentIndex + chunkSize);
        currentIndex += chunkSize;
        preloadBatch(chunk, loadNextChunk);
      };

      loadNextChunk();
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame to canvas
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let idxToDraw = frameIndex;
    if (!loadedFramesRef.current.has(idxToDraw)) {
      for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
        if (idxToDraw - delta >= 0 && loadedFramesRef.current.has(idxToDraw - delta)) {
          idxToDraw = idxToDraw - delta;
          break;
        }
        if (idxToDraw + delta < TOTAL_FRAMES && loadedFramesRef.current.has(idxToDraw + delta)) {
          idxToDraw = idxToDraw + delta;
          break;
        }
      }
    }

    const img = imagesRef.current[idxToDraw];
    if (img && img.complete) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      currentFrameRef.current = idxToDraw;
    }
  };

  // Scroll tracking and smooth lerp animation loop
  useEffect(() => {
    const updateScrollProgress = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScroll = container.offsetHeight - window.innerHeight;

      if (totalScroll <= 0) return;

      // Calculate progress between 0 and 1
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      targetProgressRef.current = progress;

      if (progress > 0.03 && !hasScrolled) {
        setHasScrolled(true);
      }

      if (!isAnimatingRef.current && isInViewRef.current) {
        startAnimationLoop();
      }
    };

    const startAnimationLoop = () => {
      isAnimatingRef.current = true;

      const step = () => {
        // Smooth lerp easing for fluid frame interpolation
        const diff = targetProgressRef.current - currentProgressRef.current;
        currentProgressRef.current += diff * 0.14;

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(currentProgressRef.current * TOTAL_FRAMES))
        );

        if (targetFrame !== currentFrameRef.current) {
          drawFrame(targetFrame);
        }

        if (Math.abs(diff) > 0.0005 && isInViewRef.current) {
          requestAnimationFrame(step);
        } else {
          isAnimatingRef.current = false;
        }
      };

      requestAnimationFrame(step);
    };

    // Intersection observer so we only listen and animate when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          updateScrollProgress();
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [hasScrolled]);

  const handleStartTour = () => {
    setIsActive(true);
    // Smoothly align the container into view if needed
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < 0 || rect.top > 100) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="tour-espaco-lumier"
      aria-label="Conheça nosso espaço com uma experiência imersiva"
      ref={containerRef}
      className={`relative bg-[#0E0C0A] w-full transition-all duration-700 ${
        isActive ? 'h-[280vh] sm:h-[320vh]' : 'min-h-[85vh] sm:min-h-screen pb-16 sm:pb-24'
      }`}
    >
      {/* Top Title at the beginning of the section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 pb-4 sm:pb-6 relative z-20 select-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-[#C5A880] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium mb-3 sm:mb-4 shadow-sm">
          <span>✦</span>
          <span>Tour Virtual</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF8F5] tracking-tight max-w-3xl mx-auto text-balance">
          Conheça nosso espaço com uma experiência imersiva
        </h2>
      </div>

      {/* Sticky Fullscreen Pinned Viewport */}
      <div
        ref={stickyRef}
        className={`${
          isActive
            ? 'sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden'
            : 'relative w-full flex items-center justify-center py-4 sm:py-8'
        } px-4 sm:px-6 z-10`}
      >
        {/* Subtle Ambient Backlight Glow */}
        <div className="absolute w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] rounded-full bg-[#C5A880]/12 blur-[130px] pointer-events-none" />

        {/* Smartphone Mockup Card */}
        <div className="relative w-[280px] sm:w-[320px] md:w-[350px] aspect-[9/18.5] rounded-[48px] sm:rounded-[54px] p-2.5 sm:p-3 bg-gradient-to-b from-[#38312B] via-[#1E1B19] to-[#12100E] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(197,168,128,0.15)] border border-[#C5A880]/25 flex flex-col justify-between select-none z-20 transition-all duration-500">
          
          {/* Side Volume / Power Button Silhouettes */}
          <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-[#403833] rounded-l-sm" />
          <div className="absolute -left-[3px] top-42 w-[3px] h-10 bg-[#403833] rounded-l-sm" />
          <div className="absolute -right-[3px] top-32 w-[3px] h-16 bg-[#403833] rounded-r-sm" />

          {/* Top Dynamic Island / Camera Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 sm:w-28 sm:h-5.5 bg-black rounded-full z-40 flex items-center justify-between px-3 shadow-md pointer-events-none">
            <div className="w-2.5 h-2.5 rounded-full bg-[#181818] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C] border border-blue-900/30"></div>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
          </div>

          {/* Inner Phone Screen */}
          <div className="relative w-full h-full rounded-[38px] sm:rounded-[44px] overflow-hidden bg-black shadow-inner flex items-center justify-center">
            
            {/* HTML5 Canvas Rendering WebP Video Frames */}
            <canvas
              ref={canvasRef}
              width={1080}
              height={1920}
              className="w-full h-full object-cover block select-none"
            />

            {/* Subtle Luxury Glass Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-transparent pointer-events-none z-10" />

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-30 pointer-events-none" />

            {/* Initial Frame Loader Spinner */}
            {!initialFrameReady && (
              <div className="absolute inset-0 bg-[#12100E] flex items-center justify-center z-20">
                <div className="w-6 h-6 border-2 border-[#C5A880]/40 border-t-[#C5A880] rounded-full animate-spin" />
              </div>
            )}

            {/* State 1: Inactive Overlay with "Começar Tour" Button */}
            {!isActive && (
              <div
                onClick={handleStartTour}
                className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-30 cursor-pointer transition-all duration-500 group"
              >
                <div className="relative flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartTour();
                    }}
                    className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-[#C5A880] hover:bg-[#bfa175] text-[#1E1B19] font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] rounded-full shadow-[0_10px_30px_rgba(197,168,128,0.4)] transition-all duration-300 group-hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#1E1B19] text-[#C5A880] flex items-center justify-center pl-0.5 shadow-sm">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </span>
                    <span>Começar Tour</span>
                  </button>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8DFD3]/80 font-medium">
                    Toque para iniciar
                  </span>
                </div>
              </div>
            )}

            {/* State 2: Active Scroll Instruction (shown until user scrolls) */}
            {isActive && !hasScrolled && (
              <div className="absolute inset-x-4 bottom-10 z-30 flex flex-col items-center pointer-events-none animate-in fade-in duration-700">
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A880]/50 text-white text-[10px] sm:text-[11px] uppercase tracking-widest font-medium shadow-2xl animate-bounce">
                  <div className="w-3.5 h-5 rounded-full border border-white/70 flex items-start justify-center pt-0.5">
                    <div className="w-1 h-1.5 bg-[#C5A880] rounded-full animate-bounce"></div>
                  </div>
                  <span>Role a tela para explorar</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
