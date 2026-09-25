# Layout Package Reorganization Plan

> **Status: COMPLETED**
> 
> **Goal**: Clarify the distinction between **Web Layouts** and **Spatial Layouts** in `@expanse/shell`, improve Storybook organization, and make components visible in stories.

---

## Final Naming

| Old Name | New Name | Type | Description |
|----------|----------|------|-------------|
| `BoardChrome` | `ScreenOverlay` | Component | Floating UI overlay (absolute positioned) ✅ |
| `BoardChromeGrid` | `ScreenOverlayGrid` | Component | CSS Grid variant ✅ |
| `BoardChromeSvg` | `ScreenOverlaySvg` | Component | SVG decorations variant ✅ |
| `LayoutSkeleton` | `ContentFrame` | Concept | Structural skeleton that pushes content |
| `Standard Layouts` | `Web Layouts` | Category | Traditional web patterns |
| `Grid Layouts` | `Spatial Layouts` | Category | Position-based navigation |

> **Note**: `BoardChrome` is exported as a deprecated alias for backward compatibility.

---

## Final Storybook Hierarchy

```
📁 Layout Systems/
├── Overview (MDX)
├── 📁 Primitives/         ← Building blocks
├── 📁 Components/         ← Shared components
│   ├── Action Bars
│   └── Page Content
│
├── 📁 Skeletons/          ← Structural skeletons
│   ├── ContentFrame (LayoutSkeleton)
│   ├── ChatSkeleton
│   └── FullBleedSkeleton
│
├── 📁 Templates/          ← Pre-built web layouts
│   ├── Minimal
│   ├── Dashboard
│   ├── Documentation
│   ├── FullScreen
│   ├── Panel
│   ├── Responsive
│   └── Composable
│
└── 📁 Spatial Layouts/    ← Position-based navigation
    ├── ScreenOverlay      ← Floating overlay component ✅
    ├── Overlay Variants   ← Grid, SVG variants ✅
    ├── Tiles              ← Grid content units
    └── 📁 Navigation/
        ├── Minimap
        └── NavigationPad
```

---

## Core Concepts

| Concept | Description | Behavior |
|---------|-------------|----------|
| **ScreenOverlay** | Floating UI layer | Absolute positioned, content ignores it |
| **ContentFrame** | Structural shell | Pushes/insets content with bars |
| **Layout** | Pre-built page structure | Complete templates for websites |
| **Tile** | Grid content unit | Position-based (x,y) content |

---

## Visual Model

