import { apiFetch } from "./apiClient";
import type { TagDataResponse } from "../types/tagDataTypes";

export const fetchTagDataGrouped = (tagId: number) =>
  apiFetch<TagDataResponse>(`/tag-data-grouped/${tagId}`);
