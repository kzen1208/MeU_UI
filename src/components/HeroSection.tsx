"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AVATARS = [
  { initials: "T", bg: "bg-violet-600" },
  { initials: "M", bg: "bg-blue-500" },
  { initials: "H", bg: "bg-emerald-500" },
  { initials: "A", bg: "bg-rose-500" },
];

const MINI_CARDS = [
  {
    label: "AppHeader",
    pos: "top-[14%] left-[8%]",
    delay: "0s",
    speed: "6s",
    content: (
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="w-4 h-4 rounded bg-violet-500/70 shrink-0" />
        <div className="flex-1 space-y-1">
          <div className="h-1 bg-white/30 rounded w-12" />
          <div className="h-1 bg-white/15 rounded w-8" />
        </div>
        <div className="w-4 h-4 rounded-full bg-violet-400/50" />
      </div>
    ),
  },
  {
    label: "AppCard",
    pos: "bottom-[22%] left-[4%]",
    delay: "1.2s",
    speed: "7s",
    content: (
      <div className="px-3 py-2 space-y-1.5">
        <div className="h-1.5 bg-white/25 rounded w-14" />
        <div className="h-1 bg-white/15 rounded w-full" />
        <div className="h-1 bg-white/10 rounded w-3/4" />
        <div className="mt-1 h-4 bg-violet-600/50 rounded-md" />
      </div>
    ),
  },
  {
    label: "Design Tokens",
    pos: "top-[10%] right-[6%]",
    delay: "0.6s",
    speed: "8s",
    content: (
      <div className="px-3 py-2">
        <div className="h-1 bg-white/20 rounded w-16 mb-2" />
        <div className="flex gap-1.5">
          {["#7C3AED", "#3B82F6", "#10B981", "#F59E0B"].map((c) => (
            <div key={c} className="w-4 h-4 rounded" style={{ background: c }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "AppSidebar",
    pos: "bottom-[15%] right-[3%]",
    delay: "1.8s",
    speed: "6.5s",
    content: (
      <div className="px-2 py-2 space-y-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 px-2 py-1 rounded ${i === 1 ? "bg-violet-600/30" : ""}`}
          >
            <div className={`w-2.5 h-2.5 rounded ${i === 1 ? "bg-violet-400/70" : "bg-white/20"}`} />
            <div className={`h-1 rounded w-10 ${i === 1 ? "bg-white/40" : "bg-white/15"}`} />
          </div>
        ))}
      </div>
    ),
  },
];

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const avatarRef   = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* Badge fades up */
      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.6 });

      /* Headline lines wipe up from yPercent:110 (GSAP.com style) */
      tl.from("[data-hero-line]", {
        yPercent: 110,
        duration: 0.95,
        stagger: 0.11,
        ease: "power3.out",
      }, "-=0.25");

      /* Sub, CTA, Avatar cascade */
      tl.from(subRef.current,    { y: 24, opacity: 0, duration: 0.7 }, "-=0.55")
        .from(ctaRef.current,    { y: 18, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(avatarRef.current, { y: 14, opacity: 0, duration: 0.55 }, "-=0.4");

      /* Right panel slides in */
      tl.from(rightRef.current,  {
        x: 70, opacity: 0, duration: 1.1, ease: "power2.out",
      }, "-=1.4");

      /* Mini cards stagger after entrance */
      gsap.from(".mini-card", {
        scale: 0.55, opacity: 0, duration: 0.8,
        stagger: 0.14, ease: "back.out(1.7)", delay: 0.9,
      });

      /* Parallax: right panel drifts up slightly on scroll */
      gsap.to(rightRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100vh-4rem)] overflow-hidden"
    >
      {/* ── Background ────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[520, 400, 300, 200].map((r, i) => (
          <div
            key={r}
            className="absolute rounded-full border border-white/[0.035]"
            style={{
              width:  r * 2,
              height: r * 2,
              top:    "50%",
              right:  `-${r * 0.45}px`,
              transform: "translateY(-50%)",
              opacity: 1 - i * 0.15,
            }}
          />
        ))}
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            top: "50%", right: -120,
            transform: "translateY(-50%)",
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167,139,250,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167,139,250,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* ── Two-column layout ─────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center w-full px-8 sm:px-12 lg:px-16 py-16 lg:py-0 gap-12 lg:gap-0">

        {/* LEFT */}
        <div className="flex-1 flex flex-col justify-center max-w-xl lg:max-w-none lg:pr-10">

          {/* Badge */}
          <div ref={badgeRef} className="mb-8">
            <span className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v1.0 — Internal Design System
            </span>
          </div>

          {/* Headline — each line wrapped in overflow:hidden for wipe effect */}
          <div className="mb-7 space-y-0">

            {/* Line 1: Chuẩn hóa */}
            <div className="overflow-hidden">
              <h1
                data-hero-line
                className="font-extrabold leading-[1.05] tracking-tight text-[clamp(2.8rem,5vw,5.5rem)] text-white block"
              >
                Chuẩn hóa
              </h1>
            </div>

            {/* Line 2: How UI Works. (with colored UI) */}
            <div className="overflow-hidden">
              <h1
                data-hero-line
                className="font-extrabold leading-[1.05] tracking-tight text-[clamp(2.8rem,5vw,5.5rem)] text-white block"
              >
                How{" "}
                <span
                  className="text-violet-400"
                  style={{ textShadow: "0 0 40px rgba(139,92,246,0.6)" }}
                >
                  UI
                </span>{" "}
                Works.
              </h1>
            </div>

            {/* Line 3: Xây nhanh hơn. */}
            <div className="overflow-hidden">
              <h1
                data-hero-line
                className="font-extrabold leading-[1.05] tracking-tight text-[clamp(2.8rem,5vw,5.5rem)] text-white block"
              >
                Xây nhanh hơn.
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="text-[clamp(0.95rem,1.4vw,1.15rem)] text-slate-400 leading-relaxed mb-9 max-w-md"
          >
            Tại MeU, chúng tôi cam kết chuẩn hóa từng pixel. Từ design token đến
            component production — đồng nhất UI trên mọi dự án.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#components"
              className="btn-primary text-base px-7 py-3.5"
              style={{ borderRadius: "9999px" }}
            >
              <span>Get Started</span>
              <span className="relative z-10 w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a
              href="#roadmap"
              className="btn-ghost text-base px-7 py-3.5"
              style={{ borderRadius: "9999px" }}
            >
              Xem Roadmap
            </a>
          </div>

          {/* Avatar group */}
          <div ref={avatarRef} className="flex items-center gap-3.5">
            <div className="flex -space-x-3">
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full ${av.bg} flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#06060C]`}
                  style={{ zIndex: AVATARS.length - i }}
                >
                  {av.initials}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">25k+ Teams</p>
              <p className="text-xs text-slate-500">đang dùng MeU UI Hub</p>
            </div>
          </div>
        </div>

        {/* RIGHT — visual */}
        <div
          ref={rightRef}
          className="relative flex-1 flex items-center justify-center min-h-105 lg:min-h-0"
        >
          {/* Floating mini cards */}
          {MINI_CARDS.map((card) => (
            <div
              key={card.label}
              className={`mini-card absolute glass rounded-xl overflow-hidden w-40 ${card.pos}`}
              style={{
                animation: `float ${card.speed} ease-in-out infinite`,
                animationDelay: card.delay,
              }}
            >
              <div className="px-2 pt-1.5 pb-0.5">
                <span className="text-[8px] font-bold text-violet-400/80 uppercase tracking-widest">
                  {card.label}
                </span>
              </div>
              {card.content}
            </div>
          ))}

          {/* Central visual */}
          <div
            className="relative z-10 w-65 sm:w-75 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(30,28,50,0.95), rgba(20,18,40,0.98))",
              border: "1px solid rgba(124,58,237,0.35)",
              boxShadow: "0 0 60px rgba(124,58,237,0.25), 0 30px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Mock browser header */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/7">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <div className="flex-1 mx-3 h-4 bg-white/6 rounded text-[9px] font-mono text-slate-600 flex items-center px-2">
                meu-ui-hub.local
              </div>
            </div>

            {/* Mock nav */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6 bg-[#0D0D1C]">
              <div className="w-5 h-5 rounded bg-violet-600/60 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                  <path d="M2 2L5 2L8 5L5 8L2 5L5 2Z" opacity="0.9" />
                </svg>
              </div>
              <div className="text-[10px] font-bold text-white/80">MeU UI Hub</div>
              <div className="ml-auto flex gap-2">
                <div className="h-1.5 bg-white/20 rounded w-10" />
                <div className="h-1.5 bg-white/20 rounded w-8" />
              </div>
            </div>

            {/* Mock sidebar + content */}
            <div className="flex" style={{ height: 180 }}>
              <div className="w-24 bg-[#090912] border-r border-white/5 p-2 space-y-0.5">
                {["Components", "Tokens", "Themes", "Docs", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-[8px] ${
                      i === 0 ? "bg-violet-600/30 text-violet-300" : "text-white/25"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-sm ${i === 0 ? "bg-violet-400/70" : "bg-white/15"}`} />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-3 space-y-2">
                <div className="h-2 bg-white/20 rounded w-20" />
                <div className="grid grid-cols-2 gap-1.5">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="bg-white/4 border border-white/7 rounded-lg p-2">
                      <div className="w-5 h-5 rounded bg-violet-600/25 mb-1.5" />
                      <div className="h-1 bg-white/20 rounded w-10 mb-1" />
                      <div className="h-1 bg-white/10 rounded w-8" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mock status */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-[#090912]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[8px] text-slate-600 font-medium">v1.0.0 · Stable</span>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 bg-violet-500/30 rounded w-8" />
                <div className="h-1.5 bg-white/10 rounded w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <div className="w-4 h-6 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div
            className="w-0.5 h-1.5 bg-violet-400 rounded-full"
            style={{ animation: "float 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
