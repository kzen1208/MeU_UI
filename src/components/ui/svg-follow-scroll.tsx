"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

const Skiper19 = () => {
  const { language } = useLanguage();
  const t = translations[language].skiper;

  return (
    <section className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f7f8ff] px-4 py-20 text-[#050936]">
      <div className="relative flex w-fit flex-col items-center justify-center gap-5 text-center">
        <h1 className="relative z-10 text-7xl font-medium tracking-[-0.08em] lg:text-9xl">
          {t.headingLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < t.headingLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="relative z-10 max-w-2xl text-xl font-medium text-[#050936]/70">
          {t.subtitle}
        </p>
      </div>
    </section>
  );
};

export { Skiper19 };
