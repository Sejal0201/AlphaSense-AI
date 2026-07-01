import { Plus } from "lucide-react";
import { useState } from "react";

import WatchlistItem from "./WatchlistItem";
import { useWatchlist } from "../hooks/useWatchlist";
import { useStock } from "../../../context/StockContext";

export default function WatchlistCard() {
  const { watchlist, addStock, removeStock } = useWatchlist();
  const { setSymbol } = useStock();

  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;

    addStock(input);
    setInput("");
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
     
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">⭐ Watchlist</h2>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="Ticker"
            className="w-24 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <button
            onClick={handleAdd}
            className="rounded-xl bg-blue-600 p-2 transition hover:bg-blue-500"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* List */}

      <div className="space-y-3">
        {watchlist.map((symbol) => (
          <WatchlistItem
            key={symbol}
            symbol={symbol}
            onSelect={setSymbol}
            onRemove={removeStock}
          />
        ))}
      </div>
    </div>
  );
}
