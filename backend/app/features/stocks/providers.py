from abc import ABC, abstractmethod
from typing import Any


class MarketDataProvider(ABC):
    """
    Base interface for all market data providers.
    """

    @abstractmethod
    async def search_stock(
        self,
        query: str,
    ) -> list[dict[str, Any]]:
        """
        Search stocks.
        """
        pass

    @abstractmethod
    async def get_stock_details(
        self,
        symbol: str,
    ) -> dict[str, Any]:
        """
        Company profile.
        """
        pass

    @abstractmethod
    async def get_history(
        self,
        symbol: str,
        period: str,
    ) -> dict[str, Any]:
        """
        Historical market data.
        """
        pass