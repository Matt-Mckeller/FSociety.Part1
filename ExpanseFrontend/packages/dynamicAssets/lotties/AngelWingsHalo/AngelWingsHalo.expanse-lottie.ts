import type { ExpanseLottie } from "../../types"

export const AngelWingsHaloSchema: ExpanseLottie = {
  animationName: "AngelWingsHalo",

  alternativeNames: [
    "DivineWings",
    "CelestialHalo",
    "AngelicBlessing",
    "HeavenlyWings",
  ],

  description:
    "Angel wings with halo animation - themes halo while keeping wings white",

  tags: ["angel", "wings", "halo", "religious", "celestial", "divine"],

  purpose: {
    primary:
      "Divine or exceptional achievement recognition in educational contexts",
    categories: {
      achievement: [
        "Perfect score celebration",
        "Exceptional performance recognition",
        "Milestone achievement unlock",
      ],
      reward: [
        "Highest tier badge unlock",
        "Special recognition moment",
        "Excellence award animation",
      ],
      celebration: [
        "Outstanding effort recognition",
        "Exceeding expectations feedback",
        "Top performer highlight",
      ],
    },
    contexts: ["educational", "achievement", "recognition", "excellence"],
    recommendations: [
      "Reserve for exceptional achievements to maintain special feeling",
      "Use for top-tier rewards and recognitions",
      "Consider as final animation in multi-level achievement system",
      "Pair with congratulatory messaging",
    ],
  },

  elements: {
    // Halo Elements
    HaloGradientFill2: {
      name: "Halo Gradient Fill 2",
      description: "Inner gradient fill for the halo",
      path: "layers[11].shapes[0].it[1].c.k",
      originalColor: "#621890",
      elementType: "gradient",
      isSkinTone: false,
      isClothing: false,
      isEffect: true,
      isBackground: false,
      elementGroups: ["halo", "gradient"],
      tags: ["halo", "gradient", "purple", "divine"],
    },
    HaloGradientFill5: {
      name: "Halo Gradient Fill 5",
      description: "Outer gradient fill for the halo",
      path: "layers[11].shapes[1].it[4].c.k",
      originalColor: "#a662d0",
      elementType: "gradient",
      isSkinTone: false,
      isClothing: false,
      isEffect: true,
      isBackground: false,
      elementGroups: ["halo", "gradient"],
      tags: ["halo", "gradient", "purple", "divine"],
    },

    // Left Wing Elements
    LeftWingOuterFeatherFill: {
      name: "Left Wing Outer Feather",
      description: "Outer feather of the left wing",
      path: "layers[1].shapes[0].it[1].c.k",
      originalColor: "#9eb2dc",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["leftWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },
    LeftWingUpperFeatherFill: {
      name: "Left Wing Upper Feather",
      description: "Upper feather of the left wing",
      path: "layers[2].shapes[0].it[1].c.k",
      originalColor: "#9eb2dc",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["leftWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },
    LeftWingMidUpperFeatherFill: {
      name: "Left Wing Mid Upper Feather",
      description: "Mid upper feather of the left wing",
      path: "layers[3].shapes[0].it[1].c.k",
      originalColor: "#9eb2dc",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["leftWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },
    LeftWingMidLowerFeatherFill: {
      name: "Left Wing Mid Lower Feather",
      description: "Mid lower feather of the left wing",
      path: "layers[4].shapes[0].it[1].c.k",
      originalColor: "#9eb2dc",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["leftWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },
    LeftWingInnerFeatherFill: {
      name: "Left Wing Inner Feather",
      description: "Inner feather of the left wing",
      path: "layers[5].shapes[0].it[1].c.k",
      originalColor: "#9eb2dc",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["leftWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },

    // Right Wing Elements
    RightWingInnerFeatherFill: {
      name: "Right Wing Inner Feather",
      description: "Inner feather of the right wing",
      path: "layers[6].shapes[0].it[1].c.k",
      originalColor: "#7f8fc1",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["rightWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },
    RightWingMidLowerFeatherFill: {
      name: "Right Wing Mid Lower Feather",
      description: "Mid lower feather of the right wing",
      path: "layers[7].shapes[0].it[1].c.k",
      originalColor: "#7f8fc1",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["rightWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },
    RightWingMidUpperFeatherFill: {
      name: "Right Wing Mid Upper Feather",
      description: "Mid upper feather of the right wing",
      path: "layers[8].shapes[0].it[1].c.k",
      originalColor: "#7f8fc1",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["rightWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },
    RightWingUpperFeatherFill: {
      name: "Right Wing Upper Feather",
      description: "Upper feather of the right wing",
      path: "layers[9].shapes[0].it[1].c.k",
      originalColor: "#7f8fc1",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["rightWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },
    RightWingOuterFeatherFill: {
      name: "Right Wing Outer Feather",
      description: "Outer feather of the right wing",
      path: "layers[10].shapes[0].it[1].c.k",
      originalColor: "#7f8fc1",
      elementType: "fill",
      isSkinTone: false,
      isClothing: false,
      isEffect: false,
      isBackground: false,
      elementGroups: ["rightWing", "feathers"],
      tags: ["wing", "feather", "white", "angel"],
    },
  },

  recommendations: {
    recommendedColorPalettes: [
      "gold-light",
      "gold-dark",
      "amber-light",
      "amber-dark",
      "yellow-light",
      "yellow-dark",
      "orange-light",
      "orange-dark",
      "blue-light",
      "blue-dark",
      "purple-light",
      "purple-dark",
    ],

    elementGroups: {
      logicalGrouped: {
        halo: {
          elements: ["HaloGradientFill2", "HaloGradientFill5"],
          description: "All halo elements that should be themed together",
        },
        leftWing: {
          elements: [
            "LeftWingOuterFeatherFill",
            "LeftWingUpperFeatherFill",
            "LeftWingMidUpperFeatherFill",
            "LeftWingMidLowerFeatherFill",
            "LeftWingInnerFeatherFill",
          ],
          description: "All left wing elements",
        },
        rightWing: {
          elements: [
            "RightWingInnerFeatherFill",
            "RightWingMidLowerFeatherFill",
            "RightWingMidUpperFeatherFill",
            "RightWingUpperFeatherFill",
            "RightWingOuterFeatherFill",
          ],
          description: "All right wing elements",
        },
        wings: {
          elements: [
            "LeftWingOuterFeatherFill",
            "LeftWingUpperFeatherFill",
            "LeftWingMidUpperFeatherFill",
            "LeftWingMidLowerFeatherFill",
            "LeftWingInnerFeatherFill",
            "RightWingInnerFeatherFill",
            "RightWingMidLowerFeatherFill",
            "RightWingMidUpperFeatherFill",
            "RightWingUpperFeatherFill",
            "RightWingOuterFeatherFill",
          ],
          description: "All wing elements (both left and right)",
        },
      },

      sharedColor: {
        haloGradient: {
          elements: ["HaloGradientFill2", "HaloGradientFill5"],
          description:
            "Halo gradient elements that should share warm, divine colors",
          colorRelationship: "gradient",
        },
        wingFeathers: {
          elements: [
            "LeftWingOuterFeatherFill",
            "LeftWingUpperFeatherFill",
            "LeftWingMidUpperFeatherFill",
            "LeftWingMidLowerFeatherFill",
            "LeftWingInnerFeatherFill",
            "RightWingInnerFeatherFill",
            "RightWingMidLowerFeatherFill",
            "RightWingMidUpperFeatherFill",
            "RightWingUpperFeatherFill",
            "RightWingOuterFeatherFill",
          ],
          description:
            "Wing feather fills that should remain white or light colors",
          colorRelationship: "identical",
        },
      },

      themingPriority: {
        high: {
          elements: ["HaloGradientFill2", "HaloGradientFill5"],
          description: "Halo elements are the primary focus for theming",
          priority: "high",
        },
        low: {
          elements: [
            "LeftWingOuterFeatherFill",
            "LeftWingUpperFeatherFill",
            "LeftWingMidUpperFeatherFill",
            "LeftWingMidLowerFeatherFill",
            "LeftWingInnerFeatherFill",
            "RightWingInnerFeatherFill",
            "RightWingMidLowerFeatherFill",
            "RightWingMidUpperFeatherFill",
            "RightWingUpperFeatherFill",
            "RightWingOuterFeatherFill",
          ],
          description:
            "Wing feathers typically remain white and are less important for theming",
          priority: "low",
        },
      },

      visualHierarchy: {
        primary: {
          elements: ["HaloGradientFill2", "HaloGradientFill5"],
          description: "Halo gradient is the primary visual element",
          hierarchy: "primary",
        },
        background: {
          elements: [
            "LeftWingOuterFeatherFill",
            "LeftWingUpperFeatherFill",
            "LeftWingMidUpperFeatherFill",
            "LeftWingMidLowerFeatherFill",
            "LeftWingInnerFeatherFill",
            "RightWingInnerFeatherFill",
            "RightWingMidLowerFeatherFill",
            "RightWingMidUpperFeatherFill",
            "RightWingUpperFeatherFill",
            "RightWingOuterFeatherFill",
          ],
          description: "Wing feathers serve as background elements",
          hierarchy: "background",
        },
      },
    },

    optionalAiContext: {
      haloFocus:
        "The halo is the primary focus of the animation and should be themed together",
      placement:
        "The animation will be used in a variety of contexts and should be themed accordingly",
    },

    optionalAiStylePrompts: {
      light:
        "Create a light theme with bright, warm colors for the halo that evoke divine light and celestial energy. Keep wing feathers white or very light colors to maintain the angelic appearance.",
      dark: "Create a dark theme with deep, rich colors for the halo that provide excellent contrast. Use metallic or gemstone colors for the halo while keeping wing feathers white or light gray.",
      accent:
        "Create an accent theme that uses a single primary color with complementary shades for the halo. Focus on creating a glowing, divine effect while maintaining the purity of the white wings.",
    },

    optionalAiVariantPrompts: {
      monochrome:
        "Create a monochrome theme using only shades of a single color for the halo. Maintain the divine, glowing effect through lightness variations.",
      gradient:
        "Create a gradient theme that uses smooth color transitions for the halo. Apply multiple gradient stops to create a more complex, divine appearance.",
      neon: "Create a neon theme with bright, glowing colors for the halo that would work well in dark environments. Use high saturation and brightness for divine effects.",
      pastel:
        "Create a pastel theme with soft, gentle colors for the halo that are easy on the eyes. Use low saturation and high lightness for a peaceful, angelic appearance.",
      metallic:
        "Create a metallic theme using gold, silver, or other metallic colors for the halo. Focus on creating a luxurious, divine appearance with metallic finishes.",
      gemstone:
        "Create a gemstone theme using colors inspired by precious stones like emerald, sapphire, or ruby for the halo. Focus on creating a rich, divine appearance.",
    },
  },
}
