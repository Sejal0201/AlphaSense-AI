import { Search, Bell, UserCircle2 } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">
      <div className="flex items-center gap-3 bg-zinc-900 rounded-xl px-4 py-2 w-96">
        <Search size={18} className="text-zinc-500" />

        <input
          placeholder="Search stocks..."
          className="bg-transparent outline-none w-full text-white"
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell className="text-zinc-400" />

        <UserCircle2
          size={36}
          className="text-zinc-300"
        />
      </div>
    </header>
  );
}