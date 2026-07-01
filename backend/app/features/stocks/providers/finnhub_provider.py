from typing import Any

import httpx

from app.core.config import settings
from app.features.stocks.providers.base import MarketDataProvider


class FinnhubProvider(MarketDataProvider):
    """
    Finnhub Market Data Provider
    """

    BASE_URL = "https://finnhub.io/api/v1"

    async def _get(self, endpoint: str, params: dict[str, Any]):
        params["token"] = settings.finnhub_api_key

        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(
                f"{self.BASE_URL}/{endpoint}",
                params=params,
            )

            response.raise_for_status()

            return response.json()

    async def search_stock(
        self,
        query: str,
    ):

        data = await self._get(
            "search",
            {
                "q": query,
            },
        )

        results = []

        for item in data.get("result", []):

            results.append(
                {
                    "symbol": item["symbol"],
                    "company_name": item["description"],
                    "exchange": item["displaySymbol"],
                }
            )

        return results

    async def get_stock_details(
        self,
        symbol: str,
    ):

        profile = await self._get(
            "stock/profile2",
            {
                "symbol": symbol,
            },
        )

        return {
            "symbol": symbol,
            "company_name": profile.get("name"),
            "sector": profile.get("finnhubIndustry"),
            "industry": profile.get("finnhubIndustry"),
            "currency": profile.get("currency"),
            "market_cap": profile.get("marketCapitalization"),
        }

    async def get_history(
        self,
        symbol: str,
        period: str,
    ):
        """
        We'll implement this in Sprint 7.
        """

        raise NotImplementedError(
            "Historical data will be implemented in Sprint 7."
        )

    async def get_quote(
        self,
        symbol: str,
    ):

        data = await self._get(
            "quote",
            {
                "symbol": symbol,
            },
        )

        return {
            "symbol": symbol,
            "current_price": data.get("c"),
            "change": data.get("d"),
            "percent_change": data.get("dp"),
            "high": data.get("h"),
            "low": data.get("l"),
            "open": data.get("o"),
            "previous_close": data.get("pc"),
        }