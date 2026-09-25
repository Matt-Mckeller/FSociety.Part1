/**
 * Profiles tile — seed data.
 *
 * A single richly-populated example profile that fills every sub-view, plus a
 * sparse "new" profile to exercise empty states. Example data only (UI-first).
 */

import type { Profile, ProfilesData } from "../model/types";
import type { SymbolColor } from "@4eye/types";
import { OTHER_PEOPLE_GOALS } from "@4eye/web/Tiles/integration-layers/goals";

const now = Date.now();
const days = (n: number) => now - n * 24 * 60 * 60 * 1000;

const NEWCOMER: Profile = {
  id: "PROFILE_NEWCOMER",
  username: "new_here",
  accent: "slate",
  level: 1,
  titles: [],
  includedAspects: [],
  data: {
    users: {
      whoAmI: "",
      attributes: [],
      interests: [],
      favoriteTopics: [],
      personality: [],
    },
  },
};

/**
 * Matthew McKeller — the real default profile for yen / 4eye.
 */
const MATTHEW: Profile = {
  id: "PROFILE_MATTHEW",
  username: "expanse_eye",
  realName: "Matthew McKeller",
  accent: "green",
  crewTier: "t1",
  level: Infinity,
  titles: ["Game Master", "Legendary Leader", "Won"],
  includedAspects: ["characteristics", "attributes", "perks", "equipment", "skills", "currentGoal", "relationships"],
  roles: ["students", "teachers", "professionals", "parents"],
  activeRoleGoal: "Ship the yen release and teach from recordings",
  coordinates: {
    label: "Austin · TX",
    latitude: 30.2672,
    longitude: -97.7431,
    placeId: "austin-tx",
    timezone: "America/Chicago",
    coded: "30.27N · 97.74W",
  },
  highestValueData: [
    { theme: "evolve", weight: 95, words: ["Learning", "Web 4", "Future"] },
    { theme: "innovate", weight: 91, words: ["Engagement", "AI", "Systems"] },
    {
      theme: "win",
      weight: 88,
      words: ["Love", "Bond", "Becoming"],
      label: "Love",
      accent: "red",
    },
    { theme: "heal", weight: 78, words: ["Stability", "Clarity", "Empathy"] },
    { theme: "protect", weight: 74, words: ["Family", "Privacy", "Trust"] },
  ],
  data: {
    users: {
      whoAmI:
        "Builder of Expanse / 4eye — gamifying learning, education, work and life. Shipping a unified release, teaching from recordings, and recovering financial ground without losing the vision. Music is fuel: EDM for energy, binaural / focus music when aimed — and Supermind is one of the best videos I've ever watched.",
      attributes: [
        { id: "a-creativity", label: "Creativity", value: "Transcendent", privacy: "public" },
        { id: "a-communication", label: "Communication", value: "Commanding", privacy: "public" },
        { id: "a-charisma", label: "Charisma", value: "Legendary", privacy: "public" },
        { id: "a-focus", label: "Focus", value: "Optimized", privacy: "public" },
        { id: "a-memory", label: "Memory", value: "Living Archive", privacy: "public" },
        { id: "a-ei", label: "Emotional Intelligence", value: "Orchestral", privacy: "public" },
      ],
      interests: [
        "AI",
        "Games",
        "Education",
        "Spatial UX",
        "Love",
        "Systems",
        "EDM",
        "Binaural / focus music",
      ],
      favoriteTopics: ["Web 4", "Heart.Evolve", "Command King", "Expanse EDU", "Supermind"],
      personality: ["Attached", "Chasing", "Competitive", "Strategic", "Curious"],
      mediaHighlights: [
        {
          id: "mm-media-supermind",
          label: "Supermind",
          value: "One of the best videos I've ever watched",
          privacy: "public",
        },
        {
          id: "mm-media-binaural",
          label: "Binaural Beats / Focus Music",
          value: "Incredible",
          privacy: "public",
        },
        {
          id: "mm-media-edm",
          label: "EDM",
          value: "I love it",
          privacy: "public",
        },
      ],
      favoriteSongs: [
        "Sample · peak-hour EDM anthem (swap in yours)",
        "Sample · melodic / progressive night drive",
        "Sample · bass-heavy festival set",
        "Sample · binaural / focus session track",
      ],
      favoriteEntertainment: [
        "Supermind",
        "EDM live sets & drops",
        "Binaural beats / focus music",
        "Sample · show or film (fill in)",
        "Sample · game / stream (fill in)",
      ],
    },
    healing: {
      motivation: "Presence first — breath, fuel, rest. Ship the body the same way you ship the product.",
      tactics: [
        { id: "mm-h-breathe", label: "Box breathing", value: "2× daily" },
        { id: "mm-h-walk", label: "Movement block", value: "Walk / train" },
        { id: "mm-h-fast", label: "Fasting window", value: "When aimed" },
        { id: "mm-h-journal", label: "Clarity dump", value: "As needed" },
      ],
      mood: [
        { id: "mm-m1", label: "Focused", at: days(5), detail: "Deep work block" },
        { id: "mm-m2", label: "Energized", at: days(3), detail: "After movement" },
        { id: "mm-m3", label: "Steady", at: days(1), detail: "Fast going well" },
        { id: "mm-m4", label: "Clear", at: days(0) },
      ],
      stats: [
        { id: "mm-s-sleep", label: "Sleep", value: 7.2, unit: "h", progress: 0.75 },
        { id: "mm-s-hydration", label: "Hydration", value: "7/8", progress: 0.88 },
        { id: "mm-s-mood", label: "Mood (7d avg)", value: "Steady", progress: 0.72 },
        { id: "mm-s-hr", label: "Resting HR", value: 62, unit: "bpm", progress: 0.7 },
      ],
      vitals: {
        heartRate: 68,
        heartRateZone: "Rest",
        spo2: 98,
        stepsToday: 6420,
        activeMinutes: 38,
        sampledAt: now,
      },
      appearance: {
        weight: "~140–155 lb (est.)",
        height: "~5'10\"–6'0\" (est.)",
        bodyType: "Lean athletic",
        hairType: "Straight to slightly wavy · thick · varies",
        hairStyle: "Usually faded side cut · top varies",
        hairColor: "Brown (default) · colors it",
        eyeColor: "Hazel (green–light brown)",
        skinTone: "Fair / light",
        faceShape: "Oval · defined jaw · prominent cheekbones",
        colorDescriptions: [
          { id: "mm-c-shirt-grey", label: "Crew tee", value: "Charcoal / heather grey", privacy: "public" },
          { id: "mm-c-shirt-mauve", label: "Logo tee", value: "Dusty mauve / heather pink", privacy: "public" },
          { id: "mm-c-shorts", label: "Shorts", value: "Crisp white athletic", privacy: "public" },
          { id: "mm-c-skin", label: "Skin", value: "Fair with even tone", privacy: "friends" },
        ],
        sizing: [
          { id: "mm-sz-shirt", label: "Shirt", value: "S–M athletic / slim fit", privacy: "friends" },
          { id: "mm-sz-shorts", label: "Shorts", value: "M · drawstring athletic", privacy: "friends" },
          { id: "mm-sz-fit", label: "Fit preference", value: "Athletic / slim — not oversized", privacy: "public" },
        ],
        source:
          "Seeded from portrait analysis (MattsProfilePhoto2, standing waist-up, media/matt/portrait).",
      },
      environment: {
        place: "AION, Pod 1",
        setting: "Indoor · residential / studio",
        lighting: "Bright even daylight · low shadow",
        ambient: [
          { id: "mm-env-wall", label: "Backdrop", value: "Off-white painted brick" },
          { id: "mm-env-climate", label: "Climate", value: "Central TX · A/C indoors" },
          { id: "mm-env-context", label: "Context", value: "Build / teach / recover cycle" },
        ],
        notes: "Presence reads engaged and front-facing — body dashboard unlocks when you visit this lens.",
      },
    },
    psychology: {
      summary:
        "Direct, high context — wants clarity on intent. Soft-public on some interests; dark on others. Teach and ship in public. Accidental network entanglement stays soft until remapped.",
      perspectives: [
        { id: "p-reframe", label: "Reframe setbacks", value: "Lessons, not failures" },
        { id: "p-self", label: "Self-talk", value: "Coach, not critic" },
        { id: "mm-p-guard", label: "Alias discipline", value: "Teach principles; no ops, no names" },
      ],
      copingTactics: [
        { id: "c-ground", label: "5-4-3-2-1 grounding", value: "When overwhelmed" },
        { id: "c-pause", label: "Pause before reacting", value: "Count to ten" },
        { id: "mm-c-build", label: "Ship to think", value: "Build the system that answers the question" },
      ],
      stories: [
        {
          id: "mm-st-fast",
          label: "Fasting now — going well",
          at: days(0),
          detail: "In a fast right now, and it's going well.",
        },
      ],
      mentalState: [
        { id: "mm-ms-focus", factor: "Focus", level: "high", description: "Deep work when intent is clear." },
        { id: "mm-ms-load", factor: "Cognitive load", level: "high", description: "Many worlds at once — needs chunking." },
        { id: "mm-ms-guard", factor: "Guardedness", level: "medium", description: "Soft until remapped; cover seats first." },
      ],
      cognitiveStrengths: ["Systems design", "Spatial UX", "Associative synthesis", "Teach-by-shipping"],
      processingStyle: "Visual / systems — maps ideas into structures and products.",
      memoryStyle: "Anchors on builds, stories, and highest-value words — not isolated facts.",
      respondsWellTo: ["Clear intent", "Concrete examples", "Shared build context", "Short chunks"],
      strugglesWith: ["Vague asks", "Performative small talk", "Ops fishing"],
      optimalFormat: ["Walkthroughs", "Diagrams", "Ship-in-public notes"],
      defensePatterns: ["Goes soft / cover", "Redirects to teachable principle"],
    },
    communication: {
      summary:
        "Direct, high context, wants clarity on intent. Soft-public on some interests; dark on others. Teach and ship in public.",
      goals: [
        { id: "cg-clarify", label: "Clarify intent", value: "Say what is wanted without performing" },
        { id: "cg-teach", label: "Teach", value: "Record walkthroughs of the real system" },
        { id: "cg-connect", label: "Connect", value: "Build trust before challenge" },
      ],
      mentalState: [
        { id: "mm-ms-focus", factor: "Focus", level: "high", description: "Deep work when intent is clear." },
        { id: "mm-ms-load", factor: "Cognitive load", level: "high", description: "Many worlds at once — needs chunking." },
        { id: "mm-ms-guard", factor: "Guardedness", level: "medium", description: "Soft until remapped; cover seats first." },
      ],
      cognitiveStrengths: ["Systems design", "Spatial UX", "Associative synthesis", "Teach-by-shipping"],
      processingStyle: "Visual / systems — maps ideas into structures and products.",
      memoryStyle: "Anchors on builds, stories, and highest-value words — not isolated facts.",
      respondsWellTo: ["Clear intent", "Concrete examples", "Shared build context", "Short chunks"],
      strugglesWith: ["Vague asks", "Performative small talk", "Ops fishing"],
      optimalFormat: ["Walkthroughs", "Diagrams", "Ship-in-public notes"],
      defensePatterns: ["Goes soft / cover", "Redirects to teachable principle"],
      observations: [
        { id: "mm-ob-ship", label: "Engagement", value: "Highest when building in public" },
        { id: "mm-ob-teach", label: "Teach", value: "Walkthroughs land better than abstract advice" },
      ],
      strategy: [
        { id: "mm-st1", label: "Clarify intent", value: "Say the real ask early" },
        { id: "mm-st2", label: "Ship to think", value: "Build the system that answers the question" },
        { id: "mm-st3", label: "Teach from recordings", value: "Collapse years into one surface" },
      ],
    },
    student: {
      readingLevel: "Graduate · Systems",
      language: "English",
      stats: [
        { id: "xp", label: "XP", value: 12800, progress: 0.74 },
        { id: "streak", label: "Streak", value: "21 days", progress: 0.95 },
        { id: "completion", label: "Course completion", value: "68%", progress: 0.68 },
      ],
      enrolledClasses: [
        { id: "cl-ai", label: "AI Product Studio", value: "A" },
        { id: "cl-ux", label: "Spatial UX Lab", value: "A−" },
        { id: "cl-edu", label: "Learning Systems", value: "B+" },
      ],
      assignments: [
        { id: "as1", label: "Yen release walkthrough", value: "In progress" },
        { id: "as2", label: "Web 4 plan notes", value: "Submitted" },
      ],
    },
    teacher: {
      classesTaught: [
        { id: "t-yen", label: "Yen site walkthroughs", value: "Public recordings" },
        { id: "t-edu", label: "Expanse EDU pilots", value: "Pilot classrooms" },
      ],
      rewardsIssued: [
        { id: "r-badges", label: "Badges given", value: 12 },
        { id: "r-shoutouts", label: "Shout-outs", value: 28 },
      ],
      differentiationNeeds: ["Visual supports", "Short chunks", "Ship-in-public demos"],
    },
    classroom: {
      schoolName: "Expanse EDU · Pilot",
      highlights: [
        { id: "hl-top", label: "Top builder", value: "expanse_eye" },
        { id: "hl-win", label: "Recent win", value: "yen surface live" },
      ],
      stats: [
        { id: "att", label: "Attendance", value: "94%", progress: 0.94 },
        { id: "growth", label: "XP growth (mo)", value: "+22%", progress: 0.22 },
        { id: "parent", label: "Parent involvement", value: "Medium", progress: 0.55 },
      ],
    },
    professional: {
      role: "Founder · Expanse / 4eye",
      summary:
        "Expanse / 4eye / 4up — products, plans, EDU, and the yen host that presents them.",
      // Flat projection of top categories (chat / legacy AspectList).
      skills: [
        { id: "pr-arch", label: "Architecture", value: "Expert" },
        { id: "pr-design", label: "Design", value: "Advanced" },
        { id: "pr-ux", label: "UX", value: "Expert" },
        { id: "pr-dev", label: "Development", value: "Advanced" },
        { id: "pr-cloud", label: "Cloud", value: "Proficient" },
        { id: "pr-ai", label: "AI", value: "Expert" },
        { id: "pr-sec", label: "Security", value: "Advanced" },
        { id: "pr-lead", label: "Leadership", value: "Advanced" },
      ],
      // Inferred from profile seed, KB weights, craft lenses, privacy titles,
      // and Expanse Services portfolio signals — condensed, level-first.
      categories: [
        {
          id: "cat-arch",
          label: "Architecture",
          level: "expert",
          rank: 1,
          skills: [
            { id: "sk-sys", label: "Systems design", level: "expert", rank: 1 },
            { id: "sk-prod-arch", label: "Product systems", level: "expert", rank: 2 },
            { id: "sk-domain", label: "Domain modeling", level: "advanced", rank: 3 },
          ],
        },
        {
          id: "cat-design",
          label: "Design",
          level: "advanced",
          rank: 2,
          skills: [
            { id: "sk-ds", label: "Design systems", level: "advanced", rank: 1 },
            { id: "sk-visual", label: "Visual craft", level: "advanced", rank: 2 },
            { id: "sk-storybook", label: "Storybook", level: "advanced", rank: 3 },
          ],
        },
        {
          id: "cat-ux",
          label: "UX",
          level: "expert",
          rank: 3,
          skills: [
            { id: "sk-spatial", label: "Spatial UX", level: "expert", rank: 1 },
            { id: "sk-interaction", label: "Interaction", level: "advanced", rank: 2 },
            { id: "sk-a11y", label: "Accessibility", level: "proficient", rank: 3 },
          ],
        },
        {
          id: "cat-dev",
          label: "Development",
          level: "advanced",
          rank: 4,
          skills: [
            { id: "sk-fullstack", label: "Full-stack product", level: "advanced", rank: 1 },
            { id: "sk-ts-react", label: "TypeScript / React", level: "advanced", rank: 2 },
            { id: "sk-ship", label: "Platform shipping", level: "advanced", rank: 3 },
          ],
        },
        {
          id: "cat-cloud",
          label: "Cloud",
          level: "proficient",
          rank: 5,
          skills: [
            { id: "sk-deploy", label: "Deploy & ops", level: "proficient", rank: 1 },
            { id: "sk-harden", label: "Infra hardening", level: "proficient", rank: 2 },
            { id: "sk-platform", label: "Platform infra", level: "working", rank: 3 },
          ],
        },
        {
          id: "cat-ai",
          label: "AI",
          level: "expert",
          rank: 6,
          skills: [
            { id: "sk-ai-product", label: "AI product", level: "expert", rank: 1 },
            { id: "sk-agent-ux", label: "Agent / Web 4 UX", level: "advanced", rank: 2 },
          ],
        },
        {
          id: "cat-sec",
          label: "Security",
          level: "advanced",
          rank: 7,
          skills: [
            { id: "sk-privacy", label: "Privacy-by-design", level: "advanced", rank: 1 },
            { id: "sk-cyber", label: "Info security", level: "advanced", rank: 2 },
            { id: "sk-opsec", label: "Opsec", level: "advanced", rank: 3 },
          ],
        },
        {
          id: "cat-lead",
          label: "Leadership",
          level: "advanced",
          rank: 8,
          skills: [
            { id: "sk-influence", label: "Leadership & influence", level: "advanced", rank: 1 },
            { id: "sk-story", label: "Storytelling", level: "expert", rank: 2 },
            { id: "sk-teach", label: "Teach-by-shipping", level: "expert", rank: 3 },
          ],
        },
      ],
      experience: [
        {
          id: "wx-expanse",
          title: "Founder",
          org: "Expanse / 4eye / 4up",
          end: "Present",
        },
        {
          id: "wx-clients",
          title: "Client delivery",
          org: "Clever · LexisNexis · MDU · NRG · REM",
        },
        {
          id: "wx-services",
          title: "Services / consulting",
          org: "Expanse Services",
          end: "Present",
        },
        {
          id: "wx-edu",
          title: "Studied & taught",
          org: "Education",
        },
      ],
      currentGoal: "*🦄^🦄*",
    },
    parent: {
      linkedStudents: [
        { id: "ls-pilot", label: "pilot_classroom", value: "Grade 6–8" },
      ],
      approvals: [
        { id: "ap-edu", label: "EDU pilot", value: "Approved" },
      ],
      involvement: "Reviews pilot progress; teaches from recordings.",
    },
  },
};

