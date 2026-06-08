import hashlib
import uuid
from datetime import datetime

from .estadisticas_random import generar_estadisticas_random
from .models import Card, User
from .copycard import guardar_tarjeta_asignada


def rellenar_tarjeta_con_usuario(user: User, copied_card: dict) -> Card:
    raw_hash = f"{uuid.uuid4()}:{user.id}:{datetime.utcnow().isoformat()}"
    card_hash = hashlib.sha256(raw_hash.encode("utf8")).hexdigest()
    lore = copied_card.get("lore") or ""
    character = copied_card.get("character") or copied_card.get("name") or ""

    card_data = {
        "card_hash": card_hash,
        "name": user.name,
        "country": user.country,
        "rarity": copied_card.get("rarity") or "Bronze",
        "lore": lore,
        "experience": 0,
        "level": 1,
        "attribute": copied_card.get("attribute") or "",
        "stats": generar_estadisticas_random(lore, character),
        "skills": user.skills,
        "background": copied_card.get("background") or "",
        "character": copied_card.get("character") or "",
        "frame": copied_card.get("frame") or "",
        "visual_assets": copied_card.get("visual_assets") or {},
        "combination_snapshot": copied_card.get("snapshot") or {},
    }
    guardar_tarjeta_asignada(user.id, card_data)

    return Card(
        user_id=user.id,
        **card_data,
    )
