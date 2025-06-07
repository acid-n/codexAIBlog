"use client";
import PostForm, { PostFormData } from "../../../components/PostForm";

const mockTags = [
  { id: 1, name: "Tech" },
  { id: 2, name: "Life" },
  { id: 3, name: "Art" },
];

export default function CreatePostPage() {
  const handleSubmit = (data: PostFormData) => {
    // В реальном приложении здесь будет вызов API
    console.log("create", data);
    alert("Черновик сохранен (mock)");
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Создать пост</h1>
      <PostForm allTags={mockTags} onSubmit={handleSubmit} />
    </div>
  );
}
