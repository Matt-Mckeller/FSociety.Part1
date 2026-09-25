/**
 * Command Center — seed data (ECS fixtures).
 *
 * Full campaign hierarchy for the Plan tile. Narrative labels
 * (Legend / Campaign / Storyline / Quest / Objective) map to the shared ECS
 * Entity model so all views (Dashboard, Quests, Sprint, etc.) render correctly.
 */

import type {
  Entity,
  GoalLink,
  ProgressTrait,
  Relationship,
  StatusValue,
  SymbolColor,
  SymbolName,
  WorkRank,
} from "@4eye/types";
import type { PlanningData } from "../../../model";
import { planProcesses } from "./plan-processes";

const DAY = 1000 * 60 * 60 * 24;
const now = Date.now();

/* ------------------------------------------------------------------ helpers */

let relSeq = 0;
function edge(
  from: Entity,
  to: Entity,
  order: number,
  relationType = "child-of",
): Relationship {
  relSeq += 1;
  return {
    id: `cc-rel-${relSeq}`,
    fromId: from.id,
    fromType: from.type,
    toId: to.id,
    toType: to.type,
    relationType,
    order,
    createdAt: now,
  };
}

/** Terse ProgressTrait authoring helper: done %, planned %, [at, label, note?][]. */
function prog(
  done: number,
  planned: number,
  milestones: Array<[number, string, string?]>,
): ProgressTrait {
  return {
    kind: "progress",
    done,
    planned,
    milestones: milestones.map(([at, label, note]) => ({ at, label, note })),
  };
}

function camp(
  id: string,
  name: string,
  summary: string,
  weight: number,
  status: StatusValue,
  symbol: SymbolName,
  symbolColor: SymbolColor,
  allocation = 0,
  badge?: string,
  progress?: ProgressTrait,
): Entity {
  return {
    id: `cc-campaign-${id}`,
    slug: id,
    type: "campaign",
    name,
    symbol,
    symbolColor,
    traits: [
      { kind: "status", value: status },
      { kind: "weight", value: weight },
      { kind: "depth", value: 6 },
      ...(progress ? [progress] : []),
    ],
    meta: {
      work: { rank: "initiative" as WorkRank },
      summary,
      ...(allocation ? { allocation } : {}),
      ...(badge ? { badge } : {}),
    },
    createdAt: now,
  };
}

function story(
  id: string,
  name: string,
  summary: string,
  weight: number,
  status: StatusValue,
  symbol: SymbolName = "Movie",
  progress?: ProgressTrait,
): Entity {
  return {
    id: `cc-story-${id}`,
    slug: id,
    type: "storyline",
    name,
    symbol,
    symbolColor: "blue",
    traits: [
      { kind: "status", value: status },
      { kind: "weight", value: weight },
      { kind: "depth", value: 5 },
      ...(progress ? [progress] : []),
    ],
    meta: { work: { rank: "project" as WorkRank }, summary },
    createdAt: now,
  };
}

function quest(
  id: string,
  name: string,
  summary: string,
  weight: number,
  status: StatusValue,
  points: 1 | 2 | 3 | 5 | 8 | 13 | 21 = 5,
  symbol: SymbolName = "Diamond",
  progress?: ProgressTrait,
): Entity {
  return {
    id: `cc-quest-${id}`,
    slug: id,
    type: "quest",
    name,
    symbol,
    symbolColor: "purple",
    traits: [
      { kind: "status", value: status },
      { kind: "weight", value: weight },
      { kind: "estimate", points },
      ...(progress ? [progress] : []),
    ],
    meta: { work: { rank: "epic" as WorkRank }, summary },
    createdAt: now,
  };
}

function obj(
  id: string,
  name: string,
  weight: number,
  status: StatusValue,
  points: 1 | 2 | 3 | 5 | 8 | 13 | 21 = 3,
  due?: number,
): Entity {
  return {
    id: `cc-obj-${id}`,
    slug: id,
    type: "objective",
    name,
    symbol: "Circle",
    symbolColor: "teal",
    traits: [
      { kind: "status", value: status },
      { kind: "weight", value: weight },
      { kind: "estimate", points },
      ...(due ? [{ kind: "schedule" as const, due }] : []),
    ],
    meta: { work: { rank: "task" as WorkRank } },
    createdAt: now,
  };
}

/** Leaf implementation step — what My Queue swipes (Queued → In Hand → Executed). */
function act(
  id: string,
  name: string,
  summary: string,
  weight: number,
  status: StatusValue,
  points: 1 | 2 | 3 | 5 | 8 | 13 | 21 = 5,
  symbol: SymbolName = "Lightning",
  symbolColor: SymbolColor = "amber",
): Entity {
  return {
    id: `cc-action-${id}`,
    slug: id,
    type: "action",
    name,
    symbol,
    symbolColor,
    traits: [
      { kind: "status", value: status },
      { kind: "weight", value: weight },
      { kind: "estimate", points },
    ],
    meta: { work: { rank: "step" as WorkRank }, summary },
    createdAt: now,
  };
}

/* ------------------------------------------------------------------- legend */

const legend: Entity = {
  id: "cc-legend",
  slug: "expanse-empire",
  type: "legend",
  name: "Gamification of Learning, Education, Work & Life",
  symbol: "Star",
  symbolColor: "amber",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 100 },
    { kind: "depth", value: 7 },
    {
      kind: "goalDirected",
      outcome:
        "Help people understand the game they're playing, master their real-life controller, and unlock their potential.",
    },
  ],
  meta: {
    work: { rank: "vision" as WorkRank },
    summary:
      "Transform how humanity learns, works, and lives — unlocking better outcomes across learning, work, health, and life.",
  },
  createdAt: now,
};

/* ---------------------------------------------------------------- campaigns */

const campaignWebsite = camp(
  "4eye-website",
  "4eye Website & Core Features",
  "The public-facing 4eye platform: marketing site, feature tiles, and product surface.",
  92,
  "active",
  "Place",
  "blue",
  45,
  undefined,
  prog(55, 25, [
    [40, "MVP", "Marketing site + core tiles render and navigate."],
    [70, "Beta", "Demos, signup flow, and live feature surfaces."],
    [95, "Launch", "Polished, conversion-ready public launch."],
  ]),
);

const campaignCore = camp(
  "4eye-core",
  "4eye Core",
  "Foundational systems: spatial layout, character, planning, chat, tiles, entities.",
  90,
  "active",
  "Diamond",
  "purple",
  40,
  undefined,
  prog(62, 22, [
    [35, "MVP", "Spatial layout, HUD, and core tiles wired together."],
    [65, "v2", "Entity model, planning, and chat foundations in place."],
    [90, "v3", "Full tile suite, AI chat, and resource systems complete."],
  ]),
);

const campaignLife = camp(
  "life-irl",
  "Campaign Life / IRL",
  "Real-world life systems: health, fitness, finance, relationships, devices, and love.",
  74,
  "planned",
  "Heart",
  "green",
  5,
);

const campaignEducation = camp(
  "education",
  "Campaign Education",
  "Education-specific learning features: chat, feedback, transformations, presentations, and library.",
  80,
  "planned",
  "AutoStories",
  "amber",
  5,
);

const campaignWork = camp(
  "work",
  "Campaign Work App / Process + Vision",
  "Work productivity app and process tooling with a long-term AI-augmented vision.",
  65,
  "idea",
  "Pipeline",
  "teal",
);

const campaignServices = camp(
  "expanse-services",
  "Expanse Services — Freelance Platform & Shop",
  "Consulting / services site and freelance platform — fastest path to first revenue.",
  70,
  "planned",
  "Pipeline",
  "teal",
  5,
);

const campaignMarketing = camp(
  "marketing",
  "Campaign Marketing App / Process + Vision",
  "Marketing automation, campaign management, and growth tooling.",
  58,
  "idea",
  "Image",
  "pink",
);

const campaignGamification = camp(
  "gamification-irl",
  "Campaign Gamification of IRL",
  "Universal gamification engine: rewards, achievements, progress, and engagement for life.",
  55,
  "idea",
  "Lightning",
  "amber",
);

