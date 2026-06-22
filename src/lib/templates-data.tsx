import type { ReactNode } from "react";

export interface TemplateCategory {
  slug: string;
  name: string;
  group: "marketing" | "applications";
}

export interface TemplateItem {
  name: string;
  category: string;
  price: number | null;
  accent: string;
  preview: ReactNode;
  link?: string;
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  { slug: "landing-page", name: "Landing Page", group: "marketing" },
  { slug: "marketing", name: "Marketing", group: "marketing" },
  { slug: "personal-website", name: "Personal Website", group: "marketing" },
  { slug: "portfolio", name: "Portfolio", group: "marketing" },
  { slug: "blog", name: "Blog", group: "marketing" },
  { slug: "dashboard", name: "Dashboard", group: "applications" },
  { slug: "admin-panel", name: "Admin Panel", group: "applications" },
  { slug: "saas", name: "SaaS", group: "applications" },
  { slug: "ecommerce", name: "Ecommerce", group: "applications" },
  { slug: "ai", name: "AI", group: "applications" },
  { slug: "authentication", name: "Authentication", group: "applications" },
];

export type TemplatePreviewKind =
  | "dashboard"
  | "landing"
  | "auth"
  | "ecommerce"
  | "portfolio"
  | "blog"
  | "ai"
  | "saas"
  | "users-table"
  | "user-profile";

export const TEMPLATE_PREVIEW_KINDS: TemplatePreviewKind[] = [
  "dashboard",
  "landing",
  "auth",
  "ecommerce",
  "portfolio",
  "blog",
  "ai",
  "saas",
  "users-table",
  "user-profile",
];

