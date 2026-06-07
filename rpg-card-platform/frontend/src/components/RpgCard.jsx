export function RpgCard({ card }) {
  if (!card) return null;

  const stats = card.stats || {};
  const skills = card.skills || [];

  return (
    <article className="rpg-card">
      <div className="card-rank">{card.rarity}</div>
      <header>
        <p>{card.background} x {card.character}</p>
        <h2>{card.name}</h2>
        <span>{card.country}</span>
      </header>

      <section className="lore">{card.lore}</section>

      <section className="meta-grid">
        <span>Hash</span><strong>{card.card_hash?.slice(0, 16)}...</strong>
        <span>Nivel</span><strong>{card.level}</strong>
        <span>XP</span><strong>{card.experience}</strong>
        <span>Atributo</span><strong>{card.attribute}</strong>
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
          {skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>
    </article>
  );
}
