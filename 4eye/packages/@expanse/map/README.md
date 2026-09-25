# @expanse/map

Platform-agnostic **map + navigation engine**. Owns grid position state,
keyboard navigation, URL sync, the minimap, the tile grid, and browser history.
No dependency on HUD chrome — the HUD-aware views (`MinimapPanel`, `MinimapDock`,
`MinimapFullView`) live in [`@expanse/hud`](../hud).

## Layer

```
@expanse/theme  @expanse/ui   ← bottom (tokens + presentation primitives)
        ▲            ▲
        └──── @expanse/map ────┘   ← this package
                  ▲
            @expanse/shell
                  ▲
            @expanse/hud
```

`@expanse/map` depends only on `@expanse/theme` and `@expanse/ui`.

## Quick Start

```tsx
import { NavigationProvider, useNavigation, Minimap } from "@expanse/map";

function App() {
  return (
    <NavigationProvider config={mapGridConfig}>
      <Minimap />
    </NavigationProvider>
  );
}
```

## Source Structure

| Folder | Contents |
|--------|----------|
| `navigation/` | Navigation context + provider + types (`Position`, `Direction`, `MapGridNavigationConfig`, `TileConfig`, `TileCategory`) + Next.js router bridges |
| `tiles/` | `Tile`, `TileGrid`, `TileContent` — the navigable tiles |
| `minimap/` | `Minimap`, `MinimapTile`, `MinimapOverlay` + variants + shared |
| `minimap-full/` | Full-screen minimap shell, grid, legend, blips |
| `infinite-grid/` | `InfiniteGridManager` + `useInfiniteGrid` |
| `layout-provider/` | `MapLayoutProvider` (wraps a map page) |
| `history/` | `NavigationHistory` (browser back/forward integration) |

## Key Exports

`NavigationProvider`, `useNavigation`, `MapLayoutProvider`, `Minimap`, `Tile`,
`TileGrid`, `NavigationHistory`, and the navigation types
(`Position`, `Direction`, `MapGridNavigationConfig`, `TileConfig`, `TileCategory`).

Import from the package root only — never deep-import subpaths.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Interactive component docs |
| `pnpm test` | Unit tests (vitest) |

## Peer Dependencies

- react, react-dom
- @mui/material
