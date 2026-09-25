/**
 * Command Center — Goals & Problems data.
 *
 * Kept as a static read-only fixture (not part of the editable ECS graph)
 * so the Goals view can render without polluting the planning entity store.
 */

export type ItemStatus = "draft" | "candidate" | "validated" | "in-progress";
export type Priority = "P0" | "P1" | "P2";
export type GoalCategory = "northStar" | "marketing" | "product" | "realWorld";

export interface GoalSolveLink {
  id: string;
  relationshipType: "solves" | "supports";
  /** 0–100: how much this goal moves the needle on the problem. */
  impact: number;
}

export interface MarketingGoal {
  id: string;
  title: string;
  description: string;
  status: ItemStatus;
  priority: Priority;
  category: GoalCategory;
  /** Optional target completion date (ISO string). */
  targetDate?: string;
  /** Optional stepped milestones shown in the expanded body. */
  milestones?: { year: number; label: string }[];
  /** Problem ids this goal directly solves or supports, with impact scores. */
  solves: GoalSolveLink[];
  /** Feature titles this goal enables. */
  enabledFeatures: string[];
  /** Optional links to related content (docs, research, briefs). */
  relatedContent?: string[];
}

export interface MarketingProblem {
  id: string;
  title: string;
  description: string;
  status: ItemStatus;
  priority: Priority;
  /** Feature titles this problem motivates building. */
  enabledFeatures: string[];
  /** Roles affected by this problem. */
  affectedRoles: string[];
}

/* ---------------------------------------------------------------- North Star */

