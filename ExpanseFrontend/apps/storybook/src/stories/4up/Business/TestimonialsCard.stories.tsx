import type { Meta, StoryObj } from '@storybook/react';
import TestimonialsCard from '@4up-features/business/TestimonialsCard';
import { mockTestimonials } from '../../../mocks/4up/businessMockData';

const meta = {
  title: '4up/Business/TestimonialsCard',
  component: TestimonialsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays customer testimonials with ratings, author info, and verification badges.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TestimonialsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    testimonials: mockTestimonials as any,
  },
};

export const SingleTestimonial: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    testimonials: [mockTestimonials[0]] as any,
  },
};

export const ManyTestimonials: Story = {
  args: {
    testimonials: [
      ...mockTestimonials,
      {
        id: 'testimonial-004',
        businessId: 'biz-demo-001',
        author: 'David Kim',
        authorRole: 'VP Marketing',
        authorCompany: 'Enterprise Co',
        narrative: 'We evaluated 10 different tools before choosing 4up. Best decision we made.',
        rating: 5,
        weight: 8,
        source: 'capterra' as const,
        isVerified: true,
        isPublic: true,
      },
      {
        id: 'testimonial-005',
        businessId: 'biz-demo-001',
        author: 'Lisa Support',
        authorRole: 'Social Media Manager',
        authorCompany: 'Digital Agency',
        narrative: 'Finally, a tool that understands brand voice. Our clients love the consistency.',
        rating: 5,
        weight: 7,
        source: 'twitter' as const,
        isVerified: false,
        isPublic: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};

export const MixedRatings: Story = {
  args: {
    testimonials: [
      { ...mockTestimonials[0], rating: 5 },
      { ...mockTestimonials[1], rating: 4 },
      {
        id: 'testimonial-low',
        businessId: 'biz-demo-001',
        author: 'Skeptical User',
        authorRole: 'Manager',
        authorCompany: 'Test Corp',
        narrative: 'Good tool but has a learning curve. Getting better with each update.',
        rating: 3,
        weight: 5,
        source: 'direct' as const,
        isVerified: true,
        isPublic: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};
