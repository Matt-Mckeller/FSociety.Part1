# Quick Start

## Installation

```bash
pnpm add @expanse/theme
```

## Basic Usage

### In Apps

```tsx
import { ThemeProvider } from "@expanse/theme"

function App() {
  return (
    <ThemeProvider initialTheme="purple" initialThemeMode="dark">
      <YourApp />
    </ThemeProvider>
  )
}
```

### In Components

```tsx
import { useTheme } from "@mui/material/styles"

function MyComponent() {
  const theme = useTheme()
  
  return (
    <div style={{ 
      color: theme.palette.text.primary,
      background: theme.palette.background.default 
    }}>
      Content
    </div>
  )
}
```

## ThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialTheme` | `ExpanseTheme` | `"purple"` | Color theme |
| `initialThemeMode` | `ThemeMode \| "system"` | `"light"` | Light/dark mode |
| `componentExtensions` | `ComponentExtensionMap` | - | Package theme configs |
| `children` | `ReactNode` | - | App content |

## Type Definitions

```ts
type ExpanseTheme = 
  | "purple" | "blue" | "red"      // Primary
  | "orange" | "neon" | "mono"     // Secondary  
  | "green" | "teal" | "gamified" | "gamified-desaturated"  // Tertiary

type ThemeMode = "light" | "dark"
```
