import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#101828] via-[#132238] to-[#0B0F17] text-[#94A3B8] p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Package className="w-8 h-8 text-[#087F5B] mb-2 opacity-80" />
        <span className="text-xs font-medium text-[#F8FAFC] line-clamp-2 max-w-[18ch]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
