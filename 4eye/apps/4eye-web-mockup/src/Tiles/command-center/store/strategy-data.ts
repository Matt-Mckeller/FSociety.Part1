/**
 * Command Center — strategy & reference data.
 *
 * Presentational reference content (Strategic Focus, SWOT, Open Questions,
 * Decisions, Roadmap checkpoints) re-authored from the legacy Command Center.
 * Unlike the work hierarchy in `seed-data.ts`, these are read-only display
 * fixtures consumed by the Dashboard, Compass, and Roadmap views — they are
 * not part of the editable entity graph.
 *
 * Curated/condensed; content is real planning material, clarified for display.
 */

import type { SymbolColor } from "@4eye/types";

/* ----------------------------------------------------------- strategic focus */

export interface StrategicFocus {
  id: string;
  name: string;
  glyph: string;
  description: string;
  /** Why this is a current focus — the underlying reason. */
  why: string;
  /** The concrete outcome we're working toward. */
  goal: string;
  /** 0..100 current importance weight. */
  weight: number;
  /** Previous weight, to show the trend. */
  previousWeight: number;
  urgency: "low" | "medium" | "high" | "critical";
  color: SymbolColor;
}

export const STRATEGIC_FOCUSES: StrategicFocus[] = [
  {
    id: "sf-quality",
    name: "Marketing, Storytelling, and Gaming",
    glyph: "✨",
    description:
      "Building with genuine quality at every level — product, design, code, and experience — so 4eye earns deep trust and organic advocacy.",
    why: "Quality is the deepest differentiator in a crowded market. People recommend what genuinely delights them. Shortcuts now compound into tech debt and lost reputation later.",
    goal: "Every shipped feature and interaction reflects the standard of excellence we want to be known for — doing it correctly the first time.",
    weight: 35,
    previousWeight: 70,
    urgency: "high",
    color: "amber",
  },
  {
    id: "sf-launch",
    name: "Launch",
    glyph: "🚀",
    description:
      "Launching optimally for the best possible results for me and for humanity. Doing it properly, being a positive inspirational leadership symbol, and being the symbol for the future, for unity, for engagement, for happiness, for education, and for humanity. Some aspects are still questionable but overall my intentions to heal are real but I love to compete and I want to win. The power of a symbol of someone from the middle of nowhere with little resources, common upbringing, and mostly the power of knowledge being able to inspire and also demonstrating the actual value of ai is something that should not be missed as an accellerant opportunity for our entire existence. In general, my story has incredible value to the world as do the products. I want to properly manage and be prepared for things like censorship, war, government control, crime, and able to maximize the positive benefit to society in the areas it needs it most without causing world war or getting killed. Also while ensuring I can reproduce the lessons and things that I went through etc. Theres a ton of details here tbh, probably need a journal page for this.",
    why: "This information and plan is insanely important and powerful and needs to be handled properly, and if I'm allowed I'm pretty sure this is going to be one of the best launches of all time. Also, I really want to understand it, my experiences tell me that I need to be the one to understand this and document it and find the right people to help because in the wrong hands this is insanely powerful... plus theres unbelievable potential.",
    goal: "Develop and Clarify the perfect launch strategy thats also flexible and update the sequences plan.",
    weight: 78,
    previousWeight: 65,
    urgency: "high",
    color: "purple",
  },
  {
    id: "sf-planning",
    name: "Planning & Clarity",
    glyph: "🧭",
    description:
      "A clear, organized plan and direction so effort compounds instead of scattering. Able to work in one UI and App.",
    why: "I need organization, simplification, and clarity on what I'm building. I need a better system for managing the scale and complexity of work, and AI gives me the potential to re-invent everything the way I want. It also gives me the power to teach and compete with the largest businesses and countries in the world. Plus, I'm extremely excited but also extremely nervous about the power of AI, and I can answer 10000s of questions at once with the right presentation while also inspiring and becoming an icon for the value of information and leading the world in a positive direction. I also need to be ready for support and communication and sharing and to move very quickly because this is really fucking important tbh. I also want to be able to get almost ALL of my ideas out at the same time incase I'm killed or something else happens to the world. But I will not be killed, I will be supported, I believe and hope for the light but I see many possibilities and try to consider them all. Although, I'm also concerned about AGI but most of that documentation isn't even close to complete nor is it written, thats not part of the initial documentation and planning the scope is vision / most of the high level plans but keeping the parts that I want or believe should be private as private. Plus I need a system that allows me to keep track of all of my ideas and projects and create the perfect system ux ( in phases, i.e. irl COULD be slow but I've got a plan for drastically accellerating that too. ).",
    goal: "Organize all of my important plans, assets, etc. Create the ultimate UX in 4eye and unlock my potential for unlocking others potential and unlocking AI potential for human benefit.",
    weight: 75,
    previousWeight: 50,
    urgency: "high",
    color: "blue",
  },
  {
    id: "sf-growth",
    name: "Growth, Scaling, & Timing",
    glyph: "📈",
    description:
      "Making sure the app, the lessons, information, stories, and my life scales perfectly and is timed perfectly.",
    why: "Based on my experiences, I've learned that the potential here is exponential, not just for me but for every business every human and the future of all of humanity. I'm now able to merge so many paths, concepts, answers, and important information into one interface to add rocket fuel for the entire world and myself. And I need to make damn sure I set it in a good direction and that I can explain and teach this. Plus, theres... other aspects of existence that I've learned about which are... well... WHO THE FUCK WOULD I EVEN TALK TO ABOUT THIS?",
    goal: "Perfection.",
    weight: 92,
    previousWeight: 51,
    urgency: "high",
    color: "pink",
  },
  {
    id: "sf-financial",
    name: "Financial Goals",
    glyph: "💰",
    description:
      "We're currently in a solid position to focus on doing things correctly. Financial goals are a short-to-mid-term target — the plan is to scale very rapidly once the product is right.",
    why: "Rushing financial optimization at the expense of quality would undermine the product and long-term ceiling. The financial path is clear; either I don't need to worry about it at all, I'm going to be killed, or I will figure it out, but the exponential power is too valuable, I have to chase this. ",
    goal: "Achieve rapid financial scaling on the back of a quality product — targeting massive acceleration to unicorn status, not slow linear growth.",
    weight: 88,
    previousWeight: 15,
    urgency: "high",
    color: "green",
  },
  {
    id: "sf-execution",
    name: "Execution",
    glyph: "⚙️",
    description: "Building the 4eye mvp. Making sure I know wtf I'm building, that its useable and useful. To me but also to others.",
    why: "The product is the long-term differentiator. Everything else — income, funding, reputation — follows from a product that truly delivers.",
    goal: "I'm thinking I get all my ideas documented, get the product in a good place, and then record & release publicly but keeping private info private. TBD as we continue.",
    weight: 84,
    previousWeight: 35,
    urgency: "high",
    color: "purple",
  },
  {
    id: "sf-health",
    name: "Health & Mind Optimization",
    glyph: "🧠",
    description:
      "Improving my health, exercising ",
    why: "Taking care of my mind and body to optimize performance and throughput while also enjoying my life. Unlocking my mind, body, aura and potential.",
    goal: "Sustain peak cognitive and physical performance through consistent health habits and deliberate recovery.",
    weight: 25,
    previousWeight: 20,
    urgency: "medium",
    color: "teal",
  },
];

