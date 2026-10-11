import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { formatCurrencyAmount } from '../data/catalogue';
import { ResilientImage } from '../components/ResilientImage';
import { ProductCard } from '../components/ProductCard';
import {
  AvailabilityBadge,
  getNormalizedAvailabilityStatus,
} from '../components/AvailabilityBadge';

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
    openAIWithPrompt,
    selectedMarket,
  } = useCommerce();

  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<'specs' | 'delivery' | null>('specs');

  const product = products.find(
    (p) => p.id.toLowerCase() === productId.toLowerCase()
  );

  if (!product) {
    return (
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-white">Product Not Found</h1>
        <p className="text-sm text-[#94A3B8]">
          We could not find product ID &ldquo;{productId}&rdquo; in the 178-product catalogue.
        </p>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="py-2.5 px-5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const saved = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort((a, b) => Number(Boolean(b.imageUrl)) - Number(Boolean(a.imageUrl)))
    .slice(0, 4);

  const normalizedAvailability = getNormalizedAvailabilityStatus(product.availability);
  const isReturnWindowEntry = product.warranty.toLowerCase().includes('return');

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>

        <div className="text-xs text-[#94A3B8]">
          <span>{product.category}</span>
          <span aria-hidden="true"> · </span>
          <span className="font-mono-tabular text-[#CBD5E1]">{product.product_id}</span>
        </div>
      </div>

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: 1:1 High-Definition Product Image on Bright Neutral Surface (#F8FAFC) */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#1E293B] aspect-square flex items-center justify-center">
            <ResilientImage
              src={product.imageUrl}
              alt={product.name}
              category={product.category}
              brand={product.brand}
              colour={product.colour}
              productId={product.product_id}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right: Clear Visual Hierarchy (Name, Price, Primary Action First) */}
        <div className="lg:col-span-6 bg-[#101828] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <span className="font-semibold uppercase tracking-wider text-[#CBD5E1]">
                {product.brand}
              </span>
              <span aria-hidden="true">·</span>
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">SKU: {product.product_id}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price & Confirmed Availability Summary */}
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-white">
                {formatCurrencyAmount(product.price, 'NGN')}
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">
                Price shown in NGN (₦) · Colour: <span className="text-white font-medium">{product.colour}</span>
              </p>
              {selectedMarket.currency !== 'NGN' && (
                <button
                  type="button"
                  onClick={() =>
                    openAIWithPrompt(
                      `Convert the price of ${product.name} (${product.price_ngn}) into ${selectedMarket.name} (${selectedMarket.currency}).`
                    )
                  }
                  className="mt-1.5 text-xs font-semibold text-[#C8F75A] hover:underline inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Convert to {selectedMarket.currency} with Novera AI</span>
                </button>
              )}
            </div>

            {normalizedAvailability && (
              <div className="text-left sm:text-right">
                <AvailabilityBadge
                  availability={product.availability}
                  variant="detail"
                  stockQuantity={product.stock_quantity}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            {product.description}
          </p>

          {/* Primary Actions: Add to Cart + Ask Novera AI */}
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
                <span className="px-4 text-sm font-mono-tabular font-semibold text-white">
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
                className="flex-1 h-11 px-6 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 novera-cta-glow whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-colors shrink-0 ${
                  saved
                    ? 'bg-[#087F5B] border-[#087F5B] text-white'
                    : 'bg-[#0B0F17] border-[#1E293B] text-[#CBD5E1] hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                openAIWithPrompt(
                  `Tell me about ${product.name} (Product ID: ${product.product_id}, priced at ${product.price_ngn}). Can you confirm its details or convert its price?`
                )
              }
              className="w-full py-3 px-4 rounded-xl bg-[#0B0F17] hover:bg-[#1E293B] border border-[#1E293B] text-[#C8F75A] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Novera AI About This Product</span>
            </button>
          </div>

          {/* Progressive Disclosure Accordions for Catalogue Details & Delivery */}
          <div className="divide-y divide-[#1E293B] border-t border-[#1E293B] pt-2">
            {/* Accordion 1: Product Attributes & Listed Warranty */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setOpenSection((prev) => (prev === 'specs' ? null : 'specs'))
                }
                className="w-full py-3.5 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-white"
              >
                <span>Product Details &amp; Listed Warranty</span>
                {openSection === 'specs' ? (
                  <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                )}
              </button>
              {openSection === 'specs' && (
                <dl className="pb-4 space-y-2 text-xs">
                  <div className="flex justify-between py-1">
                    <dt className="text-[#94A3B8]">Product ID / SKU</dt>
                    <dd className="font-mono-tabular text-white">{product.product_id}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-[#94A3B8]">Brand</dt>
                    <dd className="text-white">{product.brand}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-[#94A3B8]">Category</dt>
                    <dd className="text-white">{product.category}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-[#94A3B8]">Colour</dt>
                    <dd className="text-white">{product.colour}</dd>
                  </div>
                  {normalizedAvailability && (
                    <div className="flex justify-between py-1">
                      <dt className="text-[#94A3B8]">Status</dt>
                      <dd className="text-white">{product.availability}</dd>
                    </div>
                  )}
                  <div className="flex justify-between py-1">
                    <dt className="text-[#94A3B8]">
                      {isReturnWindowEntry ? 'Listed Return Window' : 'Listed Warranty'}
                    </dt>
                    <dd className="text-white">{product.warranty}</dd>
                  </div>
                </dl>
              )}
            </div>

            {/* Accordion 2: Delivery & Returns Summary */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setOpenSection((prev) => (prev === 'delivery' ? null : 'delivery'))
                }
                className="w-full py-3.5 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-white"
              >
                <span>Delivery &amp; Return Policy</span>
                {openSection === 'delivery' ? (
                  <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                )}
              </button>
              {openSection === 'delivery' && (
                <div className="pb-4 space-y-2 text-xs text-[#94A3B8] leading-relaxed">
                  <p>
                    <strong className="text-white">Delivery Available:</strong>{' '}
                    {product.delivery_available} (Subject to destination and order confirmation).
                  </p>
                  <p>
                    <strong className="text-white">General Delivery Estimates:</strong> Nigeria (Lagos: 1–3 business days; other major cities: 2–5 business days; remote areas: 3–7 business days). Ghana, South Africa, Kenya, Tanzania &amp; Benin Republic major urban areas: approx. 2–5 business days.
                  </p>
                  <p>
                    <strong className="text-white">Returns:</strong> Contact Novera support within 7 calendar days of delivery to request a return for an eligible unused item in original packaging. Subject to review.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Catalogue Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#1E293B] space-y-6">
          <h2 className="font-display text-2xl font-bold text-white">
            Related Products in {product.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
