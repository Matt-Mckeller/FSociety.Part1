/**
 * 4eye-web-mockup Storybook Preview
 *
 * Uses shared @expanse/storybook-config and registers brand-core
 * component theme extensions so Character4eye and related primitives
 * receive their component tokens in Storybook.
 *
 * White background per project storybook conventions.
 */

import * as React from "react"
import type { Preview } from "@storybook/react"
import { createPreviewConfig } from "@expanse/storybook-config"
import { createBrandCoreExtensions } from "@expanse/brand-core"

// Register the company font "Xpens" inside Storybook so stories render in the
// real brand typeface (the app does this in src/app/providers.tsx, but the
// Storybook preview is a separate document and needs its own @font-face).
const XPENS_FONT_FACES = `
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Light.ttf") format("truetype"); font-weight: 300; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-LightItalic.ttf") format("truetype"); font-weight: 300; font-style: italic; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Regular.ttf") format("truetype"); font-weight: 400; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Italic.ttf") format("truetype"); font-weight: 400; font-style: italic; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Medium.ttf") format("truetype"); font-weight: 500; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-MediumItalic.ttf") format("truetype"); font-weight: 500; font-style: italic; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-SemiBold.ttf") format("truetype"); font-weight: 600; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-SemiBoldItalic.ttf") format("truetype"); font-weight: 600; font-style: italic; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Bold.ttf") format("truetype"); font-weight: 700; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-BoldItalic.ttf") format("truetype"); font-weight: 700; font-style: italic; font-display: swap; }
  .sb-show-main { font-family: "Xpens", Roboto, sans-serif; }
`

const base = createPreviewConfig({
  extensionFactory: (palette) => createBrandCoreExtensions(palette),
  includeI18n: false,
  additionalParameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    layout: "fullscreen",
  },
})

const preview: Preview = {
  ...base,
  decorators: [
    ...(base.decorators ?? []),
    (Story) =>
      React.createElement(
        React.Fragment,
        null,
        React.createElement("style", null, XPENS_FONT_FACES),
        React.createElement(Story),
      ),
  ],
}

export default preview
