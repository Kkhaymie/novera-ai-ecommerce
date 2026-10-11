import React, { useState } from 'react';
import {
  Sparkles,
  Truck,
  RotateCcw,
  ShieldCheck,
  HelpCircle,
  Globe,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { NOVERA_MARKETS } from '../data/catalogue';

type InfoVariant = 'help' | 'shipping' | 'returns' | 'about' | 'contact' | 'privacy' | 'terms';

interface InfoPolicyPageProps {
  variant: InfoVariant;
}

const OFFICIAL_FAQS = [
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery times depend on your country and location. In Nigeria, Lagos deliveries typically take 1–3 business days after order confirmation, other major Nigerian cities take 2–5 business days, and remote locations take 3–7 business days. In Ghana, South Africa, Kenya, Tanzania, and Benin Republic, major urban areas take approximately 2–5 business days, while remote areas may require additional time. Delivery estimates are not guaranteed.',
  },
  {
    question: 'Can I track my order?',
    answer:
      'Yes. Provide your order number and the support system can check the available tracking information. Novera AI only provides tracking information returned by the connected system and never fabricates tracking statuses.',
  },
  {
    question: 'Can I cancel my order?',
    answer:
      'Cancellation may be possible before dispatch. Once an order has been handed over to the courier or entered the delivery process, cancellation may no longer be possible.',
  },
  {
    question: 'Can I return my product?',
    answer:
      'Eligible customers should contact Novera support within 7 calendar days of delivery to initiate a return. Returned products should generally be unused, in their original condition and packaging, and accompanied by relevant accessories. Return eligibility is subject to review and is not automatically approved.',
  },
  {
    question: 'What should I do if my product arrives damaged?',
    answer:
      'Contact Novera support as soon as possible. Your case will be escalated for review, and you may be asked to provide photographs showing the product, the damage or defect, the packaging, and relevant labels or order information.',
  },
  {
    question: 'When will I receive my refund?',
    answer:
      'Refunds are processed after the relevant order or return has been reviewed and approved. Processing times depend on your country, original payment method, financial institution, and payment processor.',
  },
  {
    question: 'What payment methods does Novera accept?',
    answer:
      'Novera supports card and bank-transfer payments for eligible orders, subject to market availability. Never share sensitive authentication details such as OTPs, PINs, CVVs, passwords, full card numbers, or banking login credentials.',
  },
  {
    question: 'Can I speak to a human?',
    answer:
      'Yes. Customers can request assistance from a human support representative at any time. Complex, disputed, damaged-item, or unresolved cases are escalated to the human support team.',
  },
];

