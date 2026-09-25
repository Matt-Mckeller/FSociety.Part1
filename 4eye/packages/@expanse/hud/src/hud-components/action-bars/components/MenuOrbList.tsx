"use client"

import React, { useEffect, useRef, useState } from "react"
import { Box, ButtonBase, Typography } from "@mui/material"
import { TripleLayerPill } from "@expanse/brand-core"

import { ORB_SIZES } from "../../orbs/types"

/**
 * Semantic tone slot for a menu row. Maps to a desaturated, theme-coherent
 * palette (see {@link TONE_STYLES}) so all menus read as one calm family
 * rather than a circus of saturated brand colors.
 */
export type MenuOrbTone =
  | "neutral"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "accent"

export interface MenuOrbItem {
  /** Stable key for React. */
  key: string
  /** Icon node rendered inside the row's icon disc. */
  icon: React.ReactNode
  /** Visible label rendered inside the pill, right of the icon. */
  label: string
  /**
   * Semantic tone for this row. Default: `"neutral"`.
   * Tones are intentionally desaturated to coordinate with the theme.
   */
  tone?: MenuOrbTone
  /** Click handler invoked when the row is clicked. */
  onClick?: () => void
  /** Optional badge / count rendered on the icon disc. */
  badge?: number | string
  /** Disable the row. */
  disabled?: boolean
}

export interface MenuOrbListProps {
  /** Items rendered as a list of pill buttons. */
  items: ReadonlyArray<MenuOrbItem>
  /** Optional header rendered above the items. */
  header?: React.ReactNode
  /**
   * Layout direction for the list. Default `"vertical"` (column) matches
   * the rail-mounted FAB panels. Use `"horizontal"` to render the pills
   * as a wrapping row (e.g. inside a marketing slide shelf).
   */
  direction?: "vertical" | "horizontal"
  /**
   * @deprecated The list is now always transparent — pills carry their own
   * triple-layer chrome and there is no surrounding panel surface anymore.
   * Prop is accepted (and ignored) to avoid breaking existing call sites.
   */
  transparent?: boolean
}

// Internal layout constants. Pills are sm-sized so the icon disc inside
// each pill is the SAME diameter as the FAB triggers on the rails.
const PILL_HEIGHT = ORB_SIZES.sm.button   // 40
const ICON_DISC_PX = 28                   // inner icon disc inside the pill
const ROW_GAP_PX = 8

// ============================================================
// Tone palette — desaturated, theme-coordinated
// ============================================================

interface ToneStyle {
  /**
   * Tone tint layered *over* the dark-glass body so each row reads as a
   * neon-colored pill. ~45% alpha — strong enough to be obviously
   * colored, low enough to keep the glass character.
   */
  bodyTint: string
  /** Hover variant of {@link bodyTint} (~58% alpha). */
  bodyTintHover: string
  /**
   * Tint applied over the icon disc — brighter than {@link bodyTint} so
   * the disc reads as a saturated chip against the tinted body.
   */
  iconChip: string
  /** TripleLayerPath outer stroke (~14% alpha, soft halo). */
  outer: string
  /** TripleLayerPath center stroke (~32% alpha). */
  center: string
  /** TripleLayerPath inner stroke (~85% alpha, defining edge). */
  inner: string
  /** Brighter inner stroke alpha used on hover and focus outline. */
  innerStrong: string
}

/**
 * Neon palette — sourced from
 * `packages/@expanse/theme/src/configs/themes/secondary/neon/neon-dark-theme.ts`.
 * Each tone derives its 5 alpha layers from a single base RGB so menus
 * read as a coherent neon family (cyan / mint / coral / orchid) rather
 * than a generic desaturated wash.
 */
type Rgb = readonly [number, number, number]

// Hex → rgb tuples, lifted from the neon theme constants:
//   NEON_CYAN_LIGHT #33ddff, NEON_CYAN #00d4ff, NEON_MINT #6bffc3,
//   NEON_ORCHID #c792ea, NEON_CORAL #ff6b6b, NEON_PURPLE_LIGHT #453a7d.
const NEON_CYAN_LIGHT_RGB:   Rgb = [0x33, 0xdd, 0xff]
const NEON_CYAN_RGB:         Rgb = [0x00, 0xd4, 0xff]
const NEON_MINT_RGB:         Rgb = [0x6b, 0xff, 0xc3]
const NEON_ORCHID_RGB:       Rgb = [0xc7, 0x92, 0xea]
const NEON_CORAL_RGB:        Rgb = [0xff, 0x6b, 0x6b]
// A blue between cyan and purple for `info` (sky / electric blue).
const NEON_SKY_RGB:          Rgb = [0x4d, 0xa8, 0xff]
// Soft slate-cyan for the quiet `neutral` slot.
const NEON_SLATE_RGB:        Rgb = [0x9f, 0xc4, 0xd6]

