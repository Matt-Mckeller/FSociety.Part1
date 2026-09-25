/**
 * Few-shot examples index
 * Exports all few-shot examples for AI prompt composition
 */

import { loadingSpinnerExample } from "./loading-spinner"
import { rocketLaunchExample } from "./rocket-launch"
import { precompCharacterExample } from "./precomp-character"

export { loadingSpinnerExample, rocketLaunchExample, precompCharacterExample }

/**
 * All few-shot examples aggregated for easy access
 */
export const allFewShotExamples = {
  loadingSpinner: loadingSpinnerExample,
  rocketLaunch: rocketLaunchExample,
  precompCharacter: precompCharacterExample,
}

/**
 * Get all examples as an array
 */
export const getFewShotExamplesArray = () => [
  loadingSpinnerExample,
  rocketLaunchExample,
  precompCharacterExample,
]
