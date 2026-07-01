from app.features.ai.analyzer import MarketAnalyzer
from app.features.stocks.service import StockService


class AIService:
    """
    AI Business Logic.
    """

    def __init__(
        self,
        stock_service: StockService,
    ):
        self.stock_service = stock_service

    async def get_market_insight(
        self,
        symbol: str,
    ):
        history = await self.stock_service.get_history(
            symbol=symbol,
            period="1mo",
            interval="1d",
        )

        prices = [
            candle["close"]
            for candle in history["candles"]
        ]

        return MarketAnalyzer.analyze(
            symbol,
            prices,
        )