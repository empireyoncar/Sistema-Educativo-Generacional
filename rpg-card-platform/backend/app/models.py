import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(160))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    country: Mapped[str] = mapped_column(String(120), default="")
    skills: Mapped[list] = mapped_column(JSONB, default=list)
    role: Mapped[str] = mapped_column(String(24), default="user")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    card: Mapped["Card"] = relationship(back_populates="user", uselist=False)


class CardCombination(Base):
    __tablename__ = "card_combinations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    background: Mapped[str] = mapped_column(String(160))
    character: Mapped[str] = mapped_column(String(160))
    frame: Mapped[str] = mapped_column(String(160), default="Legendary Gold")
    base_lore: Mapped[str] = mapped_column(Text)
    default_rarity: Mapped[str | None] = mapped_column(String(80), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Card(Base):
    __tablename__ = "cards"
    __table_args__ = (UniqueConstraint("user_id", name="uq_cards_user_id"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    card_hash: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(160))
    country: Mapped[str] = mapped_column(String(120), default="")
    rarity: Mapped[str] = mapped_column(String(80))
    lore: Mapped[str] = mapped_column(Text)
    experience: Mapped[int] = mapped_column(Integer, default=0)
    level: Mapped[int] = mapped_column(Integer, default=1)
    attribute: Mapped[str] = mapped_column(String(80))
    stats: Mapped[dict] = mapped_column(JSONB, default=dict)
    skills: Mapped[list] = mapped_column(JSONB, default=list)
    background: Mapped[str] = mapped_column(Text)
    character: Mapped[str] = mapped_column(Text)
    frame: Mapped[str] = mapped_column(Text)
    visual_assets: Mapped[dict] = mapped_column(JSONB, default=dict)
    combination_snapshot: Mapped[dict] = mapped_column(JSONB, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user: Mapped[User] = relationship(back_populates="card")
