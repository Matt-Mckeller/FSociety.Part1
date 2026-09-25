# Phase 1: Storybook Setup & Foundation

**Duration:** 2-3 days
**Priority:** Critical - Foundation for all other phases
**Goal:** Set up Storybook infrastructure with theme integration and provider context

---

## Objectives

- ✅ Initialize Storybook in the monorepo
- ✅ Configure build system (Vite + SWC)
- ✅ Set up TypeScript configuration
- ✅ Create custom decorators for theme and providers
- ✅ Configure theme switching in toolbar
- ✅ Set up project structure
- ✅ Create example stories to validate setup
- ✅ Configure development scripts

---

## Prerequisites

- Node.js 18+ installed
- Familiarity with Storybook concepts
- Understanding of existing theme system
- Access to `packages/ui` source code

---

## Step-by-Step Implementation

### Step 1: Create Project Directory
**Time:** 5 minutes

```bash
cd /Users/mm/Projects/ExpanseFrontend/apps
mkdir component-showcase
cd component-showcase
```

### Step 2: Initialize Package.json
**Time:** 10 minutes

Create `package.json`:

```json
{
  "name": "component-showcase",
  "version": "1.0.0",
  "description": "Storybook component library and testing suite",
  "private": true,
  "type": "module",
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook",
    "test-storybook:ci": "concurrently -k -s first -n \"SB,TEST\" -c \"magenta,blue\" \"npm run build-storybook -- --quiet && npx http-server storybook-static --port 6006 --silent\" \"wait-on tcp:6006 && npm run test-storybook\""
  },
  "dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.9",
    "@mui/material": "^5.15.9",
    "@mui/system": "^5.15.9",
    "expanse.ui": "../../packages/ui",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@storybook/addon-a11y": "^8.3.0",
    "@storybook/addon-actions": "^8.3.0",
    "@storybook/addon-essentials": "^8.3.0",
    "@storybook/addon-interactions": "^8.3.0",
    "@storybook/addon-links": "^8.3.0",
    "@storybook/blocks": "^8.3.0",
    "@storybook/react": "^8.3.0",
    "@storybook/react-vite": "^8.3.0",
    "@storybook/test": "^8.3.0",
    "@storybook/test-runner": "^0.19.0",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "concurrently": "^8.2.2",
    "http-server": "^14.1.1",
    "storybook": "^8.3.0",
    "typescript": "^5",
    "vite": "^5.0.0",
    "wait-on": "^7.2.0"
  }
}
```

**Key Dependencies:**
- `@storybook/react-vite` - React + Vite builder
- `@storybook/addon-essentials` - Controls, actions, docs, viewport
- `@storybook/addon-a11y` - Accessibility testing
- `@storybook/addon-interactions` - Interaction testing UI
- `@storybook/test` - Testing utilities
- `@storybook/test-runner` - Automated test execution

### Step 3: Install Dependencies
**Time:** 5 minutes

```bash
npm install
```

### Step 4: Initialize Storybook Configuration
**Time:** 30 minutes

Create `.storybook/main.ts`:

```typescript
import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false, // Set to true if you want type checking
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        // Filter out props from node_modules except our own packages
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules') ||
                 prop.parent.fileName.includes('packages/ui');
        }
        return true;
      },
    },
  },
  viteFinal: async (config) => {
    // Customize Vite config here
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'expanse.ui': join(__dirname, '../../packages/ui'),
    };
    return config;
  },
};

export default config;
```

### Step 5: Create Preview Configuration with Theme Decorator
**Time:** 45 minutes

Create `.storybook/preview.tsx`:

