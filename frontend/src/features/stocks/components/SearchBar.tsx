// import { useState } from "react";

// import { useSearchStocks } from "../../../hooks/useStocks";

// interface Props {
//   onSelect: (symbol: string) => void;
// }

// export default function SearchBar({
//   onSelect,
// }: Props) {
//   const [query, setQuery] = useState("");

//   const { data } =
//     useSearchStocks(query);

//   return (
//     <div className="relative">

//       <input
//         type="text"
//         placeholder="Search stocks..."
//         value={query}
//         onChange={(e) =>
//           setQuery(e.target.value)
//         }
//         className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none focus:border-blue-500"
//       />

//       {query.length > 0 &&
//         data &&
//         data.length > 0 && (

//           <div className="absolute mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl">

//             {data.map((stock) => (

//               <button
//                 key={stock.symbol}
//                 onClick={() => {
//                   onSelect(stock.symbol);
//                   setQuery("");
//                 }}
//                 className="flex w-full justify-between p-4 hover:bg-zinc-800"
//               >

//                 <span>

//                   {stock.company_name}

//                 </span>

//                 <span className="text-zinc-400">

//                   {stock.symbol}

//                 </span>

//               </button>

//             ))}

//           </div>

//         )}

//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";

import { useSearchStocks } from "../../../hooks/useStocks";

interface Props {
  onSelect: (symbol: string) => void;
}

export default function SearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useSearchStocks(query);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
    >
      <input
        type="text"
        placeholder="Search Apple, Tesla, Microsoft..."
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      />

      {open && query.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          {isLoading && (
            <div className="p-4 text-center text-zinc-400">
              Searching...
            </div>
          )}

          {!isLoading && data?.length === 0 && (
            <div className="p-4 text-center text-zinc-500">
              No stocks found
            </div>
          )}

          {!isLoading &&
            data?.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => {
                  onSelect(stock.symbol);
                  setQuery(stock.symbol);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between border-b border-zinc-800 px-4 py-3 text-left transition hover:bg-zinc-800 last:border-none"
              >
                <div>
                  <p className="font-medium text-white">
                    {stock.company_name}
                  </p>

                  <p className="text-sm text-zinc-400">
                    {stock.exchange}
                  </p>
                </div>

                <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                  {stock.symbol}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}