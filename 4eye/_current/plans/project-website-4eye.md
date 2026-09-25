# Project: Website (4eye)

> Marketing + presentation site for the 4eye app. Consumes the [Controller](./project-controller.md) system.

## Tasks

[] **Value Statements / Marketing Topics Consistency** Cleanup Value Statements & Feature Offerings & Compare with that being mentioned in the marketing video. De-deupe entries or clarify as needed
    [] Requires review of marketing video see too, and organization probably
[] **Intro Presentation Maybe Seperate Project w/ Epics.** Needs expansion and has many sub pages, where is the documentation for this? It maybe its own project List requirements for presentation cleanup, this is a broad epic, many of these are actually. 
[] **Prioritize/Refresh List and Focus.** Are we doing everything listed?
[] **Video Title** Chapter 1: School Variation
[] Make sure Instant Gratification is added to the video along with long term growth
[] **Demo Buttons & Unlockable Content** Home page next to play button have a Demo button but have a lock icon shown on the Chat Demo, and Full Demo buttons with a coin amount next to it showing the cost to enable playing, and a tooltip that says continue browsing and learning to earn enough coins to try the chat demo and disable it. Goal is to teach about the currency and unlocks/achievement system. Also add a button to the hud rail on slide 1 exit and transition the button to morph into the button on the rail.

### [1D-2D] [HighPriority] App Presentation Video(s)
- **Review from:** Discord / Josh / Friends / Family
- **Content File:** [`marketing-video-see.md`](./marketing-video-see.md)
- **Process:**
  1. Document Requirements & Plan
  2. Discuss & Generate Sample Theme Styles w/ Frames (similar to how I did for the love-based one)
  3. Discuss & Generate Transition Slides
     - Possibly through app because may want to reuse concepts, but need it morphed into video too — TBD
     - Probably separate images & variations similar to the love-based one
  4. Convert into a full-fledged video

[] Update Text, Optionally Highlighting Engagement / shedding light to the dullness of the video. 
[] Need a brighter / more exciting Video. Anxiety Entry is phenominal. Move The See slide back to slide 1 and merge the video slide into it. Fade out the  Entry, actually I think probably keeping see video first with play button that starts the video is a good idea.
[] **Intro Slide Simplicity Expansion:**"
  *tag:learning/concept-clarification", "tag: home-page", "Tag:intro-slide*
  Goal: Update the learn slide to keep super high simplicity but I want to highlight more things than just learning:
    i.e.: Learning (Blue Circle Palette), 
    Amplify Alternative Words: Engagement(Color Circles next to it: Orange, Purple, Blue), Vision, Voice, Human, Life, Work
    Memory, Productivity
    Lets have Component that initially introduces in the Sentence Amplify your Learning. 
    The component then fades in a Blue Circle Palette Icon After the word Learning 
    The Word Learning is animated to look like it doesnt want to leave but gets pushed out and updated by Another word in the list: updated
    Also create slide variants in storybook representing how we could alternative display these amplify options in a word map list or something as a toggle button ( Action Title: "Expand" ). Perhaps other alternative Data visualization types / learning modality transformations.

[] Add Clear representation that 4eye powered up the classroom and gave the abilities and stuff ( so **Transform Your Classroom/Life/Learning/Church/Group** )
[] Vision Component Largest
[] SSL Input
  // todo clarify: 3 level input competition @ spells / battle & organization 3 word token competition battles
[] Gain Action, slide 1 -> Amplify Your __effect__
  Gain(Elevator Icon) action result = Improve your ___area__
[] OS Custom Learning
[] **Map Improvement(3d Representation)**: Domains Concept Becomes 3d layer / z axis, other layers aren't really emphasized but are shown and there is an animation when switching between domains representing layer switching etc ( from the tile or some sort of screen transition animation ) & on maps. Also its represented as the z Axis / 3 stack layer
[] Hotkey toggling/showing by default and auto having 1/2/3/4 as the hotkey 
[] Chat Integration with on page button such as in a tooltip -> Why / What / Where / How etc -> Chat MSGs to user
[] Direction Mapping : Sad/Frustrated Perspective ( Problems Solved, Benefits Gained, __Transform__  ), Happy or Problem / Solution Style
[] Design Element Test: 4eye face over the slide presentation color chips at the top, colored lenses etc
[] Transform Features? Chat / Communication?
[] BiNaural Beats ( Focus )?
[] Problem Solving / Mistake Corrections
  Teacher Guides
  Homework Types + New Homework Types & Formats
[] Side Nav Slide outs for move left and right in the presentation, hud integration, slips out from behind the buttons on the left and right ( or actually design with AI see variants )
[] For the bottom action bar on the hud in the map view specifically, but probably an enablable feature on other pages, swap out the movement action buttons with the chat bar, and have the components slide out and in horizontally moving to the left. \
[] (optional experimentation idea) Skin / Theme Selectors for components? Toggle from side panel then show config component overlay to select updates near component :O

