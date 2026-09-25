/**
 * Component Walker Utility
 * Traverses Lottie JSON to build element tree (component tree structure)
 */

import {
  LottieData,
  LottieLayer,
  LottieShape,
  ComponentNode,
  ComponentAnalysis,
  ComponentLevel,
  COMPONENT_LEVELS,
  NameSuggestion,
} from "../types/types"
import type { ExpanseLottieElementDetails } from "expanse.dynamicAssets"
import { createLogger } from "./logger"
import {
  analyzeComponentContext,
  isThemeableComponent,
  getComponentTypeLabel,
  generateComponentId,
  getParentFromPath,
} from "./lottieParser"

/**
 * Walk Lottie JSON and extract all components as flat array
 */
export function extractComponents(lottieData: LottieData): ComponentAnalysis[] {
  const components: ComponentAnalysis[] = []

  // Add composition
  components.push({
    path: "composition",
    level: COMPONENT_LEVELS.COMPOSITION,
    currentName: lottieData.nm,
    type: "composition",
    context: {
      parent: undefined,
    },
  })

  // Add assets
  if (lottieData.assets && lottieData.assets.length > 0) {
    lottieData.assets.forEach((asset, index) => {
      components.push({
        path: `assets[${index}]`,
        level: COMPONENT_LEVELS.ASSET,
        currentName: asset.nm || asset.id,
        type: "asset",
        context: {
          parent: "composition",
        },
      })
    })
  }

  // Walk layers
  lottieData.layers.forEach((layer, index) => {
    walkLayer(layer, `layers[${index}]`, components, "composition")
  })

  return components
}

/**
 * Walk a single layer recursively
 */
function walkLayer(
  layer: LottieLayer,
  path: string,
  components: ComponentAnalysis[],
  parentPath: string,
): void {
  const type = getLayerType(layer.ty)

  // Add layer itself
  components.push({
    path,
    level: COMPONENT_LEVELS.LAYER,
    currentName: layer.nm,
    type,
    context: {
      parent: parentPath,
    },
  })

  // Walk masks
  if (layer.masksProperties && layer.masksProperties.length > 0) {
    layer.masksProperties.forEach((mask, index) => {
      components.push({
        path: `${path}.masksProperties[${index}]`,
        level: COMPONENT_LEVELS.MASK,
        currentName: mask.nm,
        type: "mask",
        context: {
          parent: path,
        },
      })
    })
  }

  // Walk effects
  if (layer.ef && layer.ef.length > 0) {
    layer.ef.forEach((effect, index) => {
      components.push({
        path: `${path}.ef[${index}]`,
        level: COMPONENT_LEVELS.EFFECT,
        currentName: effect.nm,
        type: "effect",
        context: {
          parent: path,
        },
      })
    })
  }

  // Walk transform (always present)
  if (layer.ks) {
    components.push({
      path: `${path}.ks`,
      level: COMPONENT_LEVELS.TRANSFORM,
      currentName: "Transform",
      type: "transform",
      context: {
        parent: path,
      },
    })
  }

  // Walk shapes (for shape layers)
  if (layer.shapes && layer.shapes.length > 0) {
    layer.shapes.forEach((shape, index) => {
      walkShape(shape, `${path}.shapes[${index}]`, components, path)
    })
  }

  // Walk nested layers (for precomps)
  if (layer.layers && layer.layers.length > 0) {
    layer.layers.forEach((nestedLayer, index) => {
      walkLayer(nestedLayer, `${path}.layers[${index}]`, components, path)
    })
  }
}

/**
 * Walk a shape recursively
 */
function walkShape(
  shape: LottieShape,
  path: string,
  components: ComponentAnalysis[],
  parentPath: string,
): void {
  const type = shape.ty
  const context = analyzeComponentContext(shape, type)
  context.parent = parentPath

  // Determine level based on type
  let level: ComponentLevel = COMPONENT_LEVELS.SHAPE_ELEMENT

  if (type === "gr") {
    level = COMPONENT_LEVELS.SHAPE_GROUP
  } else if (type === "fl" || type === "st" || type === "gf" || type === "gs") {
    level = COMPONENT_LEVELS.FILL_STROKE
  } else if (type === "tr") {
    level = COMPONENT_LEVELS.TRANSFORM
  }

  components.push({
    path,
    level,
    currentName: shape.nm,
    type: getComponentTypeLabel(type),
    context,
  })

  // Walk children (for groups)
  if (shape.it && Array.isArray(shape.it)) {
    shape.it.forEach((child, index) => {
      walkShape(child, `${path}.it[${index}]`, components, path)
    })
  }
}

/**
 * Build element tree from flat array of components
 */
