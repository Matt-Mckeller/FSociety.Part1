import type { Meta, StoryObj } from '@storybook/react';
import { SectionGroup } from '@4up-ui/SectionGroup';
import { Box, Typography, Grid } from '@mui/material';
import { Card } from '@4up-ui/Card';

const meta: Meta<typeof SectionGroup> = {
  title: '4up/UI/SectionGroup',
  component: SectionGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    priority: {
      control: 'select',
      options: [1, 2, 3],
      description: 'Priority tier: 1 & 2 are expanded by default, 3 is collapsed',
    },
    defaultExpanded: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionGroup>;

export const Default: Story = {
  args: {
    id: 'section-1',
    title: '4up/Section Title',
    emoji: '📋',
    priority: 1,
    itemCount: 3,
    children: (
      <Typography>
        This is the content inside the section group. It can contain any React components.
      </Typography>
    ),
  },
};

export const Priority1AlwaysExpanded: Story = {
  args: {
    id: 'identity',
    title: '4up/Identity',
    emoji: '👤',
    priority: 1,
    itemCount: 1,
    children: (
      <Card title="Identity Card">
        <Typography>Priority 1 sections are always expanded by default.</Typography>
      </Card>
    ),
  },
};

export const Priority2ExpandedByDefault: Story = {
  args: {
    id: 'skills',
    title: '4up/Skills & Experience',
    emoji: '🎮',
    priority: 2,
    itemCount: 12,
    children: (
      <Card title="Skills Card">
        <Typography>Priority 2 sections are expanded by default.</Typography>
      </Card>
    ),
  },
};

export const Priority3CollapsedByDefault: Story = {
  args: {
    id: 'media',
    title: '4up/Media',
    emoji: '🖼️',
    priority: 3,
    itemCount: 5,
    children: (
      <Card title="Media Card">
        <Typography>Priority 3 sections are collapsed by default.</Typography>
      </Card>
    ),
  },
};

export const WithMultipleCards: Story = {
  args: {
    id: 'goals-interests',
    title: '4up/Goals & Interests',
    emoji: '🎯',
    priority: 2,
    itemCount: 2,
    children: (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card title="Goals">
            <Typography>Primary goals content goes here.</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card title="Interests">
            <Typography>Interests sidebar.</Typography>
          </Card>
        </Grid>
      </Grid>
    ),
  },
};

export const MultipleSections: Story = {
  decorators: [
    () => (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SectionGroup
          id="identity"
          title="Identity"
          emoji="👤"
          priority={1}
          itemCount={1}
        >
          <Card title="Identity Card">
            <Typography>Core identity information.</Typography>
          </Card>
        </SectionGroup>
        
        <SectionGroup
          id="skills"
          title="Skills & Experience"
          emoji="🎮"
          priority={2}
          itemCount={12}
        >
          <Card title="Skills">
            <Typography>Skills with XP tracking.</Typography>
          </Card>
        </SectionGroup>
        
        <SectionGroup
          id="goals"
          title="Goals & Interests"
          emoji="🎯"
          priority={2}
          itemCount={5}
        >
          <Card title="Goals">
            <Typography>Personal and professional goals.</Typography>
          </Card>
        </SectionGroup>
        
        <SectionGroup
          id="media"
          title="Media"
          emoji="🖼️"
          priority={3}
          itemCount={8}
        >
          <Card title="Media Library">
            <Typography>Photos and videos (collapsed by default).</Typography>
          </Card>
        </SectionGroup>
      </Box>
    ),
  ],
};

export const WithoutEmoji: Story = {
  args: {
    id: 'settings',
    title: '4up/Settings',
    priority: 2,
    itemCount: 4,
    children: (
      <Card title="Settings Card">
        <Typography>Section without an emoji prefix.</Typography>
      </Card>
    ),
  },
};

export const WithoutItemCount: Story = {
  args: {
    id: 'about',
    title: '4up/About',
    emoji: 'ℹ️',
    priority: 2,
    children: (
      <Card title="About">
        <Typography>Section without an item count displayed.</Typography>
      </Card>
    ),
  },
};
