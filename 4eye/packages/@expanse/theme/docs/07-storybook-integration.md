# Storybook Integration

Use `@expanse/storybook-config` for consistent theme toolbars across packages.

## Quick Setup

```tsx
// .storybook/preview.tsx
import { createPreviewConfig } from "@expanse/storybook-config/preview"

export const { decorators, globalTypes, parameters } = createPreviewConfig()
```

## With Package Extensions

```tsx
import { createPreviewConfig, ComponentExtensionFactory } from "@expanse/storybook-config/preview"
import { createBrandCoreTheme } from "../src/theme/factories"

const extensionFactory: ComponentExtensionFactory = (palette, color, mode) => {
  return createBrandCoreTheme(palette)
}

export const { decorators, globalTypes, parameters } = createPreviewConfig({
  extensionFactory,
})
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `extensionFactory` | `ComponentExtensionFactory` | `undefined` | Function to create package-specific component themes |
| `includeI18n` | `boolean` | `false` | Include i18n/direction decorators and toolbar items |
| `additionalDecorators` | `DecoratorFunction[]` | `[]` | Extra decorators to append |
| `additionalParameters` | `object` | `{}` | Extra parameters to merge |

## Global Types

The toolbar provides:
- **mode**: `light` / `dark`
- **colorTheme**: `core`, `slate`, `neon`, `energy`, etc.

Access in stories:
```tsx
export const MyStory: Story = {
  play: async ({ globals }) => {
    const { mode, colorTheme } = globals
  }
}
```

## Export Structure

Use separate exports for Storybook compatibility:
```json
{
  "exports": {
    ".": "./src/index.ts",
    "./preview": "./src/preview.tsx"
  }
}
```
