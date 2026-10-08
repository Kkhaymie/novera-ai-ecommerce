import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useCommerce();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#101828] border border-[#087F5B] shadow-2xl text-white"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-[#C8F75A] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white">{toast.title}</p>
              {toast.detail && (
                <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">{toast.detail}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-[#94A3B8] hover:text-white shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
