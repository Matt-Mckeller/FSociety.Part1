/**
 * @expanse/brand-core
 *
 * Expanse brand primitives, composites, and theming system.
 */

// Types
export * from "./types"

// Theme (types, augmentation, factory functions)
export * from "./theme"

// Constants
export * from "./constants"

// Utils
export * from "./utils"

// Context
export * from "./context"

// Primitives
export * from "./primitives"

// Composites
export * from "./composites"

// Shapes
export * from "./shapes"

// Display
export * from "./display"

// Vector Graphics (complex illustrated components)
export * from "./vector-graphics"

// Components
export * from "./components"

// Status
export * from "./status"

// Game
// TODO: Re-enable when @expanse/game and @expanse/points packages are migrated
// These exports depend on expanse.ui/game and expanse.ui/points which don't exist yet
// export * from "./game"

// Resolve barrel ambiguities: canonical public types/components win over
// logo-internal geometry types (Circle, GradientStop, Point, ShapeType) that
// leak from ./display submodules.
export type { GradientStop, Point, ShapeType } from "./types"
export { Circle } from "./primitives"