const rgba = ([r, g, b]: Rgb, a: number): string =>
  `rgba(${r}, ${g}, ${b}, ${a})`

/**
 * Build a 7-layer ToneStyle from a single neon base color.
 *
 *   bodyTint 22% · bodyTintHover 35% · chip 60%
 *   · outer 14% · center 32% · inner 85% · innerStrong 1.0
 */
const toneFromRgb = (base: Rgb): ToneStyle => ({
  // Body tint — layered over the opaque dark-glass body so each row
  // reads as a clearly colored pill regardless of what's behind the
  // panel (the body itself now carries most of the contrast; this tint
  // just adds the tone's identity on top).
  bodyTint:      rgba(base, 0.14),
  bodyTintHover: rgba(base, 0.24),
  iconChip:      rgba(base, 0.65),
  outer:         rgba(base, 0.18),
  center:        rgba(base, 0.4),
  inner:         rgba(base, 0.9),
  innerStrong:   rgba(base, 1.0),
})

const TONE_STYLES: Record<MenuOrbTone, ToneStyle> = {
  neutral: toneFromRgb(NEON_SLATE_RGB),       // soft slate-cyan
  primary: toneFromRgb(NEON_CYAN_RGB),        // electric cyan
  info:    toneFromRgb(NEON_SKY_RGB),         // sky blue
  success: toneFromRgb(NEON_MINT_RGB),        // mint glow
  warning: toneFromRgb(NEON_ORCHID_RGB),      // orchid (warm-ish)
  danger:  toneFromRgb(NEON_CORAL_RGB),       // coral
  accent:  toneFromRgb(NEON_CYAN_LIGHT_RGB),  // light cyan highlight
}

// Body chrome — a solid dark-glass body (matching the rail FAB pills'
// dark-glass gradient family) so every menu row reads clearly regardless
// of what's behind the panel, instead of the page bleeding through.
const GLASS_BODY        = "rgba(13, 17, 23, 0.82)"
const GLASS_BODY_HOVER  = "rgba(13, 17, 23, 0.92)"
const ICON_DISC_BG           = "rgba(255, 255, 255, 0.12)"
const ICON_DISC_BG_HOVER     = "rgba(255, 255, 255, 0.20)"
const ICON_DISC_BORDER       = "rgba(255, 255, 255, 0.22)"

/**
 * MenuOrbList — the shared "4eye menu" panel style.
 *
 * Vertical column of brand-three-layer pill buttons (icon + inline label).
 * Used by every HUD FAB panel (profile, game, settings) so the visual
 * language stays consistent — change once, all menus follow.
 *
 * Each row renders a {@link TripleLayerPill} from `@expanse/brand-core`
 * as an absolutely-positioned background, with an HTML `<button>`
 * overlay holding the icon + label. Stroke colors are passed in
 * directly (bypassing brand-core's saturated `colorPreset` table) from
 * a desaturated tone palette tuned to the app theme.
 */
export function MenuOrbList({
  items,
  header,
  direction = "vertical",
}: MenuOrbListProps) {
  const isHorizontal = direction === "horizontal"
  return (
    <Box
      role="menu"
      sx={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        flexWrap: isHorizontal ? "wrap" : "nowrap",
        alignItems: "center",
        justifyContent: isHorizontal ? "center" : "flex-start",
        gap: `${ROW_GAP_PX}px`,
        width: isHorizontal ? "100%" : "max-content",
        minWidth: PILL_HEIGHT,
      }}
    >
      {header}
      {items.map((item) => (
        <MenuOrbRow key={item.key} item={item} direction={direction} />
      ))}
    </Box>
  )
}

/** Exported so consumers (e.g. rails) can size their FAB triggers to match. */
export const MENU_ORB_PX = PILL_HEIGHT

// ============================================================
// Row
// ============================================================

