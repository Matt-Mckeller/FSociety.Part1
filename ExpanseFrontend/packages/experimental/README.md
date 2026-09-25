# Expanse Experimental Package

This package contains experimental components and features that are not yet ready for production use.

## ⚠️ Warning

Components in this package:
- May have breaking changes without notice
- May be removed or significantly altered
- Are not recommended for production applications
- Are meant for testing, prototyping, and exploration

## Available Exports

### FourUpLogo

A configurable SVG logo component with overlapping circles and sound waves.

```tsx
import { FourUpLogo } from 'expanse.experimental/FourUpLogo'

<FourUpLogo 
  size={300} 
  config={{ 
    fillColor: '#1976d2',
    showWaves: true 
  }} 
/>
```

## Usage

Add to your app's `package.json`:

```json
{
  "dependencies": {
    "expanse.experimental": "../../packages/experimental"
  }
}
```

Or import directly in TypeScript projects with path aliases.
