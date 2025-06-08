"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostForm, { PostFormData } from "../../../../components/PostForm";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import {
  getPost,
  updatePost,
  getAllTags,
  deletePost,
} from "../../../../lib/api";
import { logger } from "../../../../lib/logger";

interface Tag {
  id: number;
  name: string;
}

export default function EditPostPage() {
  const showTags = process.env.NEXT_PUBLIC_SHOW_TAGS !== "false";
  const params = useParams<{ slug: string }>()!;
  const [post, setPost] = useState<PostFormData | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (showTags) {
      getAllTags()
        .then(setTags)
        .catch((e) => {
          logger.error("Не удалось получить теги", e);
          setTags([]);
        });
    }
    getPost(params.slug).then(setPost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  const handleSubmit = async (data: PostFormData) => {
    await updatePost(params.slug, data);
    await fetch(
      `/api/revalidate?tag=posts&slug=${params.slug}&secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`,
    );
    router.push("/admin/posts");
  };

  const handleDraft = async (data: PostFormData) => {
    await updatePost(params.slug, { ...data, is_published: false });
    alert("Черновик обновлён");
  };

  const handleDelete = async () => {
    await deletePost(params.slug);
    await fetch(
      `/api/revalidate?tag=posts&slug=${params.slug}&secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`,
    );
    router.push("/admin/posts");
  };

  if (!post) {
    return <p>Загрузка...</p>;
  }

  return (
    <ProtectedRoute>
      <div>
        <h1 className="mb-4 text-2xl font-bold">Редактировать пост</h1>
        <PostForm
          initialData={post}
          allTags={tags}
          onSubmit={handleSubmit}
          onSaveDraft={handleDraft}
          onCancel={() => router.push("/admin/posts")}
          onDelete={handleDelete}
        />
      </div>
    </ProtectedRoute>
  );
}
