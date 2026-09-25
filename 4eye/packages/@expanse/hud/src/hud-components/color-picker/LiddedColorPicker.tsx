"use client"

import React, { useCallback, useMemo, useRef, useState } from "react"
import {
  Box,
  IconButton,
  Paper,
  Popper,
  Tooltip,
  Fade,
  ClickAwayListener,
} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import PaletteIcon from "@mui/icons-material/Palette"

// =============================================================================
// Types
// =============================================================================

export interface LiddedColorPickerProps {
  /** Currently selected color (hex / css color string) */
  value: string
  /** Called when the user picks a different color */
  onChange: (color: string) => void
  /** Color choices shown in the inline preview when the lid lifts */
  colors: string[]
  /**
   * Called when the user *clicks* the eye button (vs. just hovering it).
   * Use this to open a full color-picker dialog/popover elsewhere.
   * If omitted, clicking the eye toggles a sticky inline preview.
   */
  onActivate?: () => void
  /**
   * Show the prev/next arrows that cycle through `colors`.
   * @default true
   */
  showCycleArrows?: boolean
  /**
   * Pixel diameter of the eye button (chips match this).
   * @default 36
   */
  size?: number
  /**
   * Tooltip / aria label for the eye button.
   * @default "Color"
   */
  label?: string
  /**
   * Icon shown on the closed lid. Defaults to a palette glyph.
   * Rendered monochrome — no color leaks through the lid.
   */
  lidIcon?: React.ReactNode
}

// =============================================================================
// Visual constants — match the frosted chip language used elsewhere
// =============================================================================

const CHIP_BASE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "rgba(255, 255, 255, 0.94)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(0, 0, 0, 0.30)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
  borderRadius: "50%",
  flexShrink: 0,
  "& .MuiIconButton-root": {
    bgcolor: "transparent",
    boxShadow: "none",
    border: "none",
    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
  },
} as const

// =============================================================================
// Component
// =============================================================================

/**
 * LiddedColorPicker — a "lidded eye" color control.
 *
 * Resting state: a frosted round button with a monochrome palette glyph.
 * **No color leaks through the lid.** The currently selected color is hidden.
 *
 * On hover (eye opens): an inline popover slides out below the button
 * showing all `colors` as round swatches the user can click to change
 * the selection. The popover closes when the pointer leaves.
 *
 * On click (eye activates): calls `onActivate` so the host can open a
 * larger dedicated color-picker surface (e.g. a Drawer with HSL controls,
 * gradients, theme presets, etc.).
 *
 * Two small chevron arrows on the sides cycle through `colors` for quick
 * keyboard-free hopping.
 */
