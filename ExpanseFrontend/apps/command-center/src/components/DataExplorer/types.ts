/**
 * DataExplorer - Type Definitions
 */

export interface DataSource {
  id: string
  name: string
  category: string
  data: unknown
  rootKey?: string // Key containing the array (e.g., "campaigns", "storylines")
}
