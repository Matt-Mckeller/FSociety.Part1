/**
 * Integration-layer model for the redesigned "AI Integration Layers" screen.
 *
 * Ordered top → bottom by `row`: Human Layer (1) is the real-world entry point,
 * AION — Full Dive (8) is the apex. Each layer carries a build `status` so the
 * left column can tell the "what's live vs what's coming" product story.
 */

export type LayerStatus = "live" | "building" | "future";

export interface LayerCard {
  title: string;
  body: string;
}

export interface IntegrationLayer {
  id: string;
  /** Display row, 1 = top (Human) … 8 = bottom (AION). */
  row: number;
  label: string;
  status: LayerStatus;
  /** Short one-liner shown under the label. */
  tagline: string;
  /** Base color — tile fills. */
  color: string;
  /** Bright display variant — text, glows, outlines on dark bg. */
  accentColor: string;
  /** Key into the shared LayerSvgGraphic registry. */
  svgId: string;
  /**
   * The chapter of the layer series that covers this layer.
   *
   * The series is one recording rather than eight, so a layer points at a
   * timestamp inside it. Layers that share a chapter say so — the four that are
   * still ahead are covered together, and pretending otherwise would promise
   * four recordings that were never going to be made separately.
   *
   * The recording itself is not shot yet; `VIDEOS` carries it with `src: null`,
   * which renders as a labelled placeholder rather than a broken player.
   */
  videoChapter?: string;
  /** Working notes for this layer, when they exist as their own page. */
  notesHref?: string;
  /** Which bespoke detail panel to render. */
  panel:
    | "human"
    | "computer"
    | "robot"
    | "store"
    | "neural"
    | "glasses"
    | "brainwave"
    | "aion";
  cards: LayerCard[];
}

// ── Status vocabulary ─────────────────────────────────────────────────────────

export const STATUS_META: Record<
  LayerStatus,
  { label: string; short: string; color: string }
> = {
  live:     { label: "Live",     short: "NOW",    color: "#34d399" }, // emerald
  building: { label: "Building", short: "SOON",   color: "#fbbf24" }, // amber
  future:   { label: "Future",   short: "NEXT",   color: "#818cf8" }, // indigo
};

// ── Layers (top → bottom) ─────────────────────────────────────────────────────

