# Layout Package Storybook Coverage Review

**Date:** April 5, 2026  
**Package:** `@expanse/shell`

## Summary

Review of all components/features in the layout package to identify what's not yet documented in Storybook.

---

## Current Storybook Coverage

### ✅ Fully Covered in Storybook

| Story File | Components Covered |
|------------|-------------------|
| `templates/*.stories.tsx` (7 files) | MinimalLayout, DashboardLayout, DocumentationLayout, PanelLayout, ResponsiveLayout, ComposableLayout, FullScreenLayout |
| `Primitives.stories.tsx` | LoadingSpinner, MaxWidthContainer, SectionSpacer, BackdropContainer, PageShell, StretchLayout |
| `Skeletons.stories.tsx` | LayoutSkeleton, ChatSkeleton, FullbleedSkeleton |
| `Views.stories.tsx` | SettingsPage, LayoutConfigurationPage |
| `Accessibility.stories.tsx` | SkipLinks, LiveAnnouncer |
| `ActionBar.stories.tsx` | ActionBar (with variants: simple, rich, collapsible) |
| `FloatingToolbar.stories.tsx` | FloatingToolbar, LayoutTypeSwitcher, MinimapToggle, SettingsButton |
| `Minimap.stories.tsx` | Minimap (with variants: dots, blocks, grid) |
| `NavigationPad.stories.tsx` | NavigationPad (with variants: default, compact, expanded, hints) |
| `ScreenOverlay.stories.tsx` | ScreenOverlay, ScreenOverlayGrid, ScreenOverlaySvg |
| `ScreenOverlayVariants.stories.tsx` | ScreenOverlay variant configurations |
| `Tile.stories.tsx` | Tile, TileSkeleton |
| `TypographyResponsive.stories.tsx` | TypographyResponsive |

---

## ❌ Missing from Storybook

### Priority 1: Components Without Stories

| Component | Location | Status | Notes |
|-----------|----------|--------|-------|
| **Snackbar** | `primitives/Snackbar.tsx` | 🔴 Missing | Toast notification component, needs LayoutProvider |
| **SimpleBar** | `features/action-bars/components/SimpleBar.tsx` | 🔴 Missing | Simplified ActionBar variant |
| **NavBar** | `features/action-bars/variants/NavBar.tsx` | 🔴 Missing | Navigation-focused ActionBar |
| **TileContent** | `features/tiles/components/TileContent.tsx` | 🔴 Missing | Inner tile content wrapper |
| **TileGrid** | `features/tiles/components/TileGrid.tsx` | 🔴 Missing | Grid container for tiles |
| **MinimapOverlay** | `features/minimap/components/MinimapOverlay.tsx` | 🔴 Missing | Overlay wrapper for minimap |
| **PageContent** | `components/PageContent.tsx` | 🔴 Missing | Page content wrapper |
| **PlaceholderPage** | `components/PlaceholderPage.tsx` | 🔴 Missing | Placeholder/loading page |

### Priority 2: Hooks & Utilities (Documentation Stories)

| Hook/Utility | Location | Notes |
|--------------|----------|-------|
| **useInfiniteGrid** | `infinite-grid/useInfiniteGrid.ts` | Complex hook for infinite scrolling grids - needs integration story |
| **useLayout** | `hooks/useLayout.ts` | Core layout hook - needs usage examples |
| **useNavigationHistory** | `navigation/useNavigationHistory.ts` | Navigation history management |
| **useDrawerState** | `features/structure/drawer/useDrawerState.ts` | Drawer open/close state |
| **useLoadingState** | `features/structure/loading/useLoadingState.ts` | Loading state management |
| **useSnackbarState** | `features/structure/snackbar/useSnackbarState.ts` | Snackbar/toast state |

### Priority 3: Providers (Integration Stories)

