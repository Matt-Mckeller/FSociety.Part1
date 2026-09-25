import Link from "next/link";
import { getApp } from "@yen/content";
import { HIGHLIGHT_SECTIONS } from "@yen/content/highlights";
import { LEARNING_TIPS } from "@yen/content/learning-tips";
import { WEB4_DOC_SLUG } from "@yen/content/walkthroughs";
import index from "@/generated/docs-index.json";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { DriveDocs } from "@/components/docs/DriveDocs";
import { TopicFilter } from "@/components/docs/TopicFilter";
import { topicSlug } from "@/components/docs/topics";
import "./docs.css";

const app = getApp("docs");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

interface Doc {
  slug: string | null;
  title: string;
  summary: string;
  source: string;
  format: string;
  status: string;
  modified: string;
  words?: number;
  /** Download path, present on published binary documents. */
  href?: string;
  /** The status the document declares about itself, verbatim. */
  planStatus?: string | null;
  /** That status sorted into a fixed set, for colour and filtering. */
  planState?: string | null;
  /** Reading-order score, 0–100. Absent on binary documents. */
  score?: number;
  scoreBand?: string;
  /** How long since it was last touched, bucketed. */
  ageBand?: string;
  topics?: string[];
}

/** How recently it was touched, said in words rather than only as a date. */
const AGE_LABEL: Record<string, string> = {
  fresh: "this month",
  recent: "3 months",
  aging: "this year",
  old: "over a year",
};

function DocCard({ doc }: { doc: Doc }) {
  const deprecated = doc.slug === WEB4_DOC_SLUG;
  const meta = (
    <span className="docs-card-meta">
      {doc.modified}
      {doc.words ? ` · ${doc.words.toLocaleString()} words` : ""}
      {deprecated && <> · <span className="docs-badge deprecated">deprecated</span></>}
      {doc.status === "archive" && <> · <span className="docs-badge archive">archive</span></>}
      {doc.format !== "md" && <> · <span className="docs-badge binary">{doc.format}</span></>}
    </span>
  );

  const state = doc.planState ? (
    <span className={`docs-state docs-state-${doc.planState}`}>{doc.planStatus}</span>
  ) : null;

  const inner = (
    <>
      {/* Title row carries the rank, so the two are read together. */}
      <p className="docs-card-title">
        {doc.score != null && (
          <span className={`docs-score docs-score-${doc.scoreBand}`} title="Reading-order score">
            {doc.score}
          </span>
        )}
        {doc.title}
      </p>
      {state}
      {doc.summary && <p className="docs-card-summary">{doc.summary}</p>}
      {meta}
      {doc.ageBand && (
        <span className={`docs-age docs-age-${doc.ageBand}`}>{AGE_LABEL[doc.ageBand]}</span>
      )}
    </>
  );

  /* Slugified so the CSS filter's `~=` can match subjects that contain spaces. */
  const topicAttr = doc.topics?.length ? doc.topics.map(topicSlug).join(" ") : undefined;

  /*
    Binary documents have no rendered page. Those cleared for publication carry
    a download path; anything else was dropped by the indexer rather than shown
    here, so a card without either is a bug worth seeing as a plain block.
  */
  if (!doc.slug) {
    return doc.href ? (
      <a className="docs-card" href={doc.href} download data-topics={topicAttr}>
        {inner}
      </a>
    ) : (
      <div className="docs-card" data-topics={topicAttr}>
        {inner}
      </div>
    );
  }

  return (
    <Link className="docs-card" href={`/docs/${doc.slug}`} data-topics={topicAttr}>
      {inner}
    </Link>
  );
}

/**
 * The curated sections, above the ranked ones.
 *
 * Ranking answers "what should I read first". This answers "what is in here",
 * which no score can: the most valuable material on the site is sections
 * *inside* one enormous plan, and a document-level index cannot point at them.
 */
