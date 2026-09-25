/**
 * Canonical 5 audience roles + their hard-coded goals.
 *
 * Mirrors `DomainsStarCluster` and feeds both `RoleGoalSelector` (role
 * picker) and `MapContextPanel` (goal chip accordion).
 */

import type { SvgIconComponent } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

import type { RoleKey } from "./types";

export interface Role {
  key: RoleKey;
  label: string;
  Icon: SvgIconComponent;
  /** Short tagline shown under the role title when selected. */
  blurb: string;
  /** Hard-coded goal options for this role; the user picks one. */
  goals: string[];
}

export const ROLES: readonly Role[] = [
  {
    key: "default",
    label: "All audiences",
    Icon: PersonOutlineIcon,
    blurb: "Generic view — nothing personalized yet.",
    goals: [
      "Just exploring",
      "Find what's relevant to me",
      "Get a quick overview",
    ],
  },
  {
    key: "students",
    label: "Students",
    Icon: AccessibilityNewIcon,
    blurb: "Learn faster, level up, retain more.",
    goals: [
      "Master a new subject",
      "Practice for an upcoming exam",
      "Build a daily learning habit",
      "Earn a credential",
    ],
  },
  {
    key: "teachers",
    label: "Teachers",
    Icon: RecordVoiceOverIcon,
    blurb: "Plan, deliver, and personalize at scale.",
    goals: [
      "Plan a lesson sequence",
      "Generate practice items",
      "Track class progress",
      "Differentiate for diverse learners",
    ],
  },
  {
    key: "professionals",
    label: "Professionals",
    Icon: ManageAccountsIcon,
    blurb: "Stay sharp, certify, grow your craft.",
    goals: [
      "Sharpen a skill on the job",
      "Prepare for a certification",
      "Onboard to a new role",
      "Build a portfolio",
    ],
  },
  {
    key: "organizations",
    label: "Organizations",
    Icon: Diversity3Icon,
    blurb: "Train teams; measure outcomes.",
    goals: [
      "Roll out a training program",
      "Measure team capability",
      "Standardize onboarding",
      "Reduce ramp-up time",
    ],
  },
  {
    key: "parents",
    label: "Parents",
    Icon: FamilyRestroomIcon,
    blurb: "Support learners at home with confidence.",
    goals: [
      "Help with homework",
      "Track a child's progress",
      "Find enrichment activities",
      "Build healthy learning habits",
    ],
  },
] as const;

/** Shared accent (CLUSTER_BLUE) used across role-related surfaces. */
export const ROLE_ACCENT = "#3B82F6";

export function getRole(key: RoleKey): Role {
  return ROLES.find((r) => r.key === key) ?? ROLES[0];
}
