// import AIInsightCard from "../components/AIInsightCard";
// import MarketOverview from "../components/MarketOverview";
// import NewsCard from "../components/NewsCard";
// import PortfolioCard from "../components/PortfolioCard";
// import WatchlistCard from "../components/WatchlistCard";

// export default function DashboardPage() {
//   return (
//     <div className="space-y-8">

//       <h1 className="text-5xl font-bold">
//         Dashboard
//       </h1>

//       <MarketOverview />

//       <div className="grid gap-6 xl:grid-cols-3">

//         <div className="xl:col-span-2">
//           <PortfolioCard />
//         </div>

//         <AIInsightCard />

//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">

//         <WatchlistCard />

//         <NewsCard />

//       </div>

//     </div>
//   );
// }

// NEWWWWWWWWWWW CODDDDDDDDDDDDEEEEEEEEEEEEEEEEEEEE

// import DashboardLayout from "@/app/layouts/DashboardLayout";

// import LiveQuoteCard from "../components/LiveQuoteCard";
// import QuoteSkeleton from "../components/QuoteSkeleton";

// import { useDashboard } from "../hooks/useDashboard";

// export default function DashboardPage() {
//   const {
//     apple,
//     microsoft,
//     tesla,
//     nvidia,
//   } = useDashboard();

//   return (
//     <DashboardLayout>

//       <h1 className="text-4xl font-bold mb-8">
//         Dashboard
//       </h1>

//       <div className="grid grid-cols-4 gap-6">

//         {apple.isLoading ? (
//           <QuoteSkeleton />
//         ) : (
//           <LiveQuoteCard
//             symbol="AAPL"
//             price={apple.data?.current_price ?? 0}
//             change={apple.data?.percent_change ?? 0}
//           />
//         )}

//         {microsoft.isLoading ? (
//           <QuoteSkeleton />
//         ) : (
//           <LiveQuoteCard
//             symbol="MSFT"
//             price={microsoft.data?.current_price ?? 0}
//             change={microsoft.data?.percent_change ?? 0}
//           />
//         )}

//         {nvidia.isLoading ? (
//           <QuoteSkeleton />
//         ) : (
//           <LiveQuoteCard
//             symbol="NVDA"
//             price={nvidia.data?.current_price ?? 0}
//             change={nvidia.data?.percent_change ?? 0}
//           />
//         )}

//         {tesla.isLoading ? (
//           <QuoteSkeleton />
//         ) : (
//           <LiveQuoteCard
//             symbol="TSLA"
//             price={tesla.data?.current_price ?? 0}
//             change={tesla.data?.percent_change ?? 0}
//           />
//         )}

//       </div>

//     </DashboardLayout>
//   );
// }

import AIInsightCard from "../components/AIInsightCard";
import MarketOverview from "../components/MarketOverview";
import NewsCard from "../components/NewsCard";
// import PortfolioCard from "../components/PortfolioCard";
// import WatchlistCard from "../components/WatchlistCard";
import ChartCard from "../../stocks/components/ChartCard";
import CompanyProfileCard from "../components/CompanyProfileCard";
import { useStock } from "../../../context/StockContext";
import WatchlistCard from "../../watchlist/components/WatchlistCard";

export default function DashboardPage() {
  const { symbol } = useStock();
  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-bold">Dashboard</h1>

      <MarketOverview />

      <ChartCard />
      <CompanyProfileCard symbol={symbol} />
      <AIInsightCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <WatchlistCard />

        <NewsCard />
      </div>
    </div>
  );
}
