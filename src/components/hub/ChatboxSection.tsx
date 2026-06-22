"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export default function ChatboxSection() {
  const { language } = useLanguage();
  const t = translations[language].chatbox;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (message: string) => {
    if (!message.trim()) return;

    setMessages((current) => [...current, { role: "user", text: message }]);
    setIsLoading(true);

    window.setTimeout(() => {
      setMessages((current) => [...current, { role: "assistant", text: t.demoReply }]);
      setIsLoading(false);
    }, 700);
  };

  return (
    <section className="relative overflow-hidden bg-[#050505] px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
          <Bot className="h-3.5 w-3.5" />
          {t.eyebrow}
        </span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.heading}</h2>
        <p className="mt-3 text-white/55">{t.description}</p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-2xl">
        {messages.length > 0 && (
          <div className="mb-4 max-h-72 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d0d] p-4">
            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={
                    message.role === "user"
                      ? "inline-block max-w-[80%] rounded-2xl bg-[#4264ff] px-4 py-2 text-sm text-white"
                      : "inline-block max-w-[80%] rounded-2xl bg-white/[0.06] px-4 py-2 text-sm text-white/85"
                  }
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>
        )}

        <PromptInputBox onSend={handleSend} isLoading={isLoading} placeholder={t.placeholder} />
      </div>
    </section>
  );
}
