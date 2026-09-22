import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Camila Rossi',
      neighborhood: 'Araucária - PR',
      rating: 5,
      date: 'Há 2 dias',
      cookieFavorite: 'Nutella',
      text: 'O melhor cookie que já comi na vida! A casquinha é crocante e o centro vem abarrotado de Nutella quentinha e cremosa. Além disso, fico muito feliz em saber que cada pedido apoia o tratamento do Pedro!',
    },
    {
      name: 'Rodrigo Medeiros',
      neighborhood: 'Batel, Curitiba',
      rating: 5,
      date: 'Há 3 dias',
      cookieFavorite: 'Kinder',
      text: 'O de Kinder com chocolate nobre é simplesmente sensacional. Dá para sentir o capricho artesanal e o peso generoso do cookie. Pedi para a família e viramos fãs!',
    },
    {
      name: 'Juliana Fagundes',
      neighborhood: 'Portão, Curitiba',
      rating: 5,
      date: 'Ontem',
      cookieFavorite: 'KitKat & Ninho',
      text: 'Pedi a caixa completa com todos os sabores para comemorar um aniversário. O de Ninho e o de KitKat foram os mais disputados! Chegou super rápido e quentinho.',
    },
    {
      name: 'Marcelo Silveira',
      neighborhood: 'Araucária - PR',
      rating: 5,
      date: 'Há 1 semana',
      cookieFavorite: 'Black & Limão',
      text: 'O contraste do cookie Black com o toque do Limão é perfeito. O Pedro é um guerreiro e o atendimento é impecável. Já fiz 3 pedidos seguidos!',
    },
  ];

  return (
    <section id="avaliacoes" className="py-20 bg-[#080d19] border-b border-blue-950/70 relative overflow-hidden scroll-mt-20">
      {/* Glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-800/60 text-xs font-bold text-blue-300">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Avaliações de Clientes Satisfeitos</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Quem provou, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-rose-200 to-white">
                aprovou e repetiu o pedido
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300">
              Veja a opinião de quem já se apaixonou pelos cookies artesanais do Pedro Affonso.
            </p>
          </div>

          {/* Social Proof Metric Box */}
          <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#0b1428] border border-blue-900/60 self-start md:self-auto shadow-xl">
            <div className="text-center pr-4 border-r border-blue-900/80">
              <div className="text-3xl font-black text-white font-mono">5.0</div>
              <div className="flex text-amber-400 justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div className="font-extrabold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>100% de Aprovação</span>
              </div>
              <p className="text-slate-400 text-[11px]">Clientes reais em Araucária e Curitiba</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0b1326] border border-blue-900/50 hover:border-blue-500/70 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-blue-950 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-white">{rev.name}</h4>
                  <span className="text-[10px] text-blue-300 font-bold px-2 py-0.5 rounded-full bg-blue-950 border border-blue-800">
                    {rev.cookieFavorite}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{rev.neighborhood}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
