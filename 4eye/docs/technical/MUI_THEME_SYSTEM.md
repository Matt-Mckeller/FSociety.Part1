# MUI Theme System

Complete guide to the Material-UI theme system with multi-theme support, light/dark modes, and customization.

---

## System Overview

### **Multi-Theme Architecture**

**Color Themes:**
- **Primary** - Default 4eye brand colors
- **Blue** - Blue accent theme
- **Green** - Green accent theme
- **Orange** - Orange accent theme

**Mode Support:**
- **Light mode** - Light backgrounds
- **Dark mode** - Dark backgrounds

**Total combinations:** 4 themes × 2 modes = 8 theme variations

---

## Architecture

### **Package Structure**

```
packages/@expanse/theme/
├── src/
│   ├── Brand/                       # Color theme definitions
│   │   ├── primary/
│   │   │   ├── light.ts             # Primary light palette
│   │   │   └── dark.ts              # Primary dark palette
│   │   ├── blue/
│   │   │   ├── light.ts
│   │   │   └── dark.ts
│   │   ├── green/
│   │   │   ├── light.ts
│   │   │   └── dark.ts
│   │   └── orange/
│   │       ├── light.ts
│   │       └── dark.ts
│   │
│   ├── configs/                     # Shared theme configurations
│   │   ├── common-theme.ts          # Typography, breakpoints, components
│   │   ├── light-base.ts            # Light mode base
│   │   └── dark-base.ts             # Dark mode base
│   │
│   ├── context/                     # Theme provider and switching
│   │   └── ThemeProvider.tsx
│   │
│   ├── hooks/                       # Theme hooks
│   │   ├── useTheme.ts              # Get current theme
│   │   ├── useThemeMode.ts          # Light/dark mode
│   │   └── useThemeColor.ts         # Color theme
│   │
│   ├── utils/                       # Theme utilities
│   │   ├── createTheme.ts           # Theme factory
│   │   └── cookies.ts               # Theme persistence
│   │
│   └── index.ts                     # Public API
```

---

## Color Palettes

### **Primary Theme**

```typescript
// packages/@expanse/theme/src/Brand/primary/light.ts

export const primaryLightPalette = {
  mode: 'light' as const,
  primary: {
    main: '#4285f4',      // 4eye primary blue
    light: '#669df6',
    dark: '#1a73e8',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#34a853',      // Green accent
    light: '#57bb71',
    dark: '#0f9d58',
    contrastText: '#ffffff',
  },
  error: {
    main: '#ea4335',
    light: '#ef6c5f',
    dark: '#c5221f',
  },
  warning: {
    main: '#fbbc04',
    light: '#fccf4d',
    dark: '#f29900',
  },
  info: {
    main: '#4285f4',
  },
  success: {
    main: '#34a853',
  },
  background: {
    default: '#f8f9fa',
    paper: '#ffffff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
};
```

```typescript
// packages/@expanse/theme/src/Brand/primary/dark.ts

export const primaryDarkPalette = {
  mode: 'dark' as const,
  primary: {
    main: '#8ab4f8',      // Lighter blue for dark mode
    light: '#aac7fa',
    dark: '#669df6',
    contrastText: '#202124',
  },
  secondary: {
    main: '#81c995',
    light: '#a4ddb3',
    dark: '#5bb974',
    contrastText: '#202124',
  },
  error: {
    main: '#f28b82',
  },
  warning: {
    main: '#fdd663',
  },
  background: {
    default: '#202124',
    paper: '#292a2d',
  },
  text: {
    primary: '#e8eaed',
    secondary: '#9aa0a6',
    disabled: '#5f6368',
  },
};
```

### **Blue/Green/Orange Themes**

Similar structure with different color values. See `packages/@expanse/theme/src/Brand/` for complete definitions.

---

## Typography

### **Custom Type Scale**

```typescript
// packages/@expanse/theme/src/configs/common-theme.ts

export const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  
  // Standard MUI variants
  h1: {
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.6,
  },
  
  // Custom variants
  cardTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  dialogTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  link: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};
```

### **Using Custom Typography**

