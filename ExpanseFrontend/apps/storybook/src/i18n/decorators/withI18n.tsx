import React from "react"
import type { Decorator } from "@storybook/react"
import { I18nProvider } from "../context"
import type { Locale, Timezone, Currency } from "../config"
import { defaultLocale, defaultTimezone, defaultCurrency } from "../config"

/**
 * Storybook decorator that wraps stories with the I18nProvider.
 * Reads locale, timezone, and currency from Storybook globals (toolbar).
 */
export const withI18n: Decorator = (Story, context) => {
  const locale = (context.globals.locale as Locale) || defaultLocale
  const timezone = (context.globals.timezone as Timezone) || defaultTimezone
  const currency = (context.globals.currency as Currency) || defaultCurrency

  return (
    <I18nProvider locale={locale} timezone={timezone} currency={currency}>
      <Story />
    </I18nProvider>
  )
}
