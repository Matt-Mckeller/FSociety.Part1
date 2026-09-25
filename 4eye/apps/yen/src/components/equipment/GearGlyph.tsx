import type { EquipmentSlot } from "@yen/content/equipment";

/**
 * Geometric marks for gear, one per slot family.
 *
 * The library has no per-item art — every item carries a colour but no
 * `symbol` — so the visual identity comes from the pairing: a shared mark for
 * what the item *is*, drawn in the item's own colour, framed by its rarity.
 * Two head items read as related without reading as identical.
 *
 * Stroke-only on a 24×24 grid, `currentColor` throughout, so a card sets the
 * colour once on the wrapper and the glyph follows.
 */

type GlyphKey =
  | "head"
  | "glasses"
  | "ear"
  | "torso"
  | "leg"
  | "foot"
  | "hand"
  | "arm"
  | "shoulder"
  | "weapon"
  | "ring"
  | "jewelry"
  | "tattoo"
  | "symbol"
  | "belief"
  | "companion";

const SLOT_GLYPH: Record<EquipmentSlot, GlyphKey> = {
  head: "head",
  glasses: "glasses",
  "earring-left": "ear",
  "earring-right": "ear",
  "earrings-pair": "ear",
  "body-armor": "torso",
  "leg-armor-left": "leg",
  "leg-armor-right": "leg",
  "leg-armor-pair": "leg",
  "shoe-left": "foot",
  "shoe-right": "foot",
  "shoes-pair": "foot",
  "glove-left": "hand",
  "glove-right": "hand",
  "gloves-pair": "hand",
  ring: "ring",
  jewelry: "jewelry",
  "main-hand": "weapon",
  "off-hand": "weapon",
  "arm-left": "arm",
  "arm-right": "arm",
  "arms-pair": "arm",
  "shoulder-left": "shoulder",
  "shoulder-right": "shoulder",
  "shoulders-pair": "shoulder",
  tattoo: "tattoo",
  symbol: "symbol",
  "belief-system": "belief",
  "companion-left": "companion",
  "companion-right": "companion",
  "companions-pair": "companion",
};

const PATHS: Record<GlyphKey, React.ReactNode> = {
  head: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M4 13h16" />
      <path d="M9 19v-6M15 19v-6" />
    </>
  ),
  glasses: (
    <>
      <circle cx="7" cy="13" r="3.5" />
      <circle cx="17" cy="13" r="3.5" />
      <path d="M10.5 13h3M3.5 12 2 9M20.5 12 22 9" />
    </>
  ),
  ear: (
    <>
      <circle cx="12" cy="5.5" r="1.5" />
      <path d="M12 7.5V9" />
      <circle cx="12" cy="14.5" r="5" />
    </>
  ),
  torso: (
    <>
      <path d="M6 5h12l-1 10a5 5 0 0 1-10 0Z" />
      <path d="M12 5v15" />
      <path d="M6.5 10h11" />
    </>
  ),
  leg: (
    <>
      <path d="M9 3h6l-1 9-1 9h-3l-1-9Z" />
      <path d="M9.3 9h5.4M9.8 15h4.4" />
    </>
  ),
  foot: (
    <>
      <path d="M8 4h5v8l4 1.8A3 3 0 0 1 19 16.5V19H8Z" />
      <path d="M8 12h5" />
    </>
  ),
  /*
    A mitten, not a hand with separated fingers. An earlier version drew an
    extended middle finger at small sizes — fingers are not worth the risk on a
    24px grid, and the cuff reads as "glove" on its own.
  */
  hand: (
    <>
      <path d="M9 20v-7.5a3.5 3.5 0 0 1 7 0V20Z" />
      <path d="M9 13.5H7.5a2 2 0 0 0 0 4H9" />
      <path d="M9 17.5h7" />
    </>
  ),
  arm: (
    <>
      <rect x="7" y="4" width="10" height="16" rx="3" />
      <path d="M7 9h10M7 15h10" />
    </>
  ),
  shoulder: (
    <>
      <path d="M3 17a9 9 0 0 1 18 0Z" />
      <path d="M7.5 17a4.5 4.5 0 0 1 9 0" />
    </>
  ),
  weapon: (
    <>
      <path d="M13 3 6 17l3 3L20 6Z" />
      <path d="m6 17-2 4 4-1" />
    </>
  ),
  ring: (
    <>
      <circle cx="12" cy="15" r="6" />
      <path d="m12 3 3 4h-6Z" />
    </>
  ),
  jewelry: (
    <>
      <path d="M5 5a7 7 0 0 0 14 0" />
      <path d="M12 12v3" />
      <path d="m12 21 2.5-3h-5Z" />
    </>
  ),
  tattoo: (
    <>
      <path d="M4 18c4-1 5-4 4-7s2-6 6-6 5 3 4 5" />
      <circle cx="17" cy="16" r="3" />
    </>
  ),
  symbol: (
    <>
      <path d="m12 3 2.6 6.2 6.4.5-4.9 4.2 1.5 6.3L12 17l-5.6 3.2 1.5-6.3L3 9.7l6.4-.5Z" />
    </>
  ),
  belief: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  companion: (
    <>
      <circle cx="9" cy="10" r="3.2" />
      <circle cx="15" cy="10" r="3.2" />
      <path d="M6.5 8.2 5 5.5M11.5 8.2 12.2 5.2M12.8 8.2 12.2 5.2M17.5 8.2 19 5.5" />
      <path d="M7.5 13.5c1.2 2.2 2.8 3.2 4.5 3.2s3.3-1 4.5-3.2" />
    </>
  ),
};

export interface GearGlyphProps {
  slot: EquipmentSlot;
  size?: number;
}

export function GearGlyph({ slot, size = 28 }: GearGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[SLOT_GLYPH[slot]]}
    </svg>
  );
}
