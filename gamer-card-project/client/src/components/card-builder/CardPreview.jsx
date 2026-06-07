import { useEffect, useMemo, useState } from "react";
import { BookOpen, Brain, Dumbbell, HeartPulse, Sparkles, Wind } from "lucide-react";

const statIcons = {
  Fuerza: Dumbbell,
  Agilidad: Wind,
  Vitalidad: HeartPulse,
  Inteligencia: Brain,
  Sabiduria: BookOpen,
  Carisma: Sparkles,
};

export function CardPreview({ assets, card, selectedModel, template, textStyle }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      className={`cinematic-card-preview card-motion relative w-[min(92vw,calc(100vh*0.62),640px)] aspect-[43/76] overflow-hidden ${template.shadow} bg-black`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{
        "--tilt-x": `${tilt.x}`,
        "--tilt-y": `${tilt.y}`,
      }}
    >
      <span className="rpg-corner-mark left-3 top-3 border-l-2 border-t-2 z-[58]" />
      <span className="rpg-corner-mark right-3 top-3 border-r-2 border-t-2 z-[58]" />
      <span className="rpg-corner-mark bottom-3 left-3 border-b-2 border-l-2 z-[58]" />
      <span className="rpg-corner-mark bottom-3 right-3 border-b-2 border-r-2 z-[58]" />

      {assets.background ? (
        <img src={assets.background} alt="Fondo" className="card-background-layer card-parallax-bg object-cover" />
      ) : (
        <div className={`card-background-layer card-parallax-bg ${template.background}`} />
      )}

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_30%,rgba(255,245,190,.2),transparent_34%),linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.5)_72%,rgba(0,0,0,.92))] pointer-events-none" />
      <div className={`absolute inset-0 ${template.aura} animate-pulse z-10 pointer-events-none`} />
      <div className="absolute left-1/2 top-[32%] z-10 h-[40%] w-[72%] -translate-x-1/2 rounded-full border border-yellow-200/20 bg-[radial-gradient(circle,rgba(255,224,130,.28),transparent_62%)] shadow-[0_0_90px_rgba(246,211,101,.28)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:46px_46px] opacity-20 z-10" />
      <div className="absolute inset-5 z-[11] rounded-[24px] border border-yellow-200/25 shadow-[inset_0_0_38px_rgba(246,211,101,.12)] pointer-events-none" />
      <div className="rune-ring absolute left-1/2 top-[33%] z-[12] h-[48%] w-[84%] -translate-x-1/2 rounded-full border border-yellow-200/20 pointer-events-none" />
      <span className="ember ember-a" />
      <span className="ember ember-b" />
      <span className="ember ember-c" />
      <span className="ember ember-d" />

      {assets.character ? (
        <img src={assets.character} alt="Personaje" className="card-parallax-character absolute top-[15%] w-[70%] h-[52%] object-contain object-center drop-shadow-[0_0_34px_rgba(255,220,120,.92)] z-30" />
      ) : (
        <div className="card-parallax-character absolute top-[18%] z-30 flex h-[36%] w-[54%] items-center justify-center rounded-full border border-yellow-200/25 bg-black/25 text-8xl font-black text-white/80 shadow-[0_0_65px_rgba(246,211,101,.32)]">
          {selectedModel.icon}
        </div>
      )}

      <div className="absolute left-1/2 top-[16%] z-[21] h-[50%] w-[78%] -translate-x-1/2 bg-[radial-gradient(circle,rgba(255,228,155,.24),transparent_58%)] blur-xl pointer-events-none" />
      {assets.glow && <img src={assets.glow} alt="Brillo" className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80 pointer-events-none z-30" />}
      {assets.frame && <img src={assets.frame} alt="Marco" className="card-parallax-frame absolute inset-0 w-full h-full object-fill pointer-events-none z-40" />}

      <div className="absolute -left-40 top-0 w-24 h-full bg-white/30 blur-xl rotate-12 animate-[shine_5s_ease-in-out_infinite] z-[80] pointer-events-none" />

      <CardGrid assets={assets} card={card} selectedModel={selectedModel} template={template} textStyle={textStyle} />
    </section>
  );
}

