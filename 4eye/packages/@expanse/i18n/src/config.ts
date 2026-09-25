/**
 * @expanse/i18n Configuration
 *
 * Defines supported locales, timezones, currencies, and formatting options.
 * Used by Storybook toolbar controls and i18n context provider.
 */

// ============================================================================
// Locale Configuration
// ============================================================================

export const locales = ["en-US", "en-GB", "es-ES", "de-DE", "fr-FR", "ja-JP", "zh-CN", "ar-SA"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en-US"

export interface LocaleConfig {
  code: Locale
  name: string
  nativeName: string
  direction: "ltr" | "rtl"
  flag: string
  numberFormat: {
    decimal: string
    thousands: string
  }
  dateOrder: "MDY" | "DMY" | "YMD"
  firstDayOfWeek: 0 | 1 | 6 // Sunday, Monday, Saturday
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  "en-US": {
    code: "en-US",
    name: "English (US)",
    nativeName: "English",
    direction: "ltr",
    flag: "🇺🇸",
    numberFormat: { decimal: ".", thousands: "," },
    dateOrder: "MDY",
    firstDayOfWeek: 0,
  },
  "en-GB": {
    code: "en-GB",
    name: "English (UK)",
    nativeName: "English",
    direction: "ltr",
    flag: "🇬🇧",
    numberFormat: { decimal: ".", thousands: "," },
    dateOrder: "DMY",
    firstDayOfWeek: 1,
  },
  "es-ES": {
    code: "es-ES",
    name: "Spanish",
    nativeName: "Español",
    direction: "ltr",
    flag: "🇪🇸",
    numberFormat: { decimal: ",", thousands: "." },
    dateOrder: "DMY",
    firstDayOfWeek: 1,
  },
  "de-DE": {
    code: "de-DE",
    name: "German",
    nativeName: "Deutsch",
    direction: "ltr",
    flag: "🇩🇪",
    numberFormat: { decimal: ",", thousands: "." },
    dateOrder: "DMY",
    firstDayOfWeek: 1,
  },
  "fr-FR": {
    code: "fr-FR",
    name: "French",
    nativeName: "Français",
    direction: "ltr",
    flag: "🇫🇷",
    numberFormat: { decimal: ",", thousands: " " },
    dateOrder: "DMY",
    firstDayOfWeek: 1,
  },
  "ja-JP": {
    code: "ja-JP",
    name: "Japanese",
    nativeName: "日本語",
    direction: "ltr",
    flag: "🇯🇵",
    numberFormat: { decimal: ".", thousands: "," },
    dateOrder: "YMD",
    firstDayOfWeek: 0,
  },
  "zh-CN": {
    code: "zh-CN",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    direction: "ltr",
    flag: "🇨🇳",
    numberFormat: { decimal: ".", thousands: "," },
    dateOrder: "YMD",
    firstDayOfWeek: 1,
  },
  "ar-SA": {
    code: "ar-SA",
    name: "Arabic",
    nativeName: "العربية",
    direction: "rtl",
    flag: "🇸🇦",
    numberFormat: { decimal: "٫", thousands: "٬" },
    dateOrder: "DMY",
    firstDayOfWeek: 6,
  },
}

// ============================================================================
// Timezone Configuration
// ============================================================================

export const timezones = [
  "local",
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const

export type Timezone = (typeof timezones)[number]

export const defaultTimezone: Timezone = "local"

export interface TimezoneConfig {
  id: Timezone
  name: string
  abbr: string
  utcOffset: string
  icon: string
}

export const timezoneConfigs: Record<Timezone, TimezoneConfig> = {
  local: {
    id: "local",
    name: "Local (Browser)",
    abbr: "Local",
    utcOffset: "Auto",
    icon: "🏠",
  },
  UTC: {
    id: "UTC",
    name: "UTC (Coordinated Universal Time)",
    abbr: "UTC",
    utcOffset: "+00:00",
    icon: "🌐",
  },
  "America/New_York": {
    id: "America/New_York",
    name: "Eastern Time (New York)",
    abbr: "ET",
    utcOffset: "-05:00",
    icon: "🗽",
  },
  "America/Chicago": {
    id: "America/Chicago",
    name: "Central Time (Chicago)",
    abbr: "CT",
    utcOffset: "-06:00",
    icon: "🌽",
  },
  "America/Denver": {
    id: "America/Denver",
    name: "Mountain Time (Denver)",
    abbr: "MT",
    utcOffset: "-07:00",
    icon: "🏔️",
  },
  "America/Los_Angeles": {
    id: "America/Los_Angeles",
    name: "Pacific Time (Los Angeles)",
    abbr: "PT",
    utcOffset: "-08:00",
    icon: "🌴",
  },
  "Europe/London": {
    id: "Europe/London",
    name: "London (GMT/BST)",
    abbr: "GMT",
    utcOffset: "+00:00",
    icon: "🇬🇧",
  },
  "Europe/Paris": {
    id: "Europe/Paris",
    name: "Central European (Paris)",
    abbr: "CET",
    utcOffset: "+01:00",
    icon: "🇫🇷",
  },
  "Europe/Berlin": {
    id: "Europe/Berlin",
    name: "Central European (Berlin)",
    abbr: "CET",
    utcOffset: "+01:00",
    icon: "🇩🇪",
  },
  "Asia/Tokyo": {
    id: "Asia/Tokyo",
    name: "Japan Standard Time (Tokyo)",
    abbr: "JST",
    utcOffset: "+09:00",
    icon: "🇯🇵",
  },
  "Asia/Shanghai": {
    id: "Asia/Shanghai",
    name: "China Standard Time (Shanghai)",
    abbr: "CST",
    utcOffset: "+08:00",
    icon: "🇨🇳",
  },
  "Asia/Dubai": {
    id: "Asia/Dubai",
    name: "Gulf Standard Time (Dubai)",
    abbr: "GST",
    utcOffset: "+04:00",
    icon: "🇦🇪",
  },
  "Asia/Kolkata": {
    id: "Asia/Kolkata",
    name: "India Standard Time (Mumbai)",
    abbr: "IST",
    utcOffset: "+05:30",
    icon: "🇮🇳",
  },
  "Australia/Sydney": {
    id: "Australia/Sydney",
    name: "Australian Eastern (Sydney)",
    abbr: "AEST",
    utcOffset: "+10:00",
    icon: "🇦🇺",
  },
  "Pacific/Auckland": {
    id: "Pacific/Auckland",
    name: "New Zealand (Auckland)",
    abbr: "NZST",
    utcOffset: "+12:00",
    icon: "🇳🇿",
  },
}

// ============================================================================
// Currency Configuration
// ============================================================================

export const currencies = ["USD", "EUR", "GBP", "JPY", "CNY", "SAR", "INR", "AUD", "CAD", "CHF"] as const
export type Currency = (typeof currencies)[number]

export const defaultCurrency: Currency = "USD"

export interface CurrencyConfig {
  code: Currency
  name: string
  symbol: string
  symbolPosition: "before" | "after"
  decimalPlaces: number
  icon: string
}

export const currencyConfigs: Record<Currency, CurrencyConfig> = {
  USD: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    symbolPosition: "before",
    decimalPlaces: 2,
    icon: "💵",
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    symbolPosition: "after",
    decimalPlaces: 2,
    icon: "💶",
  },
  GBP: {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    symbolPosition: "before",
    decimalPlaces: 2,
    icon: "💷",
  },
  JPY: {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    symbolPosition: "before",
    decimalPlaces: 0,
    icon: "💴",
  },
  CNY: {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    symbolPosition: "before",
    decimalPlaces: 2,
    icon: "🇨🇳",
  },
  SAR: {
    code: "SAR",
    name: "Saudi Riyal",
    symbol: "ر.س",
    symbolPosition: "after",
    decimalPlaces: 2,
    icon: "🇸🇦",
  },
  INR: {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    symbolPosition: "before",
    decimalPlaces: 2,
    icon: "🇮🇳",
  },
  AUD: {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    symbolPosition: "before",
    decimalPlaces: 2,
    icon: "🇦🇺",
  },
  CAD: {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    symbolPosition: "before",
    decimalPlaces: 2,
    icon: "🇨🇦",
  },
  CHF: {
    code: "CHF",
    name: "Swiss Franc",
    symbol: "CHF",
    symbolPosition: "before",
    decimalPlaces: 2,
    icon: "🇨🇭",
  },
}

// ============================================================================
// Direction Configuration  
// ============================================================================

export type Direction = "auto" | "ltr" | "rtl"

export const directions: Direction[] = ["auto", "ltr", "rtl"]

export const defaultDirection: Direction = "auto"

/**
 * Get effective direction based on locale or explicit setting
 */
export function getEffectiveDirection(direction: Direction, locale: Locale): "ltr" | "rtl" {
  if (direction === "auto") {
    return localeConfigs[locale]?.direction ?? "ltr"
  }
  return direction
}
