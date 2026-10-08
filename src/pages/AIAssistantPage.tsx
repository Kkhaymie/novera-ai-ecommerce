import React from 'react';
import { Sparkles, Globe, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { NoveraAIChatPanel } from '../components/NoveraAIChatPanel';
import { useCommerce } from '../context/CommerceContext';
import { NOVERA_AI_SUGGESTED_PROMPTS } from '../data/catalogue';

export function AIAssistantPage() {
  const { sendChatMessage, selectedMarket } = useCommerce();

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Novera AI Capabilities & Quick Triggers */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C8F75A]">
              <Sparkles className="w-4 h-4" />
              <span>NOVERA AI — LIVE N8N MULTI-AGENT WORKFLOW</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Your Personal Shopping Intelligence.
            </h1>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Find products, compare options, explore prices, and get helpful shopping answers with Novera AI. Every message you send is processed in real time by Novera&apos;s production n8n workflow.
            </p>
          </div>

          {/* Prompt Starters */}
          <div className="p-5 rounded-2xl bg-[#101828] border border-[#1E293B] space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              Suggested Shopping Enquiries
            </h2>
            <div className="flex flex-wrap gap-2">
              {NOVERA_AI_SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendChatMessage(prompt)}
                  className="px-3 py-2 rounded-lg bg-[#0B0F17] hover:bg-[#087F5B] border border-[#1E293B] hover:border-[#087F5B] text-xs text-[#F8FAFC] transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Specialized Responsibilities */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#101828] border border-[#1E293B] flex items-start gap-3">
              <SlidersHorizontal className="w-4 h-4 text-[#C8F75A] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-semibold text-white">
                  Authoritative Catalogue & Comparisons
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Queries the official Novera Google Sheets catalogue for real-time product availability, specifications, and comparisons.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#101828] border border-[#1E293B] flex items-start gap-3">
              <Globe className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-semibold text-white">
                  Multi-Country Currency Conversion ({selectedMarket.currency})
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Converts product prices across NGN, GHS, ZAR, KES, TZS, and XOF on demand.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#101828] border border-[#1E293B] flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#C8F75A] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-semibold text-white">
                  Shipping, Returns & Customer Escalation
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Provides verified guidance from Novera&apos;s official policy documentation and assists with order support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Full Embedded Chat Interface */}
        <div className="lg:col-span-7">
          <NoveraAIChatPanel embedded />
        </div>
      </div>
    </div>
  );
}
