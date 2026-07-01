// import { X } from "lucide-react";
// import { useQuote } from "../../../hooks/useStocks";

// interface Props {
//   symbol: string;
//   onSelect: (symbol: string) => void;
//   onRemove: (symbol: string) => void;
// }

// export default function WatchlistItem({
//   symbol,
//   onSelect,
//   onRemove,
// }: Props) {
//   const { data, isLoading } = useQuote(symbol);

//   if (isLoading || !data) {
//     return (
//       <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
//         Loading...
//       </div>
//     );
//   }

//   const positive = data.percent_change >= 0;

//   return (
//     <div
//       onClick={() => onSelect(symbol)}
//       className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-blue-500 hover:bg-zinc-900"
//     >
//       <div>

//         <h3 className="font-bold">
//           {symbol}
//         </h3>

//         <p className="mt-1 text-sm text-zinc-400">
//           ${data.current_price.toFixed(2)}
//         </p>

//       </div>

//       <div className="flex items-center gap-3">

//         <span
//           className={`font-semibold ${
//             positive
//               ? "text-green-400"
//               : "text-red-400"
//           }`}
//         >
//           {positive ? "+" : ""}
//           {data.percent_change.toFixed(2)}%
//         </span>

//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onRemove(symbol);
//           }}
//           className="rounded-lg p-1 hover:bg-red-500/20"
//         >
//           <X size={16} />
//         </button>

//       </div>

//     </div>
//   );
// }

import { X } from "lucide-react";
import { useQuote } from "../../../hooks/useStocks";

interface Props {
  symbol: string;
  onSelect: (symbol: string) => void;
  onRemove: (symbol: string) => void;
}

export default function WatchlistItem({ symbol, onSelect, onRemove }: Props) {
  const { data, isLoading, isError, error } = useQuote(symbol);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
        Loading {symbol}...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-600 bg-zinc-950 p-4 text-red-400">
        Error loading {symbol}
        <br />
        {String(error)}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-yellow-600 bg-zinc-950 p-4">
        No data for {symbol}
      </div>
    );
  }

  const currentPrice = Number(data.current_price ?? 0);
  const percentChange = Number(data.percent_change ?? 0);

  const positive = percentChange >= 0;

  return (
    <div
      onClick={() => onSelect(symbol)}
      className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 hover:border-blue-500"
    >
      <div>
        <h3 className="font-bold">{symbol}</h3>
        <p>${currentPrice.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={positive ? "text-green-400" : "text-red-400"}>
          {positive ? "+" : ""}
          {percentChange.toFixed(2)}%
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(symbol);
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
