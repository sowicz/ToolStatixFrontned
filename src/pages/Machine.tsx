import { useEffect, useState } from "react";
import { getMachines, createMachine } from "../api/machines";
import type { Machine } from "../types/machine";

export default function MachinePage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const load = async () => {
    try {
      setLoadingList(true);
      const list = await getMachines();
      setMachines(list);
    } catch (e) {
      setError("Can't load machines");
    } finally {
      setLoadingList(false);
    }
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setError("");
    setLoadingAdd(true);

    try {
      await createMachine(name);
      setName("");
      await load(); // reload list
    } catch (e) {
      setError("Failed to create machine");
    } finally {
      setLoadingAdd(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">Machines</h1>

      {/* FORM */}
      <form
        onSubmit={add}
        className="bg-white p-4 border border-gray-300 rounded mb-6"
      >
        <h2 className="text-lg font-semibold mb-4">Add Machine</h2>

        <div className="grid gap-3">
          <input
            className="border border-gray-300 p-2 rounded"
            placeholder="Machine name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-gray-700 text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
            disabled={loadingAdd}
          >
            {loadingAdd ? "Adding..." : "Add Machine"}
          </button>
        </div>
      </form>

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
            </li>
          ))}
        </ul>
      )}

      {/* ERROR (bottom) */}
      {error && (
        <div className="mt-8 flex items-center gap-2 text-gray-400">
          <span className="text-xl">⚠</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
