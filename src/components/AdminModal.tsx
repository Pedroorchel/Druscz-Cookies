import React, { useState } from 'react';
import {
  X,
  Package,
  Layers,
  ShoppingBag,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Flame,
  Phone,
  RefreshCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CookieItem, StoreSettings, OrderRecord } from '../types';
import { formatCurrency, sanitizePhone } from '../utils/whatsapp';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    cookies,
    addCookie,
    updateCookie,
    deleteCookie,
    updateDailyStock,
    toggleCookieAvailability,
    settings,
    updateSettings,
    orders,
    updateOrderStatus,
    resetAllData,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'estoque' | 'sabores' | 'pedidos' | 'config'>('estoque');

  // Form states for creating / editing a flavor
  const [editingCookie, setEditingCookie] = useState<CookieItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form inputs
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState('18.00');
  const [formWeight, setFormWeight] = useState('125g');
  const [formCategory, setFormCategory] = useState<CookieItem['category']>('classicos');
  const [formImage, setFormImage] = useState('');
  const [formStock, setFormStock] = useState('15');
  const [formFilling, setFormFilling] = useState('');
  const [formIngredients, setFormIngredients] = useState('');
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);
  const [formIsNew, setFormIsNew] = useState(false);

  // Settings form states
  const [settingsWhatsapp, setSettingsWhatsapp] = useState(settings.whatsappNumber);
  const [settingsDeliveryFee, setSettingsDeliveryFee] = useState(settings.deliveryFee.toString());
  const [settingsFreeThreshold, setSettingsFreeThreshold] = useState(settings.freeDeliveryThreshold.toString());
  const [settingsIsOpen, setSettingsIsOpen] = useState(settings.isOpen);
  const [settingsHours, setSettingsHours] = useState(settings.openingHours);
  const [settingsPix, setSettingsPix] = useState(settings.pixKey);
  const [settingsAddress, setSettingsAddress] = useState(settings.storeAddress);
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false);

  if (!isAdminOpen) return null;

  const openAddModal = () => {
    setIsAddingNew(true);
    setEditingCookie(null);
    setFormName('');
    setFormTagline('');
    setFormDescription('');
    setFormPrice('17.50');
    setFormWeight('125g');
    setFormCategory('recheados');
    setFormImage('https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80');
    setFormStock('20');
    setFormFilling('');
    setFormIngredients('Farinha especial, Manteiga sem sal, Chocolate belga, Baunilha');
    setFormIsBestSeller(false);
    setFormIsNew(true);
  };

  const openEditModal = (cookie: CookieItem) => {
    setEditingCookie(cookie);
    setIsAddingNew(false);
    setFormName(cookie.name);
    setFormTagline(cookie.tagline || '');
    setFormDescription(cookie.description);
    setFormPrice(cookie.price.toString());
    setFormWeight(cookie.weight);
    setFormCategory(cookie.category);
    setFormImage(cookie.image);
    setFormStock(cookie.dailyStock.toString());
    setFormFilling(cookie.filling || '');
    setFormIngredients(cookie.ingredients ? cookie.ingredients.join(', ') : '');
    setFormIsBestSeller(!!cookie.isBestSeller);
    setFormIsNew(!!cookie.isNew);
  };

  const handleSaveCookie = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientsArray = formIngredients
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const priceNum = parseFloat(formPrice) || 15;
    const stockNum = parseInt(formStock, 10) || 10;

    if (editingCookie) {
      updateCookie({
        ...editingCookie,
        name: formName,
        tagline: formTagline,
        description: formDescription,
        price: priceNum,
        weight: formWeight,
        category: formCategory,
        image: formImage,
        dailyStock: stockNum,
        maxDailyStock: Math.max(stockNum, editingCookie.maxDailyStock),
        filling: formFilling || undefined,
        ingredients: ingredientsArray,
        isBestSeller: formIsBestSeller,
        isNew: formIsNew,
      });
      setEditingCookie(null);
    } else {
      addCookie({
        name: formName,
        tagline: formTagline,
        description: formDescription,
        price: priceNum,
        weight: formWeight,
        category: formCategory,
        image: formImage,
        dailyStock: stockNum,
        maxDailyStock: stockNum,
        isAvailable: true,
        filling: formFilling || undefined,
        ingredients: ingredientsArray,
        isBestSeller: formIsBestSeller,
        isNew: formIsNew,
      });
      setIsAddingNew(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      whatsappNumber: settingsWhatsapp.trim(),
      deliveryFee: parseFloat(settingsDeliveryFee) || 0,
      freeDeliveryThreshold: parseFloat(settingsFreeThreshold) || 75,
      isOpen: settingsIsOpen,
      openingHours: settingsHours.trim(),
      pixKey: settingsPix.trim(),
      storeAddress: settingsAddress.trim(),
    });
    setSettingsSavedAlert(true);
    setTimeout(() => setSettingsSavedAlert(false), 2000);
  };

  // Stock statistics
  const totalStock = cookies.reduce((acc, c) => acc + c.dailyStock, 0);
  const activeCount = cookies.filter((c) => c.isAvailable && c.dailyStock > 0).length;
  const soldOutCount = cookies.filter((c) => !c.isAvailable || c.dailyStock === 0).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[92vh] bg-[#090e1b] border border-blue-900/60 rounded-3xl shadow-2xl flex flex-col text-slate-100 overflow-hidden">
        {/* Admin Header */}
        <div className="px-6 py-4 border-b border-blue-950 bg-[#070b16] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white font-display">
                  Painel de Controle Druszcz
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gerencie o cardápio, estoque da fornada diária e pedidos recebidos
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-9 h-9 rounded-xl bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-[#080d19] border-b border-blue-950 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('estoque')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'estoque'
                ? 'border-blue-500 text-white bg-blue-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Estoque Diário ({totalStock} un.)</span>
          </button>

          <button
            onClick={() => setActiveTab('sabores')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'sabores'
                ? 'border-blue-500 text-white bg-blue-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Cardápio & Sabores ({cookies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'pedidos'
                ? 'border-blue-500 text-white bg-blue-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>Pedidos do Site ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'config'
                ? 'border-blue-500 text-white bg-blue-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Configurações da Loja</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#090e1b]">
          {/* TAB 1: ESTOQUE DIÁRIO */}
          {activeTab === 'estoque' && (
            <div className="space-y-6">
              {/* Daily bake summary stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-950 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Total na Fornada Hoje</span>
                    <h3 className="text-2xl font-black text-white font-mono mt-0.5">{totalStock} unid.</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center font-bold">
                    🍪
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-950 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Sabores Disponíveis</span>
                    <h3 className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{activeCount} ativos</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-950 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Esgotados / Pausados</span>
                    <h3 className="text-2xl font-black text-rose-400 font-mono mt-0.5">{soldOutCount} esgotados</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-bold">
                    ✕
                  </div>
                </div>
              </div>

              {/* Instructions banner */}
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/60 text-xs text-blue-200 flex items-center justify-between">
                <span>
                  💡 <strong>Controle Rápido:</strong> Ajuste a quantidade que saiu do forno hoje com 1 clique. O cliente não consegue adicionar ao carrinho mais do que o estoque disponível.
                </span>
              </div>

              {/* Table / Grid of Stock items */}
              <div className="space-y-3">
                {cookies.map((cookie) => {
                  const isSoldOut = !cookie.isAvailable || cookie.dailyStock <= 0;
                  return (
                    <div
                      key={cookie.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        isSoldOut
                          ? 'bg-slate-950/60 border-slate-800/80 opacity-70'
                          : 'bg-slate-900/80 border-blue-950'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={cookie.image}
                          alt={cookie.name}
                          className="w-12 h-12 rounded-xl object-cover border border-blue-950 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white truncate">{cookie.name}</h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                              {cookie.weight}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-blue-300 font-bold">{formatCurrency(cookie.price)}</span>
                            <span>•</span>
                            <span className={cookie.isAvailable ? 'text-emerald-400' : 'text-slate-500'}>
                              {cookie.isAvailable ? 'Visível na Loja' : 'Oculto'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stock adjustments buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Stepper display */}
                        <div className="flex items-center bg-slate-950 rounded-xl border border-blue-900/70 p-1">
                          <button
                            onClick={() => updateDailyStock(cookie.id, -5)}
                            className="px-2 py-1 text-xs text-slate-400 hover:text-white rounded hover:bg-slate-900"
                            title="Subtrair 5 unidades"
                          >
                            -5
                          </button>
                          <button
                            onClick={() => updateDailyStock(cookie.id, -1)}
                            className="px-2 py-1 text-xs text-slate-400 hover:text-white rounded hover:bg-slate-900"
                            title="Subtrair 1 unidade"
                          >
                            -1
                          </button>
                          <div className="w-14 text-center font-mono font-black text-sm text-white">
                            {cookie.dailyStock} un.
                          </div>
                          <button
                            onClick={() => updateDailyStock(cookie.id, 1)}
                            className="px-2 py-1 text-xs text-slate-400 hover:text-white rounded hover:bg-slate-900"
                            title="Adicionar 1 unidade"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => updateDailyStock(cookie.id, 5)}
                            className="px-2 py-1 text-xs text-slate-400 hover:text-white rounded hover:bg-slate-900"
                            title="Adicionar 5 unidades"
                          >
                            +5
                          </button>
                        </div>

                        {/* Quick Action Presets */}
                        <button
                          onClick={() => updateDailyStock(cookie.id, 12)}
                          className="px-2.5 py-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-blue-200 text-xs font-bold border border-blue-800/60"
                          title="Fornada de 12 cookies"
                        >
                          +12 Fornada
                        </button>

                        <button
                          onClick={() => updateDailyStock(cookie.id, 0, true)}
                          className="px-2.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-800"
                          title="Zerar estoque agora"
                        >
                          Esgotar (0)
                        </button>

                        {/* Visibility Toggle */}
                        <button
                          onClick={() => toggleCookieAvailability(cookie.id)}
                          className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                            cookie.isAvailable
                              ? 'bg-slate-950 text-slate-300 border-blue-950 hover:text-white'
                              : 'bg-amber-950/40 text-amber-300 border-amber-800'
                          }`}
                          title={cookie.isAvailable ? 'Ocultar da loja' : 'Mostrar na loja'}
                        >
                          {cookie.isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SABORES & CARDÁPIO */}
          {activeTab === 'sabores' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Catálogo de Sabores</h3>
                  <p className="text-xs text-slate-400">Crie novos cookies, edite receitas e gerencie preços</p>
                </div>

                <button
                  onClick={openAddModal}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-950"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Sabor de Cookie</span>
                </button>
              </div>

              {/* Add / Edit Form Modal inside tab */}
              {(isAddingNew || editingCookie) && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-blue-700/80 space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-950 pb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      {editingCookie ? `Editar: ${editingCookie.name}` : 'Cadastrar Novo Sabor'}
                    </h4>
                    <button
                      onClick={() => {
                        setIsAddingNew(false);
                        setEditingCookie(null);
                      }}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      Cancelar
                    </button>
                  </div>

                  <form onSubmit={handleSaveCookie} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Nome do Sabor *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Ex: Cookie Brigadeiro Belga"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Categoria *
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white"
                        >
                          <option value="classicos">Clássicos</option>
                          <option value="recheados">Recheados Vulcão</option>
                          <option value="especiais">Especiais</option>
                          <option value="combos">Caixas & Combos</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Preço de Venda (R$) *
                        </label>
                        <input
                          type="number"
                          step="0.10"
                          required
                          value={formPrice}
                          onChange={(e) => setFormPrice(e.target.value)}
                          placeholder="18.50"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Peso Aproximado *
                        </label>
                        <input
                          type="text"
                          required
                          value={formWeight}
                          onChange={(e) => setFormWeight(e.target.value)}
                          placeholder="Ex: 125g"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Estoque Inicial de Hoje *
                        </label>
                        <input
                          type="number"
                          required
                          value={formStock}
                          onChange={(e) => setFormStock(e.target.value)}
                          placeholder="15"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Frase de Destaque / Tagline *
                      </label>
                      <input
                        type="text"
                        required
                        value={formTagline}
                        onChange={(e) => setFormTagline(e.target.value)}
                        placeholder="Ex: Massa amanteigada de chocolate com recheio cremoso"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Descrição Completa *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Detalhes dos ingredientes nobres, textura e sabor..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Recheio (se houver)
                        </label>
                        <input
                          type="text"
                          value={formFilling}
                          onChange={(e) => setFormFilling(e.target.value)}
                          placeholder="Ex: Nutella Pura, Doce de Leite..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          URL da Foto
                        </label>
                        <input
                          type="url"
                          required
                          value={formImage}
                          onChange={(e) => setFormImage(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Ingredientes (separados por vírgula)
                      </label>
                      <input
                        type="text"
                        value={formIngredients}
                        onChange={(e) => setFormIngredients(e.target.value)}
                        placeholder="Manteiga, Cacau belga, Baunilha, Açúcar mascavo..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={formIsBestSeller}
                          onChange={(e) => setFormIsBestSeller(e.target.checked)}
                          className="rounded text-blue-600 bg-slate-900 border-blue-950"
                        />
                        <span>Destacar como "Mais Vendido"</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={formIsNew}
                          onChange={(e) => setFormIsNew(e.target.checked)}
                          className="rounded text-blue-600 bg-slate-900 border-blue-950"
                        />
                        <span>Selo de "Novidade"</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-blue-950">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingNew(false);
                          setEditingCookie(null);
                        }}
                        className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                      >
                        Salvar Sabor
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Flavor list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cookies.map((cookie) => (
                  <div
                    key={cookie.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-blue-950 flex items-start gap-3 justify-between"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <img
                        src={cookie.image}
                        alt={cookie.name}
                        className="w-14 h-14 rounded-xl object-cover border border-blue-950 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{cookie.name}</h4>
                        <div className="text-xs text-blue-300 font-mono font-bold mt-0.5">
                          {formatCurrency(cookie.price)}{' '}
                          <span className="text-slate-400 font-normal">({cookie.weight})</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                          {cookie.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openEditModal(cookie)}
                        className="p-2 rounded-xl bg-slate-950 hover:bg-blue-900/40 text-blue-300 border border-blue-950 transition-colors"
                        title="Editar sabor"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Tem certeza que deseja excluir o cookie "${cookie.name}"?`)) {
                            deleteCookie(cookie.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-slate-950 hover:bg-rose-950/60 text-rose-400 border border-blue-950 transition-colors"
                        title="Excluir sabor"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PEDIDOS RECEBIDOS */}
          {activeTab === 'pedidos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Pedidos Registrados</h3>
                  <p className="text-xs text-slate-400">
                    Histórico dos pedidos enviados pelos clientes para o WhatsApp
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <ShoppingBag className="w-12 h-12 mx-auto text-blue-950" />
                  <p className="text-sm">Nenhum pedido registrado ainda nesta sessão.</p>
                  <p className="text-xs text-slate-500">
                    Assim que um cliente fizer um pedido e enviar no WhatsApp, ele aparecerá aqui com status ao vivo.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => {
                    const statusColorMap = {
                      pendente: 'bg-amber-950 text-amber-300 border-amber-800',
                      em_preparo: 'bg-blue-950 text-blue-300 border-blue-800',
                      a_caminho: 'bg-purple-950 text-purple-300 border-purple-800',
                      pronto_retirada: 'bg-teal-950 text-teal-300 border-teal-800',
                      concluido: 'bg-emerald-950 text-emerald-300 border-emerald-800',
                      cancelado: 'bg-rose-950 text-rose-300 border-rose-800',
                    };

                    const statusLabelMap = {
                      pendente: 'Novo Pedido',
                      em_preparo: 'No Forno / Em Preparo',
                      a_caminho: 'Saiu com Motoboy',
                      pronto_retirada: 'Pronto p/ Retirada',
                      concluido: 'Entregue / Concluído',
                      cancelado: 'Cancelado',
                    };

                    const cleanCustomerPhone = sanitizePhone(ord.customer.phone);

                    return (
                      <div
                        key={ord.id}
                        className="p-4 rounded-2xl bg-slate-900/90 border border-blue-950 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-950/70 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white text-sm">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs font-semibold text-white">
                              {ord.customer.name}
                            </span>
                            <span className="text-xs text-slate-400">({ord.customer.phone})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Status dropdown */}
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                              className={`text-xs font-bold rounded-lg px-2.5 py-1 border ${statusColorMap[ord.status]}`}
                            >
                              <option value="pendente">Novo Pedido</option>
                              <option value="em_preparo">Em Preparo</option>
                              <option value="a_caminho">A Caminho (Entrega)</option>
                              <option value="pronto_retirada">Pronto para Retirada</option>
                              <option value="concluido">Entregue</option>
                              <option value="cancelado">Cancelado</option>
                            </select>

                            <a
                              href={`https://wa.me/${cleanCustomerPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 text-xs font-bold flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" /> Falar com Cliente
                            </a>
                          </div>
                        </div>

                        {/* Items ordered */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="space-y-1">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="text-slate-300 flex justify-between">
                                <span>
                                  <strong>{it.quantity}x</strong> {it.name}
                                </span>
                                <span className="font-mono text-slate-400">
                                  {formatCurrency(it.subtotal)}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-blue-950/60 text-[11px] text-slate-400">
                            <div>
                              <strong>Tipo:</strong>{' '}
                              {ord.customer.deliveryType === 'delivery'
                                ? `Entrega em ${ord.customer.street}, ${ord.customer.number} (${ord.customer.neighborhood})`
                                : 'Retirada no Balcão'}
                            </div>
                            <div>
                              <strong>Pagamento:</strong> {ord.customer.paymentMethod.toUpperCase()}
                            </div>
                            <div className="text-white font-bold font-mono text-xs pt-1 border-t border-blue-950 flex justify-between">
                              <span>Total:</span>
                              <span className="text-blue-300">{formatCurrency(ord.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONFIGURAÇÕES DA LOJA */}
          {activeTab === 'config' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Configurações Gerais</h3>
                <p className="text-xs text-slate-400">
                  Configure o WhatsApp onde você recebe os pedidos, taxas de entrega e endereço
                </p>
              </div>

              {settingsSavedAlert && (
                <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-800 text-xs text-emerald-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Configurações da loja salvas com sucesso!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Número do WhatsApp para Receber os Pedidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsWhatsapp}
                    onChange={(e) => setSettingsWhatsapp(e.target.value)}
                    placeholder="Ex: 5541998765432 (Com código do país e DDD)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white font-mono"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Insira com 55 + DDD + Número. Todos os pedidos gerados no site serão enviados para este Zap.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Taxa Padrão de Entrega (R$)
                    </label>
                    <input
                      type="number"
                      step="0.50"
                      value={settingsDeliveryFee}
                      onChange={(e) => setSettingsDeliveryFee(e.target.value)}
                      placeholder="7.00"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Valor para Frete Grátis (R$)
                    </label>
                    <input
                      type="number"
                      step="1.00"
                      value={settingsFreeThreshold}
                      onChange={(e) => setSettingsFreeThreshold(e.target.value)}
                      placeholder="75.00"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Chave PIX da Loja
                    </label>
                    <input
                      type="text"
                      value={settingsPix}
                      onChange={(e) => setSettingsPix(e.target.value)}
                      placeholder="contato@druszczcookies.com.br"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Horário de Funcionamento
                    </label>
                    <input
                      type="text"
                      value={settingsHours}
                      onChange={(e) => setSettingsHours(e.target.value)}
                      placeholder="Terça a Domingo das 13h às 21h"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Endereço da Loja Física (Para Retiradas)
                  </label>
                  <input
                    type="text"
                    value={settingsAddress}
                    onChange={(e) => setSettingsAddress(e.target.value)}
                    placeholder="Araucária - PR"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-blue-950 text-xs text-white"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-blue-950 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">Status da Fornada / Loja</h5>
                    <p className="text-[11px] text-slate-400">
                      {settingsIsOpen ? 'A loja está aberta e recebendo pedidos' : 'Loja fechada temporariamente'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettingsIsOpen(!settingsIsOpen)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      settingsIsOpen
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}
                  >
                    {settingsIsOpen ? 'Loja Aberta' : 'Loja Fechada'}
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Deseja restaurar o cardápio e configurações originais de fábrica?')) {
                        resetAllData();
                      }
                    }}
                    className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" /> Restaurar Cardápio Padrão
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-950"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
