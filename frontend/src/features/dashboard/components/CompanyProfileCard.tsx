import {
  Building2,
  Globe,
  BriefcaseBusiness,
  Landmark,
} from "lucide-react";

import { useCompanyProfile } from "../../../hooks/useStocks";

interface Props {
  symbol: string;
}

export default function CompanyProfileCard({
  symbol,
}: Props) {
  const {
    data,
    isLoading,
    isError,
  } = useCompanyProfile(symbol);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        Loading company profile...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-600 bg-zinc-900 p-6 text-red-400">
        Failed to load company profile.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-3xl border border-yellow-600 bg-zinc-900 p-6 text-yellow-400">
        No company profile found.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center gap-3">
        <Building2 className="text-blue-500" size={26} />
        <h2 className="text-2xl font-bold">
          Company Profile
        </h2>
      </div>

      <h1 className="text-4xl font-bold">
        {data.company_name ?? "N/A"}
      </h1>

      <p className="mt-2 text-zinc-400">
        {data.symbol ?? "N/A"}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <InfoCard
          icon={<BriefcaseBusiness size={18} />}
          title="Sector"
          value={data.sector ?? "N/A"}
        />

        <InfoCard
          icon={<Landmark size={18} />}
          title="Industry"
          value={data.industry ?? "N/A"}
        />

        <InfoCard
          icon={<Globe size={18} />}
          title="Currency"
          value={data.currency ?? "N/A"}
        />

        <InfoCard
          icon={<Building2 size={18} />}
          title="Market Cap"
          value={`$${formatMarketCap(data.market_cap)}`}
        />

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

      <div className="flex items-center gap-2 text-zinc-400">
        {icon}
        <span className="text-sm">{title}</span>
      </div>

      <p className="mt-3 text-xl font-semibold">
        {value}
      </p>

    </div>
  );
}

function formatMarketCap(value?: number | null) {
  const marketCap = Number(value ?? 0);

  if (marketCap >= 1_000_000_000_000)
    return `${(marketCap / 1_000_000_000_000).toFixed(2)}T`;

  if (marketCap >= 1_000_000_000)
    return `${(marketCap / 1_000_000_000).toFixed(2)}B`;

  if (marketCap >= 1_000_000)
    return `${(marketCap / 1_000_000).toFixed(2)}M`;

  return marketCap.toFixed(2);
}