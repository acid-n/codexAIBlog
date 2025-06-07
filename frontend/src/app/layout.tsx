import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import SearchBar from "../components/SearchBar";
import { AuthProvider } from "../contexts/AuthContext";

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
        <AuthProvider>
          <header className="mx-auto max-w-content py-8 text-text">
            <h1 className="font-decorative text-center text-5xl font-bold">
              Musson
            </h1>
            <hr className="mx-auto my-2 w-16 border-gray-300" />
            <p className="text-center text-xs uppercase tracking-widest">
              Блог о технологиях и жизни
            </p>
            <nav className="mt-6 border-b border-gray-200 pb-3">
              <ul className="flex justify-center gap-6 text-[14px] uppercase">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="hover:underline">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About Me
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <SearchBar />
                </li>
              </ul>
            </nav>
          </header>
          <main className="mx-auto max-w-content px-4 py-8">{children}</main>
          <footer className="mx-auto max-w-content px-4 py-8 text-center text-sm text-gray-500">
            <p>© Musson Blog</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
