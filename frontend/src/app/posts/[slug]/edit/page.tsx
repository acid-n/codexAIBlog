"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostForm, { PostFormData } from "../../../../components/PostForm";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { getPost, updatePost, deletePost } from "../../../../lib/api";

export default function EditPostPage() {
  const params = useParams<{ slug: string }>()!;
  const [post, setPost] = useState<PostFormData | null>(null);
  const router = useRouter();

  useEffect(() => {
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
          onSubmit={handleSubmit}
          onSaveDraft={handleDraft}
          onCancel={() => router.push("/admin/posts")}
          onDelete={handleDelete}
        />
      </div>
    </ProtectedRoute>
  );
}
