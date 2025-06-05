import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Musson Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
