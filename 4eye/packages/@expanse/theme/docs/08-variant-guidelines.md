# Implementing Theme Variants

## File Structure
packages/@expanse/[package]/src/theme/
├── types.ts         # VariantProps + ThemeProps
├── factories/       # Factory per component
├── augmentation.ts  # MUI type extension
└── index.ts         # Re-exports

## Pattern
1. VariantProps: CSS-ready values (bgcolor, border, borderRadius, etc.)
2. ThemeProps: `{ variants?: { default?: VariantProps, ... } }`
3. Factory: Pure function `(palette: Palette) => ThemeProps`
4. Component: Read theme with fallback to hardcoded defaults

Reference: `@expanse/shell` ActionBar