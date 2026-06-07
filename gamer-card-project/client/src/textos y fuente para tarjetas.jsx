import React, { useState } from "react";

const textStyles = [
  { id: "legendary", name: "Fantasy Legendary", title: "ANCIENT RELIC", subtitle: "Rango, rareza y título principal", className: "style-legendary" },
  { id: "shadow", name: "Shadow Void", title: "VOID MONARCH", subtitle: "Oscuridad, abismo, asesino", className: "style-shadow" },
  { id: "relic", name: "Ancient Relic", title: "SACRED ARCHIVE", subtitle: "Pergamino, historia, reliquia", className: "style-relic" },
  { id: "arcane", name: "Arcane Magic", title: "ARCANE EMPEROR", subtitle: "Magos, runas, energía mística", className: "style-arcane" },
  { id: "cyber", name: "Cyber Fantasy", title: "NEURAL OVERDRIVE", subtitle: "Gamer, futurista, tecnología", className: "style-cyber" },
  { id: "divine", name: "Divine Paladin", title: "HOLY PALADIN", subtitle: "Luz, paladín, cartas sagradas", className: "style-divine" },
  { id: "infernal", name: "Infernal Flame", title: "HELLFIRE TITAN", subtitle: "Fuego, demonio, berserker", className: "style-infernal" },
  { id: "ice", name: "Frozen Crystal", title: "FROST QUEEN", subtitle: "Hielo, cristal, magia fría", className: "style-ice" },
  { id: "emerald", name: "Emerald Spirit", title: "FOREST GUARDIAN", subtitle: "Naturaleza, vida, druida", className: "style-emerald" },
  { id: "blood", name: "Blood Moon", title: "BLOOD KNIGHT", subtitle: "Sangre, vampiro, luna roja", className: "style-blood" },
  { id: "royal", name: "Royal Emperor", title: "EMPEROR RANK", subtitle: "Imperio, nobleza, autoridad", className: "style-royal" },
  { id: "dragon", name: "Dragon Fire", title: "DRAGON SLAYER", subtitle: "Dragones, fuego, cazador", className: "style-dragon" },
  { id: "celestial", name: "Celestial Heaven", title: "CELESTIAL LORD", subtitle: "Cielo, estrellas, divinidad", className: "style-celestial" },
  { id: "cosmic", name: "Cosmic Galaxy", title: "GALAXY WARRIOR", subtitle: "Espacio, cosmos, energía", className: "style-cosmic" },
  { id: "samurai", name: "Samurai Ink", title: "RONIN MASTER", subtitle: "Samurai, tinta, honor", className: "style-samurai" },
  { id: "viking", name: "Viking Rune", title: "VIKING KING", subtitle: "Runas, hielo, conquista", className: "style-viking" },
  { id: "necromancer", name: "Necromancer", title: "SOUL REAPER", subtitle: "Muerte, almas, oscuridad verde", className: "style-necromancer" },
  { id: "phoenix", name: "Phoenix Soul", title: "PHOENIX SOUL", subtitle: "Renacer, fuego dorado, vida", className: "style-phoenix" },
  { id: "ocean", name: "Ocean Atlantis", title: "ATLANTIS KING", subtitle: "Agua, océano, reino perdido", className: "style-ocean" },
  { id: "mythic", name: "Mythic Neon", title: "MYTHIC LEGEND", subtitle: "Moderno, viral, redes sociales", className: "style-mythic" },
];

