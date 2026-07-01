from cachetools import TTLCache

stock_search_cache = TTLCache(
    maxsize=500,
    ttl=300,
)