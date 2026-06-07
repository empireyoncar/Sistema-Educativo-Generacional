import React, { useMemo } from 'react';

/**
 * GamerCard Component - EPIC VERSION
 * 
 * Design Philosophy: Dark Fantasy RPG Card - Premium Edition
 * - Maximized image prominence with sophisticated layering
 * - Ornate decorative elements with dynamic effects
 * - Premium card game aesthetics (Magic: The Gathering, Hearthstone)
 * - Smooth animations and micro-interactions
 */

interface CardStats {
  fuerza: number;
  agilidad: number;
  vitalidad: number;
  inteligencia: number;
  sabiduria: number;
  atributo: number;
  carisma: number;
  experiencia: number;
}

interface GamerCardProps {
  nombre: string;
  id: string;
  rango: string;
  rareza: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine' | 'ancient' | 'transcendent';
  pais: string;
  stats: CardStats;
  habilidades: string[];
  backgroundImage: string;
  characterImage?: string;
}

const GamerCard: React.FC<GamerCardProps> = ({
  nombre,
  id,
  rango,
  rareza,
  pais,
  stats,
  habilidades,
  backgroundImage,
  characterImage,
}) => {
  const maxStatValue = 100;
  const getBarWidth = (value: number) => Math.min((value / maxStatValue) * 100, 100);

  const rarezaColors: Record<string, { primary: string; glow: string; text: string }> = {
    common: { primary: '#888888', glow: '#88888844', text: '#ffffff' },
    rare: { primary: '#4169e1', glow: '#4169e144', text: '#ffffff' },
    epic: { primary: '#9932cc', glow: '#9932cc44', text: '#ffffff' },
    legendary: { primary: '#d4af37', glow: '#d4af3744', text: '#000000' },
    mythic: { primary: '#ff1493', glow: '#ff149344', text: '#ffffff' },
    divine: { primary: '#ffd700', glow: '#ffd70044', text: '#000000' },
    ancient: { primary: '#8b4513', glow: '#8b451344', text: '#ffffff' },
    transcendent: { primary: '#00ffff', glow: '#00ffff44', text: '#000000' },
  };

  const rarezaStyle = rarezaColors[rareza] || rarezaColors.legendary;

  const statsList = useMemo(
    () => [
      { label: 'STR', value: stats.fuerza, width: getBarWidth(stats.fuerza) },
      { label: 'AGI', value: stats.agilidad, width: getBarWidth(stats.agilidad) },
      { label: 'VIT', value: stats.vitalidad, width: getBarWidth(stats.vitalidad) },
      { label: 'INT', value: stats.inteligencia, width: getBarWidth(stats.inteligencia) },
      { label: 'WIS', value: stats.sabiduria, width: getBarWidth(stats.sabiduria) },
      { label: 'ATR', value: stats.atributo, width: getBarWidth(stats.atributo) },
      { label: 'CHA', value: stats.carisma, width: getBarWidth(stats.carisma) },
      { label: 'EXP', value: stats.experiencia, width: getBarWidth(stats.experiencia) },
    ],
    [stats]
  );

  return (
    <div className="epic-gamer-card" style={{ '--rarity-primary': rarezaStyle.primary, '--rarity-glow': rarezaStyle.glow, '--rarity-text': rarezaStyle.text } as React.CSSProperties}>
      {/* Background Layer */}
      <div className="card-bg-layer" />

      {/* Image Section - PREMIUM */}
      <div className="card-image-section">
        <div
          className="card-image-bg"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />

        {/* Character Image Overlay */}
        {characterImage && (
          <div
            className="card-character-overlay"
            style={{
              backgroundImage: `url('${characterImage}')`,
            }}
          />
        )}

        {/* Image Gradient Overlays */}
        <div className="image-gradient-top" />
        <div className="image-gradient-bottom" />

        {/* Decorative Corner Elements */}
        <div className="corner-decoration top-left">
          <svg viewBox="0 0 60 60" className="corner-svg">
            <path d="M 10 10 L 50 10 L 50 20 M 10 10 L 10 50 L 20 50" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="corner-decoration top-right">
          <svg viewBox="0 0 60 60" className="corner-svg">
            <path d="M 50 10 L 10 10 L 10 20 M 50 10 L 50 50 L 40 50" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Rarity Badge - PREMIUM */}
        <div className="rarity-badge" style={{ backgroundColor: rarezaStyle.primary, color: rarezaStyle.text }}>
          <div className="rarity-badge-inner">
            <span className="rarity-label">{rareza.toUpperCase()}</span>
            <div className="rarity-star">✦</div>
          </div>
        </div>

        {/* Title Overlay on Image */}
        <div className="image-title-section">
          <h1 className="card-name">{nombre}</h1>
          <div className="card-meta">
            <span className="meta-item">ID: {id}</span>
            <span className="meta-divider">•</span>
            <span className="meta-item">{pais}</span>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="shine-effect" />
      </div>

      {/* Stats Section - COMPACT & PREMIUM */}
      <div className="card-stats-section">
        <div className="stats-grid">
          {statsList.map((stat, index) => (
            <div key={index} className="stat-compact">
              <div className="stat-label-compact">{stat.label}</div>
              <div className="stat-bar-compact">
                <div
                  className="stat-bar-fill-compact"
                  style={{ width: `${stat.width}%` }}
                />
              </div>
              <div className="stat-value-compact">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Abilities Section - PREMIUM */}
      <div className="card-abilities-section">
        <div className="abilities-header">
          <span className="abilities-title">HABILIDADES</span>
          <div className="abilities-divider" />
        </div>
        <div className="abilities-list-compact">
          {habilidades.slice(0, 3).map((habilidad, index) => (
            <div key={index} className="ability-compact">
              <span className="ability-icon">◆</span>
              <span className="ability-text">{habilidad}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rango Badge Bottom */}
      <div className="rango-badge-bottom">
        <span className="rango-text">{rango}</span>
      </div>

      {/* Decorative Bottom Elements */}
      <div className="corner-decoration bottom-left">
        <svg viewBox="0 0 60 60" className="corner-svg">
          <path d="M 10 50 L 50 50 L 50 40 M 10 50 L 10 10 L 20 10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="corner-decoration bottom-right">
        <svg viewBox="0 0 60 60" className="corner-svg">
          <path d="M 50 50 L 10 50 L 10 40 M 50 50 L 50 10 L 40 10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Glow Effect */}
      <div className="card-glow" />
    </div>
  );
};

export default GamerCard;
