import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://rpg_user:rpg_password@localhost:6800/rpg_cards",
)
JWT_SECRET = os.getenv("JWT_SECRET", "change-this-secret")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
