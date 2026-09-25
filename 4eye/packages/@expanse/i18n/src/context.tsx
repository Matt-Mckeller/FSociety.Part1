"use client"

import React, { createContext, useContext, useMemo } from "react"
import type { Locale, Timezone, Currency } from "./config"
import { localeConfigs, timezoneConfigs, currencyConfigs, defaultLocale, defaultTimezone, defaultCurrency } from "./config"

// ============================================================================
// Types
// ============================================================================

export interface I18nContextValue {
  // Current settings
  locale: Locale
  timezone: Timezone
  currency: Currency

  // Locale helpers
  direction: "ltr" | "rtl"
  localeConfig: (typeof localeConfigs)[Locale]

  // Formatters
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string
  formatCurrency: (value: number, currencyOverride?: Currency) => string
  formatPercent: (value: number, options?: Intl.NumberFormatOptions) => string
  formatCompact: (value: number) => string

  // Date/Time formatters
  formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string
  formatTime: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string
  formatDateTime: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string
  formatRelativeTime: (date: Date | string | number) => string
  formatDateRange: (start: Date | string | number, end: Date | string | number) => string

  // Shorthand date formats
  formatShortDate: (date: Date | string | number) => string
  formatLongDate: (date: Date | string | number) => string
  formatMonthYear: (date: Date | string | number) => string
  formatWeekday: (date: Date | string | number) => string

  // Timezone helpers
  getTimezoneOffset: () => string
  getCurrentTime: () => string
}

export interface I18nProviderProps {
  locale?: Locale
  timezone?: Timezone
  currency?: Currency
  children: React.ReactNode
}

// ============================================================================
// Context
// ============================================================================

const I18nContext = createContext<I18nContextValue | null>(null)

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook to access i18n context.
 * @throws Error if used outside of I18nProvider
 */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

/**
 * Optional hook that returns null if not in provider.
 * Useful for components that work with/without i18n.
 */
export function useI18nOptional(): I18nContextValue | null {
  return useContext(I18nContext)
}

// ============================================================================
// Provider
// ============================================================================

