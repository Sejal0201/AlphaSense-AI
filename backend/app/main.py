from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.constants import API_DESCRIPTION, API_TITLE, API_VERSION
from app.db.database import get_db

app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    description=API_DESCRIPTION,
)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.app_name} 🚀",
        "version": settings.app_version,
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.get("/db-check")
def database_check(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))

    return {
        "database": "Connected Successfully ✅"
    }