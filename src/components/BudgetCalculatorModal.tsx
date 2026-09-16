import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, MessageCircle, Calendar, Users, Heart, Check, Building2, Utensils, Palette } from 'lucide-react';
import { getWhatsAppUrl } from '../data/lumierData';
import logoImg from '../assets/logo-lumier-transparente.png';

interface BudgetCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEventType?: string;
}

export const BudgetCalculatorModal: React.FC<BudgetCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialEventType
}) => {
  const [eventType, setEventType] = useState<string>('Casamento');
  const [guests, setGuests] = useState<string>('150 a 200 convidados');
  const [period, setPeriod] = useState<string>('2025 / 2026');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Espaço Nobre Climatizado',
    'Decoração Floral Cenográfica',
    'Buffet Completo'
  ]);
  const [comments, setComments] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialEventType) {
      setEventType(initialEventType);
    }
  }, [initialEventType]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus the first input or close button
    setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector<HTMLElement>('button, input');
        firstFocusable?.focus();
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const eventOptions = [
    'Casamento',
    '15 Anos',
    'Evento Social / Aniversário',
    'Evento Corporativo',
    'Bodas / Outros'
  ];

  const guestOptions = [
    'Até 100 convidados',
    '100 a 180 convidados',
    '180 a 240 convidados',
    '240 a 300 convidados'
  ];

  const serviceOptions = [
    'Espaço Nobre Climatizado',
    'Decoração Floral Cenográfica',
    'Buffet Completo',
    'Open Bar & Coquetelaria',
    'Cerimônia ao Ar Livre / Jardim',
    'Suíte dos Noivos / Camarim'
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `✨ *SOLICITAÇÃO DE ORÇAMENTO — ESPAÇO LUMIER* ✨
━━━━━━━━━━━━━━━━━━━━━━
👤 *Nome:* ${name || 'Não informado'}
📱 *Telefone/WhatsApp:* ${phone || 'Não informado'}
💍 *Tipo de Evento:* ${eventType}
👥 *Número de Convidados:* ${guests}
📅 *Previsão de Data:* ${period}
━━━━━━━━━━━━━━━━━━━━━━
🏛️ *Serviços de Interesse:*
${selectedServices.map((s) => `• ${s}`).join('\n')}
${comments ? `\n💬 *Observações:* ${comments}` : ''}
━━━━━━━━━━━━━━━━━━━━━━
_Enviado através do site oficial do Espaço Lumier (Vicente Pires - DF)_`;

    const url = getWhatsAppUrl(formattedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-budget-title"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)] bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-[#FAF8F5] rounded-sm max-w-xl w-full max-h-[calc(100dvh-2.5rem)] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8DFD3] relative flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header - Sticky with safe padding */}
        <div className="sticky top-0 z-30 bg-[#1E1B19] text-[#FAF8F5] p-5 sm:p-7 border-b border-white/10 shadow-sm">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#D9CFC4] hover:text-white hover:bg-white/10 active:bg-white/20 rounded-full transition-colors cursor-pointer touch-manipulation z-40"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <img
              src={logoImg}
              alt="Espaço Lumier"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="inline-flex items-center gap-1.5 text-[#C5A880] text-[11px] uppercase font-bold tracking-[0.25em]">
              <Sparkles className="w-3 h-3" />
              <span>Atendimento Concierge</span>
            </div>
          </div>

          <h3 id="modal-budget-title" className="font-serif text-2xl sm:text-3xl font-light text-white">
            Simulador de Orçamento & Visita
          </h3>
          <p className="text-xs text-[#D9CFC4] mt-1 font-light">
            Monte os detalhes da sua celebração e receba um atendimento prioritário direto no WhatsApp.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendToWhatsApp} className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Step 1: Tipo de Evento */}
          <div>
            <span className="block text-xs uppercase font-semibold tracking-wider text-[#1E1B19] mb-2.5">
              1. Qual celebração você está planejando?
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {eventOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setEventType(opt)}
                  className={`p-2.5 text-xs rounded-sm border text-left transition-all cursor-pointer min-h-[44px] flex items-center active:scale-[0.98] ${
                    eventType === opt
                      ? 'bg-[#1E1B19] text-white border-[#1E1B19] font-medium shadow-xs'
                      : 'bg-[#F5F0EB] text-[#4A433E] border-[#E8DFD3] hover:bg-[#EFE9E1]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Convidados & Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-guests" className="block text-xs uppercase font-semibold tracking-wider text-[#1E1B19] mb-2">
                2. Número de Convidados:
              </label>
              <select
                id="lead-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-[#F5F0EB] border border-[#E8DFD3] p-2.5 rounded-sm text-xs text-[#2C2825] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors min-h-[44px]"
              >
                {guestOptions.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="lead-period" className="block text-xs uppercase font-semibold tracking-wider text-[#1E1B19] mb-2">
                3. Previsão de Data / Mês:
              </label>
              <input
                id="lead-period"
                type="text"
                placeholder="Ex: Outubro/2025 ou Primeiro Semestre"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full bg-[#F5F0EB] border border-[#E8DFD3] p-2.5 rounded-sm text-xs text-[#2C2825] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors min-h-[44px]"
              />
            </div>
          </div>

          {/* Step 3: Serviços Desejados */}
          <div>
            <span className="block text-xs uppercase font-semibold tracking-wider text-[#1E1B19] mb-2">
              4. Serviços que você gostaria de incluir:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {serviceOptions.map((srv) => {
                const checked = selectedServices.includes(srv);
                return (
                  <button
                    type="button"
                    key={srv}
                    onClick={() => toggleService(srv)}
                    className={`flex items-center gap-2 p-2.5 rounded-sm border text-xs text-left transition-all cursor-pointer min-h-[44px] active:scale-[0.99] ${
                      checked
                        ? 'bg-[#F5F0EB] border-[#C5A880] text-[#1E1B19] shadow-xs'
                        : 'bg-white border-[#E8DFD3] text-[#6B6158] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-colors ${
                      checked ? 'bg-[#785E34] border-[#785E34] text-white' : 'border-[#D9CFC4]'
                    }`}>
                      {checked && <Check className="w-3 h-3" />}
                    </div>
                    <span>{srv}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Dados para Contato */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8DFD3]">
            <div>
              <label htmlFor="lead-name" className="block text-xs uppercase font-semibold tracking-wider text-[#1E1B19] mb-1.5">
                Seu Nome:
              </label>
              <input
                id="lead-name"
                type="text"
                required
                placeholder="Ex: Maria Carolina"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F5F0EB] border border-[#E8DFD3] p-2.5 rounded-sm text-xs text-[#2C2825] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors min-h-[44px]"
              />
            </div>

            <div>
              <label htmlFor="lead-phone" className="block text-xs uppercase font-semibold tracking-wider text-[#1E1B19] mb-1.5">
                Seu WhatsApp / Telefone:
              </label>
              <input
                id="lead-phone"
                type="tel"
                required
                placeholder="(61) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F5F0EB] border border-[#E8DFD3] p-2.5 rounded-sm text-xs text-[#2C2825] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors min-h-[44px]"
              />
            </div>
          </div>

          {/* Extra Notes */}
          <div>
            <label htmlFor="lead-comments" className="block text-xs uppercase font-semibold tracking-wider text-[#1E1B19] mb-1.5">
              Detalhes adicionais (opcional):
            </label>
            <textarea
              id="lead-comments"
              rows={2}
              placeholder="Ex: Gostaria de saber sobre cerimônia no local e horários de visita no sábado..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full bg-[#F5F0EB] border border-[#E8DFD3] p-2.5 rounded-sm text-xs text-[#2C2825] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
            />
          </div>

          {/* Submit to WhatsApp */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#C5A880] hover:bg-[#b89758] active:scale-[0.99] text-[#1E1B19] text-xs font-bold uppercase tracking-[0.18em] rounded-sm transition-all shadow-md hover:shadow-xl cursor-pointer touch-manipulation min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#1E1B19]" />
              <span>Receber Proposta Completa no WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-[#85796E] mt-2">
              Atendimento rápido e exclusivo sem compromisso • Vicente Pires, Brasília
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full mt-3 py-2.5 text-xs text-[#85796E] hover:text-[#1E1B19] transition-colors text-center font-medium cursor-pointer touch-manipulation min-h-[44px]"
            >
              Fechar e voltar ao site
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
