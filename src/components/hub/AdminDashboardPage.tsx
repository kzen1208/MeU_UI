"use client";

import * as React from "react";
import Link from "next/link";
import {
  Archive,
  ArrowLeft,
  Boxes,
  LayoutDashboard,
  LayoutGrid,
  LayoutTemplate,
  Plus,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  Trash2,
  Users as UsersIcon,
  X,
} from "lucide-react";
import { Navbar1 } from "@/components/ui/shadcnblocks-com-navbar1";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ProgressMetricCard, { type SeriesPoint } from "@/components/ui/progress-metric-card";
import { useAuth, type AuthRole, type AuthUser } from "@/lib/auth/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";
import {
  CATEGORIES,
  COMPONENT_PREVIEW_KINDS,
  type ComponentPreviewKind,
  type ComponentStatus,
} from "@/lib/components-data";
import {
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  TEMPLATE_PREVIEW_KINDS,
  type TemplatePreviewKind,
} from "@/lib/templates-data";
import {
  useAdminCatalog,
  componentKey,
  type ComponentDraft,
  type TemplateDraft,
} from "@/lib/admin/catalog-store";
import { cn } from "@/lib/utils";

type AdminTranslations = (typeof translations)[keyof typeof translations]["adminDashboard"];

type Section = "overview" | "components" | "templates" | "users" | "custom" | "removed";

const EMPTY_COMPONENT_DRAFT: ComponentDraft = {
  categorySlug: "",
  name: "",
  status: "Planned",
  previewKind: "content",
  accent: "bg-blue-500/45",
  link: "",
};

const EMPTY_TEMPLATE_DRAFT: TemplateDraft = {
  category: "",
  name: "",
  price: null,
  previewKind: "dashboard",
  accent: "bg-blue-500/50",
  link: "",
};

const removeButtonClass = "h-8 gap-1.5 px-2.5 text-xs hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300";

const NAV_ITEMS: Array<{ key: Section; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "overview", icon: LayoutDashboard },
  { key: "components", icon: Boxes },
  { key: "templates", icon: LayoutTemplate },
  { key: "users", icon: UsersIcon },
  { key: "custom", icon: Sparkles },
  { key: "removed", icon: Archive },
];

const matches = (value: string, search: string) => value.toLowerCase().includes(search.trim().toLowerCase());

export default function AdminDashboardPage() {
  const { user, ready } = useAuth();
  const { language } = useLanguage();
  const t = translations[language].adminDashboard;
  const [section, setSection] = React.useState<Section>("overview");
  const [search, setSearch] = React.useState("");

  const catalog = useAdminCatalog();

  if (!ready) return null;

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0b0b16] text-white">
        <Navbar1 className="border-white/8 bg-[#0b0b16]" />
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t.accessDenied.title}</h1>
          <p className="mt-3 text-white/60">{t.accessDenied.description}</p>
          <Button asChild className="mt-6">
            <Link href="/">{t.accessDenied.backHome}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalComponents = catalog.categories.reduce((acc, category) => acc + category.components.length, 0);
  const customCount = catalog.customComponents.length + catalog.customTemplates.length;
  const removedCount = catalog.removedComponentKeys.length + catalog.removedTemplateNames.length;

  return (
    <div className="min-h-screen bg-[#0b0b16] text-white">
      <Navbar1 className="border-white/8 bg-[#0b0b16]" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/45 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backHome}
        </Link>

        <div className="mt-5 flex flex-col gap-6 lg:flex-row">
          <AdminSidebar section={section} onSelect={setSection} t={t} />

          <main className="min-w-0 flex-1">
            <AdminTopbar section={section} search={search} onSearchChange={setSearch} t={t} />

            {section === "overview" ? (
              <OverviewSection
                t={t}
                catalog={catalog}
                totalComponents={totalComponents}
                customCount={customCount}
                removedCount={removedCount}
              />
            ) : null}
            {section === "components" ? <ComponentsAdmin t={t} search={search} /> : null}
            {section === "templates" ? <TemplatesAdmin t={t} search={search} /> : null}
            {section === "users" ? <UsersAdmin t={t} search={search} /> : null}
            {section === "custom" ? <CustomAdmin t={t} search={search} /> : null}
            {section === "removed" ? <RemovedAdmin t={t} search={search} /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}