```typescript
// In components
import { Typography } from '@mui/material';

<Typography variant="cardTitle">Card Heading</Typography>
<Typography variant="dialogTitle">Dialog Title</Typography>
<Typography variant="sectionTitle">Section Title</Typography>
<Typography variant="link" component="a" href="#">Click here</Typography>
```

---

## Breakpoints

### **Custom Breakpoints**

```typescript
// packages/@expanse/theme/src/configs/common-theme.ts

export const breakpoints = {
  values: {
    xs: 0,          // Mobile (default)
    sm: 600,        // Tablet
    md: 960,        // Small laptop
    lg: 1280,       // Desktop
    xl: 1920,       // Large desktop
  },
};

// Optional: Add custom breakpoints
export const customBreakpoints = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  fourK: 2560,
};
```

### **Responsive Styling**

```typescript
// Using theme breakpoints in sx prop
<Box
  sx={{
    padding: 2,
    // Responsive padding
    [theme.breakpoints.up('md')]: {
      padding: 4,
    },
    [theme.breakpoints.up('lg')]: {
      padding: 6,
    },
  }}
>
  Content
</Box>
```

---

## Component Overrides

### **Global Component Styles**

```typescript
// packages/@expanse/theme/src/configs/common-theme.ts

export function getComponents(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // No uppercase
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
      },
    },
    
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  };
}
```

---

## Theme Provider

### **Implementation**

```typescript
// packages/@expanse/theme/src/context/ThemeProvider.tsx

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '../utils/createTheme';
import { getCookie, setCookie } from '../utils/cookies';

type ThemeColor = 'primary' | 'blue' | 'green' | 'orange';
type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeColor: ThemeColor;
  themeMode: ThemeMode;
  setThemeColor: (color: ThemeColor) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
}

export function ThemeProvider({
  children,
  initialThemeColor = 'primary',
  initialThemeMode = 'light',
}: {
  children: React.ReactNode;
  initialThemeColor?: ThemeColor;
  initialThemeMode?: ThemeMode;
}) {
  // Load from cookies or use initial values
  const [themeColor, setThemeColorState] = useState<ThemeColor>(
    () => (getCookie('themeColor') as ThemeColor) || initialThemeColor
  );
  const [themeMode, setThemeModeState] = useState<ThemeMode>(
    () => (getCookie('themeMode') as ThemeMode) || initialThemeMode
  );

  // Save to cookies on change
  const setThemeColor = useCallback((color: ThemeColor) => {
    setThemeColorState(color);
    setCookie('themeColor', color, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    setCookie('themeMode', mode, { maxAge: 60 * 60 * 24 * 365 });
  }, []);

  const toggleThemeMode = useCallback(() => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  }, [themeMode, setThemeMode]);

  // Create theme based on current color and mode
  const theme = useMemo(
    () => createTheme(themeColor, themeMode),
    [themeColor, themeMode]
  );

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        themeMode,
        setThemeColor,
        setThemeMode,
        toggleThemeMode,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
```

### **Theme Factory**

```typescript
// packages/@expanse/theme/src/utils/createTheme.ts

import { createTheme as createMuiTheme } from '@mui/material/styles';
import { primaryLightPalette, primaryDarkPalette } from '../Brand/primary';
import { blueLightPalette, blueDarkPalette } from '../Brand/blue';
import { greenLightPalette, greenDarkPalette } from '../Brand/green';
import { orangeLightPalette, orangeDarkPalette } from '../Brand/orange';
import { typography, breakpoints, getComponents } from '../configs/common-theme';

const palettes = {
  primary: { light: primaryLightPalette, dark: primaryDarkPalette },
  blue: { light: blueLightPalette, dark: blueDarkPalette },
  green: { light: greenLightPalette, dark: greenDarkPalette },
  orange: { light: orangeLightPalette, dark: orangeDarkPalette },
};

export function createTheme(color: ThemeColor, mode: ThemeMode) {
  const palette = palettes[color][mode];
  
  const theme = createMuiTheme({
    palette,
    typography,
    breakpoints,
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
  });

  // Add component overrides (needs theme for responsive styles)
  theme.components = getComponents(theme);

  return theme;
}
```

---

## Theme Hooks

