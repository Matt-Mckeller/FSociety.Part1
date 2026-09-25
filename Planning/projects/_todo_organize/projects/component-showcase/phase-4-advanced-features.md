# Phase 4: Advanced Features

**Duration:** 3-5 days
**Priority:** Medium - Enhanced functionality
**Goal:** Add internationalization, visual regression testing, and other advanced capabilities

---

## Objectives

- ✅ Implement internationalization (i18n) with locale switching
- ✅ Set up visual regression testing (optional)
- ✅ Add advanced Storybook addons
- ✅ Create design token documentation
- ✅ Implement page-level compositions
- ✅ Add performance monitoring
- ✅ Create contribution guidelines

---

## Part A: Internationalization (i18n)

### Step 1: Set Up i18n Infrastructure
**Time:** 3-4 hours

Install i18n dependencies:

```bash
npm install react-intl
```

Create `utils/i18n/locales.ts`:

```typescript
/**
 * Locale configuration for component showcase
 */

export type SupportedLocale = 'en' | 'es' | 'fr' | 'de';

export const locales: Record<SupportedLocale, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
};

export const defaultLocale: SupportedLocale = 'en';
```

Create `utils/i18n/messages.ts`:

```typescript
/**
 * Translation messages
 * For demonstration purposes - in production, these would be in separate JSON files
 */

export const messages = {
  en: {
    'button.submit': 'Submit',
    'button.cancel': 'Cancel',
    'button.save': 'Save',
    'button.delete': 'Delete',
    'form.email.label': 'Email Address',
    'form.email.placeholder': 'Enter your email',
    'form.email.error': 'Please enter a valid email address',
    'form.password.label': 'Password',
    'form.password.placeholder': 'Enter your password',
    'form.required': 'This field is required',
    'auth.login': 'Log In',
    'auth.signup': 'Sign Up',
    'auth.logout': 'Log Out',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'loading.message': 'Loading...',
    'error.generic': 'An error occurred. Please try again.',
  },
  es: {
    'button.submit': 'Enviar',
    'button.cancel': 'Cancelar',
    'button.save': 'Guardar',
    'button.delete': 'Eliminar',
    'form.email.label': 'Correo Electrónico',
    'form.email.placeholder': 'Ingrese su correo',
    'form.email.error': 'Por favor ingrese un correo válido',
    'form.password.label': 'Contraseña',
    'form.password.placeholder': 'Ingrese su contraseña',
    'form.required': 'Este campo es obligatorio',
    'auth.login': 'Iniciar Sesión',
    'auth.signup': 'Registrarse',
    'auth.logout': 'Cerrar Sesión',
    'nav.dashboard': 'Panel',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    'loading.message': 'Cargando...',
    'error.generic': 'Ocurrió un error. Por favor intente de nuevo.',
  },
  fr: {
    'button.submit': 'Soumettre',
    'button.cancel': 'Annuler',
    'button.save': 'Enregistrer',
    'button.delete': 'Supprimer',
    'form.email.label': 'Adresse Email',
    'form.email.placeholder': 'Entrez votre email',
    'form.email.error': 'Veuillez entrer une adresse email valide',
    'form.password.label': 'Mot de Passe',
    'form.password.placeholder': 'Entrez votre mot de passe',
    'form.required': 'Ce champ est obligatoire',
    'auth.login': 'Se Connecter',
    'auth.signup': 'S\'inscrire',
    'auth.logout': 'Se Déconnecter',
    'nav.dashboard': 'Tableau de Bord',
    'nav.profile': 'Profil',
    'nav.settings': 'Paramètres',
    'loading.message': 'Chargement...',
    'error.generic': 'Une erreur s\'est produite. Veuillez réessayer.',
  },
  de: {
    'button.submit': 'Absenden',
    'button.cancel': 'Abbrechen',
    'button.save': 'Speichern',
    'button.delete': 'Löschen',
    'form.email.label': 'E-Mail-Adresse',
    'form.email.placeholder': 'Geben Sie Ihre E-Mail ein',
    'form.email.error': 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    'form.password.label': 'Passwort',
    'form.password.placeholder': 'Geben Sie Ihr Passwort ein',
    'form.required': 'Dieses Feld ist erforderlich',
    'auth.login': 'Anmelden',
    'auth.signup': 'Registrieren',
    'auth.logout': 'Abmelden',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profil',
    'nav.settings': 'Einstellungen',
    'loading.message': 'Wird geladen...',
    'error.generic': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
  },
};
```

