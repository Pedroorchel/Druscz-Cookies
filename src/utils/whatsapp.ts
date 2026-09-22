import { OrderCustomerInfo, StoreSettings, CartItem } from '../types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function formatPhoneDisplay(value: string): string {
  const digits = sanitizePhone(value);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function generateWhatsAppOrderMessage(
  cart: CartItem[],
  customer: OrderCustomerInfo,
  settings: StoreSettings,
  orderNumber: number,
  subtotal: number,
  deliveryFee: number,
  total: number
): string {
  const dateStr = new Date().toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const deliveryTypeLabel = '🛵 ENTREGA EM DOMICÍLIO';

  let paymentText = '';
  if (customer.paymentMethod === 'pix') {
    paymentText = `*PIX* (Chave ${settings.pixKeyType}: ${settings.pixKey})`;
  } else if (customer.paymentMethod === 'cartao_entrega') {
    paymentText = '*CARTÃO* (Levar maquininha Débito/Crédito na entrega)';
  } else {
    paymentText = `*DINHEIRO*${customer.changeFor ? ` (Troco para ${customer.changeFor})` : ' (Sem troco)'}`;
  }

  let itemsText = '';
  cart.forEach((item, index) => {
    const itemTotal = item.cookie.price * item.quantity;
    itemsText += `\n ${index + 1}. *${item.quantity}x ${item.cookie.name}* (${item.cookie.weight})\n    ↳ Valor: ${formatCurrency(itemTotal)}`;
    if (item.giftBox) {
      itemsText += `\n    ↳ 🎁 _Embalagem Especial para Presente_`;
    }
    if (item.isWarm) {
      itemsText += `\n    ↳ 🔥 _Aquecer para entrega_`;
    }
    if (item.notes) {
      itemsText += `\n    ↳ 📝 _Obs: ${item.notes}_`;
    }
  });

  const addressBlock = `
📍 *ENDEREÇO DE ENTREGA:*
• Rua: ${customer.street || ''}, nº ${customer.number || ''}
• Bairro: ${customer.neighborhood || ''}
• Cidade: ${customer.city || settings.city}
${customer.complement ? `• Complemento: ${customer.complement}\n` : ''}${customer.reference ? `• Ponto de Referência: ${customer.reference}\n` : ''}`;

  let scheduleBlock = '';
  if (customer.desiredDate || customer.desiredPeriod) {
    scheduleBlock = `
⏰ *AGENDAMENTO DESEJADO:*
• Data: ${customer.desiredDate || 'Hoje'}
• Período: ${customer.desiredPeriod || 'Horário comercial'}`;
  }

  let giftBlock = '';
  if (customer.isGift && customer.giftMessage) {
    giftBlock = `
🎁 *PEDIDO PARA PRESENTE:*
• Cartão/Recado: "${customer.giftMessage}"`;
  }

  const isFree = subtotal >= settings.freeDeliveryThreshold;
  const deliveryFeeText = isFree
    ? 'GRÁTIS! 🎉 (Pedido a partir de R$ 80,00)'
    : 'R$ 5,00 a R$ 15,00 (Calculado conforme a localização no WhatsApp)';

  const message = `🍪 *NOVO PEDIDO #${orderNumber.toString().padStart(4, '0')} - DRUSZCZ COOKIES* 🍪
📅 Pedido feito em: ${dateStr}

👤 *DADOS DO CLIENTE:*
• Nome: ${customer.name}
• WhatsApp: ${customer.phone}
• Modalidade: ${deliveryTypeLabel}
${addressBlock}${scheduleBlock}${giftBlock}

📋 *ITENS ENCOMENDADOS:*${itemsText}

───────────────────
💰 *RESUMO FINANCEIRO:*
• Subtotal dos Cookies: ${formatCurrency(subtotal)}
• Taxa de Entrega: ${deliveryFeeText}
• *TOTAL DOS COOKIES: ${formatCurrency(subtotal)}* (+ frete de R$ 5,00 a R$ 15,00)
💳 *FORMA DE PAGAMENTO:* ${paymentText}
${customer.observations ? `\n📝 *OBSERVAÇÕES GERAIS:*\n"${customer.observations}"\n` : ''}
───────────────────
_Pedido gerado pela Área de Encomendas Druszcz Cookies. Apoio ao Atleta Pedro Affonso Druszcz._ ✨`;

  return message;
}

export function getWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = sanitizePhone(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
