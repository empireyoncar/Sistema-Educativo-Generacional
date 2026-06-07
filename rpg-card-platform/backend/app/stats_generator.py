import random

ARCHETYPES = {
    "Warrior": {"fuerza": (70, 100), "agilidad": (35, 75), "vitalidad": (65, 100), "inteligencia": (15, 55), "sabiduria": (20, 60), "carisma": (25, 70)},
    "Paladin": {"fuerza": (55, 90), "agilidad": (25, 65), "vitalidad": (70, 100), "inteligencia": (30, 70), "sabiduria": (55, 95), "carisma": (50, 95)},
    "Assassin": {"fuerza": (35, 75), "agilidad": (75, 100), "vitalidad": (35, 70), "inteligencia": (45, 85), "sabiduria": (35, 80), "carisma": (25, 70)},
    "Mage": {"fuerza": (10, 45), "agilidad": (25, 65), "vitalidad": (25, 65), "inteligencia": (75, 100), "sabiduria": (65, 100), "carisma": (30, 80)},
    "Default": {"fuerza": (25, 85), "agilidad": (25, 85), "vitalidad": (25, 85), "inteligencia": (25, 85), "sabiduria": (25, 85), "carisma": (25, 85)},
}


def detect_archetype(character: str) -> str:
    value = character.lower()
    if any(word in value for word in ["warrior", "berserker", "gladiator", "slayer", "viking"]):
        return "Warrior"
    if any(word in value for word in ["paladin", "monk", "guardian"]):
        return "Paladin"
    if any(word in value for word in ["assassin", "ninja", "ronin"]):
        return "Assassin"
    if any(word in value for word in ["mage", "witch", "sorcerer", "necromancer"]):
        return "Mage"
    return "Default"


def generate_stats(character: str) -> dict[str, int]:
    archetype = detect_archetype(character)
    ranges = ARCHETYPES[archetype]
    return {key: random.randint(low, high) for key, (low, high) in ranges.items()}