#### Video Production Tasks & Updates (Gallery App)
- [x] **[HIGH PRIORITY] Standardize Teacher HUD Icons**: Ensure exact consistency for the HUD spells across all shots. The icons must be static, unlabeled symbols (Eye, Shield, Present) instead of being different in later segments of the app.
- [x] **New Shot (After S1-C6) - Skill Tree Segment**: Create a dedicated new shot/image directly following S1-C6 focusing entirely on a student's expanded skill tree. When looking at the character, the UI expands to show a connecting web of circular badge nodes (using MUI icons). As the student engages, glowing energy lines connect the nodes and circular progress rings fill up and flash to represent deep progression.

### [1D-2D] UX Cleanup: Presentation & Navigation Improvements
- A user should know how to navigate between pages and it should be easy
- Layout needs improved too — mobile has scroll
- See Page: Review HUD Timeline here; Play Button concern on page
- Map Groupings & Color Updates: Switch to "Core, Details, __?__" and regroup to "__,__,__"
- User Icon for login/signup
- Review Top Header Component & see if there's a better way to use it to improve UX or if it's OK as-is
- **Use Section Simplify & Move** — Use functionality is expanded detail; See page needs to be at higher level. Grow section is a candidate. Targeting classrooms more heavily; individuals/life situations in later phases.

### [2D-3D] [HighPriority] Home Page Presentation Cleanup
The correct content should be displayed. The app should be represented appropriately. The user should understand what the app is, what it can do for them, features/offerings, and be excited about it.

**Prereq:** App Animation

**Subtasks:**
- **Value Statements** — probably need to target specific groups for better reach. Value Statements & See slide should target groups. Also consider for video.
- **Improved feature listings**, especially of the initial version of the app. i.e.: Marketing, Chat, Rooms, Amplified learning, Actions
- **Remove current content from See page** — replace with marketing video & plan new content. Future vision should probably not be a part of it.
- **See Page (Zap Animation)**
  - Action Bar should have buttons to play the animation. Each button plays slightly differently:
    - Eyes (5x bigger lightning bolt, 3x faster)
    - Clarify / Comprehension (3x as quick, standard size)
    - Intrinsic Motivation (Update to Zap 3x the size, 3x as long, 3x as quick)
    - Extrinsic Motivation (Update to Zap 1x the size, standard length)
  - Auto Trigger Animation for the brain zap on page load. Play at 3x. Different more modern lightning bolt on page load, loop 3x.
- **Layout Review & Improvement**
  - Solution: Review for layout
  - Option: Video(s), split large pieces/screens down into simpler or utilize components/tabs etc
  - Goal: Improved user experience
  - Problem: Complex, a lot of info *(??? Actually idk what this is saying, trying to figure it out)*
  - Goal?: Simpler content. Content splitting for improved human memory utilization and screen space utilization.
  - Additional problems to resolve: scroll is not obvious for mobile in the slideshow setup
  - **Component Option — Carousels**
    - Utilize carousels to bring to the front, show one, have toggleable calls that are interactive (also explore similar solutions for mobile screens to prevent scroll)
    - Example usage: When and Where slide
    - Example usage: profile stats example image etc
- **Reward Slide**
  - Remove the Continue Exploring button
  - Action bars to: Claim All, Claim One, Skip / Go To Map / Open Map, Explain
- **New Slide 1 (Video)** — First slide should feature the marketing video. Placeholder: `plans/marketing-video-see/classroom_of_tomorrow_scene_1_images/05_videos/s1a1_s1-a-1-4eye-facing-the-camera-frame-1-of-opener-an_20260524-232425_4ff1122f.mp4`
- **Content Moved to Gamification Page** — "Configure your human, learn, earn, and compete" + sample profile should move off the home page to the Gamification detail page.

### [.5D] Action Bar Improvements & HUD Display Timeline
- **Goals:**
  - Action bars and displayed components are correct for each page
  - HUD displays at the appropriate time
- **Status:** Planning
- **Task:** Make a plan for HUD display timeline and which action buttons should be on which page, how they work, etc.

### [1D-2D] HUD Cleanup & Polish
- A user should know how to navigate between pages and it should be easy
- **Mobile Left & Right Rail Repositioning** — HUD left/right action buttons take too much space on mobile and disrupt content. Move to under the top HUD. Pill-shaped, light color, spread equally side-to-side.

### [1D-2D] Minimap / Navigation System Cleanup & Polish ( IN PROGRESS )
- The minimap should be easy to use and understand
- Navigation should make sense
- Eyes guided to the right place; info found easily; users know how to use it

#### Map Page: Recommended Tile Update & Visit Indicator ( IN PROGRESS )
On each tile I want some sort of icon indicator system for showing whether a user has visited the page and explred it and what percentage of exploration they have. But something simple with a tooltip hover. And The tile should blink and have some sort of 4 corner brackets that link recommending go to that one


#### Map Page: Contrast & Color ( IN PROGRESS )
- Remove blue background; keep white with diamond borders. Explore light blue background variant.
- Make a plan to improve contrast & focus color; discuss options and show variants.

