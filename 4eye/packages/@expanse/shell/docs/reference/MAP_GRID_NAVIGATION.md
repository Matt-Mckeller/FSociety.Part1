# MapGridNavigation System

The 2D position-based navigation system for Spatial Layout.

> **Status:** Phase 3 Complete  
> **Last Updated:** April 2026

## Overview

MapGridNavigation transforms traditional URL-based navigation into a 2D spatial interface. Users navigate a grid of **Tiles** using keyboard, buttons, touch gestures, or a minimap.

**Related Documents:**
- [DICTIONARY.md](./DICTIONARY.md) — Terminology definitions
- [LAYOUT_PARADIGM_ARCHITECTURE.md](./LAYOUT_PARADIGM_ARCHITECTURE.md) — Switching between paradigms
- [CONCEPTS.md](./CONCEPTS.md) — Core concepts

### Key Features

| Feature | Description |
|---------|-------------|
| **Configurable Grid** | Width × Height (default 9×9) |
| **Multiple Input Methods** | Keyboard, buttons, minimap, touch |
| **SEO Support** | Per-tile meta tags, URL sync |
| **HUD Slots** | Top/bottom/left/right action bars |
| **Animations** | Configurable transitions between tiles |
| **Paradigm Switching** | Can switch to Basic Web Layout |

## Architecture

```
LayoutProvider
└── NavigationProvider (with MapGridNavigationAdapter)
    ├── Position State
    ├── Tile Registry
    ├── Navigation History
    └── Input Handlers
        ├── Keyboard (Arrow/WASD)
        ├── Touch (Swipe)
        └── Minimap (Click)
```

## Configuration

### MapGridNavigationConfig

```typescript
interface MapGridNavigationConfig {
  // Grid dimensions
  dimensions: {
    width: number;           // Default: 9
    height: number;          // Default: 9
    homePosition?: Position; // Default: center
    wrapAround?: boolean;    // Default: true
  };

  // Page definitions
  tiles: TileConfig[];

  // URL behavior
  routing: {
    mode: 'query' | 'path' | 'hybrid';
    basePath?: string;       // For path mode
    syncUrl?: boolean;       // Default: true
    initialFromUrl?: boolean;// Default: true
  };

  // Animations
  animation: NavigationAnimationConfig;
  tileInteraction: TileInteractionConfig;

  // Input methods
  inputs: InputConfig;

  // Layout slots
  layout: LayoutSlotsConfig;

  // Callbacks
  onNavigate?: (from: Position, to: Position, method: NavigationMethod) => void;
  onTileEnter?: (tile: TileConfig) => void;
  onTileLeave?: (tile: TileConfig) => void;
}
```

### TileConfig

Each grid position can have a tile configuration:

```typescript
interface TileConfig {
  // Identity
  position: Position;        // { x: 0-8, y: 0-8 }
  id: string;                // Unique identifier

  // SEO & URL
  seo: {
    title: string;           // Browser tab title
    description?: string;    // Meta description
    keywords?: string[];
    ogImage?: string;        // Open Graph image
  };
  url?: string;              // Custom URL path (e.g., "/settings")

  // Visual (minimap display)
  display: {
    label: string;           // Short label
    icon?: React.ComponentType;
    colors: {
      inactive: string;      // Default tile color
      active: string;        // Current position color
      hover?: string;        // On hover (optional)
    };
    category?: string;       // For grouping
  };

  // Behavior
  behavior?: {
    disabled?: boolean;      // Can't navigate to
    hidden?: boolean;        // Not shown in minimap
    external?: string;       // External URL (opens new tab)
  };
}
```

### Animation Configuration

```typescript
interface NavigationAnimationConfig {
  // Default for all navigation
  default: {
    type: 'fade' | 'slide' | 'scale' | 'none';
    duration: number;        // milliseconds
    easing?: string;         // gsap easing
  };

  // Adjacent navigation (one step up/down/left/right)
  adjacent?: {
    type: 'fade' | 'slide' | 'scale' | 'none';
    duration: number;
    slideDirection?: 'natural' | 'fixed';
  };

  // Direct jump (minimap click, navigateTo)
  directJump?: {
    type: 'fade' | 'scale' | 'zoom' | 'none';
    duration: number;
  };

  // Go home action
  goHome?: {
    type: 'fade' | 'scale' | 'zoom' | 'none';
    duration: number;
  };
}

// Defaults
const DEFAULT_ANIMATION: NavigationAnimationConfig = {
  default: { type: 'fade', duration: 200 },
  adjacent: { type: 'fade', duration: 200, slideDirection: 'natural' },
  directJump: { type: 'fade', duration: 300 },
  goHome: { type: 'scale', duration: 250 },
};
```

