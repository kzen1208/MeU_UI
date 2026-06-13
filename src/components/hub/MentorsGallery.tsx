"use client";

import { PhotoGallery } from "@/components/ui/gallery";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

const MENTOR_PHOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=440&h=440&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=440&h=440&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=440&h=440&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=440&h=440&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=440&h=440&q=80",
];

const PHOTO_LAYOUT = [
  { x: "-340px", y: "-40px", zIndex: 10, direction: "left" as const },
  { x: "-170px", y: "20px", zIndex: 20, direction: "left" as const },
  { x: "0px", y: "-20px", zIndex: 30, direction: "right" as const },
  { x: "170px", y: "20px", zIndex: 20, direction: "right" as const },
  { x: "340px", y: "-40px", zIndex: 10, direction: "right" as const },
];

export default function MentorsGallery() {
  const { language } = useLanguage();
  const t = translations[language].mentorsGallery;

  const photos = t.mentors.map((mentor, index) => ({
    id: index + 1,
    order: index,
    x: PHOTO_LAYOUT[index].x,
    y: PHOTO_LAYOUT[index].y,
    zIndex: PHOTO_LAYOUT[index].zIndex,
    direction: PHOTO_LAYOUT[index].direction,
    src: MENTOR_PHOTOS[index],
    alt: mentor.name,
  }));

  return (
    <PhotoGallery
      eyebrow={t.eyebrow}
      headingPrefix={t.headingPrefix}
      headingHighlight={t.headingHighlight}
      description={t.description}
      ctaLabel={t.ctaLabel}
      ctaHref="/register"
      photos={photos}
    />
  );
}
