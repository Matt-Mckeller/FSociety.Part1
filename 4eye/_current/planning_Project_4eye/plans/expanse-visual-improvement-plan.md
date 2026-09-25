# @expanse Package Visual Improvement Plan

## Executive Summary

Improve visual display and theming consistency for the `@expanse/shell` package in Storybook. Address black-on-black/white-on-white contrast issues, integrate proper MUI theme from `@expanse/theme`, add theme controls, and establish MUI component style patterns for accessibility.

---

## Current Issues Identified

### 1. Hardcoded Dark Colors in Components
- **NavigationPadDefault.tsx**: Uses `bgcolor: "rgba(30, 30, 40, 0.8)"` - dark background hardcoded
- **BoardChrome.stories.tsx**: Sample components use `bgcolor: 'rgba(20, 28, 36, 0.92)'` - dark glass effect hardcoded
- **Result**: Components invisible or low-contrast on light backgrounds

### 2. Storybook Uses Basic MUI Themes
- **Current**: [preview.ts](../../../packages/@expanse/shell/.storybook/preview.ts) creates minimal `createTheme({ palette: { mode: 'light' } })`
- **Available**: Rich `@expanse/theme` package with typography, colors, breakpoints, shadows
- **Result**: Stories don't reflect production appearance

### 3. Missing Theme Controls in Storybook
- **Current**: Simple toolbar dropdown for light/dark
- **Available**: `LightDarkModeToggle` and `ThemeColorSelector` components
- **Result**: Can't preview components across all 6 color themes

### 4. No MUI Component Style Overrides
- **ExpanseFrontend Pattern**: Defines component variants in theme (e.g., `ExpanseCharacter`, `ProgressBar`)
- **@expanse Current**: No centralized component theming
- **Result**: Inconsistent styling, no theme-aware component variants

### 5. Specific Component Issues
- **BoardChrome**: Content invisible - `SampleBar` and `SampleControl` use dark backgrounds
- **NavigationPad**: Low contrast arrows, hardcoded dark glass effect

---

## Implementation Tasks

### Phase 1: Storybook Theme Integration

#### Task 1.1: Update Storybook Preview to Use @expanse/theme
**Files to modify**: `packages/@expanse/shell/.storybook/preview.ts`

```tsx
import { ThemeProvider } from '@expanse/theme'
import { CssBaseline } from '@mui/material'

// Replace basic createTheme with @expanse/theme's ThemeProvider
// Use createExpanseTheme for both light and dark modes
// Default to light theme
```

**Acceptance Criteria**:
- [ ] Stories render with full @expanse typography, spacing, shadows
- [ ] Default theme is light background
- [ ] Dark mode toggle works correctly

#### Task 1.2: Add Color Theme Selector to Storybook Toolbar
**Files to modify**: `packages/@expanse/shell/.storybook/preview.ts`

```tsx
// Add globalTypes for color theme selection
globalTypes: {
  theme: { /* existing light/dark */ },
  colorTheme: {
    name: 'Color Theme',
    defaultValue: 'primary',
    toolbar: {
      icon: 'paintbrush',
      items: ['primary', 'blue', 'green', 'orange', 'red', 'teal'],
      dynamicTitle: true,
    },
  },
},
```

**Acceptance Criteria**:
- [ ] Storybook toolbar shows color theme selector
- [ ] All 6 color themes selectable
- [ ] Components update when theme changes

#### Task 1.3: Add Theme Controls Story
**Files to create**: `packages/@expanse/shell/src/stories/ThemeControls.stories.tsx`

Create a dedicated story showcasing `LightDarkModeToggle` and `ThemeColorSelector` from `@expanse/theme`:

```tsx
// Import and display theme control components
// Show all theme variations in a grid
// Useful for visual testing of theme changes
```

**Acceptance Criteria**:
- [ ] Story shows LightDarkModeToggle in all sizes
- [ ] Story shows ThemeColorSelector variants
- [ ] Controls function within Storybook context

---

### Phase 2: Fix Component Contrast Issues

#### Task 2.1: Create Theme-Aware Glass Effect Utility
**Files to modify**: `packages/@expanse/shell/src/styles/glassEffect.ts`

```tsx
// Enhance glassEffect to be theme-aware
export function glassEffect(options: {
  theme: Theme  // Add theme parameter
  blur?: number
  intensity?: 'low' | 'medium' | 'high'
}) {
  const isDark = theme.palette.mode === 'dark'
  return {
    bgcolor: isDark 
      ? alpha(theme.palette.background.paper, 0.85)
      : alpha(theme.palette.background.paper, 0.9),
    backdropFilter: `blur(${options.blur ?? 12}px)`,
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    // Ensure contrast meets WCAG AA (4.5:1 for text)
  }
}
```

