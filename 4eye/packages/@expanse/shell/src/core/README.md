# Core Infrastructure

Paradigm-agnostic shared infrastructure used by both Spatial and Basic Web layouts.

## What's in Core?

Core contains foundational components and utilities that work with **both** Spatial and Basic Web layout paradigms:

## Directory Structure

```
core/
├── providers/              # Layout state management
│   ├── LayoutProvider/    # Drawer, snackbar, loading state
│   ├── LayoutConfigProvider/  # Layout configuration context
│   ├── drawer/            # Drawer state hooks
│   ├── snackbar/          # Snackbar state hooks
│   ├── loading/           # Loading state hooks
│   └── hooks/             # Layout-related hooks
├── navigation/             # Browser navigation history
│   ├── NavigationHistory.ts
│   ├── NavigationHistoryProvider.tsx
│   └── useNavigationHistory.ts
├── theme/                  # Theme utilities
└── utils/                  # Accessibility, typography, helpers
    └── typography-responsive/  # Responsive typography
```

## Key Components

### LayoutProvider
Central state management for layout features:

```tsx
import { LayoutProvider } from '@expanse/shell';

<LayoutProvider>
  {/* Layout components have access to drawer, snackbar, loading state */}
  <YourLayout />
</LayoutProvider>
```

**Provides:**
- Drawer state (open/close, content)
- Snackbar notifications
- Loading indicators
- Layout background

### LayoutConfigProvider
Configuration context for layout templates:

```tsx
import { LayoutConfigProvider } from '@expanse/shell';

<LayoutConfigProvider config={layoutConfig}>
  <MinimalLayout />
</LayoutConfigProvider>
```

### NavigationHistory
Browser history management (not spatial navigation):

```tsx
import { useNavigationHistory } from '@expanse/shell';

const { goBack, goForward, canGoBack, canGoForward } = useNavigationHistory();

// Wrap with provider
<NavigationHistoryProvider>
  <App />
</NavigationHistoryProvider>
```

**Note:** This is browser back/forward, NOT spatial grid navigation. For spatial grid navigation, see `../spatial/map/`.

## Hooks

### Layout Hooks

```tsx
import { 
  useLayoutBackground,
  useLayoutTransition,
  useContentArea,
  useOverlayPosition 
} from '@expanse/shell';

// Background management
const { background, setBackground } = useLayoutBackground();

// Transition effects
const { triggerTransition } = useLayoutTransition();

// Content area calculations
const { contentWidth, contentHeight } = useContentArea();

// Overlay positioning
const { calculatePosition } = useOverlayPosition();
```

### State Hooks

```tsx
import { useDrawerState, useSnackbarState, useLoadingState } from '@expanse/shell';

// Drawer
const { isOpen, open, close, content, setContent } = useDrawerState();

// Snackbar
const { showSuccess, showError, showInfo, close } = useSnackbarState();

// Loading
const { isLoading, startLoading, stopLoading } = useLoadingState();
```

## Utilities

### Responsive Typography

```tsx
import { TypographyResponsive } from '@expanse/shell';

<TypographyResponsive 
  variant="h1"
  baseSize={{ mobile: 24, tablet: 32, desktop: 48 }}
/>
```

Automatically scales typography based on viewport width.

## Theme Integration

Core utilities integrate with MUI theme system:

```tsx
import { ThemeProvider } from '@mui/material';
import { useLayoutBackground } from '@expanse/shell';

function Layout() {
  const { setBackground } = useLayoutBackground();
  const theme = useTheme();
  
  // Background from theme
  setBackground(theme.palette.background.default);
}
```

## When to Use Core vs Spatial vs HUD

| Location | Purpose |
|----------|---------|
| **Core** | Shared infrastructure (drawer, snackbar, browser history) |
| **Spatial** | 2D grid navigation, map system, position-based |
| **HUD Components** | Floating UI overlays (action bars, orbs, nav pad) |

**Example:**
```tsx
import { LayoutProvider } from '@expanse/shell'; // Core
import { MapGridProvider } from '@expanse/shell'; // Spatial
import { ActionBar } from '@expanse/shell'; // HUD

<LayoutProvider> {/* Core state */}
  <MapGridProvider> {/* Spatial navigation */}
    <ActionBar /> {/* HUD overlay */}
  </MapGridProvider>
</LayoutProvider>
```

## Exports

All core components are re-exported from package root:

```tsx
import {
  LayoutProvider,
  LayoutConfigProvider,
  useNavigationHistory,
  useDrawerState,
  useSnackbarState,
  useLoadingState
} from '@expanse/shell';
```

## Related

- [../spatial/README.md](../spatial/README.md) - Spatial layoutsystem (2D grid navigation)
- [../hud-components/README.md](../hud-components/README.md) - HUD overlay components
- [../templates/README.md](../templates/README.md) - Pre-built templates
