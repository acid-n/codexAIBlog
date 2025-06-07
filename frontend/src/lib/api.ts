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

export const createPost = (data: any) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "image" && value instanceof Blob) {
      formData.append("image", value, "image.webp");
    } else {
      formData.append(
        key,
        typeof value === "object" ? JSON.stringify(value) : String(value),
      );
    }
  });
  return fetchWithAuth(`${API_URL}/v1/posts/`, {
    method: "POST",
    body: formData,
  });
};

export const updatePost = (slug: string, data: any) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "image" && value instanceof Blob) {
      formData.append("image", value, "image.webp");
    } else {
      formData.append(
        key,
        typeof value === "object" ? JSON.stringify(value) : String(value),
      );
    }
  });
  return fetchWithAuth(`${API_URL}/v1/posts/${slug}/`, {
    method: "PATCH",
    body: formData,
  });
};

export const getPost = (slug: string) =>
  fetchWithAuth(`${API_URL}/v1/posts/${slug}/`);

export const getAllTags = () => fetchWithAuth(`${API_URL}/v1/tags/`);