function AdminSidebar({
  section,
  onSelect,
  t,
}: {
  section: Section;
  onSelect: (section: Section) => void;
  t: AdminTranslations;
}) {
  return (
    <aside className="lg:w-60 lg:shrink-0">
      <div className="rounded-2xl border border-white/10 bg-[#101010] p-3 lg:sticky lg:top-6">
        <div className="mb-2 px-2 py-2">
          <Badge className="gap-1.5 border-[#4264ff]/30 bg-[#4264ff]/10 text-[#9db2ff] hover:bg-[#4264ff]/10">
            <Shield className="h-3.5 w-3.5" />
            Admin
          </Badge>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {NAV_ITEMS.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition lg:w-full",
                section === key ? "bg-[#4264ff] text-white" : "text-white/55 hover:bg-white/6 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {t.nav[key]}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function AdminTopbar({
  section,
  search,
  onSearchChange,
  t,
}: {
  section: Section;
  search: string;
  onSearchChange: (value: string) => void;
  t: AdminTranslations;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/35">
          {t.breadcrumb} / {t.nav[section]}
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">{t.nav[section]}</h1>
      </div>
      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
        <Input
          className="pl-9"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t.searchPlaceholder}
        />
      </div>
    </div>
  );
}

function OverviewSection({
  t,
  catalog,
  totalComponents,
  customCount,
  removedCount,
}: {
  t: AdminTranslations;
  catalog: ReturnType<typeof useAdminCatalog>;
  totalComponents: number;
  customCount: number;
  removedCount: number;
}) {
  const { listUsers } = useAuth();
  const [userCount, setUserCount] = React.useState(0);

  React.useEffect(() => {
    setUserCount(listUsers().length);
  }, [listUsers]);

  const componentsByCategory = React.useMemo<SeriesPoint[]>(
    () =>
      catalog.categories
        .map((category) => ({ date: category.name, value: category.components.length }))
        .sort((a, b) => a.value - b.value),
    [catalog.categories]
  );

  const templatesByCategory = React.useMemo<SeriesPoint[]>(() => {
    const counts = new Map<string, number>();
    for (const template of catalog.templates) {
      counts.set(template.category, (counts.get(template.category) ?? 0) + 1);
    }

    return catalog.templateCategories
      .map((category) => ({ date: category.name, value: counts.get(category.slug) ?? 0 }))
      .sort((a, b) => a.value - b.value);
  }, [catalog.templateCategories, catalog.templates]);

  const distributionPeriods = [
    { label: t.distribution.periodAll },
    { label: t.distribution.periodTop5, points: 5 },
  ];

  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#4264ff]/18 via-[#101010] to-[#101010] p-8">
        <Badge className="gap-1.5 border-[#4264ff]/30 bg-[#4264ff]/10 text-[#9db2ff] hover:bg-[#4264ff]/10">
          <Sparkles className="h-3.5 w-3.5" />
          Admin
        </Badge>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h2>
        <p className="mt-2 max-w-2xl text-white/55">{t.subtitle}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard icon={LayoutGrid} label={t.stats.categories} value={catalog.categories.length} accent="text-blue-400 bg-blue-400/10" />
        <StatCard icon={Boxes} label={t.stats.components} value={totalComponents} accent="text-emerald-400 bg-emerald-400/10" />
        <StatCard icon={LayoutTemplate} label={t.stats.templates} value={catalog.templates.length} accent="text-violet-400 bg-violet-400/10" />
        <StatCard icon={Sparkles} label={t.stats.custom} value={customCount} accent="text-orange-400 bg-orange-400/10" />
        <StatCard icon={UsersIcon} label={t.stats.users} value={userCount} accent="text-pink-400 bg-pink-400/10" />
        <StatCard icon={Archive} label={t.stats.removed} value={removedCount} accent="text-red-400 bg-red-400/10" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ProgressMetricCard
          title={t.distribution.componentsTitle}
          data={componentsByCategory}
          unit={t.distribution.unitComponents}
          accent="blue"
          size="sm"
          defaultView="bar"
          deltaLabel={t.distribution.deltaLabel}
          period={t.distribution.periodAll}
          periodOptions={distributionPeriods}
        />
        <ProgressMetricCard
          title={t.distribution.templatesTitle}
          data={templatesByCategory}
          unit={t.distribution.unitTemplates}
          accent="violet"
          size="sm"
          defaultView="bar"
          deltaLabel={t.distribution.deltaLabel}
          period={t.distribution.periodAll}
          periodOptions={distributionPeriods}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#101010] p-5">
      <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-xl", accent)}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm text-white/45">{label}</p>
        <p className="mt-0.5 text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-white/10 bg-[#101010] p-5", className)}>{children}</div>;
}

function FormShell({
  title,
  onCancel,
  onSubmit,
  children,
}: {
  title: string;
  onCancel: () => void;
  onSubmit: (event: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="mt-4 rounded-2xl border border-[#4264ff]/25 bg-[#4264ff]/6 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/85">{title}</h3>
        <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onCancel}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </form>
  );
}

function EmptyState({ label }: { label: string }) {
  return <p className="py-6 text-center text-sm text-white/40">{label}</p>;
}

function ComponentsAdmin({ t, search }: { t: AdminTranslations; search: string }) {
  const { categories, removedComponentKeys, componentEdits, addComponent, editBaseComponent, removeBaseComponent, restoreBaseComponent } =
    useAdminCatalog();

  const [showForm, setShowForm] = React.useState(false);
  const [draft, setDraft] = React.useState<ComponentDraft>({
    ...EMPTY_COMPONENT_DRAFT,
    categorySlug: categories[0]?.slug ?? "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.name.trim() || !draft.categorySlug) return;
    addComponent({ ...draft, name: draft.name.trim(), link: draft.link.trim() });
    setDraft({ ...EMPTY_COMPONENT_DRAFT, categorySlug: categories[0]?.slug ?? "" });
    setShowForm(false);
  };

  const visibleCategories = CATEGORIES.map((category) => ({
    category,
    components: category.components.filter((component) => matches(component.name, search)),
  })).filter(({ components }) => (search.trim() ? components.length > 0 : true));

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.components.title}</h2>
        <Button type="button" onClick={() => setShowForm((value) => !value)}>
          <Plus className="h-4 w-4" />
          {t.actions.add}
        </Button>
      </div>

      {showForm ? (
        <FormShell title={t.components.addTitle} onCancel={() => setShowForm(false)} onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.name}</Label>
            <Input
              value={draft.name}
              onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              required
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.category}</Label>
            <Select
              value={draft.categorySlug}
              onValueChange={(value) => setDraft((current) => ({ ...current, categorySlug: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.status}</Label>
            <Select
              value={draft.status}
              onValueChange={(value) => setDraft((current) => ({ ...current, status: value as ComponentStatus }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Stable">{t.status.Stable}</SelectItem>
                <SelectItem value="Planned">{t.status.Planned}</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.previewKind}</Label>
            <Select
              value={draft.previewKind}
              onValueChange={(value) =>
                setDraft((current) => ({ ...current, previewKind: value as ComponentPreviewKind }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMPONENT_PREVIEW_KINDS.map((kind) => (
                  <SelectItem key={kind} value={kind}>
                    {kind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.accent}</Label>
            <Input
              value={draft.accent}
              onChange={(event) => setDraft((current) => ({ ...current, accent: event.target.value }))}
              placeholder="bg-blue-500/45"
            />
          </label>

          <label className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
            <Label>{t.fields.link}</Label>
            <Input
              value={draft.link}
              onChange={(event) => setDraft((current) => ({ ...current, link: event.target.value }))}
              placeholder={t.fields.linkPlaceholder}
            />
          </label>

          <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-3">
            <Button type="submit">{t.actions.save}</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              {t.actions.cancel}
            </Button>
          </div>
        </FormShell>
      ) : null}

      {visibleCategories.length === 0 ? (
        <SectionCard className="mt-6">
          <EmptyState label={t.components.empty} />
        </SectionCard>
      ) : (
        <Accordion type="multiple" className="mt-6 space-y-4">
          {visibleCategories.map(({ category, components }) => (
            <AccordionItem
              key={category.slug}
              value={category.slug}
              className="rounded-2xl border border-white/10 bg-[#101010] px-5"
            >
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="flex items-center gap-3">
                  <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", category.tagColor.replace("text-", "bg-"))} />
                  <span className="text-sm font-semibold text-white/85">{category.name}</span>
                  <Badge variant="outline" className="border-white/10 text-white/40">
                    {components.length}
                  </Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>{t.components.table.name}</TableHead>
                      <TableHead className="w-36">{t.components.table.status}</TableHead>
                      <TableHead>{t.components.table.link}</TableHead>
                      <TableHead className="w-28 text-right">{t.components.table.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {components.map((component) => {
                      const key = componentKey(category.slug, component.name);
                      const removed = removedComponentKeys.includes(key);
                      const edit = componentEdits[key];
                      const status = edit?.status ?? component.status;
                      const link = edit?.link !== undefined ? edit.link : component.link ?? "";

                      return (
                        <TableRow key={key} className={cn(removed && "opacity-40")}>
                          <TableCell className="font-medium text-white/85">{component.name}</TableCell>
                          <TableCell>
                            <Select
                              value={status}
                              disabled={removed}
                              onValueChange={(value) =>
                                editBaseComponent(category.slug, component.name, {
                                  status: value as ComponentStatus,
                                })
                              }
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Stable">{t.status.Stable}</SelectItem>
                                <SelectItem value="Planned">{t.status.Planned}</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              className="h-8 min-w-40"
                              defaultValue={link}
                              disabled={removed}
                              placeholder={t.fields.linkPlaceholder}
                              onBlur={(event) =>
                                editBaseComponent(category.slug, component.name, { link: event.target.value.trim() })
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            {removed ? (
                              <Button
                                type="button"
                                variant="outline"
                                className="h-8 gap-1.5 px-2.5 text-xs"
                                onClick={() => restoreBaseComponent(category.slug, component.name)}
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                {t.actions.restore}
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                className={removeButtonClass}
                                onClick={() => removeBaseComponent(category.slug, component.name)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                {t.actions.remove}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </section>
  );
}

function TemplatesAdmin({ t, search }: { t: AdminTranslations; search: string }) {
  const { templateCategories, removedTemplateNames, templateEdits, addTemplate, editBaseTemplate, removeBaseTemplate, restoreBaseTemplate } =
    useAdminCatalog();

  const [showForm, setShowForm] = React.useState(false);
  const [draft, setDraft] = React.useState<TemplateDraft>({
    ...EMPTY_TEMPLATE_DRAFT,
    category: templateCategories[0]?.slug ?? "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.name.trim() || !draft.category) return;
    addTemplate({ ...draft, name: draft.name.trim(), link: draft.link.trim() });
    setDraft({ ...EMPTY_TEMPLATE_DRAFT, category: templateCategories[0]?.slug ?? "" });
    setShowForm(false);
  };

  const visibleTemplates = TEMPLATES.filter((template) => matches(template.name, search));

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.templates.title}</h2>
        <Button type="button" onClick={() => setShowForm((value) => !value)}>
          <Plus className="h-4 w-4" />
          {t.actions.add}
        </Button>
      </div>

      {showForm ? (
        <FormShell title={t.templates.addTitle} onCancel={() => setShowForm(false)} onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.name}</Label>
            <Input
              value={draft.name}
              onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              required
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.category}</Label>
            <Select
              value={draft.category}
              onValueChange={(value) => setDraft((current) => ({ ...current, category: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templateCategories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.price}</Label>
            <Input
              type="number"
              min={0}
              value={draft.price ?? ""}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  price: event.target.value === "" ? null : Number(event.target.value),
                }))
              }
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.previewKind}</Label>
            <Select
              value={draft.previewKind}
              onValueChange={(value) =>
                setDraft((current) => ({ ...current, previewKind: value as TemplatePreviewKind }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_PREVIEW_KINDS.map((kind) => (
                  <SelectItem key={kind} value={kind}>
                    {kind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="flex flex-col gap-1.5">
            <Label>{t.fields.accent}</Label>
            <Input
              value={draft.accent}
              onChange={(event) => setDraft((current) => ({ ...current, accent: event.target.value }))}
              placeholder="bg-blue-500/50"
            />
          </label>

          <label className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
            <Label>{t.fields.link}</Label>
            <Input
              value={draft.link}
              onChange={(event) => setDraft((current) => ({ ...current, link: event.target.value }))}
              placeholder={t.fields.linkPlaceholder}
            />
          </label>

          <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-3">
            <Button type="submit">{t.actions.save}</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              {t.actions.cancel}
            </Button>
          </div>
        </FormShell>
      ) : null}

      <SectionCard className="mt-6">
        {visibleTemplates.length === 0 ? (
          <EmptyState label={t.templates.empty} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{t.templates.table.name}</TableHead>
                <TableHead className="w-28">{t.templates.table.price}</TableHead>
                <TableHead>{t.templates.table.link}</TableHead>
                <TableHead className="w-28 text-right">{t.templates.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleTemplates.map((template) => {
                const removed = removedTemplateNames.includes(template.name);
                const edit = templateEdits[template.name];
                const price = edit?.price !== undefined ? edit.price : template.price;
                const link = edit?.link !== undefined ? edit.link : template.link ?? "";
                const category = TEMPLATE_CATEGORIES.find((item) => item.slug === template.category);

                return (
                  <TableRow key={template.name} className={cn(removed && "opacity-40")}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className={cn("h-8 w-8 shrink-0 rounded-lg", template.accent)} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white/85">{template.name}</p>
                          <p className="text-xs text-white/40">{category?.name ?? template.category}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        className="h-8 w-24"
                        defaultValue={price ?? ""}
                        disabled={removed}
                        placeholder={t.templates.free}
                        onBlur={(event) =>
                          editBaseTemplate(template.name, {
                            price: event.target.value === "" ? null : Number(event.target.value),
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="h-8 min-w-40"
                        defaultValue={link}
                        disabled={removed}
                        placeholder={t.fields.linkPlaceholder}
                        onBlur={(event) => editBaseTemplate(template.name, { link: event.target.value.trim() })}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      {removed ? (
                        <Button
                          type="button"
                          variant="outline"
                          className="h-8 gap-1.5 px-2.5 text-xs"
                          onClick={() => restoreBaseTemplate(template.name)}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          {t.actions.restore}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          className={removeButtonClass}
                          onClick={() => removeBaseTemplate(template.name)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {t.actions.remove}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </section>
  );
}

function CustomAdmin({ t, search }: { t: AdminTranslations; search: string }) {
  const { categories, customComponents, updateCustomComponent, removeCustomComponent, templateCategories, customTemplates, updateCustomTemplate, removeCustomTemplate } =
    useAdminCatalog();

  const visibleComponents = customComponents.filter((item) => matches(item.name, search));
  const visibleTemplates = customTemplates.filter((item) => matches(item.name, search));

  return (
    <section className="mt-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t.custom.title}</h2>
        <p className="mt-1 text-sm text-white/45">{t.custom.subtitle}</p>
      </div>

      <SectionCard>
        <div className="flex items-center gap-2">
          <Badge className="border-[#4264ff]/25 bg-[#4264ff]/15 text-[#9db2ff] hover:bg-[#4264ff]/15">
            {t.status.custom}
          </Badge>
          <h3 className="text-sm font-semibold text-white/80">{t.components.title}</h3>
        </div>

        {visibleComponents.length === 0 ? (
          <EmptyState label={t.components.empty} />
        ) : (
          <Table className="mt-3">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{t.components.table.name}</TableHead>
                <TableHead className="w-44">{t.components.table.category}</TableHead>
                <TableHead className="w-36">{t.components.table.status}</TableHead>
                <TableHead>{t.components.table.link}</TableHead>
                <TableHead className="w-24 text-right">{t.components.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleComponents.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      className="h-8 min-w-32"
                      defaultValue={item.name}
                      onBlur={(event) => updateCustomComponent(item.id, { ...item, name: event.target.value.trim() })}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={item.categorySlug}
                      onValueChange={(value) => updateCustomComponent(item.id, { ...item, categorySlug: value })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={item.status}
                      onValueChange={(value) =>
                        updateCustomComponent(item.id, { ...item, status: value as ComponentStatus })
                      }
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Stable">{t.status.Stable}</SelectItem>
                        <SelectItem value="Planned">{t.status.Planned}</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8 min-w-40"
                      defaultValue={item.link}
                      placeholder={t.fields.linkPlaceholder}
                      onBlur={(event) => updateCustomComponent(item.id, { ...item, link: event.target.value.trim() })}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="outline"
                      className={removeButtonClass}
                      onClick={() => removeCustomComponent(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t.actions.delete}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <SectionCard>
        <div className="flex items-center gap-2">
          <Badge className="border-[#4264ff]/25 bg-[#4264ff]/15 text-[#9db2ff] hover:bg-[#4264ff]/15">
            {t.status.custom}
          </Badge>
          <h3 className="text-sm font-semibold text-white/80">{t.templates.title}</h3>
        </div>

        {visibleTemplates.length === 0 ? (
          <EmptyState label={t.templates.empty} />
        ) : (
          <Table className="mt-3">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{t.templates.table.name}</TableHead>
                <TableHead className="w-44">{t.templates.table.category}</TableHead>
                <TableHead className="w-28">{t.templates.table.price}</TableHead>
                <TableHead>{t.templates.table.link}</TableHead>
                <TableHead className="w-24 text-right">{t.templates.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleTemplates.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className={cn("h-8 w-8 shrink-0 rounded-lg", item.accent)} />
                      <Input
                        className="h-8 min-w-32"
                        defaultValue={item.name}
                        onBlur={(event) => updateCustomTemplate(item.id, { ...item, name: event.target.value.trim() })}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={item.category}
                      onValueChange={(value) => updateCustomTemplate(item.id, { ...item, category: value })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {templateCategories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      className="h-8 w-24"
                      defaultValue={item.price ?? ""}
                      placeholder={t.templates.free}
                      onBlur={(event) =>
                        updateCustomTemplate(item.id, {
                          ...item,
                          price: event.target.value === "" ? null : Number(event.target.value),
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8 min-w-40"
                      defaultValue={item.link}
                      placeholder={t.fields.linkPlaceholder}
                      onBlur={(event) => updateCustomTemplate(item.id, { ...item, link: event.target.value.trim() })}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="outline"
                      className={removeButtonClass}
                      onClick={() => removeCustomTemplate(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t.actions.delete}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </section>
  );
}

function RemovedAdmin({ t, search }: { t: AdminTranslations; search: string }) {
  const { removedComponentKeys, removedTemplateNames, restoreBaseComponent, restoreBaseTemplate } = useAdminCatalog();

  const removedComponents = CATEGORIES.flatMap((category) =>
    category.components
      .filter((component) => removedComponentKeys.includes(componentKey(category.slug, component.name)))
      .map((component) => ({ category, component }))
  ).filter(({ component }) => matches(component.name, search));

  const removedTemplates = TEMPLATES.filter((template) => removedTemplateNames.includes(template.name)).filter(
    (template) => matches(template.name, search)
  );

  return (
    <section className="mt-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t.removed.title}</h2>
        <p className="mt-1 text-sm text-white/45">{t.removed.subtitle}</p>
      </div>

      <SectionCard>
        <h3 className="text-sm font-semibold text-white/80">{t.components.title}</h3>
        {removedComponents.length === 0 ? (
          <EmptyState label={t.removed.emptyComponents} />
        ) : (
          <Table className="mt-3">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{t.components.table.name}</TableHead>
                <TableHead>{t.components.table.category}</TableHead>
                <TableHead className="w-28 text-right">{t.components.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {removedComponents.map(({ category, component }) => (
                <TableRow key={componentKey(category.slug, component.name)}>
                  <TableCell className="font-medium text-white/85">{component.name}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 text-white/60">
                      <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", category.tagColor.replace("text-", "bg-"))} />
                      {category.name}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-8 gap-1.5 px-2.5 text-xs"
                      onClick={() => restoreBaseComponent(category.slug, component.name)}
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {t.actions.restore}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <SectionCard>
        <h3 className="text-sm font-semibold text-white/80">{t.templates.title}</h3>
        {removedTemplates.length === 0 ? (
          <EmptyState label={t.removed.emptyTemplates} />
        ) : (
          <Table className="mt-3">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{t.templates.table.name}</TableHead>
                <TableHead>{t.templates.table.category}</TableHead>
                <TableHead className="w-28 text-right">{t.templates.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {removedTemplates.map((template) => {
                const category = TEMPLATE_CATEGORIES.find((item) => item.slug === template.category);
                return (
                  <TableRow key={template.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className={cn("h-8 w-8 shrink-0 rounded-lg", template.accent)} />
                        <p className="truncate text-sm font-medium text-white/85">{template.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/60">{category?.name ?? template.category}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-8 gap-1.5 px-2.5 text-xs"
                        onClick={() => restoreBaseTemplate(template.name)}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        {t.actions.restore}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </section>
  );
}

function UsersAdmin({ t, search }: { t: AdminTranslations; search: string }) {
  const { user: currentUser, listUsers, setUserRole, deleteUser } = useAuth();
  const [users, setUsers] = React.useState<AuthUser[]>([]);

  const refresh = React.useCallback(() => setUsers(listUsers()), [listUsers]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const visibleUsers = users.filter(
    (item) => matches(item.name, search) || matches(item.email, search)
  );

  return (
    <section className="mt-6 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{t.users.title}</h2>
        <p className="mt-1 text-sm text-white/45">{t.users.subtitle}</p>
      </div>

      <SectionCard>
        {visibleUsers.length === 0 ? (
          <EmptyState label={t.users.empty} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{t.users.table.name}</TableHead>
                <TableHead>{t.users.table.email}</TableHead>
                <TableHead className="w-44">{t.users.table.role}</TableHead>
                <TableHead className="w-28 text-right">{t.users.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleUsers.map((item) => {
                const isYou = currentUser?.email.toLowerCase() === item.email.toLowerCase();

                return (
                  <TableRow key={item.email}>
                    <TableCell className="font-medium text-white/85">
                      <span className="flex items-center gap-2">
                        {item.name}
                        {isYou ? (
                          <Badge variant="outline" className="border-white/10 text-white/40">
                            {t.users.you}
                          </Badge>
                        ) : null}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/60">{item.email}</TableCell>
                    <TableCell>
                      <Select
                        value={item.role}
                        disabled={isYou}
                        onValueChange={(value) => {
                          setUserRole(item.email, value as AuthRole);
                          refresh();
                        }}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">{t.users.roles.user}</SelectItem>
                          <SelectItem value="admin">{t.users.roles.admin}</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        variant="outline"
                        className={removeButtonClass}
                        disabled={isYou}
                        onClick={() => {
                          deleteUser(item.email);
                          refresh();
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t.actions.delete}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </section>
  );
}