const campaignMentalHealth = camp(
  "mental-health",
  "Campaign Mental Health",
  "Tools and systems for mental well-being, awareness, and support.",
  50,
  "idea",
  "Moon",
  "purple",
);

const campaignAion = camp(
  "aion",
  "Campaign AION",
  "AION — the long-horizon initiative.",
  45,
  "idea",
  "Star",
  "slate",
);

const campaignBrainwaveIntegrationGamification = camp(
  "BrainwaveIntegration-gamification-irl",
  "Brainwave Integration Gamification of IRL",
  "Brain-computer interface gamification: neural XP, biometric triggers, and direct-to-mind achievement unlocks for real life.",
  62,
  "idea",
  "Lightning",
  "purple",
);

const campaignGlassesGamification = camp(
  "glasses-gamification-irl",
  "Glasses Gamification of IRL",
  "AR glasses overlay: real-world XP counters, quest markers, NPC indicators, and stat bars anchored to physical space.",
  60,
  "idea",
  "Square",
  "teal",
);

const campaignTutorialIsland = camp(
  "tutorial-island",
  "Tutorial Island",
  "A dedicated onboarding world for new players — experience-based learning and a floating mechanical island nation in the ocean.",
  75,
  "planned",
  "Place",
  "amber",
);

const campaignOther = camp(
  "unorganized",
  "Campaign Unorganized Projects / Other",
  "Concept-stage ideas and unsorted initiatives not yet prioritized or implemented.",
  20,
  "idea",
  "Circle",
  "slate",
);

const CLASSIFIED_BADGE = "Classified";

const campaignShield4AI = camp(
  "shield4ai",
  "Shield4.AI",
  "Military-grade AI defense systems: physical product security, identity, OS hardening, and private mode.",
  85,
  "planned",
  "Moon",
  "slate",
  0,
  CLASSIFIED_BADGE,
);

const campaignSwordAI = camp(
  "swordai",
  "Sword.AI",
  "Offensive AI capabilities and threat intelligence for authorized defense and security research.",
  80,
  "planned",
  "Lightning",
  "blue",
  0,
  CLASSIFIED_BADGE,
);

/* ================================================== Shield4.AI Storylines */

const storyPhysicalProductDefense = story("shield-physical-product-defense", "Physical Product Defense", "Hardening physical products against tampering, intrusion, and adversarial access.", 82, "planned", "Pipeline");
const storyPasswordSystem          = story("shield-password-system",          "Password System",          "Military-grade password management, entropy, rotation, and breach detection.",   80, "planned", "Diamond");
const storyOperatingSystem         = story("shield-operating-system",         "Operating System",         "Hardened OS layer: secure boot, sandboxing, and kernel-level integrity.",         78, "planned", "Square");
const storyShieldLearning          = story("shield-learning",                 "Learning",                 "Security education, threat awareness training, and adversarial pattern study.",   75, "planned", "AutoStories");
const storyPrivateMode             = story("shield-private-mode",             "Private Mode",             "Full private mode: zero-trace sessions, anonymized data paths, and kill-switch.", 84, "planned", "Moon");

const shield4AIStories = [
  storyPhysicalProductDefense,
  storyPasswordSystem,
  storyOperatingSystem,
  storyShieldLearning,
  storyPrivateMode,
];

/* ============================================== Tutorial Island Storylines */

const storyExperienceBasedLearning = story(
  "tutorial-experience-based-learning",
  "Experience Based Learning",
  "Learn by doing: quests, trials, and challenges replace passive instruction — knowledge earned through lived action.",
  76,
  "planned",
  "Movie",
);

const storyFloatingCountry = story(
  "tutorial-floating-submerged-country",
  "Floating & Submerged Country",
  "A new mechanical nation built on and beneath the ocean surface — engineering marvel, sovereign territory, and Tutorial Island's home world.",
  72,
  "idea",
  "Place",
);

const tutorialIslandStories = [
  storyExperienceBasedLearning,
  storyFloatingCountry,
];

const campaigns = [
  campaignWebsite,
  campaignCore,
  campaignLife,
  campaignEducation,
  campaignWork,
  campaignServices,
  campaignMarketing,
  campaignGamification,
  campaignMentalHealth,
  campaignAion,
  campaignBrainwaveIntegrationGamification,
  campaignGlassesGamification,
  campaignTutorialIsland,
  campaignShield4AI,
  campaignSwordAI,
  campaignOther,
];

/* ======================================================= 4eye Website Stories */

const storyIrlObservability = story("irl-observability", "IRL Observability", "Observe and surface real-world context and signals within the platform.", 78, "planned", "Wave");
const storyLearningChat = story("learning-chat-web", "Learning Chat", "Conversational learning interface surfaced on the website.", 85, "active", "Wave");
const storyLearningFeedback = story("learning-feedback-web", "Learning Feedback", "Feedback loops and signals to improve and adapt learning experiences.", 76, "planned", "Heart");
const storyLearning = story("learning-web", "Learning", "Core learning experience: playback, media, and content delivery.", 88, "active", "Movie");
const questLearningAttention = quest("learning-attention", "Learning Attention", "Attention tracking, focus management, and deep-work tools.", 70, "planned", 8, "Moon");
const questLearningEngagement = quest("learning-engagement-web", "Learning Engagement", "Engagement mechanics that keep learners active and invested.", 72, "planned", 8, "Lightning");
const questLearningToLearn = quest("learning-to-learn", "Learning To Learn", "Meta-skills and frameworks that teach users how to learn better.", 65, "planned", 5, "AutoStories");
const questLessons = quest("lessons", "Lessons", "Individual lesson creation, structure, sequencing, and playback within the learning experience.", 80, "planned", 8, "Movie");
const questHumanOS = quest("human-os", "Human Operating System", "The user's internal OS: self-awareness, mental models, defaults, and operating principles.", 75, "planned", 8, "Person");

// ── Content Tiles ─────────────────────────────────────────────────────────────
const storyContentTiles = story("content-tiles", "Content Tiles", "Website content tiles: security, gamification, projects, knowledge, and work vision pages.", 75, "active", "Tile");
const questContentSecurityPrivacy  = quest("content-security-privacy",  "Security & Privacy",   "Auth, access control, data privacy, and compliance foundations.",                  82, "active",  8, "Moon");
const questContentGamification     = quest("content-gamification",      "Gamification",         "Gamification layer: badges, XP, streaks, and leaderboards.",                     68, "planned", 8, "Star");
const questContentProjectsFeatures = quest("content-projects-features", "Projects & Features",  "Projects overview and feature planning tile.",                                   75, "active",  8, "Diamond");
const questContentKnowledgeBase    = quest("content-knowledge-base",    "Knowledge Base",       "Structured knowledge repository: docs, guides, and reference material.",         62, "planned", 5, "AutoStories");
const questContentWorkVision       = quest("content-work-vision",       "Work Vision",          "Work-mode component views and page layouts surfaced within the platform.",       60, "planned", 5, "Image");
// ─────────────────────────────────────────────────────────────────────────────

// ── Brand intro / marketing video (Create tile “See” cut → Plan queue) ───────
const storyBrandIntro = story(
  "brand-intro-see",
  "Brand Intro — See",
  "4eye / Expanse brand intro (~75s master, cut to 6s / 15s / 30s). Same fixture as the Create tile and marketing-video-see plan.",
  94,
  "active",
  "Movie",
  prog(28, 40, [
    [20, "Pre-prod", "Style bible + reference library locked."],
    [55, "Master", "75s hero cut assembled."],
    [85, "Cuts", "6s / 15s / 30s distributed."],
    [100, "Live", "Embedded on See page + social."],
  ]),
);

const websiteStories = [
  storyBrandIntro,
  storyIrlObservability,
  storyLearningChat,
  storyLearningFeedback,
  storyLearning,
  storyContentTiles,
];

/* ======================================================= 4eye Core Stories */

// ── Spatial Layout / Web OS / Web 4 ──────────────────────────────────────────
const storySpatialLayout = story("spatial-layout", "Spatial Layout / Web OS / Web 4", "Web OS layer: spatial navigation, domain system, maps, and context.", 90, "active", "Square");

