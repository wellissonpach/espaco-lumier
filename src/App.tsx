import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { EventTypesSection } from './components/EventTypesSection';
import { TheSpaceSection } from './components/TheSpaceSection';
import { DecorationSection } from './components/DecorationSection';
import { BuffetSection } from './components/BuffetSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramSection } from './components/InstagramSection';
import { LocationSection } from './components/LocationSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BudgetCalculatorModal } from './components/BudgetCalculatorModal';
import { LightboxModal } from './components/LightboxModal';
import { GALLERY_ITEMS } from './data/lumierData';
import { GalleryImage } from './types';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetInitialEvent, setBudgetInitialEvent] = useState<string | undefined>(undefined);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const handleOpenBudgetModal = (initialEvent?: string) => {
    setBudgetInitialEvent(initialEvent);
    setIsBudgetModalOpen(true);
  };

  const handleCloseBudgetModal = () => {
    setIsBudgetModalOpen(false);
    setBudgetInitialEvent(undefined);
  };

  const handleCloseLightbox = () => {
    setLightboxImage(null);
  };

  const handlePrevLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = GALLERY_ITEMS.findIndex((img) => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setLightboxImage(GALLERY_ITEMS[prevIndex]);
  };

  const handleNextLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = GALLERY_ITEMS.findIndex((img) => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setLightboxImage(GALLERY_ITEMS[nextIndex]);
  };

  const handleSelectImageForLightbox = (image: string, title: string, caption: string) => {
    setLightboxImage({
      id: `custom-${Date.now()}`,
      title,
      category: 'celebracoes',
      categoryLabel: 'Espaço Lumier',
      image,
      aspectRatio: 'landscape',
      caption
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2825] selection:bg-[#C5A880]/30 selection:text-[#1E1B19]">
      {/* Top Floating Glass Header */}
      <Header onOpenBudgetModal={handleOpenBudgetModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section (Cinematic + H1 SEO + CTAs) */}
        <Hero onOpenBudgetModal={handleOpenBudgetModal} />

        {/* 2. Mais do que um espaço (20+ Anos de História) */}
        <AboutSection />

        {/* 3. Um espaço para diferentes histórias (Casamentos, 15 Anos, Sociais, Corporativos) */}
        <EventTypesSection onOpenBudgetModal={handleOpenBudgetModal} />

        {/* 4. O espaço (Composição visual + Specs Técnicas) */}
        <TheSpaceSection onSelectImageForLightbox={handleSelectImageForLightbox} />

        {/* 5. Decoração (Design Floral & Cenografia Editorial) */}
        <DecorationSection onSelectImageForLightbox={handleSelectImageForLightbox} />

        {/* 6. Buffet (Gastronomia Autoral) */}
        <BuffetSection
          onOpenBudgetModal={handleOpenBudgetModal}
          onSelectImageForLightbox={handleSelectImageForLightbox}
        />

        {/* 7. Depoimentos (Provas Sociais de Noivas e Debutantes) */}
        <TestimonialsSection />

        {/* 9. Instagram (@espacolumier) */}
        <InstagramSection />

        {/* 10. Localização & Visita (Vicente Pires — Brasília) */}
        <LocationSection />

        {/* 11. CTA Final (Emocional e forte para WhatsApp) */}
        <FinalCtaSection onOpenBudgetModal={handleOpenBudgetModal} />

      </main>

      {/* Rodapé Institucional */}
      <Footer />

      {/* WhatsApp Floating Button with action options: Simular Orçamento / WhatsApp */}
      <FloatingWhatsApp onOpenBudgetModal={() => handleOpenBudgetModal()} />

      {/* Interactive Budget / Lead WhatsApp Concierge Modal */}
      <BudgetCalculatorModal
        isOpen={isBudgetModalOpen}
        onClose={handleCloseBudgetModal}
        initialEventType={budgetInitialEvent}
      />

      {/* High-Resolution Photo Lightbox */}
      <LightboxModal
        image={lightboxImage}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
