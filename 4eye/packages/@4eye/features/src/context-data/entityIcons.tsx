import * as React from "react";
import { SvgIcon, type SvgIconProps } from "@mui/material";
import type { SelectedContextKey } from "@4eye/types";

/**
 * Custom brand glyphs for the eight entity kinds.
 *
 * Each is an MUI `SvgIcon` so it stays a drop-in replacement for the
 * stock icons used in the nav grid + context bar: it accepts `sx`,
 * `fontSize`, and paints with `currentColor` (tinting to the kind's
 * accent or the surrounding text color). 24×24 viewBox, monochrome
 * with opacity for secondary shapes — no hard-coded fills so the
 * glyphs read on any background.
 */

/** Actors — a single person (who performs the prompt). */
export function ActorsIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5v.5H5v-.5Z" />
    </SvgIcon>
  );
}

/** Audiences — who else we are targeting and trying to fit in.
 *
 *  Disc stack (watching layers) with people around a hollow center.
 *  The hole is the point: the cursor lives on Aim, this is the room
 *  around it. */
export function AudiencesIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <ellipse cx="12" cy="18.6" rx="8.2" ry="2.85" opacity="0.3" />
      <ellipse cx="12" cy="13.6" rx="8.2" ry="2.85" opacity="0.52" />
      <ellipse cx="12" cy="8.4" rx="8.2" ry="2.85" />
      {/* Hollow center — the aim is not here. */}
      <ellipse
        cx="12"
        cy="8.4"
        rx="3.15"
        ry="1.15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      {/* People on the ring — who else, fitting around the work. */}
      <circle cx="12" cy="5.55" r="1.15" />
      <circle cx="7.15" cy="8.95" r="0.95" opacity="0.86" />
      <circle cx="16.85" cy="8.95" r="0.95" opacity="0.86" />
    </SvgIcon>
  );
}

/** Locations — a map pin. */
export function LocationsIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C7.6 2 4 5.4 4 9.8 4 15 12 22 12 22s8-7 8-12.2C20 5.4 16.4 2 12 2Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </SvgIcon>
  );
}

/** Stories — an open book (narrative templates). */
export function StoriesIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 6C10 4.5 7 4 4 4.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6Zm0 2.2c1.6-1.5 3.7-2 6-1.8V17c-2-.2-4.3.2-6 1.2V8.2Z" />
    </SvgIcon>
  );
}

/** Animations — a play head with motion lines. */
export function AnimationsIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 5v14l11-7-11-7Z" />
      <path d="M3 7h4v2H3V7Zm0 4h4v2H3v-2Zm0 4h4v2H3v-2Z" opacity="0.75" />
    </SvgIcon>
  );
}

/** Scenes — stacked frames (compositions of elements). */
export function ScenesIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="7" y="3" width="14" height="14" rx="2" opacity="0.5" />
      <rect x="3" y="7" width="14" height="14" rx="2" />
      <circle cx="7" cy="11" r="1.6" opacity="0.4" />
    </SvgIcon>
  );
}

/** Sequences — a timeline of connected nodes. */
export function SequencesIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="5" y="11" width="14" height="2" opacity="0.6" />
      <circle cx="5" cy="12" r="2.6" />
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="19" cy="12" r="2.6" />
    </SvgIcon>
  );
}

/** Pipelines — a branching flow of processing layers. */
export function PipelinesIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 7.5v3.5M12 11H6.5V15M12 11h5.5V15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect x="9" y="2.5" width="6" height="5" rx="1.2" />
      <rect x="3.5" y="15" width="6" height="5" rx="1.2" />
      <rect x="14.5" y="15" width="6" height="5" rx="1.2" />
    </SvgIcon>
  );
}

/** Registry mapping each entity kind to its custom brand glyph. */
export const ENTITY_ICONS: Record<SelectedContextKey, React.ComponentType<SvgIconProps>> = {
  targets: ActorsIcon,
  audiences: AudiencesIcon,
  locations: LocationsIcon,
  stories: StoriesIcon,
  animations: AnimationsIcon,
  scenes: ScenesIcon,
  sequences: SequencesIcon,
  pipelines: PipelinesIcon,
};
