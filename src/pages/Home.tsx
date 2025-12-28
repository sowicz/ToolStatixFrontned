import { useEffect, useState } from "react";
import type { DataSourceStatus } from "../types/dashboard.ts";
import DataSourceCard from "../components/DataSourceCard.tsx";

export default function Home() {
  const [data, setData] = useState<DataSourceStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/opcua/status/data-sources-all")
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard…</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">
        Home dashboard
      </h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data.map(ds => (
          <DataSourceCard key={ds.data_source_id} data={ds} />
        ))}
      </div>
    </div>
  );
}
