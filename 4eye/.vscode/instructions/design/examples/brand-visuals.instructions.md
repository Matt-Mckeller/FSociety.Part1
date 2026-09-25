---
# applyTo: "packages/@expanse/brand-core/**"
---

# Brand Visuals Examples

Icons, shapes, SVG primitives, and Lottie animations.

## Reference Code
- Icons: `packages/@expanse/brand-core/src/display/icons/`
  - `ExperienceIcon.tsx` — theme-aware SVG with variants
- Primitives: `packages/@expanse/brand-core/src/primitives/`
  - Basic shapes, arcs, lines
- Composites: `packages/@expanse/brand-core/src/composites/`
  - Built from primitives (Comet, Halo, Portal)

## Patterns
- SVG components with theme integration
- Variant system for different color modes
- `useTheme()` hook for dynamic colors
- `fillColor` from theme props

## Example: Theme-Aware Icon
```tsx
const theme = useTheme()
const { fillColor } = theme.components?.IconName.variants?.[variant]
return <svg fill={fillColor}>...</svg>
```

## Brand Shapes
- Triangles, circles, squares
- Expanding/growing animations
- Darkness to light transitions
