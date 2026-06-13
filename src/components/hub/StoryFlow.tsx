"use client";

import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

const SECTION_THEMES = [
  { backgroundColor: "#050936", color: "#ffffff", divider: "border-white/30" },
  { backgroundColor: "#4264ff", color: "#ffffff", divider: "border-white/30" },
  { backgroundColor: "#f7f8ff", color: "#050936", divider: "border-[#050936]/15" },
  { backgroundColor: "#050936", color: "#ffffff", divider: "border-white/30" },
  { backgroundColor: "#4264ff", color: "#ffffff", divider: "border-white/30" },
];

export default function StoryFlow() {
  const { language } = useLanguage();
  const t = translations[language].storyFlow;

  return (
    <FlowArt aria-label="MeU UI Hub story">
      {t.sections.map((section, index) => {
        const theme = SECTION_THEMES[index % SECTION_THEMES.length];

        return (
          <FlowSection
            key={section.label}
            aria-label={section.label}
            style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em]">{section.label}</p>
            <hr className={`my-[2vw] border-none border-t ${theme.divider}`} />
            <div>
              <h2 className="text-[clamp(2.25rem,8vw,8rem)] font-bold uppercase leading-[1.05] tracking-tight">
                {section.heading.map((line, lineIndex) => (
                  <span key={lineIndex} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <hr className={`my-[2vw] border-none border-t ${theme.divider}`} />
            <p
              className={`max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed ${
                section.groups.length === 0 ? "sm:mt-auto" : ""
              }`}
            >
              {section.description}
            </p>

            {section.groups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <hr className={`my-[2vw] border-none border-t ${theme.divider}`} />
                <div className="flex flex-wrap gap-[3vw]">
                  {group.map((item) => (
                    <div key={item.title} className="min-w-[180px] flex-1">
                      <p className="mb-2 text-sm font-bold uppercase tracking-wider">
                        {item.title}
                      </p>
                      <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
                {groupIndex === 0 && section.secondDescription && (
                  <>
                    <hr className={`my-[2vw] border-none border-t ${theme.divider}`} />
                    <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
                      {section.secondDescription}
                    </p>
                  </>
                )}
              </div>
            ))}
          </FlowSection>
        );
      })}
    </FlowArt>
  );
}
