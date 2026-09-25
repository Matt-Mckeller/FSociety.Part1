# @expanse/shell Quick Reference

## Two Layout Paradigms

```
┌─────────────────────────────────────────────────────────────────────┐
│                         @expanse/shell                             │
├─────────────────────────────┬───────────────────────────────────────┤
│     SPATIAL PARADIGM        │       ORIGINAL PARADIGM              │
│   (Application-Style)       │     (Traditional Web)                │
├─────────────────────────────┼───────────────────────────────────────┤
│ • SPA architecture          │ • Standard page structure            │
│ • HUD always visible        │ • Headers, navbars, footers          │
│ • Minimap navigation        │ • Text menus, breadcrumbs            │
│ • Full-viewport immersive   │ • Scrolling content pages            │
│ • Action orbs, floating UI  │ • Buttons on page                    │
│ • 2D grid-based position    │ • Hierarchical navigation            │
│ • Game/app feel             │ • Website feel                       │
├─────────────────────────────┼───────────────────────────────────────┤
│ Templates:                  │ Templates:                           │
│   • FullScreenLayout        │   • DashboardLayout                  │
│                             │   • DocumentationLayout              │
│                             │   • MinimalLayout                    │
│                             │   • PanelLayout                      │
│                             │   • ComposableLayout                 │
│                             │   • ResponsiveLayout                 │
└─────────────────────────────┴───────────────────────────────────────┘
```

## Directory Structure (Proposed)

```
src/
├── core/                 # Paradigm-agnostic infrastructure
│   ├── providers/        LayoutProvider, LayoutConfigProvider, drawer, snackbar, loading
│   ├── navigation/       NavigationHistory (browser back/forward only)
│   ├── theme/            Theme utilities
│   └── utils/            Accessibility, typography, helpers
│
├── spatial/              # SPATIAL PARADIGM components
│   ├── map/              MapGrid*, Navigation*, contexts, adapters, hooks
│   ├── MapLayoutProvider/ Combined spatial provider
│   ├── tiles/            Tile, TileGrid, TileContent
│   ├── minimap/          Minimap
│   ├── overlays/         ScreenOverlay
│   └── infinite-grid/    InfiniteGridManager
│
├── hud-components/       # HUD Component Library
│   ├── action-bars/      ActionBar, SimpleBar
│   ├── action-dock/      ActionDock, ActionDockButton
│   ├── floating-controls/ FloatingToolbar
│   ├── navigation-pad/   NavigationPad
│   ├── orbs/             ActionOrb, OrbCluster
│   ├── settings-bar/     SettingsBar, SettingsBarToggle
│   ├── spatial-bar/      SpatialBar, SpatialBarButton
│   ├── toolbar/          Toolbar, ToolbarButton
│   └── shared/           HudCollapseHandle
│
├── templates/
│   ├── spatial/          FullScreenLayout
│   ├── original/         Dashboard, Documentation, Minimal, Panel, Composable, Responsive
│   └── configurations/   Shared config presets
│
└── [other]               components, primitives, skeletons, views, hooks
```

## Component Classification

### Core (Shared Infrastructure)
| Component | Purpose |
|-----------|---------|
| `LayoutProvider` | Global layout state (drawer, snackbar, loading) |
| `LayoutConfigProvider` | Layout configuration context |
| `NavigationHistory` | Browser back/forward support (NOT position!) |

### Spatial (2D Grid Navigation)
| Component | Purpose |
|-----------|---------|
| `MapLayoutProvider` | Combined provider for spatial layouts |
| `MapGridProvider` | Map grid rendering context |
| `MapGridNavigationProvider` | Grid position/navigation state |
| `NavigationProvider` | High-level wrapper (uses MapGrid internally) |
| `NavigationContext` / `useNavigation` | Position navigation interface |
| `Tile` / `TileGrid` | Tile components |
| `Minimap` | Position visualization |
| `ScreenOverlay` | Full-screen overlay layer |

### HUD Components (Floating UI)
| Component | Purpose |
|-----------|---------|
| `ActionBar` | Primary action buttons |
| `ActionDock` | Corner-positioned button groups |
| `ActionOrb` | Floating action orbs |
| `NavigationPad` | D-pad navigation control |
| `SpatialBar` | HUD-style top bar |
| `SettingsBar` | Configuration toggles |
| `Toolbar` | Mode/tool selection |
| `FloatingToolbar` | Floating toolbar container |

## Storybook Hierarchy

```
Layout Systems/
├── Core/
│   ├── Primitives
│   ├── Skeletons
│   └── Page Content
├── Spatial Layouts/
│   ├── Map
│   ├── Minimap
│   ├── Tiles
│   └── Overlays/
├── HUD Components/
│   ├── Overview
│   ├── Action Bars
│   ├── Action Dock
│   ├── Floating Controls
│   ├── Navigation Pad
│   ├── Orbs
│   ├── Settings Bar
│   ├── Spatial Bar
│   └── Toolbar
├── Original Templates/
│   ├── Dashboard
│   ├── Documentation
│   ├── Minimal
│   ├── Panel
│   ├── Composable
│   └── Responsive
└── Spatial Templates/
    └── FullScreen
```

## When to Use Which Paradigm

### Use Spatial When:
- Building immersive/interactive experiences
- Need persistent HUD UI elements
- 2D navigation makes sense (maps, boards, canvases)
- Application/game-like interactions
- AI assistant integration with orbs
- Creative tools, data visualization

### Use Original When:
- Standard content websites
- Documentation/marketing pages
- Traditional admin dashboards
- Conventional navigation patterns
- SEO-focused pages
- Content-first layouts

## Key Imports

```typescript
// Core (paradigm-agnostic)
import { LayoutProvider, LayoutConfigProvider } from '@expanse/shell';
import { NavigationHistoryProvider, useNavigationHistory } from '@expanse/shell';

// Spatial - High-level (recommended)
import { MapLayoutProvider } from '@expanse/shell';  // All-in-one spatial provider
import { useNavigation } from '@expanse/shell';       // Position navigation

// Spatial - Low-level
import { MapGridProvider, MapGridNavigationProvider } from '@expanse/shell';
import { useMapGrid, useMapGridNavigation } from '@expanse/shell';

// Spatial Components
import { Tile, TileGrid } from '@expanse/shell';
import { Minimap } from '@expanse/shell';
import { ScreenOverlay } from '@expanse/shell';

// HUD Components
import { ActionBar, ActionOrb, ActionDock } from '@expanse/shell';
import { NavigationPad, SpatialBar, Toolbar } from '@expanse/shell';
import { SettingsBar, FloatingToolbar } from '@expanse/shell';

// Templates
import { FullScreenLayout } from '@expanse/shell';  // Spatial
import { DashboardLayout, DocumentationLayout } from '@expanse/shell';  // Original
```

## Common Confusion

| Hook | Purpose | Location After Migration |
|------|---------|--------------------------|
| `useNavigation()` | 2D grid position navigation | `spatial/map/` |
| `useNavigationHistory()` | Browser back/forward | `core/navigation/` |

These are **completely different** - don't confuse them!

---

*See [layout-package-reorganization-v2.md](./layout-package-reorganization-v2.md) for full migration plan.*