/* -------------------------------------------------------------------- SWOT */

export type SwotImpact = "low" | "medium" | "high";

export interface SwotItem {
  id: string;
  title: string;
  description: string;
  impact: SwotImpact;
  /**
   * Strengths only — 0..100 overall power: how strong this is in absolute,
   * all-time terms. `Infinity` marks a boundless/uncapped strength. This is
   * the PRIMARY sort key (most powerful overall first).
   */
  overallPower?: number;
  /**
   * Strengths only — 0..100 current power: how strongly it's working for me
   * *right now*, given the present phase. SECONDARY sort key, used to break
   * ties on overall power.
   */
  currentPower?: number;
  /** Optional caveat / qualifier rendered beneath the description. */
  note?: string;
}

export interface SwotMatrix {
  title: string;
  description: string;
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
}

export const GLOBAL_SWOT: SwotMatrix = {
  title: "Expanse Empire",
  description: "Global SWOT applying across all Strategic Focus areas.",
  strengths: [
    {
      id: "str-ai",
      title: "AI, 4eye",
      description:
        "The deepest edge of all — AI paired with 4eye. The leverage here is effectively uncapped: it multiplies every other strength and lets me reinvent, teach, and compete at a scale that was impossible before.",
      note: "Boundless ceiling, but I still need to be able to optimally utilize it — the limiter is my own utilization, not the tool.",
      impact: "high",
      overallPower: Infinity,
      currentPower: 98,
    },
    {
      id: "str-ai-native",
      title: "Working with AI",
      description:
        "Able to learn and work directly with AI instead of relying on public speaking, socializing, or conventional work. Not the deepest desire — but the optimal path right now to answer many questions at once and make complex content understandable.",
      impact: "high",
      overallPower: 90,
      currentPower: 94,
    },
    {
      id: "str-planning",
      title: "Planning",
      description:
        "Strategic thinking, roadmapping, sequencing, and turning sprawling vision into an organized, compounding plan.",
      impact: "high",
      overallPower: 96,
      currentPower: 96,
    },
    {
      id: "str-vision",
      title: "Vision",
      description:
        "Seeing the whole far ahead — where this goes, why it matters, and the shape of the future worth building toward.",
      impact: "high",
      overallPower: 95,
      currentPower: 90,
    },
    {
      id: "str-eq",
      title: "Emotional intelligence",
      description:
        "Reading people, self, and situations — empathy and attunement that build trust and move people genuinely.",
      impact: "high",
      overallPower: 94,
      currentPower: 86,
    },
    {
      id: "str-perspective",
      title: "Perspective",
      description:
        "Holding many angles at once — zooming between the atomic detail and the whole-world view, and considering possibilities others miss.",
      impact: "high",
      overallPower: 93,
      currentPower: 89,
    },
    {
      id: "str-tech",
      title: "Tech & programming",
      description:
        "Full-stack development, AI/ML, and modern architecture — able to build the thing myself, fast.",
      impact: "high",
      overallPower: 89,
      currentPower: 95,
    },
    {
      id: "str-comms",
      title: "Communication",
      description:
        "Conveying ideas clearly and compellingly — speaking, writing, and storytelling that resonate with any audience.",
      impact: "high",
      overallPower: 86,
      currentPower: 82,
    },
    {
      id: "str-desire",
      title: "Desire",
      description:
        "Relentless drive and hunger to win and to heal — the fuel that keeps the work compounding.",
      impact: "high",
      overallPower: 84,
      currentPower: 94,
    },
    {
      id: "str-storytelling",
      title: "Storytelling",
      description: "Crafting narratives that resonate and move people.",
      impact: "high",
      overallPower: 83,
      currentPower: 68,
    },
    {
      id: "str-discipline",
      title: "Discipline",
      description:
        "Consistency and follow-through — doing the right work repeatedly, even when it's hard.",
      impact: "high",
      overallPower: 82,
      currentPower: 80,
    },
    {
      id: "str-people",
      title: "People",
      description:
        "Building relationships, leading teams, and understanding human dynamics.",
      impact: "high",
      overallPower: 81,
      currentPower: 64,
    },
    {
      id: "str-solo-founder",
      title: "Solo founder",
      description:
        "The communication and learning potential I have right now is incredible when directly interfacing with AI — learning myself and my human — then being able to take that and have it exponentially benefit when bringing in others, and being able to bring in an entire world to support when ready.",
      impact: "high",
      overallPower: 80,
      currentPower: 88,
    },
    {
      id: "str-luck",
      title: "Luck",
      description:
        "A genuine, repeated tailwind — timing, openings, and fortune that keep showing up.",
      impact: "medium",
      overallPower: 79,
      currentPower: 75,
    },
    {
      id: "str-content",
      title: "Content creation",
      description: "Writing, video, audio — producing across multiple formats.",
      impact: "medium",
      overallPower: 78,
      currentPower: 58,
    },
    {
      id: "str-overhead",
      title: "Low overhead",
      description: "Minimal fixed costs and a flexible lifestyle — long runway, freedom to move.",
      impact: "medium",
      overallPower: 62,
      currentPower: 66,
    },
  ],
  weaknesses: [
    {
      id: "wk-2",
      title: "No revenue yet",
      description: "Quality of Life reduced, but story multiplied.",
      impact: "high",
    },
    {
      id: "wk-3",
      title: "Limited marketing experience",
      description: "Less marketing polish, but the authentic story is the multiplier.",
      impact: "medium",
    },
  ],
  opportunities: [
    {
      id: "opp-future",
      title: "Creating the Future",
      description:
        "Creating a new world — pioneering innovation that reshapes how humanity learns, works, and lives.",
      impact: "high",
    },
    {
      id: "opp-1",
      title: "EdTech market growth",
      description: "Sector experiencing rapid expansion and investment.",
      impact: "high",
    },
    {
      id: "opp-2",
      title: "AI/LLM cost reductions",
      description: "Technology costs decreasing, capabilities increasing.",
      impact: "high",
    },
    {
      id: "opp-3",
      title: "Consulting demand",
      description: "Immediate income possible through services.",
      impact: "medium",
    },
  ],
  threats: [
    {
      id: "thr-1",
      title: "Runway depletion",
      description: "Running out of money before reaching stability.",
      impact: "high",
    },
    {
      id: "thr-2",
      title: "Competition moves faster",
      description:
        "Assumed a threat, but actually valuable when planning something this large at this moment in time — I likely move faster than any competition anyway, and the best outcome of all is teaming up.",
      impact: "medium",
    },
    {
      id: "thr-3",
      title: "Market timing shifts",
      description: "The window of opportunity may narrow.",
      impact: "medium",
    },
  ],
};

