# Project: Controller

> **Shared infrastructure.** Controller is part of the same system that 4eye uses. App, Website (4eye), and Website (Services) all consume it. Owned here; referenced from other project files.

## Todos
[] Add in that I really would like to have visuals of the things I want in life for motivation to review daily. Like Yacht, Island, Women, Money, Power, Game, Healing, etc etc

## Open Questions
- **What is it for, and when?** It may not even be necessary for mvp product tbh, but it adds another layer of depth to the system and brand that would be nice. It also helps explain where we are going and integration possibilities, etc. It has add

**Reusable System For Communication, Branding, AI Chatting**
Its the system which it operates within that has high value. Its required for most of the screen types we will use and want. Its a simple foundation. But we can expand into life communications, deeper discussions around life, content creation that aligns with brand and person, and learning about being a human by working with pieces that are meant to optimize our learning experience. 
Also the foundations align with many realms, and if I can create a reusable clean system and it makes sense etc I can implement a bunch of features with it. And review and remember important details.

actual interactability, preset options, Chat Mode, content creation, services & marketing process (eventually).
- **Is it valuable *right now*?** Highest actual current value would be money. Controller is more future-oriented and PM/planning-oriented than immediately useful for end users — though screens can be catered for communication, services, coding. Additional value for Expanse Services Representation of work, content generation, communication with friends and for life etc.
- **Standard Chat UI, or shared components?** What shared functionality does it have? Worth the upfront work? Could be quick if it comes out cleanly.
- **Conclusion (current thinking):** Better than strictly chatting. Definitely good for Work, Services, and probably Coding. Proof-of-concept level that can grow a lot. Concern is learning curve / time-to-value. But what about learning? Is it beneficial for learning? Probably. Easy transformations, simplified Screen perhaps. Anyway a different hud.

---

## V1 Scope (Self-Use, Estimated)
**Value:** Control. 🕹️
**Value ?!=:** Money. 💰?
**V1 Details:** Self use, no backend required, visual examples, core components.

- **[2-3D, or 1W][High Value]** Chat With Visual UI (Controller v1)
  - Components: Context, memory, people, entities, goals
  - Goal Solution: Memory refresh for motivation; remembering what needs to be remembered; accomplishing things optimally with better brain utilization
  - **Learning AI by Using:** Interface that teaches you how AI works and how you work — by organizing the right pieces/processes for operation, adding features/buttons/screens/guidance/templates, showing what goes where with real data, while letting you edit and control. Screens with premade solutions custom-tailored to your needs.

---

## V2+ Scope (Platform — Not Yet Estimated)
**V2 Details:** Context, Memory, People, Entities, Goals, Intents, Pipelines, Screens, Spells, Targets, Audience, etc.

### Use Cases
- **Chat Mode(s) / Domains:** School, Learn, Life, Work
- **Project Management:** Life Management, Learning Management, Social Management
- **All:** Presets & Profiles
- **Life:** Communication, Content Creation
- **Marketing:** Content Creation
- **Learn:** Research, Learning, Tutor, Injection Info
- **Ongoing:** Live Guidance, Life Management & Suggestions, Feedback
- **?? Group Screen** — Group improvements
- **?? Tutor**

### Interactions
- Job Postings
- Recruitment
- Content Generation & Guidance for onboarding / women / friends / family
- Content generation for yourself & reminder screens to help motivate
- Sex, Dating, Love, Marriage — managing relationships, partner lessons, knowledge, goals, tracking events
- Food
- Rewards
- Progress
- Life
- Career

### Benefits / Features
- **Observability Integration**
  - Short-term memory
  - Suggestions
  - Feedback
  - Logs associated with people
  - See alignment toward goals (or toward other goals)
  - Insight from AI on many different things
  - Improved mood & mental health
  - Course progress, learning progress
- **RL** — Understanding & Connection Multipliers
- **Profiles**
- **Targets**

