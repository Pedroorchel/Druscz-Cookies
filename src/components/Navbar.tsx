import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/whatsapp';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentView: 'landing' | 'order' | 'cart';
  onNavigate: (view: 'landing' | 'order' | 'cart') => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { cartTotalCount, cartSubtotal } = useStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b16]/95 backdrop-blur-md border-b border-b-blue-950/80 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Left: Voltar button when in Order / Cart View, or badge on Landing */}
        <div className="flex items-center sm:min-w-[140px] shrink-0">
          {currentView === 'cart' ? (
            <button
              onClick={() => {
                onNavigate('order');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-2 sm:px-3.5 py-1.5 rounded-xl bg-slate-900 border border-blue-900/60 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-950/50 transition-all text-xs font-bold cursor-pointer group active:scale-95 shadow-sm"
              title="Voltar ao Cardápio"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Voltar ao Cardápio</span>
              <span className="sm:hidden">Cardápio</span>
            </button>
          ) : currentView === 'order' ? (
            <button
              onClick={() => {
                onNavigate('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 px-2 sm:px-3.5 py-1.5 rounded-xl bg-slate-900 border border-blue-900/60 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-950/50 transition-all text-xs font-bold cursor-pointer group active:scale-95 shadow-sm shrink-0"
              title="Voltar para a página inicial"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Página Inicial</span>
              <span className="sm:hidden">Início</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-blue-300/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fornadas Frescas Diárias</span>
            </div>
          )}
        </div>

        {/* Center: Brand Identity Logo & Name */}
        <BrandLogo
          size="md"
          showLocation={true}
          onClick={() => {
            if (currentView !== 'landing') onNavigate('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="shrink"
        />

        {/* Right: Canto Superior Direito - Opção Carrinho ou Cardápio */}
        <div className="flex items-center justify-end gap-1.5 sm:min-w-[140px] shrink-0">
          {currentView === 'cart' ? (
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-blue-900/60 text-blue-200 text-xs font-semibold shadow-xs">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>{cartTotalCount} {cartTotalCount === 1 ? 'item' : 'itens'}</span>
              {cartSubtotal > 0 && (
                <span className="font-mono font-bold text-white pl-1 border-l border-blue-900/60">
                  {formatCurrency(cartSubtotal)}
                </span>
              )}
            </div>
          ) : currentView === 'landing' ? null : (
            <button
              onClick={() => {
                onNavigate('cart');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-950/80 hover:shadow-blue-600/30 transition-all cursor-pointer group active:scale-95 border border-blue-400/40"
              title="Ir para a Tela do Carrinho e Resumo do Pedido"
            >
              <div className="relative">
                <ShoppingBag className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 bg-amber-400 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <span className="font-extrabold tracking-wide hidden min-[370px]:inline">Carrinho</span>
              {cartSubtotal > 0 && (
                <span className="hidden sm:inline-block font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded-lg text-white">
                  {formatCurrency(cartSubtotal)}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
