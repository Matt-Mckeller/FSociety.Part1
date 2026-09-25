/**
 * DataExplorer - Data Sources Registry
 *
 * Central registry of all data sources available in the explorer.
 * Each source maps to a JSON data file with metadata for display and navigation.
 */
import type { DataSource } from "./types"

// Import all data files
import campaigns from "../../data/campaigns.json"
import storylines from "../../data/storylines.json"
import quests from "../../data/quests.json"
import objectives from "../../data/objectives.json"
import goals from "../../data/goals.json"
import missionGoals from "../../data/missionGoals.json"
import featureImpact from "../../data/featureImpact.json"
import mvpConfigurations from "../../data/mvpConfigurations.json"
import marketingStages from "../../data/marketingStages.json"
import strategicCompass from "../../data/strategicCompass.json"
import strategicFocus from "../../data/strategicFocus.json"
import audiences from "../../data/audiences.json"
import roadmap from "../../data/roadmap.json"
import milestones from "../../data/milestones.json"
import operatingPrinciples from "../../data/operatingPrinciples.json"
import projects from "../../data/projects.json"
import decisions from "../../data/decisions.json"
import corporateVision from "../../data/corporateVision.json"
import businessValue from "../../data/businessValue.json"
import legend from "../../data/legend.json"
import questlines from "../../data/questlines.json"
import epics from "../../data/epics.json"
import checkpoints from "../../data/checkpoints.json"
import globalSwot from "../../data/globalSwot.json"
import financials from "../../data/financials.json"
import journal from "../../data/journal.json"
import questions from "../../data/questions.json"
import timeline from "../../data/timeline.json"

// ==================================================
// DATA SOURCES REGISTRY
// ==================================================

export const DATA_SOURCES: DataSource[] = [
  // Missions
  {
    id: "campaigns",
    name: "Campaigns",
    category: "Missions",
    data: campaigns,
    rootKey: "campaigns",
  },
  {
    id: "storylines",
    name: "Storylines",
    category: "Missions",
    data: storylines,
    rootKey: "storylines",
  },
  {
    id: "quests",
    name: "Quests",
    category: "Missions",
    data: quests,
    rootKey: "quests",
  },
  {
    id: "questlines",
    name: "Questlines",
    category: "Missions",
    data: questlines,
    rootKey: "questlines",
  },
  {
    id: "objectives",
    name: "Objectives",
    category: "Missions",
    data: objectives,
    rootKey: "objectives",
  },
  {
    id: "epics",
    name: "Epics",
    category: "Missions",
    data: epics,
    rootKey: "epics",
  },

  // Goals & Strategy
  {
    id: "missionGoals",
    name: "Mission Goals",
    category: "Goals & Strategy",
    data: missionGoals,
  },
  {
    id: "goals",
    name: "Goals",
    category: "Goals & Strategy",
    data: goals,
    rootKey: "goals",
  },
  {
    id: "featureImpact",
    name: "Feature Impact",
    category: "Goals & Strategy",
    data: featureImpact,
    rootKey: "features",
  },
  {
    id: "strategicCompass",
    name: "Strategic Compass",
    category: "Goals & Strategy",
    data: strategicCompass,
  },
  {
    id: "strategicFocus",
    name: "Strategic Focus",
    category: "Goals & Strategy",
    data: strategicFocus,
  },
  {
    id: "corporateVision",
    name: "Corporate Vision",
    category: "Goals & Strategy",
    data: corporateVision,
  },
  {
    id: "businessValue",
    name: "Business Value",
    category: "Goals & Strategy",
    data: businessValue,
  },
  {
    id: "globalSwot",
    name: "Global SWOT",
    category: "Goals & Strategy",
    data: globalSwot,
  },

  // Planning
  { id: "roadmap", name: "Roadmap", category: "Planning", data: roadmap },
  {
    id: "milestones",
    name: "Milestones",
    category: "Planning",
    data: milestones,
    rootKey: "milestones",
  },
  {
    id: "operatingPrinciples",
    name: "Operating Principles",
    category: "Planning",
    data: operatingPrinciples,
    rootKey: "operatingPrinciples",
  },
  {
    id: "projects",
    name: "Projects",
    category: "Planning",
    data: projects,
    rootKey: "projects",
  },
  {
    id: "checkpoints",
    name: "Checkpoints",
    category: "Planning",
    data: checkpoints,
    rootKey: "checkpoints",
  },
  { id: "timeline", name: "Timeline", category: "Planning", data: timeline },

  // Marketing & Launch
  {
    id: "mvpConfigurations",
    name: "MVP Configurations",
    category: "Marketing & Launch",
    data: mvpConfigurations,
    rootKey: "configurations",
  },
  {
    id: "marketingStages",
    name: "Marketing Stages",
    category: "Marketing & Launch",
    data: marketingStages,
    rootKey: "stages",
  },
  {
    id: "audiences",
    name: "Audiences",
    category: "Marketing & Launch",
    data: audiences,
    rootKey: "audiences",
  },

  // Business
  {
    id: "legend",
    name: "Legend",
    category: "Business",
    data: legend,
    rootKey: "legends",
  },
  {
    id: "financials",
    name: "Financials",
    category: "Business",
    data: financials,
  },

  // Records
  {
    id: "decisions",
    name: "Decisions",
    category: "Records",
    data: decisions,
    rootKey: "decisions",
  },
  {
    id: "journal",
    name: "Journal",
    category: "Records",
    data: journal,
    rootKey: "entries",
  },
  {
    id: "questions",
    name: "Questions",
    category: "Records",
    data: questions,
    rootKey: "questions",
  },
]

// ==================================================
// DERIVED DATA
// ==================================================

/** Group data sources by category */
export const CATEGORIES = DATA_SOURCES.reduce(
  (acc, source) => {
    if (!acc[source.category]) acc[source.category] = []
    acc[source.category].push(source)
    return acc
  },
  {} as Record<string, DataSource[]>,
)
