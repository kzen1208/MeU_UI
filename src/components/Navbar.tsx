"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin();

const NAV_LINKS = [
  { label: "Browse",    href: "#browse" },
  { label: "Features",  href: "#features" },
  { label: "Roadmap",   href: "#roadmap" },
  { label: "Docs",      href: "#docs" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.1,
    });
  }, { scope: navRef });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#06060C]/96 backdrop-blur-2xl border-b border-white/7 shadow-[0_1px_0_rgba(255,255,255,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-8">

        {/* ── Logo ──────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-8 h-8 rounded-[9px] bg-linear-to-br from-violet-500 to-purple-700 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
              <path d="M3 3L8 3L13 8L8 13L3 8L8 3Z" fill="white" opacity="0.9" />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-white text-[15px] tracking-tight select-none">
            MeU <span className="text-violet-400">UI Hub</span>
          </span>
        </Link>

        {/* ── Desktop nav ────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-[13.5px] text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-150 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Right CTAs ─────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {/* Version badge */}
          <span className="text-[11px] font-semibold text-slate-600 border border-white/8 rounded-full px-2.5 py-1 select-none">
            v1.0
          </span>

          <a
            href="#browse"
            className="px-4 py-1.5 text-[13px] text-slate-300 hover:text-white border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/4 transition-all duration-200 font-medium"
          >
            Xem Demo
          </a>

          <a
            href="#docs"
            className="group relative px-4 py-1.5 text-[13px] font-semibold text-white rounded-lg overflow-hidden transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              boxShadow: "0 0 0 1px rgba(167,139,250,0.25), 0 4px 16px rgba(124,58,237,0.35)",
            }}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Get Started
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {/* Hover shimmer */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </a>
        </div>

        {/* ── Mobile menu toggle ─────────────────────────────────── */}
        <button
          className="md:hidden ml-auto p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-3.5 flex flex-col justify-between">
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-72 border-t border-white/6" : "max-h-0"
        } bg-[#06060C]/98 backdrop-blur-2xl`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 text-[13.5px] text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all duration-150 font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 mt-1 border-t border-white/7 flex gap-2">
            <a
              href="#browse"
              onClick={() => setMenuOpen(false)}
              className="flex-1 py-2.5 text-[13px] text-center text-slate-300 border border-white/10 rounded-lg font-medium hover:border-white/20 transition-colors"
            >
              Xem Demo
            </a>
            <a
              href="#docs"
              onClick={() => setMenuOpen(false)}
              className="flex-1 py-2.5 text-[13px] text-center text-white rounded-lg font-semibold"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
