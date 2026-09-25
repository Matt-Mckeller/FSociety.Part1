# @expanse Visual Improvements Plan v2

## Overview

Comprehensive improvements to the @expanse package visual display, focusing on Storybook component visibility, contrast, accessibility, and MUI theme component styles.

## Current Issues

### 1. BoardChrome Story - Nothing Visible
- Stories require slot props to be manually selected
- Default view shows empty chrome with no content
- Need a compelling Default story that demonstrates the component immediately

### 2. NavigationPad Contrast Issues
- Arrow icons may be hard to see on certain backgrounds
- Glass morphism effect may reduce icon visibility
- Need stronger default contrast while maintaining aesthetics

### 3. Missing MUI Component Theme Definitions
- No centralized component styles in theme (unlike ExpanseFrontend)
- Components don't leverage theme.components pattern
- Need TypeScript interfaces for component theming

### 4. Theme Components Stories Need Separation
- LightDarkModeToggle and ThemeColorSelector bundled together
- Should be separate stories for clarity
- Need more comprehensive demos of each variant

---

## Implementation Plan

### Phase 1: Fix BoardChrome Story Visibility

**Task 1.1: Add Default Story with Demo Content**
- Create a Default story that renders immediately with visible content
- Include sample chrome elements (bars, controls) in default view
- Add animated placeholder content to make it engaging

**Task 1.2: Improve Sample Components Contrast**
- Increase background alpha for glass effects
- Add subtle shadows for depth
- Ensure text meets WCAG AA contrast (4.5:1)

**Files:**
- `src/features/board/components/BoardChrome.stories.tsx`

---

### Phase 2: Improve NavigationPad Contrast

**Task 2.1: Increase Default Button Contrast**
- Increase icon opacity/saturation
- Add subtle outer glow or shadow for visibility
- Ensure buttons visible on both light and dark backgrounds

**Task 2.2: Add Visual Demonstration Stories**
- Show NavigationPad on various backgrounds
- Demonstrate high-contrast mode
- Add a "Dark Background" story variant

**Files:**
- `src/features/navigation-pad/utils/buttonStyles.ts`
- `src/features/navigation-pad/components/NavigationPad.stories.tsx`

---

### Phase 3: Add MUI Component Theme Definitions

**Task 3.1: Create Component Theme Type Definitions**
Following ExpanseFrontend pattern, create interfaces for layout components.

```typescript
// @expanse/theme/src/types/component-theme.types.ts
export interface ExpanseLayoutComponentThemeProps {
  NavigationPad?: {
    variants?: {
      default?: NavigationPadThemeVariant
      highContrast?: NavigationPadThemeVariant
      minimal?: NavigationPadThemeVariant
    }
  }
  BoardChrome?: {
    variants?: {
      default?: BoardChromeThemeVariant
      transparent?: BoardChromeThemeVariant
    }
  }
  FloatingToolbar?: {
    variants?: {
      default?: FloatingToolbarThemeVariant
    }
  }
}
```

**Task 3.2: Add Component Configs to Theme**
- Add component theme configs to light-theme.ts and dark-theme.ts
- Ensure each color variant has appropriate component styles

**Task 3.3: Use Theme Components in Components**
- Update NavigationPad to read from theme.components
- Update BoardChrome glass effects to use theme values
- Fall back to defaults if theme values not present

**Files:**
- `packages/@expanse/theme/src/types/component-theme.types.ts` (new)
- `packages/@expanse/theme/src/configs/light-theme.ts`
- `packages/@expanse/theme/src/configs/dark-theme.ts`
- (Component updates)

---

### Phase 4: Separate Theme Component Stories

**Task 4.1: Create LightDarkModeToggle.stories.tsx**
- Dedicated story for mode toggle
- Show all sizes (small, medium, large)
- Show with/without labels
- Show disabled state
- Interactive playground

**Task 4.2: Create ThemeColorSelector.stories.tsx**
- Dedicated story for color selector
- Show all sizes
- Show different visibleCount options
- Demonstrate GSAP animations
- Interactive playground

**Task 4.3: Update ThemeControls.stories.tsx**
- Keep as combined "showcase" story
- Reference the individual stories
- Focus on integration example

**Files:**
- `src/stories/LightDarkModeToggle.stories.tsx` (new)
- `src/stories/ThemeColorSelector.stories.tsx` (new)
- `src/stories/ThemeControls.stories.tsx` (update)

---

### Phase 5: Accessibility Improvements

**Task 5.1: Add Focus Indicators**
- Ensure all interactive elements have visible focus rings
- Use high-contrast focus colors
- Test keyboard navigation

**Task 5.2: ARIA Labels**
- Verify all buttons have proper aria-labels
- Add role attributes where needed
- Test with screen reader

**Task 5.3: Color Contrast Verification**
- Audit all text/background combinations
- Ensure WCAG AA (4.5:1) minimum
- Document high-contrast mode usage

---

## Success Criteria

1. **BoardChrome Default story** shows visible content immediately
2. **NavigationPad arrows** visible on both light/dark backgrounds
3. **Theme component types** defined and exported from @expanse/theme
4. **Separate stories** for LightDarkModeToggle and ThemeColorSelector
5. **All interactive elements** have visible focus states
6. **WCAG AA** contrast compliance

---

## Testing Plan

1. Run `pnpm storybook` in @expanse/shell
2. Open each component story
3. Toggle light/dark mode
4. Toggle all 6 color themes
5. Verify visibility and contrast
6. Test keyboard navigation
7. Run vitest tests

---

## Files to Modify

### New Files
- `packages/@expanse/theme/src/types/layout-components.types.ts`
- `packages/@expanse/shell/src/stories/LightDarkModeToggle.stories.tsx`
- `packages/@expanse/shell/src/stories/ThemeColorSelector.stories.tsx`

### Modified Files
- `packages/@expanse/shell/src/features/board/components/BoardChrome.stories.tsx`
- `packages/@expanse/shell/src/features/navigation-pad/components/NavigationPad.stories.tsx`
- `packages/@expanse/shell/src/features/navigation-pad/utils/buttonStyles.ts`
- `packages/@expanse/theme/src/configs/light-theme.ts`
- `packages/@expanse/theme/src/configs/dark-theme.ts`
- `packages/@expanse/theme/src/index.ts`
