/**
 * Edge Case Instructions Index
 * Exports all edge case handling instructions
 */

import { pathFormatInstructions } from "./path-format"
import { colorFormatInstructions, colorExtractionRules } from "./color-formats"
import { gradientExtractionInstructions } from "./gradient-extraction"
import { precompDetectionInstructions } from "./precomp-detection"

export {
  pathFormatInstructions,
  colorFormatInstructions,
  colorExtractionRules,
  gradientExtractionInstructions,
  precompDetectionInstructions,
}

/**
 * All edge case instructions combined for full context
 */
export const allEdgeCaseInstructions = `
${pathFormatInstructions}

${colorFormatInstructions}

${colorExtractionRules}

${gradientExtractionInstructions}

${precompDetectionInstructions}
`
