/**
 * Curated ways into the written record.
 *
 * The Documentation index ranks 517 documents, which answers "what should I
 * read first" but not "what is actually in here". These two sections answer the
 * second question by hand, because it cannot be derived: the Web 4 plan is one
 * enormous document, and the parts of it worth sending someone are sections
 * inside it rather than the file.
 *
 * Every `href` is a real anchor in the published rendering — the docs indexer
 * gives each heading an id built from the same slug rule, so a link written
 * here resolves to the section. If one ever stops resolving, the heading was
 * reworded; fix the anchor rather than dropping the entry.
 *
 * Deliberately free of React. The docs page renders it, and the vision page
 * will too.
 */

import { WEB4_INTRO_HREF } from "./walkthroughs";

/** Section pins into the deprecated essay — archive deep-links only. */
const WEB4 = "/docs/web4/web-4-projects-story-whoami-whoarewe";

export interface Highlight {
  title: string;
  /** What is actually there, and why it is worth the click. */
  blurb: string;
  href: string;
  /** Where the same idea exists as running software, when it does. */
  seeAlso?: { label: string; href: string };
}

export interface HighlightSection {
  id: string;
  title: string;
  /** What this group of highlights is for. */
  blurb: string;
  accent: string;
  items: Highlight[];
}

export const HIGHLIGHT_SECTIONS: HighlightSection[] = [
  {
    id: "technical",
    title: "Technical, glossary and architecture",
    blurb:
      "Start with the video intro. Section pins below still land in the deprecated Web 4 essay for archive reading — how navigation works when space carries meaning, each linked to the running version where one exists.",
    accent: "#7c3aed",
    items: [
      {
        title: "Web 4 — video intro",
        blurb:
          "Spoken pass over the plan. Prefer this over the long WhoAmI → WhoAreWe essay (deprecated).",
        href: WEB4_INTRO_HREF,
        seeAlso: { label: "The layer stack", href: "/integration-layer" },
      },
      {
        title: "Spatial navigation architecture",
        blurb:
          "Deferred in the Web 4 essay — HUD, display, keypad, and maps live in the technical collection; the essay keeps UX-law notes and demos.",
        href: `${WEB4}#2-spatial-navigation-architecture`,
        seeAlso: { label: "Technical collection", href: "/docs#collection-technical" },
      },
      {
        title: "HUD & interface specs",
        blurb:
          "Action bars, context bar, keypad / spatial movement — the mechanics the symbol grid and map HUD implement.",
        href: "/docs/technical/hud-spec",
        seeAlso: { label: "Symbol Grid", href: "/apps/symbol-grid" },
      },
      {
        title: "Display variants & theming",
        blurb:
          "UI versions, SpatialChrome, emotional display — how the surface unlocks and restyles without rewriting navigation.",
        href: "/docs/technical/display-and-themes",
        seeAlso: { label: "The map", href: "/4eye/appRealm/map" },
      },
      {
        title: "MapToSymbol · demos, not specs",
        blurb:
          "Vision sentence plus Storybook / Command Center demos. Architecture points at Technical; Color / Spatial / Shapes essays stay in the plan.",
        href: `${WEB4}#nav-maps-keypad-components-technical-docs`,
        seeAlso: { label: "The grid, running", href: "/4eye" },
      },
      {
        title: "Colour is powerful",
        blurb:
          "Colour treated as a UX law rather than as decoration — what it can carry, what it cannot, and where it stops being legible.",
        href: `${WEB4}#color-is-powerful-learn-ux-ux-law`,
        seeAlso: { label: "The design system", href: "/apps/storybook" },
      },
      {
        title: "Spatial is powerful, cyphertext is powerful",
        blurb:
          "Why memory attaches to place, and what a compressed symbolic notation buys once a reader has learned it.",
        href: `${WEB4}#spatial-is-powerful-cyphertext-is-powerful`,
      },
      {
        title: "Shapes are powerful",
        blurb:
          "The third of the three: shape as a channel that survives being small, being fast, and being in peripheral vision.",
        href: `${WEB4}#shapes-are-powerful-learn-ux-ux-law`,
      },
      {
        title: "Profiles, identities and agents",
        blurb:
          "How one person becomes several contextual identities without becoming several accounts — the model the profile's Facets group implements.",
        href: "/4eye/appRealm/profile",
        seeAlso: { label: "The profile", href: "/4eye/appRealm/profile" },
      },
      {
        title: "The integration layers",
        blurb:
          "Part three: eight layers from a person in a room up to full dive, with what each one is for and which of them exist.",
        href: "/integration-layer",
        seeAlso: { label: "The layer stack", href: "/integration-layer" },
      },
      {
        title: "Privacy & security",
        blurb:
          "How we operate — dive-in chips for filtering, access, data sharing, pipelines, school rules, and founder depth. Built to teach as well as protect.",
        href: "/apps/sample-privacy",
        seeAlso: { label: "Pipelines", href: "/4eye/technical/pipelines" },
      },
      {
        title: "Currency and coins",
        blurb:
          "The economic layer — what earns, what it is worth, and how a currency inside a learning product avoids becoming a slot machine.",
        href: "/concepts/currency",
        seeAlso: { label: "Money", href: "/4eye/money" },
      },
      {
        title: "Gamification",
        blurb:
          "The rules the whole system is supposed to obey, stated plainly enough to be argued with.",
        href: "/4eye/gamification",
        seeAlso: { label: "Command Center docs", href: "/mounted/command-center/docs" },
      },
    ],
  },
  {
    id: "stories",
    title: "Vision and stories",
    blurb:
      "Four stories sit at the front of the Web 4 plan, before any of the architecture. They are the reason the rest exists, and they are the part most likely to be skipped — so they are pulled out here.",
    accent: "#0d9488",
    items: [
      {
        title: "Story 1 — Love, passion, pleasure",
        blurb:
          "The first story, and the one the Core lens of the profile is built to hold: what a person is actually oriented toward, modelled rather than assumed.",
        href: `${WEB4}#story1-focus-love-passion-pleasure`,
        seeAlso: { label: "Core", href: "/4eye/appRealm/profile" },
      },
      {
        title: "Story 2 — Learn, grow, classrooms",
        blurb:
          "Classrooms of tomorrow, available now. The education story, and the direct ancestor of Expanse EDU and of the Scene Studio work behind the Sequences page.",
        href: `${WEB4}#story2-focus-learn-grow-classrooms`,
        seeAlso: { label: "Expanse EDU", href: "/apps/expanse-edu" },
      },
      {
        title: "Story 3 — The future, AION, portals",
        blurb:
          "The furthest-out story: expanded potential, portals, warp, and what a genre increment would even mean. The endpoint the layer stack is walking toward.",
        href: `${WEB4}#story3-focus-future-aionvision-potential-in-that-realm-expandedpotential-portals`,
        seeAlso: { label: "AION — full dive", href: "/integration-layer" },
      },
      {
        title: "Story 4 — Why",
        blurb:
          "Education plus engagement plus games; work and the people doing it; families and the political situations they sit inside. The shortest of the four and the one that says what it is all for.",
        href: `${WEB4}#story-4-why`,
        seeAlso: { label: "Why", href: "/4eye/why" },
      },
      {
        title: "4eye.AI — the human AI",
        blurb:
          "The project section on 4eye itself: what the all-in-one solution is meant to be, written before most of it existed.",
        href: `${WEB4}#4eye-ai-the-human-ai-current-all-in-one-solution-wip`,
        seeAlso: { label: "4eye", href: "/4eye" },
      },
      {
        title: "Themed animations and interactive assets",
        blurb:
          "The section that became ThemedAnimationNFTs — animations as owned, tradeable assets rather than files in a folder.",
        href: `${WEB4}#app-lottie-file-generations-amp-interactive-assets-nfts`,
        seeAlso: { label: "ThemedAnimationNFTs", href: "/apps/lottie" },
      },
    ],
  },
];
