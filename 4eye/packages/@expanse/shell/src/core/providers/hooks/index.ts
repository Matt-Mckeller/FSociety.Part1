/**
 * Layout Hooks
 *
 * Page-transition helpers used by templates in `src/templates/`.
 */

// Types
export type {
  NavControlsPosition,
  TransitionConfig,
} from "./types"

// Page transitions (used by FullScreenLayout, MinimalLayout, DocumentationLayout)
export { useLayoutTransition, usePageKey } from "./useLayoutTransition"
