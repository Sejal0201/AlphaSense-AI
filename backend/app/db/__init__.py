"""
Import all SQLAlchemy models here so Alembic can discover them.
"""

from app.features.auth.models import User

__all__ = ["User"]