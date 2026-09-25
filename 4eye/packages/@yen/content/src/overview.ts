/**
 * Site offer — what yen is selling the visitor in fifteen seconds.
 * Kept beside OVERVIEW so the header band can state description, status, goals.
 */

import { WEB4_INTRO_HREF } from "./walkthroughs";

export const SITE_OFFER = {
  /** One-line collapsed banner summary. */
  summary: "We evolve all the time — years of docs to sort, releasing so it survives, aiming for infinity.",
  description:
    "#All In One · Plans, Products, Content — years of documentation here to be sorted through and organized, released so the work survives, and so I make it to infinity.",
  status:
    "We evolve all the time. Apps run here; recordings and Storybooks are partial; EDU backend still needs migration. The dump is intentional — sort and teach from it, do not hide it.",
  goals: [
    "Sort and organize years of documentation without losing the breadth",
    "Release the surface so the work survives — and so Matthew makes it to infinity",
    "Represent Matthew accurately — profile, goals, voice on video",
    "Teach via walkthroughs, then deepen into Web 4, Plans and EDU",
    "Sell and build more from a clean surface — tokens and financial amplification follow",
  ],
} as const;

export const OVERVIEW = {
  /**
   * Held state is Future (with a controller mark). Cypher still replays
   * Gamification → Future on an interval and on click.
   */
  headlineMorph: ["Gamification", "Future"] as const,
  /** Thesis chips under the title — the all-in-one inventory. */
  headlineChips: ["Plans", "Products", "Content"] as const,
  /**
   * `#All In One` cyphers to Won in the header lede band; then the inventory.
   */
  allInMorph: ["All In One", "Won"] as const,
  lede: "Plans, Products, Content — one host. New? Start on video. Want structure? Web 4, Profile, Plans, EDU.",
  primary: { label: "Watch the site intro", href: "/videos#site-intro-all" },
  secondary: { label: "See Matt Live", href: "/live" },
  tertiary: {
    label: "Web 4 intro",
    href: WEB4_INTRO_HREF,
  },
  /** Scroll target for the highlights / walkthrough band. */
  walkthrough: { label: "What is here", href: "/#walkthrough" },
} as const;

export type ProfilePreviewSubjectId = "matthew";
export type ProfilePreviewShotId = "profile" | "character";

/**
 * One cut of the exhibit: profile + character captured together.
 *
 * Same shape as video versions — a branch with a note — but the unit of
 * selection is the pair, because the home band is one exhibit of two views,
 * not two independently versioned products.
 */
export interface ProfilePairVersion {
  /** Semantic-ish label — "v2", "v1". */
  id: string;
  label: string;
  /** Which version this was captured from, or null for the root. */
  parent: string | null;
  date?: string;
  /** What changed. The reason the version list is worth having. */
  note: string;
  /** Both captures that form this cut. */
  shots: Record<ProfilePreviewShotId, string | null>;
  /** The one shown by default. Exactly one per subject. */
  current?: boolean;
}

export interface ProfilePreviewShot {
  id: ProfilePreviewShotId;
  alt: string;
  caption: string;
  href: string;
}

export interface ProfilePreviewSubject {
  id: ProfilePreviewSubjectId;
  /** Short toggle label. */
  label: string;
  /** @username shown in the exhibit rail. */
  username: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Accent for the active toggle chip. */
  accent: string;
  /** Display slots — captions and links; sources come from the active pair. */
  shots: ProfilePreviewShot[];
  /** Capture history for the pair. The last `current: true` entry is what shows. */
  versions: ProfilePairVersion[];
}

/** The pair that should show: the one marked current, else the newest. */
export function currentPairVersion(subject: ProfilePreviewSubject): ProfilePairVersion | null {
  if (!subject.versions?.length) return null;
  return subject.versions.find((v) => v.current) ?? subject.versions[subject.versions.length - 1];
}

/**
 * Home “meet the person” band — Matthew's real profile.
 */
export const PROFILE_PREVIEW = {
  defaultSubject: "matthew" as ProfilePreviewSubjectId,
  subjects: {
    matthew: {
      id: "matthew",
      label: "Matthew",
      username: "expanse_eye",
      eyebrow: "Meet Matthew McKeller",
      title: "A person, modelled as a character",
      body:
        "This is Matthew's real profile — attributes, goals, values, mood, and the next action. The same shape a game gives a character, applied to a life.",
      accent: "#0c4a39",
      shots: [
        {
          id: "profile",
          alt: "Matthew's 4eye profile: level, roles, attributes, goals, daily focus and current mood.",
          caption: "Profile — attributes, goals, and what is surfaced right now",
          href: "/4eye/appRealm/profile",
        },
        {
          id: "character",
          alt: "Matthew's 4eye Character lens: action band, swipe cast, loadout and bindings.",
          caption: "Character — actions, swipe cast and loadout",
          href: "/4eye/appRealm/profile?lens=character",
        },
      ],
      versions: [
        {
          id: "v1",
          label: "v1 — early August",
          parent: null,
          date: "2026-08-07",
          note: "Seed pair: river_explores profile + early character sheet.",
          shots: {
            profile: "/media/preview/profile.png",
            character: "/media/preview/character.png",
          },
        },
        {
          id: "v2",
          label: "v2 — Matthew current",
          parent: "v1",
          date: "2026-08-10",
          note: "expanse_eye / Matthew McKeller — Surfaced + Character lens (profile?lens=character). Current goal: Ship yen · teach · gain financial amplification. Ask 4eye terminal kept on both.",
          shots: {
            profile: "/media/preview/profile-v2.png",
            character: "/media/preview/character-v2.png",
          },
        },
        {
          id: "v3",
          label: "v3 — character minimap quiet",
          parent: "v2",
          date: "2026-08-11",
          note: "Same Matthew pair; Character capture keeps the open Map panel collapsed so profile chrome, actions, swipe cast and loadout stay the focus.",
          shots: {
            profile: "/media/preview/profile-v2.png",
            character: "/media/preview/character-v3.png",
          },
          current: true,
        },
      ],
    },
  } satisfies Record<ProfilePreviewSubjectId, ProfilePreviewSubject>,
} as const;

/** Shown as a tooltip — not body copy on the home hero. */
export const DISCLAIMER =
  "Fair warning: this is a large data dump on purpose — everything is here rather than a tidy selection. I will walk through it, get help where needed, keep working the vision, and enjoy making the content. If something looks unfinished, it probably is — that is why it is shown now.";

export const SCALE = [
  { value: "6+", label: "products & Matthew here", href: "/4eye/appRealm/profile" },
  { value: "517", label: "documents, searchable", href: "/docs" },
  { value: "2h 14m+", label: "of recorded walkthroughs", href: "/videos" },
  { value: "140", label: "images in the photo library", href: "/photos" },
] as const;
