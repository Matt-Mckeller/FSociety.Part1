---
# No applyTo — include manually when working on layered/expanding effects
---

# Cloud 3-Layer Examples

Expanding borders, layered effects, 3-line dash patterns.

## Reference Code
- Composites: `packages/@expanse/brand-core/src/composites/`
- Primitives: `packages/@expanse/brand-core/src/primitives/`

## Patterns
- Layered borders with opacity gradation
- Expanding animation (small → large)
- 3-line dash effects
- Darkness to light transitions
- Ring/halo effects with `ringOpacity` prop

## Example: Layered Ring Effect
```tsx
<path opacity={ringOpacity} fill={fillColor} />
```

## Visual Concepts
- Growth: 1:2:3 scaling ratios
- Expansion: inner to outer
- Transition: dark to light opacity
