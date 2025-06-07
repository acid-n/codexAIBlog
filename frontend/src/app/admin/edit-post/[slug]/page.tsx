"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostForm, { PostFormData } from "../../../../components/PostForm";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { getPost, updatePost, getAllTags } from "../../../../lib/api";

interface Tag {
  id: number;
  name: string;
}

export default function EditPostPage() {
  const params = useParams<{ slug: string }>()!;
  const [post, setPost] = useState<PostFormData | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllTags().then(setTags);
    getPost(params.slug).then(setPost);
  }, [params.slug]);

  const handleSubmit = async (data: PostFormData) => {
    await updatePost(params.slug, data);
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
        <PostForm initialData={post} allTags={tags} onSubmit={handleSubmit} />
      </div>
    </ProtectedRoute>
  );
}
