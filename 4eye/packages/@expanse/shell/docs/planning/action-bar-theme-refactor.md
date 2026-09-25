# ActionBar Theme System Refactoring Plan

## Problem Summary

The current ActionBar/ActionButton styling system has several issues:

1. **Styling logic lives in the wrong place** - `skins.ts` is in `@expanse/shell` but should be in `@expanse/theme`
2. **Dark mode action colors are broken** - The dark palette uses light-mode values for `action` (e.g., `#0000008A` for active instead of white-based)
3. **Duplicate color logic** - `getColorsFromTheme()` in ActionButton.tsx manually computes colors instead of using theme tokens
4. **No MUI component override** - IconButton and custom ActionButton aren't configured in `common-theme.ts`
5. **ColorMode prop is a workaround** - Components need a `colorMode` override prop because the theme isn't providing correct values

---

## Current Architecture

```
@expanse/shell/
  └─ src/hud-components/
      ├─ shared/skins.ts          ← Contains skin system (WRONG LOCATION)
      ├─ action-button/
      │   └─ ActionButton.tsx     ← Has getColorsFromTheme() (DUPLICATES THEME LOGIC)
      └─ action-bars/
          └─ ActionBar.tsx        ← Uses getSkinStyles() from skins.ts

@expanse/theme/
  └─ src/configs/
      ├─ common-theme.ts          ← MUI component overrides (MISSING IconButton)
      └─ themes/
          └─ primary/purple/
              ├─ light-theme.ts   ← palette.action values (CORRECT)
              └─ dark-theme.ts    ← palette.action values (WRONG - uses light values)
```

---

## Proposed Architecture

### Phase 1: Fix Dark Mode Palette (Quick Fix)

**File:** `@expanse/theme/src/configs/themes/primary/purple/dark-theme.ts`

Update `action` palette to use dark-mode-appropriate values:

```typescript
action: {
  // Dark mode: use white-based colors
  active: "rgba(255, 255, 255, 0.7)",
  hover: "rgba(255, 255, 255, 0.08)",
  hoverOpacity: 0.08,
  selected: "rgba(255, 255, 255, 0.16)",
  selectedOpacity: 0.16,
  disabled: "rgba(255, 255, 255, 0.38)",
  disabledBackground: "rgba(255, 255, 255, 0.12)",
  disabledOpacity: 0.38,
  focus: "rgba(255, 255, 255, 0.12)",
  focusOpacity: 0.12,
  activatedOpacity: 0.24,
}
```

Apply to ALL dark theme palettes (purple, blue, red, etc.).

### Phase 2: Add ActionBar Theme Config

**New File:** `@expanse/theme/src/configs/components/action-bar-theme.ts`

Move skin system to theme package:

```typescript
/**
 * ActionBar component theme configuration
 * 
 * Provides theme tokens for ActionBar, ActionButton, ActionGroup, ActionDock
 */

import type { Palette } from "@mui/material/styles"

export interface ActionBarThemeConfig {
  skins: Record<string, SkinConfig>
  button: {
    sizes: Record<string, number>
    colors: {
      inactive: string
      active: string
      disabled: string
      hover: string
    }
  }
}

export function createActionBarTheme(palette: Palette): ActionBarThemeConfig {
  const isDark = palette.mode === "dark"
  
  return {
    skins: {
      default: {
        shape: "pill",
        surface: { 
          bgcolor: isDark ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)",
          blur: 8,
        },
        border: {
          width: 1,
          color: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
        },
        elevation: 4,
      },
      // ... other skins
    },
    button: {
      sizes: { xs: 28, sm: 36, md: 44, lg: 56 },
      colors: {
        inactive: palette.action.active,
        active: palette.primary.main,
        disabled: palette.action.disabled,
        hover: palette.action.hover,
      },
    },
  }
}
```

### Phase 3: Register as MUI Component Theme

**File:** `@expanse/theme/src/configs/common-theme.ts`

Add ActionBar configuration to MUI's component overrides:

```typescript
export const getComponents = (palette, shadows, expanseComponents) => ({
  // ... existing components
  
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: palette.action.active,
        "&:hover": {
          backgroundColor: palette.action.hover,
        },
        "&.Mui-disabled": {
          color: palette.action.disabled,
        },
      },
    },
  },
  
  // Custom Expanse components
  ExpanseActionButton: {
    defaultProps: {
      size: "md",
      activeShape: "rounded",
    },
    styleOverrides: {
      root: {
        color: palette.action.active,
        "&.active": {
          color: palette.primary.main,
          backgroundColor: alpha(palette.primary.main, 0.12),
        },
      },
    },
  },
  
  ExpanseActionBar: {
    defaultProps: {
      skin: "default",
      thickness: "md",
    },
  },
  
  ...expanseComponents,
})
```

### Phase 4: Update ActionButton to Use Theme

**File:** `@expanse/shell/src/hud-components/action-button/ActionButton.tsx`

Replace custom color logic with theme access:

```typescript
// BEFORE (current - bad)
function getColorsFromTheme(theme: Theme, modeOverride?: "dark" | "light"): ColorTokens {
  const isDark = modeOverride ?? theme.palette.mode === "dark"
  // ... manual computation
}

// AFTER (proposed - good)
function ActionButton(props) {
  const theme = useTheme()
  
  // Just use palette directly - no manual computation needed
  const colors = {
    text: theme.palette.action.active,
    hover: theme.palette.action.hover,
    active: theme.palette.primary.main,
    activeBg: alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
    disabled: theme.palette.action.disabled,
  }
  
  // colorMode prop only needed for special cases (glass overlays on opposite-mode backgrounds)
  // ...
}
```

