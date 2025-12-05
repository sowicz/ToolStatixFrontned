const API_URL = "http://localhost:8000"; // <-- zmień jeśli trzeba

export interface RelatedTag {
  id: number;
  main_tag_id: number;
  name: string;
}

export interface CreateRelatedTag {
  main_tag_id: number;
  name: string;
}

export async function getRelatedTags(): Promise<RelatedTag[]> {
  const res = await fetch(`${API_URL}/related-tags`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch related tags");
  }

  return res.json();
}

export async function addRelatedTag(data: CreateRelatedTag): Promise<RelatedTag> {
  const res = await fetch(`${API_URL}/add-related-tag`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to add related tag");
  }

  return res.json();
}
