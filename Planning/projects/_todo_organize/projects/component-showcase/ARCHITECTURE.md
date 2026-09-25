# Component Showcase - Technical Architecture

## System Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Component Showcase                        │
│                  (Storybook Application)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  Story Files    │  │   Decorators    │  │   Addons    │ │
│  │  (.stories.tsx) │  │ (Theme, i18n,   │  │ (Controls,  │ │
│  │                 │  │  Providers)     │  │  Actions,   │ │
│  │  - Theme        │  │                 │  │  Docs, a11y)│ │
│  │  - Auth         │  │                 │  │             │ │
│  │  - Forms        │  │                 │  │             │ │
│  │  - Game         │  │                 │  │             │ │
│  └────────┬────────┘  └────────┬────────┘  └──────┬──────┘ │
│           │                    │                   │        │
│           └────────────────────┼───────────────────┘        │
│                                │                            │
└────────────────────────────────┼────────────────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │   UI Packages          │
                    │                        │
                    │  packages/ui/          │
                    │  ├── theme/            │
                    │  ├── auth/             │
                    │  ├── form/             │
                    │  ├── game/             │
                    │  ├── user/             │
                    │  └── application/      │
                    └────────────────────────┘
```

---

## Technology Stack

### Core Technologies
- **Storybook 8.x** - Component showcase framework
- **React 18** - UI library (matching existing apps)
- **TypeScript 5.x** - Type safety
- **MUI 5** - Component library (existing dependency)
- **Emotion** - CSS-in-JS (MUI dependency)

### Testing Technologies
- **@storybook/test** - Story-based interaction tests
- **@storybook/addon-interactions** - Interaction testing UI
- **Jest** (Phase 2) - Unit testing framework
- **React Testing Library** (Phase 2) - Component testing
- **Chromatic** (Phase 3, Optional) - Visual regression testing

### Build Tools
- **Vite** - Storybook builder (fast, modern)
- **SWC** - Fast TypeScript/JSX compilation
- **npm/yarn** - Package management (match monorepo)

---

## Project Structure

```
ExpanseFrontend/
├── apps/
│   └── component-showcase/              # NEW Storybook app
│       ├── .storybook/                  # Storybook configuration
│       │   ├── main.ts                  # Main config
│       │   ├── preview.tsx              # Global decorators & parameters
│       │   ├── theme-decorator.tsx      # Custom theme wrapper
│       │   └── manager.ts               # UI customization
│       ├── stories/                     # Story files
│       │   ├── Introduction.mdx         # Welcome page
│       │   ├── theme/                   # Theme component stories
│       │   │   ├── buttons/
│       │   │   │   ├── Button.stories.tsx
│       │   │   │   └── CloseModalButton.stories.tsx
│       │   │   ├── layout/
│       │   │   │   ├── Drawer.stories.tsx
│       │   │   │   ├── Snackbar.stories.tsx
│       │   │   │   └── Navigation.stories.tsx
│       │   │   ├── feedback/
│       │   │   │   ├── LoadingSpinner.stories.tsx
│       │   │   │   └── ProgressBar.stories.tsx
│       │   │   ├── character/
│       │   │   │   └── StaticCharacter.stories.tsx
│       │   │   └── icons/
│       │   │       └── Icons.stories.tsx
│       │   ├── auth/                    # Auth component stories
│       │   │   ├── AuthButton.stories.tsx
│       │   │   ├── AuthModal.stories.tsx
│       │   │   ├── LoginScreen.stories.tsx
│       │   │   └── LogoutButton.stories.tsx
│       │   ├── forms/                   # Form component stories
│       │   │   ├── EmailInput.stories.tsx
│       │   │   ├── PasswordInput.stories.tsx
│       │   │   ├── NameInput.stories.tsx
│       │   │   └── FormValidation.stories.tsx
│       │   ├── game/                    # Game component stories
│       │   │   ├── tables/
│       │   │   │   ├── AssignmentTable.stories.tsx
│       │   │   │   ├── StudentTable.stories.tsx
│       │   │   │   └── ClassTable.stories.tsx
│       │   │   ├── ProfileDisplay.stories.tsx
│       │   │   ├── ExperienceBar.stories.tsx
│       │   │   └── RewardComponents.stories.tsx
│       │   ├── pages/                   # Page composition stories
│       │   │   ├── Dashboard.stories.tsx
│       │   │   ├── ProfilePage.stories.tsx
│       │   │   └── LoginFlow.stories.tsx
│       │   └── theming/                 # Theme system documentation
│       │       ├── ThemeOverview.mdx
│       │       ├── Colors.stories.tsx
│       │       ├── Typography.stories.tsx
│       │       └── Spacing.stories.tsx
│       ├── utils/                       # Testing utilities
│       │   ├── mockData.ts              # Mock data generators
│       │   ├── mockProviders.tsx        # Mock context providers
│       │   └── testHelpers.ts           # Shared test utilities
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── packages/
│   └── ui/                              # Source components (existing)
│       ├── theme/
│       ├── auth/
│       ├── form/
│       └── ...
│
└── docs/
    └── component-showcase/              # Project documentation
        ├── README.md
        ├── REQUIREMENTS.md
        ├── ARCHITECTURE.md              # This file
        └── phase-*.md
