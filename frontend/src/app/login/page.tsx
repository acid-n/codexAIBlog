"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import LoginForm from "../../components/login/LoginForm";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = search.get("next") || "/";

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(nextPath);
    }
  }, [user, isLoading, nextPath, router]);

  if (user) return null;

  return (
    <div className="mt-10">
      <h1 className="mb-6 text-2xl font-bold text-center">Вход</h1>
      <LoginForm />
    </div>
  );
}
