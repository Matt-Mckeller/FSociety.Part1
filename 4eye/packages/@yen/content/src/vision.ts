/**
 * Vision of the future — AION end-state, Web 4 stories, products on the path.
 * Consumed by yen /vision. Heart.Evolve lives on the personal profile, not here.
 */

import { WEB4_INTRO_HREF } from "./walkthroughs";

export interface VisionSlot {
  id: string;
  title: string;
  blurb: string;
  /** Path under /media when shot; null = labelled empty frame. */
  imageSrc: string | null;
  href?: string;
}

export interface VisionChapter {
  id: string;
  title: string;
  blurb: string;
  accent: string;
  slots: VisionSlot[];
  href?: string;
}

export const VISION_INTRO = {
  eyebrow: "Vision of the future",
  title: "Where this is going",
  lede:
    "AION at the far end, Web 4 as the operating system for a person, and the products shipping now as the path there. Image slots mark where recordings and stills belong.",
} as const;

export const VISION_CHAPTERS: VisionChapter[] = [
  {
    id: "aion",
    title: "AION — full dive",
    blurb:
      "Host-machine AI and OS: the creator root every layer routes through. Full dive, looping, ML progression toward infinity. Layer 8 — ahead, labelled honestly.",
    accent: "#7c3aed",
    href: "/integration-layer",
    slots: [
      {
        id: "aion-still",
        title: "AION still",
        blurb: "Hero still for the end-state — portal / warp / presence.",
        imageSrc: null,
      },
      {
        id: "aion-walk",
        title: "AION walkthrough",
        blurb: "Recording slot — what full dive would actually mean.",
        imageSrc: null,
        href: "/videos#series-all-in-won",
      },
    ],
  },
  {
    id: "web4",
    title: "Web 4",
    blurb: "An OS for a person — spatial navigation, symbols, colour as UX law.",
    accent: "#0ea5e9",
    href: WEB4_INTRO_HREF,
    slots: [
      {
        id: "web4-map",
        title: "Spatial map",
        blurb: "Still of the map / minimap as comprehension.",
        imageSrc: null,
        href: "/4eye/appRealm/map",
      },
      {
        id: "web4-intro",
        title: "Video intro",
        blurb: "Spoken pass over the plan — prefer this over the deprecated essay.",
        imageSrc: null,
        href: WEB4_INTRO_HREF,
      },
    ],
  },
  {
    id: "products",
    title: "What ships the path",
    blurb: "4eye, EDU, plans, and the yen host that teaches them.",
    accent: "#0c4a39",
    slots: [
      {
        id: "edu",
        title: "Expanse EDU",
        blurb: "The education product with a market.",
        imageSrc: null,
        href: "/apps/expanse-edu",
      },
      {
        id: "yen-intro",
        title: "Site intro recording",
        blurb: "Placeholder — record the inventory walkthrough.",
        imageSrc: null,
        href: "/videos#site-intro-all",
      },
    ],
  },
];