const questDomainSystem   = quest("domain-system",   "Domain System",                 "Domain routing, namespacing, and context resolution.",              85, "active",  8, "Pipeline");
const questMap            = quest("map",              "Map",                           "Spatial map of the product — rooms, zones, and navigation nodes.", 78, "planned", 8, "Place");
const questNavigation     = quest("navigation",       "Navigation Systems",            "Primary and secondary navigation across the Web OS.",             82, "active",  8, "Arrow");
const questContext        = quest("context",          "Context",                       "Context layer: what is currently active, in scope, and visible.", 80, "planned", 5, "Circle");
const questActionBars     = quest("action-bars",      "Action Bars",                  "Global and contextual action bars across surfaces.",               74, "active",  5, "Pipeline");
const questPipelines      = quest("pipelines-layer",  "Pipelines & Transformation Layers", "Data transformation, AI pipelines, and processing layers.",  76, "planned", 13, "Pipeline");

// ── HUD Layout ────────────────────────────────────────────────────────────────
const storyHudLayout = story(
  "hud-layout",
  "HUD Layout",
  "HUD shell and layout system: overlay framing, resource bars, action bars, and surface composition.",
  89,
  "active",
  "Square",
  prog(78, 12, [
    [40, "MVP", "Overlay shell + resource/action bars usable end-to-end."],
    [70, "v2", "Surface composition, HUD nav, and intro polish."],
    [90, "v3", "Card skins, spatial nav toggle, and full theming."],
  ]),
);

const questHudShell    = quest("hud-shell",     "HUD Shell & Overlay Framing",   "Overlay framing, layering, and the full-screen entity overlay pattern.", 86, "active",  8, "Square",
  prog(85, 10, [[50, "MVP", "Overlay opens, frames, and closes reliably."], [80, "v2", "Entity overlay pattern reused across Scene Studio + map."]]));
const questResourceBars = quest("resource-bars", "Resource & Action Bars",        "Global resource readouts and global/contextual action bars.",          80, "active",  5, "Pipeline",
  prog(72, 18, [[45, "MVP", "Static resource bars render."], [75, "v2", "Contextual action bars wired to surfaces."], [95, "v3", "Animated, theme-reactive bars."]]));

// ── Character / Profiles / User ───────────────────────────────────────────────
const storyCharacter = story("character-profiles-user", "Character / Profiles / User", "Character system, rich user profiles, auth, and roles.", 88, "active", "Person");

const questGrowthStats    = quest("growth-stats",     "Growth & Character Stats / Attributes", "XP, stats, attributes, and character progression system.", 85, "active", 8, "Lightning");
const questDataModels     = quest("data-models",      "Data Models",                   "Core data models for user, character, and profile entities.",      80, "active", 5, "Diamond");
const questAuthAccess     = quest("auth-access",      "Authentication / Access Control & Roles", "Auth flows, RBAC, role definitions, and session management. Currently leaning toward Clerk or Tongue.js rather than rolling our own.", 88, "active", 8, "Pipeline");

// ── Planning / Directional Context ───────────────────────────────────────────
const storyPlanningContext = story("planning-context", "Planning / Directional Context", "Goals, projects, and directional context for the app.", 82, "active", "Star");

const questGoalsCore      = quest("goals-core",       "Goals",                         "Goal-setting system: north-stars, milestones, and OKRs.",         80, "active",  8, "Star");
const questProjectsCore   = quest("projects-core",    "Projects",                      "Project management: epics, sprints, backlogs, and boards.",        82, "active", 13, "Diamond");

const objProjectModels    = obj("project-models", "Models", 75, "active", 5);

// ── Chat System Foundations ───────────────────────────────────────────────────
const storyChatFoundations = story("chat-foundations", "Chat System Foundations", "Core chat architecture: UI, logic, pipelines, and context.", 90, "active", "Wave");

const questChatUi         = quest("chat-ui",          "UI(s)",                         "Chat interfaces across surfaces — compact, full, and embedded.",  85, "active",  8, "Square");
const questChatLogic      = quest("chat-logic",       "Logic",                         "Message handling, state, threading, and conversation logic.",      82, "active",  8, "Pipeline");
const questChatPipelines  = quest("chat-pipelines",   "Pipelines",                     "AI processing pipelines feeding into chat responses.",            80, "planned", 13, "Pipeline");
const questChatContext    = quest("chat-context",     "Context",                       "Context injection: user profile, history, RAG, and memory.",       84, "active",  8, "Circle");

// ── AI Chat: Standard ─────────────────────────────────────────────────────────
const storyAiChatStd = story("ai-chat-standard", "AI Chat: Standard", "Standard conversational AI chat experience.", 88, "active", "Wave");

const questChatInput      = quest("chat-input",       "Input",                         "Chat input component: text, voice, attachments, and actions.",    84, "active",  8, "Arrow");
const questChatFeedback   = quest("chat-feedback",    "Feedback",                      "In-chat feedback: reactions, ratings, and correction flows.",      72, "planned",  5, "Heart");

// ── AI Chat: Live ─────────────────────────────────────────────────────────────
const storyAiChatLive = story("ai-chat-live", "AI Chat: Live", "Real-time collaborative and live AI chat experience.", 74, "planned", "Lightning");

// ── Documentation & Records ───────────────────────────────────────────────────
const storyDocs = story("documentation-records", "Documentation & Records", "Notes, recaps, video creation, and version control for knowledge.", 66, "planned", "AutoStories");

const questNotes          = quest("notes",            "Notes",                         "Functional note-taking with markdown, auto-save, and linking.",    70, "planned",  5, "AutoStories");
const questRecaps         = quest("recaps",           "Recaps",                        "Auto-generated and manual session / meeting recaps.",              62, "planned",  5, "Movie");
const questVideoVcs       = quest("video-vcs",        "Video Creation, VCS",           "Screen recording, video creation, and version control.",          58, "idea",     8, "Movie");

// ── Focus Music App ───────────────────────────────────────────────────────────
const storyFocusMusic = story("focus-music", "Focus Music App", "Ambient and focus-enhancing music player integrated into the learning surface.", 55, "idea", "Wave");

// ── Tiles & Tile System ───────────────────────────────────────────────────────
const storyTileSystem = story("tiles-system", "Tile Component & Tile System", "Full tile framework: tile types, config, events, and the tile registry.", 85, "active", "Tile");

const questTileCommunication = quest("tile-communication", "Communication",            "Communication tile: messages, threads, and notifications.",        70, "planned", 5, "Wave");
const questTileCreate        = quest("tile-create",        "Create",                   "Creation tile: content, media, and artifact authoring.",           72, "planned", 8, "Image");
const questTilePlanning      = quest("tile-planning",      "Planning",                 "Planning tile: improved planning system for life, business, and edu.", 80, "active", 13, "Diamond");
const questTileScheduling    = quest("tile-scheduling",    "Scheduling",               "Scheduling tile: calendar, reminders, and time management.",       68, "planned", 8, "Circle");
const questTileSocial        = quest("tile-social",        "Social",                   "Social tile: feeds, connections, and community features.",         64, "planned", 5, "Group");
const questTileObservers     = quest("tile-observers",     "Technical: Observers / Events", "Event bus, observer hooks, and reactive tile communication.", 75, "active",  5, "Pipeline");
const questTileConfig        = quest("tile-config",        "Technical: Config",        "Tile configuration system: schemas, presets, and persistence.",    72, "active",  5, "Pipeline");
const questTileCharacter     = quest("tile-character",     "Character",                "Character tile: stats, equipped items, progression, and identity surface.", 82, "active",  13, "Person",
  prog(68, 20, [[45, "MVP", "Stats + equipped items render from the entity model."], [75, "v2", "Progression and identity surface complete."], [95, "v3", "Live updates and full theming."]]));
const questTileSpellbook     = quest("tile-spellbook",     "Spellbook",               "Spellbook tile: spell library, equip flows, and action management.", 78, "active",  8, "AutoStories",
  prog(50, 30, [[50, "MVP", "Spell library browsable; basic equip flow."], [85, "v2", "Full equip + action management."]]));
const questTileMap           = quest("tile-map",           "Map",                     "Map tile: full-screen spatial navigation, realm exploration, and context overlay.", 76, "active", 8, "Place",
  prog(88, 8, [[50, "MVP", "Full-screen map navigates between zones."], [80, "v2", "Realm exploration + context overlay."], [95, "v3", "Animated transitions + minimap."]]));
