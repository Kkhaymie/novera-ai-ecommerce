import React, { useMemo, useState, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { NAVIGATION_CATEGORIES, formatCurrencyAmount } from '../data/catalogue';
import { ProductCard } from '../components/ProductCard';

const PAGE_SIZE = 24;

export function ShopPage() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    selectedMarket,
    openAIWithPrompt,
  } = useCommerce();

  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('All Brands');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All Availability');
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('default');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, searchQuery, selectedBrand, selectedAvailability, maxPrice, sortBy]);

  // Distinct sorted brands from the 178 products (scoped to activeCategory if selected)
  const availableBrands = useMemo(() => {
    const source =
      activeCategory === 'All Categories'
        ? products
        : products.filter((p) => p.category === activeCategory);
    const set = new Set<string>(source.map((p) => p.brand));
    return ['All Brands', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [products, activeCategory]);

  // Per-category counts across all 178 products
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Categories': products.length,
    };
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        if (activeCategory !== 'All Categories' && item.category !== activeCategory) {
          return false;
        }
        if (selectedBrand !== 'All Brands' && item.brand !== selectedBrand) {
          return false;
        }
        if (
          selectedAvailability !== 'All Availability' &&
          item.availability !== selectedAvailability
        ) {
          return false;
        }
        if (item.price > maxPrice) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.trim().toLowerCase();
          return (
            item.name.toLowerCase().includes(q) ||
            item.brand.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        // Default: Show products with dedicated raster photography/renders first, then by Catalogue ID
        const aHasImg = Boolean(a.imageUrl);
        const bHasImg = Boolean(b.imageUrl);
        if (aHasImg !== bHasImg) return aHasImg ? -1 : 1;
        return a.id.localeCompare(b.id);
      });
  }, [
    products,
    activeCategory,
    selectedBrand,
    selectedAvailability,
    maxPrice,
    searchQuery,
    sortBy,
  ]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All Categories');
    setSelectedBrand('All Brands');
    setSelectedAvailability('All Availability');
    setMaxPrice(2000000);
    setSortBy('default');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Calm Header & Unobtrusive Product Count + Currency Clarification */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
            Novera Catalogue
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            {activeCategory === 'All Categories' ? 'All Products' : activeCategory}
          </h1>
        </div>
        <div className="text-left sm:text-right space-y-1">
          <p className="text-xs text-[#94A3B8] font-mono-tabular">
            Showing {visibleProducts.length} of {filteredProducts.length} matching products
          </p>
          <p className="text-xs text-[#CBD5E1]">
            Market: <strong className="text-white">{selectedMarket.name}</strong> · Prices shown in NGN (₦)
            {selectedMarket.currency !== 'NGN' && (
              <>
                {' · '}
                <button
                  type="button"
                  onClick={() =>
                    openAIWithPrompt(
                      `Convert Novera product prices from NGN into ${selectedMarket.name} (${selectedMarket.currency}).`
                    )
                  }
                  className="text-[#C8F75A] hover:underline font-medium"
                >
                  Convert to {selectedMarket.currency} via Novera AI
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Prominent Search, Sort & Collapsible Filter Control */}
      <div className="bg-[#101828] border border-[#1E293B] rounded-2xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <label htmlFor="shop-search-input" className="sr-only">
              Search by product name, brand, category, ID, or description
            </label>
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="shop-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, brand, category, or product ID (NG0001–NG0178)..."
              className="w-full bg-[#0B0F17] border border-[#1E293B] focus:border-[#087F5B] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#64748B] focus:outline-none"
            />
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-2">
            <label htmlFor="shop-sort" className="text-xs text-[#94A3B8] whitespace-nowrap">
              Sort:
            </label>
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-[#0B0F17] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#087F5B]"
            >
              <option value="default">Catalogue ID (NG0001–NG0178)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>

            {/* Collapsible Secondary Filters Button */}
            <button
              type="button"
              onClick={() => setIsFiltersOpen((prev) => !prev)}
              aria-expanded={isFiltersOpen}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap ${
                isFiltersOpen
                  ? 'bg-[#087F5B] border-[#087F5B] text-white'
                  : 'bg-[#0B0F17] border-[#1E293B] text-[#CBD5E1] hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {isFiltersOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Compact Horizontal Category Bar (All 11 Exact Categories + Counts) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1">
          {NAVIGATION_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            const count = categoryCounts[category] || 0;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedBrand('All Brands');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#087F5B] text-white font-semibold'
                    : 'bg-[#0B0F17] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                }`}
              >
                <span>{category === 'All Categories' ? 'All Products' : category}</span>
                <span className="ml-1.5 font-mono-tabular opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Collapsible Secondary Filters Drawer (Brand, Price Range, Availability) */}
        {isFiltersOpen && (
          <div className="pt-4 border-t border-[#1E293B] grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            {/* Brand Filter */}
            <div className="space-y-1.5">
              <label htmlFor="filter-brand" className="block text-xs font-medium text-[#94A3B8]">
                Brand
              </label>
              <select
                id="filter-brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#087F5B]"
              >
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="space-y-1.5">
              <label htmlFor="filter-availability" className="block text-xs font-medium text-[#94A3B8]">
                Availability Status
              </label>
              <select
                id="filter-availability"
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#087F5B]"
              >
                <option value="All Availability">All Availability</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
              </select>
            </div>

            {/* Price Ceiling Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94A3B8]">Max Price</span>
                <span className="font-mono-tabular font-semibold text-[#C8F75A]">
                  {formatCurrencyAmount(maxPrice, 'NGN')}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={2000000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Maximum price in NGN"
                className="w-full accent-[#087F5B] cursor-pointer"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end pt-1">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Responsive Product Grid (Desktop: 4 per row, Tablet: 2-3 per row, Mobile: 1-2 per row) */}
      {visibleProducts.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Progressive Load More Control */}
          {visibleCount < filteredProducts.length && (
            <div className="flex flex-col items-center justify-center gap-3 pt-4">
              <p className="text-xs text-[#94A3B8]">
                Displaying {visibleProducts.length} of {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="py-3 px-6 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold transition-colors"
                >
                  Load More Products
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleCount(filteredProducts.length)}
                  className="py-3 px-5 rounded-xl bg-[#101828] border border-[#1E293B] hover:border-[#334155] text-[#CBD5E1] hover:text-white text-xs font-medium transition-colors"
                >
                  Show All ({filteredProducts.length})
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-[#101828] border border-[#1E293B] text-center max-w-lg mx-auto space-y-4">
          <h2 className="text-lg font-bold text-white">No matching products found</h2>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            No products in the 178-item catalogue matched your current search or filter selection.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="py-2.5 px-5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
