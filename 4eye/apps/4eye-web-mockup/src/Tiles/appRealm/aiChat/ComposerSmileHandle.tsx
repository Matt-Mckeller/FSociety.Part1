"use client";

import { ButtonBase, Tooltip } from "@mui/material";
import { TripleLayerPath, generateEllipseArcPath } from "@expanse/brand-core";

const VIEW_W = 108;
const VIEW_H = 32;
const CX = 54;
/** Ellipse sits just above the view so only the smile — the lower arc — shows. */
const CY = 2;

/**
 * Nested orbital-ring smiles, matching Expanse logo ring spacing (1 : 2 : 3
 * from the centre). The middle ring is the TripleLayer highlighter — the
 * nested glow that reads as a mouth.
 */
function smileArcs(expanded: boolean) {
  const sweep = expanded
    ? { start: 192, end: 348 }
    : { start: 208, end: 332 };
  const rings = expanded
    ? [
        { rx: 48, ry: 22 },
        { rx: 38, ry: 17.5 },
        { rx: 28, ry: 13 },
      ]
    : [
        { rx: 40, ry: 16 },
        { rx: 32, ry: 13 },
        { rx: 24, ry: 10 },
      ];
  return rings.map((ring) =>
    generateEllipseArcPath(CX, CY, ring.rx, ring.ry, sweep.start, sweep.end),
  );
}

/**
 * Expand / collapse control that lives under the composer.
 *
 * It is a smile: three nested arcs like the logo's orbital rings, with the
 * Expanse triple-layer highlighter on the middle mouth. Collapsed is a
 * quieter grin; expanded opens the rings — the expanse.
 */
export function ComposerSmileHandle({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  const [outer, middle, inner] = smileArcs(expanded);

  return (
    <Tooltip
      title={expanded ? "Collapse to chat input" : "Expand to a writing surface"}
      arrow
    >
      <ButtonBase
        onClick={onToggle}
        aria-label={expanded ? "Collapse composer" : "Expand composer"}
        aria-expanded={expanded}
        sx={{
          display: "grid",
          placeItems: "center",
          width: VIEW_W,
          height: 26,
          borderRadius: 99,
          mt: "-4px",
          mb: 0.25,
          pt: "2px",
          bgcolor: "transparent",
          filter: "drop-shadow(0 0 6px rgba(0, 212, 255, 0.45))",
          transition: "transform 180ms ease, filter 180ms ease",
          "&:hover": {
            transform: "translateY(1px)",
            filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.75)) brightness(1.2)",
          },
          "&:focus-visible": {
            outline: "2px solid rgba(0, 212, 255, 0.7)",
            outlineOffset: 2,
          },
        }}
      >
        <svg
          width={VIEW_W}
          height={VIEW_H}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          fill="none"
          aria-hidden
          focusable="false"
          style={{ display: "block", overflow: "visible" }}
        >
          {/* Outer orbital companion — faint highlighter halo. */}
          <path
            d={outer}
            fill="none"
            stroke="rgba(0, 212, 255, 0.38)"
            strokeWidth={2}
            strokeLinecap="round"
          />
          {/* Middle mouth — nested Expanse highlighter (1:2:3). */}
          <TripleLayerPath
            d={middle}
            fill="none"
            preset="1-2-3_xs"
            colorPreset="bold"
            strokeLinecap="round"
            namePrefix="Smile"
          />
          {/* Inner orbital companion. */}
          <path
            d={inner}
            fill="none"
            stroke="rgba(0, 212, 255, 0.85)"
            strokeWidth={1.15}
            strokeLinecap="round"
          />
        </svg>
      </ButtonBase>
    </Tooltip>
  );
}
