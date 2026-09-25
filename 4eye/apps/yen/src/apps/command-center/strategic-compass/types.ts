/**
 * Strategic Compass View - Type Definitions
 */
import type { NavigationalVariable } from "../data"

export interface OperatingPrinciple {
  id: string
  title: string
  description: string
  type: "rule" | "habit" | "principle" | "sequence" | "optimization"
  weight: number
  icon: string
}

export type OperatingPrincipleType = OperatingPrinciple["type"]
export type NavigationalVariableType = NavigationalVariable["type"]
