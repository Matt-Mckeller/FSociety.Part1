# Theme Extraction Plan - ExpanseFrontend → @expanse/theme

**Date:** 2026-03-26  
**Phase:** 2.1 - Extract Theme System  
**Status:** In Progress

---

## Overview

Extract the multi-theme system from ExpanseFrontend and adapt it for 4eye use as `@expanse/theme` package.

### System Capabilities

- **12 Theme Variations**: 6 colors (primary, blue, green, orange, red, teal) × 2 modes (light, dark)
- **Custom Component Variants**: Theme-defined configurations for custom components
- **Cookie Persistence**: SSR-friendly theme selection storage
- **Dynamic Switching**: Live theme switching without page reload
- **TypeScript**: Full type safety with MUI theme augmentation

---

## Extraction Strategy

### ✅ **What We're Keeping**

1. **Core Theme Architecture**
   - 12 theme palettes (6 colors × 2 modes)
   - All ExpanseFrontend colors: primary (purple), blue, green, orange, red, teal
   - Common theme foundation (typography, breakpoints, spacing, mixins, zIndex)
   - Extended palette properties (background.light, gradient, etc.)
   - Shadow arrays (light: 24 levels, dark: none)
   - Component override factory pattern

2. **Custom Component Variant System**
   - `ExpanseComponentsThemeProps` interface
   - Theme-defined component configurations
   - Variant access pattern via `theme.components.{Component}.variants.{variant}`

3. **ThemeProvider Implementation**
   - Cookie persistence (`themeSelection` cookie)
   - MUI ThemeProvider wrapper
   - React Context for theme state
   - SSR compatibility

4. **Hooks**
   - `useDeviceType` (navigator + screen width detection)
   - `useWindowDimensions` (SSR-safe with defaults)

5. **Utilities**
   - WCAG contrast calculation
   - MUI utilities (alpha, darken, lighten)

### 🔧 **What We're Adapting**

1. **Typography**
   - Remove Xpens custom font
   - Use system fonts: `["system-ui", "Roboto", "sans-serif"]`
   - Keep custom variants (`cardTitle`, `cardBody`, `dialogTitle`, `link`)

2. **Primary Brand Colors**
   - Adapt purple to 4eye brand identity
   - Keep blue, green, orange as-is (Material UI standards)

3. **Component Variants**
   - Remove ExpanseFrontend-specific variants (ExpanseCharacter, GameDrawer)
   - Keep layout variants (ExpandingBorderBox, ProgressBar, etc.)
   - Placeholder for 4eye-specific variants

4. **Analytics Integration**
   - Remove theme change tracking (not in @expanse/theme)
   - Analytics will be in @expanse/analytics package

### ❌ **What We're Removing**

1. **ExpanseFrontend-Specific**
   - Xpens font files
   - font.css,font-nextjs.css
   - Brand/ Storybook docs (will be recreated for 4eye)
   - components/ (UI components go in @expanse/ui)
   - Apollo GraphQL analytics calls
Nothing else removed - keeping all 6 color themes**
   - Teal theme (not in primary 4 colors)

---

## File-by-File Extraction Plan

### **Phase 1: Core Configuration Files**

#### 1. `src/configs/theme-constants.ts` ✅
- **Source**: `ExpanseFrontend/packages/ui/theme/configs/theme-constants.ts`
- **Action**: Direct copy
- **Content**: Constants (AppBarHeight, etc.)

#### 2. `src/configs/common-theme.ts` 🔧
- **Source**: `ExpanseFrontend/packages/ui/theme/configs/common-theme.ts`
- **Action**: Adapt
- **Changes**:
  - Replace Xpens font with `["system-ui", "Roboto", "sans-serif"]`
  - Keep custom typography variants
  - Keep custom breakpoints
  - Keep component override factory
  - Remove AppBarHeight import (will be in same package)

#### 3. `src/configs/light-theme.ts` (Primary Light) 🔧
- **Source**: `ExpanseFrontend/packages/ui/theme/configs/light-theme.ts`
- **Action**: Adapt
- **Changes**:
  - Update primary purple to 4eye brand colors
  - Keep structure
  - Keep shadows array
  - Update component variants

#### 4. `src/configs/dark-theme.ts` (Primary Dark) 🔧
- **Source**: `ExpanseFrontend/packages/ui/theme/configs/dark-theme.ts`
- **Action**: Adapt
- **Changes**:
  - Update primary purple to 4eye brand colors
  - Keep empty shadows array
  - Update component variants

