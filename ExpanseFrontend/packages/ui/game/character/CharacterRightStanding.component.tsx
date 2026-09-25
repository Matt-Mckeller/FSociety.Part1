import { useTheme } from "@mui/system"

export const CharacterRightStanding = () => {
  const theme = useTheme()
  const ExpanseCharacterThemeProps =
    theme.components?.ExpanseCharacter?.variants?.default

  // todo cleanup and implement properly
  return (
    <svg
      style={{
        height: "auto",
        maxHeight: "100%",
        width: "auto",
        maxWidth: "100%",
      }}
      viewBox="0 0 33 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 43.3999V71.8999V100.4"
        fill={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
      <path
        d="M17 49.3999V85.8999V122.4"
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M17 43.3999V71.8999V100.4"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
      <path
        d="M17 122.4V165.4V208.4"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M17 122.4V165.4V208.4"
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <circle
        cx="16.5"
        cy="16.8999"
        r="16.5"
        fill={ExpanseCharacterThemeProps.headColor}
      />
    </svg>
  )
}
