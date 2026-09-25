# @expanse/shell Package Reorganization Plan v2

**Date**: April 12, 2026  
**Branch**: `refactor/grid-to-mapgrid-rename`  
**Status**: Planning Phase

---

## Executive Summary

Reorganize the `@expanse/shell` package to clearly distinguish between two fundamental layout paradigms:

1. **Spatial Layouts** - Application-style, SPA architecture with HUD, minimap, spatial navigation
2. **Original Layouts** - Traditional web layouts with headers, navbars, standard navigation

This reorganization improves discoverability, reduces confusion, and creates a clear mental model for developers.

---

## Core Concept: Two Layout Paradigms

### Spatial Layouts (Application-Style)

**Characteristics:**
- SPA (Single Page Application) architecture
- HUD (Heads-Up Display) always visible
- Minimap for spatial navigation and position awareness
- No standard header/navbar
- Action bars, floating controls, orbs
- More "application" feel, even for web
- Immersive, full-viewport experiences
- 2D grid-based navigation system

**Use Cases:**
- Interactive dashboards
- Map-based interfaces
- Game-like experiences
- Immersive presentations
- Creative tools (design, editing)
- Data visualization explorers

**Components:**
- MapGridProvider, MapGridNavigationProvider
- Tiles, TileGrid, TileContent
- Minimap (position visualization)
- All HUD components (when integrated)
- ScreenOverlay

### Original Layouts (Traditional Web-Style)

**Characteristics:**
- Standard web content layouts
- Headers, navbars, footers
- Typical buttons on pages
- Lists and traditional hierarchical navigation
- No HUD overlay system
- More "website" feel
- Conventional scrolling/pagination

**Use Cases:**
- Documentation sites
- Marketing/landing pages
- Traditional dashboards (panels/widgets)
- Content blogs
- Standard web applications

**Components:**
- Standard layout templates
- Headers, sidebars, footers
- Navigation menus
- Page content containers

---

## Current State Analysis

### Current Directory Structure (`src/features/`)

```
features/
├── action-bars/          # HUD - Action bar components
├── action-dock/          # HUD - Corner-positioned buttons
├── floating-controls/    # HUD - Floating toolbar, buttons
├── hud-shared/           # HUD - Shared utilities (collapse handle)
├── minimap/              # Spatial - Position visualization
├── navigation/           # Ambiguous - Navigation state
├── navigation-pad/       # HUD - D-pad style navigation
├── orbs/                 # HUD - Floating action orbs
├── overlays/             # Spatial - ScreenOverlay, MapGridProvider
├── settings-bar/         # HUD - Configuration toggles
├── spatial-bar/          # HUD - HUD-style action bar
├── structure/            # Core - Layout/LayoutConfig providers
├── theme/                # Core - Theme utilities
├── tiles/                # Spatial - Tile components
├── toolbar/              # HUD - Mode/tool selection
└── utility/              # Core - Responsive typography, etc.
```

### Current Storybook Hierarchy

```
Layout Systems/
├── Building Blocks/
│   ├── Overlays/         # ScreenOverlay, Variants
│   └── Skeletons/
├── Components/
│   ├── Action Bars
│   ├── Floating Controls
│   └── Page Content
├── HUD/
│   ├── Action Dock
│   ├── Navigation Pad
│   ├── Orbs
│   ├── Overview
│   ├── Settings Bar
│   ├── Spatial Bar
│   └── Toolbar
├── Primitives/
├── Spatial Layouts/
│   ├── Map
│   ├── Navigation/
│   │   └── Minimap
│   └── Tiles
└── Standard Layouts/
    ├── Composable
    ├── Dashboard
    ├── Documentation
    ├── FullScreen
    ├── Minimal
    ├── Panel
    └── Responsive
```

### Issues with Current Structure

