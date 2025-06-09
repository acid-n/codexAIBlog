"use client";
import PostForm, { PostFormData } from "../../../components/PostForm";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { createPost } from "../../../lib/api";
import { useTags } from "../../../hooks/useTags";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();

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
          onSubmit={handleSubmit}
          onSaveDraft={handleDraft}
          onCancel={() => router.push("/admin/posts")}
        />
      </div>
    </ProtectedRoute>
  );
}
