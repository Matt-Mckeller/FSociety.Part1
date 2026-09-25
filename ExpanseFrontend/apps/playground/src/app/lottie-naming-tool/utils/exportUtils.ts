/**
 * Export Utilities
 * Handle exporting Lottie JSON, mappings, and screenshots
 */

import {
  LottieData,
  ComponentNode,
  ValidationReport,
  ExportOptions,
  AINamingResponse,
} from "../types/types"
import { createLogger } from "./logger"
import type {
  ExpanseLottie,
  ExpanseLottieMetadata,
  ExpanseLottieElementDetails,
} from "expanse.dynamicAssets"
import { generateSchemaFileInline } from "../services/export/schemaGenerator"
import { generateComponentFileContent } from "../services/theme/themeFileGenerator"

/**
 * Apply names to Lottie JSON from elements Record
 * Uses AI-generated element names to update the Lottie JSON layer names
 */
export function applyNamesToLottieJSON(
  lottieData: LottieData,
  elements: Record<string, ExpanseLottieElementDetails>,
): LottieData {
  const lottieClone = JSON.parse(JSON.stringify(lottieData))

  // Build path -> name map from elements
  const nameMap = new Map<string, string>()
  Object.values(elements).forEach((element) => {
    nameMap.set(element.path, element.name)
    // Also map the base path (without .c.k suffix) for matching
    const basePath = element.path
      .replace(/\.c\.k$/, "")
      .replace(/\.s\.k$/, "")
      .replace(/\.g\.k\.k$/, "")
    if (basePath !== element.path) {
      nameMap.set(basePath, element.name)
    }
  })

  // Apply names by traversing the JSON
  applyNamesRecursive(lottieClone, "", nameMap)

  return lottieClone
}

/**
 * Recursively apply names to Lottie JSON
 */
function applyNamesRecursive(
  obj: any,
  path: string,
  nameMap: Map<string, string>,
): void {
  if (typeof obj !== "object" || obj === null) return

  // Check if this path has a name
  const newName = nameMap.get(path)
  if (newName && obj.nm !== undefined) {
    obj.nm = newName
  }

  // Recurse into properties
  Object.keys(obj).forEach((key) => {
    const value = obj[key]

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const itemPath = path ? `${path}.${key}[${index}]` : `${key}[${index}]`
        applyNamesRecursive(item, itemPath, nameMap)
      })
    } else if (typeof value === "object" && value !== null) {
      const childPath = path ? `${path}.${key}` : key
      applyNamesRecursive(value, childPath, nameMap)
    }
  })
}

/**
 * Generate Layer Config JSON (for theming system)
 * Maps Lottie paths to semantic names with metadata
 */
export function generateLayerConfig(
  componentTree: ComponentNode[],
  lottieData: LottieData,
): Record<string, any> {
  const config: Record<string, any> = {}

  // Build a map of path -> suggested name for quick lookup
  const pathToNameMap = buildPathToNameMap(componentTree)

  function walk(nodes: ComponentNode[]) {
    nodes.forEach((node) => {
      // Only include elements with suggested names
      if (node.suggestedName) {
        // Build layer path from SUGGESTED names (not original)
        const layerPath = buildSemanticLayerPath(node.path, pathToNameMap)

        config[node.path] = {
          name: node.suggestedName,
          elementType: detectElementTypeFromData(node.path, lottieData),
          layerPath, // Human-readable: "CharacterRightHandRight > ThumbGroup > ThumbFill"
          // Include rich metadata
          ...(node.originalColor && {
            originalColor: node.originalColor,
          }),
          ...(node.roleFunction && {
            roleFunction: node.roleFunction,
          }),
          ...(node.visualLevel && {
            visualLevel: node.visualLevel,
          }),
          ...(node.semanticRole && {
            semanticRole: node.semanticRole,
          }),
          ...(node.isThemeable && {
            themeable: true,
          }),
          ...(node.needsName && {
            needsName: true,
            recommendation: "Add descriptive name in After Effects",
          }),
        }
      }
      if (node.children.length > 0) {
        walk(node.children)
      }
    })
  }

  walk(componentTree)
  return config
}

/**
 * @deprecated Use generateUnifiedSchemaTypeScript() instead
 * This function generates the old ThemeableLayoutConfig format.
 * Kept temporarily for backward compatibility.
 *
 * Generate Animation Metadata JSON
 * Contains full AI analysis with all details and disclaimer
 *
 * @deprecated This function uses legacy AINamingResponse format.
 * Metadata is now part of ExpanseLottieSchema. Will be removed in next version.
 */
