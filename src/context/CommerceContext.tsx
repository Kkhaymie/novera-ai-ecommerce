import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { NOVERA_CATALOGUE_PRODUCTS, NOVERA_MARKETS } from '../data/catalogue';
import {
  CartItem,
  ChatMessage,
  CountryCode,
  CountryMarket,
  NoveraAIResponse,
  NoveraProduct,
} from '../types/commerce';

export interface ToastNotice {
  id: string;
  title: string;
  detail?: string;
}

interface CommerceContextValue {
  // Routing
  currentPath: string;
  navigate: (to: string) => void;

  // Market & Currency
  selectedCountryCode: CountryCode;
  selectedMarket: CountryMarket;
  setSelectedCountryCode: (code: CountryCode) => void;

  // 178-Product Catalogue & Filtering
  products: NoveraProduct[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;

  // Cart
  cart: CartItem[];
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: NoveraProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalsByCurrency: Record<string, number>;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (product: NoveraProduct) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistProducts: NoveraProduct[];

  // Novera AI Chat
  sessionId: string;
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isSendingChat: boolean;
  sendChatMessage: (messageText: string) => Promise<void>;
  retryFailedMessage: (errorMessageId: string, originalPrompt: string) => Promise<void>;
  clearChatHistory: () => void;
  openAIWithPrompt: (promptText?: string) => void;

  // Toasts
  toasts: ToastNotice[];
  dismissToast: (id: string) => void;
  pushToast: (title: string, detail?: string) => void;
}

const CommerceContext = createContext<CommerceContextValue | null>(null);

const STORAGE_KEYS = {
  COUNTRY: 'novera_country_code_v2',
  CART: 'novera_cart_items_v2',
  WISHLIST: 'novera_wishlist_ids_v2',
  CHAT: 'novera_chat_history_v2',
  SESSION_ID: 'novera_web_session_id_v1',
};

function getOrCreateSessionId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
    if (existing && existing.startsWith('novera-web-session-')) {
      return existing;
    }
    const randomPart =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const created = `novera-web-session-${randomPart}`;
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, created);
    return created;
  } catch {
    return `novera-web-session-${Date.now()}`;
  }
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content:
    'Hello! I am Novera AI, your personal shopping assistant. Ask me to find products across our 178-item catalogue, check prices or specifications, convert NGN prices into GHS, ZAR, KES, TZS, or XOF, or answer questions about delivery and returns.',
  timestamp: new Date().toISOString(),
};

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  // 1. Browser History Router
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to);
      setCurrentPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // 2. Toasts
  const [toasts, setToasts] = useState<ToastNotice[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (title: string, detail?: string) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-2), { id, title, detail }]);
      setTimeout(() => {
        dismissToast(id);
      }, 3400);
    },
    [dismissToast]
  );

  // 3. Country / Market Selector
  const [selectedCountryCode, setSelectedCountryCodeState] = useState<CountryCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUNTRY) as CountryCode | null;
      if (saved && NOVERA_MARKETS.some((m) => m.code === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'NG';
  });

  const selectedMarket = useMemo(() => {
    return NOVERA_MARKETS.find((m) => m.code === selectedCountryCode) || NOVERA_MARKETS[0];
  }, [selectedCountryCode]);

  const setSelectedCountryCode = useCallback(
    (code: CountryCode) => {
      setSelectedCountryCodeState(code);
      try {
        localStorage.setItem(STORAGE_KEYS.COUNTRY, code);
      } catch {
        // ignore
      }
      const market = NOVERA_MARKETS.find((m) => m.code === code);
      if (market) {
        pushToast(
          `Market set to ${market.name} (${market.currency})`,
          'Catalogue base prices are in NGN (₦). Ask Novera AI for currency conversion.'
        );
      }
    },
    [pushToast]
  );

  // 4. Complete 178-Product Catalogue
  const [products] = useState<NoveraProduct[]>(NOVERA_CATALOGUE_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All Categories');

  // 5. Shopping Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CART);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = useCallback(
    (product: NoveraProduct, quantity = 1) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex((item) => item.product.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        return [...prev, { product, quantity }];
      });
      pushToast(`Added to Cart`, `${product.name} (${quantity}x)`);
    },
    [pushToast]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      pushToast('Removed item from cart');
    },
    [pushToast]
  );

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    pushToast('Cart cleared');
  }, [pushToast]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotalsByCurrency = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const item of cart) {
      const curr = item.product.currency || 'NGN';
      totals[curr] = (totals[curr] || 0) + item.product.price * item.quantity;
    }
    return totals;
  }, [cart]);

  // 6. Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const toggleWishlist = useCallback(
    (product: NoveraProduct) => {
      setWishlistIds((prev) => {
        const exists = prev.includes(product.id);
        if (exists) {
          pushToast('Removed from Saved Items', product.name);
          return prev.filter((id) => id !== product.id);
        } else {
          pushToast('Saved to Wishlist', product.name);
          return [...prev, product.id];
        }
      });
    },
    [pushToast]
  );

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const wishlistProducts = useMemo(
    () => products.filter((p) => wishlistIds.includes(p.id)),
    [products, wishlistIds]
  );

  // 7. Novera AI Production Webhook Chat Integration with Stable Session ID
  const [sessionId] = useState<string>(() => getOrCreateSessionId());
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CHAT);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [INITIAL_WELCOME_MESSAGE];
  });
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isSendingChat, setIsSendingChat] = useState<boolean>(false);
  const inFlightChatRef = React.useRef<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(chatMessages));
    } catch {
      // ignore
    }
  }, [chatMessages]);

  const executeChatRequest = useCallback(
    async (trimmedPrompt: string) => {
      const requestOnce = async (): Promise<{ response: Response; data: NoveraAIResponse }> => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 55000);
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              message: trimmedPrompt,
              sessionId,
            }),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          const data: NoveraAIResponse = await response.json();
          return { response, data };
        } catch (err) {
          clearTimeout(timeoutId);
          throw err;
        }
      };

      try {
        let result: { response: Response; data: NoveraAIResponse };
        try {
          result = await requestOnce();
        } catch (firstErr) {
          console.warn('[Novera AI Client] First request interrupted; retrying automatically...', firstErr);
          await new Promise((r) => setTimeout(r, 600));
          result = await requestOnce();
        }

        const { response, data } = result;

        if (!response.ok || !data.ok) {
          console.warn('[Novera AI Client] Non-OK response from /api/chat:', response.status, data.error);
          const errorReply: ChatMessage = {
            id: `assistant-err-${Date.now()}`,
            role: 'assistant',
            content:
              data.error ||
              'Novera AI is temporarily busy right now. Please click Retry to resend your question.',
            timestamp: new Date().toISOString(),
            isError: true,
            originalPrompt: trimmedPrompt,
          };
          setChatMessages((prev) => [...prev, errorReply]);
          return;
        }

        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          products: data.products,
          timestamp: new Date().toISOString(),
        };

        setChatMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        console.error('[Novera AI Client] Connection error while reaching /api/chat:', err);
        const networkErrorMsg: ChatMessage = {
          id: `assistant-neterr-${Date.now()}`,
          role: 'assistant',
          content:
            'Unable to reach Novera AI right now. Please check your connection and click Retry.',
          timestamp: new Date().toISOString(),
          isError: true,
          originalPrompt: trimmedPrompt,
        };
        setChatMessages((prev) => [...prev, networkErrorMsg]);
      } finally {
        inFlightChatRef.current = false;
        setIsSendingChat(false);
      }
    },
    [sessionId]
  );

  const sendChatMessage = useCallback(
    async (messageText: string) => {
      const trimmed = messageText.trim();
      if (!trimmed || isSendingChat || inFlightChatRef.current) return;

      inFlightChatRef.current = true;
      setIsSendingChat(true);

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, userMessage]);
      await executeChatRequest(trimmed);
    },
    [isSendingChat, executeChatRequest]
  );

  const retryFailedMessage = useCallback(
    async (errorMessageId: string, originalPrompt: string) => {
      const trimmed = originalPrompt.trim();
      if (!trimmed || isSendingChat || inFlightChatRef.current) return;

      inFlightChatRef.current = true;
      setIsSendingChat(true);

      // Remove the failed assistant bubble without adding a duplicate user message
      setChatMessages((prev) => prev.filter((msg) => msg.id !== errorMessageId));
      await executeChatRequest(trimmed);
    },
    [isSendingChat, executeChatRequest]
  );

  const clearChatHistory = useCallback(() => {
    setChatMessages([
      {
        ...INITIAL_WELCOME_MESSAGE,
        timestamp: new Date().toISOString(),
      },
    ]);
    pushToast('Conversation history cleared');
  }, [pushToast]);

  const openAIWithPrompt = useCallback(
    (promptText?: string) => {
      setIsChatOpen(true);
      if (promptText && promptText.trim()) {
        sendChatMessage(promptText.trim());
      }
    },
    [sendChatMessage]
  );

  const value = useMemo<CommerceContextValue>(
    () => ({
      currentPath,
      navigate,
      selectedCountryCode,
      selectedMarket,
      setSelectedCountryCode,
      products,
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
      cart,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartSubtotalsByCurrency,
      wishlistIds,
      toggleWishlist,
      isInWishlist,
      wishlistProducts,
      sessionId,
      chatMessages,
      isChatOpen,
      setIsChatOpen,
      isSendingChat,
      sendChatMessage,
      retryFailedMessage,
      clearChatHistory,
      openAIWithPrompt,
      toasts,
      dismissToast,
      pushToast,
    }),
    [
      currentPath,
      navigate,
      selectedCountryCode,
      selectedMarket,
      setSelectedCountryCode,
      products,
      searchQuery,
      activeCategory,
      cart,
      isCartDrawerOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartSubtotalsByCurrency,
      wishlistIds,
      toggleWishlist,
      isInWishlist,
      wishlistProducts,
      sessionId,
      chatMessages,
      isChatOpen,
      isSendingChat,
      sendChatMessage,
      retryFailedMessage,
      clearChatHistory,
      openAIWithPrompt,
      toasts,
      dismissToast,
      pushToast,
    ]
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce(): CommerceContextValue {
  const ctx = useContext(CommerceContext);
  if (!ctx) {
    throw new Error('useCommerce must be used inside a CommerceProvider');
  }
  return ctx;
}