---

## Components

### Input
- Chat main screen w/ spatial nav options for screens

### Main Components
- **Main Chat Input Bar**
- **AI Settings Bar** — see from symbol-grid, copy it over
- **Main Chat Display Output Screen(s)** — variants:
  - **Full Screen Embedded** — Primary large view used on the Main Chat Screen Page. Integrated with 4eye chat; all components and tabs displayed. Everything focused around chat including minimap buttons, on-screen actions, etc.
  - **Hud Small Chat** — Small window that appears on screen; doesn't take up much space; lets user input text and communicate with whatever content they're working on. Meant for quick actions, navigation, interactivity. Action button to switch to full screen mode or full page chat.
  - **Hud Large Chat** — Large popover/dialog taking up majority of screen but can be closed to return to underlying content. Action button to switch to full screen mode or full page chat.
  - Image attachments, text attachments, voice input and attachments
- **Context Button / Bar**
- **Actors Button / Bar**
- **Targets Button / Bar**

### Data

---

## Context System

### Context: Chat Input
Things that go into chat input context: domain, context, actors, targets, actions, spells, preset selections.
Separated into reusable modular components and separate contexts, with the exported context being the primary `ChatInputContext`.
Imports `ProfileContext` and `AISettingsContext`.

### Context: Profile Context
Determines which profile content is included in the chat. Handles injections and settings:
- Is the user acting as a role toward a profile-specific goal on the profile?
- Do we consider the user's profile characteristics? Which ones?

Has a relevant component for setting which context is included.

### Context: AI Settings Context
Settings seen in AI Settings Bar — import from symbol-grid.

---

## Actions

## Spellbook

**Description:** A keypad-style screen (or various layouts) listing different "spells" — actions the user can cast. Spells are contextually driven: based on the current user screen, active profile context, and other loaded contexts, the Spellbook suggests which spells to surface and in what order. Users can browse, learn, cast, and configure their action bars from the Spellbook. The Spellbook screen and its features are accessible from the **HUD game menu**.

> **Open Question:** Should we integrate presets into the Spellbook? (Preset page configs currently listed as a separate behavior — worth deciding if they live inside Spellbook or alongside it.)

### Key Behaviors
- **Browse:** User can explore all available spells (full library)
- **Learn:** Each spell has a description / explanation of what it does and when to use it
- **Cast:** Activating a spell applies it (to current content, current context, etc.)
- **Action Bar Setup** *(V2 release):* Users configure their persistent action bars by choosing spells from the Spellbook
- **Favorites:** Users can save favorite spells for quick access
- **Suggested Spells:** A notification/suggestion system surfaces recommended spells based on current context. Sort by recommended. Similar to the suggested actions notification concept in hud-demo-concepts.
- **Preset Page Configurations:** Template/preset Spellbook page layouts — a different UX mode from browsing. Curated collections for specific use cases (e.g., "Learning Mode Spells", "Writing Mode Spells", "Healing Mode Spells").

### Layout Variants
- Keypad-style grid (primary)
- Orb/icon layout — multiple size options (some orbs larger, some smaller, varied counts, likely ~4 primary)
- Left/right split — distinguish between spells that **always exist** vs. spells that **change by context**; simple divider in the middle or other visual solution
- Sliding action bar — the concept of an action bar sliding in/out of another action bar
- Navigation / filtering UX still needs to be defined

### Content Actions (Examples from hud-demo-concepts)
- Transform content into something visual
- Transform content into different learning modalities
- Assess content for quality and trustworthiness
- Other transformation spells: summarize, extract, translate, reframe

### Architecture Notes
- **This system should be modular** — it is likely to change over time and will have a lot of integrations
- Use **good context/state management** — spells interact with ProfileContext, ChatInputContext, domain context, current screen state
- **View components** should be separate from spell logic — layouts swappable without re-wiring functionality
- **Spend time thinking about architecture when implementing** — use Claude 4.7 (or latest) for implementation discussion
- Spell definitions should be data-driven (not hardcoded) so new spells can be added without changing layout components
- **For now, use JSON + a seeding-style approach** (similar to existing seed data patterns in the project) rather than implementing a full backend — this keeps V1 fast and still data-driven

