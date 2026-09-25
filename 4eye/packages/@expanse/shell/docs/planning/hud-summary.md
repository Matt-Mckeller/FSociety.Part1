# HUD Feature Summary

**Purpose**: Confirm understanding of all HUD components before implementation.

**Related Documents**:
- [hud-plan.md](./hud-plan.md) — Architecture details, layer system, code examples
- [hud-roadmap.md](./hud-roadmap.md) — **Execution order** (phases, dependencies, validation)
- [hud-tasks.md](./hud-tasks.md) — Individual tasks (status tracking)
- [DICTIONARY.md](../../../../packages/@expanse/shell/docs/DICTIONARY.md) — Terminology definitions

---

## Layout Paradigms: Spatial vs Basic Web

The HUD system is part of the **Spatial Layout** paradigm - a fundamentally different approach from traditional web layouts.

| Aspect | Spatial Layout | Basic Web Layout |
|--------|----------------|------------------|
| **Architecture** | SPA, full-viewport immersive | Standard pages, navigation |
| **Navigation** | MapGridNavigation (2D grid, minimap) | URL routes, headers, navbars |
| **UI Style** | HUD always visible, floating controls | Buttons on page, static menus |
| **Feel** | Application/game-like | Website-like |
| **Templates** | FullScreenLayout | MinimalLayout, DashboardLayout, etc. |

HUD components (`action-bars/`, `orbs/`, `navigation-pad/`, etc.) are designed for the Spatial paradigm but can be selectively used in Basic Web layouts for specific interactions.

---

## 0. Primary Goals

### Core Objective
- Improve Learning, Engagement, and User Experience
- Improve User Attention and Ability to Think, while also Teaching and maintaining a positive ux
- Teach people about human learning and engagement
- Improved Visuals & Evolution of the Web into Web 4

### Secondary Goal: Design Visualization
Use Storybook to **visualize and explore variations** of the HUD before building actual applications.
- See which layouts look best for different contexts
- Presentation options
- Easier than reading text descriptions
- Prepare designs for implementation

### Additional Feature Requirements / Goals ( for Improvements in Transition )
- Build a web layout system that can **toggle between Basic Web Layout and Spatial Layout**.

### Implementation Plan Goals
- See which layouts look best for different contexts & Be able to quickly iterate on design
- Finalize Layout Huds, Action Bars, Buttons, and other Components for use in Applications and Websites

### Why Spatial/HUD Layout?
*General reasons to use spatial layout - applies to any spatial template*

#### AI Integration
**Highlights**: AI action orbs, contextual suggestions, easy chat access, 4eye companion, voice/vision input

AI integration into web better than standard approaches. Easy access to AI chats through action orbs and buttons. 4eye companion for guidance and interaction. Contextual AI suggestions based on current page/context. Supports chat, voice, and vision input modalities.

#### Interchangeable Components & Web Styles
**Highlights**: Different web styles, swappable action bars, improved interactivity, flexible UI

Supports multiple web styles and interchangeable action bars. Improved interactivity through modular components. Not locked into one look - shows flexibility and innovation.

#### Visual & Spatial Learning, Nonverbal Improvements
**Highlights**: Icons and vector graphics as primary over text-heavy menus, pattern recognition, improved visual feedback, crosses language barriers (improved internationalization), pattern recognition improvements

Visual symbols as primary communication alongside text - icons and spatial positioning over text-heavy menus. Supports nonverbal interpretation through icons, patterns, and spatial positioning. Faster recognition, crosses language barriers, aids visual/spatial learners. Improved visual feedback confirms actions - animations, state changes, progress indicators, celebration effects. 4 actions for memory - visual/spatial learning support.

#### Adaptive Content & Navigation
**Highlights**: Role-based views, interest-driven content, personalized exploration, new ways to navigate

New ways to navigate the web and explore content. Select your role and/or interest - the content you see changes, your experience adapts. Example: Student sees learning paths ( or fun), Investor sees metrics, Teacher sees class tools. Improved content types tailored to user context.

#### AI w/ Multimodal Input for Interaction
**Highlights**: 4eye companion, AI action orbs for chat/voice/vision, contextual AI suggestions, text-to-speech