export function LiddedColorPicker({
  value,
  onChange,
  colors,
  onActivate,
  showCycleArrows = true,
  size = 36,
  label = "Color",
  lidIcon,
}: LiddedColorPickerProps) {
  const eyeRef = useRef<HTMLDivElement | null>(null)
  const [hoverOpen, setHoverOpen] = useState(false)
  const [stickyOpen, setStickyOpen] = useState(false)
  const open = hoverOpen || stickyOpen

  const currentIndex = useMemo(
    () => Math.max(0, colors.indexOf(value)),
    [colors, value]
  )

  const cycle = useCallback(
    (delta: 1 | -1) => {
      if (colors.length === 0) return
      const next = (currentIndex + delta + colors.length) % colors.length
      onChange(colors[next])
    },
    [colors, currentIndex, onChange]
  )

  const handleEyeClick = useCallback(() => {
    if (onActivate) {
      onActivate()
      return
    }
    setStickyOpen((s) => !s)
  }, [onActivate])

  const arrowSize = Math.round(size * 0.72)
  const swatchSize = Math.round(size * 0.78)

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {/* Prev arrow */}
      {showCycleArrows && (
        <Tooltip title="Previous color" arrow>
          <Box
            sx={{
              ...CHIP_BASE,
              width: arrowSize,
              height: arrowSize,
              minWidth: arrowSize,
            }}
          >
            <IconButton
              size="small"
              aria-label="Previous color"
              onClick={() => cycle(-1)}
              sx={{ width: arrowSize, height: arrowSize }}
            >
              <ChevronLeftIcon sx={{ fontSize: Math.round(arrowSize * 0.6) }} />
            </IconButton>
          </Box>
        </Tooltip>
      )}

      {/* Eye button (the lid) */}
      <Box
        ref={eyeRef}
        onMouseEnter={() => setHoverOpen(true)}
        onMouseLeave={() => setHoverOpen(false)}
        sx={{
          ...CHIP_BASE,
          width: size,
          height: size,
          minWidth: size,
          // Subtle "blink" affordance: tighten the shadow as the lid lifts
          transition: "box-shadow 200ms ease, transform 200ms ease",
          ...(open && {
            transform: "translateY(-1px)",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.4)",
          }),
        }}
      >
        <Tooltip title={label} arrow disableHoverListener={open}>
          <IconButton
            size="small"
            aria-label={label}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={handleEyeClick}
            sx={{
              width: size,
              height: size,
              // Lid icon stays monochrome — no color preview here.
              color: "rgba(0, 0, 0, 0.78)",
              position: "relative",
              overflow: "hidden",
              // Pseudo-element acts as the "lid" — slides up on hover so the
              // user has a tactile sense of opening the eye.
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 60%)",
                transform: open ? "translateY(-100%)" : "translateY(0)",
                transition: "transform 220ms ease",
                pointerEvents: "none",
              },
            }}
          >
            {lidIcon ?? (
              <PaletteIcon sx={{ fontSize: Math.round(size * 0.55) }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Next arrow */}
      {showCycleArrows && (
        <Tooltip title="Next color" arrow>
          <Box
            sx={{
              ...CHIP_BASE,
              width: arrowSize,
              height: arrowSize,
              minWidth: arrowSize,
            }}
          >
            <IconButton
              size="small"
              aria-label="Next color"
              onClick={() => cycle(1)}
              sx={{ width: arrowSize, height: arrowSize }}
            >
              <ChevronRightIcon
                sx={{ fontSize: Math.round(arrowSize * 0.6) }}
              />
            </IconButton>
          </Box>
        </Tooltip>
      )}

      {/* Inline swatch preview — appears when the lid is open (hover or sticky) */}
      <Popper
        open={open}
        anchorEl={eyeRef.current}
        placement="bottom"
        transition
        modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
        sx={{ zIndex: (t) => t.zIndex.tooltip }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={180}>
            <Box
              onMouseEnter={() => setHoverOpen(true)}
              onMouseLeave={() => setHoverOpen(false)}
            >
              <ClickAwayListener
                onClickAway={() => stickyOpen && setStickyOpen(false)}
              >
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    p: 0.75,
                    bgcolor: "rgba(255, 255, 255, 0.96)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0, 0, 0, 0.30)",
                    boxShadow: "0 12px 36px rgba(0, 0, 0, 0.35)",
                    borderRadius: 999,
                  }}
                >
                  {colors.map((c) => {
                    const isActive = c === value
                    return (
                      <Tooltip key={c} title={c} arrow>
                        <Box
                          role="button"
                          aria-label={`Select color ${c}`}
                          aria-pressed={isActive}
                          tabIndex={0}
                          onClick={() => onChange(c)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              onChange(c)
                            }
                          }}
                          sx={{
                            width: swatchSize,
                            height: swatchSize,
                            borderRadius: "50%",
                            cursor: "pointer",
                            bgcolor: c,
                            border: isActive
                              ? "2px solid rgba(0,0,0,0.8)"
                              : "2px solid rgba(0,0,0,0.15)",
                            boxShadow: isActive
                              ? `0 0 0 2px #fff, 0 0 8px ${c}`
                              : "none",
                            transition:
                              "transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease",
                            "&:hover": {
                              transform: "scale(1.08)",
                              boxShadow: `0 0 6px ${c}`,
                            },
                            "&:focus-visible": {
                              outline: "2px solid #000",
                              outlineOffset: 2,
                            },
                          }}
                        />
                      </Tooltip>
                    )
                  })}
                </Paper>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  )
}
