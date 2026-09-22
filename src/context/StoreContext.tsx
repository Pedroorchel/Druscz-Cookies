import React, { createContext, useContext, useState, useEffect } from 'react';
import { CookieItem, CartItem, StoreSettings, OrderRecord } from '../types';
import { INITIAL_COOKIES, INITIAL_SETTINGS } from '../data/initialCookies';

export interface CartToastInfo {
  id: string;
  cookie: CookieItem;
  quantity: number;
}

interface StoreContextType {
  cookies: CookieItem[];
  cart: CartItem[];
  settings: StoreSettings;
  orders: OrderRecord[];
  isCartOpen: boolean;
  isAdminOpen: boolean;
  selectedCookieForDetail: CookieItem | null;
  isStoryOpen: boolean;
  cartToast: CartToastInfo | null;
  setIsCartOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsStoryOpen: (open: boolean) => void;
  setSelectedCookieForDetail: (cookie: CookieItem | null) => void;
  dismissCartToast: () => void;
  // Cart Actions
  addToCart: (cookie: CookieItem, quantity?: number, notes?: string) => void;
  removeFromCart: (cookieId: string) => void;
  updateCartQuantity: (cookieId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  // Admin Actions
  addCookie: (newCookie: Omit<CookieItem, 'id'>) => void;
  updateCookie: (updatedCookie: CookieItem) => void;
  deleteCookie: (cookieId: string) => void;
  updateDailyStock: (cookieId: string, deltaOrExact: number, isExact?: boolean) => void;
  toggleCookieAvailability: (cookieId: string) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  registerOrder: (order: OrderRecord) => void;
  updateOrderStatus: (orderId: string, status: OrderRecord['status']) => void;
  resetAllData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const COOKIES_STORAGE_KEY = 'druszcz_cookies_v13';
const SETTINGS_STORAGE_KEY = 'druszcz_settings_v4';
const ORDERS_STORAGE_KEY = 'druszcz_orders_v2';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies, setCookies] = useState<CookieItem[]>(() => {
    try {
      const saved = localStorage.getItem(COOKIES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_COOKIES;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SETTINGS;
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedCookieForDetail, setSelectedCookieForDetail] = useState<CookieItem | null>(null);
  const [cartToast, setCartToast] = useState<CartToastInfo | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(COOKIES_STORAGE_KEY, JSON.stringify(cookies));
    } catch (e) {
      console.error('Failed to save cookies to localStorage', e);
    }
  }, [cookies]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const dismissCartToast = () => {
    setCartToast(null);
  };

  // Cart operations
  const addToCart = (cookie: CookieItem, quantity = 1, notes = '') => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cookie.id === cookie.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const currentQty = updated[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, cookie.dailyStock);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          notes: notes || updated[existingIndex].notes,
        };
        return updated;
      } else {
        const safeQty = Math.min(quantity, Math.max(1, cookie.dailyStock));
        return [...prev, { cookie, quantity: safeQty, notes }];
      }
    });

    // Trigger cart toast notification
    setCartToast({
      id: Date.now().toString(),
      cookie,
      quantity,
    });
  };

  const removeFromCart = (cookieId: string) => {
    setCart((prev) => prev.filter((item) => item.cookie.id !== cookieId));
  };

  const updateCartQuantity = (cookieId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cookieId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cookie.id === cookieId) {
          const maxAllowed = item.cookie.dailyStock;
          const cappedQty = Math.min(quantity, Math.max(1, maxAllowed));
          return { ...item, quantity: cappedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.cookie.price * item.quantity, 0);

  // Admin / Cookie Catalog Operations
  const addCookie = (newCookie: Omit<CookieItem, 'id'>) => {
    const id = 'cookie-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    setCookies((prev) => [{ ...newCookie, id }, ...prev]);
  };

  const updateCookie = (updatedCookie: CookieItem) => {
    setCookies((prev) => prev.map((c) => (c.id === updatedCookie.id ? updatedCookie : c)));
    // Also update any item in cart that references this cookie
    setCart((prev) =>
      prev.map((item) => (item.cookie.id === updatedCookie.id ? { ...item, cookie: updatedCookie } : item))
    );
  };

  const deleteCookie = (cookieId: string) => {
    setCookies((prev) => prev.filter((c) => c.id !== cookieId));
    setCart((prev) => prev.filter((item) => item.cookie.id !== cookieId));
  };

  const updateDailyStock = (cookieId: string, value: number, isExact = false) => {
    setCookies((prev) =>
      prev.map((cookie) => {
        if (cookie.id === cookieId) {
          const newStock = isExact ? Math.max(0, value) : Math.max(0, cookie.dailyStock + value);
          const maxStock = Math.max(newStock, cookie.maxDailyStock);
          return {
            ...cookie,
            dailyStock: newStock,
            maxDailyStock: maxStock,
            isAvailable: newStock > 0 ? cookie.isAvailable : false,
          };
        }
        return cookie;
      })
    );
  };

  const toggleCookieAvailability = (cookieId: string) => {
    setCookies((prev) =>
      prev.map((cookie) => {
        if (cookie.id === cookieId) {
          return { ...cookie, isAvailable: !cookie.isAvailable };
        }
        return cookie;
      })
    );
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const registerOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    // Deduct stock for items ordered
    order.items.forEach((ordered) => {
      updateDailyStock(ordered.id, -ordered.quantity, false);
    });
  };

  const updateOrderStatus = (orderId: string, status: OrderRecord['status']) => {
    setOrders((prev) => prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord)));
  };

  const resetAllData = () => {
    localStorage.removeItem(COOKIES_STORAGE_KEY);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    setCookies(INITIAL_COOKIES);
    setSettings(INITIAL_SETTINGS);
    setOrders([]);
    setCart([]);
  };

  return (
    <StoreContext.Provider
      value={{
        cookies,
        cart,
        settings,
        orders,
        isCartOpen,
        isAdminOpen,
        isStoryOpen,
        selectedCookieForDetail,
        cartToast,
        setIsCartOpen,
        setIsAdminOpen,
        setIsStoryOpen,
        setSelectedCookieForDetail,
        dismissCartToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        addCookie,
        updateCookie,
        deleteCookie,
        updateDailyStock,
        toggleCookieAvailability,
        updateSettings,
        registerOrder,
        updateOrderStatus,
        resetAllData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
