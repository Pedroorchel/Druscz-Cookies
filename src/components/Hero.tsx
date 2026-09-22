import React from 'react';
import { Heart, Trophy, Phone, ShoppingBag, ArrowRight, Sparkles, Flame, ShieldCheck, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/whatsapp';
import { DRUSZCZ_LOGO_URL } from '../constants/brand';

interface HeroProps {
  onGoToOrder: () => void;
  onGoToStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGoToOrder, onGoToStory }) => {
  const { cartTotalCount } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#070b16] via-[#0a1226] to-[#060a14] pt-8 sm:pt-12 pb-16 sm:pb-20 border-b border-blue-950/70">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
        <div className="absolute top-0 left-1/3 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-600/10 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-rose-600/10 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Headline, Value Proposition & Prominent CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Athlete Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-300 bg-blue-950/90 px-4 py-1.5 rounded-full border border-blue-800/70 shadow-md">
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Pedro Affonso Druszcz • Atleta VKR Araucária Vôlei</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] font-display">
              Cookies artesanais irresistíveis, feitos para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-rose-200 to-white">
                vencer essa partida.
              </span>
            </h1>

            {/* Concise Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Receitas autorais e fartas de <strong>KitKat, Kinder, Nutella, Biscoff, Ninho, Maracujá com Choc. Branco, Limão e Black</strong> (R$ 13,00 a R$ 15,00). 
              Massa crocante por fora, centro vulcânico cremoso e 100% da renda revertida para custear o tratamento do Pedro contra o sarcoma de Ewing.
            </p>

            {/* Quote Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/50 border-l-4 border-blue-500 text-slate-300 text-xs sm:text-sm italic text-left shadow-lg">
              “Quem provou, aprovou e repetiu o pedido. Cada cookie entregue é um abraço e uma dose de força para o meu tratamento.”
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-900/40 not-italic">
                <span className="text-xs font-black text-blue-200">
                  — Pedro Affonso Druszcz (Fundador & Atleta)
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Hospital Angelina Caron
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS: Standout "FAZER ENCOMENDA" */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 w-full">
              <button
                onClick={onGoToOrder}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-blue-950/80 hover:shadow-blue-600/40 active:scale-98 transition-all cursor-pointer group"
              >
                <ShoppingBag className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>FAZER ENCOMENDA AGORA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
                <button
                  onClick={onGoToStory}
                  className="px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-blue-900/70 transition-all cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0 animate-pulse" />
                  <span>Conhecer a Causa</span>
                </button>

                <a
                  href="https://wa.me/5541996115284?text=Olá Pedro! Gostaria de encomendar cookies e apoiar seu tratamento!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-emerald-800/80 transition-all"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span className="font-mono">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Highlights bar */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-blue-950">
                <div className="text-base sm:text-lg font-black text-white font-mono">130g+</div>
                <div className="text-[11px] text-slate-400">Peso médio por cookie</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-blue-950">
                <div className="text-base sm:text-lg font-black text-amber-400 font-mono">8 Sabores</div>
                <div className="text-[11px] text-slate-400">Receitas exclusivas</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-blue-950">
                <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">100%</div>
                <div className="text-[11px] text-slate-400">Artesanal e fresco</div>
              </div>
            </div>
          </div>

          {/* Right: Clean Visual Showcase of Druszcz Cookies */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#0c1428] border border-blue-900/70 p-5 sm:p-6 shadow-2xl relative overflow-hidden group">
              {/* Product Photo Showcase */}
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-950 mb-5 border border-blue-950">
                <img
                  src={DRUSZCZ_LOGO_URL}
                  alt="Druszcz Cookies Artesanais"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1428] via-transparent to-black/30" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-xs border border-white/20 text-xs font-bold text-white shadow">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fornada Artesanal do Dia</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold text-blue-300 uppercase tracking-widest block">
                    Cardápio Oficial
                  </span>
                  <p className="text-sm font-extrabold line-clamp-1">
                    Nutella • Kinder • KitKat • Ninho • Limão • Black
                  </p>
                </div>
              </div>

              {/* Quick Flavor Pills */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-blue-950">
                  <span className="text-slate-300 font-medium">Recheio Farto</span>
                  <strong className="text-amber-300">Pura Nutella & Chocolate Belga</strong>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-blue-950">
                  <span className="text-slate-300 font-medium">Preços Oficiais</span>
                  <strong className="text-emerald-400 font-mono">R$ 13,00 a R$ 15,00 un.</strong>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-blue-950">
                  <span className="text-slate-300 font-medium">Entregas Rápidas</span>
                  <strong className="text-white">Somente em Araucária-PR</strong>
                </div>
              </div>

              {/* Action trigger on card */}
              <button
                onClick={onGoToOrder}
                className="mt-4 w-full py-3 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Escolher Sabores na Área de Pedidos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
