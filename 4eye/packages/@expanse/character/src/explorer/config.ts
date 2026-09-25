/**
 * Configuration constants for the Character Profile segment of the
 * full-screen map view. Pure data + sx helpers — no JSX, no React.
 */

import type { SxProps, Theme } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

// ─── Direction type ──────────────────────────────────────────────────
// Mirrors the `Direction` type from `@expanse/shell` (same four
// compass points). Defined here so this file has no layout dependency.
export type Direction = "up" | "down" | "left" | "right"

// ─── Brand-core local type aliases ───────────────────────────────────
// (Not yet re-exported through the brand-core index chain.)
export type StrapStyle = "default" | "smooth" | "angular" | "floating" | "organic" | "none";
export type EyeDesign = "default" | "aperture" | "camera" | "orb" | "scanner" | "ring";
export type CharacterVariant = "minimal" | "tech" | "friendly" | "sleek";
export type CharacterMood = "neutral" | "alert" | "processing" | "happy" | "scanning" | "excited";

// ─── Direction lean transforms ───────────────────────────────────────
// Character leans toward the tile the user is currently focusing,
// giving the impression of "looking at" that part of the map.
export const DIRECTION_TRANSFORMS: Record<Direction, string> = {
  up:    "translateY(-3px) rotateZ(-1deg)",  // subtle forward-ready lean (default)
  down:  "translateY(4px) rotateZ(1deg)",    // looking down at the map
  left:  "translateX(-8px) rotateZ(-6deg)",  // strong lean left
  right: "translateX(8px) rotateZ(6deg)",    // strong lean right
};

/** Spring easing used by the lean + See Demo pop-in animations. */
export const SPRING_EASING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

// ─── Animation timings (single source of truth) ──────────────────────
export const ANIMATION = {
  /** Idle float bob — full up/down cycle */
  floatDuration: "3.2s",
  /** Lean settle when emphasisDirection changes */
  leanDuration: "0.38s",
  /** Cross-fade when the active ring variant changes */
  ringFadeDuration: "0.6s",
  /** Spring pop-in for the See Demo button */
  demoPopDuration: "0.38s",
  /** Green box-shadow pulse cycle on the See Demo button */
  demoGlowDuration: "1.3s",
} as const;

// ─── Mood / Lens / Face / Visor options (customize panel) ────────────
export const MOODS: { value: CharacterMood; label: string }[] = [
  { value: "neutral",    label: "Neutral"  },
  { value: "alert",      label: "Alert"    },
  { value: "processing", label: "Process"  },
  { value: "happy",      label: "Happy"    },
  { value: "scanning",   label: "Scan ▶"  }, // scan beam active when Scanner lens selected
  { value: "excited",    label: "Excited"  },
];

export const EYE_DESIGNS: { value: EyeDesign; label: string }[] = [
  { value: "default",  label: "Default"  },
  { value: "aperture", label: "Aperture" },
  { value: "camera",   label: "Camera"   },
  { value: "orb",      label: "Orb"      },
  { value: "scanner",  label: "Scanner"  },
  { value: "ring",     label: "Ring"     },
];

export const FACE_VARIANTS: { value: CharacterVariant; label: string }[] = [
  { value: "minimal",  label: "Minimal"  },
  { value: "tech",     label: "Tech"     },
  { value: "friendly", label: "Friendly" },
  { value: "sleek",    label: "Sleek"    },
];

export const STRAP_STYLES: { value: StrapStyle; label: string }[] = [
  { value: "default",  label: "Default"  },
  { value: "smooth",   label: "Smooth"   },
  { value: "angular",  label: "Angular"  },
  { value: "floating", label: "Float"    },
  { value: "organic",  label: "Organic"  },
];

export const GLOW_COLORS = [
  { color: "#7C4DFF", label: "Purple"  },
  { color: "#2196F3", label: "Blue"    },
  { color: "#4CAF50", label: "Green"   },
  { color: "#FF9800", label: "Orange"  },
  { color: "#F44336", label: "Red"     },
  { color: "#00d4ff", label: "Cyan"    },
];

// ─── Stat chip config ────────────────────────────────────────────────
export const STAT_CHIPS = [
  {
    key: "learn" as const,
    label: "Learn",
    tooltip: "Learning score — tracks your study progress and completed lessons",
    Icon: AutoStoriesIcon,
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    key: "earn" as const,
    label: "Earn",
    tooltip: "Earn score — coins and rewards collected on your journey",
    Icon: EmojiEventsIcon,
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    key: "compete" as const,
    label: "Compete",
    tooltip: "Compete score — ranking points earned against other learners",
    Icon: SportsScoreIcon,
    color: "#059669",
    bg: "#ecfdf5",
  },
] as const;

export type StatKey = (typeof STAT_CHIPS)[number]["key"];

// ─── Shared pill button sx helper ────────────────────────────────────
export const pillSx = (active: boolean): SxProps<Theme> => ({
  px: 1,
  py: 0.5,
  borderRadius: "20px",
  border: "1.5px solid",
  borderColor: active ? "primary.main" : "divider",
  bgcolor: active ? "primary.main" : "transparent",
  color: active ? "primary.contrastText" : "text.secondary",
  fontSize: "0.58rem",
  fontWeight: 600,
  cursor: "pointer",
  lineHeight: 1,
  transition: "all 0.15s",
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
  "&:hover": {
    borderColor: "primary.main",
    color: active ? "primary.contrastText" : "primary.main",
    bgcolor: active ? "primary.main" : "action.hover",
  },
});