export function buildComponentTree(
  components: ComponentAnalysis[],
): ComponentNode[] {
  const nodeMap = new Map<string, ComponentNode>()

  // Create nodes
  components.forEach((comp) => {
    const node: ComponentNode = {
      id: generateComponentId(comp.path, comp.type),
      path: comp.path,
      level: comp.level,
      type: comp.type,
      currentName: comp.currentName,
      suggestedName: undefined,
      approved: false,
      isThemeable: isThemeableFromAnalysis(comp),
      children: [],
      context: comp.context,
    }
    nodeMap.set(comp.path, node)
  })

  // Build tree structure
  const rootNodes: ComponentNode[] = []

  nodeMap.forEach((node) => {
    const parentPath = node.context.parent
    if (parentPath && nodeMap.has(parentPath)) {
      const parent = nodeMap.get(parentPath)!
      parent.children.push(node)
    } else {
      rootNodes.push(node)
    }
  })

  return rootNodes
}

/**
 * Find component node by path
 */
export function findNodeByPath(
  tree: ComponentNode[],
  path: string,
): ComponentNode | undefined {
  for (const node of tree) {
    if (node.path === path) return node

    if (node.children.length > 0) {
      const found = findNodeByPath(node.children, path)
      if (found) return found
    }
  }

  return undefined
}

/**
 * Count themeable components in tree
 */
export function countThemeableComponents(tree: ComponentNode[]): number {
  let count = 0

  function walk(nodes: ComponentNode[]) {
    nodes.forEach((node) => {
      if (node.isThemeable) count++
      if (node.children.length > 0) walk(node.children)
    })
  }

  walk(tree)
  return count
}

/**
 * Count named components in tree
 */
export function countNamedComponents(tree: ComponentNode[]): number {
  let count = 0

  function walk(nodes: ComponentNode[]) {
    nodes.forEach((node) => {
      if (node.suggestedName || node.currentName) count++
      if (node.children.length > 0) walk(node.children)
    })
  }

  walk(tree)
  return count
}

/**
 * Get paths of all expanded nodes for smart expansion
 */
export function getSmartExpandedPaths(tree: ComponentNode[]): Set<string> {
  const expandedPaths = new Set<string>()

  function walk(nodes: ComponentNode[], depth: number) {
    nodes.forEach((node) => {
      // Expand first 2 levels
      if (depth < 2) {
        expandedPaths.add(node.path)
      }

      // Expand if has AI-suggested name
      if (node.suggestedName) {
        expandedPaths.add(node.path)
        // Also expand all parent paths
        expandParentsRecursively(node.path, expandedPaths, tree)
      }

      // Expand if themeable
      if (node.isThemeable) {
        expandedPaths.add(node.path)
      }

      // Expand if has themeable children
      if (hasThemeableChildren(node)) {
        expandedPaths.add(node.path)
      }

      // Expand if has children with suggested names
      if (hasChildrenWithSuggestedNames(node)) {
        expandedPaths.add(node.path)
      }

      if (node.children.length > 0) {
        walk(node.children, depth + 1)
      }
    })
  }

  walk(tree, 0)
  return expandedPaths
}

/**
 * Recursively expand all parent paths for a given path
 */
function expandParentsRecursively(
  path: string,
  expandedPaths: Set<string>,
  tree: ComponentNode[],
): void {
  const segments = path.split(".")
  let currentPath = ""

  // Build up each parent path and add to expanded set
  segments.forEach((segment, index) => {
    currentPath = index === 0 ? segment : `${currentPath}.${segment}`
    expandedPaths.add(currentPath)
  })
}

/**
 * Check if node has children with suggested names
 */
function hasChildrenWithSuggestedNames(node: ComponentNode): boolean {
  if (node.suggestedName) return true
  return node.children.some(hasChildrenWithSuggestedNames)
}

/**
 * Check if node has themeable children
 */
function hasThemeableChildren(node: ComponentNode): boolean {
  if (node.isThemeable) return true
  return node.children.some(hasThemeableChildren)
}

/**
 * Helper to determine if component is themeable from analysis
 */
function isThemeableFromAnalysis(comp: ComponentAnalysis): boolean {
  return (
    comp.level === COMPONENT_LEVELS.FILL_STROKE ||
    comp.context.hasFills === true ||
    comp.context.hasStrokes === true ||
    comp.context.hasGradients === true
  )
}

/**
 * Get layer type string
 */
function getLayerType(ty?: number): string {
  const types: Record<number, string> = {
    0: "precomp",
    1: "solid",
    2: "image",
    3: "null",
    4: "shape",
    5: "text",
  }

  return types[ty || 4] || "unknown"
}

/**
 * Normalize path by removing color property suffixes
 * AI returns paths like "layers[0].shapes[0].it[1].c.k"
 * Component tree has paths like "layers[0].shapes[0].it[1]"
 */
