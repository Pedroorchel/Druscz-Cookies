import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  RotateCw,
} from 'lucide-react';

export interface PedroPhoto {
  url: string;
  title: string;
  subtitle: string;
  tag: string;
  rotate?: number;
}

export const PEDRO_PHOTOS: PedroPhoto[] = [
  {
    url: 'https://www.image2url.com/r2/default/images/1790042003239-7367c090-d418-45a9-8d52-3b5cb1e150b7.jpeg',
    title: 'Pedro com seus pais e o troféu de vitória',
    subtitle: 'Com o apoio incondicional das pessoas mais importantes para ele',
    tag: 'Família & Vitória',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790041751950-d2673fd6-7f7d-45bf-870e-419a9a56f366.jpeg',
    title: 'Pedro e sua amada rede de apoio e amor',
    subtitle: 'Unidos pela superação e conquista a cada fase do tratamento',
    tag: 'Rede de Afeto',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790041748428-48ec2904-664a-43bc-97b2-dd342b3fd890.jpeg',
    title: 'Pedro Affonso Druszcz - Atleta & Confeiteiro',
    subtitle: 'Produzindo cookies artesanais com amor para custear sua cura',
    tag: 'Superação & Vôlei',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790041743215-3533216d-dd2f-4b34-a4d4-7a80842e220a.jpeg',
    title: 'Pedro e a paixão pelo Vôlei (VKR Araucária)',
    subtitle: 'Garra, sorriso e determinação dentro e fora das quadras',
    tag: 'Atleta Araucária',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790042747535-66e7c58d-9d6f-44f7-892a-22197e5113d1.jpeg',
    title: 'Pedro Affonso',
    subtitle: 'Momentos especiais de carinho e apoio',
    tag: 'Pedro e Família',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790042752695-f1fadcc6-f0d6-4a3a-b193-11be5b2e2d48.jpeg',
    title: 'Pedro Affonso',
    subtitle: 'Sorriso e esperança em família',
    tag: 'Pedro e Família',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790042757270-f964341b-faaf-4137-bc54-577714b7c6af.jpeg',
    title: 'Pedro Affonso',
    subtitle: 'Apoio e união familiar',
    tag: 'Pedro e Família',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790042761107-cb96d858-6399-44b7-873f-9e5463d3e42b.jpeg',
    title: 'Pedro Affonso',
    subtitle: 'Garra e determinação',
    tag: 'Pedro e Amigos',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790042767548-b24104a2-4e94-4e80-9428-3c1217fa0c9e.jpeg',
    title: 'Pedro Affonso',
    subtitle: 'Força e inspiração',
    tag: 'Superação',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790043263130-f042ad59-dc84-4456-b434-19a77b6309dc.jpeg',
    title: 'Pedro Affonso',
    subtitle: 'Carinho dos amigos e apoiadores',
    tag: 'Rede de Afeto',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790043266713-6e8ab63f-a50d-4bb9-9b4e-202043c9868b.jpeg',
    title: 'Pedro Affonso',
    subtitle: 'Momentos inesquecíveis',
    tag: 'Pedro e Família',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790043270438-e34bb71e-18dc-4577-93ff-efd1ec8120a9.jpeg',
    title: 'Pedro Affonso e Equipe de Vôlei',
    subtitle: 'Unidos pela paixão ao esporte e superação',
    tag: 'VKR Araucária Vôlei',
    rotate: -90, // Virada para orientação vertical correta
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790043274142-be288477-c66a-480c-a603-65affb47c0cb.jpeg',
    title: 'Pedro Affonso',
    subtitle: 'Sorrisos e superação',
    tag: 'Esperança',
  },
  {
    url: 'https://www.image2url.com/r2/default/images/1790043278127-48c0175e-c61f-49bf-8973-2574b2e2cbd3.jpeg',
    title: 'Pedro Affonso',
    subtitle: 'Companheirismo e carinho',
    tag: 'Família & Amigos',
  },
];

// Compatibility export
export const PEDRO_CAUSE_IMAGES = PEDRO_PHOTOS.map((p) => p.url);

interface CauseCarouselProps {
  className?: string;
  aspectRatio?: string;
  isSquare?: boolean;
}

