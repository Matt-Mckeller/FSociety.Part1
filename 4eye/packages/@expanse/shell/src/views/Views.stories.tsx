import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SettingsPage, type SettingsSection } from './SettingsPage';
import { LayoutConfigurationPage } from './LayoutConfigurationPage';
import { LayoutConfigProvider } from '../core/providers';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  TextField,
  Button,
  Stack,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';

const meta: Meta = {
  title: 'Layout Systems/Views/Settings Pages',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Settings Page Views

Reusable page-level components for settings and configuration UIs.

## Components

| Component | Purpose |
|-----------|---------|
| **SettingsPage** | Generic settings page with configurable sections |
| **LayoutConfigurationPage** | Pre-built page for layout configuration |

## Usage Pattern

Settings pages use a section-based architecture:
1. Define sections with id, title, description, and content
2. Pass sections array to SettingsPage
3. Content can be any React node (toggles, forms, etc.)
        `,
      },
    },
  },
};

export default meta;

// =============================================================================
// Sample Settings Components
// =============================================================================

const SampleToggle = ({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) => {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
      label={label}
    />
  );
};

const SampleSelect = ({
  label,
  options,
  defaultValue,
}: {
  label: string;
  options: string[];
  defaultValue?: string;
}) => {
  const [value, setValue] = React.useState(defaultValue || options[0]);
  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={(e) => setValue(e.target.value)}>
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SampleSlider = ({
  label,
  min = 0,
  max = 100,
  defaultValue = 50,
}: {
  label: string;
  min?: number;
  max?: number;
  defaultValue?: number;
}) => {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="body2" gutterBottom>
        {label}: {value}
      </Typography>
      <Slider
        value={value}
        onChange={(_, v) => setValue(v as number)}
        min={min}
        max={max}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

// =============================================================================
// SettingsPage Stories
// =============================================================================

export const SettingsPageDefault: StoryObj = {
  render: () => {
    const sections: SettingsSection[] = [
      {
        id: 'appearance',
        title: 'Appearance',
        description: 'Customize how the app looks and feels.',
        content: (
          <Stack spacing={2}>
            <SampleToggle label="Dark Mode" defaultChecked />
            <SampleSelect
              label="Theme"
              options={['System', 'Light', 'Dark', 'High Contrast']}
              defaultValue="System"
            />
            <SampleSelect
              label="Accent Color"
              options={['Blue', 'Purple', 'Green', 'Orange', 'Red']}
              defaultValue="Blue"
            />
          </Stack>
        ),
      },
      {
        id: 'notifications',
        title: 'Notifications',
        description: 'Choose what notifications you receive.',
        content: (
          <Stack spacing={1}>
            <SampleToggle label="Email Notifications" defaultChecked />
            <SampleToggle label="Push Notifications" defaultChecked />
            <SampleToggle label="Sound Effects" />
            <SampleToggle label="Desktop Notifications" defaultChecked />
          </Stack>
        ),
      },
      {
        id: 'privacy',
        title: 'Privacy & Security',
        description: 'Control your data and privacy settings.',
        content: (
          <Stack spacing={2}>
            <SampleToggle label="Two-Factor Authentication" defaultChecked />
            <SampleToggle label="Remember Login" defaultChecked />
            <SampleSelect
              label="Visibility"
              options={['Public', 'Friends Only', 'Private']}
              defaultValue="Friends Only"
            />
          </Stack>
        ),
      },
    ];

    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <SettingsPage
          title="Settings"
          sections={sections}
          maxWidth="sm"
          elevated
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `SettingsPage with multiple sections.

**Props:**
- \`title\` - Page title (optional)
- \`sections\` - Array of SettingsSection objects
- \`maxWidth\` - Container max width (xs|sm|md|lg|xl)
- \`elevated\` - Wrap sections in Paper components

**SettingsSection interface:**
\`\`\`typescript
interface SettingsSection {
  id: string;          // Unique identifier
  title: string;       // Section header
  description?: string; // Optional subtext
  content: ReactNode;  // Any content
}
\`\`\``,
      },
    },
  },
};

