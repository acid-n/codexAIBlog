const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const access = localStorage.getItem("accessToken");
  const headers = new Headers(options.headers);
  if (access) headers.set("Authorization", `Bearer ${access}`);
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "API error");
  }
  return res.json();
}

export const createPost = (data: any) =>
  fetchWithAuth(`${API_URL}/v1/posts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updatePost = (slug: string, data: any) =>
  fetchWithAuth(`${API_URL}/v1/posts/${slug}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const getPost = (slug: string) =>
  fetchWithAuth(`${API_URL}/v1/posts/${slug}/`);

export const getAllTags = () => fetchWithAuth(`${API_URL}/v1/tags/`);
