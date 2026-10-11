import React, { useState } from 'react';
import {
  ArrowRight,
  Search,
  Truck,
  Sparkles,
  Globe,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import {
  FEATURED_CATEGORY_TILES,
  HERO_IMAGE_PATH,
} from '../data/catalogue';
import { ProductCard } from '../components/ProductCard';
import { ResilientImage } from '../components/ResilientImage';

export function HomePage() {
  const {
    navigate,
    products,
    setActiveCategory,
    setSearchQuery,
    selectedMarket,
    openAIWithPrompt,
  } = useCommerce();

  const [homeSearchInput, setHomeSearchInput] = useState('');

  // 8 carefully selected featured products
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(homeSearchInput);
    navigate('/shop');
  };

  const handleCategorySelect = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    navigate('/shop');
  };

  return (
    <div className="space-y-20 pb-24">
      {/* 1. PROMINENT HERO SECTION + CLEAR CATALOGUE SEARCH */}
      <section className="relative novera-hero-illumination border-b border-[#1E293B] overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C8F75A]">
                NOVERA PAN-AFRICAN MARKETPLACE
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[60px] font-extrabold text-white tracking-tight leading-[1.08] text-balance">
                Discover More.{' '}
                <span className="text-[#C8F75A]">Shop Smarter.</span>{' '}
                Live Better.
              </h1>

              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-xl">
                Curated smartphones, laptops, home appliances, fashion, and everyday essentials across six African markets—assisted in real time by Novera AI.
              </p>

              {/* Single Integrated Catalogue Search Experience */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col sm:flex-row gap-3 pt-2 max-w-xl"
              >
                <div className="relative flex-1">
                  <label htmlFor="homepage-catalogue-search" className="sr-only">
                    Search products by name, brand, or category
                  </label>
                  <Search className="w-4 h-4 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="homepage-catalogue-search"
                    type="search"
                    value={homeSearchInput}
                    onChange={(e) => setHomeSearchInput(e.target.value)}
                    placeholder="Search smartphones, laptops, fashion, or brand..."
                    className="w-full bg-[#0B0F17]/95 border border-[#1E293B] focus:border-[#087F5B] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-[#64748B] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="py-3.5 px-6 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 novera-cta-glow whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A]"
                >
                  <span>Search</span>
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All Categories');
                    navigate('/shop');
                  }}
                  className="text-xs font-semibold text-[#C8F75A] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Explore Complete Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[#334155]" aria-hidden="true">·</span>
                <span className="text-xs text-[#94A3B8]">
                  Market: <strong className="text-white font-medium">{selectedMarket.name}</strong> · Prices shown in NGN (₦)
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#0B0F17] shadow-2xl aspect-[16/9]">
                <ResilientImage
                  src={HERO_IMAGE_PATH}
                  alt="Novera curated technology and lifestyle showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/70 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPACT FEATURED CATEGORIES SECTION */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
              Departments
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Featured Categories
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/categories')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#CBD5E1] hover:text-[#C8F75A] transition-colors whitespace-nowrap"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_CATEGORY_TILES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className="group relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#101828] cursor-pointer aspect-[16/10] flex flex-col justify-end novera-card-hover"
            >
              <div className="absolute inset-0">
                <ResilientImage
                  src={cat.imageUrl}
                  alt={cat.name}
                  category={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/45 to-transparent" />
              </div>

              <div className="relative z-10 p-5">
                <h3 className="text-lg font-bold text-white group-hover:text-[#C8F75A] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#CBD5E1] mt-1 line-clamp-1">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CURATED FEATURED PRODUCTS SECTION */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
              Curated Selection
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Featured Products
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#94A3B8]">
              Prices shown in NGN (₦)
              {selectedMarket.currency !== 'NGN' && (
                <>
                  {' · '}
                  <button
                    type="button"
                    onClick={() =>
                      openAIWithPrompt(
                        `Help me convert product prices from NGN into ${selectedMarket.name} (${selectedMarket.currency}).`
                      )
                    }
                    className="text-[#C8F75A] hover:underline font-medium"
                  >
                    Convert to {selectedMarket.currency} via Novera AI
                  </button>
                </>
              )}
            </span>

            <button
              type="button"
              onClick={() => {
                setActiveCategory('All Categories');
                navigate('/shop');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#CBD5E1] hover:text-[#C8F75A] transition-colors whitespace-nowrap"
            >
              <span>View Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. SUBTLE, SHORT CUSTOMER-BENEFITS SECTION */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-2xl bg-[#101828] border border-[#1E293B]">
          <div className="flex items-start gap-3.5">
            <Globe className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white">Six African Markets</h3>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                Serving Nigeria, Ghana, South Africa, Kenya, Tanzania, and Benin Republic with base pricing in NGN.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-[#C8F75A] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white">Novera AI Shopping Assistant</h3>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                Ask questions about product availability, specifications, currency conversions, or company policies anytime.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white">Transparent Support &amp; Returns</h3>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                Documented delivery estimates and a 7-calendar-day post-delivery return contact window for eligible items.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
