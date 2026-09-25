/**
 * roleContent — placeholder Features / Problems / Goals per role.
 *
 * Keyed primarily by `RoleKey`. The optional second key (goal label)
 * lets the same role surface different content per active goal; if
 * no goal-specific entry exists we fall back to the role default.
 *
 * v1: hand-curated placeholder copy. Swap with real content later.
 */

import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import type { RoleGoalContent, RoleKey } from "./types";

const fallback: RoleGoalContent = {
  features: [
    { id: "f-explore",   label: "Explore the map",     Icon: RocketLaunchRoundedIcon, blurb: "Wander a curated landscape of topics." },
    { id: "f-progress",  label: "Track your progress", Icon: InsightsRoundedIcon,     blurb: "Daily streaks, levels, achievements." },
    { id: "f-community", label: "Join a community",    Icon: GroupsRoundedIcon,       blurb: "Learn alongside peers." },
  ],
  problems: [
    { id: "p-overwhelm", label: "Information overload", Icon: WarningAmberRoundedIcon,    blurb: "Too much to read, no clear path." },
    { id: "p-time",      label: "Not enough time",      Icon: HourglassBottomRoundedIcon, blurb: "Need bite-sized progress." },
    { id: "p-direction", label: "Unsure where to start",Icon: HelpRoundedIcon,            blurb: "Want a recommended sequence." },
  ],
  goals: [
    { id: "g-grow",   label: "Grow steadily",   Icon: TrendingUpRoundedIcon,   blurb: "Compounding wins over time." },
    { id: "g-master", label: "Master a skill",  Icon: EmojiEventsRoundedIcon,  blurb: "Get genuinely good at one thing." },
    { id: "g-belong", label: "Find belonging",  Icon: HandshakeRoundedIcon,    blurb: "Be part of something." },
  ],
};

