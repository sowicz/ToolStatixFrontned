import { useEffect, useState } from "react";
import { getMachines, createMachine } from "../api/machines";
import type { Machine } from "../types/Machine";



export default function MachinePage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const load = async () => {
    try {
      setLoadingList(true);
      const list = await getMachines();
      setMachines(list);
    } catch {
      setError("Can't load machines");
    } finally {
      setLoadingList(false);
    }
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setError("");
    setLoadingAdd(true);
    setShowForm(false);

    try {
      await createMachine({
        name,
        description: description || undefined,
      });

      setName("");
      setDescription("");
      await load();
    } catch {
      setError("Failed to create machine");
    } finally {
      setLoadingAdd(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-3xl mt-8 mx-auto space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Machines</h1>

        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          + Add machine
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={add}
          className="bg-white p-4 border border-gray-300 rounded space-y-4"
        >
          <h2 className="text-lg font-semibold">Add Machine</h2>

          <div className="grid gap-3">
            <input
              className="border border-gray-300 p-2 rounded"
              placeholder="Machine name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              className="border border-gray-300 p-2 rounded resize-none"
              placeholder="Description (optional)"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setName("");
                setDescription("");
              }}
              className="px-3 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loadingAdd}
              className="px-4 py-2 text-sm rounded bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {loadingAdd ? "Adding..." : "Save"}
            </button>
          </div>
        </form>
      )}

      {/* LIST */}
      {loadingList ? (
        <p className="text-gray-500">Loading...</p>
      ) : machines.length === 0 ? (
        <p className="text-gray-500">No machines yet.</p>
      ) : (
        <ul className="space-y-3">
          {machines.map((m) => (
            <li
              key={m.id}
              className="p-4 bg-white border border-gray-300 rounded"
            >
              <div className="font-semibold">{m.name}</div>
              {m.description && (
                <div className="text-sm text-gray-500 mt-1">
                  {m.description}
                </div>
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
