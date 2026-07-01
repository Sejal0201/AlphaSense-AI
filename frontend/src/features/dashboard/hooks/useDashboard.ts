import { useQuote } from "@/hooks/useStocks";

export function useDashboard() {
  const apple = useQuote("AAPL");
  const microsoft = useQuote("MSFT");
  const tesla = useQuote("TSLA");
  const nvidia = useQuote("NVDA");

  return {
    apple,
    microsoft,
    tesla,
    nvidia,
  };
}