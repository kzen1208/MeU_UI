"use client";

import Link from "next/link";
import {
  BookOpen,
  Boxes,
  Code2,
  FolderOpen,
  LayoutDashboard,
  Library,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CATEGORIES } from "@/lib/components-data";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";
import HubLogo from "./HubLogo";

const CATEGORY_ICONS = {
  layout: LayoutDashboard,
  form: FolderOpen,
  data: Library,
  business: Sparkles,
  inputs: FolderOpen,
  "data-grid": Library,
  navigation: LayoutDashboard,
  overlays: Boxes,
  workflows: Rocket,
  content: Sparkles,
};

interface HubSidebarProps {
  activeSlug?: string | null;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
}

export default function HubSidebar({
  activeSlug = null,
  searchValue = "",
  onSearchChange,
  className,
}: HubSidebarProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const page = t.componentsPage;
  const sidebar = page.sidebar;
  const primaryLinks = [
    { label: sidebar.primaryLinks.home, href: "/", icon: LayoutDashboard },
    { label: sidebar.primaryLinks.components, href: "/components", icon: Boxes },
    { label: sidebar.primaryLinks.animations, href: "/#animation-system", icon: Sparkles },
    { label: sidebar.primaryLinks.training, href: "/#training", icon: BookOpen },
  ];
  const foundationLinks = [
    { label: sidebar.foundationLinks.tokens, href: "/#system", icon: Palette },
    { label: sidebar.foundationLinks.rules, href: "/#training", icon: ShieldCheck },
    { label: sidebar.foundationLinks.roadmap, href: "/#roadmap", icon: Rocket },
    { label: sidebar.foundationLinks.samples, href: "/components", icon: Code2 },
  ];

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/14 bg-[#172250] text-white",
        className
      )}
    >
      <div className="border-b border-white/14 px-6 py-6">
        <HubLogo subtitle={t.nav.logoSubtitle} />
      </div>

      <div className="px-5 py-5">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={page.searchPlaceholder()}
            className="h-11 w-full rounded-lg border border-white/14 bg-black/20 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#4264ff]/70 focus:bg-black/35"
          />
        </label>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-5">
        <div className="space-y-1">
          {primaryLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeSlug === null && item.href === "/components";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/62 transition hover:bg-white/[0.06] hover:text-white",
                  isActive && "bg-white/[0.08] text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="my-5 h-px bg-white/14" />

        <div>
          <div className="mb-2 flex items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            <span>{sidebar.categories}</span>
            <span>
              {CATEGORIES.reduce((sum, category) => sum + category.components.length, 0)}
            </span>
          </div>
          <div className="space-y-1">
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.slug as keyof typeof CATEGORY_ICONS] ?? Boxes;
              const isActive = activeSlug === category.slug;

              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-white/62 transition hover:bg-white/[0.06] hover:text-white",
                    isActive && "bg-[#4264ff]/16 text-white ring-1 ring-[#4264ff]/35"
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 text-white/45 transition group-hover:text-white",
                        isActive && "text-[#85a0ff]"
                      )}
                    />
                    <span className="truncate">{category.name}</span>
                  </span>
                  <span
                    className={cn(
                      "ml-3 shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/35",
                      isActive && "border-[#4264ff]/30 text-[#bcccff]"
                    )}
                  >
                    {category.components.length}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="my-5 h-px bg-white/14" />

        <div>
          <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            {sidebar.foundation}
          </div>
          <div className="space-y-1">
            {foundationLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/55 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <Icon className="h-4 w-4 text-white/35" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="border-t border-white/14 p-4">
        <div className="flex min-h-[224px] flex-col justify-between rounded-lg border border-white/12 bg-white/4 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white">{sidebar.phase}</span>
            <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
              {sidebar.mvp}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/42">
            {sidebar.description}
          </p>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-white/32">
              <span>{sidebar.progress}</span>
              <span>42%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[42%] rounded-full bg-[#4264ff]" />
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {sidebar.milestones.map(([label, status]) => (
              <div key={label} className="flex items-center justify-between rounded-md border border-white/8 bg-white/[0.025] px-3 py-2">
                <span className="text-xs text-white/55">{label}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/32">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
