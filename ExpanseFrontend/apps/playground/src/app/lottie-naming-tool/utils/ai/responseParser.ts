/**
 * Parse AI JSON response (works for both Claude and Gemini)
 * Handles format conversion,
 * future improvement options: validation, and error recovery
 */
export function parseAIResponse(text: string): any {
  // Extract JSON from markdown code blocks if present
  let jsonText = text.trim()
  const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/)
  if (jsonMatch) {
    jsonText = jsonMatch[1]
  } else {
    // Try to find JSON object
    const objectMatch = jsonText.match(/\{[\s\S]*\}/)
    if (objectMatch) {
      jsonText = objectMatch[0]
    }
  }

  try {
    const parsed = JSON.parse(jsonText)
    return parsed
  } catch (error) {
    throw new Error(
      `Failed to parse AI response: ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}
