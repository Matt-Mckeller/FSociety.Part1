# @expanse/shell Design Decisions

> Key architectural decisions about the separation of concerns between the layout package and consuming applications.

---

## Application vs Package Responsibilities

### Visibility Logic

Visibility logic is **determined by the application**, not the layout package.

The layout package provides the structural components and positioning capabilities, but the decision of **what** to show and **when** to show it remains entirely with the consuming application.

```tsx
// Application controls visibility
<HudDesktopDefault
  headerContent={showHeader ? <MyHeader /> : null}
  footerContent={isFooterAllowed ? <MyFooter /> : null}
/>
```

### Display Status

The application should determine the display status of all layout regions.

The layout package provides:
- Slots and anchor points for content
- Transition capabilities between states
- Responsive behavior options

The application provides:
- Business logic for what is displayed
- Conditional rendering decisions
- User permission checks

### Header Component Display & Transitions

The application determines:
- **Which** header component is displayed
- **When** transitions should occur
- **What** triggers state changes

The layout package offers:
- History tracking of displayed components
- State management for navigation context
- "Back" functionality and navigation options
- Transition animation capabilities

```tsx
// Application controls header selection
const HeaderToShow = determineHeader(userState, route);

// Layout provides history/back capabilities
<HudProvider enableHistory={true}>
  <HudDesktopDefault
    headerContent={<HeaderToShow />}
    onBack={layout.canGoBack() ? layout.goBack : undefined}
  />
</HudProvider>
```

---

## Templates

### Purpose

Templates in `@expanse/shell` are **examples of implementation**, not production-ready components for direct use.

They demonstrate:
- How to compose layout primitives
- Recommended patterns for common use cases
- Reference implementations of various configurations

### Usage

Applications should:
1. **Study** templates to understand patterns
2. **Create** their own implementations based on requirements
3. **Customize** freely without constraints from template patterns

```
templates/
├── hud/
│   ├── desktop-default/    # Example desktop HUD implementation
│   └── mobile-default/     # Example mobile HUD implementation
└── content-frame/
    └── basic/              # Example basic web layout
```

### Why Not Use Templates Directly?

Templates serve as:
- Documentation through code
- Starting points for customization
- Examples of best practices

Applications have unique requirements for:
- Branding and styling
- Business logic integration
- Feature combinations
- Platform-specific behaviors

---

## Summary

| Concern | Responsibility |
|---------|---------------|
| Visibility logic | Application |
| Display status | Application |
| Which component to show | Application |
| Transition triggers | Application |
| Layout structure | Package |
| History/state tracking | Package |
| Navigation utilities | Package |
| Transition animations | Package |
