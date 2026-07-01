interface Props {
  symbol: string;
  price: number;
  change: number;
}

export default function LiveQuoteCard({
  symbol,
  price,
  change,
}: Props) {
  const positive = change >= 0;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm hover:border-blue-500 transition-all">
      <p className="text-sm text-zinc-400">
        {symbol}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        ${price.toFixed(2)}
      </h2>

      <p
        className={`mt-2 font-semibold ${
          positive
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {change.toFixed(2)}%
      </p>
    </div>
  );
}