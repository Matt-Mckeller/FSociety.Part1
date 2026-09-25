# Factory Pattern

Packages own their component theme types and factory functions.

## Architecture

```
@expanse/theme          - Core infrastructure (palettes, shadows, ThemeProvider)
@expanse/brand-core     - Owns: ProgressBar, Gem, ExperienceIcon, Character, ExpandingBorderBox
@expanse/shell         - Owns: GameDrawer, NavigationPad, BoardChrome, FloatingToolbar, Tile
```

## Creating a Factory

A factory derives component theme config from an MUI Palette:

```ts
// packages/@expanse/brand-core/src/theme/factories/gem.factory.ts
import type { Palette } from "@mui/material/styles"
import type { GemThemeProps } from "../types"

export function createGemConfig(palette: Palette): GemThemeProps {
  const isDark = palette.mode === "dark"
  
  return {
    variants: {
      default: {
        strokeColor: isDark ? palette.common.white : palette.common.black,
        fillColor: palette.primary.light,
      },
      contrastBG: {
        strokeColor: isDark ? palette.common.white : palette.common.black,
        fillColor: isDark ? palette.primary.light : palette.common.white,
      },
    },
  }
}
```

## Defining Types

```ts
// packages/@expanse/brand-core/src/theme/types.ts
export interface GemVariantProps {
  strokeColor: string
  fillColor: string
}

export interface GemThemeProps {
  variants?: {
    default?: GemVariantProps
    contrastBG?: GemVariantProps
  }
}
```

## Exporting Factories

```ts
// packages/@expanse/brand-core/src/theme/factories/index.ts
export { createGemConfig } from "./gem.factory"
export { createProgressBarConfig } from "./progress-bar.factory"
// ...
```

## Using in Apps

```tsx
import { ThemeProvider } from "@expanse/theme"
import { createGemConfig, createProgressBarConfig } from "@expanse/brand-core/theme"
import { purpleLightPalette, purpleDarkPalette } from "@expanse/theme"

<ThemeProvider
  componentExtensions={{
    light: {
      ExpanseGem: createGemConfig(purpleLightPalette),
      ExpanseProgressBar: createProgressBarConfig(purpleLightPalette),
    },
    dark: {
      ExpanseGem: createGemConfig(purpleDarkPalette),
      ExpanseProgressBar: createProgressBarConfig(purpleDarkPalette),
    },
  }}
>
```

## Key Principle

Factories are **pure functions** that only know about:
- MUI Palette structure
- Their own component's type

They do NOT know about theme names ("neon", "gamified"). Use the [Override Pattern](./06-override-pattern.md) for theme-specific customizations.
