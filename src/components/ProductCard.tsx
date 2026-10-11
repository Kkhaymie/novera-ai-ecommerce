import React from 'react';
import { NoveraProduct } from '../types/commerce';
import { formatCurrencyAmount } from '../data/catalogue';
import { useCommerce } from '../context/CommerceContext';
import { ResilientImage } from './ResilientImage';
import { AvailabilityBadge } from './AvailabilityBadge';

interface ProductCardProps {
  product: NoveraProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { navigate } = useCommerce();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      onClick={handleViewDetails}
      className="group relative flex flex-col h-full bg-[#101828] border border-[#1E293B] rounded-2xl overflow-hidden cursor-pointer novera-card-hover"
    >
      {/* 1:1 Consistent Square Image Container on Bright Neutral Surface (#F8FAFC) */}
      <div className="relative aspect-square w-full bg-[#F8FAFC] border-b border-[#1E293B] overflow-hidden flex items-center justify-center">
        <ResilientImage
          src={product.imageUrl}
          alt={product.name}
          category={product.category}
          brand={product.brand}
          colour={product.colour}
          productId={product.product_id}
          fallbackLabel={product.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Centralized Availability Badge (Renders ONLY for confirmed In Stock / Low Stock / Out of Stock) */}
        <AvailabilityBadge availability={product.availability} variant="card" />
      </div>

      {/* Clean, Minimal Card Body: Brand, Product Name, Price in NGN, One Clear Action */}
      <div className="flex flex-col flex-1 p-5 justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#94A3B8] truncate">
            {product.brand} · {product.category}
          </p>
          <h3 className="text-[16px] font-semibold text-[#F8FAFC] leading-snug line-clamp-2 group-hover:text-[#C8F75A] transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="pt-3 border-t border-[#1E293B]/80 flex items-center justify-between gap-3">
          <div>
            <span className="block text-lg font-bold text-white font-mono-tabular leading-none">
              {formatCurrencyAmount(product.price, 'NGN')}
            </span>
            <span className="text-[10px] text-[#64748B] font-medium">
              Price in NGN
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="py-2 px-3.5 rounded-lg bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A]"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
