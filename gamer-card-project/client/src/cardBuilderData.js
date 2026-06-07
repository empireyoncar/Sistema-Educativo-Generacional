export const emptyCard = {
  name: "",
  genre: "",
  id: "",
  rank: "Bronze",
  rarity: "",
  country: "",
  xp: "0",
  level: "0",
  strength: "0",
  agility: "0",
  vitality: "0",
  intelligence: "0",
  wisdom: "0",
  charisma: "0",
  attribute: "",
  skills: ["", "", "", ""],
};

function createEmptyCard() {
  return { ...emptyCard, skills: [...emptyCard.skills] };
}

export const cardModels = [
  {
    id: "dragon-slayer",
    name: "Dragon Slayer",
    tagline: "Gamer Card",
    icon: "DR",
    card: createEmptyCard(),
  },
  {
    id: "cyber-mage",
    name: "Cyber Mage",
    tagline: "Creator Card",
    icon: "CM",
    card: createEmptyCard(),
  },
  {
    id: "shadow-ninja",
    name: "Shadow Ninja",
    tagline: "Ranked Card",
    icon: "SN",
    card: createEmptyCard(),
  },
  {
    id: "solar-paladin",
    name: "Solar Paladin",
    tagline: "Hero Card",
    icon: "SP",
    card: createEmptyCard(),
  },
];

export const templates = [
  {
    id: "inferno",
    name: "Inferno Gold",
    accent: "text-yellow-200",
    border: "border-yellow-300",
    shadow: "shadow-yellow-500/30",
    panel: "bg-black/75 border-yellow-300/60",
    label: "text-yellow-300",
    background: "bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,210,.9),transparent_28%),linear-gradient(145deg,#facc15_0%,#b45309_42%,#09090b_100%)]",
    aura: "bg-[radial-gradient(circle_at_50%_28%,rgba(255,250,180,.75),transparent_42%)]",
  },
  {
    id: "neon",
    name: "Neon Circuit",
    accent: "text-cyan-100",
    border: "border-cyan-300",
    shadow: "shadow-cyan-500/30",
    panel: "bg-slate-950/75 border-cyan-300/60",
    label: "text-cyan-200",
    background: "bg-[radial-gradient(circle_at_52%_25%,rgba(103,232,249,.8),transparent_30%),linear-gradient(160deg,#0f172a_0%,#075985_45%,#020617_100%)]",
    aura: "bg-[radial-gradient(circle_at_50%_28%,rgba(125,211,252,.65),transparent_42%)]",
  },
  {
    id: "blood",
    name: "Blood Moon",
    accent: "text-rose-100",
    border: "border-rose-400",
    shadow: "shadow-rose-600/30",
    panel: "bg-zinc-950/75 border-rose-300/60",
    label: "text-rose-200",
    background: "bg-[radial-gradient(circle_at_48%_24%,rgba(251,113,133,.8),transparent_30%),linear-gradient(145deg,#7f1d1d_0%,#450a0a_45%,#09090b_100%)]",
    aura: "bg-[radial-gradient(circle_at_50%_28%,rgba(251,113,133,.55),transparent_42%)]",
  },
  {
    id: "emerald",
    name: "Emerald Relic",
    accent: "text-emerald-100",
    border: "border-emerald-300",
    shadow: "shadow-emerald-500/30",
    panel: "bg-emerald-950/70 border-emerald-300/60",
    label: "text-emerald-200",
    background: "bg-[radial-gradient(circle_at_50%_24%,rgba(110,231,183,.75),transparent_30%),linear-gradient(150deg,#064e3b_0%,#166534_42%,#020617_100%)]",
    aura: "bg-[radial-gradient(circle_at_50%_28%,rgba(110,231,183,.55),transparent_42%)]",
  },
];

