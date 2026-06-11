"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { ArrowUp, CheckCircle2, ExternalLink, Package, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-geist-sans), "Plus Jakarta Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  --footer-bg: #030303;
  --footer-fg: #f8fafc;
  --footer-muted: rgba(248, 250, 252, 0.55);
  --footer-border: rgba(255, 255, 255, 0.12);
  --footer-pill-bg-1: rgba(255, 255, 255, 0.08);
  --footer-pill-bg-2: rgba(255, 255, 255, 0.025);
  --footer-pill-border: rgba(255, 255, 255, 0.14);
  --footer-pill-hover: rgba(66, 100, 255, 0.18);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(66, 100, 255, 0.45)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 12px rgba(66, 100, 255, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(circle at 50% 50%, rgba(66, 100, 255, 0.22) 0%, rgba(133, 160, 255, 0.12) 42%, transparent 70%);
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--footer-pill-bg-1) 0%, var(--footer-pill-bg-2) 100%);
  box-shadow:
    0 18px 38px rgba(0, 0, 0, 0.28),
    inset 0 1px 1px rgba(255, 255, 255, 0.14),
    inset 0 -1px 2px rgba(0, 0, 0, 0.42);
  border: 1px solid var(--footer-pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--footer-pill-hover) 0%, rgba(255, 255, 255, 0.04) 100%);
  border-color: rgba(133, 160, 255, 0.45);
  color: var(--footer-fg);
}

.footer-giant-bg-text {
  font-size: 22vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: 0;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.07);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(248, 250, 252, 0.46) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 22px rgba(133, 160, 255, 0.18));
}
`;

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (event: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;

          gsap.to(element, {
            x: x * 0.22,
            y: y * 0.22,
            rotationX: -y * 0.08,
            rotationY: x * 0.08,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.35)",
            duration: 1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = ({ items }: { items: string[] }) => (
  <div className="flex items-center space-x-12 px-6">
    {items.map((item, index) => (
      <React.Fragment key={item}>
        {index > 0 && <span className="text-[#85a0ff]">✦</span>}
        <span>{item}</span>
      </React.Fragment>
    ))}
  </div>
);

export function CinematicFooter({ className }: { className?: string }) {
  const { language } = useLanguage();
  const t = translations[language].footer;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        id="roadmap"
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer
          className={cn(
            "cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#030303] text-white",
            className
          )}
        >
          <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          >
            ROADMAP
          </div>

          <div className="absolute left-0 top-12 z-10 h-32 w-full overflow-hidden">
            <div className="absolute left-[-10%] top-1/2 w-[120%] -translate-y-1/2 -rotate-2 scale-110 border-y border-white/10 bg-black/40 py-4 shadow-2xl backdrop-blur-md">
              <div className="flex w-max animate-footer-scroll-marquee text-xs font-bold uppercase tracking-[0.3em] text-white/50 md:text-sm">
                <MarqueeItem items={t.marqueeItems} />
                <MarqueeItem items={t.marqueeItems} />
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-20 flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#85a0ff]">
              {t.roadmapEyebrow}
            </p>
            <h2
              ref={headingRef}
              className="footer-text-glow mb-10 text-center text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-normal"
            >
              {t.roadmapHeading}
            </h2>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-wrap justify-center gap-4">
                {t.roadmapItems.map((item, index) => (
                  <MagneticButton
                    key={item}
                    as="a"
                    href={index === 2 ? "/components" : "#roadmap"}
                    className="footer-glass-pill group flex items-center gap-3 rounded-full px-6 py-4 text-sm font-bold text-white/78 md:px-8 md:text-base"
                  >
                    <span className="font-mono text-[#85a0ff]">0{index + 1}</span>
                    {item}
                    {index === 1 && (
                      <span className="rounded-full bg-[#4264ff] px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                        {t.currentLabel}
                      </span>
                    )}
                  </MagneticButton>
                ))}
              </div>

              <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
                <MagneticButton
                  as="a"
                  href="/components"
                  className="footer-glass-pill flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-white/58 hover:text-white md:text-sm"
                >
                  <Package className="h-4 w-4" />
                  {t.openStore}
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="/#training"
                  className="footer-glass-pill flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-white/58 hover:text-white md:text-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  {t.trainingFlow}
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://meu-solutions.com/"
                  className="footer-glass-pill flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-white/58 hover:text-white md:text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t.meuSolutionsLink}
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40 md:text-xs">
              {t.copyright}
            </div>

            <div className="flex items-center gap-4">
              <div className="footer-glass-pill flex cursor-default items-center gap-2 rounded-full border-white/10 px-6 py-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/45 md:text-xs">
                  {t.builtWith}
                </span>
                <CheckCircle2 className="h-4 w-4 animate-footer-heartbeat text-[#85a0ff]" />
                <span className="text-xs font-black tracking-normal text-white md:text-sm">
                  MeU Solutions
                </span>
              </div>

              <MagneticButton
                as="button"
                onClick={scrollToTop}
                className="footer-glass-pill group flex h-12 w-12 items-center justify-center rounded-full text-white/55 hover:text-white"
                aria-label={t.backToTopAria}
              >
                <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5" />
              </MagneticButton>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
