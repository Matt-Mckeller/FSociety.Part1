# Resource Pools Implementation Plan

## Overview
Transform CinemaLayout diamonds and bars into interactive resource pool displays with expandable mode groups.

## Design Decisions

### Resource Modes & Positions
| Position | Mode | Resources | Primary Color |
|----------|------|-----------|---------------|
| Top-Left | Core | energy, health, attention | Cyan |
| Top-Right | Emotional | anger, happiness, sadness, anxiety, socialEnergy | Pink |
| Bottom-Left | Cognitive | visual, kinesthetic, auditory, problemSolving, knowledge | Purple |
| Bottom-Right | FAB | (unchanged - action button) | Secondary |

### Visual Design

**Water Effect:**
- Gradient fill from transparent to resource color
- Subtle animated wave at fill line using SVG clip path
- Fill direction: outer corner → toward screen center

**Desaturation:**
- Default: `filter: saturate(0.3) brightness(0.8)`
- Hover/Active: `filter: saturate(1) brightness(1)`
- Transition: 300ms ease-out

**Fill Display:**
- Percentage shown inside shape on hover
- Font: small, semi-bold, white with text shadow
- Position: center of shape

### Interaction

**Primary Shape (Corner Diamond):**
- Shows aggregate/primary resource for the mode
- Click: expands to show all resources in that mode
- Hover: saturates color, shows percentage

**Expanded State:**
- Small shapes fan out along adjacent bar
- Shape types vary: diamonds, circles, squares
- Click outside or on primary: collapses
- Only one mode can be expanded at a time

### Bar Integration
- Top bar becomes container for expanded top resources
- Bottom bar for expanded bottom resources
- Bars themselves can show fill but are secondary display

## Component Architecture

```
ResourcePool (base)
├── useResourcePool (hook: value, isHovered, isExpanded)
├── ResourceDiamond (corner shape)
├── ResourceShape (small expandable shapes)
├── ResourceBar (fillable bar segment)
└── ResourceControls (demo controls for testing)

CinemaLayout
├── ResourceDiamond x3 (corners)
├── ResourceBar (top/bottom with expandable shapes)
└── CinemaFab (unchanged)
```

## Type Definitions

```typescript
type ResourceCategory = 'core' | 'emotional' | 'cognitive'

type CoreResource = 'energy' | 'health' | 'attention'
type EmotionalResource = 'anger' | 'happiness' | 'sadness' | 'anxiety' | 'socialEnergy'
type CognitiveResource = 'visual' | 'kinesthetic' | 'auditory' | 'problemSolving' | 'knowledge'

type ResourceId = CoreResource | EmotionalResource | CognitiveResource

interface ResourceValue {
  id: ResourceId
  value: number // 0-100
  max?: number  // default 100
}

interface ResourcePoolProps {
  category: ResourceCategory
  resources: ResourceValue[]
  isExpanded?: boolean
  onToggleExpand?: () => void
  position: CinemaCornerPosition
}
```

## Color Palette

```typescript
const RESOURCE_COLORS = {
  // Core (cyan family)
  energy: '#FFD700',      // Gold
  health: '#FF4757',      // Red
  attention: '#00CED1',   // Cyan

  // Emotional (warm spectrum)
  anger: '#FF6B6B',       // Coral red
  happiness: '#FFE66D',   // Sunny yellow
  sadness: '#5B9BD5',     // Soft blue
  anxiety: '#9B59B6',     // Purple
  socialEnergy: '#FF69B4', // Hot pink

  // Cognitive (cool spectrum)
  visual: '#2ECC71',      // Green
  kinesthetic: '#F39C12', // Orange
  auditory: '#8E44AD',    // Deep purple
  problemSolving: '#3498DB', // Blue
  knowledge: '#F1C40F',   // Gold
}
```

## Implementation Steps

1. **Create types** - `resourceTypes.ts`
2. **Create base hook** - `useResourcePool.ts`
3. **Create ResourceDiamond** - SVG with water fill effect
4. **Create ResourceShape** - Small shape variant
5. **Create expansion logic** - Context or state lift
6. **Update CinemaLayout** - Integrate resource pools
7. **Add demo controls** - Test all resources
8. **Polish animations** - Wave effect, transitions

## Animation Details

**Fill Animation:**
```css
transition: clip-path 300ms ease-out;
```

**Wave Effect:**
- SVG path with sine wave
- Animate transform: translateX
- Subtle amplitude (2-4px)

**Saturation:**
```css
transition: filter 300ms ease-out;
```

**Expansion:**
- Shapes scale from 0 to 1
- Staggered delay (50ms per shape)
- Duration: 200ms

---
*Plan created: March 4, 2026*
