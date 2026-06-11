"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CATEGORIES, type Category, type ComponentItem } from "@/lib/components-data";

gsap.registerPlugin(ScrollTrigger);

/* ─── Card component ────────────────────────────────────────── */
function ComponentCard({ comp, cat }: { comp: ComponentItem; cat: Category }) {
  return (
    <Link
      href={`/category/${cat.slug}`}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-[#111118] border border-white/8 hover:border-violet-500/40 transition-all duration-200"
    >
      {/* Preview area */}
      <div className="relative bg-[#0B0B15] overflow-hidden" style={{ height: 148 }}>
        <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none select-none">
          {comp.preview}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white text-[11px] font-medium rounded-lg border border-white/15 backdrop-blur-sm">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
              <path d="M2.5 8H1.5a1 1 0 01-1-1V1.5a1 1 0 011-1H7a1 1 0 011 1V2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            Copy
          </span>
          <span className="p-1.5 bg-white/10 text-white/80 rounded-lg border border-white/15 backdrop-blur-sm">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 6.5C2.4 3.8 4.3 2.3 6.5 2.3s4.1 1.5 5.5 4.2C10.6 9.2 8.7 10.7 6.5 10.7S2.4 9.2 1 6.5z" stroke="currentColor" strokeWidth="1.1" />
              <circle cx="6.5" cy="6.5" r="1.6" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </span>
        </div>
      </div>

      {/* Name bar */}
      <div className="flex items-center justify-between px-3 py-2.5 border-t border-white/6">
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold text-white/90 leading-tight truncate">{comp.name}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{cat.name}</p>
        </div>
        <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-2 ${comp.statusColor}`}>
          {comp.status}
        </span>
      </div>
    </Link>
  );
}

/* ─── Section ───────────────────────────────────────────────── */
export default function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    /* Heading wipe */
    gsap.from("[data-feat-heading]", {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    });

    /* Each row slides up on scroll */
    CATEGORIES.forEach((_, i) => {
      gsap.from(`.feat-row-${i}`, {
        y: 32,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: `.feat-row-${i}`, start: "top 85%", once: true },
      });

      gsap.from(`.feat-card-${i}`, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: `.feat-card-${i}`, start: "top 85%", once: true },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="browse" className="relative py-20 px-4 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(124,58,237,0.04), transparent)" }}
      />

      <div className="max-w-7xl mx-auto relative">

        {/* ── Section heading ────────────────────────────────── */}
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="overflow-hidden">
              <h2 data-feat-heading className="text-3xl sm:text-4xl font-bold text-white leading-tight block">
                Featured Components
              </h2>
            </div>
            <p className="mt-2 text-slate-400 text-[14px]">
              {CATEGORIES.reduce((s, c) => s + c.components.length, 0)} components sẵn sàng cho production.
            </p>
          </div>
          <Link
            href="/category/layout"
            className="shrink-0 flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-violet-300 font-medium transition-colors group"
          >
            Explore all
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* ── Category rows ──────────────────────────────────── */}
        {CATEGORIES.map((cat, ci) => (
          <div key={cat.slug} className={`feat-row-${ci} mb-12`}>

            {/* Row label */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] font-semibold text-white">{cat.name}</h3>
                <span className={`text-[11px] font-mono tabular-nums text-slate-600`}>
                  {cat.components.length}
                </span>
              </div>
              <Link
                href={`/category/${cat.slug}`}
                className="group flex items-center gap-1 text-[12px] text-slate-500 hover:text-violet-300 transition-colors font-medium"
              >
                View all
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* 4-col grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cat.components.slice(0, 4).map((comp) => (
                <div key={comp.name} className={`feat-card-${ci}`}>
                  <ComponentCard comp={comp} cat={cat} />
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
