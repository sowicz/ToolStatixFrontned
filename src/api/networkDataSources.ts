export interface NetworkDataSourceCreate {
  machine_id: number;
  protocol: string;       // np. "opc-ua"
  server_url: string;
  port: number;
}

export interface NetworkDataSourceRead extends NetworkDataSourceCreate {
  id: number;
  extra_config?: string;
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
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to create data source");
  }

  return res.json();
}