const ROLE_CONTENT: Record<RoleKey, RoleGoalContent> = {
  default: fallback,
  students: {
    features: [
      { id: "stu-f-1", label: "Adaptive practice",    Icon: AutoAwesomeRoundedIcon, blurb: "Difficulty tunes to you." },
      { id: "stu-f-2", label: "Spaced repetition",    Icon: SchoolRoundedIcon,      blurb: "Review at the right moment." },
      { id: "stu-f-3", label: "Achievements + coins", Icon: EmojiEventsRoundedIcon, blurb: "Earn as you learn." },
      { id: "stu-f-4", label: "Study streaks",        Icon: InsightsRoundedIcon,    blurb: "Show up daily, see it stack." },
    ],
    problems: [
      { id: "stu-p-1", label: "Cramming the night before",  Icon: HourglassBottomRoundedIcon },
      { id: "stu-p-2", label: "Hard to stay motivated",     Icon: WarningAmberRoundedIcon },
      { id: "stu-p-3", label: "Forgetting what I studied",  Icon: HelpRoundedIcon },
      { id: "stu-p-4", label: "No one to study with",       Icon: GroupsRoundedIcon },
    ],
    goals: [
      { id: "stu-g-1", label: "Pass the next exam",  Icon: FlagRoundedIcon },
      { id: "stu-g-2", label: "Build a habit",       Icon: TrendingUpRoundedIcon },
      { id: "stu-g-3", label: "Earn a credential",   Icon: EmojiEventsRoundedIcon },
    ],
  },
  teachers: {
    features: [
      { id: "tea-f-1", label: "Lesson plan generator", Icon: SchoolRoundedIcon,      blurb: "Drafts you can customize." },
      { id: "tea-f-2", label: "Class progress board",  Icon: InsightsRoundedIcon,    blurb: "See who needs help." },
      { id: "tea-f-3", label: "Differentiation tools", Icon: AutoAwesomeRoundedIcon, blurb: "Tailor work per learner." },
      { id: "tea-f-4", label: "Parent updates",        Icon: HandshakeRoundedIcon,   blurb: "Share progress easily." },
    ],
    problems: [
      { id: "tea-p-1", label: "Burnout from grading",     Icon: HourglassBottomRoundedIcon },
      { id: "tea-p-2", label: "Disengaged students",      Icon: WarningAmberRoundedIcon },
      { id: "tea-p-3", label: "Too many curriculum gaps", Icon: HelpRoundedIcon },
      { id: "tea-p-4", label: "Unclear admin priorities", Icon: GroupsRoundedIcon },
    ],
    goals: [
      { id: "tea-g-1", label: "Reach every learner",      Icon: FavoriteRoundedIcon },
      { id: "tea-g-2", label: "Reclaim planning time",    Icon: TrendingUpRoundedIcon },
      { id: "tea-g-3", label: "Demonstrate impact",       Icon: EmojiEventsRoundedIcon },
    ],
  },
  professionals: {
    features: [
      { id: "pro-f-1", label: "Skill paths",            Icon: TrendingUpRoundedIcon, blurb: "From novice to fluent." },
      { id: "pro-f-2", label: "Certification prep",     Icon: EmojiEventsRoundedIcon },
      { id: "pro-f-3", label: "Portfolio artifacts",    Icon: AutoAwesomeRoundedIcon },
      { id: "pro-f-4", label: "Mentor matching",        Icon: HandshakeRoundedIcon },
    ],
    problems: [
      { id: "pro-p-1", label: "Skills going stale",     Icon: WarningAmberRoundedIcon },
      { id: "pro-p-2", label: "No time after work",     Icon: HourglassBottomRoundedIcon },
      { id: "pro-p-3", label: "Hard to prove ability",  Icon: HelpRoundedIcon },
    ],
    goals: [
      { id: "pro-g-1", label: "Get promoted",           Icon: TrendingUpRoundedIcon },
      { id: "pro-g-2", label: "Switch domains",         Icon: FlagRoundedIcon },
      { id: "pro-g-3", label: "Build a side income",    Icon: EmojiEventsRoundedIcon },
    ],
  },
  organizations: {
    features: [
      { id: "org-f-1", label: "Team analytics",         Icon: InsightsRoundedIcon },
      { id: "org-f-2", label: "Onboarding tracks",      Icon: SchoolRoundedIcon },
      { id: "org-f-3", label: "Custom curricula",       Icon: AutoAwesomeRoundedIcon },
      { id: "org-f-4", label: "Outcome reporting",      Icon: TrendingUpRoundedIcon },
    ],
    problems: [
      { id: "org-p-1", label: "Slow ramp-up time",      Icon: HourglassBottomRoundedIcon },
      { id: "org-p-2", label: "Inconsistent training",  Icon: WarningAmberRoundedIcon },
      { id: "org-p-3", label: "Hard to measure ROI",    Icon: HelpRoundedIcon },
    ],
    goals: [
      { id: "org-g-1", label: "Standardize quality",    Icon: FlagRoundedIcon },
      { id: "org-g-2", label: "Retain top talent",      Icon: FavoriteRoundedIcon },
      { id: "org-g-3", label: "Scale safely",           Icon: TrendingUpRoundedIcon },
    ],
  },
  parents: {
    features: [
      { id: "par-f-1", label: "Child progress view",    Icon: InsightsRoundedIcon },
      { id: "par-f-2", label: "Homework helper",        Icon: SchoolRoundedIcon },
      { id: "par-f-3", label: "Healthy-screen modes",   Icon: FavoriteRoundedIcon },
      { id: "par-f-4", label: "Family challenges",      Icon: HandshakeRoundedIcon },
    ],
    problems: [
      { id: "par-p-1", label: "Don't know what they're learning", Icon: HelpRoundedIcon },
      { id: "par-p-2", label: "Worry about screen time",          Icon: WarningAmberRoundedIcon },
      { id: "par-p-3", label: "Hard to help with homework",       Icon: HourglassBottomRoundedIcon },
    ],
    goals: [
      { id: "par-g-1", label: "Support without nagging",  Icon: FavoriteRoundedIcon },
      { id: "par-g-2", label: "Build healthy habits",     Icon: TrendingUpRoundedIcon },
      { id: "par-g-3", label: "Celebrate milestones",     Icon: EmojiEventsRoundedIcon },
    ],
  },
};

/**
 * Resolve content for a (role, goal) pair.
 *
 * v1 ignores the goal value (no per-goal overrides yet) but keeps the
 * signature so callers can refine later without touching consumers.
 */
export function getRoleGoalContent(
  role: RoleKey | null,
  _goal: string | null,
): RoleGoalContent {
  if (!role) return fallback;
  return ROLE_CONTENT[role] ?? fallback;
}
