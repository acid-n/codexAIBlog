import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ru">
      <body>
        <header>
          <nav>
            <Link href="/">Musson</Link> | <Link href="/ai">AI</Link> |{" "}
            <Link href="/art">ART</Link> | <Link href="/life">LIFE</Link>
            <input type="search" placeholder="Поиск" />
          </nav>
        </header>
        {children}
        <footer>
          <p>© Musson Blog</p>
        </footer>
      </body>
    </html>
  );
}
