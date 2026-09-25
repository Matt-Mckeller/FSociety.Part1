import type { Meta, StoryObj } from '@storybook/react';
import BrandThemesCard from '@4up-features/business/BrandThemesCard';
import { brandThemes } from '@seed';

const mockBrandTheme = brandThemes[0];

const meta = {
  title: '4up/Business/BrandThemesCard',
  component: BrandThemesCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays brand themes including core and secondary themes with keywords and weights.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BrandThemesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brandTheme: mockBrandTheme as any,
  },
};

export const OnlyCoreThemes: Story = {
  args: {
    brandTheme: {
      ...mockBrandTheme,
      secondaryThemes: [],
    } as any,
  },
};

export const WithMotifs: Story = {
  args: {
    brandTheme: {
      ...mockBrandTheme,
      motifs: ['Arrows pointing up', 'Connected nodes', 'Growth curves', 'Lightning bolts'],
      symbols: ['Rocket', 'Chart', 'Star', 'Trophy'],
    } as any,
  },
};
