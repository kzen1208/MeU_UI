"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const mounted   = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    const glow = glowRef.current!;

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    // QuickTo for max performance — dot follows exactly
    const dotX  = gsap.quickTo(dot,  "x", { duration: 0.08, ease: "power2.out" });
    const dotY  = gsap.quickTo(dot,  "y", { duration: 0.08, ease: "power2.out" });

    // Ring lags behind
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    // Glow lags even more
    const glowX = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      glowX(e.clientX);
      glowY(e.clientY);
    };

    // Hover effects: interactive elements expand ring
    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.6, borderColor: "rgba(167,139,250,0.8)", duration: 0.35, ease: "power2.out" });
      gsap.to(dot,  { scale: 0.4, opacity: 0.8, duration: 0.25 });
    };
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 0.4, borderColor: "rgba(167,139,250,0.5)", duration: 0.35, ease: "power2.out" });
      gsap.to(dot,  { scale: 1, opacity: 1, duration: 0.25 });
    };

    // Click pulse
    const onClick = () => {
      gsap.fromTo(ring,
        { scale: 1 },
        { scale: 2.5, opacity: 0, duration: 0.45, ease: "power2.out",
          onComplete: () => gsap.set(ring, { scale: 1, opacity: 0.4 }) }
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    const interactives = document.querySelectorAll<HTMLElement>(
      "a, button, [data-cursor='hover']"
    );
    interactives.forEach((el) => {
      el.style.cursor = "none";
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    // Show on first move
    const showCursor = () => {
      gsap.to([dot, ring, glow], { opacity: 1, duration: 0.3 });
      window.removeEventListener("mousemove", showCursor);
    };
    window.addEventListener("mousemove", showCursor, { once: true });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Outer glow blob */}
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          willChange: "transform",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(167,139,250,0.5)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          willChange: "transform",
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#a78bfa",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: 0,
          willChange: "transform",
          boxShadow: "0 0 8px rgba(167,139,250,0.8)",
        }}
      />
    </>
  );
}
