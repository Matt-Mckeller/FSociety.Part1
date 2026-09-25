/**
 * Few-shot example: Rocket launch animation with particle effects
 * Example with gradient fills, multiple visual levels, and particle effects
 */

import type { ExpanseLottieElementDetails } from "expanse.dynamicAssets/types/ExpanseLottie"

export const rocketLaunchExample = {
  title: "Rocket launch with flame and particle effects",
  description:
    "A rocket ship launching upward with animated flame effects, particle trails, and scale animation creating a dynamic takeoff sequence",

  elements: [
    {
      name: "RocketBody",
      description: "Container layer for the rocket body",
      path: "layers[0]",
      originalColor: null,
      elementType: "layer",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "structural_group",
      isThemeable: false,
      elementGroups: ["rocket", "primary", "structural"],
      tags: ["container"],
    },
    {
      name: "RocketBodyGradientFill",
      alternativeNames: ["RocketBodyFill", "BodyGradient"],
      description:
        "Gradient fill for rocket body transitioning from white to light gray",
      path: "layers[0].shapes[0].it[1].g.k.k",
      originalColor: [
        { offset: 0, color: "#ffffff00" },
        { offset: 0.3, color: "#f8fafcff" },
        { offset: 1, color: "#e2e8f0ff" },
      ],
      elementType: "gradient",
      roleFunction: "primary_subject",
      visualLevel: "primary",
      semanticRole: "illustrative_object",
      isThemeable: true,
      elementGroups: ["rocket", "themeable", "primary"],
      tags: ["gradient", "multi-stop", "body"],
    },
    {
      name: "RocketFlameFill",
      alternativeNames: ["ExhaustFlame", "RocketExhaust"],
      description: "Solid orange fill color for the rocket flame effect",
      path: "layers[1].shapes[0].it[1].c.k",
      originalColor: "#f97316ff",
      elementType: "fill",
      roleFunction: "supporting_object",
      visualLevel: "secondary",
      semanticRole: "decorative_element",
      isThemeable: true,
      isEffect: true,
      elementGroups: ["rocket", "effects", "themeable"],
      tags: ["flame", "hot-color", "effect"],
    },
    {
      name: "ParticleEffectFill",
      alternativeNames: ["Particles", "TrailParticles"],
      description: "Yellow particle effect emitted from rocket exhaust",
      path: "layers[2].shapes[0].it[1].c.k",
      originalColor: "#fbbf24ff",
      elementType: "fill",
      roleFunction: "particle",
      visualLevel: "tertiary",
      semanticRole: "decorative_element",
      isThemeable: true,
      isEffect: true,
      elementGroups: ["particles", "effects", "themeable"],
      tags: ["particle", "trail", "ambient"],
    },
    {
      name: "RocketLaunchScale",
      description: "Scale animation controlling rocket takeoff size change",
      path: "layers[0].ks.s",
      originalColor: null,
      elementType: "transform",
      roleFunction: "control",
      visualLevel: "hidden",
      semanticRole: "motion_cue",
      isThemeable: false,
      elementGroups: ["animation", "transforms"],
      tags: ["animation", "scale", "non-themeable"],
    },
  ] as ExpanseLottieElementDetails[],

  animationMetadata: {
    short: "Rocket launch with flame and particle effects",
    detailed:
      "A rocket ship launching upward with animated flame effects, particle trails, and scale animation creating a dynamic takeoff sequence",
    visualCharacteristics: [
      "Rocket ship design",
      "Flame effects",
      "Particle systems",
      "Upward motion",
      "Scale animation",
      "Orange and yellow color scheme",
    ],
  },
}
