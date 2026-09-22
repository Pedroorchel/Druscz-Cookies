import React from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { DRUSZCZ_LOGO_URL } from '../constants/brand';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showLocation?: boolean;
  subtitleOverride?: string;
  onClick?: () => void;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showLocation = true,
  subtitleOverride,
  onClick,
  className = '',
}) => {
  const avatarSizes = {
    sm: 'w-7.5 h-7.5 sm:w-10 sm:h-10',
    md: 'w-8 h-8 sm:w-11 sm:h-11',
    lg: 'w-10 h-10 sm:w-14 sm:h-14',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-xl',
    md: 'text-base sm:text-2xl',
    lg: 'text-lg sm:text-3xl',
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-1.5 sm:gap-3 group cursor-pointer select-none ${className}`}
      title="Druszcz Cookies Artesanais • Pedro Affonso Druszcz"
    >
      {/* Avatar Image with Gradient Ring */}
      <div className="relative shrink-0">
        <div className="p-[2px] rounded-2xl bg-gradient-to-br from-blue-400 via-indigo-500 to-rose-400 shadow-lg shadow-blue-950/80 group-hover:scale-105 group-hover:shadow-blue-500/30 transition-all duration-300">
          <div className={`${avatarSizes[size]} rounded-[14px] overflow-hidden bg-slate-900`}>
            <img
              src={DRUSZCZ_LOGO_URL}
              alt="Druszcz Cookies"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80';
              }}
            />
          </div>
        </div>
        
        {/* Corner Badge */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 border-2 border-[#070b16] flex items-center justify-center shadow-md">
          <Sparkles className="w-2.5 h-2.5 text-slate-950" />
        </div>
      </div>

      {/* Typography Block */}
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
          <span className={`${titleSizes[size]} font-black tracking-tight text-white font-display group-hover:text-blue-100 transition-colors drop-shadow-xs`}>
            DRUSZCZ
          </span>
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.16em] px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-xs border border-blue-400/30 font-sans">
            COOKIES
          </span>
        </div>

        {/* Subtitle */}
        <p className="hidden sm:flex text-[10px] sm:text-[11px] text-slate-300/90 font-medium tracking-wide items-center justify-center sm:justify-start gap-1.5 mt-0.5">
          <span className="text-slate-200 font-semibold">
            {subtitleOverride || 'Pedro Affonso Druszcz'}
          </span>
          {showLocation && (
            <>
              <span className="text-blue-500/70 font-bold">•</span>
              <span className="inline-flex items-center gap-1 text-amber-300 font-bold">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Araucária - PR</span>
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
