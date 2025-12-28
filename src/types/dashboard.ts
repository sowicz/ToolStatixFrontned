export interface MainTag {
  tag_id: number;
  tag_name: string;
  tag_address: string;
  active: boolean;
}

export interface DataSourceStatus {
  data_source_id: number;
  protocol: string;
  server_url: string;
  connected: boolean;
  machine: {
    id: number;
    name: string;
  };
  main_tags: MainTag[];
}
