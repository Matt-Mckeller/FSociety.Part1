---
# applyTo: "packages/@expanse/brand-core/**,packages/@expanse/ui/**,packages/@expanse/theme/**"
---

# Design System

## Rules
- Use theme tokens (never hardcode colors)
- Support light/dark modes
- Follow brand themes: improve, innovate, win, heal, protect
- Read existing implementations before creating new

## Documentation
- [MUI_THEME_SYSTEM.md](docs/technical/MUI_THEME_SYSTEM.md)
- [COMPONENT_VARIANT_SYSTEM.md](docs/technical/COMPONENT_VARIANT_SYSTEM.md)

## Reference Code
- Theme configs: `packages/@expanse/theme/src/configs/`
- Brand primitives: `packages/@expanse/brand-core/src/primitives/`
- Brand composites: `packages/@expanse/brand-core/src/composites/`
- Icons: `packages/@expanse/brand-core/src/display/icons/`

## Brand Guidelines (from memory)
**Themes**: improve, innovate, win, heal, protect
**Visual concepts**: darkness→light, small→large, triangles/circles/squares
**Use**: learning, progression, healing, positivity, safety, gamification
**Avoid**: religious terms, clinical/bland terms

## Design Example Categories
See `design/examples/` for pattern-specific guidance:
- `spatial-layout` — grids, navigation, panels
- `brand-visuals` — icons, shapes, SVG, Lottie
- `action-bar` — toolbars, quick actions
- `chat-ui` — messaging, conversation
- `data-viz` — charts, graphs, metrics
- `cloud-3layer` — expanding borders, layered effects
