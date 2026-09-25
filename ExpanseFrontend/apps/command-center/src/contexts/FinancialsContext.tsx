/**
 * FinancialsContext - Centralized state for financial data
 * Used by: FinancialsView
 */
import { createContext, useContext, useMemo, ReactNode } from "react"
import type { Financials, FundingOption } from "../types"

// Import data
import financialsData from "../data/financials.json"

interface FinancialsContextValue {
  financials: Financials

  // Cash/Credit selectors
  getTotalCash: () => number
  getTotalCredit: () => number
  getMonthlyBurn: () => number
  getRunway: () => number // months

  // Spending selectors
  getSpendingByCategory: (
    category: "essentials" | "business" | "discretionary",
  ) => number
  getTotalSpending: () => number

  // Revenue selectors
  getTotalPotentialRevenue: () => number
  getRevenueByProject: (projectId: string) => number | undefined

  // Funding selectors
  getFundingOptions: () => FundingOption[]
  getActiveFundingOptions: () => FundingOption[]
  getFundingByType: (type: FundingOption["type"]) => FundingOption[]
}

const FinancialsContext = createContext<FinancialsContextValue | null>(null)

export function FinancialsProvider({ children }: { children: ReactNode }) {
  const financials = financialsData as Financials

  // Totals come from the individual accounts when no explicit total is set
  const totalCash =
    financials.current.cash ??
    financials.current.cashAccounts?.reduce(
      (sum, acc) => sum + acc.balance,
      0,
    ) ??
    0
  const totalCredit =
    financials.current.credit ??
    financials.current.creditAccounts?.reduce(
      (sum, acc) => sum + acc.available,
      0,
    ) ??
    0

  const value = useMemo<FinancialsContextValue>(
    () => ({
      financials,

      getTotalCash: () => totalCash,

      getTotalCredit: () => totalCredit,

      getMonthlyBurn: () => financials.current.monthlyBurn,

      getRunway: () => {
        const totalAvailable = totalCash + totalCredit
        return financials.current.monthlyBurn > 0
          ? Math.floor(totalAvailable / financials.current.monthlyBurn)
          : Infinity
      },

      getSpendingByCategory: (category) => {
        const spending = financials.spending.find(
          (s) => s.category === category,
        )
        return spending?.thisMonth || 0
      },

      getTotalSpending: () =>
        financials.spending.reduce((sum, s) => sum + s.thisMonth, 0),

      getTotalPotentialRevenue: () =>
        financials.projectRevenue.reduce(
          (sum, p) => sum + p.potentialIncome,
          0,
        ),

      getRevenueByProject: (projectId) =>
        financials.projectRevenue.find((p) => p.projectId === projectId)
          ?.potentialIncome,

      getFundingOptions: () => financials.fundingOptions || [],

      getActiveFundingOptions: () =>
        (financials.fundingOptions || []).filter(
          (f) => f.status === "exploring" || f.status === "in-progress",
        ),

      getFundingByType: (type) =>
        (financials.fundingOptions || []).filter((f) => f.type === type),
    }),
    [financials, totalCash, totalCredit],
  )

  return (
    <FinancialsContext.Provider value={value}>
      {children}
    </FinancialsContext.Provider>
  )
}

export function useFinancials() {
  const context = useContext(FinancialsContext)
  if (!context) {
    throw new Error("useFinancials must be used within a FinancialsProvider")
  }
  return context
}
