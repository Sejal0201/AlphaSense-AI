from app.features.stocks.factory import ProviderFactory
from app.features.stocks.service import StockService


def get_stock_service():

    aggregator = ProviderFactory.create()

    return StockService(aggregator)