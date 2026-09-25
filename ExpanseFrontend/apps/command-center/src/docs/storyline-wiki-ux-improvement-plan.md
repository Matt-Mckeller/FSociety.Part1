# StorylineWikiPage UI/UX Improvement Plan

**Component:** `StorylineWikiPage.tsx`  
**Created:** 2026-02-08  
**Status:** Planning

---

## 📊 Current State Analysis

### Current Layout (Top to Bottom)

```
┌─────────────────────────────────────────────────────────────────┐
│ [Back Button]                                                    │
├─────────────────────────────────────────────────────────────────┤
│ HERO HEADER                                                      │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Title + Status Chip                          [Campaign Chips]│ │
│ │ Description                                                  │ │
│ │ Stats Row: [Quests] [Goals] [Status] [Progress]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ TABS: [📋 Planning (n)] [💻 Development (n)] [⚙️ Operations (n)]│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ TAB CONTENT (varies by tab)                                     │
│ - Planning: Overview → Goals → Reference → planningSections      │
│ - Development: Components → CustomSections → developmentSections │
│ - Operations: operationsSections (or placeholder)               │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ AI ASSISTANT (always visible)                                    │
├─────────────────────────────────────────────────────────────────┤
│ QUESTS SECTION (always visible)                                  │
├─────────────────────────────────────────────────────────────────┤
│ NOTES (if exists)                                               │
└─────────────────────────────────────────────────────────────────┘
```

### Current Issues

1. **Long vertical scroll** - Content requires lots of scrolling
2. **AI Chat position** - ✅ Fixed - now shows on all tabs
3. **Inconsistent card styling** - Some cards have icons, some don't
4. **No quick navigation** - Can't jump between sections
5. **Stats row underutilized** - Could show more useful at-a-glance info
6. **Hero header takes too much space** - Description could be collapsible
7. **Mobile experience** - Not optimized for smaller screens
8. **Empty states** - Some placeholders feel uninspired
9. **No visual hierarchy** - All sections feel equally weighted
10. **Tab content density** - Some tabs have too little content, others too much

---

## 🎯 Improvement Goals

1. **Reduce cognitive load** - Surface key info faster
2. **Improve scannability** - Clear visual hierarchy
3. **Enable quick navigation** - Jump to sections
4. **Optimize for workflow** - Support planning → development → operations flow
5. **Make AI Chat more prominent** - It's a key feature
6. **Improve mobile UX** - Responsive design
7. **Add delightful details** - Micro-interactions, smooth transitions

---

## 🏗️ Proposed Layout Options

### Option A: Two-Column Layout with Sticky Sidebar

```
┌──────────────────────────┬─────────────────────────────────────┐
│ STICKY LEFT SIDEBAR      │ MAIN CONTENT (scrollable)           │
│                          │                                      │
│ Hero Summary (compact)   │ [Tabs: Planning | Dev | Ops]        │
│ ├─ Status Chip           │                                      │
│ ├─ Quick Stats           │ Tab Content...                       │
│ └─ Progress Ring         │                                      │
│                          │                                      │
│ ───────────────────      │                                      │
│ Quick Nav                │                                      │
│ ├─ Overview              │                                      │
│ ├─ Goals                 │                                      │
│ ├─ Components            │                                      │
│ └─ Quests                │                                      │
│                          │                                      │
│ ───────────────────      │                                      │
│ AI Assistant (compact)   │                                      │
│ [Expand to full ↗]       │                                      │
│                          │                                      │
└──────────────────────────┴─────────────────────────────────────┘
```

**Pros:**

- Quick navigation always visible
- AI Chat accessible without scrolling
- Clean separation of nav and content

**Cons:**

- Reduces horizontal content space
- May feel cramped on smaller screens
- More complex responsive behavior

---

### Option B: Floating Action Panel

```
┌─────────────────────────────────────────────────────────────────┐
│ Compact Hero Header                                              │
│ [Title] [Status] [Progress Ring] [Quick Stats]      [Actions ▼]│
├─────────────────────────────────────────────────────────────────┤
│ [Tabs: Planning | Dev | Ops]                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Tab Content (full width)                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                                    ┌─────────────┐
                                                    │ 💬 AI Chat  │
                                                    │ (floating)  │
                                                    └─────────────┘
```

**Pros:**

- Full-width content area
- AI Chat always visible as floating button
- Compact header saves space

**Cons:**

- Floating elements can obstruct content
- Less discoverable features

