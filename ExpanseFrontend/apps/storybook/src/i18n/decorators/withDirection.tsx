import React from "react"
import type { Decorator } from "@storybook/react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import rtlPlugin from "stylis-plugin-rtl"
import { prefixer } from "stylis"
import type { Locale } from "../config"
import { localeConfigs, defaultLocale } from "../config"

/**
 * RTL (Right-to-Left) direction support for Storybook.
 *
 * This decorator handles:
 * 1. Setting the `dir` attribute on the wrapper element
 * 2. Configuring Emotion cache with RTL plugin for CSS transformation
 * 3. Auto-detecting direction from locale or manual override
 *
 * @example
 * // Auto from locale (ar-SA → RTL, en-US → LTR)
 * globalTypes.direction = "auto"
 *
 * // Force LTR regardless of locale
 * globalTypes.direction = "ltr"
 *
 * // Force RTL regardless of locale
 * globalTypes.direction = "rtl"
 */

// RTL locales (languages that read right-to-left)
const RTL_LOCALES = ["ar-SA", "he-IL", "fa-IR", "ur-PK"]

// Create caches for LTR and RTL
// These are created once and reused to avoid memory leaks
const ltrCache = createCache({
  key: "muiltr",
  prepend: true,
})

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true,
})

export type Direction = "auto" | "ltr" | "rtl"

/**
 * Determine the effective direction based on settings and locale
 */
export function getEffectiveDirection(direction: Direction, locale: Locale): "ltr" | "rtl" {
  if (direction === "auto") {
    // Check if locale is RTL
    return RTL_LOCALES.includes(locale) ? "rtl" : "ltr"
  }
  return direction
}

/**
 * Storybook decorator that handles RTL/LTR direction.
 * Reads direction from Storybook globals (toolbar) and locale.
 *
 * Must be placed BEFORE the MUI ThemeProvider decorator in the chain
 * so that the Emotion cache is properly configured.
 */
export const withDirection: Decorator = (Story, context) => {
  const direction = (context.globals.direction as Direction) || "auto"
  const locale = (context.globals.locale as Locale) || defaultLocale

  const effectiveDirection = getEffectiveDirection(direction, locale)
  const cache = effectiveDirection === "rtl" ? rtlCache : ltrCache
  const localeConfig = localeConfigs[locale]

  return (
    <CacheProvider value={cache}>
      <div
        dir={effectiveDirection}
        lang={locale}
        style={{
          // Ensure the container respects direction
          textAlign: effectiveDirection === "rtl" ? "right" : "left",
        }}
      >
        {/* Show RTL indicator in development */}
        {effectiveDirection === "rtl" && (
          <div
            style={{
              position: "fixed",
              top: 8,
              right: 8,
              backgroundColor: "#f0f0f0",
              color: "#333",
              padding: "4px 8px",
              borderRadius: 4,
              fontSize: 12,
              fontFamily: "monospace",
              zIndex: 9999,
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            {localeConfig.flag} RTL Mode
          </div>
        )}
        <Story />
      </div>
    </CacheProvider>
  )
}
