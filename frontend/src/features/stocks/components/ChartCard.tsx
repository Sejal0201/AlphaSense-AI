import { useState } from "react";

import CandlestickChart from "./CandlestickChart";
import TimeframeSelector from "./TimeframeSelector";
import SearchBar from "./SearchBar";
import LiveQuotePanel from "./LiveQuotePanel";
import { useCandlestick } from "../hooks/useCandlestick";
import IndicatorSelector from "../../indicators/components/IndicatorSelector";

import { useStock } from "../../../context/StockContext";
import {
  calculateSMA,
  calculateEMA,
  calculateBollingerBands,
  calculateRSI,
  calculateMACD,
} from "../../indicators/utils/indicators";
import RSIChart from "../../indicators/components/RSIChart";
import MACDChart from "../../indicators/components/MACDChart";

export default function ChartCard() {
  // const [symbol, setSymbol] = useState("AAPL");
  const [period, setPeriod] = useState("1mo");
  const { symbol, setSymbol } = useStock();
  const { candles, isLoading, isError } = useCandlestick(symbol, period);
  const [indicators, setIndicators] = useState({
    sma20: true,
    sma50: false,
    ema20: false,
    bollinger: false,
    rsi: false,
    macd: false,
  });
  const rsi = indicators.rsi ? calculateRSI(candles) : [];

  const macd = indicators.macd ? calculateMACD(candles) : [];
  // const { candles, isLoading, isError } = useCandlestick(symbol, period);
  const sma20 = indicators.sma20 ? calculateSMA(candles, 20) : [];
  const ema20 = indicators.ema20 ? calculateEMA(candles, 20) : [];
  const sma50 = indicators.sma50 ? calculateSMA(candles, 50) : [];
  const bollinger = indicators.bollinger
    ? calculateBollingerBands(candles)
    : {
        upper: [],
        middle: [],
        lower: [],
      };
  const toggleIndicator = (name: string) => {
    setIndicators((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        Loading Chart...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-600 bg-zinc-900 p-8 text-red-400">
        Failed to load chart.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-2xl font-bold">{symbol}</h2>

      <SearchBar onSelect={setSymbol} />

      <div className="mt-4">
        <TimeframeSelector selected={period} onChange={setPeriod} />
      </div>

      <IndicatorSelector indicators={indicators} onToggle={toggleIndicator} />

      {/* <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <CandlestickChart data={candles} />
        </div>

        <LiveQuotePanel symbol={symbol} />
      </div> */}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <CandlestickChart
          data={candles}
          sma20={sma20}
          sma50={sma50}
          ema20={ema20}
          bollinger={bollinger}
        />
        
        <LiveQuotePanel symbol={symbol} />
      </div>
      {indicators.rsi && <RSIChart data={rsi} />}

      {indicators.macd && <MACDChart data={macd} />}
    </div>
  );
}
