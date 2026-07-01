from app.features.stocks.aggregator import MarketDataAggregator


class StockService:
    """
    Business logic for stock operations.
    """

    def __init__(
        self,
        aggregator: MarketDataAggregator,
    ):
        self.aggregator = aggregator

    async def search_stock(
        self,
        query: str,
    ):
        return await self.aggregator.search_stock(query)

    async def get_stock(
        self,
        symbol: str,
    ):
        return await self.aggregator.get_stock_details(symbol)

    async def get_history(
        self,
        symbol: str,
        period: str,
        interval: str,
    ):
        return await self.aggregator.get_history(
            symbol,
            period,
            interval,
        )

    async def get_quote(
        self,
        symbol: str,
    ):
        return await self.aggregator.get_quote(symbol)