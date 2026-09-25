/**
 * Custom hooks for accessing game data
 */
import { useMemo } from "react"
import { useGameDataContext } from "../contexts/GameDataContext"

/**
 * Main hook for accessing game data
 */
export function useGameData() {
  return useGameDataContext()
}

/**
 * Hook for calculating quest progress
 */
export function useQuestProgress(questId: string) {
  const { objectives } = useGameDataContext()

  return useMemo(() => {
    const questObjectives = objectives.filter((o) => o.questId === questId)
    const completed = questObjectives.filter((o) => o.status === "done").length
    const total = questObjectives.length

    return {
      completed,
      total,
      progress: total > 0 ? (completed / total) * 100 : 0,
      isComplete: completed === total && total > 0,
      objectives: questObjectives,
    }
  }, [questId, objectives])
}

/**
 * Hook for XP calculations
 */
export function useXPCalculations() {
  const { getTotalXP, getPotentialXP, objectives } = useGameDataContext()

  return useMemo(() => {
    const totalXP = getTotalXP()
    const potentialXP = getPotentialXP()
    const progress = potentialXP > 0 ? (totalXP / potentialXP) * 100 : 0
    const completedCount = objectives.filter((o) => o.status === "done").length

    return {
      totalXP,
      potentialXP,
      progress,
      completedCount,
      totalCount: objectives.length,
      level: Math.floor(totalXP / 1000), // Example: 1000 XP per level
    }
  }, [getTotalXP, getPotentialXP, objectives])
}

/**
 * Hook for filtering checkpoints
 */
export function useCheckpoints(filters?: {
  storylineId?: string
  status?: "upcoming" | "reached" | "missed"
  limit?: number
}) {
  const { checkpoints } = useGameDataContext()

  return useMemo(() => {
    let filtered = [...checkpoints]

    if (filters?.storylineId) {
      filtered = filtered.filter((cp) => cp.storylineId === filters.storylineId)
    }

    if (filters?.status) {
      filtered = filtered.filter((cp) => cp.status === filters.status)
    }

    // Sort by target date
    filtered.sort((a, b) => {
      if (!a.targetDate || !b.targetDate) return 0
      return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
    })

    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit)
    }

    return filtered
  }, [checkpoints, filters])
}

/**
 * Hook for getting upcoming checkpoints
 */
export function useUpcomingCheckpoints(limit = 5) {
  const { checkpoints } = useGameDataContext()

  return useMemo(() => {
    const now = new Date()
    return checkpoints
      .filter(
        (cp) =>
          cp.status === "upcoming" &&
          cp.targetDate &&
          new Date(cp.targetDate) >= now,
      )
      .sort((a, b) => {
        if (!a.targetDate || !b.targetDate) return 0
        return (
          new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
        )
      })
      .slice(0, limit)
  }, [checkpoints, limit])
}

/**
 * Hook for storyline stats
 */
export function useStorylineStats(storylineId: string) {
  const { getQuestsByStoryline, objectives } = useGameDataContext()

  return useMemo(() => {
    const storylineQuests = getQuestsByStoryline(storylineId)
    const storylineObjectives = objectives.filter((o) =>
      storylineQuests.some((q) => q.id === o.questId),
    )

    const completedQuests = storylineQuests.filter(
      (q) => q.status === "quest-complete",
    ).length
    const completedObjectives = storylineObjectives.filter(
      (o) => o.status === "done",
    ).length

    return {
      totalQuests: storylineQuests.length,
      completedQuests,
      questProgress:
        storylineQuests.length > 0
          ? (completedQuests / storylineQuests.length) * 100
          : 0,
      totalObjectives: storylineObjectives.length,
      completedObjectives,
      objectiveProgress:
        storylineObjectives.length > 0
          ? (completedObjectives / storylineObjectives.length) * 100
          : 0,
    }
  }, [storylineId, getQuestsByStoryline, objectives])
}

/**
 * Hook for campaign stats
 */
export function useCampaignStats(campaignId: string) {
  const { getStorylinesByCampaign, quests, objectives } = useGameDataContext()

  return useMemo(() => {
    const campaignStorylines = getStorylinesByCampaign(campaignId)
    const campaignQuests = quests.filter((q) =>
      campaignStorylines.some((s) => s.id === q.storylineId),
    )
    const campaignObjectives = objectives.filter((o) =>
      campaignQuests.some((q) => q.id === o.questId),
    )

    const completedStorylines = campaignStorylines.filter(
      (s) => s.status === "quest-complete",
    ).length
    const completedQuests = campaignQuests.filter(
      (q) => q.status === "quest-complete",
    ).length
    const completedObjectives = campaignObjectives.filter(
      (o) => o.status === "done",
    ).length

    return {
      totalStorylines: campaignStorylines.length,
      completedStorylines,
      storylineProgress:
        campaignStorylines.length > 0
          ? (completedStorylines / campaignStorylines.length) * 100
          : 0,
      totalQuests: campaignQuests.length,
      completedQuests,
      questProgress:
        campaignQuests.length > 0
          ? (completedQuests / campaignQuests.length) * 100
          : 0,
      totalObjectives: campaignObjectives.length,
      completedObjectives,
      objectiveProgress:
        campaignObjectives.length > 0
          ? (completedObjectives / campaignObjectives.length) * 100
          : 0,
    }
  }, [campaignId, getStorylinesByCampaign, quests, objectives])
}
