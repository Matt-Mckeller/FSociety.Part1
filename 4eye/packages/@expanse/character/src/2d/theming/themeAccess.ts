/**
 * Theme access for the 2D 4eye — decoupled from brand-core.
 * =========================================================
 * The 2D character can be tinted by an optional MUI theme extension
 * (`components.ExpanseCharacter`), registered by @expanse/brand-core's theme
 * factory. This package does NOT depend on that module augmentation; instead
 * it reads the extension defensively through a local cast, so the renderer
 * type-checks and runs under ANY theme (the colors simply fall back to the
 * standard MUI palette when the extension is absent).
 */

/** Face sub-config the 4eye may read from the theme extension. */
export interface ExpanseCharacterFaceProps {
  mouthStrokeColor: string
  eyePrimaryColor: string
  eyeSecondaryColor: string
}

/** The `default` variant of the optional ExpanseCharacter theme extension. */
export interface ExpanseCharacterDefaultVariant {
  headColor?: string
  limbColor?: string
  bodyColor?: string
  altLimbColor?: string
  altColor?: string
  face?: ExpanseCharacterFaceProps
}

/** The optional ExpanseCharacter theme extension shape. */
export interface ExpanseCharacterThemeProps {
  variants?: {
    default?: ExpanseCharacterDefaultVariant
  }
}

/** Read the optional ExpanseCharacter theme extension via a local cast. */
export function getExpanseCharacterTheme(theme: {
  components?: unknown
}): ExpanseCharacterThemeProps | undefined {
  return (
    theme.components as
      | { ExpanseCharacter?: ExpanseCharacterThemeProps }
      | undefined
  )?.ExpanseCharacter
}

interface PaletteColorLike {
  light?: string
  main?: string
  dark?: string
}

interface ThemeLike {
  components?: unknown
  palette?: {
    primary?: PaletteColorLike
    secondary?: PaletteColorLike
  }
}

/**
 * Resolve the `default` character variant as an ALWAYS-defined object.
 *
 * Reads the optional `components.ExpanseCharacter` theme extension and falls
 * back to the standard MUI palette when individual colors (or the whole
 * extension) are absent — so the 2D character is always tinted, never black
 * or invisible, under any theme.
 */
export function getCharacterVariant(
  theme: ThemeLike,
): ExpanseCharacterDefaultVariant {
  const ext = getExpanseCharacterTheme(theme)?.variants?.default
  const primary = theme.palette?.primary
  const secondary = theme.palette?.secondary
  return {
    headColor: ext?.headColor ?? primary?.light ?? primary?.main,
    bodyColor: ext?.bodyColor ?? primary?.main,
    limbColor: ext?.limbColor ?? primary?.light ?? primary?.main,
    altLimbColor: ext?.altLimbColor ?? primary?.dark,
    altColor: ext?.altColor ?? secondary?.main,
    face: ext?.face,
  }
}
