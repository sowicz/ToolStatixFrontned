import { useEffect, useState } from "react";
import {
  getRelatedTags,
  addRelatedTag,
  type RelatedTag,
} from "../api/relatedTags";

export default function RelatedTags() {
  const [tags, setTags] = useState<RelatedTag[]>([]);
  const [name, setName] = useState("");
  const [mainTagId, setMainTagId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTags();
  }, []);

  async function loadTags() {
    try {
      setLoading(true);
      const data = await getRelatedTags();
      setTags(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!name.trim() || !mainTagId.trim()) {
      setError("Required fields are missing");
      return;
    }

    try {
      setError("");
      const newTag = await addRelatedTag({
        name,
        main_tag_id: Number(mainTagId),
      });

      setTags((prev) => [...prev, newTag]);
      setName("");
      setMainTagId("");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Related Tags</h1>

      {/* Add related tag */}
      <div className="border rounded border-gray-300 p-4 mb-6 bg-white">
        <h3 className="text-lg font-semibold mb-2">Add Related Tag</h3>

        <input
          className="border rounded p-2 w-full mb-3"
          placeholder="Related tag name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded p-2 w-full mb-3"
          placeholder="MainTag ID"
          value={mainTagId}
          onChange={(e) => setMainTagId(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          Add Related Tag
        </button>
      </div>

      {/* Related tags list */}
        <h3 className="text-lg font-semibold mb-3">Current Related Tags</h3>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : tags.length === 0 ? (
          <p className="text-gray-500">No related tags yet.</p>
        ) : (
          <ul className="space-y-3">
            {tags.map((tag) => (
              <li key={tag.id} className="border p-2 rounded bg-gray-50">
                <span className="font-bold">{tag.name}</span>{" "}
                <span className="text-gray-500">
                  (MainTag ID: {tag.main_tag_id})
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* error ALWAYS on bottom */}
        {error && (
          <p className="text-gray-500 mt-4 text-sm text-center">{error}</p>
        )}
      </div>
  );
}
