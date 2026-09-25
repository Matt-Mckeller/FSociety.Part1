# Grid Navigation Layout Variants Plan

> **Status**: Planning  
> **Last Updated**: 2026-04-02  
> **Target Package**: `@expanse/shell`

## Overview

This document outlines the plan to consolidate grid navigation layout variants from multiple sources into the `@expanse/shell` package, making them reusable across 4eye apps.

## Current State Analysis

### 1. @expanse/shell/src/navigation (Existing)

Already has a well-structured grid navigation system:

```
@expanse/shell/src/navigation/
├── GridNavigationProvider.tsx   # Core context + keyboard navigation
├── components/
│   ├── Minimap.tsx              # Grid minimap component
│   ├── NavigationPad.tsx        # Arrow button navigation
│   ├── PageContent.tsx          # Page renderer
│   └── PlaceholderPage.tsx      # Default page for empty tiles
├── layouts/
│   ├── FullScreenLayout.tsx     # 100vh layout with bars + overlays
│   └── PanelLayout.tsx          # Embedded/split-screen layout
└── types.ts                     # TileConfig, Position, Direction, etc.
```

**Features**:
- `FullScreenLayout`: Configurable bars (top/bottom/left/right), minimap position, nav controls position
- `PanelLayout`: For embedded grid navigation (e.g., in a panel)
- CSS-based transitions (fade, slide, slide-fade, none)
- Tile configuration with SEO, display, and behavior settings

### 2. ExpanseFrontend/apps/symbol-grid (Reference Implementation)

More sophisticated implementation with domain/context awareness:

```
symbol-grid/src/components/
├── bars/
│   ├── ActionBar/               # Base action bar component
│   ├── TopActionBar/            # Domain selector, goals, projects
│   ├── LeftActionBar/           # Context actions
│   └── RightActionBar/          # Tool actions
├── layout/
│   ├── PageContent/             # Position-based routing
│   ├── PageTransition/          # Framer-motion transitions
│   └── SpecialPageWrapper/      # Special page decorations
└── ui/                          # UI primitives
```

**Features**:
- Domain context (education, work, personal, etc.)
- Goals and Projects selectors in top bar
- More complex action bar state management
- framer-motion for fluid animations

### 3. ExpanseFrontend/apps/expanse-services (New - Created by Agent)

Simplified implementation for documentation/demo site:

```
expanse-services/src/
├── types/grid.ts                # Position, PageType, SPECIAL_PAGES
├── context/
│   ├── NavigationContext.tsx    # Keyboard nav, history
│   └── ActionBarContext.tsx     # Bar state (default/edit/select/view/hidden)
├── components/
│   ├── bars/
│   │   ├── TopActionBar.tsx     # Home, title, settings, help
│   │   ├── LeftActionBar.tsx    # Page shortcuts (demos, components, etc.)
│   │   └── RightActionBar.tsx   # Feature shortcuts (auth, api, websockets)
│   ├── navigation/
│   │   ├── Minimap.tsx          # 9x9 clickable grid
│   │   └── NavigationControls.tsx  # Arrow buttons with WASD hints
│   ├── layout/
│   │   ├── PageContent.tsx      # Switch statement page routing
│   │   └── PageTransition.tsx   # framer-motion AnimatePresence
│   └── pages/                   # Page components
```

**Features**:
- Simpler setup, easy to understand
- Good for documentation/marketing sites
- Clean visual style with glass-morphism
- Arrow key hints in navigation controls

---

## Proposed Variants

### Variant 1: `DocumentationLayout`

Based on ExpanseFrontend/expanse-services. Best for:
- Marketing/landing pages
- Documentation sites
- Feature showcases

**Characteristics**:
- Clean, minimal action bars
- Focus on content
- Simple page registry
- Good for sites with fewer pages

### Variant 2: `DashboardLayout`

Based on symbol-grid. Best for:
- Productivity apps
- Multi-context applications
- Apps with goals/projects/domains

**Characteristics**:
- Rich action bars with selectors
- Domain/context switching
- Complex state management
- Deep page hierarchies

### Variant 3: `PanelLayout` (Existing)

Already in @expanse/shell. Best for:
- Split-screen views
- Embedded navigation widgets
- Secondary navigation contexts

---

## Component Variants

### NavigationControls Variants

1. **`NavigationPad`** (existing) - Simple arrow buttons
2. **`NavigationPadWithHints`** (new) - Arrow buttons + keyboard hints (WASD)
3. **`NavigationPadCompact`** (new) - Smaller, icon-only version

### Minimap Variants

1. **`Minimap`** (existing) - Standard clickable grid
2. **`MinimapOverlay`** (new) - Glass-morphism overlay style
3. **`MinimapInline`** (new) - For embedding in sidebars

### Action Bar Presets

1. **`SimpleActionBar`** - Title + icons (documentation style)
2. **`ContextActionBar`** - Domain selector + breadcrumbs (dashboard style)
3. **`CustomActionBar`** - Fully configurable slots

---

## Implementation Plan