### **useTheme**

```typescript
// packages/@expanse/theme/src/hooks/useTheme.ts

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function MyComponent() {
  const { themeColor, themeMode, setThemeColor, toggleThemeMode } = useTheme();
  
  return (
    <Box>
      <Typography>Current: {themeColor} / {themeMode}</Typography>
      <Button onClick={() => setThemeColor('blue')}>Switch to Blue</Button>
      <Button onClick={toggleThemeMode}>Toggle Mode</Button>
    </Box>
  );
}
```

### **useThemeMode**

```typescript
// packages/@expanse/theme/src/hooks/useThemeMode.ts

export function useThemeMode() {
  const { themeMode, setThemeMode, toggleThemeMode } = useTheme();
  return { themeMode, setThemeMode, toggleThemeMode };
}

// Usage
function ThemeModeToggle() {
  const { themeMode, toggleThemeMode } = useThemeMode();
  
  return (
    <IconButton onClick={toggleThemeMode}>
      {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
```

### **useThemeColor**

```typescript
// packages/@expanse/theme/src/hooks/useThemeColor.ts

export function useThemeColor() {
  const { themeColor, setThemeColor } = useTheme();
  return { themeColor, setThemeColor };
}

// Usage
function ThemeColorPicker() {
  const { themeColor, setThemeColor } = useThemeColor();
  
  const colors: ThemeColor[] = ['primary', 'blue', 'green', 'orange'];
  
  return (
    <Box>
      {colors.map((color) => (
        <Button
          key={color}
          variant={themeColor === color ? 'contained' : 'outlined'}
          onClick={() => setThemeColor(color)}
        >
          {color}
        </Button>
      ))}
    </Box>
  );
}
```

---

## Usage in Apps

### **App Setup**

```typescript
// apps/4eye-web/app/providers.tsx

import { ThemeProvider } from '@expanse/theme';
import { AuthProvider } from '@expanse/auth';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider initialThemeColor="primary" initialThemeMode="light">
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
```

```typescript
// apps/4eye-web/app/layout.tsx

import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

### **Component Styling**

**Using sx prop:**
```typescript
<Box
  sx={{
    backgroundColor: 'background.paper',
    color: 'text.primary',
    padding: 3,
    borderRadius: 2,
  }}
>
  Content
</Box>
```

**Using theme directly:**
```typescript
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(3),
      }}
    >
      Content
    </Box>
  );
}
```

---

## Theme Switching UI

### **Settings Dialog**

```typescript
// apps/4eye-web/modules/settings/ThemeSettings.tsx

import { useTheme } from '@expanse/theme';

