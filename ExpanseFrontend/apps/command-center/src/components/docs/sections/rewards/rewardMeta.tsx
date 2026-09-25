/**
 * Reward visual metadata
 *
 * Icon + accent color per category, shared across RewardSystem,
 * InGameRewards, and RealLifeRewards so the same category always
 * looks the same wherever it appears.
 */
import type { ReactNode } from "react"
import PaidRounded from "@mui/icons-material/PaidRounded"
import SchoolRounded from "@mui/icons-material/SchoolRounded"
import CelebrationRounded from "@mui/icons-material/CelebrationRounded"
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded"
import SelfImprovementRounded from "@mui/icons-material/SelfImprovementRounded"
import FastfoodRounded from "@mui/icons-material/FastfoodRounded"
import RedeemRounded from "@mui/icons-material/RedeemRounded"
import MonetizationOnRounded from "@mui/icons-material/MonetizationOnRounded"
import MilitaryTechRounded from "@mui/icons-material/MilitaryTechRounded"
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded"
import SportsEsportsRounded from "@mui/icons-material/SportsEsportsRounded"
import Inventory2Rounded from "@mui/icons-material/Inventory2Rounded"
import Diversity3Rounded from "@mui/icons-material/Diversity3Rounded"
import ExploreRounded from "@mui/icons-material/ExploreRounded"
import CasinoRounded from "@mui/icons-material/CasinoRounded"
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded"
import ApartmentRounded from "@mui/icons-material/ApartmentRounded"
import PublicRounded from "@mui/icons-material/PublicRounded"

export interface CategoryMeta {
  label: string
  icon: ReactNode
  color: string
}

const iconSx = { fontSize: "inherit" }

// --- Real Life Rewards (src/data/docs/rewards.json -> realLifeRewards) ---
export const realLifeCategoryMeta: Record<string, CategoryMeta> = {
  financial: { label: "Financial", icon: <PaidRounded sx={iconSx} />, color: "#059669" },
  educational: { label: "Educational", icon: <SchoolRounded sx={iconSx} />, color: "#0284C7" },
  experiences: { label: "Experiences", icon: <CelebrationRounded sx={iconSx} />, color: "#7C3AED" },
  recognition: { label: "Recognition", icon: <EmojiEventsRounded sx={iconSx} />, color: "#D97706" },
  healthWellness: { label: "Health & Wellness", icon: <SelfImprovementRounded sx={iconSx} />, color: "#0891B2" },
  food: { label: "Food", icon: <FastfoodRounded sx={iconSx} />, color: "#EA580C" },
  physical: { label: "Physical", icon: <RedeemRounded sx={iconSx} />, color: "#DB2777" },
}

// --- In-Game Rewards (rewards.json -> inGameRewards) ---
export const inGameCategoryMeta: Record<string, CategoryMeta> = {
  currency: { label: "Currency", icon: <MonetizationOnRounded sx={iconSx} />, color: "#D97706" },
  achievements: { label: "Achievements", icon: <MilitaryTechRounded sx={iconSx} />, color: "#7C3AED" },
  recognition: { label: "Recognition", icon: <WorkspacePremiumRounded sx={iconSx} />, color: "#0284C7" },
}

// --- Reward Mediums (rewards.json -> rewardMediums, keyed by id) ---
export const mediumMeta: Record<string, CategoryMeta> = {
  digital: { label: "Digital", icon: <SportsEsportsRounded sx={iconSx} />, color: "#6B21A8" },
  physical: { label: "Physical", icon: <Inventory2Rounded sx={iconSx} />, color: "#DB2777" },
  experience: { label: "Experience", icon: <ExploreRounded sx={iconSx} />, color: "#7C3AED" },
  financial: { label: "Financial", icon: <PaidRounded sx={iconSx} />, color: "#059669" },
  social: { label: "Social", icon: <Diversity3Rounded sx={iconSx} />, color: "#0284C7" },
  educational: { label: "Educational", icon: <SchoolRounded sx={iconSx} />, color: "#0891B2" },
}

// Classification grouping: ids starting "system-" are in-game/system rewards,
// everything else is a real-world / partner reward.
export function isSystemClassification(id: string) {
  return id.startsWith("system-")
}

export const classificationGroupMeta = {
  system: {
    title: "In-System Rewards",
    icon: <CasinoRounded sx={iconSx} />,
    color: "#6B21A8",
  },
  external: {
    title: "Real-World & Partner Rewards",
    icon: <PublicRounded sx={iconSx} />,
    color: "#0891B2",
  },
}

export const visualStimulationMeta: CategoryMeta = {
  label: "Visual Stimulation",
  icon: <AutoAwesomeRounded sx={iconSx} />,
  color: "#7C3AED",
}

export const schoolImprovementsMeta: CategoryMeta = {
  label: "School Improvements",
  icon: <ApartmentRounded sx={iconSx} />,
  color: "#0284C7",
}

export function humanizeKey(key: string) {
  return key.replace(/([A-Z])/g, " $1").trim()
}
