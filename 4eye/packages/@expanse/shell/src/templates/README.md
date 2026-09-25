# Layout Templates

Pre-built layout templates organized by paradigm.

> See [LAYOUT_PARADIGM_ARCHITECTURE.md](../../docs/LAYOUT_PARADIGM_ARCHITECTURE.md) for switching between paradigms.

## Two Layout Paradigms

This package supports two fundamentally different approaches to web layouts:

### Spatial Layout Templates (`/spatial/`)
**Application-style, immersive layouts**

- Full-viewport experiences (100vw × 100vh per Tile)
- HUD (Heads-Up Display) overlay system
- MapGridNavigation (2D position-based)
- No traditional header/navbar
- Floating controls and action bars
- More "application" or "game-like" feel

**Available:**
- `FullScreenLayout` - Immersive, full viewport with configurable HUD

**Use Cases:** Interactive dashboards, map-based interfaces, game-like experiences, immersive presentations, creative tools

### Basic Web Layout Templates (`/original/`)
**Traditional web layouts**

- Standard web content structure
- Headers, navbars, footers (ContentFrame)
- URL-based navigation
- Buttons on page (not floating)
- More "website-like" feel

**Available:**
- `MinimalLayout` - Cleanest possible, content-first
- `DocumentationLayout` - Navigation sidebar, content-focused
- `DashboardLayout` - Rich control panel with all controls visible
- `PanelLayout` - Flex-based slots for split-screen views
- `ComposableLayout` - Flexible slot-based composition
- `ResponsiveLayout` - Adaptive layouts for different screen sizes

**Use Cases:** Documentation sites, marketing pages, traditional dashboards, content blogs, standard web applications

---

## Choosing a Paradigm

| Spatial Layout | Basic Web Layout |
|----------------|------------------|
| Immersive, full-screen experiences | Standard web page layouts |
| MapGridNavigation + minimap | URL-based navigation |
| HUD overlays always visible | Standard page UI elements |
| Application/game-like feel | Website-like feel |
| Position-based (x, y) | Route-based (/path) |

## Usage

### Spatial Layout Example

```tsx
import { FullScreenLayout, NavigationProvider } from "@expanse/shell"

function App() {
  return (
    <NavigationProvider config={mapGridConfig}>
      <FullScreenLayout 
        showMinimap
        showNavigationPad
        bars={{ bottom: <ActionBar /> }}
      >
        {(position, tile) => <TileContent tile={tile} />}
      </FullScreenLayout>
    </NavigationProvider>
  )
}
```

### Basic Web Layout Example

```tsx
import { MinimalLayout } from "@expanse/shell"

function App() {
  return (
    <MinimalLayout 
      header={<Header />}
      sidebar={<Navigation />}
    >
      <Outlet /> {/* Route content */}
    </MinimalLayout>
  )
}
```

## Related

- `./configurations/` - Pre-built configuration presets
- `../spatial/` - Spatial layout system components
- `../hud-components/` - HUD overlay components (for Spatial templates)
- `../core/` - Shared infrastructure (both paradigms)