export function ThemeSettings() {
  const { themeColor, themeMode, setThemeColor, setThemeMode } = useTheme();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Theme Settings
      </Typography>

      {/* Color Theme */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel>Color Theme</FormLabel>
        <RadioGroup value={themeColor} onChange={(e) => setThemeColor(e.target.value as ThemeColor)}>
          <FormControlLabel value="primary" control={<Radio />} label="Primary" />
          <FormControlLabel value="blue" control={<Radio />} label="Blue" />
          <FormControlLabel value="green" control={<Radio />} label="Green" />
          <FormControlLabel value="orange" control={<Radio />} label="Orange" />
        </RadioGroup>
      </FormControl>

      {/* Light/Dark Mode */}
      <FormControl fullWidth>
        <FormLabel>Appearance</FormLabel>
        <RadioGroup value={themeMode} onChange={(e) => setThemeMode(e.target.value as ThemeMode)}>
          <FormControlLabel value="light" control={<Radio />} label="Light Mode" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark Mode" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
```

### **Quick Theme Toggle**

```typescript
// apps/4eye-web/modules/layout/PageHeader.tsx

import { useTheme } from '@expanse/theme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export function PageHeader() {
  const { themeMode, toggleThemeMode } = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          4eye
        </Typography>
        
        <IconButton onClick={toggleThemeMode} color="inherit">
          {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
```

---

## Extending Themes

### **Adding New Color Theme**

**1. Create palette files:**

```typescript
// packages/@expanse/theme/src/Brand/purple/light.ts

export const purpleLightPalette = {
  mode: 'light' as const,
  primary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
  },
  // ... rest of palette
};
```

**2. Update theme factory:**

```typescript
// packages/@expanse/theme/src/utils/createTheme.ts

import { purpleLightPalette, purpleDarkPalette } from '../Brand/purple';

const palettes = {
  primary: { light: primaryLightPalette, dark: primaryDarkPalette },
  blue: { light: blueLightPalette, dark: blueDarkPalette },
  green: { light: greenLightPalette, dark: greenDarkPalette },
  orange: { light: orangeLightPalette, dark: orangeDarkPalette },
  purple: { light: purpleLightPalette, dark: purpleDarkPalette }, // Added
};
```

**3. Update types:**

```typescript
// packages/@expanse/theme/src/types.ts

export type ThemeColor = 'primary' | 'blue' | 'green' | 'orange' | 'purple';
```

### **Customizing Typography**

```typescript
// Add custom variant
declare module '@mui/material/styles' {
  interface TypographyVariants {
    customVariant: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    customVariant?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    customVariant: true;
  }
}

// In theme config
export const typography = {
  // ... existing variants
  customVariant: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
};
```

---

## Analytics Integration

### **Track Theme Changes**

```typescript
// packages/@expanse/theme/src/context/ThemeProvider.tsx

import { useAnalytics } from '@expanse/analytics';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { trackEvent } = useAnalytics();

  const setThemeColor = useCallback((color: ThemeColor) => {
    setThemeColorState(color);
    setCookie('themeColor', color, { maxAge: 60 * 60 * 24 * 365 });
    
    // Track theme change
    trackEvent('theme_color_changed', { color });
  }, [trackEvent]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    setCookie('themeMode', mode, { maxAge: 60 * 60 * 24 * 365 });
    
    // Track mode change
    trackEvent('theme_mode_changed', { mode });
  }, [trackEvent]);

  // ... rest of implementation
}
```

---

## Server-Side Rendering (SSR)

### **Next.js Setup**

```typescript
// apps/4eye-web/app/layout.tsx

