# Testing Guide

## Overview

The `@expanse/shell` package includes comprehensive integration tests covering:
- Template layouts (MinimalLayout, ComposableLayout, etc.)
- Accessibility features (WCAG 2.1 AA compliance)
- Responsive behavior
- Keyboard navigation
- Screen reader support

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage
```

## Test Structure

```
src/__tests__/
├── setup.ts                    # Jest setup and global mocks
├── utils.tsx                   # Test utilities and helpers
└── integration/
    ├── MinimalLayout.test.tsx      # Template integration tests
    ├── ComposableLayout.test.tsx   # Composition system tests
    ├── accessibility.test.tsx      # A11y feature tests
    └── responsive.test.tsx         # Responsive behavior tests
```

## Test Utilities

### Render Functions

```tsx
// Render with NavigationProvider
renderWithNavigation(
  <Component />,
  customGridConfig
);

// Render with ThemeProvider
renderWithTheme(<Component />);

// Render with both providers
renderWithProviders(<Component />);
```

### Mock Helpers

```tsx
// Create mock navigation state
const mockNav = createMockNavigation();

// Create mock grid
const mockGrid = createMockGrid(5, 5);
```

### Assertion Helpers

```tsx
// Check accessibility
expectAccessibleElement(element);
expectKeyboardAccessible(element);

// Simulate interactions
simulateKeyPress('ArrowUp');
simulateResize(375, 667);
```

## Writing Tests

### Template Tests

```tsx
describe('MyTemplate', () => {
  it('renders with preset', () => {
    renderWithProviders(
      <MyTemplate preset="default" autoPages={{}} />
    );
    
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
```

### Accessibility Tests

```tsx
it('is keyboard accessible', () => {
  renderWithProviders(<Component />);
  
  // Test keyboard navigation
  simulateKeyPress('ArrowRight');
  
  // Verify announcement
  expect(screen.getByRole('status')).toHaveTextContent('Navigated right');
});
```

### Responsive Tests

```tsx
it('adapts to mobile', async () => {
  simulateResize(375, 667);
  
  const { rerender } = renderWithProviders(<Component />);
  await waitForAsync();
  
  // Verify mobile behavior
  expect(screen.queryByTestId('desktop-only')).not.toBeInTheDocument();
});
```

## Coverage Goals

The test suite aims for:
- **70%** line coverage
- **70%** branch coverage
- **70%** function coverage
- **70%** statement coverage

## Best Practices

1. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Test user behavior**: Focus on what users see and do
3. **Avoid implementation details**: Don't test internal state
4. **Use async utilities**: Always await `waitFor` and `findBy` queries
5. **Clean up**: Tests automatically clean up, but be mindful of timers

## Debugging Tests

```bash
# Run a specific test file
pnpm test MinimalLayout.test

# Run tests matching pattern
pnpm test --testNamePattern="keyboard"

# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Main branch commits
- Pre-commit hooks (if configured)

Minimum coverage thresholds are enforced in CI.
