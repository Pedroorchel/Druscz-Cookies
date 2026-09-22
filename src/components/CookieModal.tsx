import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Sparkles, ChefHat, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/whatsapp';

export const CookieModal: React.FC = () => {
  const { selectedCookieForDetail, setSelectedCookieForDetail, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (selectedCookieForDetail) {
      setCurrentImageIndex(0);
      setQuantity(1);
      setAdded(false);
      setIsImageLoaded(false);
    }
  }, [selectedCookieForDetail]);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [currentImageIndex]);

  if (!selectedCookieForDetail) return null;

  const cookie = selectedCookieForDetail;
  const isSoldOut = !cookie.isAvailable || cookie.dailyStock <= 0;

  const images = cookie.images && cookie.images.length > 0 ? cookie.images : [cookie.image];
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAdd = () => {
    if (isSoldOut) return;
    addToCart(cookie, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedCookieForDetail(null);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setSelectedCookieForDetail(null)}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0b101d] border border-blue-900/60 rounded-3xl shadow-2xl text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedCookieForDetail(null)}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/70 text-slate-300 hover:text-white hover:bg-black flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg"
          aria-label="Fechar detalhes"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Carousel */}
        <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden shrink-0 group select-none flex items-center justify-center">
          <img
            src={images[currentImageIndex]}
            alt={`${cookie.name} - Foto ${currentImageIndex + 1}`}
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-[#0e1424] animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-3 border-blue-500 border-t-transparent animate-spin" />
            </div>
          )}

          {/* Top gradient overlay */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0b101d] to-transparent pointer-events-none" />

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                title="Foto anterior"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                title="Próxima foto"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Photo Counter Pill */}
          {hasMultipleImages && (
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold shadow">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {currentImageIndex + 1} de {images.length} fotos
              </span>
            </div>
          )}

          {/* Dots Indicator inside photo */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentImageIndex
                      ? 'w-5 bg-blue-400 shadow-sm'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir para foto ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4 flex-1">
          {/* Header Title & Price */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-blue-950">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {cookie.isBestSeller && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950">
                    Mais Vendido
                  </span>
                )}
                {cookie.isNew && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-600 text-white">
                    Novidade
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-blue-950 text-blue-200 border border-blue-900">
                  {cookie.weight}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white font-display">
                {cookie.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-300 font-mono">
                {formatCurrency(cookie.price)}
              </span>
            </div>
          </div>

          {/* Tagline / Subtitle */}
          <p className="text-xs sm:text-sm text-blue-200 font-medium italic">
            "{cookie.tagline}"
          </p>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5 text-blue-400" /> Sobre Esta Criação
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {cookie.description}
            </p>
          </div>

          {/* Filling Highlight */}
          {cookie.filling && (
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">Recheio Especial</h5>
                  <p className="text-xs text-blue-200">{cookie.filling}</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-blue-300 px-2 py-0.5 rounded bg-blue-900/60 shrink-0">
                Puro Sabor
              </span>
            </div>
          )}

          {/* Ingredients */}
          {cookie.ingredients && cookie.ingredients.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Ingredientes Selecionados
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cookie.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-900/90 text-slate-300 border border-blue-950"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#070b16] border-t border-blue-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Qtd:</span>
            <div className="flex items-center bg-slate-950 rounded-xl border border-blue-900/80 p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1 || isSoldOut}
                className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Diminuir"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-7 text-center font-bold text-xs font-mono text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(cookie.dailyStock, q + 1))}
                disabled={quantity >= cookie.dailyStock || isSoldOut}
                className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Aumentar"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={isSoldOut}
            className={`h-11 px-5 sm:px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer ${
              isSoldOut
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : added
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/80 border border-blue-400/40'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Adicionado à Sacola!</span>
              </>
            ) : isSoldOut ? (
              <span>Esgotado por Hoje</span>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Adicionar • {formatCurrency(cookie.price * quantity)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