**Acceptance Criteria**:
- [ ] Glass effect adapts to light/dark mode
- [ ] Uses theme palette colors, not hardcoded RGBA
- [ ] Maintains visual appeal in both modes

#### Task 2.2: Fix NavigationPad Contrast
**Files to modify**: 
- `packages/@expanse/shell/src/features/navigation-pad/variants/NavigationPadDefault.tsx`
- `packages/@expanse/shell/src/features/navigation-pad/variants/NavigationPadHints.tsx`
- `packages/@expanse/shell/src/features/navigation-pad/variants/NavigationPadCompact.tsx`
- `packages/@expanse/shell/src/features/navigation-pad/variants/NavigationPadExpanded.tsx`

Replace hardcoded colors:
```tsx
// Before
bgcolor: "rgba(30, 30, 40, 0.8)"

// After
bgcolor: (theme) => alpha(theme.palette.background.paper, 0.9)
borderColor: 'divider'
color: 'primary.main' // or text.primary for contrast
```

**Acceptance Criteria**:
- [ ] NavigationPad visible on both light and dark backgrounds
- [ ] Arrow icons meet WCAG AA contrast (4.5:1)
- [ ] Disabled states clearly distinguishable
- [ ] Hover/focus states visible

#### Task 2.3: Fix BoardChrome Story Sample Components
**Files to modify**: `packages/@expanse/shell/src/features/board/components/BoardChrome.stories.tsx`

Update `SampleBar` and `SampleControl` to be theme-aware:
```tsx
const SampleBar = ({ label }: { label: string }) => {
  const theme = useTheme()
  return (
    <Paper
      sx={{
        px: 2,
        py: 1,
        bgcolor: alpha(theme.palette.background.paper, 0.92),
        backdropFilter: 'blur(12px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
        color: 'text.primary',  // Ensures readable text
      }}
    >
      <Typography variant="body2">{label}</Typography>
    </Paper>
  )
}
```

**Acceptance Criteria**:
- [ ] BoardChrome story content visible in light mode (default)
- [ ] Glass effect adapts to theme mode
- [ ] Text readable on both light and dark backgrounds

---

### Phase 3: MUI Component Style Architecture

#### Task 3.1: Create TypeScript Types for @expanse Component Themes
**Files to create**: `packages/@expanse/shell/src/types/component-theme.types.ts`

Following ExpanseFrontend pattern:
```tsx
export interface ExpanseLayoutComponentsThemeProps {
  NavigationPad?: {
    styleOverrides?: {
      root?: CSSProperties
    }
    variants?: {
      default?: {
        buttonColor: string
        arrowColor: string
        disabledColor: string
        backgroundColor: string
        borderColor: string
      }
      highContrast?: {
        buttonColor: string
        arrowColor: string
        // WCAG AAA compliant colors (7:1)
      }
    }
  }
  BoardChrome?: {
    variants?: {
      default?: {
        overlayColor: string
        borderColor: string
        blur: number
      }
      minimal?: { /* less decorative variant */ }
    }
  }
  FloatingToolbar?: {
    variants?: { /* ... */ }
  }
}
```

**Acceptance Criteria**:
- [ ] Type definitions for all layout component theme props
- [ ] Support for multiple variants (default, highContrast, minimal)
- [ ] Integration path with @expanse/theme exports

#### Task 3.2: Add Component Theme Configs to @expanse/theme
**Files to modify**: 
- `packages/@expanse/theme/src/configs/light-theme.ts`
- `packages/@expanse/theme/src/configs/dark-theme.ts`
- (Color variants as needed)

Add layout component defaults:
```tsx
export const expanseLightLayoutComponents: ExpanseLayoutComponentsThemeProps = {
  NavigationPad: {
    variants: {
      default: {
        buttonColor: lightPalette.background.paper,
        arrowColor: lightPalette.primary.main,
        disabledColor: lightPalette.action.disabled,
        backgroundColor: alpha(lightPalette.background.paper, 0.9),
        borderColor: lightPalette.divider,
      },
      highContrast: {
        buttonColor: lightPalette.common.white,
        arrowColor: lightPalette.common.black,
        // ... WCAG AAA colors
      }
    }
  }
}
```

**Acceptance Criteria**:
- [ ] Light theme defines component colors
- [ ] Dark theme defines component colors
- [ ] High contrast variant available for accessibility

#### Task 3.3: Consume Component Themes in Layout Components
**Files to modify**: All NavigationPad variants, BoardChrome, FloatingToolbar

Pattern:
```tsx
export function NavigationPadDefault(props: NavigationPadVariantProps) {
  const theme = useTheme()
  
  // Access component theme variant
  const componentTheme = theme.components?.NavigationPad?.variants?.default
  
  // Use theme colors with fallbacks
  const buttonBg = componentTheme?.buttonColor ?? alpha(theme.palette.background.paper, 0.9)
  const arrowColor = componentTheme?.arrowColor ?? theme.palette.primary.main
  
  return (
    <IconButton sx={{ bgcolor: buttonBg, color: arrowColor }}>
      {/* ... */}
    </IconButton>
  )
}
```

