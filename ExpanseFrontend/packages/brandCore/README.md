# @expanse/brand-core

Expanse brand primitives, composites, and theming system. This package provides reusable SVG-based visual elements that maintain consistent styling across the brand.

## Structure

```
brandCore/
├── src/
│   ├── primitives/      # Base building blocks
│   │   ├── shapes/      # Circle, Triangle, Square, Hexagon, etc.
│   │   ├── arcs/        # BorderArc, OrbitalRing
│   │   └── effects/     # Glow, gradients, shadows
│   ├── composites/      # Complex components built from primitives
│   │   ├── Logo/        # Main Expanse logo
│   │   ├── Comet/       # Circle head + triangle tail
│   │   ├── Halo/        # Tilted orbital ring (character accessory)
│   │   ├── Portal/      # Perspective ellipse effect
│   │   └── CoinIcon/    # Coin-style icon
│   ├── context/         # BrandContext for global configuration
│   └── utils/           # Geometry, path generation, helpers
```

## Usage

```tsx
import {
  Circle,
  Triangle,
  BorderArc,
  OrbitalRing,
} from "@expanse/brand-core/primitives"
import { Comet, Halo, Portal } from "@expanse/brand-core/composites"
import { BrandProvider, useBrandConfig } from "@expanse/brand-core/context"

// Wrap your app with BrandProvider for consistent theming
;<BrandProvider config={{ primaryColor: "#fff", glowEnabled: true }}>
  <Comet color="#fff" size={40} trailLength={0.6} />
  <Halo tilt={15} color="#fff" />
</BrandProvider>
```

## Primitives

### Shapes

- `Circle` - Basic circle with optional pupil/eye
- `Triangle` - Equilateral triangle with configurable orientation
- `Square` - Rounded square with configurable corner radius
- `Hexagon` - Six-sided shape
- `Pentagon` - Five-sided shape
- `Star` - N-pointed star

### Arcs

- `BorderArc` - Arc segment matching logo border
- `OrbitalRing` - Tilted elliptical ring

### Effects

- `GlowFilter` - SVG glow filter definition
- `GradientDef` - Gradient definitions

## Composites

### Comet

Circle head fused with a triangle tail, creating a comet/meteor effect.

### Halo

Tilted orbital ring for character accessories.

### Portal

Perspective ellipse creating a ground portal or teleportation effect.

### CoinIcon

Circular icon with border arcs in coin style.

## Design System Integration

Works with MUI theme system for colors and supports:

- Theme color mapping (primary, secondary, text)
- Light/dark mode adaptation
- User preference sync via BrandContext
