"use client";

import {
  BadgeCheck,
  Building2,
  Code2,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

const serviceIcons = [Code2, ShieldCheck, Sparkles];

export default function CompanyIntroScroll() {
  const { language } = useLanguage();
  const t = translations[language].companyIntro;
  const facts = t.facts;
  const serviceItems = t.services.map((service, index) => ({
    ...service,
    icon: serviceIcons[index],
  }));

  return (
    <section id="system" className="bg-[#f7f8ff]">
      <ContainerScroll
        titleComponent={
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#4264ff]">
              {t.eyebrow}
            </p>
            <h2 className="mx-auto max-w-5xl text-[clamp(2.6rem,7vw,6.6rem)] font-bold leading-[0.95] tracking-normal text-[#050936]">
              {t.headingPrefix} <span className="text-[#4264ff]">{t.headingHighlight1}</span>{" "}
              {t.headingMid} <span className="text-[#4264ff]">{t.headingHighlight2}</span>
              {t.headingSuffix}
            </h2>
          </div>
        }
      >
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#07103a] text-white">
          <div className="grid flex-1 gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#4264ff]">
                    <Building2 className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#85a0ff]">
                      {t.companyName}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">{t.title}</h3>
                  </div>
                </div>
                <p className="max-w-2xl text-base font-medium leading-relaxed text-white/68 sm:text-lg">
                  {t.description}
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/38">
                      {fact.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-[#85a0ff]">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div className="space-y-3">
                {serviceItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="rounded-xl border border-white/10 bg-white/[0.045] p-4"
                    >
                      <div className="flex gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4264ff]/18 text-[#a9bbff]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-bold text-white">{item.title}</h4>
                          <p className="mt-1 text-sm font-medium leading-relaxed text-white/52">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#85a0ff]/20 bg-[#4264ff]/14 p-4">
                  <BadgeCheck className="h-5 w-5 text-[#bcccff]" />
                  <p className="mt-4 text-sm font-semibold text-white">{t.uiHubCallout}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <MapPin className="h-5 w-5 text-[#bcccff]" />
                  <p className="mt-4 text-sm font-semibold text-white">{t.locationCallout}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid border-t border-white/10 bg-black/18 sm:grid-cols-3">
            {t.bottomGrid.map((item) => (
              <div key={item.title} className="border-white/10 p-5 sm:border-r sm:last:border-r-0">
                <UsersRound className="h-5 w-5 text-[#85a0ff]" />
                <h4 className="mt-4 text-sm font-bold text-white">{item.title}</h4>
                <p className="mt-1 text-xs font-medium leading-relaxed text-white/45">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
