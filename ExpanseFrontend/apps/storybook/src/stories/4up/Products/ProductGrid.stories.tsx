import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid } from '@4up-features/products';
import { products } from '@seed';

const meta = {
  title: '4up/Products/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Grid layout displaying product cards with features, pricing, and action buttons.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: products as any,
    onProductClick: (id: string) => console.log('Product clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    products: [],
    onProductClick: () => {},
    onGenerateClick: () => {},
    loading: true,
  },
};

export const SingleProduct: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: [products[0]] as any,
    onProductClick: (id: string) => console.log('Product clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
  },
};

export const GridView: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: products as any,
    onProductClick: (id: string) => console.log('Product clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
    viewMode: 'grid',
  },
};

export const ListView: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: products as any,
    onProductClick: (id: string) => console.log('Product clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
    viewMode: 'list',
  },
};

export const ActiveProductsOnly: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: products.filter((p) => p.status === 'active') as any,
    onProductClick: (id: string) => console.log('Product clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
  },
};

export const AllStatuses: Story = {
  args: {
    products: [
      { ...products[0], status: 'active' as const },
      { ...products[1], status: 'beta' as const },
      { ...products[2], status: 'coming_soon' as const },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    onProductClick: (id: string) => console.log('Product clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
  },
};
