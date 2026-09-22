import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, Heart, Sparkles, Trophy } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { settings, setIsAdminOpen, setIsStoryOpen } = useStore();

  return (
    <footer className="border-t border-blue-950 bg-[#060911] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <BrandLogo size="lg" showLocation={true} />
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Cookies artesanais produzidos com amor para custear o tratamento do atleta Pedro Affonso Druszcz contra o sarcoma de Ewing. Sabores: KitKat, Kinder, Nutella, Ninho, Limão e Black.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/5541996115284?text=${encodeURIComponent('Olá Pedro! Gostaria de encomendar cookies e apoiar seu tratamento!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 flex items-center gap-2 transition-colors font-bold text-xs"
                title="WhatsApp Oficial"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>(41) 99611-5284</span>
              </a>
              <button
                onClick={() => setIsStoryOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/60 flex items-center gap-1.5 transition-colors font-bold text-xs cursor-pointer"
              >
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                <span>História do Pedro</span>
              </button>
            </div>
          </div>

          {/* Horários e Local */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-white">
              Atendimento & Encomendas
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Encomendas diárias com antecedência</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings.storeAddress}</span>
              </div>
              <div className="pt-1 text-[11px] text-rose-300">
                Disponível no iFood: <strong>Druszczcookies</strong>
              </div>
            </div>
          </div>

          {/* Quick links & Admin Access */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-white">
              Administração & Causa
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setIsStoryOpen(true)}
                  className="flex items-center gap-1.5 text-rose-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>Ler relato completo do Pedro</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="flex items-center gap-1.5 text-blue-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Painel do Confeiteiro (Admin)</span>
                </button>
              </li>
              <li className="text-[11px] text-slate-500 pt-1">
                “Mesmo diante das maiores dores e dos maiores desafios, continue sempre espalhando seu melhor sorriso!”
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-950/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Druszcz Cookies • Apoio ao Atleta Pedro Affonso Druszcz.</p>
          <p className="flex items-center gap-1">
            Produzido com dedicação, afeto e superação <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
