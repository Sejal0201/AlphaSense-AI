from app.features.stocks.service import StockService


class AIChatService:

    def __init__(
        self,
        stock_service: StockService,
    ):
        self.stock_service = stock_service

    async def chat(
        self,
        message: str,
    ):
        message = message.lower()

        if "apple" in message:
            insight = await self.stock_service.get_quote("AAPL")

            return {
                "answer":
                    f"Apple is trading at ${insight['current_price']:.2f}. "
                    f"The daily change is "
                    f"{insight['percent_change']:.2f}%."
            }

        if "tesla" in message:
            insight = await self.stock_service.get_quote("TSLA")

            return {
                "answer":
                    f"Tesla is trading at ${insight['current_price']:.2f}. "
                    f"The daily change is "
                    f"{insight['percent_change']:.2f}%."
            }

        return {
            "answer":
                "I can currently answer questions about Apple and Tesla."
        }