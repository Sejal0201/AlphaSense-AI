import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

export interface StockQuote {
  symbol: string;
  current_price: number;
  change: number;
  percent_change: number;
  high: number;
  low: number;
  open: number;
  previous_close: number;
}

export interface StockSearch {
  symbol: string;
  company_name: string;
  exchange: string;
}

export interface Candle {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockHistory {
  symbol: string;
  period: string;
  candles: Candle[];
}

/*
----------------------------------
Search
----------------------------------
*/

export function useSearchStocks(query: string) {
  return useQuery({
    queryKey: ["stocks", query],

    queryFn: async () => {
      const { data } = await api.get<StockSearch[]>(
        `/stocks/search?q=${query}`
      );

      return data;
    },

    enabled: query.length > 0,
  });
}

/*
----------------------------------
Quote
----------------------------------
*/

export function useQuote(symbol: string) {
  return useQuery({
    queryKey: ["quote", symbol],

    queryFn: async () => {
      const { data } = await api.get<StockQuote>(
        `/stocks/quote/${symbol}`
      );

      return data;
    },

    enabled: !!symbol,
    refetchInterval: 15000,
  });
}

/*
----------------------------------
History
----------------------------------
*/

export function useHistory(
  symbol: string,
  period = "1mo",
) {
  return useQuery({
    queryKey: ["history", symbol, period],

    queryFn: async () => {
      const { data } = await api.get<StockHistory>(
        `/stocks/${symbol}/history?period=${period}&interval=1d`
      );

      return data;
    },

    enabled: !!symbol,
  });
}

// Company profile 

export interface CompanyProfile {
  symbol: string;
  company_name: string;
  exchange: string;
  sector: string;
  industry: string;
  country: string;
  currency: string;
  market_cap: number;
}

export function useCompanyProfile(symbol: string) {
  return useQuery({
    queryKey: ["company-profile", symbol],

    queryFn: async () => {
      const { data } = await api.get<CompanyProfile>(
        `/stocks/${symbol}`
      );

      return data;
    },

    enabled: !!symbol,
  });
}