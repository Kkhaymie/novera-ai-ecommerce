import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Info } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { formatCurrencyAmount } from '../data/catalogue';
import { ResilientImage } from './ResilientImage';

export function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotalsByCurrency,
    navigate,
    selectedMarket,
    openAIWithPrompt,
  } = useCommerce();

  if (!isCartDrawerOpen) return null;

  const currencyEntries = Object.entries(cartSubtotalsByCurrency);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div
        className="fixed inset-0"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md bg-[#101828] border-l border-[#1E293B] h-full flex flex-col justify-between shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#087F5B]" />
            <h2 className="text-lg font-bold text-white">Shopping Bag</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close shopping bag"
            className="w-9 h-9 rounded-lg border border-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-[#0B0F17] border border-[#1E293B] flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-[#64748B]" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">
                Your shopping bag is empty
              </h3>
              <p className="text-xs text-[#94A3B8] max-w-xs mb-6">
                Explore curated electronics, computing, and home essentials or ask Novera AI for personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold transition-colors"
                >
                  Explore Products
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    openAIWithPrompt('Recommend products for me');
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#0B0F17] border border-[#1E293B] hover:border-[#334155] text-[#C8F75A] text-xs font-semibold transition-colors"
                >
                  Ask Novera AI
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-2 border-b border-[#1E293B]">
                <span>{cart.length} distinct item(s)</span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[#94A3B8] hover:text-rose-400 inline-flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Empty bag</span>
                </button>
              </div>

              <div className="space-y-4">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 rounded-xl bg-[#0B0F17] border border-[#1E293B]"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#18181B]">
                      <ResilientImage
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] text-[#94A3B8] truncate">
                          {product.brand} · {product.category}
                        </div>
                        <h4 className="text-sm font-semibold text-white truncate">
                          {product.name}
                        </h4>
                        <div className="text-xs font-mono-tabular text-[#C8F75A] mt-0.5">
                          {formatCurrencyAmount(product.price * quantity, product.currency)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center rounded-lg border border-[#1E293B] bg-[#101828]">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(product.id, quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center text-xs text-white hover:bg-[#1E293B]"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-mono-tabular text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(product.id, quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center text-xs text-white hover:bg-[#1E293B]"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="text-xs text-[#94A3B8] hover:text-rose-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#1E293B] bg-[#0B0F17] space-y-4">
            <div className="space-y-1.5">
              {currencyEntries.map(([currency, subtotal]) => (
                <div key={currency} className="flex items-center justify-between text-sm">
                  <span className="text-[#94A3B8]">Subtotal ({currency})</span>
                  <span className="text-base font-bold font-mono-tabular text-white">
                    {formatCurrencyAmount(subtotal, currency)}
                  </span>
                </div>
              ))}
            </div>

            {selectedMarket.currency !== 'NGN' && (
              <button
                type="button"
                onClick={() => {
                  const summary = currencyEntries
                    .map(([curr, amt]) => `${formatCurrencyAmount(amt, curr)} (${curr})`)
                    .join(', ');
                  setIsCartDrawerOpen(false);
                  openAIWithPrompt(
                    `Please convert my cart subtotal of ${summary} into ${selectedMarket.name} (${selectedMarket.currency}).`
                  );
                }}
                className="w-full py-2 px-3 rounded-lg bg-[#101828] border border-[#1E293B] hover:border-[#087F5B] text-xs text-[#C8F75A] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Convert subtotal to {selectedMarket.currency} with Novera AI</span>
              </button>
            )}

            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#101828] border border-[#1E293B] text-[11px] text-[#94A3B8]">
              <Info className="w-4 h-4 text-[#FFB547] shrink-0 mt-0.5" />
              <span>
                Demo checkout — live payment processing is not enabled. No card details are collected.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="py-2.5 px-4 rounded-lg border border-[#1E293B] hover:border-[#334155] text-white text-xs font-semibold transition-colors"
              >
                View Full Bag
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="py-2.5 px-4 rounded-lg bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Demo Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
