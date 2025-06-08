"use client";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { Pencil } from "lucide-react";
import Tooltip from "./Tooltip";

export interface PostCardData {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: number;
}

export default function PostCard({ post }: { post: PostCardData }) {
  const { user, isStaff } = useAuth();
  const canEdit = user && (user.id === post.author || isStaff);
  return (
    <article className="mx-auto max-w-prose text-center">
      <h2 className="mb-1 text-[28px] font-bold leading-snug">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
        {canEdit && (
          <Tooltip content="Редактировать">
            <Link href={`/posts/${post.slug}/edit`} aria-label="Редактировать">
              <Pencil className="inline-block w-4 h-4 ml-1 text-gray-500 hover:text-blue-600" />
            </Link>
          </Tooltip>
        )}
      </h2>
      <p className="mb-2 text-sm text-gray-500">
        20 августа 2024 · Автор · Категория
      </p>
      <p className="text-gray-700">{post.description}</p>
    </article>
  );
}
