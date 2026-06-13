"use client";

import { forwardRef, useRef } from "react";
import { ReactLenis } from "lenis/react";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

export interface StackingProject {
  title: string;
  description: string;
  link: string;
  color: string;
  eyebrow?: string;
}

interface CardProps extends StackingProject {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  link,
  color,
  eyebrow,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const { language } = useLanguage();
  const t = translations[language].stackingCards;

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.45, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center px-4"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-7vh + ${i * 32}px)`,
          zIndex: i + 1,
        }}
        className="relative -top-[12%] flex h-auto min-h-120 w-full max-w-315 origin-top flex-col overflow-hidden rounded-4xl p-6 text-[#050936] shadow-[0_34px_80px_rgba(0,0,0,0.24)] sm:h-130 sm:p-8 lg:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="rounded-full border border-[#050936]/12 bg-white/35 px-3 py-1 text-xs font-black uppercase tracking-[0.16em]">
              {eyebrow ?? t.defaultEyebrow}
            </span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-normal sm:text-5xl">
              {title}
            </h2>
          </div>
          <span className="font-mono text-4xl font-black text-[#050936]/45">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-6 grid min-h-0 flex-1 gap-6 lg:grid-cols-[0.38fr_0.62fr] lg:gap-10">
          <div className="flex flex-col justify-end">
            <p className="text-base font-medium leading-relaxed text-[#050936]/72">
              {description}
            </p>
            <span className="mt-6 inline-flex w-fit items-center gap-2 border-b border-[#050936]/40 pb-1 text-sm font-bold">
              {t.seeMore}
              <svg
                aria-hidden="true"
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>

          <div className="relative min-h-[210px] overflow-hidden rounded-3xl border border-[#050936]/10 bg-[#050936]/10">
            <motion.div className="h-full w-full" style={{ scale: imageScale }}>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${link})` }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050936]/45 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: StackingProject[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(
  ({ projects }, ref) => {
    const container = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start start", "end end"],
    });
    const { language } = useLanguage();
    const t = translations[language].stackingCards;

    return (
      <ReactLenis root>
        <main ref={container} className="bg-[#050936] text-white">
          <section
            ref={ref}
            className="relative grid min-h-[70vh] w-full place-content-center overflow-hidden bg-[#050936] px-6 text-center"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff16_1px,transparent_1px),linear-gradient(to_bottom,#ffffff16_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_62%_48%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="relative mx-auto max-w-5xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#85a0ff]">
                {t.eyebrow}
              </p>
              <h1 className="mt-5 text-5xl font-semibold leading-[1.08] tracking-normal text-white md:text-7xl">
                {t.heading}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/56 md:text-lg">
                {t.description}
              </p>
            </div>
          </section>

          <section className="w-full bg-[#050936]">
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.045;

              return (
                <Card
                  key={`${project.title}-${i}`}
                  i={i}
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                  {...project}
                />
              );
            })}
          </section>
        </main>
      </ReactLenis>
    );
  }
);

Component.displayName = "Component";

export default Component;