export const GOALS: MarketingGoal[] = [
  {
    id: "gol-legend-01",
    title: "Gamification of Learning, Education, Work, and Life",
    description: "The company's founding legend — transform how humanity learns, works, and lives by gamifying reality. Unlock human potential through innovative technology, human-centered AI, and engaging experiences.",
    status: "validated",
    priority: "P0",
    category: "northStar",
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-trillion-01",
    title: "Build a Trillion-Dollar Education Empire",
    description: "Create transformative AI-powered education and productivity tools that scale globally, empowering millions of learners to unlock their full potential, master their real-life controller and character, understand the game they are playing, and improve their lives.",
    status: "in-progress",
    priority: "P0",
    category: "northStar",
    targetDate: "2030-12-31",
    milestones: [
      { year: 2026, label: "Unicorn status ($1B valuation)" },
      { year: 2028, label: "Fortune 500 entry" },
      { year: 2030, label: "Trillion-dollar empire" },
    ],
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-unicorn-01",
    title: "Achieve Unicorn Status",
    description: "Learning has become incredibly affordable — now learn to do it right. Edu / human is probably release 1, but I basically planned a country when I got to the unicorn status round 1 — country and also human. I love metrics and leaderboards. Plus I got a lot of plans to fund and mouths to feed and minds to nourish.",
    status: "in-progress",
    priority: "P0",
    category: "northStar",
    targetDate: "2026-12-31",
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-human-potential-01",
    title: "Responsibly Unlocking and Achieving Human Potential to the Best Future for Humanity",
    description: "The north-star goal that every product, feature, and decision ladders up to — using gamification, human-centered AI, and engaging experiences to responsibly unlock human potential and steer toward the best possible future for humanity.",
    status: "validated",
    priority: "P0",
    category: "northStar",
    solves: [],
    enabledFeatures: [],
  },

  /* ---------------------------------------------------------------- Product */

  {
    id: "gol-mvp-01",
    title: "Ship the 4eye MVP with exceptional UX",
    description: "Launch the first public version of 4eye — a polished, fast, and delightful product that sets the standard for AI-powered education UX and earns organic advocacy from its first cohort of users.",
    status: "in-progress",
    priority: "P0",
    category: "product",
    solves: [],
    enabledFeatures: ["Core learning loop", "Character system", "HUD", "4eye chat"],
  },
  {
    id: "gol-ai-character-01",
    title: "Build a world-class AI companion character system",
    description: "Create the character layer — the AI companion, HUD, auras, loadout, and emotional intelligence — that makes 4eye feel alive and personal rather than generic ed-tech.",
    status: "candidate",
    priority: "P0",
    category: "product",
    solves: [],
    enabledFeatures: ["Character auras", "HUD loadout", "4eye chat on HUD", "Wellbeing check-in pulse"],
  },
  {
    id: "gol-gamification-engine-01",
    title: "Launch the Gamification Engine",
    description: "Deliver the full reward layer: coins, quests, streaks, progression tiers, and leaderboards. This is the motivational spine of 4eye — without it, the product is just another learning tool.",
    status: "in-progress",
    priority: "P1",
    category: "product",
    solves: [
      { id: "prb-low-completion-01", relationshipType: "solves", impact: 85 },
      { id: "prb-boredom-language-01", relationshipType: "supports", impact: 60 },
    ],
    enabledFeatures: ["Coin & reward system", "Quests & progression", "Streak tracking"],
  },
  {
    id: "gol-teacher-automation-01",
    title: "Deliver teacher admin automation suite",
    description: "Automate grading, recap generation, and lesson differentiation so teachers can focus on relationships, not admin. The teacher-time-back promise is a major commercial unlock.",
    status: "draft",
    priority: "P1",
    category: "product",
    solves: [
      { id: "prb-teacher-overload-01", relationshipType: "solves", impact: 80 },
    ],
    enabledFeatures: ["AI recap generator", "Auto-grading", "Differentiation engine"],
  },
  {
    id: "gol-content-marketplace-01",
    title: "Launch teacher content marketplace",
    description: "Let teachers publish, remix, and monetise lesson content — turning the best educators into platform contributors and creating a network-effect flywheel.",
    status: "draft",
    priority: "P2",
    category: "product",
    solves: [
      { id: "prb-teacher-overload-01", relationshipType: "supports", impact: 40 },
      { id: "prb-admin-trust-01", relationshipType: "supports", impact: 25 },
    ],
    enabledFeatures: ["Content marketplace", "Revenue share for teachers", "Remix & fork lessons"],
  },

  /* --------------------------------------------------------------- Marketing */

  {
    id: "gol-mental-health-01",
    title: "Support student mental health",
    description: "Embed lightweight wellbeing check-ins and AI-powered emotional support directly in the learning flow, so students don't have to leave the tool to get help.",
    status: "in-progress",
    priority: "P0",
    category: "marketing",
    solves: [
      { id: "prb-poor-mental-health-01", relationshipType: "solves", impact: 85 },
      { id: "prb-isolation-01", relationshipType: "supports", impact: 40 },
    ],
    enabledFeatures: ["4eye chat on HUD", "Wellbeing check-in pulse", "Peer connection nudges"],
    relatedContent: ["Mental health UX research", "Safeguarding compliance brief"],
  },
  {
    id: "gol-improve-retention-01",
    title: "Improve retention & repetition",
    description: "Use spaced repetition, streaks, and quest-based progression to keep learners returning daily and actually cementing knowledge over time.",
    status: "in-progress",
    priority: "P0",
    category: "marketing",
    solves: [
      { id: "prb-boredom-language-01", relationshipType: "solves", impact: 80 },
      { id: "prb-low-completion-01", relationshipType: "solves", impact: 90 },
    ],
    enabledFeatures: ["Quests & progression", "Coin & reward system", "Streak tracking", "Learning-style content transformation"],
    relatedContent: ["Retention metrics Q2", "Duolingo competitive analysis"],
  },
  {
    id: "gol-ai-overdependence-01",
    title: "Master your own mind",
    description: "Shift AI from answer-machine to thinking partner — guiding students to reason for themselves before surfacing a solution.",
    status: "candidate",
    priority: "P0",
    category: "marketing",
    solves: [
      { id: "prb-ai-overdependence-01", relationshipType: "solves", impact: 90 },
      { id: "prb-poor-mental-health-01", relationshipType: "supports", impact: 30 },
    ],
    enabledFeatures: ["4eye chat on HUD", "Socratic prompt mode", "Confidence self-rating"],
    relatedContent: ["Agency research brief"],
  },
  {
    id: "gol-improve-engagement-01",
    title: "Improve engagement",
    description: "Make every lesson feel like a game worth finishing — through interactive formats, dynamic difficulty, and visible progress.",
    status: "draft",
    priority: "P1",
    category: "marketing",
    solves: [
      { id: "prb-boredom-language-01", relationshipType: "solves", impact: 75 },
      { id: "prb-low-completion-01", relationshipType: "supports", impact: 50 },
    ],
    enabledFeatures: ["Coin & reward system", "Quests & progression", "Interactive lesson formats"],
  },
  {
    id: "gol-esl-accessibility-01",
    title: "Expand ESL & accessibility",
    description: "Remove language and reading barriers with real-time translation, simplified text modes, and screen-reader-first design.",
    status: "candidate",
    priority: "P1",
    category: "marketing",
    solves: [
      { id: "prb-boredom-language-01", relationshipType: "solves", impact: 70 },
      { id: "prb-accessibility-01", relationshipType: "solves", impact: 85 },
    ],
    enabledFeatures: ["Language translation & accessibility text", "Learning-style content transformation", "Audio narration"],
  },
  {
    id: "gol-teacher-time-01",
    title: "Give teachers time back",
    description: "Automate grading, recap generation, and lesson differentiation so teachers can focus on relationships, not admin.",
    status: "draft",
    priority: "P1",
    category: "marketing",
    solves: [
      { id: "prb-teacher-overload-01", relationshipType: "solves", impact: 80 },
      { id: "prb-low-completion-01", relationshipType: "supports", impact: 30 },
    ],
    enabledFeatures: ["AI recap generator", "Auto-grading", "Differentiation engine"],
    relatedContent: ["Teacher time-diary study"],
  },
  {
    id: "gol-parent-visibility-01",
    title: "Increase parent visibility",
    description: "Give parents a clear, jargon-free window into their child's progress and emotional wellbeing without overwhelming them with data.",
    status: "draft",
    priority: "P1",
    category: "marketing",
    solves: [
      { id: "prb-poor-mental-health-01", relationshipType: "supports", impact: 45 },
      { id: "prb-parent-disconnect-01", relationshipType: "solves", impact: 88 },
    ],
    enabledFeatures: ["Parent dashboard", "Wellbeing alerts", "Weekly digest email"],
  },
  {
    id: "gol-data-trust-01",
    title: "Build institutional trust through data",
    description: "Provide admins with rigorous outcome reporting, compliance exports, and audit trails that make 4eye easy to adopt at district scale.",
    status: "draft",
    priority: "P2",
    category: "marketing",
    solves: [
      { id: "prb-admin-trust-01", relationshipType: "solves", impact: 92 },
    ],
    enabledFeatures: ["Outcome reporting dashboard", "FERPA/COPPA compliance export", "Audit log"],
  },
  {
    id: "gol-peer-learning-01",
    title: "Enable peer-to-peer learning",
    description: "Let students help each other through structured peer review, study groups, and collaborative quests.",
    status: "draft",
    priority: "P2",
    category: "marketing",
    solves: [
      { id: "prb-isolation-01", relationshipType: "solves", impact: 78 },
      { id: "prb-boredom-language-01", relationshipType: "supports", impact: 30 },
    ],
    enabledFeatures: ["Peer connection nudges", "Study group rooms", "Collaborative quests"],
  },

  /* -------------------------------------------------------------- Real World */

  {
    id: "gol-rw-billions-01",
    title: "Deliver an overwhelmingly positive effect on the lives of billions",
    description: "Build products and systems that genuinely improve the lives of billions of people — better education outcomes, stronger mental health, greater economic mobility, and broader human flourishing.",
    status: "validated",
    priority: "P0",
    category: "realWorld",
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-rw-financial-01",
    title: "Achieve financial independence and generational wealth",
    description: "Build the financial foundation that removes all constraints on vision — not for ego, but for total freedom to pursue the mission, support people I care about, and compound impact without compromise.",
    status: "in-progress",
    priority: "P0",
    category: "realWorld",
    targetDate: "2028-12-31",
    milestones: [
      { year: 2026, label: "Remove financial pressure" },
      { year: 2027, label: "Generational wealth threshold" },
      { year: 2028, label: "Total freedom of choice" },
    ],
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-rw-financial-02",
    title: "Reinvent the economy and currency system around information and learning",
    description: "Build parallel systems that reframe economic value around knowledge creation, learning, and information exchange — demonstrating that a world where education and intellectual contribution are the primary unit of exchange is not only possible but inevitable.",
    status: "candidate",
    priority: "P1",
    category: "realWorld",
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-rw-health-01",
    title: "Maintain peak physical and mental health",
    description: "Health is the foundation everything else stands on. Peak physical condition and strong mental health aren't a side goal — they are a prerequisite for sustained excellence, creative energy, and the resilience to see this through.",
    status: "in-progress",
    priority: "P1",
    category: "realWorld",
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-rw-ai-relationship-01",
    title: "Lead the world in AI-human relationship innovation",
    description: "Define and demonstrate what a genuinely beneficial relationship between AI and humanity looks like — one that amplifies human capability, preserves agency, and builds toward the best possible future for both.",
    status: "candidate",
    priority: "P1",
    category: "realWorld",
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-rw-purpose-01",
    title: "Build a life of purpose, relationships, and freedom",
    description: "Create a life where the work matters, the relationships are deep, and freedom — of time, place, and choice — is a daily reality rather than a distant reward.",
    status: "candidate",
    priority: "P1",
    category: "realWorld",
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-rw-entertainment-01",
    title: "Pioneer new entertainment paradigms combining education and engagement",
    description: "Prove that learning and entertainment are not opposites — that the most engaging experiences humans can have can also be the most educational, and build that category from the ground up.",
    status: "draft",
    priority: "P1",
    category: "realWorld",
    solves: [],
    enabledFeatures: [],
  },
  {
    id: "gol-rw-enduring-01",
    title: "Build an enduring organization that outlasts any individual",
    description: "Create systems, culture, and products that compound in value over decades — an organization that benefits humanity for generations to come, independent of any single founder or moment.",
    status: "draft",
    priority: "P2",
    category: "realWorld",
    solves: [],
    enabledFeatures: [],
  },
];

