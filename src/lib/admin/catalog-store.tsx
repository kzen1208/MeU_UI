"use client";

import * as React from "react";
import {
  CATEGORIES,
  STATUS_COLOR,
  catalogPreview,
  type Category,
  type ComponentItem,
  type ComponentPreviewKind,
  type ComponentStatus,
} from "@/lib/components-data";
import {
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  templatePreview,
  type TemplateCategory,
  type TemplateItem,
  type TemplatePreviewKind,
} from "@/lib/templates-data";

const STORAGE_KEY = "meu-ui-hub-catalog-overrides";

export interface CustomComponent {
  id: string;
  categorySlug: string;
  name: string;
  status: ComponentStatus;
  previewKind: ComponentPreviewKind;
  accent: string;
  link: string;
}

export interface CustomTemplate {
  id: string;
  category: string;
  name: string;
  price: number | null;
  previewKind: TemplatePreviewKind;
  accent: string;
  link: string;
}

interface ComponentEdit {
  status?: ComponentStatus;
  link?: string;
}

interface TemplateEdit {
  price?: number | null;
  link?: string;
}

interface StoredOverrides {
  components: {
    added: CustomComponent[];
    edited: Record<string, ComponentEdit>;
    removed: string[];
  };
  templates: {
    added: CustomTemplate[];
    edited: Record<string, TemplateEdit>;
    removed: string[];
  };
}

const EMPTY_OVERRIDES: StoredOverrides = {
  components: { added: [], edited: {}, removed: [] },
  templates: { added: [], edited: {}, removed: [] },
};

export function componentKey(categorySlug: string, name: string) {
  return `${categorySlug}::${name}`;
}

function cloneEmpty(): StoredOverrides {
  return {
    components: { added: [], edited: {}, removed: [] },
    templates: { added: [], edited: {}, removed: [] },
  };
}

function readOverrides(): StoredOverrides {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneEmpty();

    const parsed = JSON.parse(raw) as Partial<StoredOverrides>;
    return {
      components: {
        added: parsed.components?.added ?? [],
        edited: parsed.components?.edited ?? {},
        removed: parsed.components?.removed ?? [],
      },
      templates: {
        added: parsed.templates?.added ?? [],
        edited: parsed.templates?.edited ?? {},
        removed: parsed.templates?.removed ?? [],
      },
    };
  } catch {
    return cloneEmpty();
  }
}

function writeOverrides(overrides: StoredOverrides) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export interface ComponentDraft {
  categorySlug: string;
  name: string;
  status: ComponentStatus;
  previewKind: ComponentPreviewKind;
  accent: string;
  link: string;
}

export interface TemplateDraft {
  category: string;
  name: string;
  price: number | null;
  previewKind: TemplatePreviewKind;
  accent: string;
  link: string;
}

interface AdminCatalogContextValue {
  ready: boolean;
  categories: Category[];
  templates: TemplateItem[];
  templateCategories: TemplateCategory[];
  customComponents: CustomComponent[];
  customTemplates: CustomTemplate[];
  removedComponentKeys: string[];
  removedTemplateNames: string[];
  componentEdits: Record<string, ComponentEdit>;
  templateEdits: Record<string, TemplateEdit>;
  addComponent: (draft: ComponentDraft) => void;
  updateCustomComponent: (id: string, draft: ComponentDraft) => void;
  removeCustomComponent: (id: string) => void;
  editBaseComponent: (categorySlug: string, name: string, edit: ComponentEdit) => void;
  removeBaseComponent: (categorySlug: string, name: string) => void;
  restoreBaseComponent: (categorySlug: string, name: string) => void;
  addTemplate: (draft: TemplateDraft) => void;
  updateCustomTemplate: (id: string, draft: TemplateDraft) => void;
  removeCustomTemplate: (id: string) => void;
  editBaseTemplate: (name: string, edit: TemplateEdit) => void;
  removeBaseTemplate: (name: string) => void;
  restoreBaseTemplate: (name: string) => void;
}

const AdminCatalogContext = React.createContext<AdminCatalogContextValue | undefined>(undefined);