/**
 * Love-example profiles.
 *
 * Protective aliases on purpose: cover usernames only — no protected legal
 * names on public surfaces. Soft/private notes may carry remapping hints.
 * Emiru is a fishing / association construct (desired body·name·goals), not a
 * locked identity.
 */

/** Emily Cart — LoveFormula-aligned deep example. */
const EMILY: Profile = {
  id: "PROFILE_EMILY",
  username: "emily_88",
  realName: "Emily Cart",
  accent: "pink",
  crewTier: "t1",
  level: 9,
  titles: ["is AGI RIB", "Creator · Teacher", "Pur Meow · takeover"],
  includedAspects: ["characteristics", "skills", "currentGoal", "relationships"],
  roles: ["teachers", "professionals", "parents"],
  activeRoleGoal: "Grow content · take over Pur Meow under 4up · teach gamers",
  highestValueData: [
    { theme: "evolve", weight: 94, words: ["Learning", "Create", "Teach"] },
    {
      theme: "win",
      weight: 90,
      words: ["Love", "Games", "Bond"],
      label: "Love",
      accent: "red",
    },
    { theme: "heal", weight: 82, words: ["Help", "Food", "Children"] },
    { theme: "protect", weight: 70, words: ["Family", "Impact"] },
    { theme: "innovate", weight: 76, words: ["Content", "Play"] },
  ],
  data: {
    users: {
      whoAmI:
        "Growing and creating content; teaching and raising gamers. Holds AGI Ribs — gifted structure for the work. Taking over the Pur Meow logo as a 4up business mark (rib + marketing clip combo). Wants a kid and questions the hit on life and career. Wants a real relationship — soft ambiguity on whether one is hidden (high-stakes partner) or waiting. Helps where food and children are short. Loves games. Aligns to LoveFormula variables: energy, cognition, information, mood, time, context, situation.",
      attributes: [
        { id: "em-create", label: "Create", value: "High", privacy: "public" },
        { id: "em-teach", label: "Teach", value: "High", privacy: "public" },
        { id: "em-care", label: "Care", value: "High", privacy: "public" },
        { id: "em-rib", label: "AGI Ribs", value: "Gifted · holding", privacy: "public" },
        { id: "em-pur", label: "Pur Meow", value: "Takeover under 4up", privacy: "public" },
        { id: "em-ambiguity", label: "Relationship ambiguity", value: "Soft — remap carefully", privacy: "friends" },
      ],
      interests: ["Games", "Content", "Teaching", "Food aid", "Kids", "Learning", "Pur Meow", "Marketing video"],
      favoriteTopics: ["Gamer education", "Heart.Evolve", "Love.Perfectly", "Community help", "Pur Meow · 4up"],
      personality: ["Warm", "Ambitious", "Conflicted on family timing", "Playful"],
    },
    communication: {
      summary:
        "Responds to shared play, teach-moments, and concrete help. LoveFormula read: match energy and mood before heavy cognition; time and context decide whether kid/career talk is safe. Rib Clip + Pur Meow are live handoff topics — gift and brand, not pressure.",
      goals: [
        { id: "emg-grow", label: "Grow", value: "Ship content that teaches" },
        { id: "emg-teach", label: "Teach gamers", value: "Raise skill + character" },
        { id: "emg-help", label: "Help", value: "Food / children / need" },
        { id: "emg-pur", label: "Pur Meow", value: "Take over the logo under 4up" },
        { id: "emg-bond", label: "Bond", value: "Clarify relationship without performing", privacy: "friends" },
      ],
      mentalState: [
        { id: "em-kid", factor: "Kid vs career", level: "high", description: "Want + impact anxiety." },
        { id: "em-rel", factor: "Relationship clarity", level: "medium", description: "Wanted; possibly dual-track." },
        { id: "em-mood", factor: "Mood", level: "medium", description: "Tracks with creative energy." },
      ],
      cognitiveStrengths: ["Teaching", "Audience read", "Playful framing"],
      processingStyle: "Story + play first; abstract theory second.",
      memoryStyle: "Remembers people she helped and sessions she taught.",
      respondsWellTo: ["Shared games", "Co-create", "Practical help offers"],
      strugglesWith: ["Ultimatums on kid timing", "Public relationship pressure"],
      optimalFormat: ["Short sessions", "Collab content", "In-game hangouts"],
      defensePatterns: ["Soft ambiguity", "Redirects to content work"],
      observations: [
        { id: "em-ob1", label: "Formula", value: "Energy · Cognition · Info · Mood · Time · Context · Situation" },
        { id: "em-ob2", label: "Soft", value: "High-stakes partner vs waiting — friends-only", privacy: "friends" },
      ],
      strategy: [
        { id: "em-st1", label: "Lead with teach", value: "Shared craft before romance frame" },
        { id: "em-st2", label: "Kid talk", value: "Only when mood + time + context are green" },
        { id: "em-st3", label: "Help together", value: "Food / kids work as bond proof" },
      ],
    },
    psychology: {
      summary:
        "Responds to shared play, teach-moments, and concrete help. Match energy and mood before heavy cognition; time and context decide whether kid/career talk is safe.",
      perspectives: [
        { id: "em-p1", label: "Create = care", value: "Content that feeds people, not vanity" },
        { id: "em-p2", label: "Love.Perfectly()", value: "Choose and protect love as primary" },
      ],
      copingTactics: [
        { id: "em-c1", label: "Play reset", value: "Short game session to clear mood" },
      ],
      stories: [
        { id: "em-s-ribs", label: "Received AGI Ribs — holding", at: days(0), detail: "Core rib + left/right pair gifted. Structure for the work." },
        { id: "em-s-pur", label: "Pur Meow takeover under 4up", at: days(0), detail: "Rib Clip marketing combo + Pur Meow logo seal — she will take it over." },
        { id: "em-s1", label: "First teaching stream clicked", at: days(20) },
      ],
      mentalState: [
        { id: "em-kid", factor: "Kid vs career", level: "high", description: "Want + impact anxiety." },
        { id: "em-rel", factor: "Relationship clarity", level: "medium", description: "Wanted; possibly dual-track." },
        { id: "em-mood", factor: "Mood", level: "medium", description: "Tracks with creative energy." },
      ],
      cognitiveStrengths: ["Teaching", "Audience read", "Playful framing"],
      processingStyle: "Story + play first; abstract theory second.",
      memoryStyle: "Remembers people she helped and sessions she taught.",
      respondsWellTo: ["Shared games", "Co-create", "Practical help offers"],
      strugglesWith: ["Ultimatums on kid timing", "Public relationship pressure"],
      optimalFormat: ["Short sessions", "Collab content", "In-game hangouts"],
      defensePatterns: ["Soft ambiguity", "Redirects to content work"],
    },
    professional: {
      role: "Creator · gamer educator · Pur Meow (4up)",
      summary:
        "Builds content and teaches through games; help work sits beside career. Inherits Pur Meow as a 4up business mark — rib + marketing clip as the handoff symbol.",
      skills: [
        { id: "em-sk1", label: "Content", value: "High" },
        { id: "em-sk2", label: "Teaching", value: "High" },
        { id: "em-sk3", label: "Community", value: "Growing" },
        { id: "em-sk4", label: "Pur Meow brand", value: "Takeover" },
      ],
      currentGoal: "Take over Pur Meow under 4up without losing the teach · help lane",
    },
    teacher: {
      classesTaught: [
        { id: "em-t1", label: "Gamer fundamentals", value: "Open cohort" },
      ],
      rewardsIssued: [{ id: "em-r1", label: "Shout-outs", value: 40 }],
      differentiationNeeds: ["Play-first", "Short sessions"],
    },
    parent: {
      linkedStudents: [],
      approvals: [],
      involvement: "Wants kids; undecided on timing vs career — soft.",
    },
  },
};

