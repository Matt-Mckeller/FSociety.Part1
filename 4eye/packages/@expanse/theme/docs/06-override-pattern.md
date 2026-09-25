# Override Pattern

Apply theme-specific customizations when a particular palette needs different values than the factory produces.

## When to Use

- A palette has unconventional colors (e.g., neon cyan on dark)
- Components need different values for specific theme combinations
- Base factory produces good defaults but one theme needs exceptions

## Implementation

```ts
// packages/@expanse/brand-core/.storybook/preview.tsx
import { THEME_OVERRIDES } from "../src/theme/overrides"

const brandCoreExtensionFactory: ComponentExtensionFactory = (palette, color, mode) => {
  const base = createBrandCoreTheme(palette)
  const overrideKey = `${color}_${mode}` as const

  if (overrideKey in THEME_OVERRIDES) {
    return mergeThemes(base, THEME_OVERRIDES[overrideKey])
  }
  return base
}
```

## Define Overrides

```ts
// packages/@expanse/brand-core/src/theme/overrides.ts
export const NEON_DARK_OVERRIDES = {
  ExpanseGem: {
    defaultProps: {
      glowColor: "#00ffff",      // Cyan glow for neon
      backgroundColor: "#1a1a2e", // Dark bg for contrast
    },
  },
}

export const THEME_OVERRIDES: Record<string, Record<string, unknown>> = {
  neon_dark: NEON_DARK_OVERRIDES,
}
```

## Decision: Override vs If-Statement

| Approach | Pros | Cons |
|----------|------|------|
| Override object | Declarative, scannable | Extra structure |
| If-statement in factory | Simple, inline | Logic scattered |

**Recommendation**: Use overrides when you have 2+ theme-specific exceptions. Use inline conditionals for single one-off cases.
