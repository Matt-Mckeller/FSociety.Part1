/**
 * Few-shot example: Loading spinner with pulsing animation
 * Example of a simple UI indicator with solid color fills and strokes
 */

import type { ExpanseLottieElementDetails } from "expanse.dynamicAssets/types/ExpanseLottie"

export const loadingSpinnerExample = {
  title: "Loading spinner with pulsing animation",
  description:
    "A circular loading indicator with a blue background fill and gray track stroke, featuring rotation animation to show progress",

  elements: [
    {
      name: "SpinnerBackground",
      description: "Container layer for the spinner background circle",
      path: "layers[0]",
      originalColor: null,
      elementType: "layer",
      roleFunction: "background",
      visualLevel: "secondary",
      semanticRole: "structural_group",
      isThemeable: false,
      isBackground: true,
      elementGroups: ["background", "structural"],
      tags: ["container", "non-themeable"],
    },
    {
      name: "SpinnerBackgroundFill",
      description: "Solid blue fill color for the spinner background",
      path: "layers[0].shapes[0].it[1].c.k",
      originalColor: "#3b82f6ff",
      elementType: "fill",
      roleFunction: "ui_indicator",
      visualLevel: "primary",
      semanticRole: "decorative_element",
      isThemeable: true,
      elementGroups: ["spinner", "themeable", "ui"],
      tags: ["primary-color", "brand"],
    },
    {
      name: "SpinnerTrackStroke",
      description: "Gray stroke outlining the spinner track",
      path: "layers[1].shapes[0].it[2].c.k",
      originalColor: "#e5e7ebff",
      elementType: "stroke",
      roleFunction: "ui_indicator",
      visualLevel: "secondary",
      semanticRole: "decorative_element",
      isThemeable: true,
      elementGroups: ["spinner", "themeable", "ui"],
      tags: ["secondary-color", "track"],
    },
  ] as ExpanseLottieElementDetails[],

  animationMetadata: {
    short: "Loading spinner with animated progress",
    detailed:
      "A circular loading indicator with a blue background fill and gray track stroke, featuring rotation animation to show progress",
    visualCharacteristics: [
      "Circular progress indicator",
      "Rotation animation",
      "Blue and gray color scheme",
      "Smooth motion",
    ],
  },
}
