import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { PageHeader } from '@4up-ui/PageHeader';
import { ProductGrid } from '@4up-features/products';
import { products } from '@seed';

/**
 * Products Page Composition
 * 
 * Demonstrates the layout of the products page with product grid.
 */

const ProductsPage = () => (
  <Box sx={{ p: 3 }}>
    <PageHeader
      title="Products"
      subtitle="Manage your products and services"
      action={{
        label: 'Add Product',
        onClick: () => console.log('Add product clicked'),
      }}
    />

    <Box sx={{ mt: 3 }}>
      <ProductGrid
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        products={products as any}
        onProductClick={(id) => console.log('Product clicked:', id)}
        onGenerateClick={(id) => console.log('Generate for product:', id)}
        loading={false}
      />
    </Box>
  </Box>
);

const meta = {
  title: '4up/Pages/Products',
  component: ProductsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The products page showing product grid with filtering and detail panel.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
