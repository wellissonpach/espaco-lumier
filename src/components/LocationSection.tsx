import React from 'react';
import { LUMIER_CONTACT, getWhatsAppUrl } from '../data/lumierData';
import { MapPin, Navigation, Clock, ShieldCheck, Car, Coffee, MessageCircle, Sparkles } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-20 sm:py-32 bg-[#F5F0EB] text-[#2C2825] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#785E34] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Localização Privilegiada</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#1E1B19] tracking-tight mb-4">
            Em Vicente Pires, no coração do DF.
          </h2>

          <p className="text-base sm:text-lg text-[#6B6158] font-light max-w-2xl mx-auto leading-relaxed">
            Fácil acesso para convidados vindos de todo o Distrito Federal, com tranquilidade, privacidade e estacionamento próprio.
          </p>
        </div>

        {/* Location Grid: Map + Venue Access Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Info Card (Left 5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-8 sm:p-10 rounded-sm border border-[#E8DFD3] shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-normal text-[#1E1B19] mb-4">
                Visite o Espaço Lumier
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-[#554D46] mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#785E34] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1E1B19] block font-medium">Endereço</strong>
                    <span>{LUMIER_CONTACT.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#785E34] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1E1B19] block font-medium">Horários de Visita</strong>
                    <span>{LUMIER_CONTACT.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#785E34] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1E1B19] block font-medium">Estacionamento</strong>
                    <span>Amplo estacionamento interno privativo com equipe de apoio.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#785E34] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1E1B19] block font-medium">Segurança e Conforto</strong>
                    <span>Ambiente fechado e monitorado, infraestrutura completa e acessibilidade universal.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8DFD3] space-y-3">
              <a
                href={getWhatsAppUrl('Olá! Gostaria de agendar uma visita guiada no Espaço Lumier para conhecer a estrutura.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-sm hover:bg-[#20bd5a] transition-all shadow-sm"
              >
                <Coffee className="w-4 h-4" />
                <span>Agendar Degustação & Visita com Café</span>
              </a>

              <a
                href={LUMIER_CONTACT.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#FAF8F5] border border-[#C5A880] text-[#785E34] text-xs font-semibold uppercase tracking-[0.16em] rounded-sm hover:bg-[#F5F0EB] transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Abrir Rota no Google Maps / Waze</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Frame (Right 7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-sm border border-[#E8DFD3] overflow-hidden shadow-md min-h-[380px] relative">
            <iframe
              title="Localização do Espaço Lumier em Vicente Pires Brasília"
              src={LUMIER_CONTACT.mapsEmbedUrl}
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Map Top Badge */}
            <div className="absolute top-4 left-4 bg-[#FAF8F5]/95 backdrop-blur-sm px-4 py-2 rounded-sm border border-[#E8DFD3] shadow-sm text-xs font-medium text-[#1E1B19] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B89758] animate-ping"></span>
              <span>Vicente Pires — Brasília, DF</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