/* --------------------------------------------------------------- questions */

export type QuestionStatus = "open" | "exploring" | "answered";

export interface OpenQuestion {
  id: string;
  question: string;
  context: string;
  category: string;
  status: QuestionStatus;
  answer?: string;
}

export const OPEN_QUESTIONS: OpenQuestion[] = [
  {
    id: "q-launch-order",
    question: "What is the optimal project launch order?",
    context:
      "Balance speed-to-market, financial runway, and long-term vision. Services could provide income fast.",
    category: "strategy",
    status: "exploring",
  },
  {
    id: "q-edu-vs-business",
    question: "How much time should go to EDU vs the business side?",
    context:
      "Several projects have both business utility and EDU learning potential — find the right balance.",
    category: "strategy",
    status: "open",
  },
  {
    id: "q-funding-vs-bootstrap",
    question: "Funding pitch or bootstrap through services first?",
    context:
      "Funding has the highest ceiling but is slow and deal-dependent; services are reliable but cap at hours.",
    category: "strategy",
    status: "exploring",
  },
  {
    id: "q-company-structure",
    question: "Should 4up and Services be one company?",
    context:
      "They share synergies — 4up content powers the services site — but may want separate branding.",
    category: "company-structure",
    status: "answered",
    answer: "No — keep them as separate companies for cleaner branding.",
  },
];

