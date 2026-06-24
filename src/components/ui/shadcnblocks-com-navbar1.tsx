"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  Boxes,
  Code2,
  LayoutDashboard,
  Layers3,
  LogOut,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/components-data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";
import { useAuth } from "@/lib/auth/auth-context";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src?: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
  className?: string;
}

const categoryIcons = [
  Layers3,
  Palette,
  Code2,
  ShieldCheck,
  LayoutDashboard,
  Boxes,
  Sparkles,
  BookOpen,
  Rocket,
  Layers3,
];

type NavTranslations = (typeof translations)["vi"]["nav"];

const buildMenu = (t: NavTranslations): MenuItem[] => [
  { title: t.menu.home, url: "/" },
  {
    title: t.menu.system,
    url: "/#system",
    items: [
      {
        title: t.menu.systemItems.tokens.title,
        description: t.menu.systemItems.tokens.description,
        icon: <Palette className="size-5 shrink-0 text-[#85a0ff]" />,
        url: "/#system",
      },
      {
        title: t.menu.systemItems.training.title,
        description: t.menu.systemItems.training.description,
        icon: <BookOpen className="size-5 shrink-0 text-[#85a0ff]" />,
        url: "/#training",
      },
      {
        title: t.menu.systemItems.animation.title,
        description: t.menu.systemItems.animation.description,
        icon: <Sparkles className="size-5 shrink-0 text-[#85a0ff]" />,
        url: "/#animation-system",
      },
      {
        title: t.menu.systemItems.roadmap.title,
        description: t.menu.systemItems.roadmap.description,
        icon: <Rocket className="size-5 shrink-0 text-[#85a0ff]" />,
        url: "/#roadmap",
      },
    ],
  },
  {
    title: t.menu.components,
    url: "/components",
    items: CATEGORIES.map((category, index) => {
      const Icon = categoryIcons[index % categoryIcons.length];

      return {
        title: category.name,
        description: `${category.tag} - ${category.components.length} resources`,
        icon: <Icon className="size-5 shrink-0 text-[#85a0ff]" />,
        url: "/components",
      };
    }),
  },
  { title: t.menu.roadmap, url: "/#roadmap" },
];

const buildMobileExtraLinks = (t: NavTranslations) => [
  { name: t.mobileExtraLinks.foundation, url: "/#system" },
  { name: t.mobileExtraLinks.animation, url: "/#animation-system" },
  { name: t.mobileExtraLinks.training, url: "/#training" },
  { name: t.mobileExtraLinks.store, url: "/components" },
];

const buildAuth = (t: NavTranslations) => ({
  login: { text: t.auth.login, url: "/login" },
  signup: { text: t.auth.signup, url: "/register" },
});

