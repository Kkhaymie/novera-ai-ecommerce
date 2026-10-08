import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Globe,
  MessageSquare,
  SlidersHorizontal,
  ShieldCheck,
  HelpCircle,
  Search,
  ShoppingBag,
  Flame,
  Layers,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import {
  CATEGORY_TILES,
  HERO_IMAGE_PATH,
  NOVERA_AI_SUGGESTED_PROMPTS,
  NOVERA_MARKETS,
  formatCurrencyAmount,
} from '../data/catalogue';
import { ProductCard } from '../components/ProductCard';
import { ResilientImage } from '../components/ResilientImage';

const HOME_DEPARTMENT_TABS = [
  'All Departments',
  'Phones & Tablets',
  'Laptops & Computing',
  'Electronics',
  'Home & Living',
  'Fashion',
  'Beauty & Personal Care',
];

type BudgetTier = 'all' | 'under-150k' | '150k-400k' | '400k-800k' | 'premium';

export function HomePage() {
  const {
    navigate,
    products,
    selectedMarket,
    setSelectedCountryCode,
    setActiveCategory,
    setSearchQuery,
    addToCart,
    openAIWithPrompt,
  } = useCommerce();

  const [selectedHomeTab, setSelectedHomeTab] = useState<string>('All Departments');
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier>('all');
  const [quickFilterText, setQuickFilterText] = useState<string>('');

  // 12 Featured Bestsellers across all 6 departments (2 per department)
  const featuredProducts = useMemo(() => products.filter((p) => p.featured), [products]);

  // Filtered products for the Complete 48-Product Storefront Directory
  const directoryProducts = useMemo(() => {
    return products.filter((item) => {
      if (selectedHomeTab !== 'All Departments' && item.category !== selectedHomeTab) {
        return false;
      }
      if (selectedBudget === 'under-150k' && item.price > 150000) return false;
      if (selectedBudget === '150k-400k' && (item.price <= 150000 || item.price > 400000)) {
        return false;
      }
      if (selectedBudget === '400k-800k' && (item.price <= 400000 || item.price > 800000)) {
        return false;
      }
      if (selectedBudget === 'premium' && item.price <= 800000) return false;

      if (quickFilterText.trim() !== '') {
        const q = quickFilterText.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, selectedHomeTab, selectedBudget, quickFilterText]);

  const handleCategoryNavigate = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    navigate('/shop');
  };

  const handlePopularTagClick = (keyword: string) => {
    setSearchQuery(keyword);
    navigate('/shop');
  };

  // Spotlight items for the Hero asymmetric right column
  const heroSpotlights = useMemo(
    () => [
      products.find((p) => p.id === 'nov-el-02') || products[0], // Gaming Console + VR
      products.find((p) => p.id === 'nov-hl-02') || products[1], // Air Fryer
      products.find((p) => p.id === 'nov-fa-02') || products[2], // Luxury Tote
      products.find((p) => p.id === 'nov-bp-02') || products[3], // Hair Styler
    ],
    [products]
  );

  return (
    <div className="space-y-24 pb-24">
      {/* =====================================================================
          1. SCROLL-STOPPING CINEMATIC HERO COMMAND CENTER
         ===================================================================== */}
      <section className="relative novera-hero-glow border-b border-[#087F5B]/50 overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: High-Impact Copy, Quick Search Tags & Dual CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#CBD5E1] tracking-wide">
                <span className="text-[#C8F75A] font-extrabold uppercase tracking-wider">
                  NOVERA PAN-AFRICAN STOREFRONT
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-white">
                  {products.length} Curated Products
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#FFB547] font-semibold">
                  {selectedMarket.name} ({selectedMarket.currency})
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white tracking-tight leading-[1.04] text-balance">
                Discover More.{' '}
                <span className="text-[#C8F75A]">Shop Smarter.</span>{' '}
                Live Better.
              </h1>

              <p className="text-base sm:text-lg text-[#F8FAFC]/90 leading-relaxed max-w-xl">
                Explore everyday essentials and standout finds — from 5G smartphones, OLED workstations, and 4K gaming consoles to smart kitchen air fryers, luxury leather goods, and supersonic hair stylers — backed by Novera AI.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="py-4 px-7 rounded-xl bg-[#C8F75A] hover:bg-[#d4fa78] text-[#101828] text-sm font-extrabold inline-flex items-center gap-2.5 transition-all shadow-xl shadow-[#C8F75A]/20 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore All {products.length} Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openAIWithPrompt()}
                  className="py-4 px-7 rounded-xl bg-[#087F5B] hover:bg-[#099268] border border-[#C8F75A]/50 text-white text-sm font-bold inline-flex items-center gap-2.5 transition-all shadow-xl shadow-[#087F5B]/30 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A]"
                >
                  <Sparkles className="w-4 h-4 text-[#C8F75A]" />
                  <span>Shop With Novera AI</span>
                </button>
              </div>

              {/* High-Intent Internet Shopping Quick-Jump Strip */}
              <div className="pt-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Trending Searches Across Africa:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    '5G Smartphone',
                    'Air Fryer',
                    'Gaming Console & VR',
                    'OLED Laptop',
                    'ANC Headphones',
                    'Hair Dryer & Styler',
                    'Eau de Parfum',
                    'Leather Sneakers',
                    'Power Bank',
                  ].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handlePopularTagClick(term)}
                      className="px-3 py-1.5 rounded-lg bg-[#101828]/90 hover:bg-[#087F5B] border border-[#1E293B] hover:border-[#C8F75A] text-xs font-semibold text-[#F8FAFC] transition-colors whitespace-nowrap"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust & Market Metrics Strip */}
              <div className="pt-5 border-t border-[#087F5B]/40 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-mono-tabular text-lg font-extrabold text-[#C8F75A]">
                    48 Items
                  </p>
                  <p className="text-[#CBD5E1]">Across 6 Core Departments</p>
                </div>
                <div>
                  <p className="font-mono-tabular text-lg font-extrabold text-white">
                    6 Countries
                  </p>
                  <p className="text-[#CBD5E1]">NGN · GHS · ZAR · KES · TZS · XOF</p>
                </div>
                <div>
                  <p className="font-mono-tabular text-lg font-extrabold text-[#FFB547]">
                    24/7 AI Agent
                  </p>
                  <p className="text-[#CBD5E1]">Live n8n Shopping Intelligence</p>
                </div>
              </div>
            </div>

            {/* Right Column: Cinematic Flagship Showcase + 4 Live Interactive Spotlight Cards */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Flagship Frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#087F5B]/60 bg-[#0B0F17] shadow-2xl aspect-[16/9] novera-card-glow group">
                <ResilientImage
                  src={HERO_IMAGE_PATH}
                  alt="Editorial composition of flagship smartphone, pro laptop, and wireless studio headphones"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#C8F75A] font-extrabold uppercase tracking-wider">
                      Flagship Technology &amp; Lifestyle
                    </p>
                    <p className="text-base font-bold text-white">
                      Engineered for Modern African Homes &amp; Workspaces
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openAIWithPrompt(
                        `My budget is 500,000 NGN and I am shopping from ${selectedMarket.name}. Recommend the best products for me.`
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-[#C8F75A] hover:bg-[#d4fa78] text-[#101828] text-xs font-extrabold inline-flex items-center gap-1.5 shadow-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI to Build My Bundle</span>
                  </button>
                </div>
              </div>

              {/* 4 Live Clickable Cross-Category Spotlight Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {heroSpotlights.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => navigate(`/product/${spot.id}`)}
                    className="group rounded-xl bg-[#101828] border border-[#087F5B]/40 hover:border-[#C8F75A] p-2.5 cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#0B0F17] mb-2">
                      <ResilientImage
                        src={spot.imageUrl}
                        alt={spot.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#C8F75A] truncate">
                      {spot.category}
                    </p>
                    <p className="text-xs font-bold text-white truncate mt-0.5 group-hover:text-[#C8F75A]">
                      {spot.name}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs font-mono-tabular font-extrabold text-[#C8F75A]">
                        {formatCurrencyAmount(spot.price, spot.currency)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(spot, 1);
                        }}
                        aria-label={`Quick add ${spot.name} to bag`}
                        className="px-2 py-0.5 rounded bg-[#087F5B] hover:bg-[#C8F75A] hover:text-[#101828] text-[10px] font-bold text-white transition-colors"
                      >
                        + Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SHOP BY CATEGORY (BENTO SHOWCASE OF ALL 6 DEPARTMENTS)
         ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#C8F75A] mb-1">
              01. Curated Storefront Architecture
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Shop Across All 6 Departments
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/categories')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8F75A] hover:underline transition-colors whitespace-nowrap"
          >
            <span>Open Full Department Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_TILES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryNavigate(cat.slug)}
              className="group relative rounded-2xl overflow-hidden border border-[#087F5B]/45 hover:border-[#C8F75A] bg-[#101828] cursor-pointer min-h-[270px] flex flex-col justify-between p-6 novera-card-glow transition-all"
            >
              <div className="absolute inset-0">
                <ResilientImage
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/55 to-[#0B0F17]/20" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono-tabular font-extrabold text-[#C8F75A] bg-[#0B0F17]/85 px-3 py-1 rounded-md border border-[#087F5B]/50">
                  {cat.itemCountLabel}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#087F5B] border border-[#C8F75A]/40 group-hover:bg-[#C8F75A] group-hover:text-[#101828] flex items-center justify-center text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10 pt-16">
                <h3 className="font-display text-2xl font-extrabold text-white group-hover:text-[#C8F75A] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#F8FAFC]/90 mt-1.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          3. TRENDING INTERNET BESTSELLERS (12 FLAGSHIP PICKS ACROSS ALL CATEGORIES)
         ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#C8F75A] mb-1">
              <Flame className="w-4 h-4" />
              <span>02. Most-Searched Online Essentials</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trending Flagships &amp; Everyday Upgrades
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-[#FFB547]">
              12 Top Picks Across Tech, Home, Fashion &amp; Beauty
            </span>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8F75A] hover:underline transition-colors whitespace-nowrap"
            >
              <span>View All 48 Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. EDITORIAL DUAL-SPOTLIGHT BANNERS (GAMING/CREATOR + SMART KITCHEN/BEAUTY)
         ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Banner 1: Next-Gen Gaming, 4K Cinema & Pro Workstations */}
          <div className="relative rounded-2xl overflow-hidden border border-[#087F5B]/60 bg-[#101828] min-h-[340px] flex flex-col justify-end p-6 sm:p-8 novera-card-glow group">
            <div className="absolute inset-0">
              <ResilientImage
                src="/src/assets/images/prod_gaming_console_vr_1791500935883.jpg"
                alt="Next-Gen 4K Gaming Console and Spatial VR Headset"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/70 to-transparent" />
            </div>
            <div className="relative z-10 space-y-3 max-w-lg">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C8F75A]">
                NEXT-GEN ENTERTAINMENT &amp; STUDIO GEAR
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                4K/120fps Consoles, Spatial VR, Drones &amp; Ultrawide OLEDs
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1]">
                Upgrade your setup with high-refresh OLED monitors, custom mechanical keyboards, full-frame cinema cameras, and next-gen consoles.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleCategoryNavigate('Electronics')}
                  className="py-2.5 px-5 rounded-xl bg-[#C8F75A] text-[#101828] text-xs font-extrabold inline-flex items-center gap-1.5"
                >
                  <span>Shop Electronics (8)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryNavigate('Laptops & Computing')}
                  className="py-2.5 px-5 rounded-xl bg-[#0B0F17]/90 border border-[#087F5B] text-white text-xs font-bold"
                >
                  Shop Computing (8)
                </button>
              </div>
            </div>
          </div>

          {/* Banner 2: Smart Kitchen, Luxury Fashion & Supersonic Beauty */}
          <div className="relative rounded-2xl overflow-hidden border border-[#087F5B]/60 bg-[#101828] min-h-[340px] flex flex-col justify-end p-6 sm:p-8 novera-card-glow group">
            <div className="absolute inset-0">
              <ResilientImage
                src="/src/assets/images/prod_smart_kitchen_airfryer_1791500954738.jpg"
                alt="Dual-Basket Digital Air Fryer and Vacuum Blender"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/70 to-transparent" />
            </div>
            <div className="relative z-10 space-y-3 max-w-lg">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C8F75A]">
                MODERN LIVING, STYLE &amp; SELF-CARE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Dual-Zone Air Fryers, Espresso Systems, Leather Totes &amp; Beauty Tech
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1]">
                From 10L touchscreen air fryers and LiDAR robot vacuums to Italian leather sneakers, Oud Eau de Parfum, and supersonic hair stylers.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleCategoryNavigate('Home & Living')}
                  className="py-2.5 px-5 rounded-xl bg-[#C8F75A] text-[#101828] text-xs font-extrabold inline-flex items-center gap-1.5"
                >
                  <span>Shop Home &amp; Kitchen (8)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryNavigate('Fashion')}
                  className="py-2.5 px-5 rounded-xl bg-[#0B0F17]/90 border border-[#087F5B] text-white text-xs font-bold"
                >
                  Shop Fashion (8)
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryNavigate('Beauty & Personal Care')}
                  className="py-2.5 px-5 rounded-xl bg-[#0B0F17]/90 border border-[#087F5B] text-white text-xs font-bold"
                >
                  Shop Beauty (8)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. COMPLETE 48-PRODUCT INTERACTIVE STOREFRONT DIRECTORY
         ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-[#101828] border border-[#087F5B]/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#1E293B] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#C8F75A] mb-1">
                <Layers className="w-4 h-4" />
                <span>03. Complete Storefront Catalogue ({directoryProducts.length} of {products.length} Products)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Browse All {products.length} Products by Category or Budget
              </h2>
            </div>

            {/* Instant Keyword Search inside Homepage Directory */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-[#C8F75A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={quickFilterText}
                onChange={(e) => setQuickFilterText(e.target.value)}
                placeholder="Quick-filter 48 products (e.g., drone, blender, parfum)..."
                className="w-full bg-[#0B0F17] border border-[#087F5B]/60 focus:border-[#C8F75A] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none"
              />
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {HOME_DEPARTMENT_TABS.map((tab) => {
                const active = selectedHomeTab === tab;
                const count =
                  tab === 'All Departments'
                    ? products.length
                    : products.filter((p) => p.category === tab).length;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedHomeTab(tab)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#C8F75A] text-[#101828] shadow-md'
                        : 'bg-[#0B0F17] text-[#CBD5E1] hover:text-white border border-[#1E293B] hover:border-[#087F5B]'
                    }`}
                  >
                    <span>{tab}</span>
                    <span className="ml-1.5 font-mono-tabular opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Budget Tier Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Budgets' },
                { id: 'under-150k', label: 'Under ₦150k' },
                { id: '150k-400k', label: '₦150k – ₦400k' },
                { id: '400k-800k', label: '₦400k – ₦800k' },
                { id: 'premium', label: '₦800k+ Flagships' },
              ].map((tier) => {
                const active = selectedBudget === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedBudget(tier.id as BudgetTier)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#087F5B] text-white border border-[#C8F75A]'
                        : 'bg-[#0B0F17] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* All Matching Products Grid */}
        {directoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-[#101828] border border-[#087F5B]/40 text-center space-y-3">
            <p className="text-base font-bold text-white">
              No items match that combination of department and budget filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedHomeTab('All Departments');
                setSelectedBudget('all');
                setQuickFilterText('');
              }}
              className="py-2 px-4 rounded-xl bg-[#C8F75A] text-[#101828] text-xs font-extrabold"
            >
              Reset Directory Filters
            </button>
          </div>
        )}
      </section>

      {/* =====================================================================
          6. NOVERA AI SIGNATURE SHOWCASE & HOW AI HELPS YOU SHOP
         ===================================================================== */}
      <section className="novera-ai-mesh border-y border-[#087F5B]/50 py-16 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#C8F75A] font-extrabold tracking-wider uppercase">
                <Sparkles className="w-4 h-4" />
                <span>NOVERA AI — YOUR PERSONAL SHOPPING INTELLIGENCE</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
                Find products, compare options, explore prices, and get helpful shopping answers with Novera AI.
              </h2>

              <p className="text-sm sm:text-base text-[#F8FAFC]/90 leading-relaxed">
                Connected directly to Novera&apos;s production multi-agent workflow, Novera AI inspects real catalogue records, answers specification questions, converts prices across six African currencies, and guides you through shipping or returns.
              </p>

              <div className="pt-2">
                <p className="text-xs font-bold text-[#C8F75A] mb-3">
                  Try an instant shopping prompt with live Novera AI:
                </p>
                <div className="flex flex-wrap gap-2">
                  {NOVERA_AI_SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => openAIWithPrompt(prompt)}
                      className="px-3.5 py-2 rounded-lg bg-[#0B0F17] hover:bg-[#087F5B] border border-[#087F5B]/60 hover:border-[#C8F75A] text-xs font-semibold text-white transition-colors whitespace-nowrap"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/ai-assistant')}
                  className="py-3.5 px-6 rounded-xl bg-[#C8F75A] hover:bg-[#d4fa78] text-[#101828] text-xs font-extrabold inline-flex items-center gap-2 transition-colors whitespace-nowrap shadow-lg"
                >
                  <span>Open Full Novera AI Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* How AI Helps You Shop Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#0B0F17]/90 border border-[#087F5B]/50 space-y-2">
                <MessageSquare className="w-5 h-5 text-[#C8F75A]" />
                <h3 className="text-sm font-bold text-white">01. Live Catalogue Discovery</h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Share your budget or use case and Novera AI queries our connected catalogue to recommend matching items.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0B0F17]/90 border border-[#087F5B]/50 space-y-2">
                <SlidersHorizontal className="w-5 h-5 text-[#C8F75A]" />
                <h3 className="text-sm font-bold text-white">02. Side-by-Side Comparisons</h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Compare phones, laptops, or home appliances by verified technical attributes before adding to bag.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0B0F17]/90 border border-[#087F5B]/50 space-y-2">
                <Globe className="w-5 h-5 text-[#C8F75A]" />
                <h3 className="text-sm font-bold text-white">03. Multi-Currency Conversion</h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Request real-time conversions between NGN, GHS, ZAR, KES, TZS, and XOF without misleading symbol swaps.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0B0F17]/90 border border-[#087F5B]/50 space-y-2">
                <ShieldCheck className="w-5 h-5 text-[#C8F75A]" />
                <h3 className="text-sm font-bold text-white">04. Policy &amp; Order Support</h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Get accurate answers on shipping, returns, refunds, and customer support escalation directly from our knowledge base.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. SHOP ACROSS AFRICA & CUSTOMER SUPPORT
         ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="p-6 sm:p-8 rounded-2xl novera-ai-mesh border border-[#087F5B]/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C8F75A]">
              04. Shop Across Africa
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Select Your Regional Market &amp; Currency Context
            </h3>
            <p className="text-xs sm:text-sm text-[#CBD5E1]">
              Headquartered in Nigeria and serving six Pan-African markets. Prices are displayed in their source currency unless verified conversion is requested through Novera AI.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full lg:w-auto">
            {NOVERA_MARKETS.map((market) => {
              const active = market.code === selectedMarket.code;
              return (
                <button
                  key={market.code}
                  type="button"
                  onClick={() => setSelectedCountryCode(market.code)}
                  className={`px-4 py-3 rounded-xl border text-left transition-all ${
                    active
                      ? 'bg-[#087F5B] border-[#C8F75A] text-white shadow-lg'
                      : 'bg-[#0B0F17]/90 border-[#1E293B] hover:border-[#C8F75A] text-[#F8FAFC]'
                  }`}
                >
                  <div className="text-xs font-bold">{market.name}</div>
                  <div
                    className={`text-[11px] font-mono-tabular font-semibold ${
                      active ? 'text-[#C8F75A]' : 'text-[#CBD5E1]'
                    }`}
                  >
                    {market.currency} ({market.symbol})
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#1E293B]">
          <button
            type="button"
            onClick={() => navigate('/shipping')}
            className="p-5 rounded-xl bg-[#101828] border border-[#087F5B]/40 hover:border-[#C8F75A] text-left flex items-start justify-between gap-3 transition-colors"
          >
            <div>
              <h4 className="text-sm font-bold text-white">Shipping Enquiries</h4>
              <p className="text-xs text-[#CBD5E1] mt-1">
                Check regional delivery coverage and dispatch guidance via Novera AI.
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#C8F75A] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/returns')}
            className="p-5 rounded-xl bg-[#101828] border border-[#087F5B]/40 hover:border-[#C8F75A] text-left flex items-start justify-between gap-3 transition-colors"
          >
            <div>
              <h4 className="text-sm font-bold text-white">Returns &amp; Refund Policy</h4>
              <p className="text-xs text-[#CBD5E1] mt-1">
                Consult verified return eligibility and escalation workflows.
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#C8F75A] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/help')}
            className="p-5 rounded-xl bg-[#101828] border border-[#087F5B]/40 hover:border-[#C8F75A] text-left flex items-start justify-between gap-3 transition-colors"
          >
            <div>
              <h4 className="text-sm font-bold text-white">Customer Support &amp; Help</h4>
              <p className="text-xs text-[#CBD5E1] mt-1">
                Direct assistance for product specs, orders, and human escalation.
              </p>
            </div>
            <HelpCircle className="w-4 h-4 text-[#C8F75A] shrink-0" />
          </button>
        </div>
      </section>
    </div>
  );
}
