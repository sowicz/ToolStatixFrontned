
export interface MainTagCreate {
  network_data_source_id: number;
  tag_name: string;
  tag_address: string;
  type: "float" | "int" | "bool" | "string";
  unit?: string;
  threshold?: number;
  polls?: number;
}

export interface NetworkDataSourceShort {
  id: number;
  server_url: string;
  port: number;
  protocol: string;
}

export interface MainTagRead {
  id: number;
  tag_name: string;
  tag_address: string;
  type: "float" | "int" | "bool" | "string";
  unit?: string;
  threshold?: number;
  polls?: number;
  created_at: string;
  network_data_sources: NetworkDataSourceShort;
}
