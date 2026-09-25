import Link from "next/link";
import { SERIES, type Series } from "@yen/content/series";
import { VIDEOS } from "@yen/content/media";

/**
 * The three ways in, above the grid.
 *
 * A server component with inline styles rather than MUI. It sits on the home
 * route, whose first-load budget is checked by `scripts/check-bundle-size.mjs`,
 * and the page's own comment records that importing from the `@mui/material`
 * barrel here cost 765 kB the last time someone tried it. Nothing here needs a
 * component library: it is links, headings and a rule.
 *
 * Each card carries a video control whether or not the recording exists. An
 * entry with `src: null` in the media manifest is a deliberate placeholder —
 * the manifest's own doc comment explains why — so the button says the
 * recording is coming and links to where it will appear, rather than being
 * hidden until the file lands and leaving the page silent about it.
 */

/** The recording for a series, and whether it has been shot yet. */
function recordingFor(series: Series) {
  const video = VIDEOS.find((v) => v.id === series.videoId);
  return { video, shot: Boolean(video?.src) };
}

/** Light `**bold**` in series stop notes — content stays React-free. */
function NoteText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} style={{ fontWeight: 600, color: "#57534e" }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function SeriesCard({ series }: { series: Series }) {
  const { video, shot } = recordingFor(series);

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 24,
        borderRadius: 10,
        border: "1px solid #e7e5e4",
        borderTop: `3px solid ${series.accent}`,
        background: "#fff",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: series.accent,
        }}
      >
        Series: {series.name}
      </p>

      <h3 style={{ margin: "8px 0 0", fontSize: 19, fontWeight: 680, lineHeight: 1.3, color: "#1c1917" }}>
        {series.title}
      </h3>

      <p
        style={{
          margin: "10px 0 0",
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "#57534e",
          whiteSpace: "pre-line",
        }}
      >
        {series.blurb}
      </p>

      {/* The stops, as a numbered path rather than a bag of links. */}
      <ol
        style={{
          listStyle: "none",
          margin: "18px 0 0",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {series.stops.map((stop, i) => (
          <li key={stop.href} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span
              style={{
                flexShrink: 0,
                width: 20,
                fontSize: 11,
                fontWeight: 700,
                color: series.accent,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ minWidth: 0 }}>
              <Link
                href={stop.href}
                style={{ fontSize: 14, fontWeight: 650, color: "#1c1917", textDecoration: "none" }}
              >
                {stop.label}
              </Link>
              <span style={{ display: "block", fontSize: 12.5, lineHeight: 1.5, color: "#78716c" }}>
                <NoteText text={stop.note} />
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20, paddingTop: 16, borderTop: "1px solid #f5f5f4" }}>
        <Link
          href={series.entry.href}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            fontSize: 13.5,
            fontWeight: 650,
            textDecoration: "none",
            color: "#fff",
            background: series.accent,
          }}
        >
          {series.entry.label}
        </Link>

        <Link
          href={`/videos#${series.videoId}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 14px",
            borderRadius: 6,
            fontSize: 13.5,
            fontWeight: 650,
            textDecoration: "none",
            color: shot ? "#1c1917" : "#78716c",
            border: "1px solid",
            borderColor: shot ? "#d6d3d1" : "#e7e5e4",
            background: "#fff",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden focusable="false">
            <path d="M8 5.5v13l11-6.5Z" fill="currentColor" opacity={shot ? 1 : 0.45} />
          </svg>
          {shot ? "Watch" : "Recording to come"}
          {video?.duration && (
            <span style={{ color: "#a8a29e", fontWeight: 500 }}>{video.duration}</span>
          )}
        </Link>
      </div>
    </article>
  );
}

export function SeriesHighlights() {
  /*
    Expanse EDU gets its own slot rather than a fourth series. It is a product
    with a market and a pitch deck, not an argument about the architecture, and
    folding it in beside the three would flatten exactly the distinction the
    band exists to draw.
  */
  const eduVideo = VIDEOS.find((v) => v.id === "expanse-edu-walkthrough");
  const eduShot = Boolean(eduVideo?.src);

  return (
    <section
      id="walkthrough"
      style={{
        borderBottom: "1px solid #e7e5e4",
        background: "linear-gradient(180deg, #fafaf9 0%, #fff 100%)",
        scrollMarginTop: 24,
      }}
    >
      <div style={{ maxWidth: 1536, margin: "0 auto", padding: "48px 24px" }}>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: "#78716c",
          }}
        >
          Start here · walkthroughs
        </p>
        <p style={{ margin: "6px 0 20px", fontSize: 15, color: "#57534e", maxWidth: "70ch" }}>
          New here? Prefer videos over picking an app. Start with the site intro and highlights
          explainers (placeholders until recorded), then the three series. Full library at{" "}
          <a href="/videos" style={{ color: "#ef4444", fontWeight: 650 }}>
            /videos
          </a>
          .
        </p>

        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            marginBottom: 24,
          }}
        >
          {[
            {
              id: "site-intro-all",
              title: "Site intro — everything here",
              blurb: "Recording placeholder: the whole yen offer in one walkthrough.",
            },
            {
              id: "highlights-what-is-here",
              title: "Highlights — what is here",
              blurb: "Recording placeholder: inventory tour of series, docs, systems.",
            },
          ].map((v) => (
            <a
              key={v.id}
              href={`/videos#${v.id}`}
              style={{
                display: "block",
                padding: "16px 18px",
                borderRadius: 10,
                border: "1px dashed #c4b5fd",
                background: "#f5f3ff",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#6d28d9",
                }}
              >
                Recording to come
              </span>
              <span style={{ display: "block", marginTop: 6, fontSize: 15.5, fontWeight: 700 }}>
                {v.title}
              </span>
              <span style={{ display: "block", marginTop: 4, fontSize: 13.5, color: "#57534e" }}>
                {v.blurb}
              </span>
            </a>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {SERIES.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 16,
            marginTop: 24,
            padding: "20px 24px",
            borderRadius: 10,
            border: "1px solid #99f6e4",
            background: "#f0fdfa",
          }}
        >
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#0f766e",
              }}
            >
              The product
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "#1c1917" }}>
              <strong>Expanse EDU</strong> is the one with a market, a deck and a finance model. It
              runs here — and this presentation is better than its own website, which is why the
              walkthrough is being recorded against this rather than that.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link
              href="/apps/expanse-edu"
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 650,
                textDecoration: "none",
                color: "#fff",
                background: "#14b8a6",
              }}
            >
              Open Expanse EDU
            </Link>
            <Link
              href={`/videos#expanse-edu-walkthrough`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 14px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 650,
                textDecoration: "none",
                color: eduShot ? "#0f766e" : "#78716c",
                border: "1px solid",
                borderColor: eduShot ? "#5eead4" : "#e7e5e4",
                background: "#fff",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden focusable="false">
                <path d="M8 5.5v13l11-6.5Z" fill="currentColor" opacity={eduShot ? 1 : 0.45} />
              </svg>
              {eduShot ? "Watch" : "Recording to come"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
