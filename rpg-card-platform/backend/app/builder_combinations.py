import json
import os
import random
from pathlib import Path
from urllib.parse import quote


COMBINATIONS_FILE = Path(os.getenv("CARD_BUILDER_COMBINATIONS_FILE", "/card-builder-data/combinations.json"))
ASSET_ROOT = Path(os.getenv("RPG_CARD_ASSET_ROOT", "/home/empire/Imágenes/Constructor de tarjetas RPG"))
PUBLIC_BASE = os.getenv("CARD_BUILDER_PUBLIC_BASE", "/empireyoncarsistemaeducativo/constructor-rpg/").rstrip("/") + "/"

ASSET_GROUPS = {
    "attributes": "Atributos",
}

ATTRIBUTE_NAMES = [
    "Luz",
    "Sombra",
    "Fuego",
    "Hielo",
    "Arcano",
    "Naturaleza",
    "Trueno",
    "Agua",
    "Tierra",
    "Viento",
    "Divino",
    "Abismo",
]

ATTRIBUTE_FILE_NAMES = {
    "attr_02_light.png": "Light",
    "attr_03_fire.png": "Fire",
    "attr_04_ice.png": "Ice",
    "attr_05_thunder.png": "Thunder",
    "attr_06_blood.png": "Blood",
    "attr_07_poison.png": "Poison",
    "attr_08_arcane.png": "Arcane",
    "attr_09_cosmic.png": "Cosmic",
    "attr_10_time.png": "Time",
    "attr_11_gravity.png": "Gravity",
    "attr_12_spirit.png": "Spirit",
    "attr_13_dragon.png": "Dragon",
    "attr_14_shadow_flame.png": "Shadow Flame",
    "attr_15_holy_energy.png": "Holy Energy",
    "attr_16_chaos.png": "Chaos",
    "attr_17_void.png": "Void",
    "attr_18_wind.png": "Wind",
    "attr_19_earth.png": "Earth",
    "attr_20_phoenix_soul.png": "Phoenix Soul",
    "attribute_darkness.png": "Darkness",
}


def _normalize_url(url: str | None) -> str:
    if not url:
        return ""
    if url.startswith("/local-assets/"):
        return f"{PUBLIC_BASE}{url[1:]}"
    if url.startswith("local-assets/"):
        return f"{PUBLIC_BASE}{url}"
    return url


def load_builder_combinations() -> list[dict]:
    if not COMBINATIONS_FILE.exists():
        return []

    try:
        data = json.loads(COMBINATIONS_FILE.read_text(encoding="utf8"))
    except json.JSONDecodeError:
        return []

    return data if isinstance(data, list) else []


def list_asset_files(group: str) -> list[str]:
    folder_name = ASSET_GROUPS.get(group)
    if not folder_name:
        return []

    folder = ASSET_ROOT / folder_name
    if not folder.exists():
        return []

    extensions = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"}
    return sorted(item.name for item in folder.iterdir() if item.is_file() and item.suffix.lower() in extensions)


def asset_url(group: str, name: str) -> str:
    return f"{PUBLIC_BASE}local-assets/{group}/file/{quote(name)}"


def random_attribute() -> tuple[str, str]:
    files = list_asset_files("attributes")
    selected_file = random.choice(files) if files else ""

    if selected_file:
        mapped_name = ATTRIBUTE_FILE_NAMES.get(selected_file)
        if mapped_name:
            return mapped_name, asset_url("attributes", selected_file)

        clean_name = Path(selected_file).stem.replace("-", " ").replace("_", " ").strip()
        attribute = clean_name.title() if clean_name else random.choice(ATTRIBUTE_NAMES)
        return attribute, asset_url("attributes", selected_file)

    return random.choice(ATTRIBUTE_NAMES), ""


def build_visual_card_from_combination(combination: dict) -> dict:
    card = combination.get("card") or {}
    assets = {key: _normalize_url(value) for key, value in (combination.get("assets") or {}).items()}
    attribute, attribute_icon = random_attribute()

    if attribute_icon:
        assets["attributeIcon"] = attribute_icon

    return {
        "name": card.get("name") or "",
        "rarity": card.get("rarity") or "Bronze",
        "lore": card.get("lore") or card.get("genre") or "",
        "attribute": attribute,
        "background": assets.get("background", ""),
        "character": assets.get("character", ""),
        "frame": assets.get("frame", ""),
        "visual_assets": assets,
        "snapshot": combination,
    }
