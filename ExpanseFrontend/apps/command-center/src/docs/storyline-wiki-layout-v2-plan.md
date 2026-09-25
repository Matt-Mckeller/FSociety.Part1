# StorylineWikiPage Layout V2 - Unified Container Design

## Current Problems Identified

1. **Disjointed sections** - Each section is a separate `<Card>` creating visual fragmentation
2. **Goals not visible** - Goals are buried deep in the Planning tab, not prominent
3. **Wasted vertical space** - Each card has its own padding/margins creating excessive whitespace
4. **No visual hierarchy** - All sections look the same weight, hard to scan
5. **Tab content disconnected** - Tabs feel like separate pages, not unified content
6. **Too many full-height cards** - Creates "accordion of cards" effect

---

## Proposed Solution: Unified Container with Collapsible Sections

### Design Concept

```
┌─────────────────────────────────────────────────────────────────┐
│  📋 COMPACT HEADER (Title + Progress Circle + Quick Stats)      │
│  ──────────────────────────────────────────────────────────────│
│  [Planning] [Development] [Operations] [AI Chat]     Tabs       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🎯 Goals (Always Visible - Pinned)              [▼]     │   │
│  │   ├─ Campaign Goal 1                    ● In Progress   │   │
│  │   └─ Storyline Goal 2                   ○ Not Started   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📝 Overview                             [▼ Expand]      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📚 Documentation Reference              [▼ Expand]      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ✅ Quests (3/7)                         [▼ Expand]      │   │
│  │   • Quest 1                                    ● Done   │   │
│  │   • Quest 2                                ○ In Prog    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Architecture Changes

### 1. **Single Outer Container Card**

Replace multiple `<Card>` elements with ONE container card that holds the tabs + all content.

```tsx
<Card sx={{ borderTop: 4, borderColor: storyline.color }}>
  {/* Tabs integrated into card header */}
  <Tabs ... />

  {/* Tab content inside same card */}
  <CardContent>
    <CollapsibleSection title="Goals" icon={<FlagIcon />} defaultOpen pinned>
      ...
    </CollapsibleSection>

    <CollapsibleSection title="Overview" icon={<DescriptionIcon />}>
      ...
    </CollapsibleSection>
  </CardContent>
</Card>
```

### 2. **Goals Section - Always Visible (Pinned)**

- Move Goals to TOP of all tabs (except AI Chat)
- Make it collapsible but expanded by default
- Show compact goal chips when collapsed

### 3. **CollapsibleSection Component**

Create a lightweight collapsible section (not a full Card):

```tsx
interface CollapsibleSectionProps {
  title: string
  icon?: ReactNode
  badge?: string | number
  defaultOpen?: boolean
  pinned?: boolean // Always visible, subtle highlight
  children: ReactNode
}
```

Visual style:

- Thin top border (1px divider) between sections
- Icon + Title + Badge + Expand/Collapse button inline
- Smooth expand/collapse animation
- Indented content (not separate card)

### 4. **Compact Goal Display**

When Goals section is collapsed, show inline chips:

```
🎯 Goals  [● 2 In Progress] [○ 1 Not Started]  [▼]
```

When expanded:

- Compact list view (not full cards per goal)
- Small status dots instead of full icons
- Single line per goal with overflow ellipsis

---

## Implementation Phases

### Phase 1: Create CollapsibleSection Component (30 min)

- Build reusable `CollapsibleSection.tsx`
- Minimal styling: divider line, header row, collapsible content
- Support for `pinned` state with subtle background

### Phase 2: Refactor Main Container (45 min)

- Wrap tabs + content in single Card
- Move Tabs inside the Card header
- Remove individual Card wrappers from sections

### Phase 3: Goals Section Redesign (30 min)

- Move Goals outside of Planning-tab-only
- Make it visible on Planning/Dev/Ops tabs (not AI Chat)
- Compact collapsed state with status chips
- Expanded view with streamlined goal list

### Phase 4: Convert All Sections to Collapsible (45 min)

- Overview → CollapsibleSection
- Documentation Reference → CollapsibleSection
- Components → CollapsibleSection
- Wiki Sections → CollapsibleSection
- Quests → CollapsibleSection (always visible)

### Phase 5: Visual Polish (20 min)

- Consistent spacing (py: 1, dividers)
- Hover states on section headers
- Smooth animations
- Sticky header option for long content

---

## Component Structure After Refactor

```tsx
<Box>
  {/* Compact Header Card - Stays separate */}
  <Card sx={{ mb: 2, borderTop: 4, borderColor: storyline.color }}>
    {/* ... compact header content ... */}
  </Card>

  {/* Main Content Container - UNIFIED */}
  <Card>
    {/* Integrated Tabs */}
    <Tabs value={activeTab} ... />

    {/* Goals - Pinned across P/D/O tabs */}
    {activeTab !== 3 && (
      <CollapsibleSection
        title="Goals"
        icon={<FlagIcon />}
        badge={`${completedGoals}/${totalGoals}`}
        defaultOpen
        pinned
      >
        {/* Compact goal list */}
      </CollapsibleSection>
    )}

    {/* Tab-specific content */}
    {activeTab === 0 && (
      <>
        <CollapsibleSection title="Overview" icon={<DescriptionIcon />}>
          ...
        </CollapsibleSection>
        <CollapsibleSection title="Documentation" icon={<InfoOutlinedIcon />} defaultOpen={false}>
          ...
        </CollapsibleSection>
        {/* Planning sections */}
      </>
    )}

    {activeTab === 1 && (
      <>
        <CollapsibleSection title="Components" icon={<WidgetsIcon />}>
          ...
        </CollapsibleSection>
        {/* Development sections */}
      </>
    )}

    {/* ... Operations, AI Chat tabs ... */}

    {/* Quests - Always visible footer */}
    {activeTab !== 3 && (
      <CollapsibleSection
        title="Quests"
        icon={<CheckCircleIcon />}
        badge={`${completedQuests}/${totalQuests}`}
        defaultOpen
      >
        {/* Quest list */}
      </CollapsibleSection>
    )}
  </Card>

  {/* Notes - Outside main container */}
  {wiki?.notes && <NotesCard ... />}
</Box>
```

---

## Key Visual Improvements

| Before                     | After                          |
| -------------------------- | ------------------------------ |
| 6+ separate Cards per tab  | 1 unified Card container       |
| Goals hidden in Planning   | Goals pinned at top            |
| Full padding per section   | Thin dividers, compact spacing |
| 24px margins between cards | 8px dividers between sections  |
| No expand/collapse         | Every section collapsible      |
| Sections look disconnected | Visual flow from top to bottom |

---

## Estimated Time: ~2.5 hours

| Phase                        | Time   | Priority |
| ---------------------------- | ------ | -------- |
| CollapsibleSection component | 30 min | High     |
| Main container refactor      | 45 min | High     |
| Goals section redesign       | 30 min | High     |
| Convert all sections         | 45 min | Medium   |
| Visual polish                | 20 min | Medium   |

---

## Questions to Confirm

1. **Goal visibility**: Should Goals show on ALL tabs or just P/D/O (not AI Chat)?
2. **Default collapse states**: Which sections should be collapsed by default?
   - Suggested: Overview=open, Docs Reference=closed, Sections=open, Quests=open
3. **Sticky behavior**: Should Goals or Tabs be sticky on scroll?
4. **Mobile**: How should this collapse on mobile? (All sections collapsed by default?)

---

## Ready to Implement?

Say "continue" to begin Phase 1 (CollapsibleSection component), or provide feedback on the plan.
