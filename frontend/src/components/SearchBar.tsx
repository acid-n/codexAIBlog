"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputRef.current?.value;
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setOpen(false);
    }
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="hover:underline"
      >
        Search →
      </button>
      <form
        onSubmit={handleSubmit}
        className={`ml-2 overflow-hidden transition-all duration-300 ease-out ${
          open ? "w-40 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <input
          ref={inputRef}
          type="search"
          name="q"
          placeholder="Search"
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
      </form>
    </div>
  );
}
