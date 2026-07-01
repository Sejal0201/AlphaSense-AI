from pydantic import BaseModel


class AIInsightResponse(BaseModel):
    symbol: str

    sentiment: str

    confidence: int

    recommendation: str

    summary: str

    reasons: list[str]

    risk: str