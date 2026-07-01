from statistics import mean


class TechnicalIndicators:
    """
    Calculates technical indicators from historical stock candles.
    """

    @staticmethod
    def simple_moving_average(
        prices: list[float],
        period: int = 20,
    ) -> float:
        if len(prices) < period:
            return mean(prices)

        return mean(prices[-period:])

    @staticmethod
    def momentum(
        prices: list[float],
    ) -> float:
        if len(prices) < 2:
            return 0

        return prices[-1] - prices[0]

    @staticmethod
    def volatility(
        prices: list[float],
    ) -> float:
        if len(prices) < 2:
            return 0

        return max(prices) - min(prices)

    @staticmethod
    def support(
        prices: list[float],
    ) -> float:
        return min(prices)

    @staticmethod
    def resistance(
        prices: list[float],
    ) -> float:
        return max(prices)

    @staticmethod
    def trend(
        prices: list[float],
    ) -> str:
        sma = TechnicalIndicators.simple_moving_average(prices)

        if prices[-1] > sma:
            return "Bullish"

        if prices[-1] < sma:
            return "Bearish"

        return "Neutral"

    @staticmethod
    def calculate(
        prices: list[float],
    ):
        return {
            "current_price": prices[-1],
            "sma20": TechnicalIndicators.simple_moving_average(prices),
            "momentum": TechnicalIndicators.momentum(prices),
            "volatility": TechnicalIndicators.volatility(prices),
            "support": TechnicalIndicators.support(prices),
            "resistance": TechnicalIndicators.resistance(prices),
            "trend": TechnicalIndicators.trend(prices),
        }