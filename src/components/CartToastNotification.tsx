import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, CheckCircle2, ArrowRight, X, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/whatsapp';

interface CartToastNotificationProps {
  onGoToCart?: () => void;
}

export const CartToastNotification: React.FC<CartToastNotificationProps> = ({ onGoToCart }) => {
  const { cartToast, dismissCartToast, cartTotalCount } = useStore();

  useEffect(() => {
    if (!cartToast) return;

    const timer = setTimeout(() => {
      dismissCartToast();
    }, 4500);

    return () => clearTimeout(timer);
  }, [cartToast, dismissCartToast]);

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      <AnimatePresence>
        {cartToast && (
          <motion.div
            key={cartToast.id}
            initial={{ opacity: 0, y: -20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-auto rounded-2xl bg-[#0c1428]/95 backdrop-blur-md border-2 border-emerald-500/80 shadow-2xl shadow-emerald-950/80 p-4 text-white overflow-hidden relative"
          >
            {/* Ambient emerald glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-3 relative z-10">
              {/* Product Thumbnail */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-emerald-500/50 shrink-0 shadow-md">
                <img
                  src={cartToast.cookie.image}
                  alt={cartToast.cookie.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
              </div>

              {/* Message Details */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-emerald-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Adicionado ao carrinho!</span>
                </div>

                <h4 className="text-sm font-extrabold text-white truncate mt-0.5 font-display">
                  {cartToast.quantity}x {cartToast.cookie.name}
                </h4>

                <p className="text-xs font-mono font-bold text-blue-300">
                  {formatCurrency(cartToast.cookie.price * cartToast.quantity)}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={dismissCartToast}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Fechar notificação"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-3 pt-2.5 border-t border-blue-900/60 flex items-center justify-between gap-2 relative z-10">
              <span className="text-[11px] text-slate-300 font-medium">
                Total: <strong className="text-white font-bold">{cartTotalCount} {cartTotalCount === 1 ? 'item' : 'itens'}</strong> na sacola
              </span>

              <button
                onClick={() => {
                  dismissCartToast();
                  if (onGoToCart) {
                    onGoToCart();
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-all cursor-pointer group active:scale-95 border border-emerald-400/40"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ver Carrinho</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
