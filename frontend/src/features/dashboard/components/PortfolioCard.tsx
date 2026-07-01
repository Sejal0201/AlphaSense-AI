import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useHistory } from "@/hooks/useStocks";

export default function PortfolioChart() {
  const { data, isLoading, isError } = useHistory("AAPL", "1mo");

  if (isLoading) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
        <p className="text-zinc-400 text-lg">Loading chart...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
        <p className="text-red-400 text-lg">Failed to load chart.</p>
      </div>
    );
  }

  const chartData =
    data?.candles.map((candle) => ({
      date: new Date(candle.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: candle.close,
    })) ?? [];
  return (
    <div className="w-full">
      {/* Time Range Buttons */}
      <div className="mb-6 flex gap-3">
        {["1d", "5d", "1mo", "3mo", "6mo", "1y"].map((period) => (
          <button
            key={period}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm transition hover:bg-blue-600"
          >
            {period.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[420px] rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              tick={{ fill: "#71717a" }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{ fill: "#71717a" }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563EB"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
