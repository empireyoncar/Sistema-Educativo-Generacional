import uuid
from datetime import datetime

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from .copycard import copiar_tarjeta_desde_constructor
from .database import Base, engine, get_db
from .models import Card, CardCombination, User
from .schemas import CardOut, CardUpdate, CombinationIn, CombinationOut, LoginRequest, TokenResponse, UserCreate
from .security import create_access_token, get_current_user, hash_password, require_admin, verify_password
from .seed import seed_database
from .fullcard import rellenar_tarjeta_con_usuario
from .lookcard import preparar_visualizacion_tarjeta

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
    ensure_card_visual_columns()
    db = next(get_db())
    seed_database(db)
    db.close()


def ensure_card_visual_columns():
    with engine.begin() as connection:
        connection.execute(text("ALTER TABLE cards ALTER COLUMN background TYPE TEXT"))
        connection.execute(text("ALTER TABLE cards ALTER COLUMN character TYPE TEXT"))
        connection.execute(text("ALTER TABLE cards ALTER COLUMN frame TYPE TEXT"))
        connection.execute(text("ALTER TABLE cards ADD COLUMN IF NOT EXISTS visual_assets JSONB DEFAULT '{}'::jsonb"))
        connection.execute(text("ALTER TABLE cards ADD COLUMN IF NOT EXISTS combination_snapshot JSONB DEFAULT '{}'::jsonb"))


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
    card = db.query(Card).filter(Card.user_id == user.id).first()
    return preparar_visualizacion_tarjeta(card)


@app.post("/api/card/generate", response_model=CardOut)
def generate_my_card(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if db.query(Card).filter(Card.user_id == user.id).first():
        raise HTTPException(status_code=409, detail="User already has a card")

    copied_card = copiar_tarjeta_desde_constructor()
    if not copied_card:
        raise HTTPException(status_code=400, detail="No card builder combinations available")

    card = rellenar_tarjeta_con_usuario(user, copied_card)
    db.add(card)
    db.commit()
    db.refresh(card)
    return preparar_visualizacion_tarjeta(card)


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


@app.delete("/api/admin/cards/{card_id}", status_code=204)
def delete_card(card_id: uuid.UUID, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    card = db.get(Card, card_id)
    if card:
        db.delete(card)
        db.commit()
