import hashlib
import random
import uuid
from datetime import datetime

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import Card, CardCombination, User
from .schemas import CardOut, CardUpdate, CombinationIn, CombinationOut, LoginRequest, TokenResponse, UserCreate
from .security import create_access_token, get_current_user, hash_password, require_admin, verify_password
from .seed import seed_database
from .stats_generator import generate_stats

app = FastAPI(title="RPG Card Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    seed_database(db)
    db.close()


@app.post("/api/auth/register", response_model=TokenResponse)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        country=payload.country,
        skills=payload.skills,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return TokenResponse(access_token=create_access_token(user))


@app.post("/api/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return TokenResponse(access_token=create_access_token(user))


@app.get("/api/card/me", response_model=CardOut | None)
def get_my_card(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Card).filter(Card.user_id == user.id).first()


@app.post("/api/card/generate", response_model=CardOut)
def generate_my_card(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if db.query(Card).filter(Card.user_id == user.id).first():
        raise HTTPException(status_code=409, detail="User already has a card")

    combinations = db.query(CardCombination).all()
    if not combinations:
        raise HTTPException(status_code=400, detail="No card combinations available")

    combination = random.choice(combinations)
    rarity = random.choice(["Common", "Rare", "Epic", "Legendary"])
    attribute = random.choice(["Luz", "Sombra", "Fuego", "Hielo", "Arcano", "Naturaleza", "Trueno"])
    raw_hash = f"{uuid.uuid4()}:{user.id}:{datetime.utcnow().isoformat()}"
    card_hash = hashlib.sha256(raw_hash.encode("utf8")).hexdigest()

    card = Card(
        user_id=user.id,
        card_hash=card_hash,
        name=user.name,
        country=user.country,
        rarity=rarity,
        lore=combination.base_lore,
        experience=0,
        level=1,
        attribute=attribute,
        stats=generate_stats(combination.character),
        skills=user.skills,
        background=combination.background,
        character=combination.character,
        frame=combination.frame,
    )
    db.add(card)
    db.commit()
    db.refresh(card)
    return card


@app.get("/api/admin/combinations", response_model=list[CombinationOut])
def list_combinations(_admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return db.query(CardCombination).order_by(CardCombination.id.desc()).all()


@app.post("/api/admin/combinations", response_model=CombinationOut)
def create_combination(payload: CombinationIn, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    combination = CardCombination(**payload.model_dump())
    db.add(combination)
    db.commit()
    db.refresh(combination)
    return combination


@app.put("/api/admin/combinations/{combination_id}", response_model=CombinationOut)
def update_combination(combination_id: int, payload: CombinationIn, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    combination = db.get(CardCombination, combination_id)
    if not combination:
        raise HTTPException(status_code=404, detail="Combination not found")
    for key, value in payload.model_dump().items():
        setattr(combination, key, value)
    db.commit()
    db.refresh(combination)
    return combination


@app.delete("/api/admin/combinations/{combination_id}", status_code=204)
def delete_combination(combination_id: int, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    combination = db.get(CardCombination, combination_id)
    if combination:
        db.delete(combination)
        db.commit()


@app.get("/api/admin/cards", response_model=list[CardOut])
def list_cards(_admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return db.query(Card).order_by(Card.created_at.desc()).all()


@app.get("/api/admin/cards/{card_id}", response_model=CardOut)
def get_card(card_id: uuid.UUID, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    card = db.get(Card, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@app.put("/api/admin/cards/{card_id}", response_model=CardOut)
def update_card(card_id: uuid.UUID, payload: CardUpdate, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    card = db.get(Card, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(card, key, value)
    card.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(card)
    return card