1. **Vague naming**: "overlays", "structure" don't indicate purpose
2. **Mixed concerns**: `overlays/` has spatial navigation + overlay UI
3. **Flat hierarchy**: 16 feature dirs at same level
4. **Duplicate navigation paths**: `features/navigation/` AND `navigation/` (different purposes)
5. **HUD scattered**: 9 HUD-related directories not grouped
6. **Template confusion**: FullScreen is spatial, but grouped with traditional
7. **Navigation complexity**: `features/navigation/` is entirely spatial-specific despite generic naming
8. **Provider splitting needed**: `features/structure/` has MapLayoutProvider (spatial) mixed with generic

### Critical Insight: Navigation Architecture

The current `features/navigation/` directory contains:

| Component | Purpose | Should Go To |
|-----------|---------|--------------|
| `MapGridNavigationProvider` | Spatial grid position state | `spatial/map/` |
| `MapGridNavigationContext` | Spatial navigation context | `spatial/map/` |
| `NavigationProvider` | Wrapper that uses MapGrid | `spatial/map/` |
| `NavigationContext` | Generic navigation interface | `spatial/map/` |
| `MapGridNavigationAdapter` | Bridges providers | `spatial/map/` |

**Result**: The entire `features/navigation/` directory is spatial-specific, even though the interfaces (`NavigationContext`, `useNavigation`) appear generic. They are implemented via `MapGridNavigationProvider`.

The top-level `navigation/` directory is different:
- `NavigationHistory` - Browser back/forward support (generic)
- Goes to `core/navigation/`

---

## Proposed Directory Structure

```
src/
├── core/                           # Shared infrastructure (paradigm-agnostic)
│   ├── providers/                  # Layout state providers
│   │   ├── LayoutProvider/         # Drawer, snackbar, loading state
│   │   ├── LayoutConfigProvider/   # Layout configuration context
│   │   ├── drawer/
│   │   ├── snackbar/
│   │   ├── loading/
│   │   └── hooks/
│   ├── navigation/                 # Browser navigation history
│   │   ├── NavigationHistory.ts
│   │   ├── NavigationHistoryProvider.tsx
│   │   └── useNavigationHistory.ts
│   ├── theme/                      # Theme utilities
│   └── utils/                      # Accessibility, typography, helpers
│
├── spatial/                        # Spatial Layout Paradigm
│   ├── map/                        # Map grid system (core spatial)
│   │   ├── providers/
│   │   │   ├── MapGridProvider.tsx           # Grid rendering context
│   │   │   ├── MapGridNavigationProvider.tsx # Navigation state
│   │   │   └── NavigationProvider.tsx        # High-level wrapper
│   │   ├── adapters/
│   │   │   └── MapGridNavigationAdapter.tsx
│   │   ├── contexts/
│   │   │   ├── MapGridNavigationContext.ts
│   │   │   └── NavigationContext.ts
│   │   ├── hooks/
│   │   │   ├── useMapGrid.ts
│   │   │   ├── useMapGridTiles.ts
│   │   │   └── useMapGridNavigation.ts
│   │   ├── types/
│   │   └── utils/
│   ├── MapLayoutProvider/          # Combined spatial provider
│   │   └── MapLayoutProvider.tsx   # Composes all spatial providers
│   ├── tiles/                      # Tile components
│   │   ├── components/
│   │   ├── providers/
│   │   ├── state/
│   │   └── hooks/
│   ├── minimap/                    # Position visualization
│   │   ├── components/
│   │   ├── hooks/
│   │   └── variants/
│   ├── overlays/                   # Screen overlay system
│   │   ├── ScreenOverlay.tsx
│   │   ├── ScreenOverlayGrid.tsx
│   │   └── ScreenOverlaySvg.tsx
│   └── infinite-grid/              # Infinite scrolling support
│       ├── InfiniteGridManager.ts
│       └── useInfiniteGrid.ts
│
├── hud-components/                 # HUD Component Library
│   ├── action-bars/                # Primary action bar
│   ├── action-dock/                # Corner-positioned buttons
│   ├── floating-controls/          # Floating toolbar, buttons
│   ├── navigation-pad/             # D-pad navigation
│   ├── orbs/                       # Action orbs
│   ├── settings-bar/               # Settings toggles
│   ├── spatial-bar/                # HUD-style top bar
│   ├── toolbar/                    # Tool/mode selection
│   └── shared/                     # Collapse handles, shared utilities
│
├── templates/                      # Pre-built Layouts
│   ├── spatial/                    # Spatial (Application) Templates
│   │   └── FullScreenLayout.tsx    # Full viewport + HUD
│   ├── original/                   # Original (Traditional) Templates
│   │   ├── DashboardLayout.tsx     # Panel-based dashboard
│   │   ├── DocumentationLayout.tsx # Docs/content site
│   │   ├── MinimalLayout.tsx       # Clean, content-first
│   │   ├── PanelLayout.tsx         # Split-screen views
│   │   ├── ComposableLayout.tsx    # Flexible composition
│   │   └── ResponsiveLayout.tsx    # Adaptive layouts
│   ├── configurations/             # Config presets (shared)
│   ├── hooks/
│   └── types/
│
├── components/                     # Generic UI components
│   ├── PageContent.tsx
│   └── PlaceholderPage.tsx
│
├── primitives/                     # Low-level building blocks
├── skeletons/                      # Loading skeletons
├── views/                          # Full-page views
└── hooks/                          # Shared hooks
```

