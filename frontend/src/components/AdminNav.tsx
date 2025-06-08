"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { LuPlusCircle } from "react-icons/lu";

export default function AdminNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  if (!user) return null;
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <nav className="bg-gray-100 text-sm py-1 px-4 flex items-center gap-3">
      <span className="font-medium">👤 {user.username}</span>
      <Link
        href="/posts/create/"
        className="text-blue-600 flex items-center gap-1 hover:underline"
      >
        <LuPlusCircle className="w-4 h-4" /> Создать пост
      </Link>
      <button
        onClick={handleLogout}
        className="text-gray-500 hover:text-red-600"
      >
        🚪 Выйти
      </button>
    </nav>
  );
}
