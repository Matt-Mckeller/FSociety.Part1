/**
 * Progressive Response Parser
 * Handles real-time parsing of streaming AI responses to prevent JSON flash
 */

import { AINamingResponse, NameSuggestion } from "../types/types"

interface ParsingState {
  isComplete: boolean
  partialResponse?: Partial<AINamingResponse>
  error?: string
  progress: number
}

/**
 * Parse streaming content progressively to avoid JSON flash
 */
export function parseStreamingContent(
  text: string,
  previousState?: ParsingState,
): ParsingState {
  try {
    // Try to extract JSON from the streaming text
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
    const jsonText = jsonMatch ? jsonMatch[1] : text.match(/\{[\s\S]*\}/)?.[0]

    if (!jsonText) {
      return {
        isComplete: false,
        progress: Math.min(50, (text.length / 1000) * 10), // Estimate progress based on text length
        error: undefined,
      }
    }

    // Try to parse the JSON
    let parsed: any
    try {
      parsed = JSON.parse(jsonText)
    } catch (parseError) {
      // JSON is incomplete, estimate progress
      const completeness = estimateJsonCompleteness(jsonText)
      return {
        isComplete: false,
        progress: Math.min(90, 50 + completeness * 40),
        error: undefined,
      }
    }

    // Validate and build response
    const elementNames = parsed.element_names || parsed.component_names
    if (!elementNames || !Array.isArray(elementNames)) {
      return {
        isComplete: false,
        progress: 80,
        error: "Invalid response format",
      }
    }

    // Build partial response
    const partialResponse: Partial<AINamingResponse> = {
      elementNames: elementNames.map((item: any, index: number) => ({
        path: item.path || `unknown[${index}]`,
        level: item.level || 3,
        currentName: item.current_name || "",
        suggestedName: item.suggested_name || "",
        originalColor: item.original_color,
        roleFunction: item.role_function,
        visualLevel: item.visual_level,
        semanticRole: item.semantic_role,
        elementType: "shape", // Default, will be updated later
        needsName: item.needs_name ?? false,
        isThemeable:
          item.original_color !== null && item.original_color !== undefined,
      })) as NameSuggestion[],
      description: {
        short: parsed.description?.short || "Analysis in progress...",
        detailed: parsed.description?.detailed || "",
        visualCharacteristics: Array.isArray(
          parsed.description?.visual_characteristics,
        )
          ? parsed.description.visual_characteristics
          : [],
      },
      timeline: Array.isArray(parsed.timeline)
        ? parsed.timeline.map((frame: any) => ({
            frame: frame.frame || 0,
            time: frame.time || "0s",
            description: frame.description || "",
            activeElements: Array.isArray(frame.active_elements)
              ? frame.active_elements
              : [],
          }))
        : [],
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations.map((rec: any) => ({
            category: rec.category || "Visual",
            priority: rec.priority || "medium",
            suggestion: rec.suggestion || "",
            implementation: rec.implementation,
            reasoning: rec.reasoning,
          }))
        : [],
    }

    return {
      isComplete: true,
      partialResponse,
      progress: 100,
      error: undefined,
    }
  } catch (error) {
    return {
      isComplete: false,
      progress: Math.min(90, (text.length / 1000) * 10),
      error: error instanceof Error ? error.message : "Parsing error",
    }
  }
}

/**
 * Estimate JSON completeness based on structure
 */
function estimateJsonCompleteness(jsonText: string): number {
  const openBraces = (jsonText.match(/\{/g) || []).length
  const closeBraces = (jsonText.match(/\}/g) || []).length
  const openBrackets = (jsonText.match(/\[/g) || []).length
  const closeBrackets = (jsonText.match(/\]/g) || []).length

  // Check for key indicators of completeness
  const hasElementNames = jsonText.includes("element_names")
  const hasDescription = jsonText.includes("description")
  const hasTimeline = jsonText.includes("timeline")
  const hasRecommendations = jsonText.includes("recommendations")

  let completeness = 0

  // Structure completeness (50% weight)
  const structureComplete = Math.min(
    1,
    (closeBraces / Math.max(1, openBraces)) *
      (closeBrackets / Math.max(1, openBrackets)),
  )
  completeness += structureComplete * 0.5

  // Content completeness (50% weight)
  const contentIndicators = [
    hasElementNames,
    hasDescription,
    hasTimeline,
    hasRecommendations,
  ]
  const contentComplete =
    contentIndicators.filter(Boolean).length / contentIndicators.length
  completeness += contentComplete * 0.5

  return Math.min(1, completeness)
}

/**
 * Extract readable progress message from streaming text
 */
export function extractProgressMessage(text: string): string {
  const lines = text.split("\n").filter((line) => line.trim())
  const lastLine = lines[lines.length - 1] || ""

  // Look for phase indicators
  if (lastLine.includes("Phase 1") || lastLine.includes("visual analysis")) {
    return "🎨 Analyzing visual elements..."
  }
  if (lastLine.includes("Phase 2") || lastLine.includes("structure")) {
    return "📊 Examining component structure..."
  }
  if (lastLine.includes("generating") || lastLine.includes("names")) {
    return "💡 Generating semantic names..."
  }
  if (lastLine.includes("complete") || lastLine.includes("done")) {
    return "✅ Analysis complete!"
  }

  // Default progress message
  if (text.length < 100) {
    return "🚀 Starting analysis..."
  } else if (text.length < 500) {
    return "🔍 Processing animation data..."
  } else if (text.length < 1000) {
    return "🧠 AI is thinking..."
  } else {
    return "📝 Generating response..."
  }
}
