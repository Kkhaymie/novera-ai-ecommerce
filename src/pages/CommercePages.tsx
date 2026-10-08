import React, { useState } from 'react';
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
import { CATEGORY_TILES, formatCurrencyAmount } from '../data/catalogue';
import { ResilientImage } from '../components/ResilientImage';
import { ProductCard } from '../components/ProductCard';

export function CategoriesPage() {
  const { navigate, setActiveCategory, openAIWithPrompt } = useCommerce();

  const handleSelect = (slug: string) => {
    setActiveCategory(slug);
    navigate('/shop');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
            DEPARTMENT DIRECTORY
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Browse Novera Categories
          </h1>
        </div>
        <button
          type="button"
          onClick={() =>
            openAIWithPrompt('What product categories are available in the live Novera catalogue?')
          }
          className="py-2.5 px-4 rounded-xl bg-[#101828] border border-[#1E293B] hover:border-[#087F5B] text-xs font-semibold text-[#C8F75A] inline-flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask Novera AI for Live Department Inventory</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORY_TILES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleSelect(cat.slug)}
            className="group relative rounded-2xl overflow-hidden border border-[#1E293B] hover:border-[#334155] bg-[#101828] cursor-pointer aspect-[16/10] flex flex-col justify-end"
          >
            <div className="absolute inset-0">
              <ResilientImage
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/40 to-transparent" />
            </div>

            <div className="relative z-10 p-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-[#C8F75A] transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-[#CBD5E1] mt-1 max-w-md">{cat.description}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#101828]/90 border border-[#1E293B] group-hover:bg-[#087F5B] flex items-center justify-center text-white transition-colors">
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
            NOVERA BAG & REVIEW
          </p>
          <h1 className="font-display text-3xl font-bold text-white">Shopping Bag</h1>
        </div>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Empty Shopping Bag</span>
          </button>
        )}
      </div>

      {demoSubmitted && (
        <div className="p-6 rounded-2xl bg-[#101828] border border-[#087F5B] flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-[#C8F75A] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white">
              Demonstration Order Review Recorded (No Payment Processed)
            </h2>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              This is an explicit demonstration checkout state. Live payment gateways and card collection are disabled. To place an actual enquiry or get assistance with a Novera order, please use Novera AI.
            </p>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#101828] border border-[#1E293B] text-center max-w-lg mx-auto space-y-4">
          <ShoppingBag className="w-10 h-10 text-[#087F5B] mx-auto" />
          <h2 className="text-lg font-bold text-white">Your shopping bag is empty</h2>
          <p className="text-xs text-[#94A3B8]">
            Browse our departments or ask Novera AI to recommend products tailored to your budget.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="py-2.5 px-5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold"
            >
              Explore Products
            </button>
            <button
              type="button"
              onClick={() => openAIWithPrompt('Recommend products under my budget')}
              className="py-2.5 px-5 rounded-xl bg-[#0B0F17] border border-[#1E293B] text-[#C8F75A] text-xs font-semibold"
            >
              Ask Novera AI
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
                    className="w-24 h-20 rounded-xl overflow-hidden bg-[#18181B] shrink-0 cursor-pointer"
                  >
                    <ResilientImage
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8]">
                      {product.brand} · {product.category}
                    </div>
                    <h3
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="text-base font-semibold text-white hover:text-[#C8F75A] cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <div className="text-sm font-mono-tabular text-[#C8F75A] mt-1">
                      {formatCurrencyAmount(product.price, product.currency)} each
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
                      {formatCurrencyAmount(product.price * quantity, product.currency)}
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

          {/* Summary Card */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#101828] border border-[#1E293B] space-y-5">
            <h2 className="text-base font-bold text-white border-b border-[#1E293B] pb-3">
              Bag Summary (By Currency)
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

            <button
              type="button"
              onClick={() => {
                const summary = currencyEntries
                  .map(([curr, amt]) => `${formatCurrencyAmount(amt, curr)} (${curr})`)
                  .join(', ');
                openAIWithPrompt(
                  `Convert my shopping bag total of ${summary} to ${selectedMarket.name} (${selectedMarket.currency}).`
                );
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0B0F17] border border-[#1E293B] hover:border-[#087F5B] text-xs font-semibold text-[#C8F75A] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Convert Total to {selectedMarket.currency} via Novera AI</span>
            </button>

            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#1E293B] flex items-start gap-2.5 text-xs text-[#94A3B8]">
              <Info className="w-4 h-4 text-[#FFB547] shrink-0 mt-0.5" />
              <span>
                Demo checkout — payments not enabled. No card details are requested or processed.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setDemoSubmitted(true)}
              className="w-full py-3 px-5 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold transition-colors"
            >
              Simulate Demo Order Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function WishlistPage() {
  const { wishlistProducts, navigate, openAIWithPrompt } = useCommerce();

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#1E293B] pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
          SAVED FOR LATER
        </p>
        <h1 className="font-display text-3xl font-bold text-white">
          Saved Wishlist ({wishlistProducts.length})
        </h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#101828] border border-[#1E293B] text-center max-w-lg mx-auto space-y-4">
          <Heart className="w-10 h-10 text-[#087F5B] mx-auto" />
          <h2 className="text-lg font-bold text-white">No saved products yet</h2>
          <p className="text-xs text-[#94A3B8]">
            Tap the heart icon on any product card to save items for comparison.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="py-2.5 px-5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold"
            >
              Explore Products
            </button>
            <button
              type="button"
              onClick={() => openAIWithPrompt('Compare two laptops for me')}
              className="py-2.5 px-5 rounded-xl bg-[#0B0F17] border border-[#1E293B] text-[#C8F75A] text-xs font-semibold"
            >
              Compare with Novera AI
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          ORDER MANAGEMENT & SUPPORT
        </p>
        <h1 className="font-display text-3xl font-bold text-white">Orders</h1>
      </div>

      <div className="p-8 rounded-2xl bg-[#101828] border border-[#1E293B] max-w-2xl space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#0B0F17] border border-[#1E293B] flex items-center justify-center">
          <PackageCheck className="w-6 h-6 text-[#087F5B]" />
        </div>
        <h2 className="text-xl font-bold text-white">
          Demonstration Environment — Order Support via Novera AI
        </h2>
        <p className="text-sm text-[#CBD5E1] leading-relaxed">
          Live customer account authentication and payment order history are in demonstration mode. If you have an enquiry regarding an order, delivery timeline, or escalation, Novera AI is connected to our live customer support workflow.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => openAIWithPrompt('I need help with an order')}
            className="py-2.5 px-5 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8F75A]" />
            <span>Ask Novera AI: &ldquo;I need help with an order&rdquo;</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="py-2.5 px-5 rounded-xl bg-[#0B0F17] border border-[#1E293B] text-white text-xs font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
