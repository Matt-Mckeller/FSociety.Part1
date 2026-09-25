# Layout Paradigm Architecture

> How to switch between Basic Web Layout and Spatial Layout, and use both in the same application.

---

## Overview

`@expanse/shell` supports two fundamentally different layout paradigms that can coexist in a single application:

| Paradigm | Navigation | Chrome | Best For |
|----------|------------|--------|----------|
| **Basic Web Layout** | URL routes | ContentFrame (pushes content) | Documentation, dashboards, traditional pages |
| **Spatial Layout** | MapGridNavigation (x,y) | HUD (floats over content) | Immersive apps, games, presentations |

This document explains how to:
1. Choose the right paradigm for each part of your app
2. Switch between paradigms within a single app
3. Share components and state across paradigms

---

## Architecture

### Navigation Adapter Pattern

Both paradigms use a common `NavigationProvider` with different adapters:

```
NavigationProvider (generic interface)
    │
    ├── navigate(target)
    ├── goBack()
    ├── canNavigate(target)
    │
    └── Adapters:
        ├── MapGridNavigationAdapter  → Spatial Layout
        │   - navigate({ x, y })
        │   - Arrow keys, swipe, minimap
        │   - Position-based routing
        │
        └── StandardNavigationAdapter → Basic Web Layout
            - navigate('/path')
            - Links, buttons
            - URL-based routing
```

### Provider Hierarchy

```tsx
// Root of your app
<LayoutProvider
  defaultParadigm="spatial"           // or "basic"
  allowParadigmSwitch={true}          // Enable runtime switching
  spatialConfig={mapGridConfig}       // Config for spatial mode
  basicConfig={basicLayoutConfig}     // Config for basic mode
>
  <App />
</LayoutProvider>
```

Internally, `LayoutProvider` composes:
- `NavigationProvider` with the appropriate adapter
- `ThemeProvider` for consistent theming
- `HudContext` (spatial) or `ChromeContext` (basic)

---

## Use Cases

### 1. Single Paradigm App

Most apps use one paradigm throughout:

```tsx
// Spatial-only app (game, presentation, immersive)
<LayoutProvider paradigm="spatial" config={mapGridConfig}>
  <FullScreenLayout
    tiles={tiles}
    showMinimap
    showNavigationPad
  >
    {(position, tile) => <TileContent tile={tile} />}
  </FullScreenLayout>
</LayoutProvider>
```

```tsx
// Basic-only app (docs, dashboard, admin)
<LayoutProvider paradigm="basic">
  <DashboardLayout
    header={<Header />}
    sidebar={<Sidebar />}
  >
    <Outlet /> {/* React Router / Next.js content */}
  </DashboardLayout>
</LayoutProvider>
```

### 2. Hybrid App (Both Paradigms)

Use different paradigms for different routes:

```tsx
// Next.js App Router example
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <LayoutProvider allowParadigmSwitch>
      {children}
    </LayoutProvider>
  );
}

// app/page.tsx - Basic Web Layout landing page
export default function HomePage() {
  return (
    <MinimalLayout header={<Header />}>
      <LandingContent />
    </MinimalLayout>
  );
}

// app/explore/layout.tsx - Spatial Layout section
export default function ExploreLayout({ children }) {
  return (
    <SpatialLayoutProvider config={exploreMapConfig}>
      <FullScreenLayout showMinimap>
        {children}
      </FullScreenLayout>
    </SpatialLayoutProvider>
  );
}
```

### 3. Runtime Paradigm Toggle

Allow users to switch between paradigms:

```tsx
function LayoutToggle() {
  const { paradigm, setParadigm } = useLayoutContext();
  
  return (
    <ToggleButtonGroup
      value={paradigm}
      onChange={(_, value) => setParadigm(value)}
    >
      <ToggleButton value="basic">Standard View</ToggleButton>
      <ToggleButton value="spatial">Spatial View</ToggleButton>
    </ToggleButtonGroup>
  );
}
```

---

## Shared Components

Some components work in both paradigms:

### Components That Work Everywhere

| Component | Basic Web | Spatial |
|-----------|-----------|---------|
| ActionOrb | ✅ Floating actions | ✅ Primary actions |
| OrbCluster | ✅ FAB menu | ✅ HUD actions |
| NavigationPad | ⚠️ Optional | ✅ Primary nav |
| Minimap | ❌ Not typical | ✅ Required |
| ActionBar | ✅ As toolbar | ✅ HUD edge |
| Header | ✅ Top chrome | ✅ HUD top |