### Phase 1: Consolidate Types (No Breaking Changes)
- [ ] Add `LayoutVariant` type: `'documentation' | 'dashboard' | 'panel'`
- [ ] Add `NavigationPadVariant` type: `'default' | 'with-hints' | 'compact'`
- [ ] Extend `FullScreenLayoutProps` with variant prop

### Phase 2: Add Documentation Layout
- [ ] Create `DocumentationLayout.tsx` based on expanse-services implementation
- [ ] Create `NavigationPadWithHints.tsx` - arrow buttons with keyboard hints
- [ ] Create `MinimapOverlay.tsx` - glass-morphism minimap
- [ ] Create `SimpleTopBar.tsx`, `SimpleSideBar.tsx` preset components
- [ ] Export from `@expanse/shell/navigation`

### Phase 3: Add Dashboard Layout
- [ ] Create `DashboardLayout.tsx` based on symbol-grid
- [ ] Port `ActionBar` system with slots
- [ ] Port domain/context selectors (if needed)
- [ ] Create `ContextActionBar.tsx` preset

### Phase 4: Update 4eye/apps/expanse-services
- [ ] Import from `@expanse/shell` instead of local components
- [ ] Use `DocumentationLayout` variant
- [ ] Add feature demos and documentation

### Phase 5: Documentation
- [ ] Update `@expanse/shell/docs/GRID_NAVIGATION.md`
- [ ] Add variant examples
- [ ] Add migration guide from local implementations

---

## API Design

### Proposed Usage

```tsx
// Variant 1: Documentation style (simple)
import { 
  GridNavigationProvider, 
  DocumentationLayout,
  NavigationPadWithHints,
  MinimapOverlay,
} from '@expanse/shell';

<GridNavigationProvider config={config}>
  <DocumentationLayout
    title="Feature Name"
    showMinimap
    showNavigationControls
    minimapComponent={MinimapOverlay}
    navControlsComponent={NavigationPadWithHints}
  >
    {(position, tile) => <PageContent position={position} tile={tile} />}
  </DocumentationLayout>
</GridNavigationProvider>

// Variant 2: Dashboard style (complex)
import { 
  GridNavigationProvider, 
  DashboardLayout,
  TopActionBar,
  LeftSideBar,
} from '@expanse/shell';

<GridNavigationProvider config={config}>
  <DashboardLayout
    topBar={<TopActionBar />}
    leftBar={<LeftSideBar />}
    showMinimap
  >
    <MainContent />
  </DashboardLayout>
</GridNavigationProvider>

// Variant 3: Existing panel layout
import { GridNavigationProvider, PanelLayout } from '@expanse/shell';

<GridNavigationProvider config={config}>
  <PanelLayout slots={{ bottom: <NavigationPad /> }}>
    <Content />
  </PanelLayout>
</GridNavigationProvider>
```

---

## File Changes Summary

### New Files to Create in @expanse/shell

```
src/navigation/
├── layouts/
│   ├── DocumentationLayout.tsx    # NEW
│   └── DashboardLayout.tsx        # NEW
├── components/
│   ├── NavigationPadWithHints.tsx # NEW
│   ├── MinimapOverlay.tsx         # NEW
│   ├── SimpleTopBar.tsx           # NEW
│   └── SimpleSideBar.tsx          # NEW
└── presets/                       # NEW directory
    ├── index.ts
    ├── documentation.ts           # Pre-configured for docs sites
    └── dashboard.ts               # Pre-configured for apps
```

### Files to Update

- `src/navigation/index.ts` - Export new components
- `src/navigation/types.ts` - Add variant types
- `src/index.ts` - Re-export from navigation

---

## Questions Resolved

1. **Where did the agent make changes?**
   - ExpanseFrontend/apps/expanse-services (not 4eye)
   - Created a simplified grid navigation system there

2. **How was the grid integrated?**
   - Created NavigationContext with keyboard listener
   - Created SPECIAL_PAGES registry mapping positions to page types
   - PageContent switches on position to render correct page
   - Minimap shows current position, allows click navigation
   - Action bars provide quick navigation shortcuts

3. **Where is the package?**
   - Reusable code → `4eye/packages/@expanse/shell`
   - App-specific code → `4eye/apps/expanse-services`

---

## Next Steps

1. Review and approve this plan
2. Start Phase 1: Consolidate Types
3. Continue through phases sequentially
4. Update this document as work progresses

---

## Progress Update (2026-04-02)

- Completed: Phase 1 (variant types in navigation types)
- Completed: Phase 2 (DocumentationLayout, NavigationPadWithHints, MinimapOverlay, SimpleTopBar, SimpleSideBar)
- Completed: Added DashboardLayout preset variant in `@expanse/shell`
- Completed: Wired `4eye/apps/expanse-services` root page to `GridNavigationProvider` + `DocumentationLayout` + `PageContent`
- Completed: Added sidebar shortcut items and page registry integration for home/theme/components
- Validation: App runs on `http://localhost:3473` with minimap, action bars, and keyboard navigation hints visible
- Known unrelated blocker: full app production build still fails in `apps/expanse-services/app/navigation/page.tsx` due to an existing React type portability annotation issue unrelated to this grid integration
