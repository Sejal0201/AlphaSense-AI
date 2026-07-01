import httpx

YAHOO_SEARCH_URL = "https://query2.finance.yahoo.com/v1/finance/search"


class YahooSearchProvider:

    async def search(
        self,
        query: str,
    ):

        async with httpx.AsyncClient() as client:

            response = await client.get(
                YAHOO_SEARCH_URL,
                params={
                    "q": query,
                    "quotesCount": 10,
                    "newsCount": 0,
                },
                timeout=10,
            )

            response.raise_for_status()

            data = response.json()

        results = []

        for item in data.get("quotes", []):

            if "symbol" not in item:
                continue

            results.append(
                {
                    "symbol": item["symbol"],
                    "company_name": item.get("shortname", ""),
                    "exchange": item.get("exchange", ""),
                }
            )

        return results