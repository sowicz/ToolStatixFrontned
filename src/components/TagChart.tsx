// components/TagChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { TagSeries } from "../types/tagDataTypes";

interface Props {
  label: string;
  series: TagSeries;
}

export default function TagChart({ label, series }: Props) {
  const data = series.avg.map((_, i) => ({
    index: i + 1,
    min: series.min[i],
    avg: series.avg[i],
    max: series.max[i],
    work_time: series.work_time[i],
  }));

  return (
    <div className="h-64 w-full">
      <h3 className="font-semibold mb-2">{label}</h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="min" stroke="#2563eb" />
          <Line type="monotone" dataKey="avg" stroke="#16a34a" />
          <Line type="monotone" dataKey="max" stroke="#dc2626" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
