# @expanse/brand-core

Expanse brand primitives, composites, and theming system. SVG-based visual elements with consistent styling.

## Installation

```bash
pnpm add @expanse/brand-core
```

**Peer dependencies:**
- `@expanse/theme` - Theme system
- `@mui/material` - MUI components
- `gsap` - Animations
- `react` / `react-dom`

## Structure

```
brand-core/
├── src/
│   ├── primitives/       # Base building blocks
│   │   ├── shapes/       # Circle, Triangle, Square, Hexagon, etc.
│   │   ├── arcs/         # BorderArc, OrbitalRing
│   │   ├── gradients/    # BackgroundGradient
│   │   └── effects/      # Glow, shadows
│   ├── composites/       # Complex components from primitives
│   │   ├── Comet/        # Circle + triangle tail
│   │   ├── Halo/         # Tilted orbital ring
│   │   └── Portal/       # Perspective ellipse
│   ├── display/          # Progress bars, logos, icons
│   ├── vector-graphics/  # Illustrated components (clouds, screens)
│   ├── character/        # Character system
│   ├── status/           # Status displays
│   ├── context/          # BrandProvider
│   └── utils/            # Geometry, helpers
├── .storybook/           # Self-contained storybook
└── package.json
```

## Usage

```tsx
import {
  Circle, Triangle, BorderArc,
} from "@expanse/brand-core/primitives"
import { Comet, Halo, Portal } from "@expanse/brand-core/composites"
import { BrandProvider } from "@expanse/brand-core/context"

<BrandProvider config={{ primaryColor: "#fff", glowEnabled: true }}>
  <Comet color="#fff" size={40} trailLength={0.6} />
  <Halo tilt={15} color="#fff" />
</BrandProvider>
```

## Theme Integration

Components access colors via MUI theme:

```tsx
const theme = useTheme()
const props = theme.components?.Gem?.variants?.[variant]
const { fillColor, strokeColor } = props
```

See [@expanse/theme README](../theme/README.md) for details on component variants.

## Storybook

Run storybook locally:

```bash
cd packages/@expanse/brand-core
pnpm storybook
```

## Primitives

### Shapes
- `Circle` - Basic circle with optional pupil/eye
- `Triangle` - Equilateral triangle
- `Square` - Rounded square
- `Hexagon`, `Pentagon`, `Star`

### Arcs
- `BorderArc` - Arc segment
- `OrbitalRing` - Tilted elliptical ring

### Effects
- `GlowFilter` - SVG glow filter
- `GradientDef` - Gradient definitions
- `BackgroundGradient` - Theme-aware background gradients

## Composites

- **Comet** - Circle head + triangle tail
- **Halo** - Tilted orbital ring
- **Portal** - Perspective ellipse effect

## Vector Graphics

Pre-built illustrated components:
- **Clouds** - LighteningCloud, SunbreakCloud, GrowthCloud, CloudStack
- **Screens** - SpiralBrowserScreen, WebAndMobileAppScreens
- **Graphics** - ContactUsGraphic
- **Elements** - DescriptionBars

## TODO

- [ ] Migrate `@expanse/game` and `@expanse/points` packages
- [ ] Re-enable game components when dependencies available

## Design System Integration

Works with MUI theme system for colors and supports:

- Theme color mapping (primary, secondary, text)
- Light/dark mode adaptation
- User preference sync via BrandContext
