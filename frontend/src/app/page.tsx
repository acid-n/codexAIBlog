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
    <main>
      <h1>Последние статьи</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
