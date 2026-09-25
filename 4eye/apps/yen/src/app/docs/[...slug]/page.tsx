import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import index from "@/generated/docs-index.json";
import { walkthroughFor, WEB4_DOC_SLUG, WEB4_INTRO_HREF } from "@yen/content/walkthroughs";
import { VIDEOS } from "@yen/content/media";
import "../docs.css";

const HTML_DIR = join(process.cwd(), "src/generated/docs");

interface Params {
  params: { slug: string[] };
}

/*
  Declared rather than inferred from the JSON. Binary entries carry no `slug`
  or `words`, so the inferred type is a union and a `.filter()` on `slug` does
  not narrow it — every field access then fails on the binary variant.
*/
interface RenderableDoc {
  slug: string;
  title: string;
  summary: string;
  source: string;
  status: string;
  modified: string;
  words?: number;
  collectionTitle: string;
  accent: string;
}

const ALL: RenderableDoc[] = index.collections.flatMap((c) =>
  c.docs
    .filter((d): d is typeof d & { slug: string } => Boolean(d.slug))
    .map((d) => ({
      slug: d.slug,
      title: d.title,
      summary: d.summary,
      source: d.source,
      status: d.status,
      modified: d.modified,
      words: "words" in d ? d.words : undefined,
      collectionTitle: c.title,
      accent: c.accent,
    })),
);

function find(slug: string[]) {
  return ALL.find((d) => d.slug === slug.join("/"));
}

export function generateStaticParams() {
  return ALL.map((d) => ({ slug: d.slug!.split("/") }));
}

/*
  Documents allowed into search results. Everything else in the corpus is
  `noindex` — see below.
*/
const INDEXABLE_SLUGS = new Set<string>([WEB4_DOC_SLUG]);

export function generateMetadata({ params }: Params) {
  const doc = find(params.slug);
  if (!doc) return { title: "Not found" };
  const deprecated = doc.slug === WEB4_DOC_SLUG ? "Deprecated — " : "";

  /*
    The archive is `noindex, follow` by default.

    These are working documents written between 2023 and 2026 and imported
    as-is, not pages written to be read by a stranger arriving from a search
    result. There are ~520 of them against roughly fifteen real routes, so
    indexed they would outnumber the site by 35:1 and become what the domain
    appears to be about. Google's guidance on helpful content is site-level: a
    large body of thin, unedited pages affects how the whole domain is judged.

    `follow` stays on so link equity still flows and the crawler can see the
    rest of the site. Promote a document by adding its slug to INDEXABLE_SLUGS —
    that is the curation mechanism, and it is deliberately manual.
  */
  const indexable = INDEXABLE_SLUGS.has(doc.slug);

  return {
    title: `${deprecated}${doc.title}`,
    description: doc.summary,
    robots: indexable ? undefined : { index: false, follow: true },
  };
}

export default function DocPage({ params }: Params) {
  const doc = find(params.slug);
  if (!doc) notFound();

  /*
    The body was converted to HTML at build time by scripts/build-docs-index.mjs,
    so no markdown parser ships to the browser. Content is our own documentation
    read off disk during the build, not user input.
  */
  const html = readFileSync(join(HTML_DIR, `${doc.slug.replace("/", "__")}.html`), "utf8");

  const walkthrough = walkthroughFor(doc.slug);
  const video = walkthrough ? VIDEOS.find((v) => v.id === walkthrough.videoId) : undefined;
  const deprecated = doc.slug === WEB4_DOC_SLUG;

  return (
    <div className="docs-wrap">
      <Link className="docs-back" href="/docs">
        ← {doc.collectionTitle}
      </Link>

      <h1 className="docs-title" style={{ fontSize: 34 }}>
        {doc.title}
      </h1>

      <p className="docs-card-meta" style={{ display: "block", marginBottom: 28 }}>
        {deprecated && (
          <>
            <span className="docs-badge deprecated">deprecated</span>
            {" · "}
          </>
        )}
        {doc.modified}
        {doc.words ? ` · ${doc.words.toLocaleString()} words` : ""} · <code>{doc.source}</code>
      </p>

      {deprecated && (
        <div className="docs-note docs-note-deprecated">
          Deprecated. Prefer the{" "}
          <Link href={WEB4_INTRO_HREF}>Web 4 video intro</Link> — this long essay is kept only as
          archive.
        </div>
      )}

      {doc.status === "archive" && (
        <div className="docs-note">
          Written earlier and kept for the record. Later work has improved on much of this, but the
          detail here is still worth reading — treat it as history rather than current guidance.
        </div>
      )}

      {/*
        Provenance, on every document.

        Without it a stranger arriving here reads an unedited planning note as
        though it were published writing, and judges the whole site by it. One
        sentence changes the frame from sloppy to archival, and it is honest:
        these were written to think with, not to be read by someone else.
      */}
      <p className="docs-provenance">
        A working document, imported as written. Not edited for publication.
      </p>

      {video && walkthrough && (
        <Link className="docs-walkthrough" href={`/videos#${video.id}`}>
          {video.poster && (
            <img
              className="docs-walkthrough-poster"
              src={video.poster}
              alt={`Still from the walkthrough video: ${video.title}`}
              loading="lazy"
            />
          )}
          <span className="docs-walkthrough-body">
            <span className="docs-walkthrough-label">
              Walkthrough{video.duration ? ` · ${video.duration}` : ""}
            </span>
            <span className="docs-walkthrough-title">{video.title}</span>
            <span className="docs-walkthrough-note">{walkthrough.note}</span>
          </span>
        </Link>
      )}

      <article className="docs-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
