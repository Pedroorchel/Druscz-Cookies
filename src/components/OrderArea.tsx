import React from 'react';
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Flame,
  Sparkles,
  Plus,
  Minus,
  ChefHat,
  Award,
  Heart,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CookieItem } from '../types';
import { formatCurrency } from '../utils/whatsapp';

interface OrderAreaProps {
  onBackToLanding: () => void;
  onGoToCart: () => void;
}

export const OrderArea: React.FC<OrderAreaProps> = ({ onBackToLanding, onGoToCart }) => {
  const {
    cookies,
    cart,
    addToCart,
    updateCartQuantity,
    cartTotalCount,
    cartSubtotal,
    settings,
    setSelectedCookieForDetail,
  } = useStore();

  const openCookieModal = (cookie: CookieItem) => {
    setSelectedCookieForDetail(cookie);
  };

  const isFreeDelivery = cartSubtotal >= settings.freeDeliveryThreshold;
  const neededForFree = Math.max(0, settings.freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-100 flex flex-col font-sans relative selection:bg-blue-600 selection:text-white pb-12">
      {/* Top Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[900px] h-[200px] sm:h-[350px] bg-blue-600/10 rounded-full blur-[100px] sm:blur-[140px]" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 w-full flex-1">
        {/* Banner Alert: Solidary Cause */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/90 via-[#0c162e] to-rose-950/60 border border-blue-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/80 border border-blue-400/50 flex items-center justify-center text-amber-400 shrink-0">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">
                Seu pedido apoia o tratamento do atleta Pedro Affonso Druszcz
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Produção artesanal diária contra o sarcoma de Ewing (Hospital Angelina Caron). Cada encomenda faz a diferença!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Atendimento em Araucária-PR</span>
            </div>

            {cartTotalCount > 0 && (
              <button
                onClick={onGoToCart}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-blue-950 transition-all cursor-pointer active:scale-95 border border-blue-400/40"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ver Carrinho ({cartTotalCount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cardápio Oficial Druszcz Cookies</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
              Escolha Seus Cookies Artesanais
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Clique em <strong className="text-blue-300">+ Adicionar</strong> nos seus sabores favoritos. Quando terminar, acesse o carrinho para revisar e finalizar seu pedido.
            </p>
          </div>

          {/* Quick Filter Info */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-blue-900/60 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-950/50 transition-all text-xs font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cookies.length > 0 ? (
            cookies.map((cookie) => {
              const cartItem = cart.find((i) => i.cookie.id === cookie.id);
              const inCartQty = cartItem ? cartItem.quantity : 0;
              const isAvailable = cookie.isAvailable && cookie.dailyStock > 0;

              return (
                <div
                  key={cookie.id}
                  className="rounded-3xl bg-[#080e1d] border border-blue-900/60 hover:border-blue-500/60 transition-all duration-300 shadow-xl overflow-hidden flex flex-col group"
                >
                  {/* Image Banner */}
                  <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden shrink-0">
                    <img
                      src={cookie.image}
                      alt={cookie.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    {/* Top gradient for badges contrast */}
                    <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                    {/* Soft bottom gradient transition */}
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#080e1d] to-transparent pointer-events-none" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                      {cookie.isBestSeller && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-600 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                          Mais Pedido
                        </span>
                      )}
                      {cookie.isNew && (
                        <span className="px-2.5 py-1 rounded-full bg-blue-600 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                          Novidade
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-sm text-[11px] font-mono text-blue-200 border border-white/10 shadow">
                      {cookie.weight}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-black text-white font-display leading-snug group-hover:text-blue-300 transition-colors">
                          {cookie.name}
                        </h3>
                        <span className="text-base font-black text-blue-300 font-mono shrink-0">
                          {formatCurrency(cookie.price)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {cookie.description}
                      </p>

                      {cookie.filling && (
                        <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-900/60 flex items-center gap-2 text-xs text-amber-300">
                          <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate font-medium">Recheio: {cookie.filling}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="pt-3 border-t border-blue-950/80 flex items-center justify-between gap-2">
                      <div>
                        {isAvailable ? (
                          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{cookie.dailyStock} un. hoje</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-rose-400 font-semibold">
                            Esgotado por hoje
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {inCartQty > 0 ? (
                          <div className="flex items-center gap-1.5 bg-slate-950 border border-blue-700/80 rounded-xl p-1">
                            <button
                              onClick={() => updateCartQuantity(cookie.id, inCartQty - 1)}
                              className="w-7 h-7 rounded-lg bg-blue-950 hover:bg-blue-900 text-white flex items-center justify-center transition-colors cursor-pointer"
                              title="Diminuir"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-black text-white px-2 min-w-[20px] text-center font-mono">
                              {inCartQty}
                            </span>
                            <button
                              onClick={() => addToCart(cookie, 1)}
                              disabled={inCartQty >= cookie.dailyStock}
                              className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white flex items-center justify-center transition-colors cursor-pointer"
                              title="Aumentar"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openCookieModal(cookie)}
                              className="px-2.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-[11px] font-semibold transition-colors cursor-pointer border border-transparent hover:border-blue-900"
                              title="Personalizar"
                            >
                              Detalhes
                            </button>

                            <button
                              onClick={() => addToCart(cookie, 1)}
                              disabled={!isAvailable}
                              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                                !isAvailable
                                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950 border border-blue-400/40'
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Adicionar</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 px-4 text-center rounded-3xl bg-[#080e1d] border border-blue-950 space-y-3">
              <p className="text-sm font-bold text-white">Nenhum cookie disponível no momento.</p>
              <p className="text-xs text-slate-400">Volte mais tarde para conferir as novidades do cardápio!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
