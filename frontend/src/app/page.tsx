import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Как жить без нейросетей",
    slug: "kak-zhit-bez-neyrosetey",
    description: "Краткое описание поста 1",
  },
  {
    id: 2,
    title: "Оптимизация фронтенда в 2024",
    slug: "optimizaciya-frontenda",
    description: "Краткое описание поста 2",
  },
  {
    id: 3,
    title: "Стоит ли писать на Go?",
    slug: "stoit-li-pisat-na-go",
    description: "Краткое описание поста 3",
  },
];

export default function Home() {
  return (
    <section>
      <h1 className="mb-8 text-center text-4xl font-bold">Последние статьи</h1>
      <div className="space-y-10">
        {posts.map((post) => (
          <article key={post.id} className="mx-auto max-w-prose text-center">
            <h2 className="mb-1 text-[28px] font-bold leading-snug">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mb-2 text-sm text-gray-500">
              20 августа 2024 · Автор · Категория
            </p>
            <p className="text-gray-700">{post.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
