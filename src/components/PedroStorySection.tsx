import React, { useState } from 'react';
import {
  Heart,
  Activity,
  Phone,
  ShoppingBag,
  Copy,
  Check,
  Sparkles,
  Users,
  Trophy,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CauseCarousel } from './CauseCarousel';

interface PedroStorySectionProps {
  onGoToOrder?: () => void;
}

export const PedroStorySection: React.FC<PedroStorySectionProps> = ({ onGoToOrder }) => {
  const { settings } = useStore();
  const [copiedPix, setCopiedPix] = useState(false);

  const copyPix = () => {
    navigator.clipboard.writeText(settings.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleOrderClick = () => {
    if (onGoToOrder) {
      onGoToOrder();
    } else {
      const el = document.getElementById('cardapio') || document.getElementById('produtos-destaque');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="apresentacao-marca" className="py-20 bg-gradient-to-b from-[#080d1a] via-[#0b1428] to-[#060a12] border-b border-blue-900/60 relative overflow-hidden scroll-mt-16">
      {/* Ambient background glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Header Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/90 border border-blue-700/60 text-xs sm:text-sm font-bold text-blue-300 shadow-lg shadow-blue-950/50">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span>Conheça a História por Trás de Cada Cookie</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            A Trajetória do Pedro Affonso: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">
              Superação, Vôlei e Cookies com Amor
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Atleta da equipe <strong>VKR Araucária Vôlei</strong> que transformou a luta contra o sarcoma de Ewing em um projeto de afeto, determinação e sabor para custear seu tratamento.
          </p>
        </div>

        {/* GRAND PHOTO CAROUSEL BOX DIRECTLY BELOW THE TITLE & SUBTITLE */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="p-4 sm:p-6 rounded-3xl bg-[#09101f] border-2 border-blue-600/70 shadow-2xl relative overflow-hidden space-y-4 text-center">
            {/* Header Title for the Photo Gallery */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                Pedro e as Pessoas Mais Importantes da Sua Vida
              </h3>
            </div>

            {/* Grand Wide Photo Carousel Frame */}
            <div className="w-full max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden border-2 border-blue-500/70">
              <CauseCarousel
                className="w-full"
                isSquare={false}
                aspectRatio="aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/9]"
              />
            </div>
          </div>
        </div>

        {/* Quick Info & PIX Summary Banner */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0a1122] border-2 border-blue-800/70 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-900/60">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-300">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Resumo do Tratamento & Contato Directo</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Atleta VKR Araucária Vôlei
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-blue-950 flex flex-col justify-center space-y-1">
                <span className="text-slate-400 font-medium">Hospital & Local</span>
                <strong className="text-white text-xs sm:text-sm">Hospital Angelina Caron</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-blue-950 flex flex-col justify-center space-y-1">
                <span className="text-slate-400 font-medium">Condição Médica</span>
                <strong className="text-amber-300 text-xs sm:text-sm">Sarcoma de Ewing</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-blue-950 flex flex-col justify-center space-y-1">
                <span className="text-slate-400 font-medium">WhatsApp / Encomendas</span>
                <strong className="text-emerald-400 text-xs sm:text-sm font-mono">(41) 99611-5284</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-blue-950 flex flex-col justify-center space-y-1">
                <span className="text-slate-400 font-medium">Disponível no iFood</span>
                <strong className="text-rose-400 text-xs sm:text-sm">"Druszczcookies"</strong>
              </div>
            </div>

            {/* Solidarity PIX Card Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-blue-950/90 to-slate-950/90 border border-emerald-700/70 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-emerald-300">
                    Apoio Direto via PIX ao Tratamento do Pedro
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Sua contribuição ajuda nas despesas médicas e medicamentos
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end p-2 rounded-xl bg-black/60 border border-emerald-800/80 text-xs shrink-0">
                <span className="font-mono text-emerald-300 font-bold tracking-wider px-2">
                  {settings.pixKey}
                </span>
                <button
                  onClick={copyPix}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors cursor-pointer shadow-lg"
                >
                  {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPix ? 'Copiado!' : 'Copiar PIX'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Section in Perfectly Balanced 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Card 1: A Descoberta da Doença & O Diagnóstico */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0a101f] border-2 border-blue-900/60 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>A Descoberta da Doença & O Diagnóstico</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-display leading-tight">
                Das quadras de vôlei para o maior desafio de sua vida
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  O jovem <strong>Pedro Affonso Druszcz</strong>, atleta da equipe <strong>VKR Araucária Vôlei</strong>, enfrenta atualmente um tratamento contra o <strong>sarcoma de Ewing</strong>, um tipo raro de câncer que acomete ossos e tecidos moles.
                </p>

                <p>
                  Pedro relata que descobriu a doença após sofrer uma lesão abaixo da escápula enquanto praticava vôlei. O diagnóstico inicial foi de osteomielite crônica, condição que resultava na perda de movimento do braço direito e em dores insuportáveis.
                </p>

                <p>
                  Após ressonância magnética, o laudo apontou a presença de <strong>nódulos na escápula, na coluna vertebral e na cabeça do úmero</strong>. O caso foi classificado como emergencial e encaminhado ao <strong>Hospital Angelina Caron</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/60 border-l-4 border-blue-500 text-slate-200 text-xs sm:text-sm italic shadow-inner">
              "Durante quatro meses, enfrentei dores tão intensas que causavam desmaios. Foram realizados mais de 50 exames e três biópsias. Somente no quarto mês, após biópsia por técnica robótica, o diagnóstico foi confirmado."
            </div>
          </div>

          {/* Card 2: Empreendedorismo & Os Cookies Druszcz */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0a101f] border-2 border-blue-900/60 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Empreendedorismo com Propósito</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-display leading-tight">
                O renascimento na cozinha para custear o tratamento
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  Após concluir a primeira etapa da quimioterapia sem efeitos colaterais graves, Pedro se prepara para a segunda sessão. Para ajudar sua família a arcar com as despesas médicas, <strong>Pedro decidiu empreender e criou a Druszcz Cookies</strong>.
                </p>

                <p>
                  Com receitas autorais e capricho, produz artesanalmente cookies nos sabores <strong>KitKat, Kinder, Nutella, Ninho, Limão e Black</strong> (entre R$ 13,00 e R$ 15,00 cada).
                </p>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-[#0d1a33] to-slate-950 border border-blue-700/60 space-y-1">
                  <p className="text-xs sm:text-sm text-white font-medium italic">
                    “Quem provou, aprovou e repetiu o pedido. Convido você a conhecer também os meus cookies!”
                  </p>
                  <span className="block text-[11px] font-bold text-blue-300">
                    — Pedro Affonso Druszcz
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-blue-950">
                  <p className="text-xs text-slate-300 italic">
                    “Mesmo diante das maiores dores e dos maiores desafios, continue sempre espalhando seu melhor sorriso!”
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleOrderClick}
                className="px-5 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-950 transition-all cursor-pointer hover:scale-102 active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Fazer Encomenda</span>
              </button>

              <a
                href={`https://wa.me/5541996115284?text=${encodeURIComponent('Olá Pedro! Conheci a sua história no site e gostaria de encomendar os seus cookies para apoiar o seu tratamento!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Zap: (41) 99611-5284</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