function normalizePathForMatching(path: string): string {
  // Remove common property suffixes that AI adds but component tree doesn't have
  return path
    .replace(/\.c\.k$/, "") // Color property
    .replace(/\.s\.k$/, "") // Stroke property
    .replace(/\.w\.k$/, "") // Width property
    .replace(/\.g\.k$/, "") // Gradient property
    .replace(/\.o\.k$/, "") // Opacity property
}

/**
 * Type for element suggestions - supports both legacy NameSuggestion and new ExpanseLottieElementDetails
 */
type ElementSuggestion = NameSuggestion | ExpanseLottieElementDetails

/**
 * Type for suggestions input - supports array (legacy) or Record (new)
 */
type SuggestionsInput =
  | ElementSuggestion[]
  | Record<string, ExpanseLottieElementDetails>

/**
 * Helper to get the suggested name from either type
 */
function getSuggestedName(suggestion: ElementSuggestion): string | undefined {
  if ("suggestedName" in suggestion) {
    return suggestion.suggestedName
  }
  if ("name" in suggestion) {
    return suggestion.name
  }
  return undefined
}

/**
 * Convert suggestions input to array format
 * Handles both array (legacy) and Record (new) formats
 */
function normalizeSuggestionsToArray(
  input: SuggestionsInput,
): ElementSuggestion[] {
  if (Array.isArray(input)) {
    return input
  }
  // Convert Record to array
  return Object.values(input)
}

/**
 * Apply name suggestions to tree
 * Supports both array (legacy) and Record<string, ExpanseLottieElementDetails> (new)
 */
export function applyNameSuggestionsToTree(
  tree: ComponentNode[],
  suggestionsInput: SuggestionsInput,
): ComponentNode[] {
  const logger = createLogger("COMPONENT_WALKER")

  // Normalize to array for internal processing
  const suggestions = normalizeSuggestionsToArray(suggestionsInput)

  logger.debug(
    "Applying suggestions to tree",
    {
      totalSuggestions: suggestions.length,
      sampleSuggestions: suggestions.slice(0, 3),
    },
    "apply_suggestions",
  )

  // Build suggestion map with both original and normalized paths
  const suggestionMap = new Map<string, ElementSuggestion>()
  suggestions.forEach((s) => {
    suggestionMap.set(s.path, s)
    // Also map normalized path for matching
    const normalized = normalizePathForMatching(s.path)
    if (normalized !== s.path) {
      suggestionMap.set(normalized, s)
    }
  })

  logger.debug(
    "Suggestion map created",
    {
      mapSize: suggestionMap.size,
      originalSuggestions: suggestions.length,
    },
    "apply_suggestions",
  )

  let appliedCount = 0
  const unmatchedSuggestions: string[] = []

  function walk(nodes: ComponentNode[]): ComponentNode[] {
    return nodes.map((node) => {
      const suggestion = suggestionMap.get(node.path)

      if (suggestion) {
        appliedCount++
        const suggestedName = getSuggestedName(suggestion)
        logger.debug(
          "Applying suggestion",
          {
            path: node.path,
            suggestedName,
          },
          "apply_suggestions",
        )

        // Apply AI suggestion with all new fields
        return {
          ...node,
          suggestedName,
          originalColor: suggestion.originalColor,
          roleFunction: suggestion.roleFunction,
          visualLevel: suggestion.visualLevel,
          semanticRole: suggestion.semanticRole,
          elementType: suggestion.elementType || node.elementType,
          needsName:
            "needsName" in suggestion ? suggestion.needsName : node.needsName,
          // CRITICAL: Always use calculated isThemeable - never let AI override this
          isThemeable: node.isThemeable,
          children: walk(node.children),
        }
      }

      return {
        ...node,
        children: walk(node.children),
      }
    })
  }

  const result = walk(tree)

  // Log unmatched suggestions for debugging
  suggestions.forEach((s) => {
    if (
      !findNodeByPath(result, s.path) &&
      !findNodeByPath(result, normalizePathForMatching(s.path))
    ) {
      unmatchedSuggestions.push(s.path)
    }
  })

  logger.info(
    "Applied suggestions to tree",
    {
      appliedCount,
      totalSuggestions: suggestions.length,
      unmatchedCount: unmatchedSuggestions.length,
      successRate:
        suggestions.length > 0
          ? ((appliedCount / suggestions.length) * 100).toFixed(2) + "%"
          : "0%",
      ...(unmatchedSuggestions.length > 0 && {
        sampleUnmatched: unmatchedSuggestions.slice(0, 5),
      }),
    },
    "apply_suggestions",
  )

  return result
}
