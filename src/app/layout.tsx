import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { AuthProvider } from "@/lib/auth/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = { 
  title: "MeU UI Hub — Internal Design System & Component Store",
  description:
    "Hệ thống Design System nội bộ của MeU. Chuẩn hóa UI, tăng tốc phát triển, hỗ trợ multi-brand với React, Next.js, TypeScript, TailwindCSS và shadcn/ui.",
  keywords: ["design system", "component library", "MeU", "UI Hub", "React", "Next.js", "TailwindCSS"],
  authors: [{ name: "MeU Solutions" }],
  other: {
    google: "notranslate",
  },
  openGraph: {
    title: "MeU UI Hub — Design System & Component Store",
    description: "Chuẩn hóa UI. Xây nhanh hơn. Đồng nhất hơn.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      translate="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased notranslate`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" translate="no">
        <Script
          id="react-dom-external-translate-guard"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                if (typeof Node === "undefined") return;

                var originalRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function (child) {
                  if (child && child.parentNode !== this) {
                    return child;
                  }
                  return originalRemoveChild.apply(this, arguments);
                };

                var originalInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function (newNode, referenceNode) {
                  if (referenceNode && referenceNode.parentNode !== this) {
                    return this.appendChild(newNode);
                  }
                  return originalInsertBefore.apply(this, arguments);
                };
              })();
            `,
          }}
        />
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
 
