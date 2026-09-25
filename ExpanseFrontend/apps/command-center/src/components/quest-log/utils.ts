/**
 * QuestLog Module - Utilities
 */

/**
 * Calculate days until a target date
 */
export const getDaysUntil = (dateStr: string | null): number => {
  if (!dateStr) return 999
  const target = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}
