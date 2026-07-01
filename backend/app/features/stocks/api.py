from fastapi import APIRouter, Depends, Query

from app.features.stocks.dependencies import get_stock_service
from app.features.stocks.schemas import (
    CompanyProfileResponse,
    StockHistoryResponse,
    StockQuoteResponse,
    StockSearchResponse,
)
from app.features.stocks.service import StockService

router = APIRouter(
    prefix="/stocks",
    tags=["Stocks"],
)


@router.get(
    "/search",
    response_model=list[StockSearchResponse],
)
async def search_stock(
    q: str = Query(..., min_length=1),
    service: StockService = Depends(get_stock_service),
):
    return await service.search_stock(q)


@router.get(
    "/{symbol}",
    response_model=CompanyProfileResponse,
)
async def company_profile(
    symbol: str,
    service: StockService = Depends(get_stock_service),
):
    return await service.get_stock(symbol)


@router.get(
    "/{symbol}/history",
    response_model=StockHistoryResponse,
)
async def get_history(
    symbol: str,
    period: str = "1mo",
    interval: str = "1d",
    service: StockService = Depends(get_stock_service),
):
    return await service.get_history(
        symbol,
        period,
        interval,
    )


@router.get(
    "/quote/{symbol}",
    response_model=StockQuoteResponse,
)
async def get_quote(
    symbol: str,
    service: StockService = Depends(get_stock_service),
):
    return await service.get_quote(symbol)