AI-powered learning assistance with 4eye companion for guidance. AI action orbs for chat/voice/vision input. Contextual AI suggestions based on current context/page. Voice navigation, optional text-to-speech reading, AI voice communication. Navigate via visuals, voice, AI chat, or traditional input. Supports different user preferences and accessibility needs.

#### Action Buttons & Interactive Actions
**Highlights**: Learn More, Expand, Clarify, Simplify, context-specific actions

Action buttons that trigger AI or system responses. Examples: Learn More, Expand, Clarify, Simplify, Ask Question, Practice, Quiz Me, Explore, Contact, Sign Up, Pay. These are non-input actions - user clicks, system responds. Different from AI input (voice/camera/text) - these are quick-action triggers.

#### Customization & Organization
**Highlights**: User-arranged layouts, theme/shape/color selection

Users arrange the site how they want → improves memory and navigation ability. Even "disorganized" works if it's how they remember (like desktop app arrangements). Future: bookmarks, saved layouts. MUI theme integration, action bar setup per screen.

#### Presentations & Social
**Highlights**: More Interactions, gamified presentation mode, Multi-Screen Interactive, Live Sharing, Recorded Interactivity Modes, multi-screen, collaborative views, Minimap traversal, spatial navigation and organization + improvements in visuals, semiotic thinking, and nonverbals

Example Iteractions: 
Learn More, Ask Questions, 

**Presentation Features:**
- Ask Question button (audience)
- Live polling/quizzes
- Shared screen indicators
- Example Iteractions: Learn More, Ask Questions, etc
- ....

**Example Interactions:** Learn More, Ask Questions, Next/Previous, Bookmark, Share Screen, Raise Hand, React


#### Scalability & Unique Interactions
**Highlights**: Orbs and spatial panels vs nested menus, context-aware actions

Complex layouts that support scalable innovation better than standard nested menus. Action orbs, spatial navigation, context-aware actions provide unique interactions.

#### Accessibility
**Highlights**: Visual cues, spatial access, reduced reliance on reading

Visual cues and spatial access reduce reliance on reading. Multiple input/output modalities support different user needs.

#### Marketing Differentiation
**Highlights**: Unique look, clearly different from standard websites

Represents innovation, something different, next level. Serves as a marketing tactic - immediately recognizable as not a standard web template.

---

### Primary HUD Template
*Specific design choices of the main HUD template*

```
BASIC WEB LAYOUT:                PRIMARY HUD TEMPLATE:
┌─────────────────────┐          ┌─────────────────────────────┐
│ [Nav] [Nav] [Nav]   │          │ [Status] [Domain▼] [☀️🔍] │
├─────────────────────┤          ├─────────────────────────────┤
│ ┌─────┐             │          │                    Minimap │
│ │Menu │  Content    │          │      Content               │
│ │ > A │             │          │                    Controls│
│ │ > B │             │          │        [Orbs]              │
│ │ > C │             │          ├─────────────────────────────┤
│ └─────┘             │          │      [Action Bar]          │
└─────────────────────┘          └─────────────────────────────┘
  Text menus, linear              Spatial, visual, gamified
```

#### Centered Layout
**Highlights**: Bars centered, don't consume full screen, full-screen feel maintained

The action bars and UI components are designed to be centered and not take up the entire screen so that the user still feels like the screen is full-sized.

#### Content Focus
**Highlights**: Peripheral UI typically points inward toward center content area improving user focus

Main content occupies the center focus. Bars point towards the center where content lives. User attention naturally drawn to what matters.

#### Breathing Room
**Highlights**: Generous spacing, like windows make a house feel bigger

This can vary based on design choices, but regardless the layout feels bigger - like how windows work in a house to make the space feel larger. Enables different component styles than standard boring web templates.

#### Gaming-Inspired UX
**Highlights**: MOBA-style action placement, video game HUD familiarity

MOBA-style action placement, video game HUD familiarity (Wild Rift, Call of Duty patterns). Spatial layout patterns from gaming industry. Different from gamification rewards - this is about spatial conventions.

---

### Gamification & Gaming Appeal
*Engagement system + modular UI capabilities - can apply to any layout*

#### Improved Interactivity

