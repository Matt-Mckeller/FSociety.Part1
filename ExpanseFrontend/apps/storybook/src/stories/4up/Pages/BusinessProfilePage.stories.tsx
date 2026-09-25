import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid } from '@mui/material';
import { PageHeader } from '@4up-ui/PageHeader';
import { SectionGroup } from '@4up-ui/SectionGroup';
import { Card } from '@4up-ui/Card';
import { 
  BusinessIdentityCard,
  VoicePreviewCard,
  GoalsCard,
  PurposeCard,
  PainPointsCard,
} from '@4up-features/business';
import { 
  defaultBusiness, 
  defaultBrandVoice, 
  defaultCompanyGoals, 
  defaultCompanyPurpose,
  painPoints,
} from '@seed';

/**
 * Business Profile Page Composition
 * 
 * Demonstrates the layout of the business profile page with sidebar navigation
 * and multiple card sections.
 */

const BusinessProfilePage = () => (
  <Box sx={{ p: 3 }}>
    <PageHeader
      title="Business Profile"
      subtitle="Define your brand identity and strategy"
      action={{
        label: 'Edit Profile',
        onClick: () => console.log('Edit clicked'),
      }}
    />

    {/* Identity Section */}
    <SectionGroup id="identity" title="Identity" emoji="🎯" defaultExpanded>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <BusinessIdentityCard profile={defaultBusiness as any} loading={false} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <VoicePreviewCard voice={defaultBrandVoice as any} loading={false} />
        </Grid>
      </Grid>
    </SectionGroup>

    {/* Purpose & Strategy Section */}
    <SectionGroup id="purpose-strategy" title="Purpose & Strategy" emoji="📋" defaultExpanded>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <PurposeCard purpose={defaultCompanyPurpose as any} loading={false} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <GoalsCard goals={defaultCompanyGoals as any} loading={false} />
        </Grid>
      </Grid>
    </SectionGroup>

    {/* Market Focus Section */}
    <SectionGroup id="market-focus" title="Market Focus" emoji="🔍" defaultExpanded>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <PainPointsCard painPoints={painPoints as any} loading={false} />
        </Grid>
      </Grid>
    </SectionGroup>

    {/* Resources Section */}
    <SectionGroup id="resources" title="Resources" emoji="📎">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card title="Logos" subtitle="Brand logo variants">
            <Box sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
              Logo variants would appear here
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card title="URLs" subtitle="Important links">
            <Box sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
              Business URLs would appear here
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card title="Notes" subtitle="Business notes">
            <Box sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
              Notes would appear here
            </Box>
          </Card>
        </Grid>
      </Grid>
    </SectionGroup>
  </Box>
);

const meta = {
  title: '4up/Pages/BusinessProfile',
  component: BusinessProfilePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The business profile page showing identity, brand voice, purpose, goals, and pain points organized into collapsible sections.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BusinessProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
