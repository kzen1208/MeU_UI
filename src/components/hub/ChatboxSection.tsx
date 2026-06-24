"use client";

import { useMemo, useState } from "react";
import { Bot, Search, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { useAdminCatalog } from "@/lib/admin/catalog-store";
import type { Category, ComponentItem } from "@/lib/components-data";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  component?: { category: Category; component: ComponentItem };
}

export default function ChatboxSection() {
  const { language } = useLanguage();
  const t = translations[language].chatbox;
  const { categories } = useAdminCatalog();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const allComponents = useMemo(
    () =>
      categories.flatMap((category) =>
        category.components.map((component) => ({ category, component }))
      ),
    [categories]
  );

  const suggestions = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return [];

    return allComponents.filter(({ component }) => component.name.toLowerCase().includes(search)).slice(0, 6);
  }, [allComponents, query]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    const trimmed = message.trim().toLowerCase();
    const matchedComponent = allComponents.find(({ component }) => component.name.toLowerCase() === trimmed);

    const userMessage: ChatMessage = { role: "user", text: message, component: matchedComponent };
    const history = [...messages, userMessage];
    setMessages(history);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((item) => ({ role: item.role, content: item.text })),
          language,
        }),
      });

      if (!response.ok) throw new Error("chat request failed");

      const data: { reply: string } = await response.json();
      setMessages((current) => [...current, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: t.errorReply }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t.eyebrow}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#4264ff] text-white shadow-[0_10px_28px_rgba(66,100,255,0.45)] transition hover:bg-[#3450d6] hover:scale-105"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      data-lenis-prevent
      className="fixed bottom-6 right-6 z-50 flex w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
          <Bot className="h-3.5 w-3.5" />
          {t.eyebrow}
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-4 pt-4">
        <h2 className="text-lg font-bold tracking-tight text-white">{t.heading}</h2>
        <p className="mt-1 text-xs text-white/55">{t.description}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3">
        {messages.length > 0 && (
          <div className="max-h-72 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d0d] p-3">
            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "text-right" : "text-left"}>
                {message.role === "user" ? (
                  <span className="inline-block max-w-[85%] rounded-2xl bg-[#4264ff] px-3 py-1.5 text-sm text-white">
                    {message.text}
                  </span>
                ) : (
                  <div className="prose prose-sm prose-invert inline-block max-w-[85%] overflow-x-auto rounded-2xl bg-white/[0.06] px-3 py-1.5 prose-p:my-1 prose-headings:my-1.5 prose-ul:my-1 prose-li:my-0 prose-pre:my-1.5 prose-table:text-xs">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                  </div>
                )}

                {message.component && (
                  <div className="mt-2 inline-block w-full max-w-[240px] overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] text-left">
                    <div className="relative flex h-28 items-center justify-center bg-[#050505] p-3">
                      <span
                        className={cn(
                          "absolute left-2 top-2 rounded-md border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em]",
                          message.component.component.status === "Stable"
                            ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-200"
                            : "border-yellow-300/35 bg-yellow-300/10 text-yellow-200"
                        )}
                      >
                        {message.component.component.status}
                      </span>
                      <div className="w-full max-w-[150px] scale-90">{message.component.component.preview}</div>
                    </div>
                    <div className="border-t border-white/10 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-white">{message.component.component.name}</p>
                      <p className="truncate text-xs text-white/45">{message.component.category.name}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3">
        {suggestions.length > 0 && (
          <div className="mb-2 max-h-44 overflow-y-auto rounded-xl border border-white/10 bg-[#111111] p-1.5">
            {suggestions.map(({ category, component }) => (
              <button
                key={`${category.slug}-${component.name}`}
                type="button"
                onClick={() => setQuery(component.name)}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-white/80 transition hover:bg-white/6 hover:text-white"
              >
                <Search className="h-3.5 w-3.5 shrink-0 text-white/35" />
                <span className="truncate">{component.name}</span>
                <span className="ml-auto shrink-0 truncate text-xs text-white/35">{category.name}</span>
              </button>
            ))}
          </div>
        )}

        <PromptInputBox
          value={query}
          onValueChange={setQuery}
          onSend={handleSend}
          isLoading={isLoading}
          placeholder={t.placeholder}
        />
      </div>
    </div>
  );
}