export const PROBLEMS: MarketingProblem[] = [
  {
    id: "prb-poor-mental-health-01",
    title: "Poor mental health support in tools",
    description: "Existing ed-tech ignores student emotional state entirely. No tool in the classroom helps students manage anxiety, flag distress, or feel seen — they're on their own.",
    status: "validated",
    priority: "P0",
    enabledFeatures: ["4eye chat on HUD", "Wellbeing check-in pulse", "Safeguarding alerts"],
    affectedRoles: ["Student", "Parent"],
  },
  {
    id: "prb-low-completion-01",
    title: "Students abandon lessons before completion",
    description: "70%+ of started lessons are never finished. Once a student loses momentum — usually after a confusing concept — there's no recovery path that brings them back.",
    status: "validated",
    priority: "P0",
    enabledFeatures: ["Streak tracking", "Quests & progression", "Smart re-entry prompts"],
    affectedRoles: ["Student", "Teacher", "Admin"],
  },
  {
    id: "prb-ai-overdependence-01",
    title: "AI overdependence / loss of agency",
    description: "Students use AI to skip thinking, not enhance it. After a semester with AI tutors, many can't solve problems without one — undermining the core mission of education.",
    status: "validated",
    priority: "P0",
    enabledFeatures: ["4eye chat on HUD", "Socratic prompt mode", "Confidence self-rating"],
    affectedRoles: ["Student", "Teacher", "Admin"],
  },
  {
    id: "prb-boredom-language-01",
    title: "Boredom & ESL comprehension barrier",
    description: "Static lesson formats fail students who are bored, processing in a second language, or have reading difficulties. One format for all means most students are underserved.",
    status: "in-progress",
    priority: "P1",
    enabledFeatures: ["Language translation & accessibility text", "Learning-style content transformation", "Quests & progression"],
    affectedRoles: ["Student", "Teacher"],
  },
  {
    id: "prb-teacher-overload-01",
    title: "Teacher admin overload",
    description: "Teachers spend 30–40% of their time on admin — grading, differentiation, reporting — instead of teaching. Burnout is the #1 attrition driver in the profession.",
    status: "in-progress",
    priority: "P1",
    enabledFeatures: ["AI recap generator", "Auto-grading", "Differentiation engine"],
    affectedRoles: ["Teacher"],
  },
  {
    id: "prb-isolation-01",
    title: "Social isolation in digital learning",
    description: "Remote and hybrid learners feel alone. Without natural peer interaction, motivation collapses and the sense of belonging that keeps students in school disappears.",
    status: "candidate",
    priority: "P1",
    enabledFeatures: ["Peer connection nudges", "Study group rooms", "Collaborative quests"],
    affectedRoles: ["Student", "Parent"],
  },
  {
    id: "prb-parent-disconnect-01",
    title: "Parents disconnected from learning",
    description: "Parents see report cards once a term. They have no real-time picture of how their child is doing emotionally or academically — and can't intervene early when things go wrong.",
    status: "draft",
    priority: "P1",
    enabledFeatures: ["Parent dashboard", "Weekly digest email", "Wellbeing alerts"],
    affectedRoles: ["Parent"],
  },
  {
    id: "prb-accessibility-01",
    title: "Accessibility gaps exclude learners",
    description: "Most ed-tech fails WCAG AA. Students with visual impairments, motor difficulties, or cognitive differences are effectively locked out of tools that claim to help everyone.",
    status: "candidate",
    priority: "P1",
    enabledFeatures: ["Audio narration", "Screen-reader-first design", "Language translation & accessibility text"],
    affectedRoles: ["Student"],
  },
  {
    id: "prb-admin-trust-01",
    title: "Admins can't justify the purchase",
    description: "District admins need hard outcome data, compliance documentation, and audit trails to get ed-tech approved at scale. Without it, even great tools die in procurement.",
    status: "draft",
    priority: "P2",
    enabledFeatures: ["Outcome reporting dashboard", "FERPA/COPPA compliance export", "Audit log"],
    affectedRoles: ["Admin"],
  },
];