### V1 — Frontend Mockup / Conceptual `[1-2D — TBD, discuss]`
- Static keypad-style grid with preset spell cards
- Spell cards: name, icon, short description, cast button
- Favorites toggle
- Preset page configuration examples
- No real execution — purely visual/UX demo

### V2 — Functional with Context `[3-5D — TBD, discuss]`
- Live context injection: spells filtered/sorted by current screen + profile
- Actual spell execution (hooks into ChatInputContext / pipeline execution)
- Action bar configuration (drag/select spells onto bars)
- Suggested spells notification system
- Modular, data-driven spell registry

> 📄 **Related:** [`hud-demo-concepts.md`](/Users/mm/Projects/Planning/roadmap/2026/plans/hud-demo-concepts.md) — orb layouts, sliding action bars, suggested actions notification, spellbook screen concepts

## Chat Page Action Bars
Action bars displayed on the chat page = all context, pipelines, and everything connected to `ChatInputContext` that we create and manage with reducers etc.

---

## Feedback
+ UI
UI.evolve()
  (vision memory attachment)
Audio
Img
Dashboard

recreate -> improve
  PM Tool?
  Definitely Gen Tool
  All Plans tested w/ 4.8 recreate simultaneously after foundation
orangize by
sequences
Comments
Events
Roles

## 

---

## Pipelines, Layers, Processes, and Instructions
<!-- Status Thoughts: 5/21/26 -> A bit excessive, extra, needs cleaned up too though because the info isnt complete. However, can probably be ignored for the moment. 
Also need to gather context from current implementation, and this project requires a lot of context which isn't yet available. 
Overall duration for this depends on the version too, likely this will be released in versions. Eventually seperate to its own project but not yet.
-->
**Description:** A pipeline is a sequence of named stages that transform content, a prompt, or data from one form to another. Each stage is a discrete step — with an input, a transformation operation (often AI-powered), and an output. Stages chain together: the output of one becomes the input of the next. Pipelines are powerful because they make multi-step processes visible, repeatable, and controllable — and they can be visualized as cards in a flow ( which also enables deeper thought and learning/comprehension ).

Pipelines are *layers* in the sense that you can think of the output as having passed through depth — each review or transformation pass adds something. They are also *instructions* — a pipeline effectively encodes a workflow as a reusable artifact.

<!-- TODO: Add more detail here — specific pipeline data shape, how stages reference models/prompts, how they relate to Spellbook, etc. -->

### Pipeline Type Examples

#### LLM Prompt Chains
The classic form. Each stage calls an AI model with a specific prompt and passes output forward.
- **Extract → Summarize → Translate → Format** — core utility pipeline
- **Generate → Review → Select → Refine** — content generation with quality layers
- **Draft → Tone-shift → Audience-target → Output** — targeted content production

#### Content Production Pipelines (Layered)
Think of these as vertical layers stacked on top of source material — each layer adds a lens or transformation. This is close to the "content as layers" concept.
- **Script → Audio** — voice/podcast content
- **Script → Video** — video recording or AI-generated video
- **Script → Audio → Visual Sync** — synchronized audio-visual content
- **Visual Script → Visual Video** — storyboard-style generation
- Full reference: [`content_type_flows.md`](/Users/mm/Projects/ExpanseFrontend/apps/4up/plans/generation/content_type_flows.md)