export function InfoPolicyPage({ variant }: InfoPolicyPageProps) {
  const { openAIWithPrompt } = useCommerce();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-[#1E293B] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
            Novera Ltd · Customer Support &amp; Policies
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            {variant === 'shipping'
              ? 'Delivery Information'
              : variant === 'returns'
                ? 'Returns, Refunds & Cancellations'
                : variant === 'about'
                  ? 'About Novera Ltd'
                  : 'Help Centre & Support Knowledge Base'}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => openAIWithPrompt('I want to speak to customer support.')}
          className="py-2.5 px-4 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold inline-flex items-center gap-2 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C8F75A]" />
          <span>Ask Novera AI Support</span>
        </button>
      </div>

      {/* Company Overview & Markets Served */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 p-6 rounded-2xl bg-[#101828] border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8F75A]">
            <Globe className="w-4 h-4" />
            <span>Company Information</span>
          </div>
          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            <strong className="text-white">Novera Ltd</strong> is a Nigerian online retail company providing consumer electronics, home appliances, smartphones, laptops, accessories, audio products, wearables, fashion, groceries, and lifestyle products across six African markets.
          </p>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Catalogue prices are listed in Nigerian Naira (NGN). When you request currency conversions into GHS, ZAR, KES, TZS, or XOF, Novera AI uses its connected currency conversion tool to provide estimates.
          </p>
        </div>

        <div className="md:col-span-5 p-6 rounded-2xl bg-[#101828] border border-[#1E293B] space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
            Supported Markets &amp; Currencies
          </h2>
          <ul className="divide-y divide-[#1E293B] text-xs">
            {NOVERA_MARKETS.map((m) => (
              <li key={m.code} className="py-2 flex items-center justify-between">
                <span className="text-white font-medium">{m.name}</span>
                <span className="font-mono-tabular text-[#C8F75A]">
                  {m.currency} ({m.symbol})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery Guidelines */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#101828] border border-[#1E293B] space-y-5">
        <div className="flex items-center gap-2.5">
          <Truck className="w-5 h-5 text-[#087F5B]" />
          <h2 className="text-lg font-bold text-white">Documented Delivery Guidelines</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#CBD5E1] leading-relaxed">
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#1E293B] space-y-2">
            <h3 className="text-sm font-semibold text-white">Nigeria (NGN)</h3>
            <ul className="space-y-1.5 text-[#94A3B8]">
              <li>• <strong className="text-white">Lagos:</strong> 1–3 business days after order confirmation.</li>
              <li>• <strong className="text-white">Other major Nigerian cities:</strong> 2–5 business days.</li>
              <li>• <strong className="text-white">Remote locations:</strong> 3–7 business days.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#1E293B] space-y-2">
            <h3 className="text-sm font-semibold text-white">
              Ghana, South Africa, Kenya, Tanzania &amp; Benin Republic
            </h3>
            <ul className="space-y-1.5 text-[#94A3B8]">
              <li>• <strong className="text-white">Major cities and urban areas:</strong> Approximately 2–5 business days after order confirmation.</li>
              <li>• <strong className="text-white">Remote or outlying areas:</strong> May require additional delivery time.</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-[#94A3B8]">
          Note: Delivery estimates are not guaranteed and may be affected by courier delays, public holidays, weather conditions, or customs requirements.
        </p>
      </section>

      {/* Returns, Refunds, Damaged Items & Cancellations */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#101828] border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#C8F75A]" />
            <h2 className="text-base font-bold text-white">Returns &amp; Refunds</h2>
          </div>
          <ul className="space-y-2 text-xs text-[#94A3B8] leading-relaxed">
            <li>
              • <strong className="text-white">7-Day Return Contact Window:</strong> Contact Novera support within 7 calendar days of delivery to initiate a return for an eligible product.
            </li>
            <li>
              • <strong className="text-white">Return Condition:</strong> Items should generally be unused, in their original condition and packaging, and include relevant accessories.
            </li>
            <li>
              • <strong className="text-white">Review &amp; Refunds:</strong> Return eligibility is subject to review. Refunds are processed after the return is reviewed and approved; processing times vary by payment method and financial institution.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-[#101828] border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
            <h2 className="text-base font-bold text-white">
              Damaged Items, Payments &amp; Security
            </h2>
          </div>
          <ul className="space-y-2 text-xs text-[#94A3B8] leading-relaxed">
            <li>
              • <strong className="text-white">Damaged or Defective Products:</strong> Contact support promptly. You may be asked to provide photographs of the product, defect, packaging, and order label for escalation.
            </li>
            <li>
              • <strong className="text-white">Order Cancellation:</strong> May be possible before dispatch. Once handed over to the courier, cancellation may no longer be possible.
            </li>
            <li>
              • <strong className="text-white">Payment Security:</strong> Novera supports card and bank-transfer payments for eligible orders. Never share OTPs, PINs, CVVs, passwords, full card numbers, or bank login credentials.
            </li>
          </ul>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#C8F75A]" />
          <h2 className="font-display text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-[#1E293B] rounded-2xl bg-[#101828] border border-[#1E293B] overflow-hidden">
          {OFFICIAL_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={faq.question} className="p-5">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left text-sm font-semibold text-white"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#94A3B8] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs text-[#CBD5E1] leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
