import React from 'react';
import { Sparkles, Globe, ShieldAlert, HelpCircle, MessageSquare } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { NOVERA_MARKETS } from '../data/catalogue';

type InfoVariant = 'help' | 'shipping' | 'returns' | 'about' | 'contact' | 'privacy' | 'terms';

interface InfoPolicyPageProps {
  variant: InfoVariant;
}

export function InfoPolicyPage({ variant }: InfoPolicyPageProps) {
  const { openAIWithPrompt, navigate } = useCommerce();

  if (variant === 'about') {
    return (
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="border-b border-[#1E293B] pb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
            COMPANY PROFILE
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">About NOVERA</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4 text-sm text-[#CBD5E1] leading-relaxed">
            <p>
              <strong className="text-white">NOVERA</strong> is a multi-country Pan-African e-commerce marketplace headquartered in Nigeria, operating across six key African markets: Nigeria (NGN), Ghana (GHS), South Africa (ZAR), Kenya (KES), Tanzania (TZS), and Benin Republic (XOF).
            </p>
            <p>
              Our platform combines curated product discovery with <strong className="text-white">Novera AI</strong> — our personal shopping intelligence connected to a live multi-agent n8n backend that assists shoppers with product discovery, specification comparisons, currency conversions, and verified customer support.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#101828] border border-[#1E293B] space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8F75A]">
              <Globe className="w-4 h-4" />
              <span>Countries of Operation</span>
            </div>
            <ul className="space-y-2 text-xs">
              {NOVERA_MARKETS.map((m) => (
                <li
                  key={m.code}
                  className="flex items-center justify-between py-2 border-b border-[#1E293B] last:border-0"
                >
                  <span className="text-white font-medium">{m.name}</span>
                  <span className="font-mono-tabular text-[#94A3B8]">
                    {m.currency} ({m.symbol})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const pageConfig: Record<
    Exclude<InfoVariant, 'about'>,
    {
      kicker: string;
      title: string;
      summary: string;
      aiPrompt: string;
      aiButtonLabel: string;
    }
  > = {
    help: {
      kicker: 'CUSTOMER ASSISTANCE',
      title: 'Shopping Help & Support Center',
      summary:
        'Novera AI handles product discovery, recommendations, technical comparisons, pricing conversions across our 6 operating countries, shipping enquiries, return guidance, and human support escalation.',
      aiPrompt: 'How can Novera AI help me shop or resolve an issue today?',
      aiButtonLabel: 'Ask Novera AI for Assistance',
    },
    shipping: {
      kicker: 'DELIVERY & LOGISTICS',
      title: 'Shipping Information',
      summary:
        'Official Novera shipping policies and delivery timelines are maintained in our verified policy document and served dynamically through our connected n8n knowledge base. To prevent displaying unverified static shipping terms, click below to query live shipping rules for your country.',
      aiPrompt: "What is Novera's shipping and delivery policy for my country?",
      aiButtonLabel: 'Ask Novera AI for Verified Shipping Policy',
    },
    returns: {
      kicker: 'RETURNS & REFUNDS',
      title: 'Returns & Refund Guidance',
      summary:
        'Official Novera return eligibility, refund timelines, and escalation procedures are governed by our verified policy reference. Query Novera AI below to receive authoritative return instructions directly from the live workflow.',
      aiPrompt: "What is Novera's return and refund policy?",
      aiButtonLabel: "Ask Novera AI: What is Novera's return policy?",
    },
    contact: {
      kicker: 'DIRECT ESCALATION',
      title: 'Contact & Human Support Escalation',
      summary:
        'We do not publish unverified telephone numbers or social links. Novera AI handles immediate customer support and coordinates human support escalation through our connected n8n workflow.',
      aiPrompt: 'I need customer support and human escalation assistance.',
      aiButtonLabel: 'Start Support Conversation with Novera AI',
    },
    privacy: {
      kicker: 'GOVERNANCE & DATA',
      title: 'Privacy Information',
      summary:
        'Official Novera privacy and data handling policies are maintained in our verified Google Docs policy repository. Local cart, wishlist, and country preferences are stored in your browser storage, and chat enquiries are transmitted securely to our n8n AI workflow.',
      aiPrompt: "Can you share Novera's official privacy and data policy details?",
      aiButtonLabel: 'Consult Novera AI on Policy Details',
    },
    terms: {
      kicker: 'GOVERNANCE & TERMS',
      title: 'Terms of Service Information',
      summary:
        'Official Novera terms of service are governed by our verified policy reference document. We do not publish fabricated legal boilerplate. You can query Novera AI for verified shopping terms and conditions at any time.',
      aiPrompt: "What are Novera's official shopping terms and conditions?",
      aiButtonLabel: 'Ask Novera AI for Verified Terms',
    },
  };

  const current = pageConfig[variant];

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#1E293B] pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
          {current.kicker}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{current.title}</h1>
      </div>

      <div className="p-8 rounded-2xl bg-[#101828] border border-[#1E293B] max-w-3xl space-y-6">
        <div className="flex items-start gap-3.5">
          {variant === 'help' || variant === 'contact' ? (
            <HelpCircle className="w-6 h-6 text-[#C8F75A] shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-6 h-6 text-[#FFB547] shrink-0 mt-0.5" />
          )}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">
              Authoritative Policy & Support via Connected Novera AI
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">{current.summary}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => openAIWithPrompt(current.aiPrompt)}
            className="py-3 px-5 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#C8F75A]" />
            <span>{current.aiButtonLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/ai-assistant')}
            className="py-3 px-5 rounded-xl bg-[#0B0F17] border border-[#1E293B] hover:border-[#334155] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#087F5B]" />
            <span>Open Full Novera AI Workspace</span>
          </button>
        </div>
      </div>
    </div>
  );
}
