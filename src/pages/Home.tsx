import { useEffect, useState, useCallback } from "react";
import type { DataSourceStatus } from "../types/dashboard";
import DataSourceCard from "../components/DataSourceCard";
import { fetchOpcuaStatusAll } from "../api/opcua";

export default function Home() {
  const [data, setData] = useState<DataSourceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetchOpcuaStatusAll();
      setData(res);
      setError(null); // ✅ backend wrócił
    } catch (err) {
      console.error("Failed to fetch OPCUA status", err);
      setError("Brak połączenia z serwerem aplikacji");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard…</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">
        Home dashboard
      </h1>

      {/* ❌ ERROR BANNER */}
      {error && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* DASHBOARD */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {data.map(ds => (
          <DataSourceCard
            key={ds.data_source_id}
            data={ds}
            onRefresh={fetchData}
          />
        ))}
      </div>

      {/* Edge case: brak danych */}
      {!data.length && !error && (
        <p className="text-sm text-gray-400">
          Brak dostępnych data sources
        </p>
      )}
    </div>
  );
}
