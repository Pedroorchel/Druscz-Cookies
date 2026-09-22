import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PedroStorySection } from './components/PedroStorySection';
import { CraftPillars } from './components/CraftPillars';
import { Testimonials } from './components/Testimonials';
import { HowItWorks } from './components/HowItWorks';
import { CtaBanner } from './components/CtaBanner';
import { OrderArea } from './components/OrderArea';
import { CartPage } from './components/CartPage';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PedroStoryModal } from './components/PedroStoryModal';
import { CookieModal } from './components/CookieModal';
import { CartToastNotification } from './components/CartToastNotification';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { OrderRecord } from './types';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from './utils/whatsapp';

const MainStoreContent: React.FC = () => {
  const { cartTotalCount, cartSubtotal, setIsStoryOpen } = useStore();
  const [currentView, setCurrentView] = useState<'landing' | 'order' | 'cart'>('landing');

  // Success modal states
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');

  const handleOrderCompleted = (order: OrderRecord, url: string, text: string) => {
    setCompletedOrder(order);
    setWhatsappUrl(url);
    setMessageText(text);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (view: 'landing' | 'order' | 'cart') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white font-sans">
      {/* Header Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onScrollToSection={scrollToSection}
      />

      {/* Dynamic View rendering with smooth animation */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col"
            >
              {/* 1. Hero Banner with CTA */}
              <Hero
                onGoToOrder={() => handleNavigate('order')}
                onGoToStory={() => setIsStoryOpen(true)}
              />

              {/* 2. Apresentação da Marca & Causa (Pedro Affonso Druszcz) */}
              <PedroStorySection
                onGoToOrder={() => handleNavigate('order')}
              />

              {/* 3. Benefícios e Diferenciais - Ocultado no Mobile para manter página leve */}
              <div className="hidden md:block">
                <CraftPillars />
              </div>

              {/* 4. Informações de Entrega - Ocultado no Mobile, todas as infos estão no cardápio */}
              <div className="hidden md:block">
                <HowItWorks
                  onGoToOrder={() => handleNavigate('order')}
                />
              </div>

              {/* 6. Banner de Destaque Final / CTA - Ocultado no Mobile devido ao botão fixo flutuante */}
              <div className="hidden md:block">
                <CtaBanner
                  onGoToOrder={() => handleNavigate('order')}
                />
              </div>
            </motion.div>
          ) : currentView === 'order' ? (
            <motion.div
              key="order"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              {/* Dedicated Catalog Menu Screen */}
              <OrderArea
                onBackToLanding={() => handleNavigate('landing')}
                onGoToCart={() => handleNavigate('cart')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              {/* Dedicated Shopping Cart & Order Summary Screen */}
              <CartPage
                onBackToMenu={() => handleNavigate('order')}
                onBackToLanding={() => handleNavigate('landing')}
                onOrderCompleted={handleOrderCompleted}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Quick Action on Landing Page for Mobile */}
      {currentView === 'landing' && (
        <div className="fixed bottom-4 inset-x-4 sm:hidden z-30 animate-in slide-in-from-bottom duration-300">
          <button
            onClick={() => handleNavigate('order')}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-black text-sm flex items-center justify-between shadow-2xl shadow-blue-950 border border-blue-400/40 active:scale-98 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-blue-950 font-black text-[10px] rounded-full flex items-center justify-center">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <span>FAZER ENCOMENDA</span>
            </div>

            <div className="flex items-center gap-2">
              {cartSubtotal > 0 && (
                <span className="font-mono text-xs font-bold text-blue-100">
                  {formatCurrency(cartSubtotal)}
                </span>
              )}
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Floating WhatsApp Quick Contact Button */}
      <FloatingWhatsApp />

      {/* Footer - exibido apenas na página inicial */}
      {currentView === 'landing' && <Footer />}

      {/* Modals & Overlays */}
      <CartToastNotification onGoToCart={() => handleNavigate('cart')} />
      <PedroStoryModal onGoToOrder={() => handleNavigate('order')} />
      <CookieModal />
      <OrderSuccessModal
        order={completedOrder}
        whatsappUrl={whatsappUrl}
        messageText={messageText}
        onClose={() => setCompletedOrder(null)}
      />
      <AdminModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainStoreContent />
    </StoreProvider>
  );
}