const questTileHome          = quest("tile-home",          "Home",                    "Home tile: landing surface, mascot, and realm entry experience.",   74, "active",  8, "Square",
  prog(82, 10, [[40, "MVP", "Landing surface + realm entry."], [70, "v2", "Mascot + intro gate experience."], [95, "v3", "Personalized, dynamic home."]]));
const questTileProfiles      = quest("tile-profiles",      "Profiles",                "Profiles tile: user profiles, connections, and identity browsing.", 70, "active",  8, "Group");
const questTileLearning      = quest("tile-learning",      "Learning",                "Learning tile: content playback, curriculum, and in-app sessions.", 68, "planned", 13, "Movie");
const questTileGamification  = quest("tile-gamification",  "Gamification",            "Gamification tile: achievements, leaderboards, XP, and rewards.",  66, "planned",  8, "Lightning");
const questTileInventory     = quest("tile-inventory",     "Inventory",               "Inventory tile: items, assets, and owned content management.",      60, "planned",  5, "Diamond");

const objLotties             = obj("lotties",          "Lotties & Themeable Lotties",  78, "planned", 5);
const objPlanningSystem      = obj("planning-system",  "Improved Planning System — life, business, and edu", 82, "active", 8, now + 14 * DAY);
const objSocialMedia         = obj("social-media",     "Social Media",                 60, "idea",    5);

// ── Entities ──────────────────────────────────────────────────────────────────
const storyEntities = story("entities-core", "Entities", "Core entity system: sequences, targets, audiences, and users.", 80, "active", "Diamond");

const questSequences  = quest("sequences",  "Sequences",  "Ordered entity sequences for flows, paths, and curricula.",        74, "planned", 5);
const questTargets    = quest("targets",    "Targets",    "Target entities: goals, milestones, and outcome definitions.",      76, "planned", 5, "Star");
const questAudiences  = quest("audiences",  "Audiences",  "Audience segmentation, groups, and targeted content delivery.",    70, "planned", 5, "Group");
const questUsers      = quest("users",      "Users",      "User entity model, lifecycle, preferences, and identity.",         82, "active",  8, "Person");

// ── Goals ─────────────────────────────────────────────────────────────────────
const storyGoals = story("goals", "Goals", "Goal management at the platform level — from vision to daily objectives.", 80, "active", "Star");

// ── Projects ─────────────────────────────────────────────────────────────────
const storyProjects = story("projects", "Projects", "Project entity: models, boards, and lifecycle management.", 78, "active", "Diamond");
const questProjModels = quest("proj-models", "Models", "Data models for projects, epics, tasks, and relationships.", 75, "active", 5, "Pipeline");


// ── Resource Bars & Resource System ────────────────────────────────────────────
const storyResourceSystem = story(
  "resource-system",
  "Resource Bars & Resource System",
  "Game-style resource bars (HP, mana, stamina, XP) with underlying resource engine, types, and character/tile integration. Depends on Character tile and Tile System.",
  62,
  "planned",
  "Wave",
);

const questResourceBarUi     = quest("resource-bar-ui",     "Resource Bar UI",       "Visual bar components: HP, mana, stamina, XP — animatable and themeable.",      65, "planned",  8, "Wave");
const questResourceEngine    = quest("resource-engine",     "Resource Engine",       "Resource types, caps, regen, depletion, and persistence logic.",                 62, "planned", 13, "Pipeline");
const questResourceCharacter = quest("resource-character",  "Character Integration", "Link resource values to character stats and growth attributes.",                 60, "planned",  8, "Person");
const questResourceTile      = quest("resource-tile",       "Tile Surface",          "Surface resource bars in the Character tile, HUD overlay, and tile headers.",   58, "planned",  8, "Tile");

const coreStoriesByQuest: Record<string, { story: Entity; quests: { q: Entity; objs?: Entity[] }[] }> = {
  spatial:    { story: storySpatialLayout,   quests: [{ q: questDomainSystem }, { q: questMap }, { q: questNavigation }, { q: questContext }, { q: questActionBars }, { q: questPipelines }] },
  hudlayout:  { story: storyHudLayout,       quests: [{ q: questHudShell }, { q: questResourceBars }] },
  character:  { story: storyCharacter,       quests: [{ q: questGrowthStats }, { q: questDataModels }, { q: questAuthAccess }] },
  planning:   { story: storyPlanningContext, quests: [{ q: questGoalsCore }, { q: questProjectsCore, objs: [objProjectModels] }] },
  chatfound:  { story: storyChatFoundations, quests: [{ q: questChatUi }, { q: questChatLogic }, { q: questChatPipelines }, { q: questChatContext }] },
  aichat:     { story: storyAiChatStd,       quests: [{ q: questChatInput }, { q: questChatFeedback }] },
  aichatlive: { story: storyAiChatLive,      quests: [] },
  docs:       { story: storyDocs,            quests: [{ q: questNotes }, { q: questRecaps }, { q: questVideoVcs }] },
  music:      { story: storyFocusMusic,      quests: [] },
  tiles:      { story: storyTileSystem,      quests: [
    { q: questTileCharacter },
    { q: questTileSpellbook },
    { q: questTileMap },
    { q: questTileHome },
    { q: questTileProfiles },
    { q: questTileLearning },
    { q: questTileGamification },
    { q: questTileInventory },
    { q: questTileCommunication },
    { q: questTileCreate, objs: [objLotties] },
    { q: questTilePlanning, objs: [objPlanningSystem] },
    { q: questTileScheduling },
    { q: questTileSocial, objs: [objSocialMedia] },
    { q: questTileObservers },
    { q: questTileConfig },
  ]},
  entities:   { story: storyEntities,        quests: [{ q: questSequences }, { q: questTargets }, { q: questAudiences }, { q: questUsers }] },
  goals:      { story: storyGoals,           quests: [] },
  projects:   { story: storyProjects,        quests: [{ q: questProjModels }] },
  resources:  { story: storyResourceSystem,   quests: [{ q: questResourceBarUi }, { q: questResourceEngine }, { q: questResourceCharacter }, { q: questResourceTile }] },
};

const coreStories = Object.values(coreStoriesByQuest).map((v) => v.story);
const coreQuests  = Object.values(coreStoriesByQuest).flatMap((v) => v.quests.map((q) => q.q));
const coreObjs    = Object.values(coreStoriesByQuest).flatMap((v) => v.quests.flatMap((q) => q.objs ?? []));

/* ====================================================== Life / IRL Stories */

const storyHealth         = story("health",           "Health",                       "Physical health tracking, habits, and wellness systems.",           70, "idea",    "Heart");
const storyFitness        = story("fitness",          "Fitness",                      "Fitness goals, workout tracking, and progress.",                    68, "idea",    "Lightning");
const storyFinance        = story("finance-wealth",   "Finance & Wealth",             "Personal finance, budgeting, investments, and wealth tracking.",    72, "idea",    "Star");
const storyRelationships  = story("relationships",    "Relationships",                "Relationship health, CRM for life, and social connections.",        66, "idea",    "Group");
const storyHome           = story("home-environment", "Home & Environment",           "Home management, environment design, and living spaces.",           60, "idea",    "Place");
const storyFun            = story("fun-entertainment","Fun & Entertainment",          "Entertainment tracking, hobbies, and leisure activities.",          58, "idea",    "Movie");
const storyGlasses        = story("glasses",          "Glasses Integrations",         "AR glasses integration for real-world overlays and interactions.", 64, "idea",    "Square");
const storyRobots         = story("robots",           "Robots",                       "Observer and companion robot integrations.",                        55, "idea",    "Person");
const storyDevices        = story("devices",          "Devices",                      "Device integrations: input action bars and hall pass systems.",     60, "idea",    "Pipeline");
const storyObservability  = story("observability",    "Observability / Actions",      "IRL observability and action triggers across life domains.",        65, "planned", "Wave");
const storyLove           = story("love",             "Love",                         "Relationship and love — personal connections and partnership.",     50, "idea",    "Heart");

