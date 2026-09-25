// Mostly styling for now
export interface ExpanseCharacterThemeProps {
  styleOverrides?: {
    root?: {
      // This targets the base styles of the component.
      // These styles apply regardless of any variants or other props.
    }
  }
  variants?: {
    default?: {
      headColor: string
      limbColor: string
      bodyColor: string
    }
  }
}

export interface ProgressBarThemeProps {
  variants?: {
    default?: {
      outerDecorativeLayerStrokeColor: string
      outerDecorativeLayerFillColor: string
      innerBackgroundLayerFillColor: string
      innerProgressLayerFillColor: string
      textColor: string // Text color for WCAG AA contrast
    }
    defaultFilled?: {
      outerDecorativeLayerStrokeColor: string
      outerDecorativeLayerFillColor: string
      innerBackgroundLayerFillColor: string
      innerProgressLayerFillColor: string
      textColor: string // Text color for WCAG AA contrast
    }
  }
}
export interface GemThemeProps {
  variants?: {
    default?: {
      strokeColor: string
      fillColor: string
    }
    contrastBG?: {
      strokeColor: string
      fillColor: string
    }
  }
}
export interface ExperienceIconThemeProps {
  variants?: {
    default?: {
      fillColor: string
    }
    contrast?: {
      fillColor: string
    }
  }
}
export interface GameDrawerThemeProps {
  variants?: {
    default?: {
      width: number
    }
  }
}

export interface ExpandingBorderBoxVariantProps {
  outerBorderColor: string
  middleBorderColor: string
  innerBorderColor: string
}

export interface ExpandingBorderBoxThemeProps {
  variants?: {
    default?: ExpandingBorderBoxVariantProps
    subtle?: ExpandingBorderBoxVariantProps
    primary?: ExpandingBorderBoxVariantProps
    highContrast?: ExpandingBorderBoxVariantProps
  }
}

export interface ExpanseComponentsThemeProps {
  ExpanseCharacter?: ExpanseCharacterThemeProps
  ProgressBar?: ProgressBarThemeProps
  Gem?: GemThemeProps
  ExperienceIcon?: ExperienceIconThemeProps
  GameDrawer?: GameDrawerThemeProps
  ExpandingBorderBox?: ExpandingBorderBoxThemeProps
}

export const GameDrawerWidth = 240
