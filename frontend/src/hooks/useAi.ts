import { useQuery } from "@tanstack/react-query";

import { getAIInsight } from "@/services/ai";

export function useAIInsight(symbol: string) {
  return useQuery({
    queryKey: ["ai", symbol],

    queryFn: () => getAIInsight(symbol),

    staleTime: 60000,

    refetchInterval: 60000,
  });
}