---
description: Apply @expanse/theme patterns for component styling
---

# General Details
Use Variants and theme factories for new components, and `useTheme` for styling existing ones. Avoid hardcoding colors unless experimenting with design and stories.

## Use Cases

### Styling an Existing Component
**Priority: HIGH** | Read: [03-using-theme.md](../packages/@expanse/theme/docs/03-using-theme.md)

```tsx
import { useTheme } from "@mui/material/styles"

const theme = useTheme()
const color = theme.palette.primary.main      // ✅ Use palette
const bg = theme.palette.background.default   // ✅ Theme-aware
const hardcoded = "#ff0000"                   // ❌ Rarely hard code
```

Key palette paths: `primary.main`, `secondary.main`, `background.default`, `background.paper`, `text.primary`, `text.secondary`, `error.main`, `success.main`

### Creating a New Themeable Component
**Priority: HIGH** | Read: [04-factory-pattern.md](../packages/@expanse/theme/docs/04-factory-pattern.md), [05-type-augmentation.md](../packages/@expanse/theme/docs/05-type-augmentation.md)

1. Define props interface in package's `theme/types.ts`
2. Create factory function in package's `theme/factories.ts`
3. Add TypeScript augmentation in package's `theme/augmentation.ts`
4. Access in component: `theme.components?.ExpanseMyComponent?.defaultProps`

**Reference Implementation**: See `@expanse/shell` ActionBar for a complete hybrid variant pattern:
- Types: `src/theme/types.ts` (ActionBarThemeProps, ActionBarVariantProps)
- Factory: `src/theme/factories/action-bar.factory.ts`
- Component: `src/hud-components/action-bars/components/ActionBar.tsx`

The hybrid approach provides theme-level variants while allowing per-instance overrides:
```tsx
<ActionBar variant="glass" />           // Use theme variant
<ActionBar variant="glass" blur={20} /> // Override specific prop
```

**File Structure**
packages/@expanse/[package]/src/theme/
├── types.ts         # VariantProps + ThemeProps
├── factories/       # Factory per component
├── augmentation.ts  # MUI type extension
└── index.ts         # Re-exports

**Pattern**
1. VariantProps: CSS-ready values (bgcolor, border, borderRadius, etc.)
2. ThemeProps: `{ variants?: { default?: VariantProps, ... } }`
3. Factory: Pure function `(palette: Palette) => ThemeProps`
4. Component: Read theme with fallback to hardcoded defaults

Reference: `@expanse/shell` ActionBar

### Storybook Integration
**Priority: MEDIUM** | Read: [07-storybook-integration.md](../packages/@expanse/theme/docs/07-storybook-integration.md)

```tsx
// .storybook/preview.tsx
import { createPreviewConfig } from "@expanse/storybook-config/preview"
export const { decorators, globalTypes, parameters } = createPreviewConfig()
```

- Decorator auto-wraps with ThemeProvider
- Toolbar provides mode (light/dark) and colorTheme selectors
- No manual ThemeProvider in stories

### Theme-Specific Overrides (Advanced)
**Priority: LOW** | Read: [06-override-pattern.md](../packages/@expanse/theme/docs/06-override-pattern.md)

Use when a specific theme (e.g., neon_dark) needs different values than the factory produces.

## Core Rules

1. **Import**: `useTheme` from `@mui/material/styles` (NOT `useExpanseTheme`)
2. **Colors**: Prefer `theme.palette.*`
3. **Mode**: Check `theme.palette.mode` for light/dark branching
4. **Components**: Access via `theme.components?.ComponentName`

## Documentation Index

| Weight | File | When to Read |
|--------|------|--------------|
| ★★★ | [03-using-theme.md](../packages/@expanse/theme/docs/03-using-theme.md) | Any component styling |
| ★★★ | [04-factory-pattern.md](../packages/@expanse/theme/docs/04-factory-pattern.md) | Creating new themeable component |
| ★★☆ | [05-type-augmentation.md](../packages/@expanse/theme/docs/05-type-augmentation.md) | Adding TypeScript support |
| ★★☆ | [07-storybook-integration.md](../packages/@expanse/theme/docs/07-storybook-integration.md) | Setting up storybook preview |
| ★☆☆ | [02-available-themes.md](../packages/@expanse/theme/docs/02-available-themes.md) | Understanding theme tiers |
| ★☆☆ | [06-override-pattern.md](../packages/@expanse/theme/docs/06-override-pattern.md) | Theme-specific exceptions |
| ★☆☆ | [01-quick-start.md](../packages/@expanse/theme/docs/01-quick-start.md) | App-level ThemeProvider setup |
