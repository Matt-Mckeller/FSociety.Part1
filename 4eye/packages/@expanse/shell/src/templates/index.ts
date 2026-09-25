/**
 * Layout Templates (pure, non-HUD)
 *
 * HUD-dependent templates (MinimalLayout, DocumentationLayout, DashboardLayout,
 * FullScreenLayout, ComposableLayout, ResponsiveLayout, and all Hud* templates)
 * moved to `@expanse/hud`. This barrel keeps only layout-pure templates.
 *
 * - PanelLayout: Flex-based slots for split-screen/embedded use
 */

export { PanelLayout } from "./original/PanelLayout"
export type { PanelLayoutProps, PanelLayoutSlots } from "./original/PanelLayout"

// Template configurations
export * from "./configurations"

// Template hook utilities (pure — auto-generation moved to @expanse/hud)
export * from "./hooks"

// Template types (pure — auto-generation moved to @expanse/hud)
export * from "./types"
