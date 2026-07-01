import { api } from "./api";

export async function searchStocks(query: string) {
    const { data } = await api.get(
        `/stocks/search?q=${query}`
    );

    return data;
}

export async function getQuote(symbol: string) {
    const { data } = await api.get(
        `/stocks/quote/${symbol}`
    );

    return data;
}

export async function getHistory(
    symbol: string,
    period = "6mo",
) {
    const { data } = await api.get(
        `/stocks/${symbol}/history`,
        {
            params: {
                period,
            },
        }
    );

    return data;
}