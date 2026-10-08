import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Globe,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  PackageCheck,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { NAVIGATION_CATEGORIES, NOVERA_MARKETS } from '../data/catalogue';

export function Header() {
  const {
    currentPath,
    navigate,
    selectedMarket,
    setSelectedCountryCode,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    cartCount,
    setIsCartDrawerOpen,
    wishlistIds,
    setIsChatOpen,
  } = useCommerce();

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCountryOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPath !== '/shop') {
      navigate('/shop');
    }
    setIsMobileSearchOpen(false);
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    if (currentPath !== '/shop') {
      navigate('/shop');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#087F5B]/30">
      {/* Level 1: Narrow Dark Announcement Strip (Desktop & Tablet only to respect 15% mobile sticky cap) */}
      <div className="hidden sm:flex bg-gradient-to-r from-[#101828] via-[#0B2520] to-[#101828] border-b border-[#087F5B]/30 px-4 sm:px-6 lg:px-8 h-8 items-center justify-between text-xs text-[#F8FAFC]">
        <div className="max-w-[1360px] w-full mx-auto flex items-center justify-between">
          <p className="truncate font-semibold text-[#C8F75A]">
            Discover smarter shopping across Africa.
          </p>
          <div className="flex items-center gap-4 text-[#CBD5E1] whitespace-nowrap">
            <span>Nigeria · Ghana · South Africa · Kenya · Tanzania · Benin</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="hover:text-[#C8F75A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A] rounded"
            >
              Orders
            </button>
            <button
              type="button"
              onClick={() => navigate('/help')}
              className="hover:text-[#C8F75A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A] rounded"
            >
              Help Center
            </button>
          </div>
        </div>
      </div>

      {/* Level 2: Main Commerce Header (Strict 3-Zone Top Bar Contract) */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single Text Element Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="font-display text-2xl font-extrabold tracking-tight text-white hover:text-[#C8F75A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A] rounded"
        >
          NOVERA
        </a>

        {/* Zone 2: Primary Navigation & Search (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4 gap-6">
          <nav className="flex items-center gap-5 text-sm font-medium text-[#CBD5E1] shrink-0">
            <a
              href="/shop"
              onClick={(e) => {
                e.preventDefault();
                navigate('/shop');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A] rounded ${
                currentPath === '/shop' ? 'text-[#C8F75A] font-semibold underline underline-offset-8' : ''
              }`}
            >
              Shop
            </a>
            <a
              href="/categories"
              onClick={(e) => {
                e.preventDefault();
                navigate('/categories');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A] rounded ${
                currentPath === '/categories' ? 'text-[#C8F75A] font-semibold underline underline-offset-8' : ''
              }`}
            >
              Categories
            </a>
            <a
              href="/ai-assistant"
              onClick={(e) => {
                e.preventDefault();
                navigate('/ai-assistant');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A] rounded ${
                currentPath === '/ai-assistant' ? 'text-[#C8F75A] font-semibold underline underline-offset-8' : ''
              }`}
            >
              Novera AI
            </a>
            <a
              href="/orders"
              onClick={(e) => {
                e.preventDefault();
                navigate('/orders');
              }}
              className={`hidden xl:inline hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A] rounded ${
                currentPath === '/orders' ? 'text-[#C8F75A] font-semibold underline underline-offset-8' : ''
              }`}
            >
              Orders
            </a>
          </nav>

          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <label htmlFor="desktop-commerce-search" className="sr-only">
              Search products, brands and categories
            </label>
            <Search className="w-4 h-4 text-[#087F5B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="desktop-commerce-search"
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPath !== '/shop') navigate('/shop');
              }}
              placeholder="Search products, brands and categories..."
              className="w-full bg-[#101828] border border-[#1E293B] focus:border-[#C8F75A] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#94A3B8] focus:outline-none transition-colors"
            />
          </form>
        </div>

        {/* Zone 3: Primary Commerce Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen((prev) => !prev)}
            aria-label="Toggle product search"
            className="md:hidden w-10 h-10 rounded-lg bg-[#101828] border border-[#1E293B] flex items-center justify-center text-[#F8FAFC] hover:border-[#C8F75A]"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Country / Currency Selector */}
          <div className="relative" ref={countryDropdownRef}>
            <button
              type="button"
              onClick={() => setIsCountryOpen((prev) => !prev)}
              aria-expanded={isCountryOpen}
              aria-label="Select country and currency"
              className="h-10 px-3 rounded-lg bg-[#101828] border border-[#087F5B]/50 hover:border-[#C8F75A] flex items-center gap-1.5 text-xs font-semibold text-[#F8FAFC] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A]"
            >
              <Globe className="w-3.5 h-3.5 text-[#C8F75A]" />
              <span>{selectedMarket.code}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular text-[#C8F75A]">{selectedMarket.currency}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#CBD5E1]" />
            </button>

            {isCountryOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#101828] border border-[#087F5B]/60 shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-[#1E293B] mb-1">
                  <p className="text-xs font-bold text-white">Select Shopping Market</p>
                  <p className="text-[11px] text-[#CBD5E1]">
                    Sets regional context &amp; currency code
                  </p>
                </div>
                <div className="space-y-1">
                  {NOVERA_MARKETS.map((market) => {
                    const active = market.code === selectedMarket.code;
                    return (
                      <button
                        key={market.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountryCode(market.code);
                          setIsCountryOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                          active
                            ? 'bg-[#087F5B] text-white font-semibold'
                            : 'text-[#CBD5E1] hover:bg-[#1E293B] hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col text-left">
                          <span>{market.name}</span>
                          <span
                            className={`text-[10px] ${
                              active ? 'text-[#C8F75A]' : 'text-[#94A3B8]'
                            }`}
                          >
                            {market.hubCity}
                          </span>
                        </div>
                        <span className="font-mono-tabular font-semibold text-[#C8F75A]">
                          {market.currency} ({market.symbol})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Link */}
          <button
            type="button"
            onClick={() => navigate('/wishlist')}
            aria-label={`Saved Wishlist (${wishlistIds.length} items)`}
            className="relative h-10 w-10 rounded-lg bg-[#101828] border border-[#1E293B] hover:border-[#C8F75A] flex items-center justify-center text-[#F8FAFC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A]"
          >
            <Heart className="w-4 h-4" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C8F75A] text-[#101828] text-[10px] font-mono-tabular font-bold flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label={`Shopping bag (${cartCount} items)`}
            className="h-10 px-3.5 rounded-lg bg-[#087F5B] hover:bg-[#099268] border border-[#C8F75A]/40 text-white flex items-center gap-2 text-xs font-bold transition-colors whitespace-nowrap shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A]"
          >
            <ShoppingBag className="w-4 h-4 text-[#C8F75A]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono-tabular text-[#C8F75A]">{cartCount}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Open navigation menu"
            className="md:hidden w-10 h-10 rounded-lg bg-[#101828] border border-[#1E293B] flex items-center justify-center text-[#F8FAFC] hover:border-[#C8F75A]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 bg-[#0B0F17] border-b border-[#1E293B]">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-[#C8F75A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPath !== '/shop') navigate('/shop');
              }}
              placeholder="Search products, brands and categories..."
              className="w-full bg-[#101828] border border-[#087F5B] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#C8F75A]"
            />
          </form>
        </div>
      )}

      {/* Level 3: Desktop Category Navigation Strip (Interactive Segmented Controls) */}
      <div className="hidden md:block bg-[#101828]/90 border-t border-[#1E293B]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            {NAVIGATION_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category && currentPath === '/shop';
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A] ${
                    isSelected
                      ? 'bg-[#087F5B] text-white border border-[#C8F75A]/50'
                      : 'text-[#CBD5E1] hover:text-[#C8F75A] hover:bg-[#0B0F17]/60'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C8F75A]/15 border border-[#C8F75A]/40 text-xs font-bold text-[#C8F75A] hover:bg-[#C8F75A] hover:text-[#101828] transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Novera AI</span>
          </button>
        </div>
      </div>

      {/* Purpose-Built Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#101828] border-b border-[#087F5B]/40 px-4 py-5 space-y-5 shadow-2xl">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                navigate('/shop');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-lg bg-[#0B0F17] border border-[#1E293B] text-left text-xs font-bold text-white"
            >
              Explore Catalogue
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/ai-assistant');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-lg bg-[#C8F75A] text-left text-xs font-bold text-[#101828] flex items-center justify-between"
            >
              <span>Novera AI</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/orders');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-lg bg-[#0B0F17] border border-[#1E293B] text-left text-xs font-semibold text-white flex items-center gap-2"
            >
              <PackageCheck className="w-3.5 h-3.5 text-[#C8F75A]" />
              <span>Orders</span>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/help');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-lg bg-[#0B0F17] border border-[#1E293B] text-left text-xs font-semibold text-white"
            >
              Support &amp; Help
            </button>
          </div>

          <div>
            <p className="text-xs font-bold text-[#C8F75A] uppercase tracking-wider mb-2">
              Shop By Department
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {NAVIGATION_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className="text-left px-3 py-2 rounded-lg text-xs font-medium text-[#F8FAFC] bg-[#0B0F17]/60 hover:bg-[#087F5B] transition-colors truncate"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