```

---

## Key Design Decisions

### Decision 1: Storybook vs Custom Solution
**Choice:** Storybook 8 with Vite builder

**Rationale:**
- Industry standard with extensive community support
- Built-in addons for controls, actions, docs, a11y
- Story-based testing with `@storybook/test`
- Excellent developer experience
- Can be deployed as static site
- Minimal maintenance overhead

**Alternatives Considered:**
- Custom Next.js app: More work, less features
- Docusaurus: Better for docs, worse for interactive components
- React Styleguidist: Less maintained, fewer features

---

### Decision 2: Story Organization
**Choice:** Organize by domain/package (theme, auth, forms, game)

**Rationale:**
- Matches existing package structure
- Easy to find components by category
- Clear ownership boundaries
- Scalable as components grow

**Story Naming Convention:**
```typescript
// Format: Domain/Component/Variant
export default {
  title: 'Theme/Buttons/Primary Button',
  component: Button,
}
```

---

### Decision 3: Provider Integration
**Choice:** Custom Storybook decorator wrapping ApplicationProvider

**Rationale:**
- Single source of truth for all context needs
- Matches production environment closely
- Easy to configure via Storybook globals
- No component-specific provider logic needed

**Implementation:**
```tsx
// .storybook/preview.tsx
const withApplicationProvider = (Story, context) => {
  const { theme, locale } = context.globals;
  
  return (
    <ApplicationProvider
      baseGraphQLApiUrl="http://localhost:4000/graphql" // mock
      accountNavRoute="/account"
      initialTheme={theme}
      initialThemeMode={mode}
      enableGoogleAnalytics={false}
    >
      <Story />
    </ApplicationProvider>
  );
};

export const decorators = [withApplicationProvider];
```

---

### Decision 4: Theme Switching
**Choice:** Storybook global toolbar with custom decorator

**Rationale:**
- Native Storybook UX
- Persists across story navigation
- No custom UI needed
- Works with Storybook's URL parameters

**Implementation:**
```typescript
// .storybook/preview.tsx
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'primary',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'primary', title: 'Primary' },
        { value: 'blue', title: 'Blue' },
        { value: 'red', title: 'Red' },
      ],
    },
  },
  themeMode: {
    name: 'Mode',
    description: 'Light or Dark mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};
```

---

### Decision 5: Testing Strategy (Phase 1)
**Choice:** Story-based interaction tests with `@storybook/test`

**Rationale:**
- Tests co-located with visual examples
- Single source of truth for behavior
- Visual debugging in browser
- Runs in CI with `test-storybook`
- Good enough for Phase 1

**Traditional unit tests added in Phase 2 for:**
- Complex business logic
- Hooks and context providers
- Utility functions
- Edge cases

---

### Decision 6: Mock Data Strategy
**Choice:** Centralized mock data utilities with faker/generators

**Rationale:**
- Consistent mock data across stories
- Realistic but predictable data
- Easy to maintain
- Can be reused in tests

**Implementation:**
```typescript
// utils/mockData.ts
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  // ...
};

export const mockAssignments = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `assignment-${i}`,
    title: `Assignment ${i + 1}`,
    // ...
  }));
};
```

---

### Decision 7: i18n Implementation
**Choice:** Basic locale context with mock translations (Phase 1)

**Rationale:**
- Simple enough for demonstration
- Doesn't require full i18n infrastructure
- Can be enhanced later
- Focus on date/number formatting (already using Intl)

**Future Enhancement:**
- Full i18n library (react-intl, next-intl) in Phase 4
- Real translation files
- Translation management workflow

---

### Decision 8: Build Configuration
**Choice:** Vite builder with SWC

**Rationale:**
- Fastest build times
- Modern standards (ESM)
- Better DX with instant HMR
- Official Storybook recommendation

**Alternative:** Webpack builder (slower, more complex)

---

## Data Flow

### Component Rendering Flow
```
1. Story file loaded
   ↓