```
┌─────────────────────────────────────────────────┐
│                 ScreenOverlay                   │  ← Floats on top (z-index)
│  ┌───────────────────────────────────────────┐  │
│  │              ContentFrame                 │  │  ← Pushes content inward
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │                                     │  │  │
│  │  │           Page Content              │  │  │  ← Your actual content
│  │  │                                     │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## Implementation Tasks

### Phase 1: Fix BoardChrome Visibility (Immediate) ✅
**Goal**: Make BoardChrome actually render visibly in Storybook

- [x] **Task 1.1**: Add `height: '100vh'` wrapper to story decorator
- [x] **Task 1.2**: SampleContent already fills viewport properly
- [x] **Task 1.3**: Added fullscreen decorator to BoardChrome stories

### Phase 2: Create Layout Systems MDX Docs ✅
**Goal**: Explain the two paradigms clearly

- [x] **Task 2.1**: Created `LayoutSystems.mdx` overview page
- [ ] **Task 2.2**: Create `StandardLayouts.mdx` with visual diagrams (optional)
- [ ] **Task 2.3**: Create `GridLayouts.mdx` with board concept explanation (optional)

### Phase 3: Reorganize Storybook Titles ✅
**Goal**: Restructure story titles to match new hierarchy

**Updated files:**
- [x] `BoardChrome.stories.tsx` → Renamed to `ScreenOverlay.stories.tsx`
- [x] `BoardChromeVariants.stories.tsx` → Renamed to `ScreenOverlayVariants.stories.tsx`
- [x] Moved stories from `/features/board/` to `/features/overlays/`
- [x] Deleted duplicate `/features/board/` folder
- [x] `Skeletons.stories.tsx` → `Layout Systems/Skeletons`
- [x] `MinimalLayout.stories.tsx` → `Layout Systems/Templates/Minimal`
- [x] `DashboardLayout.stories.tsx` → `Layout Systems/Templates/Dashboard`
- [x] `DocumentationLayout.stories.tsx` → `Layout Systems/Templates/Documentation`
- [x] `ComposableLayout.stories.tsx` → `Layout Systems/Templates/Composable`
- [x] `ResponsiveLayout.stories.tsx` → `Layout Systems/Templates/Responsive`
- [x] `FullScreenLayout.stories.tsx` → `Layout Systems/Templates/FullScreen`
- [x] `PanelLayout.stories.tsx` → `Layout Systems/Templates/Panel`
- [x] `Minimap.stories.tsx` → `Layout Systems/Spatial Layouts/Navigation/Minimap`
- [x] `NavigationPad.stories.tsx` → `Layout Systems/Spatial Layouts/Navigation/NavigationPad`

### Phase 3.5: Complete Exports ✅
**Goal**: Ensure all modules are exported from main index

- [x] Added `export * from "./features/overlays"` to main index.ts
- [x] Added `export * from "./features/tiles"` to main index.ts
- [x] Added deprecated `BoardChrome` alias for backward compatibility

### Phase 4: Create StandardLayoutChrome Component (Future)
**Goal**: Create an explicit counterpart to BoardChrome for standard layouts

The `LayoutSkeleton` is generic; a `StandardLayoutChrome` would be the specific "shell" similar to how `BoardChrome` is for grid layouts.

```tsx
// Future component concept
<StandardLayoutChrome
  header={<Header />}
  footer={<Footer />}
  sidebar={<Sidebar />}
  drawer={<Drawer />}
>
  {children}
</StandardLayoutChrome>
```

**Note**: This may not be needed if LayoutSkeleton + templates serve this role well. Evaluate after Phase 3.

### Phase 5: Update Package Exports (Optional) - DEFERRED
**Goal**: Expose clearer API with sub-path imports

```tsx
// Current - still works well
import { ScreenOverlay, MinimalLayout, MapProvider } from '@expanse/shell'

// Potential sub-path exports (future)
import { ScreenOverlay, MapProvider, Minimap } from '@expanse/shell/spatial'
import { MinimalLayout, DashboardLayout } from '@expanse/shell/web'
```

**Status: Deferred**
- Requires adding `exports` field to package.json
- Requires creating separate entry points (spatial.ts, web.ts)
- May cause TypeScript/bundler configuration issues
- Current flat export structure works well
- Tree-shaking already handles unused exports
- Revisit when package scope grows or consumer ergonomics become a problem

---

## Visual Diagrams for Documentation

### Standard Layout Model
```
┌────────────────────────────────────────────┐
│                  Header                    │
├────────┬───────────────────────┬───────────┤
│        │                       │           │
│ Drawer │     PAGE CONTENT      │  Sidebar  │
│        │     (route-based)     │           │
│        │                       │           │
├────────┴───────────────────────┴───────────┤
│                  Footer                    │
└────────────────────────────────────────────┘

Navigation: URL paths (/about, /dashboard, /settings)
Chrome: Header, Footer, Drawer, Sidebar
Skeleton: LayoutSkeleton
```

### Grid/Board Layout Model
```
┌────────────────────────────────────────────┐
│              ActionBar (top)               │  ← Floating chrome
├────────────────────────────────────────────┤
│                                            │
│              TILE CONTENT                  │  ← Full viewport
│            (x:2, y:3 position)             │
│                                            │
├────────────────────────────────────────────┤
│ ┌──────┐          ActionBar (bottom)       │  ← Floating chrome
│ │Mini  │     [Nav] [Nav] [Nav] [Nav]       │
│ │ map  │                                   │
│ └──────┘                                   │
└────────────────────────────────────────────┘