**Acceptance Criteria**:
- [ ] Components read colors from theme.components
- [ ] Fallbacks to palette colors if not defined
- [ ] Easy to swap variants via theme config

---

### Phase 4: Accessibility Improvements

#### Task 4.1: Add High Contrast Variant
**Files to create/modify**: Component variants + theme configs

- WCAG AAA contrast ratio (7:1) for all interactive elements
- Clear focus indicators (2px solid outline, high contrast)
- Larger touch targets (minimum 44x44px)

**Acceptance Criteria**:
- [ ] `variant="highContrast"` available on NavigationPad
- [ ] Focus rings visible and high contrast
- [ ] Passes automated a11y checks

#### Task 4.2: Add Storybook A11y Testing
**Files to verify**: `.storybook/main.ts` already has `@storybook/addon-a11y`

- Verify addon-a11y is configured correctly
- Add a11y parameters to stories that need specific rules
- Document accessibility expectations

**Acceptance Criteria**:
- [ ] A11y addon visible in Storybook panel
- [ ] Critical violations flagged
- [ ] Stories pass standard a11y checks

#### Task 4.3: Document Accessibility Guidelines
**Files to create**: `packages/@expanse/shell/docs/ACCESSIBILITY.md`

- Minimum contrast ratios
- Required ARIA attributes
- Focus management patterns
- Keyboard navigation support

---

## Implementation Order

```
Phase 1 (Foundation) - ~2-3 hours
├── Task 1.1: Storybook theme integration
├── Task 1.2: Color theme selector
└── Task 1.3: Theme controls story

Phase 2 (Fix Contrast) - ~2-3 hours
├── Task 2.1: Theme-aware glass effect
├── Task 2.2: NavigationPad contrast
└── Task 2.3: BoardChrome story fixes

Phase 3 (Architecture) - ~3-4 hours
├── Task 3.1: Component theme types
├── Task 3.2: Theme configs
└── Task 3.3: Consume in components

Phase 4 (Accessibility) - ~2-3 hours
├── Task 4.1: High contrast variant
├── Task 4.2: A11y testing
└── Task 4.3: Documentation
```

**Total Estimated Time**: 9-13 hours

---

## Visual Examples

### Before (Current State)
- NavigationPad: Dark buttons on dark storybook = invisible
- BoardChrome: Dark glass overlays invisible on light background
- No color theme variation visible

### After (Target State)
- NavigationPad: Theme-aware buttons with proper contrast
- BoardChrome: Glass effect adapts to light/dark
- Toolbar allows switching between 12 theme variations (6 colors × 2 modes)
- All text meets WCAG AA minimum contrast

---

## Dependencies

### Required Packages (Already Installed)
- `@expanse/theme` - Theme provider and components
- `@mui/material` - UI components
- `@storybook/addon-a11y` - Accessibility testing

### May Need Updates
- Ensure `@expanse/shell` has peer dependency on `@expanse/theme`
- May need to export additional types from `@expanse/theme`

---

## Testing Checklist

- [ ] Run Storybook locally, verify light mode default
- [ ] Toggle to dark mode, verify all components visible
- [ ] Cycle through all 6 color themes
- [ ] Check a11y panel for violations
- [ ] Test NavigationPad with keyboard (Tab, Enter, Arrows)
- [ ] Test on high-DPI screens for crisp rendering
- [ ] Verify in Chrome, Firefox, Safari

---

## Files Reference

### Storybook Config
- [.storybook/main.ts](../../../packages/@expanse/shell/.storybook/main.ts)
- [.storybook/preview.ts](../../../packages/@expanse/shell/.storybook/preview.ts)

### Components to Fix
- [NavigationPadDefault.tsx](../../../packages/@expanse/shell/src/features/navigation-pad/variants/NavigationPadDefault.tsx)
- [BoardChrome.stories.tsx](../../../packages/@expanse/shell/src/features/board/components/BoardChrome.stories.tsx)

### Theme Package Reference
- [ThemeContext.tsx](../../../packages/@expanse/theme/src/context/ThemeContext.tsx)
- [LightDarkModeToggle.tsx](../../../packages/@expanse/theme/src/components/LightDarkModeToggle/LightDarkModeToggle.tsx)
- [ThemeColorSelector.tsx](../../../packages/@expanse/theme/src/components/ThemeColorSelector/ThemeColorSelector.tsx)

### ExpanseFrontend Reference (Pattern to Follow)
- [expanse-theme.d.ts](../../../../ExpanseFrontend/packages/@types/expanse-theme.d.ts) - Component theme types
- [dark-theme.ts](../../../../ExpanseFrontend/packages/ui/theme/configs/dark-theme.ts) - Component theme values
