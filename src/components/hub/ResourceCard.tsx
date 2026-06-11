"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Eye, Heart } from "lucide-react";
import type { Category, ComponentItem } from "@/lib/components-data";
import { useAuth } from "@/lib/auth/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

function componentExportName(name: string) {
  return name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function componentAnchor(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface ResourceCardProps {
  category: Category;
  component: ComponentItem;
  className?: string;
  compact?: boolean;
  showCategory?: boolean;
}

export default function ResourceCard({
  category,
  component,
  className,
  compact = false,
  showCategory = true,
}: ResourceCardProps) {
  const { language } = useLanguage();
  const t = translations[language].componentsPage.resourceCard;
  const { user, toggleFavorite } = useAuth();
  const [copied, setCopied] = useState(false);
  const exportName = useMemo(() => componentExportName(component.name), [component.name]);
  const href = `/category/${category.slug}#${componentAnchor(component.name)}`;
  const stable = component.status === "Stable";
  const isFavorite = user?.favorites.includes(component.name) ?? false;

  const handleCopy = async () => {
    const snippet = `import { ${exportName} } from "@meu/ui";\n\n<${exportName} />`;

    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      id={componentAnchor(component.name)}
      className={cn(
        "resource-card group relative flex min-h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] transition duration-200 hover:-translate-y-0.5 hover:border-[#4264ff]/55 hover:bg-[#111111]",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-white/10 bg-black",
          compact ? "h-[10.5rem]" : "h-56"
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(66,100,255,0.16),transparent_42%),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[auto,32px_32px,32px_32px]" />
        <div className="absolute inset-0 flex items-center justify-center p-5">
          <div
            className={cn(
              "w-full max-w-[360px] transition duration-300 group-hover:scale-[1.03]",
              compact && "scale-[0.92] group-hover:scale-95"
            )}
          >
            {component.preview}
          </div>
        </div>
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span
            className={cn(
              "rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em]",
              stable
                ? "border-lime-300/40 bg-lime-300/10 text-lime-200"
                : "border-sky-300/35 bg-sky-300/10 text-sky-200"
            )}
          >
            {stable ? t.ready : t.planned}
          </span>
        </div>

        <Link
          href={user ? href : "/login"}
          onClick={(event) => {
            if (!user) return;
            event.preventDefault();
            toggleFavorite(component.name);
          }}
          aria-label={isFavorite ? t.unfavoriteAria(component.name) : t.favoriteAria(component.name)}
          aria-pressed={isFavorite}
          className={cn(
            "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border backdrop-blur-sm transition",
            isFavorite
              ? "border-[#ed649e]/45 bg-[#ed649e]/15 text-[#ed649e]"
              : "border-white/14 bg-black/30 text-white/55 hover:border-[#ed649e]/40 hover:text-[#ed649e]"
          )}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </Link>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/80 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white">{component.name}</h3>
            {showCategory && (
              <p className="mt-1 text-sm text-white/45">{category.name}</p>
            )}
          </div>
          <span className="shrink-0 rounded-md border border-white/10 px-2 py-1 text-[11px] font-medium text-white/45">
            {category.tag}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-white/14 px-3 text-sm font-medium text-white/70 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? t.copied : t.copy}
          </button>
          <Link
            href={href}
            aria-label={t.viewAria(component.name)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/14 text-white/55 transition hover:border-[#4264ff]/60 hover:bg-[#4264ff]/10 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