### Step 2: Create i18n Decorator
**Time:** 1 hour

Update `.storybook/preview.tsx` to add locale support:

```tsx
import React from 'react';
import type { Preview } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import { messages, locales, defaultLocale } from '../utils/i18n/messages';
// ... existing imports

// Add locale to globalTypes
export const globalTypes = {
  // ... existing theme and themeMode
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: defaultLocale,
    toolbar: {
      icon: 'globe',
      items: Object.entries(locales).map(([code, { name, flag }]) => ({
        value: code,
        title: `${flag} ${name}`,
      })),
      dynamicTitle: true,
    },
  },
};

// i18n decorator
const withI18n = (Story, context) => {
  const { locale } = context.globals;
  
  return (
    <IntlProvider 
      locale={locale} 
      messages={messages[locale]}
      defaultLocale={defaultLocale}
    >
      <Story />
    </IntlProvider>
  );
};

// Update decorators array
const preview: Preview = {
  // ... existing config
  decorators: [withI18n, withTheme], // i18n before theme
};

export default preview;
```

### Step 3: Create i18n Example Components
**Time:** 2 hours

Create `stories/i18n/LocaleDemo.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { FormattedMessage, FormattedDate, FormattedNumber, useIntl } from 'react-intl';
import { Box, Typography, Button, TextField } from '@mui/material';

const LocaleDemo = () => {
  const intl = useIntl();
  const now = new Date();
  const price = 1234.56;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600 }}>
      <Typography variant="h4">
        <FormattedMessage id="nav.dashboard" defaultMessage="Dashboard" />
      </Typography>

      <Box>
        <Typography variant="h6">Date Formatting</Typography>
        <Typography>
          Short: <FormattedDate value={now} />
        </Typography>
        <Typography>
          Long: <FormattedDate value={now} dateStyle="long" />
        </Typography>
        <Typography>
          With Time: <FormattedDate value={now} dateStyle="medium" timeStyle="short" />
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6">Number Formatting</Typography>
        <Typography>
          Number: <FormattedNumber value={price} />
        </Typography>
        <Typography>
          Currency: <FormattedNumber value={price} style="currency" currency="USD" />
        </Typography>
        <Typography>
          Percentage: <FormattedNumber value={0.85} style="percent" />
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6">Form Labels</Typography>
        <TextField
          label={intl.formatMessage({ id: 'form.email.label' })}
          placeholder={intl.formatMessage({ id: 'form.email.placeholder' })}
          fullWidth
          margin="normal"
        />
        <TextField
          label={intl.formatMessage({ id: 'form.password.label' })}
          placeholder={intl.formatMessage({ id: 'form.password.placeholder' })}
          type="password"
          fullWidth
          margin="normal"
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained">
          <FormattedMessage id="button.submit" defaultMessage="Submit" />
        </Button>
        <Button variant="outlined">
          <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
        </Button>
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary">
          <FormattedMessage id="loading.message" defaultMessage="Loading..." />
        </Typography>
      </Box>
    </Box>
  );
};

const meta: Meta<typeof LocaleDemo> = {
  title: 'i18n/Locale Demo',
  component: LocaleDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Demonstrates internationalization with date, number, and message formatting. Switch locales using the toolbar to see translations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllLocales: Story = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
      {Object.keys(messages).map(locale => (
        <Box key={locale}>
          <Typography variant="h6" gutterBottom>
            {locales[locale].flag} {locales[locale].name}
          </Typography>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <LocaleDemo />
          </IntlProvider>
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
```

