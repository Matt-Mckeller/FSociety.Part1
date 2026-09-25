/**
 * Validation Utility
 * Validates naming completeness and quality
 */

import {
  ComponentNode,
  ValidationIssue,
  ValidationSummary,
  ValidationReport,
  COMPONENT_LEVELS,
} from "../types/types"
import { isValidName, isGenericName } from "./lottieParser"

/**
 * Validate element tree (component tree)
 */
export function validateComponentTree(
  tree: ComponentNode[],
  animationId: string,
): ValidationReport {
  const issues: ValidationIssue[] = []

  // Walk tree and collect issues
  walkTreeForValidation(tree, issues)

  // Generate summary
  const summary = generateValidationSummary(tree, issues)

  return {
    animationId,
    validatedAt: new Date().toISOString(),
    summary,
    issues,
  }
}

/**
 * Walk tree and collect validation issues
 */
function walkTreeForValidation(
  nodes: ComponentNode[],
  issues: ValidationIssue[],
): void {
  nodes.forEach((node) => {
    // Check if unnamed
    if (!node.currentName && !node.suggestedName) {
      // Only error for themeable components
      if (node.isThemeable) {
        issues.push({
          path: node.path,
          level: node.level,
          currentName: undefined,
          issueType: "unnamed",
          severity: "error",
          message: `Themeable ${node.type} is unnamed`,
          suggestion:
            "Add a descriptive name following [Purpose][Location][Detail] pattern",
        })
      } else if (node.level === COMPONENT_LEVELS.LAYER) {
        // Warning for unnamed layers
        issues.push({
          path: node.path,
          level: node.level,
          currentName: undefined,
          issueType: "unnamed",
          severity: "warning",
          message: `Layer is unnamed`,
          suggestion: "Consider naming for better organization",
        })
      }
    }

    // Check if generic name
    const nameToCheck = node.suggestedName || node.currentName
    if (nameToCheck && isGenericName(nameToCheck)) {
      issues.push({
        path: node.path,
        level: node.level,
        currentName: nameToCheck,
        issueType: "generic",
        severity: node.isThemeable ? "error" : "warning",
        message: `Generic name "${nameToCheck}" found`,
        suggestion: 'Replace with descriptive name like "WingLeftFeatherFill"',
      })
    }

    // Check naming convention
    if (
      nameToCheck &&
      !isGenericName(nameToCheck) &&
      !isValidName(nameToCheck)
    ) {
      issues.push({
        path: node.path,
        level: node.level,
        currentName: nameToCheck,
        issueType: "convention",
        severity: "info",
        message: `Name "${nameToCheck}" doesn't follow convention`,
        suggestion: "Use PascalCase with [Purpose][Location][Detail] pattern",
      })
    }

    // Recurse children
    if (node.children.length > 0) {
      walkTreeForValidation(node.children, issues)
    }
  })
}

/**
 * Generate validation summary
 */
function generateValidationSummary(
  tree: ComponentNode[],
  issues: ValidationIssue[],
): ValidationSummary {
  const stats = collectTreeStats(tree)

  const errorCount = issues.filter((i) => i.severity === "error").length
  const warningCount = issues.filter((i) => i.severity === "warning").length

  let overallStatus: "PASS" | "WARNING" | "FAIL" = "PASS"

  if (errorCount > 0) {
    overallStatus = "FAIL"
  } else if (warningCount > 0) {
    overallStatus = "WARNING"
  }

  const completionRate =
    stats.themeableTotal > 0
      ? (stats.themeableNamed / stats.themeableTotal) * 100
      : 100

  return {
    themeableNamed: stats.themeableNamed,
    themeableTotal: stats.themeableTotal,
    layersNamed: stats.layersNamed,
    layersTotal: stats.layersTotal,
    genericNamesFound: issues.filter((i) => i.issueType === "generic").length,
    overallStatus,
    completionRate: Math.round(completionRate),
  }
}

/**
 * Collect tree statistics
 */
interface TreeStats {
  themeableNamed: number
  themeableTotal: number
  layersNamed: number
  layersTotal: number
}

function collectTreeStats(tree: ComponentNode[]): TreeStats {
  const stats: TreeStats = {
    themeableNamed: 0,
    themeableTotal: 0,
    layersNamed: 0,
    layersTotal: 0,
  }

  function walk(nodes: ComponentNode[]) {
    nodes.forEach((node) => {
      // Count themeable components
      if (node.isThemeable) {
        stats.themeableTotal++
        if (node.suggestedName || node.currentName) {
          stats.themeableNamed++
        }
      }

      // Count layers
      if (node.level === COMPONENT_LEVELS.LAYER) {
        stats.layersTotal++
        if (node.suggestedName || node.currentName) {
          stats.layersNamed++
        }
      }

      if (node.children.length > 0) {
        walk(node.children)
      }
    })
  }

  walk(tree)
  return stats
}

/**
 * Check if validation passes (no errors)
 */
export function isValidationPassing(report: ValidationReport): boolean {
  return report.summary.overallStatus !== "FAIL"
}

/**
 * Get severity color for UI
 */
export function getSeverityColor(
  severity: "error" | "warning" | "info",
): string {
  const colors = {
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196f3",
  }
  return colors[severity]
}

/**
 * Get status color for UI
 */
export function getStatusColor(status: "PASS" | "WARNING" | "FAIL"): string {
  const colors = {
    PASS: "#4caf50",
    WARNING: "#ff9800",
    FAIL: "#f44336",
  }
  return colors[status]
}

/**
 * Format validation report for export
 */
export function formatValidationReport(report: ValidationReport): string {
  const lines: string[] = []

  lines.push("# Lottie Naming Validation Report")
  lines.push(`Animation: ${report.animationId}`)
  lines.push(`Validated: ${new Date(report.validatedAt).toLocaleString()}`)
  lines.push("")

  lines.push("## Summary")
  lines.push(`Status: ${report.summary.overallStatus}`)
  lines.push(`Completion: ${report.summary.completionRate}%`)
  lines.push(
    `Themeable Named: ${report.summary.themeableNamed}/${report.summary.themeableTotal}`,
  )
  lines.push(
    `Layers Named: ${report.summary.layersNamed}/${report.summary.layersTotal}`,
  )
  lines.push(`Generic Names: ${report.summary.genericNamesFound}`)
  lines.push("")

  if (report.issues.length > 0) {
    lines.push("## Issues")

    const errors = report.issues.filter((i) => i.severity === "error")
    const warnings = report.issues.filter((i) => i.severity === "warning")
    const info = report.issues.filter((i) => i.severity === "info")

    if (errors.length > 0) {
      lines.push(`### Errors (${errors.length})`)
      errors.forEach((issue) => {
        lines.push(`- ${issue.path}: ${issue.message}`)
        if (issue.suggestion) lines.push(`  Suggestion: ${issue.suggestion}`)
      })
      lines.push("")
    }

    if (warnings.length > 0) {
      lines.push(`### Warnings (${warnings.length})`)
      warnings.forEach((issue) => {
        lines.push(`- ${issue.path}: ${issue.message}`)
        if (issue.suggestion) lines.push(`  Suggestion: ${issue.suggestion}`)
      })
      lines.push("")
    }

    if (info.length > 0) {
      lines.push(`### Info (${info.length})`)
      info.forEach((issue) => {
        lines.push(`- ${issue.path}: ${issue.message}`)
        if (issue.suggestion) lines.push(`  Suggestion: ${issue.suggestion}`)
      })
    }
  } else {
    lines.push("No issues found! ✅")
  }

  return lines.join("\n")
}
