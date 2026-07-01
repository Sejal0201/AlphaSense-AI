import time

from fastapi import Request

from app.core.logger import logger


async def log_requests(request: Request, call_next):
    start = time.perf_counter()

    response = await call_next(request)

    duration = time.perf_counter() - start

    logger.info(
        "%s %s %.2fms",
        request.method,
        request.url.path,
        duration * 1000,
    )

    return response