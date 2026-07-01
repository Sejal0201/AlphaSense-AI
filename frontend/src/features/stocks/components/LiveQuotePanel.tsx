// import { useQuote } from "../../../hooks/useStocks";

// interface Props {
//   symbol: string;
// }

// export default function LiveQuotePanel({
//   symbol,
// }: Props) {
//   const { data, isLoading, isError } = useQuote(symbol);

//   if (isLoading) {
//     return (
//       <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
//         Loading quote...
//       </div>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <div className="rounded-2xl border border-red-700 bg-zinc-900 p-6 text-red-400">
//         Failed to load quote.
//       </div>
//     );
//   }

//   const positive = data.percent_change >= 0;

//   return (
//     <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
//       <h2 className="mb-6 text-2xl font-bold">
//         {symbol}
//       </h2>

//       <div className="mb-6">
//         <p className="text-4xl font-bold">
//           ${data.current_price.toFixed(2)}
//         </p>

//         <p
//           className={`mt-2 text-lg font-semibold ${
//             positive
//               ? "text-green-400"
//               : "text-red-400"
//           }`}
//         >
//           {positive ? "+" : ""}
//           {data.percent_change.toFixed(2)}%
//         </p>
//       </div>

//       <div className="grid grid-cols-2 gap-4 text-sm">

//         <Metric
//           label="Open"
//           value={data.open}
//         />

//         <Metric
//           label="High"
//           value={data.high}
//         />

//         <Metric
//           label="Low"
//           value={data.low}
//         />

//         <Metric
//           label="Prev Close"
//           value={data.previous_close}
//         />

//       </div>
//     </div>
//   );
// }

// function Metric({
//   label,
//   value,
// }: {
//   label: string;
//   value: number;
// }) {
//   return (
//     <div className="rounded-xl bg-zinc-800 p-3">
//       <p className="text-zinc-400">
//         {label}
//       </p>

//       <p className="mt-1 font-semibold">
//         ${value.toFixed(2)}
//       </p>
//     </div>
//   );
// }


//  NEWW CODE 
// import { TrendingUp, TrendingDown, Activity } from "lucide-react";
// import { useQuote } from "../../../hooks/useStocks";

// interface Props {
//   symbol: string;
// }

// export default function LiveQuotePanel({
//   symbol,
// }: Props) {
//   const { data, isLoading, isError } = useQuote(symbol);

//   if (isLoading) {
//     return (
//       <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
//         Loading quote...
//       </div>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <div className="rounded-3xl border border-red-700 bg-zinc-900 p-6 text-red-400">
//         Failed to load quote.
//       </div>
//     );
//   }

//   const positive = data.percent_change >= 0;

//   return (
//     <div className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

//       {/* Header */}

//       <div className="flex items-center justify-between">

//         <div>
//           <p className="text-sm uppercase tracking-widest text-zinc-500">
//             Live Quote
//           </p>

//           <h2 className="mt-1 text-3xl font-bold">
//             {symbol}
//           </h2>
//         </div>

//         <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs text-green-400">
//           <Activity size={14} />
//           LIVE
//         </div>

//       </div>

//       {/* Price */}

//       <div className="mt-8">

//         <h1 className="text-5xl font-bold tracking-tight">
//           ${data.current_price.toFixed(2)}
//         </h1>

//         <div
//           className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
//             positive
//               ? "bg-green-500/10 text-green-400"
//               : "bg-red-500/10 text-red-400"
//           }`}
//         >
//           {positive ? (
//             <TrendingUp size={16} />
//           ) : (
//             <TrendingDown size={16} />
//           )}

//           {positive ? "+" : ""}
//           {data.percent_change.toFixed(2)}%
//         </div>

//       </div>

//       {/* Metrics */}

//       <div className="mt-8 grid grid-cols-2 gap-4">

//         <Metric
//           label="Open"
//           value={data.open}
//         />

//         <Metric
//           label="High"
//           value={data.high}
//         />

//         <Metric
//           label="Low"
//           value={data.low}
//         />

//         <Metric
//           label="Prev Close"
//           value={data.previous_close}
//         />

//       </div>

//     </div>
//   );
// }

// function Metric({
//   label,
//   value,
// }: {
//   label: string;
//   value: number;
// }) {
//   return (
//     <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-blue-500">

//       <p className="text-xs uppercase tracking-wide text-zinc-500">
//         {label}
//       </p>

//       <p className="mt-2 text-xl font-bold">
//         ${value.toFixed(2)}
//       </p>

//     </div>
//   );
// }

// import {
//   TrendingUp,
//   TrendingDown,
//   Activity,
// } from "lucide-react";
// import { useQuote } from "../../../hooks/useStocks";

