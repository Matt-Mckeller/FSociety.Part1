/**
 * Which recording walks through which document.
 *
 * Matthew records himself reading and talking through the plans, and more of
 * those are coming. A recording and the document it covers are the same idea in
 * two forms, so each should point at the other rather than sitting in separate
 * sections of the site with no connection between them.
 *
 * Keyed by docs slug. Add a row when a recording covers a document; the video
 * id must exist in `./media`.
 */
export interface Walkthrough {
  /** Video id from the VIDEOS manifest. */
  videoId: string;
  /** What the recording adds beyond reading the document. */
  note: string;
}

/** Deprecated mega-essay — prefer the video intro over linking this slug in app chrome. */
export const WEB4_DOC_SLUG = "web4/web-4-projects-story-whoami-whoarewe";

/** Primary Web 4 entry — spoken intro, not the long document. */
export const WEB4_INTRO_HREF = "/videos#web4-plan-walkthrough";

export const WALKTHROUGHS: Record<string, Walkthrough> = {
  [WEB4_DOC_SLUG]: {
    videoId: "web4-plan-walkthrough",
    note:
      "Matthew reads this document end to end on camera — the system intro and map, domains, profiles and identities, the human and computer layers, then the projects themselves.",
  },
};

export function walkthroughFor(slug: string): Walkthrough | undefined {
  return WALKTHROUGHS[slug];
}