export const CauseCarousel: React.FC<CauseCarouselProps> = ({
  className = '',
  aspectRatio = 'aspect-square',
  isSquare = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotations, setRotations] = useState<Record<number, number>>({});

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > 35) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const getRotation = useCallback((idx: number) => {
    const baseRot = PEDRO_PHOTOS[idx]?.rotate ?? 0;
    const customRot = rotations[idx] ?? 0;
    return (baseRot + customRot) % 360;
  }, [rotations]);

  const handleRotateCurrent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotations((prev) => ({
      ...prev,
      [currentIndex]: ((prev[currentIndex] ?? 0) + 90) % 360,
    }));
  };

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? PEDRO_PHOTOS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % PEDRO_PHOTOS.length);
  }, []);

  useEffect(() => {
    if (isPaused || isFullscreen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PEDRO_PHOTOS.length);
    }, 1500); // Transição a cada 1,5 segundos

    return () => clearInterval(timer);
  }, [isPaused, isFullscreen]);

  // Keyboard navigation for Fullscreen Lightbox
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'r' || e.key === 'R') {
        setRotations((prev) => ({
          ...prev,
          [currentIndex]: ((prev[currentIndex] ?? 0) + 90) % 360,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handleNext, handlePrev, currentIndex]);

  const currentPhoto = PEDRO_PHOTOS[currentIndex];
  const currentRotation = getRotation(currentIndex);

  return (
    <>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-blue-500/60 shadow-2xl shadow-blue-950/90 group min-h-[260px] sm:min-h-[440px] md:min-h-[540px] ${
          isSquare ? 'aspect-square' : aspectRatio
        } ${className}`}
      >
        {/* Images Stack with crossfade animation */}
        {PEDRO_PHOTOS.map((photo, idx) => {
          const rot = getRotation(idx);
          const isRotatedSideways = Math.abs(rot % 180) === 90;

          return (
            <div
              key={photo.url}
              onClick={() => setIsFullscreen(true)}
              className={`absolute inset-0 transition-all duration-500 ease-in-out cursor-pointer flex items-center justify-center overflow-hidden bg-slate-950/95 p-2 sm:p-3 ${
                idx === currentIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                style={{ transform: `rotate(${rot}deg)` }}
                className={`transition-transform duration-300 ease-out object-contain w-full h-full select-none ${
                  isRotatedSideways
                    ? 'max-h-[88%] max-w-[88%]'
                    : 'max-h-full max-w-full'
                }`}
              />
            </div>
          );
        })}

        {/* Navigation Controls over clean photo */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-30">
          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-md">
            {currentIndex + 1} / {PEDRO_PHOTOS.length}
          </span>

          <button
            type="button"
            onClick={handleRotateCurrent}
            title="Girar Foto 90°"
            className="w-8 h-8 rounded-full bg-black/75 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md hover:scale-110 active:scale-95"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            title="Expandir Foto em Tela Cheia"
            className="w-8 h-8 rounded-full bg-black/75 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md hover:scale-110 active:scale-95"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Foto Anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-blue-600 backdrop-blur-md text-white border border-white/30 flex items-center justify-center transition-all opacity-90 hover:opacity-100 cursor-pointer z-30 shadow-xl hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Próxima Foto"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-blue-600 backdrop-blur-md text-white border border-white/30 flex items-center justify-center transition-all opacity-90 hover:opacity-100 cursor-pointer z-30 shadow-xl hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
          {PEDRO_PHOTOS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para a foto ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-blue-400 shadow-md shadow-blue-500/80'
                  : 'w-2 bg-white/40 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox True Fullscreen Modal */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 w-screen h-screen animate-in fade-in duration-200 select-none overflow-hidden"
        >
          {/* Modal Header Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between w-full max-w-6xl mx-auto z-20 py-2.5 px-4 rounded-2xl bg-slate-900/90 border border-blue-500/40 backdrop-blur-md shadow-2xl shrink-0"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-mono font-bold text-white">
                Foto {currentIndex + 1} de {PEDRO_PHOTOS.length}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleRotateCurrent}
                className="px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                title="Girar Foto 90° (atalho: R)"
              >
                <RotateCw className="w-4 h-4" />
                <span className="hidden sm:inline">Girar Foto</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
                title="Fechar Tela Cheia (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Center Photo Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative flex-1 w-full h-full flex items-center justify-center my-2 overflow-hidden"
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              style={{ transform: `rotate(${currentRotation}deg)` }}
              className={`transition-transform duration-300 ease-out object-contain drop-shadow-2xl select-none ${
                Math.abs(currentRotation % 180) === 90
                  ? 'max-h-[72vw] max-w-[72vh] sm:max-h-[80vw] sm:max-w-[80vh]'
                  : 'max-h-[85vh] max-w-[95vw]'
              }`}
            />

            {/* Nav Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 hover:bg-blue-600 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 z-30"
              title="Foto Anterior (Seta Esquerda)"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 hover:bg-blue-600 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95 z-30"
              title="Próxima Foto (Seta Direita)"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Modal Footer / Dots */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 py-1 z-20 shrink-0"
          >
            {PEDRO_PHOTOS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'w-7 bg-blue-400 shadow-lg shadow-blue-500/80'
                    : 'w-2 bg-white/30 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

