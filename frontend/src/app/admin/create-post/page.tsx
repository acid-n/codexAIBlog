"use client";
import { useEffect, useState } from "react";
import PostForm, { PostFormData } from "../../../components/PostForm";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { createPost, getAllTags } from "../../../lib/api";
import { logger } from "../../../lib/logger";
import { useRouter } from "next/navigation";

interface Tag {
  id: number;
  name: string;
}

export default function CreatePostPage() {
  const showTags = process.env.NEXT_PUBLIC_SHOW_TAGS !== "false";
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!showTags) return;
    getAllTags()
      .then(setTags)
      .catch((e) => {
        logger.error("Не удалось получить теги", e);
        setTags([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (data: PostFormData) => {
    await createPost(data);
    await fetch(
      `/api/revalidate?tag=posts&secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`,
    );
    router.push("/admin/posts");
  };

  const handleDraft = async (data: PostFormData) => {
    await createPost({ ...data, is_published: false });
    alert("Черновик сохранён");
  };

  return (
    <ProtectedRoute>
      <div>
        <h1 className="mb-4 text-2xl font-bold">Создать пост</h1>
        <PostForm
          allTags={tags}
          onSubmit={handleSubmit}
          onSaveDraft={handleDraft}
          onCancel={() => router.push("/admin/posts")}
        />
      </div>
    </ProtectedRoute>
  );
}
