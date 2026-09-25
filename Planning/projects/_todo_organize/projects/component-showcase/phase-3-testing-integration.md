# Phase 3: Testing Integration

**Duration:** 3-5 days
**Priority:** High - Ensures component reliability
**Goal:** Add comprehensive testing with story-based interaction tests and optional traditional unit tests

---

## Objectives

- ✅ Add interaction tests to critical component stories
- ✅ Set up test runner for CI/CD
- ✅ Create test utilities and helpers
- ✅ Configure Jest and React Testing Library (optional)
- ✅ Establish testing patterns and best practices
- ✅ Achieve baseline test coverage

---

## Testing Strategy

### Focus Areas (Priority Order)

**1. Critical User Interactions (Must Have)**
- Button clicks and event handlers
- Form input and validation
- Modal open/close
- Navigation interactions
- Theme switching

**2. Component States (Should Have)**
- Loading states
- Error states
- Empty/no-data states
- Disabled states

**3. Complex Workflows (Nice to Have)**
- Multi-step forms
- Table sorting/filtering
- Authentication flows

---

## Part A: Story-Based Interaction Tests

### Step 1: Update Stories with Interaction Tests
**Time:** 2-3 days

#### Example: Button with Click Test

Update `stories/theme/buttons/Button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from '@storybook/test';
import { Button } from '@mui/material';

const meta: Meta<typeof Button> = {
  title: 'Theme/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic interaction test
export const ClickableButton: Story = {
  args: {
    variant: 'contained',
    children: 'Click Me',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });

    // Test: Button is visible
    await expect(button).toBeInTheDocument();

    // Test: Button is enabled
    await expect(button).toBeEnabled();

    // Test: Click the button
    await userEvent.click(button);

    // Test: onClick was called
    await expect(args.onClick).toHaveBeenCalled();
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

// Test disabled state
export const DisabledButton: Story = {
  args: {
    variant: 'contained',
    children: 'Disabled',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test: Button is disabled
    await expect(button).toBeDisabled();

    // Test: Try to click (should not trigger onClick)
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
```

#### Example: Form Input with Validation Test

Update `stories/forms/EmailInput.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { EmailAddressInput } from 'expanse.ui/form';

const meta: Meta<typeof EmailAddressInput> = {
  title: 'Forms/Email Input',
  component: EmailAddressInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Test input and validation
export const ValidationTest: Story = {
  args: {
    label: 'Email Address',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/email address/i);

    // Test: Input is initially empty
    await expect(input).toHaveValue('');

    // Test: Type invalid email
    await userEvent.type(input, 'invalid-email');
    
    // Test: Trigger validation (blur)
    await userEvent.tab();

    // Test: Error message appears
    await waitFor(async () => {
      const errorMessage = await canvas.findByText(/invalid.*email/i);
      await expect(errorMessage).toBeInTheDocument();
    });

    // Test: Clear and type valid email
    await userEvent.clear(input);
    await userEvent.type(input, 'test@example.com');
    await userEvent.tab();

    // Test: Error message disappears
    await waitFor(async () => {
      const errorMessage = canvas.queryByText(/invalid.*email/i);
      await expect(errorMessage).not.toBeInTheDocument();
    });

    // Test: Input has correct value
    await expect(input).toHaveValue('test@example.com');
  },
};

// Test keyboard navigation
export const KeyboardNavigationTest: Story = {
  args: {
    label: 'Email Address',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/email address/i);

    // Test: Focus with keyboard
    await userEvent.tab();
    await expect(input).toHaveFocus();

    // Test: Type with keyboard
    await userEvent.keyboard('test@example.com');
    await expect(input).toHaveValue('test@example.com');

    // Test: Clear with keyboard
    await userEvent.keyboard('{Control>}a{/Control}');
    await userEvent.keyboard('{Backspace}');
    await expect(input).toHaveValue('');
  },
};
```

#### Example: Modal Interaction Test

