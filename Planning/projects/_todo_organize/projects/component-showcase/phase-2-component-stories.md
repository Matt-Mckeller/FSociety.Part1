# Phase 2: Component Stories Creation

**Duration:** 1-2 weeks
**Priority:** Critical - Core deliverable
**Goal:** Create comprehensive stories for all UI components with interactive examples

---

## Objectives

- ✅ Create stories for all theme components
- ✅ Create stories for all auth components
- ✅ Create stories for all form components
- ✅ Create stories for all game components
- ✅ Add interactive prop controls
- ✅ Document component usage patterns
- ✅ Show multiple state variations
- ✅ Organize stories by category

---

## Prerequisites

- Phase 1 completed successfully
- Storybook running without errors
- Familiarity with component APIs
- Access to component source code in `packages/ui`

---

## Story Creation Strategy

### Priority Tiers

**Tier 1 (Week 1): Core UI Components**
- Buttons, inputs, basic layouts
- Most frequently used components
- Foundation for other components

**Tier 2 (Week 2): Feature Components**
- Auth flows, game components
- Tables, complex layouts
- Context-dependent components

**Tier 3 (Future): Page Compositions**
- Full page layouts
- Multi-component compositions
- Complex user flows

---

## Story Template

Use this template for consistency across all stories:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentName } from 'expanse.ui/category';

/**
 * Brief description of the component.
 * 
 * ## Usage
 * When to use this component...
 * 
 * ## Accessibility
 * Key accessibility features...
 */
const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered', // or 'padded', 'fullscreen'
    docs: {
      description: {
        component: 'Detailed component description...',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Define prop controls
    propName: {
      control: 'text', // or 'select', 'boolean', etc.
      description: 'What this prop does',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
  },
  args: {
    // Default args for all stories
    onClick: fn(), // For event handlers
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    // Props for default state
  },
};

// Variant stories
export const VariantName: Story = {
  args: {
    // Props for variant
  },
};

// Complex example with custom render
export const ComplexExample: Story = {
  render: (args) => (
    <div>
      <ComponentName {...args} />
      {/* Additional components or context */}
    </div>
  ),
};
```

---

## Component Story Inventory

### Theme Components

#### Buttons & Actions
- [ ] `stories/theme/buttons/Button.stories.tsx` (✅ Done in Phase 1)
- [ ] `stories/theme/buttons/CloseModalButton.stories.tsx`
- [ ] `stories/theme/buttons/IconButton.stories.tsx`

#### Layout Components
- [ ] `stories/theme/layout/Drawer.stories.tsx` (GameDrawer)
- [ ] `stories/theme/layout/Snackbar.stories.tsx`
- [ ] `stories/theme/layout/Navigation.stories.tsx` (NavLink, NestableNavLink)
- [ ] `stories/theme/layout/Accordion.stories.tsx` (ExpandableNavAccordion)
- [ ] `stories/theme/layout/Spacing.stories.tsx` (SectionSpacer)
- [ ] `stories/theme/layout/ThemeToggle.stories.tsx` (LightDarkModeToggleSwitch)

#### Feedback & Progress
- [ ] `stories/theme/feedback/LoadingSpinner.stories.tsx`
- [ ] `stories/theme/feedback/ProgressBar.stories.tsx`
- [ ] `stories/theme/feedback/ExpandingBar.stories.tsx`
- [ ] `stories/theme/feedback/ExpandingBorderBox.stories.tsx`

#### Character Components
- [ ] `stories/theme/character/StaticCharacter.stories.tsx`
- [ ] `stories/theme/character/CharacterStates.stories.tsx`

#### Icons
- [ ] `stories/theme/icons/IconCollection.stories.tsx`

#### Typography
- [ ] `stories/theme/typography/Typography.stories.tsx`
- [ ] `stories/theme/typography/TypographyResponsive.stories.tsx`

---

### Auth Components

- [ ] `stories/auth/AuthButton.stories.tsx` (AuthCTAButton)
- [ ] `stories/auth/AuthModal.stories.tsx`
- [ ] `stories/auth/LoginScreen.stories.tsx`
- [ ] `stories/auth/SignupScreen.stories.tsx`
- [ ] `stories/auth/LogoutButton.stories.tsx`
- [ ] `stories/auth/AuthStatusDisplay.stories.tsx`
- [ ] `stories/auth/FormSubmitActions.stories.tsx`

---

### Form Components

- [ ] `stories/forms/EmailInput.stories.tsx` (EmailAddressInput)
- [ ] `stories/forms/PasswordInput.stories.tsx`
- [ ] `stories/forms/NameInput.stories.tsx` (FirstName, LastName, Name)
- [ ] `stories/forms/PhoneNumberInput.stories.tsx`
- [ ] `stories/forms/PasscodeInput.stories.tsx`
- [ ] `stories/forms/ContactDescriptionInput.stories.tsx`
- [ ] `stories/forms/PrivacyTermsCheckbox.stories.tsx` (AgreeToPrivacyPolicyAndTermsInput)

---

### Game Components

#### Tables
- [ ] `stories/game/tables/AssignmentTable.stories.tsx`
- [ ] `stories/game/tables/ClassTable.stories.tsx`
- [ ] `stories/game/tables/CourseTable.stories.tsx`
- [ ] `stories/game/tables/StudentTable.stories.tsx`
- [ ] `stories/game/tables/SubmissionTable.stories.tsx`
- [ ] `stories/game/tables/SchoolTable.stories.tsx`
- [ ] `stories/game/tables/StudentRewardClaimsTable.stories.tsx`

#### Progress & Status
- [ ] `stories/game/progress/ExperienceProgressBar.stories.tsx`
- [ ] `stories/game/progress/ExperienceProgressBarSimple.stories.tsx`
- [ ] `stories/game/status/ProfileStatusDisplay.stories.tsx`
- [ ] `stories/game/status/ProfileStatusDisplayAdvanced.stories.tsx`

#### Rewards & Wallet
- [ ] `stories/game/reward/RewardComponents.stories.tsx`
- [ ] `stories/game/wallet/WalletComponents.stories.tsx`

---

## Detailed Implementation Guide

### Step 1: Create Mock Data Utilities
**Time:** 2-3 hours

Create `utils/mockData.ts`:

```typescript
/**
 * Mock data generators for stories
 */

// User data
export const mockUser = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'student',
  createdAt: '2024-01-15T10:00:00Z',
  lastLogIn: '2025-10-10T08:30:00Z',
  experiencePoints: 1250,
  level: 5,
};

