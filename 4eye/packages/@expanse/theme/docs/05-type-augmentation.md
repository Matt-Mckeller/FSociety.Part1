# Type Augmentation

Extend MUI's `Components` interface so TypeScript knows about your component themes.

## Create Augmentation File

```ts
// packages/@expanse/brand-core/src/theme/augmentation.ts
import type { BrandCoreComponentsThemeProps } from "./types"

declare module "@mui/material/styles" {
  interface Components extends BrandCoreComponentsThemeProps {}
}
```

## Define Aggregate Type

```ts
// packages/@expanse/brand-core/src/theme/types.ts
export interface BrandCoreComponentsThemeProps {
  ExpanseGem?: GemThemeProps
  ExpanseProgressBar?: ProgressBarThemeProps
  ExpanseExperienceIcon?: ExperienceIconThemeProps
  ExpanseCharacter?: ExpanseCharacterThemeProps
  ExpanseExpandingBorderBox?: ExpandingBorderBoxThemeProps
}
```

## Import as Side Effect

Consumers import the augmentation for TypeScript to pick it up:

```ts
// In your app or storybook preview
import "@expanse/brand-core/theme/augmentation"
```

After this import, TypeScript knows:
```ts
const theme = useTheme()
theme.components?.ExpanseGem  // ✅ Typed
```

## Export from Package

```ts
// packages/@expanse/brand-core/src/theme/index.ts
// Side-effect import for consumers
export * from "./types"
export * from "./factories"
// Augmentation is imported for its side effects, not exported
```
