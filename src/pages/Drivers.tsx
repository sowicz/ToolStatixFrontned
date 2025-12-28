import { useState } from "react";
import {
  connectDataSource,
  disconnectDataSource,
  startSubscription,
  stopSubscription,
  getTagStatus,
  getActiveTags,
} from "../api/opcua";

export default function Drivers() {
  const [selected, setSelected] = useState("");
  const [dataSourceId, setDataSourceId] = useState("");
  const [tagId, setTagId] = useState("");

  const [response, setResponse] = useState("");

  async function handle(fn: () => Promise<any>) {
    try {
      const res = await fn();
      setResponse(JSON.stringify(res, null, 2));
    } catch (e: any) {
      setResponse(e.message);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans space-y-6">
      <h1 className="text-2xl font-bold">Drivers</h1>

      {/* Driver dropdown */}
      <div className="space-y-2">
        <label className="font-medium">Driver</label>
        <select
          className="border p-3 rounded w-full bg-white"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">-- Select driver --</option>
          <option value="opcua">OPC-UA</option>
        </select>
      </div>

      {/* OPC-UA panel */}
      {selected === "opcua" && (
        <div className="border rounded p-6 bg-white space-y-5">
          <h2 className="text-xl font-semibold">OPC-UA Driver</h2>

          {/* Inputs */}
          <div className="space-y-3">
            <input
              className="border p-3 rounded w-full"
              placeholder="DataSource ID"
              value={dataSourceId}
              onChange={(e) => setDataSourceId(e.target.value)}
            />

            <input
              className="border p-3 rounded w-full"
              placeholder="Tag ID"
              value={tagId}
              onChange={(e) => setTagId(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handle(() => connectDataSource(Number(dataSourceId)))}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded"
            >
              Connect
            </button>

            <button
              onClick={() =>
                handle(() => disconnectDataSource(Number(dataSourceId)))
              }
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded"
            >
              Disconnect
            </button>

            <button
              onClick={() => handle(() => startSubscription(Number(tagId)))}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded"
            >
              Start Subscription
            </button>

            <button
              onClick={() => handle(() => stopSubscription(Number(tagId)))}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded"
            >
              Stop Subscription
            </button>

            <button
              onClick={() => handle(() => getTagStatus(Number(tagId)))}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded"
            >
              Status
            </button>

            <button
              onClick={() => handle(() => getActiveTags())}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded"
            >
              Active Tags
            </button>
          </div>

          {/* Response always at the bottom */}
          {response && (
            <pre className="text-sm text-gray-600 mt-4 bg-gray-50 p-4 rounded border overflow-auto">
              {response}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
