from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.exceptions import (
    generic_exception_handler,
    http_exception_handler,
)
from app.core.middleware import log_requests
from app.features.auth.api import router as auth_router
from app.features.stocks.api import router as stocks_router
from app.features.ai.api import router as ai_router

# app = FastAPI(
#     title=settings.app_name,
#     version=settings.app_version,
# )

app = FastAPI(
    title="AlphaSense AI API",
    description="AI-powered financial analytics platform.",
    version="1.0.0",
    contact={
        "name": "Sejal Jain",
        "email": "your-email@example.com",
    },
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://YOUR-VERCEL-APP.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Register exception handlers
app.add_exception_handler(
    HTTPException,
    http_exception_handler,
)

app.add_exception_handler(
    Exception,
    generic_exception_handler,
)

# Register middleware
app.middleware("http")(log_requests)

# Register routers
app.include_router(
    auth_router,
    prefix=settings.api_v1_prefix,
)

app.include_router(
    stocks_router,
    prefix=settings.api_v1_prefix,
)

app.include_router(
    ai_router,
    prefix=settings.api_v1_prefix,
)

@app.get("/")
async def root():
    return {
        "status": "healthy",
        "application": settings.app_name,
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "application": settings.app_name,
        "version": settings.app_version,
    }
