/**
 * StrategicContext - Centralized state for strategic/vision data
 * Used by: CorporateVisionCard, StrategicCompassView, HierarchyExplainer
 */
import { createContext, useContext, useMemo, ReactNode } from "react"
import type { Legend, OperatingPrinciple } from "../types"

// Import data
import corporateVisionData from "../data/corporateVision.json"
import legendData from "../data/legend.json"
import strategicCompassData from "../data/strategicCompass.json"
import operatingPrinciplesData from "../data/operatingPrinciples.json"

// Re-export raw data for components that need module-level access
export {
  corporateVisionData,
  legendData,
  strategicCompassData,
  operatingPrinciplesData,
}

// Type definitions for imported data
// Using flexible Record types to accommodate all JSON properties
interface CorporateVision {
  sectionDescription: string
  missionStatement: string
  coreValues: string[]
  strategicTimeline: Record<string, string>
  strategicObjectives: Record<
    string,
    {
      title: string
      icon: string
      currentFocus: string
      items: string[]
    }
  >
  // Additional optional properties
  strategicPillars?: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
  leadershipCulture?: string[]
  safetySecurityCompliance?: string[]
  longTermVision?: Record<string, unknown>
  [key: string]: unknown // Allow additional properties
}

interface StrategicCompass {
  currentFocusAreas: Array<{
    id: string
    title: string
    description: string
    linkedProjectId?: string
  }>
  productValueOfferings?: Record<string, unknown>
  humanImpact?: Record<string, unknown>
  businessMarketValue?: string[]
}

interface StrategicContextValue {
  // Data
  corporateVision: CorporateVision
  legend: Legend
  strategicCompass: StrategicCompass
  operatingPrinciples: OperatingPrinciple[]

  // Selectors
  getMissionStatement: () => string
  getCoreValues: () => string[]
  getStrategicObjectives: () => CorporateVision["strategicObjectives"]
  getCurrentFocusAreas: () => StrategicCompass["currentFocusAreas"]
  getOperatingPrinciplesByType: (
    type: OperatingPrinciple["type"],
  ) => OperatingPrinciple[]
}

const StrategicContext = createContext<StrategicContextValue | null>(null)

export function StrategicProvider({ children }: { children: ReactNode }) {
  const corporateVision =
    corporateVisionData.corporateVision as unknown as CorporateVision
  const legend = legendData.legend as Legend
  const strategicCompass = strategicCompassData as unknown as StrategicCompass
  const operatingPrinciplesRaw = operatingPrinciplesData as Record<
    string,
    unknown
  >
  const operatingPrinciples = (operatingPrinciplesRaw.operatingPrinciples ||
    operatingPrinciplesRaw.principles ||
    []) as OperatingPrinciple[]

  const value = useMemo<StrategicContextValue>(
    () => ({
      corporateVision,
      legend,
      strategicCompass,
      operatingPrinciples,

      getMissionStatement: () => corporateVision.missionStatement,

      getCoreValues: () => corporateVision.coreValues,

      getStrategicObjectives: () => corporateVision.strategicObjectives,

      getCurrentFocusAreas: () => strategicCompass.currentFocusAreas || [],

      getOperatingPrinciplesByType: (type: OperatingPrinciple["type"]) =>
        operatingPrinciples.filter((p) => p.type === type),
    }),
    [corporateVision, legend, strategicCompass, operatingPrinciples],
  )

  return (
    <StrategicContext.Provider value={value}>
      {children}
    </StrategicContext.Provider>
  )
}

export function useStrategic() {
  const context = useContext(StrategicContext)
  if (!context) {
    throw new Error("useStrategic must be used within a StrategicProvider")
  }
  return context
}
