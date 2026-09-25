import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { PageHeader } from '@4up-ui/PageHeader';
import { SectionGroup } from '@4up-ui/SectionGroup';
import { SegmentList, PersonaGrid } from '@4up-features/audience';
import { audienceSegments, personas } from '@seed';

/**
 * Audience Page Composition
 * 
 * Demonstrates the layout of the audience page with segments and personas.
 */

const AudiencePage = () => (
  <Box sx={{ p: 3 }}>
    <PageHeader
      title="Audience"
      subtitle="Manage your target personas and segments"
      action={{
        label: 'Add Persona',
        onClick: () => console.log('Add persona clicked'),
      }}
    />

    {/* Segments Section */}
    <Box sx={{ mb: 3 }}>
      <SegmentList
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        segments={audienceSegments as any}
        selectedId={null}
        onSelect={(id) => console.log('Segment selected:', id)}
        loading={false}
      />
    </Box>

    {/* Personas Section */}
    <SectionGroup id="personas" title="Personas" emoji="👥" defaultExpanded>
      <PersonaGrid
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        personas={personas as any}
        onPersonaClick={(id) => console.log('Persona clicked:', id)}
        onGenerateClick={(id) => console.log('Generate for persona:', id)}
        loading={false}
      />
    </SectionGroup>
  </Box>
);

const meta = {
  title: '4up/Pages/Audience',
  component: AudiencePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The audience page showing segment filters and persona grid with detail panel integration.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AudiencePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
