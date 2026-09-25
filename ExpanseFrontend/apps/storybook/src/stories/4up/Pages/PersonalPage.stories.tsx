import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid } from '@mui/material';
import { PageHeader } from '@4up-ui/PageHeader';
import { SectionGroup } from '@4up-ui/SectionGroup';
import { 
  PersonalIdentityCard, 
  PersonalGoalsCard, 
  PersonalInterestsCard 
} from '@4up-features/personal';
import SkillsCard from '@4up-features/personal/SkillsCard';
import { defaultPersonalProfile, skillExperiences } from '@seed';

/**
 * Personal Profile Page Composition
 * 
 * Demonstrates the layout of the personal profile page.
 */

const PersonalPage = () => (
  <Box sx={{ p: 3 }}>
    <PageHeader
      title="Personal Profile"
      subtitle="Your personal identity and goals"
      action={{
        label: 'Edit Profile',
        onClick: () => console.log('Edit clicked'),
      }}
    />

    {/* Identity Section */}
    <SectionGroup id="identity" title="Identity" emoji="👤" defaultExpanded>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PersonalIdentityCard
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            profile={defaultPersonalProfile as any}
            loading={false}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PersonalInterestsCard
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            profile={defaultPersonalProfile as any}
            loading={false}
          />
        </Grid>
      </Grid>
    </SectionGroup>

    {/* Goals & Skills Section */}
    <SectionGroup id="goals-skills" title="Goals & Skills" emoji="🎯" defaultExpanded>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PersonalGoalsCard
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            profile={defaultPersonalProfile as any}
            loading={false}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SkillsCard
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            skills={skillExperiences as any}
            loading={false}
          />
        </Grid>
      </Grid>
    </SectionGroup>
  </Box>
);

const meta = {
  title: '4up/Pages/Personal',
  component: PersonalPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The personal profile page showing identity, interests, goals, and skills.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
