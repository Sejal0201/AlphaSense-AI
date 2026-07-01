interface Props {
  selected: string;
  onChange: (period: string) => void;
}

const periods = [
  "1d",
  "5d",
  "1mo",
  "3mo",
  "6mo",
  "1y",
];

export default function TimeframeSelector({
  selected,
  onChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            selected === period
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          {period.toUpperCase()}
        </button>
      ))}
    </div>
  );
}