---

## Proposed Storybook Hierarchy

```
Layout Systems/
│
├── Core/
│   ├── Primitives
│   ├── Skeletons
│   └── Page Content
│
├── Spatial Layouts/              # Application-style paradigm
│   ├── Overview                  # Intro + examples
│   ├── Map                       # MapGridProvider demos
│   ├── Minimap                   # Position visualization
│   ├── Tiles                     # Tile components
│   └── Overlays/
│       ├── ScreenOverlay
│       └── Variants
│
├── HUD Components/               # Floating UI elements
│   ├── Overview                  # All HUD components together
│   ├── Action Bars               # Primary action bar
│   ├── Action Dock               # Corner buttons
│   ├── Floating Controls         # Floating toolbar
│   ├── Navigation Pad            # D-pad navigation
│   ├── Orbs                      # Action orbs
│   ├── Settings Bar              # Settings toggles
│   ├── Spatial Bar               # HUD top bar
│   └── Toolbar                   # Tool selection
│
├── Original Templates/           # Traditional web layouts
│   ├── Dashboard
│   ├── Documentation
│   ├── Minimal
│   ├── Panel
│   ├── Composable
│   └── Responsive
│
└── Spatial Templates/            # Application layouts
    └── FullScreen
```

### Storybook Title Mapping

| Current Title | New Title |
|---------------|-----------|
| `Layout Systems/HUD/*` | `Layout Systems/HUD Components/*` |
| `Layout Systems/Spatial Layouts/Map` | `Layout Systems/Spatial Layouts/Map` |
| `Layout Systems/Spatial Layouts/Navigation/Minimap` | `Layout Systems/Spatial Layouts/Minimap` |
| `Layout Systems/Spatial Layouts/Tiles` | `Layout Systems/Spatial Layouts/Tiles` |
| `Layout Systems/Standard Layouts/*` | `Layout Systems/Original Templates/*` |
| `Layout Systems/Standard Layouts/FullScreen` | `Layout Systems/Spatial Templates/FullScreen` |
| `Layout Systems/Building Blocks/Overlays/*` | `Layout Systems/Spatial Layouts/Overlays/*` |
| `Layout Systems/Building Blocks/Skeletons` | `Layout Systems/Core/Skeletons` |
| `Layout Systems/Components/Page Content` | `Layout Systems/Core/Page Content` |
| `Layout Systems/Components/Action Bars` | `Layout Systems/HUD Components/Action Bars` |
| `Layout Systems/Components/Floating Controls` | `Layout Systems/HUD Components/Floating Controls` |
| `Layout Systems/Primitives` | `Layout Systems/Core/Primitives` |

