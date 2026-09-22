import React from 'react';
import { Award, Sparkles, Scale, Flame, HeartHandshake, ShieldCheck, Heart } from 'lucide-react';

export const CraftPillars: React.FC = () => {
  const pillars = [
    {
      icon: Scale,
      title: 'Massa Artesanal de 130g a 140g',
      badge: 'Farto & Encorpado',
      description:
        'Cookies altos e encorpados com bordas crocantes e centro extremamente macio. Feitos individualmente à mão com manteiga de qualidade e ingredientes selecionados.',
      highlight: 'Muito mais recheio e sabor',
    },
    {
      icon: Award,
      title: 'Chocolates Nobres & Pura Nutella',
      badge: 'Ingredientes de Verdade',
      description:
        'Usamos Nutella legítima, chocolate Kinder original, KitKat crocante e chocolate nobre. Nada de essências artificiais ou economia no recheio.',
      highlight: 'Sabor autêntico e inesquecível',
    },
    {
      icon: Flame,
      title: 'Recheios Vulcânicos Fartos',
      badge: 'Cremoso por Dentro',
      description:
        'Cada cookie é recheado generosamente. Ao morder ou aquecer por alguns segundos, o recheio transborda com cremosidade irresistível.',
      highlight: 'Experiência única em cada mordida',
    },
    {
      icon: Heart,
      title: 'Causa Solidária de Superação',
      badge: 'Amor & Determinação',
      description:
        'Cada pedido custeia o tratamento contra o sarcoma de Ewing do atleta Pedro Affonso Druszcz. Você adquire um cookie maravilhoso e apoia uma luta de vida.',
      highlight: '100% feito com propósito',
    },
  ];

  return (
    <section id="diferenciais" className="py-20 bg-[#060a14] border-b border-blue-950/70 relative overflow-hidden scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-800/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-600/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-800/60 text-xs font-bold text-blue-300">
            <HeartHandshake className="w-3.5 h-3.5 text-blue-400" />
            <span>Benefícios & Diferenciais</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Por que os cookies do Pedro são <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-rose-200 to-white">
              diferentes e inesquecíveis?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Unimos receitas autorais, ingredientes de primeira linha e um propósito nobre de vitória em cada fornada.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="relative p-6 rounded-3xl bg-gradient-to-b from-[#0d152a] to-[#080e1c] border border-blue-900/50 hover:border-blue-500/70 shadow-xl hover:shadow-2xl hover:shadow-blue-950/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-950/90 text-blue-300 border border-blue-800/40">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-blue-200 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-blue-950/80 flex items-center gap-1.5 text-[11px] font-semibold text-blue-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
