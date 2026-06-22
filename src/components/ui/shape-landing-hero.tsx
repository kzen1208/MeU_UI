"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import GlowHorizonFM from "@/components/ui/glow-horizon";

const fadeEase = [0.25, 0.4, 0.25, 1] as const;

function HeroGeometricShapes({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none overflow-hidden", className)} aria-hidden>
      <GlowHorizonFM variant="top" />
    </div>
  );
}

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
  description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
  className,
  topSlot,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  className?: string;
  topSlot?: ReactNode;
}) {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: fadeEase,
      },
    }),
  };

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030303]",
        className
      )}
    >
      <HeroGeometricShapes className="absolute inset-0" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-[#4264ff]" />
            <span className="text-sm tracking-normal text-white/60">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="mb-6 text-5xl font-bold tracking-normal sm:text-7xl md:mb-8 md:text-9xl">
              <span className="bg-linear-to-b from-white to-white/80 bg-clip-text text-transparent">
                {title1}
              </span>
              <br />
              <span className="bg-linear-to-r from-[#85a0ff] via-white/90 to-[#ed649e] bg-clip-text text-transparent">
                {title2}
              </span>
            </h1>
          </motion.div>

          {topSlot && (
            <motion.div
              custom={1.5}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 flex justify-center md:mb-10"
            >
              {topSlot}
            </motion.div>
          )}

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="mx-auto mb-8 max-w-xl px-4 text-base font-light leading-relaxed tracking-normal text-white/40 sm:text-lg md:text-xl">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { HeroGeometric, HeroGeometricShapes };
