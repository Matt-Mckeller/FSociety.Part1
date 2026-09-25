/**
 * Posts.
 *
 * Short-form entries live here directly. Anything long enough to want headings
 * should become MDX under the docs pipeline instead, and link out from here.
 */

export interface PostEntry {
  id: string;
  title: string;
  /** ISO date, e.g. "2026-08-06". */
  date: string;
  /** One-line summary for the index. */
  excerpt: string;
  /** Body paragraphs. Plain strings — no markup. */
  body: string[];
  tags?: string[];
}

export const POSTS: PostEntry[] = [
  {
    id: "one-place",
    title: "Putting it all in one place",
    date: "2026-08-06",
    excerpt:
      "Several years of applications, documentation and media had accumulated across a dozen directories. This is the consolidation.",
    body: [
      "The work had spread out. Applications in one repository, documentation in another, plans in a third, and a good deal of finished work that no navigation ever pointed at — features fully built and reachable only by typing a URL nobody had written down.",
      "The consolidation started by counting. Thirty-three routes existed; seven had no navigation entry at all, and five more features had been built with no route pointing at them. Roughly 1.2 MB of working code that no visitor could reach.",
      "So the first job was not building. It was finding what already existed and giving it a way in.",
    ],
    tags: ["build", "process"],
  },
];
