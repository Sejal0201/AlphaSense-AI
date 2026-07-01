import { api } from "./api";

export async function getAIInsight(symbol: string) {
  const { data } = await api.get(
    `/ai/insight/${symbol}`
  );

  return data;
}