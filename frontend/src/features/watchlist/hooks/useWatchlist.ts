import { useState } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([
    "AAPL",
    "MSFT",
    "NVDA",
    "TSLA",
  ]);

  const addStock = (symbol: string) => {
    if (!watchlist.includes(symbol.toUpperCase())) {
      setWatchlist((prev) => [
        ...prev,
        symbol.toUpperCase(),
      ]);
    }
  };

  const removeStock = (symbol: string) => {
    setWatchlist((prev) =>
      prev.filter((item) => item !== symbol)
    );
  };

  return {
    watchlist,
    addStock,
    removeStock,
  };
}