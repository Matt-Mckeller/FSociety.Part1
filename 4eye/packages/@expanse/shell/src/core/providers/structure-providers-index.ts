// Providers - Context providers for layout state management

export { LayoutProvider, LayoutContext } from "./LayoutProvider"
export {
  LayoutConfigProvider,
  useLayoutConfig,
  DEFAULT_LAYOUT_CONFIG,
  type LayoutType,
  type MinimapConfig,
  type BarVisibilityConfig,
  type LayoutConfiguration,
  type LayoutConfigContextType,
} from "./LayoutConfigProvider"

// Map layout (combined provider for map grid layouts)
export { MapLayoutProvider } from "@expanse/map"
export type {
  MapLayoutConfig,
  MapLayoutProviderProps,
} from "@expanse/map"
