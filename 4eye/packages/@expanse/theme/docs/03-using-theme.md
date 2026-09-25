# Using Theme in Components

## Access Theme

```tsx
import { useTheme } from "@mui/material/styles"

function MyComponent() {
  const theme = useTheme()
  // theme.palette, theme.components, theme.spacing, etc.
}
```

## Standard Palette Values

```tsx
// Colors
theme.palette.primary.main
theme.palette.primary.light
theme.palette.primary.dark
theme.palette.secondary.main
theme.palette.error.main
theme.palette.success.main
theme.palette.warning.main
theme.palette.info.main

// Backgrounds
theme.palette.background.default  // Main bg
theme.palette.background.paper    // Card/surface bg

// Text
theme.palette.text.primary
theme.palette.text.secondary
theme.palette.text.disabled

// Mode
theme.palette.mode  // "light" | "dark"
```

## Custom Expanse Palette Extensions

```tsx
// Gradient colors
theme.palette.gradient.start
theme.palette.gradient.end

// Extra palette shades
theme.palette.primary.extra1
theme.palette.primary.extra2
```

## Component Theme Variants

Packages register component themes in `theme.components`:

```tsx
// Access brand-core Gem theme
const gemConfig = theme.components?.ExpanseGem?.variants?.default
// { strokeColor: "#...", fillColor: "#..." }

// Access layout GameDrawer theme  
const drawerConfig = theme.components?.ExpanseGameDrawer?.variants?.default
// { width: 280, ... }
```

## Using sx Prop

```tsx
<Box sx={{
  bgcolor: "background.default",
  color: "text.primary",
  borderColor: "primary.main",
  p: 2,  // theme.spacing(2)
}}>
```

## Never Hardcode Colors

```tsx
// ❌ Bad
<div style={{ color: "#ffffff" }}>

// ✅ Good
<div style={{ color: theme.palette.text.primary }}>

// ✅ Good with sx
<Box sx={{ color: "text.primary" }}>
```
