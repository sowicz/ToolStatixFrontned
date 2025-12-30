import { useEffect, useState } from "react";
import {
  getMainTags,
  addMainTag
} from "../api/MainTags";
import type {MainTagCreate, MainTagRead} from "../types/mainTagTypes";
import { fetchDataSources } from "../api/networkDataSources";
import type { NetworkDataSourceRead } from "../types/networkDataSourcesTypes";



export default function MainTags() {
  const [tags, setTags] = useState<MainTagRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dataSources, setDataSources] = useState<NetworkDataSourceRead[]>([]);
  const [loadingSources, setLoadingSources] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState<MainTagCreate>({
    network_data_source_id: 0,
    tag_name: "",
    tag_address: "",
    type: "float",
    unit: "",
    threshold: 0,
    polls: 1000,
  });

  // Load tags
  const loadTags = async () => {
    try {
      setLoading(true);
      const data = await getMainTags();
      setTags(data);
    } catch (e: any) {
      setError("Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  // Load data sources for dropdown
  const loadDataSources = async () => {
    try {
      setLoadingSources(true);
      const sources = await fetchDataSources();
      setDataSources(sources);
    } catch (e: any) {
      setError("Failed to load data sources");
    } finally {
      setLoadingSources(false);
    }
  };

  useEffect(() => {
    loadTags();
    loadDataSources();
  }, []);

  // Add tag
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.network_data_source_id === 0) {
      setError("Please select a data source");
      return;
    }
    if (!form.tag_name || !form.tag_address) {
      setError("Tag name and address are required");
      return;
    }

    try {
      await addMainTag(form);
      setForm({
        network_data_source_id: 0,
        tag_name: "",
        tag_address: "",
        type: "float",
        unit: "",
        threshold: 0,
        polls: 1000,
      });
      setShowForm(false);
      await loadTags();
    } catch (e: any) {
      setError(e.message || "Failed to create tag");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Main Tags</h1>
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "+ Add Tag"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 border border-gray-300 rounded space-y-4"
        >
          <h2 className="text-lg font-semibold">Add Main Tag</h2>

          <div className="grid gap-4">
            {/* Data source */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Data Source
              </label>
              <select
                value={form.network_data_source_id}
                onChange={e =>
                  setForm({
                    ...form,
                    network_data_source_id: Number(e.target.value),
                  })
                }
                required
                disabled={loadingSources}
                className="border border-gray-300 p-2 rounded"
              >
                <option value={0}>Select Data Source</option>
                {dataSources.map(ds => (
                  <option key={ds.id} value={ds.id}>
                    {ds.protocol.toUpperCase()} – {ds.server_url}:{ds.port}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Tag name
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded"
                placeholder="e.g. Power"
                value={form.tag_name}
                onChange={e =>
                  setForm({ ...form, tag_name: e.target.value })
                }
                required
              />
            </div>

            {/* Tag address */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Tag address (OPC UA)
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded"
                placeholder="ns=2;s=Channel1.TEST.sine1"
                value={form.tag_address}
                onChange={e =>
                  setForm({ ...form, tag_address: e.target.value })
                }
                required
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Data type
              </label>
              <select
                value={form.type}
                onChange={e =>
                  setForm({
                    ...form,
                    type: e.target.value as MainTagCreate["type"],
                  })
                }
                className="border border-gray-300 p-2 rounded"
              >
                <option value="float">float</option>
                <option value="int">int</option>
                <option value="bool">bool</option>
                <option value="string">string</option>
              </select>
            </div>

            {/* Unit */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Unit (optional)
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded"
                placeholder="e.g. A, V, °C"
                value={form.unit}
                onChange={e =>
                  setForm({ ...form, unit: e.target.value })
                }
              />
            </div>

            {/* Threshold */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Threshold value
              </label>
              <input
                type="number"
                className="border border-gray-300 p-2 rounded"
                placeholder="Value that triggers condition"
                value={form.threshold}
                min={0}
                onChange={e =>
                  setForm({
                    ...form,
                    threshold: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* Polls */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Polling interval (ms)
              </label>
              <input
                type="number"
                className="border border-gray-300 p-2 rounded"
                placeholder="e.g. 1000"
                value={form.polls}
                min={1}
                onChange={e =>
                  setForm({
                    ...form,
                    polls: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
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

      {/* ERROR */}
      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 text-sm">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading tags...</p>
      ) : tags.length === 0 ? (
        <p className="text-gray-500">No tags yet.</p>
      ) : (
        <ul className="space-y-3">
          {tags.map(tag => (
            <li
              key={tag.id}
              className="p-4 bg-white border border-gray-300 rounded space-y-1"
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold">{tag.tag_name}</div>

                <div className="text-xs text-gray-400">
                  DataSource id #{tag.network_data_sources.id}
                </div>
              </div>

              <div className="text-sm text-gray-600 break-all">
                {tag.tag_address}
              </div>

              <div className="text-xs text-gray-500">
                {tag.type}
                {tag.unit && ` · ${tag.unit}`}
                {tag.threshold !== undefined && ` · threshold: ${tag.threshold}`}
                {tag.polls !== undefined && ` · polls: ${tag.polls}`}
              </div>

              <div className="text-xs text-gray-400 pt-1">
                {tag.network_data_sources.protocol.toUpperCase()} ·{" "}
                {tag.network_data_sources.server_url}:{tag.network_data_sources.port}
              </div>
            </li>
          ))}
        </ul>
      )}


    </div>
  );
}
