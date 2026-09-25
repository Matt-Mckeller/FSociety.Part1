/**
 * Few-shot example: Character with precomposed rocket
 * CRITICAL EXAMPLE: Demonstrates proper handling of precomp embedded layers
 *
 * This example is the MOST IMPORTANT for understanding precomp path handling.
 * When a precomp (ty: 0) has embedded layers, those layers are what Lottie renders,
 * NOT the asset reference. Paths MUST use "layers[X].layers[Y]..." format.
 */

import type { ExpanseLottieElementDetails } from "expanse.dynamicAssets"

export const precompCharacterExample = {
  title: "Character with precomposed rocket (embedded layers)",
  description:
    "A character holding a rocket, where the rocket is a precomposed layer with embedded sublayers containing the actual rendered colors. This demonstrates the CRITICAL difference between asset references and embedded precomp layers.",

  elements: [
    {
      name: "CharacterBodyFill",
      description: "Purple fill color for the character's body",
      path: "layers[0].shapes[0].it[1].c.k",
      originalColor: "#8b5cf6ff",
      elementType: "fill",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "illustrative_object",
      isThemeable: true,
      elementGroups: ["character", "primary", "themeable"],
      tags: ["character", "body"],
    },
    {
      name: "Rocket",
      description:
        "Precomp layer containing the rocket (ty: 0 with embedded layers)",
      path: "layers[7]",
      originalColor: null,
      elementType: "layer",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "structural_group",
      isThemeable: false,
      elementGroups: ["rocket", "precomp", "structural"],
      tags: ["precomp", "container"],
    },
    {
      name: "RocketBodyMainFill",
      alternativeNames: ["RocketWhiteFill", "RocketBody"],
      description:
        "⚠️ CRITICAL: White fill in EMBEDDED layer (layers[7].layers[0], NOT assets[0])",
      path: "layers[7].layers[0].shapes[2].it[0].it[0].it[2].c.k",
      originalColor: "#ffffffff",
      elementType: "fill",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "illustrative_object",
      isThemeable: true,
      elementGroups: ["rocket", "primary", "themeable"],
      tags: ["embedded-precomp", "white", "body"],
    },
    {
      name: "RocketNoseConeFill",
      alternativeNames: ["RocketTip", "NoseCone"],
      description: "Red fill for rocket nose cone in embedded precomp layer",
      path: "layers[7].layers[0].shapes[3].it[1].c.k",
      originalColor: "#f32020ff",
      elementType: "fill",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "illustrative_object",
      isThemeable: true,
      elementGroups: ["rocket", "primary", "themeable"],
      tags: ["embedded-precomp", "red", "accent"],
    },
    {
      name: "RocketExhaustOuterFlameFill",
      alternativeNames: ["ExhaustFlame", "OuterFlame"],
      description:
        "Pink/red fill for outer flame effect in second embedded layer",
      path: "layers[7].layers[1].shapes[0].it[0].it[0].it[1].c.k",
      originalColor: "#ff7575ff",
      elementType: "fill",
      roleFunction: "supporting_object",
      visualLevel: "secondary",
      semanticRole: "decorative_element",
      isThemeable: true,
      isEffect: true,
      elementGroups: ["rocket", "effects", "themeable"],
      tags: ["embedded-precomp", "flame", "effect"],
    },
  ] as ExpanseLottieElementDetails[],

  animationMetadata: {
    short: "Character with precomped rocket",
    detailed:
      "A character holding a rocket, where the rocket is a precomposed layer with embedded sublayers containing the actual rendered colors. Demonstrates critical precomp path handling.",
    visualCharacteristics: [
      "Character design",
      "Rocket precomp with embedded layers",
      "Purple and red color scheme",
      "Composition nesting",
      "Embedded layer paths (layers[X].layers[Y]...)",
    ],
  },

  criticalNote: `
EXPLANATION OF THIS EXAMPLE:
- layers[7] is a precomp (ty: 0) with refId pointing to assets[0]
- BUT layers[7].layers[0] and layers[7].layers[1] are EMBEDDED layers
- These embedded layers contain the ACTUAL colors Lottie renders
- Paths MUST use "layers[7].layers[X]..." NOT "assets[0].layers[X]..."
- This is the most common mistake when analyzing precomps!

WHY THIS MATTERS:
- Theming "assets[0].layers[X]..." paths will NOT change visual colors
- Only "layers[7].layers[X]..." paths will affect what the user sees
- Embedded layers store the "resolved" composition state
- Multiple precomp instances can have different embedded values
`,
}
