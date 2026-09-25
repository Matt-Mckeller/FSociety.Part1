/**
 * Vitest Setup File
 *
 * Provides browser API mocks and jest-dom matchers
 */

import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Map jest → vi for compatibility with existing test utilities
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).jest = vi;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private callback: IntersectionObserverCallback) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

global.ResizeObserver = MockResizeObserver;

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock requestAnimationFrame with proper timing simulation
let rafId = 0;
const rafCallbacks = new Map<number, FrameRequestCallback>();

global.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
  const id = ++rafId;
  rafCallbacks.set(id, callback);
  // Execute async to avoid infinite loops
  setTimeout(() => {
    const cb = rafCallbacks.get(id);
    if (cb) {
      rafCallbacks.delete(id);
      cb(performance.now());
    }
  }, 0);
  return id;
});

global.cancelAnimationFrame = vi.fn((id: number) => {
  rafCallbacks.delete(id);
});

// Suppress specific React warnings that appear in tests
const originalError = console.error;
console.error = (...args: unknown[]) => {
  const message = args[0];
  if (
    typeof message === 'string' &&
    (message.includes('Warning: useLayoutEffect does nothing on the server') ||
      message.includes('Warning: ReactDOM.render is no longer supported') ||
      message.includes('act(...)'))
  ) {
    return;
  }
  originalError.apply(console, args);
};