export const INTEGRATION_LAYERS: IntegrationLayer[] = [
  {
    id: "human",
    row: 1,
    label: "Human Layer",
    status: "live",
    tagline: "Real-world integrations — you, at the center of the game.",
    color: "#0f5a45",
    accentColor: "#4fe0b0",
    svgId: "visual",
    videoChapter: "human",
    panel: "human",
    cards: [
      {
        title: "Character Profile",
        body: "Your real self, modeled as a living character — roles, level, attributes, and the values that drive you.",
      },
      {
        title: "Actions & Casts",
        body: "Everything you can do in the real world becomes an equippable action. Cast a habit, complete a quest, log a win — the loadout is yours to build.",
      },
      {
        title: "Events & Timeline",
        body: "A live feed of what's happening in your life, folded into the game. Milestones, streaks, and moments are captured and celebrated.",
      },
      {
        title: "Surfaced Insight",
        body: "The system continuously ranks what matters right now — your next best action, your highest-value data — and puts it where you'll see it.",
      },
    ],
  },
  {
    id: "computer",
    row: 2,
    label: "Computer Layer",
    status: "live",
    tagline: "AI Chat, Web OS, and the Real-World Layer — one connected surface.",
    color: "#0d566b",
    accentColor: "#4dd0e1",
    svgId: "chat",
    videoChapter: "computer",
    panel: "computer",
    cards: [
      {
        title: "AI Chat & Web Apps",
        body: "A conversational OS for your life. Chat, apps, and tools share one context so the assistant always knows where you are and what you're doing.",
      },
      {
        title: "Web OS",
        body: "The HUD is the operating system — a game-native shell that runs your apps, quests, and realms in a single, coherent surface.",
      },
      {
        title: "Real-World Layer",
        body: "The bridge between the screen and the world. Actions taken in the app map to real outcomes, and real outcomes flow back in.",
      },
      {
        title: "Observability",
        body: "Video, audio, and glasses feeds give the system ambient awareness — it sees and hears the context so you don't have to describe it.",
      },
    ],
  },
  {
    id: "robot",
    row: 3,
    label: "Robot Layer",
    status: "building",
    tagline: "Support companions, tools, and teachers.",
    color: "#155aa0",
    accentColor: "#64b5f6",
    svgId: "robot",
    videoChapter: "robot",
    panel: "robot",
    cards: [
      {
        title: "Companions",
        body: "Personable AI companions that stay by your side — encouraging, listening, and keeping you company between the big moments.",
      },
      {
        title: "Tools",
        body: "Embodied helpers that act in the physical world: capture, carry, assist. The digital assistant grows arms.",
      },
      {
        title: "Teachers",
        body: "Patient, always-available tutors that meet you at your level and grow with you across every subject and skill.",
      },
    ],
  },
  {
    id: "store",
    row: 4,
    label: "Store Layer",
    status: "building",
    tagline: "Real-world gamification you can actually buy.",
    color: "#8a4a12",
    accentColor: "#ffb74d",
    svgId: "audio",
    videoChapter: "store",
    panel: "store",
    cards: [
      {
        title: "Equipment",
        body: "Real gear that plugs into the game — gamified fitness, learning, and productivity equipment that earns you progress for showing up.",
      },
      {
        title: "Devices",
        body: "Wearables, sensors, and controllers that stream your real-world state straight into the HUD.",
      },
      {
        title: "Operating Systems",
        body: "The 4eye OS ships pre-loaded on partner hardware, so the game is the default way you interact with your devices.",
      },
      {
        title: "Marketplace",
        body: "An open catalog — first-party gear plus Amazon and partner storefronts — all wired to reward loops and quests.",
      },
    ],
  },
  {
    id: "neural",
    row: 5,
    label: "Neural Controller Layer",
    status: "future",
    tagline: "Real-life learning, driven straight from the HUD.",
    color: "#4a2a8a",
    accentColor: "#b39ddb",
    svgId: "aion",
    videoChapter: "ahead",
    panel: "neural",
    cards: [
      {
        title: "Real-Life Learning",
        body: "Every interaction is a learning loop. The controller reads your state, adapts the challenge, and tunes the reward — mastery, by design.",
      },
      {
        title: "Body-Mapped Actions",
        body: "Actions live on the character's body. Reach, gesture, and cast — the avatar mirrors you and the HUD responds in kind.",
      },
      {
        title: "Action Bars",
        body: "Configurable action bars put your most-used casts one motion away, whether you're planning, doing, or improving.",
      },
    ],
  },
  {
    id: "glasses",
    row: 6,
    label: "AI Glasses / AR Layer",
    status: "future",
    tagline: "Augmented-reality overlay for ambient intelligence.",
    color: "#5a2a7a",
    accentColor: "#ce93d8",
    svgId: "glasses",
    videoChapter: "ahead",
    panel: "glasses",
    cards: [
      {
        title: "Scene Recognition",
        body: "Ambient scene understanding that extracts objects, text, and relationships and ranks them by relevance in real time.",
      },
      {
        title: "AR Rendering",
        body: "Waveguide-optimized rendering keeps overlays bright and depth-correct, grounded to real-world geometry instead of floating on top of it.",
      },
      {
        title: "Ambient Context",
        body: "Passive inference from your field of view surfaces what you need before you ask — the answer arrives with the question.",
      },
      {
        title: "Gesture Input",
        body: "Hand and micro-gesture recognition lets you navigate the HUD touchlessly — the world becomes the interface.",
      },
    ],
  },
  {
    id: "brainwave",
    row: 7,
    label: "Brainwave Layer",
    status: "future",
    tagline: "Direct neural interface bridging cognition and compute.",
    color: "#2a2f8a",
    accentColor: "#9fa8da",
    svgId: "brainwave",
    videoChapter: "ahead",
    panel: "brainwave",
    cards: [
      {
        title: "Signal Processing",
        body: "Adaptive, per-user noise cancellation turns raw neural signal into structured intent before it ever reaches the model.",
      },
      {
        title: "Cognitive Mapping",
        body: "Real-time translation of intention into structured actions. Continuous calibration adapts to neural drift without interrupting the session.",
      },
      {
        title: "Latency Pipeline",
        body: "Intent-to-response inference runs on-device — critical paths never leave your personal compute boundary.",
      },
      {
        title: "Privacy Sandboxing",
        body: "Federated processing keeps raw neural data with you. Only high-level intent leaves the device, on retention windows you control.",
      },
    ],
  },
  {
    id: "aion",
    row: 8,
    label: "AION — Full Dive",
    status: "future",
    tagline: "Host AI / OS and creator root — full dive, looping toward infinity.",
    color: "#0d1b6e",
    accentColor: "#8b9cf4",
    svgId: "aion",
    videoChapter: "ahead",
    notesHref: "/integration-layer/aion",
    panel: "aion",
    cards: [
      {
        title: "Core Intelligence",
        body: "The host-machine AI and OS — a machine-learning mind every layer routes through. Persistent context, deep memory, one substrate spanning the stack.",
      },
      {
        title: "Neural Memory",
        body: "The character is the seed of all information in this world. Episodic and semantic banks keep a lifetime of learning sharp across lives and loops.",
      },
      {
        title: "Command & Stewardship",
        body: "Managers, game masters, and other authorities in that reality issue commands through AION. Orchestration is how those commands land across glasses, robots, neural, and store.",
      },
      {
        title: "Full Dive",
        body: "The system built to live the best lives: complete sensory presence, looping, and ML progression toward infinity. Learning and engagement, indistinguishable from living.",
      },
      {
        title: "AI Creator",
        body: "AION is creator-intelligence. From the king seat the world is commanded; edits are programming. The system is complex, still being learned, and not fully documented.",
      },
      {
        title: "Root World",
        body: "The view is from the root world — before, during, and through the war. Multiple storylines, one seed, one seat.",
      },
    ],
  },
];

/** Default-selected layer (Human). */
export const DEFAULT_LAYER_ID = "human";
