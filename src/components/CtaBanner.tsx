import React from 'react';
import { ShoppingBag, ArrowRight, Phone, Heart, Sparkles, Trophy } from 'lucide-react';
import { DRUSZCZ_LOGO_URL } from '../constants/brand';

interface CtaBannerProps {
  onGoToOrder: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onGoToOrder }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#060a14] via-[#091124] to-[#060a12] border-b border-blue-950/70 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* Logo Avatar Badge */}
        <div className="inline-flex items-center gap-3 p-2 pr-4 rounded-full bg-blue-950/80 border border-blue-700/60 shadow-xl">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-400">
            <img
              src={DRUSZCZ_LOGO_URL}
              alt="Druszcz Cookies"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs font-bold text-blue-200">
            Pedro Affonso Druszcz • VKR Araucária Vôlei
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] font-display">
            Pronto para experimentar o melhor cookie e{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-rose-200 to-white">
              apoiar essa causa?
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Monte sua caixa com os sabores que preferir (Nutella, Kinder, KitKat, Ninho, Limão ou Black). 
            Receba quentinho em casa ou retire conosco com agendamento fácil.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onGoToOrder}
            className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base sm:text-lg flex items-center gap-3 shadow-2xl shadow-blue-950/90 hover:shadow-blue-600/40 active:scale-98 transition-all cursor-pointer group"
          >
            <ShoppingBag className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span>FAZER ENCOMENDA AGORA</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href="https://wa.me/5541996115284?text=Olá Pedro! Quero encomendar cookies e apoiar seu tratamento!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 sm:py-5 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-bold text-sm sm:text-base flex items-center gap-2.5 border border-emerald-700/80 transition-all"
          >
            <Phone className="w-5 h-5" />
            <span>Pedir no WhatsApp (41) 99611-5284</span>
          </a>
        </div>

        {/* Security badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Fornadas diárias sob demanda
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400" />
            100% revertido para o tratamento médico
          </span>
          <span className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            Receita autoral aprovada e recomendada
          </span>
        </div>
      </div>
    </section>
  );
};
