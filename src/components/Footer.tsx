import React from 'react';
import { Globe, Sparkles, ArrowUpRight } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { NOVERA_MARKETS } from '../data/catalogue';

export function Footer() {
  const {
    navigate,
    selectedMarket,
    setSelectedCountryCode,
    setActiveCategory,
    openAIWithPrompt,
  } = useCommerce();

  const handleCategoryLink = (category: string) => {
    setActiveCategory(category);
    navigate('/shop');
  };

  return (
    <footer className="bg-[#101828] border-t border-[#1E293B] text-[#CBD5E1]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E293B]">
          {/* Column 1: Brand & Intelligence */}
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
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Pan-African multi-country commerce platform headquartered in Nigeria. Combining curated product discovery across six African markets with Novera AI shopping intelligence.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openAIWithPrompt()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Novera AI Assistant</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Shop Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Departments
            </h3>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('All Categories')}
                  className="hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('Phones & Tablets')}
                  className="hover:text-white transition-colors"
                >
                  Phones & Tablets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('Laptops & Computing')}
                  className="hover:text-white transition-colors"
                >
                  Laptops & Computing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('Electronics')}
                  className="hover:text-white transition-colors"
                >
                  Electronics & Audio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('Home & Living')}
                  className="hover:text-white transition-colors"
                >
                  Home &amp; Living
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('Fashion')}
                  className="hover:text-white transition-colors"
                >
                  Fashion
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('Beauty & Personal Care')}
                  className="hover:text-white transition-colors"
                >
                  Beauty &amp; Personal Care
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Customer Support
            </h3>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/ai-assistant')}
                  className="hover:text-white transition-colors"
                >
                  Novera AI Shopping Intelligence
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/orders')}
                  className="hover:text-white transition-colors"
                >
                  Orders & Demonstration Status
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/shipping')}
                  className="hover:text-white transition-colors"
                >
                  Shipping Enquiries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/returns')}
                  className="hover:text-white transition-colors"
                >
                  Returns & Refund Guidance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/help')}
                  className="hover:text-white transition-colors"
                >
                  Help & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Country Markets & Company */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Operating Markets
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {NOVERA_MARKETS.map((market) => {
                const isSelected = market.code === selectedMarket.code;
                return (
                  <button
                    key={market.code}
                    type="button"
                    onClick={() => setSelectedCountryCode(market.code)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs border transition-colors ${
                      isSelected
                        ? 'bg-[#087F5B]/20 border-[#087F5B] text-white font-semibold'
                        : 'bg-[#0B0F17] border-[#1E293B] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    <span className="truncate">{market.name}</span>
                    <span className="font-mono-tabular text-[11px] text-[#C8F75A] ml-1">
                      {market.currency}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="pt-3 flex flex-wrap gap-4 text-xs text-[#94A3B8]">
              <button
                type="button"
                onClick={() => navigate('/about')}
                className="hover:text-white transition-colors"
              >
                About Novera
              </button>
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="hover:text-white transition-colors"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => navigate('/privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy
              </button>
              <button
                type="button"
                onClick={() => navigate('/terms')}
                className="hover:text-white transition-colors"
              >
                Terms
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Honest Data Disclosure */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#087F5B]" />
            <span>
              © {new Date().getFullYear()} NOVERA Marketplace (Headquarters: Nigeria). Active Market: {selectedMarket.name} ({selectedMarket.currency}).
            </span>
          </div>
          <p>
            Powered by Novera AI live multi-agent shopping intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
