"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

export default function FAQSection() {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-[#f7f8ff] px-4 py-16 text-[#050936] md:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            <HelpCircle className="mr-1 h-3 w-3" />
            {t.badge}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#050936]/60 md:text-lg">
            {t.description}
          </p>
        </motion.div>

        <div className="space-y-4">
          {t.items.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
              >
                <Card className="overflow-hidden border-[#050936]/10 bg-white transition-all hover:border-[#4264ff]/40 hover:shadow-md">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-4 text-left transition hover:bg-[#4264ff]/4 md:p-6"
                  >
                    <span className="pr-4 text-base font-semibold md:text-lg">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-[#050936]/45" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#050936]/10 p-4 md:p-6">
                          <p className="text-sm text-[#050936]/60 md:text-base">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 text-center md:mt-16"
        >
          <Card className="border-[#050936]/10 bg-linear-to-br from-white to-[#eef2ff] p-6 md:p-8">
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-[#4264ff]" />
            <h3 className="mb-2 text-xl font-bold md:text-2xl">{t.ctaTitle}</h3>
            <p className="mb-6 text-sm text-[#050936]/60 md:text-base">{t.ctaDescription}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="https://meu-solutions.com/">{t.ctaContact}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#050936]/15 bg-white text-[#050936] hover:border-[#050936]/25 hover:bg-[#eef2ff]"
              >
                <Link href="/#training">{t.ctaDocs}</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
