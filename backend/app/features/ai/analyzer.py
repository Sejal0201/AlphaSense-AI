from app.features.ai.indicators import TechnicalIndicators


class MarketAnalyzer:
    """
    Converts technical indicators into AI insights.
    """

    @staticmethod
    def analyze(
        symbol: str,
        prices: list[float],
    ):
        indicators = TechnicalIndicators.calculate(prices)

        score = 50
        reasons = []

        # Trend
        if indicators["trend"] == "Bullish":
            score += 20
            reasons.append("Price is trading above its 20-day moving average.")
        else:
            score -= 20
            reasons.append("Price is trading below its 20-day moving average.")

        # Momentum
        if indicators["momentum"] > 0:
            score += 15
            reasons.append("Positive price momentum detected.")
        else:
            score -= 15
            reasons.append("Negative price momentum detected.")

        # Volatility
        if indicators["volatility"] < indicators["current_price"] * 0.08:
            score += 10
            reasons.append("Price volatility remains relatively low.")
        else:
            score -= 10
            reasons.append("High price volatility increases risk.")

        # Clamp score
        score = max(0, min(score, 100))

        # Sentiment
        if score >= 75:
            sentiment = "Bullish"
            recommendation = "BUY"
            risk = "Low"

        elif score >= 50:
            sentiment = "Neutral"
            recommendation = "HOLD"
            risk = "Medium"

        else:
            sentiment = "Bearish"
            recommendation = "SELL"
            risk = "High"

        summary = (
            f"{symbol} is currently showing {sentiment.lower()} "
            f"market conditions based on trend, momentum, "
            f"and volatility analysis."
        )

        return {
            "symbol": symbol,
            "sentiment": sentiment,
            "confidence": score,
            "recommendation": recommendation,
            "summary": summary,
            "reasons": reasons,
            "risk": risk,
        }