/* --------------------------------------------------------------- decisions */

export type DecisionConfidence = "low" | "medium" | "high";

export interface Decision {
  id: string;
  title: string;
  decision: string;
  category: string;
  reasoning: string;
  confidence: DecisionConfidence;
  /** ISO date string. */
  decidedOn: string;
}

export const DECISIONS: Decision[] = [
  {
    id: "dec-company-structure",
    title: "Separate companies — deferred for now",
    decision:
      "Not a priority right now. Launch most things inside 4eye first and focus on information, then branch out to the other businesses later.",
    category: "company-structure",
    reasoning:
      "Splitting into separate companies adds overhead too early. Likely cover the different business and use-case segments through domains or other app-based features instead of standing up separate entities now.",
    confidence: "medium",
    decidedOn: "2026-06-16",
  },
  {
    id: "dec-app-first",
    title: "Centralize everything in one synced UI",
    decision:
      "Get everything organized into a centralized place — one UI to work in for everything, kept in sync — to track and accomplish the very large goals.",
    category: "direction",
    reasoning:
      "A single centralized, synced workspace is the only realistic way to keep everything organized and actually track and accomplish the large goals.",
    confidence: "high",
    decidedOn: "2026-06-16",
  },
  {
    id: "dec-services-safety-net",
    title: "Build Services first as the income safety-net",
    decision:
      "Stand up the Services site in parallel to fund flagship development.",
    category: "launch",
    reasoning:
      "Lowest-risk path to first revenue (~3–5 weeks) while the flagship matures.",
    confidence: "medium",
    decidedOn: "2026-02-01",
  },
];

/* ---------------------------------------------------------------- roadmap */

export type CheckpointStatus = "upcoming" | "active" | "reached";

/**
 * Desirability of a branch outcome — how much we *want* this future, ordered
 * most→least desired. Drives the branch tint + emoji and the lane ordering.
 */
export type RoadmapDesirability = "desired" | "ok" | "avoid" | "avoid-strongly";

/** A single point on the roadmap — a trunk milestone or a branch sub-step. */
export interface RoadmapNode {
  id: string;
  title: string;
  description?: string;
  /** Trunk milestones carry reached/active/upcoming; branch nodes omit it. */
  status?: CheckpointStatus;
}

/**
 * How a branch behaves over time.
 *
 * These are not destinations you arrive at and then stop — they are things that
 * keep running once started, at varying intensity, often several at once. A
 * roadmap that draws them as terminal outcomes implies a choice between them
 * that is not really being made, so each branch declares its own kind.
 */
