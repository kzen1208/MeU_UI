"use client";

import Figma from "@thesvg/react/figma";
import Framer from "@thesvg/react/framer";
import Gsap from "@thesvg/react/gsap";
import ReactLogo from "@thesvg/react/react";
import ShadcnUi from "@thesvg/react/shadcn-ui";
import TailwindCss from "@thesvg/react/tailwind-css";
import Typescript from "@thesvg/react/typescript";
import Vercel from "@thesvg/react/vercel";
import type { SVGProps } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

function NextJsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="90" cy="90" r="90" fill="currentColor" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="white"
      />
      <rect x="115" y="54" width="12" height="72" fill="white" />
    </svg>
  );
}

const logos = [
  { id: "figma", label: "Figma", icon: Figma },
  { id: "next", label: "Next.js", icon: NextJsLogo },
  { id: "tailwind", label: "Tailwind CSS", icon: TailwindCss },
  { id: "shadcn", label: "shadcn/ui", icon: ShadcnUi },
  { id: "react", label: "React", icon: ReactLogo },
  { id: "typescript", label: "TypeScript", icon: Typescript },
  { id: "vercel", label: "Vercel", icon: Vercel },
  { id: "framer", label: "Framer", icon: Framer },
  { id: "gsap", label: "GSAP", icon: Gsap },
];

export default function LogosSlider() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative overflow-hidden bg-[#f7f8ff] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-430">
        <p className="mb-6 text-xs font-black uppercase tracking-[0.18em] text-[#4264ff]">
          {t.logos.builtAround}
        </p>
        <div className="relative h-[96px] w-full overflow-hidden">
          <InfiniteSlider className="flex h-full w-full items-center" duration={30} gap={64}>
            {logos.map((logo) => {
              const Icon = logo.icon;

              return (
                <div
                  key={logo.id}
                  className="flex w-48 items-center justify-center gap-3 text-[#050936]"
                >
                  <Icon className="h-8 w-8 shrink-0" aria-label={logo.label} role="img" />
                  <span className="text-sm font-bold">{logo.label}</span>
                </div>
              );
            })}
          </InfiniteSlider>
          <ProgressiveBlur
            className="pointer-events-none absolute left-0 top-0 h-full w-[180px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute right-0 top-0 h-full w-[180px]"
            direction="right"
            blurIntensity={1}
          />
        </div>
      </div>
    </section>
  );
}
