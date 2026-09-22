export interface CookieItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  weight: string;
  category: 'classicos' | 'recheados' | 'especiais' | 'combos';
  image: string;
  images?: string[];
  dailyStock: number;
  maxDailyStock: number;
  isAvailable: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isWarm?: boolean;
  filling?: string;
  ingredients: string[];
}

export interface CartItem {
  cookie: CookieItem;
  quantity: number;
  notes?: string;
  isWarm?: boolean;
  giftBox?: boolean;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  deliveryType: 'delivery' | 'pickup';
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  complement?: string;
  reference?: string;
  desiredDate?: string;
  desiredPeriod?: string;
  paymentMethod: 'pix' | 'cartao_entrega' | 'dinheiro';
  changeFor?: string;
  observations?: string;
  isGift?: boolean;
  giftMessage?: string;
}

export interface StoreSettings {
  whatsappNumber: string; // e.g. "5541996115284"
  storeName: string;
  city: string;
  neighborhood: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  minOrderValue: number;
  isOpen: boolean;
  openingHours: string;
  pixKey: string;
  pixKeyType: string;
  storeAddress: string;
  instagram: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: number;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    notes?: string;
    giftBox?: boolean;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pendente' | 'em_preparo' | 'a_caminho' | 'pronto_retirada' | 'concluido' | 'cancelado';
}
