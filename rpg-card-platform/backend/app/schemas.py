from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    country: str = ""
    skills: list[str] = []


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class CombinationIn(BaseModel):
    background: str
    character: str
    frame: str = "Legendary Gold"
    base_lore: str
    default_rarity: str | None = None


class CombinationOut(CombinationIn):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CardOut(BaseModel):
    id: UUID
    user_id: UUID
    card_hash: str
    name: str
    country: str
    rarity: str
    lore: str
    experience: int
    level: int
    attribute: str
    stats: dict
    skills: list[str]
    background: str
    character: str
    frame: str
    visual_assets: dict = {}
    combination_snapshot: dict = {}
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CardUpdate(BaseModel):
    name: str | None = None
    country: str | None = None
    rarity: str | None = None
    lore: str | None = None
    experience: int | None = None
    level: int | None = None
    attribute: str | None = None
    stats: dict | None = None
    skills: list[str] | None = None
    background: str | None = None
    character: str | None = None
    frame: str | None = None
    visual_assets: dict | None = None
    combination_snapshot: dict | None = None
