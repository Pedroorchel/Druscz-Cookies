import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Truck,
  Store,
  CreditCard,
  QrCode,
  Banknote,
  Send,
  AlertTriangle,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderCustomerInfo, OrderRecord } from '../types';
import {
  formatCurrency,
  generateWhatsAppOrderMessage,
  getWhatsAppUrl,
  sanitizePhone,
} from '../utils/whatsapp';

interface CartDrawerProps {
  onOrderCompleted: (order: OrderRecord, whatsappUrl: string, messageText: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOrderCompleted }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotalCount,
    cartSubtotal,
    settings,
    registerOrder,
    orders,
  } = useStore();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState(settings.city);
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao_entrega' | 'dinheiro'>('pix');
  const [changeFor, setChangeFor] = useState('');
  const [observations, setObservations] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCartOpen) return null;

  const isFreeDelivery = cartSubtotal >= settings.freeDeliveryThreshold;
  const deliveryFee = deliveryType === 'delivery' ? (isFreeDelivery ? 0 : settings.deliveryFee) : 0;
  const grandTotal = cartSubtotal + deliveryFee;

  const amountToFreeDelivery = Math.max(0, settings.freeDeliveryThreshold - cartSubtotal);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Seu carrinho está vazio!');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    const cleanPhone = sanitizePhone(phone);
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Por favor, digite um WhatsApp válido com DDD (ex: 41 99999-8888).');
      return;
    }

    if (deliveryType === 'delivery') {
      if (!street.trim() || !number.trim() || !neighborhood.trim()) {
        setErrorMessage('Por favor, preencha o endereço completo (Rua, Número e Bairro).');
        return;
      }
    }

    if (cartSubtotal < settings.minOrderValue) {
      setErrorMessage(`O pedido mínimo para entrega é de ${formatCurrency(settings.minOrderValue)}.`);
      return;
    }

    const customerInfo: OrderCustomerInfo = {
      name: customerName.trim(),
      phone: phone.trim(),
      deliveryType,
      street: street.trim(),
      number: number.trim(),
      neighborhood: neighborhood.trim(),
      city: city.trim() || settings.city,
      complement: complement.trim(),
      reference: reference.trim(),
      paymentMethod,
      changeFor: paymentMethod === 'dinheiro' ? changeFor.trim() : undefined,
      observations: observations.trim(),
    };

    const nextOrderNumber = orders.length + 101;
    const orderRecord: OrderRecord = {
      id: 'ord-' + Date.now().toString(36),
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
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      total: grandTotal,
      status: 'pendente',
    };

    // Generate WhatsApp message text
    const messageText = generateWhatsAppOrderMessage(
      cart,
      customerInfo,
      settings,
      nextOrderNumber,
      cartSubtotal,
      deliveryFee,
      grandTotal
    );

    const whatsappUrl = getWhatsAppUrl(settings.whatsappNumber, messageText);

    // Register in database / history
    registerOrder(orderRecord);

    // Clear cart and close drawer
    clearCart();
    setIsCartOpen(false);

    // Trigger success callback
    onOrderCompleted(orderRecord, whatsappUrl, messageText);

    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#0a0f1d] border-l border-blue-900/60 shadow-2xl flex flex-col text-slate-100">
          {/* Header */}
          <div className="p-5 border-b border-blue-950 flex items-center justify-between bg-[#080d1a]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white font-display">
                  Carrinho de Compras
                </h2>
                <p className="text-xs text-slate-400">
                  {cartTotalCount} {cartTotalCount === 1 ? 'item adicionado' : 'itens adicionados'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-lg bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free delivery announcement meter */}
          {deliveryType === 'delivery' && (
            <div className="px-5 py-3 bg-blue-950/40 border-b border-blue-950">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-blue-200">
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  {isFreeDelivery ? (
                    <strong className="text-emerald-400">Parabéns! Você tem Frete Grátis 🎉</strong>
                  ) : (
                    <span>
                      Faltam <strong>{formatCurrency(amountToFreeDelivery)}</strong> para frete grátis!
                    </span>
                  )}
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  Meta: {formatCurrency(settings.freeDeliveryThreshold)}
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-400 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (cartSubtotal / settings.freeDeliveryThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950/60 border border-blue-900/50 flex items-center justify-center text-3xl">
                  🍪
                </div>
                <h3 className="text-base font-bold text-white">Seu carrinho está vazio</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  A fornada de hoje está quentinha! Escolha seus sabores favoritos para montar seu pedido.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-all shadow-lg shadow-blue-950"
                >
                  Ver Sabores de Hoje
                </button>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                      Seus Cookies
                    </span>
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Limpar tudo
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {cart.map((item) => (
                      <div
                        key={item.cookie.id}
                        className="p-3 rounded-2xl bg-slate-900/80 border border-blue-950/80 flex items-start gap-3"
                      >
                        <img
                          src={item.cookie.image}
                          alt={item.cookie.name}
                          className="w-14 h-14 rounded-xl object-cover border border-blue-950 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                              {item.cookie.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.cookie.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                              title="Remover item"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] text-blue-300 font-mono font-medium">
                            {formatCurrency(item.cookie.price)}
                            <span className="text-slate-400 ml-1">({item.cookie.weight})</span>
                          </div>

                          {item.notes && (
                            <div className="text-[10px] text-slate-400 italic mt-0.5 line-clamp-1">
                              Obs: {item.notes}
                            </div>
                          )}

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center bg-slate-950 rounded-lg border border-blue-900/50 p-0.5">
                              <button
                                onClick={() => updateCartQuantity(item.cookie.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold font-mono text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.cookie.id, item.quantity + 1)}
                                disabled={item.quantity >= item.cookie.dailyStock}
                                className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-mono font-extrabold text-xs text-white">
                              {formatCurrency(item.cookie.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Type Selector */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                    Tipo de Pedido
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        deliveryType === 'delivery'
                          ? 'bg-blue-950/80 border-blue-500 text-white shadow-md'
                          : 'bg-slate-900/60 border-blue-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Truck className={`w-4 h-4 ${deliveryType === 'delivery' ? 'text-blue-400' : 'text-slate-500'}`} />
                      <div>
                        <div className="text-xs font-bold">Entrega (Delivery)</div>
                        <div className="text-[10px] text-slate-400">
                          {isFreeDelivery ? 'Grátis!' : `Taxa: ${formatCurrency(settings.deliveryFee)}`}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        deliveryType === 'pickup'
                          ? 'bg-blue-950/80 border-blue-500 text-white shadow-md'
                          : 'bg-slate-900/60 border-blue-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Store className={`w-4 h-4 ${deliveryType === 'pickup' ? 'text-blue-400' : 'text-slate-500'}`} />
                      <div>
                        <div className="text-xs font-bold">Retirar na Loja</div>
                        <div className="text-[10px] text-slate-400">Sem taxa • {settings.neighborhood}</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Customer Information Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">
                    Seus Dados para o Pedido
                  </span>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ex: Pedro Orchel"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-blue-950 focus:border-blue-500 focus:outline-hidden text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Seu WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: (41) 99876-5432"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-blue-950 focus:border-blue-500 focus:outline-hidden text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    {/* Address Fields if Delivery */}
                    {deliveryType === 'delivery' && (
                      <div className="space-y-2.5 p-3.5 rounded-2xl bg-blue-950/20 border border-blue-950">
                        <span className="text-[11px] font-bold text-blue-300 block">
                          Endereço para Entrega
                        </span>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <label className="block text-[10px] text-slate-400 mb-0.5">Rua / Avenida *</label>
                            <input
                              type="text"
                              required
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              placeholder="Ex: Rua das Flores"
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-blue-950 focus:border-blue-500 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Número *</label>
                            <input
                              type="text"
                              required
                              value={number}
                              onChange={(e) => setNumber(e.target.value)}
                              placeholder="Ex: 120"
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-blue-950 focus:border-blue-500 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Bairro *</label>
                            <input
                              type="text"
                              required
                              value={neighborhood}
                              onChange={(e) => setNeighborhood(e.target.value)}
                              placeholder="Ex: Batel"
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-blue-950 focus:border-blue-500 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Cidade</label>
                            <input
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              placeholder="Ex: Araucária"
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-blue-950 focus:border-blue-500 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Complemento</label>
                            <input
                              type="text"
                              value={complement}
                              onChange={(e) => setComplement(e.target.value)}
                              placeholder="Apto 42, Bloco B"
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-blue-950 focus:border-blue-500 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Ponto de Referência</label>
                            <input
                              type="text"
                              value={reference}
                              onChange={(e) => setReference(e.target.value)}
                              placeholder="Próximo à praça"
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-blue-950 focus:border-blue-500 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Store Pickup Notice */}
                    {deliveryType === 'pickup' && (
                      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-xs text-slate-300">
                        <strong className="text-blue-200 block mb-0.5">Endereço para Retirada:</strong>
                        {settings.storeAddress}
                        <div className="text-[11px] text-slate-400 mt-1">Horário: {settings.openingHours}</div>
                      </div>
                    )}

                    {/* Payment Method */}
                    <div className="space-y-2">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">
                        Forma de Pagamento
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('pix')}
                          className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                            paymentMethod === 'pix'
                              ? 'bg-blue-950 border-blue-500 text-white'
                              : 'bg-slate-900/60 border-blue-950 text-slate-400 hover:text-white'
                          }`}
                        >
                          <QrCode className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold">PIX</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('cartao_entrega')}
                          className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                            paymentMethod === 'cartao_entrega'
                              ? 'bg-blue-950 border-blue-500 text-white'
                              : 'bg-slate-900/60 border-blue-950 text-slate-400 hover:text-white'
                          }`}
                        >
                          <CreditCard className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-bold">Cartão</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('dinheiro')}
                          className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                            paymentMethod === 'dinheiro'
                              ? 'bg-blue-950 border-blue-500 text-white'
                              : 'bg-slate-900/60 border-blue-950 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Banknote className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-bold">Dinheiro</span>
                        </button>
                      </div>

                      {paymentMethod === 'pix' && (
                        <div className="text-[11px] p-2.5 rounded-xl bg-slate-950 border border-blue-950 text-slate-400 flex items-center justify-between">
                          <span>Chave Pix: <strong className="text-white">{settings.pixKey}</strong></span>
                          <span className="text-[10px] text-blue-300 font-semibold px-2 py-0.5 rounded bg-blue-950">
                            {settings.pixKeyType}
                          </span>
                        </div>
                      )}

                      {paymentMethod === 'dinheiro' && (
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">
                            Precisa de troco para quanto? (Deixe em branco se tiver o valor exato)
                          </label>
                          <input
                            type="text"
                            value={changeFor}
                            onChange={(e) => setChangeFor(e.target.value)}
                            placeholder="Ex: Troco para R$ 100,00"
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-blue-950 text-xs text-white"
                          />
                        </div>
                      )}
                    </div>

                    {/* General Order Notes */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Observações do Pedido (opcional)
                      </label>
                      <textarea
                        rows={2}
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        placeholder="Ex: Enviar quentinho, deixar na portaria, etc."
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-blue-950 text-xs text-white placeholder-slate-500 resize-none"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-200 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer Financial Breakdown & WhatsApp Submit */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-blue-950 bg-[#080d1a] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal ({cartTotalCount} itens)</span>
                  <span className="font-mono text-white">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Taxa de Entrega</span>
                  <span className="font-mono text-white">
                    {deliveryType === 'delivery'
                      ? isFreeDelivery
                        ? 'GRÁTIS'
                        : formatCurrency(deliveryFee)
                      : 'R$ 0,00 (Retirada)'}
                  </span>
                </div>
                <div className="pt-2 border-t border-blue-950 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total do Pedido</span>
                  <span className="text-xl font-black text-blue-300 font-mono">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Big Pulsing WhatsApp Action Button */}
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/60 hover:from-emerald-500 hover:to-teal-500 active:scale-98 transition-all border border-emerald-400/30"
              >
                <Send className="w-4 h-4" />
                <span>MANDAR PEDIDO NO ZAP ZAP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-slate-500">
                Ao clicar, você será redirecionado para o WhatsApp da Druszcz Cookies com seu pedido pronto.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
