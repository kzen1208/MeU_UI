"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "current",
    statusLabel: "In Progress",
    description:
      "Setup monorepo, Next.js docs site, Tailwind, shadcn/ui, theme tokens, cn utility, eslint/prettier, folder convention.",
    items: [
      "Monorepo với Turborepo",
      "Next.js docs site",
      "Design token system",
      "Theme: Neutral baseline",
      "ESLint + Prettier config",
    ],
    color: "from-violet-600 to-purple-700",
    borderColor: "border-violet-500/40",
    bgColor: "bg-violet-600/10",
    dotColor: "bg-violet-500",
    glowColor: "shadow-[0_0_20px_rgba(124,58,237,0.4)]",
  },
  {
    phase: "Phase 2",
    title: "Layout MVP",
    status: "upcoming",
    statusLabel: "Next Up",
    description:
      "PageContainer, AppHeader, AppSidebar, AppBreadcrumb, AppTabs, AppCard, AppGrid với full responsive và theme switching.",
    items: [
      "AppHeader (sticky, responsive)",
      "AppSidebar (collapse, drawer)",
      "PageContainer",
      "AppTabs + AppCard",
      "AppGrid responsive",
    ],
    color: "from-blue-600 to-indigo-700",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-600/8",
    dotColor: "bg-blue-500",
    glowColor: "",
  },
  {
    phase: "Phase 3",
    title: "Form & Data",
    status: "planned",
    statusLabel: "Planned",
    description:
      "Button, Input, Select, Textarea, Checkbox, DatePicker, Upload, Table, Pagination, FilterBar đủ dùng cho admin dashboard.",
    items: [
      "Form components (Input, Select…)",
      "Table + Pagination",
      "FilterBar",
      "React Hook Form integration",
      "Zod validation",
    ],
    color: "from-emerald-600 to-teal-700",
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-600/6",
    dotColor: "bg-emerald-500",
    glowColor: "",
  },
  {
    phase: "Phase 4",
    title: "Business Components",
    status: "planned",
    statusLabel: "Planned",
    description:
      "UserMenu, NotificationDropdown, PermissionMenu, StatusBadge, FilePreview, ConfirmDialog, DashboardMetricCard.",
    items: [
      "UserMenu + NotificationDropdown",
      "PermissionMenu",
      "StatusBadge + StatusLabel",
      "FilePreview",
      "DashboardMetricCard",
    ],
    color: "from-orange-600 to-amber-700",
    borderColor: "border-orange-500/20",
    bgColor: "bg-orange-600/6",
    dotColor: "bg-orange-500",
    glowColor: "",
  },
  {
    phase: "Phase 5",
    title: "Package & Publish",
    status: "planned",
    statusLabel: "Planned",
    description:
      "Build @meu/ui npm package nội bộ, export component, versioning, changelog, release workflow và internal usage guide.",
    items: [
      "@meu/ui npm package",
      "Versioning & changelog",
      "Release automation",
      "Migration guides",
      "Governance docs",
    ],
    color: "from-pink-600 to-rose-700",
    borderColor: "border-pink-500/20",
    bgColor: "bg-pink-600/6",
    dotColor: "bg-pink-500",
    glowColor: "",
  },
];

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".roadmap-title", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".roadmap-title", start: "top 80%", once: true },
      });

      gsap.from(".roadmap-line", {
        scaleX: 0, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: ".roadmap-line", start: "top 80%", once: true },
        transformOrigin: "left center",
      });

      gsap.from(".phase-card", {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".phase-card", start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="roadmap" className="relative py-24 px-6">
      {/* Orb */}
      <div className="orb orb-purple w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="roadmap-title text-center mb-16">
          <span className="section-tag mb-4">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Roadmap Triển Khai
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            5 giai đoạn{" "}
            <span className="text-gradient">xây dựng</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Từ foundation đến full package — lộ trình rõ ràng để phát triển
            MeU UI Hub thành thư viện production.
          </p>
        </div>

        {/* Timeline line (desktop) */}
        <div className="hidden lg:block relative mb-8">
          <div className="roadmap-line absolute top-5 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-violet-600 via-indigo-500 to-pink-600 opacity-30 origin-left" />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PHASES.map((ph, i) => (
            <div
              key={i}
              className={`phase-card relative rounded-2xl p-5 border bg-linear-to-br ${ph.bgColor} ${ph.borderColor} card-hover overflow-hidden`}
            >
              {/* Dot on timeline (desktop) */}
              <div className="hidden lg:flex absolute -top-[38px] left-1/2 -translate-x-1/2 flex-col items-center">
                <div className={`w-3.5 h-3.5 rounded-full ${ph.dotColor} ${ph.glowColor} ${ph.status === "current" ? "ring-2 ring-offset-2 ring-offset-[#06060C] ring-violet-500/50" : ""}`} />
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  {ph.phase}
                </span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  ph.status === "current"
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    : ph.status === "upcoming"
                    ? "bg-blue-500/15 text-blue-300 border border-blue-500/20"
                    : "bg-white/[0.06] text-slate-500 border border-white/[0.08]"
                }`}>
                  {ph.statusLabel}
                </span>
              </div>

              {/* Title */}
              <h3 className={`font-bold text-base mb-2 bg-linear-to-r ${ph.color} bg-clip-text text-transparent`}>
                {ph.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {ph.description}
              </p>

              {/* Items */}
              <ul className="space-y-1.5">
                {ph.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className={`w-1.5 h-1.5 rounded-full ${ph.dotColor} opacity-60 mt-0.5 flex-shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Current glow */}
              {ph.status === "current" && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% -20%, rgba(124,58,237,0.15), transparent 70%)"
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