---

## Part B: Visual Regression Testing (Optional)

### Step 4: Set Up Chromatic (Optional)
**Time:** 2-3 hours

Chromatic provides automated visual regression testing for Storybook.

Install Chromatic:

```bash
npm install --save-dev chromatic
```

Update `package.json`:

```json
{
  "scripts": {
    "chromatic": "npx chromatic --project-token=<your-token>"
  }
}
```

Create `.storybook/chromatic.ts`:

```typescript
/**
 * Chromatic configuration
 */

export const parameters = {
  chromatic: {
    // Delay capturing screenshot until all animations are complete
    delay: 300,
    
    // Disable for stories that shouldn't be tested visually
    // Use in story parameters: { chromatic: { disableSnapshot: true } }
    
    // Viewports to test
    viewports: [320, 768, 1200],
  },
};
```

Create `.github/workflows/chromatic.yml`:

```yaml
name: Chromatic

on: 
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        working-directory: apps/component-showcase
        run: npm ci
      
      - name: Run Chromatic
        working-directory: apps/component-showcase
        run: npm run chromatic
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

---

## Part C: Page Compositions

### Step 5: Create Page-Level Stories
**Time:** 4-5 hours

Create `stories/pages/Dashboard.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { ProfileStatusDisplay } from 'expanse.ui/game';
import { ExperienceProgressBar } from 'expanse.ui/game';
import { AssignmentTable } from 'expanse.ui/game';
import { mockUser, mockAssignments } from '../../utils/mockData';

/**
 * Full dashboard page composition showing multiple components together
 */
const DashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <ProfileStatusDisplay user={mockUser} />
          </Paper>
        </Grid>

        {/* Experience Progress */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Experience Progress
            </Typography>
            <ExperienceProgressBar 
              currentXP={mockUser.experiencePoints}
              level={mockUser.level}
            />
          </Paper>
        </Grid>

        {/* Recent Assignments */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Assignments
            </Typography>
            <AssignmentTable assignments={mockAssignments(5)} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const meta: Meta<typeof DashboardPage> = {
  title: 'Pages/Dashboard',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete dashboard page showing multiple components working together.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
```

Create `stories/pages/AuthFlow.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, Paper, Tabs, Tab } from '@mui/material';
import { AuthModal } from 'expanse.ui/auth';

/**
 * Complete authentication flow with login and signup
 */
const AuthFlow = () => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Paper sx={{ width: 400, p: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>
        
        <Box sx={{ mt: 3 }}>
          {tab === 0 ? (
            <div>Login Form Content</div>
          ) : (
            <div>Signup Form Content</div>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

const meta: Meta<typeof AuthFlow> = {
  title: 'Pages/Auth Flow',
  component: AuthFlow,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

---

## Part D: Design Tokens Documentation

### Step 6: Document Design System
**Time:** 3-4 hours

Create `stories/theming/DesignTokens.mdx`:

```mdx
import { Meta, ColorPalette, ColorItem, Typeset } from '@storybook/blocks';

<Meta title="Theming/Design Tokens" />

# Design Tokens

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.

## Color Palette

### Primary Colors

<ColorPalette>
  <ColorItem
    title="Primary"
    subtitle="Main brand color"
    colors={{
      'Primary Main': '#1976d2',
      'Primary Light': '#42a5f5',
      'Primary Dark': '#1565c0',
    }}
  />
  <ColorItem
    title="Secondary"
    subtitle="Accent color"
    colors={{
      'Secondary Main': '#9c27b0',
      'Secondary Light': '#ba68c8',
      'Secondary Dark': '#7b1fa2',
    }}
  />
</ColorPalette>

### Semantic Colors

<ColorPalette>
  <ColorItem
    title="Success"
    colors={{ Success: '#2e7d32' }}
  />
  <ColorItem
    title="Error"
    colors={{ Error: '#d32f2f' }}
  />
  <ColorItem
    title="Warning"
    colors={{ Warning: '#ed6c02' }}
  />
  <ColorItem
    title="Info"
    colors={{ Info: '#0288d1' }}
  />
</ColorPalette>

## Typography

### Font Family
- **Primary:** Xpens, Roboto, sans-serif
- **Monospace:** 'Courier New', monospace

### Font Weights
- **Light:** 300
- **Regular:** 400
- **Medium:** 500
- **Bold:** 700

### Type Scale

<Typeset
  fontSizes={[12, 14, 16, 18, 20, 24, 32, 48]}
  fontWeight={400}
  sampleText="The quick brown fox jumps over the lazy dog"
/>

## Spacing

The spacing system uses a base unit of 3px (multiplied by the spacing value).

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0px | No spacing |
| 1 | 3px | Tiny spacing |
| 2 | 6px | Small spacing |
| 3 | 9px | Medium spacing |
| 4 | 12px | Default spacing |
| 8 | 24px | Large spacing |
| 16 | 48px | Extra large spacing |

## Breakpoints

| Name | Width | Description |
|------|-------|-------------|
| xs | 0px | Extra small devices |
| sm | 600px | Small devices (phones) |
| md | 900px | Medium devices (tablets) |
| lg | 1200px | Large devices (desktops) |
| xl | 1536px | Extra large devices |

## Elevation (Shadows)

Shadows are used to create depth and hierarchy.

- **Level 0:** No shadow (flat)
- **Level 1:** Subtle shadow (cards)
- **Level 2:** Medium shadow (raised elements)
- **Level 4:** Strong shadow (modals)
- **Level 8:** Maximum shadow (dropdowns)

## Border Radius

- **Small:** 4px
- **Medium:** 7px (default)
- **Large:** 12px
- **Circle:** 50%

## Transitions

- **Duration Short:** 200ms
- **Duration Standard:** 300ms
- **Duration Long:** 400ms
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)
```

Create `stories/theming/Colors.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, useTheme } from '@mui/material';

const ColorShowcase = () => {
  const theme = useTheme();

  const ColorBox = ({ color, label }: { color: string; label: string }) => (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          width: 100,
          height: 100,
          bgcolor: color,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          mb: 1,
        }}
      />
      <Typography variant="caption" display="block">
        {label}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block">
        {color}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Primary Colors
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <ColorBox color={theme.palette.primary.main} label="Primary" />
        <ColorBox color={theme.palette.primary.light} label="Primary Light" />
        <ColorBox color={theme.palette.primary.dark} label="Primary Dark" />
      </Box>

      <Typography variant="h5" gutterBottom>
        Semantic Colors
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <ColorBox color={theme.palette.success.main} label="Success" />
        <ColorBox color={theme.palette.error.main} label="Error" />
        <ColorBox color={theme.palette.warning.main} label="Warning" />
        <ColorBox color={theme.palette.info.main} label="Info" />
      </Box>

      <Typography variant="h5" gutterBottom>
        Background Colors
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <ColorBox color={theme.palette.background.default} label="Default" />
        <ColorBox color={theme.palette.background.paper} label="Paper" />
      </Box>

      <Typography variant="h5" gutterBottom>
        Text Colors
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <ColorBox color={theme.palette.text.primary} label="Primary" />
        <ColorBox color={theme.palette.text.secondary} label="Secondary" />
        <ColorBox color={theme.palette.text.disabled} label="Disabled" />
      </Box>
    </Box>
  );
};

const meta: Meta<typeof ColorShowcase> = {
  title: 'Theming/Colors',
  component: ColorShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

---

## Part E: Additional Addons

### Step 7: Add Useful Storybook Addons
**Time:** 1-2 hours

Install additional addons:

```bash
npm install --save-dev @storybook/addon-performance @storybook/addon-measure
```

Update `.storybook/main.ts`:

```typescript
const config: StorybookConfig = {
  // ...existing config
  addons: [
    // ...existing addons
    getAbsolutePath('@storybook/addon-performance'),
    getAbsolutePath('@storybook/addon-measure'),
  ],
};
```

---

## Part F: Contribution Guidelines

### Step 8: Create Contribution Documentation
**Time:** 1-2 hours

Create `stories/Contributing.mdx`:

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Contributing" />

# Contributing to Component Showcase

Thank you for contributing! This guide will help you add new components and stories.

## Adding a New Component Story

### 1. Choose the Right Category

Place your story file in the appropriate directory:
- `stories/theme/` - UI primitives (buttons, layouts, etc.)
- `stories/auth/` - Authentication components
- `stories/forms/` - Form inputs and validation
- `stories/game/` - Game-specific components
- `stories/pages/` - Full page compositions

### 2. Create the Story File

Use the template:

\`\`\`tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from 'expanse.ui/category';

const meta: Meta<typeof YourComponent> = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered', // or 'padded', 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for props
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
\`\`\`

### 3. Add Multiple Variants

Show different states and configurations:

\`\`\`tsx
export const Loading: Story = {
  args: { isLoading: true },
};

export const Error: Story = {
  args: { error: 'Something went wrong' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
\`\`\`

### 4. Add Interaction Tests

Test critical behavior:

\`\`\`tsx
import { within, userEvent, expect } from '@storybook/test';

export const WithTest: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
\`\`\`

### 5. Document the Component

Add descriptions and usage notes:

\`\`\`tsx
const meta: Meta<typeof YourComponent> = {
  // ...
  parameters: {
    docs: {
      description: {
        component: 'Detailed description of when and how to use this component.',
      },
    },
  },
};
\`\`\`

## Best Practices

### Naming
- **Files:** `ComponentName.stories.tsx`
- **Titles:** `Category/ComponentName`
- **Stories:** Descriptive names (Default, Loading, Error, etc.)

### Props
- Expose all important props as controls
- Set sensible defaults
- Document prop purposes

### Mock Data
- Use utilities from `utils/mockData.ts`
- Create reusable mock generators
- Keep data realistic

### Accessibility
- Check the Accessibility tab
- Fix violations before submitting
- Add ARIA labels where needed

### Testing
- Test critical interactions
- Use semantic queries (getByRole, getByLabelText)
- Keep tests focused and readable

## Code Review Checklist

Before submitting:
- [ ] Story renders without errors
- [ ] All theme combinations work
- [ ] Controls function properly
- [ ] Documentation is clear
- [ ] Accessibility checks pass
- [ ] Tests (if any) pass
- [ ] Code follows existing patterns

## Getting Help

- Check existing stories for examples
- Review the [Testing Guide](/?path=/docs/testing-guide)
- Ask in team chat
- Open an issue for complex problems

## Resources

- [Storybook Docs](https://storybook.js.org/docs)
- [Testing Library](https://testing-library.com)
- [MUI Documentation](https://mui.com)
```

---

## Success Criteria

Phase 4 is complete when:
- ✅ Internationalization works with multiple locales
- ✅ Visual regression testing is set up (if using Chromatic)
- ✅ Page-level compositions are created
- ✅ Design token documentation exists
- ✅ Additional addons are configured
- ✅ Contribution guidelines are clear

---

## Next Steps

After Phase 4:
- **Ongoing Maintenance:** Keep stories updated with component changes
- **Expand Coverage:** Add more components and test cases
- **Gather Feedback:** Improve based on team usage
- **Refine Processes:** Optimize workflows

See **[MAINTENANCE.md](./MAINTENANCE.md)** for ongoing care guidelines.

---

**Phase 4 Estimated Time:** 3-5 days
**Complexity:** Medium (optional features)