---

## Template Classification

### Spatial Templates (Application-Style)

| Template | Reason |
|----------|--------|
| **FullScreenLayout** | Full viewport, HUD integration, immersive experience |

*Future spatial templates:*
- ImmersiveLayout (canvas-based)
- MapAppLayout (navigation-centric)
- GameLayout (real-time interactions)

### Original Templates (Traditional Web)

| Template | Reason |
|----------|--------|
| **DashboardLayout** | Panel-based, widget grids, traditional admin feel |
| **DocumentationLayout** | Content-first, sidebar navigation |
| **MinimalLayout** | Clean, content-first, standard page |
| **PanelLayout** | Split-screen, traditional panels |
| **ComposableLayout** | Slot-based composition, standard structure |
| **ResponsiveLayout** | Adaptive layouts, traditional responsive web |

---

## Migration Strategy

### Phase 1: Directory Restructure (No Breaking Changes)

**Goal**: Reorganize files while maintaining all existing exports.

1. Create new directory structure
2. Move files to new locations
3. Update internal imports
4. Keep `index.ts` exports identical

**Files to Move:**

| From | To | Notes |
|------|-----|-------|
| **Spatial Components** | | |
| `features/overlays/providers/MapGridProvider` | `spatial/map/` | Map grid rendering |
| `features/overlays/hooks/` | `spatial/map/hooks/` | useMapGrid, useMapGridTiles |
| `features/overlays/components/` | `spatial/overlays/` | ScreenOverlay |
| `features/overlays/types/`, `Map.stories.tsx` | `spatial/map/` | Types, stories |
| `features/navigation/` (entire dir) | `spatial/map/` | MapGridNavigationProvider, adapters, etc. |
| `features/structure/providers/MapLayoutProvider/` | `spatial/` | Spatial layout composition |
| `features/tiles/` | `spatial/tiles/` | Tile components |
| `features/minimap/` | `spatial/minimap/` | Minimap |
| `infinite-grid/` (top-level) | `spatial/infinite-grid/` | Infinite scrolling |
| **Core Infrastructure** | | |
| `features/structure/providers/LayoutProvider/` | `core/providers/` | Generic layout state |
| `features/structure/providers/LayoutConfigProvider/` | `core/providers/` | Layout configuration |
| `features/structure/drawer/` | `core/providers/drawer/` | Drawer state |
| `features/structure/snackbar/` | `core/providers/snackbar/` | Snackbar state |
| `features/structure/loading/` | `core/providers/loading/` | Loading state |
| `features/structure/hooks/` | `core/providers/hooks/` | Provider hooks |
| `navigation/` (top-level) | `core/navigation/` | NavigationHistory (browser history) |
| `features/theme/` | `core/theme/` | Theme utilities |
| `features/utility/` | `core/utils/` | Responsive typography, etc. |
| **HUD Components** | | |
| `features/action-bars/` | `hud-components/action-bars/` | Action bar |
| `features/action-dock/` | `hud-components/action-dock/` | Corner buttons |
| `features/floating-controls/` | `hud-components/floating-controls/` | Floating toolbar |
| `features/navigation-pad/` | `hud-components/navigation-pad/` | D-pad navigation |
| `features/orbs/` | `hud-components/orbs/` | Action orbs |
| `features/settings-bar/` | `hud-components/settings-bar/` | Settings toggles |
| `features/spatial-bar/` | `hud-components/spatial-bar/` | HUD top bar |
| `features/toolbar/` | `hud-components/toolbar/` | Tool/mode selection |
| `features/hud-shared/` | `hud-components/shared/` | Collapse handles |
| **Templates** | | |
| `templates/FullScreenLayout.*` | `templates/spatial/` | Spatial template |
| `templates/Dashboard\|Documentation\|Minimal\|Panel\|Composable\|Responsive*` | `templates/original/` | Original templates |
| `templates/configurations/` | `templates/configurations/` | Keep in place |
| `templates/hooks/`, `templates/types/` | `templates/` | Keep in place |

