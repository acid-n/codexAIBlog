import PostCard from "../components/PostCard";

interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: number;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Как жить без нейросетей",
    slug: "kak-zhit-bez-neyrosetey",
    description: "Краткое описание поста 1",
    author: 1,
  },
  {
    id: 2,
    title: "Оптимизация фронтенда в 2024",
    slug: "optimizaciya-frontenda",
    description: "Краткое описание поста 2",
    author: 2,
  },
  {
    id: 3,
    title: "Стоит ли писать на Go?",
    slug: "stoit-li-pisat-na-go",
    description: "Краткое описание поста 3",
    author: 1,
  },
];

export default function Home() {
  return (
    <section>
      <h1 className="mb-8 text-center text-4xl font-bold">Последние статьи</h1>
      <div className="space-y-10">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