### Phase 5: Update withExpanseTheme Decorator

**File:** `@expanse/storybook-config/src/decorators/withExpanseTheme.tsx`

Add ActionBar theme extension support:

```typescript
import { createActionBarTheme } from "@expanse/theme"

// Add to createThemeDecorator or create specialized decorator
export function createLayoutThemeDecorator(): Decorator {
  return createThemeDecorator((palette, color, mode) => ({
    ExpanseActionBar: createActionBarTheme(palette),
  }))
}

// For @expanse/shell's .storybook/preview.ts
export const withLayoutTheme = createLayoutThemeDecorator()
```

---

## Migration Steps

### Step 1: Fix Dark Palettes (Immediate)
- [ ] Update `dark-theme.ts` action values for purple
- [ ] Update action values for all other dark themes (blue, red, orange, neon, mono, etc.)
- [ ] Verify in Storybook with theme switcher

### Step 2: Move Skin System to Theme
- [ ] Create `@expanse/theme/src/configs/components/action-bar-theme.ts`
- [ ] Move skin types (BarShape, BarSurface, etc.) to theme
- [ ] Create `createActionBarTheme()` factory function
- [ ] Export from `@expanse/theme/src/index.ts`

### Step 3: Add MUI Component Overrides
- [ ] Add `MuiIconButton` override to `common-theme.ts`
- [ ] Add `ExpanseActionButton` custom component config
- [ ] Add `ExpanseActionBar` custom component config

### Step 4: Refactor ActionButton
- [ ] Remove `getColorsFromTheme()` function
- [ ] Use `theme.palette.action.*` directly
- [ ] Keep `colorMode` prop for edge cases only (document clearly)
- [ ] Update TypeScript types

### Step 5: Refactor ActionBar/skins.ts
- [ ] Import skin config from `@expanse/theme` instead of local definitions
- [ ] Simplify `getSkinStyles()` to just read from theme
- [ ] Remove duplicate constants

### Step 6: Update Storybook Config
- [ ] Create `createLayoutThemeDecorator()` in storybook-config
- [ ] Update `@expanse/shell/.storybook/preview.ts` to use it
- [ ] Verify all stories work with theme switching

---

## withExpanseTheme Improvements

The current `ComponentExtensionFactory` pattern is good but underutilized. Suggested improvements:

### 1. Document the Pattern Better

```typescript
/**
 * Component Extension Factory
 * 
 * Use this to add package-specific component themes.
 * 
 * @example
 * ```tsx
 * // In @expanse/brand-core/.storybook/preview.ts
 * const withTheme = createThemeDecorator((palette, color, mode) => ({
 *   // These become available via theme.components.ExpanseGem
 *   ExpanseGem: {
 *     strokeColor: palette.primary.main,
 *     fillColor: palette.primary.light,
 *   },
 *   ExpanseCharacter: {
 *     headColor: palette.primary.light,
 *     bodyColor: palette.primary.main,
 *   },
 * }))
 * ```
 */
```

### 2. Add Pre-built Extension Factories

```typescript
// In @expanse/storybook-config/src/extensions/

// For @expanse/shell
export function createLayoutExtensions(palette: Palette) {
  return {
    ExpanseActionButton: createActionBarTheme(palette).button,
    ExpanseActionBar: createActionBarTheme(palette).skins,
  }
}

// For @expanse/brand-core  
export function createBrandCoreExtensions(palette: Palette) {
  return {
    ExpanseGem: { ... },
    ExpanseCharacter: { ... },
  }
}

// Combined
export function createAllExtensions(palette: Palette) {
  return {
    ...createLayoutExtensions(palette),
    ...createBrandCoreExtensions(palette),
  }
}
```

### 3. Add Theme Access Hook

```typescript
// In @expanse/theme/src/hooks/useComponentTheme.ts
export function useComponentTheme<T>(componentName: string): T | undefined {
  const theme = useTheme()
  return theme.components?.[componentName] as T | undefined
}

// Usage in ActionButton.tsx
const actionButtonTheme = useComponentTheme<ActionButtonThemeConfig>('ExpanseActionButton')
const colors = actionButtonTheme?.colors ?? defaultColors
```

---

## Files to Modify

| File | Change |
|------|--------|
| `@expanse/theme/src/configs/themes/*/dark-theme.ts` | Fix action palette values |
| `@expanse/theme/src/configs/common-theme.ts` | Add MuiIconButton override |
| `@expanse/theme/src/configs/components/action-bar-theme.ts` | NEW - skin system |
| `@expanse/theme/src/index.ts` | Export new action-bar-theme |
| `@expanse/shell/src/hud-components/skins/skins.ts` | Import from theme, simplify |
| `@expanse/shell/src/hud-components/action-button/ActionButton.tsx` | Use theme directly |
| `@expanse/storybook-config/src/decorators/withExpanseTheme.tsx` | Add extension factories |
| `@expanse/storybook-config/src/extensions/index.ts` | NEW - pre-built extensions |

---

## Success Criteria

1. ✅ Dark mode shows white icons with proper contrast
2. ✅ Light mode shows dark icons with proper contrast
3. ✅ Theme color changes (purple/blue/red) update ActionButton colors
4. ✅ No manual color computation in ActionButton.tsx
5. ✅ Skin system is centralized in @expanse/theme
6. ✅ `colorMode` prop only needed for edge cases (glass on opposite background)
7. ✅ All stories pass visual review in both modes
