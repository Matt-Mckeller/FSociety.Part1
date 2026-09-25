/**
 * URL routing configuration types.
 */

export type RoutingMode = "query" | "path" | "hybrid"

export interface RoutingConfig {
  mode: RoutingMode
  /** Base path for path mode (e.g., "/grid") */
  basePath?: string
  /** Sync URL on navigation (default: true) */
  syncUrl?: boolean
  /** Read initial position from URL (default: true) */
  initialFromUrl?: boolean
}

// =============================================================================
// Defaults
// =============================================================================

export const DEFAULT_ROUTING_CONFIG: Required<RoutingConfig> = {
  mode: "hybrid",
  basePath: "/grid",
  syncUrl: true,
  initialFromUrl: true,
}
