import React from 'react';
import { Sparkles } from 'lucide-react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    '🍪 FORNADA FRESCA ASSADA DIARIAMENTE',
    '🍫 100% CHOCOLATE BELGA CALLEBAUT',
    '🧈 MANTEIGA PURA SEM GORDURA HIDROGENADA',
    '🔥 RECHEIOS VULCÃO TRANSBORDANDO',
    '⚖️ COOKIES GIGANTES ESTILO NYC (125g A 140g)',
    '🛵 ENTREGA EXPRESSA EM ARAUCÁRIA-PR',
    '🎁 CAIXAS RÍGIDAS DE LUXO PARA PRESENTE',
    '⚡ CHECKOUT DIRETO NO WHATSAPP',
  ];

  return (
    <div className="w-full bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-y border-blue-900/40 py-2.5 overflow-hidden select-none">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-8">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-4 text-xs sm:text-xs font-bold uppercase tracking-widest text-slate-300">
            <span className="text-blue-300">{text}</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
