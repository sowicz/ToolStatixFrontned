import { useEffect, useState } from "react";
import { fetchTagDataGrouped } from "../api/tagData";
import type { TagDataResponse } from "../types/tagDataTypes";
import TagChart from "./TagChart";

interface Props {
  tagId: number;
}

export default function TagDataContent({ tagId }: Props) {
  const [data, setData] = useState<TagDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchTagDataGrouped(tagId)
      .then(setData)
      .catch(() => setError("Brak danych dla tego taga"))
      .finally(() => setLoading(false));
  }, [tagId]);

  if (loading) {
    return <p className="text-gray-500">Ładowanie danych…</p>;
  }

  if (error || !data) {
    return (
      <div className="text-center text-gray-500 py-10">
        <div className="text-4xl mb-2">📉</div>
        <p>{error || "Brak danych"}</p>
      </div>
    );
  }

  const entries = Object.entries(data.data);

  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>Brak danych historycznych dla tego taga</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {entries.map(([label, series]) => (
        <TagChart
          key={label}
          label={label}
          series={series}
        />
      ))}
    </div>
  );
}
