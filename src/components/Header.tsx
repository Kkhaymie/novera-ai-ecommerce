import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Globe,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { NOVERA_MARKETS } from '../data/catalogue';

export function Header() {
  const {
    currentPath,
    navigate,
    selectedMarket,
    setSelectedCountryCode,
    searchQuery,
    setSearchQuery,
    cartCount,
    setIsCartDrawerOpen,
    wishlistIds,
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

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#1E293B]">
      {/* Clean Single-Row Main Header (Strict 3-Zone Top Bar Contract) */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
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

        {/* Zone 2: Clean Text Navigation Links & Search (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-6 gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium text-[#CBD5E1] shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap ${
                currentPath === '/' ? 'text-[#C8F75A] font-semibold underline underline-offset-8' : ''
              }`}
            >
              Home
            </a>
            <a
              href="/shop"
              onClick={(e) => {
                e.preventDefault();
                navigate('/shop');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap ${
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
              className={`hover:text-white transition-colors whitespace-nowrap ${
                currentPath === '/categories' ? 'text-[#C8F75A] font-semibold underline underline-offset-8' : ''
              }`}
            >
              Categories
            </a>
            <a
              href="/help"
              onClick={(e) => {
                e.preventDefault();
                navigate('/help');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap ${
                currentPath === '/help' || currentPath === '/shipping' || currentPath === '/returns'
                  ? 'text-[#C8F75A] font-semibold underline underline-offset-8'
                  : ''
              }`}
            >
              Support
            </a>
          </nav>

          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <label htmlFor="desktop-commerce-search" className="sr-only">
              Search 178 products by name, brand, category, or ID
            </label>
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="desktop-commerce-search"
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPath !== '/shop') navigate('/shop');
              }}
              placeholder="Search products, brands, or ID (e.g. NG0041)..."
              className="w-full bg-[#101828] border border-[#1E293B] focus:border-[#087F5B] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors"
            />
          </form>
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen((prev) => !prev)}
            aria-label="Toggle product search"
            className="md:hidden w-10 h-10 rounded-lg bg-[#101828] border border-[#1E293B] flex items-center justify-center text-[#F8FAFC]"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Country / Market Selector */}
          <div className="relative" ref={countryDropdownRef}>
            <button
              type="button"
              onClick={() => setIsCountryOpen((prev) => !prev)}
              aria-expanded={isCountryOpen}
              aria-label={`Selected market: ${selectedMarket.name} (${selectedMarket.currency} ${selectedMarket.symbol}). Catalogue base prices shown in NGN`}
              className="h-10 px-3 rounded-lg bg-[#101828] border border-[#1E293B] hover:border-[#334155] flex items-center gap-1.5 text-xs font-medium text-[#F8FAFC] transition-colors whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>{selectedMarket.name}</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span className="font-mono-tabular text-[#C8F75A]">
                {selectedMarket.currency} ({selectedMarket.symbol})
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
            </button>

            {isCountryOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#101828] border border-[#1E293B] shadow-2xl p-2.5 z-50">
                <div className="px-2.5 py-2 border-b border-[#1E293B] mb-1.5">
                  <p className="text-xs font-semibold text-white">Select Shopping Market</p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-snug">
                    Prices are shown in <strong className="text-white">NGN (₦)</strong>. Ask Novera AI to convert any price into your local currency.
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
                        <span>{market.name}</span>
                        <span className="font-mono-tabular text-[#C8F75A]">
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
            className="relative h-10 w-10 rounded-lg bg-[#101828] border border-[#1E293B] hover:border-[#334155] flex items-center justify-center text-[#F8FAFC] transition-colors"
          >
            <Heart className="w-4 h-4" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#087F5B] text-white text-[10px] font-mono-tabular font-bold flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label={`Shopping cart (${cartCount} items)`}
            className="h-10 px-3.5 rounded-lg bg-[#087F5B] hover:bg-[#099268] text-white flex items-center gap-2 text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="font-mono-tabular">{cartCount}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Open navigation menu"
            className="md:hidden w-10 h-10 rounded-lg bg-[#101828] border border-[#1E293B] flex items-center justify-center text-[#F8FAFC]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Search */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 bg-[#0B0F17] border-b border-[#1E293B]">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPath !== '/shop') navigate('/shop');
              }}
              placeholder="Search 178 products, brands, or ID..."
              className="w-full bg-[#101828] border border-[#1E293B] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#087F5B]"
            />
          </form>
        </div>
      )}

      {/* Compact Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#101828] border-b border-[#1E293B] px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => {
              navigate('/');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#0B0F17]"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              navigate('/shop');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#0B0F17]"
          >
            Shop All 178 Products
          </button>
          <button
            type="button"
            onClick={() => {
              navigate('/categories');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#0B0F17]"
          >
            Browse 11 Categories
          </button>
          <button
            type="button"
            onClick={() => {
              navigate('/help');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-[#0B0F17]"
          >
            Customer Support &amp; Policies
          </button>
        </div>
      )}
    </header>
  );
}
