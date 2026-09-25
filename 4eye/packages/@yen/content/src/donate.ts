/**
 * Donate page content.
 *
 * Two things are deliberately absent, and this note is here so their absence
 * reads as a decision rather than an oversight:
 *
 *  1. No payment integration. Every route here is in person or in kind. Nothing
 *     on this page collects card details, and nothing should be added that does
 *     without a real processor behind it.
 *  2. No conditional demand. An earlier draft tied the release of a personal
 *     account to receiving something, on a deadline. Written that way it reads
 *     as a threat regardless of what is true, and it puts the author at legal
 *     risk rather than the subject. The constructive half of that intent —
 *     inviting people who were there to come forward — is kept in `TESTIMONY`.
 */

export interface DonateSection {
  id: string;
  title: string;
  /** Short framing line. */
  lede: string;
  /** Body paragraphs. */
  body: string[];
  /** Concrete asks, rendered as a list. */
  items?: string[];
  /** Visual accent. */
  accent: string;
  /** `serious` renders plainly; `playful` renders lighter, with the wry tone intact. */
  tone: "serious" | "playful";
}

export const DONATE_INTRO = [
  "Nothing on this page takes a card. There is no processor, no checkout, and no account to top up — every route below is either in person or in kind.",
  "That is not a limitation to be fixed later. It is the point.",
];

export const DONATE_SECTIONS: DonateSection[] = [
  {
    id: "cash",
    title: "Cash",
    lede: "In person, or not at all.",
    body: [
      "If you want to donate cash, do it in person. No link, no transfer, no platform taking a cut and holding a record.",
    ],
    accent: "#16a34a",
    tone: "serious",
  },
  {
    id: "people",
    title: "Food, shelter and work",
    lede: "The people who need it before anyone else does.",
    body: [
      "The most useful thing anyone can do with money right now is put it directly toward someone who needs food, a place to sleep, or work that pays.",
      "Give it locally, give it directly, and give it to someone whose situation you actually know about. Direct beats efficient.",
    ],
    accent: "#0891b2",
    tone: "serious",
  },
  {
    id: "mental-health",
    title: "Mental health",
    lede: "The care that is hardest to ask for.",
    body: [
      "Fund access to mental health care for people who cannot currently get it. Treatment, not awareness campaigns.",
      "This one is personal. Building anything ambitious over a long period costs something, and the cost is rarely visible from outside until it has already been paid.",
    ],
    accent: "#6366f1",
    tone: "serious",
  },
  {
    id: "students",
    title: "Students",
    lede: "What all of this is ultimately for.",
    body: [
      "The goal is a trillion dollars donated to students before physical currency is gone.",
      "That is an ambition, stated plainly as an ambition — not a pledge, not an escrowed commitment, and not a number anyone should plan around. It is the direction of travel, and it is written down so it can be measured against later.",
    ],
    accent: "#d97706",
    tone: "serious",
  },
  {
    id: "currency",
    title: "Currency",
    lede: "Not yet. Here is what has to exist first.",
    body: [
      "There will be a currency eventually. It is not going to be announced before the things that make it real exist:",
    ],
    items: [
      "A factory",
      "An independent computer system",
      "A SCIF worth the name",
      "A team of people I trust — and who can be taught to hold something permanently without ever writing it down",
    ],
    accent: "#7c3aed",
    tone: "serious",
  },
  {
    id: "temporary",
    title: "Temporary donations",
    lede: "Accepted with enthusiasm and no expectation whatsoever.",
    body: [
      "Until the above exists, the following are all cheerfully accepted:",
    ],
    items: [
      "Free Uber",
      "Free food in every store and building I walk into",
      "An ocean-view house for every person in my family, and for my love and myself",
      "A couple of yachts",
      "Unlimited AI credits on every platform and every model",
      "A wake-up call to all of my old friends and my current family",
    ],
    accent: "#ec4899",
    tone: "playful",
  },
  {
    id: "trash-bags",
    title: "Trash bags",
    lede: "Genuinely useful. Conditions apply.",
    body: [
      "Trash bags are welcome and immediately useful.",
      "I do need to approve the bags.",
    ],
    accent: "#64748b",
    tone: "playful",
  },
];

/**
 * The invitation that replaces the conditional demand. Asks for information
 * rather than trading silence for it.
 */
export const TESTIMONY = {
  title: "If you were there",
  body: [
    "Some of what happened over the last several years is documented and some of it is not. The account that gets written will be more accurate if the people who were actually present contribute to it.",
    "If you have first-hand knowledge — context, background, corrections, or your own record of something — it is worth more than anything else on this page.",
    "No conditions attached in either direction. Bring what you have.",
  ],
};
