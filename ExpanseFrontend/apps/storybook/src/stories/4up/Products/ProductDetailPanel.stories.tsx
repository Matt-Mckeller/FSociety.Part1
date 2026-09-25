import type { Meta, StoryObj } from '@storybook/react';
import { ProductDetailPanel } from '@4up-features/products';
import { products } from '@seed';

// Note: This component uses useProductsStore internally to fetch product data.
// For full functionality in Storybook, the store needs to be pre-populated.

const meta = {
  title: '4up/Products/ProductDetailPanel',
  component: ProductDetailPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A slide-out drawer panel showing detailed product information including features, benefits, pricing, and marketing details. Note: Uses Zustand store internally for data fetching.',
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
} satisfies Meta<typeof ProductDetailPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    onClose: () => console.log('Panel closed'),
    productId: products[0]?.id || 'product-pro-001',
  },
  parameters: {
    docs: {
      description: {
        story: 'Panel in open state. Note: Without store mock, product details may not display.',
      },
    },
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onClose: () => console.log('Panel closed'),
    productId: null,
  },
};
