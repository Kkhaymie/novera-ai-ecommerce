import React from 'react';

export type NormalizedAvailabilityStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | null;

/**
 * Normalizes a product's `availability` string.
 * When `availability` is blank, null, undefined, or equals "Not confirmed"
 * (after case-insensitive whitespace normalization), returns `null` so that
 * NO availability badge is rendered on the storefront.
 * Never fabricates "In Stock" for an unconfirmed status.
 */
export function getNormalizedAvailabilityStatus(
  availability?: string | null
): NormalizedAvailabilityStatus {
  if (!availability) return null;
  const normalized = availability.trim().replace(/\s+/g, ' ').toLowerCase();

  if (
    !normalized ||
    normalized === 'not confirmed' ||
    normalized === 'availability: not confirmed' ||
    normalized === 'availability not confirmed'
  ) {
    return null;
  }

  if (normalized === 'in stock') return 'in_stock';
  if (normalized === 'low stock') return 'low_stock';
  if (normalized === 'out of stock') return 'out_of_stock';

  return null;
}

interface AvailabilityBadgeProps {
  availability?: string | null;
  variant?: 'card' | 'detail';
  stockQuantity?: number;
}

/**
 * Reusable centralized AvailabilityBadge component.
 * Renders a badge ONLY for confirmed statuses ("In Stock", "Low Stock", "Out of Stock").
 * Renders nothing (`null`) when availability is "Not confirmed" or blank, leaving no empty container.
 */
export function AvailabilityBadge({
  availability,
  variant = 'card',
  stockQuantity,
}: AvailabilityBadgeProps) {
  const status = getNormalizedAvailabilityStatus(availability);

  if (!status) {
    return null;
  }

  if (variant === 'detail') {
    if (status === 'in_stock') {
      return (
        <span className="text-xs font-semibold text-[#C8F75A]">
          In Stock{typeof stockQuantity === 'number' ? ` (${stockQuantity} units listed)` : ''}
        </span>
      );
    }
    if (status === 'low_stock') {
      return (
        <span className="text-xs font-semibold text-[#FFB547]">
          Low Stock{typeof stockQuantity === 'number' ? ` (${stockQuantity} units listed)` : ''}
        </span>
      );
    }
    return (
      <span className="text-xs font-semibold text-rose-400">
        Out of Stock
      </span>
    );
  }

  // Default: 'card' variant positioned over the top-left of the product image stage
  if (status === 'in_stock') {
    return (
      <span className="absolute top-3 left-3 z-20 text-[11px] font-semibold text-[#0F172A] bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-[#CBD5E1] shadow-xs">
        In Stock
      </span>
    );
  }

  if (status === 'low_stock') {
    return (
      <span className="absolute top-3 left-3 z-20 text-[11px] font-semibold text-[#92400E] bg-[#FEF3C7]/95 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-[#F59E0B]/40 shadow-xs">
        Low Stock
      </span>
    );
  }

  return (
    <span className="absolute top-3 left-3 z-20 text-[11px] font-semibold text-rose-900 bg-rose-100/95 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-rose-300 shadow-xs">
      Out of Stock
    </span>
  );
}
