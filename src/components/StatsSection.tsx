"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 50, suffix: "+", label: "Components", sublabel: "Production-ready" },
  { value: 3, suffix: "", label: "Brand Themes", sublabel: "Neutral · MeU · VietProDev" },
  { value: 7, suffix: "", label: "Layout Core", sublabel: "MVP components" },
  { value: 100, suffix: "%", label: "TypeScript", sublabel: "Type-safe props" },
];

const BRANDS = [
  "Admin Dashboard",
  "CRM System",
  "Logistics Platform",
  "E-Learning",
  "Ví Điện Tử",
  "SaaS Internal",
  "HR Management",
  "Inventory System",
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Marquee is CSS-driven; only animate section entry
      gsap.from(".stat-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Counter animation
      document.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.val).toString();
              },
            });
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Subtle divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Background tint */}
      <div className="absolute inset-0 bg-linear-to-b from-violet-950/10 via-[#0B0B1A] to-transparent pointer-events-none" />

      {/* Marquee brands */}
      <div className="relative overflow-hidden mb-16 py-3">
        <p className="text-center text-xs font-semibold text-slate-600 uppercase tracking-widest mb-4">
          Được dùng trong các dự án
        </p>
        <div className="flex gap-0 overflow-hidden">
          <div className="animate-marquee flex gap-12 pr-12 whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span
                key={i}
                className="text-sm font-semibold text-slate-600 hover:text-slate-400 transition-colors cursor-default select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-card glass rounded-2xl p-6 text-center card-hover group"
            >
              <div className="flex items-end justify-center gap-1 mb-2">
                <span
                  className="stat-number text-4xl sm:text-5xl font-bold text-white"
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-3xl sm:text-4xl font-bold text-violet-400 mb-0.5">
                  {stat.suffix}
                </span>
              </div>
              <p className="font-semibold text-white/90 text-sm mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-slate-500">{stat.sublabel}</p>
              <div className="mt-3 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