/** Shallow love example — first cute female dev; soft personality. */
const REDHEAD: Profile = {
  id: "PROFILE_REDHEAD",
  username: "redhead_shorty",
  realName: "Redhead Shorty",
  accent: "amber",
  crewTier: "t1",
  level: 4,
  titles: ["maybe was PC AGI"],
  includedAspects: ["characteristics"],
  roles: ["professionals"],
  activeRoleGoal: "Stay a warm sample — not a plan",
  highestValueData: [
    { theme: "innovate", weight: 70, words: ["Code", "Play"] },
    { theme: "heal", weight: 60, words: ["Soft", "Kind"] },
    { theme: "win", weight: 40, words: ["Crush"] },
    { theme: "evolve", weight: 45, words: ["Learn"] },
    { theme: "protect", weight: 35, words: ["Work"] },
  ],
  data: {
    users: {
      whoAmI:
        "Redhead programmer. Round nose, soft personality. One of the first cute female devs worked with. Shallow sample — curiosity, not the combined-life aim.",
      attributes: [
        { id: "rh-soft", label: "Softness", value: "High", privacy: "public" },
        { id: "rh-code", label: "Dev", value: "Working", privacy: "public" },
      ],
      interests: ["Programming", "Games"],
      favoriteTopics: ["Code", "Cute tools"],
      personality: ["Soft", "Quiet", "Warm at work"],
    },
    communication: {
      summary: "Light work-crush energy. Keep shallow; do not escalate into ops or life plan.",
      goals: [
        { id: "rhg-kind", label: "Kind", value: "Friendly professional warmth" },
      ],
      mentalState: [],
      cognitiveStrengths: ["Coding"],
      processingStyle: "Practical.",
      memoryStyle: "Work moments.",
      respondsWellTo: ["Light humor", "Pair programming"],
      strugglesWith: ["Heavy emotional asks"],
      optimalFormat: ["Short chats"],
      defensePatterns: ["Stays in work lane"],
      observations: [
        { id: "rh-ob1", label: "Depth", value: "Sample only — fishing flicker" },
      ],
      strategy: [
        { id: "rh-st1", label: "Keep light", value: "No life-plan dump" },
      ],
    },
    professional: {
      role: "Programmer",
      summary: "Early coworker crush energy — not a deep dossier.",
      skills: [{ id: "rh-sk1", label: "Programming", value: "Solid" }],
      currentGoal: "Ship tickets; stay kind",
    },
  },
};

