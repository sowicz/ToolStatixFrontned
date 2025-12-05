import { useEffect, useState } from "react";
import {
  fetchDataSources,
  createDataSource,
  type NetworkDataSourceCreate,
  type NetworkDataSourceRead,
} from "../api/networkDataSources";

export default function NetworkDataSources() {
  const [sources, setSources] = useState<NetworkDataSourceRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState<NetworkDataSourceCreate>({
    name: "",
    ip: "",
    port: 0
  });

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    try {
      setLoading(true);
      const data = await fetchDataSources();
      setSources(data);
    } catch (e) {
      // zmieniamy komunikat
      setError("Can't load data sources");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createDataSource(form);
      setForm({ name: "", ip: "", port: 0 });
      await loadSources();
    } catch (e) {
      setError("Can't load data sources");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Network Data Sources</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded mb-6"
      >
        <h2 className="text-lg font-semibold mb-4">Add Data Source</h2>

        <div className="grid gap-3">

          <input
            className="border border-gray-300 p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="border border-gray-300 p-2 rounded"
            placeholder="IP Address"
            value={form.ip}
            onChange={(e) => setForm({ ...form, ip: e.target.value })}
            required
          />

          <input
            type="number"
            className="border border-gray-300 p-2 rounded"
            placeholder="Port"
            value={form.port}
            onChange={(e) =>
              setForm({ ...form, port: Number(e.target.value) })
            }
            required
          />

          <button
            type="submit"
            className="bg-gray-700 text-white p-2 rounded hover:bg-gray-800"
          >
            Add
          </button>
        </div>
      </form>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {sources.map((s) => (
            <li key={s.id} className="p-4 bg-white border border-gray-300 rounded">
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-600">
                {s.ip}:{s.port}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ERROR NA DOLE */}
      {error && (
        <div className="mt-8 flex items-center gap-2 text-gray-500">
          <span className="text-xl">⚠</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
