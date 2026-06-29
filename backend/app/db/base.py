from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# Import models here so Alembic can detect them
from app.models.user import User  # noqa: E402,F401