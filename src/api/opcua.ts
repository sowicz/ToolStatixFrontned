import { apiFetch } from "./apiClient";
import type { DataSourceStatus } from "../types/dashboard";

/* ===========================
   DATA SOURCES
   =========================== */

export function fetchOpcuaStatusAll() {
  return apiFetch<DataSourceStatus[]>(
    "/opcua/status/data-sources-all"
  );
}

export function connectDataSource(id: number) {
  return apiFetch<void>(`/opcua/connect/${id}`, {
    method: "POST",
  });
}

export function disconnectDataSource(id: number) {
  return apiFetch<void>(`/opcua/disconnect/${id}`, {
    method: "POST",
  });
}

/* ===========================
   TAG SUBSCRIPTIONS
   =========================== */

export function startSubscription(tagId: number) {
  return apiFetch<void>(`/opcua/start-subscription/${tagId}`, {
    method: "POST",
  });
}

export function stopSubscription(tagId: number) {
  return apiFetch<void>(`/opcua/stop-subscription/${tagId}`, {
    method: "POST",
  });
}

export function getTagStatus(tagId: number) {
  return apiFetch(`/opcua/status/${tagId}`);
}

export function getActiveTags() {
  return apiFetch<number[]>(`/opcua/active-tags`);
}
