import json
import os
import random
from pathlib import Path

from .builder_combinations import build_visual_card_from_combination, load_builder_combinations


ASSIGNED_CARDS_DIR = Path(os.getenv("ASSIGNED_CARDS_DIR", "/cartas-asignadas"))


def assigned_card_path(user_id) -> Path:
    return ASSIGNED_CARDS_DIR / f"{user_id}.json"


def guardar_tarjeta_asignada(user_id, card_data: dict) -> dict:
    ASSIGNED_CARDS_DIR.mkdir(parents=True, exist_ok=True)
    assigned_card_path(user_id).write_text(json.dumps(card_data, ensure_ascii=False, indent=2), encoding="utf8")
    return card_data


def cargar_tarjeta_asignada(user_id) -> dict:
    path = assigned_card_path(user_id)
    if not path.exists():
        return {}

    try:
        return json.loads(path.read_text(encoding="utf8"))
    except json.JSONDecodeError:
        return {}


def eliminar_tarjeta_asignada(user_id) -> None:
    path = assigned_card_path(user_id)
    if path.exists():
        path.unlink()


def copiar_tarjeta_desde_constructor(user_id) -> dict:
    combinations = load_builder_combinations()
    if not combinations:
        return {}

    selected = random.choice(combinations)
    visual_card = build_visual_card_from_combination(selected)
    visual_card["copied_from"] = selected.get("id", "")
    return guardar_tarjeta_asignada(user_id, visual_card)
