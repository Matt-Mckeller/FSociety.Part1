"use client";

/**
 * step-icons.tsx
 *
 * Per-slide timeline icons. Each slide in the home deck maps to one
 * `TimelineStepIconComponent` rendered inside the active / future
 * cells of {@link SlideshowTimeline} in place of the prior text label
 * ("LEARN", "SEE", etc).
 *
 * All icons accept a unified `{ size, color }` prop pair so the
 * timeline can size + tint them consistently regardless of source:
 *   - MUI icons → wrapped with `sx={{ fontSize: size, color }}`
 *   - Brand SVGs (CoinStackIcon) → forwarded `size` + `color` directly
 *   - Custom inline SVGs → use the `color` for primary fill, optional
 *     accent for the brand "pupil" callback inside the joystick ball
 *
 * Brand alignment notes:
 *   - The custom `IconStepControl` (joystick) renders a circular ball
 *     on top of a stick + rounded base, with a small inner pupil dot
 *     inside the ball. The pupil-on-circle motif is the central
 *     Expanse logo grammar, so the joystick reads as a brand-cousin
 *     piece rather than a generic gamepad icon.
 *   - The other six icons stay literal (RocketLaunch, Visibility,
 *     Gamepad, Apps, CoinStack) so each step's identity is instantly
 *     legible at a glance.
 */

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HubIcon from "@mui/icons-material/Hub";
import AppsIcon from "@mui/icons-material/Apps";
import { CoinStackIcon, COIN_PALETTES } from "@expanse/brand-core";

import type { TimelineStepIconComponent } from "@4eye/web/components/timeline/types";

/** Intro → marketing video opener. */
export const IconStepVideo: TimelineStepIconComponent = ({ size, color }) => (
  <OndemandVideoIcon sx={{ fontSize: size, color, display: "block" }} />
);

/** Hook → "begin / launch into learning". */
export const IconStepLearn: TimelineStepIconComponent = ({ size, color }) => (
  <RocketLaunchIcon sx={{ fontSize: size, color, display: "block" }} />
);

/** Promise → "see / glimpses". */
export const IconStepSee: TimelineStepIconComponent = ({ size, color }) => (
  <VisibilityIcon sx={{ fontSize: size, color, display: "block" }} />
);

/**
 * Play → "control your mind". Custom brand-aligned joystick: ball-on-stick
 * over a rounded base, with a pupil dot inside the ball that echoes the
 * Expanse logo's circle-with-pupil grammar.
 */
export const IconStepControl: TimelineStepIconComponent = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden
    focusable="false"
    style={{ display: "block" }}
  >
    <g fill={color}>
      {/* base / control deck */}
      <rect x="3" y="18" width="18" height="3.5" rx="1.75" />
      {/* stick */}
      <rect x="11" y="9" width="2" height="10" rx="1" />
      {/* ball / knob */}
      <circle cx="12" cy="6.5" r="4" />
    </g>
    {/* pupil — Expanse circle-with-pupil callback */}
    <circle cx="12" cy="6.5" r="1.4" fill="#ffffff" fillOpacity={0.92} />
  </svg>
);

/** Reach → "domains". Hub icon mirrors the ContextBar Domains glyph. */
export const IconStepDomain: TimelineStepIconComponent = ({ size, color }) => (
  <HubIcon sx={{ fontSize: size, color, display: "block" }} />
);

/** Offerings → "catalog of features". */
export const IconStepCatalog: TimelineStepIconComponent = ({ size, color }) => (
  <AppsIcon sx={{ fontSize: size, color, display: "block" }} />
);

/** Reward → "earn". Uses the gold palette — the canonical coin color. */
export const IconStepEarn: TimelineStepIconComponent = ({ size }) => (
  <CoinStackIcon size={size} {...COIN_PALETTES.gold} aria-hidden />
);