const questObservers  = quest("robot-observers",   "Observers / Companions",         "AI observers and companion robots that assist in real life.",       55, "idea", 8, "Person");
const questInputBars  = quest("input-action-bars", "Input Action Bars / Devices",   "Physical input bars and device-based action triggers.",            58, "idea", 5, "Arrow");
const questHallPass   = quest("hall-pass",         "Hall Pass Systems",             "Hall pass systems for device access and permission management.",   52, "idea", 5, "Pipeline");

/*
  Systems-scale domains. These sit at a different altitude from the rest of the
  life stories — not "my health" but the systems everyone is inside of. They
  enter as ideas, which puts them in the Later lane where a backlog of things
  this size honestly belongs.

  They are also the outward half of the Sad emotion lens on the character
  surface (education, government, society); having them as real backlog entries
  rather than only as sentiment is the point.
*/
const storyFoodSystems    = story("food-systems",     "Food Systems",                 "How food is produced, moved, priced, and wasted — and what a better loop looks like.", 70, "idea", "Place");
const storyGovernment     = story("government",       "Government",                   "Institutions built for a world that has already changed. Legibility, participation, and accountability.", 68, "idea", "Group");
const storyEduSystems     = story("edu-systems",      "EDU Systems",                  "Education as a system rather than a product: what gets taught, what does not, and who decides.", 76, "idea", "AutoStories");

const systemsStories = [storyFoodSystems, storyGovernment, storyEduSystems];

const lifeStories = [
  storyHealth, storyFitness, storyFinance, storyRelationships,
  storyHome, storyFun, storyGlasses, storyRobots,
  storyDevices, storyObservability, storyLove,
  ...systemsStories,
];

/* ====================================================== Education Stories */

const storyEduChat          = story("edu-learning-chat",          "Learning Chat",            "Education-specific conversational learning interface.",              85, "planned", "Wave");
const storyEduFeedback      = story("edu-learning-feedback",      "Learning Feedback",        "Feedback and assessment loops within the education context.",        78, "planned", "Heart");
const storyEduTransform     = story("edu-learning-transformations","Learning Transformations", "Content transformations: text → visual, audio → notes, etc.",       80, "planned", "Movie");
const storyEduInput         = story("edu-learning-input",         "Learning Input",           "Input modalities for learning: voice, handwriting, and drag.",       72, "planned", "Arrow");
const storyEduPresentations = story("edu-presentations",          "Generate Presentations",   "AI-generated interactive presentations with live view and actions.", 76, "planned", "Image");
const storyEduLibrary       = story("edu-library",                "Library / Books",          "Book library, reading tracker, and curriculum resource system.",     70, "planned", "AutoStories");
const storyEduHomework      = story("edu-homework",               "Homework Generation",      "AI homework generation, assignment management, and grading assist.", 74, "planned", "Diamond");

const eduStories = [
  storyEduChat, storyEduFeedback, storyEduTransform, storyEduInput,
  storyEduPresentations, storyEduLibrary, storyEduHomework,
];

/* ---------------------------------------------------------------- priorities */

/**
 * Lenses (priority entities) split into two kinds via `meta.lensKind`:
 *  - "value" lenses are the *ends* — what we're creating / the mission direction
 *    (e.g. Unlocking Potential, Engagement, Revenue). They justify work.
 *  - "craft" lenses are the *means* — cross-cutting quality disciplines every
 *    artifact should satisfy (e.g. UI/UX, Architecture, Security). They evaluate work.
 * The Lenses view groups by `lensKind` and ranks within each group by weight.
 */

/* ---- value lenses (ends) ---- */

const priorityPotential: Entity = {
  id: "cc-priority-potential",
  slug: "unlocking-potential",
  type: "priority",
  name: "Unlocking, Multiplying & Optimally Reaching Potential",
  symbol: "Sun",
  symbolColor: "amber",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 98 },
    { kind: "goalDirected", outcome: "Maximally unlock and multiply human + AI potential — help people reach further than they otherwise could." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "value",
    summary: "Does this help someone — or the system itself — reach, multiply, or optimally apply their potential?",
  },
  createdAt: now,
};

const priorityMoney: Entity = {
  id: "cc-priority-money",
  slug: "revenue-runway",
  type: "priority",
  name: "Revenue & Runway",
  symbol: "Star",
  symbolColor: "green",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 88 },
    { kind: "goalDirected", outcome: "Generate income fast enough to extend runway and fund continued development." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "value",
    summary: "Does this work move us toward first revenue or extend how long we can operate?",
  },
  createdAt: now,
};

const priorityEngagement: Entity = {
  id: "cc-priority-engagement",
  slug: "engagement",
  type: "priority",
  name: "Engagement",
  symbol: "Heart",
  symbolColor: "pink",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 76 },
    { kind: "goalDirected", outcome: "Keep users active, invested, and returning — learning is only sticky when it's compelling." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "value",
    summary: "Does this work make the product more compelling, habit-forming, or emotionally resonant?",
  },
  createdAt: now,
};

/* ---- craft lenses (means) ---- */

const priorityUiux: Entity = {
  id: "cc-priority-uiux",
  slug: "ui-ux",
  type: "priority",
  name: "UI / UX",
  symbol: "Diamond",
  symbolColor: "purple",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 84 },
    { kind: "goalDirected", outcome: "The interface is clear, intuitive, and aesthetically coherent." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "craft",
    summary: "Does this work improve clarity, navigation, visual quality, or interaction design?",
  },
  createdAt: now,
};

const priorityArchitecture: Entity = {
  id: "cc-priority-architecture",
  slug: "architecture",
  type: "priority",
  name: "Architecture",
  symbol: "Square",
  symbolColor: "slate",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 78 },
    { kind: "goalDirected", outcome: "The system is well-structured, modular, and maintainable." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "craft",
    summary: "Does this keep the system coherent, decoupled, and easy to evolve?",
  },
  createdAt: now,
};

const prioritySecurity: Entity = {
  id: "cc-priority-security",
  slug: "security",
  type: "priority",
  name: "Security",
  symbol: "Moon",
  symbolColor: "slate",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 74 },
    { kind: "goalDirected", outcome: "The system protects user data, resists adversarial access, and earns trust." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "craft",
    summary: "Does this work reduce attack surface, protect sensitive data, or strengthen authentication?",
  },
  createdAt: now,
};

const priorityPrivacy: Entity = {
  id: "cc-priority-privacy",
  slug: "privacy",
  type: "priority",
  name: "Privacy",
  symbol: "Cross",
  symbolColor: "red",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 72 },
    { kind: "goalDirected", outcome: "User data stays private, minimized, and under the user's control." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "craft",
    summary: "Does this minimize data collected, keep it private by default, and respect user control?",
  },
  createdAt: now,
};

const priorityPerformance: Entity = {
  id: "cc-priority-performance",
  slug: "performance",
  type: "priority",
  name: "Performance",
  symbol: "Lightning",
  symbolColor: "blue",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 62 },
    { kind: "goalDirected", outcome: "The system is fast, reliable, and scalable." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "craft",
    summary: "Does this work reduce latency, improve reliability, or remove scaling bottlenecks?",
  },
  createdAt: now,
};

const priorityAccessibility: Entity = {
  id: "cc-priority-accessibility",
  slug: "accessibility",
  type: "priority",
  name: "Accessibility",
  symbol: "Group",
  symbolColor: "teal",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 58 },
    { kind: "goalDirected", outcome: "The product is usable by everyone, regardless of ability, device, or context." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "craft",
    summary: "Does this work improve keyboard navigation, screen reader support, contrast, or reduce barriers?",
  },
  createdAt: now,
};

/* ---- marketing lenses (go-to-market) ---- */

const priorityPositioning: Entity = {
  id: "cc-priority-positioning",
  slug: "positioning-messaging",
  type: "priority",
  name: "Positioning & Messaging",
  symbol: "Place",
  symbolColor: "purple",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 80 },
    { kind: "goalDirected", outcome: "The value proposition is clear, distinct, and instantly understood." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "marketing",
    summary: "Does this sharpen what we are, who it's for, and why it's different?",
  },
  createdAt: now,
};

