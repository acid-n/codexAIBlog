"use client";
import jwtDecode from "jwt-decode";
import { API_URL } from "../lib/api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface DecodedJwt {
  user_id: number;
  email: string;
  username: string;
  is_staff?: boolean;
  exp: number;
}

interface User {
  id: number;
  email: string;
  username: string;
  isStaff: boolean;
}

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isStaff: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider missing");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshTokenState, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleRefresh = useCallback(
    async (token?: string) => {
      const refresh = token || refreshTokenState;
      if (!refresh) return;
      try {
        const res = await fetch(`${API_URL}/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });
        if (res.ok) {
          const data = await res.json();
          setAuthState(data.access, refresh);
        } else {
          logout();
          throw new Error("Failed to refresh token");
        }
      } catch (err) {
        console.error("Token refresh error", err);
        throw err;
      }
    },
    [refreshTokenState],
  );

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");
    if (access && refresh) {
      const decoded = jwtDecode<DecodedJwt>(access);
      if (decoded.exp * 1000 < Date.now()) {
        handleRefresh(refresh).finally(() => setIsLoading(false));
        return;
      }
      setAuthState(access, refresh);
    }
    setIsLoading(false);
  }, [handleRefresh]);

  function setAuthState(access: string, refresh: string) {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
    const decoded = jwtDecode<DecodedJwt>(access);
    setUser({
      id: decoded.user_id,
      email: decoded.email,
      username: decoded.username,
      isStaff: !!decoded.is_staff,
    });
  }

  async function login(username: string, password: string) {
    try {
      const res = await fetch(`${API_URL}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const contentType = res.headers.get("content-type") || "";
      let data: any = null;
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { detail: text };
      }
      if (!res.ok) {
        throw new Error(data.detail || "Login error");
      }
      if (!contentType.includes("application/json")) {
        throw new Error("Invalid server response");
      }
      setAuthState(data.access, data.refresh);
    } catch (err) {
      console.error("Login error", err);
      throw err;
    }
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        isStaff: user?.isStaff || false,
        login,
        logout,
        refreshToken: handleRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