// interface Props {
//   symbol: string;
// }

// export default function LiveQuotePanel({
//   symbol,
// }: Props) {
//   // const { symbol } = useStock();
//   const { data, isLoading, isError } = useQuote(symbol);

//   if (isLoading) {
//     return (
//       <div className="flex h-full items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
//         Loading Quote...
//       </div>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <div className="flex h-full items-center justify-center rounded-3xl border border-red-700 bg-zinc-900 p-6 text-red-400">
//         Failed to load quote.
//       </div>
//     );
//   }

//   const positive = data.percent_change >= 0;
//   const priceChange =
//     data.current_price - data.previous_close;

//   return (
//     <div className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-7">

//       {/* Header */}

//       <div className="flex items-center justify-between">

//         <div>
//           <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
//             Live Quote
//           </p>

//           <h2 className="mt-2 text-4xl font-bold">
//             {symbol}
//           </h2>
//         </div>

//         <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-green-400">
//           <Activity className="h-3 w-3" />
//           LIVE
//         </div>

//       </div>

//       {/* Price */}

//       <div className="mt-10">

//         <h1 className="text-6xl font-black tracking-tight">
//           ${data.current_price.toFixed(2)}
//         </h1>

//         <div
//           className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-base font-bold ${
//             positive
//               ? "bg-green-500/10 text-green-400"
//               : "bg-red-500/10 text-red-400"
//           }`}
//         >
//           {positive ? (
//             <TrendingUp size={18} />
//           ) : (
//             <TrendingDown size={18} />
//           )}

//           {positive ? "+" : ""}
//           ${priceChange.toFixed(2)}

//           <span>
//             ({positive ? "+" : ""}
//             {data.percent_change.toFixed(2)}%)
//           </span>
//         </div>

//       </div>

//       <div className="my-8 border-t border-zinc-800" />

//       {/* Metrics */}

//       <div className="grid grid-cols-2 gap-4">

//         <Metric
//           label="Open"
//           value={data.open}
//         />

//         <Metric
//           label="High"
//           value={data.high}
//         />

//         <Metric
//           label="Low"
//           value={data.low}
//         />

//         <Metric
//           label="Prev Close"
//           value={data.previous_close}
//         />

//       </div>

//     </div>
//   );
// }

// function Metric({
//   label,
//   value,
// }: {
//   label: string;
//   value: number;
// }) {
//   return (
//     <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-200 hover:border-blue-500 hover:bg-zinc-800">

//       <p className="text-xs uppercase tracking-wider text-zinc-500">
//         {label}
//       </p>

//       <p className="mt-3 text-2xl font-bold">
//         ${value.toFixed(2)}
//       </p>

//     </div>
//   );
// }

import {
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import { useQuote } from "../../../hooks/useStocks";

interface Props {
  symbol: string;
}

export default function LiveQuotePanel({
  symbol,
}: Props) {
  const { data, isLoading, isError } = useQuote(symbol);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        Loading Quote...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-red-700 bg-zinc-900 p-6 text-red-400">
        Failed to load quote.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-yellow-700 bg-zinc-900 p-6 text-yellow-400">
        No quote data available.
      </div>
    );
  }

  // Safe numeric values
  const currentPrice = Number(data.current_price ?? 0);
  const previousClose = Number(data.previous_close ?? 0);
  const open = Number(data.open ?? 0);
  const high = Number(data.high ?? 0);
  const low = Number(data.low ?? 0);
  const percentChange = Number(data.percent_change ?? 0);

  const positive = percentChange >= 0;
  const priceChange = currentPrice - previousClose;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-7">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Live Quote
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {symbol}
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-green-400">
          <Activity className="h-3 w-3" />
          LIVE
        </div>
      </div>

      {/* Price */}
      <div className="mt-10">
        <h1 className="text-6xl font-black tracking-tight">
          ${currentPrice.toFixed(2)}
        </h1>

        <div
          className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-base font-bold ${
            positive
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {positive ? (
            <TrendingUp size={18} />
          ) : (
            <TrendingDown size={18} />
          )}

          {positive ? "+" : ""}
          ${priceChange.toFixed(2)}

          <span>
            ({positive ? "+" : ""}
            {percentChange.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="my-8 border-t border-zinc-800" />

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Metric label="Open" value={open} />
        <Metric label="High" value={high} />
        <Metric label="Low" value={low} />
        <Metric label="Prev Close" value={previousClose} />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-200 hover:border-blue-500 hover:bg-zinc-800">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-3 text-2xl font-bold">
        ${Number(value ?? 0).toFixed(2)}
      </p>
    </div>
  );
}