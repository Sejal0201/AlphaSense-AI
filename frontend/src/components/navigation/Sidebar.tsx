import {
  LayoutDashboard,
  LineChart,
  Briefcase,
  Bell,
  BrainCircuit,
  Settings,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: LineChart, label: "Stocks" },
  { icon: Briefcase, label: "Portfolio" },
  { icon: Bell, label: "Watchlist" },
  { icon: BrainCircuit, label: "AI Assistant" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
      <div className="h-16 flex items-center px-6 text-2xl font-bold text-white">
        AlphaSense
      </div>

      <nav className="flex-1 p-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}