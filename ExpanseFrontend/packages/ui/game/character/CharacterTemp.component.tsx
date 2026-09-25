import { useTheme } from "@mui/system"
import { ExpanseComponentsThemeProps } from "../../../../@types/expanse-theme"
import { Theme } from "@mui/material"

export const CharacterTemp = () => {
  const theme: Theme = useTheme()
  const { bodyColor, limbColor, headColor } = theme.components?.ExpanseCharacter
    ?.variants?.default || {
    bodyColor: "",
    limbColor: "",
    headColor: "",
  }
  if (!bodyColor || !limbColor || !headColor) {
    throw new Error("Missing theme properties for ExpanseCharacter")
  }

  return (
    <svg
      style={{
        height: "auto",
        maxHeight: "100%",
        width: "auto",
        maxWidth: "100%",
      }}
      viewBox="0 0 119 209"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M72.625 51.3311L52.2145 81.591L31.8039 111.851"
        stroke={bodyColor}
        data-id="body"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        data-id="arm"
        d="M75.737 46.107L81.237 73.1069L114.237 73.1069"
        stroke={limbColor}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
      <circle
        cx="90.3841"
        cy="24.1078"
        r="16.5"
        transform="rotate(34 90.3841 24.1078)"
        data-id="head"
        fill={headColor}
      />
      <path
        d="M32 112C30.4192 153.709 7 199 7 199"
        data-id="leg-1"
        stroke={limbColor}
        strokeOpacity="0.3"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M32.2475 112C42.9475 160.133 19 188 19 188"
        data-id="leg-2"
        stroke={limbColor}
        strokeOpacity="0.5"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M32 112C57.5 157.5 32 186 32 186"
        data-id="leg-3"
        stroke={limbColor}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M32 112C57.5 157.5 45 188 45 188"
        data-id="leg-4"
        stroke={limbColor}
        strokeOpacity="0.5"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M32 112C52.7944 147.709 57 198 57 198"
        data-id="leg-5"
        stroke={limbColor}
        strokeOpacity="0.3"
        strokeWidth="13"
        strokeLinecap="round"
      />
    </svg>
  )
}
