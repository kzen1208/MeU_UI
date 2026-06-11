"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

export default function HomeWelcomeBack() {
  const { user, ready } = useAuth();
  const { language } = useLanguage();
  const t = translations[language].hero;

  if (!ready || !user) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-left shadow-[0_18px_38px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-10 w-10 shrink-0 rounded-full border border-white/15 bg-white/5 object-cover"
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-white">{t.welcomeBack(user.name)}</p>
        <p className="truncate text-xs text-white/45">{t.welcomeBackDescription}</p>
      </div>
      <Link
        href="/components"
        className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#4264ff] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#3450d6]"
      >
        {t.welcomeBackSecondaryCta}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