const priorityReach: Entity = {
  id: "cc-priority-reach",
  slug: "reach-distribution",
  type: "priority",
  name: "Reach & Distribution",
  symbol: "Wave",
  symbolColor: "blue",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 76 },
    { kind: "goalDirected", outcome: "We reach the right audience through the right channels at scale." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "marketing",
    summary: "Does this expand audience, open a channel, or get us in front of more of the right people?",
  },
  createdAt: now,
};

const priorityConversion: Entity = {
  id: "cc-priority-conversion",
  slug: "conversion",
  type: "priority",
  name: "Conversion",
  symbol: "Arrow",
  symbolColor: "green",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 74 },
    { kind: "goalDirected", outcome: "Attention turns into signups, activations, and customers." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "marketing",
    summary: "Does this move someone further down the funnel — from interest to action?",
  },
  createdAt: now,
};

const priorityBrand: Entity = {
  id: "cc-priority-brand",
  slug: "brand-trust",
  type: "priority",
  name: "Brand & Trust",
  symbol: "Star",
  symbolColor: "amber",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 70 },
    { kind: "goalDirected", outcome: "We build credibility, reputation, and a brand people believe in." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "marketing",
    summary: "Does this build credibility, reputation, and trust in the brand?",
  },
  createdAt: now,
};

const priorityVirality: Entity = {
  id: "cc-priority-virality",
  slug: "virality-word-of-mouth",
  type: "priority",
  name: "Virality & Word-of-Mouth",
  symbol: "Group",
  symbolColor: "pink",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 64 },
    { kind: "goalDirected", outcome: "People are compelled to share, recommend, and spread it organically." },
  ],
  meta: {
    work: { rank: "initiative" as WorkRank },
    lensKind: "marketing",
    summary: "Does this give people a reason to share it or tell someone else?",
  },
  createdAt: now,
};

const priorities = [
  // value (ends)
  priorityPotential,
  priorityMoney,
  priorityEngagement,
  // craft (means)
  priorityUiux,
  priorityArchitecture,
  prioritySecurity,
  priorityPrivacy,
  priorityPerformance,
  priorityAccessibility,
  // marketing (go-to-market)
  priorityPositioning,
  priorityReach,
  priorityConversion,
  priorityBrand,
  priorityVirality,
];

/* ------------------------------------------------------------------- edges */

const relationships: Relationship[] = [];

// legend → campaigns
campaigns.forEach((c, i) => relationships.push(edge(legend, c, i + 1)));

// 4eye Website → its stories
websiteStories.forEach((s, i) => relationships.push(edge(campaignWebsite, s, i + 1)));

// 4eye Core → its stories
coreStories.forEach((s, i) => relationships.push(edge(campaignCore, s, i + 1)));

// Core stories → quests → objectives
for (const { story: s, quests: qs } of Object.values(coreStoriesByQuest)) {
  qs.forEach(({ q, objs }, i) => {
    relationships.push(edge(s, q, i + 1));
    objs?.forEach((o, j) => relationships.push(edge(q, o, j + 1)));
  });
}

// Life stories → quests
lifeStories.forEach((s, i) => relationships.push(edge(campaignLife, s, i + 1)));
relationships.push(edge(storyRobots,  questObservers, 1));
relationships.push(edge(storyDevices, questInputBars, 1));
relationships.push(edge(storyDevices, questHallPass,  2));

// Learning storyline → quests
relationships.push(edge(storyLearning, questLessons,            1));
relationships.push(edge(storyLearning, questHumanOS,            2));
relationships.push(edge(storyLearning, questLearningAttention,  3));
relationships.push(edge(storyLearning, questLearningEngagement, 4));
relationships.push(edge(storyLearning, questLearningToLearn,    5));

// Content Tiles storyline → quests
relationships.push(edge(storyContentTiles, questContentSecurityPrivacy,  1));
relationships.push(edge(storyContentTiles, questContentGamification,     2));
relationships.push(edge(storyContentTiles, questContentProjectsFeatures, 3));
relationships.push(edge(storyContentTiles, questContentKnowledgeBase,    4));
relationships.push(edge(storyContentTiles, questContentWorkVision,       5));

// Education stories
eduStories.forEach((s, i) => relationships.push(edge(campaignEducation, s, i + 1)));

// Shield4.AI stories
shield4AIStories.forEach((s, i) => relationships.push(edge(campaignShield4AI, s, i + 1)));

// Tutorial Island stories
tutorialIslandStories.forEach((s, i) => relationships.push(edge(campaignTutorialIsland, s, i + 1)));

/* --------------------------------------------------------------- goal links */

const GOAL_LEGEND = "cc-legend";

