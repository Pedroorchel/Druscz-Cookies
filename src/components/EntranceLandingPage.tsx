import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Trophy,
  Activity,
  Phone,
  ShoppingBag,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Flame,
  ShieldCheck,
  Star,
  Clock,
  ExternalLink,
  ChevronRight,
  Users
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/whatsapp';
import { DRUSZCZ_LOGO_URL } from '../constants/brand';
import { CauseCarousel } from './CauseCarousel';
import { BrandLogo } from './BrandLogo';

interface EntranceLandingPageProps {
  onEnterStore: () => void;
}

export const EntranceLandingPage: React.FC<EntranceLandingPageProps> = ({ onEnterStore }) => {
  const { cookies, settings } = useStore();
  const [copiedPix, setCopiedPix] = useState(false);

  const copyPix = () => {
    navigator.clipboard.writeText(settings.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const flavors = [
    { name: 'Nutella', price: 'R$ 15,00', desc: 'Pura Nutella cremosa transbordando', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80', badge: 'Mais Vendido' },
    { name: 'Kinder', price: 'R$ 15,00', desc: 'Pedaços generosos de chocolate Kinder', image: DRUSZCZ_LOGO_URL, badge: 'Sucesso' },
    { name: 'KitKat', price: 'R$ 14,00', desc: 'Casquinha crocante com pedaços de KitKat', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80', badge: 'Favorito' },
    { name: 'Ninho', price: 'R$ 14,00', desc: 'Recheio cremoso autoral de Leite Ninho', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80', badge: 'Novo' },
    { name: 'Limão', price: 'R$ 13,00', desc: 'Toque cítrico com chocolate nobre', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', badge: 'Refrescante' },
    { name: 'Black', price: 'R$ 14,00', desc: 'Massa intensa de cacau black e gotas', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80', badge: 'Intenso' },
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-rose-600 selection:text-white relative overflow-x-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[500px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none -z-0" />

      {/* Top Floating Navigation Bar with Centered Logo */}
      <header className="sticky top-0 z-40 w-full bg-[#070b16]/95 backdrop-blur-md border-b border-blue-950/80 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left helper info */}
          <div className="hidden sm:flex items-center gap-2 flex-1 justify-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800/60 text-xs font-bold text-rose-300">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>Causa & Superação</span>
            </span>
          </div>

          {/* Centered Brand & Logo */}
          <BrandLogo size="md" showLocation={true} onClick={onEnterStore} />

          {/* Right Actions */}
          <div className="flex items-center justify-end gap-3 flex-1">
            <a
              href="https://wa.me/5541996115284?text=Olá Pedro! Conheci a sua história e gostaria de encomendar os seus cookies para apoiar seu tratamento!"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-blue-900/60 hover:text-white hover:border-emerald-500 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono">(41) 99611-5284</span>
            </a>

            <button
              onClick={onEnterStore}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-blue-950 border border-blue-400/40 hover:scale-102 active:scale-98 transition-all cursor-pointer shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Entrar na Loja</span>
              <span className="xs:hidden">Loja</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Landing Page Hero */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 relative z-10">
        {/* Story Lead Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-700/60 text-xs sm:text-sm font-black text-rose-300 shadow-lg shadow-rose-950/40">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
              <span>História de Superação • Sarcoma de Ewing</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
              A história do jovem atleta{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-rose-300 to-white">
                Pedro Affonso Druszcz
              </span>
            </h1>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="text-base sm:text-lg text-slate-200 font-medium">
                O jovem <strong>Pedro Affonso Druszcz</strong>, atleta da equipe <strong>VKR Araucária Vôlei</strong>, enfrenta atualmente um tratamento contra o <strong>sarcoma de Ewing</strong>, um tipo raro de câncer que acomete ossos ou tecidos moles.
              </p>
              <p>
                Após concluir a primeira etapa da quimioterapia sem apresentar efeitos colaterais, ele se prepara para a segunda sessão, ciente de que terá um longo e desafiador processo de recuperação pela frente.
              </p>
              <p>
                Para ajudar sua família a arcar com as despesas médicas decorrentes do tratamento, <strong>Pedro decidiu empreender</strong>. Com dedicação e muito capricho, ele iniciou a produção artesanal de cookies, que já se tornaram um sucesso entre quem os experimenta!
              </p>
            </div>

            {/* Pedro Quote Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-[#0d1830] to-[#120f24] border border-blue-800/70 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <p className="text-sm sm:text-base text-white font-medium italic relative z-10">
                “Quem provou, aprovou e repetiu o pedido. Convido você a conhecer também os meus cookies.”
              </p>
              <span className="block text-xs font-bold text-blue-300 mt-2">
                — Pedro Affonso Druszcz (Atleta & Confeiteiro)
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onEnterStore}
                className="py-4 px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-2xl shadow-blue-900/80 border border-blue-400/40 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Entrar no Site e Fazer Pedido</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="https://wa.me/5541996115284?text=Olá Pedro! Li sua história no site e gostaria de encomendar os cookies para apoiar o seu tratamento!"
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/70 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                <span>Zap: (41) 99611-5284</span>
              </a>
            </div>

            {/* Contact & iFood tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-blue-950 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Encomendar com antecedência</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/50 border border-rose-900/60 text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Disponível no iFood: <strong>Druszczcookies</strong></span>
              </span>
            </div>
          </div>

          {/* Right Column: Key Cause Information & PIX */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-gradient-to-b from-[#0d162b] to-[#070c17] border border-blue-800/70 p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-950/80 border border-blue-600/50">
                <img
                  src="https://www.image2url.com/r2/default/images/1790042003239-7367c090-d418-45a9-8d52-3b5cb1e150b7.jpeg"
                  alt="Pedro Affonso Druszcz"
                  className="w-16 h-16 rounded-xl object-cover border border-blue-400/50 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-black text-white">Pedro Affonso Druszcz</h4>
                  <p className="text-xs text-blue-300 font-medium">Atleta VKR Araucária Vôlei</p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Em tratamento contra Sarcoma de Ewing</p>
                </div>
              </div>

              {/* Story bullets */}
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-950 flex items-center justify-between">
                  <span className="text-slate-400">Tratamento Realizado no</span>
                  <strong className="text-white">Hospital Angelina Caron</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-950 flex items-center justify-between">
                  <span className="text-slate-400">Valores dos Cookies</span>
                  <strong className="text-emerald-300 font-mono">R$ 13,00 a R$ 15,00</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-950 flex items-center justify-between">
                  <span className="text-slate-400">Sabores Autorais</span>
                  <strong className="text-blue-300">KitKat, Kinder, Nutella, Ninho, Limão, Black</strong>
                </div>
              </div>

              {/* Chave PIX de Apoio */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-blue-950/90 border border-emerald-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span>Apoie com Qualquer Valor (PIX)</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-200 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/50">
                    Chave Telefone
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-emerald-800/70 text-xs">
                  <span className="font-mono text-emerald-300 font-bold tracking-wider">
                    {settings.pixKey}
                  </span>
                  <button
                    onClick={copyPix}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPix ? 'Copiado!' : 'Copiar PIX'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Timeline & Discovery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4">
          {/* Box 1: Descoberta da doença */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#090f1e] border border-blue-900/60 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-blue-400" />
              <span>A Descoberta da Doença</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Das dores intensas ao diagnóstico definitivo
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                Pedro relata que descobriu a doença após sofrer uma lesão abaixo da escápula enquanto praticava vôlei. O diagnóstico inicial foi de osteomielite crônica, condição que resultava na perda de movimento do braço direito e em dores descritas por ele como insuportáveis.
              </p>
              <p>
                Após a recomendação de uma ressonância magnética, o laudo apontou a presença de nódulos na escápula, na coluna vertebral e na cabeça do úmero.
              </p>
              <p>
                A partir desse momento, sua rotina foi completamente alterada pelo agravamento das dores, levando o caso a ser classificado como emergencial e encaminhado ao <strong>Hospital Angelina Caron</strong>.
              </p>
              <div className="p-4 rounded-xl bg-blue-950/50 border-l-4 border-blue-500 text-slate-200 italic">
                “Durante quatro meses, enfrentei dores tão intensas que causavam desmaios e uso frequente de morfina. Foram mais de 50 exames e três biópsias inconclusivas até que, no quarto mês, uma biópsia por técnica robótica finalmente confirmou o sarcoma de Ewing.”
              </div>
            </div>
          </div>

          {/* Box 2: O Tratamento, Recuperação & Empreendimento */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#090f1e] border border-blue-900/60 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Recuperação e Propósito</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Espalhando o melhor sorriso e fazendo cookies
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                “Após a confirmação do diagnóstico, iniciei o primeiro ciclo de quimioterapia e já estou me preparando para a segunda sessão. Cada dia que passa eu sinto melhoras.”
              </p>
              <p>
                “Nos primeiros dias após a alta hospitalar, período em que permaneci acamado por um mês e perdi mais de 10kg de massa muscular, sentia-me muito debilitado, não conseguia andar sem o andador. Hoje eu já consigo correr distâncias curtas, praticar vôlei que tanto amo, fazer meus cookies para venda e ajudar em casa dentro das minhas possibilidades.”
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-blue-950 text-slate-200">
                <p className="italic text-xs sm:text-sm">
                  “Em certos momentos, cogitei desistir, mas ao lembrar do apoio e carinho das pessoas que me cercam e o esforço que dedicam em me ver bem, compreendi que desistir não era uma opção. Mesmo diante das maiores dores e dos maiores desafios, continue sempre espalhando seu melhor sorriso!”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GRAND PHOTO CAROUSEL BOX DIRECTLY BELOW THE TEXT */}
        <div className="pt-4">
          <div className="p-4 sm:p-6 rounded-3xl bg-[#09101f] border-2 border-blue-600/70 shadow-2xl space-y-4 text-center max-w-5xl mx-auto">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                Pedro e as Pessoas Mais Importantes da Sua Vida
              </h3>
            </div>

            <div className="w-full max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden border-2 border-blue-500/70">
              <CauseCarousel
                className="w-full"
                isSquare={false}
                aspectRatio="aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/9]"
              />
            </div>
          </div>
        </div>

        {/* Flavors Showcase Preview on Landing Page */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-blue-300">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Cardápio Oficial Druszcz</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display">
              Conheça os 6 Sabores Artesanais
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Feitos com ingredientes selecionados, recheios generosos e massa crocante por fora e macia por dentro.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {flavors.map((flavor) => (
              <div
                key={flavor.name}
                onClick={onEnterStore}
                className="group p-4 rounded-2xl bg-[#090f1d] border border-blue-950 hover:border-blue-700/80 transition-all duration-300 cursor-pointer flex gap-4 items-center hover:scale-[1.02] shadow-lg"
              >
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-black text-white">{flavor.name}</h4>
                    <span className="text-xs font-extrabold text-blue-300 font-mono">{flavor.price}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-snug line-clamp-2">
                    {flavor.desc}
                  </p>
                  <span className="inline-block text-[10px] font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/60">
                    {flavor.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Large CTA Banner to Enter Store */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950 via-[#0d1c3a] to-slate-950 border border-blue-700/70 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-3xl">
              🍪
            </div>
            <div className="max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                Pronto para experimentar e apoiar o Pedro?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Acesse o cardápio completo, monte seu carrinho, escolha as quantidades e envie seu pedido diretamente no WhatsApp ou pelo iFood.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onEnterStore}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-950 cursor-pointer hover:scale-105 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Entrar no Cardápio & Fazer Pedido</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="https://wa.me/5541996115284?text=Olá Pedro! Li sua história e quero encomendar cookies pelo WhatsApp!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-blue-800 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Chamar no WhatsApp (41) 99611-5284</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer on Landing Page */}
      <footer className="mt-16 border-t border-blue-950/80 bg-[#04060d] py-8 text-center text-xs text-slate-500 space-y-2">
        <p className="text-slate-400 font-medium">
          Druszcz Cookies • Pedro Affonso Druszcz • VKR Araucária Vôlei
        </p>
        <p>
          Telefone & Encomendas: (41) 99611-5284 | Loja no iFood: Druszczcookies
        </p>
        <p className="text-[11px] text-slate-600">
          “Mesmo diante das maiores dores e dos maiores desafios, continue sempre espalhando seu melhor sorriso!”
        </p>
      </footer>
    </div>
  );
};
