import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Flame, Sparkles, Plus, Star, Heart, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/whatsapp';
import { CookieItem } from '../types';

interface FeaturedProductsProps {
  onGoToOrder: () => void;
  onSelectCookie: (cookie: CookieItem) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onGoToOrder, onSelectCookie }) => {
  const { cookies, addToCart } = useStore();

  const handleQuickAdd = (cookie: CookieItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(cookie, 1);
  };

  return (
    <section id="produtos-destaque" className="py-20 bg-[#070c18] border-b border-blue-950/70 relative scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-600/5 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-800/60 text-xs font-bold text-blue-300">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Cardápio Oficial & Combos</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Sabores Artesanais que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-rose-200 to-white">
                Derretem a Cada Mordida
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Massa artesanal alta com até 140g de pura gostosura. Cada sabor é feito à mão com recheio farto e chocolate de qualidade.
            </p>
          </div>

          <button
            onClick={onGoToOrder}
            className="self-start md:self-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-blue-950 hover:shadow-blue-600/30 active:scale-95 transition-all cursor-pointer group"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ver Cardápio Completo & Pedir</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Grid of Cookie Cards with Large Appetising Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cookies.map((cookie, idx) => (
            <div
              key={cookie.id}
              onClick={() => onSelectCookie(cookie)}
              className="group rounded-3xl bg-[#0b1326] border border-blue-900/60 hover:border-blue-500/80 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              {/* Product Image Section */}
              <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
                <img
                  src={cookie.image}
                  alt={cookie.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-black/20" />

                {/* Badge tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {cookie.isBestSeller && (
                    <span className="px-3 py-1 rounded-full bg-rose-600/95 text-[11px] font-black text-white shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      <span>Mais Pedido</span>
                    </span>
                  )}
                  {cookie.category === 'combos' && (
                    <span className="px-3 py-1 rounded-full bg-amber-600/95 text-[11px] font-black text-white shadow-md">
                      Combo Especial
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-xs text-xs font-mono font-bold text-white border border-white/10">
                  {cookie.weight}
                </div>
              </div>

              {/* Info & Content Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-black text-white font-display group-hover:text-blue-300 transition-colors">
                      {cookie.name}
                    </h3>
                    <span className="text-lg font-black text-blue-300 font-mono">
                      {formatCurrency(cookie.price)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {cookie.description}
                  </p>

                  {cookie.filling && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium pt-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Recheio: {cookie.filling}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-blue-900/50 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    {cookie.dailyStock > 0 ? (
                      <span className="text-emerald-400 font-semibold">
                        ✓ {cookie.dailyStock} un. disponíveis hoje
                      </span>
                    ) : (
                      <span className="text-rose-400">Sob encomenda</span>
                    )}
                  </span>

                  <button
                    onClick={(e) => handleQuickAdd(cookie, e)}
                    disabled={!cookie.isAvailable || cookie.dailyStock <= 0}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-blue-950 transition-all cursor-pointer active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating banner to order all */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-[#0d1730] to-indigo-950 border border-blue-800/70 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-black text-white">
              Quer encomendar para aniversários, empresas ou presentes?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Preparamos caixas personalizadas com fita de cetim, bilhetes e sabores variados.
            </p>
          </div>

          <button
            onClick={onGoToOrder}
            className="px-6 py-3.5 rounded-2xl bg-white text-blue-950 hover:bg-blue-50 font-black text-sm flex items-center gap-2 shadow-xl shrink-0 cursor-pointer active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            <span>IR PARA A ÁREA DE ENCOMENDAS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
