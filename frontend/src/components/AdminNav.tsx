"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, LogOut, User, Home, File } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Tooltip from "./Tooltip";

export default function AdminNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  if (!user) return null;
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <nav className="bg-gray-50 border-b py-1">
      <ul className="flex justify-center gap-4 text-gray-600 text-sm">
        <li>
          <Tooltip content={user.username}>
            <User aria-label="Профиль" className="w-5 h-5" />
          </Tooltip>
        </li>
        <li>
          <Tooltip content="Главная">
            <Link href="/" aria-label="Главная">
              <Home className="w-5 h-5" />
            </Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip content="Создать пост">
            <Link href="/admin/create-post" aria-label="Создать пост">
              <PlusCircle className="w-5 h-5" />
            </Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip content="Черновики">
            <Link href="/admin/drafts" aria-label="Черновики">
              <File className="w-5 h-5" />
            </Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip content="Выход">
            <button onClick={handleLogout} aria-label="Выход">
              <LogOut className="w-5 h-5" />
            </button>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
}
