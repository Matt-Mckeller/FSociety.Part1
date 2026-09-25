/**
 * Component modules - assembled components with multiple parts
 */

// PushingProgress - Character animation with progress bar (moved to @expanse/character)
export {
  PushingProgressCharacter,
  ProgressBar,
  type PushingProgressCharacterProps,
} from "@expanse/character/2d"

// ShapeChip - small indicator chip (filled or outline) in one of several
// silhouettes: triangle, circle, square, diamond, hexagon, shield.
export { ShapeChip, shapeChipBox } from "./ShapeChip"
export type { ShapeChipProps, ShapeChipScale, ChipShape } from "./ShapeChip"
export { SHAPE_CHIP_SIZE, CHIP_SHAPES, CHIP_SHAPE_GEOMETRY } from "./ShapeChip"