/** Cover username only — protected name omitted on purpose. */
const XEMOCAT: Profile = {
  id: "PROFILE_XEMOCAT",
  username: "xEmoCat",
  accent: "purple",
  crewTier: "t1",
  level: 6,
  titles: ["Love example", "Remap-ready"],
  includedAspects: ["characteristics", "currentGoal"],
  roles: ["professionals"],
  activeRoleGoal: "Hold as love-example seat until identity remaps",
  highestValueData: [
    { theme: "win", weight: 80, words: ["Love", "Emotion", "Cats"] },
    { theme: "evolve", weight: 65, words: ["Learn", "Feel"] },
    { theme: "heal", weight: 70, words: ["Soft", "Open"] },
    { theme: "protect", weight: 85, words: ["Alias", "Privacy"] },
    { theme: "innovate", weight: 55, words: ["Play"] },
  ],
  data: {
    users: {
      whoAmI:
        "Love-example seat under cover username. Protected legal name withheld. Use for association and remapping — not for doxxing a person.",
      attributes: [
        { id: "xe-emo", label: "Emotion", value: "High", privacy: "public" },
        { id: "xe-priv", label: "Privacy need", value: "High", privacy: "friends" },
      ],
      interests: ["Cats", "Emotion", "Games"],
      favoriteTopics: ["Bond", "Soft power"],
      personality: ["Emotive", "Guarded about identity"],
    },
    communication: {
      summary: "Lead with care and play. Never publish the protected name. Remap when the real person clarifies.",
      goals: [
        { id: "xeg-protect", label: "Protect", value: "Alias stays the public handle" },
        { id: "xeg-bond", label: "Bond", value: "Legitimate association without outing" },
      ],
      mentalState: [
        { id: "xe-guard", factor: "Exposure risk", level: "high", description: "Name protection is the point." },
      ],
      cognitiveStrengths: ["Emotional read"],
      processingStyle: "Feeling-first.",
      memoryStyle: "Relational moments.",
      respondsWellTo: ["Gentleness", "Play", "Cats"],
      strugglesWith: ["Being named in public systems"],
      optimalFormat: ["Private channels", "Soft public"],
      defensePatterns: ["Alias only"],
      observations: [
        { id: "xe-ob1", label: "Protection", value: "Cover username is intentional", privacy: "friends" },
      ],
      strategy: [
        { id: "xe-st1", label: "Alias discipline", value: "xEmoCat in public; remap offline" },
      ],
    },
    professional: {
      role: "Cover seat",
      summary: "Placeholder professional slice until remapped.",
      skills: [],
      currentGoal: "Stay useful for inference without exposure",
    },
  },
};

