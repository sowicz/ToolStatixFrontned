export interface NetworkDataSourceCreate {
  name: string;
  ip: string;
  port: number;
}

export interface NetworkDataSourceRead extends NetworkDataSourceCreate {
  id: number;
}

const API_URL = "http://localhost:8000";

export async function fetchDataSources(): Promise<NetworkDataSourceRead[]> {
  const res = await fetch(`${API_URL}/network-data-sources`);
  if (!res.ok) throw new Error("Failed to fetch data sources");
  return res.json();
}

export async function createDataSource(data: NetworkDataSourceCreate) {
  const res = await fetch(`${API_URL}/network-data-sources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to create");
  }

  return res.json();
}