function CardGrid({ assets, card, selectedModel, template, textStyle }) {
  return (
    <div className="card-grid-ui">
      <section className="card-zone-title">
        <h1 className={`card-title-text ${textStyle.className}`}>{selectedModel.name}</h1>
        <p className={`card-subtitle-text ${template.label}`}>{selectedModel.tagline}</p>
      </section>

      <div className="card-zone-attribute">
        <div className="attribute-orb">
          {assets.attributeIcon ? <img src={assets.attributeIcon} alt="" className="absolute inset-0 h-full w-full rounded-full object-cover" /> : <span className="rank-gem" />}
          <div className="attribute-orb-label">
            <p className={`font-rpg-ui text-[9px] uppercase ${template.label}`}>Atributo</p>
            <strong className="attribute-orb-text">{card.attribute}</strong>
          </div>
        </div>
      </div>

      <section className="card-zone-identity">
        <div className="rpg-ornament-line mb-2" />
        <FieldLine template={template} label="Nombre" value={card.name} highlight className={textStyle.className} multiline />
        <FieldLine template={template} label="ID" value={card.id} />
        <FieldLine template={template} label="Pais" value={card.country} flag />
        <FieldLine template={template} label="Rareza" value={card.rarity} />
      <FieldLine template={template} label="Lore" value={card.genre} longText />
        <div className="rpg-ornament-line mt-2" />
      </section>

      <section className="card-zone-xp">
        <div className="xp-header">
          <span>Experiencia</span>
          <strong>{card.xp}</strong>
        </div>
        <div className="xp-bar">
          <span />
        </div>
        <div className="xp-meta">
          <span className="xp-level">Nivel {card.level}</span>
        </div>
      </section>

      <div className="card-zone-rank-shield">
        <div className="rank-shield-orb">
          {assets.rankIcon ? <img src={assets.rankIcon} alt="" className="rank-shield-img" /> : <span className="rank-gem" />}
          <strong>{card.rank}</strong>
        </div>
      </div>

      <section className="card-zone-stats">
        <h2 className="card-zone-stats-title">Estadisticas</h2>
        <MiniStat template={template} label="Fuerza" value={card.strength} index={0} />
        <MiniStat template={template} label="Agilidad" value={card.agility} index={1} />
        <MiniStat template={template} label="Vitalidad" value={card.vitality} index={2} />
        <MiniStat template={template} label="Inteligencia" value={card.intelligence} index={3} />
        <MiniStat template={template} label="Sabiduria" value={card.wisdom} index={4} />
        <MiniStat template={template} label="Carisma" value={card.charisma} index={5} />
      </section>

      <section className="card-zone-skills">
        <p className={`font-rpg-ui text-[11px] uppercase tracking-[.18em] ${template.label}`}>Habilidades</p>
        <div className="skills-grid">
          {card.skills.map((skill, i) => (
            <span key={i} className="skill-rune-panel">
              <span className="text-yellow-200/80">*</span>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <footer className="card-zone-footer">
        <span>EMPIREYONCAR comunidad legendaria</span>
      </footer>
    </div>
  );
}

function FieldLine({ template, label, value, highlight = false, className = "", flag = false, multiline = false, longText = false }) {
  const displayValue = multiline ? String(value).split(" ") : [value];
  const fieldKey = label.toLowerCase();

  return (
    <div className={`field-line identity-field identity-field-${fieldKey} ${longText ? "field-line-lore" : ""}`}>
      <span className={`field-label ${template.label}`}>{label}:</span>
      <strong className={highlight ? `field-value-highlight ${className}` : `field-value ${longText ? "field-value-lore" : ""} ${fieldKey === "rareza" ? "rarity-glow-text" : ""} ${fieldKey === "lore" ? "lore-typewriter" : ""}`}>
        {flag && <span className="country-flag" />}
        {displayValue.map((part, index) => (
          <span key={`${part}-${index}`}>{part}</span>
        ))}
      </strong>
    </div>
  );
}

function MiniStat({ template, label, value, index }) {
  const Icon = statIcons[label] ?? Sparkles;
  const targetValue = useMemo(() => {
    const parsed = Number.parseInt(String(value).replace(/\D/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [value]);
  const [displayValue, setDisplayValue] = useState(0);
  const statPercent = Math.min(100, Math.max(8, targetValue));
  const delay = `${index * 120}ms`;

  useEffect(() => {
    let frameId;
    const duration = 1100;
    const delayMs = index * 120;
    const startAt = performance.now() + delayMs;

    const tick = (now) => {
      if (now < startAt) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - startAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(targetValue * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    setDisplayValue(0);
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [index, targetValue]);

  return (
    <div className="rpg-stat stat-card-animated min-w-0 rounded px-2 py-1" style={{ "--stat-delay": delay, "--stat-percent": `${statPercent}%` }}>
      <p className={`stat-label-small font-rpg-subtitle leading-none ${template.label}`}>
        <span className="stat-icon-frame">
          <Icon className="stat-icon" aria-hidden="true" />
        </span>
        <span>{label}</span>
      </p>
      <strong className="stat-count stat-value-small font-rpg-number mt-1 block truncate leading-none text-white">{displayValue}</strong>
      <div className="stat-power-bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
