/**
 * JSON Response Parser
 * Utilities for parsing and validating AI JSON responses
 */

/**
 * Extract JSON from a response that may contain markdown code blocks
 */
export function extractJsonFromResponse(text: string): string {
  // If it starts with {, assume it's already clean JSON
  const trimmed = text.trim()
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return trimmed
  }

  // Try to extract from markdown code blocks
  const jsonBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonBlockMatch) {
    return jsonBlockMatch[1].trim()
  }

  // Try to find JSON object/array in the text
  const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)
  if (jsonMatch) {
    return jsonMatch[1]
  }

  // Return original text as fallback
  return trimmed
}

/**
 * Safely parse JSON with error context
 */
export function safeJsonParse<T>(text: string, context?: string): T {
  try {
    const jsonText = extractJsonFromResponse(text)
    return JSON.parse(jsonText) as T
  } catch (error) {
    const contextMsg = context ? ` (${context})` : ""
    const preview = text.substring(0, 200)
    throw new Error(
      `Failed to parse JSON response${contextMsg}. Preview: ${preview}...`,
    )
  }
}

/**
 * Parse nested JSON strings within an object
 * Some AI responses contain stringified JSON within fields
 */
export function parseNestedJsonStrings<T extends Record<string, any>>(
  obj: T,
  fields: string[],
): T {
  const result = { ...obj }

  for (const field of fields) {
    const value = getNestedValue(result, field)
    if (typeof value === "string" && value.trim()) {
      try {
        setNestedValue(result, field, JSON.parse(value))
      } catch (e) {
        console.warn(`Failed to parse nested JSON field: ${field}`, e)
      }
    }
  }

  return result
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj)
}

/**
 * Set nested value in object using dot notation
 */
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split(".")
  const lastKey = keys.pop()!
  const target = keys.reduce((current, key) => {
    if (current[key] === undefined) {
      current[key] = {}
    }
    return current[key]
  }, obj)
  target[lastKey] = value
}

/**
 * Validate that an object has required fields
 */
export function validateRequiredFields<T>(
  obj: unknown,
  requiredFields: (keyof T)[],
  typeName: string,
): asserts obj is T {
  if (typeof obj !== "object" || obj === null) {
    throw new Error(`Expected ${typeName} to be an object`)
  }

  const missing = requiredFields.filter(
    (field) => !(field in obj) || (obj as any)[field] === undefined,
  )

  if (missing.length > 0) {
    throw new Error(
      `${typeName} missing required fields: ${missing.join(", ")}`,
    )
  }
}