export type BranchKind = "ongoing" | "outcome";

/** One destiny fork off the trunk — a possible future path. */
export interface RoadmapBranch {
  /** Short key — "A" | "B" | "C" | "D". */
  id: string;
  name: string;
  /** Outcome marker emoji (🟢 🎮 🔴 ⚫). */
  emoji: string;
  desirability: RoadmapDesirability;
  /** 0 = most desired. Order/sort key for lanes and branch lists. */
  rank: number;
  /** The reflective note on this outcome. */
  description?: string;
  /**
   * Overrides the desirability-derived tint. Use when a branch's identity is
   * carried by its own colour rather than by how much it is wanted.
   */
  color?: string;
  /** Defaults to `ongoing` — see {@link BranchKind}. */
  kind?: BranchKind;
  /** Branch sub-steps (the desired path has several; avoid-paths may be empty). */
  nodes: RoadmapNode[];
}

/** The whole roadmap: a committed trunk that forks into destiny branches. */
export interface RoadmapPlan {
  trunkName: string;
  trunk: RoadmapNode[];
  branches: RoadmapBranch[];
}

export const ROADMAP_PLAN: RoadmapPlan = {
  trunkName: "Planning & Executive Center",
  trunk: [
    {
      id: "trunk-foundation",
      title: "Foundation & Architecture Optimized",
      description:
        "Domains, Entities, Hud, 4eyeCore, etc.",
      status: "active",
    },
    {
      id: "trunk-controller",
      title: "Controller v1 Usable",
      description:
        "Chat-with-visual-UI: Character, Planning, Chat (w/ context, actors, targets, entity panels ).",
      status: "active",
    },
    {
      id: "trunk-tbd",
      title: "TBD",
      description: "",
      status: "upcoming",
    },
    {
      id: "trunk-gameplay-core",
      title: "Gameplay, Memorization, Experimentation, Private Mode",
      description:
        "Core systems: the gameplay loop, memorization, an experimentation surface, and a private mode.",
      status: "upcoming",
    },
    {
      id: "trunk-power-experiments",
      title: "Power Experimentations",
      description: "Push the system hard — explore the upper limits of what it can do.",
      status: "upcoming",
    },
  ],
  branches: [
    {
      id: "A",
      name: "Business / Product",
      emoji: "🟢",
      desirability: "desired",
      rank: 0,
      kind: "ongoing",
      description:
        "The main line. Build 4eye into something people actually use to understand themselves and the systems they live inside — gamification and human-centered AI pointed at unlocking potential rather than at capturing attention. Teach in the open the whole way, because the teaching is part of the product and not marketing for it. Revenue matters here as the thing that buys independence: enough to keep the direction ours, fund the work that has no business case yet, and put real resources behind food, education, and government systems later.",
      nodes: [
        {
          id: "A-1",
          title: "Website/Vision, Teaching, Recordings",
        },
        {
          id: "A-2",
          title:
            "Planning Clarification Improvements & Incredibly effective AI development",
        },
        {
          id: "A-3",
          title:
            "4eye Release, Unicorn Support, Rapid Growth, World Traveling, Lots of money, Fame, etc",
        },
      ],
    },
    {
      id: "B",
      name: "Gameplay",
      emoji: "🎮",
      desirability: "ok",
      rank: 1,
      // Purple rather than the amber its "can do" rating would give it.
      // Gameplay is not a lukewarm version of the main line — it is its own
      // thing, and the colour should say that rather than rank it.
      color: "#8b5cf6",
      kind: "ongoing",
      description:
        "Can do, but this isn't the optimal human experience I can have, unless those are the rules but I do not believe they are, although that said… I'm still figuring it out myself.",
      nodes: [],
    },
    {
      id: "C",
      name: "Would rather not choose",
      emoji: "🔴",
      desirability: "avoid",
      rank: 2,
      kind: "ongoing",
      description:
        ":/, would rather not have this be the outcome, but I can adapt and play, I'm quite good at it.",
      nodes: [],
    },
    {
      id: "D",
      name: "Really don't want this",
      emoji: "⚫",
      desirability: "avoid-strongly",
      rank: 3,
      kind: "outcome",
      description: "AVOID",
      nodes: [],
    },
    {
      id: "E",
      name: "Neo",
      emoji: "🔵",
      desirability: "desired",
      rank: 4,
      color: "#3b82f6",
      kind: "ongoing",
      nodes: [],
    },
  ],
};

