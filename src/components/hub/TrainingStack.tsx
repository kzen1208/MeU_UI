"use client";

import { CardSticky, ContainerScroll } from "@/components/ui/cards-stack";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

export default function TrainingStack() {
  const { language } = useLanguage();
  const t = translations[language].trainingStack;

  return (
    <section id="training" className="bg-[#f7f8ff]">
      <div className="container mx-auto min-h-svh place-content-center px-6 text-[#050936] xl:px-12">
        <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12">
          <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:py-16">
            <h5 className="text-xs uppercase tracking-wide text-[#4264ff]">{t.eyebrow}</h5>
            <h2 className="mb-6 mt-4 text-4xl font-bold tracking-tight">
              {t.headingPrefix}{" "}
              <span className="text-[#4264ff]">{t.headingHighlight}</span>{" "}
              {t.headingSuffix}
            </h2>
            <p className="max-w-prose text-sm text-[#050936]/65">{t.description}</p>
          </div>

          <ContainerScroll className="min-h-[260vh] space-y-8 pb-20 pt-12 md:min-h-[300vh]">
            {t.phases.map((phase, index) => (
              <CardSticky
                key={phase.id}
                index={index + 2}
                incrementY={40}
                className="rounded-2xl border border-[#050936]/10 bg-white/80 p-8 shadow-md backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="my-6 text-2xl font-bold tracking-tighter">
                    {phase.title}
                  </h2>
                  <h3 className="text-2xl font-bold text-[#4264ff]">
                    {String(index + 1).padStart(2, "0")}
                  </h3>
                </div>

                <p className="text-[#050936]/65">{phase.description}</p>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
