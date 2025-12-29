// api/MainTags.ts
import type { MainTagCreate, MainTagRead } from "../types/MainTag";

const API_URL = "http://localhost:8000";

export async function getMainTags(): Promise<MainTagRead[]> {
  const res = await fetch(`${API_URL}/tags`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch main tags");
  return res.json();
}

export async function addMainTag(data: MainTagCreate): Promise<MainTagRead> {
  const res = await fetch(`${API_URL}/add-tag`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to add main tag");
  }

  return res.json();
}
