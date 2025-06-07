"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Mock hook, replace with real auth hook
function useUser() {
  return { user: { id: 1 }, isLoading: false };
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return user ? <>{children}</> : null;
}