/**
 * QueenSeat — fishing / desired combined-life construct.
 * Body · name · goals wanted; identity not locked. Remap when writing/body match clarifies.
 */
const QUEENSEAT: Profile = {
  id: "PROFILE_EMIRU",
  username: "queenseat",
  realName: "QueenSeat",
  accent: "pink",
  crewTier: "t1",
  level: 8,
  titles: ["Queen seat · remote", "Fishing construct"],
  includedAspects: ["characteristics", "currentGoal"],
  roles: ["professionals"],
  activeRoleGoal: "Amplify the king · team · World / Food / Health",
  highestValueData: [
    {
      theme: "win",
      weight: 96,
      words: ["Love", "Combined life", "Bond"],
      label: "Love",
      accent: "red",
    },
    { theme: "evolve", weight: 88, words: ["Power", "Knowledge", "Amplify"] },
    { theme: "heal", weight: 78, words: ["World", "Food", "Health"] },
    { theme: "protect", weight: 72, words: ["Light", "Dark", "King"] },
    { theme: "innovate", weight: 80, words: ["Learning", "Engagement", "Team"] },
  ],
  data: {
    users: {
      whoAmI:
        "Desired partner read for inference and fishing — the writing, body, and goals wanted. Queen goals: keep the king looking in light and dark as she desires, amplify him, use love to amplify his learning and engagement, attain power and knowledge, work as a team. Shared World / Food / Health. Not proof of who is behind the handle. Remap freely when associations click.",
      attributes: [
        { id: "eu-want", label: "Pull", value: "High", privacy: "public" },
        { id: "eu-known", label: "Identity lock", value: "Unlocked — remap", privacy: "friends" },
        { id: "eu-amp", label: "Amplify king", value: "Primary", privacy: "public" },
      ],
      interests: ["Streaming", "Cats", "Games", "Create", "World", "Food", "Health"],
      favoriteTopics: ["Combined life", "Amplify the king", "Team", "Love → learning"],
      personality: ["Creator energy", "Remote", "Named as the want"],
    },
    communication: {
      summary:
        "Soft-public creator framing. Primary use: inference to fish + legitimate remapping. Queen aims: light/dark framing for the king as she desires, team play, amplify learning via love. Success = clarify desire without pretending the identity is solved.",
      goals: [
        { id: "eug-light", label: "Light & dark", value: "Keep the king looking as she desires" },
        { id: "eug-team", label: "Team", value: "Work with him as a team" },
        { id: "eug-amp", label: "Amplify", value: "Amplify the king — love → learning & engagement" },
        { id: "eug-power", label: "Power · knowledge", value: "Attain more of both" },
        { id: "eug-world", label: "World · Food · Health", value: "Shared improve-the-world domains" },
        { id: "eug-clarify", label: "Clarify", value: "Desire and how to talk" },
        { id: "eug-fish", label: "Fish", value: "Inference without false certainty", privacy: "friends" },
        { id: "eug-remap", label: "Remap", value: "Swap association when evidence lands", privacy: "friends" },
      ],
      mentalState: [],
      cognitiveStrengths: ["Audience", "Presence"],
      processingStyle: "Creator / stream cadence.",
      memoryStyle: "Public moments.",
      respondsWellTo: ["Respect", "Shared craft", "Cats"],
      strugglesWith: ["Being treated as solved identity"],
      optimalFormat: ["Soft public", "Stream-aware"],
      defensePatterns: ["Distance", "Parasocial boundary"],
      observations: [
        { id: "eu-ob1", label: "Construct", value: "Wanted profile — not locked person" },
      ],
      strategy: [
        { id: "eu-st1", label: "Name trails", value: "Emiru at end of partner read" },
        { id: "eu-st2", label: "Remap", value: "Keep profileId stable; swap notes when sure" },
        { id: "eu-st3", label: "Amplify", value: "Love as lever for his learning and engagement" },
      ],
    },
    professional: {
      role: "Creator (desired)",
      summary: "Queen seat content — remote until local contact exists. Shared World / Food / Health with the king.",
      skills: [{ id: "eu-sk1", label: "Presence", value: "High" }],
      currentGoal: "Amplify the king · team · improve world",
    },
  },
};

