from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.features.auth.dependencies import get_current_user
from app.db.database import get_db
from app.features.auth.schemas import (
    Token,
    UserLogin,
    UserRegister,
    UserResponse,
)
from app.features.auth.service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user_data: UserRegister,
    db: Session = Depends(get_db),
):
    service = AuthService(db)
    return service.register(user_data)


@router.post(
    "/login",
    response_model=Token,
)
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    access_token = service.login(credentials)

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user=Depends(get_current_user),
):
    """
    Return authenticated user.
    """

    return current_user