"use client";
import { ReactNode } from "react";

export default function Tooltip({
  content,
  children,
}: {
  content: string;
  children: ReactNode;
}) {
  return (
    <span className="relative inline-block group">
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
        {content}
      </span>
    </span>
  );
}