/**
 * Legacy track-based checkpoint timeline. Still consumed by the appRealm
 * Sequences page and the Dashboard "next milestone" tile; the Command Center
 * Roadmap view now renders {@link ROADMAP_PLAN} instead.
 */
export interface RoadmapCheckpoint {
  id: string;
  title: string;
  description: string;
  /** Relative offset in days from "now" (negative = past). */
  offsetDays: number;
  status: CheckpointStatus;
  track: "income" | "flagship" | "foundation";
}

export const ROADMAP_CHECKPOINTS: RoadmapCheckpoint[] = [
  {
    id: "cp-foundation",
    title: "Planning & architecture locked",
    description: "ECS entity model, HUD/navigation, and core tiles in place.",
    offsetDays: -7,
    status: "reached",
    track: "foundation",
  },
  {
    id: "cp-controller",
    title: "Controller v1 usable",
    description:
      "Chat-with-visual-UI: context, actors, targets, entity panels.",
    offsetDays: 7,
    status: "active",
    track: "flagship",
  },
  {
    id: "cp-services-site",
    title: "Services site MVP live",
    description: "Forked from 4eye scaffolding; outreach begins in parallel.",
    offsetDays: 21,
    status: "upcoming",
    track: "income",
  },
  {
    id: "cp-first-contracts",
    title: "First contracts landed",
    description: "1–2 small fixed-fee engagements — the income safety-net.",
    offsetDays: 35,
    status: "upcoming",
    track: "income",
  },
  {
    id: "cp-website",
    title: "4eye website launch-ready",
    description: "Marketing site with demos and signup flow.",
    offsetDays: 63,
    status: "upcoming",
    track: "flagship",
  },
  {
    id: "cp-app-v1",
    title: "4eye App v1",
    description: "Placeholders + core features; funding-ready artifacts.",
    offsetDays: 90,
    status: "upcoming",
    track: "flagship",
  },
];

/* --------------------------------------------------------- quest hierarchy */

export interface HierarchyLevel {
  rank: string;
  narrative: string;
  pm: string;
  description: string;
  depthRange: string;
}

export interface HierarchyConcept {
  name: string;
  description: string;
}

export const QUEST_HIERARCHY: {
  levels: HierarchyLevel[];
  concepts: HierarchyConcept[];
} = {
  levels: [
    {
      rank: "legend",
      narrative: "Legend",
      pm: "Vision",
      description:
        "The north-star: the single unifying purpose everything else serves.",
      depthRange: "6–7",
    },
    {
      rank: "campaign",
      narrative: "Campaign",
      pm: "Initiative",
      description:
        "Multi-quarter strategic thrust or business line (e.g. 4eye, Expanse Services).",
      depthRange: "5–6",
    },
    {
      rank: "storyline",
      narrative: "Storyline",
      pm: "Project",
      description:
        "A distinct product or capability within a campaign (e.g. AI Chat, Website).",
      depthRange: "4–5",
    },
    {
      rank: "quest",
      narrative: "Quest",
      pm: "Epic",
      description:
        "A major deliverable with a clear outcome, sized weeks–months.",
      depthRange: "3–4",
    },
    {
      rank: "objective",
      narrative: "Objective",
      pm: "Task",
      description:
        "A concrete, completable unit of work. Fits within a sprint.",
      depthRange: "2–3",
    },
    {
      rank: "action",
      narrative: "Action",
      pm: "Step",
      description:
        "A single atomic step, sub-task, or checklist item inside an objective.",
      depthRange: "1–2",
    },
  ],
  concepts: [
    {
      name: "Weight",
      description:
        "0–100 importance score. Drives sort order in Priorities and the Dashboard top-items list.",
    },
    {
      name: "Depth",
      description:
        "1–7 complexity. 1 = trivial step, 7 = full-domain overhaul touching many systems.",
    },
    {
      name: "Status",
      description:
        "idea → planned → active → blocked → review → done → archived",
    },
    {
      name: "Priority",
      description:
        "A strategic lens (e.g. Revenue & Runway, Engagement, UI/UX, Performance). Work items are linked to priorities via GoalLinks — separate from the hierarchy.",
    },
    {
      name: "GoalLink",
      description:
        "A weighted alignment edge from any work item to a Priority (or the north-star Legend). Shows what the work is serving and how strongly.",
    },
    {
      name: "Estimate",
      description:
        "Fibonacci story points (1, 2, 3, 5, 8, 13, 21) scoped to quests and objectives.",
    },
  ],
};
