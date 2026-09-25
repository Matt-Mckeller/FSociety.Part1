# @expanse/shell Architecture

> System design and patterns for the layout package.  
> **Last Updated:** April 2026

## Related Documents

| Document | Purpose |
|----------|---------|
| [DICTIONARY.md](./DICTIONARY.md) | Terminology definitions |
| [CONCEPTS.md](./CONCEPTS.md) | Core concepts deep dive |
| [MAP_GRID_NAVIGATION.md](./MAP_GRID_NAVIGATION.md) | Spatial navigation details |
| [LAYOUT_PARADIGM_ARCHITECTURE.md](./LAYOUT_PARADIGM_ARCHITECTURE.md) | Switching between paradigms |

---

## Two Layout Paradigms

@expanse/shell supports two fundamentally different approaches:

| Paradigm | Navigation | Chrome | Best For |
|----------|------------|--------|----------|
| **Basic Web Layout** | URL routes | ContentFrame (pushes content) | Documentation, dashboards |
| **Spatial Layout** | MapGridNavigation (x,y) | HUD (floats over content) | Immersive apps, games |

---

## Package Structure

```
@expanse/shell/src/
├── core/                    # Shared infrastructure
│   ├── providers/          # LayoutProvider, ConfigProvider
│   ├── navigation/         # Browser history
│   └── theme/              # Theme utilities
│
├── spatial/                 # Spatial Layout system
│   ├── map/                # MapGridNavigation
│   ├── tiles/              # Tile components
│   ├── overlays/           # ScreenOverlay (HUD)
│   └── minimap/            # Minimap component
│
├── hud-components/          # Floating HUD components
│   ├── action-bars/        # ActionBar, NavBar, Toolbar, etc.
│   ├── docks/              # ActionDock
│   ├── orbs/               # ActionOrb, OrbCluster
│   ├── navigation-pad/     # NavigationPad
│   └── spatial-bar/        # SpatialBar (deprecated)
│
├── templates/               # Layout templates
│   ├── original/           # Basic Web Layout templates
│   │   ├── MinimalLayout
│   │   ├── DashboardLayout
│   │   ├── DocumentationLayout
│   │   ├── PanelLayout
│   │   └── ComposableLayout
│   │
│   └── spatial/            # Spatial Layout templates
│       └── FullScreenLayout
│
└── skeletons/               # Structural skeletons
    └── ContentFrame/       # Basic Web Layout skeleton
```

---

## Provider Architecture

### Basic Web Layout

```tsx
<LayoutProvider>
  <ContentFrame
    header={<Header />}
    sidebar={<Sidebar />}
    footer={<Footer />}
  >
    <Outlet /> {/* Route content */}
  </ContentFrame>
</LayoutProvider>
```

### Spatial Layout

```tsx
<LayoutProvider>
  <NavigationProvider config={mapGridConfig}>
    <FullScreenLayout
      showMinimap
      showNavigationPad
      bars={{ bottom: <ActionBar /> }}
    >
      {(position, tile) => <TileContent tile={tile} />}
    </FullScreenLayout>
  </NavigationProvider>
</LayoutProvider>
```

---

## HUD Component Hierarchy

```
HUD (ScreenOverlay)
├── Header ──────────────────────────── Global context bar
│
├── Action Bars ─────────────────────── Edge-positioned bars
│   ├── ActionBar (base)
│   ├── NavBar (navigation links)
│   ├── Toolbar (radio: one active)
│   ├── SettingsBar (checkbox: toggles)
│   └── StatusBar (read-only display)
│
├── Docks ───────────────────────────── Corner button groups
│   └── ActionDock
│
├── Orbs ────────────────────────────── Floating action buttons
│   ├── ActionOrb
│   └── OrbCluster (patterns)
│
└── Navigation ──────────────────────── Spatial navigation
    ├── NavigationPad (D-pad controls)
    └── Minimap (grid overview)
```

---

## Data Flow

### Spatial Layout Navigation

```
User Input (Arrow Keys / Minimap Click / NavigationPad)
  ↓
Navigation Action (move, jump)
  ↓
Position Update ({ x, y })
  ↓
Context Provider Update
  ↓
Components Re-render (Minimap, NavigationPad, Tile)
  ↓
URL Sync (optional)
  ↓
Tile Transition Animation
```

### Basic Web Layout Navigation

```
User Input (Link Click / URL Change)
  ↓
Router Navigation
  ↓
Page Component Render
  ↓
ContentFrame Update (header, sidebar, footer)
```

---

## Key Types

### Position (Spatial)
```typescript
interface Position {
  x: number;
  y: number;
}
```

