"use client";

/**
 * Priority glyphs — marks for the personal priority codes under Direction.
 *
 * Character Direction uses Power.Max / Aion.Amplify / Aion.CoPilot / Aura.Unlock / Energy.Unlock.
 * Planning-page codes (Money / Power.Unlock / Love) stay mapped so Compass
 * still resolves a mark.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

type GlyphProps = Omit<BrandIconProps, "children">;

/** I.SetUpMyHumanController() — gamepad with a centered I mark. */
export function ControllerGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="4.2" y="8.4" width="15.6" height="10.2" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
      <circle cx="8.4" cy="13.2" r="1.5" opacity="0.9" />
      <circle cx="15.6" cy="13.2" r="1.5" opacity="0.9" />
      <path d="M12 10.2 V12.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <path d="M11 11.2 H13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
    </BrandIcon>
  );
}

/** Money.AmplifyMe() — a coin with an outward amplify ring. */
export function AmplifyMeGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <path d="M12 8.6 V15.4 M10.2 10 C10.7 9.3, 11.3 9, 12 9 C13.2 9, 14 9.7, 14 10.7 C14 12.4, 10 11.8, 10 13.5 C10 14.5, 10.9 15.2, 12.2 15.2 C12.9 15.2, 13.5 14.9, 14 14.3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
      <path d="M12 3.2 V5.2 M12 18.8 V20.8 M3.2 12 H5.2 M18.8 12 H20.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

/** Power.Unlock() — a lock opening on a key turn. */
export function UnlockGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="6.2" y="10.5" width="11.6" height="9" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
      <path d="M8.4 10.5 V8.2 C8.4 5.9, 10 4.2, 12.2 4.2 C14.2 4.2, 15.7 5.6, 15.9 7.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="14.6" r="1.5" opacity="0.95" />
      <path d="M12 16.1 V18.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

/** Power.Comprehend() — an eye with a settled understanding mark. */
export function ComprehendGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M2.8 12 C5.5 7.4, 8.8 5.2, 12 5.2 C15.2 5.2, 18.5 7.4, 21.2 12 C18.5 16.6, 15.2 18.8, 12 18.8 C8.8 18.8, 5.5 16.6, 2.8 12 Z" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <circle cx="12" cy="12" r="1.4" opacity="0.95" />
    </BrandIcon>
  );
}

/** Love.Perfectly() — a heart held in a completed ring. */
export function LovePerfectlyGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <path
        d="M12 17.6 C12 17.6, 5.8 13.4, 5.8 9.6 C5.8 7.7, 7.2 6.4, 9 6.4 C10.2 6.4, 11.2 7.1, 12 8.2 C12.8 7.1, 13.8 6.4, 15 6.4 C16.8 6.4, 18.2 7.7, 18.2 9.6 C18.2 13.4, 12 17.6, 12 17.6 Z"
        opacity="0.95"
      />
    </BrandIcon>
  );
}

/** Power.Max() — a lock fully open, capacity at the ceiling. */
export function PowerMaxGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="6.2" y="11.2" width="11.6" height="8.4" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <path
        d="M8.2 11.2 V7.6 C8.2 5.4 10 3.8 12.2 3.8 C14.4 3.8 16.2 5.4 16.2 7.6 V8.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path d="M9.2 15.4 H14.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
      <path d="M12 13.2 V17.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
    </BrandIcon>
  );
}

/** Aion.Amplify — three nodes (Matthew, Max, 4eye) radiating from one core. */
export function AionAmplifyGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="2.4" opacity="0.95" />
      <circle cx="12" cy="4.4" r="2" opacity="0.9" />
      <circle cx="19.2" cy="16.2" r="2" opacity="0.75" />
      <circle cx="4.8" cy="16.2" r="2" opacity="0.75" />
      <path
        d="M12 9.6 V6.6 M14.1 13.3 L17.4 15 M9.9 13.3 L6.6 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.28" />
    </BrandIcon>
  );
}

/** Aion.CoPilot() — two seats, one heading. */
export function AionCoPilotGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="8.2" cy="10.2" r="2.6" opacity="0.95" />
      <circle cx="15.8" cy="10.2" r="2.6" opacity="0.7" />
      <path
        d="M5.4 16.4 C6.2 14.2 7.2 13.2 8.2 13.2 C9.4 13.2 10.4 14.4 12 14.4 C13.6 14.4 14.6 13.2 15.8 13.2 C16.8 13.2 17.8 14.2 18.6 16.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M12 3.4 V6.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.22" />
    </BrandIcon>
  );
}

/** Aura.Unlock() — field ring opening off a lock. */
export function AuraUnlockGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.28" />
      <circle cx="12" cy="12" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <circle cx="12" cy="12" r="2.2" opacity="0.95" />
      <path
        d="M16.6 6.2 C18.4 7.6 19.4 9.6 19.4 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.9"
      />
    </BrandIcon>
  );
}

/** Energy.Unlock() — a bolt with the gate open. */
export function EnergyUnlockGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M13.4 3.2 L7.6 12.8 H12 L10.8 20.8 L18.4 10.2 H13.8 Z" opacity="0.92" />
      <path
        d="M4.2 18.8 H8.4 M15.6 18.8 H19.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </BrandIcon>
  );
}

export const PRIORITY_GLYPHS: Record<string, (props: GlyphProps) => React.ReactElement> = {
  "pri-controller": ControllerGlyph,
  "pri-amplify": AmplifyMeGlyph,
  "pri-unlock": UnlockGlyph,
  "pri-comprehend": ComprehendGlyph,
  "pri-love": LovePerfectlyGlyph,
  "pri-power-max": PowerMaxGlyph,
  "pri-aion-amplify": AionAmplifyGlyph,
  "pri-aion-copilot": AionCoPilotGlyph,
  "pri-aura-unlock": AuraUnlockGlyph,
  "pri-energy-unlock": EnergyUnlockGlyph,
};

export function PriorityGlyph({ id, ...props }: GlyphProps & { id: string }) {
  const Glyph = PRIORITY_GLYPHS[id] ?? AmplifyMeGlyph;
  return <Glyph {...props} />;
}
