/**
 * Gamified Dark Theme
 * 
 * Vibrant game-inspired color palette with strong contrast, electric accents,
 * and high-saturation colors. Perfect for gaming interfaces, ability bars,
 * and action-oriented UIs.
 * 
 * Primary: Electric Cyan (#00d4ff) - Energy, tech, action
 * Secondary: Mint/Heal (#6bffc3) - Growth, healing, success
 * Accents: AI Purple (#8B5CF6), Warning Gold (#F59E0B), Danger Red (#EF4444)
 */

const gamifiedDarkPalette: any = {
  mode: "dark",
  background: {
    default: "#0a1520", // Deep blue-black (cyber bg)
    paper: "#1a2a3a",
    transparent: "#0a1520CC",
    light: "#2a3a4a",
    medium: "#1a3a4a",
    dark: "#050a10",
    backdrop: "#00000099",
    offsetBG: "#0f1f2f",
    contrastBG: "#1a3a4a",
  },
  action: {
    active: "#00d4ff8A",
    hover: "#00d4ff15",
    hoverOpacity: 0.08,
    selected: "#00d4ff25",
    selectedOpacity: 0.15,
    disabled: "#FFFFFF40",
    disabledBackground: "#FFFFFF15",
    disabledOpacity: 0.38,
    focus: "#00d4ff30",
    focusOpacity: 0.18,
    activatedOpacity: 0.18,
  },
  common: {
    black: "#050a10",
    white: "#FFFFFF",
    gray: "#2a3a4a",
  },
  primary: {
    // Electric Cyan - energy, tech, action
    highSaturation: "#00e5ff",
    main: "#00d4ff",
    dark: "#0088aa",
    light: "#66e5ff",
    contrastText: "#050a10",
    extra1: "#33ddff",
    extra2: "#00b8e0",
  },
  secondary: {
    // Mint - healing, growth, success
    main: "#6bffc3",
    light: "#a5ffda",
    dark: "#2cb87a",
    contrastText: "#050a10",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#a0c4d4",
    disabled: "rgba(255, 255, 255, 0.45)",
  },
  divider: "rgba(0, 212, 255, 0.18)",
  gradient: {
    primary: [
      { offset: 0, color: "#050a10" },
      { offset: 1, color: "#00d4ff" },
    ],
    background: [
      { offset: 0, color: "#050a10" },
      { offset: 0.5, color: "#0a1520" },
      { offset: 1, color: "#1a2a3a" },
    ],
    ability: [
      { offset: 0, color: "#00d4ff" },
      { offset: 0.5, color: "#8B5CF6" },
      { offset: 1, color: "#6bffc3" },
    ],
  },
  button: {
    textButtonColor: "#00d4ff",
  },
  surface: {
    default: "#0a1420",
    elevated: "#101c2c",
    glass: "rgba(10, 20, 32, 0.85)",
    tinted: "rgba(10, 20, 32, 0.95)",
    border: "rgba(0, 212, 255, 0.2)",
  },
  error: {
    // Danger Red - high visibility alert
    main: "#EF4444",
    light: "#f87171",
    dark: "#b91c1c",
    contrastText: "#FFFFFF",
  },
  success: {
    // Mint Success
    main: "#6bffc3",
    light: "#a5ffda",
    dark: "#2cb87a",
    contrastText: "#050a10",
  },
  warning: {
    // Ability Gold
    main: "#F59E0B",
    light: "#fbbf24",
    dark: "#d97706",
    contrastText: "#050a10",
  },
  info: {
    // AI Purple
    main: "#8B5CF6",
    light: "#a78bfa",
    dark: "#6d28d9",
    contrastText: "#FFFFFF",
  },
  // Game-specific colors
  ability: {
    cyan: "#00d4ff",
    mint: "#6bffc3",
    purple: "#8B5CF6",
    gold: "#F59E0B",
    red: "#EF4444",
    blue: "#3B82F6",
  },
}

const gamifiedDarkEmptyShadowArray: any = new Array(25).fill("none")

export { gamifiedDarkPalette, gamifiedDarkEmptyShadowArray }

