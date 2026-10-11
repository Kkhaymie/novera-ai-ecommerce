import React, { useState } from 'react';
import { NOVERA_PRODUCT_ASSET_MANIFEST } from '../data/catalogue';

interface ResilientImageProps {
  src?: string;
  alt: string;
  category?: string;
  brand?: string;
  colour?: string;
  productId?: string;
  className?: string;
  fallbackLabel?: string;
  compact?: boolean;
}

/**
 * ResilientImage Component for Novera AI.
 *
 * Resolves each product image by `productId` via `NOVERA_PRODUCT_ASSET_MANIFEST`:
 *  1. When a valid raster image asset exists (`image_src`), renders the high-resolution
 *     product photograph or studio render on a bright neutral surface (#FFFFFF, #F8FAFC, #F3F5F7).
 *  2. When a product image is missing (`image_src: null`), renders a clean, minimal neutral
 *     temporary placeholder on `#F3F5F7` showing only the brand and product name—with ZERO
 *     internal asset-management or debug labels ("Verified product photograph pending acquisition",
 *     "Asset: missing", camera icons, or internal image type strings).
 */
export function ResilientImage({
  src,
  alt,
  category,
  brand,
  colour,
  productId,
  className = 'w-full h-full object-contain',
  fallbackLabel,
  compact = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  const manifestEntry = productId ? NOVERA_PRODUCT_ASSET_MANIFEST[productId] : undefined;
  const resolvedSrc = src || manifestEntry?.image_src || undefined;
  const stageBg = manifestEntry?.stage_background || '#F8FAFC';

  // 1. Render actual raster product photograph / studio render
  if (resolvedSrc && !hasError) {
    return (
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#F8FAFC]"
        style={{ backgroundColor: stageBg }}
      >
        <img
          src={resolvedSrc}
          alt={manifestEntry?.alt_text || alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={className}
        />
      </div>
    );
  }

  // 2. Clean, quiet neutral temporary placeholder when image asset is not yet supplied
  if (compact) {
    return (
      <div
        className="relative w-full h-full flex items-center justify-center bg-[#F3F5F7] text-[#334155] p-1.5 text-center select-none"
        role="img"
        aria-label={alt}
      >
        <span className="text-[10px] font-semibold tracking-tight text-[#475569] line-clamp-2 leading-tight">
          {brand || (fallbackLabel || alt).slice(0, 12)}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center bg-[#F3F5F7] text-[#0F172A] p-6 text-center select-none overflow-hidden"
      role="img"
      aria-label={alt}
    >
      <div className="max-w-[220px] space-y-2">
        {brand && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#087F5B]">
            {brand}
          </p>
        )}
        <p className="text-sm font-semibold text-[#0F172A] line-clamp-3 leading-snug">
          {fallbackLabel || alt}
        </p>
        {(colour || category) && (
          <p className="text-xs text-[#64748B]">
            {[colour, category].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </div>
  );
}
