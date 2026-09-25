/**
 * @expanse/lens Storybook Preview
 *
 * Uses the shared @expanse/storybook-config for consistent theme/toolbar
 * handling. Defaults to a clean white background per brand preference.
 */

import type { Preview } from "@storybook/react"
import { createPreviewConfig } from "@expanse/storybook-config"

const preview: Preview = createPreviewConfig({
  includeI18n: false,
  additionalParameters: {
    backgrounds: {
      disable: false,
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "light-gray", value: "#f5f5f5" },
        { name: "dark", value: "#121212" },
      ],
    },
  },
})

export default preview
