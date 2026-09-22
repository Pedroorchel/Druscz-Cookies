import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/whatsapp';

export const FaqSection: React.FC = () => {
  const { settings, setIsStoryOpen } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Qual é o objetivo da venda dos cookies da Druszcz Cookies?',
      a: 'A produção artesanal dos cookies foi iniciada pelo jovem Pedro Affonso Druszcz, atleta da equipe VKR Araucária Vôlei, para ajudar sua família a arcar com os custos e despesas médicas de seu tratamento contra o sarcoma de Ewing (tipo raro de câncer ósseo e de tecidos moles), realizado com acompanhamento no Hospital Angelina Caron.',
    },
    {
      q: 'Quais são os sabores disponíveis e os valores?',
      a: 'O cardápio oficial conta com 6 sabores preparados com dedicação: KitKat (R$ 14,00), Kinder (R$ 15,00), Nutella (R$ 15,00), Ninho (R$ 14,00), Limão (R$ 13,00) e Black (R$ 14,00). Também oferecemos caixas especiais de 4 e 6 unidades para degustação ou presente.',
    },
    {
      q: 'Como posso fazer meu pedido ou encomendar com antecedência?',
      a: `As encomendas podem ser feitas diretamente pelo telefone/WhatsApp oficial (41) 99611-5284 ou pela loja "Druszczcookies" no iFood. Como os cookies são feitos artesanalmente, recomendamos encomendar com antecedência para garantir os sabores da sua preferência.`,
    },
    {
      q: 'Posso ajudar o Pedro diretamente com uma doação via PIX?',
      a: `Sim! Se você deseja apoiar o tratamento com qualquer contribuição solidária via PIX, a chave é o telefone do Pedro: ${settings.pixKey}. Toda ajuda é recebida com imensa gratidão por ele e por toda a sua família.`,
    },
    {
      q: 'Qual é a validade e como armazenar ou esquentar os cookies?',
      a: 'Nossos cookies duram até 7 dias bem fechados em temperatura ambiente ou até 60 dias congelados. Para consumir quentinho como recém-saído do forno com recheio derretido, aqueça no micro-ondas por 15 a 20 segundos ou no forno/Airfryer a 180°C por 3 a 4 minutos.',
    },
    {
      q: 'Vocês atendem encomendas para empresas, escolas ou eventos?',
      a: 'Sim! Aceitamos encomendas em grandes quantidades para empresas, confraternizações, casamentos e aniversários. Basta entrar em contato pelo WhatsApp (41) 99611-5284 para combinarmos prazos e personalizações.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#060a12] border-b border-blue-950/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-bold text-blue-300">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Tire Suas Dúvidas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            Perguntas Frequentes
          </h2>

          <p className="text-sm text-slate-400">
            Saiba tudo sobre o cardápio, encomendas pelo WhatsApp/iFood e apoio ao tratamento do Pedro.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#090f1e] border border-blue-950 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-300 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-900 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-blue-950/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-rose-950/40 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
              <span>Quer falar diretamente com o Pedro?</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Tire dúvidas sobre os cookies, entregas ou faça sua encomenda para apoiar seu tratamento.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsStoryOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-700/60 text-xs font-bold transition-colors cursor-pointer"
            >
              Ler História
            </button>

            <a
              href="https://wa.me/5541996115284?text=Olá Pedro! Gostaria de tirar uma dúvida e encomendar cookies!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-bold flex items-center gap-2 shrink-0 transition-colors shadow-lg shadow-emerald-950"
            >
              <Phone className="w-4 h-4" />
              <span>(41) 99611-5284</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
