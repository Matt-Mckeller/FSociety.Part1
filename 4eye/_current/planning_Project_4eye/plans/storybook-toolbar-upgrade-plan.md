# Storybook Toolbar Upgrade Plan

## Overview

Upgrade @expanse/shell Storybook to use Storybook's native `globalTypes` toolbar configuration (like ExpanseFrontend) instead of the custom addon approach, and add internationalization controls.

## Current State

### @expanse/shell Storybook
- Uses custom addon in `.storybook/addons/theme-toolbar/register.tsx`
- Color swatches render in toolbar (but may have compatibility issues)
- No i18n controls

### ExpanseFrontend Storybook
- Uses `globalTypes` with `toolbar` configuration in preview.tsx
- Dropdown menus with emoji icons
- Full i18n support: locale, timezone, currency, direction (RTL/LTR)
- Works reliably

## Target State

1. **Toolbar Controls** (using globalTypes):
   - Theme Mode (Light/Dark) - ☀️/🌙 icons
   - Color Theme (Purple/Blue/Green/Orange/Red/Teal) - emoji hearts
   - Text Direction (Auto/LTR/RTL) - directional arrows
   - Locale (en-US, en-GB, es-ES, de-DE, fr-FR, ja-JP, zh-CN, ar-SA) - flag emojis
   - Timezone (Local, UTC, various cities) - clock icons
   - Currency (USD, EUR, GBP, JPY, CNY, etc.) - money icons

2. **New Package**: `@expanse/i18n`
   - Shared i18n infrastructure
   - Locale configurations with native names, flags, number/date formats
   - Timezone configurations with UTC offsets
   - Currency configurations with symbols
   - I18nProvider React context
   - Storybook decorators: `withI18n`, `withDirection`
   - Formatting utilities for dates, numbers, currencies

## Implementation Plan

### Phase 1: Create @expanse/i18n Package

```
packages/@expanse/i18n/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts            # Main exports
│   ├── config.ts           # Locale/timezone/currency configs
│   ├── context.tsx         # I18nProvider and useI18n hook
│   └── decorators/
│       ├── index.ts
│       ├── withI18n.tsx    # Storybook I18n decorator
│       └── withDirection.tsx  # RTL/LTR decorator
```

### Phase 2: Update @expanse/shell Storybook

1. Remove custom addon (keep for reference)
2. Update `preview.tsx` with globalTypes configuration
3. Add i18n decorators
4. Remove `manager.tsx` (no longer needed)

### Phase 3: Preview Configuration

```tsx
const preview: Preview = {
  globalTypes: {
    mode: {
      name: "Mode",
      description: "Light or Dark mode",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "☀️ Light" },
          { value: "dark", title: "🌙 Dark" },
        ],
        showName: false,
        dynamicTitle: true,
      },
    },
    colorTheme: {
      name: "Color Theme",
      description: "Theme color palette",
      defaultValue: "primary",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "primary", title: "💜 Purple" },
          { value: "blue", title: "💙 Blue" },
          { value: "red", title: "❤️ Red" },
          { value: "green", title: "💚 Green" },
          { value: "orange", title: "🧡 Orange" },
          { value: "teal", title: "🩵 Teal" },
        ],
        showName: false,
        dynamicTitle: true,
      },
    },
    direction: { /* ... */ },
    locale: { /* ... */ },
    timezone: { /* ... */ },
    currency: { /* ... */ },
  },
  decorators: [withI18n, withDirection, withMuiTheme],
};
```

## File Changes

### New Files
- `packages/@expanse/i18n/package.json`
- `packages/@expanse/i18n/tsconfig.json`
- `packages/@expanse/i18n/src/index.ts`
- `packages/@expanse/i18n/src/config.ts`
- `packages/@expanse/i18n/src/context.tsx`
- `packages/@expanse/i18n/src/decorators/index.ts`
- `packages/@expanse/i18n/src/decorators/withI18n.tsx`
- `packages/@expanse/i18n/src/decorators/withDirection.tsx`

### Modified Files
- `packages/@expanse/shell/.storybook/preview.tsx` - Complete rewrite
- `packages/@expanse/shell/package.json` - Add @expanse/i18n dependency
- `pnpm-workspace.yaml` - Already includes @expanse/*

### Removed Files (or archived)
- `packages/@expanse/shell/.storybook/manager.tsx`
- `packages/@expanse/shell/.storybook/addons/theme-toolbar/register.tsx`

## Dependencies

@expanse/i18n:
- react
- @types/react

@expanse/shell (additions):
- @expanse/i18n

## Testing

1. Run Storybook dev server (`pnpm storybook`)
2. Verify toolbar controls appear in header
3. Verify mode toggle changes background color
4. Verify color theme changes accent colors
5. Verify direction toggle affects text alignment
6. Verify locale changes number/date formatting
7. Verify timezone changes time display
8. Verify currency changes money formatting

## Migration Notes

- The custom addon approach (`addons/theme-toolbar`) will be removed
- globalTypes is more stable across Storybook versions
- Decorators read from `context.globals` to access toolbar values
