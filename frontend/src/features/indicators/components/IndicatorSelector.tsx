interface Props {
  indicators: {
    sma20: boolean;
    sma50: boolean;
    ema20: boolean;
    bollinger: boolean;
    rsi: boolean;
    macd: boolean;
  };

  onToggle: (name: string) => void;
}

const options = [
  { key: "sma20", label: "SMA 20" },
  { key: "sma50", label: "SMA 50" },
  { key: "ema20", label: "EMA 20" },
  { key: "bollinger", label: "Bollinger" },
  { key: "rsi", label: "RSI" },
  { key: "macd", label: "MACD" },
];

export default function IndicatorSelector({
  indicators,
  onToggle,
}: Props) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">

      {options.map((option) => (

        <button
          key={option.key}
          onClick={() => onToggle(option.key)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
            indicators[
              option.key as keyof typeof indicators
            ]
              ? "bg-blue-600 text-white"
              : "border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-blue-500"
          }`}
        >
          {option.label}
        </button>

      ))}

    </div>
  );
}