// interface StatsCardProps {
//   title: string;
//   value: string;
//   change: string;
// }

// export default function StatsCard({
//   title,
//   value,
//   change,
// }: StatsCardProps) {
//   const positive = change.startsWith("+");

//   return (
//     <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-blue-500">
//       <p className="text-sm text-zinc-400">{title}</p>

//       <h2 className="mt-3 text-3xl font-bold">{value}</h2>

//       <p
//         className={`mt-2 text-sm font-semibold ${
//           positive ? "text-green-400" : "text-red-400"
//         }`}
//       >
//         {change}
//       </p>
//     </div>
//   );
// }

interface StatsCardProps {
  title: string;
  value?: number;
  change?: number;
  isLoading?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  isLoading,
}: StatsCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">{title}</p>
        <h2 className="mt-3 text-3xl font-bold">Loading...</h2>
        <p className="mt-2 text-sm text-zinc-400">--</p>
      </div>
    );
  }

  const positive = (change ?? 0) >= 0;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-blue-500">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className="mt-3 text-3xl font-bold">
        ${value?.toFixed(2)}
      </h2>

      <p
        className={`mt-2 text-sm font-semibold ${
          positive ? "text-green-400" : "text-red-400"
        }`}
      >
        {positive ? "+" : ""}
        {change?.toFixed(2)}%
      </p>
    </div>
  );
}