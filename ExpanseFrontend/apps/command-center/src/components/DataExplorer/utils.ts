/**
 * DataExplorer - Utility Functions
 *
 * Helper functions for data extraction, column generation, and relationship validation.
 */
import type { DataSource } from "./types"
import { DATA_SOURCES } from "./dataSources"
import { RELATIONSHIP_MAP } from "./relationshipMap"

/**
 * Get the array of records from a data source
 */
export function getRecords(source: DataSource): Record<string, unknown>[] {
  const data = source.data as Record<string, unknown>

  if (source.rootKey) {
    const records = data[source.rootKey]
    if (Array.isArray(records)) return records as Record<string, unknown>[]
    if (typeof records === "object" && records !== null) {
      // Handle object maps like featureImpact.features
      return Object.entries(records).map(([key, value]) => ({
        _key: key,
        ...(value as Record<string, unknown>),
      }))
    }
  }

  // If no rootKey, try to find an array or return the object as single record
  if (Array.isArray(data)) return data as Record<string, unknown>[]

  // Check if any top-level key is an array
  for (const key of Object.keys(data)) {
    if (Array.isArray(data[key])) {
      return data[key] as Record<string, unknown>[]
    }
  }

  // Return the whole object as a single "record" for non-array data
  return [data]
}

/**
 * Extract all unique keys from records, sorted for display
 */
export function extractColumns(records: Record<string, unknown>[]): string[] {
  const keys = new Set<string>()
  records.forEach((record) => {
    Object.keys(record).forEach((key) => keys.add(key))
  })

  // Sort: id first, then alphabetically, _key fields last
  return Array.from(keys).sort((a, b) => {
    if (a === "id") return -1
    if (b === "id") return 1
    if (a === "_key") return -1
    if (b === "_key") return 1
    if (a === "name" || a === "title") return -1
    if (b === "name" || b === "title") return 1
    return a.localeCompare(b)
  })
}

/**
 * Check if a field is a relationship field
 */
export function isRelationshipField(key: string): boolean {
  return key in RELATIONSHIP_MAP || key.endsWith("Id") || key.endsWith("Ids")
}

/**
 * Get the target data source for a relationship field
 */
export function getRelationshipTarget(key: string): string | null {
  if (key in RELATIONSHIP_MAP) return RELATIONSHIP_MAP[key]

  // Try to infer from field name
  if (key.endsWith("Ids")) {
    const singular = key.slice(0, -3) + "s"
    const source = DATA_SOURCES.find(
      (s) => s.id === singular || s.id === key.slice(0, -3),
    )
    return source?.id || null
  }
  if (key.endsWith("Id")) {
    const plural = key.slice(0, -2) + "s"
    const source = DATA_SOURCES.find(
      (s) => s.id === plural || s.id === key.slice(0, -2),
    )
    return source?.id || null
  }

  return null
}

/**
 * Validate a relationship - check if the referenced ID exists
 */
export function validateRelationship(
  value: unknown,
  targetSourceId: string,
): { valid: boolean; missing: string[] } {
  const targetSource = DATA_SOURCES.find((s) => s.id === targetSourceId)
  if (!targetSource) return { valid: true, missing: [] }

  const targetRecords = getRecords(targetSource)
  const targetIds = new Set(targetRecords.map((r) => r.id || r._key))

  const missing: string[] = []

  if (Array.isArray(value)) {
    value.forEach((v) => {
      if (typeof v === "string" && !targetIds.has(v)) {
        missing.push(v)
      }
    })
  } else if (typeof value === "string" && !targetIds.has(value)) {
    missing.push(value)
  }

  return { valid: missing.length === 0, missing }
}

/**
 * Check if a value is expandable (object or array)
 */
export function isExpandable(value: unknown): boolean {
  return (
    (Array.isArray(value) && value.length > 0) ||
    (typeof value === "object" &&
      value !== null &&
      Object.keys(value).length > 0)
  )
}
