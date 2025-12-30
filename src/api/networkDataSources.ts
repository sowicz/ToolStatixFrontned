import { apiFetch } from "./apiClient";
import type { NetworkDataSourceCreate, NetworkDataSourceRead } from "../types/networkDataSourcesTypes";



export const fetchDataSources = () =>
  apiFetch<NetworkDataSourceRead[]>("/network-data-sources");


export const createDataSource = (data: NetworkDataSourceCreate) =>
  apiFetch<NetworkDataSourceRead>("/network-data-sources", {
    method: "POST",
    body: JSON.stringify(data),
  });

