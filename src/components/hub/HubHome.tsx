"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Component as LumaSpin } from "@/components/ui/luma-spin";
import { Navbar1 } from "@/components/ui/shadcnblocks-com-navbar1";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { Skiper19 } from "@/components/ui/svg-follow-scroll";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import StackingCards from "@/components/ui/stacking-card";
import { useAuth } from "@/lib/auth/auth-context";
import CompanyIntroScroll from "./CompanyIntroScroll";
import HomeWelcomeBack from "./HomeWelcomeBack";
import LogosSlider from "./LogosSlider";
import TrainingStack from "./TrainingStack";
import TrainingJourneyShowcase from "./TrainingJourneyShowcase";
import TrainingCtaHero from "./TrainingCtaHero";
import MentorsGallery from "./MentorsGallery";
import StoryFlow from "./StoryFlow";
import FAQSection from "./FAQSection";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

gsap.registerPlugin(ScrollTrigger);

const STACKING_PROJECT_MEDIA = [
  { link: "https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=1200&auto=format&fit=crop", color: "#7ea2ff" },
  { link: "https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=1200&auto=format&fit=crop&q=80", color: "#8f89ff" },
  { link: "https://images.unsplash.com/photo-1605106901227-991bd663255c?w=1200&auto=format&fit=crop&q=80", color: "#eef2ff" },
  { link: "https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=1200&auto=format&fit=crop&q=80", color: "#ed649e" },
];

export default function HubHome() {
  const { language } = useLanguage();
  const t = translations[language];
  const { user } = useAuth();

  const stackingProjects = t.stackingCards.projects.map((project, index) => ({
    ...project,
    ...STACKING_PROJECT_MEDIA[index],
  }));

  const rootRef = useRef<HTMLDivElement>(null);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoaderVisible(false), 1000);

    return () => window.clearTimeout(timeout);
  }, []);

  useGSAP(
    () => {
      gsap.from(".loader-mark", {
        scale: 0.82,
        opacity: 0,
        duration: 0.55,
        ease: "back.out(1.8)",
      });

      gsap.to(".intro-loader", {
        autoAlpha: 0,
        display: "none",
        duration: 0.5,
        ease: "power2.out",
        delay: 0.72,
      });

      gsap.from(".nav-item", {
        y: -12,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>(".reveal-item");

        gsap.set(items, { y: 26, opacity: 0 });

        ScrollTrigger.create({
          trigger: section,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity",
            });
          },
        });
      });

      const magneticButtons = gsap.utils.toArray<HTMLElement>(".magnetic-button");
      const tiltCards = gsap.utils.toArray<HTMLElement>(".tilt-card");
      const cursorFollower = rootRef.current?.querySelector<HTMLElement>(".cursor-follower");
      let cursorCleanup = () => {};

      if (cursorFollower && window.matchMedia("(pointer: fine)").matches) {
        const handlePointerMove = (event: PointerEvent) => {
          gsap.to(cursorFollower, {
            x: event.clientX - 18,
            y: event.clientY - 18,
            autoAlpha: 1,
            duration: 0.28,
            ease: "power3.out",
          });
        };

        const handlePointerLeave = () => {
          gsap.to(cursorFollower, { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
        };

        window.addEventListener("pointermove", handlePointerMove);
        document.documentElement.addEventListener("mouseleave", handlePointerLeave);

        cursorCleanup = () => {
          window.removeEventListener("pointermove", handlePointerMove);
          document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
        };
      }

      const magneticCleanups = magneticButtons.map((button) => {
        const handleMove = (event: MouseEvent) => {
          const bounds = button.getBoundingClientRect();
          const x = event.clientX - bounds.left - bounds.width / 2;
          const y = event.clientY - bounds.top - bounds.height / 2;

          gsap.to(button, {
            x: x * 0.18,
            y: y * 0.22,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const handleLeave = () => {
          gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.45)" });
        };

        button.addEventListener("mousemove", handleMove);
        button.addEventListener("mouseleave", handleLeave);

        return () => {
          button.removeEventListener("mousemove", handleMove);
          button.removeEventListener("mouseleave", handleLeave);
        };
      });

      const tiltCleanups = tiltCards.map((card) => {
        const handleMove = (event: MouseEvent) => {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;

          gsap.to(card, {
            rotateY: x * 7,
            rotateX: y * -7,
            transformPerspective: 900,
            transformOrigin: "center",
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const handleLeave = () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: "power3.out" });
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);

        return () => {
          card.removeEventListener("mousemove", handleMove);
          card.removeEventListener("mouseleave", handleLeave);
        };
      });

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: ".story-pin",
          start: "top 12%",
          end: "+=620",
          pin: true,
          scrub: true,
        });

      });

      return () => {
        matchMedia.revert();
        cursorCleanup();
        magneticCleanups.forEach((cleanup) => cleanup());
        tiltCleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-clip bg-[#030303] text-[#04082d]">
      <div className="cursor-follower pointer-events-none fixed left-0 top-0 z-[70] hidden h-9 w-9 rounded-full border border-[#6f8dff]/45 opacity-0 mix-blend-screen lg:block" />

      {loaderVisible && (
        <div className="intro-loader fixed inset-0 z-[80] flex items-center justify-center bg-[#172250]">
          <div className="loader-mark flex h-28 w-28 items-center justify-center rounded-[1.75rem] border border-white/[0.16] bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_80px_rgba(0,0,0,0.18)]">
            <LumaSpin />
          </div>
        </div>
      )}

      <div className="overflow-x-clip bg-[#f7f8ff]">
        <section id="intro" className="home-hero relative overflow-hidden bg-[#030303] text-white">
          <Navbar1 className="nav-item relative z-30 border-white/[0.08] bg-[#030303]/72" />
          <HeroGeometric
            badge={t.hero.badge}
            title1={t.hero.title1}
            title2={t.hero.title2}
            description={t.hero.description}
            className="min-h-[calc(100vh-4rem)]"
            topSlot={user ? <HomeWelcomeBack /> : null}
          />
        </section>

        <LogosSlider />

        <CompanyIntroScroll />

        <section id="animation-system">
          <Skiper19 />
        </section>

        <StoryFlow />

        <TrainingJourneyShowcase />

        <TrainingCtaHero />

        <TrainingStack />

        <StackingCards projects={stackingProjects} />

        <MentorsGallery />

        <Testimonials />

        <FAQSection />

        <CinematicFooter />
      </div>
    </div>
  );
}
