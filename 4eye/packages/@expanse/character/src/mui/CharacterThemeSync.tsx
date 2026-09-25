/**
 * CharacterThemeSync (WEB ONLY)
 * =============================
 * Drop this inside a <CharacterProvider>. It reads the active MUI theme,
 * derives a {@link CharacterPalette}, and pushes it into the character
 * context whenever the theme changes — so the 2D and 3D 4eye always match
 * the app's current theme/mode. Renders nothing.
 */

import { useEffect } from "react"
import { useTheme } from "@mui/material/styles"
import { useCharacter } from "../state"
import { createCharacterPaletteFromMuiTheme } from "./createCharacterPaletteFromMuiTheme"

export interface CharacterThemeSyncProps {
  /** Optional limb opacity override forwarded into the derived palette. */
  limbOpacity?: number
}

export function CharacterThemeSync({ limbOpacity }: CharacterThemeSyncProps) {
  const theme = useTheme()
  const { dispatch } = useCharacter()

  useEffect(() => {
    const palette = createCharacterPaletteFromMuiTheme(theme, { limbOpacity })
    dispatch({ type: "setPalette", palette })
  }, [theme, limbOpacity, dispatch])

  return null
}
