# Xpens Font Usage

This directory contains metadata exports for the Xpens font family. The actual font files are in the adjacent `font/` directory.

## Font Files Location

```
@expanse/theme/src/
├── font/                  # TTF files (18 variants + license)
│   ├── Xpens-Regular.ttf
│   ├── Xpens-Bold.ttf
│   ├── ... (all weights × normal/italic)
│   └── OFL.txt           # Open Font License
└── fonts/
    ├── index.ts          # Metadata exports (this package)
    └── README.md         # This file
```

## Available Weights

| Weight | Value | Normal File | Italic File |
|--------|-------|-------------|-------------|
| Thin | 100 | Xpens-Thin.ttf | Xpens-ThinItalic.ttf |
| Extra Light | 200 | Xpens-ExtraLight.ttf | Xpens-ExtraLightItalic.ttf |
| Light | 300 | Xpens-Light.ttf | Xpens-LightItalic.ttf |
| Regular | 400 | Xpens-Regular.ttf | Xpens-Italic.ttf |
| Medium | 500 | Xpens-Medium.ttf | Xpens-MediumItalic.ttf |
| Semi Bold | 600 | Xpens-SemiBold.ttf | Xpens-SemiBoldItalic.ttf |
| Bold | 700 | Xpens-Bold.ttf | Xpens-BoldItalic.ttf |
| Extra Bold | 800 | Xpens-ExtraBold.ttf | Xpens-ExtraBoldItalic.ttf |
| Black | 900 | Xpens-Black.ttf | Xpens-BlackItalic.ttf |

---

## Next.js (Recommended for Web)

Use `next/font/local` for optimal performance (preloading, no layout shift).

> **Note:** Due to `next/font/local` path resolution limitations in monorepos, fonts must be copied to the app directory. Relative paths to packages don't work reliably.

### Step 1: Copy fonts to app

```bash
# Copy fonts from @expanse/theme to your app's fonts directory
mkdir -p app/fonts
cp packages/@expanse/theme/src/font/*.ttf apps/4eye-web/app/fonts/
```

### Step 2: Create font configuration

```typescript
// app/fonts.ts
import localFont from 'next/font/local';

// Load commonly used weights (optimized bundle size)
export const xpens = localFont({
  src: [
    { path: './fonts/Xpens-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Xpens-Italic.ttf', weight: '400', style: 'italic' },
    { path: './fonts/Xpens-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Xpens-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/Xpens-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-xpens',
  display: 'swap',
});

// For full weight support, add all variants
```

### Step 3: Apply to layout

```tsx
// app/layout.tsx
import { xpens } from './fonts';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={xpens.variable}>
      <body style={{ fontFamily: 'var(--font-xpens), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
```

### Step 4: Use with MUI Theme

```typescript
// Import the font family constant for consistency
import { fontFamily } from '@expanse/theme/fonts';

// In your MUI theme (or @expanse/theme will handle this)
const theme = createTheme({
  typography: {
    fontFamily: fontFamily.xpens,
  },
});
```

---

## React Native / Expo

React Native requires fonts to be in the app's assets directory.

### Step 1: Add copy script to package.json

```json
{
  "scripts": {
    "copy-fonts": "cp -r ../../packages/@expanse/theme/src/font ./assets/fonts",
    "prebuild": "npm run copy-fonts && expo prebuild"
  }
}
```

### Step 2: Configure app.json (Expo)

```json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": ["./assets/fonts/Xpens-Regular.ttf", "./assets/fonts/Xpens-Bold.ttf"]
        }
      ]
    ]
  }
}
```

### Step 3: Load fonts in app

```typescript
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Xpens-Regular': require('./assets/fonts/Xpens-Regular.ttf'),
    'Xpens-Bold': require('./assets/fonts/Xpens-Bold.ttf'),
    // Add more weights as needed
  });

  if (!fontsLoaded) {
    return null; // or splash screen
  }

  return <YourApp />;
}
```

### Step 4: Use in styles

```typescript
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Xpens-Regular',
  },
  bold: {
    fontFamily: 'Xpens-Bold',
  },
});
```

---

## Other Web Apps (Non-Next.js)

For apps without Next.js font optimization, create your own @font-face CSS.

### Using metadata exports

```typescript
import { fontFiles, fontFamily } from '@expanse/theme/fonts';

// Generate @font-face rules programmatically
const fontFaceCSS = fontFiles
  .map(
    ({ file, weight, style }) => `
@font-face {
  font-family: '${fontFamily.xpensName}';
  src: url('/fonts/${file}') format('truetype');
  font-weight: ${weight};
  font-style: ${style};
  font-display: swap;
}
`
  )
  .join('\n');
```

### Or create static CSS file

```css
/* fonts.css */
@font-face {
  font-family: 'Xpens';
  src: url('./font/Xpens-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Xpens';
  src: url('./font/Xpens-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Add more @font-face rules as needed */
```

---

## Exported Types & Constants

```typescript
import {
  fontFamily,      // { xpens: '...', xpensName: 'Xpens' }
  fontWeights,     // { thin: 100, ..., black: 900 }
  fontFiles,       // Array of { file, weight, style }
  fontSubsets,     // Predefined subsets: minimal, standard, fullNormal, complete
  fontDirectory,   // Relative path to font files
  // Types
  type FontWeight,
  type FontWeightValue,
  type FontFile,
} from '@expanse/theme/fonts';
```

---

## License

Xpens font is licensed under the SIL Open Font License (OFL).
See `font/OFL.txt` for full license text.