Create `stories/theme/layout/Modal.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { useState } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';

const ModalExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6">
            Modal Title
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Modal content goes here
          </Typography>
          <Button onClick={() => setOpen(false)} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const meta: Meta<typeof ModalExample> = {
  title: 'Theme/Layout/Modal',
  component: ModalExample,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InteractionTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test: Modal is initially closed
    await expect(canvas.queryByText(/modal title/i)).not.toBeInTheDocument();

    // Test: Click open button
    const openButton = canvas.getByRole('button', { name: /open modal/i });
    await userEvent.click(openButton);

    // Test: Modal appears
    await waitFor(async () => {
      const modalTitle = await canvas.findByText(/modal title/i);
      await expect(modalTitle).toBeInTheDocument();
    });

    // Test: Modal content is visible
    await expect(canvas.getByText(/modal content/i)).toBeInTheDocument();

    // Test: Click close button
    const closeButton = canvas.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    // Test: Modal disappears
    await waitFor(async () => {
      await expect(canvas.queryByText(/modal title/i)).not.toBeInTheDocument();
    });
  },
};

// Test ESC key closes modal
export const EscapeKeyTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open modal
    const openButton = canvas.getByRole('button', { name: /open modal/i });
    await userEvent.click(openButton);

    // Wait for modal
    await waitFor(async () => {
      await expect(canvas.getByText(/modal title/i)).toBeInTheDocument();
    });

    // Press ESC
    await userEvent.keyboard('{Escape}');

    // Modal should close
    await waitFor(async () => {
      await expect(canvas.queryByText(/modal title/i)).not.toBeInTheDocument();
    });
  },
};
```

### Step 2: Create Test Utilities
**Time:** 3-4 hours

Create `utils/testHelpers.ts`:

```typescript
import { within, userEvent } from '@storybook/test';

/**
 * Test utilities for common testing patterns
 */

// Fill out a form
export const fillForm = async (canvas: ReturnType<typeof within>, formData: Record<string, string>) => {
  for (const [label, value] of Object.entries(formData)) {
    const input = canvas.getByLabelText(new RegExp(label, 'i'));
    await userEvent.clear(input);
    await userEvent.type(input, value);
  }
};

// Wait for loading to complete
export const waitForLoadingToFinish = async (canvas: ReturnType<typeof within>) => {
  const loadingSpinner = canvas.queryByRole('progressbar');
  if (loadingSpinner) {
    await userEvent.waitFor(() => {
      expect(canvas.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  }
};

// Click button and wait for action
export const clickAndWait = async (
  canvas: ReturnType<typeof within>,
  buttonText: string | RegExp,
  waitForText?: string | RegExp
) => {
  const button = canvas.getByRole('button', { name: buttonText });
  await userEvent.click(button);
  
  if (waitForText) {
    await userEvent.waitFor(() => {
      expect(canvas.getByText(waitForText)).toBeInTheDocument();
    });
  }
};

// Check for validation errors
export const expectValidationError = async (
  canvas: ReturnType<typeof within>,
  errorMessage: string | RegExp
) => {
  await userEvent.waitFor(() => {
    expect(canvas.getByText(errorMessage)).toBeInTheDocument();
  });
};

// Type and tab (trigger validation)
export const typeAndBlur = async (input: HTMLElement, value: string) => {
  await userEvent.type(input, value);
  await userEvent.tab();
};
```

### Step 3: Set Up Test Runner
**Time:** 1 hour

The test runner is already configured in `package.json`. To run tests:

```bash
# Run tests in watch mode during development
npm run test-storybook

# Run tests in CI
npm run test-storybook:ci
```

Create `.storybook/test-runner.ts` for custom configuration:

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  // Hook to execute before all tests
  async preVisit(page) {
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
  },
  
  // Hook to execute after tests
  async postVisit(page, context) {
    // Check for console errors
    const logs = await page.evaluate(() => {
      return (window as any).__logs || [];
    });
    
    if (logs.filter((log: any) => log.type === 'error').length > 0) {
      console.warn('Console errors detected:', logs);
    }
  },

  // Custom test timeout
  testTimeout: 15000,
};

