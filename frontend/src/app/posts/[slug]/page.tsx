"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import { LuPencil } from "react-icons/lu";

const posts = [
  {
    id: 1,
    slug: "kak-zhit-bez-neyrosetey",
    title: "Как жить без нейросетей",
    description: "Краткое описание поста 1",
    author: 1,
  },
  {
    id: 2,
    slug: "optimizaciya-frontenda",
    title: "Оптимизация фронтенда в 2024",
    description: "Краткое описание поста 2",
    author: 2,
  },
  {
    id: 3,
    slug: "stoit-li-pisat-na-go",
    title: "Стоит ли писать на Go?",
    description: "Краткое описание поста 3",
    author: 1,
  },
];

export default function PostPage() {
  const params = useParams<{ slug: string }>()!;
  const post = posts.find((p) => p.slug === params.slug);
  const { user, isStaff } = useAuth();
  if (!post) return <p>Пост не найден</p>;
  const canEdit = user && (user.id === post.author || isStaff);
  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold">
        {post.title}
        {canEdit && (
          <Link href={`/posts/${post.slug}/edit`} aria-label="Редактировать">
            <LuPencil className="inline-block w-5 h-5 ml-1 text-gray-500 hover:text-blue-600" />
          </Link>
        )}
      </h1>
      <p className="mb-4 text-gray-700">{post.description}</p>
      <p>Контент поста...</p>
    </article>
  );
}
