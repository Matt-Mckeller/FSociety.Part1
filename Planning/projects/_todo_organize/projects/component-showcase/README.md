# Component Showcase Project

## Overview
A comprehensive Storybook-based component library and testing suite for the Expanse Frontend monorepo. This project serves as a living documentation system, QA tool, and testing framework for all reusable UI components.

## Goals (Priority Order)
1. **Component Discovery** - Provide a searchable catalog of all available components
2. **QA & Iteration** - Enable testing and refinement of individual components
3. **Documentation** - Create living documentation with usage examples
4. **Testing** - Ensure components work correctly over time with automated tests
5. **Reusability** - Improve component APIs and maintainability
6. **Theme Verification** - Validate all theme variations work correctly

## Project Location
```
ExpanseFrontend/apps/component-showcase/
```

## Key Features
- ✅ Visual component catalog with Storybook 8
- ✅ Theme switching (6 combinations: primary/blue/red × light/dark)
- ✅ Internationalization/locale switching
- ✅ Interactive prop controls
- ✅ Component state variations
- ✅ Page-level compositions
- ✅ Story-based interaction tests
- ✅ Accessibility testing
- ✅ Responsive design preview
- 🔮 Traditional unit tests (Phase 2)
- 🔮 Visual regression testing (Phase 3)

## Documentation Structure
```
docs/component-showcase/
├── README.md                          # This file - project overview
├── REQUIREMENTS.md                    # Detailed requirements
├── ARCHITECTURE.md                    # Technical architecture decisions
├── phase-1-storybook-setup.md        # Initial Storybook configuration
├── phase-2-component-stories.md      # Creating stories for components
├── phase-3-testing-integration.md    # Adding tests (story + unit)
├── phase-4-advanced-features.md      # i18n, visual regression, etc.
└── MAINTENANCE.md                     # Ongoing maintenance guide
```

## Quick Links
- [Detailed Requirements](./REQUIREMENTS.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Phase 1: Storybook Setup](./phase-1-storybook-setup.md)
- [Phase 2: Component Stories](./phase-2-component-stories.md)
- [Phase 3: Testing Integration](./phase-3-testing-integration.md)
- [Phase 4: Advanced Features](./phase-4-advanced-features.md)

## Project Timeline

### Phase 1: Foundation (2-3 days)
- Set up Storybook infrastructure
- Configure theme integration
- Create custom decorators
- Set up basic navigation

### Phase 2: Component Stories (1-2 weeks)
- Create stories for all components
- Add prop controls
- Document usage patterns
- Organize by category

### Phase 3: Testing Integration (3-5 days)
- Add story-based interaction tests
- Set up unit testing framework
- Create test utilities
- Configure CI/CD integration

### Phase 4: Advanced Features (3-5 days)
- Implement i18n switching
- Add visual regression testing
- Set up accessibility audits
- Create performance monitoring

## Success Metrics
- [ ] All UI components have stories
- [ ] Theme switching works for all 6 combinations
- [ ] Stories include interactive examples
- [ ] Basic interaction tests cover critical paths
- [ ] Documentation is clear and helpful
- [ ] Developers can easily find and use components
- [ ] QA process is streamlined

## Team Usage
**For Developers:**
- Browse available components before creating new ones
- Test component behavior with different props
- Copy code examples for implementation
- Verify theme compatibility

**For QA:**
- Visual testing of all component states
- Regression testing after changes
- Accessibility verification
- Cross-browser testing

**For Designers:**
- Review implemented components
- Verify design system compliance
- Test theme variations
- Provide feedback on UI

## Next Steps
1. Review [REQUIREMENTS.md](./REQUIREMENTS.md) for detailed specifications
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical decisions
3. Start with [Phase 1: Storybook Setup](./phase-1-storybook-setup.md)
