"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* Floating circles — role avatars around the center */
const CIRCLES = [
  { initials: "FE", label: "Frontend",   size: 110, top: "8%",  left: "8%",  gradient: "linear-gradient(135deg,#1e40af,#3b82f6)", delay: 0 },
  { initials: "UI", label: "Designer",   size: 88,  top: "4%",  left: "36%", gradient: "linear-gradient(135deg,#5b21b6,#8b5cf6)", delay: 0.1 },
  { initials: "PM", label: "Product",    size: 96,  top: "6%",  left: "58%", gradient: "linear-gradient(135deg,#065f46,#10b981)", delay: 0.15 },
  { initials: "BE", label: "Backend",    size: 82,  top: "30%", left: "90%", gradient: "linear-gradient(135deg,#92400e,#f59e0b)", delay: 0.05 },
  { initials: "DS", label: "Sys Design", size: 100, top: "62%", left: "88%", gradient: "linear-gradient(135deg,#831843,#ec4899)", delay: 0.2 },
  { initials: "FS", label: "Fullstack",  size: 90,  top: "68%", left: "56%", gradient: "linear-gradient(135deg,#0c4a6e,#06b6d4)", delay: 0.08 },
  { initials: "QA", label: "QA Eng",     size: 78,  top: "72%", left: "26%", gradient: "linear-gradient(135deg,#4c1d95,#7c3aed)", delay: 0.18 },
  { initials: "DX", label: "DevEx",      size: 86,  top: "35%", left: "2%",  gradient: "linear-gradient(135deg,#14532d,#22c55e)", delay: 0.12 },
];

const STAGES = [
  { n: "01", label: "Cài đặt" },
  { n: "02", label: "Cấu hình" },
  { n: "03", label: "Tùy chỉnh" },
  { n: "04", label: "Tích hợp" },
  { n: "05", label: "Ship" },
];

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    /* Circles float in */
    gsap.from(".cta-circle", {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
    });

    /* Subtle float animation */
    gsap.utils.toArray<HTMLElement>(".cta-circle").forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -12 : 12,
        duration: 3 + i * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      });
    });

    /* Center content reveal */
    gsap.from("[data-cta-line]", {
      yPercent: 110,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-cta-line]", start: "top 80%", once: true },
    });

    gsap.from("[data-cta-fade]", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-cta-fade]", start: "top 78%", once: true },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="docs"
      className="relative overflow-hidden py-32 px-4 sm:px-6"
      style={{
        background: "radial-gradient(ellipse 90% 80% at 50% 55%, rgba(88,28,219,0.45) 0%, rgba(15,7,32,0.98) 65%), #06060C",
      }}
    >
      {/* Top + bottom edge glow lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* Corner + marks (like CTA-07) */}
      <span className="pointer-events-none absolute top-6 left-8 text-white/20 text-2xl font-thin leading-none select-none">+</span>
      <span className="pointer-events-none absolute top-6 right-8 text-white/20 text-2xl font-thin leading-none select-none">+</span>
      <span className="pointer-events-none absolute bottom-6 left-8 text-white/10 text-2xl font-thin leading-none select-none">+</span>
      <span className="pointer-events-none absolute bottom-6 right-8 text-white/10 text-2xl font-thin leading-none select-none">+</span>

      {/* ── Floating circles ─────────────────────────────────── */}
      {CIRCLES.map((c, i) => (
        <div
          key={i}
          className="cta-circle absolute rounded-full flex flex-col items-center justify-center select-none"
          style={{
            width: c.size,
            height: c.size,
            top: c.top,
            left: c.left,
            background: c.gradient,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <span className="text-white font-bold text-[15px] leading-tight">{c.initials}</span>
          <span className="text-white/55 text-[8px] font-medium leading-tight">{c.label}</span>
        </div>
      ))}

      {/* ── Center content ───────────────────────────────────── */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">

        {/* Logo mark */}
        <div data-cta-fade className="mb-6 flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" opacity="0.9" />
              <rect x="8" y="1" width="5" height="2" rx="0.5" fill="white" opacity="0.6" />
              <rect x="8" y="4" width="5" height="2" rx="0.5" fill="white" opacity="0.4" />
              <rect x="1" y="8" width="12" height="5" rx="1" fill="white" opacity="0.25" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-white/50 tracking-widest uppercase">MeU UI Hub</span>
        </div>

        {/* Main headline — bold sans */}
        <div className="mb-1">
          <div className="overflow-hidden">
            <h2
              data-cta-line
              className="block text-[clamp(2.8rem,7vw,5rem)] font-extrabold text-white leading-tight tracking-tight"
            >
              Xây dựng giao diện
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              data-cta-line
              className="block text-[clamp(2.8rem,7vw,5rem)] font-extrabold text-white leading-tight tracking-tight"
            >
              nhanh &amp; nhất quán.
            </h2>
          </div>
        </div>

        {/* Italic script line */}
        <div className="overflow-hidden mb-6">
          <p
            data-cta-line
            className="block text-[clamp(1.5rem,4vw,2.8rem)] italic font-light text-violet-300/80 leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            5 giai đoạn. 1 design system.
          </p>
        </div>

        {/* Subtitle */}
        <p
          data-cta-fade
          className="text-[13px] font-medium tracking-widest uppercase text-slate-500 mb-8"
        >
          Từ design token đến production component — sẵn sàng trong vài giờ
        </p>

        {/* CTA button */}
        <div data-cta-fade className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <a
            href="#browse"
            className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-[14px] transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <span className="relative">Xem Components</span>
            <svg className="relative" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#roadmap"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-violet-300 text-[14px] border border-violet-500/30 hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-200"
          >
            Xem Roadmap
          </a>
        </div>

        {/* ── 5 Stages row ─────────────────────────────────── */}
        <div data-cta-fade className="flex items-center justify-center gap-0 flex-wrap">
          {STAGES.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center px-4 py-2">
                <span className="text-[10px] font-mono text-violet-400/60 mb-0.5">{s.n}</span>
                <span className="text-[12px] font-semibold text-white/70">{s.label}</span>
              </div>
              {i < STAGES.length - 1 && (
                <div className="w-8 h-px bg-linear-to-r from-violet-500/30 to-violet-500/10 shrink-0" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
