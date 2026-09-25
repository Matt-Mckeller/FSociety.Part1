"use client"
/**
 * ProfileModeToggle — 2D ⇄ 3D segmented switch
 * ============================================
 * The small built-in control rendered by {@link ProfileAvatar} when
 * `showToggle` is set. A plain MUI `ToggleButtonGroup` so it inherits the host
 * theme. Kept separate from the avatar so it can be restyled or replaced
 * without touching the render-switching logic.
 *
 * @module character/profile/ProfileModeToggle
 */
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import type { ProfileMode } from "./types"

export interface ProfileModeToggleProps {
  /** Currently active renderer. */
  mode: ProfileMode
  /** Fired when the user picks a renderer. */
  onChange: (mode: ProfileMode) => void
  /** Compact sizing for small avatars (default: false). */
  dense?: boolean
}

export function ProfileModeToggle({
  mode,
  onChange,
  dense = false,
}: ProfileModeToggleProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={mode}
      onChange={(_, next: ProfileMode | null) => {
        if (next) onChange(next)
      }}
      aria-label="Avatar renderer"
      sx={{
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 999,
        boxShadow: 1,
        "& .MuiToggleButton-root": {
          border: "none",
          borderRadius: 999,
          px: dense ? 1 : 1.5,
          py: dense ? 0.25 : 0.5,
          fontSize: dense ? 10 : 12,
          fontWeight: 700,
          lineHeight: 1,
          textTransform: "none",
        },
      }}
    >
      <ToggleButton value="2d" aria-label="2D renderer">
        2D
      </ToggleButton>
      <ToggleButton value="3d" aria-label="3D renderer">
        3D
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
