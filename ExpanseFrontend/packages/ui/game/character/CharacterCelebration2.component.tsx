import { useTheme } from "@mui/system"

export const CharacterCelebration2 = () => {
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
      viewBox="0 0 117 222"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M61 56V92.5V129"
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M54 129L67 171L44 209"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M67 129L87 170.5L67 212.5"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <circle
        cx="60.5"
        cy="23.5"
        r="16.5"
        fill={ExpanseCharacterThemeProps.headColor}
      />
      <path
        d="M75 50L101 40L112.5 5"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
      <path
        d="M46.5 50L27.9999 76L4.99988 61.5"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
    </svg>
  )
}
