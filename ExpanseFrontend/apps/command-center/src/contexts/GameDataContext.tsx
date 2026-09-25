/**
 * GameDataContext - Centralized state for all game-related data
 * Provides campaigns, storylines, quests, objectives, and checkpoints
 */
import { createContext, useContext, useMemo, ReactNode } from "react"
import type {
  Campaign,
  Storyline,
  Quest,
  Objective,
  Checkpoint,
  QuestStatus,
} from "../types"

// Import data
import campaignsData from "../data/campaigns.json"
import storylinesData from "../data/storylines.json"
import questsData from "../data/quests.json"
import objectivesData from "../data/objectives.json"
import checkpointsData from "../data/checkpoints.json"

interface GameDataContextValue {
  // Raw data
  campaigns: Campaign[]
  storylines: Storyline[]
  quests: Quest[]
  objectives: Objective[]
  checkpoints: Checkpoint[]

  // Selectors
  getCampaignById: (id: string) => Campaign | undefined
  getStorylineById: (id: string) => Storyline | undefined
  getQuestById: (id: string) => Quest | undefined
  getObjectiveById: (id: string) => Objective | undefined

  // Filtered data
  getStorylinesByCampaign: (campaignId: string) => Storyline[]
  getQuestsByStoryline: (storylineId: string) => Quest[]
  getObjectivesByQuest: (questId: string) => Objective[]
  getCheckpointsByStoryline: (storylineId: string) => Checkpoint[]

  // Status-based filters
  getActiveQuests: () => Quest[]
  getActiveStorylines: () => Storyline[]
  getQuestsByStatus: (status: QuestStatus) => Quest[]

  // Stats
  getTotalXP: () => number
  getPotentialXP: () => number
  getCompletionStats: () => {
    completedObjectives: number
    totalObjectives: number
    completedQuests: number
    totalQuests: number
  }
}

const GameDataContext = createContext<GameDataContextValue | null>(null)

export function GameDataProvider({ children }: { children: ReactNode }) {
  // Parse data once
  const campaigns = useMemo(() => campaignsData.campaigns as Campaign[], [])
  const storylines = useMemo(() => storylinesData.storylines as Storyline[], [])
  const quests = useMemo(() => questsData.quests as Quest[], [])
  const objectives = useMemo(() => objectivesData.objectives as Objective[], [])
  const checkpoints = useMemo(
    () => checkpointsData.checkpoints as Checkpoint[],
    [],
  )

  // Selectors
  const getCampaignById = useMemo(
    () => (id: string) => campaigns.find((c) => c.id === id),
    [campaigns],
  )

  const getStorylineById = useMemo(
    () => (id: string) => storylines.find((s) => s.id === id),
    [storylines],
  )

  const getQuestById = useMemo(
    () => (id: string) => quests.find((q) => q.id === id),
    [quests],
  )

  const getObjectiveById = useMemo(
    () => (id: string) => objectives.find((o) => o.id === id),
    [objectives],
  )

  // Filtered data
  const getStorylinesByCampaign = useMemo(
    () => (campaignId: string) =>
      storylines.filter((s) => s.campaignIds?.includes(campaignId)),
    [storylines],
  )

  const getQuestsByStoryline = useMemo(
    () => (storylineId: string) =>
      quests.filter((q) => q.storylineId === storylineId),
    [quests],
  )

  const getObjectivesByQuest = useMemo(
    () => (questId: string) => objectives.filter((o) => o.questId === questId),
    [objectives],
  )

  const getCheckpointsByStoryline = useMemo(
    () => (storylineId: string) =>
      checkpoints.filter((cp) => cp.storylineId === storylineId),
    [checkpoints],
  )

  // Status-based filters
  const getActiveQuests = useMemo(
    () => () => quests.filter((q) => q.status === "in-progress"),
    [quests],
  )

  const getActiveStorylines = useMemo(
    () => () => storylines.filter((s) => s.status === "in-progress"),
    [storylines],
  )

  const getQuestsByStatus = useMemo(
    () => (status: QuestStatus) => quests.filter((q) => q.status === status),
    [quests],
  )

  // Stats
  const getTotalXP = useMemo(
    () => () => {
      const completedObjectives = objectives.filter((o) => o.status === "done")
      return completedObjectives.reduce((sum, o) => sum + (o.xpReward || 0), 0)
    },
    [objectives],
  )

  const getPotentialXP = useMemo(
    () => () => objectives.reduce((sum, o) => sum + (o.xpReward || 0), 0),
    [objectives],
  )

  const getCompletionStats = useMemo(
    () => () => {
      const completedObjectives = objectives.filter(
        (o) => o.status === "done",
      ).length
      const totalObjectives = objectives.length
      const completedQuests = quests.filter(
        (q) => q.status === "quest-complete",
      ).length
      const totalQuests = quests.length

      return {
        completedObjectives,
        totalObjectives,
        completedQuests,
        totalQuests,
      }
    },
    [objectives, quests],
  )

  const value: GameDataContextValue = useMemo(
    () => ({
      campaigns,
      storylines,
      quests,
      objectives,
      checkpoints,
      getCampaignById,
      getStorylineById,
      getQuestById,
      getObjectiveById,
      getStorylinesByCampaign,
      getQuestsByStoryline,
      getObjectivesByQuest,
      getCheckpointsByStoryline,
      getActiveQuests,
      getActiveStorylines,
      getQuestsByStatus,
      getTotalXP,
      getPotentialXP,
      getCompletionStats,
    }),
    [
      campaigns,
      storylines,
      quests,
      objectives,
      checkpoints,
      getCampaignById,
      getStorylineById,
      getQuestById,
      getObjectiveById,
      getStorylinesByCampaign,
      getQuestsByStoryline,
      getObjectivesByQuest,
      getCheckpointsByStoryline,
      getActiveQuests,
      getActiveStorylines,
      getQuestsByStatus,
      getTotalXP,
      getPotentialXP,
      getCompletionStats,
    ],
  )

  return (
    <GameDataContext.Provider value={value}>
      {children}
    </GameDataContext.Provider>
  )
}

export function useGameDataContext() {
  const context = useContext(GameDataContext)
  if (!context) {
    throw new Error("useGameDataContext must be used within GameDataProvider")
  }
  return context
}
