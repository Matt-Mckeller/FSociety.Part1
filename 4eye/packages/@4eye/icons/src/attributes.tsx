import * as React from "react";

import { BrandIcon, type BrandIconProps } from "./BrandIcon";

/**
 * Attribute glyphs — one per entry in the character `ATTRIBUTES` model.
 *
 * The summary card previously rendered attributes as an unlabelled bar plus a
 * tier word, with the numeric value hidden in a tooltip. That reads as
 * decoration: you cannot compare two attributes without hovering both. These
 * give each attribute a stable mark so a row of them is scannable, and the
 * numbers go on the surface alongside.
 *
 * Same house style as `lenses.tsx`: 24×24, `currentColor`, secondary detail at
 * `opacity 0.85`.
 */

/** Intelligence — a ringed node with radiating links. */
export function IntelligenceIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v4.2M12 17.8V22M2 12h4.2M17.8 12H22M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" opacity="0.85" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" />
    </BrandIcon>
  );
}

/** Wisdom — an eye within an arc. */
export function WisdomIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 5c-5 0-9 4.5-10 7 1 2.5 5 7 10 7s9-4.5 10-7c-1-2.5-5-7-10-7Zm0 2.4c3.6 0 6.7 3 7.7 4.6-1 1.6-4.1 4.6-7.7 4.6S5.3 13.6 4.3 12C5.3 10.4 8.4 7.4 12 7.4Z" opacity="0.85" />
      <circle cx="12" cy="12" r="2.6" />
    </BrandIcon>
  );
}

/** Charisma — a radiant figure. */
export function CharismaIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="9" r="3.4" />
      <path d="M6 20a6 6 0 0 1 12 0 1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z" opacity="0.85" />
      <path d="M12 1v2.4M4.6 4.6l1.7 1.7M19.4 4.6l-1.7 1.7" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" />
    </BrandIcon>
  );
}

/** Creativity — a spark burst. */
export function CreativityIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2l1.9 5.6L19.5 9l-4.4 3.6 1.4 5.8L12 15.2 7.5 18.4l1.4-5.8L4.5 9l5.6-1.4L12 2Z" />
      <circle cx="19" cy="19" r="1.5" opacity="0.85" />
      <circle cx="5" cy="19" r="1.1" opacity="0.85" />
    </BrandIcon>
  );
}

/** Discipline — a bounded column. */
export function DisciplineIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M4 3h16v2.4H4V3Zm0 15.6h16V21H4v-2.4Z" />
      <path d="M10 6.6h4v10.8h-4V6.6Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Willpower — a flame within a ring. */
export function WillpowerIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" opacity="0.85" />
      <path d="M12 6.5c2.2 2 3.4 3.6 3.4 5.4a3.4 3.4 0 0 1-6.8 0c0-1 .4-1.8 1-2.6.2 1 .8 1.5 1.4 1.5.7 0 1-.6 1-1.5 0-1-.4-1.9-1-2.8Z" />
    </BrandIcon>
  );
}

/** Focus — a reticle. */
export function FocusAttrIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z" opacity="0.85" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 0.5v3M12 20.5v3M0.5 12h3M20.5 12h3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </BrandIcon>
  );
}

/** Empathy — two overlapping rings. */
export function EmpathyIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M9 5a7 7 0 1 0 0 14A7 7 0 0 0 9 5Zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 9 7Z" />
      <path d="M15 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Endurance — a sustained wave. */
export function EnduranceIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M2 12h3l2.5-6 4 12 3-9 2.5 3H22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </BrandIcon>
  );
}

/** Agility — a chevron trail. */
export function AgilityIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M11 3 4 12l7 9 1.6-1.9L7.2 12l5.4-7.1L11 3Z" />
      <path d="M18 3l-7 9 7 9 1.6-1.9L14.2 12l5.4-7.1L18 3Z" opacity="0.85" transform="translate(-2 0)" />
    </BrandIcon>
  );
}

/** Adaptability — a shape mid-morph. */
export function AdaptabilityIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2a10 10 0 0 1 0 20V2Z" />
      <path d="M12 2a10 10 0 0 0 0 20 8 8 0 0 1 0-16V2Z" opacity="0.85" />
      <circle cx="12" cy="12" r="1.8" />
    </BrandIcon>
  );
}

