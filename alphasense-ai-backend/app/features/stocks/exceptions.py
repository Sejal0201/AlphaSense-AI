class StockProviderException(Exception):
    """Base provider exception."""


class StockNotFoundException(StockProviderException):
    """Raised when stock is not found."""


class InvalidPeriodException(StockProviderException):
    """Raised for invalid history period."""