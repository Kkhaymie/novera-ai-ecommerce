import React, { useMemo, useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Trash2,
  ArrowUpRight,
  Sparkles,
  Info,
  CheckCircle2,
  PackageCheck,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import {
  CATALOGUE_CATEGORIES,
  CATEGORY_REPRESENTATIVE_IMAGES,
  formatCurrencyAmount,
} from '../data/catalogue';
import { ResilientImage } from '../components/ResilientImage';
import { ProductCard } from '../components/ProductCard';

export function CategoriesPage() {
  const { products, navigate, setActiveCategory } = useCommerce();

  const categorySummaries = useMemo(() => {
    return CATALOGUE_CATEGORIES.map((category) => {
      const items = products.filter((p) => p.category === category);
      return {
        category,
        count: items.length,
        sampleNames: items
          .slice(0, 3)
          .map((i) => i.name)
          .join(' · '),
        imageUrl: CATEGORY_REPRESENTATIVE_IMAGES[category],
      };
    });
  }, [products]);

  const handleSelect = (category: string) => {
    setActiveCategory(category);
    navigate('/shop');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
            Novera Catalogue
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            All 11 Product Categories
          </h1>
        </div>
        <p className="text-xs text-[#94A3B8]">
          178 total products across 11 departments
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorySummaries.map(({ category, count, sampleNames, imageUrl }) => (
          <div
            key={category}
            onClick={() => handleSelect(category)}
            className="group rounded-2xl overflow-hidden border border-[#1E293B] bg-[#101828] cursor-pointer flex flex-col justify-between novera-card-hover"
          >
            <div className="aspect-[16/10] w-full bg-[#0D1422] overflow-hidden relative">
              <ResilientImage
                src={imageUrl}
                alt={category}
                category={category}
                fallbackLabel={category}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs font-mono-tabular text-[#087F5B] font-semibold">
                  {count} Products
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-[#C8F75A] transition-colors mt-0.5">
                  {category}
                </h2>
                <p className="text-xs text-[#94A3B8] truncate mt-1">
                  {sampleNames}
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#0B0F17] border border-[#1E293B] group-hover:bg-[#087F5B] flex items-center justify-center text-white transition-colors shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotalsByCurrency,
    navigate,
    selectedMarket,
    openAIWithPrompt,
  } = useCommerce();

  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const currencyEntries = Object.entries(cartSubtotalsByCurrency);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-[#1E293B] pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
            Novera Shopping Cart
          </p>
          <h1 className="font-display text-3xl font-bold text-white">Your Cart</h1>
        </div>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Empty Cart</span>
          </button>
        )}
      </div>

      {demoSubmitted && (
        <div className="p-6 rounded-2xl bg-[#101828] border border-[#087F5B] flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-[#C8F75A] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white">
              Demonstration Checkout Notice (No Payment Processed)
            </h2>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Live checkout and payment processing are not connected in this demonstration environment. No card or bank details are collected. Ask Novera AI if you need assistance with products or policies.
            </p>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#101828] border border-[#1E293B] text-center max-w-lg mx-auto space-y-4">
          <ShoppingBag className="w-10 h-10 text-[#087F5B] mx-auto" />
          <h2 className="text-lg font-bold text-white">Your shopping cart is empty</h2>
          <p className="text-xs text-[#94A3B8]">
            Browse all 178 products in our shop or ask Novera AI for personalized recommendations.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="py-2.5 px-5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold"
            >
              Browse Shop
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#101828] border border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-[#F8FAFC] border border-[#CBD5E1] shrink-0 cursor-pointer"
                  >
                    <ResilientImage
                      src={product.imageUrl}
                      alt={product.name}
                      category={product.category}
                      brand={product.brand}
                      colour={product.colour}
                      productId={product.product_id}
                      compact
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8]">
                      {product.brand} · {product.product_id}
                    </div>
                    <h3
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="text-base font-semibold text-white hover:text-[#C8F75A] cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <div className="text-sm font-mono-tabular text-[#CBD5E1] mt-1">
                      {formatCurrencyAmount(product.price, 'NGN')} each
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="inline-flex items-center rounded-xl border border-[#1E293B] bg-[#0B0F17]">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 text-xs text-white hover:bg-[#1E293B]"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono-tabular text-white">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 text-xs text-white hover:bg-[#1E293B]"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[110px]">
                    <div className="text-sm font-bold font-mono-tabular text-white">
                      {formatCurrencyAmount(product.price * quantity, 'NGN')}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-xs text-[#94A3B8] hover:text-rose-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#101828] border border-[#1E293B] space-y-5">
            <h2 className="text-base font-bold text-white border-b border-[#1E293B] pb-3">
              Order Summary
            </h2>

            <div className="space-y-2">
              {currencyEntries.map(([currency, total]) => (
                <div key={currency} className="flex items-center justify-between text-sm">
                  <span className="text-[#94A3B8]">Subtotal ({currency})</span>
                  <span className="font-mono-tabular font-bold text-white text-base">
                    {formatCurrencyAmount(total, currency)}
                  </span>
                </div>
              ))}
            </div>

            {selectedMarket.currency !== 'NGN' && (
              <button
                type="button"
                onClick={() => {
                  const summary = currencyEntries
                    .map(([curr, amt]) => `${formatCurrencyAmount(amt, curr)}`)
                    .join(', ');
                  openAIWithPrompt(
                    `Convert my cart total of ${summary} into ${selectedMarket.name} (${selectedMarket.currency}).`
                  );
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B0F17] border border-[#1E293B] text-xs font-semibold text-[#C8F75A] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask Novera AI to Convert to {selectedMarket.currency}</span>
              </button>
            )}

            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#1E293B] flex items-start gap-2.5 text-xs text-[#94A3B8]">
              <Info className="w-4 h-4 text-[#FFB547] shrink-0 mt-0.5" />
              <span>
                Demo checkout — live payment processing is not enabled. Never share OTPs, PINs, CVVs, or full card numbers.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setDemoSubmitted(true)}
              className="w-full py-3 px-5 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold transition-colors"
            >
              Demo Checkout Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function WishlistPage() {
  const { wishlistProducts, navigate } = useCommerce();

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#1E293B] pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
          Saved Items
        </p>
        <h1 className="font-display text-3xl font-bold text-white">
          Wishlist ({wishlistProducts.length})
        </h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#101828] border border-[#1E293B] text-center max-w-lg mx-auto space-y-4">
          <Heart className="w-10 h-10 text-[#087F5B] mx-auto" />
          <h2 className="text-lg font-bold text-white">No saved products yet</h2>
          <p className="text-xs text-[#94A3B8]">
            Save products from any product detail page to compare them later.
          </p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="py-2.5 px-5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export function OrdersPage() {
  const { openAIWithPrompt, navigate } = useCommerce();

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#1E293B] pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
          Order Tracking &amp; Support
        </p>
        <h1 className="font-display text-3xl font-bold text-white">Orders</h1>
      </div>

      <div className="p-8 rounded-2xl bg-[#101828] border border-[#1E293B] max-w-2xl space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#0B0F17] border border-[#1E293B] flex items-center justify-center">
          <PackageCheck className="w-6 h-6 text-[#087F5B]" />
        </div>
        <h2 className="text-xl font-bold text-white">
          Order Tracking &amp; Cancellation Support
        </h2>
        <p className="text-sm text-[#CBD5E1] leading-relaxed">
          You can request order tracking by providing your order number to Novera AI. Cancellation may be possible before an order has been dispatched.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => openAIWithPrompt('I want to track or check the status of my order.')}
            className="py-2.5 px-5 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8F75A]" />
            <span>Ask Novera AI About an Order</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/help')}
            className="py-2.5 px-5 rounded-xl bg-[#0B0F17] border border-[#1E293B] text-white text-xs font-semibold"
          >
            View Support Policies
          </button>
        </div>
      </div>
    </div>
  );
}
