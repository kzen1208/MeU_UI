"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

export interface TrainingCourse {
  id: string;
  track: string;
  period: string;
  imageSrc: string;
  isNew?: boolean;
}

interface InternTrainingCoursesProps {
  courses: TrainingCourse[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const InternTrainingCourses = React.forwardRef<
  HTMLDivElement,
  InternTrainingCoursesProps
>(
  (
    {
      courses,
      title,
      subtitle,
      className,
      ...props
    },
    ref
  ) => {
    const { language } = useLanguage();
    const t = translations[language].trainingCourses;
    const resolvedTitle = title ?? t.title;
    const resolvedSubtitle = subtitle ?? t.subtitle;
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);

    const checkScrollability = React.useCallback(() => {
      const container = scrollContainerRef.current;
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    }, []);

    React.useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
        checkScrollability();
        container.addEventListener("scroll", checkScrollability);
      }
      return () => {
        if (container) {
          container.removeEventListener("scroll", checkScrollability);
        }
      };
    }, [courses, checkScrollability]);

    const scroll = (direction: "left" | "right") => {
      const container = scrollContainerRef.current;
      if (container) {
        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

    return (
      <section
        ref={ref}
        className={cn("mx-auto w-full max-w-430 px-4 py-20 lg:px-12", className)}
        aria-labelledby="training-courses-heading"
        {...props}
      >
        <div className="mb-8 flex items-end justify-between gap-4 px-1">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4264ff]">
              {resolvedSubtitle}
            </p>
            <h2
              id="training-courses-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-[#050936] lg:text-5xl"
            >
              {resolvedTitle}
            </h2>
          </div>
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label={t.scrollLeftAria}
              className="rounded-full border border-[#050936]/10 bg-white p-2 text-[#050936] transition-opacity duration-300 hover:bg-[#f7f8ff] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label={t.scrollRightAria}
              className="rounded-full border border-[#050936]/10 bg-white p-2 text-[#050936] transition-opacity duration-300 hover:bg-[#f7f8ff] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 md:gap-6"
        >
          {courses.map((course) => (
            <div key={course.id} className="w-60 shrink-0 snap-start sm:w-70">
              <div className="group cursor-pointer">
                <div className="relative mb-3 overflow-hidden rounded-2xl border border-[#050936]/10 bg-white shadow-[0_18px_38px_rgba(5,9,54,0.08)] transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_rgba(5,9,54,0.14)]">
                  <img
                    src={course.imageSrc}
                    alt={course.track}
                    className="h-80 w-full object-cover sm:h-95"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-[#050936]/80 via-[#050936]/10 to-transparent p-4 text-white">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider">
                        {t.journeyLabel}
                      </h3>
                      <p className="text-xs text-white/80">{course.period}</p>
                    </div>
                    {course.isNew && (
                      <span className="w-fit rounded-full bg-[#4264ff] px-2 py-0.5 text-xs font-semibold text-white">
                        {t.newBadge}
                      </span>
                    )}
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-[#050936] sm:text-base">
                  {course.track}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
);

InternTrainingCourses.displayName = "InternTrainingCourses";