const goalLinks: GoalLink[] = [
  { id: "cc-gl-website",     goalId: GOAL_LEGEND,                entityId: campaignWebsite.id,       entityType: campaignWebsite.type,       weight: 92, depth: 6, note: "Primary platform surface.",       createdAt: now },
  { id: "cc-gl-core",        goalId: GOAL_LEGEND,                entityId: campaignCore.id,          entityType: campaignCore.type,          weight: 90, depth: 6, note: "Foundation that everything builds on.", createdAt: now },
  { id: "cc-gl-education",   goalId: GOAL_LEGEND,                entityId: campaignEducation.id,     entityType: campaignEducation.type,     weight: 82, depth: 5,                                           createdAt: now },
  { id: "cc-gl-services",    goalId: GOAL_LEGEND,                entityId: campaignServices.id,      entityType: campaignServices.type,      weight: 64, note: "Income safety-net.",                         createdAt: now },
  { id: "cc-gl-chat",        goalId: GOAL_LEGEND,                entityId: storyAiChatStd.id,        entityType: storyAiChatStd.type,        weight: 90, depth: 6,                                           createdAt: now },
  { id: "cc-gl-planning",    goalId: GOAL_LEGEND,                entityId: storyTileSystem.id,       entityType: storyTileSystem.type,       weight: 80,                                                     createdAt: now },

  { id: "cc-pl-pot-education",  goalId: priorityPotential.id,    entityId: campaignEducation.id,     entityType: campaignEducation.type,     weight: 96, note: "Education is the core potential-unlock engine.", createdAt: now },
  { id: "cc-pl-pot-chat",       goalId: priorityPotential.id,    entityId: storyAiChatStd.id,        entityType: storyAiChatStd.type,        weight: 90, note: "Answers thousands of questions at once.", createdAt: now },
  { id: "cc-pl-pot-learning",   goalId: priorityPotential.id,    entityId: questLessons.id,          entityType: questLessons.type,          weight: 84, note: "Personalized learning multiplies reach.", createdAt: now },

  { id: "cc-pl-money-services", goalId: priorityMoney.id,        entityId: campaignServices.id,      entityType: campaignServices.type,      weight: 95, note: "Primary income vehicle.",     createdAt: now },
  { id: "cc-pl-money-website",  goalId: priorityMoney.id,        entityId: campaignWebsite.id,       entityType: campaignWebsite.type,       weight: 82, note: "Conversion surface.",          createdAt: now },

  { id: "cc-pl-eng-chat",       goalId: priorityEngagement.id,   entityId: storyAiChatStd.id,        entityType: storyAiChatStd.type,        weight: 92, note: "Primary engagement surface.",  createdAt: now },
  { id: "cc-pl-eng-tiles",      goalId: priorityEngagement.id,   entityId: storyTileSystem.id,       entityType: storyTileSystem.type,       weight: 80,                                       createdAt: now },
  { id: "cc-pl-eng-gamification",goalId: priorityEngagement.id,  entityId: questContentGamification.id,  entityType: questContentGamification.type,  weight: 74, note: "Gamification drives retention.",createdAt: now },

  { id: "cc-pl-uiux-spatial",   goalId: priorityUiux.id,         entityId: storySpatialLayout.id,    entityType: storySpatialLayout.type,    weight: 88, note: "Spatial layout defines the visual grammar.", createdAt: now },
  { id: "cc-pl-uiux-chat",      goalId: priorityUiux.id,         entityId: questChatInput.id,        entityType: questChatInput.type,        weight: 82,                                       createdAt: now },

  { id: "cc-pl-arch-domain",    goalId: priorityArchitecture.id, entityId: questDomainSystem.id,     entityType: questDomainSystem.type,     weight: 92, note: "ECS entity model is the structural backbone.", createdAt: now },
  { id: "cc-pl-arch-models",    goalId: priorityArchitecture.id, entityId: questDataModels.id,       entityType: questDataModels.type,       weight: 84, note: "Shared data models keep domains decoupled.",   createdAt: now },
  { id: "cc-pl-arch-tiles",     goalId: priorityArchitecture.id, entityId: storyTileSystem.id,       entityType: storyTileSystem.type,       weight: 80, note: "Tile system defines composition boundaries.",  createdAt: now },

  { id: "cc-pl-perf-pipelines", goalId: priorityPerformance.id,    entityId: questPipelines.id,          entityType: questPipelines.type,          weight: 90, note: "AI pipeline latency is the #1 risk.", createdAt: now },
  { id: "cc-pl-perf-chatpipe",  goalId: priorityPerformance.id,    entityId: questChatPipelines.id,      entityType: questChatPipelines.type,      weight: 82,                                         createdAt: now },

  { id: "cc-pl-a11y-spatial",   goalId: priorityAccessibility.id,  entityId: storySpatialLayout.id,      entityType: storySpatialLayout.type,      weight: 88, note: "Keyboard nav and focus order are defined here.", createdAt: now },
  { id: "cc-pl-a11y-chatui",    goalId: priorityAccessibility.id,  entityId: questChatUi.id,             entityType: questChatUi.type,             weight: 82, note: "Chat is the primary interaction surface.",       createdAt: now },
  { id: "cc-pl-a11y-auth",      goalId: priorityAccessibility.id,  entityId: questAuthAccess.id,         entityType: questAuthAccess.type,         weight: 70, note: "Auth flows must be fully keyboard-accessible.",   createdAt: now },
  { id: "cc-pl-a11y-tiles",     goalId: priorityAccessibility.id,  entityId: storyTileSystem.id,         entityType: storyTileSystem.type,         weight: 75,                                                           createdAt: now },

  { id: "cc-pl-sec-shield",     goalId: prioritySecurity.id,       entityId: campaignShield4AI.id,       entityType: campaignShield4AI.type,       weight: 95, note: "Primary security campaign.",                     createdAt: now },
  { id: "cc-pl-sec-auth",       goalId: prioritySecurity.id,       entityId: questAuthAccess.id,         entityType: questAuthAccess.type,         weight: 90, note: "Auth is the primary security perimeter.",        createdAt: now },
  { id: "cc-pl-sec-privacy",    goalId: prioritySecurity.id,       entityId: questContentSecurityPrivacy.id, entityType: questContentSecurityPrivacy.type, weight: 82,                                               createdAt: now },
  { id: "cc-pl-sec-pipelines",  goalId: prioritySecurity.id,       entityId: questChatPipelines.id,      entityType: questChatPipelines.type,      weight: 70, note: "AI pipelines handle sensitive context.",         createdAt: now },

  { id: "cc-pl-priv-content",   goalId: priorityPrivacy.id,        entityId: questContentSecurityPrivacy.id, entityType: questContentSecurityPrivacy.type, weight: 90, note: "Private-by-default content handling.",      createdAt: now },
  { id: "cc-pl-priv-auth",      goalId: priorityPrivacy.id,        entityId: questAuthAccess.id,         entityType: questAuthAccess.type,         weight: 78, note: "Access control gates personal data.",            createdAt: now },
  { id: "cc-pl-priv-pipelines", goalId: priorityPrivacy.id,        entityId: questChatPipelines.id,      entityType: questChatPipelines.type,      weight: 72, note: "Minimize context sent to model providers.",      createdAt: now },

  { id: "cc-pl-pos-website",    goalId: priorityPositioning.id,    entityId: campaignWebsite.id,         entityType: campaignWebsite.type,         weight: 90, note: "Website is where positioning lands first.",      createdAt: now },
  { id: "cc-pl-pos-chat",       goalId: priorityPositioning.id,    entityId: storyAiChatStd.id,          entityType: storyAiChatStd.type,          weight: 76, note: "The chat demo embodies the pitch.",              createdAt: now },

  { id: "cc-pl-reach-education",goalId: priorityReach.id,          entityId: campaignEducation.id,       entityType: campaignEducation.type,       weight: 86, note: "Education content is the top-of-funnel reach engine.", createdAt: now },
  { id: "cc-pl-reach-website",  goalId: priorityReach.id,          entityId: campaignWebsite.id,         entityType: campaignWebsite.type,         weight: 78, note: "SEO + landing surfaces.",                       createdAt: now },

  { id: "cc-pl-conv-website",   goalId: priorityConversion.id,     entityId: campaignWebsite.id,         entityType: campaignWebsite.type,         weight: 92, note: "Primary conversion surface.",                   createdAt: now },
  { id: "cc-pl-conv-services",  goalId: priorityConversion.id,     entityId: campaignServices.id,        entityType: campaignServices.type,        weight: 80, note: "Services drives first paying conversions.",      createdAt: now },

  { id: "cc-pl-brand-shield",   goalId: priorityBrand.id,          entityId: campaignShield4AI.id,       entityType: campaignShield4AI.type,       weight: 82, note: "Security posture underwrites brand trust.",       createdAt: now },
  { id: "cc-pl-brand-website",  goalId: priorityBrand.id,          entityId: campaignWebsite.id,         entityType: campaignWebsite.type,         weight: 74, note: "Brand expression lives on the site.",            createdAt: now },

  { id: "cc-pl-viral-education",goalId: priorityVirality.id,       entityId: campaignEducation.id,       entityType: campaignEducation.type,       weight: 80, note: "Shareable learning content spreads organically.", createdAt: now },
  { id: "cc-pl-viral-chat",     goalId: priorityVirality.id,       entityId: storyAiChatStd.id,          entityType: storyAiChatStd.type,          weight: 72, note: "Demo-worthy chat moments get shared.",            createdAt: now },
];

/* ============================================================= Non-person Entities */

/** Locations — physical spaces that can hold goals and tasks. */
const locationAustinStudio: Entity = {
  id: "cc-loc-austin-studio",
  slug: "austin-studio",
  type: "location",
  name: "Austin Studio",
  symbol: "Place",
  symbolColor: "teal",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 72 },
  ],
  meta: {
    summary: "Primary creative and engineering hub for the 4eye team in Austin, TX.",
    address: "Austin, TX",
    timezone: "America/Chicago",
  },
  createdAt: now,
};

const locationLAOffice: Entity = {
  id: "cc-loc-la-office",
  slug: "la-office",
  type: "location",
  name: "LA Office",
  symbol: "Place",
  symbolColor: "purple",
  traits: [
    { kind: "status", value: "planned" },
    { kind: "weight", value: 55 },
  ],
  meta: {
    summary: "West-coast studio for content production and media partnerships.",
    address: "Los Angeles, CA",
    timezone: "America/Los_Angeles",
  },
  createdAt: now,
};

/** Organizations — entities that can own goals, tasks, and relationships. */
const org4eyeLabs: Entity = {
  id: "cc-org-4eye-labs",
  slug: "4eye-labs",
  type: "organization",
  name: "4eye Labs",
  symbol: "Diamond",
  symbolColor: "blue",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 90 },
  ],
  meta: {
    summary: "The core product and engineering organization behind 4eye.",
    domain: "4eye.io",
  },
  createdAt: now,
};

const orgPartnerSchool: Entity = {
  id: "cc-org-partner-school",
  slug: "partner-school",
  type: "organization",
  name: "Partner School",
  symbol: "Group",
  symbolColor: "green",
  traits: [
    { kind: "status", value: "planned" },
    { kind: "weight", value: 68 },
  ],
  meta: {
    summary: "Pilot partner educational institution for the Classroom of Tomorrow program.",
    domain: "edu",
  },
  createdAt: now,
};

const nonPersonEntities = [
  locationAustinStudio,
  locationLAOffice,
  org4eyeLabs,
  orgPartnerSchool,
];

/** Creative + implementation work — Brand Intro / See cut (also Create tile fixture). */
const seqBrandIntro: Entity = {
  id: "cc-seq-platform-launch",
  slug: "see-brand-intro",
  type: "sequence",
  name: "See — Brand Intro (~75s)",
  symbol: "Movie",
  symbolColor: "amber",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 95 },
  ],
  meta: {
    summary:
      "Master brand film: Grow. promise, Classroom → Café → Neural Sea. Same sequence as Create / marketing-video-see.",
  },
  createdAt: now,
};

