import random

from .builder_combinations import build_visual_card_from_combination, load_builder_combinations


def copiar_tarjeta_desde_constructor() -> dict:
    combinations = load_builder_combinations()
    if not combinations:
        return {}

    selected = random.choice(combinations)
    visual_card = build_visual_card_from_combination(selected)
    visual_card["copied_from"] = selected.get("id", "")
    return visual_card
