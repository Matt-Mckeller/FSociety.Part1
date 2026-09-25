import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import { AIGuidedEditorV7 } from './AIGuidedEditorV7';
import { eyeColors } from './theme';
import type { V7ShellId } from './types';

/**
 * V7 polishes chrome (4eye color, profile chip, custom icons) while keeping
 * every V6 surface: content-type chips, layers, config, cost, editor,
 * FeedbackPanel (section chips + options + details), and variations.
 * FeedbackScreens A/B/C remain available via Feedback view chips.
 */
const meta: Meta<typeof AIGuidedEditorV7> = {
  title: 'Screens/AIGuidedEditorV7',
  component: AIGuidedEditorV7,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    shell: {
      control: 'select',
      options: ['calm-workbench', 'focused-write', 'character-studio'] satisfies V7ShellId[],
    },
    initialFeedbackMode: {
      control: 'select',
      options: ['panel', 'score', 'explorer', 'actions'],
    },
    isGenerating: { control: 'boolean' },
    isAnalyzing: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AIGuidedEditorV7>;

const PageNote = ({ title, body }: { title: string; body: string }) => (
  <Box sx={{ px: 3, pt: 2, pb: 0, bgcolor: eyeColors.background }}>
    <Typography sx={{ fontWeight: 700, color: eyeColors.text.primary }}>{title}</Typography>
    <Typography variant="body2" sx={{ color: eyeColors.text.secondary, maxWidth: 720 }}>
      {body}
    </Typography>
  </Box>
);

export const CompareShells: Story = {
  name: 'Compare Shells',
  render: () => (
    <Box sx={{ bgcolor: eyeColors.background, minHeight: '100vh', p: 2 }}>
      <Typography variant="h5" fontWeight={700} color={eyeColors.text.primary} sx={{ mb: 0.5 }}>
        AIGuidedEditor V7 shells
      </Typography>
      <Typography variant="body2" color={eyeColors.text.secondary} sx={{ mb: 2, maxWidth: 720 }}>
        Same components in every shell — content-type chips, layers, config, FeedbackPanel details,
        and FeedbackScreens modes. Only chrome and layout density change.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', xl: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {(
          [
            ['calm-workbench', 'A · Calm Workbench'],
            ['focused-write', 'B · Focused Write'],
            ['character-studio', 'C · Character Studio'],
          ] as const
        ).map(([shell, label]) => (
          <Box key={shell} sx={{ border: `1px solid ${eyeColors.border}`, borderRadius: 2, overflow: 'hidden' }}>
            <Typography
              sx={{
                px: 1.5,
                py: 1,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                color: eyeColors.text.secondary,
                bgcolor: eyeColors.paper,
                borderBottom: `1px solid ${eyeColors.border}`,
              }}
            >
              {label}
            </Typography>
            <Box sx={{ maxHeight: 720, overflow: 'auto', transform: 'scale(0.72)', transformOrigin: 'top left', width: '138.8%' }}>
              <AIGuidedEditorV7 shell={shell} initialFeedbackMode="panel" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  ),
};

export const V7A_CalmWorkbench: Story = {
  name: 'V7A / Calm Workbench',
  args: {
    shell: 'calm-workbench',
    initialFeedbackMode: 'panel',
  },
  render: (args) => (
    <>
      <PageNote
        title="Calm Workbench"
        body="Default recommendation. Full left stack + FeedbackPanel (chips & details). Switch Feedback view to Score / Explorer / Actions without losing Panel."
      />
      <AIGuidedEditorV7 {...args} />
    </>
  ),
};

export const V7A_ExplorerMode: Story = {
  name: 'V7A / Explorer feedback mode',
  args: {
    shell: 'calm-workbench',
    initialFeedbackMode: 'explorer',
  },
};

export const V7B_FocusedWrite: Story = {
  name: 'V7B / Focused Write',
  args: {
    shell: 'focused-write',
    initialFeedbackMode: 'actions',
  },
  render: (args) => (
    <>
      <PageNote
        title="Focused Write"
        body="Setup (chips, layers, config, cost) collapses behind one disclosure. Feedback opens in a drawer — Panel mode still has every section chip and option."
      />
      <AIGuidedEditorV7 {...args} />
    </>
  ),
};

export const V7C_CharacterStudio: Story = {
  name: 'V7C / Character Studio',
  args: {
    shell: 'character-studio',
    initialFeedbackMode: 'panel',
    moodLabel: 'Focused',
    energyLabel: 'Building',
  },
  render: (args) => (
    <>
      <PageNote
        title="Character Studio"
        body="Same components as A, with soft grid chrome, profile accent, and a static mood/energy strip. Feedback Panel remains the default."
      />
      <AIGuidedEditorV7 {...args} />
    </>
  ),
};

export const Analyzing: Story = {
  name: 'Analyzing',
  args: {
    shell: 'calm-workbench',
    initialFeedbackMode: 'panel',
    isAnalyzing: true,
  },
};

export const Generating: Story = {
  name: 'Generating',
  args: {
    shell: 'calm-workbench',
    isGenerating: true,
  },
};
