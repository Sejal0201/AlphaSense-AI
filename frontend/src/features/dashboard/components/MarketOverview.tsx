import StatsCard from "./StatsCard";
import { useDashboard } from "../hooks/useDashboard";

export default function MarketOverview() {
  const { apple, microsoft, nvidia, tesla } = useDashboard();

  const cards = [
    { title: "Apple", query: apple },
    { title: "Microsoft", query: microsoft },
    { title: "NVIDIA", query: nvidia },
    { title: "Tesla", query: tesla },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ title, query }) => (
        // <StatsCard
        //   key={title}
        //   title={title}
        //   value={
        //     query.isLoading
        //       ? "Loading..."
        //       : `$${query.data?.current_price?.toFixed(2) ?? "--"}`
        //   }
        //   change={
        //     query.isLoading
        //       ? "--"
        //       : `${
        //           (query.data?.percent_change ?? 0) >= 0 ? "+" : ""
        //         }${query.data?.percent_change?.toFixed(2) ?? "--"}%`
        //   }
        // />

        <StatsCard
          key={title}
          title={title}
          value={query.data?.current_price}
          change={query.data?.percent_change}
          isLoading={query.isLoading}
        />
      ))}
    </div>
  );
}
