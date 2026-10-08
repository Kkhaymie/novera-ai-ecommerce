import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Sparkles, RotateCcw, Info } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { NAVIGATION_CATEGORIES, formatCurrencyAmount } from '../data/catalogue';
import { ProductCard } from '../components/ProductCard';

export function ShopPage() {
  const {
    products,
    catalogueStatus,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    selectedMarket,
    openAIWithPrompt,
  } = useCommerce();

  const [maxPrice, setMaxPrice] = useState<number>(2500000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        if (
          activeCategory !== 'All Categories' &&
          activeCategory !== 'Deals' &&
          item.category !== activeCategory
        ) {
          return false;
        }
        if (item.price > maxPrice) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchBrand = item.brand.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          return matchName || matchBrand || matchCat || matchDesc;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, activeCategory, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All Categories');
    setMaxPrice(2500000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header & Sample Catalogue Transparency Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#087F5B]/40">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#C8F75A] mb-1">
            NOVERA PRODUCT DISCOVERY
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {activeCategory === 'All Categories' ? 'All Catalogue Items' : activeCategory}
          </h1>
          <p className="text-sm text-[#CBD5E1] mt-1">
            Showing {filteredProducts.length} of {products.length} item(s) · Active regional context: {selectedMarket.name} ({selectedMarket.currency})
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#101828] border border-[#087F5B]/50 max-w-xl flex items-start gap-3">
          <Info className="w-4 h-4 text-[#FFB547] shrink-0 mt-0.5" />
          <div className="text-xs text-[#F8FAFC] leading-relaxed">
            <span className="font-bold text-[#C8F75A]">Catalogue Sync Status:</span>{' '}
            {catalogueStatus.loading ? (
              <span className="animate-pulse text-[#CBD5E1]">Checking Google Sheets connection...</span>
            ) : (
              <>
                Direct Google Sheets read access requires authorization configuration. Cards below are labeled Sample Showcase records across all 6 departments. For live Novera inventory &amp; pricing,{' '}
                <button
                  type="button"
                  onClick={() =>
                    openAIWithPrompt(
                      `What products are currently available in the live Novera catalogue${
                        activeCategory !== 'All Categories' ? ` under ${activeCategory}` : ''
                      }?`
                    )
                  }
                  className="text-[#C8F75A] font-bold underline hover:text-white"
                >
                  ask Novera AI
                </button>
                .
              </>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Filter & Sort Controls Bar */}
      <div className="bg-[#101828] border border-[#087F5B]/40 rounded-2xl p-5 space-y-5 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <label htmlFor="shop-filter-search" className="sr-only">
              Search products
            </label>
            <Search className="w-4 h-4 text-[#C8F75A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="shop-filter-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by product name, brand, or specification..."
              className="w-full bg-[#0B0F17] border border-[#1E293B] focus:border-[#C8F75A] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none"
            />
          </div>

          {/* Price Ceiling Slider */}
          <div className="md:col-span-4 flex flex-col gap-1 px-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#CBD5E1] inline-flex items-center gap-1 font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C8F75A]" />
                <span>Max Price Filter</span>
              </span>
              <span className="font-mono-tabular font-bold text-[#C8F75A]">
                {formatCurrencyAmount(maxPrice, 'NGN')}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={2500000}
              step={25000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price filter"
              className="w-full accent-[#C8F75A] cursor-pointer"
            />
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3 flex items-center gap-2">
            <label htmlFor="shop-sort-select" className="text-xs font-medium text-[#CBD5E1] whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="shop-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="flex-1 bg-[#0B0F17] border border-[#1E293B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C8F75A]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#1E293B] flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {NAVIGATION_CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#C8F75A] text-[#101828] font-bold shadow-sm'
                      : 'bg-[#0B0F17] text-[#CBD5E1] hover:text-white border border-[#1E293B] hover:border-[#087F5B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8F75A] hover:underline transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-[#101828] border border-[#087F5B]/50 text-center max-w-xl mx-auto space-y-4">
          <h2 className="text-lg font-bold text-white">
            No matching showcase items found
          </h2>
          <p className="text-xs text-[#CBD5E1] leading-relaxed">
            No local sample listings matched your filter criteria. Ask Novera AI to search the live Novera inventory directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="py-2.5 px-4 rounded-xl border border-[#1E293B] hover:border-[#C8F75A] text-white text-xs font-semibold transition-colors"
            >
              Reset Local Filters
            </button>
            <button
              type="button"
              onClick={() =>
                openAIWithPrompt(
                  `Search the live Novera catalogue for ${
                    searchQuery ? `"${searchQuery}"` : activeCategory
                  } and show me available options.`
                )
              }
              className="py-2.5 px-4 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8F75A]" />
              <span>Ask Novera AI to Search Live Catalogue</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
