// Main component
export { NavigationPad } from "./components/NavigationPad"

// Types
export type {
  NavigationPadProps,
  NavigationPadVariant,
  NavigationPadSize,
  NavigationPadPosition,
  NavigationPadVariantImplProps,
  NavigationPadSizePreset,
  DirectionKey,
} from "./types"

// Hook
export { useNavigationPad } from "./hooks/useNavigationPad"
export type { UseNavigationPadReturn } from "./hooks/useNavigationPad"

// Variants (for direct usage if needed)
export { NavigationPadDefault } from "./variants/NavigationPadDefault"
export { NavigationPadHints } from "./variants/NavigationPadHints"
export { NavigationPadCompact } from "./variants/NavigationPadCompact"
export { NavigationPadExpanded } from "./variants/NavigationPadExpanded"
export { NavigationPadHud } from "./variants/NavigationPadHud"
export type { NavigationPadHudProps } from "./variants/NavigationPadHud"