#### Reward System
**Highlights**: XP bars, currency, achievements, levels, streaks, visual stimulation

XP bars, currency, achievements, levels - visible and engaging. Progress tracking and streaks. Appeals to younger generations through gamification vibe.

#### Appeals to Gamers & Kids
**Highlights**: Familiar game-like interface, engaging for younger generations

Familiar game-like interface that appeals to gamers and younger users. Engaging experience that feels like a game rather than a boring website.

#### Modular Action Bars
**Highlights**: Action bars, orbs configurable per app/screen

Action bars, orbs, static UI components that can be configured per app/screen. Different arrangements for different contexts.

#### Multiple Visual Styles
**Highlights**: Shapes, colors, themes - user selects preference

Shapes (circles, squares, diamonds, triangles, hexagons), colors, themes - user selects their preference. Personalized visual experience.

---

## 1. HUD Presets (Full Configurations)

These are complete HUD configurations with different purposes:

| Preset | Purpose | Key Differences |
|--------|---------|-----------------|
| **Desktop Default** | General browsing, most features | Full header, center orbs, minimap visible, all controls |
| **Mobile Default** | Phone screens | Minimal header, essential orbs, no minimap |
| **Tablet Default** | Mid-size screens | Between desktop and mobile |
| **Presentation** | Demos, teaching | Clean, large status, minimal distractions |
| **Learning Focus** | Study sessions | Goals prominent, progress bar visible, context-aware suggestions |
| **Healing Dashboard** | Therapy, wellness | Calming layout, healing metrics, positivity tracking |

**Each preset defines:**
- Platform (desktop/mobile/tablet)
- Which header buttons appear
- Which orbs appear
- Status bar configuration
- Feature toggles (minimap, view controls, etc.)

---

## 2. Orb Positions (OrbCluster Patterns)

**Uses existing `OrbCluster` component** with `pattern` prop:

```
BOTTOM-ROW (Desktop default)     RIGHT-STACK (Mobile MOBA)
┌──────────────────────┐         ┌──────────────────────┐
│                      │         │                   ○  │
│     ○   ○   ○   ○    │         │                  ○ ○ │
│   [──Bottom Bar──]   │         │                   ○  │
└──────────────────────┘         └──────────────────────┘

CORNERS (Split)                  RADIAL (Floating cluster)
┌──────────────────────┐         ┌──────────────────────┐
│ [○○]           [○○]  │         │    User-positioned   │
│ Persist.    Context. │         │         ○○○          │
└──────────────────────┘         └──────────────────────┘
```

**Available OrbCluster Patterns** (from implementation):
| Pattern | Best For |
|---------|----------|
| `bottom-row` | Desktop, center above bottom bar |
| `right-stack` | Mobile, thumb-reachable, MOBA-style |
| `left-stack` | Alternative mobile |
| `corners` | Separating persistent vs contextual |
| `radial` | Floating cluster |
| `bottom-arc` | Curved arrangement |
| `diagonal-tl`, `diagonal-tr` | Diagonal stacks |
| `custom` | Manual positioning |

---

## 3. Content Layouts (Main Area)

How the main content area is divided:

```
SINGLE (Default)      2x2 GRID              SIDE-BY-SIDE
┌───────────┐         ┌─────┬─────┐         ┌─────┬─────┐
│           │         │  1  │  2  │         │     │     │
│  Content  │         ├─────┼─────┤         │  1  │  2  │
│           │         │  3  │  4  │         │     │     │
└───────────┘         └─────┴─────┘         └─────┴─────┘

STACKED               MAIN + SIDEBAR        FOCUS MODE
┌───────────┐         ┌────────┬───┐        ┌───────────┐
│     1     │         │        │   │        │           │
├───────────┤         │ Main   │ S │        │  Minimal  │
│     2     │         │        │   │        │    HUD    │
└───────────┘         └────────┴───┘        └───────────┘

LIGHT/DARK SPLIT (for comparison)
┌─────────────┬─────────────┐
│  LIGHT      │   DARK      │
│  THEME      │   THEME     │
└─────────────┴─────────────┘
```

---

## 4. Profile Status Display Configurations

**Intent**: Different amounts of info shown in Profile Status Display based on context

