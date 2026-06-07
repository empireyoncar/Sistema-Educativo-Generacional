import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GamerCard from '@/components/GamerCard';
import { useState } from 'react';
import { Copy, Download, RotateCcw } from 'lucide-react';

/**
 * Home Page - Gamer Card Generator
 * 
 * Design Philosophy: Dark Fantasy RPG Card
 * Premium interface with smooth interactions and professional layout
 */

interface CardData {
  nombre: string;
  id: string;
  rango: string;
  rareza: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine' | 'ancient' | 'transcendent';
  pais: string;
  stats: {
    fuerza: number;
    agilidad: number;
    vitalidad: number;
    inteligencia: number;
    sabiduria: number;
    atributo: number;
    carisma: number;
    experiencia: number;
  };
  habilidades: string[];
  backgroundImage: string;
  characterImage?: string;
}

const FONDOS = [
  { id: 'medieval-dark', nombre: 'Medieval Dark', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663584869584/VvHXAAwLj5ULHhRTPPcGsi/background-medieval-dark-56UjnGaYjVeJeGRw8Hzrad.webp' },
  { id: 'celestial-heaven', nombre: 'Celestial Heaven', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663584869584/VvHXAAwLj5ULHhRTPPcGsi/background-celestial-heaven-GPJ5igWNdhZsBb7AHS7mKo.webp' },
  { id: 'infernal-volcano', nombre: 'Infernal Volcano', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663584869584/VvHXAAwLj5ULHhRTPPcGsi/background-infernal-volcano-R7bE4Aodbj4eUnYrKRmwMK.webp' },
];

const PERSONAJES = [
  { id: 'shadow-assassin', nombre: 'Shadow Assassin', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663584869584/VvHXAAwLj5ULHhRTPPcGsi/character-shadow-assassin-Mv4gDsCmnsaHb7QKwXL8xh.webp' },
  { id: 'holy-paladin', nombre: 'Holy Paladin', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663584869584/VvHXAAwLj5ULHhRTPPcGsi/character-holy-paladin-6Y26ojZqHQSUSjC3D44HaP.webp' },
];

const RANGOS = [
  'Bronze 10k', 'Silver 20k', 'Gold 40k', 'Platinum 80k', 'Diamond 160k',
  'Master 320k', 'Grandmaster 500k', 'Legendary 1M', 'Mythic 2M', 'Divine 4M',
  'Shadow King', 'Dragon Emperor', 'Celestial Lord', 'Abyss Monarch', 'Infernal Titan',
];

const RAREZAS = ['common', 'rare', 'epic', 'legendary', 'mythic', 'divine', 'ancient', 'transcendent'] as const;

const HABILIDADES_PREDEFINIDAS = [
  'Suscriptor de la Comunidad Empireyoncar',
  'Maestro de Combate',
  'Defensa Mágica',
  'Ataque Crítico',
  'Regeneración',
  'Invisibilidad Temporal',
  'Escudo Divino',
  'Maldición Oscura',
];

const PAISES = ['España', 'México', 'Argentina', 'Colombia', 'Perú', 'Chile', 'Venezuela', 'Ecuador'];

export default function Home() {
  const [cardData, setCardData] = useState<CardData>({
    nombre: 'Sombra Nocturna',
    id: 'CARD-001',
    rango: 'Legendary 1M',
    rareza: 'legendary',
    pais: 'España',
    stats: {
      fuerza: 85,
      agilidad: 92,
      vitalidad: 78,
      inteligencia: 88,
      sabiduria: 75,
      atributo: 90,
      carisma: 82,
      experiencia: 95,
    },
    habilidades: [
      'Suscriptor de la Comunidad Empireyoncar',
      'Maestro de Combate',
      'Defensa Mágica',
      'Ataque Crítico',
    ],
    backgroundImage: FONDOS[0].url,
    characterImage: PERSONAJES[0].url,
  });

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith('stats.')) {
      const statName = field.split('.')[1];
      setCardData({
        ...cardData,
        stats: {
          ...cardData.stats,
          [statName]: typeof value === 'string' ? parseInt(value) : value,
        },
      });
    } else {
      setCardData({
        ...cardData,
        [field]: value,
      });
    }
  };

  const handleStatChange = (stat: keyof CardData['stats'], value: number) => {
    setCardData({
      ...cardData,
      stats: {
        ...cardData.stats,
        [stat]: Math.min(Math.max(value, 0), 100),
      },
    });
  };

  const exportJSON = () => {
    const json = JSON.stringify(cardData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarjeta-${cardData.id}.json`;
    a.click();
  };

  const resetToDefault = () => {
    setCardData({
      nombre: 'Sombra Nocturna',
      id: 'CARD-001',
      rango: 'Legendary 1M',
      rareza: 'legendary',
      pais: 'España',
      stats: {
        fuerza: 85,
        agilidad: 92,
        vitalidad: 78,
        inteligencia: 88,
        sabiduria: 75,
        atributo: 90,
        carisma: 82,
        experiencia: 95,
      },
      habilidades: [
        'Suscriptor de la Comunidad Empireyoncar',
        'Maestro de Combate',
        'Defensa Mágica',
        'Ataque Crítico',
      ],
      backgroundImage: FONDOS[0].url,
      characterImage: PERSONAJES[0].url,
    });
  };

  const copyJSON = () => {
    const json = JSON.stringify(cardData, null, 2);
    navigator.clipboard.writeText(json);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
      {/* Header */}
      <div className="border-b border-yellow-600/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-6">
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#d4af37', marginBottom: '4px' }}>
            🎮 Gamer Card Generator
          </h1>
          <p style={{ color: '#a0a0a0', fontSize: '14px' }}>
            Crea tarjetas RPG personalizadas con estadísticas, habilidades y diseño épico
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Card Preview - LEFT SIDE */}
          <div className="lg:col-span-1 flex flex-col items-center gap-6">
            {/* Card */}
            <GamerCard
              nombre={cardData.nombre}
              id={cardData.id}
              rango={cardData.rango}
              rareza={cardData.rareza}
              pais={cardData.pais}
              stats={cardData.stats}
              habilidades={cardData.habilidades}
              backgroundImage={cardData.backgroundImage}
              characterImage={cardData.characterImage}
            />

            {/* Quick Actions */}
            <div className="w-full flex flex-col gap-2">
              <Button
                onClick={exportJSON}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar JSON
              </Button>
              <Button
                onClick={copyJSON}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar JSON
              </Button>
            </div>
          </div>

          {/* Controls - RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-4">
            {/* Basic Info Section */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-yellow-600/20 rounded-lg p-5 backdrop-blur-sm hover:border-yellow-600/40 transition-colors">
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#d4af37', marginBottom: '14px' }}>
                ⚔️ Información Básica
              </h2>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="nombre" style={{ color: '#d4af37', fontWeight: 600, fontSize: '12px' }}>
                    NOMBRE DEL PERSONAJE
                  </Label>
                  <Input
                    id="nombre"
                    value={cardData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="bg-slate-800/50 border-yellow-600/30 text-white mt-1"
                    placeholder="Nombre del personaje"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="id" style={{ color: '#d4af37', fontWeight: 600, fontSize: '12px' }}>
                      ID
                    </Label>
                    <Input
                      id="id"
                      value={cardData.id}
                      onChange={(e) => handleInputChange('id', e.target.value)}
                      className="bg-slate-800/50 border-yellow-600/30 text-white mt-1"
                      placeholder="CARD-001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pais" style={{ color: '#d4af37', fontWeight: 600, fontSize: '12px' }}>
                      PAÍS
                    </Label>
                    <Select value={cardData.pais} onValueChange={(value) => handleInputChange('pais', value)}>
                      <SelectTrigger className="bg-slate-800/50 border-yellow-600/30 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-yellow-600/30">
                        {PAISES.map((pais) => (
                          <SelectItem key={pais} value={pais}>
                            {pais}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="rango" style={{ color: '#d4af37', fontWeight: 600, fontSize: '12px' }}>
                      RANGO
                    </Label>
                    <Select value={cardData.rango} onValueChange={(value) => handleInputChange('rango', value)}>
                      <SelectTrigger className="bg-slate-800/50 border-yellow-600/30 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-yellow-600/30 max-h-60">
                        {RANGOS.map((rango) => (
                          <SelectItem key={rango} value={rango}>
                            {rango}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rareza" style={{ color: '#d4af37', fontWeight: 600, fontSize: '12px' }}>
                      RAREZA
                    </Label>
                    <Select value={cardData.rareza} onValueChange={(value) => handleInputChange('rareza', value as any)}>
                      <SelectTrigger className="bg-slate-800/50 border-yellow-600/30 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-yellow-600/30">
                        {RAREZAS.map((rareza) => (
                          <SelectItem key={rareza} value={rareza}>
                            {rareza.charAt(0).toUpperCase() + rareza.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Design Section */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-yellow-600/20 rounded-lg p-5 backdrop-blur-sm hover:border-yellow-600/40 transition-colors">
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#d4af37', marginBottom: '14px' }}>
                🎨 Diseño Visual
              </h2>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="fondo" style={{ color: '#d4af37', fontWeight: 600, fontSize: '12px' }}>
                    FONDO
                  </Label>
                  <Select
                    value={cardData.backgroundImage}
                    onValueChange={(value) => handleInputChange('backgroundImage', value)}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-yellow-600/30 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-yellow-600/30">
                      {FONDOS.map((fondo) => (
                        <SelectItem key={fondo.id} value={fondo.url}>
                          {fondo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="personaje" style={{ color: '#d4af37', fontWeight: 600, fontSize: '12px' }}>
                    PERSONAJE
                  </Label>
                  <Select
                    value={cardData.characterImage || 'none'}
                    onValueChange={(value) => handleInputChange('characterImage', value === 'none' ? '' : value)}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-yellow-600/30 text-white mt-1">
                      <SelectValue placeholder="Seleccionar personaje" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-yellow-600/30">
                      <SelectItem value="none">Sin personaje</SelectItem>
                      {PERSONAJES.map((personaje) => (
                        <SelectItem key={personaje.id} value={personaje.url}>
                          {personaje.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-yellow-600/20 rounded-lg p-5 backdrop-blur-sm hover:border-yellow-600/40 transition-colors">
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#d4af37', marginBottom: '14px' }}>
                📊 Estadísticas
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(cardData.stats).map(([key, value]) => (
                  <div key={key}>
                    <Label
                      htmlFor={key}
                      style={{ color: '#d4af37', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}
                    >
                      {key === 'sabiduria' ? 'Sabiduría' : key === 'experiencia' ? 'Experiencia' : key.charAt(0).toUpperCase() + key.slice(1)}
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id={key}
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => handleStatChange(key as any, parseInt(e.target.value))}
                        className="flex-1 h-2"
                      />
                      <span style={{ color: '#d4af37', fontWeight: 700, minWidth: '28px', textAlign: 'right', fontSize: '12px' }}>
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abilities Section */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-yellow-600/20 rounded-lg p-5 backdrop-blur-sm hover:border-yellow-600/40 transition-colors">
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#d4af37', marginBottom: '14px' }}>
                ✨ Habilidades (máximo 3)
              </h2>
              <div className="space-y-2">
                {[0, 1, 2].map((index) => (
                  <div key={index}>
                    <Label
                      htmlFor={`habilidad-${index}`}
                      style={{ color: '#d4af37', fontWeight: 600, fontSize: '11px' }}
                    >
                      Habilidad {index + 1}
                    </Label>
                    <Select
                      value={cardData.habilidades[index] || ''}
                      onValueChange={(value) => {
                        const newHabilidades = [...cardData.habilidades];
                        newHabilidades[index] = value;
                        setCardData({
                          ...cardData,
                          habilidades: newHabilidades,
                        });
                      }}
                    >
                      <SelectTrigger className="bg-slate-800/50 border-yellow-600/30 text-white mt-1">
                        <SelectValue placeholder="Seleccionar habilidad" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-yellow-600/30">
                        {HABILIDADES_PREDEFINIDAS.map((habilidad) => (
                          <SelectItem key={habilidad} value={habilidad}>
                            {habilidad}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={resetToDefault}
                className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restaurar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-yellow-600/30 bg-black/50 backdrop-blur-sm mt-12">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#d4af37', marginBottom: '8px' }}>
                📋 Cómo Usar
              </h3>
              <p style={{ fontSize: '12px', color: '#a0a0a0', lineHeight: 1.6 }}>
                Personaliza todos los campos de la tarjeta, elige un fondo y personaje, ajusta las estadísticas y selecciona habilidades. La tarjeta se actualiza en tiempo real.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#d4af37', marginBottom: '8px' }}>
                🎨 Combinaciones
              </h3>
              <p style={{ fontSize: '12px', color: '#a0a0a0', lineHeight: 1.6 }}>
                Hay múltiples combinaciones de fondos, personajes, rangos y rarezas. ¡Experimenta para crear tarjetas únicas!
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#d4af37', marginBottom: '8px' }}>
                💾 Exportar
              </h3>
              <p style={{ fontSize: '12px', color: '#a0a0a0', lineHeight: 1.6 }}>
                Exporta tu tarjeta como JSON para guardarla o compartirla. Puedes importarla después para seguir editando.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
