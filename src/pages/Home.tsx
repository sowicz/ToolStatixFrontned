import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  // Fake statuses
  const [dbStatus] = useState("Connected");
  const [dataSourceStatus] = useState("Connected");

  const [machines] = useState(12);
  const [activeTags] = useState(5);

  // Fake chart data
  const [powerData, setPowerData] = useState<number[]>([]);

  useEffect(() => {
    // generate fake random "power" values
    const values = Array.from({ length: 12 }, () =>
      Math.round(10 + Math.random() * 20)
    );
    setPowerData(values);
  }, []);

  const chartData = {
    labels: powerData.map((_, i) => `T${i + 1}`),
    datasets: [
      {
        label: "Power (A)",
        data: powerData,
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 font-sans">

      {/* ===== FIRST CARD ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded p-6 space-y-3">
          <h2 className="text-lg font-semibold">System Status</h2>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">DB connection status</span>
            <span
              className={
                dbStatus === "Connected"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {dbStatus}
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-gray-600">Data source connection status</span>
            <span
              className={
                dataSourceStatus === "Connected"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {dataSourceStatus}
            </span>
          </div>
        </div>

        {/* ===== SECOND CARD ===== */}
        <div className="bg-white border rounded p-6 space-y-3">
          <h2 className="text-lg font-semibold">Overview</h2>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Machines (quantity)</span>
            <span className="font-semibold">{machines}</span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-gray-600">Active tags (quantity)</span>
            <span className="font-semibold">{activeTags}</span>
          </div>
        </div>
      </div>

      {/* ===== THIRD CARD — CHART ===== */}
      <div className="bg-white border rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Power Parameters</h2>

        <div className="h-48">  {/* wysokość całej karty + wykresu */}
          <Line
            data={chartData}
            height={150}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: true } },
            }}
          />
        </div>
      </div>
    </div>
  );
}
