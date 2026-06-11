"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CATEGORIES } from "@/lib/components-data";

gsap.registerPlugin(ScrollTrigger);

export default function ComponentsPreview() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track   = trackRef.current!;
      const section = sectionRef.current!;

      const totalX = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalX,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalX}`,
          pin: stickyRef.current,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      CATEGORIES.forEach((_, i) => {
        const panelEl = track.children[i] as HTMLElement;
        gsap.from(panelEl.querySelectorAll("[data-panel-title]"), {
          yPercent: 100,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: `top+=${i * (totalX / (CATEGORIES.length - 1)) * 0.9} top`,
            once: true,
          },
        });

        gsap.from(panelEl.querySelectorAll(".comp-card"), {
          clipPath: "inset(0 100% 0 0)",
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: `top+=${i * (totalX / (CATEGORIES.length - 1)) * 0.9} top`,
            once: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      id="themes"
      style={{ height: `calc(100vh + ${(CATEGORIES.length - 1) * 100}vw)` }}
    >
      <div
        ref={stickyRef}
        style={{ height: "100vh", overflow: "hidden", position: "sticky", top: 0 }}
        className="bg-[#0E0E18]"
      >
        {/* Faint radial bg */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(124,58,237,0.07), transparent)" }}
        />

        <div
          ref={trackRef}
          style={{ display: "flex", width: `${CATEGORIES.length * 100}vw`, height: "100%" }}
        >
          {CATEGORIES.map((panel, pi) => (
            <div
              key={panel.name}
              style={{ width: "100vw", height: "100%" }}
              className="relative flex flex-col justify-center px-10 sm:px-16 lg:px-24"
            >
              {/* Panel glow accent */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(ellipse 50% 70% at 80% 50%, ${panel.accent}, transparent)` }}
              />

              <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* Panel header */}
                <div className="mb-8">
                  <div className="overflow-hidden mb-3">
                    <span
                      data-panel-title
                      className={`section-tag ${panel.tagColor} inline-flex`}
                    >
                      {panel.tag}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <h2
                      data-panel-title
                      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
                    >
                      {panel.name}{" "}
                      <span className="text-gradient">Components</span>
                    </h2>
                  </div>
                  <div className="overflow-hidden mt-2">
                    <p data-panel-title className="text-slate-500 text-[15px] mt-1">
                      {panel.components.filter(c => c.status === "Stable").length} stable ·{" "}
                      {panel.components.filter(c => c.status === "Planned").length} planned
                    </p>
                  </div>
                </div>

                {/* Components grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {panel.components.map((comp) => (
                    <div
                      key={comp.name}
                      className="comp-card group relative flex flex-col rounded-xl overflow-hidden cursor-pointer border border-white/8 hover:border-violet-500/40 transition-all duration-200"
                      style={{ background: "rgba(14,14,24,0.9)", clipPath: "inset(0 0% 0 0)" }}
                    >
                      {/* Preview */}
                      <div
                        className="relative overflow-hidden pointer-events-none"
                        style={{ height: 110, background: "rgba(8,8,18,0.95)" }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center p-2 select-none scale-[0.6] origin-center">
                          {comp.preview}
                        </div>
                      </div>
                      {/* Name bar */}
                      <div className="flex items-center justify-between px-2.5 py-2 border-t border-white/6">
                        <p className="text-[11px] font-semibold text-white/80 truncate leading-tight">{comp.name}</p>
                        <span className={`shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded-full ml-1 ${comp.statusColor}`}>
                          {comp.status === "Stable" ? "S" : "P"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right-side progress bar */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                {CATEGORIES.map((_, idx) => (
                  <div
                    key={idx}
                    className="w-0.5 rounded-full transition-all duration-300"
                    style={{
                      height: idx === pi ? 28 : 8,
                      background: idx === pi ? "rgba(139,92,246,0.9)" : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>

              {/* Panel counter */}
              <div className="absolute bottom-8 right-12 flex items-baseline gap-1">
                <span className="text-[22px] font-black text-white/20 font-mono tabular-nums leading-none">
                  0{pi + 1}
                </span>
                <span className="text-[13px] text-white/12 font-mono">/</span>
                <span className="text-[13px] text-white/12 font-mono">0{CATEGORIES.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
