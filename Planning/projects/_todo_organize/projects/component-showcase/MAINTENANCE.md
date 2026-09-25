# Component Showcase - Maintenance Guide

**Last Updated:** October 10, 2025

This guide covers ongoing maintenance, updates, and best practices for keeping the Component Showcase healthy and useful.

---

## Regular Maintenance Tasks

### Daily/Weekly Tasks

#### Monitor Build Status
- Check CI/CD pipeline status
- Review failed tests
- Address Storybook build errors

#### Review New Components
- Ensure new components get stories
- Add stories for component updates
- Keep documentation in sync

#### Accessibility Audits
- Review a11y violations
- Fix critical accessibility issues
- Update components for WCAG compliance

### Monthly Tasks

#### Dependency Updates
```bash
cd apps/component-showcase
npm outdated
npm update
```

**Key Dependencies to Monitor:**
- `@storybook/*` packages
- `@mui/material`
- `react` and `react-dom`
- Testing libraries

#### Performance Review
- Check Storybook load times
- Identify slow stories
- Optimize heavy components
- Review bundle size

#### Coverage Analysis
- Review test coverage metrics
- Identify untested components
- Add missing stories
- Improve interaction tests

### Quarterly Tasks

#### Major Version Updates
- Update Storybook major versions
- Update React/MUI major versions
- Test all stories after updates
- Update documentation

#### Design System Audit
- Review component consistency
- Identify deprecated patterns
- Update design tokens
- Refactor outdated components

#### Documentation Review
- Update contribution guidelines
- Refresh examples
- Add new patterns
- Remove outdated information

---

## Adding New Components

### Checklist for New Components

When adding a new component to `packages/ui/*`:

1. **Create the Story**
   - [ ] Create `.stories.tsx` file in appropriate category
   - [ ] Add component description
   - [ ] Create Default story
   - [ ] Add variant stories (states, sizes, etc.)
   - [ ] Configure prop controls

2. **Add Documentation**
   - [ ] Usage guidelines
   - [ ] When to use / when not to use
   - [ ] Accessibility notes
   - [ ] Code examples

3. **Add Tests**
   - [ ] Basic interaction tests
   - [ ] State change tests
   - [ ] Validation tests (for forms)
   - [ ] Accessibility verification

4. **Verify Themes**
   - [ ] Test with all 6 theme combinations
   - [ ] Check light/dark mode contrast
   - [ ] Verify responsive behavior

5. **Review & Merge**
   - [ ] Self-review checklist complete
   - [ ] No console errors/warnings
   - [ ] Tests passing
   - [ ] Peer review approved

---

## Updating Existing Stories

### When Component APIs Change

```tsx
// OLD: Component API changed
export const Old: Story = {
  args: {
    deprecated: true,
  },
};

// NEW: Update story with new API
export const Updated: Story = {
  args: {
    newProp: true,
  },
};
```

### Deprecation Process

1. **Mark as Deprecated**
```tsx
/**
 * @deprecated Use NewComponent instead
 */
const meta: Meta<typeof OldComponent> = {
  title: 'Theme/OldComponent [DEPRECATED]',
  // ...
};
```

2. **Add Migration Guide**
```tsx
parameters: {
  docs: {
    description: {
      component: '⚠️ **Deprecated:** Use `NewComponent` instead. See migration guide: [link]',
    },
  },
}
```

3. **Remove After Grace Period**
- Keep deprecated stories for 2-3 months
- Announce removal in team channels
- Remove story file
- Archive examples if needed

---

## Testing Maintenance

### Running Tests

```bash
# Development testing
npm run test-storybook

# CI testing
npm run test-storybook:ci

# Unit tests (if configured)
npm run test
npm run test:coverage
```

### Fixing Failing Tests

1. **Identify the Issue**
   - Check the Interactions panel in Storybook
   - Review test output
   - Check for timing issues

2. **Common Issues**

**Timing Issues:**
```tsx
// BAD: No waiting
await userEvent.click(button);
expect(canvas.getByText('Result')).toBeInTheDocument();

// GOOD: Wait for async changes
await userEvent.click(button);
await waitFor(() => {
  expect(canvas.getByText('Result')).toBeInTheDocument();
});
```

**Flaky Tests:**
```tsx
// BAD: Fixed timeout
await new Promise(resolve => setTimeout(resolve, 1000));

// GOOD: Wait for condition
await waitFor(() => {
  expect(canvas.queryByRole('progressbar')).not.toBeInTheDocument();
}, { timeout: 3000 });
```

**Missing Mock Functions:**
```tsx
// BAD: No mock function
export const Story: Story = {
  args: {
    onClick: undefined,
  },
};

// GOOD: Use fn() for tracking
export const Story: Story = {
  args: {
    onClick: fn(),
  },
};
```

### Adding New Tests

Follow the patterns in [Phase 3: Testing Integration](./phase-3-testing-integration.md)

---

## Performance Optimization

### Identifying Performance Issues

Use the Performance addon:
1. Open story in Storybook
2. Check "Performance" tab
3. Review render times
4. Identify bottlenecks

### Common Optimizations

**Lazy Loading:**
```tsx
// For expensive components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

export const Heavy: Story = {
  render: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  ),
};
```

