"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Direction = "left" | "right";

interface GalleryPhoto {
  id: number;
  order: number;
  x: string;
  y: string;
  zIndex: number;
  direction: Direction;
  src: string;
  alt: string;
}

export interface PhotoGalleryProps {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  photos: GalleryPhoto[];
  animationDelay?: number;
}

export const PhotoGallery = ({
  eyebrow,
  headingPrefix,
  headingHighlight,
  description,
  ctaLabel,
  ctaHref,
  photos,
  animationDelay = 0.5,
}: PhotoGalleryProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000
    );

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  };

  return (
    <section className="reveal-section relative bg-[#f7f8ff] pb-20 pt-24">
      <div className="absolute inset-0 top-50 -z-10 hidden h-75 w-full bg-[linear-gradient(to_right,#05093614_1px,transparent_1px),linear-gradient(to_bottom,#05093614_1px,transparent_1px)] bg-size-[3rem_3rem] opacity-60 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] md:block" />

      <p className="reveal-item my-2 text-center text-xs font-black uppercase tracking-[0.18em] text-[#4264ff]">
        {eyebrow}
      </p>
      <h2 className="reveal-item z-20 mx-auto max-w-2xl px-6 py-3 text-center text-4xl font-bold tracking-tight text-[#050936] md:text-6xl">
        {headingPrefix} <span className="text-[#4264ff]">{headingHighlight}</span>
      </h2>
      {description && (
        <p className="reveal-item mx-auto max-w-xl px-6 text-center text-sm text-[#050936]/60 sm:text-base">
          {description}
        </p>
      )}

      <div className="relative mb-8 mt-6 h-87.5 w-full items-center justify-center lg:flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-55 w-55">
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{ x: photo.x, y: photo.y, order: photo.order }}
                >
                  <Photo
                    width={220}
                    height={220}
                    src={photo.src}
                    alt={photo.alt}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="reveal-item flex w-full justify-center">
        <Button asChild>
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </section>
  );
};

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Min value should be less than max value");
  }
  return Math.random() * (max - min) + min;
}

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
}) => {
  const [rotation] = useState<number>(
    () => getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1)
  );
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(className, "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing")}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[#050936]/10 shadow-[0_18px_38px_rgba(5,9,54,0.12)]">
        <img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} />
      </div>
    </motion.div>
  );
};
