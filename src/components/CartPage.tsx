import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Truck,
  Store,
  CreditCard,
  QrCode,
  Banknote,
  Send,
  AlertCircle,
  CheckCircle2,
  Heart,
  Sparkles,
  ShieldCheck,
  Calendar,
  Clock,
  Gift,
  Copy,
  Check,
  Package,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderCustomerInfo, OrderRecord } from '../types';
import {
  formatCurrency,
  formatPhoneDisplay,
  generateWhatsAppOrderMessage,
  getWhatsAppUrl,
  sanitizePhone,
} from '../utils/whatsapp';
import { DRUSZCZ_LOGO_URL } from '../constants/brand';

interface CartPageProps {
  onBackToMenu: () => void;
  onBackToLanding: () => void;
  onOrderCompleted: (order: OrderRecord, whatsappUrl: string, messageText: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onBackToMenu,
  onBackToLanding,
  onOrderCompleted,
}) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotalCount,
    cartSubtotal,
    settings,
    registerOrder,
    orders,
  } = useStore();

  // Delivery & Customer Form State
  const deliveryType = 'delivery' as const;
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [city, setCity] = useState<string>(settings.city || 'Araucária');
  const [complement, setComplement] = useState<string>('');
  const [reference, setReference] = useState<string>('');

  // Scheduling & Gifting
  const [desiredDateOption, setDesiredDateOption] = useState<'hoje' | 'amanha' | 'outro'>('hoje');
  const [customDate, setCustomDate] = useState<string>('');
  const [desiredPeriod, setDesiredPeriod] = useState<string>('Tarde (14h às 18h)');
  const [isGift, setIsGift] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao_entrega' | 'dinheiro'>('pix');
  const [changeFor, setChangeFor] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedPix, setCopiedPix] = useState<boolean>(false);

  // Financial calculations
  const isFreeDelivery = cartSubtotal >= settings.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : settings.deliveryFee;
  const grandTotal = cartSubtotal + deliveryFee;
  const progressToFreeDelivery = Math.min(100, (cartSubtotal / settings.freeDeliveryThreshold) * 100);
  const neededForFree = Math.max(0, settings.freeDeliveryThreshold - cartSubtotal);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneDisplay(e.target.value);
    setPhone(formatted);
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(settings.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleFinalizeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Seu carrinho está vazio! Adicione ao menos um cookie.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    const cleanPhone = sanitizePhone(phone);
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Por favor, informe seu número de WhatsApp com DDD.');
      return;
    }

    if (!street.trim()) {
      setErrorMessage('Por favor, informe o nome da Rua/Avenida para entrega.');
      return;
    }
    if (!number.trim()) {
      setErrorMessage('Por favor, informe o número da residência.');
      return;
    }
    if (!neighborhood.trim()) {
      setErrorMessage('Por favor, informe o Bairro.');
      return;
    }

    if (cartSubtotal < settings.minOrderValue) {
      setErrorMessage(`O pedido mínimo para entrega é de ${formatCurrency(settings.minOrderValue)}.`);
      return;
    }

    let finalDesiredDate = 'Hoje';
    if (desiredDateOption === 'amanha') {
      finalDesiredDate = 'Amanhã';
    } else if (desiredDateOption === 'outro' && customDate) {
      finalDesiredDate = customDate;
    }

    const customerInfo: OrderCustomerInfo = {
      name: customerName.trim(),
      phone: cleanPhone,
      deliveryType,
      street: deliveryType === 'delivery' ? street.trim() : undefined,
      number: deliveryType === 'delivery' ? number.trim() : undefined,
      neighborhood: deliveryType === 'delivery' ? neighborhood.trim() : undefined,
      city: deliveryType === 'delivery' ? (city.trim() || settings.city) : undefined,
      complement: deliveryType === 'delivery' && complement.trim() ? complement.trim() : undefined,
      reference: deliveryType === 'delivery' && reference.trim() ? reference.trim() : undefined,
      desiredDate: finalDesiredDate,
      desiredPeriod,
      paymentMethod,
      changeFor: paymentMethod === 'dinheiro' && changeFor.trim() ? changeFor.trim() : undefined,
      observations: observations.trim() || undefined,
      isGift,
      giftMessage: isGift && giftMessage.trim() ? giftMessage.trim() : undefined,
    };

    const nextOrderNumber = orders.length + 101;
    const newOrder: OrderRecord = {
      id: `ord_${Date.now()}`,
      orderNumber: nextOrderNumber,
      createdAt: new Date().toISOString(),
      customer: customerInfo,
      items: cart.map((item) => ({
        id: item.cookie.id,
        name: item.cookie.name,
        quantity: item.quantity,
        unitPrice: item.cookie.price,
        subtotal: item.cookie.price * item.quantity,
        notes: item.notes,
        giftBox: item.giftBox,
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      total: grandTotal,
      status: 'pendente',
    };

    registerOrder(newOrder);

    const message = generateWhatsAppOrderMessage(
      cart,
      customerInfo,
      settings,
      nextOrderNumber,
      cartSubtotal,
      deliveryFee,
      grandTotal
    );
    const zapUrl = getWhatsAppUrl(settings.whatsappNumber, message);

    // Redireciona o usuário imediatamente para o WhatsApp
    try {
      window.open(zapUrl, '_blank');
    } catch (err) {
      console.error("Popup blocked: falling back to modal manual trigger", err);
    }

    clearCart();
    onOrderCompleted(newOrder, zapUrl, message);
  };

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-100 flex flex-col relative overflow-hidden pb-16">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 w-full flex-1">
        {/* If cart is empty */}
        {cart.length === 0 ? (
          <div className="max-w-2xl mx-auto py-16 px-6 text-center rounded-3xl bg-[#080e1d] border border-blue-900/40 shadow-2xl space-y-6 my-8">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-950/70 border border-blue-800/60 flex items-center justify-center text-blue-400 shadow-xl">
              <ShoppingBag className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white font-display">Seu Carrinho está Vazio</h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Você ainda não adicionou nenhum cookie à sua sacola. Visite nosso cardápio para escolher seus sabores artesanais favoritos!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-900/40 text-left space-y-2.5 max-w-md mx-auto text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cookies artesanais frescos assados no dia</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Frete grátis para Araucária em pedidos a partir de R$ 80</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
                <span>100% da renda apoia o tratamento do atleta Pedro Affonso</span>
              </div>
            </div>

            <button
              onClick={onBackToMenu}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-blue-950/80 hover:shadow-blue-600/30 transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Explorar Cardápio de Cookies</span>
            </button>
          </div>
        ) : (
          /* When cart has items: 2-Column Checkout Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items & Free Shipping Tracker (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Header Box */}
              <div className="p-5 rounded-3xl bg-[#080e1d] border border-blue-900/60 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-white font-display">Itens da Sacola</h2>
                      <p className="text-xs text-blue-300">
                        {cartTotalCount} {cartTotalCount === 1 ? 'cookie selecionado' : 'cookies selecionados'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={clearCart}
                    className="text-[11px] font-bold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Limpar todos os itens"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Esvaziar</span>
                  </button>
                </div>

                {/* Free Shipping Tracker */}
                <div className="p-3.5 rounded-2xl bg-blue-950/50 border border-blue-800/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-blue-400" />
                      Frete Grátis acima de {formatCurrency(settings.freeDeliveryThreshold)}:
                    </span>
                    <span className="font-bold text-white">
                      {isFreeDelivery ? (
                        <span className="text-emerald-400 font-black">🎉 FRETE GRÁTIS!</span>
                      ) : (
                        <span className="text-amber-400 font-mono font-bold">Faltam {formatCurrency(neededForFree)}</span>
                      )}
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isFreeDelivery
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      }`}
                      style={{ width: `${progressToFreeDelivery}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 divide-y divide-blue-950/60">
                  {cart.map((item) => (
                    <div
                      key={item.cookie.id}
                      className="pt-3 first:pt-0 flex items-start gap-3 group"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-blue-900/60 shrink-0 relative">
                        <img
                          src={item.cookie.image}
                          alt={item.cookie.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white truncate font-display">
                            {item.cookie.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-blue-300 shrink-0">
                            {formatCurrency(item.cookie.price * item.quantity)}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 font-mono">
                          {formatCurrency(item.cookie.price)} un. • {item.cookie.weight}
                        </p>

                        {item.notes && (
                          <p className="text-[10px] text-amber-300/90 italic truncate mt-0.5">
                            Obs: {item.notes}
                          </p>
                        )}

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-slate-950 rounded-lg border border-blue-900/80 p-0.5">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.cookie.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white rounded hover:bg-blue-900/40 cursor-pointer"
                              title="Diminuir"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-mono font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.cookie.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white rounded hover:bg-blue-900/40 cursor-pointer"
                              title="Aumentar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cookie.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                            title="Remover este item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between">
                  <button
                    onClick={onBackToMenu}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 text-blue-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Mais Sabores ao Pedido</span>
                  </button>
                </div>
              </div>

              {/* Trust Badge & Solidary Cause */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 via-[#0a1224] to-blue-950/40 border border-rose-900/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                  <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                  <span>Pedido com Propósito Real</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ao confirmar esta encomenda, você ajuda diretamente no custeio das terapias do atleta mirim Pedro Affonso Druszcz e recebe fornadas frescas feitas com dedicação e afeto.
                </p>
              </div>
            </div>

            {/* Right Column: Checkout Form & Detailed Order Summary (7 cols) */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleFinalizeOrder}
                className="p-6 sm:p-7 rounded-3xl bg-[#080e1d] border border-blue-900/60 shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-blue-950/80 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-white font-display">Resumo & Finalização</h2>
                    <p className="text-xs text-blue-300">
                      Preencha os dados abaixo para gerar sua mensagem de confirmação
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-900/60 text-blue-300 border border-blue-700/60">
                    Etapa Final
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-200 text-xs flex items-center gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 1. Modalidade de Envio */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Modalidade de Envio
                  </label>
                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/70 text-left flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-white">Entrega em Domicílio (Motoboy)</strong>
                        {isFreeDelivery && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                            Frete Grátis
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Entregamos exclusivamente em <strong>Araucária-PR</strong>.
                      </p>
                      <p className="text-[11px] text-amber-300 font-semibold">
                        {isFreeDelivery
                          ? `🎉 Seu pedido atingiu ${formatCurrency(settings.freeDeliveryThreshold)} e ganhou Frete Grátis!`
                          : '🛵 A taxa de entrega varia de R$ 5,00 a R$ 15,00 (calculada no WhatsApp conforme seu endereço).'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Dados do Cliente */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Seus Dados para Contato
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ex: Ana Clara Silva"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-blue-950 focus:border-blue-500 focus:outline-hidden text-sm text-white placeholder-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                        WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="(41) 99999-8888"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-blue-950 focus:border-blue-500 focus:outline-hidden text-sm text-white placeholder-slate-600 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Endereço de Entrega */}
                <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-blue-950">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Endereço de Entrega</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Rua / Avenida *</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Ex: Rua das Flores"
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#060c18] border border-blue-950 focus:border-blue-500 focus:outline-hidden text-sm text-white placeholder-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Número *</label>
                      <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Ex: 120"
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#060c18] border border-blue-950 focus:border-blue-500 focus:outline-hidden text-sm text-white placeholder-slate-600 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Bairro *</label>
                      <input
                        type="text"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="Ex: Centro, Fazenda Velha..."
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#060c18] border border-blue-950 focus:border-blue-500 focus:outline-hidden text-sm text-white placeholder-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Cidade</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ex: Araucária"
                        className="w-full px-3 py-2 rounded-xl bg-[#060c18] border border-blue-950 focus:border-blue-500 focus:outline-hidden text-sm text-white placeholder-slate-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Complemento / Apto</label>
                      <input
                        type="text"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        placeholder="Ex: Apto 302 Bloco B"
                        className="w-full px-3 py-2 rounded-xl bg-[#060c18] border border-blue-950 focus:border-blue-500 focus:outline-hidden text-sm text-white placeholder-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Ponto de Referência</label>
                      <input
                        type="text"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="Ex: Próximo à praça central"
                        className="w-full px-3 py-2 rounded-xl bg-[#060c18] border border-blue-950 focus:border-blue-500 focus:outline-hidden text-sm text-white placeholder-slate-600"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Agendamento & Opção de Presente */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-300 font-semibold mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      Quando deseja receber?
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDesiredDateOption('hoje')}
                        className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          desiredDateOption === 'hoje'
                            ? 'bg-blue-600 text-white border-blue-400'
                            : 'bg-slate-950 border-blue-950 text-slate-400'
                        }`}
                      >
                        Hoje
                      </button>
                      <button
                        type="button"
                        onClick={() => setDesiredDateOption('amanha')}
                        className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          desiredDateOption === 'amanha'
                            ? 'bg-blue-600 text-white border-blue-400'
                            : 'bg-slate-950 border-blue-950 text-slate-400'
                        }`}
                      >
                        Amanhã
                      </button>
                      <button
                        type="button"
                        onClick={() => setDesiredDateOption('outro')}
                        className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          desiredDateOption === 'outro'
                            ? 'bg-blue-600 text-white border-blue-400'
                            : 'bg-slate-950 border-blue-950 text-slate-400'
                        }`}
                      >
                        Outro dia
                      </button>
                    </div>

                    {desiredDateOption === 'outro' && (
                      <input
                        type="text"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        placeholder="Ex: Sexta-feira, 25/10"
                        className="mt-2 w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-blue-950 text-xs text-white placeholder-slate-600"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 font-semibold mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      Período Preferido
                    </label>
                    <select
                      value={desiredPeriod}
                      onChange={(e) => setDesiredPeriod(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-blue-950 text-xs text-white focus:outline-hidden"
                    >
                      <option value="Manhã (09h às 12h)">Manhã (09h às 12h)</option>
                      <option value="Tarde (14h às 18h)">Tarde (14h às 18h)</option>
                      <option value="Noite (18h às 21h)">Noite (18h às 21h)</option>
                    </select>
                  </div>
                </div>

                {/* Presente Checkbox */}
                <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-900/40 space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-blue-900 cursor-pointer"
                    />
                    <span className="flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-amber-400" />
                      Este pedido é um presente especial para alguém?
                    </span>
                  </label>

                  {isGift && (
                    <div className="pt-2 animate-in fade-in duration-200">
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Escreva uma mensagem para o cartão de presente (nós escrevemos à mão com carinho)..."
                        rows={2}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-blue-950 text-xs text-white placeholder-slate-600 focus:outline-hidden"
                      />
                    </div>
                  )}
                </div>

                {/* 5. Forma de Pagamento */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === 'pix'
                          ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                          : 'bg-slate-950 border-blue-950 text-slate-400'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs">PIX (Chave)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cartao_entrega')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === 'cartao_entrega'
                          ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                          : 'bg-slate-950 border-blue-950 text-slate-400'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-blue-400" />
                      <span className="text-xs">Cartão Maquininha</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('dinheiro')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === 'dinheiro'
                          ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                          : 'bg-slate-950 border-blue-950 text-slate-400'
                      }`}
                    >
                      <Banknote className="w-5 h-5 text-amber-400" />
                      <span className="text-xs">Dinheiro</span>
                    </button>
                  </div>

                  {paymentMethod === 'pix' && (
                    <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <strong className="text-emerald-300 font-bold block">
                          Chave PIX ({settings.pixKeyType}):
                        </strong>
                        <span className="font-mono text-white text-xs select-all">{settings.pixKey}</span>
                      </div>
                      <button
                        type="button"
                        onClick={copyPixKey}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPix ? 'Copiado!' : 'Copiar Chave'}</span>
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'dinheiro' && (
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                        Precisa de troco? Para quanto?
                      </label>
                      <input
                        type="text"
                        value={changeFor}
                        onChange={(e) => setChangeFor(e.target.value)}
                        placeholder="Ex: Troco para R$ 50,00 ou Não preciso"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-blue-950 text-xs text-white placeholder-slate-600"
                      />
                    </div>
                  )}
                </div>

                {/* Observações Gerais */}
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                    Observações gerais para a entrega (opcional)
                  </label>
                  <input
                    type="text"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    placeholder="Ex: Tocar interfone, deixar na portaria..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-blue-950 text-xs text-white placeholder-slate-600 focus:outline-hidden"
                  />
                </div>

                {/* Resumo Financeiro Final */}
                <div className="p-5 rounded-2xl bg-[#050b17] border border-blue-900/80 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Resumo de Valores
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Subtotal dos Cookies:</span>
                      <span className="font-mono font-bold text-white">{formatCurrency(cartSubtotal)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span>Taxa de Entrega:</span>
                      <span className="font-mono font-bold">
                        {isFreeDelivery ? (
                          <span className="text-emerald-400 font-bold">GRÁTIS 🎉</span>
                        ) : (
                          <span className="text-amber-300">R$ 5,00 a R$ 15,00</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span>Caixa & Embalagem Especial:</span>
                      <span className="text-emerald-400 font-bold">Cortesia Druszcz</span>
                    </div>

                    <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-black text-white block">TOTAL DOS COOKIES:</span>
                        {!isFreeDelivery && (
                          <span className="text-[10px] text-slate-400">
                            + frete (R$ 5,00 a R$ 15,00 a combinar)
                          </span>
                        )}
                      </div>
                      <span className="text-xl font-black text-emerald-400 font-mono">
                        {formatCurrency(cartSubtotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Finalize WhatsApp Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base shadow-2xl shadow-emerald-950/90 hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-98 border border-emerald-400/40"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Finalizar Encomenda no WhatsApp</span>
                  <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-center text-slate-400 leading-relaxed">
                  Ao clicar, abriremos diretamente a conversa no WhatsApp do atleta Pedro Affonso com o resumo pronto para confirmação imediata.
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