const sceneClassroomReveal: Entity = {
  id: "cc-scene-classroom-reveal",
  slug: "classroom-hud-reveal",
  type: "scene",
  name: "Scene 1 — Classroom HUD Reveal",
  symbol: "Image",
  symbolColor: "pink",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 90 },
  ],
  meta: {
    summary:
      "One-frame hero: teacher receives 4eye HUD, light spills, students lift heads. Shot 01 in the See cut.",
  },
  createdAt: now,
};

const projClassroomOfTomorrow: Entity = {
  id: "cc-proj-classroom-tomorrow",
  slug: "classroom-of-tomorrow",
  type: "project",
  name: "Classroom of Tomorrow — Campaign",
  symbol: "Star",
  symbolColor: "teal",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 92 },
  ],
  meta: {
    summary:
      "Flagship education campaign wrapping the See film — demos, scenes, social, and site embeds.",
  },
  createdAt: now,
};

/** Concrete implementation steps for My Queue (business work angle). */
const actionIntroVideoPerfectly = act(
  "intro-video-perfectly",
  "Creating the Intro Video for 4eye Perfectly",
  "Ship the See master cut to the quality bar — style-locked, hero moment landed, music-only v1, ready to embed and cut.",
  98,
  "active",
  13,
  "Movie",
  "amber",
);

const actionLockStyleRefs = act(
  "lock-style-refs",
  "Lock anime style reference library",
  "Pre-production blocker: character/style stills for consistency across ~21 shots (Sora / Kling / Veo).",
  88,
  "active",
  8,
  "Image",
  "pink",
);

const actionScene1HudReveal = act(
  "scene1-hud-reveal",
  "Generate Scene 1 classroom HUD reveal",
  "Produce the one-frame hero moment — teacher HUD activate, warm spill, students lift heads.",
  92,
  "active",
  8,
  "Lightning",
  "amber",
);

const actionCutShorts = act(
  "cut-shorts",
  "Cut phenomenal shorts (6s / 15s / 30s)",
  "Distribute the ~75s master into platform cuts that stand alone — hook-first, sound-off friendly.",
  84,
  "planned",
  5,
  "Movie",
  "teal",
);

const actionEmbedSeePage = act(
  "embed-see-page",
  "Embed intro video on the See page",
  "Replace placeholder content on the 4eye See page with the live brand film + conversion framing.",
  86,
  "planned",
  5,
  "Place",
  "blue",
);

const actionRecordVisionTake = act(
  "record-vision-take",
  "Record the vision take perfectly",
  "One clean recording pass of the vision — prepare optimally, then treat the take as the product.",
  80,
  "planned",
  8,
  "Heart",
  "green",
);

const actionWebsiteLaunchReady = act(
  "website-launch-ready",
  "Polish 4eye website to launch-ready",
  "Conversion-ready public surface: intro slot, positioning, donate/privacy links, curated sitemap.",
  90,
  "active",
  13,
  "Place",
  "blue",
);

const actionServicesMvp = act(
  "services-site-mvp",
  "Stand up Expanse Services site MVP",
  "Forked marketing site — fastest path to first revenue while 4eye ships the intro film.",
  78,
  "planned",
  8,
  "Pipeline",
  "teal",
);

const creativeEntities = [
  seqBrandIntro,
  sceneClassroomReveal,
  projClassroomOfTomorrow,
];

const implementationActions = [
  actionIntroVideoPerfectly,
  actionLockStyleRefs,
  actionScene1HudReveal,
  actionCutShorts,
  actionEmbedSeePage,
  actionRecordVisionTake,
  actionWebsiteLaunchReady,
  actionServicesMvp,
];

export { creativeEntities, implementationActions };

/**
 * Divine review — work that has cleared its team review and is offered up for
 * God's review and feedback. These flow through the `god` assignment pipeline
 * ("Submitted to God" → "Under Divine Review" → "Blessed" / "Cast Out").
 */
const godReviewLaunchTrailer: Entity = {
  id: "cc-god-launch-trailer",
  slug: "divine-review-intro-video",
  type: "god",
  name: "Intro Video — Final Cut",
  symbol: "Eye",
  symbolColor: "amber",
  traits: [
    { kind: "status", value: "review" },
    { kind: "weight", value: 95 },
  ],
  meta: {
    summary:
      "Team-approved See master cut, submitted for God's review and final blessing before public embed.",
  },
  createdAt: now,
};

const godReviewClassroomCampaign: Entity = {
  id: "cc-god-classroom-campaign",
  slug: "divine-review-classroom-campaign",
  type: "god",
  name: "Classroom of Tomorrow — Campaign Plan",
  symbol: "Eye",
  symbolColor: "teal",
  traits: [
    { kind: "status", value: "review" },
    { kind: "weight", value: 88 },
  ],
  meta: {
    summary:
      "Full campaign rollout around the intro film — awaiting blessing or notes from on high.",
  },
  createdAt: now,
};

const godReviewEntities = [
  godReviewLaunchTrailer,
  godReviewClassroomCampaign,
];

export { godReviewEntities };

// Brand Intro / See — sequence, scene, project, implementation actions (after entities exist)
relationships.push(edge(storyBrandIntro, seqBrandIntro, 1));
relationships.push(edge(storyBrandIntro, projClassroomOfTomorrow, 2));
relationships.push(edge(seqBrandIntro, sceneClassroomReveal, 1));
implementationActions.forEach((a, i) => {
  // Services + website launch sit under their campaigns; the rest hang on Brand Intro.
  if (a.id === actionServicesMvp.id || a.id === actionWebsiteLaunchReady.id) return;
  relationships.push(edge(storyBrandIntro, a, i + 3));
});
relationships.push(edge(seqBrandIntro, godReviewLaunchTrailer, 2));
relationships.push(edge(projClassroomOfTomorrow, godReviewClassroomCampaign, 1));
relationships.push(edge(campaignServices, actionServicesMvp, 1));
relationships.push(edge(campaignWebsite, actionWebsiteLaunchReady, 1));

/* -------------------------------------------------------------------- export */

const allQuests = [
  questDomainSystem, questMap, questNavigation, questContext, questActionBars, questPipelines,
  questGrowthStats, questDataModels, questAuthAccess,
  questGoalsCore, questProjectsCore,
  questChatUi, questChatLogic, questChatPipelines, questChatContext,
  questChatInput, questChatFeedback,
  questNotes, questRecaps, questVideoVcs,
  questTileCharacter, questTileSpellbook, questTileMap, questTileHome,
  questTileProfiles, questTileLearning, questTileGamification, questTileInventory,
  questTileCommunication, questTileCreate, questTilePlanning, questTileScheduling,
  questTileSocial, questTileObservers, questTileConfig,
  questSequences, questTargets, questAudiences, questUsers,
  questProjModels,
  questResourceBarUi, questResourceEngine, questResourceCharacter, questResourceTile,
  questObservers, questInputBars, questHallPass,
  questLessons, questHumanOS,
  questLearningAttention, questLearningEngagement, questLearningToLearn,
  questContentSecurityPrivacy, questContentGamification, questContentProjectsFeatures,
  questContentKnowledgeBase, questContentWorkVision,
];

const allObjs = [objProjectModels, objLotties, objPlanningSystem, objSocialMedia];

export const COMMAND_CENTER_SEED: PlanningData = {
  entities: [
    legend,
    ...campaigns,
    ...websiteStories,
    ...coreStories,
    ...lifeStories,
    ...eduStories,
    ...shield4AIStories,
    ...tutorialIslandStories,
    ...allQuests,
    ...allObjs,
    ...priorities,
    ...planProcesses,
    ...nonPersonEntities,
    ...creativeEntities,
    ...implementationActions,
    ...godReviewEntities,
  ],
  relationships,
  goalLinks,
};

export const CC_IDS = {
  legend: legend.id,
  campaignWebsite: campaignWebsite.id,
  campaignCore: campaignCore.id,
  storyAiChatStd: storyAiChatStd.id,
  storyTileSystem: storyTileSystem.id,
} as const;