### TileConfig (Spatial)
```typescript
interface TileConfig {
  id: string;
  position: Position;
  url?: string;
  seo?: { title: string; description?: string };
  display?: { label: string; color?: string; icon?: React.ReactNode };
}
```

### LayoutConfig
```typescript
interface LayoutConfig {
  paradigm: 'basic' | 'spatial';
  theme?: ThemeConfig;
  // Paradigm-specific config
  spatial?: MapGridNavigationConfig;
  basic?: BasicLayoutConfig;
}
```

---

## See Also

- [Storybook](http://localhost:6006) — Interactive component documentation
- [Introduction.mdx](../src/Introduction.mdx) — Quick start guide
- [Architecture.mdx](../src/Architecture.mdx) — Storybook architecture docs
│   ├── NavigationPad.tsx            # Arrow buttons (floating or inline)
│   ├── PageContent.tsx              # Dynamic page renderer
│   └── PlaceholderPage.tsx          # Default page with position info
│
└── utils/                           # Utilities
    └── index.ts
```

## Layout Modes

### FullScreenLayout (Primary)

```tsx
import { 
  MapGridNavigationProvider, 
  FullScreenLayout, 
  PageContent,
  type PageRegistry 
} from "@expanse/shell";

const registry: PageRegistry = {
  home: () => <HomePage />,
  settings: () => <SettingsPage />,
  default: (pos, tile) => <PlaceholderPage position={pos} tile={tile} />,
};

<MapGridNavigationProvider config={config}>
  <FullScreenLayout
    showMinimap
    showNavigationControls
    minimapPosition="top-right"
    transitionType="fade"
    bars={{
      top: <TopBar />,
      left: { content: <LeftSidebar />, size: 80 },
      bottom: <ChatInput />,
    }}
  >
    {(position, tile) => (
      <PageContent position={position} tile={tile} registry={registry} />
    )}
  </FullScreenLayout>
</MapGridNavigationProvider>
```

Features:
- Full viewport (100vw × 100vh)
- Fixed position overlays (minimap, nav controls)
- Fixed position bars with configurable size
- CSS page transitions between positions
- Main content fills remaining space

### PanelLayout (Secondary)

```tsx
import { MapGridNavigationProvider, PanelLayout, Minimap, NavigationPad } from "@expanse/shell";

<MapGridNavigationProvider config={config}>
  <PanelLayout
    fullHeight
    slots={{
      top: <Header />,
      left: <Minimap />,
      bottom: <NavigationPad />,
    }}
  >
    <MainContent />
  </PanelLayout>
</MapGridNavigationProvider>
```

Features:
- Flex-based layout
- Bars are part of the flow (not overlays)
- Optional fullHeight mode
- Good for split-screen or embedded use

## Page Registry Pattern

```tsx
import { type PageRegistry, type Position, type TileConfig, PlaceholderPage } from "@expanse/shell";

// Define pages in the app
const pageRegistry: PageRegistry = {
  // By tile ID
  home: () => <HomePage />,
  settings: () => <SettingsPage />,
  
  // By position string
  "0,0": () => <CenterPage />,
  "-1,2": () => <SpecialPage />,
  
  // Default for undefined positions
  default: (pos: Position, tile: TileConfig | null) => (
    <PlaceholderPage position={pos} tile={tile} />
  ),
};
```

## Implementation Status

### Phase 1: Reorganize File Structure ✅
- [x] Create layouts/ folder
- [x] Rename GridLayout → PanelLayout
- [x] Create FullScreenLayout
- [x] Update exports

### Phase 2: FullScreenLayout Implementation ✅
- [x] 100vw×100vh container
- [x] Built-in minimap and navigation controls
- [x] Fixed position bar slots
- [x] CSS page transitions
- [x] Integration with MapGridNavigationProvider

### Phase 3: Page System ✅
- [x] Create PageContent component
- [x] Create PlaceholderPage component
- [x] Page registry pattern

### Phase 4: Demo App ✅
- [x] Create /grid route with FullScreenLayout
- [x] Dynamic page registry
- [x] In-app page generator

## Demo App Structure

```
apps/4eye-web/app/
└── grid/
    └── page.tsx               # Full-screen grid app demo
        ├── Uses FullScreenLayout
        ├── Dynamic page registry
        └── In-app page generator modal
```

## Comparison

| Feature | FullScreenLayout | PanelLayout |
|---------|-----------------|-------------|
| Viewport | 100vw × 100vh | Contained |
| Bars | Fixed overlays | Flex slots |
| Scrolling | Main content only | Container can scroll |
| Overlays | Built-in (minimap, nav) | Manual positioning |
| Transitions | CSS built-in | Manual |
| Best for | Primary app | Embedded/split |
