import type { Meta, StoryObj } from '@storybook/react';
import SkillsCard from '@4up-features/personal/SkillsCard';
import { skillExperiences } from '@seed';

const meta = {
  title: '4up/Personal/SkillsCard',
  component: SkillsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays skills with XP levels, tiers, and category filtering.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkillsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skills: skillExperiences as any,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    skills: [],
    loading: true,
  },
};

export const SingleSkill: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skills: [skillExperiences[0]] as any,
    loading: false,
  },
};

export const AllMasterTier: Story = {
  args: {
    skills: [
      { id: 'skill-m1', name: 'Marketing Strategy', category: 'domain' as const, level: 95, tier: 3 as const, xp: 9500, xpToNext: 500 },
      { id: 'skill-m2', name: 'Content Creation', category: 'creative' as const, level: 88, tier: 3 as const, xp: 8800, xpToNext: 1200 },
      { id: 'skill-m3', name: 'Team Leadership', category: 'leadership' as const, level: 82, tier: 3 as const, xp: 8200, xpToNext: 800 },
      { id: 'skill-m4', name: 'Public Speaking', category: 'communication' as const, level: 75, tier: 3 as const, xp: 7500, xpToNext: 500 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    loading: false,
  },
};

export const BeginnerSkills: Story = {
  args: {
    skills: [
      { id: 'skill-b1', name: 'Python', category: 'technical' as const, level: 15, tier: 1 as const, xp: 1500, xpToNext: 1500 },
      { id: 'skill-b2', name: 'Video Editing', category: 'creative' as const, level: 22, tier: 1 as const, xp: 2200, xpToNext: 800 },
      { id: 'skill-b3', name: 'German', category: 'language' as const, level: 8, tier: 1 as const, xp: 800, xpToNext: 1200 },
      { id: 'skill-b4', name: 'Machine Learning', category: 'technical' as const, level: 28, tier: 1 as const, xp: 2800, xpToNext: 1200 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    loading: false,
  },
};

export const MixedTiers: Story = {
  args: {
    skills: [
      { id: 'skill-x1', name: 'Marketing', category: 'domain' as const, level: 92, tier: 3 as const, xp: 9200, xpToNext: 800 },
      { id: 'skill-x2', name: 'Design', category: 'creative' as const, level: 55, tier: 2 as const, xp: 5500, xpToNext: 1500 },
      { id: 'skill-x3', name: 'Coding', category: 'technical' as const, level: 25, tier: 1 as const, xp: 2500, xpToNext: 1500 },
      { id: 'skill-x4', name: 'Leadership', category: 'leadership' as const, level: 78, tier: 3 as const, xp: 7800, xpToNext: 1200 },
      { id: 'skill-x5', name: 'Writing', category: 'creative' as const, level: 68, tier: 3 as const, xp: 6800, xpToNext: 1200 },
      { id: 'skill-x6', name: 'Analytics', category: 'analytical' as const, level: 42, tier: 2 as const, xp: 4200, xpToNext: 1800 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    loading: false,
  },
};
