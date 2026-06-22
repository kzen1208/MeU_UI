"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, Search, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Navbar1 } from "@/components/ui/shadcnblocks-com-navbar1";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";
import { useAdminCatalog } from "@/lib/admin/catalog-store";
import { cn } from "@/lib/utils";
import HubLogo from "./HubLogo";
import TemplateCard from "./TemplateCard";

export default function TemplatesPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const page = t.templatesPage;
  const rootRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { templates, templateCategories } = useAdminCatalog();

  const marketingCategories = templateCategories.filter((category) => category.group === "marketing");
  const applicationCategories = templateCategories.filter((category) => category.group === "applications");

  const categoryCounts = useMemo(() => {
    return templateCategories.reduce<Record<string, number>>((acc, category) => {
      acc[category.slug] = templates.filter((template) => template.category === category.slug).length;
      return acc;
    }, {});
  }, [templateCategories, templates]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return templates.filter((template) => {
      const matchesSearch = !query || template.name.toLowerCase().includes(query);
      const matchesCategory = !activeCategory || template.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [templates, search, activeCategory]);

  useGSAP(
    () => {
      gsap.from(".templates-enter", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
      });

      gsap.fromTo(
        ".template-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    },
    { scope: rootRef, dependencies: [activeCategory, search] }
  );

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden bg-[#101010] text-white lg:grid lg:grid-cols-[296px_minmax(0,1fr)]">
      <aside className="templates-enter sticky top-0 hidden h-screen flex-col border-r border-[#242424] bg-[#111111] text-white lg:flex">
        <div className="border-b border-[#1f1f1f] px-6 py-6">
          <HubLogo subtitle={t.nav.logoSubtitle} />
        </div>

        <div className="flex items-center gap-3 px-6 py-5">
          <Link
            href="/"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#242424] text-[#8d8d8d] transition hover:border-[#3a3a3a] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-base font-semibold text-white">{page.title}</h1>
        </div>

        <div className="px-5 pb-5">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={page.searchPlaceholder}
              className="h-11 w-full rounded-lg border border-transparent bg-[#1a1a1a] pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-[#707070] focus:border-[#343434] focus:bg-[#1f1f1f]"
            />
          </label>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-5">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#8c8c8c] transition hover:bg-white/[0.04] hover:text-white",
              activeCategory === null && "bg-white/[0.045] text-[#f2f2f2]"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            {page.allTemplates}
            <span className="ml-auto rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/35">
              {templates.length}
            </span>
          </button>

          <div className="my-5 h-px bg-[#1f1f1f]" />

          <div>
            <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              {page.groups.marketing}
            </div>
            <div className="space-y-1">
              {marketingCategories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setActiveCategory(category.slug)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#8c8c8c] transition hover:bg-white/[0.04] hover:text-white",
                    activeCategory === category.slug && "bg-white/[0.045] text-[#f2f2f2]"
                  )}
                >
                  <span className="truncate">{category.name}</span>
                  <span className="ml-3 shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/35">
                    {categoryCounts[category.slug]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="my-5 h-px bg-[#1f1f1f]" />

          <div>
            <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              {page.groups.applications}
            </div>
            <div className="space-y-1">
              {applicationCategories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setActiveCategory(category.slug)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#8c8c8c] transition hover:bg-white/[0.04] hover:text-white",
                    activeCategory === category.slug && "bg-white/[0.045] text-[#f2f2f2]"
                  )}
                >
                  <span className="truncate">{category.name}</span>
                  <span className="ml-3 shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/35">
                    {categoryCounts[category.slug]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      <div className="min-w-0 overflow-x-hidden">
        <Navbar1 className="templates-enter lg:hidden" />

        <main className="max-w-full overflow-x-hidden px-4 pb-16 pt-5 sm:px-6 lg:px-8">
          <div className="templates-enter flex items-center gap-2 text-sm text-white/45">
            <span>{page.breadcrumbCommunity}</span>
            <span className="text-white/20">/</span>
            <span className="text-white">{page.breadcrumbTemplates}</span>
          </div>

          <label className="templates-enter relative mt-5 block xl:hidden">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={page.searchPlaceholder}
              className="h-11 w-full rounded-lg border border-transparent bg-[#1a1a1a] pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-[#707070] focus:border-[#343434] focus:bg-[#1f1f1f]"
            />
          </label>

          <section className="templates-enter mt-6">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-normal text-white">{page.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">{page.description}</p>
              </div>
              <p className="text-sm text-white/45">{page.templateCount(filtered.length)}</p>
            </div>

            {filtered.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filtered.map((template) => {
                  const category = templateCategories.find((item) => item.slug === template.category);

                  return (
                    <TemplateCard
                      key={template.name}
                      template={template}
                      categoryName={category?.name ?? template.category}
                      freeLabel={page.free}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
                <p className="text-white/50">{page.emptyState}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory(null);
                  }}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-white/12 px-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <X className="h-4 w-4" />
                  {page.clearFilters}
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
