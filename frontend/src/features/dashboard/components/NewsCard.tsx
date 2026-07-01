import {
  Newspaper,
  ArrowUpRight,
  Clock,
} from "lucide-react";

const news = [
  {
    title:
      "Apple shares climb after AI expansion announcement",
    source: "Reuters",
    time: "15 min ago",
  },
  {
    title:
      "Wall Street opens higher amid tech rally",
    source: "Bloomberg",
    time: "42 min ago",
  },
  {
    title:
      "Morgan Stanley raises Apple price target",
    source: "CNBC",
    time: "1 hour ago",
  },
  {
    title:
      "NASDAQ continues strong momentum this week",
    source: "Yahoo Finance",
    time: "2 hours ago",
  },
];

export default function NewsCard() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center gap-3">

        <Newspaper className="text-blue-500" size={26} />

        <h2 className="text-2xl font-bold">
          Market News
        </h2>

      </div>

      <div className="space-y-4">

        {news.map((article, index) => (

          <div
            key={index}
            className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-blue-500"
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <h3 className="font-semibold leading-6 group-hover:text-blue-400">
                  {article.title}
                </h3>

                <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500">

                  <span>
                    {article.source}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {article.time}
                  </span>

                </div>

              </div>

              <ArrowUpRight
                size={18}
                className="text-zinc-500 group-hover:text-blue-500"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}