**Memoization:**
```tsx
// For complex computations
const ExpensiveComponent = memo(({ data }) => {
  const processed = useMemo(() => processData(data), [data]);
  return <div>{processed}</div>;
});
```

**Virtual Scrolling:**
For large lists, use virtualization:
```tsx
import { FixedSizeList } from 'react-window';

export const LongList: Story = {
  render: () => (
    <FixedSizeList
      height={400}
      itemCount={1000}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>Item {index}</div>
      )}
    </FixedSizeList>
  ),
};
```

---

## Theme System Maintenance

### Adding New Theme Variants

1. **Create Theme Configuration**
```typescript
// packages/ui/theme/configs/green-light-theme.ts
export const greenLightThemePalette: Palette = {
  mode: 'light',
  primary: {
    main: '#2e7d32',
    light: '#60ad5e',
    dark: '#005005',
  },
  // ... rest of palette
};

export const greenLightComponents: ExpanseComponentsThemeProps = {
  // Custom component styles
};
```

2. **Update Theme Provider**
```tsx
// .storybook/preview.tsx
export const globalTypes = {
  theme: {
    // ...
    items: [
      // ... existing themes
      { value: 'green', title: 'Green Theme', icon: 'circle' },
    ],
  },
};
```

3. **Add to Theme Creation Logic**
```tsx
const createExpanseTheme = (themeName, mode) => {
  // ... existing logic
  case 'green':
    palette = mode === 'light' ? greenLightThemePalette : greenDarkThemePalette;
    components = mode === 'light' ? greenLightComponents : greenDarkComponents;
    break;
};
```

### Theme Testing Checklist

For each component, verify:
- [ ] Primary theme (light & dark)
- [ ] Blue theme (light & dark)
- [ ] Red theme (light & dark)
- [ ] Text contrast meets WCAG AA
- [ ] Disabled states are visible
- [ ] Focus indicators are clear

---

## Troubleshooting

### Common Issues

#### Storybook Won't Start
```bash
# Clear cache
rm -rf node_modules/.cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try again
npm run storybook
```

#### TypeScript Errors
```bash
# Verify TypeScript configuration
npx tsc --noEmit

# Check path mappings
cat tsconfig.json | grep "paths"

# Verify package references
npm list expanse.ui
```

#### Stories Not Appearing
- Check file naming: `*.stories.tsx`
- Verify story glob in `.storybook/main.ts`
- Check for syntax errors in story file
- Look for console errors

#### Theme Not Applying
- Check decorator order in `preview.tsx`
- Verify theme provider wrapping
- Inspect element styles in browser
- Check for CSS conflicts

#### Mock Data Issues
```typescript
// Verify mock data imports
console.log(mockUser); // Should log object, not undefined

// Check for circular dependencies
// Use import type where possible
import type { User } from './types';
```

---

## Documentation Updates

### When to Update Docs

- Component API changes
- New patterns emerge
- Best practices evolve
- Common issues discovered
- Major version updates

### Documentation Locations

| Type | Location |
|------|----------|
| Project overview | `docs/component-showcase/README.md` |
| Requirements | `docs/component-showcase/REQUIREMENTS.md` |
| Architecture | `docs/component-showcase/ARCHITECTURE.md` |
| Implementation phases | `docs/component-showcase/phase-*.md` |
| Component usage | Story `docs` parameters |
| Testing guide | `stories/Testing.mdx` |
| Contributing | `stories/Contributing.mdx` |

---

## Deployment

### Building for Production

```bash
# Build static Storybook
npm run build-storybook

# Output location
ls storybook-static/
```

### Deployment Options

**Option 1: Vercel/Netlify**
```bash
# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=storybook-static
```

**Option 2: AWS S3 + CloudFront**
```bash
# Build
npm run build-storybook

# Upload to S3
aws s3 sync storybook-static/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**Option 3: GitHub Pages**
```yaml
# .github/workflows/deploy.yml
name: Deploy Storybook

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd apps/component-showcase && npm ci
      - run: cd apps/component-showcase && npm run build-storybook
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: apps/component-showcase/storybook-static
```

---

## Monitoring & Analytics

### Key Metrics to Track

1. **Build Health**
   - Build success rate
   - Build duration
   - Test pass rate

2. **Coverage**
   - Number of components with stories
   - Percentage with interaction tests
   - Accessibility violation count

3. **Usage** (if tracking)
   - Most viewed components
   - Search queries
   - User feedback

### Setting Up Analytics

```typescript
// .storybook/preview.tsx
export const parameters = {
  // ... existing parameters
  analytics: {
    provider: 'google-analytics',
    options: {
      trackingId: 'UA-XXXXXXXXX-X',
    },
  },
};
```

---

## Getting Help

### Resources

- **Storybook Docs:** https://storybook.js.org/docs
- **MUI Docs:** https://mui.com/material-ui/
- **Testing Library:** https://testing-library.com/
- **React Intl:** https://formatjs.io/docs/react-intl/

### Team Communication

- Create issues for bugs/requests
- Discuss in team channels
- Schedule reviews for major changes
- Share learnings in documentation

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Oct 10, 2025 | Initial implementation |

---

## Contact & Support

**Maintainers:** Development Team
**Questions:** Post in team channel
**Issues:** Create GitHub issue
**Updates:** Check project board

---

**Remember:** The Component Showcase is a living project. Keep it updated, well-documented, and useful for the team!