### Tile Interaction (Hover/Active States)

```typescript
interface TileInteractionConfig {
  hover: {
    scale: number;           // Default: 1.1
    duration: number;        // Default: 200ms
    shadow?: boolean;        // Add shadow
    showLabel?: boolean;     // Reveal label
  };

  active: {
    scale: number;           // Default: 1.0
    ringWidth?: number;      // Selection ring width
    ringColor?: string;      // Ring color (defaults to active color)
    pulseAnimation?: boolean;// Subtle pulse
  };

  disabled: {
    opacity: number;         // Default: 0.5
    cursor: string;          // Default: 'not-allowed'
  };
}
```

## Input Methods

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `↑` or `W` | Navigate up |
| `↓` or `S` | Navigate down |
| `←` or `A` | Navigate left |
| `→` or `D` | Navigate right |
| `H` | Go home (optional) |
| `Escape` | Close minimap |

Keyboard navigation respects input focus - no navigation when typing in a text field.

### Button Navigation (NavigationPad)

D-pad style control, typically in bottom-right:

```tsx
<NavigationPad
  size="medium"           // 'compact' | 'medium' | 'full'
  showHome={true}         // Center home button
  onNavigate={navigate}
  canNavigate={canNavigate}
/>
```

### Minimap

Click-to-navigate overview of the entire grid:

```tsx
<Minimap
  variant="overlay"       // 'overlay' | 'embedded'
  showLabels={false}      // Show tile labels
  size="medium"           // 'small' | 'medium' | 'large'
/>
```

### Touch/Swipe

Swipe gestures on designated zones:

```typescript
inputs: {
  touch: {
    enabled: true,         // Default: true on mobile
    swipeThreshold: 50,    // Pixels
    zones: 'edges',        // 'edges' | 'everywhere' | 'disabled'
  }
}
```

### Scroll Behavior

How scroll interacts with grid navigation:

| Mode | Behavior |
|------|----------|
| `content-only` (default) | Scroll only affects page content |
| `edge-navigate` | At content edge, scroll triggers grid navigation |

```typescript
inputs: {
  scroll: {
    mode: 'content-only',  // Default
    edgeThreshold: 50,     // Pixels from edge
  }
}
```

## Layout Slots

GridLayout provides four slots for action bars:

```
┌──────────────────────────────────────────────────────┐
│                    TOP BAR                            │
│  [Logo]                              [User] [Menu]   │
├────────┬─────────────────────────────────┬───────────┤
│        │                                 │           │
│  LEFT  │                                 │   RIGHT   │
│  BAR   │         MAIN CONTENT            │   BAR     │
│        │                                 │           │
│        │   (Page rendered based on       │           │
│        │    current grid position)       │           │
│        │                                 │           │
├────────┴─────────────────────────────────┴───────────┤
│                   BOTTOM BAR                          │
│                                    [◄][▲][▼][►] [🗺] │
└──────────────────────────────────────────────────────┘
```

### ActionBar Component

```tsx
<ActionBar
  position="top"           // 'top' | 'bottom' | 'left' | 'right'
  height={64}              // For top/bottom
  width={240}              // For left/right
  sticky={true}
  collapsible={false}
  defaultCollapsed={false}
>
  <YourContent />
</ActionBar>
```

### Configuration

```typescript
layout: {
  top: {
    enabled: true,
    height: 64,
    sticky: true,
    content: <AppHeader />,
  },
  bottom: {
    enabled: true,
    height: 72,
    sticky: true,
    // Default: NavigationPad + MinimapToggle
  },
  left: {
    enabled: false,
    width: 240,
    collapsible: true,
  },
  right: {
    enabled: false,
    width: 320,
    collapsible: true,
  },
}
```

## URL & SEO

### URL Modes

