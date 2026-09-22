import React, { useState } from 'react';
import { X, Heart, Trophy, Activity, Phone, ShoppingBag, Copy, Check, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CauseCarousel } from './CauseCarousel';

interface PedroStoryModalProps {
  onGoToOrder?: () => void;
}

export const PedroStoryModal: React.FC<PedroStoryModalProps> = ({ onGoToOrder }) => {
  const { isStoryOpen, setIsStoryOpen, settings } = useStore();
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isStoryOpen) return null;

  const copyPix = () => {
    navigator.clipboard.writeText(settings.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleGoToOrder = () => {
    setIsStoryOpen(false);
    if (onGoToOrder) {
      onGoToOrder();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsStoryOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#090e1b] border border-blue-800/80 shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Close Button */}
        <button
          onClick={() => setIsStoryOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-blue-300">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>A História Real da Druszcz Cookies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Pedro Affonso Druszcz
          </h2>
          <p className="text-xs sm:text-sm text-blue-300 font-semibold">
            Atleta da equipe VKR Araucária Vôlei & Empreendedor
          </p>
        </div>

        {/* Banner Carousel with auto-changing photos */}
        <CauseCarousel aspectRatio="aspect-16/10 sm:aspect-16/9" />

        {/* Story details */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            O jovem <strong>Pedro Affonso Druszcz</strong>, atleta da equipe <strong>VKR Araucária Vôlei</strong>, enfrenta atualmente um tratamento contra o <strong>sarcoma de Ewing</strong>, um tipo raro de câncer que acomete ossos ou tecidos moles. Após concluir a primeira etapa da quimioterapia sem apresentar efeitos colaterais, ele se prepara para a segunda sessão, ciente de que terá um longo e desafiador processo de recuperação pela frente.
          </p>

          <p>
            Para ajudar sua família a arcar com as despesas médicas decorrentes do tratamento, Pedro decidiu empreender. Com dedicação e muito capricho, ele iniciou a produção artesanal de cookies, que já se tornaram um sucesso entre quem os experimenta. O cardápio conta com os sabores <strong>KitKat, Kinder, Nutella, Ninho, Limão e Black</strong>, com valores entre R$ 13,00 e R$ 15,00.
          </p>

          <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-800 text-blue-100">
            <h4 className="font-bold text-xs uppercase tracking-wider text-blue-300 mb-1 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-400" />
              <span>A Descoberta & O Diagnóstico</span>
            </h4>
            <p className="text-xs leading-relaxed text-slate-300">
              Pedro descobriu a doença após sofrer uma lesão abaixo da escápula jogando vôlei. Inicialmente tratado como suspeita de osteomielite crônica com dores intensas, a ressonância apontou nódulos na escápula, coluna e úmero. Classificado como emergencial no <strong>Hospital Angelina Caron</strong>, após 4 meses, mais de 50 exames e 3 biópsias, a biópsia por robótica confirmou o sarcoma de Ewing.
            </p>
          </div>

          <p className="italic text-slate-400 border-l-2 border-blue-500 pl-3">
            “Nos primeiros dias após a alta, fiquei debilitado e perdi 10kg. Hoje já consigo correr distâncias curtas, praticar o vôlei que tanto amo, fazer meus cookies para venda e ajudar em casa. Quem provou, aprovou e repetiu o pedido. Convido você a conhecer também os meus cookies!” — relata Pedro.
          </p>
        </div>

        {/* Support Pix Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>Chave PIX de Apoio ao Tratamento:</span>
            </span>
            <span className="font-mono text-xs font-bold text-white">{settings.pixKey}</span>
          </div>

          <button
            onClick={copyPix}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPix ? 'Copiado!' : 'Copiar Chave PIX'}</span>
          </button>
        </div>

        {/* Modal CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleGoToOrder}
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Fazer Pedido no Cardápio</span>
          </button>

          <a
            href={`https://wa.me/5541996115284?text=${encodeURIComponent('Olá Pedro! Li sua história e quero fazer uma encomenda de cookies para apoiar o seu tratamento!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp (41) 99611-5284</span>
          </a>
        </div>
      </div>
    </div>
  );
};
