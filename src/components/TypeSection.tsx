"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote:
      "Rút ngắn thời gian phát triển xuống 60%. Component sẵn có, nhất quán, tái sử dụng ngay — không cần xây lại từ đầu.",
    name: "Nguyễn Văn Anh",
    role: "Frontend Developer",
    initials: "NA",
    gradient: "linear-gradient(145deg, #c2410c 0%, #ea580c 40%, #fb923c 100%)",
    accentColor: "#fb923c",
  },
  {
    quote:
      "Design tokens và multi-brand themes giúp mình duy trì brand consistency dễ dàng hơn bao giờ hết.",
    name: "Trần Thị Bảo",
    role: "UI/UX Designer",
    initials: "TB",
    gradient: "linear-gradient(145deg, #0369a1 0%, #0284c7 40%, #38bdf8 100%)",
    accentColor: "#38bdf8",
  },
  {
    quote:
      "Team ship feature nhanh hơn hẳn. Không còn mất cả sprint chỉ để dựng UI — tập trung hết vào business logic.",
    name: "Lê Minh Châu",
    role: "Product Manager",
    initials: "LC",
    gradient: "linear-gradient(145deg, #5b21b6 0%, #7c3aed 40%, #a78bfa 100%)",
    accentColor: "#a78bfa",
  },
  {
    quote:
      "TypeScript support + shadcn/ui integration hoàn hảo. Drop-in vào codebase không cần config phức tạp.",
    name: "Phạm Đức Huy",
    role: "Full-stack Developer",
    initials: "PH",
    gradient: "linear-gradient(145deg, #065f46 0%, #059669 40%, #34d399 100%)",
    accentColor: "#34d399",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    /* Eyebrow + headline reveal */
    gsap.from("[data-testi-eyebrow]", {
      y: 12,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    });

    gsap.from("[data-testi-headline]", {
      yPercent: 110,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
    });

    /* Cards cascade in */
    gsap.from(".testi-card", {
      y: 48,
      opacity: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".testi-card", start: "top 88%", once: true },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] py-28 px-4 sm:px-6"
    >
      {/* Subtle top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* ── Eyebrow ─────────────────────────────────── */}
        <p
          data-testi-eyebrow
          className="text-center text-[13px] font-medium text-slate-500 tracking-widest uppercase mb-6"
        >
          Testimonials
        </p>

        {/* ── Headline ────────────────────────────────── */}
        <div className="text-center mb-16 overflow-hidden">
          <div className="overflow-hidden">
            <h2
              data-testi-headline
              className="inline-block text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-tight text-white tracking-tight"
            >
              Đừng chỉ nghe từ
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              data-testi-headline
              className="inline-block text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-tight text-white/50 tracking-tight"
            >
              chúng tôi thôi...
            </h2>
          </div>
        </div>

        {/* ── Cards ───────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testi-card group relative flex flex-col rounded-2xl overflow-hidden"
              style={{ minHeight: 420 }}
            >
              {/* Photo / gradient background */}
              <div
                className="flex-1 flex items-center justify-center relative"
                style={{ background: t.gradient }}
              >
                {/* Large decorative initial */}
                <span
                  className="select-none font-black text-[8rem] leading-none opacity-15 text-white"
                  aria-hidden
                >
                  {t.initials}
                </span>

                {/* Abstract grid decoration */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-10"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden
                >
                  {[0, 40, 80, 120, 160, 200].map((v) => (
                    <g key={v}>
                      <line x1={v} y1="0" x2={v} y2="200" stroke="white" strokeWidth="0.5" />
                      <line x1="0" y1={v} x2="200" y2={v} stroke="white" strokeWidth="0.5" />
                    </g>
                  ))}
                </svg>

                {/* Accent dot */}
                <div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-70"
                  style={{ background: t.accentColor }}
                />
              </div>

              {/* Frosted glass quote panel */}
              <div
                className="relative px-5 py-5"
                style={{
                  background: "rgba(10,10,15,0.82)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Quote */}
                <p className="text-[13px] leading-relaxed text-white/75 mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1l1.5 3.1L12 4.6l-2.5 2.4.6 3.4L7 8.9l-3.1 1.5.6-3.4L2 4.6l3.5-.5L7 1z"
                        fill="#facc15"
                      />
                    </svg>
                  ))}
                </div>

                {/* Author row */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                    style={{ background: t.gradient }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[12.5px] font-semibold text-white leading-tight">{t.name}</p>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