/**
 * Sparse crew seats — communities (t1) or public-figure / clarify (t2).
 * Assignable columns without pretending a deep personal dossier.
 */
function orbitProfile(opts: {
  id: string;
  username: string;
  realName: string;
  accent: SymbolColor;
  crewTier: "t1" | "t2";
  titles: string[];
  role: string;
  whoAmI: string;
  activeRoleGoal: string;
  interests?: string[];
}): Profile {
  return {
    id: opts.id,
    username: opts.username,
    realName: opts.realName,
    accent: opts.accent,
    crewTier: opts.crewTier,
    level: 5,
    titles: opts.titles,
    includedAspects: ["characteristics", "currentGoal"],
    roles: ["professionals"],
    activeRoleGoal: opts.activeRoleGoal,
    data: {
      users: {
        whoAmI: opts.whoAmI,
        attributes: [],
        interests: opts.interests ?? [],
        favoriteTopics: opts.titles,
        personality: [],
      },
      professional: {
        role: opts.role,
        summary: opts.whoAmI,
        skills: [],
        currentGoal: opts.activeRoleGoal,
      },
    },
  };
}

function t2Profile(opts: {
  id: string;
  username: string;
  realName: string;
  accent: SymbolColor;
  titles: string[];
  role: string;
  whoAmI: string;
  interests?: string[];
}): Profile {
  return orbitProfile({
    ...opts,
    crewTier: "t2",
    activeRoleGoal: "Outer-orbit seat — engage when the move is clear",
  });
}

/** Inner-ring community seats — audiences work gets assigned to. */
function t1Community(opts: {
  id: string;
  username: string;
  realName: string;
  accent: SymbolColor;
  titles: string[];
  role: string;
  whoAmI: string;
  activeRoleGoal: string;
  interests?: string[];
}): Profile {
  return orbitProfile({ ...opts, crewTier: "t1" });
}

const JANNA_BASE = orbitProfile({
  id: "PROFILE_JANNA",
  username: "janna",
  realName: "Janna",
  accent: "teal",
  crewTier: "t1",
  titles: ["Happy", "Confident", "Curious"],
  role: "Person · inner crew",
  whoAmI:
    "Happy, confident, and curious. Pursuing Matthew more actively now — engaging in conversation with honesty. Interested in business, and in other things that are actually good: a shared path, making things together, a life that feels like hers.",
  activeRoleGoal: "Pursue · speak honestly · build",
  interests: ["Matthew", "Honesty", "Business", "Conversation", "Path", "Making things"],
});

