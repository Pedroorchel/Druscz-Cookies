import React, { useState } from 'react';
import { Flame, Clock, Sparkles, Coffee, Heart } from 'lucide-react';

export const ReheatGuide: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<'micro' | 'forno' | 'airfryer'>('micro');

  const methods = {
    micro: {
      title: 'No Micro-ondas',
      time: '15 a 25 segundos',
      bestFor: 'Recheios Vulcão & Comer de Colher',
      instructions: [
        'Retire o cookie da embalagem de proteção.',
        'Aqueça em potência média/alta por apenas 15 a 20 segundos (no máximo 25s).',
        'O recheio ficará derretendo e a massa incrivelmente fofa e aromática.',
        'Dica de ouro: Sirva imediatamente com uma bola de sorvete de creme!',
      ],
    },
    forno: {
      title: 'No Forno Convencional',
      time: '3 a 5 minutos a 180°C',
      bestFor: 'Crocância Perfeita & Borda Dourada',
      instructions: [
        'Pré-aqueça o forno a 180°C por 5 minutos.',
        'Coloque o cookie em uma assadeira ou papel manteiga.',
        'Deixe por 3 a 5 minutos até a borda voltar a estalar de crocante.',
        'Espere 1 minuto esfriar para a casquinha firmar antes da primeira mordida.',
      ],
    },
    airfryer: {
      title: 'Na Airfryer',
      time: '2 a 3 minutos a 160°C',
      bestFor: 'Rápido, Prático e Estalando',
      instructions: [
        'Aqueça a cesta da Airfryer a 160°C por 1 minuto.',
        'Coloque o cookie sobre uma folha de papel manteiga perfurada.',
        'Aqueça por 2 a 3 minutos.',
        'O topo fica crocante como se tivesse acabado de sair do forno da confeitaria!',
      ],
    },
  };

  const current = methods[activeMethod];

  return (
    <section id="degustacao" className="py-20 bg-[#060a12] border-b border-blue-950/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-bold text-blue-300">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Experiência Sensorial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            O Segredo do Cookie <span className="text-amber-400">Recém-Saído do Forno</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            Nossos cookies são deliciosos em temperatura ambiente, mas ficam divinos e derretendo quando aquecidos por alguns segundos!
          </p>
        </div>

        {/* Interactive Method Tabs & Card */}
        <div className="max-w-3xl mx-auto">
          {/* Method Selector Tabs */}
          <div className="flex p-1.5 rounded-2xl bg-slate-900 border border-blue-950 mb-6 gap-2">
            {(['micro', 'forno', 'airfryer'] as const).map((key) => {
              const tab = methods[key];
              const isSelected = activeMethod === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveMethod(key)}
                  className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-950'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>

          {/* Active Instructions Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1426] via-[#090f1d] to-[#060a12] border border-blue-800/50 shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-blue-900/40">
              <div>
                <h3 className="text-xl font-black text-white font-display">
                  {current.title}
                </h3>
                <p className="text-xs text-blue-300 font-semibold mt-0.5">
                  Ideal para: {current.bestFor}
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950 border border-blue-800 text-xs font-mono font-bold text-amber-400">
                <Clock className="w-4 h-4" />
                <span>{current.time}</span>
              </div>
            </div>

            <div className="py-6 space-y-3">
              {current.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-blue-300">
                <Coffee className="w-4 h-4 text-amber-400" />
                <span>Combina perfeitamente com café espresso ou um copo de leite frio.</span>
              </div>
              <span className="flex items-center gap-1 text-slate-400">
                Feito para devorar <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