function Highlights() {
  return (
    <>
      {HIGHLIGHT_SECTIONS.map((section) => (
        <section
          key={section.id}
          className="docs-highlights"
          style={{ ["--accent" as string]: section.accent }}
        >
          <h2 className="docs-highlights-title">{section.title}</h2>
          <p className="docs-highlights-blurb">{section.blurb}</p>
          <div className="docs-highlights-grid">
            {section.items.map((item) => (
              <div key={item.href} className="docs-highlight">
                <Link className="docs-highlight-link" href={item.href}>
                  {item.title}
                </Link>
                <p className="docs-highlight-blurb">{item.blurb}</p>
                {item.seeAlso && (
                  <Link className="docs-highlight-also" href={item.seeAlso.href}>
                    {item.seeAlso.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/**
 * The eight best places to start, across every collection.
 *
 * Capped at two per collection by the indexer, so this is a way into the whole
 * index rather than a shortlist of the four strongest collections.
 */
function TopRanked({ docs }: { docs: Array<Doc & { collection: string; accent: string }> }) {
  if (docs.length === 0) return null;

  return (
    <section className="docs-top">
      <h2 className="docs-top-title">Highest ranked</h2>
      <p className="docs-top-blurb">
        Scored on length, how recently it was touched, the standing of its collection, the status
        it declares, and how many other documents link to it. It is a reading order, not a quality
        judgement — a low score often just means short, old, or deliberately narrow.
      </p>
      <div className="docs-top-grid">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            className="docs-top-card"
            href={`/docs/${doc.slug}`}
            style={{ ["--accent" as string]: doc.accent }}
          >
            <span className={`docs-score docs-score-${doc.scoreBand}`}>{doc.score}</span>
            <span className="docs-top-card-title">{doc.title}</span>
            <span className="docs-top-card-meta">{doc.collection}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LearningTips() {
  return (
    <section className="docs-highlights docs-learning" id="learning-tips">
      <h2 className="docs-highlights-title">Top learning tips</h2>
      <p className="docs-highlights-blurb">
        Color, Spatial, Cyphertext, and Improved Navigation — section pins into the deprecated Web 4
        essay (archive) and the old Command Center strategic-focus surface. Prefer the{" "}
        <Link href="/videos#web4-plan-walkthrough">video intro</Link> first.
      </p>
      <div className="docs-highlights-grid">
        {LEARNING_TIPS.map((tip) => (
          <div key={tip.id} className="docs-highlight" id={`lens-${tip.id}`}>
            <Link className="docs-highlight-link" href={tip.href}>
              {tip.title}
            </Link>
            <p className="docs-highlight-blurb">{tip.blurb}</p>
            <p className="docs-highlight-blurb" style={{ fontSize: 12, color: "#a8a29e" }}>
              {tip.tags.map((t) => `#${t}`).join(" ")}
            </p>
            {tip.seeAlso && (
              <Link className="docs-highlight-also" href={tip.seeAlso.href}>
                {tip.seeAlso.label} →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function DocsFindNav({ collections }: { collections: Array<{ id: string; title: string }> }) {
  return (
    <nav className="docs-find" aria-label="Find in documentation">
      <p className="docs-find-title">Find</p>
      <ul className="docs-find-list">
        <li>
          <a href="#path-strip">Primary path</a>
        </li>
        <li>
          <a href="/vision">Vision</a>
        </li>
        <li>
          <a href="#web4-pin">Web 4 essay</a>
        </li>
        <li>
          <a href="#learning-tips">Learning tips</a>
        </li>
        <li>
          <a href="#docs-highlights">Highlights</a>
        </li>
        <li>
          <a href="#docs-top">Highest ranked</a>
        </li>
        <li>
          <a href="#docs-components">Components / Storybooks</a>
        </li>
        {collections.map((c) => (
          <li key={c.id}>
            <a href={`#collection-${c.id}`}>{c.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function DocsIndexPage() {
  const total = index.collections.reduce((n, c) => n + c.docs.length, 0);

  return (
    <div className="docs-layout">
      <DocsFindNav collections={index.collections} />

      <div className="docs-wrap">
        <Link className="docs-back" href="/">
          ← All applications
        </Link>

        <h1 className="docs-title">{app.title}</h1>
        <p className="docs-lede">{app.lede}</p>
        <p className="docs-lede" style={{ fontSize: 14, marginBottom: 28 }}>
          {total.toLocaleString()} documents across {index.collections.length} collections.
        </p>

        <div className="docs-path-strip" id="path-strip">
          <p className="docs-path-strip-label">Structure path</p>
          <div className="docs-path-strip-row">
            <a href="/videos#web4-plan-walkthrough">Web 4</a>
            <a href="/4eye/appRealm/profile">Profile</a>
            <a href="/4eye-extension">Plans</a>
            <a href="/apps/expanse-edu">EDU</a>
            <a href="/videos">Videos</a>
          </div>
          <p className="docs-web4-pin-blurb">
            Same chip style as home — home has a path-type dropdown (Structure · Content · Teach ·
            Build · Person · Deep read). Engagement pull is content; deep read starts here.
          </p>
        </div>

        <div className="docs-web4-pin" id="web4-pin">
          <p className="docs-web4-pin-label">Web 4 intro</p>
          <Link
            className="docs-web4-pin-link"
            href="/videos#web4-plan-walkthrough"
          >
            Web 4 — the plan, read end to end (video)
          </Link>
          <p className="docs-web4-pin-blurb">
            Spoken intro to the Web 4 system — start here. The long WhoAmI → WhoAreWe essay is
            deprecated and kept only as archive.
          </p>
        </div>

        <DocsSearch />

        <div id="docs-highlights">
          <Highlights />
        </div>

        <LearningTips />

        <div id="docs-top">
          <TopRanked docs={index.topRanked as Array<Doc & { collection: string; accent: string }>} />
        </div>

        <TopicFilter topics={index.topics} />

        <div className="docs-note" id="docs-components">
          Documents marked <span className="docs-badge archive">archive</span> are earlier work kept
          for the record. Later thinking has improved on much of it, but the detail is often still
          worth reading — treat them as history rather than as current guidance. Within each
          collection, documents are ordered by score rather than alphabetically. Component
          Storybooks (potentially incomplete):{" "}
          <Link href="/apps/storybook">/apps/storybook</Link>.
        </div>

        <DriveDocs />

        {index.collections.map((collection) => (
          <section
            className="docs-collection"
            key={collection.id}
            id={`collection-${collection.id}`}
            style={{ ["--accent" as string]: collection.accent }}
          >
            <div className="docs-collection-head">
              <h2 className="docs-collection-title">{collection.title}</h2>
              <span className="docs-collection-count">{collection.docs.length} documents</span>
              {collection.status === "archive" && <span className="docs-badge archive">archive</span>}
            </div>
            <p className="docs-collection-blurb">{collection.blurb}</p>

            <div className="docs-grid">
              {collection.docs.map((doc, i) => (
                <DocCard key={doc.slug ?? `${collection.id}-bin-${i}`} doc={doc as Doc} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
