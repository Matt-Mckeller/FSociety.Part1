import type { Meta, StoryObj } from '@storybook/react';
import { PageSidebar, type PageSection } from '@4up-ui/PageSidebar';
import { Box } from '@mui/material';
import { useState } from 'react';

const meta: Meta<typeof PageSidebar> = {
  title: '4up/UI/PageSidebar',
  component: PageSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Story />
        <Box sx={{ flex: 1, p: 3, bgcolor: 'grey.50' }}>
          <Box sx={{ color: 'text.secondary', textAlign: 'center', pt: 10 }}>
            Main content area
          </Box>
        </Box>
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageSidebar>;

const personalSections: PageSection[] = [
  { id: 'identity', title: '4up/Identity', emoji: '👤' },
  { id: 'skills', title: '4up/Skills & Experience', emoji: '🎮' },
  { id: 'goals-interests', title: '4up/Goals & Interests', emoji: '🎯' },
];

const businessSections: PageSection[] = [
  { id: 'identity', title: '4up/Identity', emoji: '🏢' },
  { id: 'purpose', title: '4up/Purpose & Goals', emoji: '🎯' },
  { id: 'voice', title: '4up/Brand Voice', emoji: '🗣️' },
  { id: 'design', title: '4up/Design System', emoji: '🎨' },
  { id: 'stories', title: '4up/Stories', emoji: '📖' },
  { id: 'research', title: '4up/Research', emoji: '🔬' },
];

const audienceSections: PageSection[] = [
  { id: 'segments', title: '4up/Segments', emoji: '📊' },
  { id: 'personas', title: '4up/Personas', emoji: '👥' },
  { id: 'pain-points', title: '4up/Pain Points', emoji: '😤' },
  { id: 'behaviors', title: '4up/Behaviors', emoji: '🔍' },
];

export const Personal: Story = {
  args: {
    pageTitle: 'Personal Profile',
    sections: personalSections,
    activeSection: 'identity',
  },
};

export const Business: Story = {
  args: {
    pageTitle: 'Business Profile',
    sections: businessSections,
    activeSection: 'identity',
  },
};

export const Audience: Story = {
  args: {
    pageTitle: 'Audience',
    sections: audienceSections,
    activeSection: 'segments',
  },
};

export const WithActiveSectionChange: Story = {
  render: function Render() {
    const [activeSection, setActiveSection] = useState('identity');
    
    return (
      <PageSidebar
        pageTitle="Personal Profile"
        sections={personalSections}
        activeSection={activeSection}
        onSectionClick={setActiveSection}
      />
    );
  },
};

export const MinimalSections: Story = {
  args: {
    pageTitle: 'Settings',
    sections: [
      { id: 'general', title: '4up/General', emoji: '⚙️' },
      { id: 'account', title: '4up/Account', emoji: '👤' },
    ],
    activeSection: 'general',
  },
};

export const ManySections: Story = {
  args: {
    pageTitle: 'Content Strategy',
    sections: [
      { id: 'overview', title: '4up/Overview', emoji: '📋' },
      { id: 'pillars', title: '4up/Content Pillars', emoji: '🏛️' },
      { id: 'themes', title: '4up/Themes', emoji: '🎭' },
      { id: 'topics', title: '4up/Topics', emoji: '💡' },
      { id: 'messages', title: '4up/Key Messages', emoji: '💬' },
      { id: 'campaigns', title: '4up/Campaigns', emoji: '📣' },
      { id: 'calendar', title: '4up/Calendar', emoji: '📅' },
      { id: 'analytics', title: '4up/Analytics', emoji: '📊' },
    ],
    activeSection: 'overview',
  },
};
