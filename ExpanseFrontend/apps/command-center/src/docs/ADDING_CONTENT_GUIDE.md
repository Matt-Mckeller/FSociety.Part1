# Command Center - Adding Content Guide

> **📖 Wiki Reference:** See the full interactive documentation in the app at  
> `Storylines → Command Center → AI Interaction Guide`  
> or in `/data/storylines/wiki/command-center-ai-interactions.json`

---

## 🤖 AI Quick Actions

Tell your AI assistant (GitHub Copilot, Claude, etc.) these commands:

| Action | Example Request |
|--------|-----------------|
| **Add Storyline** | "Add a storyline called 'User Analytics' to the 4eye campaign about tracking user learning patterns" |
| **Add Nav Variable** | "Add a navigational variable: 'AI-First Development' - always leverage AI to accelerate work. Type: strategy" |
| **Create Wiki** | "Create wiki documentation for 4eye-analytics with goals about data collection and visualization" |
| **Update Status** | "Update 4eye-ai-chat status to quest-complete" |
| **Add Goal** | "Add a goal to the 4eye campaign: Launch beta by Q2 2026" |

---

## Data Architecture Overview

The command center uses a hierarchical data model with interconnected JSON files:

```
Legend (Vision)
  └── Campaign (Strategic Initiative)
        └── Storyline (Product Feature/Area)
              └── Quest (Major Deliverable)
                    └── Objective (Work Item)
```

### Key Files & Their Purpose

| File | Location | Purpose |
|------|----------|---------|
| `storylines.json` | `/data/` | All product features/areas |
| `campaigns.json` | `/data/` | Strategic business initiatives |
| `roadmap.json` | `/data/` | Timeline, phases, navigational variables |
| `storylines/wiki/{id}.json` | `/data/storylines/wiki/` | Extended storyline documentation |

---

## Adding a New Storyline

### Step 1: Add to `storylines.json`

Add a new entry to the `storylines` array:

```json
{
  "id": "4eye-your-feature",           // Kebab-case, prefixed with campaign
  "name": "Your Feature Name",          // Display name
  "description": "Brief description",   // 1-2 sentences
  "status": "not-started",              // not-started | in-progress | paused | quest-complete
  "priority": "P2",                     // P1 (critical) | P2 (important) | P3 (nice-to-have)
  "category": "business",               // business | personal
  "color": "#4ECDC4",                   // Match campaign color (4eye=#4ECDC4)
  "icon": "Psychology",                 // MUI icon name
  "campaignIds": ["4eye"]               // Which campaigns this belongs to
}
```

**MUI Icons Reference:** https://mui.com/material-ui/material-icons/

### Step 2: Link to Campaign in `campaigns.json`

Add the storyline ID to the campaign's `storylineIds` array:

```json
{
  "id": "4eye",
  "storylineIds": [
    "4eye-website",
    "4eye-ai-tutor",
    // ... existing storylines
    "4eye-your-feature"   // ADD HERE
  ]
}
```

### Step 3 (Optional): Create Wiki Documentation

Create `/data/storylines/wiki/4eye-your-feature.json`:

```json
{
  "storylineId": "4eye-your-feature",
  "lastUpdated": "2026-02-11",
  "overview": {
    "html": "<div>Rich HTML content...</div>",
    "summary": "Plain text summary for previews"
  },
  "goals": [
    {
      "id": "goal-1",
      "title": "Goal Title",
      "description": "What this goal achieves",
      "timeframe": "short",           // short | medium | long
      "status": "not-started",
      "linkedQuestIds": []
    }
  ],
  "customSections": [
    {
      "id": "section-1",
      "title": "Section Title",
      "html": "<div>Section content...</div>",
      "order": 1
    }
  ],
  "notes": "Optional notes about the storyline"
}
```

---

## Adding a Navigational Variable

Navigational variables represent strategic insights displayed in the Strategic Compass view.

### Add to `roadmap.json` → `navigationalVariables`

```json
{
  "id": "nav-your-variable",
  "title": "Short Title (5-7 words)",
  "description": "Detailed explanation of the insight or strategy",
  "type": "strategy"    // advantage | opportunity | strategy | insight
}
```

**Type Definitions:**
- `advantage` - Something you have that others don't
- `opportunity` - External factors you can leverage  
- `strategy` - Intentional approach or tactic
- `insight` - Key realization or learning

---

## Quick Reference: Campaign Colors & IDs

| Campaign | ID | Color | Icon |
|----------|-----|--------|------|
| 4Eye | `4eye` | `#4ECDC4` | Various |
| 1Game | `1game` | `#9B59B6` | Stars/EmojiEvents |
| 4Up | `4up` | `#F39C12` | Smartphone |
| Expanse Services | `expanse-services` | `#E74C3C` | Business |
| Command Center | `command-center` | `#8B5CF6` | Map/Terminal |
| Marketing | `marketing` | `#3498DB` | Campaign |
| Personal | `personal` | `#95A5A6` | Person |

---

## Validation Checklist

When adding content, verify:

- [ ] IDs are unique and kebab-case
- [ ] Campaign and storyline reference each other (bidirectional)
- [ ] Colors match the campaign theme
- [ ] Status values are valid enum values
- [ ] JSON is valid (no trailing commas, proper escaping)

---

## Example: Complete Addition Flow

**Scenario:** Adding "Purpose Relatability" feature to 4Eye

1. **storylines.json** - Add storyline object
2. **campaigns.json** - Add `"4eye-purpose-relatability"` to 4eye's storylineIds
3. **storylines/wiki/4eye-purpose-relatability.json** - Create wiki file with goals and documentation

---

## 🤖 AI Interaction Best Practices

When working with an AI assistant to manage command center content:

### Be Specific About Context
```
✅ "Add a storyline called 'Analytics Dashboard' to the 4eye campaign"
❌ "Add analytics feature"
```

### Include Purpose/Description
```
✅ "Add a storyline about tracking user learning patterns and providing insights to teachers"
❌ "Add storyline for analytics"
```

### Request Wiki When Needed
```
✅ "Create a wiki page with goals about data collection, visualization, and teacher reports"
❌ (AI won't automatically create wiki unless asked)
```

### Specify Navigational Variable Type
```
✅ "Add as a navigational variable with type 'strategy'"
❌ "Add to the compass" (AI may not know which type)
```

---

## File Paths Quick Reference

All paths relative to `/apps/command-center/src/`:

| Content | Path |
|---------|------|
| Storylines | `data/storylines.json` |
| Campaigns | `data/campaigns.json` |
| Roadmap & Nav Variables | `data/roadmap.json` |
| Wiki Documentation | `data/storylines/wiki/{storylineId}.json` |
| Quests | `data/quests.json` |
| Objectives | `data/objectives.json` |
| This Guide | `docs/ADDING_CONTENT_GUIDE.md` |