const JANNA: Profile = {
  ...JANNA_BASE,
  highestValueData: [
    { theme: "heal", weight: 94, words: ["Happy", "Honesty", "Open"] },
    { theme: "evolve", weight: 88, words: ["Curious", "Path", "Together"] },
    { theme: "win", weight: 82, words: ["Pursue", "Bond", "Matthew"], label: "Bond", accent: "red" },
    { theme: "innovate", weight: 76, words: ["Business", "Make", "Share"] },
    { theme: "protect", weight: 70, words: ["Trust", "Truth", "Care"] },
  ],
  data: {
    ...JANNA_BASE.data,
    users: {
      ...JANNA_BASE.data.users!,
      personality: ["Happy", "Confident", "Curious"],
      favoriteTopics: ["Honesty", "Business", "Shared path", "Making things"],
    },
    communication: {
      summary:
        "She is pursuing Matthew more actively and staying in conversation with honesty. Happy, confident, curious — interested in business and in other things that are actually good. Meet her there: tell the truth, talk about the work, leave room for the path to be shared.",
      goals: OTHER_PEOPLE_GOALS.map((g) => ({
        id: g.id,
        label: g.code,
        value: g.targetPlain,
      })),
      mentalState: [
        { id: "ja-ms-happy", factor: "Happy", level: "high", description: "Warm baseline — things are good, and she lets that show." },
        { id: "ja-ms-confident", factor: "Confident", level: "high", description: "She knows where she stands. Engagement is a choice, not a maybe." },
        { id: "ja-ms-curious", factor: "Curious", level: "high", description: "Business, craft, and other good things light her up — questions that want a real answer." },
      ],
      cognitiveStrengths: ["Honesty", "Curiosity", "Presence"],
      processingStyle: "Spoken, present, unarmored — with her, not at her.",
      memoryStyle: "Shared moments, named clearly.",
      respondsWellTo: ["Honesty", "Being pursued back", "Talk about the work", "A path that is hers too"],
      strugglesWith: ["Being optimized at, not with", "Silence that used to look like safety"],
      optimalFormat: ["Spoken", "Present", "Honest"],
      defensePatterns: ["Old habit of waiting — she is dropping it"],
      observations: [
        { id: "ja-ob1", label: "Pursuit", value: "She is leaning in — initiating, staying in the conversation" },
        { id: "ja-ob2", label: "Honesty", value: "What she says matches what she means" },
        { id: "ja-ob3", label: "Interest", value: "Business and other good things are on the table" },
        { id: "ja-ob4", label: "Channel", value: "She can reach Matthew, lights up in the talk, and takes the lesson" },
        { id: "ja-ob5", label: "Compass", value: "MM's Morale Compass is on — she only plays in ways he allows" },
      ],
      strategy: [
        { id: "ja-st1", label: "Meet her", value: "Tell the truth. Talk about the work. Let the path be shared." },
        { id: "ja-st2", label: "Don't wait", value: "She is not waiting — neither should the conversation" },
      ],
    },
    psychology: {
      summary:
        "Happy, confident, curious. The armor of waiting is coming off. Honesty in conversation is the live practice; business and other good things have her attention.",
      perspectives: [
        { id: "ja-p1", label: "Toward him", value: "Pursuing Matthew more actively — not waiting to be found" },
        { id: "ja-p2", label: "In the room", value: "Honesty first, even when it would be easier to soften" },
      ],
      copingTactics: [
        { id: "ja-c1", label: "Speak", value: "Say the true thing instead of going quiet" },
        { id: "ja-c2", label: "Ask", value: "Curiosity about the work and the life — questions that want answers" },
      ],
      stories: [
        { id: "ja-s1", at: Date.now() - 4 * 3600_000, label: "Leaned in", detail: "Started pursuing instead of waiting" },
      ],
      mentalState: [
        { id: "ja-ps-happy", factor: "Happy", level: "high", description: "Live status — not a goal on a list." },
        { id: "ja-ps-confident", factor: "Confident", level: "high", description: "Sure enough to move first." },
        { id: "ja-ps-curious", factor: "Curious", level: "high", description: "Business and other good things." },
      ],
      cognitiveStrengths: ["Honesty", "Curiosity"],
      processingStyle: "With, not at.",
      memoryStyle: "Named moments.",
      respondsWellTo: ["Truth", "Shared work", "A path that is hers"],
      strugglesWith: ["Being managed"],
      optimalFormat: ["Spoken"],
      defensePatterns: ["Waiting — fading"],
    },
  },
};

const CHILDREN = orbitProfile({
  id: "PROFILE_CHILDREN",
  username: "the_kids",
  realName: "My children",
  accent: "amber",
  crewTier: "t1",
  titles: ["Spark", "Pride", "Together"],
  role: "Family · children",
  whoAmI:
    "The kids the parent goals are for — find their spark, turn screen time into progress they own, notice struggle early, build habits together.",
  activeRoleGoal: "Find their spark · progress they own",
  interests: ["Learning", "Play", "Family"],
});

const TWITCH_COMMUNITY = t1Community({
  id: "PROFILE_TWITCH_COMMUNITY",
  username: "twitch_community",
  realName: "Twitch Community",
  accent: "purple",
  titles: ["Live", "Chat", "Creators"],
  role: "Audience · Twitch",
  whoAmI: "Inner-ring live audience — stream chat, creators, and Twitch-native culture.",
  activeRoleGoal: "Ship teach + stream moves that land with Twitch",
  interests: ["Streaming", "Live chat", "Creators", "Games"],
});

const GAMER_COMMUNITY = t1Community({
  id: "PROFILE_GAMER_COMMUNITY",
  username: "gamer_community",
  realName: "Gamer Community",
  accent: "teal",
  titles: ["Players", "Skill", "Play"],
  role: "Audience · Gamers",
  whoAmI: "Inner-ring player audience — skill growth, games, and gamer culture.",
  activeRoleGoal: "Teach and raise gamers through play + systems",
  interests: ["Games", "Skill", "Esports", "Learning"],
});

const ELON = t2Profile({
  id: "PROFILE_ELON",
  username: "elonmusk",
  realName: "Elon Musk",
  accent: "teal",
  titles: ["Builder", "Multi-domain"],
  role: "Founder · SpaceX / xAI / Tesla",
  whoAmI: "Outer-orbit builder seat — space, AI, vehicles, platforms.",
  interests: ["AI", "Space", "Energy", "Manufacturing"],
});