Navigation: Positions (x:2, y:3), directional arrows
Chrome: ScreenOverlay with 10 anchor slots
Skeleton: ScreenOverlay (absolute positioning)
```

---

## Key Distinctions to Document

| Aspect | Standard Layout | Grid/Board Layout |
|--------|-----------------|-------------------|
| **Chrome Component** | LayoutSkeleton + templates | ScreenOverlay ✅ |
| **Navigation** | URL routes | x,y positions |
| **Content Model** | Pages at routes | Tiles at positions |
| **Movement** | Links, buttons | Arrow keys, swipes |
| **Typical Use** | Websites, apps | Games, immersive UIs |
| **Bars** | Push content (layout flow) | Float on top (absolute) |
| **Position Type** | `position: relative` child flow | `position: absolute` overlays |

---

## Files to Create

1. `/src/docs/LayoutSystems.mdx` - Overview comparing both systems ✅
2. `/src/docs/StandardLayouts.mdx` - In-depth standard layout guide (optional)
3. `/src/docs/GridLayouts.mdx` - In-depth grid/board layout guide (optional)

---

## Files to Modify (COMPLETED)

### Component Renames ✅
| Old File | New File |
|----------|----------|
| `BoardChrome.tsx` | `ScreenOverlay.tsx` |
| `BoardChromeGrid.tsx` | `ScreenOverlayGrid.tsx` |
| `BoardChromeSvg.tsx` | `ScreenOverlaySvg.tsx` |
| `BoardChrome.stories.tsx` | `ScreenOverlay.stories.tsx` |
| `BoardChromeVariants.stories.tsx` | `ScreenOverlayVariants.stories.tsx` |

### Folder Structure ✅
- Moved from `/features/board/` to `/features/overlays/`
- Deleted duplicate `/features/board/` folder

---

## Success Criteria

1. ✅ ScreenOverlay renders visibly in Storybook (decorator added)
2. ✅ Clear "Layout Systems" section in Storybook sidebar
3. ✅ User can immediately understand the two paradigms (overview MDX created)
4. ✅ Grid Layout stories grouped together
5. ✅ Standard Layout stories grouped together
6. ✅ No existing components deleted
7. ✅ Improved discoverability

---

## Implementation Order

```
Phase 1: Fix ScreenOverlay visibility   [✅ DONE]
    ↓
Phase 2: Create MDX documentation       [✅ DONE - overview created]
    ↓
Phase 3: Update story titles            [✅ DONE]
    ↓
Phase 3.5: Complete exports + rename    [✅ DONE - BoardChrome → ScreenOverlay]
    ↓
Phase 3.6: Add Board concept story      [✅ DONE - Board.stories.tsx]
    ↓
Phase 4: Evaluate StandardLayoutChrome  [✅ EVALUATED - see below]
    ↓
Phase 5: Package export paths           [Optional - deferred]
```

### Phase 4 Evaluation Results

**Question:** Do we need a `StandardLayoutChrome` or `ContentFrame` component?

**Analysis:**
- `ScreenOverlay` = Spatial layout shell (floats over content, absolute positioning)
- `LayoutSkeleton` = Web layout skeleton (pushes content with header/footer/sidebar)
- Templates (`MinimalLayout`, `DashboardLayout`) = Higher-level abstractions using LayoutSkeleton

**Documentation Terminology:**
The `LayoutSystems.mdx` uses "ContentFrame" as the conceptual counterpart to "ScreenOverlay":
- **ContentFrame** = Web layout structural shell (bars push content inward)
- **ScreenOverlay** = Spatial layout floating shell (controls float on top)

**Decision:** No component change needed.
- `LayoutSkeleton` already serves the ContentFrame role internally
- Templates provide the public API for web layouts
- Documentation terminology is clear for the conceptual distinction
- If a `ContentFrame` alias is desired later, it can be added as `export { LayoutSkeleton as ContentFrame }`

**Recommendation:** Keep current structure. The architecture is sound - templates abstract away the skeleton complexity.

---

## Notes

- **Don't delete anything** - all existing components are valuable
- **LayoutSkeleton remains generic** - it can be used by either paradigm
- **ScreenOverlay is for spatial layouts** - emphasize the game/immersive nature
- **`BoardChrome` alias preserved** - for backward compatibility
- **Templates are mostly standard** - but could add spatial-specific templates later
- **Board concept** - Added Board.stories.tsx to demonstrate the complete spatial layout pattern
