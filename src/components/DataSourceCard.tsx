import { useState } from "react";
import type { DataSourceStatus } from "../types/dashboard";
import TagStatus from "./TagStatus";
import {
  connectDataSource,
  disconnectDataSource,
} from "../api/opcua";

interface Props {
  data: DataSourceStatus;
}

export default function DataSourceCard({ data }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    try {
      await connectDataSource(data.data_source_id);
    } catch (err) {
      console.error("Connect failed", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDisconnect() {
    setLoading(true);
    try {
      await disconnectDataSource(data.data_source_id);
    } catch (err) {
      console.error("Disconnect failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">
            {data.machine.name}
          </h2>

          <p className="text-xs text-gray-400">
            Data source ID: {data.data_source_id}
          </p>
        </div>

        <span
          className={`text-sm font-medium ${
            data.connected ? "text-green-600" : "text-red-600"
          }`}
        >
          ● {data.connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Server */}
      <p className="text-xs text-gray-500 mt-2 break-all">
        {data.server_url}
      </p>

      {/* Tags */}
      <div className="mt-4 space-y-2 flex-1">
        {data.main_tags.map(tag => (
          <TagStatus key={tag.tag_id} tag={tag} />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        {!data.connected ? (
          <button
            onClick={handleConnect}
            disabled={loading}
            className="flex-1 px-3 py-1.5 rounded bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50"
          >
            Connect
          </button>
        ) : (
          <button
            onClick={handleDisconnect}
            disabled={loading}
            className="flex-1 px-3 py-1.5 rounded bg-gray-600 text-white text-sm hover:bg-gray-800 disabled:opacity-50"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}