| Config | What's Shown | Use Case |
|--------|--------------|----------|
| **Expanded** | [👤][💰 1,234][⭐ Lv5][🔥 7d] with labels | Default - values change frequently |
| **Compact** | [👤][💰][⭐] small icons only | Browsing, reading |
| **Minimal** | Just avatar/level | Mobile, focus mode |
| **Presentation** | Large, clean metrics | Demos, teaching |
| **Learning** | Goals + progress prominent | Study sessions |
| **Social** | Achievements, party status | Collaboration |

---

## 5. Header System

### 5.1 Header Display States
The header area can display different content based on context/events:

| State | What's Shown | Trigger |
|-------|-------------|---------|
| **Default** | Pill buttons (Domain, Context, Goals, etc.) | Normal browsing |
| **Party View** | Participant avatars + minimal buttons | Presentation, collaboration |
| **Achievement** | Celebration banner, achievement details | Achievement unlock |
| **Quest View** | Active quest progress, objectives | Quest-related screens |
| **Celebration** | Animation, confetti, 4eye celebration | Level up, major milestone |
| **Progress Push** | Full-width progress bar animation | XP gain, 4eye pushing |
| **Loot Opening** | Reward reveal animation | Opening inventory item |
| **Notification** | Alert banner across header | System/teacher message |
| **Interactive** | Quiz question with options, polls | Engagement prompts |
| **Feedback** | Action confirmation, success/error states, visual response | User action completed |
| **Learning Feedback** | Learning amplification, comprehension check, encouragement | Learning milestone, quiz result, practice completion |
| **AI Communication** | AI processing indicator, response confirmation, loading state | User triggers AI action, awaiting response |
| **AI Response** | AI reply display, action taken confirmation | AI completed request |
| **Presentation Mode** | Participant count, timer, slide number, presenter controls | Active presentation/teaching session |

