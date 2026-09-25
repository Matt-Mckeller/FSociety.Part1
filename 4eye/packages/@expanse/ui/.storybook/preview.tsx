/**
 * @expanse/ui Storybook Preview
 *
 * Uses the shared @expanse/storybook-config for consistent theme handling.
 * @expanse/ui components are presentation-only and rely on the base theme,
 * so no component-theme extensions or i18n are required here.
 */

import type { Preview } from "@storybook/react"
import { createPreviewConfig } from "@expanse/storybook-config"

const preview: Preview = createPreviewConfig({
  includeI18n: false,
})

export default preview
