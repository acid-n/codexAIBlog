import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Lora, Coustard } from "next/font/google";
import "./globals.css";

const lora = Lora({ subsets: ["latin", "cyrillic"], variable: "--font-lora" });
const coustard = Coustard({
  subsets: ["latin", "cyrillic"],
  variable: "--font-coustard",
});

export const metadata: Metadata = {
  title: "Musson Blog",
  description: "Musson — блог об AI, ART и жизни",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${lora.variable} ${coustard.variable}`}>
      <body className="bg-white font-sans text-gray-800">
        <header className="bg-gray-100">
          <nav className="mx-auto flex max-w-content items-center justify-between px-4 py-4">
            <Link href="/" className="font-heading text-2xl">
              Musson
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/ai" className="hover:underline">
                AI
              </Link>
              <Link href="/art" className="hover:underline">
                ART
              </Link>
              <Link href="/life" className="hover:underline">
                LIFE
              </Link>
              <input
                type="search"
                placeholder="Поиск"
                className="rounded border px-2 py-1"
              />
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-content px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-content px-4 py-8 text-center text-sm text-gray-600">
          <p>© Musson Blog</p>
        </footer>
      </body>
    </html>
  );
}
