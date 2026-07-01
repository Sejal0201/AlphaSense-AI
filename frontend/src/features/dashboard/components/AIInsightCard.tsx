// import { Sparkles } from "lucide-react";

// import { useAIInsight } from "../../../hooks/useAi";

// export default function AIInsightCard() {
//   const { data, isLoading } =
//     useAIInsight("AAPL");

//   if (isLoading) {
//     return (
//       <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8">
//         Loading AI Insight...
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">

//       <Sparkles
//         size={34}
//         className="mb-8"
//       />

//       <h2 className="text-4xl font-bold">
//         AI Insight
//       </h2>

//       <div className="mt-8 space-y-4">

//         <p>
//           <span className="font-semibold">
//             Recommendation:
//           </span>{" "}
//           {data.recommendation}
//         </p>

//         <p>
//           <span className="font-semibold">
//             Sentiment:
//           </span>{" "}
//           {data.sentiment}
//         </p>

//         <p>
//           <span className="font-semibold">
//             Confidence:
//           </span>{" "}
//           {data.confidence}%
//         </p>

//         <p className="leading-7">
//           {data.summary}
//         </p>

//       </div>
//     </div>
//   );
// }

import { Sparkles, TrendingUp, TrendingDown, MinusCircle } from "lucide-react";
import { useAIInsight } from "../../../hooks/useAi";
import { useStock } from "../../../context/StockContext";

export default function AIInsightCard() {
  const { symbol } = useStock();
  const { data, isLoading, isError } = useAIInsight(symbol);

  if (isLoading) {
    return (
      <div className="w-full rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
        <h2 className="text-3xl font-bold"> {symbol}AI Insight</h2>
        <p className="mt-6 animate-pulse">Analyzing market...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl bg-red-600 p-8 text-white">
        Failed to load AI Insight.
      </div>
    );
  }

  // const recommendationColor =
  //   data.recommendation === "BUY"
  //     ? "bg-green-500"
  //     : data.recommendation === "SELL"
  //     ? "bg-red-500"
  //     : "bg-yellow-500";
  const recommendation = data.recommendation ?? "HOLD";

  const recommendationColor =
    recommendation === "BUY"
      ? "bg-green-500"
      : recommendation === "SELL"
        ? "bg-red-500"
        : "bg-yellow-500";

  // const Icon =
  //   data.sentiment === "Bullish"
  //     ? TrendingUp
  //     : data.sentiment === "Bearish"
  //       ? TrendingDown
  //       : MinusCircle;
  const sentiment = data.sentiment ?? "Neutral";

  const Icon =
    sentiment === "Bullish"
      ? TrendingUp
      : sentiment === "Bearish"
        ? TrendingDown
        : MinusCircle;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <Sparkles size={34} />

        <span
          className={`rounded-full px-4 py-2 text-sm font-bold ${recommendationColor}`}
        >
          {data.recommendation}
        </span>
      </div>

      <h2 className="mt-6 text-4xl font-bold">{symbol} AI Insight</h2>

      <div className="mt-8 flex items-center gap-3">
        <Icon size={28} />

        <span className="text-xl font-semibold">{data.sentiment}</span>
      </div>

      <div className="mt-8">
        <p className="text-sm opacity-80">Confidence</p>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-green-400 transition-all duration-700"
            style={{
             width: `${Number(data.confidence ?? 0)}%`,
            }}
          />
        </div>

        <p className="mt-2 text-lg font-bold">{Number(data.confidence ?? 0)}%</p>
      </div>

      <p className="mt-8 leading-7 text-white/90">{data.summary ?? "No AI summary available."}</p>

      <div className="mt-8">
        <p className="mb-3 font-semibold">Key Reasons</p>

        <ul className="space-y-2 text-sm">
          {(data.reasons ?? []).map((reason: string, index: number) => (
            <li key={index}>• {reason}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="font-semibold">Risk</span>

        <span
          className={`rounded-full px-4 py-1 text-sm font-bold ${
            data.risk === "Low"
              ? "bg-green-500"
              : data.risk === "Medium"
                ? "bg-yellow-500"
                : "bg-red-500"
          }`}
        >
          {data.risk}
        </span>
      </div>
    </div>
  );
}
