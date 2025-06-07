"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import jwtDecode from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";

interface DecodedJwt {
  exp: number;
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, accessToken, isLoading, refreshToken } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    async function check() {
      if (!isLoading) {
        if (accessToken) {
          const { exp } = jwtDecode<DecodedJwt>(accessToken);
          if (exp * 1000 < Date.now()) {
            try {
              await refreshToken();
            } catch {
              router.replace(`/login?next=${encodeURIComponent(path)}`);
            }
          }
        }
        if (!user) {
          router.replace(`/login?next=${encodeURIComponent(path)}`);
        }
      }
    }
    check();
  }, [user, isLoading, accessToken, path, router, refreshToken]);

  if (isLoading || !user) {
    return <p>Загрузка...</p>;
  }
  return <>{children}</>;
}