| Provider | Location | Notes |
|----------|----------|-------|
| **NavigationProvider** | `features/navigation/NavigationProvider.tsx` | Core navigation context |
| **GridNavigationProvider** | `features/navigation/GridNavigationProvider.tsx` | Grid-specific navigation |
| **LayoutProvider** | `features/structure/providers/LayoutProvider.tsx` | Master layout provider |
| **LayoutConfigProvider** | `features/structure/providers/LayoutConfigProvider.tsx` | Layout configuration |
| **BoardLayoutProvider** | `features/structure/providers/BoardLayoutProvider.tsx` | Board/grid layout |
| **NavigationHistoryProvider** | `navigation/NavigationHistoryProvider.tsx` | Navigation history context |
| **TileProvider** | `features/tiles/providers/TileProvider.tsx` | Tile context |

---

## 🧹 Cleanup Required

### Duplicate Story Files to Delete

Located in `/features/board/components/` (old location before rename):
- `BoardChrome.stories.tsx` → Replaced by `overlays/ScreenOverlay.stories.tsx`
- `BoardChromeVariants.stories.tsx` → Replaced by `overlays/ScreenOverlayVariants.stories.tsx`
- `ScreenOverlay.stories.tsx` → Duplicate
- `ScreenOverlayVariants.stories.tsx` → Duplicate

**Action:** Delete entire `/features/board/` directory if it only contains these story files.

---

## Implementation Plan

### Phase 1: Cleanup (5 min)
1. [ ] Delete `/features/board/` directory (duplicate stories)

### Phase 2: Component Stories (30-45 min)
2. [ ] Add Snackbar demo to `Primitives.stories.tsx`
3. [ ] Add SimpleBar & NavBar to `ActionBar.stories.tsx`
4. [ ] Add TileContent & TileGrid to `Tile.stories.tsx`
5. [ ] Add MinimapOverlay to `Minimap.stories.tsx`
6. [ ] Add PageContent & PlaceholderPage to `Accessibility.stories.tsx` or new file

### Phase 3: Integration Stories (45-60 min)
7. [ ] Create `Navigation.stories.tsx` - Provider usage patterns
8. [ ] Create `InfiniteGrid.stories.tsx` - Dynamic chunk loading demo
9. [ ] Create `Providers.stories.tsx` or `Integration.stories.tsx` - Combined provider usage
10. [ ] Create `Hooks.stories.tsx` - Hook documentation/examples

### Phase 4: Documentation (15-20 min)
11. [ ] Update `Architecture.mdx` with new structure
12. [ ] Add cross-references in component docs
13. [ ] Add "See also" links in related stories

---

## File Structure After Implementation

```
src/
├── docs/
│   ├── Architecture.mdx
│   ├── Introduction.mdx
│   ├── KeyboardNavigation.mdx
│   └── LayoutSystems.mdx
├── stories/                          # New: Consolidated integration stories
│   ├── Navigation.stories.tsx        # NEW
│   ├── InfiniteGrid.stories.tsx      # NEW
│   ├── Providers.stories.tsx         # NEW
│   └── Hooks.stories.tsx             # NEW
├── templates/*.stories.tsx           # ✅ Existing
├── primitives/Primitives.stories.tsx # ✅ + Add Snackbar
├── skeletons/Skeletons.stories.tsx   # ✅ Existing
├── views/Views.stories.tsx           # ✅ Existing
├── components/Accessibility.stories.tsx # ✅ + Add PageContent, PlaceholderPage
└── features/
    ├── action-bars/components/ActionBar.stories.tsx    # ✅ + Add SimpleBar, NavBar
    ├── floating-controls/.../FloatingToolbar.stories.tsx # ✅ Existing
    ├── minimap/.../Minimap.stories.tsx                 # ✅ + Add MinimapOverlay
    ├── navigation-pad/.../NavigationPad.stories.tsx    # ✅ Existing
    ├── overlays/.../ScreenOverlay.stories.tsx          # ✅ Existing
    ├── tiles/.../Tile.stories.tsx                      # ✅ + Add TileContent, TileGrid
    └── utility/.../TypographyResponsive.stories.tsx    # ✅ Existing
```

---

## Estimated Coverage After Implementation

| Category | Current | After |
|----------|---------|-------|
| Components | 85% | 98% |
| Hooks | 20% | 80% |
| Providers | 10% | 70% |
| Integration | 30% | 80% |
| **Overall** | **50%** | **85%** |