function SmartLink({
  href,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}

function LogoMark({
  logo,
  subtitle,
}: {
  logo: NonNullable<Navbar1Props["logo"]>;
  subtitle: string;
}) {
  return (
    <SmartLink href={logo.url} className="flex min-w-0 items-center gap-3 text-white">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/14 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        aria-label={logo.alt}
      >
        <Boxes className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[17px] font-bold leading-none tracking-normal">
          {logo.title}
        </span>
        <span className="mt-1 block truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">
          {subtitle}
        </span>
      </span>
    </SmartLink>
  );
}

const renderMenuItem = (item: MenuItem, t: NavTranslations) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[36rem] grid-cols-2 gap-1 p-3">
            <li className="col-span-2">
              <NavigationMenuLink asChild>
                <SmartLink
                  href={item.url}
                  className="flex rounded-lg border border-white/10 bg-white/[0.045] p-3 transition hover:bg-black/30"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <p className="mt-1 text-sm leading-snug text-white/48">
                      {t.openSection(item.title)}
                    </p>
                  </div>
                </SmartLink>
              </NavigationMenuLink>
            </li>
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <SmartLink
                    href={subItem.url}
                    className="flex min-h-[84px] select-none gap-3 rounded-lg p-3 leading-none outline-none transition hover:bg-black/30"
                  >
                    {subItem.icon}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">{subItem.title}</div>
                      {subItem.description && (
                        <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/48">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </SmartLink>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <SmartLink
          href={item.url}
          className="inline-flex h-10 w-max items-center justify-center rounded-lg px-3.5 py-2 text-sm font-semibold text-white/68 transition hover:bg-black/30 hover:text-white"
        >
          {item.title}
        </SmartLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, t: NavTranslations, onNavigate: () => void) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-3 space-y-1">
          <SmartLink
            href={item.url}
            onClick={onNavigate}
            className="block rounded-lg border border-white/10 bg-white/4 px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
          >
            {t.viewAll(item.title)}
          </SmartLink>
          {item.items.map((subItem) => (
            <SmartLink
              key={subItem.title}
              href={subItem.url}
              onClick={onNavigate}
              className="flex select-none gap-3 rounded-lg p-3 leading-none outline-none transition hover:bg-white/[0.07]"
            >
              {subItem.icon}
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">{subItem.title}</div>
                {subItem.description && (
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/45">
                    {subItem.description}
                  </p>
                )}
              </div>
            </SmartLink>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <SmartLink
      key={item.title}
      href={item.url}
      onClick={onNavigate}
      className="text-sm font-semibold text-white"
    >
      {item.title}
    </SmartLink>
  );
};

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      aria-label="Language"
      className="inline-flex h-9 items-center rounded-lg border border-white/12 bg-white/[0.045] p-1"
      role="group"
    >
      {(["en", "vi"] as const).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={language === item}
          onClick={() => setLanguage(item)}
          className={cn(
            "h-7 rounded-md px-2.5 text-xs font-black tracking-[0.12em] transition",
            language === item
              ? "bg-white text-[#172250] shadow-sm"
              : "text-white/52 hover:bg-white/[0.08] hover:text-white"
          )}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function MobileNav({
  logo,
  menu,
  mobileExtraLinks,
  auth,
  t,
}: {
  logo: NonNullable<Navbar1Props["logo"]>;
  menu: MenuItem[];
  mobileExtraLinks: { name: string; url: string }[];
  auth: NonNullable<Navbar1Props["auth"]>;
  t: NavTranslations;
}) {
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={t.openMenu}
          className="relative"
        >
          <div className="relative size-4">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-4 bg-current transition-all duration-200",
                open ? "top-[0.4rem] -rotate-45" : "top-1"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-4 bg-current transition-all duration-200",
                open ? "top-[0.4rem] rotate-45" : "top-2.5"
              )}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={12}
        className="h-(--radix-popover-content-available-height) w-(--radix-popover-content-available-width) max-w-md overflow-y-auto rounded-xl p-0"
      >
        <div className="flex flex-col gap-7 px-5 py-6">
          <Accordion type="single" collapsible className="flex w-full flex-col gap-5">
            {menu.map((item) => renderMobileMenuItem(item, t, close))}
          </Accordion>
          <div className="border-t border-white/10 pt-4">
            <div className="grid grid-cols-2 gap-1">
              {mobileExtraLinks.map((link) => (
                <SmartLink
                  key={link.name}
                  href={link.url}
                  onClick={close}
                  className="inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium text-white/55 transition hover:bg-white/8 hover:text-white"
                >
                  {link.name}
                </SmartLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <UserChip label={user.name || t.user} avatar={user.avatar} href="/profile" onClick={close} />
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    close();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  {t.logout}
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" onClick={close}>
                  <SmartLink href={auth.login.url}>{auth.login.text}</SmartLink>
                </Button>
                <Button asChild onClick={close}>
                  <SmartLink href={auth.signup.url}>{auth.signup.text}</SmartLink>
                </Button>
              </>
            )}
          </div>
          <SmartLink href={logo.url} onClick={close} className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
            {logo.title} · {t.logoSubtitle}
          </SmartLink>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function UserChip({
  label,
  avatar,
  href,
  onClick,
}: {
  label: string;
  avatar?: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <SmartLink
      href={href}
      onClick={onClick}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/12 bg-white/4.5 px-3 text-sm font-semibold text-white/76 transition hover:bg-white/8 hover:text-white"
    >
      {avatar ? (
        <img src={avatar} alt="" className="h-5 w-5 rounded-full object-cover" />
      ) : (
        <UserRound className="h-4 w-4" />
      )}
      <span className="max-w-40 truncate">{label}</span>
    </SmartLink>
  );
}

const Navbar1 = ({
  logo = {
    url: "/",
    alt: "MeU UI Hub",
    title: "MeU UI Hub",
  },
  menu,
  mobileExtraLinks,
  auth,
  className,
}: Navbar1Props) => {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const t = translations[language].nav;
  const resolvedMenu = menu ?? buildMenu(t);
  const resolvedMobileExtraLinks = mobileExtraLinks ?? buildMobileExtraLinks(t);
  const resolvedAuth = auth ?? buildAuth(t);

  return (
    <section
      className={cn(
        "sticky top-0 z-50 border-b border-white/12 bg-[#172250]/92 text-white backdrop-blur-2xl",
        className
      )}
    >
      <div className="mx-auto w-full max-w-430 px-4 sm:px-6">
        <nav className="hidden h-16 items-center justify-between lg:flex">
          <div className="flex min-w-0 items-center gap-7">
            <LogoMark logo={logo} subtitle={t.logoSubtitle} />
            <NavigationMenu>
              <NavigationMenuList>
                {resolvedMenu.map((item) => renderMenuItem(item, t))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <LanguageToggle />
            <Separator orientation="vertical" className="h-5" />
            {user ? (
              <>
                <UserChip label={user.name || t.user} avatar={user.avatar} href="/profile" />
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  {t.logout}
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <SmartLink href={resolvedAuth.login.url}>{resolvedAuth.login.text}</SmartLink>
                </Button>
                <Button asChild size="sm">
                  <SmartLink href={resolvedAuth.signup.url}>{resolvedAuth.signup.text}</SmartLink>
                </Button>
              </>
            )}
          </div>
        </nav>

        <div className="flex h-16 items-center justify-between gap-3 lg:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <MobileNav logo={logo} menu={resolvedMenu} mobileExtraLinks={resolvedMobileExtraLinks} auth={resolvedAuth} t={t} />
            <LogoMark logo={logo} subtitle={t.logoSubtitle} />
          </div>
          <LanguageToggle />
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };
