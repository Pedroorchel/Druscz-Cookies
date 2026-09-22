import React from 'react';
import { ShoppingBag, FileText, Send, CheckCircle2, ArrowRight, Truck, Store, Clock, PackageCheck, ShieldCheck } from 'lucide-react';

interface HowItWorksProps {
  onGoToOrder: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onGoToOrder }) => {
  const steps = [
    {
      step: '01',
      icon: ShoppingBag,
      title: 'Monte seu Pedido Online',
      description:
        'Escolha seus sabores favoritos entre nossas 8 opções artesanais (KitKat, Kinder, Nutella, Ninho, Limão, Black, Maracujá com Choc. Branco e Biscoff).',
    },
    {
      step: '02',
      icon: Truck,
      title: 'Informe Seu Endereço',
      description:
        'Entregamos via motoboy em Araucária-PR com entrega rápida e segura no seu endereço.',
    },
    {
      step: '03',
      icon: Send,
      title: 'Confirmação no WhatsApp',
      description:
        'Com 1 clique, sua encomenda vai formatada diretamente para o WhatsApp oficial do Pedro Affonso para separação imediata da fornada do dia.',
    },
  ];

  return (
    <section id="entrega-info" className="py-20 bg-[#070b16] border-b border-blue-950/70 relative scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-800/60 text-xs font-bold text-blue-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Informações de Entrega em Domicílio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Como Funciona Sua Encomenda
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Processo 100% transparente, rápido e confiável para você saborear cookies frescos e apoiar o Pedro.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-3xl bg-[#0c1428] border border-blue-900/50 hover:border-blue-500/70 shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-blue-500/30">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-800/80 flex items-center justify-center text-blue-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white mb-2 font-display">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-950/80 flex items-center text-xs font-bold text-blue-400">
                  <span>Passo {index + 1} de 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Specs Banner */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-3xl bg-[#091020] border border-blue-900/60 shadow-xl text-xs text-slate-300">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-blue-950">
            <Truck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">Área de Atendimento</strong>
              <p>Atendimento exclusivo em Araucária-PR (taxa de R$ 5,00 a R$ 15,00 conforme localização, ou Frete Grátis a partir de R$ 80,00).</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-blue-950">
            <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">Entrega Rápida</strong>
              <p>Receba em domicílio no período combinado (Manhã, Tarde ou Noite) com os cookies aquecidos ou prontos para saborear.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-blue-950">
            <PackageCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-0.5">Embalagem de Proteção</strong>
              <p>Cookies embalados individualmente com carinho para manter a casquinha crocante e o recheio macio.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onGoToOrder}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm sm:text-base shadow-xl shadow-blue-950 hover:shadow-blue-600/30 active:scale-95 transition-all cursor-pointer group"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            <span>FAZER MINHA ENCOMENDA AGORA</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
