import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Trash2,
  Maximize2,
  Loader2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { NOVERA_AI_SUGGESTED_PROMPTS, formatCurrencyAmount } from '../data/catalogue';
import { SafeMarkdown } from './SafeMarkdown';
import { getNormalizedAvailabilityStatus } from './AvailabilityBadge';

interface NoveraAIChatPanelProps {
  embedded?: boolean;
}

export function NoveraAIChatPanel({ embedded = false }: NoveraAIChatPanelProps) {
  const {
    products,
    chatMessages,
    isChatOpen,
    setIsChatOpen,
    isSendingChat,
    sendChatMessage,
    retryFailedMessage,
    clearChatHistory,
    selectedMarket,
    navigate,
  } = useCommerce();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isSendingChat]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isSendingChat) return;
    const messageToSend = input;
    setInput('');
    sendChatMessage(messageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Detect any unconfirmed showcase records (NG0131–NG0178) mentioned in an assistant reply
  const unconfirmedProductsByName = useMemo(() => {
    return products.filter((p) => p.isUnconfirmedShowcaseRecord);
  }, [products]);

  const findReferencedUnconfirmedProducts = (text: string) => {
    if (!text) return [];
    const lower = text.toLowerCase();
    return unconfirmedProductsByName.filter((p) => {
      if (lower.includes(p.product_id.toLowerCase())) return true;
      // Match significant product name prefix (first 3 words) or full name
      const words = p.name.toLowerCase().split(/\s+/).slice(0, 3).join(' ');
      return words.length > 8 && lower.includes(words);
    });
  };

  // Discreet Floating Chat Launcher (collapsed by default)
  if (!embedded && !isChatOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open Novera AI Shopping Assistant"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#101828] hover:bg-[#087F5B] text-white text-xs font-semibold novera-ai-halo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F75A]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C8F75A]" />
          <span>Novera AI</span>
        </button>
      </div>
    );
  }

  const containerClasses = embedded
    ? 'w-full bg-[#101828] border border-[#1E293B] rounded-2xl flex flex-col h-[660px] overflow-hidden shadow-2xl'
    : 'fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[560px] max-h-[82vh] bg-[#101828] border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden shadow-2xl';

  return (
    <section className={containerClasses} aria-label="Novera AI Shopping Assistant">
      {/* Header */}
      <div className="px-4 py-3.5 bg-[#0B0F17] border-b border-[#1E293B] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#087F5B]/20 border border-[#087F5B] flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#C8F75A]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs font-bold text-white truncate">Novera AI</h2>
            <p className="text-[11px] text-[#94A3B8] truncate">
              Market: {selectedMarket.name} ({selectedMarket.currency}) · Base prices in NGN
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={clearChatHistory}
            title="Clear chat history"
            aria-label="Clear chat history"
            className="w-7 h-7 rounded-lg border border-[#1E293B] hover:border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {!embedded && (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsChatOpen(false);
                  navigate('/ai-assistant');
                }}
                title="Expand Novera AI"
                aria-label="Expand Novera AI"
                className="w-7 h-7 rounded-lg border border-[#1E293B] hover:border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                title="Minimize chat"
                aria-label="Minimize chat"
                className="w-7 h-7 rounded-lg border border-[#1E293B] hover:border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Conversation Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          const referencedUnconfirmed = !isUser
            ? findReferencedUnconfirmedProducts(msg.content)
            : [];

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#087F5B] text-white'
                    : msg.isError
                      ? 'bg-rose-950/50 border border-rose-500/40 text-rose-200'
                      : 'bg-[#0B0F17] border border-[#1E293B] text-[#F8FAFC]'
                }`}
              >
                {isUser || msg.isError ? (
                  <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                ) : (
                  <SafeMarkdown content={msg.content} />
                )}

                {msg.products && msg.products.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#1E293B] space-y-2">
                    {msg.products.map((prod, idx) => {
                      const matchedCatItem = products.find(
                        (p) =>
                          (prod.id && p.id.toLowerCase() === prod.id.toLowerCase()) ||
                          p.name.toLowerCase() === prod.name.toLowerCase()
                      );
                      const confirmedStatus = matchedCatItem
                        ? getNormalizedAvailabilityStatus(matchedCatItem.availability)
                        : null;

                      return (
                        <div
                          key={prod.id || `${prod.name}-${idx}`}
                          onClick={() => {
                            if (matchedCatItem) {
                              navigate(`/product/${matchedCatItem.id}`);
                            }
                          }}
                          className={`p-2.5 rounded-lg bg-[#101828] border border-[#1E293B] flex items-center gap-3 ${
                            matchedCatItem ? 'cursor-pointer hover:border-[#087F5B]' : ''
                          }`}
                        >
                          {matchedCatItem?.imageUrl && (
                            <div className="w-11 h-11 rounded-md overflow-hidden bg-[#F8FAFC] border border-[#CBD5E1] shrink-0 flex items-center justify-center">
                              <img
                                src={matchedCatItem.imageUrl}
                                alt={matchedCatItem.name}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                            <div className="flex items-center justify-between gap-2 text-[10px] text-[#94A3B8]">
                              <span className="truncate">
                                {[prod.brand || matchedCatItem?.brand, prod.category || matchedCatItem?.category]
                                  .filter(Boolean)
                                  .join(' · ')}
                              </span>
                              {matchedCatItem && confirmedStatus && (
                                <span
                                  className={
                                    confirmedStatus === 'low_stock'
                                      ? 'text-[#FFB547] shrink-0'
                                      : 'text-[#C8F75A] shrink-0'
                                  }
                                >
                                  {matchedCatItem.availability}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-semibold text-white truncate">
                              {prod.name}
                            </div>
                            {prod.price !== undefined && (
                              <div className="text-xs font-mono-tabular text-[#C8F75A] font-semibold">
                                {typeof prod.price === 'number'
                                  ? formatCurrencyAmount(prod.price, prod.currency || 'NGN')
                                  : String(prod.price)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {msg.isError && msg.originalPrompt && (
                  <div className="mt-2.5 pt-2 border-t border-rose-500/30 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] text-rose-300">
                      <AlertCircle className="w-3 h-3" />
                      <span>Temporary connection issue</span>
                    </span>
                    <button
                      type="button"
                      disabled={isSendingChat}
                      onClick={() => retryFailedMessage(msg.id, msg.originalPrompt!)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/25 hover:bg-rose-500/40 text-white text-[11px] font-semibold transition-colors disabled:opacity-50"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Retry</span>
                    </button>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-[#64748B] mt-1 px-1">
                {isUser ? 'You' : 'Novera AI'}
              </span>
            </div>
          );
        })}

        {isSendingChat && (
          <div className="flex items-start" role="status" aria-live="polite">
            <div className="bg-[#0B0F17] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs text-[#CBD5E1] flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 text-[#C8F75A] animate-spin" />
              <span>Novera AI is responding...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Minimal Suggested Prompts */}
      <div className="px-3.5 py-2 bg-[#0B0F17]/90 border-t border-[#1E293B]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {NOVERA_AI_SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              disabled={isSendingChat}
              onClick={() => sendChatMessage(prompt)}
              className="px-2.5 py-1 rounded-md bg-[#101828] hover:bg-[#1E293B] border border-[#1E293B] text-[11px] text-[#CBD5E1] hover:text-white transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box with Enter-to-Send & Multiline Shift+Enter */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-[#0B0F17] border-t border-[#1E293B] flex items-end gap-2"
      >
        <label
          htmlFor={embedded ? 'novera-ai-input-page' : 'novera-ai-input-drawer'}
          className="sr-only"
        >
          Ask Novera AI a question
        </label>
        <textarea
          id={embedded ? 'novera-ai-input-page' : 'novera-ai-input-drawer'}
          rows={1}
          value={input}
          disabled={isSendingChat}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about products, prices, or policies..."
          className="flex-1 bg-[#101828] border border-[#1E293B] focus:border-[#087F5B] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none resize-none max-h-24"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSendingChat}
          aria-label="Send message"
          className="h-9 px-3.5 rounded-xl bg-[#087F5B] hover:bg-[#099268] disabled:opacity-40 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shrink-0"
        >
          <span>{isSendingChat ? 'Sending...' : 'Send'}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </section>
  );
}