export const loreOptions = [
  {
    id: "medieval-dark-warrior",
    title: "Medieval Dark x Epic Warrior",
    text: "Un guerrero nacido en la oscuridad que lucha por encender la ultima chispa de esperanza.",
  },
  {
    id: "golden-divine-paladin",
    title: "Golden Divine x Holy Paladin",
    text: "Un paladin consagrado por la luz dorada que purifica toda sombra a su paso.",
  },
  {
    id: "shadow-abyss-assassin",
    title: "Shadow Abyss x Shadow Assassin",
    text: "Una figura del abismo que elimina objetivos antes de que su sombra los alcance.",
  },
  {
    id: "infernal-volcano-berserker",
    title: "Infernal Volcano x Berserker",
    text: "Un combatiente forjado en fuego volcanico cuya furia puede partir montanas.",
  },
  {
    id: "frozen-kingdom-witch",
    title: "Frozen Kingdom x Frost Witch",
    text: "Un ser del hielo eterno capaz de congelar el destino con un solo gesto.",
  },
  {
    id: "celestial-heaven-archer",
    title: "Celestial Heaven x Celestial Archer",
    text: "Un arquero bendecido por los cielos que dispara con la precision de las estrellas.",
  },
  {
    id: "neon-cyberpunk-ninja",
    title: "Neon Cyberpunk x Cyber Ninja",
    text: "Una sombra digital que se mueve entre luces de neon con velocidad imposible.",
  },
  {
    id: "arcane-library-mage",
    title: "Arcane Library x Arcane Mage",
    text: "Un mago erudito que domina secretos arcanos capaces de alterar la realidad.",
  },
  {
    id: "crimson-bloodmoon-knight",
    title: "Crimson Bloodmoon x Blood Knight",
    text: "Un caballero marcado por la luna carmesi que lucha entre honor y maldicion.",
  },
  {
    id: "emerald-forest-tamer",
    title: "Emerald Forest x Beast Tamer",
    text: "Un domador que controla la furia y la nobleza de las bestias del bosque.",
  },
  {
    id: "cosmic-galaxy-phoenix",
    title: "Cosmic Galaxy x Phoenix Guardian",
    text: "Un guardian renacido del fuego estelar que protege el equilibrio del cosmos.",
  },
  {
    id: "thunder-storm-sorcerer",
    title: "Thunder Storm x Elemental Sorcerer",
    text: "Un hechicero que invoca tormentas capaces de desgarrar cielo y tierra.",
  },
  {
    id: "ancient-desert-ronin",
    title: "Ancient Desert x Samurai Ronin",
    text: "Un ronin errante que busca redencion entre dunas antiguas y silencios eternos.",
  },
  {
    id: "dragon-temple-slayer",
    title: "Dragon Temple x Dragon Slayer",
    text: "Un cazador marcado por la sangre de dragon que enfrenta criaturas legendarias.",
  },
  {
    id: "demonic-realm-reaper",
    title: "Demonic Realm x Dark Reaper",
    text: "Un segador nacido del reino demoniaco que trae silencio donde pisa.",
  },
  {
    id: "oceanic-atlantis-monk",
    title: "Oceanic Atlantis x Battle Monk",
    text: "Un monje guerrero de las profundidades cuya fuerza fluye como las mareas.",
  },
  {
    id: "haunted-cemetery-necromancer",
    title: "Haunted Cemetery x Necromancer",
    text: "Un invocador de almas que domina el poder oculto entre tumbas olvidadas.",
  },
  {
    id: "crystal-caverns-gladiator",
    title: "Crystal Caverns x Titan Gladiator",
    text: "Un gladiador colosal formado entre cristales ancestrales que resuenan con poder.",
  },
  {
    id: "royal-empire-viking",
    title: "Royal Empire x Viking Conqueror",
    text: "Un conquistador indomable que desafia imperios con espiritu feroz.",
  },
  {
    id: "mystic-sakura-paladin",
    title: "Mystic Sakura x Holy Paladin",
    text: "Un paladin bendecido por cerezos misticos cuya luz purifica toda oscuridad.",
  },
];

export const rankOptions = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Grandmaster",
  "Legendary",
  "Mythic",
  "Divine",
];

export const emptyAssets = {
  background: "",
  character: "",
  frame: "",
  glow: "",
  attributeIcon: "",
  rankIcon: "",
};
