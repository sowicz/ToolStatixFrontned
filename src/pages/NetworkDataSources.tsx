import { useEffect, useState } from "react";
import {
  fetchDataSources,
  createDataSource,
  type NetworkDataSourceCreate,
  type NetworkDataSourceRead,
} from "../api/networkDataSources";
import { getMachines } from "../api/machines";
import type { Machine } from "../types/Machine";

export default function NetworkDataSources() {
  const [sources, setSources] = useState<NetworkDataSourceRead[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMachines, setLoadingMachines] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState<NetworkDataSourceCreate>({
    machine_id: 0,
    protocol: "opc-ua",
    server_url: "",
    port: 0,
  });


  const loadSources = async () => {
    try {
      setLoading(true);
      const data = await fetchDataSources();
      setSources(data);
    } catch {
      setError("Can't load data sources");
    } finally {
      setLoading(false);
    }
  };


  const loadMachines = async () => {
    try {
      setLoadingMachines(true);
      const list = await getMachines();
      setMachines(list);
      if (list.length > 0) {
        setForm(f => ({ ...f, machine_id: list[0].id }));
      }
    } catch {
      setError("Can't load machines");
    } finally {
      setLoadingMachines(false);
    }
  };


  useEffect(() => {
    loadSources();
    loadMachines();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Walidacja IP
    const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    if (!ipRegex.test(form.server_url)) {
      setError("Invalid IP address");
      return;
    }

    // Walidacja portu
    if (form.port < 1 || form.port > 65535) {
      setError("Port must be between 1 and 65535");
      return;
    }

    try {
      await createDataSource(form);
      setForm({ machine_id: 0, protocol: "opc-ua", server_url: "", port: 0 });
      setShowForm(false);
      await loadSources();
    } catch {
      setError("Failed to create data source");
    }
  };



  const handleCancel = () => {
    setForm({
      machine_id: machines.length > 0 ? machines[0].id : 0,
      protocol: "opc-ua",
      server_url: "",
      port: 0,
    });
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mt-8 mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Network Data Sources</h1>

        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          + Add data source
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 border border-gray-300 rounded space-y-4"
        >
          <h2 className="text-lg font-semibold">Add Data Source</h2>

          <div className="grid gap-3">
            {/* MACHINE SELECT */}
            {loadingMachines ? (
              <p className="text-gray-500 text-sm">Loading machines...</p>
            ) : (
              <select
                value={form.machine_id}
                onChange={(e) =>
                  setForm({ ...form, machine_id: Number(e.target.value) })
                }
                className="border border-gray-300 p-2 rounded"
                required
              >
                {machines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            )}

            {/* PROTOCOL SELECT */}
            <select
              value={form.protocol}
              onChange={(e) => setForm({ ...form, protocol: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              required
            >
              <option value="opc-ua">OPC-UA</option>
            </select>

            {/* SERVER URL */}
            <input
              className="border border-gray-300 p-2 rounded"
              placeholder="Server URL"
              value={form.server_url}
              onChange={(e) =>
                setForm({ ...form, server_url: e.target.value })
              }
              required
            />

            {/* PORT */}
            <input
              type="number"
              className="border border-gray-300 p-2 rounded"
              placeholder="Port"
              value={form.port || ""}
              onChange={(e) =>
                setForm({ ...form, port: Number(e.target.value) })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-gray-700 text-white hover:bg-gray-800"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : sources.length === 0 ? (
        <p className="text-gray-500">No data sources yet.</p>
      ) : (
        <ul className="space-y-3">
          {sources.map((s) => (
            <li
              key={s.id}
              className="p-4 bg-white border border-gray-300 rounded space-y-1"
            >
              <div className="font-semibold">{s.protocol.toUpperCase()}</div>
              <div className="text-sm text-gray-600">
                {s.server_url}:{s.port}
              </div>
              {s.extra_config && (
                <div className="text-xs text-gray-400">{s.extra_config}</div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
