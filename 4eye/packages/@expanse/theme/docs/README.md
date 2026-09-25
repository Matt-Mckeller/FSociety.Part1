# @expanse/theme Documentation

Comprehensive guide for using the Expanse theme system.

## Table of Contents

| Doc | Description |
|-----|-------------|
| [Quick Start](./01-quick-start.md) | Basic setup and usage |
| [Available Themes](./02-available-themes.md) | Theme tiers and color options |
| [Using Theme in Components](./03-using-theme.md) | Accessing theme values |
| [Factory Pattern](./04-factory-pattern.md) | Package-owned component themes |
| [Type Augmentation](./05-type-augmentation.md) | Extending MUI types |
| [Override Pattern](./06-override-pattern.md) | Theme-specific customizations |
| [Storybook Integration](./07-storybook-integration.md) | Shared Storybook config |

## Key Files

| File | Purpose |
|------|---------|
| `@expanse/theme/src/context/ThemeContext.tsx` | ThemeProvider implementation |
| `@expanse/theme/src/configs/index.ts` | Palette and shadow exports |
| `@expanse/theme/src/types/index.ts` | Type definitions |
| `@expanse/storybook-config/src/preview.tsx` | Shared Storybook config |

## Quick Reference

```tsx
// Use theme in component
import { useTheme } from "@mui/material/styles"
const theme = useTheme()
// theme.palette.primary.main
// theme.components?.ExpanseGem?.variants?.default
```
