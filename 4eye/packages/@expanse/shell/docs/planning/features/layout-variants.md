# Layout Variants Feature Spec

## Overview

Phase 4 of the HUD system provides a flexible content layout system with 7 layout variants, responsive utilities, and a layout switching UI.

## Components

### ContentArea

Main container that renders content in one of 7 layout configurations.

```tsx
import { ContentArea } from "@expanse/shell";

<ContentArea
  layout="grid-2x2"
  panels={[
    { id: "1", content: <Panel1 />, label: "Panel 1" },
    { id: "2", content: <Panel2 />, label: "Panel 2" },
    { id: "3", content: <Panel3 />, label: "Panel 3" },
    { id: "4", content: <Panel4 />, label: "Panel 4" },
  ]}
  gap={16}
  padding={16}
/>
```

### Layout Types

| Layout | Description | Panels | Min Width |
|--------|-------------|--------|-----------|
| `single` | Full-width single panel | 1 | 0 |
| `grid-2x2` | 2x2 grid of equal panels | 4 | 600px |
| `side-by-side` | Two panels side by side | 2 | 600px |
| `stacked` | Vertical stack of panels | 2+ | 0 |
| `main-sidebar` | Large main + narrow sidebar | 2 | 768px |
| `focus` | Centered content with max-width | 1 | 0 |
| `light-dark-split` | Side-by-side with contrasting themes | 2 | 800px |

### ContentPanel

Individual panel wrapper with optional header and footer.

```tsx
<ContentPanel
  label="Settings"
  icon={<SettingsIcon />}
  footer={<SaveButton />}
  elevation={1}
>
  {content}
</ContentPanel>
```

### LayoutSwitcher

UI component for changing layouts. Three variants available:

```tsx
// Dropdown menu (default)
<LayoutSwitcher
  variant="dropdown"
  value="grid-2x2"
  onChange={setLayout}
  availableLayouts={["single", "grid-2x2", "side-by-side"]}
/>

// Icon buttons
<LayoutSwitcher variant="icons" value={layout} onChange={setLayout} />

// Vertical menu with previews
<LayoutSwitcher variant="menu" value={layout} onChange={setLayout} />
```

### LayoutPreview

Visual representation of a layout pattern.

```tsx
<LayoutPreview layout="grid-2x2" size={48} showLabel />
```

### LayoutPreviewGrid

Grid of all layout previews for selection.

```tsx
<LayoutPreviewGrid
  value="single"
  onChange={setLayout}
  availableLayouts={availableLayouts}
/>
```

## Responsive Utilities

### Breakpoints

```tsx
import { BREAKPOINTS, useBreakpoint, usePlatform } from "@expanse/shell";

// Standard breakpoints
// xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536

const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
const platform = usePlatform(); // 'mobile' | 'tablet' | 'desktop'
```

### Layout Suitability

```tsx
import {
  isLayoutSuitableForWidth,
  getSuitableLayouts,
  getFallbackLayout,
} from "@expanse/shell";

// Check if layout works at current width
const suitable = isLayoutSuitableForWidth("grid-2x2", window.innerWidth);

// Get all layouts that work at a width
const layouts = getSuitableLayouts(800); // Returns layouts that work at 800px

// Get fallback if layout doesn't fit
const layout = getFallbackLayout("grid-2x2", 400); // Returns 'single'
```

### Responsive Layout Hooks

```tsx
import {
  useResponsiveLayout,
  useAvailableLayouts,
  useLayoutWithFallback,
  useResponsiveLayoutManager,
} from "@expanse/shell";

// Get appropriate layout for viewport
const layout = useResponsiveLayout("grid-2x2"); // Falls back if too narrow

// Get layouts suitable for current viewport
const available = useAvailableLayouts();

// Track fallback status
const { layout, isFallback, originalLayout } = useLayoutWithFallback("grid-2x2");

// Full layout management
const {
  layout,
  breakpoint,
  platform,
  setLayout,
  resetToDefault,
} = useResponsiveLayoutManager({
  defaults: {
    xs: "single",
    md: "side-by-side",
    lg: "grid-2x2",
  },
  autoSwitch: true,
  onAutoSwitch: (newLayout, breakpoint) => {
    console.log(`Auto-switched to ${newLayout} at ${breakpoint}`);
  },
});
```

### Layout Info Helper

```tsx
import { LAYOUT_INFO, getAllLayouts, isMultiPanelLayout } from "@expanse/shell";

const info = LAYOUT_INFO["grid-2x2"];
// { id: "grid-2x2", label: "Grid 2x2", description: "...", panels: 4, minWidth: 600, icon: GridIcon }

const allLayouts = getAllLayouts(); // Array of LayoutInfo
const isMulti = isMultiPanelLayout("grid-2x2"); // true
```

## Integration with HudContext

The layout system reads the current layout from HudContext:

```tsx
import { useHudState, useHudActions } from "@expanse/shell";

function LayoutIntegration() {
  const { contentLayout } = useHudState();
  const { setContentLayout } = useHudActions();

  return (
    <LayoutSwitcher
      value={contentLayout}
      onChange={setContentLayout}
    />
  );
}
```

## Theme Support

All components support MUI theming and respond to light/dark mode. The `light-dark-split` layout specifically shows content in contrasting themes.

## Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation supported
- Focus indicators visible
- Screen reader announcements for layout changes

## Files

- [ContentArea.tsx](../src/hud-complete/components/layout/ContentArea.tsx) - Main layout component
- [LayoutSwitcher.tsx](../src/hud-complete/components/layout/LayoutSwitcher.tsx) - Layout switching UI
- [responsiveUtils.ts](../src/hud-complete/components/layout/responsiveUtils.ts) - Breakpoint utilities
- [index.ts](../src/hud-complete/components/layout/index.ts) - Module exports