#### Map Page: FullScreenMapView Tasks ( IN PROGRESS )
- **Play Button (Sign Up CTA)** — Add a Play button linking to the app demo/dashboard for now.
- **Tile Color Updates** — Gamification = purple; Why = Blue; Content = not a tile yet.
- **Arrow Display Improvements** — Arrows should not overlap tiles' text/symbols. Explore multi-color or dual-chevron concept, positioned halfway between tiles, animated. One color when over adjacent tile, white when over current.
- **Remove WASD/Navigational Component** — Remove the non-orb-style WASD nav component. Ensure arrow keys still switch screens and update the minimap until the page loads. 
- **Page Loader** Include a page loading animation for the app as a whole. Plan architecture for this
- **Orb Action Bar: Update Actions** — Add directional arrows to orb action bar wired to spatial navigation. Flat single-row layout. Label = current page title (read from Next Best Actions section).

### [2-3D] Value Offerings & Features Content
- Value Statements probably need to target specific groups for better reach
- Value Statements & See slide should target groups

### [3D-1W] Detail Pages
#### Learn & Content
#### Why Us / Who
#### [2-3D] Gamification

**Status:** No dedicated page. Currently only a small `GamificationEngagement` section on the homepage (expanding circles animation + title + 1 paragraph). Game system is substantially built but none of it is publicly routed.

**Approach:** v1 = marketing/text page; v2 = add interactive demos

**References:**
- Current homepage section: `ExpanseFrontend/apps/4eye/src/modules/content/home/GamificationEngagement.tsx`
- Pitch deck source of truth (slides 55–76): `ExpanseFrontend/apps/command-center/src/data/presentation/slides.ts`
- Built but unrouted game views: `ExpanseFrontend/apps/4eye/src/modules/game/views/`
- Game engine types + level config: `ExpanseFrontend/packages/ui/game/`
- Learning modes gamification table: `4eye/docs/planning/plans/app-features/learning-modes.md` (line 443)
- Quizzes gamification table: `4eye/docs/planning/plans/app-features/quizzes-exercises.md` (line 498)

**Aspects to Evaluate** *(decide which make it to v1 marketing page — review and mark priority)*:

| Aspect | Pitch Deck Ref | Demo Component? | Include in v1? |
|---|---|---|---|
| Reward Sources (Teacher / School / Parent / Expanse / Sponsors) | Slide 59 | Partial | — |
| Loot Boxes + Rarity Tiers (Common → Legendary) | Slide 60 | Yes (`ChestOpening1Animation`, `GameDemoView`) | — |
| Classroom Store | Slides 61, 64 | Yes (`StudentStoreView`, `TeacherRewardManagement`) | — |
| Classroom Milestone / Progress Bar | Slides 63, 71 | Yes (`ExperienceProgressBar`) | — |
| Teacher → Student Recognition | Slide 62 | Partial | — |
| School-Wide Rewards | Slide 65 | No | — |
| Parent & Family Rewards | Slide 66 | No | — |
| Quests & Missions (Daily / Weekly / Challenge / Seasonal) | Slides 67–68 | No | — |
| Achievements & Badges (tiered, streak-based) | Slide 69 | No | — |
| XP / Leveling System (40 levels, subject + class levels) | Slide 72, `levels.config.ts` | Yes (`ExperienceProgressBar`, `ProgressContext`) | — |
| Leaderboards (PvP, Class vs Class, School vs School) | Slide 76 | No (1game not built) | — |
| Digital Art & Collectibles (AI-generated, tradeable, NFT option) | Slide 74 | Partial (`ChestOpening1Animation`) | — |
| Competition Philosophy (healthy / team-based design) | Slide 75 | No | — |
| Battle Types (PvP, PvE, Dungeons, Tournaments) | Slide 76 | No | — |
| Micro-Scholarships & Lottery Essence | Slide 77 | No | — |
| Teacher & Staff Rewards | Slide 78 | No | — |
| Learning Mode XP (quiz streaks, combos, speed rounds) | `learning-modes.md`, `quizzes-exercises.md` | No | — |

**Open Decisions:**
- [ ] Which aspects are highest value for v1? (fill in "Include in v1?" column above)
- [ ] Is `GameDemoView` accessible at a public route (e.g. `/demo`) or post-login only?
- [ ] Leaderboard demo — live or static mockup? (1game engine not built yet)
- [ ] How much of the wallet/currency system gets explained upfront vs. revealed through the experience?



### [3D-4D] Payment & Users

### [1D] HUD Chat Mode
- Able to interact with the chat in the HUD; good UX for a screen

### [.5D] Spatial Map Layout
- Sample for other app views
- Ability to navigate
- Disableable

### [1D] Mobile Layout, Responsive, Working as Expected / Tested

### [1D] Site Map, Page Titles, Sharing, robots, etc Cleanup
@AI List some more common check points to clean up before a launch



---

## Estimate Roll-Up
- **Sum of tagged work:** ~20–32 focused days
- **Calendar (at ~4 focused days/wk):** ~5–8 weeks
