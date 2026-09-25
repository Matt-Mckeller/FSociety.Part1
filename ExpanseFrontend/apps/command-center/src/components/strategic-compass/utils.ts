/**
 * Strategic Compass View - Utility Functions
 */
import type { NavigationalVariable } from "../../types"
import type {
  OperatingPrinciple,
  NavigationalVariableType,
  OperatingPrincipleType,
} from "./types"

/**
 * Group navigational variables by type
 */
export function groupNavsByType(
  navs: NavigationalVariable[],
): Record<NavigationalVariableType, NavigationalVariable[]> {
  return navs.reduce(
    (acc, n) => {
      if (!acc[n.type]) acc[n.type] = []
      acc[n.type].push(n)
      return acc
    },
    {} as Record<NavigationalVariableType, NavigationalVariable[]>,
  )
}

/**
 * Group operating principles by type
 */
export function groupPrinciplesByType(
  principles: OperatingPrinciple[],
): Record<OperatingPrincipleType, OperatingPrinciple[]> {
  return principles.reduce(
    (acc, p) => {
      if (!acc[p.type]) acc[p.type] = []
      acc[p.type].push(p)
      return acc
    },
    {} as Record<OperatingPrincipleType, OperatingPrinciple[]>,
  )
}
