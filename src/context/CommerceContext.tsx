import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { NOVERA_MARKETS, SAMPLE_SHOWCASE_PRODUCTS } from '../data/catalogue';
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

export interface CatalogueSyncStatus {
  loading: boolean;
  source: 'google_sheets_live' | 'sample_showcase_fallback';
  notice: string;
}

interface CommerceContextValue {
  // Routing
  currentPath: string;
  navigate: (to: string) => void;

  // Market & Currency
  selectedCountryCode: CountryCode;
  selectedMarket: CountryMarket;
  setSelectedCountryCode: (code: CountryCode) => void;

  // Products & Filtering
  products: NoveraProduct[];
  isSampleCatalogue: boolean;
  catalogueStatus: CatalogueSyncStatus;
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
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isSendingChat: boolean;
  sendChatMessage: (messageText: string) => Promise<void>;
  clearChatHistory: () => void;
  openAIWithPrompt: (promptText?: string) => void;

  // Toasts
  toasts: ToastNotice[];
  dismissToast: (id: string) => void;
  pushToast: (title: string, detail?: string) => void;
}

const CommerceContext = createContext<CommerceContextValue | null>(null);

const STORAGE_KEYS = {
  COUNTRY: 'novera_country_code_v1',
  CART: 'novera_cart_items_v1',
  WISHLIST: 'novera_wishlist_ids_v1',
  CHAT: 'novera_chat_history_v1',
};

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content:
    'Welcome to Novera AI — Your Personal Shopping Intelligence. Ask me to find products from the live Novera catalogue, compare technical specifications, convert prices across NGN, GHS, ZAR, KES, TZS, or XOF, or check shipping and return policies.',
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
      }, 3600);
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
      // ignore storage errors
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
          `Shopping market set to ${market.name} (${market.currency})`,
          'Ask Novera AI anytime for live currency conversions.'
        );
      }
    },
    [pushToast]
  );

  // 4. Products, Catalogue Sync Status & Search/Category State
  const [products] = useState<NoveraProduct[]>(SAMPLE_SHOWCASE_PRODUCTS);
  const [catalogueStatus, setCatalogueStatus] = useState<CatalogueSyncStatus>({
    loading: true,
    source: 'sample_showcase_fallback',
    notice: 'Checking Google Sheets catalogue synchronization...',
  });

  useEffect(() => {
    let mounted = true;
    fetch('/api/catalogue/status')
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data) {
          setCatalogueStatus({
            loading: false,
            source: data.source || 'sample_showcase_fallback',
            notice:
              data.notice ||
              'Displaying labeled Sample Showcase records while Novera AI queries live n8n catalogue records.',
          });
        }
      })
      .catch(() => {
        if (mounted) {
          setCatalogueStatus({
            loading: false,
            source: 'sample_showcase_fallback',
            notice:
              'Displaying labeled Sample Showcase records. Use Novera AI for live catalogue enquiries.',
          });
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const isSampleCatalogue = catalogueStatus.source === 'sample_showcase_fallback';
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
      pushToast(`Added to bag`, `${product.name} (${quantity}x)`);
    },
    [pushToast]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      pushToast('Removed item from shopping bag');
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
    pushToast('Shopping bag cleared');
  }, [pushToast]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // Group subtotals strictly by compatible currency (never sum different currencies into a misleading total)
  const cartSubtotalsByCurrency = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const item of cart) {
      const curr = item.product.currency;
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

  // 7. Novera AI Real n8n Chat Integration
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(chatMessages));
    } catch {
      // ignore
    }
  }, [chatMessages]);

  const sendChatMessage = useCallback(
    async (messageText: string) => {
      const trimmed = messageText.trim();
      if (!trimmed || isSendingChat) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, userMessage]);
      setIsSendingChat(true);

      try {
        const response = await fetch('/api/novera-ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: trimmed,
          }),
        });

        const data: NoveraAIResponse = await response.json();

        if (!response.ok || !data.ok) {
          const errorReply: ChatMessage = {
            id: `assistant-err-${Date.now()}`,
            role: 'assistant',
            content:
              data.error ||
              'Novera AI is temporarily unavailable. Please retry your message in a moment.',
            timestamp: new Date().toISOString(),
            isError: true,
            originalPrompt: trimmed,
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
      } catch {
        const networkErrorMsg: ChatMessage = {
          id: `assistant-neterr-${Date.now()}`,
          role: 'assistant',
          content:
            'Network connection interrupted while reaching Novera AI. Please check your connection and click Retry.',
          timestamp: new Date().toISOString(),
          isError: true,
          originalPrompt: trimmed,
        };
        setChatMessages((prev) => [...prev, networkErrorMsg]);
      } finally {
        setIsSendingChat(false);
      }
    },
    [isSendingChat]
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
      isSampleCatalogue,
      catalogueStatus,
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
      chatMessages,
      isChatOpen,
      setIsChatOpen,
      isSendingChat,
      sendChatMessage,
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
      isSampleCatalogue,
      catalogueStatus,
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
      chatMessages,
      isChatOpen,
      isSendingChat,
      sendChatMessage,
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
