import React from 'react';
import { Heart, ShoppingBag, Sparkles, ArrowUpRight } from 'lucide-react';
import { NoveraProduct } from '../types/commerce';
import { formatCurrencyAmount } from '../data/catalogue';
import { useCommerce } from '../context/CommerceContext';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: NoveraProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    navigate,
    addToCart,
    toggleWishlist,
    isInWishlist,
    selectedMarket,
    openAIWithPrompt,
  } = useCommerce();

  const saved = isInWishlist(product.id);
  const needsConversion = selectedMarket.currency !== product.currency;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article className="group relative flex flex-col bg-[#101828] border border-[#087F5B]/35 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 novera-card-glow">
      {/* Top Emerald/Lime Luminous Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#087F5B] via-[#C8F75A] to-[#087F5B] opacity-75 group-hover:opacity-100 transition-opacity" />

      {/* Image Container (70% visual weight) */}
      <div
        onClick={handleCardClick}
        className="relative aspect-[4/3] w-full bg-[#18181B] overflow-hidden cursor-pointer"
      >
        <ResilientImage
          src={product.imageUrl}
          alt={product.name}
          fallbackLabel={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Wishlist Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className={`absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center transition-colors backdrop-blur-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A] ${
            saved
              ? 'bg-[#C8F75A] border-[#C8F75A] text-[#101828]'
              : 'bg-[#0B0F17]/80 border-white/15 text-[#F8FAFC] hover:border-[#C8F75A] hover:text-[#C8F75A]'
          }`}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 justify-between gap-4">
        <div>
          {/* Clean Unboxed Metadata with typographic separator (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-[#CBD5E1] mb-1.5 truncate">
            <span className="uppercase tracking-wider font-bold text-[#C8F75A]">
              {product.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
            {product.isSampleRecord && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#FFB547] font-medium">Sample Showcase</span>
              </>
            )}
          </div>

          <h3
            onClick={handleCardClick}
            className="text-[17px] font-bold text-white leading-snug line-clamp-2 cursor-pointer group-hover:text-[#C8F75A] transition-colors"
          >
            {product.name}
          </h3>
        </div>

        <div className="pt-3.5 border-t border-[#1E293B] flex flex-col gap-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <div className="text-xl font-bold text-[#C8F75A] font-mono-tabular">
                {formatCurrencyAmount(product.price, product.currency)}
              </div>
              <div className="text-xs text-[#CBD5E1] mt-0.5">
                {product.stockStatus || 'Catalogue Record'}
              </div>
            </div>

            {needsConversion && (
              <button
                type="button"
                onClick={() =>
                  openAIWithPrompt(
                    `Convert ${formatCurrencyAmount(product.price, product.currency)} (${product.currency}) for "${product.name}" to ${selectedMarket.name} (${selectedMarket.currency}).`
                  )
                }
                className="inline-flex items-center gap-1 text-xs font-bold text-[#C8F75A] hover:underline whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Convert to {selectedMarket.currency}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#087F5B] hover:bg-[#099268] border border-[#C8F75A]/30 text-white text-xs font-bold transition-colors whitespace-nowrap shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C8F75A]" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleCardClick}
              aria-label={`View details for ${product.name}`}
              className="py-2.5 px-3.5 rounded-xl bg-[#0B0F17] border border-[#1E293B] hover:border-[#C8F75A] text-[#F8FAFC] hover:text-[#C8F75A] text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A]"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
