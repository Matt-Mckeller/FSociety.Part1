import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid, Typography } from '@mui/material';
import { Article, CalendarMonth, Star, TrendingUp } from '@mui/icons-material';
import { StatsCard } from '@4up-ui/StatsCard';
import { Card } from '@4up-ui/Card';

/**
 * Dashboard Page Composition
 * 
 * Demonstrates the layout and component composition of the main dashboard.
 * In the full app, this connects to multiple stores for live data.
 */

// Simple wrapper component for the story
const DashboardPage = () => (
  <Box sx={{ p: 3 }}>
    {/* Welcome Section */}
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Welcome back! 👋
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Managing 4up Marketing • Here&apos;s your marketing overview
      </Typography>
    </Box>

    {/* Stats Row */}
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatsCard
          title="Posts This Week"
          value="12"
          icon={<Article />}
          trend={{ value: 15 }}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatsCard
          title="Scheduled"
          value="8"
          subtitle="Next: Tomorrow 9:00 AM"
          icon={<CalendarMonth />}
          color="info"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatsCard
          title="Avg Rating"
          value="8.2"
          icon={<Star />}
          trend={{ value: 5 }}
          color="warning"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatsCard
          title="Engagement"
          value="+24%"
          subtitle="vs last week"
          icon={<TrendingUp />}
          trend={{ value: 24 }}
          color="success"
        />
      </Grid>
    </Grid>

    {/* Main Content Grid */}
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card title="Recent Content" subtitle="Your latest generated posts">
          <Box sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
            Recent content items would appear here
          </Box>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card title="Quick Generate" subtitle="Start creating new content">
          <Box sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
            Quick generation widget would appear here
          </Box>
        </Card>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Card title="This Week" subtitle="Your content calendar">
          <Box sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
            Week calendar widget would appear here
          </Box>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const meta = {
  title: '4up/Pages/Dashboard',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main dashboard page showing stats overview, recent content, quick generation, and weekly calendar. In production, data is loaded from useBusinessStore.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