2. Global decorators applied (Theme, Providers)
   ↓
3. Story-specific decorators applied
   ↓
4. Component rendered with args (props)
   ↓
5. Controls update args → re-render
   ↓
6. Interactions run (if defined)
```

### Theme Switching Flow
```
1. User clicks theme selector in toolbar
   ↓
2. Global context updates
   ↓
3. Decorator receives new theme value
   ↓
4. ApplicationProvider re-renders with new theme
   ↓
5. ThemeContext updates
   ↓
6. MUI ThemeProvider updates
   ↓
7. All components re-render with new theme
```

---

## Integration Points

### With Existing Packages
- **Direct imports** from `packages/ui/*`
- **Shared TypeScript config** from root
- **Shared type definitions** from `packages/@types`
- **Shared assets** from `packages/staticAssets`

### With CI/CD
- **Build command:** `npm run build-storybook`
- **Test command:** `npm run test-storybook`
- **Deployment:** Static files to hosting service

### With Development Workflow
- **Parallel development:** Runs on separate port
- **Hot reloading:** Changes reflected immediately
- **No interference:** Doesn't affect production apps

---

## Performance Considerations

### Build Performance
- Use Vite for fast builds
- Enable SWC for faster transpilation
- Tree-shaking to reduce bundle size
- Code splitting by story

### Runtime Performance
- Lazy load stories
- Virtualize long component lists
- Memoize expensive computations
- Optimize mock data generation

### Development Performance
- Fast refresh for instant updates
- Efficient caching
- Parallel story compilation

---

## Security Considerations

### Mock Data
- No real user data
- No production API keys
- No sensitive information

### Access Control
- Internal deployment only (Phase 1)
- Consider authentication if made public

### Dependencies
- Regular security audits
- Keep Storybook and dependencies updated

---

## Scalability

### Adding New Components
1. Create component in `packages/ui/*`
2. Create story file in `apps/component-showcase/stories/*`
3. Add to appropriate category
4. Document props and usage
5. Add interaction tests

### Adding New Categories
1. Create new folder in `stories/`
2. Add overview MDX file
3. Create component stories
4. Update navigation structure

### Growing Test Coverage
1. Start with critical paths (Phase 1)
2. Add more interaction tests (ongoing)
3. Add unit tests for logic (Phase 2)
4. Add visual regression (Phase 3)

---

## Deployment Architecture

### Phase 1: Local Development
- Run locally with `npm run storybook`
- Share via local network

### Phase 2: Internal Hosting
- Build static site with `npm run build-storybook`
- Deploy to internal server or cloud storage
- Options: Vercel, Netlify, S3 + CloudFront

### Phase 3: CI/CD Integration
- Automated builds on commits
- Automated test runs
- Automatic deployment on merge to main
- PR preview deployments (optional)

---

## Maintenance Strategy

### Regular Updates
- Update Storybook monthly
- Update dependencies quarterly
- Review and update stories when components change

### Quality Assurance
- Run tests before merging
- Visual review of component changes
- Accessibility audits

### Documentation
- Keep stories in sync with components
- Update examples when APIs change
- Maintain migration guides

---

## Risks & Mitigations

### Risk 1: Storybook Complexity
**Mitigation:** Start simple, add features incrementally, good documentation

### Risk 2: Maintenance Burden
**Mitigation:** Automated testing, clear guidelines, shared ownership

### Risk 3: Provider Configuration Issues
**Mitigation:** Centralized decorator, comprehensive testing, clear error messages

### Risk 4: Performance with Many Stories
**Mitigation:** Lazy loading, code splitting, optimization best practices

### Risk 5: Version Conflicts
**Mitigation:** Peer dependency management, regular updates, clear compatibility matrix

---

## Future Enhancements

### Phase 4+
- Visual regression testing (Chromatic)
- Full i18n with translation management
- Component usage analytics
- Design token editor
- Figma integration
- Component dependency visualization
- Performance profiling
- Bundle size analysis

---

## References

- [Storybook Documentation](https://storybook.js.org/)
- [Storybook Testing](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
- [MUI Theming Guide](https://mui.com/material-ui/customization/theming/)
- [Component Showcase Best Practices](https://storybook.js.org/blog/best-practices-for-component-library-documentation/)

---

**Document Version:** 1.0
**Last Updated:** October 10, 2025
**Author:** Development Team
