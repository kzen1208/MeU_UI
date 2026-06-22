"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  Boxes,
  CheckCircle2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Code2,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Link2,
  Menu,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import type { Category, ComponentItem, ComponentStatus } from "@/lib/components-data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";
import { useAdminCatalog } from "@/lib/admin/catalog-store";
import { useAuth } from "@/lib/auth/auth-context";
import HubLogo from "./HubLogo";

type DirectoryTranslations = (typeof translations)[keyof typeof translations]["componentsDirectory"];

type StatusFilter = "all" | ComponentStatus;
type CopyAction = "prompt" | "code" | "code-demo";
type SelectedComponent = {
  category: Category;
  component: ComponentItem;
};

function getCopyActions(t: DirectoryTranslations): {
  id: CopyAction;
  label: string;
  description: string;
}[] {
  return [
    { id: "prompt", ...t.modal.copyActions.prompt },
    { id: "code", ...t.modal.copyActions.code },
    { id: "code-demo", ...t.modal.copyActions.codeDemo },
  ];
}

function componentAnchor(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function componentExportName(name: string) {
  return name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function buildComponentPrompt(category: Category, component: ComponentItem) {
  const exportName = componentExportName(component.name);

  return [
    `Create a production-ready ${component.name} component for MeU UI Hub.`,
    "",
    "Context:",
    `- Component: ${component.name}`,
    `- Category: ${category.name}`,
    `- Tag: ${category.tag}`,
    `- Status: ${component.status}`,
    "",
    "Implementation requirements:",
    "- Use React, TypeScript, Next.js App Router, and Tailwind CSS.",
    "- Match the existing MeU UI Hub dark visual system and component conventions.",
    "- Keep the component responsive, accessible, and keyboard friendly.",
    "- Include hover/focus states, stable spacing, and clean empty/loading states when relevant.",
    `- Export the component as ${exportName}.`,
  ].join("\n");
}

function buildComponentCode(category: Category, component: ComponentItem) {
  const exportName = componentExportName(component.name);

  return `import { cn } from "@/lib/utils";

export interface ${exportName}Props {
  className?: string;
  title?: string;
}

export function ${exportName}({
  className,
  title = "${component.name}",
}: ${exportName}Props) {
  return (
    <section
      data-component="${componentAnchor(component.name)}"
      className={cn(
        "rounded-xl border border-white/10 bg-[#0f0f1c] p-4 text-white shadow-sm",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/38">
            ${category.name} / ${category.tag}
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-normal">{title}</h3>
        </div>
        <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-semibold text-white/55">
          ${component.status}
        </span>
      </div>

      <div className="rounded-lg border border-white/8 bg-black/25 p-4">
        {/* Replace this area with the finalized ${component.name} implementation. */}
      </div>
    </section>
  );
}`;
}

function buildComponentCodeDemo(category: Category, component: ComponentItem) {
  const exportName = componentExportName(component.name);
  const code = buildComponentCode(category, component);

  return `${code}

export default function ${exportName}Demo() {
  return (
    <div className="min-h-screen bg-[#050505] p-6">
      <${exportName} title="${component.name}" />
    </div>
  );
}`;
}

function buildCopyValue(action: CopyAction, category: Category, component: ComponentItem) {
  if (action === "code") return buildComponentCode(category, component);
  if (action === "code-demo") return buildComponentCodeDemo(category, component);
  return buildComponentPrompt(category, component);
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

function SidebarButton({
  active,
  children,
  count,
  icon,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  count?: number;
  icon?: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-[15px] text-[#8c8c8c] transition hover:bg-white/[0.04] hover:text-white",
        active && "bg-white/[0.045] text-[#f2f2f2]"
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className={cn("shrink-0 text-[#8a8a8a] transition group-hover:text-white", active && "text-white")}>
          {icon}
        </span>
        <span className="truncate">{children}</span>
      </span>
      {typeof count === "number" ? <span className="ml-3 shrink-0 text-sm text-[#686868]">{count}</span> : null}
    </button>
  );
}

function CatalogSidebar({
  categories,
  activeCategory,
  search,
  status,
  onCategoryChange,
  onSearchChange,
  onStatusChange,
  onBack,
  isAdmin,
  t,
}: {
  categories: Category[];
  activeCategory: string | "all";
  search: string;
  status: StatusFilter;
  onCategoryChange: (slug: string | "all") => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: StatusFilter) => void;
  onBack: () => void;
  isAdmin: boolean;
  t: DirectoryTranslations;
}) {
  const totalComponents = categories.reduce((sum, category) => sum + category.components.length, 0);
  const stableCount = categories.reduce(
    (sum, category) => sum + category.components.filter((component) => component.status === "Stable").length,
    0
  );
  const plannedCount = totalComponents - stableCount;

  return (
    <aside className="hidden h-screen flex-col border-r border-[#242424] bg-[#111111] text-white lg:sticky lg:top-0 lg:flex">
      <div className="flex h-14 items-center border-b border-[#1f1f1f] px-5">
        <HubLogo subtitle="Internal resources" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-2 pb-3 pt-3">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-[#8d8d8d] transition hover:bg-white/[0.04] hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-[15px] font-medium">{t.sidebar.backLabel}</span>
        </button>

        <label className="relative mb-3 block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t.sidebar.searchPlaceholder}
            className="h-9 w-full rounded-lg border border-transparent bg-[#1a1a1a] pl-9 pr-12 text-[15px] text-white outline-none transition placeholder:text-[#707070] focus:border-[#343434] focus:bg-[#1f1f1f]"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#747474]">
            ⌘ K
          </span>
        </label>

        <nav className="space-y-1">
          <SidebarButton
            active={activeCategory === "all" && status === "all"}
            count={totalComponents}
            icon={<Boxes className="h-[18px] w-[18px]" />}
            onClick={() => {
              onCategoryChange("all");
              onStatusChange("all");
            }}
          >
            {t.sidebar.allComponents}
          </SidebarButton>
          <SidebarButton
            active={status === "Stable"}
            count={stableCount}
            icon={<CheckCircle2 className="h-[18px] w-[18px]" />}
            onClick={() => {
              onCategoryChange("all");
              onStatusChange("Stable");
            }}
          >
            {t.sidebar.stable}
          </SidebarButton>
          <SidebarButton
            active={status === "Planned"}
            count={plannedCount}
            icon={<Sparkles className="h-[18px] w-[18px]" />}
            onClick={() => {
              onCategoryChange("all");
              onStatusChange("Planned");
            }}
          >
            {t.sidebar.planned}
          </SidebarButton>
          <Link
            href="/templates"
            className="group flex h-10 items-center justify-between rounded-md px-3 text-[15px] text-[#8c8c8c] transition hover:bg-white/[0.04] hover:text-white"
          >
            <span className="flex min-w-0 items-center gap-3">
              <Code2 className="h-[18px] w-[18px] shrink-0 text-[#8a8a8a] transition group-hover:text-white" />
              <span className="truncate">{t.sidebar.templates}</span>
            </span>
          </Link>
        </nav>

        <div className="mt-5 min-h-0 flex-1 overflow-y-auto pb-6 pr-1 scrollbar-hide">
          <div className="px-3 pb-2 text-[15px] text-[#a4a4a4]">{t.sidebar.categoriesLabel}</div>
          <nav className="space-y-1">
            {categories.map((category) => (
              <SidebarButton
                key={category.slug}
                active={activeCategory === category.slug && status === "all"}
                count={category.components.length}
                icon={<Boxes className="h-[18px] w-[18px]" />}
                onClick={() => {
                  onCategoryChange(category.slug);
                  onStatusChange("all");
                }}
              >
                {category.name}
              </SidebarButton>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between border-t border-[#1f1f1f] px-2 pt-3 text-[#8f8f8f]">
          <div className="flex items-center gap-2">
            <Link
              href="/#faq"
              aria-label="Help"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-white/[0.05] hover:text-white"
            >
              <CircleHelp className="h-[18px] w-[18px]" />
            </Link>
            {isAdmin ? (
              <Link
                href="/admin"
                aria-label="Settings"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-white/[0.05] hover:text-white"
              >
                <Settings className="h-[18px] w-[18px]" />
              </Link>
            ) : null}
          </div>
          {isAdmin ? (
            <Link
              href="/admin"
              className="inline-flex h-8 items-center gap-2 rounded-md px-2 text-sm transition hover:bg-white/[0.05] hover:text-white"
            >
              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#747474]">
                <ChevronRight className="h-3 w-3 rotate-180" />
              </span>
              {t.sidebar.publish}
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

function MobileHeader({
  search,
  onSearchChange,
  t,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  t: DirectoryTranslations;
}) {
  return (
    <div className="border-b border-[#242424] bg-[#111111] px-4 py-3 lg:hidden">
      <div className="mb-3 flex items-center justify-between">
        <HubLogo subtitle="Internal resources" />
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#2c2c2c] text-[#bdbdbd]"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t.mobileSearchPlaceholder}
          className="h-10 w-full rounded-lg border border-[#252525] bg-[#191919] pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#6f6f6f] focus:border-[#3a3a3a]"
        />
      </label>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white/78 transition hover:bg-white/[0.06] hover:text-white"
    >
      {children}
    </button>
  );
}

function ComponentTile({
  category,
  component,
  onOpen,
}: {
  category: Category;
  component: ComponentItem;
  onOpen: (selection: SelectedComponent) => void;
}) {
  const stable = component.status === "Stable";

  return (
    <button
      type="button"
      id={componentAnchor(component.name)}
      onClick={() => onOpen({ category, component })}
      aria-label={`${component.name} component`}
      aria-haspopup="dialog"
      className="group flex h-[240px] w-[78vw] shrink-0 items-center justify-center border-r border-[#242424] px-5 py-8 text-left transition hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4264ff] focus-visible:ring-offset-0 sm:h-[286px] sm:w-[360px] md:w-[380px] lg:h-[336px] lg:w-[23%] lg:min-w-[330px]"
    >
      <div className="w-full max-w-[332px]">
        <div className="relative h-[248px] overflow-hidden rounded-[10px] border border-white/8 bg-[#050505]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-size-[16px_16px]" />
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
            <span
              className={cn(
                "rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em]",
                stable
                  ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-200"
                  : "border-yellow-300/35 bg-yellow-300/10 text-yellow-200"
              )}
            >
              {component.status}
            </span>
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/50">
              {category.tag}
            </span>
          </div>
          {component.link ? (
            <a
              href={component.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              aria-label={component.link}
              className="absolute right-3 top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/4 text-white/60 transition hover:bg-white/8 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-[240px] transition duration-300 group-hover:scale-[1.04]">
              {component.preview}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black via-black/80 to-transparent px-5 pb-4 pt-10">
            <h3 className="truncate text-[20px] font-semibold tracking-normal text-white">{component.name}</h3>
            <p className="mt-1 text-sm text-white/42">{category.name}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function ComponentDetailModal({
  category,
  component,
  onClose,
  t,
}: {
  category: Category;
  component: ComponentItem;
  onClose: () => void;
  t: DirectoryTranslations;
}) {
  const [copied, setCopied] = useState(false);
  const [copyAction, setCopyAction] = useState<CopyAction>("prompt");
  const [copyMenuOpen, setCopyMenuOpen] = useState(false);
  const stable = component.status === "Stable";
  const copyActions = useMemo(() => getCopyActions(t), [t]);
  const activeCopyAction = copyActions.find((action) => action.id === copyAction) ?? copyActions[0];
  const copyValue = useMemo(() => buildCopyValue(copyAction, category, component), [copyAction, category, component]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (copyMenuOpen) {
        setCopyMenuOpen(false);
        return;
      }

      onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [copyMenuOpen, onClose]);

  const handleCopy = async () => {
    const copiedPayload = await copyText(copyValue);

    if (copiedPayload) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } else {
      setCopied(false);
    }
  };

  const handleOpenInPage = () => {
    onClose();
    window.setTimeout(() => {
      document.getElementById(componentAnchor(component.name))?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="component-detail-title"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/72 px-3 py-5 backdrop-blur-[2px] sm:px-6 sm:py-10"
      onMouseDown={onClose}
    >
      <div
        className="flex min-h-[78vh] w-full max-w-[1420px] flex-col overflow-hidden rounded-xl border border-[#2b2b2b] bg-[#080808] shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#202020] bg-[#101010] px-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/12 bg-white/[0.06]">
              <Boxes className="h-4 w-4 text-white/80" />
            </span>
            <span id="component-detail-title" className="truncate text-[16px] font-semibold text-white">
              {component.name}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-1.5">
            <div className="hidden items-center gap-1 md:flex">
              <IconButton label={t.modal.ariaLabels.toggleTheme}>
                <Sun className="h-[18px] w-[18px]" />
              </IconButton>
              <IconButton label={t.modal.ariaLabels.refreshPreview}>
                <RefreshCw className="h-[18px] w-[18px]" />
              </IconButton>
              <IconButton label={t.modal.ariaLabels.copyLink}>
                <Link2 className="h-[18px] w-[18px]" />
              </IconButton>
              <IconButton label={t.modal.ariaLabels.saveComponent}>
                <Bookmark className="h-[18px] w-[18px]" />
              </IconButton>
              <IconButton label={t.modal.ariaLabels.openExternally}>
                <ExternalLink className="h-[18px] w-[18px]" />
              </IconButton>
            </div>
            <button
              type="button"
              onClick={handleOpenInPage}
              className="hidden h-9 shrink-0 rounded-md px-3 text-sm font-medium text-white/84 transition hover:bg-white/[0.06] hover:text-white sm:inline-flex sm:items-center"
            >
              {t.modal.open}
            </button>
            <div className="relative flex shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-9 items-center gap-2 rounded-l-md rounded-r-md border border-[#2f63ff] bg-[#0b46ff] px-3 text-sm font-semibold text-white transition hover:bg-[#1955ff] sm:rounded-r-none"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="hidden sm:inline">{copied ? t.modal.copied : activeCopyAction.label}</span>
                <span className="sm:hidden">{copied ? t.modal.copied : t.modal.copy}</span>
              </button>
              <button
                type="button"
                title={t.modal.ariaLabels.changeCopyAction}
                aria-label={t.modal.ariaLabels.changeCopyAction}
                aria-expanded={copyMenuOpen}
                onClick={() => setCopyMenuOpen((open) => !open)}
                className="hidden h-9 w-10 items-center justify-center rounded-r-md border border-l-0 border-[#2f63ff] bg-[#0b46ff] text-white transition hover:bg-[#1955ff] sm:inline-flex"
              >
                <ChevronDown className={cn("h-4 w-4 transition", copyMenuOpen && "rotate-180")} />
              </button>

              {copyMenuOpen ? (
                <div className="absolute right-0 top-11 z-40 w-[min(610px,calc(100vw-2rem))] rounded-[18px] border border-[#303030] bg-[#191919] p-2.5 text-white shadow-2xl">
                  {copyActions.map((action) => {
                    const active = action.id === copyAction;

                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => {
                          setCopyAction(action.id);
                          setCopyMenuOpen(false);
                          setCopied(false);
                        }}
                        className="grid w-full grid-cols-[34px_minmax(0,1fr)] rounded-xl px-3 py-2.5 text-left transition hover:bg-white/[0.06]"
                      >
                        <span className="pt-1.5">
                          <span
                            className={cn(
                              "block h-3.5 w-3.5 rounded-full border border-white/28",
                              active && "border-white bg-white"
                            )}
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[20px] font-semibold leading-tight text-white">
                            {action.label}
                          </span>
                          <span className="mt-3 block text-[16px] leading-tight text-[#9b9ba3]">
                            {action.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <IconButton label={t.modal.ariaLabels.closeDialog} onClick={onClose}>
              <X className="h-5 w-5" />
            </IconButton>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12">
          <div className="mx-auto flex min-h-[62vh] max-w-[1268px] items-center justify-center">
            <div className="relative grid min-h-[440px] w-full overflow-hidden rounded-xl border border-white/12 bg-black lg:min-h-[592px] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-size-[18px_18px]" />
              <div className="relative z-10 flex flex-col justify-center px-7 py-10 sm:px-10">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em]",
                      stable
                        ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-200"
                        : "border-yellow-300/35 bg-yellow-300/10 text-yellow-200"
                    )}
                  >
                    {component.status}
                  </span>
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/52">
                    {category.tag}
                  </span>
                </div>
                <h2 className="text-[clamp(2.3rem,6vw,4.4rem)] font-bold leading-none tracking-normal text-white">
                  {component.name}
                </h2>
                <p className="mt-5 max-w-[520px] text-base leading-relaxed text-white/62 sm:text-lg">
                  {t.modal.description(category.name, component.status.toLowerCase())}
                </p>
                {component.link ? (
                  <a
                    href={component.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex h-9 w-fit items-center gap-2 rounded-md border border-white/12 px-3 text-sm font-semibold text-white/80 transition hover:bg-white/8 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {component.link}
                  </a>
                ) : null}
              </div>
              <div className="relative z-10 flex items-center justify-center px-7 pb-10 sm:px-10 lg:py-10">
                <div className="w-full max-w-[560px] transition duration-300 hover:scale-[1.02]">
                  {component.preview}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-5 max-w-[1268px] rounded-xl border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">{activeCopyAction.label}</p>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-8 items-center gap-2 rounded-md border border-white/12 px-2.5 text-xs font-semibold text-white/72 transition hover:bg-white/[0.06] hover:text-white"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t.modal.copied : activeCopyAction.label}
              </button>
            </div>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-black/45 p-3 text-xs leading-relaxed text-white/56">
              {copyValue}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionRow({
  category,
  components,
  onOpen,
  t,
}: {
  category: Category;
  components: ComponentItem[];
  onOpen: (selection: SelectedComponent) => void;
  t: DirectoryTranslations;
}) {
  return (
    <section id={category.slug}>
      <div className="mb-3 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <h2 className="text-[16px] font-semibold text-[#f2f2f2]">{category.name}</h2>
          <span className="text-sm text-[#666]">{components.length}</span>
        </div>
        <Link
          href={`#${category.slug}`}
          className="inline-flex items-center gap-1 text-[15px] text-[#8d8d8d] transition hover:text-white"
        >
          {t.viewAll}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="relative mx-4 overflow-hidden border border-[#242424] bg-[#101010] sm:mx-6 lg:mx-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {components.map((component) => (
            <ComponentTile key={component.name} category={category} component={component} onOpen={onOpen} />
          ))}
        </div>
        {components.length > 4 ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-linear-to-l from-[#101010] to-transparent lg:block" />
            <div className="pointer-events-none absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#171717] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] lg:flex">
              <ChevronRight className="h-5 w-5" />
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

export default function ComponentsDirectoryPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].componentsDirectory;
  const { categories } = useAdminCatalog();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<SelectedComponent | null>(null);

  const visibleSections = useMemo(() => {
    const query = search.trim().toLowerCase();

    return categories.map((category) => ({
      category,
      components: category.components.filter((component) => {
        const matchesCategory = activeCategory === "all" || category.slug === activeCategory;
        const matchesSearch = !query || component.name.toLowerCase().includes(query) || category.name.toLowerCase().includes(query);
        const matchesStatus = status === "all" || component.status === status;

        return matchesCategory && matchesSearch && matchesStatus;
      }),
    })).filter((section) => section.components.length > 0);
  }, [categories, activeCategory, search, status]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white lg:grid lg:grid-cols-[284px_minmax(0,1fr)]">
      <CatalogSidebar
        categories={categories}
        activeCategory={activeCategory}
        search={search}
        status={status}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onBack={handleBack}
        isAdmin={isAdmin}
        t={t}
      />

      <div className="min-w-0">
        <MobileHeader search={search} onSearchChange={setSearch} t={t} />

        <header className="sticky top-0 z-20 hidden h-12 items-center justify-center border-b border-[#242424] bg-[#101010]/95 text-[15px] font-medium text-[#f1f1f1] backdrop-blur lg:flex">
          {t.headerTitle}
        </header>

        <main className="space-y-10 pb-12 pt-6 lg:pt-6">
          {visibleSections.length > 0 ? (
            visibleSections.map(({ category, components }) => (
              <SectionRow key={category.slug} category={category} components={components} onOpen={setSelected} t={t} />
            ))
          ) : (
            <div className="mx-4 flex min-h-[320px] items-center justify-center border border-[#242424] text-[#8c8c8c] sm:mx-6 lg:mx-8">
              <div className="text-center">
                <ImageIcon className="mx-auto mb-3 h-7 w-7 text-[#666]" />
                <p>{t.emptyState}</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {selected ? (
        <ComponentDetailModal
          category={selected.category}
          component={selected.component}
          onClose={() => setSelected(null)}
          t={t}
        />
      ) : null}
    </div>
  );
}
