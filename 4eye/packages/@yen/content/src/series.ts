/**
 * The series — the three ways in.
 *
 * The application grid answers "what exists". It is complete and it is flat,
 * and completeness is exactly the wrong shape for a first visit: twenty-one
 * tiles of equal weight ask the reader to do the ranking. These three do the
 * ranking instead. Each is an argument with a beginning and an end, and each
 * has a recording attached — announced whether or not the file exists yet,
 * because a named empty slot tells a reader more than silence does.
 *
 * They are called series rather than sections because that is what they are:
 * ordered, watchable, and meant to be taken in sequence.
 *
 * Deliberately free of React. The home page renders it, and so will the videos
 * page once these are shot.
 */

import { INTEGRATION_LAYERS } from "./layers";

export interface SeriesStop {
  label: string;
  href: string;
  /** What this stop contributes to the argument. One line. Supports `**bold**`. */
  note: string;
}

export interface Series {
  id: string;
  /** The series name as it is written down — underscores and all. */
  name: string;
  /** What the series is called in prose, for the card heading. */
  title: string;
  /** The argument, in two or three sentences. */
  blurb: string;
  accent: string;
  /** Video id in the VIDEOS manifest. A null `src` there renders a placeholder. */
  videoId: string;
  /** Where the series starts, if a reader would rather read than watch. */
  entry: { label: string; href: string };
  stops: SeriesStop[];
}

export const SERIES: Series[] = [
  {
    id: "all-in-one",
    name: "All_In_One",
    title: "4Eye: Web4 + HumanAI",
    blurb:
      "This is my start to the everything you need all in one website. Made for you.\n\nMy years long journey of unbelievably interesting experiences. I am very thankful for although currently also seeking truth. Years of learning and playing turned into a seed for the future.\n\nAlso experimenting with different app and game types here — even just using your human and visualizing is pretty powerful. Eventually we will have AI that can edit the page, and characters you set up yourself offline or online (Feedback, and Support Appreciated).\n\nWatch this one to figure out What.",
    accent: "#7c3aed",
    videoId: "series-all-in-one",
    entry: { label: "Open 4eye", href: "/4eye" },
    stops: [
      {
        label: "Profile:TheHuman",
        href: "/4eye/appRealm/profile",
        note:
          "**Modeled after Me.** And the people I met, interacted with, etc. The core is to set up my IRL character, robots, and play *.*, tbh.",
      },
      {
        label: "Plan:CommandCenter",
        href: "/4eye/appRealm/command-center",
        note: "Planning inside the app — same Command Center model, one tile.",
      },
      {
        label: "AiChat",
        href: "/4eye/appRealm/dashboard",
        note: "Evolved learning chat — manage people, work, explore the web, or anything else. May become Command Center.",
      },
      {
        label: "Presentations & EDU",
        href: "/apps/expanse-edu",
        note: "Teaching and presenting — Expanse EDU and the presentation path.",
      },
      {
        label: "Mental Health",
        href: "/apps/4wing",
        note: "Care in the stack — counsellor support and the companion around it.",
      },
      {
        label: "KnowledgeBase",
        href: "/docs",
        note: "Somewhat searchable, somewhat ranked — still being written, and needs help cleaning up; there's a ton.",
      },
    ],
  },
  {
    id: "all-in-won",
    name: "All_In_Won",
    title: "4Eye (MM) — the person in it, and AION at the end of it",
    blurb:
      "The same system read from the inside. It starts at one modelled person — attributes, goals, mood, what is surfaced right now — and follows that model outward until it reaches AION, where the interface stops being a screen. This is the series about what it is for, rather than what it does.",
    accent: "#4c1d95",
    videoId: "series-all-in-won",
    entry: { label: "Open the profile", href: "/4eye/appRealm/profile" },
    stops: [
      {
        label: "The profile",
        href: "/4eye/appRealm/profile",
        note: "A real person as a character sheet — the concrete form of the whole thesis.",
      },
      {
        label: "Character",
        href: "/4eye/appRealm/character",
        note: "Acting and equipping: actions, gear, perks, skills.",
      },
      {
        label: "Web 4",
        href: "/docs",
        note: "Plan archive and docs index — topics live on their own pages now.",
      },
      {
        label: "AION — full dive",
        href: "/integration-layer",
        note: "Host AI / OS and creator root — full dive, looping toward infinity.",
      },
    ],
  },
  {
    id: "all-in-neo",
    name: "ALL_IN_NEO",
    title: "The stack, one layer at a time",
    blurb:
      "Eight layers from a person standing in a room up to full dive, each one a real integration surface rather than a stage on a roadmap. Two are live, two are being built, four are ahead. The series walks up the stack in order and is honest at each step about which of those it is.",
    accent: "#14b8a6",
    videoId: "series-all-in-neo",
    entry: { label: "Open the integration layer", href: "/integration-layer" },
    /*
      Generated from the layer model rather than restated. There is exactly one
      list of layers on this site, and a hand-written copy here would be a
      second one — wrong the first time a layer's status changed.
    */
    stops: [...INTEGRATION_LAYERS]
      .sort((a, b) => a.row - b.row)
      .map((layer) => ({
        label: layer.label,
        href: `/integration-layer#${layer.id}`,
        note: layer.tagline,
      })),
  },
];

export function getSeries(id: string): Series | undefined {
  return SERIES.find((s) => s.id === id);
}
