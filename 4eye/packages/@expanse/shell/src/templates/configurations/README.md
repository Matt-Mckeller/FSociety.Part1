# Template Configurations

Pre-built configuration presets for layout templates.

## Available Configurations

| Configuration | Description |
|---------------|-------------|
| `minimalTemplateConfig` | Clean, minimal setup - content focused |
| `fullscreenTemplateConfig` | Immersive fullscreen experience |
| `dashboardTemplateConfig` | All controls visible and accessible |
| `documentationTemplateConfig` | Docs-style with sidebar navigation |

## Usage

```tsx
import { MinimalLayout, minimalTemplateConfig } from "@expanse/shell"

<MinimalLayout configuration={minimalTemplateConfig} tiles={tiles} />
```

## Creating Custom Configurations

Configurations extend `LayoutConfiguration` from context types:

```tsx
import type { LayoutConfiguration } from "@expanse/shell"

export const myConfig: LayoutConfiguration = {
  // ... your settings
}
```