export function generateAnimationMetadata(
  aiNamingResponse?: AINamingResponse,
): any {
  if (!aiNamingResponse) {
    return {
      disclaimer:
        "This file contains AI-generated analysis and may not include every detail. Generated automatically by the Lottie Naming Tool.",
      elements: [],
      animation: null,
    }
  }

  return {
    disclaimer:
      "This file contains AI-generated analysis and may not include every detail. Generated automatically by the Lottie Naming Tool.",
    elements: aiNamingResponse.elementNames.map((element) => ({
      name: element.name, // Fixed: was suggestedName
      path: element.path,
      description: element.description, // Added: proper description field
      originalColor: element.originalColor,
      roleFunction: element.roleFunction,
      visualLevel: element.visualLevel,
      semanticRole: element.semanticRole,
      isThemeable: element.isThemeable,
      elementType: element.elementType,
      elementGroups: element.elementGroups,
      tags: element.tags,
    })),
    animation: {
      short: aiNamingResponse.description.short,
      detailed: aiNamingResponse.description.detailed,
      visualCharacteristics: aiNamingResponse.description.visualCharacteristics,
    },
  }
}

/**
 * Generate Theme Template JSON (Legacy format - kept for backward compatibility)
 * Format matches the structure used in dynamicAssets theme configurations
 */
export function generateThemeTemplateFromTree(
  componentTree: ComponentNode[],
  lottieData: LottieData,
): any {
  const themeColors: Record<string, any> = {}

  function extractGroupAndLayer(name: string): {
    group: string
    layer: string
  } {
    // Try to intelligently extract group/layer from name
    // e.g., "LeftWingOuterFeatherFill" -> group: "LeftWing", layer: "LeftWingOuterFeather"
    const parts = name.match(/([A-Z][a-z]+)/g) || []

    if (parts.length >= 2) {
      // First 1-2 parts = group, everything except last part = layer
      const group = parts.slice(0, 2).join("")
      const layer = parts.slice(0, -1).join("")
      return { group, layer }
    }

    return { group: "Default", layer: name }
  }

  function walk(nodes: ComponentNode[]) {
    nodes.forEach((node) => {
      // Only include themeable elements with colors
      if (node.suggestedName && node.isThemeable) {
        // Use AI-provided originalColor if available, else extract from structure
        const color = node.originalColor

        if (color) {
          const { group, layer } = extractGroupAndLayer(node.suggestedName)

          themeColors[node.suggestedName] = {
            id: node.suggestedName,
            path: node.path,
            originalColor: color,
            group,
            layer,
          }
        }
      }
      if (node.children.length > 0) {
        walk(node.children)
      }
    })
  }

  walk(componentTree)

  return themeColors
}

/**
 * Generate Naming Recommendations Report
 * Lists elements that should be named in After Effects
 */
export function generateNamingRecommendations(
  componentTree: ComponentNode[],
  lottieData: LottieData,
): any {
  const elementsNeedingNames: any[] = []
  let totalElements = 0
  let namedElements = 0

  // Build path to name map for semantic paths
  const pathToNameMap = buildPathToNameMap(componentTree)

  function walk(nodes: ComponentNode[]) {
    nodes.forEach((node) => {
      totalElements++

      if (node.needsName) {
        // Use semantic layer path (with suggested names)
        const semanticPath = buildSemanticLayerPath(node.path, pathToNameMap)
        // Also include original path for reference
        const originalPath = buildHumanReadablePath(node.path, lottieData)

        elementsNeedingNames.push({
          path: node.path,
          currentName: node.currentName || "(unnamed)",
          suggestedName: node.suggestedName,
          layerPath: semanticPath, // Use semantic names
          originalLayerPath: originalPath, // Keep original for reference
          elementType: detectElementTypeFromData(node.path, lottieData),
          themeable: node.isThemeable || false,
          // NEW: Include rich metadata
          originalColor: node.originalColor,
          roleFunction: node.roleFunction,
          visualLevel: node.visualLevel,
          semanticRole: node.semanticRole,
        })
      } else if (node.currentName && !isGenericName(node.currentName)) {
        namedElements++
      }

      if (node.children.length > 0) {
        walk(node.children)
      }
    })
  }

  walk(componentTree)

  return {
    summary: {
      totalElements,
      namedElements,
      elementsNeedingNames: elementsNeedingNames.length,
      namingCompleteness: `${Math.round((namedElements / totalElements) * 100)}%`,
    },
    recommendations: {
      priority:
        "Add descriptive names in After Effects for better organization",
      benefits: [
        "Easier to identify elements in code",
        "Better collaboration with designers",
        "Clearer theming configuration",
        "Improved maintainability",
      ],
    },
    elementsNeedingNames,
  }
}

