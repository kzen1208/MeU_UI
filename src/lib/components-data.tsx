import type { ReactNode } from "react";

export type ComponentStatus = "Stable" | "Planned";

export interface ComponentItem {
  name: string;
  status: ComponentStatus;
  statusColor: string;
  preview: ReactNode;
}

export interface Category {
  slug: string;
  name: string;
  tag: string;
  tagColor: string;
  accent: string;
  components: ComponentItem[];
}

const STABLE_STATUS = "text-emerald-400 bg-emerald-400/10";
const PLANNED_STATUS = "text-yellow-400 bg-yellow-400/10";

type PreviewKind =
  | "actions"
  | "advanced"
  | "chart"
  | "content"
  | "feedback"
  | "form"
  | "media"
  | "navigation"
  | "overlay"
  | "table";

function catalogPreview(kind: PreviewKind, accent = "bg-blue-500/45") {
  const shellClass = "p-3 bg-[#0F0F1C] rounded-lg border border-white/5";

  if (kind === "actions") {
    return (
      <div className={`${shellClass} flex flex-wrap gap-2`}>
        <div className={`h-7 w-20 rounded-lg ${accent}`} />
        <div className="h-7 w-16 rounded-lg border border-white/10 bg-white/10" />
        <div className="h-7 w-9 rounded-lg border border-white/10 bg-white/5" />
      </div>
    );
  }

  if (kind === "advanced") {
    return (
      <div className={shellClass}>
        <div className="grid grid-cols-3 gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-8 rounded-md border border-white/8 bg-[#1A1A2E] p-1.5">
              <div className={`h-1.5 rounded ${item === 2 ? accent : "bg-white/20"}`} />
              <div className="mt-2 h-1 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "chart") {
    return (
      <div className={shellClass}>
        <div className="flex h-20 items-end gap-1.5">
          {[34, 56, 40, 72, 58, 86, 66].map((height, index) => (
            <div key={index} className="flex-1 rounded-t bg-white/10" style={{ height: `${height}%` }}>
              {index === 5 && <div className={`h-full rounded-t ${accent}`} />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "content") {
    return (
      <div className={shellClass}>
        <div className="rounded-lg border border-white/8 bg-[#1A1A2E] p-3">
          <div className={`mb-3 h-7 w-7 rounded-full ${accent}`} />
          <div className="mb-2 h-2 rounded bg-white/25" />
          <div className="mb-1.5 h-1.5 w-5/6 rounded bg-white/12" />
          <div className="h-1.5 w-2/3 rounded bg-white/10" />
        </div>
      </div>
    );
  }

  if (kind === "feedback") {
    return (
      <div className={`${shellClass} space-y-2`}>
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-lg border border-white/8 bg-[#1A1A2E] p-2">
            <div className={`h-2.5 w-2.5 rounded-full ${item === 1 ? accent : "bg-white/20"}`} />
            <div className="flex-1">
              <div className="mb-1 h-1.5 rounded bg-white/20" />
              <div className="h-1 w-2/3 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "form") {
    return (
      <div className={`${shellClass} space-y-2`}>
        <div className="h-2 w-16 rounded bg-white/25" />
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1A1A2E] px-3 py-2">
          <div className="h-1.5 flex-1 rounded bg-white/15" />
          <div className={`h-3 w-3 rounded-full ${accent}`} />
        </div>
        <div className={`h-7 rounded-lg ${accent}`} />
      </div>
    );
  }

  if (kind === "media") {
    return (
      <div className={shellClass}>
        <div className="grid grid-cols-3 gap-1.5">
          <div className={`col-span-2 h-20 rounded-lg ${accent}`} />
          <div className="space-y-1.5">
            <div className="h-[2.35rem] rounded-lg bg-white/15" />
            <div className="h-[2.35rem] rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "navigation") {
    return (
      <div className={shellClass}>
        <div className="flex gap-1.5 rounded-lg border border-white/8 bg-[#1A1A2E] p-2">
          {["A", "B", "C"].map((item, index) => (
            <div key={item} className={`h-7 flex-1 rounded-md ${index === 0 ? accent : "bg-white/10"}`} />
          ))}
        </div>
        <div className="mt-2 flex gap-1.5">
          <div className="h-1.5 w-10 rounded bg-white/20" />
          <div className="h-1.5 w-3 rounded bg-white/10" />
          <div className={`h-1.5 w-14 rounded ${accent}`} />
        </div>
      </div>
    );
  }

  if (kind === "overlay") {
    return (
      <div className={`${shellClass} flex items-center justify-center`}>
        <div className="w-36 rounded-xl border border-white/10 bg-[#1A1A2E] p-3 shadow-lg">
          <div className={`mx-auto mb-2 h-7 w-7 rounded-full ${accent}`} />
          <div className="mx-auto mb-1.5 h-2 w-20 rounded bg-white/25" />
          <div className="mx-auto mb-3 h-1.5 w-28 rounded bg-white/10" />
          <div className="flex gap-2">
            <div className="h-5 flex-1 rounded-md bg-white/10" />
            <div className={`h-5 flex-1 rounded-md ${accent}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <div className="grid grid-cols-3 bg-[#1A1A2E]">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-r border-white/8 p-2 last:border-r-0">
              <div className="h-1.5 rounded bg-white/25" />
            </div>
          ))}
        </div>
        {[1, 2, 3].map((row) => (
          <div key={row} className="grid grid-cols-3 border-t border-white/6">
            {[1, 2, 3].map((cell) => (
              <div key={cell} className="p-2">
                <div className={`h-1.5 rounded ${row === 2 && cell === 2 ? accent : "bg-white/10"}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function catalogComponent(
  name: string,
  kind: PreviewKind,
  status: ComponentStatus = "Planned",
  accent?: string
): ComponentItem {
  return {
    name,
    status,
    statusColor: status === "Stable" ? STABLE_STATUS : PLANNED_STATUS,
    preview: catalogPreview(kind, accent),
  };
}

export const CATEGORIES: Category[] = [
  {
    slug: "layout",
    name: "Layout",
    tag: "Core",
    tagColor: "text-violet-400",
    accent: "rgba(124,58,237,0.25)",
    components: [
      {
        name: "AppHeader",
        status: "Stable",
        statusColor: "text-emerald-400 bg-emerald-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1A1A2E] rounded border border-white/5">
              <div className="w-5 h-5 rounded bg-violet-600/50" />
              <div className="flex-1 h-1.5 bg-white/20 rounded w-16 max-w-15" />
              <div className="flex gap-2">
                <div className="h-1.5 bg-white/15 rounded w-8" />
                <div className="h-1.5 bg-white/15 rounded w-8" />
              </div>
              <div className="w-6 h-6 rounded-full bg-violet-500/40 ml-auto" />
            </div>
          </div>
        ),
      },
      {
        name: "AppSidebar",
        status: "Stable",
        statusColor: "text-emerald-400 bg-emerald-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="flex gap-2">
              <div className="w-28 bg-[#1A1A2E] rounded p-2 border border-white/5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`flex items-center gap-1.5 px-2 py-1 rounded mb-0.5 ${i === 2 ? "bg-violet-600/30" : ""}`}>
                    <div className={`w-2.5 h-2.5 rounded ${i === 2 ? "bg-violet-400/70" : "bg-white/20"}`} />
                    <div className={`h-1 rounded w-10 ${i === 2 ? "bg-white/40" : "bg-white/15"}`} />
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-[#1A1A2E] rounded border border-white/5 min-h-15" />
            </div>
          </div>
        ),
      },
      {
        name: "PageContainer",
        status: "Stable",
        statusColor: "text-emerald-400 bg-emerald-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-3 bg-white/30 rounded w-24" />
                <div className="h-5 bg-violet-600/50 rounded-lg w-16" />
              </div>
              <div className="h-1.5 bg-white/15 rounded w-36" />
              <div className="flex gap-1.5 pt-1">
                <div className="h-1 bg-white/20 rounded w-10" />
                <div className="h-1 bg-white/10 rounded w-1" />
                <div className="h-1 bg-violet-400/50 rounded w-12" />
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "AppTabs",
        status: "Stable",
        statusColor: "text-emerald-400 bg-emerald-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="flex gap-1 border-b border-white/10 pb-2 mb-2">
              {["Tab 1", "Tab 2", "Tab 3"].map((t, i) => (
                <div key={t} className={`px-3 py-1 rounded-t text-[10px] font-medium ${i === 0 ? "bg-violet-600/30 text-violet-300 border-b-2 border-violet-400" : "text-white/30"}`}>
                  {t}
                </div>
              ))}
            </div>
            <div className="h-1.5 bg-white/15 rounded w-full mb-1" />
            <div className="h-1.5 bg-white/10 rounded w-3/4" />
          </div>
        ),
      },
      {
        name: "AppCard",
        status: "Stable",
        statusColor: "text-emerald-400 bg-emerald-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="bg-[#1A1A2E] rounded-lg p-3 border border-white/5">
              <div className="h-2 bg-white/25 rounded w-20 mb-2" />
              <div className="h-1.5 bg-white/15 rounded w-full mb-1" />
              <div className="h-1.5 bg-white/10 rounded w-4/5 mb-3" />
              <div className="flex gap-2">
                <div className="flex-1 h-6 bg-violet-600/40 rounded" />
                <div className="w-6 h-6 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "AppGrid",
        status: "Stable",
        statusColor: "text-emerald-400 bg-emerald-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="grid grid-cols-3 gap-1.5">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-[#1A1A2E] rounded h-8 border border-white/5 flex items-center justify-center">
                  <div className="w-4 h-1.5 bg-white/20 rounded" />
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },
  {
    slug: "form",
    name: "Form",
    tag: "Input",
    tagColor: "text-blue-400",
    accent: "rgba(59,130,246,0.2)",
    components: [
      {
        name: "Button",
        status: "Stable",
        statusColor: "text-emerald-400 bg-emerald-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 flex flex-wrap gap-2">
            <div className="px-4 py-1.5 bg-violet-600 rounded-lg text-[10px] font-semibold text-white">Primary</div>
            <div className="px-4 py-1.5 bg-white/10 rounded-lg text-[10px] font-semibold text-white/70 border border-white/10">Ghost</div>
            <div className="px-4 py-1.5 rounded-lg text-[10px] font-semibold text-white/30 border border-white/5">Disabled</div>
          </div>
        ),
      },
      {
        name: "Input",
        status: "Stable",
        statusColor: "text-emerald-400 bg-emerald-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 space-y-2">
            <div className="bg-[#1A1A2E] border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="h-1.5 bg-white/15 rounded w-20" />
              <div className="ml-auto w-3 h-3 rounded-full border border-white/20" />
            </div>
            <div className="bg-[#1A1A2E] border border-violet-500/50 rounded-lg px-3 py-2">
              <div className="h-1.5 bg-violet-300/40 rounded w-12" />
            </div>
          </div>
        ),
      },
      {
        name: "Select",
        status: "Planned",
        statusColor: "text-yellow-400 bg-yellow-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="bg-[#1A1A2E] border border-white/10 rounded-lg px-3 py-2 flex items-center">
              <div className="h-1.5 bg-white/20 rounded w-16" />
              <svg className="ml-auto text-white/30" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        ),
      },
      {
        name: "Checkbox",
        status: "Planned",
        statusColor: "text-yellow-400 bg-yellow-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 space-y-2">
            {[true, false, false].map((checked, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className={`w-3.5 h-3.5 rounded ${checked ? "bg-violet-600" : "bg-white/10 border border-white/20"} flex items-center justify-center`}>
                  {checked && <div className="w-1.5 h-1 border-b border-r border-white rotate-45 -mt-0.5" />}
                </div>
                <div className="h-1.5 bg-white/20 rounded w-14" />
              </div>
            ))}
          </div>
        ),
      },
      {
        name: "DatePicker",
        status: "Planned",
        statusColor: "text-yellow-400 bg-yellow-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="bg-[#1A1A2E] border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-violet-400">
                <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1 5h10M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <div className="h-1.5 bg-white/20 rounded w-16" />
            </div>
          </div>
        ),
      },
      {
        name: "FormItem",
        status: "Planned",
        statusColor: "text-yellow-400 bg-yellow-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 space-y-1">
            <div className="h-1.5 bg-white/25 rounded w-12" />
            <div className="bg-[#1A1A2E] border border-white/10 rounded-lg px-3 py-2">
              <div className="h-1.5 bg-white/15 rounded w-20" />
            </div>
            <div className="h-1.5 bg-red-400/40 rounded w-24" />
          </div>
        ),
      },
    ],
  },
  {
    slug: "data",
    name: "Data",
    tag: "Display",
    tagColor: "text-emerald-400",
    accent: "rgba(16,185,129,0.18)",
    components: [
      {
        name: "Table",
        status: "Planned",
        statusColor: "text-yellow-400 bg-yellow-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="border border-white/10 rounded overflow-hidden">
              <div className="flex border-b border-white/10 bg-[#1A1A2E]">
                {[40, 50, 35].map((w, i) => (
                  <div key={i} className="flex-1 py-1.5 px-2">
                    <div className="h-1.5 bg-white/25 rounded" style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
              {[1,2,3].map((row) => (
                <div key={row} className="flex border-b border-white/5 last:border-0">
                  {[60, 45, 55].map((w, i) => (
                    <div key={i} className="flex-1 py-1.5 px-2">
                      <div className="h-1.5 bg-white/10 rounded" style={{ width: `${w - row * 5}%` }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        name: "Pagination",
        status: "Planned",
        statusColor: "text-yellow-400 bg-yellow-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 flex justify-center">
            <div className="flex gap-1">
              {["‹", "1", "2", "3", "›"].map((p, i) => (
                <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-medium ${i === 2 ? "bg-violet-600 text-white" : "bg-white/10 text-white/40"}`}>
                  {p}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        name: "EmptyState",
        status: "Planned",
        statusColor: "text-yellow-400 bg-yellow-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 flex flex-col items-center py-4">
            <div className="w-8 h-8 rounded-full bg-violet-600/20 flex items-center justify-center mb-2">
              <div className="w-3 h-3 border-2 border-violet-400/40 rounded-full" />
            </div>
            <div className="h-1.5 bg-white/25 rounded w-20 mb-1" />
            <div className="h-1 bg-white/10 rounded w-28" />
          </div>
        ),
      },
      {
        name: "Skeleton",
        status: "Planned",
        statusColor: "text-yellow-400 bg-yellow-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 space-y-2">
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-white/10 animate-pulse" />
              <div className="space-y-1 flex-1">
                <div className="h-1.5 bg-white/10 rounded animate-pulse w-3/4" />
                <div className="h-1.5 bg-white/8 rounded animate-pulse w-1/2" />
              </div>
            </div>
            <div className="h-1.5 bg-white/10 rounded animate-pulse" />
            <div className="h-1.5 bg-white/8 rounded animate-pulse w-4/5" />
          </div>
        ),
      },
      {
        name: "Tag / Badge",
        status: "Stable",
        statusColor: "text-emerald-400 bg-emerald-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 flex flex-wrap gap-1.5">
            <div className="px-2 py-0.5 rounded-full bg-violet-600/30 text-[9px] font-bold text-violet-300 border border-violet-500/30">Active</div>
            <div className="px-2 py-0.5 rounded-full bg-emerald-600/20 text-[9px] font-bold text-emerald-300 border border-emerald-500/20">Success</div>
            <div className="px-2 py-0.5 rounded-full bg-yellow-600/20 text-[9px] font-bold text-yellow-300 border border-yellow-500/20">Warning</div>
            <div className="px-2 py-0.5 rounded-full bg-red-600/20 text-[9px] font-bold text-red-300 border border-red-500/20">Error</div>
          </div>
        ),
      },
      {
        name: "FilterBar",
        status: "Planned",
        statusColor: "text-yellow-400 bg-yellow-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 flex gap-2 items-center">
            <div className="flex-1 bg-[#1A1A2E] border border-white/10 rounded-lg px-2 py-1.5 flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 border border-white/20 rounded" />
              <div className="h-1.5 bg-white/15 rounded w-16" />
            </div>
            <div className="px-2 py-1.5 bg-violet-600/30 border border-violet-500/30 rounded-lg">
              <div className="h-1.5 bg-violet-300/50 rounded w-8" />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    slug: "business",
    name: "Business",
    tag: "App",
    tagColor: "text-orange-400",
    accent: "rgba(249,115,22,0.18)",
    components: [
      {
        name: "UserMenu",
        status: "Planned",
        statusColor: "text-blue-400 bg-blue-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-[#1A1A2E] rounded-lg border border-white/5">
              <div className="w-6 h-6 rounded-full bg-violet-500/50 flex items-center justify-center text-[9px] font-bold text-white">M</div>
              <div className="space-y-0.5 flex-1">
                <div className="h-1.5 bg-white/25 rounded w-14" />
                <div className="h-1 bg-white/10 rounded w-20" />
              </div>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/30">
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        ),
      },
      {
        name: "NotificationBell",
        status: "Planned",
        statusColor: "text-blue-400 bg-blue-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="space-y-1.5">
              {[1,2].map((n) => (
                <div key={n} className={`flex gap-2 p-2 rounded-lg ${n === 1 ? "bg-violet-600/10 border border-violet-500/20" : "bg-[#1A1A2E] border border-white/5"}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 bg-white/25 rounded w-full" />
                    <div className="h-1 bg-white/10 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        name: "ConfirmDialog",
        status: "Planned",
        statusColor: "text-blue-400 bg-blue-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-3">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                <div className="w-3 h-px bg-red-400/60" />
              </div>
              <div className="h-2 bg-white/25 rounded w-20 mx-auto mb-1.5" />
              <div className="h-1.5 bg-white/10 rounded w-28 mx-auto mb-3" />
              <div className="flex gap-2">
                <div className="flex-1 h-5 bg-white/10 rounded-lg" />
                <div className="flex-1 h-5 bg-red-600/40 rounded-lg" />
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "StatusBadge",
        status: "Planned",
        statusColor: "text-blue-400 bg-blue-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5 space-y-1.5">
            {[
              { color: "bg-emerald-500", label: "Completed", bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
              { color: "bg-yellow-500", label: "In Progress", bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-300" },
              { color: "bg-red-500",    label: "Blocked",     bg: "bg-red-500/10 border-red-500/20 text-red-300" },
            ].map((s) => (
              <div key={s.label} className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-bold w-fit ${s.bg}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                {s.label}
              </div>
            ))}
          </div>
        ),
      },
      {
        name: "FilePreview",
        status: "Planned",
        statusColor: "text-blue-400 bg-blue-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="flex gap-2 items-center p-2 bg-[#1A1A2E] border border-white/5 rounded-lg">
              <div className="w-7 h-8 bg-blue-500/20 rounded flex items-center justify-center shrink-0">
                <div className="text-[8px] font-bold text-blue-300">PDF</div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-1.5 bg-white/25 rounded w-20" />
                <div className="h-1 bg-white/10 rounded w-12" />
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "DashboardMetric",
        status: "Planned",
        statusColor: "text-blue-400 bg-blue-400/10",
        preview: (
          <div className="p-3 bg-[#0F0F1C] rounded-lg border border-white/5">
            <div className="bg-[#1A1A2E] border border-white/5 rounded-lg p-3">
              <div className="h-1.5 bg-white/20 rounded w-16 mb-3" />
              <div className="h-5 bg-white/30 rounded w-20 mb-1" />
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 text-emerald-400">
                  <svg viewBox="0 0 10 10" fill="none"><path d="M2 7l3-5 3 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                </div>
                <div className="h-1.5 bg-emerald-400/40 rounded w-8" />
                <div className="h-1 bg-white/10 rounded w-12" />
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    slug: "inputs",
    name: "Inputs",
    tag: "ReUI Forms",
    tagColor: "text-sky-400",
    accent: "rgba(14,165,233,0.18)",
    components: [
      catalogComponent("Button Variants", "actions", "Stable", "bg-sky-500/55"),
      catalogComponent("Button Group", "actions", "Planned", "bg-sky-500/45"),
      catalogComponent("Input Group", "form", "Planned", "bg-sky-500/45"),
      catalogComponent("Combobox", "form", "Planned", "bg-sky-500/45"),
      catalogComponent("Autocomplete", "form", "Planned", "bg-sky-500/45"),
      catalogComponent("Calendar", "form", "Planned", "bg-sky-500/45"),
      catalogComponent("Radio Group", "form", "Planned", "bg-sky-500/45"),
      catalogComponent("Switch", "actions", "Planned", "bg-sky-500/45"),
      catalogComponent("Slider", "form", "Planned", "bg-sky-500/45"),
      catalogComponent("Input OTP", "form", "Planned", "bg-sky-500/45"),
      catalogComponent("Number Field", "form", "Planned", "bg-sky-500/45"),
      catalogComponent("Phone Input", "form", "Planned", "bg-sky-500/45"),
    ],
  },
  {
    slug: "data-grid",
    name: "Data Grid",
    tag: "ReUI Data",
    tagColor: "text-emerald-400",
    accent: "rgba(16,185,129,0.16)",
    components: [
      catalogComponent("Data Grid", "table", "Stable", "bg-emerald-500/45"),
      catalogComponent("Virtualized Table", "table", "Planned", "bg-emerald-500/45"),
      catalogComponent("Column Filters", "table", "Planned", "bg-emerald-500/45"),
      catalogComponent("Advanced Filters", "table", "Planned", "bg-emerald-500/45"),
      catalogComponent("Pagination", "navigation", "Planned", "bg-emerald-500/45"),
      catalogComponent("Empty State", "content", "Planned", "bg-emerald-500/45"),
      catalogComponent("Skeleton Loader", "content", "Planned", "bg-emerald-500/45"),
      catalogComponent("Progress", "chart", "Planned", "bg-emerald-500/45"),
      catalogComponent("Spinner", "feedback", "Planned", "bg-emerald-500/45"),
      catalogComponent("Status Badge", "feedback", "Stable", "bg-emerald-500/45"),
    ],
  },
  {
    slug: "navigation",
    name: "Navigation",
    tag: "ReUI Nav",
    tagColor: "text-indigo-400",
    accent: "rgba(99,102,241,0.18)",
    components: [
      catalogComponent("Breadcrumb", "navigation", "Stable", "bg-indigo-500/45"),
      catalogComponent("Tabs", "navigation", "Stable", "bg-indigo-500/45"),
      catalogComponent("Navigation Menu", "navigation", "Planned", "bg-indigo-500/45"),
      catalogComponent("Menubar", "navigation", "Planned", "bg-indigo-500/45"),
      catalogComponent("Command", "navigation", "Planned", "bg-indigo-500/45"),
      catalogComponent("Dropdown Menu", "navigation", "Planned", "bg-indigo-500/45"),
      catalogComponent("Context Menu", "navigation", "Planned", "bg-indigo-500/45"),
      catalogComponent("Scrollspy", "navigation", "Planned", "bg-indigo-500/45"),
      catalogComponent("Keyboard Hint", "content", "Planned", "bg-indigo-500/45"),
    ],
  },
  {
    slug: "overlays",
    name: "Overlays",
    tag: "ReUI Layer",
    tagColor: "text-fuchsia-400",
    accent: "rgba(217,70,239,0.16)",
    components: [
      catalogComponent("Dialog", "overlay", "Stable", "bg-fuchsia-500/45"),
      catalogComponent("Alert Dialog", "overlay", "Planned", "bg-fuchsia-500/45"),
      catalogComponent("Drawer", "overlay", "Planned", "bg-fuchsia-500/45"),
      catalogComponent("Sheet", "overlay", "Planned", "bg-fuchsia-500/45"),
      catalogComponent("Popover", "overlay", "Planned", "bg-fuchsia-500/45"),
      catalogComponent("Hover Card", "overlay", "Planned", "bg-fuchsia-500/45"),
      catalogComponent("Tooltip", "feedback", "Planned", "bg-fuchsia-500/45"),
      catalogComponent("Accordion", "navigation", "Planned", "bg-fuchsia-500/45"),
      catalogComponent("Collapsible", "navigation", "Planned", "bg-fuchsia-500/45"),
    ],
  },
  {
    slug: "workflows",
    name: "Workflows",
    tag: "ReUI Advanced",
    tagColor: "text-amber-400",
    accent: "rgba(245,158,11,0.16)",
    components: [
      catalogComponent("File Upload", "advanced", "Stable", "bg-amber-500/45"),
      catalogComponent("Kanban", "advanced", "Planned", "bg-amber-500/45"),
      catalogComponent("Sortable", "advanced", "Planned", "bg-amber-500/45"),
      catalogComponent("Tree", "advanced", "Planned", "bg-amber-500/45"),
      catalogComponent("Timeline", "advanced", "Planned", "bg-amber-500/45"),
      catalogComponent("Stepper", "advanced", "Planned", "bg-amber-500/45"),
      catalogComponent("Rating", "feedback", "Planned", "bg-amber-500/45"),
      catalogComponent("Resizable Panels", "advanced", "Planned", "bg-amber-500/45"),
      catalogComponent("Date Selector", "form", "Planned", "bg-amber-500/45"),
    ],
  },
  {
    slug: "content",
    name: "Content",
    tag: "ReUI Display",
    tagColor: "text-rose-400",
    accent: "rgba(244,63,94,0.16)",
    components: [
      catalogComponent("Avatar", "media", "Stable", "bg-rose-500/45"),
      catalogComponent("Card", "content", "Stable", "bg-rose-500/45"),
      catalogComponent("Frame", "content", "Planned", "bg-rose-500/45"),
      catalogComponent("Chart", "chart", "Planned", "bg-rose-500/45"),
      catalogComponent("Carousel", "media", "Planned", "bg-rose-500/45"),
      catalogComponent("Aspect Ratio", "media", "Planned", "bg-rose-500/45"),
      catalogComponent("Item", "content", "Planned", "bg-rose-500/45"),
      catalogComponent("Separator", "content", "Planned", "bg-rose-500/45"),
      catalogComponent("Scroll Area", "content", "Planned", "bg-rose-500/45"),
      catalogComponent("Sonner Toast", "feedback", "Planned", "bg-rose-500/45"),
      catalogComponent("Alert", "feedback", "Stable", "bg-rose-500/45"),
    ],
  },
];
