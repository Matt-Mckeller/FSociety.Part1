---
# applyTo: "packages/@expanse/theme/**,**/theme/**,**/*.stories.tsx"
---

# Theme Usage

## Rules
- Always use theme tokens (never hardcode colors)
- Support light/dark modes
- Use MUI's `sx` prop or `styled()` utility
- Access theme via `useTheme()` hook
- Component variants follow MUI pattern

## Documentation
- [MUI_THEME_SYSTEM.md](docs/technical/MUI_THEME_SYSTEM.md)
- [COMPONENT_VARIANT_SYSTEM.md](docs/technical/COMPONENT_VARIANT_SYSTEM.md)

## Examples
- Theme configs: `packages/@expanse/theme/src/configs/`
- Theme hooks: `packages/@expanse/theme/src/hooks/`
- Theme-aware icon: `packages/@expanse/brand-core/src/display/icons/ExperienceIcon.tsx`

## Theme Colors
- primary, blue, green, orange, red, teal, neon
- Each has light + dark mode variants
- Gamified variants available (gamified, gamified-desaturated)

## Don't
- Hardcode hex colors
- Skip dark mode support
- Create new color tokens without adding to theme
