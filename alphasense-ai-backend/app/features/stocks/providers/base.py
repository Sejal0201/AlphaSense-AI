from abc import ABC, abstractmethod
from typing import Any


class MarketDataProvider(ABC):

    @abstractmethod
    async def search_stock(
        self,
        query: str,
    ) -> list[dict[str, Any]]:
        ...

    @abstractmethod
    async def get_stock_details(
        self,
        symbol: str,
    ) -> dict[str, Any]:
        ...

    @abstractmethod
    async def get_history(
        self,
        symbol: str,
        period: str,
    ) -> dict[str, Any]:
        ...

    @abstractmethod
    async def get_quote(
        self,
        symbol: str,
    ) -> dict[str, Any]:
        ...