### 5.2 Header Layout Variants
```
DEFAULT (Buttons):
[Status] [Domain▼] [Context▼] [Goals] [Achievements] [Quest] [☀️]

PARTY VIEW (Replace):
[Status] [👤👤👤👤👤 +12 more]              [☀️]

PARTY VIEW (50/50 Split - Desktop):
[Status] [Domain▼] [Goals]  |  [👤👤👤👤👤 +5]  [☀️]

NOTIFICATION BANNER:
┌─────────────────────────────────────────────────────────────┐
│ 🎉 John earned the Explorer badge!                    [X]  │
└─────────────────────────────────────────────────────────────┘

INTERACTIVE (Quiz/Poll):
┌─────────────────────────────────────────────────────────────┐
│ What topic should we explore next?                          │
│ [Math] [Science] [History] [Skip]                          │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Header Buttons (Pill Style)

**Interactive pill buttons** - each opens a popover:

| Button | Shows When | Popover Contains |
|--------|------------|------------------|
| **Domain** | Always | Learning, Work, Life, Religion |
| **Context** | Based on domain | Learning: Grade, Classroom. Work: Department, Project |
| **Goals** | User has goals | Active goals, add new |
| **Subject/Topic** | In learning domain | Math, Science, History, etc. |
| **Achievements** | Gamification enabled | Recent achievements, progress to next |
| **Quests** | Active quests exist | Current quests, objectives, rewards |
| **Social** | Social features enabled | Friends online, messages, invites |
| **Preferences** | User-toggled | Communication style, learning modality |
| **More** | Overflow | Any buttons that don't fit |

### 5.4 Notification Types
Different types of content that can appear in header area:

| Type | Behavior | Example |
|------|----------|---------|
| **Temporary** | Snackbar, auto-fades (3-5s) | "Saved!" |
| **Persistent** | Stays until dismissed | "New update available" |
| **Achievement** | Special animation, auto-fades | "🏆 Explorer badge earned!" |
| **Interactive** | User must respond | Quiz question, poll, confirmation |
| **Announcement** | Important, styled prominently, may require acknowledgment | Teacher message, system alert, school intercom live display |
| **AI Confirmation** | Confirms AI action being taken, shows loading/processing | "Expanding explanation...", "Generating quiz..." |

**Announcement Examples:**
- Teacher sends message: "Class starts in 5 minutes"
- School intercom announcement displayed live in header
- System alert: "Scheduled maintenance at 3pm"
- Company-wide announcement: "New policy update - please review"

### 5.5 Header Context Configuration

**Intent**: Applications should control what header displays and how it behaves

```ts
// Application controls header behavior
headerConfig: {
  // Which buttons are available
  availableButtons: ['domain', 'goals', 'achievements', 'social'],
  
  // Which states are enabled
  enabledStates: ['default', 'party', 'achievement', 'interactive'],
  
  // Party view behavior
  partyDisplay: 'replace' | '50-50' | 'overlay',
  
  // Notification settings
  notifications: {
    allowInteractive: true,
    achievementStyle: 'banner' | 'toast' | 'full-celebration',
    autoFadeTimeout: 5000,
  },
  
  // Context-dependent visibility
  contextRules: [
    { when: 'presentation', show: ['party'], hide: ['domain'] },
    { when: 'quiz', show: ['interactive'], hide: ['all-buttons'] },
  ]
}
```

**Controlled by**: `HeaderContextProvider` - manages visibility, state, and transitions

---

## 6. Action Buttons & Controls

### 6.1 Additional Action Buttons

| Button | Function | Location |
|--------|----------|----------|
| **Color Selection** | MUI theme color picker | View Controls or Settings |
| **Shape Selection** | UI shape preference (circles, squares, diamonds, triangles) | View Controls or Settings |
| **Character Profile** | Open full character customization (may be same as Profile Status Display click) | Profile Status Display or separate button |
| **Achievements** | View achievements, progress | Header button or action bar |
| **Quests** | View active quests, objectives | Header button or action bar |
| **Social** | Friends, messages, invites | Header button |
| **Inventory/Backpack** | Collected items, rewards | Action bar or orb |

### 6.2 Shape Selection System
**Intent**: Users can customize UI shape aesthetic

| Shape | Affects |
|-------|---------|
| **Circles** | 4eye face, orbs, buttons, containers |
| **Squares** | More angular UI, grid-aligned |
| **Diamonds** | Rotated squares, unique look |
| **Triangles** | Pointed elements, directional feel |
| **Hexagons** | Honeycomb style, organic grid |

**Changes based on selection:**
- 4eye character face shape
- Action orb shapes
- Button borders/styling
- Container corners
- Progress bar ends

### 6.3 Color Selection System
**Intent**: Users can customize MUI theme colors

| Option | Description |
|--------|-------------|
| **Preset Themes** | Pre-designed color combinations |
| **Primary Color** | Main accent color |
| **Secondary Color** | Supporting color |
| **Mode** | Light/Dark/Auto |
| **Vibrancy** | Subtle vs Vibrant saturation |

---

## 7. Action Bars & Orb Group

### Overview
Multiple action bars serve different purposes. Which bars appear depends on context/screen.

### 7.1 Bottom Action Bar
**Location**: Bottom of screen, full width  
**Intent**: Primary page-level actions, always accessible

| Purpose | Example Items |
|---------|---------------|
| Primary actions | Edit, Create, Share |
| Navigation | Page nav, breadcrumbs |
| Quick toggles | View mode, filters |

### 7.2 AI Input Bar
**Location**: Slides up from bottom or triggered by orb (TBD)  
**Intent**: AI interaction - voice, camera, text input to 4eye

| Control | Function |
|---------|----------|
| Mic | Speech input |
| Cam | Camera/visual input |
| Text field | Type to AI |
| Language select | Source + translation |
| Send | Submit input |

**Triggering**: TBD - may be always visible, may be triggered by AI orb, may depend on screen.

### 7.3 View Controls Panel
**Location**: Right side, above minimap  
**Intent**: Visual preferences and accessibility

| Control | Function |
|---------|----------|
| Grid/List toggle | Change content layout |
| Light/Dark toggle | Theme switch |
| Zoom/A11y | Accessibility controls |
| Pin | TBD - needs clarification |

### 7.4 Orb Group (Action Orbs)
**Location**: Configurable (see Section 2)  
**Intent**: Context-dependent quick actions, visually prominent

**Orbs are context-dependent** - they change based on domain, page, app.

| Context | Example Orbs |
|---------|---------------|
| Web page | Explore, Contact, Learn More, Sign Up, Login, Pay, Clarify |
| AI chat active | Mic, Cam, Send, Stop |
| Presentation | Next, Previous, Ask Question, Bookmark |
| Learning | Practice, Quiz Me, Explain, Simplify |

### 7.5 Expandable Orbs
**Intent**: Second-level actions without cluttering screen

Some orbs expand to show sub-options on tap:

```
[Learn] → tap →  ┌──────────────┐
                  │ Learn More   │
                  │ Simplify     │
                  │ Expand       │
                  │ Ask Question │
                  └──────────────┘
