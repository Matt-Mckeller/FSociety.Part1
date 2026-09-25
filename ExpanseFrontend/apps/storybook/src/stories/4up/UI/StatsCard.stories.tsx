import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from '@4up-ui/StatsCard';
import { Box } from '@mui/material';
import { 
  TrendingUp, 
  People, 
  AttachMoney, 
  Visibility,
  Article,
  ThumbUp,
} from '@mui/icons-material';

const meta: Meta<typeof StatsCard> = {
  title: '4up/UI/StatsCard',
  component: StatsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 300 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {
  args: {
    title: '4up/Total Revenue',
    value: '$45,231',
    subtitle: '4up/This month',
  },
};

export const WithIcon: Story = {
  args: {
    title: '4up/Total Views',
    value: '12,543',
    subtitle: '4up/Last 30 days',
    icon: <Visibility />,
    color: 'primary',
  },
};

export const WithPositiveTrend: Story = {
  args: {
    title: '4up/New Users',
    value: '1,234',
    subtitle: '4up/This week',
    icon: <People />,
    color: 'success',
    trend: {
      value: 12.5,
      label: 'vs last week',
    },
  },
};

export const WithNegativeTrend: Story = {
  args: {
    title: '4up/Bounce Rate',
    value: '32.4%',
    subtitle: '4up/This month',
    icon: <TrendingUp />,
    color: 'error',
    trend: {
      value: -5.2,
      label: 'vs last month',
    },
  },
};

export const Loading: Story = {
  args: {
    title: '4up/Loading...',
    value: '0',
    loading: true,
  },
};

export const StatsGrid: Story = {
  decorators: [
    () => (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, maxWidth: 600 }}>
        <StatsCard
          title="Total Posts"
          value="156"
          icon={<Article />}
          color="primary"
          trend={{ value: 8, label: 'this month' }}
        />
        <StatsCard
          title="Engagement"
          value="4.2K"
          icon={<ThumbUp />}
          color="success"
          trend={{ value: 23, label: 'vs last month' }}
        />
        <StatsCard
          title="Revenue"
          value="$8,450"
          icon={<AttachMoney />}
          color="warning"
          trend={{ value: -3, label: 'vs last month' }}
        />
        <StatsCard
          title="Followers"
          value="12.5K"
          icon={<People />}
          color="info"
          trend={{ value: 5.8, label: 'this week' }}
        />
      </Box>
    ),
  ],
};
