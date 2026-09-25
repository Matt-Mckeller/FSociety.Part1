import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '@4up-layout/Sidebar';
import { Box } from '@mui/material';

const meta: Meta<typeof Sidebar> = {
  title: '4up/Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Story />
        <Box 
          sx={{ 
            flex: 1, 
            p: 3, 
            bgcolor: 'grey.50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ color: 'text.secondary', textAlign: 'center' }}>
            Main content area
          </Box>
        </Box>
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};

export const WithContent: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Story />
        <Box 
          sx={{ 
            flex: 1, 
            p: 3, 
            bgcolor: 'background.default',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Box component="h1" sx={{ m: 0, fontSize: '1.5rem', fontWeight: 700 }}>
              Dashboard
            </Box>
            <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Welcome to your 4up dashboard
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 2,
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ fontWeight: 600, mb: 1 }}>Card {i}</Box>
                <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  Sample content for demonstration
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    ),
  ],
};