---

### Option C: Compact Header + Improved Sections (Recommended)

```
┌─────────────────────────────────────────────────────────────────┐
│ [←] Storyline Name                    [Status] [Progress: 75%] │
│     Campaign: 4eye                              [⋮ Actions]    │
├─────────────────────────────────────────────────────────────────┤
│ [📋 Planning] [💻 Development] [⚙️ Operations] [🤖 AI Chat]    │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📖 Overview                                    [Collapse ▲] │ │
│ │ Brief summary text...                                       │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🎯 Goals                                  [2/6 Complete ✓]  │ │
│ │ • Goal 1 ✓                                                  │ │
│ │ • Goal 2 ○                                                  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ⚔️ Quests                                [1/3 Complete ✓]   │ │
│ │ [Planning (1)] [Development (2)] [Operations (0)]          │ │
│ │ • Quest 1 ✓  • Quest 2 ⏳                                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🤖 AI Assistant                                             │ │
│ │ [Ask about this storyline...]                       [Send]  │ │
│ │ Quick: [Summarize] [Generate Test] [Find Gaps]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Pros:**

- Compact but informative header
- AI Chat as a tab (equal prominence)
- Collapsible sections reduce scroll
- Progress indicators in section headers
- Category filters in Quests section

**Cons:**

- AI Chat tab might be missed
- Still vertical scroll heavy

---

## 📋 Detailed Implementation Plan

### Phase 1: Header Optimization (Est: 2 hours)

#### 1.1 Compact Hero Header

- Reduce vertical height by 40%
- Move description to collapsible/expandable
- Add circular progress indicator
- Inline campaign chips with title

**Before:**

```tsx
<Card sx={{ mb: 3 }}>
  <CardContent>
    <Box>Title + Chips</Box>
    <Typography>Long description...</Typography>
    <Grid>Stats row with 4 boxes</Grid>
  </CardContent>
</Card>
```

**After:**

```tsx
<Paper sx={{ mb: 2, p: 2 }}>
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <CircularProgress variant="determinate" value={progress} />
    <Box sx={{ flex: 1 }}>
      <Typography variant="h5">{title}</Typography>
      <Box>Campaign chips inline</Box>
    </Box>
    <QuickStats quests={n} goals={n} status={status} />
    <IconButton>
      <MoreVert />
    </IconButton>
  </Box>
  <Collapse in={expanded}>
    <Typography>{description}</Typography>
  </Collapse>
</Paper>
```

#### 1.2 Quick Stats Chips

Replace 4-column grid with inline chips:

```tsx
<Box sx={{ display: "flex", gap: 1 }}>
  <Chip icon={<QuestIcon />} label="3/5 Quests" size="small" />
  <Chip icon={<GoalIcon />} label="2/4 Goals" size="small" />
  <Chip
    icon={<StatusIcon />}
    label="In Progress"
    size="small"
    color="warning"
  />
</Box>
```

---

### Phase 2: Tab Improvements (Est: 3 hours)

#### 2.1 Add AI Chat as 4th Tab

Make AI Chat a first-class tab with badge for suggestions:

```tsx
<Tabs>
  <Tab label="📋 Planning" />
  <Tab label="💻 Development" />
  <Tab label="⚙️ Operations" />
  <Tab
    label={
      <Badge badgeContent={3} color="primary">
        🤖 AI Chat
      </Badge>
    }
  />
</Tabs>
```

#### 2.2 Tab Content Structure Consistency

Each tab should follow the same pattern:

```tsx
// Section Card Template
<Card sx={{ mb: 2 }}>
  <CardHeader
    avatar={<Icon />}
    title="Section Title"
    subheader="Brief description"
    action={
      <Box>
        <Chip label="2/5" size="small" />
        <IconButton>
          <ExpandMore />
        </IconButton>
      </Box>
    }
  />
  <Collapse in={expanded}>
    <CardContent>{/* Section content */}</CardContent>
  </Collapse>
