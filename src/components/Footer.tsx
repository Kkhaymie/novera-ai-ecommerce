import React, { useState } from 'react';
import { Globe, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { CATALOGUE_CATEGORIES, NOVERA_MARKETS } from '../data/catalogue';

export function Footer() {
  const {
    navigate,
    selectedMarket,
    setSelectedCountryCode,
    setActiveCategory,
    openAIWithPrompt,
  } = useCommerce();

  const [mobileSection, setMobileSection] = useState<'categories' | 'support' | 'markets' | null>(
    null
  );

  const handleCategoryLink = (category: string) => {
    setActiveCategory(category);
    navigate('/shop');
  };

  return (
    <footer className="bg-[#101828] border-t border-[#1E293B] text-[#CBD5E1]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-[#1E293B]">
          {/* Column 1: Brand */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="font-display text-2xl font-extrabold tracking-tight text-white inline-block"
            >
              NOVERA
            </a>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Novera Ltd is a Nigerian online retail platform serving customers across Nigeria, Ghana, South Africa, Kenya, Tanzania, and Benin Republic.
            </p>
            <button
              type="button"
              onClick={() => openAIWithPrompt()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8F75A]" />
              <span>Ask Novera AI</span>
            </button>
          </div>

          {/* Column 2: Catalogue Categories (Compact Accordion on Mobile, Grid on Desktop) */}
          <div className="lg:col-span-4 border-t border-[#1E293B] pt-4 lg:border-t-0 lg:pt-0 space-y-3">
            <button
              type="button"
              onClick={() =>
                setMobileSection((prev) => (prev === 'categories' ? null : 'categories'))
              }
              className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white lg:cursor-default"
            >
              <span>Departments</span>
              <span className="lg:hidden text-[#94A3B8]">
                {mobileSection === 'categories' ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            </button>

            <div
              className={`${
                mobileSection === 'categories' ? 'grid' : 'hidden'
              } lg:grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#94A3B8] pt-1 lg:pt-0`}
            >
              {CATALOGUE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryLink(cat)}
                  className="text-left hover:text-white transition-colors truncate py-0.5"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Support & Markets Served */}
          <div className="lg:col-span-4 space-y-4">
            {/* Support Links */}
            <div className="border-t border-[#1E293B] pt-4 lg:border-t-0 lg:pt-0 space-y-2">
              <button
                type="button"
                onClick={() =>
                  setMobileSection((prev) => (prev === 'support' ? null : 'support'))
                }
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white lg:cursor-default"
              >
                <span>Customer Support &amp; Policies</span>
                <span className="lg:hidden text-[#94A3B8]">
                  {mobileSection === 'support' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>

              <div
                className={`${
                  mobileSection === 'support' ? 'flex' : 'hidden'
                } lg:flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#94A3B8] pt-1 lg:pt-0`}
              >
                <button
                  type="button"
                  onClick={() => navigate('/help')}
                  className="hover:text-white transition-colors"
                >
                  Help &amp; FAQs
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/shipping')}
                  className="hover:text-white transition-colors"
                >
                  Delivery Info
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/returns')}
                  className="hover:text-white transition-colors"
                >
                  Returns &amp; Refunds
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/orders')}
                  className="hover:text-white transition-colors"
                >
                  Order Tracking
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  About Novera
                </button>
              </div>
            </div>

            {/* Operating Markets */}
            <div className="border-t border-[#1E293B] pt-4 lg:border-t-0 lg:pt-2 space-y-2">
              <button
                type="button"
                onClick={() =>
                  setMobileSection((prev) => (prev === 'markets' ? null : 'markets'))
                }
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white lg:cursor-default"
              >
                <span>Markets Served (Prices in NGN)</span>
                <span className="lg:hidden text-[#94A3B8]">
                  {mobileSection === 'markets' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>

              <div
                className={`${
                  mobileSection === 'markets' ? 'grid' : 'hidden'
                } lg:grid grid-cols-3 gap-1.5 pt-1 lg:pt-0`}
              >
                {NOVERA_MARKETS.map((market) => {
                  const isSelected = market.code === selectedMarket.code;
                  return (
                    <button
                      key={market.code}
                      type="button"
                      onClick={() => setSelectedCountryCode(market.code)}
                      className={`px-2.5 py-1.5 rounded text-[11px] border text-left transition-colors truncate ${
                        isSelected
                          ? 'bg-[#087F5B]/25 border-[#087F5B] text-white font-semibold'
                          : 'bg-[#0B0F17] border-[#1E293B] text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {market.name} ({market.currency})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#087F5B]" />
            <span>
              © {new Date().getFullYear()} Novera Ltd. Base catalogue currency: Nigerian Naira (NGN).
            </span>
          </div>
          <span>Selected market: {selectedMarket.name} ({selectedMarket.currency}) · Prices shown in NGN.</span>
        </div>
      </div>
    </footer>
  );
}
