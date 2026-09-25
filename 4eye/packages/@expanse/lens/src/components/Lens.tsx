"use client"

/**
 * <Lens> — the dispatcher that turns a lens identity into an animated symbol.
 *
 * Three ways to call it:
 *   <Lens id="reframe" />                       // by registry id
 *   <Lens def={someLensDef} />                  // by LensDef object
 *   <Lens shell="prism" theme="improve" />      // ad-hoc, no registry entry
 *
 * Theme resolves to a palette automatically; an explicit `palette` overrides.
 * In "hands" icon mode (via prop or LensIconModeProvider) the same identity
 * renders as its hand-gesture pose instead of its shell.
 */

import type { ComponentType } from "react"
import type {
  LensDef,
  LensIconMode,
  LensMotion,
  LensPalette,
  LensShellId,
  LensShellProps,
  LensTheme,
} from "../core/types"
import { paletteFor } from "../core/palettes"
import { shellComponent } from "../shells/shellRegistry"
import { HAND_POSE_BY_SHELL, handPoseComponent } from "../hands/handRegistry"
import { getLens } from "../registry/lensRegistry"
import { useLensIconMode } from "./LensModeContext"

export interface LensProps {
  /** Registry id of the lens to render. */
  id?: string
  /** A LensDef object (takes precedence over `id`). */
  def?: LensDef
  /** Ad-hoc shell when not using a registry lens. */
  shell?: LensShellId
  /** Brand theme — drives the palette. Default "neutral". */
  theme?: LensTheme
  /** Motion personality. Defaults to the lens's motion or "steady". */
  motion?: LensMotion
  /** Square pixel size. Default 64. */
  size?: number
  /** Palette override (wins over theme). */
  palette?: LensPalette
  /** Whether to animate. Default true (respects reduced-motion). */
  animated?: boolean
  /** Icon mode override; defaults to the LensIconModeProvider mode. */
  mode?: LensIconMode
  /** Class on the root svg. */
  className?: string
  /** Accessible title. Defaults to the lens word. */
  title?: string
}

/** Resolve a {def | id | shell+theme} into concrete shell render props. */
function resolve(
  props: LensProps,
  mode: LensIconMode,
): { Shell: ComponentType<LensShellProps>; shellProps: LensShellProps } | null {
  const def = props.def ?? (props.id ? getLens(props.id) : undefined)

  const shell: LensShellId | undefined = def?.shell ?? props.shell
  if (!shell) return null

  const theme: LensTheme = def?.theme ?? props.theme ?? "neutral"
  const motion: LensMotion = props.motion ?? def?.motion ?? "steady"
  const palette = props.palette ?? paletteFor(theme)

  const Shell =
    mode === "hands"
      ? handPoseComponent(def?.handPose ?? HAND_POSE_BY_SHELL[shell])
      : shellComponent(shell)

  return {
    Shell,
    shellProps: {
      size: props.size,
      palette,
      motion,
      animated: props.animated,
      className: props.className,
      title: props.title ?? def?.word,
    },
  }
}

export function Lens(props: LensProps) {
  const { mode: contextMode } = useLensIconMode()
  const resolved = resolve(props, props.mode ?? contextMode)
  if (!resolved) return null
  const { Shell, shellProps } = resolved
  return <Shell {...shellProps} />
}
