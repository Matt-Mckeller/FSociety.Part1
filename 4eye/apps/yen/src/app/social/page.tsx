import Link from "next/link";
import { getApp } from "@yen/content";
import { SOCIAL_FEED } from "@yen/content/heart-evolve";
import { PageShell } from "@/components/PageShell";

const app = getApp("social");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

const KIND_COLOR: Record<string, string> = {
  evolve: "#ff5c7a",
  post: "#8b5cf6",
  live: "#ef4444",
  chain: "#0891b2",
};

const PUBLIC_FEED = SOCIAL_FEED.filter((item) => item.kind !== "evolve");

/**
 * Public-facing social hub — posts and live tracking.
 * Yen publishes; platforms redistribute. Profile is the person; this is the stream.
 */
export default function SocialPage() {
  return (
    <PageShell app={app}>
      <div style={{ maxWidth: 1100, display: "flex", flexDirection: "column", gap: 40 }}>
        <div
          role="status"
          style={{
            padding: "14px 16px",
            borderRadius: 10,
            border: "1px solid #d6d3d1",
            background: "#f5f5f4",
            color: "#57534e",
            fontSize: 14,
            lineHeight: 1.55,
          }}
        >
          <strong style={{ color: "#1c1917" }}>Work in progress.</strong> This page is visit-able but unfinished —
          feed and live stub are scaffolded. Meanwhile:{" "}
          <Link href="/posts" style={{ color: "#0c4a39", fontWeight: 650 }}>
            /posts
          </Link>{" "}
          and{" "}
          <Link href="/live" style={{ color: "#0c4a39", fontWeight: 650 }}>
            /live
          </Link>
          .
        </div>

        <header>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: "#78716c",
            }}
          >
            Public stream · under construction
          </p>
          {/* h2, not h1: PageShell already renders the page's h1 from the registry. */}
          <h2 style={{ margin: "8px 0 12px", fontSize: 34, fontWeight: 750, letterSpacing: -0.6 }}>
            Social · posts · live
          </h2>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "#57534e", maxWidth: "68ch" }}>
            Content and presence in one place — writing and live tracking. The person behind it is on{" "}
            <Link href="/4eye/appRealm/profile" style={{ color: "#0c4a39", fontWeight: 650 }}>
              Profile
            </Link>
            .
          </p>
        </header>

        <section>
          <h2 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 750, letterSpacing: 1.1, textTransform: "uppercase", color: "#78716c" }}>
            Feed
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PUBLIC_FEED.map((item) => (
              <article
                key={item.id}
                style={{
                  padding: "14px 16px",
                  borderRadius: 10,
                  border: "1px solid #e7e5e4",
                  borderLeft: `3px solid ${KIND_COLOR[item.kind] ?? "#a8a29e"}`,
                  background: "#fafaf9",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "baseline", marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 0.6,
                      textTransform: "uppercase",
                      color: KIND_COLOR[item.kind] ?? "#78716c",
                    }}
                  >
                    {item.kind}
                  </span>
                  <strong style={{ fontSize: 14.5 }}>{item.title}</strong>
                  <span style={{ fontSize: 12, color: "#a8a29e", marginLeft: "auto" }}>{item.when}</span>
                </div>
                <p style={{ margin: "0 0 8px", fontSize: 14, lineHeight: 1.5, color: "#44403c" }}>{item.body}</p>
                {item.href && (
                  <Link href={item.href} style={{ fontSize: 13, fontWeight: 650, color: "#0c4a39" }}>
                    Open →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              aspectRatio: "16 / 9",
              borderRadius: 12,
              border: "1px solid #e7e5e4",
              background: "radial-gradient(80% 80% at 50% 40%, #1c1917 0%, #0c0a09 100%)",
              display: "grid",
              placeItems: "center",
              color: "#a8a29e",
              fontSize: 14,
              fontWeight: 650,
            }}
          >
            Live · offline stub
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Live tracking</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "#57534e" }}>
              When Matt is live, presence shows here and on{" "}
              <Link href="/live" style={{ color: "#ef4444", fontWeight: 650 }}>
                /live
              </Link>
              . Until accounts lock, this is the honest stub — yen first, platforms later.
            </p>
            <Link
              href="/videos"
              style={{
                alignSelf: "flex-start",
                padding: "9px 14px",
                borderRadius: 8,
                background: "#1c1917",
                color: "#fff",
                fontWeight: 650,
                fontSize: 13.5,
                textDecoration: "none",
              }}
            >
              Watch recordings
            </Link>
          </div>
        </section>

        <p style={{ margin: 0, fontSize: 13.5, color: "#78716c" }}>
          Writing index:{" "}
          <Link href="/posts" style={{ color: "#0c4a39", fontWeight: 650 }}>
            /posts
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
