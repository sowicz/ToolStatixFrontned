export interface NetworkDataSourceCreate {
  machine_id: number;
  protocol: string;
  server_url: string;
  port: number;
  extra_config: string;
}

export interface NetworkDataSourceRead extends NetworkDataSourceCreate {
  id: number;
}