#### Data Stacking Pipeline (Depth Methodology)
Layered generation + deliberate review phases. Depth = compression + ambiguity + perspective testing.
- **Phase 1 — Generation:** produce N candidates
- **Phase 2 — Multi-Perspective Review:** evaluate each from 4+ perspectives (personal growth, power, loss, relationships, society)
- **Phase 3 — Selection + Refinement:** pick widest interpretive range, refine for ambiguity and memorability
- Full reference: [`data-stacking.md`](/Users/mm/Projects/ExpanseFrontend/apps/4up/plans/generation/pipelines-and-review/data-stacking.md)
- Examples: [`examples.md`](/Users/mm/Projects/ExpanseFrontend/apps/4up/plans/generation/pipelines-and-review/examples.md)

#### Learning Pipelines
- **Raw Info → Simplify → Quiz → Explain Why → Reward** — EDU domain
- **Input → Tutor Layer → Challenge Layer → Progress Update**

#### Communication Pipelines
- **Message → Empathy Filter → Context Injection → Tone → Send**
- Ties directly to the social/relationships use case

#### Marketing Pipelines (from content-strategy.md)
- AI pipeline for determining if content would perform well visually
- AI pipeline for predicting likelihood of success per format/transformation
- AI pipeline for ranking success rate toward a specific audience type

### V1 — Frontend Mockup / Conceptual `[1-2D]`
- Data Models defined, interaction types defined.
- Preset pipeline options visualized in a grid-style layout: names, big cards, images/icons representing the process
- Expandable in a gallery-style view to see full preset pipeline stage details
- No real backend execution — purely visual/conceptual; demonstrates the idea and UX
- Teaches the user what pipelines are and what's available

### V(#?) — Fully Functioning (with Backend) `[3-5D]`
- Actual pipeline execution against real inputs, backend Service(s)/Graph System for managing, clean/refined and easy to read types and architecture plan for modularity, reusability, extensibility. Functionality is likely to spread multiple apps. Discuss options before implementing
- Backend integration: run a prompt/content through selected pipeline stages sequentially
- Visualize live progress through stages (which stage is running, outputs per stage)
- Connect pipeline output back into ChatInputContext / Spellbook

> 📄 **Related docs found:**
> - [`pipelines-and-review/_index.md`](/Users/mm/Projects/ExpanseFrontend/apps/4up/plans/generation/pipelines-and-review/_index.md) — pipeline methodology overview (4up)
> - [`data-stacking.md`](/Users/mm/Projects/ExpanseFrontend/apps/4up/plans/generation/pipelines-and-review/data-stacking.md) — data stacking / review phase methodology
> - [`examples.md`](/Users/mm/Projects/ExpanseFrontend/apps/4up/plans/generation/pipelines-and-review/examples.md) — worked pipeline examples
> - [`content_type_flows.md`](/Users/mm/Projects/ExpanseFrontend/apps/4up/plans/generation/content_type_flows.md) — per content-type pipeline flows
> - [`hud-demo-concepts.md`](/Users/mm/Projects/Planning/roadmap/2026/plans/hud-demo-concepts.md) — spellbook + action bar pipeline integration concepts

---

## Preset Prompts & Saved Templates

## Intent & Goals
- **Manual Goal Settings**
- **Interpreted / Predicted / Assumed**

## Targets & Objects
- Screens
- Concepts
- Related Components:

## Environments

## Scenes
Probably easy template generation.
- Environments

## Classrooms
Probably easy template generation.

## User Profile
- Attributes, Settings
- Details
- Wren Profile Pull

## Brand / Company Profiles
- Themes
- 4up Dashboard Pull
- Combo with Wren's Character Profile

## Audiences

## Scenes (Library)
- Existing
- Search relevant options based on current prompt

---

## Estimate Roll-Up
| Scope | Estimated | Status |
|---|---|---|
| V1 (Chat w/ Visual UI) | 2-3D, or 1W | Estimated |
| V2+ (Pipelines, Spellbook, Targets, Audiences, Environments, Scenes, Classrooms, Brand Profiles, etc.) | TBD | **Not estimated** — walk through item-by-item |
