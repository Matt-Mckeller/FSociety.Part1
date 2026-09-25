/**
 * Test Data for RocketLaunch Animation
 * Pre-generated AI response to speed up testing
 */

import { AINamingResponse } from "../types/types"
import type { ExpanseLottieElementDetails } from "expanse.dynamicAssets"

export const rocketLaunchTestResponse: AINamingResponse = {
  elements: {
    // Main rocket body
    RocketBody: {
      name: "RocketBody",
      path: "layers[0]",
      description: "Main rocket body layer",
      originalColor: "#ff6b35",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "illustrative_object",
      elementType: "layer",
      isThemeable: true,
      elementGroups: ["rocket", "primary"],
    },
    RocketBodyFill: {
      name: "RocketBodyFill",
      path: "layers[0].shapes[0].it[1].c.k",
      description: "Main fill color for the rocket body",
      originalColor: "#ff6b35",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "illustrative_object",
      elementType: "fill",
      isThemeable: true,
      elementGroups: ["rocket", "primary", "themeable"],
    },

    // Exhaust flames
    ExhaustFlame: {
      name: "ExhaustFlame",
      path: "layers[1]",
      description: "Exhaust flame layer",
      originalColor: "#ff4500",
      roleFunction: "supporting_object",
      visualLevel: "secondary",
      semanticRole: "decorative_element",
      elementType: "layer",
      isThemeable: true,
      elementGroups: ["exhaust", "effects"],
    },
    ExhaustFlameFill: {
      name: "ExhaustFlameFill",
      path: "layers[1].shapes[0].it[1].c.k",
      description: "Fill color for exhaust flames",
      originalColor: "#ff4500",
      roleFunction: "supporting_object",
      visualLevel: "secondary",
      semanticRole: "decorative_element",
      elementType: "fill",
      isThemeable: true,
      elementGroups: ["exhaust", "effects", "themeable"],
    },

    // Rocket fins
    RocketFins: {
      name: "RocketFins",
      path: "layers[2]",
      description: "Rocket stabilization fins layer",
      originalColor: "#e74c3c",
      roleFunction: "supporting_object",
      visualLevel: "secondary",
      semanticRole: "illustrative_object",
      elementType: "layer",
      isThemeable: true,
      elementGroups: ["rocket", "secondary"],
    },
    RocketFinsFill: {
      name: "RocketFinsFill",
      path: "layers[2].shapes[0].it[1].c.k",
      description: "Fill color for rocket fins",
      originalColor: "#e74c3c",
      roleFunction: "supporting_object",
      visualLevel: "secondary",
      semanticRole: "illustrative_object",
      elementType: "fill",
      isThemeable: true,
      elementGroups: ["rocket", "secondary", "themeable"],
    },

    // Nose cone
    RocketNoseCone: {
      name: "RocketNoseCone",
      path: "layers[3]",
      description: "Rocket nose cone layer",
      originalColor: "#c0392b",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "illustrative_object",
      elementType: "layer",
      isThemeable: true,
      elementGroups: ["rocket", "primary"],
    },
    RocketNoseConeFill: {
      name: "RocketNoseConeFill",
      path: "layers[3].shapes[0].it[1].c.k",
      description: "Fill color for rocket nose cone",
      originalColor: "#c0392b",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "illustrative_object",
      elementType: "fill",
      isThemeable: true,
      elementGroups: ["rocket", "primary", "themeable"],
    },

    // Sparkles/particles
    SparklesGroup: {
      name: "SparklesGroup",
      path: "layers[12]",
      description: "Sparkle particle effects group",
      originalColor: "#f39c12",
      roleFunction: "supporting_object",
      visualLevel: "tertiary",
      semanticRole: "decorative_element",
      elementType: "layer",
      isThemeable: true,
      elementGroups: ["effects", "particles"],
    },
    SparkleParticleFill: {
      name: "SparkleParticleFill",
      path: "layers[12].layers[0].shapes[0].it[0].it[1].c.k",
      description: "Fill color for sparkle particles",
      originalColor: "#f39c12",
      roleFunction: "supporting_object",
      visualLevel: "tertiary",
      semanticRole: "decorative_element",
      elementType: "fill",
      isThemeable: true,
      elementGroups: ["effects", "particles", "themeable"],
    },
  } as Record<string, ExpanseLottieElementDetails>,
}

/**
 * Initialize test data for RocketLaunch animation
 */
export function initializeRocketLaunchTestData(): void {
  // This would be called when testing mode is enabled
  // to pre-populate the cache with test data
}
