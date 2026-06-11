"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Design Tokens",
    description: "Màu sắc, typography, spacing, radius, shadow và breakpoint được chuẩn hóa thành token. Thay đổi một token — toàn bộ UI cập nhật đồng bộ.",
    highlights: ["Color tokens", "Typography scale", "Spacing system", "Dark mode ready"],
    gradient: "from-violet-600/20 to-purple-900/10",
    border: "border-violet-500/20",
    iconBg: "bg-violet-600/20",
    iconColor: "text-violet-400",
    tag: "Foundation",
    accentColor: "rgba(124,58,237,0.15)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.7" />
        <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.2" />
      </svg>
    ),
    title: "Multi-brand Themes",
    description: "CSS variables-driven theming cho MeU, VietProDev và Neutral. Đổi theme chỉ cần swap một class — không cần rewrite bất kỳ component nào.",
    highlights: ["MeU theme", "VietProDev theme", "Neutral base", "CSS Variables"],
    gradient: "from-blue-600/20 to-indigo-900/10",
    border: "border-blue-500/20",
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-400",
    tag: "Themes",
    accentColor: "rgba(59,130,246,0.12)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.7" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Production-ready Code",
    description: "Mỗi component có TypeScript props, forwardRef, CVA variants, accessibility và test checklist. Sẵn sàng dùng ngay trong dự án production.",
    highlights: ["TypeScript props", "forwardRef support", "CVA variants", "A11y built-in"],
    gradient: "from-emerald-600/20 to-teal-900/10",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-600/20",
    iconColor: "text-emerald-400",
    tag: "Quality",
    accentColor: "rgba(16,185,129,0.12)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="currentColor" opacity="0.4" />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Docs Site & Guidelines",
    description: "Trang docs Next.js với preview trực quan, bảng Props API, code example có thể copy và guideline do/dont cho từng component.",
    highlights: ["Live preview", "Props API table", "Copy-ready code", "Do/Don't guide"],
    gradient: "from-orange-600/20 to-amber-900/10",
    border: "border-orange-500/20",
    iconBg: "bg-orange-600/20",
    iconColor: "text-orange-400",
    tag: "Documentation",
    accentColor: "rgba(249,115,22,0.12)",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Section heading: line wipe (GSAP.com style) */
      gsap.from("[data-feat-line]", {
        yPercent: 110,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-feat-line]",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from("[data-feat-sub]", {
        y: 20, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-feat-sub]",
          start: "top 85%",
          once: true,
        },
      });

      /* Cards: clip-path wipe from right → left, stagger */
      gsap.from(".feature-card", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".feature-card",
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="components" className="relative py-28 px-6">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.06), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="section-tag mb-5 inline-flex">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0L7.5 4.5H12L8.25 7.5L9.75 12L6 9L2.25 12L3.75 7.5L0 4.5H4.5L6 0Z" />
            </svg>
            Tại sao chọn MeU UI Hub
          </span>
          <div className="mt-5 mb-4">
            <div className="overflow-hidden">
              <h2
                data-feat-line
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight block"
              >
                Mọi thứ team cần
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                data-feat-line
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight block"
              >
                <span className="text-gradient">trong một nơi</span>
              </h2>
            </div>
          </div>
          <p
            data-feat-sub
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Từ design foundation đến production component — chuẩn hóa quy trình
            phát triển UI cho toàn bộ dự án.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feat, i) => (
            <div
              key={i}
              className={`feature-card relative rounded-2xl p-6 border bg-linear-to-br ${feat.gradient} ${feat.border} card-hover overflow-hidden group`}
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/30 ${feat.iconColor}`}
                >
                  {feat.tag}
                </span>
              </div>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${feat.iconBg} flex items-center justify-center mb-5 ${feat.iconColor}`}
              >
                {feat.icon}
              </div>

              {/* Content */}
              <h3 className="font-bold text-white text-lg mb-3">{feat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{feat.description}</p>

              {/* Highlights */}
              <ul className="space-y-1.5">
                {feat.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs text-slate-500">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className={feat.iconColor}
                    >
                      <path
                        d="M1.5 5l2.5 2.5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feat.accentColor}, transparent 60%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
