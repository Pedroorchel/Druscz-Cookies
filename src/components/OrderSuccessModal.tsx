import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Clock,
  Sparkles,
  X,
  Phone,
} from 'lucide-react';
import { OrderRecord } from '../types';
import { formatCurrency } from '../utils/whatsapp';
import { useStore } from '../context/StoreContext';

interface OrderSuccessModalProps {
  order: OrderRecord | null;
  whatsappUrl: string;
  messageText: string;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  whatsappUrl,
  messageText,
  onClose,
}) => {
  const { settings } = useStore();
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  useEffect(() => {
    if (order) {
      // Fire festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#60a5fa', '#f59e0b', '#10b981', '#ffffff'],
      });
    }
  }, [order]);

  if (!order) return null;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(settings.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0b1120] border border-blue-800/70 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl space-y-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center border border-blue-950 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xl shadow-emerald-950">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
            Pedido Enviado com Sucesso!
          </span>
          <h2 className="text-2xl font-black text-white font-display">
            Druszcz Cookies #{order.orderNumber}
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Obrigado, <strong className="text-white">{order.customer.name}</strong>! Seu pedido foi preparado para envio direto no WhatsApp da loja.
          </p>
        </div>

        {/* Next Step Action Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">💬</span>
              <div>
                <h4 className="text-xs font-bold text-white">Próximo Passo no WhatsApp</h4>
                <p className="text-[11px] text-slate-400">Envie a mensagem na conversa para confirmarmos</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Pronto para envio
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir WhatsApp</span>
            </a>

            <button
              onClick={handleCopyMessage}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all active:scale-95"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Texto Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Mensagem</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pix Box if selected */}
        {order.customer.paymentMethod === 'pix' && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-900/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Pagamento via PIX</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {formatCurrency(order.total)}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-blue-950 text-xs">
              <div className="truncate mr-2 font-mono text-slate-300 text-[11px]">
                {settings.pixKey}
              </div>
              <button
                onClick={handleCopyPix}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-blue-900/80 hover:bg-blue-800 text-blue-200 text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                {copiedPix ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPix ? 'Copiado!' : 'Copiar Chave'}</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              Você pode enviar o comprovante diretamente na conversa do WhatsApp para agilizar a fornada!
            </p>
          </div>
        )}

        {/* Order Details Briefing */}
        <div className="space-y-2 text-xs border-t border-blue-950/80 pt-4">
          <div className="flex justify-between text-slate-400">
            <span>Modalidade:</span>
            <span className="text-white font-medium">
              {order.customer.deliveryType === 'delivery' ? 'Entrega em Domicílio' : 'Retirada no Balcão'}
            </span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Tempo estimado:</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" /> 30 a 50 minutos
            </span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Valor Total:</span>
            <span className="text-blue-300 font-mono font-bold text-sm">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-950"
        >
          Voltar para a Loja
        </button>
      </div>
    </div>
  );
};