export function templatePreview(kind: TemplatePreviewKind, accent: string) {
  const shell = "h-full w-full overflow-hidden rounded-lg border border-white/8 bg-[#0b0b16] p-3";

  if (kind === "dashboard") {
    return (
      <div className={`${shell} flex gap-2`}>
        <div className="w-1/4 space-y-1.5 rounded-md bg-white/[0.04] p-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-2 rounded ${i === 1 ? accent : "bg-white/10"}`} />
          ))}
        </div>
        <div className="flex-1 space-y-2">
          <div className="grid grid-cols-3 gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 rounded-md bg-white/[0.06] p-1.5">
                <div className={`h-1.5 w-2/3 rounded ${i === 1 ? accent : "bg-white/15"}`} />
                <div className="mt-1.5 h-2 w-1/2 rounded bg-white/20" />
              </div>
            ))}
          </div>
          <div className="flex h-16 items-end gap-1 rounded-md bg-white/[0.04] p-2">
            {[40, 70, 55, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className={`flex-1 rounded-t ${i === 3 ? accent : "bg-white/12"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "landing") {
    return (
      <div className={shell}>
        <div className="flex items-center justify-between">
          <div className="h-2 w-12 rounded bg-white/25" />
          <div className="flex gap-1.5">
            <div className="h-1.5 w-6 rounded bg-white/10" />
            <div className="h-1.5 w-6 rounded bg-white/10" />
            <div className={`h-4 w-10 rounded ${accent}`} />
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-3 w-2/3 rounded bg-white/30" />
          <div className="h-3 w-1/2 rounded bg-white/30" />
          <div className="h-1.5 w-3/4 rounded bg-white/10" />
        </div>
        <div className="mt-3 flex gap-1.5">
          <div className={`h-5 w-16 rounded-md ${accent}`} />
          <div className="h-5 w-16 rounded-md border border-white/15" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 rounded-md bg-white/[0.05]" />
          ))}
        </div>
      </div>
    );
  }

  if (kind === "auth") {
    return (
      <div className={`${shell} flex items-center justify-center`}>
        <div className="w-2/3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className={`mx-auto mb-2 h-6 w-6 rounded-full ${accent}`} />
          <div className="mx-auto mb-3 h-1.5 w-1/2 rounded bg-white/25" />
          <div className="space-y-1.5">
            <div className="h-4 rounded bg-white/[0.06]" />
            <div className="h-4 rounded bg-white/[0.06]" />
          </div>
          <div className={`mt-3 h-4 rounded ${accent}`} />
        </div>
      </div>
    );
  }

  if (kind === "ecommerce") {
    return (
      <div className={shell}>
        <div className="flex items-center justify-between">
          <div className="h-2 w-10 rounded bg-white/25" />
          <div className={`h-3 w-3 rounded-full ${accent}`} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-md bg-white/[0.05] p-1">
              <div className="h-8 rounded bg-white/[0.08]" />
              <div className="mt-1 h-1.5 w-3/4 rounded bg-white/15" />
              <div className={`mt-1 h-1.5 w-1/2 rounded ${i % 2 === 0 ? accent : "bg-white/20"}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "portfolio") {
    return (
      <div className={shell}>
        <div className="flex items-center gap-2">
          <div className={`h-5 w-5 rounded-full ${accent}`} />
          <div className="h-1.5 w-16 rounded bg-white/25" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <div className="col-span-2 h-12 rounded-md bg-white/[0.06]" />
          <div className="h-9 rounded-md bg-white/[0.05]" />
          <div className="h-9 rounded-md bg-white/[0.05]" />
        </div>
      </div>
    );
  }

  if (kind === "blog") {
    return (
      <div className={`${shell} space-y-2`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-2 rounded-md bg-white/[0.04] p-1.5">
            <div className={`h-9 w-12 shrink-0 rounded ${i === 1 ? accent : "bg-white/10"}`} />
            <div className="flex-1 space-y-1 py-0.5">
              <div className="h-1.5 w-4/5 rounded bg-white/25" />
              <div className="h-1.5 w-3/5 rounded bg-white/10" />
              <div className="h-1.5 w-2/5 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "ai") {
    return (
      <div className={`${shell} space-y-2`}>
        <div className="flex justify-end">
          <div className="h-5 w-2/3 rounded-lg bg-white/[0.08]" />
        </div>
        <div className="flex">
          <div className={`h-9 w-3/4 rounded-lg ${accent}`} />
        </div>
        <div className="flex justify-end">
          <div className="h-5 w-1/2 rounded-lg bg-white/[0.08]" />
        </div>
        <div className="mt-1 h-6 rounded-lg border border-white/10 bg-white/[0.03]" />
      </div>
    );
  }

  if (kind === "users-table") {
    return (
      <div className={shell}>
        <div className="flex items-center justify-between">
          <div className="h-2 w-16 rounded bg-white/25" />
          <div className={`h-4 w-12 rounded ${accent}`} />
        </div>
        <div className="mt-3 overflow-hidden rounded-md border border-white/8">
          <div className="flex border-b border-white/10 bg-white/5">
            {[45, 30, 25].map((w, i) => (
              <div key={i} className="flex-1 py-1.5 px-2">
                <div className="h-1.5 rounded bg-white/25" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
          {[1, 2, 3, 4].map((row) => (
            <div key={row} className="flex items-center gap-2 border-b border-white/5 px-2 py-1.5 last:border-0">
              <div className={`h-4 w-4 shrink-0 rounded-full ${row === 2 ? accent : "bg-white/15"}`} />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/5 rounded bg-white/20" />
              </div>
              <div className="h-1.5 w-8 rounded bg-white/10" />
              <div className={`h-3 w-8 rounded-full ${row % 2 === 0 ? "bg-emerald-400/40" : "bg-white/10"}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "user-profile") {
    return (
      <div className={`${shell} flex gap-2`}>
        <div className="w-1/3 rounded-md bg-white/4 p-2">
          <div className={`mx-auto h-8 w-8 rounded-full ${accent}`} />
          <div className="mx-auto mt-2 h-1.5 w-3/4 rounded bg-white/25" />
          <div className="mx-auto mt-1.5 h-1.5 w-1/2 rounded bg-white/10" />
          <div className="mt-3 space-y-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-1.5 rounded bg-white/8" />
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex gap-1.5 border-b border-white/10 pb-1.5">
            {["Profile", "Security", "Activity"].map((tab, i) => (
              <div key={tab} className={`h-2 w-10 rounded ${i === 0 ? accent : "bg-white/10"}`} />
            ))}
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-1 rounded-md bg-white/4 p-1.5">
              <div className="h-1.5 w-1/3 rounded bg-white/15" />
              <div className="h-2.5 rounded bg-white/6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className="flex items-center justify-between">
        <div className="h-2 w-12 rounded bg-white/25" />
        <div className={`h-4 w-12 rounded ${accent}`} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-md border border-white/8 bg-white/[0.04] p-1.5">
            <div className="h-1.5 w-1/2 rounded bg-white/20" />
            <div className="mt-2 h-3 w-2/3 rounded bg-white/30" />
            <div className={`mt-2 h-3 rounded ${i === 2 ? accent : "bg-white/[0.06]"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const TEMPLATES: TemplateItem[] = [
  { name: "CoreSaaS Dashboard", category: "dashboard", price: 69, accent: "bg-orange-500/50", preview: templatePreview("dashboard", "bg-orange-500/50") },
  { name: "CoreSaaS Dashboard Dark", category: "dashboard", price: 69, accent: "bg-blue-500/50", preview: templatePreview("dashboard", "bg-blue-500/50") },
  { name: "Jobhire Landing", category: "landing-page", price: 39, accent: "bg-yellow-400/60", preview: templatePreview("landing", "bg-yellow-400/60") },
  { name: "Nextly Startup", category: "landing-page", price: null, accent: "bg-violet-500/50", preview: templatePreview("landing", "bg-violet-500/50") },
  { name: "GreenHome Realty", category: "marketing", price: 29, accent: "bg-emerald-500/50", preview: templatePreview("landing", "bg-emerald-500/50") },
  { name: "The CACulator", category: "saas", price: null, accent: "bg-lime-400/50", preview: templatePreview("saas", "bg-lime-400/50") },
  { name: "Sneat Auth", category: "authentication", price: 79, accent: "bg-rose-500/50", preview: templatePreview("auth", "bg-rose-500/50") },
  { name: "Materio Auth", category: "authentication", price: 79, accent: "bg-fuchsia-500/50", preview: templatePreview("auth", "bg-fuchsia-500/50") },
  { name: "Materio Admin", category: "admin-panel", price: null, accent: "bg-violet-500/50", preview: templatePreview("dashboard", "bg-violet-500/50") },
  { name: "JetShip SaaS Kit", category: "saas", price: 149, accent: "bg-indigo-500/50", preview: templatePreview("saas", "bg-indigo-500/50") },
  { name: "AdminMart Pro", category: "admin-panel", price: null, accent: "bg-sky-500/50", preview: templatePreview("dashboard", "bg-sky-500/50") },
  { name: "Modernize Admin", category: "admin-panel", price: 59, accent: "bg-blue-500/50", preview: templatePreview("dashboard", "bg-blue-500/50") },
  { name: "Modernize Light", category: "dashboard", price: 59, accent: "bg-sky-400/50", preview: templatePreview("dashboard", "bg-sky-400/50") },
  { name: "MatDash Analytics", category: "dashboard", price: 59, accent: "bg-cyan-500/50", preview: templatePreview("dashboard", "bg-cyan-500/50") },
  { name: "Studio Portfolio", category: "portfolio", price: null, accent: "bg-pink-500/50", preview: templatePreview("portfolio", "bg-pink-500/50") },
  { name: "Folio Personal", category: "personal-website", price: 19, accent: "bg-teal-500/50", preview: templatePreview("portfolio", "bg-teal-500/50") },
  { name: "Inkwell Blog", category: "blog", price: null, accent: "bg-amber-500/50", preview: templatePreview("blog", "bg-amber-500/50") },
  { name: "Shopline Store", category: "ecommerce", price: 49, accent: "bg-orange-500/50", preview: templatePreview("ecommerce", "bg-orange-500/50") },
  { name: "Cartly Storefront", category: "ecommerce", price: null, accent: "bg-rose-500/50", preview: templatePreview("ecommerce", "bg-rose-500/50") },
  { name: "Chatly AI Assistant", category: "ai", price: 59, accent: "bg-violet-500/50", preview: templatePreview("ai", "bg-violet-500/50") },
  { name: "PromptDesk AI", category: "ai", price: null, accent: "bg-indigo-500/50", preview: templatePreview("ai", "bg-indigo-500/50") },
  { name: "User Management", category: "admin-panel", price: 49, accent: "bg-teal-500/50", preview: templatePreview("users-table", "bg-teal-500/50") },
  { name: "User Profile Console", category: "admin-panel", price: null, accent: "bg-cyan-500/50", preview: templatePreview("user-profile", "bg-cyan-500/50") },
];
