"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeEase = [0.25, 0.4, 0.25, 1] as const;

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-linear-to-r to-transparent",
            gradient,
            "border-2 border-white/15 backdrop-blur-xs",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometricShapes({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 bg-linear-to-br from-[#4264ff]/6 via-transparent to-[#ed649e]/5 blur-3xl" />

      <ElegantShape
        delay={0.3}
        width={600}
        height={140}
        rotate={12}
        gradient="from-[#4264ff]/15"
        className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
      />

      <ElegantShape
        delay={0.5}
        width={500}
        height={120}
        rotate={-15}
        gradient="from-[#ed649e]/15"
        className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
      />

      <ElegantShape
        delay={0.4}
        width={300}
        height={80}
        rotate={-8}
        gradient="from-[#8f89ff]/15"
        className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
      />

      <ElegantShape
        delay={0.6}
        width={200}
        height={60}
        rotate={20}
        gradient="from-[#85a0ff]/15"
        className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
      />

      <ElegantShape
        delay={0.7}
        width={150}
        height={40}
        rotate={-25}
        gradient="from-[#7ea2ff]/15"
        className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]"
      />

      <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-[#030303]/80" />
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
          {topSlot && (
            <motion.div
              custom={-1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-6 flex justify-center md:mb-8"
            >
              {topSlot}
            </motion.div>
          )}

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
            <h1 className="mb-6 text-4xl font-bold tracking-normal sm:text-6xl md:mb-8 md:text-8xl">
              <span className="bg-linear-to-b from-white to-white/80 bg-clip-text text-transparent">
                {title1}
              </span>
              <br />
              <span className="bg-linear-to-r from-[#85a0ff] via-white/90 to-[#ed649e] bg-clip-text text-transparent">
                {title2}
              </span>
            </h1>
          </motion.div>

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

export { ElegantShape, HeroGeometric, HeroGeometricShapes };
