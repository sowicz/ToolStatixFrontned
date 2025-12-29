import { useState } from "react";
import type { DataSourceStatus } from "../types/dashboard";
import TagStatus from "./TagStatus";
import {
  connectDataSource,
  disconnectDataSource,
  startSubscription,
  stopSubscription,
} from "../api/opcua";

interface Props {
  data: DataSourceStatus;
  onRefresh: () => void;
}

export default function DataSourceCard({ data, onRefresh  }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    try {
      await connectDataSource(data.data_source_id);
      await onRefresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleDisconnect() {
    setLoading(true);
    try {
      await disconnectDataSource(data.data_source_id);
      await onRefresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleStartSubscription(tagId: number) {
    setLoading(true);
    try {
      await startSubscription(tagId);
      await onRefresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleStopSubscription(tagId: number) {
    setLoading(true);
    try {
      await stopSubscription(tagId);
      await onRefresh();
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
      <p className="text-xs text-gray-500 mt-4 break-all">
        {data.server_url}
      </p>

        {/* Tags */}
        <div className="mt-4 space-y-3 flex-1">
        {data.main_tags.map(tag => (
            <div
            key={tag.tag_id}
            className="flex items-center gap-4"
            >
            <div className="flex-1">
                <TagStatus tag={tag} />
            </div>

            {!tag.active ? (
                <button
                onClick={() => handleStartSubscription(tag.tag_id)}
                className="px-4 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                Start
                </button>
            ) : (
                <button
                onClick={() => handleStopSubscription(tag.tag_id)}
                className="px-4 py-1 text-xs rounded bg-rose-900 text-white hover:bg-rose-700"
                >
                Stop
                </button>
            )}
            </div>
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
