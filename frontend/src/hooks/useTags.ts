"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../lib/api";
import { logger } from "../lib/logger";

export interface Tag {
  id: number;
  name: string;
}

export function useTags(enabled: boolean) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const load = async () => {
      setLoading(true);
      try {
        const access = localStorage.getItem("accessToken");
        const headers: Record<string, string> = {};
        if (access) headers["Authorization"] = `Bearer ${access}`;
        const response = await fetch(`${API_URL}/v1/tags/`, { headers });
        if (!response.ok) throw new Error("Не удалось загрузить теги");
        setTags(await response.json());
      } catch (err) {
        logger.error("Ошибка загрузки тегов", err);
        setTags([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [enabled]);

  return { tags, loading, error };
}