</Card>
```

#### 2.3 Section Order per Tab

**Planning Tab:**

1. Overview (expanded by default)
2. Goals (with progress indicator)
3. Documentation Reference
4. Planning Sections from wiki (collapsible)

**Development Tab:**

1. Components (with Storybook previews)
2. Technical Context
3. Test Cases
4. Development Sections from wiki

**Operations Tab:**

1. Deployment Notes
2. Maintenance
3. Analytics
4. Operations Sections from wiki

**AI Chat Tab:**

1. Full-height chat interface
2. Quick action buttons
3. Context chips showing what data AI has access to

---

### Phase 3: Section Cards Redesign (Est: 4 hours)

#### 3.1 Consistent Section Card Component

Create reusable `<SectionCard>` component:

```tsx
interface SectionCardProps {
  icon: React.ReactNode
  title: string
  subtitle?: string
  progress?: { current: number; total: number }
  defaultExpanded?: boolean
  children: React.ReactNode
  actions?: React.ReactNode
}

function SectionCard({
  icon,
  title,
  subtitle,
  progress,
  defaultExpanded = true,
  children,
  actions,
}: SectionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={() => setExpanded(!expanded)}>
        <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 2 }}>
          {icon}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {progress && (
            <Chip
              label={`${progress.current}/${progress.total}`}
              size="small"
              color={
                progress.current === progress.total ? "success" : "default"
              }
            />
          )}
          {actions}
          <ExpandMore
            sx={{ transform: expanded ? "rotate(180deg)" : "none" }}
          />
        </Box>
      </CardActionArea>
      <Collapse in={expanded}>
        <Divider />
        <CardContent>{children}</CardContent>
      </Collapse>
    </Card>
  )
}
```

#### 3.2 Goals Section Improvements

- Show completion progress
- Inline edit capability (future)
- Link to related quests

#### 3.3 Components Section Improvements

- Card grid layout
- Storybook preview thumbnails
- Status indicators (concept, in-progress, complete)
- Quick launch to Storybook

---

### Phase 4: Quests Section Upgrade (Est: 2 hours)

#### 4.1 Category Tabs within Quests

```tsx
<SectionCard title="Quests" progress={{ current: completed, total }}>
  <Tabs value={questTab} onChange={setQuestTab}>
    <Tab label={`📋 Planning (${planningQuests.length})`} />
    <Tab label={`💻 Dev (${devQuests.length})`} />
    <Tab label={`⚙️ Ops (${opsQuests.length})`} />
    <Tab label="All" />
  </Tabs>
  <TabPanel>
    {filteredQuests.map((quest) => (
      <QuestListItem />
    ))}
  </TabPanel>
</SectionCard>
```

#### 4.2 Quest List Item Improvements

- Hover actions (view, edit, mark complete)
- Inline progress indicator
- Quick expand for objectives

---

### Phase 5: AI Chat Enhancement (Est: 3 hours)

#### 5.1 Full-Page AI Chat Tab

When AI Chat tab is selected:

```tsx
<Box
  sx={{
    height: "calc(100vh - 200px)",
    display: "flex",
    flexDirection: "column",
  }}
>
  {/* Context Bar */}
  <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
    <Typography variant="caption">AI has context from:</Typography>
    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
      <Chip label="Storyline: Learning Modes" size="small" />
      <Chip label="3 Quests" size="small" />
      <Chip label="6 Goals" size="small" />
      <Chip label="Wiki Content" size="small" />
    </Stack>
  </Box>

  {/* Chat Messages */}
  <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
    {messages.map((msg) => (
      <ChatMessage />
    ))}
  </Box>

  {/* Quick Actions */}
  <Box sx={{ p: 1, borderTop: 1, borderColor: "divider" }}>
    <Stack direction="row" spacing={1}>
      <Button size="small" variant="outlined">
        📊 Summarize Status
      </Button>
      <Button size="small" variant="outlined">
        🧪 Generate Tests
      </Button>
      <Button size="small" variant="outlined">
        📋 Find Gaps
      </Button>
      <Button size="small" variant="outlined">
        💻 Generate Component
      </Button>
    </Stack>
  </Box>

  {/* Input */}
  <Box sx={{ p: 2, display: "flex", gap: 1 }}>
    <TextField fullWidth placeholder="Ask about this storyline..." />
    <IconButton color="primary">
      <Send />
    </IconButton>
  </Box>
</Box>
```

#### 5.2 Compact AI Chat (on other tabs)

Show a minimized version at the bottom of other tabs:

```tsx
<Paper sx={{ position: "sticky", bottom: 0, p: 2, mt: 2 }}>
  <Box sx={{ display: "flex", gap: 1 }}>
    <TextField size="small" fullWidth placeholder="Quick AI question..." />
    <Button variant="contained">Ask</Button>
  </Box>
