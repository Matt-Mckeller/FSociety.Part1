"use client"

import { Box } from "@mui/material"

const SIZE_PX = {
  inherit: "1em",
  small: 20,
  medium: 24,
} as const

export interface PlusCloseGlyphProps {
  /**
   * Force the plus state (closing beat, pressed). Hover and keyboard
   * focus also reveal the plus via CSS on a parent `ButtonBase`.
   */
  plus?: boolean
  /** Square size. `"small"` matches MUI `fontSize="small"` (20px). */
  fontSize?: keyof typeof SIZE_PX | number
}

/**
 * Close mark for the full-screen map.
 *
 * Resting state is a rounded frame — a put-away glyph that is not an X —
 * so screenshots of the open map never carry a cancel cross. Hover, keyboard
 * focus, and the map-closing beat morph the frame into a plus.
 */
export function PlusCloseGlyph({
  plus = false,
  fontSize = "small",
}: PlusCloseGlyphProps) {
  const showPlus = plus
  const size = typeof fontSize === "number" ? fontSize : SIZE_PX[fontSize]

  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      data-plus={showPlus ? "" : undefined}
      sx={{
        width: size,
        height: size,
        display: "block",
        overflow: "visible",
        flexShrink: 0,
        "& .rest, & .plus": {
          transformOrigin: "12px 12px",
          transition: "opacity 200ms ease, transform 200ms ease",
        },
        "& .rest": {
          opacity: showPlus ? 0 : 1,
          transform: showPlus ? "scale(0.72)" : "scale(1)",
        },
        "& .plus": {
          opacity: showPlus ? 1 : 0,
          transform: showPlus ? "scale(1)" : "scale(0.62)",
        },
        ".MuiButtonBase-root:hover &, .MuiButtonBase-root:focus-visible &": {
          "& .rest": { opacity: 0, transform: "scale(0.72)" },
          "& .plus": { opacity: 1, transform: "scale(1)" },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& .rest, & .plus": { transition: "none" },
        },
      }}
    >
      <g
        className="rest"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Rounded frame — close-this-surface, not a cancel cross. */}
        <rect x="6" y="6" width="12" height="12" rx="3.25" />
      </g>
      <g
        className="plus"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      >
        <path d="M12 6.25v11.5" />
        <path d="M6.25 12h11.5" />
      </g>
    </Box>
  )
}
