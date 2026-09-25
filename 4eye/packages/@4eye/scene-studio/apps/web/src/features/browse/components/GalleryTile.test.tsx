import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { GalleryTile } from './GalleryTile.js';
import type { Asset } from '@4eye/scene-studio-shared';
import * as React from 'react';

// Mock dependencies
vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: () => false,
}));
vi.mock('../../../store/api.js', () => ({
  useUpdateAssetMutation: () => [vi.fn()],
}));
vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: undefined,
    isDragging: false,
  }),
}));
vi.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: { toString: () => '' },
  },
}));

vi.mock('./InlineText.js', () => ({
  InlineText: ({ value }: { value: string }) => <span>{value}</span>, // Simple mock
}));
vi.mock('./TagChips.js', () => ({
  TagChips: () => <div />, // Simple mock
}));

const mockAsset: Asset = {
  id: 'test-asset-123',
  kind: 'image',
  origin: { source: 'imported' },
  display: { title: 'Test Mock Image', description: '', sceneCode: null },
  catalog: { folder: 'test', order: 0, starred: false, tags: [], collections: [] },
  history: [],
  meta: {} as any,
  created: Date.now(),
};

test('renders image by default for image asset', () => {
  render(<GalleryTile asset={mockAsset} />);
  expect(screen.getByAltText('Test Mock Image')).toBeInTheDocument();
});

test('renders fallback when image errors', () => {
  render(<GalleryTile asset={mockAsset} />);
  const img = screen.getByAltText('Test Mock Image');
  fireEvent.error(img);
  expect(screen.getByText('No Image Available')).toBeInTheDocument();
  expect(screen.queryByAltText('Test Mock Image')).not.toBeInTheDocument();
});
