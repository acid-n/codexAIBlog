"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginFormWrapper() {
  const searchParams = useSearchParams()!;
  const next = searchParams.get("next") || "/";
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(next);
    }
  }, [isLoading, user, next, router]);

  if (user) return null;

  return <LoginForm nextPath={next} />;
}
