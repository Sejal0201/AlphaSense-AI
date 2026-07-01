from sqlalchemy.orm import Session

from app.features.auth.models import User
from fastapi import HTTPException, status
from app.features.auth.repository import AuthRepository
from app.features.auth.schemas import UserLogin, UserRegister
from app.features.auth.security import (
    create_access_token,
    hash_password,
    verify_password,
)


class AuthService:
    """
    Handles authentication business logic.
    """

    def __init__(self, db: Session):
        self.repository = AuthRepository(db)

    def register(self, data: UserRegister) -> User:
        """
        Register a new user.
        """

        existing_user = self.repository.get_by_email(data.email)

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered.",
            )
        user = User(
            full_name=data.full_name,
            email=data.email,
            hashed_password=hash_password(data.password),
        )

        return self.repository.create(user)

    def login(self, data: UserLogin) -> str:
        """
        Authenticate a user and return a JWT.
        """

        user = self.repository.get_by_email(data.email)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )
        if not verify_password(
            data.password,
            user.hashed_password,
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        return create_access_token(str(user.id))