/**
 * Helper: Build map of path -> suggested name from element tree
 */
function buildPathToNameMap(
  componentTree: ComponentNode[],
): Map<string, string> {
  const map = new Map<string, string>()

  function walk(nodes: ComponentNode[]) {
    nodes.forEach((node) => {
      if (node.suggestedName) {
        map.set(node.path, node.suggestedName)
      }
      if (node.children.length > 0) {
        walk(node.children)
      }
    })
  }

  walk(componentTree)
  return map
}

/**
 * Helper: Build semantic layer path from suggested names
 * Creates breadcrumb like: "CharacterRightHandRight > ThumbGroup > ThumbFill"
 */
function buildSemanticLayerPath(
  path: string,
  pathToNameMap: Map<string, string>,
): string {
  // Split the path into segments
  // Example: "layers[0].shapes[1].it[0]" -> ["layers[0]", "layers[0].shapes[1]", "layers[0].shapes[1].it[0]"]
  const segments: string[] = []
  let currentPath = ""

  // Build cumulative path segments
  const parts = path.split(/\./)
  parts.forEach((part, index) => {
    currentPath = index === 0 ? part : `${currentPath}.${part}`
    segments.push(currentPath)
  })

  // Map each segment to its suggested name
  const nameParts: string[] = []
  segments.forEach((segment) => {
    const name = pathToNameMap.get(segment)
    if (name) {
      nameParts.push(name)
    }
  })

  return nameParts.length > 0 ? nameParts.join(" > ") : path
}

/**
 * Helper: Check if name is generic
 */
function isGenericName(name: string): boolean {
  const genericPatterns = [
    /^Layer \d+$/i,
    /^Shape \d+$/i,
    /^Fill \d+$/i,
    /^Stroke \d+$/i,
    /^Group \d+$/i,
    /^Path \d+$/i,
    /^Rectangle \d+$/i,
    /^Ellipse \d+$/i,
    /^Transform$/i,
    /^Merge Paths \d+$/i,
  ]

  return genericPatterns.some((pattern) => pattern.test(name))
}

/**
 * Helper: Build human-readable path from layer names
 */
function buildHumanReadablePath(path: string, lottieData: any): string {
  try {
    const segments = path.split(/\./)
    const pathParts: string[] = []
    let current: any = lottieData

    for (const segment of segments) {
      const arrayMatch = segment.match(/(\w+)\[(\d+)\]/)
      if (arrayMatch) {
        const [, key, index] = arrayMatch
        current = current[key]?.[parseInt(index)]
        if (current?.nm) {
          pathParts.push(current.nm)
        }
      } else if (current[segment]) {
        current = current[segment]
        if (current?.nm) {
          pathParts.push(current.nm)
        }
      }
    }

    return pathParts.length > 0 ? pathParts.join(" > ") : path
  } catch {
    return path
  }
}

/**
 * Download file helper
 */
export function downloadFile(
  content: string | Blob,
  filename: string,
  type: string,
): void {
  const blob = content instanceof Blob ? content : new Blob([content], { type })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export files to filesystem using API
 */
async function exportToFilesystem(
  directoryPath: string,
  files: Array<{ filename: string; content: string; subdirectory?: string }>,
): Promise<void> {
  const response = await fetch("/api/lotties/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      directoryPath,
      files,
    }),
  })

  const result = await response.json()

  if (!result.success) {
    throw new Error(result.error || "Failed to export files to filesystem")
  }
}

/**
 * Export all files
 * @param animationName - Animation name in PascalCase
 * @param lottieData - Original Lottie JSON
 * @param elements - AI-generated elements Record
 * @param metadata - Full metadata from metadata analysis (optional)
 * @param options - Export options
 * @param validationReport - Validation report (optional)
 * @param lottieSource - Source info for filesystem export
 */
