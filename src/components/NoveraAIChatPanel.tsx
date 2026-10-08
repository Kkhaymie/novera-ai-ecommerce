import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Trash2,
  Maximize2,
  Loader2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { NOVERA_AI_SUGGESTED_PROMPTS, formatCurrencyAmount } from '../data/catalogue';

interface NoveraAIChatPanelProps {
  embedded?: boolean;
}

export function NoveraAIChatPanel({ embedded = false }: NoveraAIChatPanelProps) {
  const {
    chatMessages,
    isChatOpen,
    setIsChatOpen,
    isSendingChat,
    sendChatMessage,
    clearChatHistory,
    selectedMarket,
    navigate,
  } = useCommerce();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isSendingChat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSendingChat) return;
    const messageToSend = input;
    setInput('');
    sendChatMessage(messageToSend);
  };

  // Floating Launcher when closed (only for non-embedded widget)
  if (!embedded && !isChatOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open Novera AI Shopping Assistant"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#087F5B] hover:bg-[#099268] text-white shadow-2xl border border-[#C8F75A]/30 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4 text-[#C8F75A]" />
          <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
            Novera AI
          </span>
        </button>
      </div>
    );
  }

  const containerClasses = embedded
    ? 'w-full bg-[#101828] border border-[#1E293B] rounded-2xl flex flex-col h-[680px] overflow-hidden shadow-2xl'
    : 'fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[430px] h-[600px] max-h-[82vh] bg-[#101828] border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden shadow-2xl';

  return (
    <section className={containerClasses} aria-label="Novera AI Shopping Intelligence">
      {/* Header */}
      <div className="px-5 py-4 bg-[#0B0F17] border-b border-[#1E293B] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#087F5B]/20 border border-[#087F5B] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#C8F75A]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white truncate">Novera AI</h2>
            <p className="text-[11px] text-[#94A3B8] truncate">
              Your Personal Shopping Intelligence · {selectedMarket.name} ({selectedMarket.currency})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={clearChatHistory}
            title="Clear chat history"
            aria-label="Clear chat history"
            className="w-8 h-8 rounded-lg border border-[#1E293B] hover:border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
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
                title="Open full Novera AI page"
                aria-label="Open full Novera AI page"
                className="w-8 h-8 rounded-lg border border-[#1E293B] hover:border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                title="Close chat panel"
                aria-label="Close chat panel"
                className="w-8 h-8 rounded-lg border border-[#1E293B] hover:border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Messages Conversation Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {chatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#087F5B] text-white'
                    : msg.isError
                      ? 'bg-rose-950/50 border border-rose-500/40 text-rose-200'
                      : 'bg-[#0B0F17] border border-[#1E293B] text-[#F8FAFC]'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">{msg.content}</div>

                {/* Structured Product Cards if returned by n8n */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#1E293B] space-y-2.5">
                    {msg.products.map((prod, idx) => (
                      <div
                        key={prod.id || `${prod.name}-${idx}`}
                        className="p-3 rounded-lg bg-[#101828] border border-[#1E293B] flex flex-col gap-1"
                      >
                        <div className="text-[11px] text-[#94A3B8]">
                          {[prod.brand, prod.category].filter(Boolean).join(' · ') ||
                            'Novera Catalogue Item'}
                        </div>
                        <div className="text-xs font-semibold text-white">{prod.name}</div>
                        {prod.price !== undefined && (
                          <div className="text-xs font-mono-tabular text-[#C8F75A] font-semibold">
                            {typeof prod.price === 'number'
                              ? formatCurrencyAmount(prod.price, prod.currency || 'NGN')
                              : `${prod.currency ? prod.currency + ' ' : ''}${prod.price}`}
                          </div>
                        )}
                        {prod.description && (
                          <p className="text-xs text-[#94A3B8] line-clamp-2 mt-0.5">
                            {prod.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Retry Action on Error */}
                {msg.isError && msg.originalPrompt && (
                  <div className="mt-3 pt-2 border-t border-rose-500/30 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-xs text-rose-300">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Delivery failed</span>
                    </span>
                    <button
                      type="button"
                      disabled={isSendingChat}
                      onClick={() => sendChatMessage(msg.originalPrompt!)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-white text-xs font-semibold transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Retry</span>
                    </button>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-[#64748B] mt-1 px-1">
                {isUser ? 'You' : 'Novera AI'} ·{' '}
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          );
        })}

        {isSendingChat && (
          <div className="flex items-start">
            <div className="bg-[#0B0F17] border border-[#1E293B] rounded-xl px-4 py-3 text-xs text-[#CBD5E1] flex items-center gap-2.5">
              <Loader2 className="w-4 h-4 text-[#C8F75A] animate-spin" />
              <span>Consulting live Novera AI workflow...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Strip */}
      <div className="px-4 py-2.5 bg-[#0B0F17]/90 border-t border-[#1E293B]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {NOVERA_AI_SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              disabled={isSendingChat}
              onClick={() => sendChatMessage(prompt)}
              className="px-2.5 py-1 rounded-md bg-[#101828] hover:bg-[#1E293B] border border-[#1E293B] text-[11px] font-medium text-[#CBD5E1] hover:text-white transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-3.5 bg-[#0B0F17] border-t border-[#1E293B] flex items-center gap-2"
      >
        <label htmlFor={embedded ? 'novera-ai-input-page' : 'novera-ai-input-drawer'} className="sr-only">
          Ask Novera AI a shopping question
        </label>
        <div className="relative flex-1">
          <MessageSquare className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id={embedded ? 'novera-ai-input-page' : 'novera-ai-input-drawer'}
            type="text"
            value={input}
            disabled={isSendingChat}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about products, ${selectedMarket.currency} prices, or policies...`}
            className="w-full bg-[#101828] border border-[#1E293B] focus:border-[#087F5B] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#64748B] focus:outline-none disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isSendingChat}
          aria-label="Send message to Novera AI"
          className="h-10 px-4 rounded-xl bg-[#087F5B] hover:bg-[#099268] disabled:opacity-40 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </section>
  );
}
