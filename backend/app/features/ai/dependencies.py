from app.features.ai.service import AIService
from app.features.stocks.dependencies import get_stock_service


def get_ai_service():
    stock_service = get_stock_service()

    return AIService(
        stock_service,
    )