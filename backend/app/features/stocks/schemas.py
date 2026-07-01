from datetime import datetime

from pydantic import BaseModel


class Candle(BaseModel):
    timestamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: int


class StockHistoryResponse(BaseModel):
    symbol: str
    interval: str
    candles: list[Candle]


class StockSearchResponse(BaseModel):
    symbol: str
    company_name: str
    exchange: str


class CompanyProfileResponse(BaseModel):
    symbol: str
    company_name: str | None
    sector: str | None
    industry: str | None
    currency: str | None
    market_cap: float | None


class HistoricalCandle(BaseModel):
    datetime: datetime
    open: float
    high: float
    low: float
    close: float
    volume: int


class HistoricalResponse(BaseModel):
    symbol: str
    period: str
    candles: list[HistoricalCandle]

class StockQuoteResponse(BaseModel):
    symbol: str
    current_price: float
    change: float
    percent_change: float
    high: float
    low: float
    open: float
    previous_close: float