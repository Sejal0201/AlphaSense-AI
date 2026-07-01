from fastapi import APIRouter, Depends

from app.features.ai.dependencies import get_ai_service
from app.features.ai.schemas import AIInsightResponse
from app.features.ai.service import AIService

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.get(
    "/insight/{symbol}",
    response_model=AIInsightResponse,
)
async def get_ai_insight(
    symbol: str,
    service: AIService = Depends(get_ai_service),
):
    return await service.get_market_insight(symbol)