**Important:** After migration, `features/` directory should be deleted (empty).

### Phase 2: Storybook Titles Update

Update story file titles to match new hierarchy:

```tsx
// Before
title: 'Layout Systems/HUD/Orbs'

// After  
title: 'Layout Systems/HUD Components/Orbs'
```

### Phase 3: Index Export Organization

Update `src/index.ts` with organized sections:

```typescript
// =============================================================================
// Core Infrastructure (Paradigm-Agnostic)
// =============================================================================

// Layout state providers
export {
  LayoutProvider,
  LayoutContext,
  LayoutConfigProvider,
  useLayoutConfig,
  DEFAULT_LAYOUT_CONFIG,
} from "./core/providers";

export type {
  LayoutContextType,
  SnackbarProps,
  DrawerProps,
  LoadingSpinnerProps,
  LayoutType,
  LayoutConfiguration,
  LayoutConfigContextType,
} from "./core/providers";

// Browser navigation history
export {
  NavigationHistory,
  useNavigationHistory,
  NavigationHistoryProvider,
  useNavigationHistoryContext,
} from "./core/navigation";

export type {
  HistoryEntry,
  UseNavigationHistoryOptions,
  NavigationHistoryProviderProps,
} from "./core/navigation";

// Theme utilities
export * from "./core/theme";

// Accessibility & utilities
export * from "./core/utils";

// =============================================================================
// Spatial Layout System
// =============================================================================

// Map grid providers
export {
  MapLayoutProvider,
  NavigationProvider,
  MapGridProvider,
  MapGridNavigationProvider,
  useMapGridNavigation,
} from "./spatial";

export type {
  MapLayoutConfig,
  MapLayoutProviderProps,
  MapGridNavigationConfig,
  MapGridNavigationProviderProps,
  Position,
  Direction,
  NavigationMethod,
} from "./spatial";

// Navigation context (interface)
export { NavigationContext, useNavigation } from "./spatial/map";

// Tiles
export * from "./spatial/tiles";

// Minimap
export * from "./spatial/minimap";

// Screen overlays
export * from "./spatial/overlays";

// Infinite grid
export * from "./spatial/infinite-grid";

// =============================================================================
// HUD Components
// =============================================================================

export * from "./hud-components/action-bars";
export * from "./hud-components/action-dock";
export * from "./hud-components/floating-controls";
export * from "./hud-components/navigation-pad";
export * from "./hud-components/orbs";
export * from "./hud-components/settings-bar";
export * from "./hud-components/spatial-bar";
export * from "./hud-components/toolbar";
export * from "./hud-components/shared";

// =============================================================================
// Templates
// =============================================================================

export * from "./templates/spatial";
export * from "./templates/original";

// =============================================================================
// Generic Components & Utilities
// =============================================================================

export * from "./components";
export * from "./primitives";
export * from "./skeletons";
export * from "./views";
export * from "./hooks";
```

### Phase 4: Documentation

1. Update `templates/README.md` to explain paradigm distinction
2. Add `spatial/README.md` explaining spatial concepts
3. Add `hud-components/README.md` documenting HUD components
4. Update main package README

---

## Naming Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Spatial vs Traditional naming | "Spatial" vs "Original" | "Original" suggests the baseline/traditional approach |
| HUD directory name | `hud-components/` | Clear that it contains component library |
| Storybook HUD title | "HUD Components" | Matches directory, clear purpose |
| Minimap location | `spatial/minimap/` | Core spatial navigation tool |
| Template grouping | `templates/spatial/` + `templates/original/` | Clear paradigm separation |

---

## Validation Checklist

