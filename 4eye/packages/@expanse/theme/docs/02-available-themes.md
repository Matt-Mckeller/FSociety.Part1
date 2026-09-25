# Available Themes

## Theme Tiers

Themes are organized by business priority:

### Primary Tier
Core business themes, fully supported.

| Theme | Description |
|-------|-------------|
| `purple` | Brand primary, default |
| `blue` | Professional, trust |
| `red` | Energy, alerts |

### Secondary Tier
Broader appeal, specialized use cases.

| Theme | Description |
|-------|-------------|
| `orange` | Warmth, creativity |
| `neon` | Electric cyan glow, cyberpunk |
| `mono` | Grayscale, wellness/accessibility |

### Tertiary Tier
Experimental and fun.

| Theme | Description |
|-------|-------------|
| `green` | Nature, growth |
| `teal` | Calm, modern |
| `gamified` | Vibrant game colors |
| `gamified-desaturated` | Soft Japan-style |

## Import Palettes

```ts
import {
  // Primary
  lightThemePalette, darkThemePalette,        // purple
  blueLightThemePalette, blueDarkThemePalette,
  redLightThemePalette, redDarkThemePalette,
  // Secondary
  orangeLightThemePalette, orangeDarkThemePalette,
  neonLightPalette, neonDarkPalette,
  monoLightThemePalette, monoDarkThemePalette,
  // Tertiary
  greenLightThemePalette, greenDarkThemePalette,
  tealLightThemePalette, tealDarkThemePalette,
  gamifiedLightPalette, gamifiedDarkPalette,
  gamifiedDesaturatedLightPalette, gamifiedDesaturatedDarkPalette,
} from "@expanse/theme"
```

## Special Theme Constants

```ts
// Neon theme
import { NEON_NAVY, NEON_CYAN, NEON_PURPLE } from "@expanse/theme"

// Mono theme
import { MONO_BLACK, MONO_WHITE, MONO_CHARCOAL } from "@expanse/theme"
```