```tsx
import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {
  spacing,
  typography,
  mixins,
  zIndex,
  breakpoints,
  getComponents,
  lightThemePalette,
  lightThemeShadows,
  expanseLightComponents,
  darkThemePalette,
  darkThemeEmptyShadowArray,
  expanseDarkComponents,
  blueLightThemePalette,
  blueLightComponents,
  blueDarkThemePalette,
  blueDarkComponents,
  redLightThemePalette,
  redLightComponents,
} from 'expanse.ui/theme';

// Global types for toolbar controls
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'primary',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'primary', title: 'Primary Theme', icon: 'circle' },
        { value: 'blue', title: 'Blue Theme', icon: 'circle' },
        { value: 'red', title: 'Red Theme', icon: 'circle' },
      ],
      dynamicTitle: true,
    },
  },
  themeMode: {
    name: 'Mode',
    description: 'Light or Dark mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light Mode', icon: 'sun' },
        { value: 'dark', title: 'Dark Mode', icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
};

// Theme creation helper
const createExpanseTheme = (
  themeName: 'primary' | 'blue' | 'red',
  mode: 'light' | 'dark'
) => {
  // Select palette based on theme and mode
  let palette;
  let components;
  let shadows;

  if (mode === 'light') {
    switch (themeName) {
      case 'blue':
        palette = blueLightThemePalette;
        components = blueLightComponents;
        shadows = lightThemeShadows;
        break;
      case 'red':
        palette = redLightThemePalette;
        components = redLightComponents;
        shadows = lightThemeShadows;
        break;
      case 'primary':
      default:
        palette = lightThemePalette;
        components = expanseLightComponents;
        shadows = lightThemeShadows;
        break;
    }
  } else {
    switch (themeName) {
      case 'blue':
        palette = blueDarkThemePalette;
        components = blueDarkComponents;
        shadows = darkThemeEmptyShadowArray;
        break;
      case 'red':
        palette = darkThemePalette;
        components = expanseDarkComponents;
        shadows = darkThemeEmptyShadowArray;
        break;
      case 'primary':
      default:
        palette = darkThemePalette;
        components = expanseDarkComponents;
        shadows = darkThemeEmptyShadowArray;
        break;
    }
  }

  return createTheme({
    spacing,
    palette,
    mixins,
    typography,
    components: getComponents(palette, shadows, components),
    shadows,
    zIndex,
    breakpoints,
  });
};

// Theme decorator that wraps all stories
const withTheme = (Story, context) => {
  const { theme: themeName, themeMode } = context.globals;
  const theme = createExpanseTheme(themeName, themeMode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: '1rem'
      }}>
        <Story />
      </div>
    </MuiThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      disable: true, // Use theme background instead
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
```

### Step 6: Create Manager Configuration (Optional UI Customization)
**Time:** 10 minutes

Create `.storybook/manager.ts`:

```typescript
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Expanse Component Showcase',
  brandUrl: '/',
  brandImage: undefined,
  brandTarget: '_self',
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});
```

### Step 7: Create TypeScript Configuration
**Time:** 10 minutes

Create `tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "expanse.ui": ["../../packages/ui"],
      "expanse.ui/*": ["../../packages/ui/*"]
    }
  },
  "include": [
    "stories/**/*",
    "utils/**/*",
    ".storybook/**/*"
  ],
  "references": [
    { "path": "../../packages/ui" }
  ]
}
```

### Step 8: Create Initial Story Structure
**Time:** 30 minutes

Create `stories/Introduction.mdx`:

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Introduction" />

# Expanse Component Showcase

Welcome to the Expanse Component Library! This is a comprehensive showcase of all reusable UI components in the Expanse monorepo.

## 🎯 Purpose

This showcase serves multiple purposes:

1. **Component Discovery** - Browse and search all available components
2. **Interactive Testing** - Test components with different props and states
3. **Documentation** - Learn how to use each component with examples
4. **QA & Validation** - Ensure components work correctly across themes
5. **Development Reference** - See implementation patterns and best practices

## 🎨 Theme Switching

Use the toolbar controls to switch between:

- **Themes:** Primary, Blue, Red
- **Modes:** Light, Dark

This gives you 6 different theme combinations to test with!

## 📚 Component Categories

### Theme Components
UI primitives and layout components that follow the design system.

- Buttons, Progress Bars, Loading Spinners
- Navigation, Drawers, Modals
- Character States, Icons
- Typography, Spacing utilities

### Auth Components
Authentication and authorization related components.

- Login/Signup forms
- Auth buttons and CTAs
- Status displays
- Protected route handlers

### Form Components
Input fields and form utilities.

- Text inputs (Email, Password, Name, Phone)
- Form validation
- Submit actions
- Privacy/Terms agreements

### Game Components
Game-specific UI components.

- Data tables (Assignments, Students, Classes)
- Experience and progress bars
- Profile displays
- Reward components
- Wallet displays

### Pages
Full page compositions and layouts.

- Dashboard views
- Profile pages
- Auth flows
- Multi-component compositions

## 🧪 Testing

Each component includes:

- **Visual examples** - See the component in different states
- **Interactive controls** - Modify props in real-time
- **Interaction tests** - Automated behavioral tests
- **Accessibility checks** - WCAG compliance validation

## 🚀 Getting Started

1. Use the sidebar to navigate to a component
2. Try changing the theme and mode in the toolbar
3. Use the Controls panel to modify component props
4. Check the Actions panel to see event handlers
5. Review the Docs tab for detailed documentation

## 📖 Need Help?

