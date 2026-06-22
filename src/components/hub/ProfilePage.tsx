"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shuffle, LogOut } from "lucide-react";
import { Navbar1 } from "@/components/ui/shadcnblocks-com-navbar1";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

const randomAvatarSeed = () => Math.random().toString(36).slice(2, 10);

export default function ProfilePage() {
  const router = useRouter();
  const { user, ready, logout, updateProfile } = useAuth();
  const { language, setLanguage } = useLanguage();
  const t = translations[language].auth.profile;

  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (!user) return;

    queueMicrotask(() => {
      setName(user.name);
      setBio(user.bio);
      setAvatar(user.avatar);
    });
  }, [user]);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile({ name, bio, avatar });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const handleShuffleAvatar = () => {
    setAvatar(`https://api.dicebear.com/9.x/notionists/svg?seed=${randomAvatarSeed()}`);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!ready) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f7f8ff] text-[#050936]">
        <Navbar1 className="border-white/8 bg-[#050936]" />
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t.notLoggedInTitle}</h1>
          <p className="mt-3 text-[#050936]/65">{t.notLoggedInDescription}</p>
          <Button asChild className="mt-6">
            <Link href="/login">{t.goToLogin}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8ff] text-[#050936]">
      <Navbar1 className="border-white/8 bg-[#050936]" />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
        <p className="mt-2 text-[#050936]/65">{t.subtitle}</p>

        <form
          onSubmit={handleSave}
          className="mt-10 flex flex-col gap-8 rounded-3xl border border-[#050936]/10 bg-white p-8 shadow-[0_18px_38px_rgba(5,9,54,0.06)]"
        >
          <div className="flex items-center gap-5">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-20 w-20 rounded-full border border-[#050936]/10 bg-[#f7f8ff] object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-full border border-[#050936]/10 bg-[#f7f8ff]" />
            )}
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#050936]/45">
                {t.avatarLabel}
              </p>
              <button
                type="button"
                onClick={handleShuffleAvatar}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#050936]/12 px-4 py-2 text-sm font-semibold text-[#4264ff] transition hover:bg-[#eef2ff]"
              >
                <Shuffle className="h-4 w-4" />
                {t.shuffleAvatar}
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold uppercase tracking-wide text-[#050936]/45">
                {t.nameLabel}
              </span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-xl border border-[#050936]/12 bg-[#f7f8ff] px-4 py-3 text-sm text-[#050936] focus:outline-none focus:ring-2 focus:ring-[#85a0ff]/70"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold uppercase tracking-wide text-[#050936]/45">
                {t.emailLabel}
              </span>
              <input
                type="email"
                value={user.email}
                disabled
                className="cursor-not-allowed rounded-xl border border-[#050936]/12 bg-[#f7f8ff] px-4 py-3 text-sm text-[#050936]/55"
              />
            </label>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold uppercase tracking-wide text-[#050936]/45">
                {t.roleLabel}
              </span>
              <span
                className={`inline-flex h-11.5 w-fit items-center rounded-xl px-4 text-sm font-semibold ${
                  user.role === "admin"
                    ? "bg-[#4264ff]/10 text-[#4264ff]"
                    : "bg-[#050936]/5 text-[#050936]/70"
                }`}
              >
                {t.roles[user.role]}
              </span>
            </div>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold uppercase tracking-wide text-[#050936]/45">
              {t.bioLabel}
            </span>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder={t.bioPlaceholder}
              rows={3}
              className="resize-none rounded-xl border border-[#050936]/12 bg-[#f7f8ff] px-4 py-3 text-sm text-[#050936] placeholder-[#050936]/35 focus:outline-none focus:ring-2 focus:ring-[#85a0ff]/70"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold uppercase tracking-wide text-[#050936]/45">
              {t.languageLabel}
            </span>
            <div className="inline-flex w-fit items-center rounded-lg border border-[#050936]/12 bg-[#f7f8ff] p-1">
              {(["vi", "en"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={language === item}
                  onClick={() => setLanguage(item)}
                  className={`h-8 rounded-md px-3 text-xs font-black tracking-[0.12em] transition ${
                    language === item
                      ? "bg-[#4264ff] text-white shadow-sm"
                      : "text-[#050936]/55 hover:bg-white"
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-[#050936]/10 pt-6">
            <Button type="submit" variant="default">
              {t.saveButton}
            </Button>
            {saved && <span className="text-sm font-semibold text-[#4264ff]">{t.savedMessage}</span>}

            <button
              type="button"
              onClick={handleLogout}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-[#050936]/12 px-4 py-2 text-sm font-semibold text-[#050936]/65 transition hover:bg-[#f7f8ff] hover:text-[#050936]"
            >
              <LogOut className="h-4 w-4" />
              {t.logoutButton}
            </button>
          </div>
        </form>

        {user.role === "admin" ? (
          <Link
            href="/admin"
            className="mt-6 flex items-center justify-between gap-4 rounded-3xl border border-[#4264ff]/25 bg-[#4264ff]/8 p-6 transition hover:bg-[#4264ff]/12"
          >
            <div>
              <p className="text-lg font-bold text-[#050936]">{t.adminDashboardLink}</p>
              <p className="mt-1 text-sm text-[#050936]/60">{t.adminDashboardDescription}</p>
            </div>
            <span className="inline-flex h-10 items-center rounded-full bg-[#4264ff] px-5 text-sm font-semibold text-white">
              {t.adminDashboardLink}
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