export function AdminCatalogProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = React.useState<StoredOverrides>(cloneEmpty());
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    queueMicrotask(() => {
      setOverrides(readOverrides());
      setReady(true);
    });
  }, []);

  const persist = React.useCallback((updater: (current: StoredOverrides) => StoredOverrides) => {
    setOverrides((current) => {
      const next = updater(current);
      writeOverrides(next);
      return next;
    });
  }, []);

  const categories = React.useMemo<Category[]>(() => {
    return CATEGORIES.map((category) => {
      const components: ComponentItem[] = category.components
        .filter((component) => !overrides.components.removed.includes(componentKey(category.slug, component.name)))
        .map((component) => {
          const edit = overrides.components.edited[componentKey(category.slug, component.name)];
          if (!edit) return component;

          return {
            ...component,
            status: edit.status ?? component.status,
            statusColor: edit.status ? STATUS_COLOR[edit.status] : component.statusColor,
            link: edit.link !== undefined ? edit.link : component.link,
          };
        });

      const added: ComponentItem[] = overrides.components.added
        .filter((item) => item.categorySlug === category.slug)
        .map((item) => ({
          name: item.name,
          status: item.status,
          statusColor: STATUS_COLOR[item.status],
          preview: catalogPreview(item.previewKind, item.accent),
          link: item.link || undefined,
        }));

      return { ...category, components: [...components, ...added] };
    });
  }, [overrides]);

  const templates = React.useMemo<TemplateItem[]>(() => {
    const base = TEMPLATES.filter((template) => !overrides.templates.removed.includes(template.name)).map(
      (template) => {
        const edit = overrides.templates.edited[template.name];
        if (!edit) return template;

        return {
          ...template,
          price: edit.price !== undefined ? edit.price : template.price,
          link: edit.link !== undefined ? edit.link : template.link,
        };
      }
    );

    const added: TemplateItem[] = overrides.templates.added.map((item) => ({
      name: item.name,
      category: item.category,
      price: item.price,
      accent: item.accent,
      preview: templatePreview(item.previewKind, item.accent),
      link: item.link || undefined,
    }));

    return [...base, ...added];
  }, [overrides]);

  const addComponent = React.useCallback(
    (draft: ComponentDraft) => {
      persist((current) => ({
        ...current,
        components: {
          ...current.components,
          added: [
            ...current.components.added,
            { id: `custom-component-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...draft },
          ],
        },
      }));
    },
    [persist]
  );

  const updateCustomComponent = React.useCallback(
    (id: string, draft: ComponentDraft) => {
      persist((current) => ({
        ...current,
        components: {
          ...current.components,
          added: current.components.added.map((item) => (item.id === id ? { ...item, ...draft } : item)),
        },
      }));
    },
    [persist]
  );

  const removeCustomComponent = React.useCallback(
    (id: string) => {
      persist((current) => ({
        ...current,
        components: {
          ...current.components,
          added: current.components.added.filter((item) => item.id !== id),
        },
      }));
    },
    [persist]
  );

  const editBaseComponent = React.useCallback(
    (categorySlug: string, name: string, edit: ComponentEdit) => {
      const key = componentKey(categorySlug, name);

      persist((current) => ({
        ...current,
        components: {
          ...current.components,
          edited: {
            ...current.components.edited,
            [key]: { ...current.components.edited[key], ...edit },
          },
        },
      }));
    },
    [persist]
  );

  const removeBaseComponent = React.useCallback(
    (categorySlug: string, name: string) => {
      const key = componentKey(categorySlug, name);

      persist((current) => ({
        ...current,
        components: {
          ...current.components,
          removed: current.components.removed.includes(key)
            ? current.components.removed
            : [...current.components.removed, key],
        },
      }));
    },
    [persist]
  );

  const restoreBaseComponent = React.useCallback(
    (categorySlug: string, name: string) => {
      const key = componentKey(categorySlug, name);

      persist((current) => ({
        ...current,
        components: {
          ...current.components,
          removed: current.components.removed.filter((item) => item !== key),
        },
      }));
    },
    [persist]
  );

  const addTemplate = React.useCallback(
    (draft: TemplateDraft) => {
      persist((current) => ({
        ...current,
        templates: {
          ...current.templates,
          added: [
            ...current.templates.added,
            { id: `custom-template-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...draft },
          ],
        },
      }));
    },
    [persist]
  );

  const updateCustomTemplate = React.useCallback(
    (id: string, draft: TemplateDraft) => {
      persist((current) => ({
        ...current,
        templates: {
          ...current.templates,
          added: current.templates.added.map((item) => (item.id === id ? { ...item, ...draft } : item)),
        },
      }));
    },
    [persist]
  );

  const removeCustomTemplate = React.useCallback(
    (id: string) => {
      persist((current) => ({
        ...current,
        templates: {
          ...current.templates,
          added: current.templates.added.filter((item) => item.id !== id),
        },
      }));
    },
    [persist]
  );

  const editBaseTemplate = React.useCallback(
    (name: string, edit: TemplateEdit) => {
      persist((current) => ({
        ...current,
        templates: {
          ...current.templates,
          edited: {
            ...current.templates.edited,
            [name]: { ...current.templates.edited[name], ...edit },
          },
        },
      }));
    },
    [persist]
  );

  const removeBaseTemplate = React.useCallback(
    (name: string) => {
      persist((current) => ({
        ...current,
        templates: {
          ...current.templates,
          removed: current.templates.removed.includes(name)
            ? current.templates.removed
            : [...current.templates.removed, name],
        },
      }));
    },
    [persist]
  );

  const restoreBaseTemplate = React.useCallback(
    (name: string) => {
      persist((current) => ({
        ...current,
        templates: {
          ...current.templates,
          removed: current.templates.removed.filter((item) => item !== name),
        },
      }));
    },
    [persist]
  );

  const value = React.useMemo<AdminCatalogContextValue>(
    () => ({
      ready,
      categories,
      templates,
      templateCategories: TEMPLATE_CATEGORIES,
      customComponents: overrides.components.added,
      customTemplates: overrides.templates.added,
      removedComponentKeys: overrides.components.removed,
      removedTemplateNames: overrides.templates.removed,
      componentEdits: overrides.components.edited,
      templateEdits: overrides.templates.edited,
      addComponent,
      updateCustomComponent,
      removeCustomComponent,
      editBaseComponent,
      removeBaseComponent,
      restoreBaseComponent,
      addTemplate,
      updateCustomTemplate,
      removeCustomTemplate,
      editBaseTemplate,
      removeBaseTemplate,
      restoreBaseTemplate,
    }),
    [
      ready,
      categories,
      templates,
      overrides,
      addComponent,
      updateCustomComponent,
      removeCustomComponent,
      editBaseComponent,
      removeBaseComponent,
      restoreBaseComponent,
      addTemplate,
      updateCustomTemplate,
      removeCustomTemplate,
      editBaseTemplate,
      removeBaseTemplate,
      restoreBaseTemplate,
    ]
  );

  return <AdminCatalogContext.Provider value={value}>{children}</AdminCatalogContext.Provider>;
}

export function useAdminCatalog() {
  const context = React.useContext(AdminCatalogContext);
  if (!context) throw new Error("useAdminCatalog must be used within AdminCatalogProvider");
  return context;
}
