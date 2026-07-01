from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# Import every SQLAlchemy model here

# from app.features.auth.models import User  # noqa: E402,F401