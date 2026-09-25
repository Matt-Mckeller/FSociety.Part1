// @expanse/map — pure map and navigation engine.
//
// Platform-agnostic map system with no dependency on HUD chrome. Subfolders:
//   - navigation/      Navigation context + provider + types (Position,
//                      Direction, MapGridNavigationConfig, TileConfig, etc.)
//   - tiles/           Tile, TileGrid, TileContent (the navigable tiles)
//   - minimap/         Minimap, MinimapTile, MinimapOverlay + variants + shared
//   - minimap-full/    Full-screen minimap shell, grid, legend, blips
//   - infinite-grid/   InfiniteGridManager + useInfiniteGrid
//   - layout-provider/ MapLayoutProvider (wraps a map page)
//   - history/         NavigationHistory (browser back/forward integration)
//
// The HUD-aware views (MinimapPanel, MinimapDock, MinimapFullView) live in
// @expanse/hud, since they depend on HUD slots and widgets.

export * from "./navigation";
export * from "./tiles";
export * from "./minimap";
export * from "./minimap-full";
export * from "./infinite-grid";
export * from "./layout-provider";
export * from "./history";
