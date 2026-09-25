/**
 * @expanse/character Storybook Preview
 *
 * Uses the shared @expanse/storybook-config for consistent theme/toolbar
 * handling. Every story is wrapped in a <CharacterProvider> plus the web
 * <CharacterThemeSync>, so the 4eye automatically picks up colors from the
 * active MUI theme (no more black character) and reacts to theme switches.
 */

import type { Preview } from "@storybook/react"
import React from "react"
import { createPreviewConfig } from "@expanse/storybook-config"
import { CharacterProvider } from "../src/state"
import { CharacterThemeSync } from "../src/mui"

const preview: Preview = createPreviewConfig({
  includeI18n: false,
  additionalDecorators: [
    (Story) =>
      React.createElement(
        CharacterProvider,
        null,
        React.createElement(CharacterThemeSync, null),
        React.createElement(Story),
      ),
  ],
  additionalParameters: {
    // User preference: always default to a clean white background.
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
