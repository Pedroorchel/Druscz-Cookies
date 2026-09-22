import React from 'react';
import { Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { CookieItem } from '../types';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onlyInStock: boolean;
  onToggleOnlyInStock: () => void;
  totalFilteredCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  onlyInStock,
  onToggleOnlyInStock,
  totalFilteredCount,
}) => {
  const categories = [
    { id: 'todos', label: 'Todos os Sabores', emoji: '🍪' },
    { id: 'classicos', label: 'Clássicos', emoji: '✨' },
    { id: 'recheados', label: 'Recheados Vulcão', emoji: '🍫' },
    { id: 'especiais', label: 'Especiais Druszcz', emoji: '⭐' },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Search and Quick Filters bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por sabor, chocolate, recheio ou ingrediente..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-blue-950 focus:border-blue-500 focus:outline-hidden text-sm text-white placeholder-slate-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Limpar
            </button>
          )}
        </div>

        {/* In-stock toggle */}
        <button
          onClick={onToggleOnlyInStock}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all shrink-0 select-none ${
            onlyInStock
              ? 'bg-blue-950 text-blue-200 border-blue-600 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 border-blue-950 hover:text-slate-200 hover:border-slate-800'
          }`}
        >
          <div
            className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
              onlyInStock ? 'bg-blue-600 border-blue-400 text-white' : 'border-slate-600'
            }`}
          >
            {onlyInStock && <CheckCircle2 className="w-3 h-3" />}
          </div>
          <span>Apenas com estoque hoje</span>
        </button>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg shadow-blue-950/80 border border-blue-400/40'
                  : 'bg-slate-900/70 text-slate-300 border border-blue-950/70 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}

        <div className="ml-auto text-xs text-slate-400 pl-3 shrink-0">
          <span className="font-mono font-bold text-white">{totalFilteredCount}</span> {totalFilteredCount === 1 ? 'opção' : 'opções'}
        </div>
      </div>
    </div>
  );
};
