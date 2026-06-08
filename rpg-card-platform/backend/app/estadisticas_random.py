import random


STAT_KEYS = ["fuerza", "agilidad", "vitalidad", "inteligencia", "sabiduria", "carisma"]

LORE_PROFILES = {
    "guerrero": {"fuerza": 20, "vitalidad": 15},
    "warrior": {"fuerza": 20, "vitalidad": 15},
    "paladin": {"vitalidad": 15, "sabiduria": 15, "carisma": 10},
    "assassin": {"agilidad": 25, "inteligencia": 10},
    "ninja": {"agilidad": 25, "inteligencia": 10},
    "mage": {"inteligencia": 25, "sabiduria": 15},
    "mago": {"inteligencia": 25, "sabiduria": 15},
    "witch": {"inteligencia": 20, "sabiduria": 20},
    "sorcerer": {"inteligencia": 25, "sabiduria": 15},
    "dragon": {"fuerza": 15, "vitalidad": 15, "carisma": 10},
    "monk": {"sabiduria": 20, "vitalidad": 10},
    "guardian": {"vitalidad": 20, "carisma": 10},
}


def generar_estadisticas_random(lore: str, character: str = "") -> dict[str, int]:
    text = f"{lore} {character}".lower()
    bonuses: dict[str, int] = {}

    for keyword, profile in LORE_PROFILES.items():
        if keyword in text:
            for stat, bonus in profile.items():
                bonuses[stat] = max(bonuses.get(stat, 0), bonus)

    stats = {}
    for stat in STAT_KEYS:
        base = random.randint(0, 100)
        stats[stat] = min(100, base + bonuses.get(stat, 0))

    return stats
