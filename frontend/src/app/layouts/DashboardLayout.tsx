import type { ReactNode } from "react";

import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/navigation/Header";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="h-screen flex bg-zinc-950">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}