"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CATEGORIES } from "@/lib/components-data";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ICONS: Record<string, ReactElement> = {
  layout: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="7" y="1" width="5" height="2" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="7" y="4" width="5" height="2" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="1" y="7" width="11" height="5" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  form: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="2" width="11" height="3" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <rect x="1" y="7" width="11" height="3" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="10.5" cy="3.5" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  data: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 3h11M1 6h11M1 9h11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M4 1v11M9 1v11" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" opacity="0.3" />
    </svg>
  ),
  business: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="5" width="11" height="7" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M4 5V4a2.5 2.5 0 015 0v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
};

interface Props {
  activeSlug?: string | null;
}

export default function CategoryNav({ activeSlug = null }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(ref.current, {
      y: -8,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.from(".cat-tab", {
      y: 10,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power3.out",
      delay: 0.1,
    });
  }, { scope: ref });

  const totalComponents = CATEGORIES.reduce((s, c) => s + c.components.length, 0);

  return (
    <div
      ref={ref}
      className="sticky top-16 z-40 border-b border-white/[0.07] bg-[#0E0E18]/98 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-hide">
          {/* All tab */}
          <Link
            href="/"
            className={`cat-tab shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
              activeSlug === null
                ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/6 border border-transparent"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="7" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
              <rect x="1" y="7" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
              <rect x="7" y="7" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
            </svg>
            <span>All</span>
            <span className="text-[10px] tabular-nums text-slate-600 font-mono">{totalComponents}</span>
          </Link>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 mx-1 shrink-0" />

          {/* Category tabs */}
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`cat-tab shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                activeSlug === cat.slug
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/6 border border-transparent"
              }`}
            >
              <span className="shrink-0">
                {CATEGORY_ICONS[cat.slug]}
              </span>
              <span>{cat.name}</span>
              <span className="text-[10px] tabular-nums text-slate-600 font-mono">
                {cat.components.length}
              </span>
            </Link>
          ))}

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 mx-1 shrink-0" />

          {/* Extra tabs */}
          {[
            { label: "Tokens", href: "/#features" },
            { label: "Themes", href: "/#themes" },
            { label: "Roadmap", href: "/#roadmap" },
          ].map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="cat-tab shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium text-slate-500 hover:text-white hover:bg-white/6 border border-transparent transition-all duration-200"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
