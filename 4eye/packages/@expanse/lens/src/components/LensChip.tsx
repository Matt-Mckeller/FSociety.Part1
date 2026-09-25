"use client"

/**
 * <LensChip> — an animated lens symbol paired with its word label.
 *
 * The building block for action orbs, pills, and gallery cards: a lens
 * glyph plus the symbol-language word, optionally stacked or inline.
 * Pure inline styles (no MUI dependency) so it works anywhere.
 */

import type { CSSProperties } from "react"
import type { LensDef, LensMotion, LensShellId, LensTheme } from "../core/types"
import { paletteFor } from "../core/palettes"
import { getLens } from "../registry/lensRegistry"
import { Lens } from "./Lens"

export interface LensChipProps {
  /** Registry id of the lens. */
  id?: string
  /** A LensDef object (takes precedence over `id`). */
  def?: LensDef
  /** Ad-hoc shell when not using a registry lens. */
  shell?: LensShellId
  /** Brand theme — drives palette + label tint. Default "neutral". */
  theme?: LensTheme
  /** Motion personality. */
  motion?: LensMotion
  /** Label override. Defaults to the lens word. */
  label?: string
  /** Hide the label, showing only the glyph. */
  hideLabel?: boolean
  /** Glyph pixel size. Default 48. */
  size?: number
  /** Layout direction. Default "column". */
  orientation?: "column" | "row"
  /** Whether to animate. Default true. */
  animated?: boolean
  /** Class on the root element. */
  className?: string
  /** Extra root styles. */
  style?: CSSProperties
}

export function LensChip(props: LensChipProps) {
  const {
    id,
    def,
    shell,
    theme,
    motion,
    label,
    hideLabel = false,
    size = 48,
    orientation = "column",
    animated,
    className,
    style,
  } = props

  const resolved = def ?? (id ? getLens(id) : undefined)
  const effectiveTheme: LensTheme = resolved?.theme ?? theme ?? "neutral"
  const text = label ?? resolved?.word ?? ""
  const palette = paletteFor(effectiveTheme)

  const root: CSSProperties = {
    display: "inline-flex",
    flexDirection: orientation === "row" ? "row" : "column",
    alignItems: "center",
    gap: orientation === "row" ? 10 : 6,
    ...style,
  }

  const labelStyle: CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.2,
    color: palette.base,
    whiteSpace: "nowrap",
  }

  return (
    <span className={className} style={root}>
      <Lens
        id={id}
        def={def}
        shell={shell}
        theme={theme}
        motion={motion}
        size={size}
        animated={animated}
        title={text || undefined}
      />
      {!hideLabel && text ? <span style={labelStyle}>{text}</span> : null}
    </span>
  )
}
