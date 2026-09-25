import HistoryIcon from "@mui/icons-material/History";
import VideocamIcon from "@mui/icons-material/Videocam";
import ReplayIcon from "@mui/icons-material/Replay";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import type { ComponentType, SVGProps } from "react";

/**
 * LensExample — a single Without/With pair displayed inside a LensWipe
 * card. The lens overlay reveals the `with` content from the left edge
 * inward as the user drags.
 *
 * Two flavors of content live here:
 *  - **Code-pair** (`flavor: "code"`): the existing `BeforeAfter`
 *    examples migrated from ControlSlide — a shell-style monospace block
 *    where the LHS is a raw human utterance and the RHS is what 4eye
 *    transformed it into (function call, sentiment swap, etc.).
 *  - **Capability** (`flavor: "capability"`): the THEN/NOW/LATER
 *    columns reframed as "lessons fade" → "lessons persist" stories,
 *    so they fit the same Without/With grammar.
 *
 * The data is content-only; the component owns layout + the lens
 * mechanic. To add a new example, append to {@link LENS_EXAMPLES}.
 */
/** Per-row translation data for the Enable / Learn toggle in Glimpses. */
export interface LensTranslation {
  learn: {
    /** Contextual note explaining why 4eye transforms the input this way. */
    note: string;
    /** The reframe prompt or suggested output shown in "Learn" mode. */
    reframe: string;
  };
}

export interface LensExample {
  id: string;
  /** Short title shown above the card body (e.g. "Exercise intent"). */
  label: string;
  /** Mood-coded gradient seed (matches the old ControlSlide PAIRS palette). */
  tint: "violet" | "teal" | "amber" | "blue";
  /** Optional category icon shown by the label. */
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Visual style of the body content. */
  flavor: "code" | "capability";
  /** Left-side content (raw, without 4eye). */
  without: {
    /** Headline / utterance line (mono for `code`, sans-serif for `capability`). */
    primary: string;
    /** Optional sub-line — probability label, sub-headline, etc. */
    secondary?: string;
  };
  /** Right-side content (with 4eye). */
  with: {
    primary: string;
    secondary?: string;
  };
  /** Optional per-row translation toggle data (Day-to-Day examples only). */
  translation?: LensTranslation;
}

/**
 * Tint palette (hex + soft tint) used by both card surfaces and the
 * lens chrome. Light tints work on white backgrounds; the lens
 * component reads `fg` for the seam glow.
 */
export const LENS_TINTS: Record<
  LensExample["tint"],
  { fg: string; bg: string }
> = {
  violet: { fg: "#8b5cf6", bg: "rgba(139,92,246,0.10)" },
  teal: { fg: "#14b8a6", bg: "rgba(20,184,166,0.10)" },
  amber: { fg: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
  blue: { fg: "#3b82f6", bg: "rgba(59,130,246,0.10)" },
};

/**
 * Active examples shown in the LensWipe on the Promise slide.
 *
 * The first three are the migrated ControlSlide BeforeAfter pairs. The
 * last three are the reframed ThenNowLater capability columns — the
 * "with" copy is preserved verbatim from the original component while
 * the "without" copy describes the same world *before* 4eye exists.
 */
export const LENS_EXAMPLES: LensExample[] = [
  {
    id: "exercise",
    label: "Exercise intent",
    tint: "violet",
    Icon: FitnessCenterIcon,
    flavor: "code",
    without: {
      primary: '"I want to Exercise"',
      secondary: "Probability: 20%",
    },
    with: {
      primary: "I.exercise()",
      secondary: "Probability: 91%",
    },
    translation: {
      learn: {
        note: "Vague intentions have a fraction of the follow-through that structured commitments do. 4eye detects the intent pattern and encodes it as a defined action — surfacing the commitment so it can actually be tracked and reinforced over time.",
        reframe: "You said you want to exercise. I've logged that as a commitment. Want me to schedule a block and check in with you afterward?",
      },
    },
  },
  {
    id: "household",
    label: "Household ask",
    tint: "teal",
    Icon: HomeIcon,
    flavor: "code",
    without: {
      primary: '"WILL YOU PLEASE TAKE OUT THE TRASH, ****"',
      secondary: "Tense · sharp · escalating",
    },
    with: {
      primary: "🤧🚪😍 — Whose ready for bed?",
      secondary: "Soft · contextual · de-escalating",
    },
    translation: {
      learn: {
        note: "Emotion is typically heightened here — it feels awkward to ask people for things. If they're engaged in an activity, pulling away is frustrating; emotion gets mixed in. Over time we've been trained to associate this kind of request with a negative reaction. We can reframe it as a reward system and surface subtle alternative decision-making cues.",
        reframe: "Careful with how you speak. I know sometimes there are things we don't like, but look forward to everyone's happy faces and a treat.",
      },
    },
  },
  {
    id: "decision",
    label: "Decision making",
    tint: "amber",
    Icon: RestaurantIcon,
    flavor: "code",
    without: {
      primary: '"Should we eat out? I don\'t want to worry about the dishes"',
      secondary: "Hidden constraint · stuck",
    },
    with: {
      primary: "🧾🦿🥳 — What would you prefer?",
      secondary: "Constraint surfaced · choice unblocked",
    },
    translation: {
      learn: {
        note: "Hidden constraints — like not wanting to deal with dishes — often block simple decisions. 4eye detects the real blocker beneath the surface question and reframes the choice to make the actual constraint visible, unblocking the conversation naturally.",
        reframe: "I noticed the real concern is the dishes, not the food. How about we tackle that first and then decide freely?",
      },
    },
  },
  {
    id: "memory",
    label: "Memory of every lesson",
    tint: "amber",
    Icon: HistoryIcon,
    flavor: "capability",
    without: {
      primary: "Notes lost. Past chats forgotten. Lessons re-learned the hard way.",
      secondary: "Nothing carries forward.",
    },
    with: {
      primary: "Old notes, past chats, what you tried before — kept and connected.",
      secondary: "Nothing gets lost.",
    },
  },
  {
    id: "capture",
    label: "Capture in real time",
    tint: "blue",
    Icon: VideocamIcon,
    flavor: "capability",
    without: {
      primary: "Moments slip past. Insights forgotten before bedtime.",
      secondary: "Memory is the only recording device.",
    },
    with: {
      primary: "Video uploads, notes, references — bring any moment in and 4eye learns alongside you.",
      secondary: "Bring anything in.",
    },
  },
  {
    id: "reemerge",
    label: "Re-emerges when needed",
    tint: "violet",
    Icon: ReplayIcon,
    flavor: "capability",
    without: {
      primary: "Knowledge fades. The thing you needed comes to mind a week too late.",
      secondary: "Recall is luck.",
    },
    with: {
      primary: "Spaced repetition resurfaces forgotten links. Learning that compounds, not fades.",
      secondary: "Until it sticks.",
    },
  },
];