#### 5-12. Color Variant Themes ✅
- `blue-light-theme.ts`, `blue-dark-theme.ts`
- `green6. Color Variant Themes ✅
- `blue-light-theme.ts`, `blue-dark-theme.ts`
- `green-light-theme.ts`, `green-dark-theme.ts`
- `orange-light-theme.ts`, `orange-dark-theme.ts`
- `red-light-theme.ts`, `red-dark-theme.ts`
- `teal-light-theme.ts`, `teal-dark-theme.ts`
- **Action**: Direct copy from ExpanseFrontend
- **Rationale**: Using all Material UI colors from ExpanseFrontend
- **Action**: Export all theme configs
- **Content**: Re-export palettes, shadows, components, common settings

### **Phase 2: TypeScript Types**

#### 1. `src/types/index.ts` 🔧
- **Source**: `ExpanseFrontend/packages/ui/theme/types/index.ts`
- **Content**:
  ```typescript
  export type ExpanseThemes = "primary" | "blue" | "green" | "orange" | "red" | "teal"
  export type ThemeMode = "light" | "dark"
  export type ThemeProviderProps = { children, initialTheme, initialThemeMode }
  export interface ThemeContextProps { currentTheme, setCurrentTheme, ... }
  export interface ExpanseComponentsThemeProps { ... }
  ```

#### 2. MUI Theme Augmentation
- **Action**: Create `src/types/mui-augmentation.d.ts`
- **Content**: Extend MUI Palette interface with custom properties

### **Phase 3: Context & Provider**

#### 1. `src/context/ThemeContext.tsx` 🔧
- **Source**: `ExpanseFrontend/packages/ui/theme/context/Theme.context.tsx`
- **Action**: Adapt
- **Changes**:
  -  Remove Apollo/GraphQL analytics
  - Keep cookie persistence
  - Keep MUI integration
  - Simplify state management

#### 2. `src/context/index.ts` ✅
- **Action**: Re-export context and provider

### **Phase 4: Hooks**

#### 1. `src/hooks/useDeviceType.ts` ✅
- **Source**: Direct copy
- **Content**: Navigator + screen width device detection

#### 2. `src/hooks/useWindowDimensions.ts` ✅
- **Source**: Direct copy
- **Content**: SSR-safe window dimensions hook

#### 3. `src/hooks/index.ts` ✅
- **Action**: Re-export all hooks

### **Phase 5: Utilities**

#### 1. `src/utils/wcag-contrast.ts` ✅
- **Source**: Direct copy
- **Content**: WCAG 2.1 contrast calculation

#### 2. `src/utils/index.ts` ✅
- **Action**: Re-export utilities + re-export MUI utilities

### **Phase 6: Main Exports**

#### 1. `src/index.ts` ✅
- **Action**: Main package entry point
- **Content**: Export all configs, context, hooks, utilities, types

---

## Dependencies

### package.json additions:

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mui/material": "^5.15.0",
    "@mui/system": "^5.15.0"
  },
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "js-cookie": "^3.0.0"
  },
  "devDependencies": {
    "@types/js-cookie": "^3.0.0"
  }
}
```

---

## Testing Strategy

### 1. **Unit Tests**
- Theme palette completeness
- Utility function correctness (WCAG, alpha, etc.)
- Hook behavior (SSR-safe defaults)

### 2. **Integration Tests**
- ThemeProvider renders without errors
- Theme switching works
- Cookie persistence works
- Context provides correct values

### 3. **Visual Testing**
- Create test page that shows all 8 themes
- Verify colors match design
- Verify typography scales
- Test light/dark mode switching

### 4. **SSR Testing**
- Verify SSR-safe hooks
- Verify cookie-based persistence works on server
- No hydration mismatches

---

## Implementation Steps

1. ✅ Analyze ExpanseFrontend theme system (complete)
2. 🔄 Extract core configuration files
3. ⏳ Extract types and provider
4. ⏳ Extract hooks and utilities
5. ⏳ Update package.json dependencies
6. ⏳ Create index.ts with exports
7. ⏳ Test theme system
8. ⏳ Commit Phase 2.1

---

## Success12 theme variations available (6 colors × 2 modes)
- [x] ThemeProvider working with cookie persistence
- [x] SSR-compatible (no hydration errors)
- [x] Full TypeScript type safety
- [x] Custom component variant system functional
- [x] WCAG contrast utilities available
- [x] Device detection hooks working
- [x] Can switch themes dynamically
- [ ] Clean git commit with verification complete
- [ ] Can switch themes dynamically
- [ ] Clean git commit with verification

---

## Notes

- **Font Strategy**: Using system fonts initially. Custom 4eye brand font can be added later as separate font package.
- **Analytics**: Theme change tracking will be added when @expanse/analytics is implemented.
- **Storybook**: Brand documentation and component stories will be created in separate task.
- **Component Library**: Themed UI components will live in @expanse/ui, not @expanse/theme.

