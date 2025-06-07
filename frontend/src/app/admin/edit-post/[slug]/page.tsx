"use client";
import { useParams } from "next/navigation";
import PostForm, { PostFormData } from "../../../../components/PostForm";

const mockTags = [
  { id: 1, name: "Tech" },
  { id: 2, name: "Life" },
  { id: 3, name: "Art" },
];

const mockPosts: PostFormData[] = [
  {
    title: "Hello",
    slug: "hello",
    description: "desc",
    body: { type: "doc", content: [] },
    is_published: false,
    sitemap_include: true,
    sitemap_priority: 0.5,
    sitemap_changefreq: "monthly",
    tags: [1],
  },
];

export default function EditPostPage() {
  const params = useParams<{ slug: string }>();
  const post = mockPosts.find((p) => p.slug === params.slug);

  const handleSubmit = (data: PostFormData) => {
    console.log("update", data);
    alert("Изменения сохранены (mock)");
  };

  if (!post) {
    return <p>Пост не найден</p>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Редактировать пост</h1>
      <PostForm initialData={post} allTags={mockTags} onSubmit={handleSubmit} />
    </div>
  );
}