### Paradigm-Specific Components

| Component | Paradigm | Alternative |
|-----------|----------|-------------|
| Minimap | Spatial only | Breadcrumbs in Basic |
| NavigationPad | Spatial only | Nav links in Basic |
| ContentFrame | Basic only | Use HUD in Spatial |
| Sidebar/Drawer | Basic primary | ActionDock in Spatial |

---

## Navigation Mapping

When switching paradigms, you need a strategy for preserving navigation context:

### URL ↔ Position Mapping

```ts
interface TileConfig {
  id: string;
  position: { x: number; y: number };
  url: string;  // Maps to this URL in Basic mode
}

const tiles: TileConfig[] = [
  { id: 'home', position: { x: 0, y: 0 }, url: '/' },
  { id: 'about', position: { x: 1, y: 0 }, url: '/about' },
  { id: 'services', position: { x: 0, y: 1 }, url: '/services' },
  { id: 'contact', position: { x: 1, y: 1 }, url: '/contact' },
];
```

When user switches paradigms:
- **Spatial → Basic**: Navigate to the tile's `url`
- **Basic → Spatial**: Find tile with matching `url`, set position

```tsx
function useParadigmSwitch() {
  const { paradigm, setParadigm, tiles } = useLayoutContext();
  const router = useRouter();
  const { position } = useSpatialNavigation();
  
  const switchTo = (newParadigm: 'basic' | 'spatial') => {
    if (newParadigm === 'basic' && paradigm === 'spatial') {
      // Find current tile's URL
      const currentTile = tiles.find(
        t => t.position.x === position.x && t.position.y === position.y
      );
      if (currentTile?.url) {
        router.push(currentTile.url);
      }
    } else if (newParadigm === 'spatial' && paradigm === 'basic') {
      // Find tile matching current URL
      const matchingTile = tiles.find(t => t.url === router.pathname);
      if (matchingTile) {
        // Position will be restored by SpatialLayoutProvider
      }
    }
    setParadigm(newParadigm);
  };
  
  return { switchTo };
}
```

---

## State Preservation

### What Persists Across Paradigm Switches

| State | Persists? | Notes |
|-------|-----------|-------|
| User session | ✅ Yes | Auth state unchanged |
| Theme (light/dark) | ✅ Yes | Shared context |
| Domain selection | ✅ Yes | App-level state |
| Current "page" | ✅ Yes | Via URL↔Position mapping |
| Scroll position | ❌ No | Paradigms handle differently |
| HUD preferences | ⚠️ Spatial only | Hidden in Basic |

### Context Sharing Pattern

```tsx
// Shared app state (paradigm-agnostic)
const AppContext = createContext<{
  user: User | null;
  domain: string;
  theme: 'light' | 'dark';
}>();

// Layout-specific state
const SpatialContext = createContext<{
  position: Position;
  hudConfig: HudConfig;
}>();

const BasicContext = createContext<{
  sidebarOpen: boolean;
  breadcrumbs: string[];
}>();
```

---

## Implementation Checklist

### Phase 1: Single Paradigm
- [ ] Choose primary paradigm for your app
- [ ] Set up LayoutProvider with single config
- [ ] Build pages/tiles for that paradigm

### Phase 2: Add Secondary Paradigm
- [ ] Define which routes use which paradigm
- [ ] Create URL↔Position mapping for navigation continuity
- [ ] Add paradigm-specific layouts to route tree

### Phase 3: Runtime Switching (Optional)
- [ ] Enable `allowParadigmSwitch` in LayoutProvider
- [ ] Implement LayoutToggle component
- [ ] Handle state preservation during switches
- [ ] Test navigation continuity

---

## Best Practices

1. **Start with one paradigm** - Add the second only when needed
2. **Map URLs to positions** - Even in Spatial mode, maintain URL consistency for SEO and sharing
3. **Share state at app level** - Keep paradigm-agnostic state in a shared context
4. **Test transitions** - Verify navigation state when switching paradigms
5. **Communicate the switch** - Use animations/transitions so users understand the mode change

---

## Related Documents

- [DICTIONARY.md](./DICTIONARY.md) — Terminology definitions
- [CONCEPTS.md](./CONCEPTS.md) — Core concepts
- [MAP_GRID_NAVIGATION.md](./MAP_GRID_NAVIGATION.md) — Navigation system details