/** Strength — a weighted bar. */
export function StrengthIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M8 9h8v6H8V9Z" />
      <path d="M3 10h3v4H3v-4Zm15 0h3v4h-3v-4Z" opacity="0.85" />
      <path d="M6.5 7.5h1.5v9H6.5v-9Zm9.5 0h1.5v9H16v-9Z" />
    </BrandIcon>
  );
}

/** Emotional intelligence — nested heart rings. */
export function EmotionalIntelligenceIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path
        d="M12 20.5 C12 20.5, 4 14.8, 4 9.6 C4 7.1, 5.9 5.4, 8.2 5.4 C9.7 5.4, 11 6.3, 12 7.8 C13 6.3, 14.3 5.4, 15.8 5.4 C18.1 5.4, 20 7.1, 20 9.6 C20 14.8, 12 20.5, 12 20.5 Z"
        opacity="0.9"
      />
      <circle cx="9.2" cy="10.2" r="1.4" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
      <circle cx="14.8" cy="10.2" r="1.4" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
    </BrandIcon>
  );
}

/** Perception — an open eye with a beam. */
export function PerceptionIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M2.5 12c1.8-3.6 5.4-6 9.5-6s7.7 2.4 9.5 6c-1.8 3.6-5.4 6-9.5 6s-7.7-2.4-9.5-6Z" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <circle cx="12" cy="12" r="2.8" />
      <path d="M12 3.2 V5.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

/** Intuition — a spark arcing to a node. */
export function IntuitionIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="7" cy="12" r="2.4" />
      <circle cx="17" cy="8" r="1.8" opacity="0.85" />
      <path d="M9.2 11.2 C12 7, 14 7.5, 15.4 8.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
      <path d="M17 11.5 V16.5 M14.8 14 H19.2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

/** Power — a core burst (capacity that moves the room). */
export function PowerIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="3.4" />
      <path
        d="M12 2.5v3.2M12 18.3v3.2M2.5 12h3.2M18.3 12h3.2M5.2 5.2l2.3 2.3M16.5 16.5l2.3 2.3M18.8 5.2l-2.3 2.3M7.5 16.5l-2.3 2.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.85"
      />
    </BrandIcon>
  );
}

/** Communication — speech waves from a point. Named apart from the lens glyph. */
export function CommunicationAttrIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="7.5" cy="12" r="2.6" />
      <path d="M11.2 8.5 C13.8 9.8, 13.8 14.2, 11.2 15.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <path d="M14.2 6.2 C18.2 8.4, 18.2 15.6, 14.2 17.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

/** Memory — stacked imprint layers. */
export function MemoryIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <rect x="5" y="5" width="14" height="4" rx="1.2" opacity="0.9" />
      <rect x="5" y="10.5" width="14" height="4" rx="1.2" opacity="0.65" />
      <rect x="5" y="16" width="14" height="3.2" rx="1.2" opacity="0.4" />
    </BrandIcon>
  );
}

/** Courage — a shield peak. */
export function CourageIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2.5 L19 6 V12.5 C19 17 15.5 20.5 12 21.5 C8.5 20.5 5 17 5 12.5 V6 Z" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <path d="M12 7.5 V14.5 M9.5 11.5 H14.5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" />
    </BrandIcon>
  );
}

/** Technology — a display with a focused node. */
export function TechnologyIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <rect x="5" y="6" width="14" height="10" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <path d="M9 19.5 H15 M12 16 V19.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      <circle cx="12" cy="11" r="1.6" opacity="0.95" />
    </BrandIcon>
  );
}

/** Registry keyed by the `ATTRIBUTES` model ids. */
export const ATTRIBUTE_ICONS: Record<string, React.ComponentType<BrandIconProps>> = {
  "emotional-intelligence": EmotionalIntelligenceIcon,
  perception: PerceptionIcon,
  intelligence: IntelligenceIcon,
  wisdom: WisdomIcon,
  intuition: IntuitionIcon,
  power: PowerIcon,
  technology: TechnologyIcon,
  memory: MemoryIcon,
  charisma: CharismaIcon,
  communication: CommunicationAttrIcon,
  creativity: CreativityIcon,
  discipline: DisciplineIcon,
  willpower: WillpowerIcon,
  courage: CourageIcon,
  focus: FocusAttrIcon,
  empathy: EmpathyIcon,
  endurance: EnduranceIcon,
  agility: AgilityIcon,
  adaptability: AdaptabilityIcon,
  strength: StrengthIcon,
};