- Check the [README](https://github.com/yourorg/expanse) for project overview
- See individual component documentation for usage details
- Contact the development team for questions

---

**Last Updated:** October 10, 2025
```

### Step 9: Create Example Component Story
**Time:** 20 minutes

Create `stories/theme/Button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '@mui/material';

const meta: Meta<typeof Button> = {
  title: 'Theme/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'contained',
    color: 'secondary',
    children: 'Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'contained',
    children: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    variant: 'contained',
    children: 'Small Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'contained',
    disabled: true,
    children: 'Disabled',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="secondary">Secondary</Button>
      <Button variant="contained" color="error">Error</Button>
      <Button variant="contained" color="warning">Warning</Button>
      <Button variant="contained" color="info">Info</Button>
      <Button variant="contained" color="success">Success</Button>
    </div>
  ),
};
```

### Step 10: Create README
**Time:** 15 minutes

Create `README.md`:

```markdown
# Component Showcase

Storybook-based component library and testing suite for Expanse UI components.

## Quick Start

### Development
```bash
npm run storybook
```

Opens Storybook at http://localhost:6006

### Build
```bash
npm run build-storybook
```

Outputs static files to `storybook-static/`

### Testing
```bash
npm run test-storybook
```

Runs interaction tests for all stories.

## Project Structure

```
component-showcase/
├── .storybook/          # Storybook configuration
├── stories/             # Story files
├── utils/              # Testing utilities and mock data
└── package.json
```

## Adding New Stories

1. Create a `.stories.tsx` file in the appropriate category folder
2. Follow the naming convention: `ComponentName.stories.tsx`
3. Use the story template (see existing stories)
4. Add interaction tests for critical behavior

## Theme Switching

Use the toolbar controls to switch between:
- Themes: Primary, Blue, Red
- Modes: Light, Dark

## Documentation

See `/docs/component-showcase/` for:
- Requirements
- Architecture
- Implementation guides
- Maintenance procedures

## Resources

- [Storybook Documentation](https://storybook.js.org/)
- [Component Showcase Docs](/docs/component-showcase/)
```

### Step 11: Create .gitignore
**Time:** 2 minutes

Create `.gitignore`:

```
# Storybook
storybook-static/
.storybook-out/

# Dependencies
node_modules/

# Build files
dist/
build/

# Test results
test-results/
coverage/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

### Step 12: Test the Setup
**Time:** 15 minutes

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook
```

**Validation Checklist:**
- [ ] Storybook opens at http://localhost:6006
- [ ] Introduction page displays
- [ ] Button story is visible
- [ ] Theme switcher works in toolbar
- [ ] Mode switcher works in toolbar
- [ ] Controls panel shows button props
- [ ] Actions panel logs button clicks
- [ ] No console errors

### Step 13: Add to Root Package Scripts (Optional)
**Time:** 5 minutes

Update root `package.json` to add convenience scripts:

```json
{
  "scripts": {
    "showcase": "cd apps/component-showcase && npm run storybook",
    "showcase:build": "cd apps/component-showcase && npm run build-storybook",
    "showcase:test": "cd apps/component-showcase && npm run test-storybook"
  }
}
```

---

## Validation & Testing

### Manual Testing Checklist
- [ ] Storybook launches without errors
- [ ] Theme switching works (6 combinations)
- [ ] Button story renders correctly
- [ ] Controls update component in real-time
- [ ] Actions log events properly
- [ ] Hot reloading works on file changes
- [ ] TypeScript errors don't block builds
- [ ] Documentation renders correctly

### Known Issues & Solutions

**Issue:** Module resolution errors
**Solution:** Check `tsconfig.json` paths and Vite aliases

**Issue:** Theme not applying
**Solution:** Verify decorator order in `preview.tsx`

**Issue:** Slow build times
**Solution:** Ensure Vite builder is being used, check for unnecessary dependencies

---

## Success Criteria

Phase 1 is complete when:
- ✅ Storybook runs locally without errors
- ✅ Theme switching works for all 6 combinations
- ✅ Example story (Button) displays correctly
- ✅ Controls, Actions, Docs addons work
- ✅ TypeScript compilation succeeds
- ✅ Project structure is established
- ✅ Documentation is in place

---

## Next Steps

Once Phase 1 is complete, proceed to:
- **[Phase 2: Component Stories](./phase-2-component-stories.md)** - Create stories for all components

---

## Troubleshooting

### Common Issues

**Storybook won't start:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Theme decorator not working:**
- Check import paths in `preview.tsx`
- Verify `expanse.ui` package is properly linked
- Check for circular dependencies

**TypeScript errors:**
- Ensure `tsconfig.json` extends root config
- Check path mappings
- Verify type definitions are available

---

## Resources

- [Storybook Setup Guide](https://storybook.js.org/docs/react/get-started/install)
- [Vite Builder Docs](https://github.com/storybookjs/builder-vite)
- [MUI Theming](https://mui.com/material-ui/customization/theming/)

---

**Phase 1 Completion:** ✅ Ready for Phase 2
**Estimated Time:** 2-3 days
**Complexity:** Medium
