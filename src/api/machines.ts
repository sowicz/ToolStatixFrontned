import { apiFetch } from "./apiClient";
import type { Machine } from "../types/Machine";

export function getMachines() {
  return apiFetch<Machine[]>("/machines");
}

export function createMachine(data: {
  name: string;
  description?: string;
}) {
  return apiFetch<Machine>("/machines", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
