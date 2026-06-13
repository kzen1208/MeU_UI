"use client";

import AeroHero2 from "@/components/ui/aero-hero-2";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

const AVATARS = [
  "https://i.pravatar.cc/100?img=12",
  "https://i.pravatar.cc/100?img=32",
  "https://i.pravatar.cc/100?img=47",
  "https://i.pravatar.cc/100?img=5",
];

export default function TrainingCtaHero() {
  const { language } = useLanguage();
  const t = translations[language].trainingCta;

  return (
    <AeroHero2
      backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
      heading={t.heading}
      description={t.description}
      avatars={AVATARS}
      statValue={t.statValue}
      statLabel={t.statLabel}
      ctaLabel={t.ctaLabel}
      ctaHref="/register"
    />
  );
}
