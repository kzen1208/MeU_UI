"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="w-full max-w-xs rounded-3xl border border-[#050936]/10 bg-white p-10 shadow-[0_18px_38px_rgba(5,9,54,0.08)]"
                  key={i}
                >
                  <div className="text-sm leading-relaxed text-[#050936]/75">{text}</div>
                  <div className="mt-5 flex items-center gap-2">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium leading-5 tracking-tight text-[#050936]">{name}</div>
                      <div className="leading-5 tracking-tight text-[#050936]/55">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const TESTIMONIAL_IMAGES = [
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/women/6.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/women/8.jpg",
  "https://randomuser.me/api/portraits/men/9.jpg",
];

const Testimonials = () => {
  const { language } = useLanguage();
  const t = translations[language].testimonials;

  const testimonials: TestimonialItem[] = t.items.map((item, index) => ({
    ...item,
    image: TESTIMONIAL_IMAGES[index],
  }));

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="relative bg-[#f7f8ff] py-20">
      <div className="mx-auto w-full max-w-430 px-4 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-135 flex-col items-center justify-center text-center"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border border-[#050936]/10 px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#4264ff]">
              {t.badgeLabel}
            </div>
          </div>

          <h2 className="mt-5 text-xl font-bold tracking-tighter text-[#050936] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-5 text-center text-[#050936]/65">{t.subtitle}</p>
        </motion.div>

        <div className="mt-10 flex max-h-185 justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export { Testimonials };
