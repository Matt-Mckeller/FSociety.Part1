import type { Meta, StoryObj } from '@storybook/react';
import { PersonaDetailPanel } from '@4up-features/audience';
import { personas } from '@seed';

// Note: This component uses useAudienceStore internally to fetch persona data.
// For full functionality in Storybook, the store needs to be pre-populated.
// This story shows the component structure but may not display all data sections.

const meta = {
  title: '4up/Audience/PersonaDetailPanel',
  component: PersonaDetailPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A slide-out drawer panel showing detailed persona information including demographics, pain points, goals, and motivations. Note: Uses Zustand store internally for data fetching.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PersonaDetailPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Note: The PersonaDetailPanel uses useAudienceStore to fetch persona data by ID.
// In Storybook without the full app context, the drawer will open but may show 
// "no persona" because the store isn't populated. 
// This demonstrates the component's visual structure.

export const Open: Story = {
  args: {
    open: true,
    onClose: () => console.log('Panel closed'),
    personaId: personas[0]?.id || 'persona-marcus-001',
  },
  parameters: {
    docs: {
      description: {
        story: 'Panel in open state. Note: Without store mock, persona details may not display.',
      },
    },
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onClose: () => console.log('Panel closed'),
    personaId: null,
  },
};

// For complete functionality, consider these patterns:
// 1. Mock the useAudienceStore at the decorator level
// 2. Pre-populate the Zustand store before rendering
// 3. Create a wrapper component that provides mock data

/**
 * Example of how to provide mock data (requires store module mock):
 * 
 * import { useAudienceStore } from '@/data/store/audienceStore';
 * 
 * beforeEach(() => {
 *   useAudienceStore.setState({
 *     personas: mockUserPersonas,
 *     segments: mockAudienceSegments,
 *     painPoints: mockPainPoints,
 *     goals: [],
 *     motivations: [],
 *   });
 * });
 */