interface MenuOrbRowProps {
  item: MenuOrbItem
  direction?: "vertical" | "horizontal"
}

function MenuOrbRow({ item, direction = "vertical" }: MenuOrbRowProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState<number>(0)
  const isHorizontal = direction === "horizontal"

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const w = Math.round(entry.contentRect.width)
      setWidth((prev) => (prev === w ? prev : w))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const tone: MenuOrbTone = item.tone ?? "neutral"
  const style = TONE_STYLES[tone]
  // Body is always dark-glass now (matches the rail FAB pills), so ink is
  // always white regardless of the app's light/dark theme mode.
  const textColor = "common.white"
  const iconColor = "common.white"
  const shadow    = "drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5))"

  return (
    <Box
      ref={wrapperRef}
      sx={{
        position: "relative",
        width: isHorizontal ? "auto" : "100%",
        flex: isHorizontal ? "0 0 auto" : undefined,
        height: PILL_HEIGHT,
        // Reserve breathing room so the outer stroke isn't clipped by
        // parents with `overflow: hidden`.
        isolation: "isolate",
        // Match ActionBar.glass shadow so menu pills read as miniature ActionBars.
        filter: shadow,
      }}
    >
      {width > 0 && (
        <TripleLayerPill
          width={width}
          height={PILL_HEIGHT}
          preset="1-2-3_xs"
          // Strokes only — the ButtonBase below carries the body color and
          // tone tint. Filling here would stack a second dark layer under
          // the body and kill the transparency.
          fill="transparent"
          outerStroke={style.outer}
          centerStroke={style.center}
          innerStroke={style.inner}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      <ButtonBase
        onClick={item.onClick}
        disabled={item.disabled}
        focusRipple
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          width: isHorizontal ? "auto" : "100%",
          height: "100%",
          pl: "6px",
          pr: "16px",
          borderRadius: `${PILL_HEIGHT / 2}px`,
          color: textColor,
          textAlign: "left",
          // Match ActionBar.glass blur amount.
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          // Two-layer body: dark glass (back) + neon tone tint (front).
          backgroundColor: GLASS_BODY,
          backgroundImage: `linear-gradient(${style.bodyTint}, ${style.bodyTint})`,
          transition:
            "transform 120ms ease, background-color 160ms ease, background-image 160ms ease",
          "&:hover": {
            backgroundColor: GLASS_BODY_HOVER,
            backgroundImage: `linear-gradient(${style.bodyTintHover}, ${style.bodyTintHover})`,
            "& .menu-orb-icon": { backgroundColor: ICON_DISC_BG_HOVER },
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          "&.Mui-disabled": {
            opacity: 0.45,
            cursor: "not-allowed",
          },
          "&.Mui-focusVisible": {
            outline: `2px solid ${style.innerStrong}`,
            outlineOffset: 2,
          },
        }}
      >
        <Box
          aria-hidden
          className="menu-orb-icon"
          sx={{
            position: "relative",
            flex: "0 0 auto",
            width: ICON_DISC_PX,
            height: ICON_DISC_PX,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            // Stack the tone chip ON TOP of the neutral white-glass disc so
            // each row keeps colored identity without breaking the dark
            // body. Two layered backgrounds: chip first (front), glass
            // second (back).
            backgroundColor: ICON_DISC_BG,
            backgroundImage: `linear-gradient(${style.iconChip}, ${style.iconChip})`,
            border: `1px solid ${ICON_DISC_BORDER}`,
            color: iconColor,
            transition: "background-color 160ms ease",
            "& svg": { fontSize: 18 },
          }}
        >
          {item.icon}
          {item.badge !== undefined && (
            <Box
              sx={{
                position: "absolute",
                top: -4,
                right: -4,
                minWidth: 16,
                height: 16,
                px: "4px",
                borderRadius: "8px",
                bgcolor: "error.main",
                color: "common.white",
                fontSize: 10,
                fontWeight: 700,
                lineHeight: "16px",
                textAlign: "center",
              }}
            >
              {item.badge}
            </Box>
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{
            flex: "1 1 auto",
            fontWeight: 600,
            letterSpacing: 0.2,
            whiteSpace: "nowrap",
            // White-on-dark glass body — no text-shadow required.
          }}
        >
          {item.label}
        </Typography>
      </ButtonBase>
    </Box>
  )
}
