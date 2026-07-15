# import asyncio

# import yfinance as yf

# from app.features.stocks.constants import VALID_PERIODS
# from app.features.stocks.exceptions import (
#     InvalidPeriodException,
#     StockNotFoundException,
# )
# from app.features.stocks.providers.base import MarketDataProvider

# import asyncio

# import pandas as pd
# import yfinance as yf

# from app.features.stocks.constants import VALID_PERIODS
# from app.features.stocks.exceptions import (
#     InvalidPeriodException,
#     StockNotFoundException,
# )
# from app.features.stocks.providers.base import MarketDataProvider

# class YahooFinanceProvider(MarketDataProvider):

#     async def search_stock(
#         self,
#         query: str,
#     ):
#         return [
#             {
#                 "symbol": query.upper(),
#                 "company_name": query.upper(),
#                 "exchange": "Unknown",
#             }
#         ]

#     async def get_stock_details(
#         self,
#         symbol: str,
#     ):
#         ticker = yf.Ticker(symbol)

#         info = await asyncio.to_thread(
#             lambda: ticker.info
#         )

#         if not info:
#             raise StockNotFoundException()

#         return {
#             "symbol": symbol.upper(),
#             "company_name": info.get("longName"),
#             "sector": info.get("sector"),
#             "industry": info.get("industry"),
#             "currency": info.get("currency"),
#             "market_cap": info.get("marketCap"),
#         }

#     async def get_history(
#         self,
#         symbol: str,
#         period: str,
#         interval: str,
#     ):
#         if period not in VALID_PERIODS:
#             raise InvalidPeriodException()

#         ticker = yf.Ticker(symbol)

#         history = await asyncio.to_thread(
#             lambda: ticker.history(
#                 period=period,
#                 interval=interval,
#             )
#         )

#         if history.empty:
#             raise StockNotFoundException()

#         candles = []

#         # for index, row in history.iterrows():
#             candles.append(
#                 {
#                     "timestamp": index.isoformat(),
#                     "open": float(row["Open"]),
#                     "high": float(row["High"]),
#                     "low": float(row["Low"]),
#                     "close": float(row["Close"]),
#                     "volume": int(row["Volume"]),
#                 }
#             )
# for index, row in history.iterrows():

#     if pd.isna(row["Open"]) or \
#        pd.isna(row["High"]) or \
#        pd.isna(row["Low"]) or \
#        pd.isna(row["Close"]):
#         continue

#     candles.append(
#         {
# #             "timestamp": index.isoformat(),
# #             "open": float(row["Open"]),
# #             "high": float(row["High"]),
# #             "low": float(row["Low"]),
# #             "close": float(row["Close"]),
# #             "volume": int(row["Volume"]),
# #         }
# #     )
# #         return {
# #             "symbol": symbol.upper(),
# #             "interval": interval,
# #             "candles": candles,
# #         }

# #     async def get_quote(
# #         self,
# #         symbol: str,
# #     ):
# #         ticker = yf.Ticker(symbol)

# #         info = await asyncio.to_thread(
# #             lambda: ticker.fast_info
# #         )

# #         if not info:
# #             raise StockNotFoundException()

# #         return {
# #             "symbol": symbol.upper(),
# #             "current_price": float(info.get("lastPrice") or 0),
# #             "change": 0.0,
# #             "percent_change": 0.0,
# #             "high": float(info.get("dayHigh") or 0),
# #             "low": float(info.get("dayLow") or 0),
# #             "open": float(info.get("open") or 0),
# #             "previous_close": float(info.get("previousClose") or 0),
# #         }

#     async def get_history(
#     self,
#     symbol: str,
#     period: str,
#     interval: str,
#     ):
#         if period not in VALID_PERIODS:
#             raise InvalidPeriodException()

#         ticker = yf.Ticker(symbol)

#         history = await asyncio.to_thread(
#         lambda: ticker.history(
#             period=period,
#             interval=interval,
#         )
#         )

#         if history.empty:
#         raise StockNotFoundException()

#     # Remove incomplete candles returned by Yahoo Finance
#         history = history.dropna(
#         subset=["Open", "High", "Low", "Close"]
#         )

#         candles = []

#         for index, row in history.iterrows():

#         if (
#             pd.isna(row["Open"])
#             or pd.isna(row["High"])
#             or pd.isna(row["Low"])
#             or pd.isna(row["Close"])
#         ):
#             continue

#         candles.append(
#             {
#                 "timestamp": index.isoformat(),
#                 "open": float(row["Open"]),
#                 "high": float(row["High"]),
#                 "low": float(row["Low"]),
#                 "close": float(row["Close"]),
#                 "volume": int(row["Volume"]),
#             }
#         )

#     return {
#         "symbol": symbol.upper(),
#         "interval": interval,
#         "candles": candles,
#     }


import asyncio

import pandas as pd
import yfinance as yf

from app.features.stocks.constants import VALID_PERIODS
from app.features.stocks.exceptions import (
    InvalidPeriodException,
    StockNotFoundException,
)
from app.features.stocks.providers.base import MarketDataProvider


class YahooFinanceProvider(MarketDataProvider):

    async def search_stock(
        self,
        query: str,
    ):
        return [
            {
                "symbol": query.upper(),
                "company_name": query.upper(),
                "exchange": "Unknown",
            }
        ]

    async def get_stock_details(
        self,
        symbol: str,
    ):
        ticker = yf.Ticker(symbol)

        info = await asyncio.to_thread(
            lambda: ticker.info
        )

        if not info:
            raise StockNotFoundException()

        return {
            "symbol": symbol.upper(),
            "company_name": info.get("longName"),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "currency": info.get("currency"),
            "market_cap": info.get("marketCap"),
        }

    async def get_history(
        self,
        symbol: str,
        period: str,
        interval: str,
    ):
        if period not in VALID_PERIODS:
            raise InvalidPeriodException()

        ticker = yf.Ticker(symbol)

        history = await asyncio.to_thread(
            lambda: ticker.history(
                period=period,
                interval=interval,
            )
        )

        if history.empty:
            raise StockNotFoundException()

        # Remove incomplete candles (today's unfinished market data)
        history = history.dropna(
            subset=["Open", "High", "Low", "Close"]
        )

        candles = []

        for index, row in history.iterrows():

            if (
                pd.isna(row["Open"])
                or pd.isna(row["High"])
                or pd.isna(row["Low"])
                or pd.isna(row["Close"])
            ):
                continue

            candles.append(
                {
                    "timestamp": index.isoformat(),
                    "open": float(row["Open"]),
                    "high": float(row["High"]),
                    "low": float(row["Low"]),
                    "close": float(row["Close"]),
                    "volume": int(row["Volume"]),
                }
            )

        return {
            "symbol": symbol.upper(),
            "interval": interval,
            "candles": candles,
        }

    async def get_quote(
        self,
        symbol: str,
    ):
        ticker = yf.Ticker(symbol)

        info = await asyncio.to_thread(
            lambda: ticker.fast_info
        )

        if not info:
            raise StockNotFoundException()

        return {
            "symbol": symbol.upper(),
            "current_price": float(info.get("lastPrice") or 0),
            "change": 0.0,
            "percent_change": 0.0,
            "high": float(info.get("dayHigh") or 0),
            "low": float(info.get("dayLow") or 0),
            "open": float(info.get("open") or 0),
            "previous_close": float(info.get("previousClose") or 0),
        }