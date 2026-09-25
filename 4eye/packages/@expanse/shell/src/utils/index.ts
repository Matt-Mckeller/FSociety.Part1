// Utility functions
// renderIcon, mergeSx, and icon types moved to @expanse/ui.
// Re-exported transitionally for back-compat.
export { renderIcon, mergeSx } from "@expanse/ui/utils";
export type { IconComponent, IconLike } from "@expanse/ui/utils";

export {
  validatePosition,
  validateGridDimensions,
  validatePositionInBounds,
  validateZIndex,
  validateRequired,
  createHelpfulError,
  LayoutValidationError,
} from "./validation";
