import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useStore();

  const phoneOnlyDigits = settings.whatsappNumber.replace(/\D/g, '');
  const defaultMessage = encodeURIComponent(
    'Olá Pedro! Conheci sua história no site e gostaria de encomendar os cookies artesanais para apoiar seu tratamento!'
  );

  return (
    <aside aria-label="Atendimento WhatsApp Oficial" className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 group">
      <a
        href={`https://wa.me/${phoneOnlyDigits}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp com o Pedro Affonso da Druszcz Cookies"
        className="flex items-center gap-2.5 py-3 px-3.5 sm:px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        </div>
        <div className="text-left pr-1 hidden sm:block">
          <span className="block text-[10px] text-emerald-100 font-semibold uppercase tracking-wider flex items-center gap-1">
            <span>WhatsApp do Pedro</span>
            <Heart className="w-2.5 h-2.5 fill-emerald-200" />
          </span>
          <span className="block text-xs font-black">(41) 99611-5284</span>
        </div>
      </a>
    </aside>
  );
};
