import { useTheme } from "@mui/system"

export const CharacterCelebration1 = () => {
  const theme = useTheme()
  const ExpanseCharacterThemeProps =
    theme.components?.ExpanseCharacter.variants?.default

  // todo cleanup and implement properly
  return (
    <svg
      style={{
        height: "auto",
        maxHeight: "100%",
        width: "auto",
        maxWidth: "100%",
      }}
      viewBox="0 0 116 222"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 56V92.5V129"
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M53 129L66 171L43 209"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M66 129L86 170.5L66 212.5"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <circle
        cx="59.5"
        cy="23.5"
        r="16.5"
        fill={ExpanseCharacterThemeProps.limbColor}
      />
      <path
        d="M74 50L100 40L111.5 5"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
      <path
        d="M45.5 50L18 55.5L5 80"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
    </svg>
  )
}
