/**
 * Lottie Gallery Exports
 * Central export point for gallery components and utilities
 */

// Components
export { AnimationCard } from "./components/AnimationCard"
export { AnimationGrid } from "./components/AnimationGrid"
export { GalleryHeader } from "./components/GalleryHeader"
export { StatsBar } from "./components/StatsBar"

// Hooks
export { useGalleryState } from "./hooks/useGalleryState"
export { useLottieAnimation } from "./hooks/useLottieAnimation"
export type {
  UseLottieAnimationOptions,
  AnimationInfo,
} from "./hooks/useLottieAnimation"

// Utils
export {
  ANIMATIONS,
  FEATURED_ANIMATIONS,
  SKIP_LAYERS_CONFIG,
  getAllCategories,
  filterAnimations,
  sortAnimations,
  getSkipLayersForAnimation,
} from "./utils/animationRegistry"
export type {
  Animation,
  FilterOptions,
  SortBy,
} from "./utils/animationRegistry"
export {
  loadAnimationData,
  hasAnimationData,
  getAvailableAnimations,
} from "./utils/animationLoader"
