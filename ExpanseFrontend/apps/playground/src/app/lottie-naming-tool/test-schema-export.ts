/**
 * Test Schema Export
 */

import {
  generateSchemaFileInline,
  generateSchemaFilename,
} from "./services/export/schemaGenerator"
import type {
  ExpanseLottieMetadata,
  ExpanseLottieElementDetails,
} from "expanse.dynamicAssets"

const mockMetadata: ExpanseLottieMetadata = {
  animationName: "SmilingFace",
  alternativeNames: [
    "SmilingFaceAnimation",
    "HappyFaceReaction",
    "PositiveFeedback",
    "CheerfulFace",
    "ContentSmile",
  ],
  description:
    "A cheerful animation featuring a smiling face with gentle, fluid movements. The face conveys happiness and contentment through its simple yet expressive design.",
  tags: [
    "smile",
    "happy",
    "friendly",
    "positive",
    "face",
    "emoji",
    "greeting",
    "cheerful",
  ],
  recommendations: {
    recommendedColorPalettes: ["warm", "friendly", "pastel"],
    elementGroups: {
      logicalGrouped: {
        face: {
          elements: ["FaceOutlineFill", "FaceBackgroundFill"],
          description: "Main face elements",
        },
      },
      sharedColor: {
        faceColors: {
          elements: ["FaceOutlineFill", "FaceBackgroundFill"],
          description: "Face color group",
          colorRelationship: "shades",
        },
      },
      themingPriority: {
        primary: {
          elements: ["FaceBackgroundFill"],
          description: "Primary theming elements",
          priority: "high",
        },
      },
      visualHierarchy: {
        main: {
          elements: ["FaceBackgroundFill"],
          description: "Main visual elements",
          hierarchy: "primary",
        },
      },
    },
    optionalAiContext: {
      mood: "cheerful and friendly",
    },
    optionalAiStylePrompts: {
      style: "cartoon, friendly, approachable",
    },
  },
}

const mockElements: Record<string, ExpanseLottieElementDetails> = {
  FaceBackgroundFill: {
    name: "FaceBackgroundFill",
    description: "The main background fill of the smiling face",
    path: "layers[0].shapes[0].it[1].c.k",
    originalColor: "#ffcc00ff",
    elementType: "fill",
    roleFunction: "primary_subject",
    visualLevel: "primary",
    semanticRole: "illustrative_object",
    isThemeable: true,
    elementGroups: ["face", "primary"],
    tags: ["main", "face", "background"],
  },
  FaceOutlineFill: {
    name: "FaceOutlineFill",
    description: "The outline stroke of the smiling face",
    path: "layers[0].shapes[1].it[1].c.k",
    originalColor: "#333333ff",
    elementType: "stroke",
    roleFunction: "primary_subject",
    visualLevel: "primary",
    semanticRole: "illustrative_object",
    isThemeable: true,
    elementGroups: ["face", "outline"],
    tags: ["outline", "face"],
  },
}

const schemaContent = generateSchemaFileInline({
  animationName: "SmilingFace",
  metadata: mockMetadata,
  elements: mockElements,
})

console.log("✅ Schema File Generated:\n")
console.log(schemaContent)
console.log(
  `\n📝 File would be saved as: ${generateSchemaFilename("SmilingFace")}`,
)
