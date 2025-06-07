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
    title: "Mock Post 1",
    slug: "mock-post-1",
    description: "Краткое описание поста 1",
  },
  {
    id: 2,
    title: "Mock Post 2",
    slug: "mock-post-2",
    description: "Краткое описание поста 2",
  },
  {
    id: 3,
    title: "Mock Post 3",
    slug: "mock-post-3",
    description: "Краткое описание поста 3",
  },
];

export default function Home() {
  return (
    <section>
      <h1 className="mb-8 font-heading text-3xl">Последние статьи</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded border border-gray-200 p-6 transition-shadow hover:shadow-lg"
          >
            <h2 className="mb-2 text-xl font-heading transition-colors hover:text-blue-600">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-700">{post.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
