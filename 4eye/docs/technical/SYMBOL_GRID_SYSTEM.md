# Symbol Grid System

**Status:** 🚧 Placeholder - Design to be finalized

---

## Overview

The Symbol Grid System is a custom layout system for 4eye's visual design language.

**Purpose:** Create distinctive, symbol-based layouts that align with 4eye's brand identity.

**Location:** `@expanse/shell` package

---

## Design Goals

- **Distinctive:** Unique layout system that differentiates 4eye
- **Flexible:** Adapt to various content types and screen sizes
- **Accessible:** Maintain readability and usability
- **Brand-aligned:** Reflect 4eye's visual identity (symbols, growth, connection)

---

## Potential Concepts

### **Symbol-Based Grid**

Layout based on symbolic elements from 4eye brand:
- Triangles (growth, progression)
- Circles (connection, wholeness)
- Squares (stability, foundation)

### **Growth Patterns**

Layout that expands from small to large (1:2:3 ratio):
```
┌─┐
│1│ ┌──┐
└─┘ │ 2│ ┌───┐
    └──┘ │  3│
         └───┘
```

### **Connected Grid**

Grid cells connected by visual lines/paths:
```
┌──┐───┌──┐
│  │   │  │
└──┘───└──┘
 │       │
┌──┐   ┌──┐
│  │───│  │
└──┘   └──┘
```

---

## Current Implementation

**Basic grid wrapper** (functional placeholder):

```typescript
// packages/@expanse/shell/src/components/SymbolGrid.tsx

export function SymbolGrid({ 
  children, 
  columns = 12, 
  gap = 2 
}: SymbolGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </Box>
  );
}
```

**Status:** Functional but generic - needs distinctive design.

---

## Next Steps

### **1. Design Phase**

- [ ] Define visual language
- [ ] Create mockups/prototypes
- [ ] Test with sample content
- [ ] Validate accessibility
- [ ] Get user feedback

### **2. Documentation Phase**

- [ ] Complete design specification
- [ ] Document grid system rules
- [ ] Create usage guidelines
- [ ] Add examples
- [ ] Document responsive behavior

### **3. Implementation Phase**

- [ ] Build grid components
- [ ] Add responsive behavior
- [ ] Implement accessibility features
- [ ] Write tests
- [ ] Create Storybook stories

### **4. Integration Phase**

- [ ] Integrate into 4eye-web
- [ ] Apply to key pages (dashboard, rooms)
- [ ] Gather feedback
- [ ] Iterate based on usage

---

## Discussion Points

**Questions to answer:**

1. **Visual Identity:** What symbols/shapes define 4eye's grid?
2. **Flexibility:** How flexible should the grid be (strict vs. freeform)?
3. **Responsiveness:** How does it adapt to mobile, tablet, desktop?
4. **Content Types:** What content will use this grid (dashboards, cards, forms)?
5. **Accessibility:** How do we ensure it's accessible?
6. **Performance:** Any performance concerns with custom grid?

---

## Temporary Solution

**Use standard MUI Grid until symbol grid is designed:**

```typescript
import Grid from '@mui/material/Grid';

<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Content1 />
  </Grid>
  <Grid item xs={12} md={6}>
    <Content2 />
  </Grid>
</Grid>
```

---

## Related Concepts

### **Brand Guidelines**

See user memory `4ear-brand-guidelines.md`:
- Themes: Improve, Innovate, Win, Heal, Protect
- Visual: Darkness to light, small to large (1:2:3), connecting dots
- Shapes: Triangles, circles, squares

### **Inspiration**

Potential inspiration sources:
- Growth patterns in nature
- Neural network visualizations
- Molecular structures
- Sacred geometry
- Educational frameworks (learning paths)

---

## Contact

**To discuss symbol grid design:**
- Create design mockups and share with team
- Schedule design review session
- Prototype alternatives and test with users

---

## Related Documentation

- **[PACKAGE_ARCHITECTURE.md](PACKAGE_ARCHITECTURE.md)** - Package organization
- **[LAYOUT_PATTERNS.md](examples/LAYOUT_PATTERNS.md)** - Layout patterns
- **[MUI_THEME_SYSTEM.md](MUI_THEME_SYSTEM.md)** - Theme system
- **Brand Guidelines** (in user memory) - Visual identity

---

**Last Updated:** Phase 1 (Architecture Foundation)  
**Next Review:** Before Phase 2 (ExpanseFrontend extraction)
