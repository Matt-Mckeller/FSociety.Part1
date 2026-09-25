/**
 * Character Configuration
 *
 * Central configuration for character proportions, dimensions,
 * and utility functions.
 */

export {
  // Base config
  CHARACTER_BASE,
  DEFAULT_DIMENSIONS,
  CHARACTER_DISPLAY,
  // Functions
  calculateDimensions,
  calculateBodyPoints,
  calculateShoulderPoint,
  calculateHipPoint,
  rotatePointAround,
  getPointAtAngleAndDistance,
  // Types
  type CharacterDimensions,
  type CharacterDimensionOptions,
  type Point2D,
  type BodyPoints,
} from "./characterDimensions"
