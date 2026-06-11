"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Filter,
  Search,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar1 } from "@/components/ui/shadcnblocks-com-navbar1";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { CATEGORIES, type ComponentStatus } from "@/lib/components-data";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";
import HubSidebar from "./HubSidebar";
import ResourceCard from "./ResourceCard";

gsap.registerPlugin(ScrollTrigger);

interface HubCategoryPageProps {
  slug: string;
}

export default function HubCategoryPage({ slug }: HubCategoryPageProps) {
  const { language } = useLanguage();
  const locale = translations[language];
  const t = locale.componentsPage;
  const rootRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ComponentStatus | "all">("all");
  const statusFilters: { label: string; value: ComponentStatus | "all" }[] = [
    { label: t.statusFilters.all, value: "all" },
    { label: t.statusFilters.stable, value: "Stable" },
    { label: t.statusFilters.planned, value: "Planned" },
  ];

  const category = CATEGORIES.find((item) => item.slug === slug);
  const totalComponents = CATEGORIES.reduce((sum, item) => sum + item.components.length, 0);

  const filtered = useMemo(() => {
    if (!category) return [];
    const query = search.trim().toLowerCase();

    return category.components.filter((component) => {
      const matchesSearch = !query || component.name.toLowerCase().includes(query);
      const matchesStatus = status === "all" || component.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [category, search, status]);

  useGSAP(
    () => {
      gsap.from(".category-enter", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
      });

      gsap.set(".category-card", { clearProps: "opacity,visibility,transform" });

      gsap.fromTo(
        ".category-card",
        { y: 24 },
        {
          y: 0,
          duration: 0.55,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.18,
          clearProps: "transform",
        }
      );

      gsap.to(".category-rail", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".category-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: rootRef, dependencies: [slug] }
  );

  if (!category) {
    return (
      <div ref={rootRef} className="min-h-screen overflow-x-hidden bg-[#172250] text-white lg:grid lg:grid-cols-[296px_minmax(0,1fr)]">
        <HubSidebar activeSlug={null} className="sticky top-0 hidden h-screen lg:flex" />
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#85a0ff]">
            {t.categoryNotFoundEyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-white">
            {t.categoryNotFoundTitle}
          </h1>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[#4264ff] px-4 text-sm font-semibold text-white transition hover:bg-[#3450d6]"
          >
            {t.backHome}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </main>
      </div>
    );
  }

  const stableCount = category.components.filter((component) => component.status === "Stable").length;
  const plannedCount = category.components.filter((component) => component.status === "Planned").length;

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden bg-[#172250] text-white lg:grid lg:grid-cols-[296px_minmax(0,1fr)]">
      <HubSidebar
        activeSlug={category.slug}
        searchValue={search}
        onSearchChange={setSearch}
        className="category-enter sticky top-0 hidden h-screen lg:flex"
      />

      <div className="min-w-0 overflow-x-hidden">
        <Navbar1 className="category-enter lg:hidden" />

        <main className="max-w-full overflow-x-hidden px-4 pb-16 pt-5 sm:px-6 lg:px-8">
          <label className="category-enter relative mb-5 block xl:hidden">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.searchPlaceholder(category.name)}
              className="h-11 w-full rounded-lg border border-white/10 bg-black/35 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#2563eb]/70 focus:bg-black/55"
            />
          </label>

          <section className="category-hero category-enter relative max-w-full overflow-hidden rounded-xl border border-white/10 bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div
              className="absolute inset-0 opacity-75"
              style={{
                background: `radial-gradient(ellipse at 75% 35%, ${category.accent}, transparent 52%)`,
              }}
            />
            <div className="category-rail pointer-events-none absolute -right-20 top-10 hidden w-[48rem] gap-3 opacity-70 md:grid md:grid-cols-3">
              {category.components.slice(0, 6).map((component) => (
                <div
                  key={component.name}
                  className="h-24 rounded-lg border border-white/10 bg-white/[0.04] p-3"
                >
                  <div className="h-2 w-20 rounded-full bg-white/20" />
                  <div className="mt-3 h-2 w-28 rounded-full bg-white/10" />
                  <div className="mt-7 h-6 rounded-md bg-[#2563eb]/25" />
                </div>
              ))}
            </div>

            <div className="relative z-10 w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-white/12 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  {category.tag}
                </span>
                <span className="rounded-md border border-lime-300/25 bg-lime-300/10 px-2.5 py-1 text-xs font-bold text-lime-200">
                  {stableCount} {t.stable}
                </span>
                <span className="rounded-md border border-sky-300/25 bg-sky-300/10 px-2.5 py-1 text-xs font-bold text-sky-200">
                  {plannedCount} {t.planned}
                </span>
              </div>
              <h1 className="break-words text-[clamp(2rem,10vw,5rem)] font-bold leading-[1.05] tracking-normal text-white">
                {category.name} Components
              </h1>
              <p className="mt-5 max-w-2xl break-words text-base leading-relaxed text-white/58">
                {t.categoryDescription(category.name)}
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-xs text-white/45">
                <span>{category.components.length} {t.resources}</span>
                <span className="text-white/20">/</span>
                <span>{totalComponents} {t.totalInHub}</span>
              </div>
            </div>
          </section>

          <section className="category-enter mt-6">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#85a0ff]">
                  {t.browseCategory}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-normal text-white">
                  {t.componentCount(filtered.length)}
                </h2>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="hidden items-center gap-2 pr-1 text-sm text-white/35 sm:inline-flex">
                  <Filter className="h-4 w-4" />
                  {t.statusLabel}
                </span>
                {statusFilters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setStatus(item.value)}
                    className={cn(
                      "h-10 shrink-0 rounded-lg border px-3 text-sm font-medium transition",
                      status === item.value
                        ? "border-[#4264ff]/55 bg-[#4264ff]/16 text-white"
                        : "border-white/12 text-white/55 hover:bg-white/6 hover:text-white"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filtered.map((component) => (
                  <ResourceCard
                    key={component.name}
                    category={category}
                    component={component}
                    showCategory={false}
                    className="category-card"
                  />
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
                <p className="text-white/50">{t.emptyState}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatus("all");
                  }}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-white/12 px-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <X className="h-4 w-4" />
                  {t.clearFilters}
                </button>
              </div>
            )}
          </section>

        </main>

        <CinematicFooter className="lg:left-74 lg:w-[calc(100%-296px)]" />
      </div>
    </div>
  );
}
