/**
 * Financials Module - Utilities
 */
import type { FundingOption, ResourceStatus } from "../../types"

/**
 * Format amount as currency, optionally hidden
 */
export const formatCurrency = (
  amount: number,
  hidden: boolean,
  decimals = 0,
): string => {
  if (hidden) return "••••••"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

/**
 * Get color based on confidence scale
 */
export const getConfidenceColor = (
  scale: "low" | "medium" | "high",
): string => {
  switch (scale) {
    case "high":
      return "#10B981"
    case "medium":
      return "#F59E0B"
    case "low":
      return "#EF4444"
    default:
      return "#64748B"
  }
}

/**
 * Get confidence dots visual indicator
 */
export const getConfidenceDots = (scale: "low" | "medium" | "high"): string => {
  switch (scale) {
    case "high":
      return "●●●●○"
    case "medium":
      return "●●●○○"
    case "low":
      return "●●○○○"
    default:
      return "○○○○○"
  }
}

/**
 * Get color based on months of runway
 */
export const getRunwayColor = (months: number): string => {
  if (months > 6) return "#10B981"
  if (months >= 3) return "#F59E0B"
  return "#EF4444"
}

/**
 * Format month string (YYYY-MM) to readable format
 */
export const formatMonth = (monthStr: string): string => {
  const [year, month] = monthStr.split("-")
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

/**
 * Get color for funding type
 */
export const getFundingTypeColor = (type: FundingOption["type"]): string => {
  switch (type) {
    case "vc":
      return "#8B5CF6"
    case "crowdfunding":
      return "#F59E0B"
    case "revenue":
      return "#10B981"
    case "angel":
      return "#3B82F6"
    case "grants":
      return "#EC4899"
    case "bootstrap":
      return "#10B981"
    case "incubator":
      return "#06B6D4"
    case "wealthy-partner":
      return "#E11D48"
    default:
      return "#64748B"
  }
}

/**
 * Get color for funding status
 */
export const getFundingStatusColor = (
  status: FundingOption["status"],
): string => {
  switch (status) {
    case "in-progress":
      return "#3B82F6"
    case "ready":
      return "#10B981"
    case "exploring":
      return "#F59E0B"
    case "not-started":
      return "#64748B"
    default:
      return "#64748B"
  }
}

/**
 * Get color for a resource's status (have / looking for / found)
 */
export const getResourceColor = (status: ResourceStatus["status"]): string => {
  switch (status) {
    case "have":
      return "#3B82F6"
    case "found":
      return "#10B981"
    case "lf":
      return "#F59E0B"
    default:
      return "#64748B"
  }
}

/**
 * Get caption for a resource's status
 */
export const getResourceLabel = (status: ResourceStatus["status"]): string => {
  switch (status) {
    case "have":
      return "have"
    case "found":
      return "found"
    case "lf":
      return "looking for"
    default:
      return ""
  }
}

/**
 * Get emoji icon for funding type
 */
export const getFundingTypeIcon = (type: FundingOption["type"]): string => {
  switch (type) {
    case "vc":
      return "🏦"
    case "crowdfunding":
      return "🚀"
    case "revenue":
      return "💵"
    case "angel":
      return "👼"
    case "grants":
      return "🏆"
    case "bootstrap":
      return "🔧"
    case "incubator":
      return "🥚"
    case "wealthy-partner":
      return "💎"
    default:
      return "💰"
  }
}
