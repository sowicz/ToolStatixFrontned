

export interface MainTagRead {
  id: number;
  name: string;
}

export interface MainTagCreate {
  name: string;
}

const API_URL = "http://localhost:8000";


export async function getMainTags() {
  const res = await fetch(`${API_URL}/tags`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch main tags");
  }

  return res.json();
}

export async function addMainTag(data: { name: string }) {
  const res = await fetch(`${API_URL}/add-tag`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add main tag");
  }

  return res.json();
}