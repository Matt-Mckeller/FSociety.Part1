import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { VariationsPanel } from '../components';
import { lightColors } from '../constants';
import type { ContentVariation } from '../types';

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ bgcolor: lightColors.background, p: 3, minHeight: '100vh' }}>
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>{children}</Box>
  </Box>
);

const SAMPLE_VARIATIONS: ContentVariation[] = [
  {
    id: 'var-1',
    type: 'post',
    label: 'Original',
    icon: '📝',
    content: `🚀 Transform your business with AI-powered automation!\n\nTired of manual processes eating up your team's valuable time? Our platform helps you:\n\n✅ Automate repetitive tasks\n✅ Reduce operational costs by 40%\n✅ Free your team for strategic work\n\nJoin 500+ companies already seeing results.\n\n👉 Start your free trial today!`,
    layersApplied: ['initial-generation', 'professional-revision'],
    focusArea: 'engagement',
    style: 'balanced',
    score: 82,
    generatedAt: new Date(),
  },
  {
    id: 'var-2',
    type: 'post',
    label: 'Alternative A',
    icon: '📝',
    content: `The average knowledge worker spends 2.5 hours/day on repetitive tasks.\n\nThat's 30% of your workday. Gone.\n\nWe help companies reclaim that time with intelligent automation that:\n\n→ Learns from your workflows\n→ Integrates with existing tools\n→ Scales with your growth\n\nReady to give your team their time back?\n\n🔗 Link in bio for your free assessment.`,
    layersApplied: ['initial-generation', 'data-stacking'],
    focusArea: 'education',
    style: 'data-driven',
    score: 78,
    generatedAt: new Date(),
  },
  {
    id: 'var-3',
    type: 'post',
    label: 'Alternative B',
    icon: '📝',
    content: `"I used to dread Monday mornings."\n\n10 hours of data entry. Every. Single. Week.\n\nNow? That same work takes 12 minutes.\n\nNot because I work faster—because I don't do it at all.\n\nOur AI handles the mundane so you can focus on what matters.\n\nThe future of work isn't about working harder.\nIt's about working smarter.\n\n#Automation #FutureOfWork #AI`,
    layersApplied: ['initial-generation', 'emotional-resonance'],
    focusArea: 'storytelling',
    style: 'narrative',
    score: 85,
    generatedAt: new Date(),
  },
];

const meta: Meta<typeof VariationsPanel> = {
  title: 'Screens/AIGuidedEditorV6/Components/VariationsPanel',
  component: VariationsPanel,
  decorators: [(Story) => <ComponentWrapper><Story /></ComponentWrapper>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Component = () => {
      const [selectedId, setSelectedId] = React.useState(SAMPLE_VARIATIONS[0].id);
      return (
        <VariationsPanel
          variations={SAMPLE_VARIATIONS}
          selectedVariationId={selectedId}
          onSelectVariation={setSelectedId}
          onEditVariation={(id: string) => console.log('Edit:', id)}
          onCopyVariation={(id: string) => console.log('Copy:', id)}
          onRegenerateVariation={(id: string) => console.log('Regenerate:', id)}
          contentType="post"
        />
      );
    };
    return <Component />;
  },
};

export const SingleVariation: Story = {
  render: () => {
    const Component = () => {
      const [selectedId, setSelectedId] = React.useState(SAMPLE_VARIATIONS[0].id);
      return (
        <VariationsPanel
          variations={[SAMPLE_VARIATIONS[0]]}
          selectedVariationId={selectedId}
          onSelectVariation={setSelectedId}
          onEditVariation={(id: string) => console.log('Edit:', id)}
          onCopyVariation={(id: string) => console.log('Copy:', id)}
          onRegenerateVariation={(id: string) => console.log('Regenerate:', id)}
          contentType="post"
        />
      );
    };
    return <Component />;
  },
};

export const Generating: Story = {
  render: () => {
    const Component = () => {
      const [selectedId, setSelectedId] = React.useState(SAMPLE_VARIATIONS[0].id);
      return (
        <VariationsPanel
          variations={SAMPLE_VARIATIONS}
          selectedVariationId={selectedId}
          onSelectVariation={setSelectedId}
          onEditVariation={(id: string) => console.log('Edit:', id)}
          onCopyVariation={(id: string) => console.log('Copy:', id)}
          onRegenerateVariation={(id: string) => console.log('Regenerate:', id)}
          contentType="post"
          isGenerating={true}
        />
      );
    };
    return <Component />;
  },
};