import { cookies } from 'next/headers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Read theme from cookies on server
  const cookieStore = cookies();
  const themeColor = cookieStore.get('themeColor')?.value || 'primary';
  const themeMode = cookieStore.get('themeMode')?.value || 'light';

  return (
    <html lang="en">
      <body>
        <Providers initialThemeColor={themeColor} initialThemeMode={themeMode}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

**Why:** Prevents flash of wrong theme on page load.

---

## Testing

### **Theme Testing**

```typescript
// packages/@expanse/theme/__tests__/ThemeProvider.test.tsx

describe('ThemeProvider', () => {
  it('should switch theme color', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider initialThemeColor="primary">
          {children}
        </ThemeProvider>
      ),
    });

    expect(result.current.themeColor).toBe('primary');

    act(() => {
      result.current.setThemeColor('blue');
    });

    expect(result.current.themeColor).toBe('blue');
  });

  it('should toggle theme mode', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider initialThemeMode="light">
          {children}
        </ThemeProvider>
      ),
    });

    expect(result.current.themeMode).toBe('light');

    act(() => {
      result.current.toggleThemeMode();
    });

    expect(result.current.themeMode).toBe('dark');
  });
});
```

---

## Best Practices

### **Don'ts**

❌ **Hardcode colors in components:**
```typescript
// Bad
<Box sx={{ backgroundColor: '#4285f4' }}>Content</Box>
```

✅ **Use theme palette:**
```typescript
// Good
<Box sx={{ backgroundColor: 'primary.main' }}>Content</Box>
```

❌ **Hardcode breakpoints:**
```typescript
// Bad
<Box sx={{ '@media (min-width: 960px)': { padding: 4 } }}>Content</Box>
```

✅ **Use theme breakpoints:**
```typescript
// Good
<Box sx={{ [theme.breakpoints.up('md')]: { padding: 4 } }}>Content</Box>
```

### **Do's**

✅ **Use theme spacing:**
```typescript
<Box sx={{ padding: 3, margin: 2 }}>  // 3 × 8px = 24px, 2 × 8px = 16px
```

✅ **Use semantic colors:**
```typescript
<Alert severity="error">  // Uses theme error color
<Alert severity="success">  // Uses theme success color
```

✅ **Leverage component overrides:**
```typescript
// All buttons automatically have theme overrides applied
<Button variant="contained">Button</Button>
```

---

## Custom Component Variants & Theme Integration

When creating custom reusable components with complex styling needs, define **variant-based configurations** in the theme itself. This pattern allows components to access theme-aware variants that automatically adapt to color themes and light/dark modes.

### **Pattern: Theme-Defined Component Variants**

**Define component variants in theme configuration:**

```typescript
// packages/@expanse/theme/src/configs/primary-light-theme.ts

import { Palette } from '@mui/material/styles';

export const primaryLightThemePalette: Palette = {
  mode: 'light',
  primary: { main: '#6200EA', dark: '#4A148C', light: '#B388FF' },
  common: { black: '#000000', white: '#FFFFFF' },
  // ... rest of palette
};

// Custom component theme configurations
export const primaryLightComponents: ExpanseComponentsThemeProps = {
  // Experience Icon with variants
  ExperienceIcon: {
    variants: {
      default: {
        fillColor: primaryLightThemePalette.common.black,
      },
      contrast: {
        fillColor: primaryLightThemePalette.common.white,
      },
    },
  },
  
  // Progress Bar with multiple variants
  ProgressBar: {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: '#4A148C',
        outerDecorativeLayerFillColor: primaryLightThemePalette.primary.main,
        innerBackgroundLayerFillColor: primaryLightThemePalette.common.white,
        innerProgressLayerFillColor: '#4A148C',
        textColor: primaryLightThemePalette.common.black,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: primaryLightThemePalette.primary.main,
        outerDecorativeLayerFillColor: primaryLightThemePalette.common.white,
        innerBackgroundLayerFillColor: primaryLightThemePalette.primary.main,
        innerProgressLayerFillColor: primaryLightThemePalette.primary.main,
        textColor: primaryLightThemePalette.common.white,
      },
    },
  },
  
  // Gem with background-aware variants
  Gem: {
    variants: {
      default: {
        strokeColor: primaryLightThemePalette.common.black,
        fillColor: primaryLightThemePalette.primary.light,
      },
      contrastBG: {
        strokeColor: primaryLightThemePalette.common.black,
        fillColor: primaryLightThemePalette.common.white,
      },
    },
  },
  
  // Expanding Border Box with visual hierarchy
  ExpandingBorderBox: {
    variants: {
      default: {
        outerBorderColor: 'rgba(0, 0, 0, 0.25)',
        middleBorderColor: 'rgba(0, 0, 0, 0.50)',
        innerBorderColor: 'rgba(0, 0, 0, 0.85)',
      },
      subtle: {
        outerBorderColor: 'rgba(0, 0, 0, 0.12)',
        middleBorderColor: 'rgba(0, 0, 0, 0.22)',
        innerBorderColor: 'rgba(0, 0, 0, 0.35)',
      },
      primary: {
        outerBorderColor: primaryLightThemePalette.primary.light,
        middleBorderColor: primaryLightThemePalette.primary.main,
        innerBorderColor: primaryLightThemePalette.primary.dark,
      },
    },
  },
};
```

### **Consuming Custom Variants in Components**

**Access variant configuration via theme:**

```typescript
// packages/@expanse/ui/src/components/ExperienceIcon.tsx

import { useTheme } from '@mui/material/styles';

interface ExperienceIconProps {
  variant?: 'default' | 'contrast';
  size?: number;
}

export function ExperienceIcon({ 
  variant = 'default', 
  size = 24 
}: ExperienceIconProps) {
  const theme = useTheme();
  
  // Access custom component configuration from theme
  const config = theme.components?.ExperienceIcon?.variants?.[variant];
  
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z"
        fill={config?.fillColor || theme.palette.common.black}
      />
    </svg>
  );
}
```

**Usage:**

```typescript
// Light background
<ExperienceIcon variant="default" />  // Black icon

// Dark background
<ExperienceIcon variant="contrast" />  // White icon
```

### **Type Safety for Custom Components**

**Define TypeScript types for theme extensions:**

```typescript
// packages/@expanse/theme/src/types/theme-extensions.ts

export interface ExperienceIconVariants {
  default: {
    fillColor: string;
  };
  contrast: {
    fillColor: string;
  };
}

export interface ProgressBarVariants {
  default: {
    outerDecorativeLayerStrokeColor: string;
    outerDecorativeLayerFillColor: string;
    innerBackgroundLayerFillColor: string;
    innerProgressLayerFillColor: string;
    textColor: string;
  };
  defaultFilled: {
    outerDecorativeLayerStrokeColor: string;
    outerDecorativeLayerFillColor: string;
    innerBackgroundLayerFillColor: string;
    innerProgressLayerFillColor: string;
    textColor: string;
  };
}

export interface ExpanseComponentsThemeProps {
  ExperienceIcon?: {
    variants: ExperienceIconVariants;
  };
  ProgressBar?: {
    variants: ProgressBarVariants;
  };
  Gem?: {
    variants: {
      default: { strokeColor: string; fillColor: string };
      contrastBG: { strokeColor: string; fillColor: string };
    };
  };
  ExpandingBorderBox?: {
    variants: Record<string, {
      outerBorderColor: string;
      middleBorderColor: string;
      innerBorderColor: string;
    }>;
  };
}

// Extend MUI Theme type
declare module '@mui/material/styles' {
  interface Theme {
    components?: ExpanseComponentsThemeProps;
  }
  interface ThemeOptions {
    components?: ExpanseComponentsThemeProps;
  }
}
```

### **Assembling Theme with Custom Components**

**Combine palette, MUI overrides, and custom components:**

```typescript
// packages/@expanse/theme/src/themes/primary-light.ts

import { createTheme } from '@mui/material/styles';
import { primaryLightThemePalette, primaryLightComponents } from '../configs/primary-light-theme';

export const primaryLightTheme = createTheme({
  palette: primaryLightThemePalette,
  
  // MUI component overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    // ... other MUI overrides
  },
  
  // Custom Expanse components
  ...primaryLightComponents,
});
```

### **Benefits of Theme-Defined Variants**

**1. Automatic Theme Switching:**
```typescript
// Component automatically adapts to theme changes
<ThemeProvider themeColor="primary">
  <ExperienceIcon variant="default" />
</ThemeProvider>

// Switch theme, icon color changes automatically
<ThemeProvider themeColor="blue">
  <ExperienceIcon variant="default" />  
</ThemeProvider>
```

**2. Consistent Across Color Themes:**
- Primary theme uses purple tones
- Blue theme uses blue tones  
- Green theme uses green tones
- Orange theme uses orange tones

All variants reference `theme.palette`, so colors stay consistent.

**3. Light/Dark Mode Support:**
```typescript
// Light mode: Black icon
<ThemeProvider themeMode="light">
  <ExperienceIcon variant="default" />
</ThemeProvider>

// Dark mode: White icon  
<ThemeProvider themeMode="dark">
  <ExperienceIcon variant="default" />
</ThemeProvider>
```

**4. Centralized Configuration:**

All variant definitions in one place:
- `primary-light-theme.ts`
- `primary-dark-theme.ts`
- `blue-light-theme.ts`
- `blue-dark-theme.ts`
- etc.

Easy to maintain consistency across all 8 theme variations.

### **Advanced: Complex Multi-Layer Components**

**For components with multiple configurable layers:**

```typescript
// packages/@expanse/ui/src/components/ProgressBar.tsx

export function ProgressBar({ 
  variant = 'default',
  progress = 0 
}: ProgressBarProps) {
  const theme = useTheme();
  const config = theme.components?.ProgressBar?.variants?.[variant];
  
  return (
    <svg width="200" height="40" viewBox="0 0 200 40">
      {/* Outer decorative layer */}
      <rect
        x="0" y="0" width="200" height="40" rx="20"
        stroke={config?.outerDecorativeLayerStrokeColor}
        fill={config?.outerDecorativeLayerFillColor}
        strokeWidth="2"
      />
      
      {/* Inner background layer */}
      <rect
        x="4" y="4" width="192" height="32" rx="16"
        fill={config?.innerBackgroundLayerFillColor}
      />
      
      {/* Inner progress layer */}
      <rect
        x="4" y="4" 
        width={192 * (progress / 100)} 
        height="32" rx="16"
        fill={config?.innerProgressLayerFillColor}
      />
      
      {/* Text */}
      <text
        x="100" y="24"
        textAnchor="middle"
        fill={config?.textColor}
        fontSize="14"
        fontWeight="600"
      >
        {progress}%
      </text>
    </svg>
  );
}
```

**Usage with different variants:**

```typescript
// Standard progress bar
<ProgressBar variant="default" progress={75} />

// Filled/inverted style
<ProgressBar variant="defaultFilled" progress={75} />
```

Both variants automatically adapt to current theme color and mode.

### **Color Utilities & Helpers**

**Use MUI's color manipulation utilities:**

```typescript
import { alpha, darken, lighten } from '@mui/material/styles';

// Alpha channel (transparency)
const semiTransparent = alpha(theme.palette.primary.main, 0.5);
// Result: 'rgba(98, 0, 234, 0.5)'

// Darken color
const darker = darken(theme.palette.primary.main, 0.2);
// Result: Darker shade of primary

// Lighten color
const lighter = lighten(theme.palette.primary.main, 0.3);
// Result: Lighter tint of primary
```

**Using in variant definitions:**

```typescript
export const primaryLightComponents: ExpanseComponentsThemeProps = {
  HoverCard: {
    variants: {
      default: {
        backgroundColor: primaryLightThemePalette.background.paper,
        hoverBackgroundColor: alpha(primaryLightThemePalette.primary.main, 0.08),
        borderColor: primaryLightThemePalette.divider,
        hoverBorderColor: primaryLightThemePalette.primary.main,
      },
    },
  },
};
```

**Gradient utilities:**

```typescript
import { alpha } from '@mui/material/styles';

// Gradient with alpha channel
const gradient = `linear-gradient(135deg, 
  ${alpha(theme.palette.primary.main, 0.2)} 0%, 
  ${alpha(theme.palette.primary.dark, 0.4)} 100%
)`;

// Multi-stop gradient
const complexGradient = `linear-gradient(180deg,
  ${theme.palette.primary.light} 0%,
  ${theme.palette.primary.main} 50%,
  ${theme.palette.primary.dark} 100%
)`;
```

### **Best Practices**

**✅ DO:**

1. **Define variants in theme configs:**
   ```typescript
   // primary-light-theme.ts
   ExperienceIcon: {
     variants: {
       default: { fillColor: palette.common.black }
     }
   }
   ```

2. **Reference theme palette in variants:**
   ```typescript
   fillColor: primaryLightThemePalette.primary.main  // ✅ Good
   ```

3. **Use alpha() for transparency:**
   ```typescript
   backgroundColor: alpha(theme.palette.primary.main, 0.1)
   ```

4. **Create separate configs for light/dark:**
   - `primary-light-theme.ts`
   - `primary-dark-theme.ts`

5. **Use TypeScript for type safety:**
   ```typescript
   interface ExperienceIconVariants { ... }
   ```

**❌ DON'T:**

1. **Hardcode colors in variants:**
   ```typescript
   fillColor: '#6200EA'  // ❌ Bad - won't adapt to theme changes
   ```

2. **Duplicate configurations:**
   ```typescript
   // ❌ Bad - DRY violation
   ExperienceIcon: { variants: { ... } }  // In every theme file
   ```
   
   Instead, use theme factory or shared config builder.

3. **Skip TypeScript types:**
   - Type safety prevents runtime errors
   - Autocomplete improves DX

4. **Mix theme variants with inline styles:**
   ```typescript
   // ❌ Bad - inconsistent approach
   <ExperienceIcon variant="default" style={{ fill: '#000' }} />
   ```

### **Migration Strategy**

**Migrating existing components to theme variants:**

**Before (Inline styles):**
```typescript
export function OldIcon({ light }: { light?: boolean }) {
  const fillColor = light ? '#FFFFFF' : '#000000';
  
  return <svg><path fill={fillColor} /></svg>;
}
```

**After (Theme variants):**

1. **Define theme variant:**
   ```typescript
   // theme config
   OldIcon: {
     variants: {
       default: { fillColor: palette.common.black },
       contrast: { fillColor: palette.common.white },
     }
   }
   ```

2. **Update component:**
   ```typescript
   export function OldIcon({ variant = 'default' }: { variant?: 'default' | 'contrast' }) {
     const theme = useTheme();
     const config = theme.components?.OldIcon?.variants?.[variant];
     
     return <svg><path fill={config?.fillColor} /></svg>;
   }
   ```

3. **Update usage:**
   ```typescript
   // Before
   <OldIcon light />
   
   // After
   <OldIcon variant="contrast" />
   ```

---

## Fonts

### **Xpens Font Family**

The Xpens font is the primary brand font, stored in `@expanse/theme/src/font/`.

**Available Weights:**
| Weight | Value | Files |
|--------|-------|-------|
| Thin | 100 | Xpens-Thin.ttf, Xpens-ThinItalic.ttf |
| Extra Light | 200 | Xpens-ExtraLight.ttf, Xpens-ExtraLightItalic.ttf |
| Light | 300 | Xpens-Light.ttf, Xpens-LightItalic.ttf |
| Regular | 400 | Xpens-Regular.ttf, Xpens-Italic.ttf |
| Medium | 500 | Xpens-Medium.ttf, Xpens-MediumItalic.ttf |
| Semi Bold | 600 | Xpens-SemiBold.ttf, Xpens-SemiBoldItalic.ttf |
| Bold | 700 | Xpens-Bold.ttf, Xpens-BoldItalic.ttf |
| Extra Bold | 800 | Xpens-ExtraBold.ttf, Xpens-ExtraBoldItalic.ttf |
| Black | 900 | Xpens-Black.ttf, Xpens-BlackItalic.ttf |

### **Font Loading - Next.js**

```typescript
// app/fonts.ts
import localFont from 'next/font/local';

export const xpens = localFont({
  src: [
    { path: './fonts/Xpens-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Xpens-Bold.ttf', weight: '700', style: 'normal' },
    // ... add weights as needed
  ],
  variable: '--font-xpens',
  display: 'swap',
});

// layout.tsx
<html className={xpens.variable}>
```

> **Note:** Due to `next/font/local` limitations, fonts must be copied to the app directory. See `@expanse/theme/src/fonts/README.md` for details.

### **Font Metadata Exports**

```typescript
import { fontFamily, fontWeights, fontFiles } from '@expanse/theme';

// Use in theme config
typography: {
  fontFamily: fontFamily.xpens,
}
```

---

## Theme UI Components

### **LightDarkModeToggle**

Toggle switch for light/dark mode with accessibility support.

```typescript
import { LightDarkModeToggle } from '@expanse/theme';

<LightDarkModeToggle />
<LightDarkModeToggle size="small" showLabels />
<LightDarkModeToggle size="large" />
```

**Props:**
- `size` - `'small' | 'medium' | 'large'` (default: `'medium'`)
- `showLabels` - Show "Light" / "Dark" labels (default: `false`)

### **ThemeColorSelector**

Carousel for selecting color themes with slide animation.

```typescript
import { ThemeColorSelector } from '@expanse/theme';

<ThemeColorSelector />
<ThemeColorSelector visibleCount={3} />
<ThemeColorSelector colors={['primary', 'blue', 'green']} />
```

**Props:**
- `visibleCount` - Number of colors visible at once (default: `5`)
- `colors` - Array of theme colors to show (default: all 6)

---

## Related Documentation

- **[PACKAGE_ARCHITECTURE.md](PACKAGE_ARCHITECTURE.md)** - Package organization
- **[COMPONENT_PATTERNS.md](examples/COMPONENT_PATTERNS.md)** - Component patterns
- **[MIGRATION_GUIDE.md](../planning/MIGRATION_GUIDE.md)** - Migration strategy
- **[MONOREPO_STRUCTURE.md](MONOREPO_STRUCTURE.md)** - Complete structure