Before each phase:
- [ ] All TypeScript compiles (`pnpm exec tsc --noEmit`)
- [ ] All tests pass (`pnpm test`)
- [ ] Storybook builds (`pnpm storybook:build`)
- [ ] No circular dependencies
- [ ] Public API unchanged (exports identical)

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking imports in consuming apps | High | Phase 1 maintains all public exports unchanged |
| Storybook links break | Medium | Update systematically in Phase 2, verify with build |
| Merge conflicts | Medium | Complete on feature branch first, rebase if needed |
| Missing files during move | Low | Use `git mv` for history preservation, verify with tests |
| Circular dependencies | Medium | Review import chains before finalizing structure |
| Navigation import confusion | Medium | Document clearly that `useNavigation` is spatial-only |

### Special Considerations

**NavigationContext vs NavigationHistory confusion:**
- `NavigationContext` / `useNavigation()` → Spatial 2D grid position
- `NavigationHistory` / `useNavigationHistory()` → Browser history (back/forward)

These serve completely different purposes. Post-migration location makes this clearer:
- `spatial/map/` → Position navigation
- `core/navigation/` → Browser history

---

## Timeline Estimate

| Phase | Effort | Description |
|-------|--------|-------------|
| Phase 1 | 2-3 hours | Directory restructure |
| Phase 2 | 1 hour | Storybook titles |
| Phase 3 | 30 min | Index reorganization |
| Phase 4 | 1 hour | Documentation |
| **Total** | **4-6 hours** | Full reorganization |

---

## Related Documents

- [hud-feature-summary.md](../hud/hud-feature-summary.md) - HUD purposes and goals
- [board-to-map-migration.md](./board-to-map-migration.md) - Previous rename work
- [hud-iteration-plan.md](../hud/hud-iteration-plan.md) - HUD implementation details

---

## Appendix: Full File Inventory

### Current `features/` Contents (Accurate)

```
features/
├── action-bars/                    # HUD Component
│   ├── components/
│   │   ├── ActionBar.stories.tsx
│   │   ├── ActionBar.tsx
│   │   └── SimpleBar.tsx
│   ├── hooks/
│   ├── providers/
│   ├── resolvers/
│   ├── state/
│   ├── types/
│   ├── variants/
│   └── index.ts
│
├── action-dock/                    # HUD Component
│   ├── ActionDock.stories.tsx
│   ├── ActionDock.tsx
│   ├── ActionDockButton.tsx
│   ├── types.ts
│   └── index.ts
│
├── floating-controls/              # HUD Component
│   ├── components/
│   │   ├── FloatingToolbar.stories.tsx
│   │   └── FloatingToolbar.tsx
│   ├── hooks/
│   ├── types/
│   └── index.ts
│
├── hud-shared/                     # HUD Shared
│   ├── HudCollapseHandle.tsx
│   ├── HudOverview.stories.tsx
│   └── index.ts
│
├── minimap/                        # Spatial Component
│   ├── components/
│   │   ├── Minimap.stories.tsx
│   │   └── Minimap.tsx
│   ├── hooks/
│   ├── types.ts
│   ├── variants/
│   └── index.ts
│
├── navigation/                     # Core/Spatial Navigation
│   ├── MapGridNavigationContext.ts
│   ├── MapGridNavigationProvider.tsx
│   ├── NavigationContext.ts
│   ├── NavigationProvider.tsx
│   ├── adapters/
│   │   └── MapGridNavigationAdapter.tsx
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── index.ts
│
├── navigation-pad/                 # HUD Component
│   ├── components/
│   │   ├── NavigationPad.stories.tsx
│   │   └── NavigationPad.tsx
│   ├── hooks/
│   ├── types/
│   └── index.ts
│
├── orbs/                           # HUD Component
│   ├── ActionOrb.stories.tsx
│   ├── ActionOrb.tsx
│   ├── OrbCluster.tsx
│   ├── components/
│   ├── hooks/
│   ├── types.ts
│   ├── utils/
│   └── index.ts
│
├── overlays/                       # Spatial Components
│   ├── Map.stories.tsx
│   ├── components/
│   │   ├── ScreenOverlay.stories.tsx
│   │   ├── ScreenOverlay.tsx
│   │   ├── ScreenOverlayGrid.tsx
│   │   ├── ScreenOverlaySvg.tsx
│   │   ├── ScreenOverlayVariants.stories.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useMapGrid.ts
│   │   ├── useMapGridTiles.ts
│   │   └── index.ts
│   ├── providers/
│   │   ├── MapGridProvider.tsx
│   │   └── index.ts
│   ├── types/
│   └── index.ts
│
├── settings-bar/                   # HUD Component
│   ├── SettingsBar.stories.tsx
│   ├── SettingsBar.tsx
│   ├── SettingsBarToggle.tsx
│   ├── types.ts
│   └── index.ts
│
├── spatial-bar/                    # HUD Component
│   ├── SpatialBar.stories.tsx
│   ├── SpatialBar.tsx
│   ├── SpatialBarButton.tsx
│   ├── types.ts
│   └── index.ts
│
├── structure/                      # Core + Spatial Providers (MIXED)
│   ├── drawer/
│   ├── hooks/
│   ├── loading/
│   ├── providers/
│   │   ├── LayoutProvider/         # → core/providers/
│   │   ├── LayoutConfigProvider/   # → core/providers/
│   │   ├── MapLayoutProvider/      # → spatial/ (spatial-specific!)
│   │   └── index.ts
│   ├── snackbar/
│   └── index.ts
│
├── theme/                          # Core Theme
│   └── index.ts
│
├── tiles/                          # Spatial Component
│   ├── components/
│   │   ├── Tile.stories.tsx
│   │   └── Tile.tsx
│   ├── hooks/
│   ├── providers/
│   ├── state/
│   ├── types/
│   └── index.ts
│
├── toolbar/                        # HUD Component
│   ├── Toolbar.stories.tsx
│   ├── Toolbar.tsx
│   ├── ToolbarButton.tsx
│   ├── types.ts
│   └── index.ts
│
└── utility/                        # Core Utilities
    ├── typography-responsive/
    │   ├── TypographyResponsive.stories.tsx
    │   └── TypographyResponsive.tsx
    └── index.ts
```

