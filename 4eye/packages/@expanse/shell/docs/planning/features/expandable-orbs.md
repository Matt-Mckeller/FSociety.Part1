# Expandable Orbs

> **Status:** 🔴 TODO - Spec not written  
> **Priority:** Medium  
> **Related:** [hud-summary.md](../hud-summary.md)

---

## Overview

Orbs that expand on tap to show sub-options:

```
[Learn] → tap →  ┌──────────────┐
                 │ Learn More   │
                 │ Simplify     │
                 │ Expand       │
                 │ Ask Question │
                 └──────────────┘
```

## TODO: Define Spec

- [ ] Expansion trigger (tap, long-press, hover?)
- [ ] Expansion patterns:
  - Radial/fan around the orb
  - Floating list menu
  - Center of screen (for important actions)
- [ ] Animation specs (duration, easing)
- [ ] Keyboard/accessibility support
- [ ] API design (`ExpandableOrb` component, `subActions` prop)
- [ ] Mobile vs desktop behavior

## References

- See "Expandable Orbs" section in [hud-summary.md](../hud-summary.md)
- Existing: `ActionOrb`, `OrbCluster` components

---

*This spec needs to be written.*
