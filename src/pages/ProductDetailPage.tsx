import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Sparkles,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { formatCurrencyAmount } from '../data/catalogue';
import { ResilientImage } from '../components/ResilientImage';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  productId: string;
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const {
    products,
    navigate,
    addToCart,
    toggleWishlist,
    isInWishlist,
    selectedMarket,
    openAIWithPrompt,
  } = useCommerce();

  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-white">Product Not Found</h1>
        <p className="text-sm text-[#CBD5E1]">
          The requested product record could not be located in the local showcase.
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="py-2.5 px-5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold"
          >
            Return to Shop
          </button>
          <button
            type="button"
            onClick={() => openAIWithPrompt('Help me find a product in the live Novera catalogue')}
            className="py-2.5 px-5 rounded-xl bg-[#101828] border border-[#087F5B] text-[#C8F75A] text-xs font-semibold"
          >
            Ask Novera AI
          </button>
        </div>
      </div>
    );
  }

  const saved = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 lg:pb-16 space-y-16">
      {/* Breadcrumb Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#CBD5E1] hover:text-[#C8F75A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalogue</span>
        </button>

        <div className="text-xs text-[#CBD5E1]">
          <span>{product.category}</span>
          <span aria-hidden="true"> · </span>
          <span className="text-[#C8F75A] font-semibold">{product.brand}</span>
        </div>
      </div>

      {/* Main Contiguous Purchase Module (Sticky Gallery Left, Purchase Module Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Visual Gallery */}
        <div className="lg:col-span-7 lg:sticky lg:top-32">
          <div className="rounded-2xl overflow-hidden bg-[#101828] border border-[#087F5B]/50 aspect-[4/3] novera-card-glow">
            <ResilientImage
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Contiguous Purchase & Intelligence Module */}
        <div className="lg:col-span-5 bg-[#101828] border border-[#087F5B]/50 rounded-2xl p-6 sm:p-8 space-y-6 novera-card-glow">
          <div className="space-y-2">
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-1.5 text-xs text-[#CBD5E1]">
              <span className="uppercase tracking-wider font-bold text-[#C8F75A]">
                {product.brand}
              </span>
              <span aria-hidden="true">·</span>
              <span>{product.category}</span>
              {product.isSampleRecord && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#FFB547] font-semibold">Sample Showcase Record</span>
                </>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price & Regional Conversion */}
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#087F5B]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-2xl font-extrabold font-mono-tabular text-[#C8F75A]">
                {formatCurrencyAmount(product.price, product.currency)}
              </div>
              <div className="text-xs text-[#CBD5E1] mt-0.5">
                {product.stockStatus || 'Catalogue Listing'} · Base currency: {product.currency}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openAIWithPrompt(
                  `Convert ${formatCurrencyAmount(product.price, product.currency)} (${product.currency}) for "${product.name}" to ${selectedMarket.name} (${selectedMarket.currency}) and tell me if similar products exist in the live Novera catalogue.`
                )
              }
              className="py-2 px-3.5 rounded-lg bg-[#087F5B] hover:bg-[#099268] border border-[#C8F75A]/40 text-xs font-bold text-white inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8F75A]" />
              <span>Convert to {selectedMarket.currency}</span>
            </button>
          </div>

          <p className="text-sm text-[#F8FAFC]/90 leading-relaxed">
            {product.description}
          </p>

          {/* Verified Specifications Table */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-[#1E293B]">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C8F75A]">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Technical Specifications</span>
              </div>
              <dl className="divide-y divide-[#1E293B] border-y border-[#1E293B] text-xs">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="py-2.5 flex items-center justify-between gap-4">
                    <dt className="text-[#CBD5E1]">{spec.label}</dt>
                    <dd className="font-mono-tabular font-semibold text-white text-right">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Quantity & Primary Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center rounded-xl border border-[#1E293B] bg-[#0B0F17] h-11">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-full text-sm text-white hover:bg-[#1E293B] rounded-l-xl"
                >
                  -
                </button>
                <span className="px-4 text-sm font-mono-tabular font-bold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-full text-sm text-white hover:bg-[#1E293B] rounded-r-xl"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product, quantity)}
                className="flex-1 h-11 px-6 rounded-xl bg-[#C8F75A] hover:bg-[#d4fa78] text-[#101828] text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-colors shrink-0 ${
                  saved
                    ? 'bg-[#087F5B] border-[#C8F75A] text-white'
                    : 'bg-[#0B0F17] border-[#1E293B] text-[#CBD5E1] hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Dedicated Novera AI Product Assistance CTA */}
            <button
              type="button"
              onClick={() =>
                openAIWithPrompt(
                  `Tell me more about "${product.name}" or recommend comparable alternatives in the live Novera catalogue.`
                )
              }
              className="w-full py-3 px-4 rounded-xl bg-[#087F5B] hover:bg-[#099268] border border-[#C8F75A]/40 text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#C8F75A]" />
              <span>Ask Novera AI to Compare or Check Live Inventory</span>
            </button>
          </div>

          {product.isSampleRecord && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0B0F17] border border-[#1E293B] text-[11px] text-[#CBD5E1]">
              <Info className="w-4 h-4 text-[#FFB547] shrink-0 mt-0.5" />
              <span>
                This item is a clearly labeled sample showcase record. Use the button above to query Novera AI for authoritative live Google Sheets inventory and policy details.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#1E293B] space-y-6">
          <h2 className="font-display text-2xl font-bold text-white">
            More in {product.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#101828]/95 backdrop-blur-md border-t border-[#087F5B]/60 px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">{product.name}</p>
          <p className="text-sm font-extrabold font-mono-tabular text-[#C8F75A]">
            {formatCurrencyAmount(product.price * quantity, product.currency)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, quantity)}
          className="py-2.5 px-5 rounded-xl bg-[#C8F75A] text-[#101828] text-xs font-extrabold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
