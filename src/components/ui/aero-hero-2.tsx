import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface AeroHero2Props {
  backgroundImage: string;
  heading: string;
  description: string;
  avatars: string[];
  statValue: string;
  statLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function AeroHero2({
  backgroundImage,
  heading,
  description,
  avatars,
  statValue,
  statLabel,
  ctaLabel,
  ctaHref,
}: AeroHero2Props) {
  return (
    <section className="relative flex h-screen w-full items-end justify-center">
      <div
        className="absolute inset-0 h-full bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-[#050936] via-[#050936]/55 to-[#050936]/10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 pb-20 text-left text-white md:px-0">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-5xl font-bold uppercase tracking-tight text-white md:text-7xl">
              {heading}
            </h2>

            <p className="max-w-2xl text-lg font-light text-white/85 md:text-xl">
              {description}
            </p>
          </div>

          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex -space-x-3">
                {avatars.map((src, index) => (
                  <Avatar
                    key={src}
                    className="h-12 w-12 border-2 border-[#4264ff]"
                    style={{ zIndex: avatars.length - index }}
                  >
                    <AvatarImage src={src} alt="" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex flex-col text-sm font-normal">
                <span className="text-base sm:text-lg">{statValue}</span>
                <span className="text-white/65">{statLabel}</span>
              </div>
            </div>

            <Link href={ctaHref} className="flex w-fit gap-6">
              <Button className="group mx-auto flex h-fit cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent p-0 shadow-none hover:bg-transparent">
                <span className="rounded-full bg-[#4264ff] px-6 py-3 text-white duration-500 ease-in-out group-hover:bg-white group-hover:text-[#050936] group-hover:transition-colors">
                  {ctaLabel}
                </span>
                <div className="relative flex h-fit items-center overflow-hidden rounded-full bg-[#4264ff] p-5 text-white duration-500 ease-in-out group-hover:bg-white group-hover:text-[#050936] group-hover:transition-colors">
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
