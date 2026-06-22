"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Boxes } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

const MEMBER_AVATARS = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
];

const SignIn1 = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { language } = useLanguage();
  const t = translations[language].auth.login;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();

    const result = login(email, password);
    if (!result.success) {
      setError(t.errors[result.error as keyof typeof t.errors] ?? t.errors.required);
      return;
    }

    setError("");
    router.push("/profile");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050936]">
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-[#050936] p-8 shadow-2xl backdrop-blur-sm">
        <Link
          href="/"
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 shadow-lg"
          aria-label="MeU UI Hub"
        >
          <Boxes className="h-6 w-6 text-white" strokeWidth={2.2} />
        </Link>

        <h2 className="mb-1 text-center text-2xl font-semibold text-white">{t.title}</h2>
        <p className="mb-6 text-center text-sm text-white/55">{t.subtitle}</p>

        <form className="flex w-full flex-col gap-4" onSubmit={handleSignIn}>
          <div className="flex w-full flex-col gap-3">
            <input
              placeholder={t.emailPlaceholder}
              type="text"
              value={email}
              autoComplete="username"
              className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#85a0ff]/70"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              placeholder={t.passwordPlaceholder}
              type="password"
              value={password}
              autoComplete="current-password"
              className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#85a0ff]/70"
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && <div className="text-left text-sm text-[#ff8a8a]">{error}</div>}
          </div>

          <hr className="border-white/10" />

          <div>
            <button
              type="submit"
              className="mb-3 w-full rounded-full bg-[#4264ff] px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-[#3450d6]"
            >
              {t.submit}
            </button>

            <button
              type="button"
              className="mb-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white/15 to-white/5 px-5 py-3 text-sm font-medium text-white shadow transition hover:brightness-110"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              {t.google}
            </button>

            <div className="mt-2 w-full text-center">
              <span className="text-xs text-white/45">
                {t.noAccount}{" "}
                <Link href="/register" className="text-white/80 underline hover:text-white">
                  {t.registerLink}
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>

      <div className="relative z-10 mt-12 flex flex-col items-center text-center">
        <p className="mb-2 text-sm text-white/50">
          {t.joinPrefix} <span className="font-medium text-white">{t.joinHighlight}</span>{" "}
          {t.joinSuffix}
        </p>
        <div className="flex">
          {MEMBER_AVATARS.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="-ml-2 h-8 w-8 rounded-full border-2 border-[#050936] object-cover first:ml-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { SignIn1 };
