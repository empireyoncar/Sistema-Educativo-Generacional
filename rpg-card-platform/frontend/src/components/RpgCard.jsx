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

  return (
    <article className="rpg-card">
      {background && <img src={background} alt="" className="community-card-bg" />}
      {glow && <img src={glow} alt="" className="community-card-glow" />}
      {character && <img src={character} alt="" className="community-card-character" />}
      {frame && <img src={frame} alt="" className="community-card-frame" />}

      <div className="community-card-content">
        <div className="community-card-title">EMPIREYONCAR</div>
        <div className="card-rank">
          {rankIcon && <img src={rankIcon} alt="" />}
          <span>{card.rarity}</span>
        </div>

        <header>
          <p>{card.attribute}</p>
          <h2>{card.name}</h2>
          <span>{card.country}</span>
        </header>

        <section className="lore">{card.lore}</section>

        <section className="meta-grid">
          <span>Nivel</span><strong>{card.level}</strong>
          <span>XP</span><strong>{card.experience}</strong>
          <span>Atributo</span>
          <strong className="attribute-cell">
            {attributeIcon && <img src={attributeIcon} alt="" />}
            {card.attribute}
          </strong>
        </section>

        <section>
          <h3>Estadisticas</h3>
          <div className="stats-grid">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="stat">
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3>Habilidades</h3>
          <div className="skills">
            {skills.length ? skills.map((skill) => <span key={skill}>{skill}</span>) : <span>Sin habilidades registradas</span>}
          </div>
        </section>
      </div>
    </article>
  );
}