| Mode | URL Format | Example |
|------|------------|---------|
| `query` | Query params | `?x=4&y=4` |
| `path` | Path segments | `/grid/4/4` |
| `hybrid` | Tile URL if defined, else query | `/settings` or `?x=1&y=3` |

### SEO Updates

On navigation, the system automatically updates:
- `document.title`
- `<meta name="description">`
- `<meta name="keywords">`
- Open Graph tags (`og:title`, `og:description`, `og:image`)

## useNavigation Hook

Single hook for all navigation state and actions:

```typescript
const {
  // Position State
  position,                // { x: number, y: number }
  gridSize,                // { width: number, height: number }
  homePosition,            // { x: number, y: number }

  // Navigation Actions
  navigate,                // (direction: Direction) => void
  navigateTo,              // (x: number, y: number) => void
  goHome,                  // () => void
  goBack,                  // () => void (uses history)

  // Query Helpers
  canNavigate,             // (direction: Direction) => boolean
  isValidPosition,         // (x: number, y: number) => boolean
  isHome,                  // boolean

  // Tile Info
  currentTile,             // TileConfig | null
  getTileAt,               // (x: number, y: number) => TileConfig | null

  // Mode
  navigationStyle,         // 'traditional' | 'grid'
  setNavigationStyle,      // (style: NavigationStyle) => void
  gridEnabled,             // boolean (app config allows grid)
} = useNavigation();
```

## Example: Full Configuration

```tsx
const gridConfig: MapGridNavigationConfig = {
  dimensions: {
    width: 9,
    height: 9,
    homePosition: { x: 4, y: 4 },
    wrapAround: true,
  },

  tiles: [
    {
      position: { x: 4, y: 4 },
      id: 'home',
      seo: { title: 'Home', description: 'Welcome to the app' },
      display: {
        label: 'Home',
        icon: HomeIcon,
        colors: { inactive: '#64748b', active: '#3b82f6' },
        category: 'core',
      },
    },
    {
      position: { x: 8, y: 0 },
      id: 'settings',
      seo: { title: 'Settings', description: 'App settings' },
      url: '/settings',
      display: {
        label: 'Settings',
        icon: SettingsIcon,
        colors: { inactive: '#64748b', active: '#8b5cf6' },
        category: 'system',
      },
    },
    // ... more tiles
  ],

  routing: {
    mode: 'hybrid',
    syncUrl: true,
    initialFromUrl: true,
  },

  animation: {
    default: { type: 'fade', duration: 200 },
    adjacent: { type: 'slide', duration: 250, slideDirection: 'natural' },
    directJump: { type: 'fade', duration: 300 },
  },

  tileInteraction: {
    hover: { scale: 1.1, duration: 200, shadow: true },
    active: { scale: 1.0, ringWidth: 2, pulseAnimation: true },
    disabled: { opacity: 0.5, cursor: 'not-allowed' },
  },

  inputs: {
    keyboard: { enabled: true },
    buttons: { enabled: true, position: 'bottom-right', style: 'dpad' },
    minimap: { enabled: true, position: 'top-right', size: 'medium' },
    touch: { enabled: true, zones: 'edges' },
    scroll: { mode: 'content-only' },
  },

  layout: {
    top: { enabled: true, height: 64, content: <AppHeader /> },
    bottom: { enabled: true, height: 72 },
  },

  onNavigate: (from, to, method) => {
    console.log(`Navigated from (${from.x},${from.y}) to (${to.x},${to.y}) via ${method}`);
  },
};

// Usage
<LayoutProvider gridConfig={gridConfig}>
  <App />
</LayoutProvider>
```

## Related Files

- [IMPLEMENTATION_PLAN.md](../../../docs/planning/expanse-packages/IMPLEMENTATION_PLAN.md) - Phase 3.5-3.9
- Types: `src/navigation/types/MapGridNavigation.types.ts`
- Provider: `src/navigation/MapGridNavigationProvider.tsx`
- Hook: `src/navigation/MapGridNavigationContext.ts` (useMapGridNavigation)
- Components: `src/navigation/components/`

## Changelog

| Date | Change |
|------|--------|
| January 2025 | Renamed GridNavigation → MapGridNavigation |
| April 2026 | Initial architecture planning |
