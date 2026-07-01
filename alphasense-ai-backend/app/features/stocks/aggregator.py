from app.core.logger import logger
from app.features.stocks.providers.base import MarketDataProvider


class MarketDataAggregator:
    """
    Handles provider selection and automatic failover.
    """

    def __init__(
        self,
        providers: list[MarketDataProvider],
    ):
        self.providers = providers

    async def search_stock(
        self,
        query: str,
    ):
        last_error: Exception | None = None

        for provider in self.providers:
            try:
                logger.info(
                    "Trying provider %s for stock search: %s",
                    provider.__class__.__name__,
                    query,
                )

                result = await provider.search_stock(query)

                logger.info(
                    "Provider %s succeeded.",
                    provider.__class__.__name__,
                )

                return result

            except Exception as exc:
                logger.error(
                    "Provider %s failed: %s",
                    provider.__class__.__name__,
                    str(exc),
                )
                last_error = exc

        raise last_error

    async def get_stock_details(
        self,
        symbol: str,
    ):
        last_error: Exception | None = None

        for provider in self.providers:
            try:
                logger.info(
                    "Trying provider %s for stock details: %s",
                    provider.__class__.__name__,
                    symbol,
                )

                result = await provider.get_stock_details(symbol)

                logger.info(
                    "Provider %s succeeded.",
                    provider.__class__.__name__,
                )

                return result

            except Exception as exc:
                logger.error(
                    "Provider %s failed: %s",
                    provider.__class__.__name__,
                    str(exc),
                )
                last_error = exc

        raise last_error

    async def get_history(
        self,
        symbol: str,
        period: str,
        interval: str,
    ):
        last_error: Exception | None = None

        for provider in self.providers:
            try:
                logger.info(
                    "Trying provider %s for history: %s (%s)",
                    provider.__class__.__name__,
                    symbol,
                    period,
                )

                result = await provider.get_history(
                    symbol,
                    period,
                    interval,
                )

                logger.info(
                    "Provider %s succeeded.",
                    provider.__class__.__name__,
                )

                return result

            except Exception as exc:
                logger.error(
                    "Provider %s failed: %s",
                    provider.__class__.__name__,
                    str(exc),
                )
                last_error = exc

        raise last_error

    async def get_quote(
        self,
        symbol: str,
    ):
        last_error: Exception | None = None

        for provider in self.providers:
            try:
                logger.info(
                    "Trying provider %s for quote: %s",
                    provider.__class__.__name__,
                    symbol,
                )

                result = await provider.get_quote(symbol)

                logger.info(
                    "Provider %s succeeded.",
                    provider.__class__.__name__,
                )

                return result

            except Exception as exc:
                logger.error(
                    "Provider %s failed: %s",
                    provider.__class__.__name__,
                    str(exc),
                )
                last_error = exc

        raise last_error