export const SettingsPageWithIcons: StoryObj = {
  render: () => {
    const theme = useTheme();
    
    const SectionHeader = ({
      icon,
      title,
      description,
    }: {
      icon: React.ReactNode;
      title: string;
      description: string;
    }) => (
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "flex-start",
          mb: 2
        }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: 'primary.main',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{
            fontWeight: 600
          }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            {description}
          </Typography>
        </Box>
      </Stack>
    );

    const sections: SettingsSection[] = [
      {
        id: 'appearance',
        title: '',
        content: (
          <>
            <SectionHeader
              icon={<DarkModeIcon />}
              title="Appearance"
              description="Theme and display preferences"
            />
            <Stack spacing={2} sx={{ pl: 6 }}>
              <SampleToggle label="Dark Mode" />
              <SampleSlider label="Font Size" min={12} max={24} defaultValue={16} />
            </Stack>
          </>
        ),
      },
      {
        id: 'notifications',
        title: '',
        content: (
          <>
            <SectionHeader
              icon={<NotificationsIcon />}
              title="Notifications"
              description="How and when you get notified"
            />
            <Stack spacing={1} sx={{ pl: 6 }}>
              <SampleToggle label="Email Alerts" defaultChecked />
              <SampleToggle label="Push Notifications" />
            </Stack>
          </>
        ),
      },
      {
        id: 'security',
        title: '',
        content: (
          <>
            <SectionHeader
              icon={<SecurityIcon />}
              title="Security"
              description="Account protection settings"
            />
            <Stack spacing={2} sx={{ pl: 6 }}>
              <SampleToggle label="2FA Enabled" defaultChecked />
              <Button variant="outlined" size="small">
                Change Password
              </Button>
            </Stack>
          </>
        ),
      },
      {
        id: 'storage',
        title: '',
        content: (
          <>
            <SectionHeader
              icon={<StorageIcon />}
              title="Storage"
              description="Manage your data and cache"
            />
            <Stack direction="row" spacing={2} sx={{ pl: 6 }}>
              <Button variant="outlined" size="small" color="error">
                Clear Cache
              </Button>
              <Button variant="outlined" size="small">
                Export Data
              </Button>
            </Stack>
          </>
        ),
      },
    ];

    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <SettingsPage title="Preferences" sections={sections} maxWidth="md" elevated />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings page with custom section headers featuring icons.',
      },
    },
  },
};

export const SettingsPageFlat: StoryObj = {
  render: () => {
    const sections: SettingsSection[] = [
      {
        id: 'profile',
        title: 'Profile',
        content: (
          <Stack spacing={2}>
            <TextField label="Display Name" defaultValue="John Doe" size="small" />
            <TextField label="Email" defaultValue="john@example.com" size="small" type="email" />
            <TextField label="Bio" multiline rows={3} size="small" placeholder="Tell us about yourself..." />
          </Stack>
        ),
      },
      {
        id: 'preferences',
        title: 'Preferences',
        content: (
          <Stack spacing={2}>
            <SampleSelect label="Language" options={['English', 'Spanish', 'French', 'German', 'Japanese']} />
            <SampleSelect label="Timezone" options={['UTC', 'EST', 'PST', 'CET', 'JST']} />
          </Stack>
        ),
      },
    ];

    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <SettingsPage title="Account Settings" sections={sections} maxWidth="sm" elevated={false} />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings page without elevated Paper sections (flat design).',
      },
    },
  },
};

export const SettingsPageCompact: StoryObj = {
  render: () => {
    const sections: SettingsSection[] = [
      {
        id: 'quick',
        title: 'Quick Settings',
        content: (
          <Stack spacing={1}>
            <SampleToggle label="Dark Mode" />
            <SampleToggle label="Compact View" defaultChecked />
            <SampleToggle label="Show Tooltips" defaultChecked />
          </Stack>
        ),
      },
    ];

    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <SettingsPage sections={sections} maxWidth="xs" elevated />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal compact settings page with xs max width.',
      },
    },
  },
};

// =============================================================================
// LayoutConfigurationPage Stories
// =============================================================================

export const LayoutConfigDefault: StoryObj = {
  render: () => (
    <LayoutConfigProvider>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <LayoutConfigurationPage />
      </Box>
    </LayoutConfigProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: `LayoutConfigurationPage is a pre-built settings page for layout configuration.

**Features:**
- Layout type selection (fixed, fluid, responsive)
- Preset configurations for common layouts
- Minimap settings (position, size, style)
- Navigation controls toggle
- Bar visibility toggles (top, left, right, bottom)
- Reset to defaults action

**Requirements:**
- Must be wrapped in \`LayoutConfigProvider\`
- Reads/writes to layout configuration context`,
      },
    },
  },
};

// =============================================================================
// Guidelines
// =============================================================================

export const DesignGuidelines: StoryObj = {
  render: () => {
    const theme = useTheme();
    return (
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Settings Page Guidelines
        </Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Structure
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 3,
                '& li': { mb: 1 },
                color: 'text.secondary',
              }}
            >
              <li>Group related settings into logical sections</li>
              <li>Use clear, concise section titles</li>
              <li>Add descriptions for complex settings</li>
              <li>Keep the most important settings at the top</li>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom>
              Content Types
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 1 }}>
                <Typography variant="subtitle2">Toggles (Switch)</Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  For on/off settings. Use FormControlLabel with Switch.
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 1 }}>
                <Typography variant="subtitle2">Selection (Select/Radio)</Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  For choosing from predefined options. Use Select for many options, Radio for few.
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 1 }}>
                <Typography variant="subtitle2">Range (Slider)</Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  For numeric values within a range. Show current value label.
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 1 }}>
                <Typography variant="subtitle2">Input (TextField)</Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  For free-form text input. Add validation as needed.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom>
              Accessibility
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 3,
                '& li': { mb: 1 },
                color: 'text.secondary',
              }}
            >
              <li>Ensure all controls have accessible labels</li>
              <li>Use proper heading hierarchy (h1 for title, h2 for sections)</li>
              <li>Support keyboard navigation</li>
              <li>Announce changes to screen readers when relevant</li>
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Design guidelines for creating settings pages.',
      },
    },
  },
};