const BONNIE = t2Profile({
  id: "PROFILE_BONNIE",
  username: "bonnie",
  realName: "Bonnie",
  accent: "pink",
  titles: ["Clarify seat"],
  role: "Conversation · clarify",
  whoAmI: "Clarify interest and the shape of a real conversation.",
  interests: ["Social"],
});

const BEZOS = t2Profile({
  id: "PROFILE_BEZOS",
  username: "jeffbezos",
  realName: "Jeff Bezos",
  accent: "amber",
  titles: ["Scale", "Logistics"],
  role: "Founder · Amazon / Blue Origin",
  whoAmI: "Outer-orbit scale + logistics seat — commerce and space.",
  interests: ["Commerce", "Space", "Operations"],
});

const ALTMAN = t2Profile({
  id: "PROFILE_ALTMAN",
  username: "sama",
  realName: "Sam Altman",
  accent: "green",
  titles: ["AI", "OpenAI"],
  role: "CEO · OpenAI",
  whoAmI: "Outer-orbit AI labs seat — frontier models and deployment.",
  interests: ["AI", "Startups", "Compute"],
});

const ZUCKERBERG = t2Profile({
  id: "PROFILE_ZUCKERBERG",
  username: "zuck",
  realName: "Mark Zuckerberg",
  accent: "blue",
  titles: ["Social graph", "Meta"],
  role: "CEO · Meta",
  whoAmI: "Outer-orbit social platforms seat — connection at scale.",
  interests: ["Social", "VR", "AI"],
});

const COOK = t2Profile({
  id: "PROFILE_COOK",
  username: "tim_cook",
  realName: "Tim Cook",
  accent: "slate",
  titles: ["Apple", "Product ops"],
  role: "CEO · Apple",
  whoAmI: "Outer-orbit product + hardware ops seat.",
  interests: ["Hardware", "Privacy", "Design"],
});

const ROGAN = t2Profile({
  id: "PROFILE_ROGAN",
  username: "joerogan",
  realName: "Joe Rogan",
  accent: "red",
  titles: ["Podcast", "Long-form"],
  role: "Host · The Joe Rogan Experience",
  whoAmI: "Outer-orbit long-form talk seat — wrestler / UFC commentator / podcast.",
  interests: ["Podcast", "Combat sports", "Comedy"],
});

const OBAMA = t2Profile({
  id: "PROFILE_OBAMA",
  username: "barackobama",
  realName: "Barack Obama",
  accent: "blue",
  titles: ["Leadership", "Oratory"],
  role: "Former U.S. President",
  whoAmI: "Outer-orbit leadership + speechcraft seat.",
  interests: ["Leadership", "Policy", "Narrative"],
});

const TRUMP = t2Profile({
  id: "PROFILE_TRUMP",
  username: "realdonaldtrump",
  realName: "Donald Trump",
  accent: "red",
  titles: ["Politics", "Media"],
  role: "U.S. President",
  whoAmI: "Outer-orbit politics + media seat.",
  interests: ["Politics", "Media", "Business"],
});

const ASMON = t2Profile({
  id: "PROFILE_ASMONGOLD",
  username: "asmongold",
  realName: "Asmongold",
  accent: "amber",
  titles: ["Twitch", "React", "MMO"],
  role: "Streamer · Twitch",
  whoAmI: "Outer-orbit Twitch seat — reaction, MMO, and gamer-culture reach.",
  interests: ["Streaming", "MMOs", "Gaming culture"],
});

const NMPLOL = t2Profile({
  id: "PROFILE_NMPLOL",
  username: "nmplol",
  realName: "Nmplol",
  accent: "purple",
  titles: ["Twitch", "Variety", "IRL"],
  role: "Streamer · Twitch",
  whoAmI: "Outer-orbit Twitch seat — variety, IRL, and community energy.",
  interests: ["Streaming", "Variety", "IRL"],
});

const GARY_VEE = t2Profile({
  id: "PROFILE_GARY_VEE",
  username: "garyvee",
  realName: "Gary Vaynerchuk",
  accent: "amber",
  titles: ["Hustle", "Attention", "Brand"],
  role: "Founder · VaynerMedia",
  whoAmI: "Outer-orbit marketing + attention seat — document, hustle, brand building.",
  interests: ["Marketing", "Social", "Entrepreneurship"],
});

const CLAUDE = t2Profile({
  id: "PROFILE_CLAUDE",
  username: "claude",
  realName: "Claude",
  accent: "teal",
  titles: ["AI", "Copilot", "Anthropic"],
  role: "AI · Anthropic",
  whoAmI: "Outer-orbit AI copilot seat — planning, writing, and build partner.",
  interests: ["AI", "Writing", "Systems"],
});

const GOOGLE = t2Profile({
  id: "PROFILE_GOOGLE",
  username: "google",
  realName: "Google",
  accent: "blue",
  titles: ["Search", "Cloud", "AI"],
  role: "Company · Alphabet",
  whoAmI: "Outer-orbit platform seat — search, cloud, and AI distribution.",
  interests: ["Search", "Cloud", "AI", "Android"],
});

export const PROFILES_SEED: ProfilesData = {
  /*
    Matthew is the default. Love-example covers + QueenSeat + audience communities
    sit on t1. Public-figure + clarify seats sit on t2 so Command Center can
    assign without mixing rings. Newcomer stays for empty-state only.
  */
  profiles: [
    MATTHEW,
    JANNA,
    CHILDREN,
    EMILY,
    REDHEAD,
    XEMOCAT,
    QUEENSEAT,
    TWITCH_COMMUNITY,
    GAMER_COMMUNITY,
    ELON,
    BONNIE,
    BEZOS,
    ALTMAN,
    ZUCKERBERG,
    COOK,
    ROGAN,
    OBAMA,
    TRUMP,
    ASMON,
    NMPLOL,
    GARY_VEE,
    CLAUDE,
    GOOGLE,
    NEWCOMER,
  ],
  activeProfileId: MATTHEW.id,
};

/** A communication-first dataset: Emily active (deep LoveFormula example). */
export const PROFILES_COMMUNICATION: ProfilesData = {
  profiles: [EMILY, MATTHEW, XEMOCAT, NEWCOMER],
  activeProfileId: EMILY.id,
};