export function I18nProvider({
  locale = defaultLocale,
  timezone = defaultTimezone,
  currency = defaultCurrency,
  children,
}: I18nProviderProps) {
  const value = useMemo<I18nContextValue>(() => {
    const localeConfig = localeConfigs[locale]
    const effectiveTimezone = timezone === "local" ? undefined : timezone

    // Helper to normalize date input
    const normalizeDate = (date: Date | string | number): Date => {
      if (date instanceof Date) return date
      if (typeof date === "number") return new Date(date)
      return new Date(date)
    }

    // ========================================================================
    // Number Formatters
    // ========================================================================

    const formatNumber = (value: number, options?: Intl.NumberFormatOptions): string => {
      return new Intl.NumberFormat(locale, options).format(value)
    }

    const formatCurrency = (value: number, currencyOverride?: Currency): string => {
      const curr = currencyOverride || currency
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: curr,
        minimumFractionDigits: currencyConfigs[curr].decimalPlaces,
        maximumFractionDigits: currencyConfigs[curr].decimalPlaces,
      }).format(value)
    }

    const formatPercent = (value: number, options?: Intl.NumberFormatOptions): string => {
      return new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options,
      }).format(value)
    }

    const formatCompact = (value: number): string => {
      return new Intl.NumberFormat(locale, {
        notation: "compact",
        compactDisplay: "short",
      }).format(value)
    }

    // ========================================================================
    // Date/Time Formatters
    // ========================================================================

    const formatDate = (date: Date | string | number, options?: Intl.DateTimeFormatOptions): string => {
      const d = normalizeDate(date)
      return new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeZone: effectiveTimezone,
        ...options,
      }).format(d)
    }

    const formatTime = (date: Date | string | number, options?: Intl.DateTimeFormatOptions): string => {
      const d = normalizeDate(date)
      return new Intl.DateTimeFormat(locale, {
        timeStyle: "short",
        timeZone: effectiveTimezone,
        ...options,
      }).format(d)
    }

    const formatDateTime = (date: Date | string | number, options?: Intl.DateTimeFormatOptions): string => {
      const d = normalizeDate(date)
      return new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: effectiveTimezone,
        ...options,
      }).format(d)
    }

    const formatRelativeTime = (date: Date | string | number): string => {
      const d = normalizeDate(date)
      const now = new Date()
      const diffMs = d.getTime() - now.getTime()
      const diffSec = Math.round(diffMs / 1000)
      const diffMin = Math.round(diffSec / 60)
      const diffHour = Math.round(diffMin / 60)
      const diffDay = Math.round(diffHour / 24)
      const diffWeek = Math.round(diffDay / 7)
      const diffMonth = Math.round(diffDay / 30)
      const diffYear = Math.round(diffDay / 365)

      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })

      if (Math.abs(diffSec) < 60) {
        return rtf.format(diffSec, "second")
      } else if (Math.abs(diffMin) < 60) {
        return rtf.format(diffMin, "minute")
      } else if (Math.abs(diffHour) < 24) {
        return rtf.format(diffHour, "hour")
      } else if (Math.abs(diffDay) < 7) {
        return rtf.format(diffDay, "day")
      } else if (Math.abs(diffWeek) < 4) {
        return rtf.format(diffWeek, "week")
      } else if (Math.abs(diffMonth) < 12) {
        return rtf.format(diffMonth, "month")
      }
      return rtf.format(diffYear, "year")
    }

    const formatDateRange = (start: Date | string | number, end: Date | string | number): string => {
      const s = normalizeDate(start)
      const e = normalizeDate(end)
      // @ts-expect-error - formatRange is available in modern browsers
      if (Intl.DateTimeFormat.prototype.formatRange) {
        const formatter = new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
          timeZone: effectiveTimezone,
        })
        // @ts-expect-error - formatRange is available in modern browsers
        return formatter.formatRange(s, e)
      }
      // Fallback for older browsers
      return `${formatDate(s)} – ${formatDate(e)}`
    }

    // Shorthand date formats
    const formatShortDate = (date: Date | string | number): string => {
      return formatDate(date, { dateStyle: "short" })
    }

    const formatLongDate = (date: Date | string | number): string => {
      return formatDate(date, { dateStyle: "long" })
    }

    const formatMonthYear = (date: Date | string | number): string => {
      const d = normalizeDate(date)
      return new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
        timeZone: effectiveTimezone,
      }).format(d)
    }

    const formatWeekday = (date: Date | string | number): string => {
      const d = normalizeDate(date)
      return new Intl.DateTimeFormat(locale, {
        weekday: "long",
        timeZone: effectiveTimezone,
      }).format(d)
    }

    // ========================================================================
    // Timezone Helpers
    // ========================================================================

    const getTimezoneOffset = (): string => {
      if (timezone === "local") {
        const offset = new Date().getTimezoneOffset()
        const hours = Math.floor(Math.abs(offset) / 60)
        const minutes = Math.abs(offset) % 60
        const sign = offset <= 0 ? "+" : "-"
        return `UTC${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
      }
      return timezoneConfigs[timezone].utcOffset
    }

    const getCurrentTime = (): string => {
      return formatTime(new Date())
    }

    return {
      locale,
      timezone,
      currency,
      direction: localeConfig.direction,
      localeConfig,
      formatNumber,
      formatCurrency,
      formatPercent,
      formatCompact,
      formatDate,
      formatTime,
      formatDateTime,
      formatRelativeTime,
      formatDateRange,
      formatShortDate,
      formatLongDate,
      formatMonthYear,
      formatWeekday,
      getTimezoneOffset,
      getCurrentTime,
    }
  }, [locale, timezone, currency])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