export default config;
```

### Step 4: Add Testing Documentation to Stories
**Time:** 2 hours

Create `stories/Testing.mdx`:

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Testing Guide" />

# Testing Guide

This guide explains how interaction tests work in the component showcase.

## What are Interaction Tests?

Interaction tests simulate user behavior and verify that components respond correctly. They run directly in Storybook using the `play` function.

## Writing Interaction Tests

### Basic Structure

```tsx
export const MyTest: Story = {
  args: {
    // Component props
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Your test code here
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
```

### Available Testing Functions

- `within(element)` - Query elements within a scope
- `userEvent` - Simulate user interactions (click, type, etc.)
- `expect` - Assert conditions
- `waitFor` - Wait for async changes
- `fn()` - Create mock functions to track calls

### Common Patterns

#### Testing Button Clicks

```tsx
const button = canvas.getByRole('button', { name: /click me/i });
await userEvent.click(button);
await expect(args.onClick).toHaveBeenCalled();
```

#### Testing Form Input

```tsx
const input = canvas.getByLabelText(/email/i);
await userEvent.type(input, 'test@example.com');
await expect(input).toHaveValue('test@example.com');
```

#### Testing Validation

```tsx
await userEvent.type(input, 'invalid');
await userEvent.tab(); // Trigger blur
await waitFor(() => {
  expect(canvas.getByText(/error/i)).toBeInTheDocument();
});
```

## Running Tests

### During Development
```bash
npm run test-storybook
```

### In CI/CD
```bash
npm run test-storybook:ci
```

## Best Practices

1. **Test user behavior, not implementation**
   - Focus on what users see and do
   - Don't test internal state

2. **Use semantic queries**
   - Prefer `getByRole`, `getByLabelText`, `getByText`
   - Avoid `getByTestId` unless necessary

3. **Wait for async changes**
   - Always use `waitFor` for async operations
   - Don't use fixed timeouts

4. **Keep tests focused**
   - One story = one specific test scenario
   - Create multiple stories for different cases

5. **Make tests readable**
   - Use descriptive story names
   - Add comments for complex logic
   - Use test utilities for common patterns

## Accessibility Testing

All stories automatically run accessibility checks with the a11y addon. Check the "Accessibility" tab for violations.

## Visual Debugging

When tests fail:
1. Open the story in Storybook
2. Check the "Interactions" panel
3. Step through each interaction
4. See exactly where the test failed

## Resources

- [Storybook Interaction Testing](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
- [Testing Library Docs](https://testing-library.com/docs/)
- [User Event API](https://testing-library.com/docs/user-event/intro)
```

---

## Part B: Traditional Unit Tests (Optional)

### Step 5: Configure Jest (Optional)
**Time:** 2-3 hours

Create `jest.config.js`:

```javascript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '^expanse.ui(.*)$': '<rootDir>/../../packages/ui$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
      },
    }],
  },
  collectCoverageFrom: [
    '../../packages/ui/**/*.{ts,tsx}',
    '!**/*.stories.tsx',
    '!**/*.d.ts',
  ],
};
```

Create `tests/setup.ts`:

```typescript
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
} as any;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

### Step 6: Create Example Unit Tests (Optional)
**Time:** Variable

Create `tests/utils/validation.test.ts`:

```typescript
import { validateEmail, validatePassword } from 'expanse.ui/form';

describe('Email Validation', () => {
  it('accepts valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('missing@domain')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
  });
});

describe('Password Validation', () => {
  it('requires minimum length', () => {
    expect(validatePassword('short')).toBe(false);
    expect(validatePassword('longpassword')).toBe(true);
  });

  it('requires complexity', () => {
    expect(validatePassword('alllowercase')).toBe(false);
    expect(validatePassword('Has1Number')).toBe(true);
  });
});
```

Update `package.json` with test scripts:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## Testing Priority Matrix

### High Priority (Week 1)
- [ ] All button click interactions
- [ ] Form input and validation
- [ ] Modal open/close
- [ ] Theme switching
- [ ] Critical user flows

### Medium Priority (Week 2)
- [ ] Table interactions (sort, filter)
- [ ] Loading states
- [ ] Error states
- [ ] Navigation
- [ ] Accessibility

### Low Priority (Future)
- [ ] Edge cases
- [ ] Complex workflows
- [ ] Performance testing
- [ ] Visual regression

---

## Test Coverage Goals

### Phase 3 Targets
- **Interaction Tests:** 30-40% of stories have play functions
- **Critical Paths:** 100% of critical user interactions tested
- **Accessibility:** All stories pass a11y checks

### Future Targets
- **Unit Tests:** 70%+ code coverage for business logic
- **Visual Regression:** Critical components have baseline screenshots
- **E2E Tests:** Key user journeys tested end-to-end

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Test Component Showcase

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        working-directory: apps/component-showcase
        run: npm ci
      
      - name: Run interaction tests
        working-directory: apps/component-showcase
        run: npm run test-storybook:ci
      
      - name: Run unit tests (optional)
        working-directory: apps/component-showcase
        run: npm run test
        
      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: apps/component-showcase/test-results/
```

---

## Success Criteria

Phase 3 is complete when:
- ✅ Critical interactions have automated tests
- ✅ Tests run successfully in CI/CD
- ✅ Test utilities are documented
- ✅ Team understands how to write tests
- ✅ Baseline test coverage achieved
- ✅ Testing documentation is complete

---

## Next Steps

Once Phase 3 is complete, proceed to:
- **[Phase 4: Advanced Features](./phase-4-advanced-features.md)** - Add i18n, visual regression, etc.

---

**Phase 3 Estimated Time:** 3-5 days
**Complexity:** Medium (requires testing knowledge)
