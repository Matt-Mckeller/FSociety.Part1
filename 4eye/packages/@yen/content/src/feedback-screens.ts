/**
 * 4up AI feedback / guided-editor screen captures — versioned like video cuts
 * and profile pairs.
 *
 * The unit of selection is a **revision of the feedback UI**, not a single PNG.
 * v6 is AIGuidedEditor V7 (flat chrome, outlined content-type chips, FeedbackScreens
 * modes). Earlier cuts stay in the branch for comparison.
 */

export interface FeedbackScreenShot {
  id: string;
  label: string;
  alt: string;
  src: string;
}

export interface FeedbackScreenVersion {
  /** Semantic label — "v1", "v6". */
  id: string;
  label: string;
  /** Which version this was cut from, or null for the root. */
  parent: string | null;
  date?: string;
  /** What changed. The reason the version list is worth having. */
  note: string;
  /** One or more shots that form this cut. */
  shots: FeedbackScreenShot[];
  /** The one shown by default. Exactly one in the series. */
  current?: boolean;
}

export const FEEDBACK_SCREENS = {
  id: "4up-feedback",
  title: "AI Feedback screens",
  eyebrow: "4up · generation",
  body:
    "How the guided-create feedback surface looked across revisions. Switch versions to compare; v6 is the current AIGuidedEditor V7 polish from Storybook.",
  accent: "#0f766e",
  versions: [
    {
      id: "v1",
      label: "v1 — first feedback panel",
      parent: null,
      date: "2026-07",
      note: "Earliest AI feedback capture — score and tips in a dense card.",
      shots: [
        {
          id: "panel",
          label: "Feedback panel",
          alt: "Early 4up AI feedback panel screenshot",
          src: "/media/photos/4up/4up-4up-feedback.jpg",
        },
      ],
    },
    {
      id: "v2",
      label: "v2 — second pass",
      parent: "v1",
      date: "2026-07",
      note: "Richer layout with more scoring detail and side structure.",
      shots: [
        {
          id: "panel",
          label: "Feedback panel",
          alt: "Second 4up AI feedback panel revision",
          src: "/media/photos/4up/4up-4up-feedback2.jpg",
        },
      ],
    },
    {
      id: "v3",
      label: "v3 — variations & transforms",
      parent: "v2",
      date: "2026-07",
      note: "Feedback shown alongside content variations and transformation options.",
      shots: [
        {
          id: "panel",
          label: "Variations + feedback",
          alt: "4up feedback with variations and transformations",
          src: "/media/photos/4up/4up-4up-feedback-varitions-and-transformations.jpg",
        },
      ],
    },
    {
      id: "v4",
      label: "v4 — guided editor panel",
      parent: "v3",
      date: "2026-07",
      note: "Feedback integrated into the AI guided editor surface (pre–FeedbackScreens rewrite).",
      shots: [
        {
          id: "panel",
          label: "Guided editor feedback",
          alt: "4up Feedback v4 guided editor panel",
          src: "/media/photos/4up/4up-4up-feedback-v4.jpg",
        },
      ],
    },
    {
      id: "v5",
      label: "v5 — FeedbackScreens",
      parent: "v4",
      date: "2026-08-11",
      note:
        "Three independent information architectures: Score overview, Section explorer, Action-first. Same ContentFeedback fixture; compare in Storybook under Screens/FeedbackScreens.",
      shots: [
        {
          id: "compare",
          label: "Compare all three",
          alt: "FeedbackScreens Compare All Three — Variations A, B, and C side by side",
          src: "/media/photos/4up/4up-4up-feedback-v5-compare.jpg",
        },
        {
          id: "a",
          label: "A · Score overview",
          alt: "FeedbackScreens Variation A — ScoreOverviewScreen",
          src: "/media/photos/4up/4up-4up-feedback-v5-a-scoreoverview.jpg",
        },
        {
          id: "b",
          label: "B · Section explorer",
          alt: "FeedbackScreens Variation B — SectionExplorerScreen",
          src: "/media/photos/4up/4up-4up-feedback-v5-b-sectionexplorer.jpg",
        },
        {
          id: "c",
          label: "C · Action-first",
          alt: "FeedbackScreens Variation C — ActionFirstScreen",
          src: "/media/photos/4up/4up-4up-feedback-v5-c-actionfirst.jpg",
        },
      ],
    },
    {
      id: "v6",
      label: "v6 — AIGuidedEditor V7 (current)",
      parent: "v5",
      date: "2026-08-11",
      note:
        "Full guided editor polish: flat surfaces, outlined content-type chips (no emoji icons), 4eye teal chrome, ProfileChip. Three shells — Calm Workbench, Focused Write, Character Studio — with FeedbackPanel + FeedbackScreens view modes.",
      shots: [
        {
          id: "compare",
          label: "Compare shells",
          alt: "AIGuidedEditor V7 Compare Shells — Calm Workbench, Focused Write, Character Studio",
          src: "/media/photos/4up/4up-4up-feedback-v6-compare.jpg",
        },
        {
          id: "a",
          label: "A · Calm Workbench",
          alt: "AIGuidedEditor V7A Calm Workbench",
          src: "/media/photos/4up/4up-4up-feedback-v6-a-calmworkbench.jpg",
        },
        {
          id: "b",
          label: "B · Focused Write",
          alt: "AIGuidedEditor V7B Focused Write",
          src: "/media/photos/4up/4up-4up-feedback-v6-b-focusedwrite.jpg",
        },
        {
          id: "c",
          label: "C · Character Studio",
          alt: "AIGuidedEditor V7C Character Studio",
          src: "/media/photos/4up/4up-4up-feedback-v6-c-characterstudio.jpg",
        },
      ],
      current: true,
    },
  ] satisfies FeedbackScreenVersion[],
} as const;

export function currentFeedbackVersion(): FeedbackScreenVersion {
  const versions = FEEDBACK_SCREENS.versions as FeedbackScreenVersion[];
  return versions.find((v) => v.current) ?? versions[versions.length - 1];
}
