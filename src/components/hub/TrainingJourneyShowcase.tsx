"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

const STAT_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1280&q=80",
];

const CARD_CLIP_PATHS = [
  "polygon(64px 0, calc(100% - 14px) 0, calc(100% - 4px) 4px, 100% 14px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px), 0 64px)",
  "polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 64px 100%, 0 calc(100% - 64px))",
  "polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px))",
];

const TEXT_POSITIONS = [
  "absolute inset-x-6 bottom-6",
  "absolute inset-x-6 bottom-20 sm:right-10",
  "absolute inset-x-6 bottom-6",
];

export default function TrainingJourneyShowcase() {
  const { language } = useLanguage();
  const t = translations[language].trainingShowcase;

  return (
    <section
      id="training"
      className="reveal-section relative flex min-h-screen flex-col justify-center bg-[#f7f8ff] px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="reveal-item text-[#050936]">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#4264ff]">
              {t.eyebrow}
            </p>
            <h2 className="font-firs text-[36px] font-semibold uppercase leading-[0.95] tracking-tight sm:text-[48px] lg:text-[54px]">
              {t.headingLine1}
              <br />
              {t.headingLine2}
            </h2>
          </div>

          <div className="reveal-item flex max-w-xl flex-col text-[#050936]">
            <div className="text-[17px] leading-[1.5] sm:text-[18px]">
              <p>{t.description1}</p>
              <p className="mt-4">{t.description2}</p>
            </div>
            <Link
              href="/components"
              className="group mt-6 inline-flex items-center gap-4 text-[14px] font-medium text-[#050936]"
            >
              {t.linkLabel}
              <span
                className="flex h-8 w-8 items-center justify-center border border-[#050936] transition-transform group-hover:-translate-y-0.5"
                style={{
                  clipPath:
                    "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                }}
              >
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.stats.map((stat, index) => (
            <div
              key={stat.value}
              className={`reveal-item relative h-70 w-full overflow-hidden sm:h-85 ${index === 1 ? "lg:mt-24" : ""}`}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "1.5px",
                clipPath: CARD_CLIP_PATHS[index],
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${STAT_IMAGES[index]})`,
                  clipPath: CARD_CLIP_PATHS[index],
                }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-[#050936]/85 via-[#050936]/15 to-transparent" />
                <div className={TEXT_POSITIONS[index]}>
                  <p
                    className="font-firs text-2xl font-semibold uppercase leading-tight sm:text-3xl lg:text-4xl"
                    style={{
                      background: "linear-gradient(294deg, #85a0ff 20%, #ffffff)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.4] text-white/85">{stat.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 sm:h-56"
        style={{
          background:
            "linear-gradient(to bottom, rgba(247, 248, 255, 0) 0%, rgba(247, 248, 255, 0.7) 60%, #f7f8ff 100%)",
        }}
      />
    </section>
  );
}
