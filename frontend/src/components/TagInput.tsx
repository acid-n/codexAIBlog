"use client";
import { useState } from "react";
import { useTags } from "../hooks/useTags";
import { logger } from "../lib/logger";

interface Tag {
  id: number;
  name: string;
}

interface Props {
  value: number[];
  onChange: (value: number[]) => void;
}

export default function TagInput({ value, onChange }: Props) {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_TAGS !== "false";
  const { tags, loading, error } = useTags(enabled);
  const [query, setQuery] = useState("");

  if (!enabled) {
    logger.info("Tag input disabled via NEXT_PUBLIC_ENABLE_TAGS");
    return null;
  }

  const filtered = tags.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) &&
      !value.includes(t.id),
  );

  const addTag = (tag: Tag) => {
    onChange([...value, tag.id]);
    setQuery("");
  };

  const removeTag = (id: number) => {
    onChange(value.filter((v) => v !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tags.find(
        (t) => t.name.toLowerCase() === query.toLowerCase().trim(),
      );
      if (tag) {
        addTag(tag);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((id) => {
          const tag = tags.find((t) => t.id === id);
          if (!tag) return null;
          return (
            <span
              key={id}
              className="bg-gray-200 rounded-full px-2 py-1 text-sm flex items-center"
            >
              {tag.name}
              <button
                type="button"
                className="ml-1 text-red-600"
                onClick={() => removeTag(id)}
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
      {loading ? (
        <div className="w-full h-9 bg-gray-200 rounded animate-pulse" />
      ) : (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border rounded p-2"
          placeholder="Добавить тег"
          list="tags-suggestions"
        />
      )}
      {!loading && error && (
        <p className="mt-1 text-sm text-red-500">⚠️ Теги не загрузились</p>
      )}
      <datalist id="tags-suggestions">
        {filtered.map((tag) => (
          <option key={tag.id} value={tag.name} />
        ))}
      </datalist>
    </div>
  );
}