### Top-Level `navigation/` Directory (Separate from features/)

```
navigation/                         # Core Navigation History → core/navigation/
├── NavigationHistory.ts
├── NavigationHistoryProvider.tsx
├── useNavigationHistory.ts
├── types.ts
└── index.ts
```

### Top-Level `infinite-grid/` Directory

```
infinite-grid/                      # Infinite scrolling → spatial/infinite-grid/
├── InfiniteGridManager.ts
├── useInfiniteGrid.ts
├── types.ts
└── index.ts
```

### Templates (Current → New Location)

```
templates/
├── configurations/                 # Config presets (keep together)
├── hooks/
├── types/
├── README.md
├── index.ts
│
├── FullScreenLayout.tsx            # → templates/spatial/
├── FullScreenLayout.stories.tsx
│
├── DashboardLayout.tsx             # → templates/original/
├── DashboardLayout.stories.tsx
├── DocumentationLayout.tsx
├── DocumentationLayout.stories.tsx
├── MinimalLayout.tsx
├── MinimalLayout.stories.tsx
├── PanelLayout.tsx
├── PanelLayout.stories.tsx
├── ComposableLayout.tsx
├── ComposableLayout.stories.tsx
├── ResponsiveLayout.tsx
└── ResponsiveLayout.stories.tsx
```

---

## Visual Comparison: Before vs After

### BEFORE: Current Structure (Flat & Ambiguous)

```
src/
├── features/                       # 16 directories at same level
│   ├── action-bars/                # What paradigm?
│   ├── action-dock/                # What paradigm?
│   ├── floating-controls/          # What paradigm?
│   ├── hud-shared/                 # HUD but scattered
│   ├── minimap/                    # Spatial but not grouped
│   ├── navigation/                 # MapGrid AND generic
│   ├── navigation-pad/             # HUD but not with others
│   ├── orbs/                       # HUD but scattered
│   ├── overlays/                   # Spatial + Screen UI mixed
│   ├── settings-bar/               # HUD
│   ├── spatial-bar/                # HUD
│   ├── structure/                  # Core providers
│   ├── theme/                      # Core
│   ├── tiles/                      # Spatial
│   ├── toolbar/                    # HUD
│   └── utility/                    # Core
├── navigation/                     # Duplicate! History here
├── templates/                      # All mixed together
│   ├── FullScreenLayout.tsx        # Spatial!
│   ├── DashboardLayout.tsx         # Original
│   ├── DocumentationLayout.tsx     # Original
│   └── ...
└── ...
```