export async function exportAll(
  animationName: string,
  lottieData: LottieData,
  elements: Record<string, ExpanseLottieElementDetails>,
  metadata: ExpanseLottieMetadata | undefined,
  options: ExportOptions,
  validationReport?: ValidationReport,
  lottieSource?: {
    type: "uploaded" | "existing"
    directoryPath?: string
  },
): Promise<void> {
  const logger = createLogger("EXPORT_UTILS")

  logger.info(
    "Starting export process",
    {
      animationName,
      options,
      elementCount: Object.keys(elements).length,
      hasMetadata: !!metadata,
      lottieSource,
    },
    "export_all",
  )

  const baseFilename = animationName

  // Determine export method based on source
  const useFilesystem =
    lottieSource?.type === "existing" && lottieSource.directoryPath
  const filesToExport: Array<{
    filename: string
    content: string
    subdirectory?: string
  }> = []

  // Export updated Lottie JSON with AI-generated element names
  if (options.includeJSON) {
    logger.info("Generating Lottie JSON with updated names", {}, "export_all")

    const updatedLottie = applyNamesToLottieJSON(lottieData, elements)
    const jsonString = options.minifyJSON
      ? JSON.stringify(updatedLottie)
      : JSON.stringify(updatedLottie, null, 2)

    const filename = `${baseFilename}_ExpanseLottie.json`

    if (useFilesystem) {
      filesToExport.push({ filename, content: jsonString })
    } else {
      downloadFile(jsonString, filename, "application/json")
    }

    logger.info("Lottie JSON exported", { filename }, "export_all")
  }

  // Export Expanse Lottie TypeScript schema
  if (options.includeThemeableLayoutConfig) {
    logger.info("Generating ExpanseLottie TypeScript", {}, "export_all")

    // Build default metadata if not provided
    const schemaMetadata: ExpanseLottieMetadata = metadata || {
      animationName,
      alternativeNames: [animationName],
      description: `${animationName} animation with themeable elements`,
      tags: ["lottie", "animation"],
      recommendations: {
        recommendedColorPalettes: [],
        elementGroups: {
          logicalGrouped: {},
          sharedColor: {},
          themingPriority: {},
          visualHierarchy: {},
        },
        optionalAiContext: {},
        optionalAiStylePrompts: {},
      },
    }

    // Generate TypeScript file using schema generator
    const expanseLottieTS = generateSchemaFileInline({
      animationName,
      metadata: schemaMetadata,
      elements,
    })

    const expanseLottieFilename = `${baseFilename}.expanse-lottie.ts`

    if (useFilesystem) {
      filesToExport.push({
        filename: expanseLottieFilename,
        content: expanseLottieTS,
      })
    } else {
      downloadFile(expanseLottieTS, expanseLottieFilename, "text/typescript")
    }

    logger.info(
      "ExpanseLottie TypeScript exported",
      {
        filename: expanseLottieFilename,
        codeLength: expanseLottieTS.length,
      },
      "export_all",
    )

    // Export React component file
    const componentTS = generateComponentFileContent(animationName)
    const componentFilename = `${baseFilename}.tsx`

    if (useFilesystem) {
      filesToExport.push({
        filename: componentFilename,
        content: componentTS,
      })
    } else {
      downloadFile(componentTS, componentFilename, "text/typescript")
    }

    logger.info(
      "React component exported",
      {
        filename: componentFilename,
        codeLength: componentTS.length,
      },
      "export_all",
    )

    // Note: .themes.ts file for auto-registration is exported from Theme Generation Panel
    // after themes are actually generated, not from the main export flow
  }

  // Export validation report
  if (validationReport) {
    const validationContent = JSON.stringify(validationReport, null, 2)
    const validationFilename = `${baseFilename}_validation.json`

    if (useFilesystem) {
      filesToExport.push({
        filename: validationFilename,
        content: validationContent,
      })
    } else {
      downloadFile(validationContent, validationFilename, "application/json")
    }
  }

  // If using filesystem export, write all files at once
  if (useFilesystem && filesToExport.length > 0) {
    logger.info(
      "Writing files to filesystem",
      {
        directoryPath: lottieSource!.directoryPath,
        fileCount: filesToExport.length,
        files: filesToExport.map((f) => f.filename),
      },
      "export_all",
    )

    await exportToFilesystem(lottieSource!.directoryPath!, filesToExport)

    logger.info("Files successfully written to filesystem", {}, "export_all")
  }
}
