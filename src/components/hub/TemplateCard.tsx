import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TemplateItem } from "@/lib/templates-data";

interface TemplateCardProps {
  template: TemplateItem;
  categoryName: string;
  freeLabel: string;
  className?: string;
}

export default function TemplateCard({ template, categoryName, freeLabel, className }: TemplateCardProps) {
  return (
    <article
      className={cn(
        "template-card group relative flex min-h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#111111]",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden border-b border-white/10 bg-[#050505] p-3">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-size-[16px_16px]" />
        <div className="relative h-full w-full transition duration-300 group-hover:scale-[1.02]">
          {template.preview}
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-2">
          {template.link ? (
            <a
              href={template.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={template.link}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-black/55 text-white/70 backdrop-blur-sm transition hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
          <span
            className={cn(
              "rounded-md border px-2 py-1 text-xs font-bold backdrop-blur-sm",
              template.price === null
                ? "border-lime-300/40 bg-lime-300/10 text-lime-200"
                : "border-white/15 bg-black/55 text-white"
            )}
          >
            {template.price === null ? freeLabel : `$${template.price}`}
          </span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between gap-3 px-4 py-3.5">
        <h3 className="truncate text-sm font-semibold text-white">{template.name}</h3>
        <span className="shrink-0 rounded-md border border-white/10 px-2 py-1 text-[11px] font-medium text-white/45">
          {categoryName}
        </span>
      </div>
    </article>
  );
}
