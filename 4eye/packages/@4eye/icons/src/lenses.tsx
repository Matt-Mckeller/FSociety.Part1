import * as React from "react";

import { BrandIcon, type BrandIconProps } from "./BrandIcon";

/**
 * Custom lens icons for the profile surface.
 *
 * Replaces the emoji the character rail used (🌅 ✦ ⚔️ 🧠 🌱), which rendered
 * differently per platform and could not tint with the lens accent.
 *
 * House style, so the fifteen read as one family:
 *   - 24×24 viewBox, painted with `currentColor` (inherited from the label ink,
 *     so an icon always passes contrast wherever its text does).
 *   - Built from the brand's circle-and-orbit vocabulary — the Expanse mark is
 *     an eye with rings — rather than literal objects wherever a symbol will do.
 *   - Secondary detail at `opacity 0.85`; no outline/fill mixing inside a glyph.
 */

/** Surfaced — a ring with a raised focal dot: what the system has lifted up. */
export function SurfacedIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 3a9 9 0 1 0 9 9 1 1 0 0 0-2 0 7 7 0 1 1-7-7 1 1 0 0 0 0-2Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M16.5 2.5 18 6l3.5 1.5L18 9l-1.5 3.5L15 9l-3.5-1.5L15 6l1.5-3.5Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Today — a horizon with a rising disc. */
export function TodayIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M3 17h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z" />
      <path d="M12 6a6 6 0 0 1 6 6 1 1 0 0 1-1 1H7a1 1 0 0 1-1-1 6 6 0 0 1 6-6Z" />
      <path d="M12 2v2M4.2 5.6l1.4 1.4M19.8 5.6l-1.4 1.4" opacity="0.85" strokeWidth="1.8" stroke="currentColor" fill="none" strokeLinecap="round" />
    </BrandIcon>
  );
}

/** Core — a four-point star inside a ring: the character's centre. */
export function CoreIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" opacity="0.85" />
      <path d="M12 6.5 13.6 10.4 17.5 12 13.6 13.6 12 17.5 10.4 13.6 6.5 12l3.9-1.6L12 6.5Z" />
    </BrandIcon>
  );
}

/** Gear — equipment: a shield over crossed edges. */
export function GearIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2 4 5v6.5c0 5 3.4 9.1 8 10.5 4.6-1.4 8-5.5 8-10.5V5l-8-3Zm0 2.2 6 2.2v5.1c0 3.9-2.5 7.2-6 8.4-3.5-1.2-6-4.5-6-8.4V6.4l6-2.2Z" />
      <path d="M9 11.5 11 13.5 15.2 9.3" opacity="0.85" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </BrandIcon>
  );
}

/** Mind — a half-filled orb: perspective and interiority. */
export function MindIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2v16a8 8 0 0 1 0-16Z" />
      <circle cx="15.5" cy="9" r="1.3" opacity="0.85" />
      <circle cx="15.5" cy="15" r="1.3" opacity="0.85" />
    </BrandIcon>
  );
}

/** Life — a sprout: habits and growth. */
export function LifeIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M11 21v-6.2C7.6 14.4 5 11.6 5 8.2V6h2.2c3.4 0 6.2 2.6 6.6 6H11Z" opacity="0.85" />
      <path d="M13 21v-4.4c0-3.4 2.6-6.2 6-6.6V12c0 3.4-2.6 6.2-6 6.6V21Z" />
      <path d="M10 21h4a1 1 0 0 1 0 2h-4a1 1 0 0 1 0-2Z" />
    </BrandIcon>
  );
}

/** Users — identity: a figure inside an orbit. */
export function UsersIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0 1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1Z" opacity="0.85" />
      <path d="M12 1.5a1 1 0 0 1 0 2 1 1 0 0 1 0-2Z" />
    </BrandIcon>
  );
}

/** Healing — a cross inside a soft ring. */
export function HealingIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" opacity="0.85" />
      <path d="M11 7h2v4h4v2h-4v4h-2v-4H7v-2h4V7Z" />
    </BrandIcon>
  );
}

/** Psychology — nested arcs: layers of thought. */
export function PsychologyIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 3a9 9 0 0 0-9 9c0 3.6 2.1 6.7 5.2 8.2l.8-1.8A7 7 0 1 1 19 12h2a9 9 0 0 0-9-9Z" />
      <path d="M12 7a5 5 0 0 0-5 5c0 2 1.2 3.7 2.9 4.5l.8-1.8A3 3 0 1 1 15 12h2a5 5 0 0 0-5-5Z" opacity="0.85" />
      <circle cx="12" cy="12" r="1.6" />
    </BrandIcon>
  );
}

/** Communication — two overlapping signal arcs. */
export function CommunicationIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M4 5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-4 3V5Z" />
      <path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1l-3 2v-2h-2a2 2 0 0 1-2-2v-.5h4a3 3 0 0 0 3-3V9Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Student — a cap over an open page. */
export function StudentIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 3 1.5 8 12 13l10.5-5L12 3Z" />
      <path d="M5.5 11.2V15c0 1.9 2.9 3.4 6.5 3.4s6.5-1.5 6.5-3.4v-3.8L12 14.4l-6.5-3.2Z" opacity="0.85" />
      <path d="M21 9v5a1 1 0 0 1-2 0V9h2Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Teacher — a board with a pointer mark. */
export function TeacherIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-8v2.2l3 1.9-1 1.7-4-2.5-4 2.5-1-1.7 3-1.9V17H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v9h16V6H4Z" />
      <path d="M6.5 12.5 10 9l2.5 2.5L17 7" opacity="0.85" strokeWidth="1.8" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </BrandIcon>
  );
}

/** Classroom — a building with a ringed centre. */
export function ClassroomIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2 2 7v2h20V7L12 2Z" />
      <path d="M4 11h3v7H4v-7Zm6.5 0h3v7h-3v-7ZM17 11h3v7h-3v-7ZM2 19h20v3H2v-3Z" opacity="0.85" />
      <circle cx="12" cy="6.5" r="1.4" />
    </BrandIcon>
  );
}

/** Professional — a case with a ring clasp. */
export function ProfessionalIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M9 3h6a2 2 0 0 1 2 2v2h-2V5H9v2H7V5a2 2 0 0 1 2-2Z" opacity="0.85" />
      <path d="M3 8h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    </BrandIcon>
  );
}

/** Parent — a larger and smaller figure linked. */
export function ParentIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="8" cy="6.5" r="3" />
      <path d="M2.5 18a5.5 5.5 0 0 1 11 0 1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1Z" />
      <circle cx="17" cy="10" r="2.2" opacity="0.85" />
      <path d="M13 19a4 4 0 0 1 8 0 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Character — a figure with a charge: who I am and what I can do. */
export function CharacterIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="9.5" cy="6.5" r="3.2" />
      <path d="M3.5 19a6 6 0 0 1 12 0 1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1Z" opacity="0.85" />
      <path d="M19 2l-4 6h2.6L16 14l4-6h-2.6L19 2Z" />
    </BrandIcon>
  );
}

/** Engagement — attention rings: what is loud vs what is strong. */
export function EngagementIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="2.6" />
      <path
        d="M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 1.6a5.4 5.4 0 1 0 0 10.8 5.4 5.4 0 0 0 0-10.8Z"
        opacity="0.85"
      />
      <path
        d="M12 2.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19Zm0 1.5a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
        opacity="0.4"
      />
    </BrandIcon>
  );
}