</Paper>
```

---

### Phase 6: Visual Polish (Est: 2 hours)

#### 6.1 Color Coding

- Planning sections: Blue tint (`#3B82F6`)
- Development sections: Purple tint (`#8B5CF6`)
- Operations sections: Green tint (`#10B981`)

#### 6.2 Icons Consistency

Use MUI icons consistently:

- Planning: `DescriptionIcon`
- Development: `CodeIcon`
- Operations: `SettingsIcon`
- Goals: `FlagIcon`
- Quests: `EmojiEventsIcon` (trophy)
- Components: `WidgetsIcon`

#### 6.3 Micro-interactions

- Smooth collapse/expand animations
- Hover states on interactive elements
- Loading skeletons
- Success/error states

#### 6.4 Empty States

Create engaging empty states:

```tsx
<EmptyState
  icon={<WidgetsIcon sx={{ fontSize: 64 }} />}
  title="No components yet"
  description="Add components to track what you're building"
  action={<Button>Add Component</Button>}
/>
```

---

## 📋 Task Checklist

### Phase 1: Header Optimization

- [ ] Create compact header variant
- [ ] Add collapsible description
- [ ] Implement circular progress indicator
- [ ] Create inline quick stats chips

### Phase 2: Tab Improvements

- [ ] Add AI Chat as 4th tab
- [ ] Standardize tab content structure
- [ ] Add tab badges for counts

### Phase 3: Section Cards Redesign

- [ ] Create reusable SectionCard component
- [ ] Migrate all sections to new component
- [ ] Add collapsible behavior
- [ ] Add progress indicators

### Phase 4: Quests Section Upgrade

- [ ] Add category tabs within quests
- [ ] Improve quest list items
- [ ] Add inline actions

### Phase 5: AI Chat Enhancement

- [ ] Create full-page AI chat tab
- [ ] Add context bar showing available data
- [ ] Add quick action buttons
- [ ] Create sticky compact chat for other tabs

### Phase 6: Visual Polish

- [ ] Apply category color coding
- [ ] Standardize icons
- [ ] Add micro-interactions
- [ ] Create empty state components

---

## 🎨 Design Tokens

```typescript
const storylineUX = {
  colors: {
    planning: { main: "#3B82F6", light: "#DBEAFE", dark: "#1D4ED8" },
    development: { main: "#8B5CF6", light: "#EDE9FE", dark: "#6D28D9" },
    operations: { main: "#10B981", light: "#D1FAE5", dark: "#047857" },
  },
  spacing: {
    sectionGap: 2, // 16px
    cardPadding: 2, // 16px
    headerHeight: 80, // compact
  },
  transitions: {
    collapse: "all 0.2s ease-in-out",
    hover: "all 0.15s ease",
  },
}
```

---

## 🚀 Priority Order

1. **High Impact, Low Effort:**

   - Compact header
   - Collapsible sections
   - Section progress indicators

2. **High Impact, Medium Effort:**

   - AI Chat as tab
   - Reusable SectionCard component
   - Quest category tabs

3. **Medium Impact, Medium Effort:**

   - Full-page AI chat interface
   - Visual polish / color coding

4. **Future Enhancements:**
   - Sticky compact AI chat
   - Inline editing
   - Real AI integration

---

## ✅ Success Criteria

1. Page loads with minimal scrolling needed to see key info
2. User can collapse sections they don't need
3. AI Chat is prominent and accessible from all tabs
4. Progress is visible at-a-glance (header + section headers)
5. Category colors help differentiate Planning/Development/Operations
6. Empty states guide users on what to add
7. Mobile experience is usable (single column, touch-friendly)

---

## 📅 Estimated Timeline

| Phase                  | Effort | Priority |
| ---------------------- | ------ | -------- |
| Phase 1: Header        | 2 hrs  | High     |
| Phase 2: Tabs          | 3 hrs  | High     |
| Phase 3: Section Cards | 4 hrs  | High     |
| Phase 4: Quests        | 2 hrs  | Medium   |
| Phase 5: AI Chat       | 3 hrs  | Medium   |
| Phase 6: Polish        | 2 hrs  | Low      |

**Total: ~16 hours**

---

## 🔗 References

- [MUI Card Component](https://mui.com/material-ui/react-card/)
- [MUI Collapse](https://mui.com/material-ui/react-collapse/)
- [MUI Tabs](https://mui.com/material-ui/react-tabs/)
- [Refactoring UI - Empty States](https://www.refactoringui.com/)
