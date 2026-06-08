from sqlalchemy.orm import Session

from .models import CardCombination, User
from .security import hash_password

COMBINATIONS = [
    ("Medieval Dark", "Epic Warrior", "Un guerrero nacido en la oscuridad que lucha por encender la ultima chispa de esperanza."),
    ("Golden Divine", "Holy Paladin", "Un paladin consagrado por la luz dorada que purifica toda sombra a su paso."),
    ("Shadow Abyss", "Shadow Assassin", "Una figura del abismo que elimina objetivos antes de que su sombra los alcance."),
    ("Infernal Volcano", "Berserker", "Un combatiente forjado en fuego volcanico cuya furia puede partir montanas."),
    ("Frozen Kingdom", "Frost Witch", "Un ser del hielo eterno capaz de congelar el destino con un solo gesto."),
    ("Celestial Heaven", "Celestial Archer", "Un arquero bendecido por los cielos que dispara con la precision de las estrellas."),
    ("Neon Cyberpunk", "Cyber Ninja", "Una sombra digital que se mueve entre luces de neon con velocidad imposible."),
    ("Arcane Library", "Arcane Mage", "Un mago erudito que domina secretos arcanos capaces de alterar la realidad."),
    ("Crimson Bloodmoon", "Blood Knight", "Un caballero marcado por la luna carmesi que lucha entre honor y maldicion."),
    ("Emerald Forest", "Beast Tamer", "Un domador que controla la furia y la nobleza de las bestias del bosque."),
    ("Cosmic Galaxy", "Phoenix Guardian", "Un guardian renacido del fuego estelar que protege el equilibrio del cosmos."),
    ("Thunder Storm", "Elemental Sorcerer", "Un hechicero que invoca tormentas capaces de desgarrar cielo y tierra."),
    ("Ancient Desert", "Samurai Ronin", "Un ronin errante que busca redencion entre dunas antiguas y silencios eternos."),
    ("Dragon Temple", "Dragon Slayer", "Un cazador marcado por la sangre de dragon que enfrenta criaturas legendarias."),
    ("Demonic Realm", "Dark Reaper", "Un segador nacido del reino demoniaco que trae silencio donde pisa."),
    ("Oceanic Atlantis", "Battle Monk", "Un monje guerrero de las profundidades cuya fuerza fluye como las mareas."),
    ("Haunted Cemetery", "Necromancer", "Un invocador de almas que domina el poder oculto entre tumbas olvidadas."),
    ("Crystal Caverns", "Titan Gladiator", "Un gladiador colosal formado entre cristales ancestrales que resuenan con poder."),
    ("Royal Empire", "Viking Conqueror", "Un conquistador indomable que desafia imperios con espiritu feroz."),
    ("Mystic Sakura", "Holy Paladin Cerezo", "Un paladin bendecido por cerezos misticos cuya luz purifica toda oscuridad."),
]


def seed_database(db: Session):
    if db.query(CardCombination).count() == 0:
        for background, character, lore in COMBINATIONS:
            db.add(CardCombination(background=background, character=character, frame="Ornate Gold", base_lore=lore))

    if not db.query(User).filter(User.email == "admin@empireyoncar.com").first():
        db.add(
            User(
                name="Admin",
                email="admin@empireyoncar.com",
                password_hash=hash_password("admin123"),
                country="Empire",
                skills=["Gestion", "Cartas"],
                role="admin",
            )
        )

    db.commit()
