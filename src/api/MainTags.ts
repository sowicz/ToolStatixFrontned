import { apiFetch } from "./apiClient";
import type { MainTagCreate, MainTagRead } from "../types/mainTagTypes";


export async function getMainTags() {
  return apiFetch<MainTagRead[]>("/tags");
} 


export const addMainTag = (data: MainTagCreate) =>
  apiFetch<MainTagRead>("/add-tag", {
    method: "POST",
    body: JSON.stringify(data),
  });