### AFTER: Proposed Structure (Organized by Paradigm)

```
src/
├── core/                           # Shared infrastructure
│   ├── providers/                  # LayoutProvider, LayoutConfigProvider
│   │   ├── drawer/, snackbar/, loading/
│   │   └── hooks/
│   ├── navigation/                 # Browser history only
│   │   ├── NavigationHistory.ts
│   │   └── NavigationHistoryProvider.tsx
│   ├── theme/
│   └── utils/                      # Accessibility, typography
│
├── spatial/                        # === SPATIAL PARADIGM ===
│   ├── map/                        # Map grid system (THE core)
│   │   ├── providers/              # MapGrid*, Navigation*
│   │   ├── contexts/               # MapGridNavigationContext, NavigationContext
│   │   ├── adapters/
│   │   └── hooks/
│   ├── MapLayoutProvider/          # Combined spatial provider
│   ├── tiles/                      # Tile components
│   ├── minimap/                    # Position visualization
│   ├── overlays/                   # ScreenOverlay system
│   └── infinite-grid/              # Infinite scrolling
│
├── hud-components/                 # HUD Component Library
│   ├── action-bars/
│   ├── action-dock/
│   ├── floating-controls/
│   ├── navigation-pad/
│   ├── orbs/
│   ├── settings-bar/
│   ├── spatial-bar/
│   ├── toolbar/
│   └── shared/                     # Collapse handles
│
├── templates/
│   ├── spatial/                    # === SPATIAL TEMPLATES ===
│   │   └── FullScreenLayout.tsx
│   ├── original/                   # === ORIGINAL TEMPLATES ===
│   │   ├── DashboardLayout.tsx
│   │   ├── DocumentationLayout.tsx
│   │   └── ...
│   └── configurations/             # Shared config presets
│
├── components/                     # Generic UI
├── primitives/
├── skeletons/
├── views/
└── hooks/

# features/ directory → DELETED (empty after migration)
# navigation/ (top-level) → MERGED into core/navigation/
# infinite-grid/ (top-level) → MOVED to spatial/infinite-grid/
```
│       ├── DashboardLayout.tsx
│       ├── DocumentationLayout.tsx
│       ├── MinimalLayout.tsx
│       ├── PanelLayout.tsx
│       ├── ComposableLayout.tsx
│       └── ResponsiveLayout.tsx
│
├── components/                     # Generic UI
├── primitives/
├── skeletons/
├── views/
└── hooks/
```

---

## Key Decisions Rationale

### Why "Original" not "Traditional" or "Standard"?

- **"Original"** suggests the baseline web paradigm that came first
- **"Traditional"** works but sounds slightly dated
- **"Standard"** might imply "best practice" which isn't the intent
- "Original" pairs well with "Spatial" (new paradigm vs original paradigm)

### Why Minimap in `spatial/` not `hud-components/`?

The minimap is fundamentally a **spatial navigation tool**:
- It visualizes **position** within the 2D grid
- It requires `MapGridProvider` context to function
- It's not just a floating UI element - it represents the spatial model

HUD components are **control interfaces** that work *with* the spatial system but aren't definitionally part of it.

### Why separate `core/` directory?

These components are **paradigm-agnostic**:
- `LayoutProvider` - general layout state (drawer, snackbar, loading)
- `NavigationHistory` - browser back/forward support
- Theme utilities, accessibility helpers

They support both Spatial and Original layouts equally.