export default function VistaPreviaTextosFantasyReact() {
  const [selected, setSelected] = useState(textStyles[0]);
  const [customText, setCustomText] = useState("DRAGON SLAYER");

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#2b1a08,#050505_70%)] text-white p-6">
      <section className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="page-title">Vista previa de textos RPG</h1>
          <p className="text-white/60 mt-2">
            Elige un estilo y mira cómo se vería dentro de una carta fantasy.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <section className="preview-card">
            <div className="preview-bg" />
            <div className="preview-frame" />

            <div className="preview-content">
              <div className={`preview-title ${selected.className}`}>
                {customText || selected.title}
              </div>

              <div className="preview-subtitle">GAMER CARD</div>

              <div className="mock-character">⚔️</div>

              <div className="mock-panel">
                <p className={selected.className}>Luisa Martinez</p>
                <span>RANGO: Divine Legendary</span>
              </div>

              <div className="mock-stats">
                <div><span>Fuerza</span><strong>3,412,312</strong></div>
                <div><span>Atributo</span><strong>Darkness</strong></div>
              </div>
            </div>
          </section>

          <aside className="controls">
            <label className="field">
              Texto personalizado
              <input value={customText} onChange={(e) => setCustomText(e.target.value)} />
            </label>

            <h2>Estilos disponibles</h2>
            <div className="style-list">
              {textStyles.map((style) => (
                <button
                  key={style.id}
                  className={selected.id === style.id ? "active" : ""}
                  onClick={() => setSelected(style)}
                  type="button"
                >
                  <strong className={style.className}>{style.name}</strong>
                  <span>{style.subtitle}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <style>{css}</style>
    </main>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Cormorant+Garamond:wght@600;700&family=Orbitron:wght@600;800&family=Uncial+Antiqua&display=swap');

.page-title {
  font-family: 'Cinzel', serif;
  color: #ffe7a6;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.preview-card {
  position: relative;
  min-height: 720px;
  border-radius: 34px;
  overflow: hidden;
  border: 5px solid #d6a83b;
  box-shadow: 0 0 40px rgba(255,215,100,.35);
  background: black;
}

.preview-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 18%, rgba(255,245,180,.85), transparent 25%),
    radial-gradient(circle at 50% 42%, rgba(48,188,255,.28), transparent 35%),
    linear-gradient(180deg, #714d12, #0b0710 70%);
}

.preview-frame {
  position: absolute;
  inset: 18px;
  border-radius: 24px;
  border: 2px solid rgba(255,230,140,.55);
  box-shadow: inset 0 0 30px rgba(255,215,100,.18);
}

.preview-content {
  position: relative;
  z-index: 2;
  height: 720px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-title {
  margin-top: 28px;
  text-align: center;
  font-size: 42px;
  line-height: 1;
  max-width: 100%;
  word-break: break-word;
}

.preview-subtitle {
  margin-top: 10px;
  font-family: 'Cinzel', serif;
  letter-spacing: .28em;
  color: #ffe7a6;
  text-shadow: 0 0 12px rgba(255,215,100,.65);
}

.mock-character {
  margin-top: 110px;
  width: 210px;
  height: 250px;
  border-radius: 50% 50% 12px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  background: radial-gradient(circle, rgba(255,255,255,.25), rgba(0,0,0,.25));
  border: 1px solid rgba(255,230,140,.35);
  box-shadow: 0 0 45px rgba(255,215,100,.35);
}

.mock-panel {
  width: 100%;
  margin-top: auto;
  padding: 14px;
  border-radius: 18px;
  background: rgba(0,0,0,.62);
  border: 1px solid rgba(255,215,100,.45);
  backdrop-filter: blur(6px);
}

.mock-panel p {
  margin: 0;
  font-size: 28px;
}

.mock-panel span {
  color: rgba(255,255,255,.72);
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
}

.mock-stats {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
}

.mock-stats div {
  padding: 12px;
  border-radius: 14px;
  background: rgba(0,0,0,.62);
  border: 1px solid rgba(255,215,100,.35);
  font-family: 'Cormorant Garamond', serif;
}

.mock-stats span {
  display: block;
  color: #ffd76a;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: .12em;
}

.mock-stats strong {
  font-size: 20px;
}

.controls {
  border-radius: 28px;
  padding: 22px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(10px);
}

.controls h2 {
  color: #ffe7a6;
  font-family: 'Cinzel', serif;
  font-size: 20px;
  margin: 18px 0 12px;
}

.field {
  display: block;
  color: #ffe7a6;
  font-family: system-ui, sans-serif;
  font-size: 14px;
}

.field input {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.16);
  background: #111019;
  color: white;
}

.style-list {
  display: grid;
  gap: 10px;
}

.style-list button {
  text-align: left;
  padding: 13px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.32);
  color: white;
  cursor: pointer;
}

.style-list button.active {
  border-color: #ffd76a;
  box-shadow: 0 0 18px rgba(255,215,100,.25);
}

.style-list strong {
  display: block;
  font-size: 18px;
}

.style-list span {
  display: block;
  color: rgba(255,255,255,.62);
  font-size: 13px;
  margin-top: 4px;
}

.style-legendary {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #f6d365;
  text-shadow: 0 0 6px rgba(246,211,101,.8), 0 0 18px rgba(246,211,101,.55);
}

.style-shadow {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #c4b5fd;
  text-shadow: 0 0 10px rgba(124,58,237,.85), 0 0 24px rgba(124,58,237,.5);
}

.style-relic {
  font-family: 'Uncial Antiqua', serif;
  color: #f8e7b5;
  text-shadow: 2px 2px 0 #3b2c15, 0 0 12px rgba(255,240,180,.35);
}

.style-arcane {
  font-family: 'Cinzel', serif;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #e9d5ff;
  text-shadow: 0 0 12px rgba(217,70,239,.75), 0 0 26px rgba(217,70,239,.4);
}

.style-cyber {
  font-family: 'Orbitron', sans-serif;
  font-weight: 800;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #00f0ff;
  text-shadow: 0 0 6px rgba(0,240,255,.95), 0 0 18px rgba(0,240,255,.55);
}

.style-divine {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .13em;
  text-transform: uppercase;
  color: #fff1a8;
  text-shadow: 0 0 8px rgba(255,255,210,.9), 0 0 22px rgba(255,215,100,.6);
}

.style-infernal {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #ff6b35;
  text-shadow: 0 0 8px rgba(255,80,20,.95), 0 0 22px rgba(255,20,0,.55);
}

.style-ice {
  font-family: 'Cinzel', serif;
  font-weight: 800;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: #bff7ff;
  text-shadow: 0 0 8px rgba(125,211,252,.9), 0 0 22px rgba(14,165,233,.55);
}

.style-emerald {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #86efac;
  text-shadow: 0 0 8px rgba(34,197,94,.85), 0 0 20px rgba(22,163,74,.5);
}

.style-blood {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #fb7185;
  text-shadow: 0 0 8px rgba(225,29,72,.9), 0 0 22px rgba(136,19,55,.6);
}

.style-royal {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #ffd700;
  text-shadow: 1px 1px 0 #5e4300, 0 0 18px rgba(255,215,0,.7);
}

.style-dragon {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #ffb347;
  text-shadow: 0 0 8px rgba(255,120,20,.95), 0 0 26px rgba(255,60,0,.5);
}

.style-celestial {
  font-family: 'Cinzel', serif;
  font-weight: 800;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #e0e7ff;
  text-shadow: 0 0 8px rgba(199,210,254,.95), 0 0 24px rgba(129,140,248,.55);
}

.style-cosmic {
  font-family: 'Orbitron', sans-serif;
  font-weight: 800;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #a5b4fc;
  text-shadow: 0 0 8px rgba(99,102,241,.95), 0 0 26px rgba(168,85,247,.5);
}

.style-samurai {
  font-family: 'Uncial Antiqua', serif;
  letter-spacing: .08em;
  color: #f8fafc;
  text-shadow: 3px 3px 0 #7f1d1d, 0 0 12px rgba(255,255,255,.25);
}

.style-viking {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #d6d3d1;
  text-shadow: 2px 2px 0 #292524, 0 0 18px rgba(214,211,209,.35);
}

.style-necromancer {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #bef264;
  text-shadow: 0 0 8px rgba(132,204,22,.9), 0 0 24px rgba(21,128,61,.6);
}

.style-phoenix {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #fde68a;
  text-shadow: 0 0 8px rgba(251,191,36,.9), 0 0 26px rgba(249,115,22,.6);
}

.style-ocean {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  letter-spacing: .13em;
  text-transform: uppercase;
  color: #67e8f9;
  text-shadow: 0 0 8px rgba(6,182,212,.9), 0 0 24px rgba(8,145,178,.55);
}

.style-mythic {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  letter-spacing: .18em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ffd700, #ff4fd8, #00f0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 18px rgba(255,79,216,.4);
}
`;
