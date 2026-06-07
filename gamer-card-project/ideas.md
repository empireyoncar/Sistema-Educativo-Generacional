# 🎮 Gamer Card Generator - Conceptos de Diseño

## Concepto Seleccionado: **Dark Fantasy RPG Card**

### Design Movement
**Neogothic Digital Fantasy** - Inspirado en cartas coleccionables de juegos como Magic: The Gathering, Hearthstone y Yu-Gi-Oh, combinado con estética cyberpunk oscura y elementos fantásticos ornamentados.

### Core Principles
1. **Contraste Dramático**: Fondos oscuros con acentos dorados/plateados para crear profundidad y jerarquía visual
2. **Ornamentación Funcional**: Marcos decorativos que enmarcan información sin saturar
3. **Legibilidad Prioritaria**: Texto claro y bien jerarquizado sobre fondos oscuros
4. **Movimiento Cautivador**: Animaciones sutiles que reflejan la "magia" de la tarjeta

### Color Philosophy
- **Paleta Principal**: Negro profundo (#0a0a0a) + Oro (#d4af37) + Plata (#c0c0c0)
- **Acentos**: Púrpura oscuro (#2d1b4e) para rareza épica, Rojo (#c41e3a) para poder
- **Razonamiento**: Los colores oscuros evocan misterio y poder, mientras que el oro sugiere valor y rareza. La combinación es "adictiva" visualmente.

### Layout Paradigm
- **Estructura de Capas**: Fondo de imagen → Marco ornamentado → Contenido estructurado en secciones
- **Asimetría Controlada**: Imagen del personaje a la izquierda, estadísticas a la derecha
- **Flujo Visual Vertical**: Nombre → Rango → Estadísticas → Habilidades

### Signature Elements
1. **Marco Ornamentado**: Bordes dorados con esquinas decorativas que sugieren antigüedad y poder
2. **Brillo de Rareza**: Efecto de glow alrededor de la tarjeta según el nivel (común, épico, legendario)
3. **Separadores Decorativos**: Líneas doradas que dividen secciones de información

### Interaction Philosophy
- **Hover Effects**: La tarjeta se eleva ligeramente y el brillo aumenta
- **Transiciones Suaves**: Todos los cambios de estado son fluidos (200-300ms)
- **Feedback Visual**: Los clics en botones generan pequeñas animaciones de confirmación

### Animation
- **Entrada**: La tarjeta se desvanece y escala desde 0.95 a 1 (300ms ease-out)
- **Hover**: Elevación sutil (transform: translateY(-8px)) + aumento de brillo (200ms)
- **Estadísticas**: Números que "cuentan" hacia arriba cuando se cargan (animación de contador)
- **Habilidades**: Aparecen con un efecto de deslizamiento suave de izquierda a derecha

### Typography System
- **Display Font**: "Cinzel" o similar (serif elegante) para títulos y rangos
- **Body Font**: "Poppins" (sans-serif legible) para estadísticas y habilidades
- **Jerarquía**:
  - Nombre: 32px bold, oro
  - Rango: 20px medium, plata
  - Estadísticas: 14px regular, blanco
  - Habilidades: 12px regular, gris claro

---

## Estructura de Componentes

### CardContainer
- Contenedor principal con efecto de sombra y brillo
- Responsive: Desktop (400px ancho) → Mobile (100% con padding)

### CardHeader
- Nombre, ID, Rango, Rareza
- Fondo degradado con imagen del personaje

### CardStats
- Grid de 8 estadísticas (FUERZA, AGILIDAD, VITALIDAD, etc.)
- Cada una con barra de progreso visual

### CardAbilities
- Lista de habilidades con iconos
- Máximo 4 habilidades visibles

### CardFrame
- Marco ornamentado como elemento visual
- Implementado con SVG o CSS clip-path

---

## Notas de Implementación
- Usar CSS variables para cambiar fácilmente fondos y personajes
- Generar imágenes de fondo usando prompts de IA
- Permitir exportación de la tarjeta como imagen PNG