```

**Expansion patterns** (to be explored in Storybook):
- Radial/fan around the orb
- Floating list menu
- Above orb
- Center of screen (for important actions)
- Goal: non-disruptive to content

### 7.6 Nested Action Bars
**Intent**: Slide additional tools in/out without screen changes

- Action bar slides in/out of another
- Draggable handles to push in/out
- Differentiated by size + divider
- Example: AI Input Bar slides out of Bottom Action Bar

---

## 8. Profile Status Display

**Location**: Top-left corner  
**Intent**: Show gamification metrics (coins, XP, level) and user status - supports engagement and sense of progress

### States
```
EXPANDED (default?): [👤 Profile][💰 1,234 coins][⭐ Level 5][🔥 7d streak]
                           ↑ coins/XP change frequently, important to see

COLLAPSED (option):  [👤][💰][⭐]
                     ↑ for minimal/focus modes
```

### Open Question
**Default state**: Expanded (coins/XP are important, change frequently) vs Collapsed (cleaner look)?  
→ Likely **Expanded** as default, Collapsed for focus/presentation modes.

### Expansion Direction
- Expands **right** (not down)
- Contains: profile, currency, XP, level, goals, budget, streak

---

## 9. 4eye Integration

**Intent**: 4eye is the AI companion character - interactive, engaging, provides personality to AI features

### Components
| Component | Behavior |
|-----------|----------|
| **4eye Chat Button** | Profile icon or simple chat button (context-dependent). Opens AI chat. |
| **Progress Bar** | Shows XP, 4eye pushes bar on gains |
| **Celebrations** | Tiered: subtle → medium → full |

### Chat Display Styles
Different chat UI depending on user goal/context:
- Full chat panel (conversational)
- Inline suggestions (non-disruptive)
- Floating bubble (quick questions)
- Voice mode (hands-free)

### Progress Bar Placement
- **Default**: In Profile Status Display (top-left, compact)
- **Celebration**: Expands to full-width below header, then returns

### Note on Profile Icon
4eye character profile icon vs simple chat button - depends on screen.  
Avoid conflict with Party Profiles (see Section 12).

---

## 10. Minimap

**Location**: Bottom-right, above orbs (desktop only)

| Feature | Description |
|---------|-------------|
| Site overview | Visual map of current site/app |
| Toggle button | Show/hide |
| Click to navigate | Jump to section |

---

## 11. Special Features

### Spellbook
- Transform content to different modalities
- Visual, audio, simplified, detailed
- Suggested spells notification

### Action Lists
- Lists available AI actions for current context (navigate, contact, learn more, expand, clarify, etc.)
- Usable for audio input - user asks "what can I do?" and gets available actions
- Different from Spellbook: Spellbook transforms content, Action Lists shows what actions AI can take
- Context-aware - different actions on different pages/screens
- Can be displayed as popover, panel, or read aloud

### Speech-to-Text
- Toggle in action bar
- Language selection (source + translation)

### Inventory/Backpack
- Backpack icon
- Shows collected items, rewards

---

## 12. Domains

| Domain | Icon | Contexts Available |
|--------|------|-------------------|
| **Learning** | 📚 | Grade, Subject, Classroom |
| **Work** | 💼 | Department, Project, Team |
| **Life** | 🏠 | Home, Personal, Family |
| **Religion** | ⛪ | Faith-specific contexts |

Switching domain changes:
- Header buttons
- Available orbs
- Profile Status Display focus
- Contextual suggestions

---

## 13. Party Profiles

**Location**: Side panel OR header (see Section 5.2)  
**Intent**: Show active members/participants in presentations or collaborative sessions

### Components
| Element | Description |
|---------|-------------|
| Profile images | 4eye character variants OR real photos (app-dependent) |
| 4eye variants | Different colors, eye pieces, decorations, shapes, levels |
| Status | Speaking, viewing, away, etc. |
| Expandable | Collapse to icons, expand to full list |

### When Shown
- Presentations with audience
- Collaborative work sessions
- Group learning
- Live classes

### Interaction
TBD - may be view-only or interactive (click to message, etc.)

---

## 14. User Type / Role System

**Intent**: Tailor content and views based on who the user is

### Concept
Dropdown/selector where user specifies their role:
- General / Unknown (default)
- Student
- Teacher
- Investor
- Parent
- Developer
- etc.

### What Changes Based on Role
| Aspect | Example |
|--------|----------|
| Content priority | Student sees learning first, Investor sees metrics |
| Page ordering | Different homepage for different roles |
| View styling | Simplified vs detailed |
| Available actions | Teacher sees grading tools, student doesn't |

### Placement (TBD - needs exploration)
- Header button?
- Action bar?
- Onboarding modal (required before site access)?
- Part of main content?

### Relationship to Goals
- Schools: **Roles** are clear (Student, Teacher)
- General web: **Goals** may be better ("I want to learn", "I want to buy")
- May use intent detection
- **Needs design exploration in Storybook**

---

## Questions to Confirm

1. **Healing Dashboard**: What specific metrics/features? (Positivity score, mood tracking, therapy goals?)
2. **Pin functionality**: What does it pin? (Layout? Content? Settings?)
3. **Mobile**: Orb position change + fewer header buttons? Any other differences?
4. **Profile Status Display default**: Expanded (show values) or Collapsed (icons only)?

---

## Implementation Status

### ✅ Already Implemented (in @expanse/shell or brandCore)

| Component | Package | Notes |
|-----------|---------|-------|
| ActionOrb, OrbCluster | @expanse/shell | 5 shapes, 10 patterns |
| SpatialBar, SpatialBarButton | @expanse/shell | 8 positions, collapsible |
| ActionDock | @expanse/shell | 4 corners |
| Minimap | @expanse/shell | 3 variants |
| ScreenOverlay | @expanse/shell | 9 slot positions |
| NavigationProvider | @expanse/shell | Full grid navigation |
| ProfileStatusDisplay | brandCore | Staircase/horizontal, expandable |
| GenericStatusBar | brandCore | Slot-based |

### ❌ New Components Needed

| Component | Description |
|-----------|-------------|
| HudContextProvider | Centralized HUD config + presets |
| HeaderContextProvider | Control header state, visibility, transitions |
| Interactive Header Buttons | Pill buttons with popovers |
| Header State Manager | Handle display states (default, party, achievement, interactive) |
| Expandable Orbs | Tap → sub-options |
| AI Input Bar | Mic, Cam, text for 4eye |
| Party Profiles | Active members display (header + side panel) |
| User Type / Role Selector | Role-based content |
| Content Layout Switcher | Toggle 2x2, side-by-side, etc. |
| Color Selection | MUI theme color picker |
| Shape Selection | UI shape preference (circles, squares, diamonds) |
| Achievement Button | View achievements, progress |
| Quest Button | View active quests |
| Interactive Notification | Quiz/poll in header |
| Legend Component | Explains icons, pages, navigation - links to full documentation |
| Action Lists | Lists available AI actions (navigate, contact, learn more, expand, etc.) - usable for audio input, different from Spellbook |

---

## Summary Matrix

```
                    Desktop   Mobile   Tablet   Present.  Learning  Healing
                    -------   ------   ------   --------  --------  -------
Header Buttons      Full      Minimal  Medium   Clean     Goals+    Calm
Orb Position        Center    BtmRight Either   Center    Center    Center
Status Config       Compact   Minimal  Compact  Large     Learning  Social
Minimap             Yes       No       Optional No        Optional  No
View Controls       Yes       No       Optional No        Optional  Yes
Celebration Level   Normal    Subtle   Normal   Full      Normal    Subtle
```

---

## Notes

- Consider additional ways to improve organization as a human attribute/skill through the UI (though current organization features may be sufficient)
- 
