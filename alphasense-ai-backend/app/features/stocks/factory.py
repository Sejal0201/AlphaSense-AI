from app.features.stocks.aggregator import MarketDataAggregator
from app.features.stocks.providers.finnhub_provider import FinnhubProvider
from app.features.stocks.providers.yahoo_provider import YahooFinanceProvider


class ProviderFactory:

    @staticmethod
    def create():

        providers = [
            FinnhubProvider(),        # Primary
            YahooFinanceProvider(),   # Fallback
        ]

        return MarketDataAggregator(providers)