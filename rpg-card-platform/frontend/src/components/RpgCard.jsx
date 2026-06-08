import { BookOpen, Brain, Dumbbell, HeartPulse, Sparkles, Wind } from "lucide-react";

const statConfig = [
  ["fuerza", "Fuerza", Dumbbell],
  ["agilidad", "Agilidad", Wind],
  ["vitalidad", "Vitalidad", HeartPulse],
  ["inteligencia", "Inteligencia", Brain],
  ["sabiduria", "Sabiduria", BookOpen],
  ["carisma", "Carisma", Sparkles],
];

export function RpgCard({ card }) {
  if (!card) return null;

  const stats = card.stats || {};
  const skills = card.skills || [];
  const assets = card.visual_assets || {};
  const background = assets.background || card.background;
  const character = assets.character || card.character;
  const frame = assets.frame || card.frame;
  const glow = assets.glow;
  const attributeIcon = assets.attributeIcon;
  const rankIcon = assets.rankIcon;
  const rank = card.rank || card.rarity || "Bronze";
  const xp = Number(card.experience || 0);
  const xpPercent = Math.max(6, Math.min(100, xp));

  return (
    <article className="rpg-card constructor-card-look">
      <span className="rpg-corner-mark top-left" />
      <span className="rpg-corner-mark top-right" />
      <span className="rpg-corner-mark bottom-left" />
      <span className="rpg-corner-mark bottom-right" />

      {background && <img src={background} alt="" className="community-card-bg" />}
      <div className="community-card-vignette" />
      <div className="community-card-aura" />
      <div className="community-card-rune-ring" />
      {character && <img src={character} alt="" className="community-card-character" />}
      <div className="community-card-character-glow" />
      {glow && <img src={glow} alt="" className="community-card-glow" />}
      {frame && <img src={frame} alt="" className="community-card-frame" />}
      <div className="community-card-shine" />

      <div className="community-card-grid">
        <section className="card-zone-title">
          <h1>{card.combination_snapshot?.modelText?.name || "EMPIREYONCAR"}</h1>
          <p>{card.combination_snapshot?.modelText?.tagline || "Comunidad legendaria"}</p>
        </section>

        <section className="card-zone-identity">
          <div className="ornament-line" />
          <Field label="Nombre" value={card.name} highlight />
          <Field label="ID" value={String(card.card_hash || "").slice(0, 12)} />
          <Field label="Pais" value={card.country || ""} flag />
          <Field label="Rareza" value={card.rarity || ""} glow />
          <Field label="Lore" value={card.lore || ""} longText />
          <div className="ornament-line" />
        </section>

        <section className="card-zone-xp">
          <div className="xp-header">
            <span>Experiencia</span>
            <strong>{xp}</strong>
          </div>
          <div className="xp-bar" style={{ "--xp": `${xpPercent}%` }}>
            <span />
          </div>
          <div className="xp-meta">
            <span>Nivel {card.level || 1}</span>
          </div>
        </section>

        <section className="card-zone-attribute">
          <div className="attribute-orb">
            {attributeIcon && <img src={attributeIcon} alt="" />}
            <div className="attribute-orb-label">
              <p>Atributo</p>
              <strong>{card.attribute || ""}</strong>
            </div>
          </div>
        </section>

        <section className="card-zone-rank-shield">
          <div className="rank-shield-orb">
            {rankIcon && <img src={rankIcon} alt="" />}
            <strong>{rank}</strong>
          </div>
        </section>

        <section className="card-zone-stats">
          <h2>Estadisticas</h2>
          {statConfig.map(([key, label, Icon]) => (
            <MiniStat key={key} label={label} value={stats[key] ?? 0} Icon={Icon} />
          ))}
        </section>

        <section className="card-zone-skills">
          <p>Habilidades</p>
          <div className="skills-grid">
            {skills.length ? skills.slice(0, 4).map((skill, index) => <span key={`${skill}-${index}`}>* {skill}</span>) : <span>Sin habilidades</span>}
          </div>
        </section>

        <footer className="card-zone-footer">EMPIREYONCAR comunidad legendaria</footer>
      </div>
    </article>
  );
}

function Field({ label, value, highlight = false, flag = false, glow = false, longText = false }) {
  return (
    <div className={`identity-field ${longText ? "identity-field-lore" : ""}`}>
      <span>{label}</span>
      <strong className={`${highlight ? "identity-highlight" : ""} ${glow ? "rarity-glow-text" : ""} ${longText ? "identity-lore-text" : ""}`}>
        {flag && <i className="country-flag" />}
        {value || "-"}
      </strong>
    </div>
  );
}

function MiniStat({ label, value, Icon }) {
  const statValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div className="rpg-stat" style={{ "--stat-percent": `${Math.max(8, statValue)}%` }}>
      <p>
        <span className="stat-icon-frame">
          <Icon aria-hidden="true" />
        </span>
        <span>{label}</span>
      </p>
      <strong>{statValue}</strong>
      <div className="stat-power-bar">
        <span />
      </div>
    </div>
  );
}
