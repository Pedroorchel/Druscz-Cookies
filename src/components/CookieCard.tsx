import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Check, Eye, Flame, AlertCircle } from 'lucide-react';
import { CookieItem } from '../types';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/whatsapp';

interface CookieCardProps {
  cookie: CookieItem;
  index?: number;
}

export const CookieCard: React.FC<CookieCardProps> = ({ cookie, index = 0 }) => {
  const { addToCart, setSelectedCookieForDetail } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isSoldOut = !cookie.isAvailable || cookie.dailyStock <= 0;
  const isLowStock = cookie.dailyStock > 0 && cookie.dailyStock <= 5;

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < cookie.dailyStock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) return;
    addToCart(cookie, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: Math.min(index * 0.05, 0.4),
      }}
      whileHover={!isSoldOut ? { y: -4, transition: { duration: 0.2 } } : undefined}
      onClick={() => setSelectedCookieForDetail(cookie)}
      className={`group relative flex flex-col justify-between rounded-2xl bg-[#0d1424] border transition-colors duration-300 overflow-hidden cursor-pointer ${
        isSoldOut
          ? 'border-slate-800/60 opacity-75'
          : 'border-blue-900/40 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-950/70'
      }`}
    >
      {/* Top Media Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        <img
          src={cookie.image}
          alt={cookie.name}
          onLoad={() => setIsImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isSoldOut ? 'grayscale contrast-125' : ''
          } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-[#0d1424] animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          </div>
        )}

        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-black/40" />

        {/* Badges on top */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-1 pointer-events-none">
          <div className="flex flex-col gap-1.5 items-start">
            {cookie.isBestSeller && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                Mais Vendido
              </span>
            )}
            {cookie.isNew && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-md">
                Novidade
              </span>
            )}
            {cookie.filling && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950/90 text-blue-200 border border-blue-700/60 shadow">
                Recheio Vulcão
              </span>
            )}
          </div>

          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-950/80 text-slate-300 border border-slate-700/50 backdrop-blur-sm">
            {cookie.weight}
          </span>
        </div>

        {/* Sold out overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-rose-950/90 text-rose-300 border border-rose-800 text-xs font-bold uppercase tracking-wider shadow-lg">
              Esgotado por hoje
            </span>
          </div>
        )}

        {/* Quick view hint icon */}
        <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs border border-white/10">
          <Eye className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-blue-300 transition-colors line-clamp-1">
              {cookie.name}
            </h3>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {cookie.tagline || cookie.description}
          </p>

          {/* Daily stock indicator pill */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-400 flex items-center gap-1">
                {isSoldOut ? (
                  <span className="text-rose-400 font-medium">Sem estoque hoje</span>
                ) : isLowStock ? (
                  <span className="text-amber-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Últimas {cookie.dailyStock} unidades!
                  </span>
                ) : (
                  <span className="text-slate-300">Fornada do dia</span>
                )}
              </span>
              {!isSoldOut && (
                <span className="text-blue-300 font-mono font-medium">
                  {cookie.dailyStock} un.
                </span>
              )}
            </div>

            {/* Visual stock bar */}
            {!isSoldOut && (
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-blue-950">
                <div
                  className={`h-full transition-all duration-300 ${
                    isLowStock ? 'bg-amber-500' : 'bg-blue-500'
                  }`}
                  style={{
                    width: `${Math.min(100, (cookie.dailyStock / Math.max(cookie.maxDailyStock, 1)) * 100)}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Pricing & Cart Action Bar */}
        <div className="pt-3 border-t border-blue-950/80 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Preço</span>
            <span className="text-lg font-black text-white font-mono">
              {formatCurrency(cookie.price)}
            </span>
          </div>

          {/* Action button & quantity control */}
          {!isSoldOut ? (
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center bg-slate-950 rounded-xl border border-blue-900/60 p-0.5">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-white font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= cookie.dailyStock}
                  className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`h-8 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/40 shadow-blue-950/80'
                }`}
                aria-label={`Adicionar ${cookie.name} ao carrinho`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Adicionado</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              disabled
              className="h-8 px-3 rounded-xl font-bold text-xs bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed"
            >
              Indisponível
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
