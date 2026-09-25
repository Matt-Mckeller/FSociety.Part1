import type { Meta, StoryObj } from '@storybook/react';
import { SamplePostsCard } from '@4up-features/business';
import { mockSamplePosts } from '../../../mocks/4up/businessMockData';

const meta = {
  title: '4up/Business/SamplePostsCard',
  component: SamplePostsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays sample posts that exemplify the brand voice with copy functionality.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SamplePostsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    posts: mockSamplePosts,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    posts: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    posts: [],
    loading: false,
  },
};

export const SinglePost: Story = {
  args: {
    posts: [mockSamplePosts[0]],
    loading: false,
  },
};

export const LongPosts: Story = {
  args: {
    posts: [
      `🚀 Big news! We just launched our completely redesigned AI content engine.

After 6 months of development and testing with over 100 beta users, we're thrilled to share what we've built.

Here's what's new:
✨ 5x faster content generation
🎯 Improved tone matching
📊 Better analytics integration
🔄 Multi-platform optimization

The best part? It's available to all users starting today.

Try it out and let us know what you think! Drop a comment below with your first impressions. 👇

#AIMarketing #ContentCreation #ProductLaunch`,
      `Thread: Why most businesses fail at social media (and how to fix it) 🧵

1/ They try to be everywhere at once. Instead, master 1-2 platforms before expanding.

2/ They focus on quantity over quality. One great post beats ten mediocre ones.

3/ They don't have a clear voice. Your brand should sound like a person, not a corporation.

4/ They ignore their audience. Social is a two-way conversation.

5/ They give up too soon. Consistency over 6+ months is where the magic happens.

Which of these resonates most with you?`,
    ],
    loading: false,
  },
};
