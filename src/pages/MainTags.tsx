import { useEffect, useState } from "react";
import {
  getMainTags,
  addMainTag,
  type MainTagCreate,
  type MainTagRead,
} from "../api/MainTags";


export default function MainTags() {
  const [tags, setTags] = useState<MainTagRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState<MainTagCreate>({
    name: "",
  });

  // LOAD TAGS
  const load = async () => {
    try {
      setLoading(true);
      const data = await getMainTags();
      setTags(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // ADD TAG
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await addMainTag(form);
      setForm({ name: "" });
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">Main Tags</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded mb-6"
      >
        <h2 className="text-lg font-semibold mb-4">Add Main Tag</h2>

        <div className="grid gap-3">
          <input
            className="border border-gray-300 p-2 rounded"
            placeholder="Tag name"
            value={form.name}
            onChange={(e) => setForm({ name: e.target.value })}
            required
          />

          <button
            type="submit"
            className="bg-gray-700 text-white p-2 rounded hover:bg-gray-800"
          >
            Add Tag
          </button>
        </div>
      </form>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : tags.length === 0 ? (
        <p className="text-gray-500">No tags yet.</p>
      ) : (
        <ul className="space-y-3">
          {tags.map((t) => (
            <li
              key={t.id}
              className="p-4 bg-white border border-gray-300 rounded"
            >
              <div className="font-semibold">{t.name}</div>
            </li>
          ))}
        </ul>
      )}

      {/* ERROR POD SPODem */}
      {error && (
        <div className="mt-8 flex items-center gap-2 text-gray-400">
          <span className="text-xl">⚠</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
