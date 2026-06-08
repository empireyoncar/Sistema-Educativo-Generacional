from .models import Card
from .copycard import cargar_tarjeta_asignada


def preparar_visualizacion_tarjeta(card: Card | None):
    if not card:
        return None

    assigned_card = cargar_tarjeta_asignada(card.user_id)
    if not assigned_card:
        return card

    for key in [
        "card_hash",
        "name",
        "country",
        "rarity",
        "lore",
        "experience",
        "level",
        "attribute",
        "stats",
        "skills",
        "background",
        "character",
        "frame",
        "visual_assets",
        "combination_snapshot",
    ]:
        if key in assigned_card:
            setattr(card, key, assigned_card[key])

    return card
