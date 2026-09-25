/**
 * DataExplorer - Relationship Map
 *
 * Maps field names to their target data sources for relationship navigation.
 */

/** Field name to data source ID mapping */
export const RELATIONSHIP_MAP: Record<string, string> = {
  campaignId: "campaigns",
  campaignIds: "campaigns",
  storylineId: "storylines",
  storylineIds: "storylines",
  questId: "quests",
  questIds: "quests",
  objectiveId: "objectives",
  objectiveIds: "objectives",
  goalId: "goals",
  goalIds: "goals",
  projectId: "projects",
  projectIds: "projects",
  legendId: "legend",
  legendIds: "legend",
  epicId: "epics",
  epicIds: "epics",
  milestoneId: "milestones",
  milestoneIds: "milestones",
  questlineId: "questlines",
  questlineIds: "questlines",
  dependencies: "featureImpact",
  selectedFeatures: "featureImpact",
}