/** Map from problem id → goal ids that address it (precomputed reverse index). */
export const GOALS_FOR_PROBLEM: Record<string, string[]> = {};
for (const goal of GOALS) {
  for (const { id: problemId } of goal.solves) {
    if (!GOALS_FOR_PROBLEM[problemId]) GOALS_FOR_PROBLEM[problemId] = [];
    GOALS_FOR_PROBLEM[problemId].push(goal.id);
  }
}

export interface Desire {
  id: string;
  word: string;
  tagline: string;
  color: string;
}

export const DESIRES: Desire[] = [
  {
    id: "d-peace",
    word: "Peace",
    tagline: "The calm that comes from clarity — knowing where you stand and where you're headed.",
    color: "#6366f1",
  },
  {
    id: "d-love",
    word: "Love",
    tagline: "Care for the people we build for, and for each other along the way.",
    color: "#ec4899",
  },
  {
    id: "d-happiness",
    word: "Happiness",
    tagline: "Joy in the craft. Work that energizes rather than drains.",
    color: "#f59e0b",
  },
  {
    id: "d-growth",
    word: "Growth",
    tagline: "Expanding what's possible — for users, for the team, for the world.",
    color: "#10b981",
  },
  {
    id: "d-learning",
    word: "Learning",
    tagline: "Staying curious. Every problem is a teacher. Every challenge, a gift.",
    color: "#3b82f6",
  },
  {
    id: "d-freedom",
    word: "Freedom",
    tagline: "Tools that liberate. Breaking the barriers between people and their potential.",
    color: "#8b5cf6",
  },
  {
    id: "d-connection",
    word: "Connection",
    tagline: "Bridging people across languages, classrooms, and screens.",
    color: "#f97316",
  },
];
