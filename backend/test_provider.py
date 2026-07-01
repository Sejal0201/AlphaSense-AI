import asyncio

from app.features.stocks.providers import YahooFinanceProvider


async def main():

    provider = YahooFinanceProvider()

    print(await provider.get_stock_details("AAPL"))


asyncio.run(main())