export const mockUsers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    ...mockUser,
    id: `${i + 1}`,
    email: `user${i + 1}@example.com`,
    firstName: `User${i + 1}`,
    experiencePoints: Math.floor(Math.random() * 2000),
    level: Math.floor(Math.random() * 10) + 1,
  }));
};

// Assignment data
export const mockAssignment = {
  id: '1',
  title: 'Math Homework Chapter 5',
  description: 'Complete exercises 1-20 from chapter 5',
  dueDate: '2025-10-15T23:59:59Z',
  pointsValue: 100,
  status: 'pending',
  submittedAt: null,
};

export const mockAssignments = (count: number) => {
  const statuses = ['pending', 'submitted', 'graded', 'late'];
  return Array.from({ length: count }, (_, i) => ({
    ...mockAssignment,
    id: `${i + 1}`,
    title: `Assignment ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    pointsValue: [50, 75, 100, 150][Math.floor(Math.random() * 4)],
  }));
};

// Class data
export const mockClass = {
  id: '1',
  name: 'Mathematics 101',
  teacher: 'Mr. Smith',
  students: 25,
  schedule: 'MWF 10:00-11:00',
};

export const mockClasses = (count: number) => {
  const subjects = ['Mathematics', 'Science', 'English', 'History'];
  return Array.from({ length: count }, (_, i) => ({
    ...mockClass,
    id: `${i + 1}`,
    name: `${subjects[i % subjects.length]} ${100 + i}`,
    students: Math.floor(Math.random() * 30) + 10,
  }));
};

// Reward data
export const mockReward = {
  id: '1',
  name: 'Gold Star Badge',
  description: 'Awarded for excellence',
  pointsCost: 500,
  imageUrl: '/placeholder-reward.png',
  rarity: 'rare',
};

export const mockRewards = (count: number) => {
  const rarities = ['common', 'uncommon', 'rare', 'legendary'];
  return Array.from({ length: count }, (_, i) => ({
    ...mockReward,
    id: `${i + 1}`,
    name: `Reward ${i + 1}`,
    pointsCost: (i + 1) * 100,
    rarity: rarities[Math.floor(Math.random() * rarities.length)],
  }));
};

// Form validation helpers
export const mockValidationError = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters',
  required: 'This field is required',
};
```

### Step 2: Create Mock Provider Utilities
**Time:** 1-2 hours

Create `utils/mockProviders.tsx`:

```typescript
import React from 'react';
import { mockUser } from './mockData';

/**
 * Mock context providers for stories that need specific context
 */

// Mock User Context
export const MockUserProvider = ({ 
  children, 
  user = mockUser,
  isAuthenticated = true 
}: { 
  children: React.ReactNode;
  user?: typeof mockUser;
  isAuthenticated?: boolean;
}) => {
  // This is simplified - adjust based on your actual UserContext
  return <>{children}</>;
};

// Mock Auth Context
export const MockAuthProvider = ({ 
  children,
  isAuthenticated = true,
  isLoading = false
}: {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  isLoading?: boolean;
}) => {
  return <>{children}</>;
};

// For components that need GraphQL mocks
export const createMockApolloProvider = (mocks: any[]) => {
  // Return a provider configured with mocks
  // Implementation depends on your Apollo setup
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
};
```

### Step 3: Example - Create Loading Spinner Story
**Time:** 30 minutes

Create `stories/theme/feedback/LoadingSpinner.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { 
  ExpanseLoadingSpinner,
  CenteredExpanseLoadingSpinner 
} from 'expanse.ui/theme';
import { Box } from '@mui/material';

/**
 * Loading spinners provide visual feedback during data loading or processing.
 * 
 * ## Usage
 * - Use during async operations
 * - Use centered variant for full-page loading
 * - Ensure proper ARIA labels for accessibility
 */
const meta: Meta<typeof ExpanseLoadingSpinner> = {
  title: 'Theme/Feedback/Loading Spinner',
  component: ExpanseLoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animated loading spinner following the Expanse design system.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ExpanseLoadingSpinner />,
};

export const Centered: Story = {
  render: () => (
    <Box sx={{ width: 400, height: 300, position: 'relative' }}>
      <CenteredExpanseLoadingSpinner />
    </Box>
  ),
};

export const WithText: Story = {
  render: () => (
    <Box sx={{ textAlign: 'center' }}>
      <ExpanseLoadingSpinner />
      <p>Loading your data...</p>
    </Box>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <ExpanseLoadingSpinner />
      <ExpanseLoadingSpinner />
      <ExpanseLoadingSpinner />
    </Box>
  ),
};
```

### Step 4: Example - Create Form Input Story with Validation
**Time:** 45 minutes

Create `stories/forms/EmailInput.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { EmailAddressInput } from 'expanse.ui/form';
import { Box } from '@mui/material';
import { useState } from 'react';

/**
 * Email input with built-in validation.
 * 
 * ## Usage
 * - Use for email address collection
 * - Validates email format automatically
 * - Shows error states
 * 
 * ## Accessibility
 * - Proper label association
 * - Error messages announced to screen readers
 * - Keyboard accessible
 */
const meta: Meta<typeof EmailAddressInput> = {
  title: 'Forms/Email Input',
  component: EmailAddressInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Input label text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
  },
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email Address',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email Address',
    value: 'john.doe@example.com',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};

// Interactive example
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      // Simple validation
      if (e.target.value && !e.target.value.includes('@')) {
        setError('Please enter a valid email address');
      } else {
        setError('');
      }
    };

    return (
      <Box sx={{ width: 300 }}>
        <EmailAddressInput
          {...args}
          value={value}
          onChange={handleChange}
          error={!!error}
          helperText={error}
        />
      </Box>
    );
  },
  args: {
    label: 'Email Address',
  },
};

// All states comparison
export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
      <EmailAddressInput label="Default" />
      <EmailAddressInput label="With Value" value="test@example.com" />
      <EmailAddressInput label="Required" required />
      <EmailAddressInput 
        label="Error" 
        error 
        helperText="Invalid email"
      />
      <EmailAddressInput label="Disabled" disabled />
      <EmailAddressInput 
        label="Disabled with Value" 
        disabled 
        value="test@example.com" 
      />
    </Box>
  ),
};
```

### Step 5: Example - Create Table Story with Mock Data
**Time:** 1 hour

Create `stories/game/tables/AssignmentTable.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { AssignmentTable } from 'expanse.ui/game';
import { mockAssignments } from '../../../utils/mockData';

/**
 * Displays a list of assignments with sorting and filtering.
 * 
 * ## Usage
 * - Show student assignments
 * - Display due dates and status
 * - Allow sorting by various columns
 */
const meta: Meta<typeof AssignmentTable> = {
  title: 'Game/Tables/Assignment Table',
  component: AssignmentTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    assignments: mockAssignments(5),
  },
};

export const Empty: Story = {
  args: {
    assignments: [],
  },
};

export const ManyAssignments: Story = {
  args: {
    assignments: mockAssignments(20),
  },
};

export const OnlyPending: Story = {
  args: {
    assignments: mockAssignments(10).map(a => ({ ...a, status: 'pending' })),
  },
};

export const OnlySubmitted: Story = {
  args: {
    assignments: mockAssignments(10).map(a => ({ ...a, status: 'submitted' })),
  },
};

export const MixedStatuses: Story = {
  render: () => {
    const assignments = mockAssignments(8);
    return <AssignmentTable assignments={assignments} />;
  },
};
```

### Step 6: Create Character Component Stories
**Time:** 45 minutes

Create `stories/theme/character/StaticCharacter.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StaticCharacter, CharacterState } from 'expanse.ui/theme';
import { Box } from '@mui/material';

/**
 * Static character illustrations for various states and actions.
 * 
 * ## Usage
 * - Display character in different poses
 * - Add personality to UI
 * - Provide visual feedback
 */
const meta: Meta<typeof StaticCharacter> = {
  title: 'Theme/Character/Static Character',
  component: StaticCharacter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: Object.values(CharacterState),
    },
    limbOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ForwardStanding: Story = {
  args: {
    state: CharacterState.forwardStanding,
  },
};

export const RightPushing: Story = {
  args: {
    state: CharacterState.rightPushing,
  },
};

export const LeftStanding: Story = {
  args: {
    state: CharacterState.leftStanding,
  },
};

export const RightStanding: Story = {
  args: {
    state: CharacterState.rightStanding,
  },
};

export const Celebration1: Story = {
  args: {
    state: CharacterState.celebration1,
  },
};

export const Celebration2: Story = {
  args: {
    state: CharacterState.celebration2,
  },
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: 2,
      '& > div': { textAlign: 'center' }
    }}>
      {Object.values(CharacterState).map(state => (
        <div key={state}>
          <StaticCharacter state={state} />
          <p style={{ marginTop: '0.5rem' }}>{state}</p>
        </div>
      ))}
    </Box>
  ),
};

export const WithLimbOpacity: Story = {
  args: {
    state: CharacterState.forwardStanding,
    limbOpacity: 0.5,
  },
};
```

---

## Testing Checklist

For each story, verify:
- [ ] Component renders without errors
- [ ] All props can be controlled via Controls panel
- [ ] Theme switching works correctly (all 6 themes)
- [ ] Component is responsive
- [ ] Accessibility checks pass (no a11y violations)
- [ ] Documentation is clear and helpful
- [ ] Code examples are accurate
- [ ] Multiple states/variants are shown

---

## Story Organization Best Practices

### Naming Conventions
- **File names:** `ComponentName.stories.tsx`
- **Story titles:** `Category/Subcategory/Component Name`
- **Story exports:** `Default`, `Variant`, `State`, descriptive names

### Structure
```
stories/
├── Introduction.mdx
├── theme/
│   ├── ThemeOverview.mdx          # Category overview
│   ├── buttons/
│   │   ├── Button.stories.tsx
│   │   └── ...
│   └── layout/
│       ├── LayoutOverview.mdx      # Subcategory overview
│       └── ...
```

### Documentation
- Add component descriptions
- Document when to use (and when not to use)
- Include accessibility notes
- Show common patterns
- Explain prop behavior

---

## Progress Tracking

### Week 1 Checklist
- [ ] All button components
- [ ] All form input components
- [ ] Basic layout components (drawer, snackbar)
- [ ] Loading and progress components
- [ ] Typography components

### Week 2 Checklist
- [ ] All auth components
- [ ] All game tables
- [ ] Profile and status components
- [ ] Reward and wallet components
- [ ] Character components

---

## Success Criteria

Phase 2 is complete when:
- ✅ All components have stories
- ✅ Stories include multiple variants
- ✅ Interactive controls work properly
- ✅ Documentation is comprehensive
- ✅ No console errors or warnings
- ✅ Accessibility checks pass
- ✅ All stories work with theme switching
- ✅ Mock data is realistic and consistent

---

## Next Steps

Once Phase 2 is complete, proceed to:
- **[Phase 3: Testing Integration](./phase-3-testing-integration.md)** - Add interaction tests

---

**Phase 2 Estimated Time:** 1-2 weeks
**Complexity:** Medium-High (repetitive but straightforward)
