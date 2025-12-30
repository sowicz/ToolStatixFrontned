import { useEffect, useState } from "react";
import {
  fetchDataSources,
  createDataSource,
} from "../api/networkDataSources";
import type { NetworkDataSourceCreate, NetworkDataSourceRead } from "../types/networkDataSourcesTypes";
import { getMachines } from "../api/machines";
import type { Machine } from "../types/Machine";

export default function NetworkDataSources() {
  const [sources, setSources] = useState<NetworkDataSourceRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [machines, setMachines] = useState<Machine[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState<NetworkDataSourceCreate>({
    machine_id: 0,
    protocol: "opc-ua",
    server_url: "",
    port: 0,
    extra_config: "",
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
      const list = await getMachines();
      setMachines(list);
    } catch {
      console.error("Can't load machines");
    }
  };

  useEffect(() => {
    loadSources();
    loadMachines();
  }, []);

  const validateIp = (ip: string) => {
    const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    return ipRegex.test(ip);
  };

  const validatePort = (port: number) => port >= 1 && port <= 65535;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.machine_id === 0) {
      setError("Please select a machine");
      return;
    }

    if (!validateIp(form.server_url)) {
      setError("Invalid IP address");
      return;
    }

    if (!validatePort(form.port)) {
      setError("Port must be between 1 and 65535");
      return;
    }

    try {
      await createDataSource(form);
      setForm({
        machine_id: 0,
        protocol: "opc-ua",
        server_url: "",
        port: 0,
        extra_config: "",
      });
      setShowForm(false);
      await loadSources();
    } catch (e: any) {
      setError(e.message || "Failed to create data source");
    }
  };

  return (
    <div className="max-w-3xl mt-8 mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Network Data Sources</h1>

        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          + Add data source
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 border border-gray-300 rounded space-y-4"
        >
          <h2 className="text-lg font-semibold">Add Data Source</h2>

          <div className="grid gap-3">

            <select
              className="border border-gray-300 p-2 rounded"
              value={form.machine_id}
              onChange={(e) =>
                setForm({ ...form, machine_id: Number(e.target.value) })
              }
              required
            >
              <option value={0}>Select machine</option>
              {machines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 p-2 rounded"
              value={form.protocol}
              onChange={(e) =>
                setForm({ ...form, protocol: e.target.value })
              }
              required
            >
              <option value="opc-ua">OPC-UA</option>
            </select>

            <input
              className="border border-gray-300 p-2 rounded"
              placeholder="Server URL (IP)"
              value={form.server_url}
              onChange={(e) =>
                setForm({ ...form, server_url: e.target.value })
              }
              required
            />

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

            <input
              className="border border-gray-300 p-2 rounded"
              placeholder="Extra config"
              value={form.extra_config}
              onChange={(e) =>
                setForm({ ...form, extra_config: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm({
                  machine_id: 0,
                  protocol: "opc-ua",
                  server_url: "",
                  port: 0,
                  extra_config: "",
                });
              }}
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

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}
        </form>
      )}

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
    </div>
  );
}
