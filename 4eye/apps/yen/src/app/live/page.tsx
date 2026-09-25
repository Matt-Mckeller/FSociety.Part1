import Link from "next/link";
import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { TwitchPlayer } from "@/components/media/TwitchPlayer";
import { TWITCH_CHANNEL, TWITCH_CHANNEL_URL } from "@/lib/site";

const app = getApp("live");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

/** Placeholder chain until more platform accounts are locked. */
const CHAIN = [
  {
    id: "c1",
    platform: "Yen",
    handle: "@matthew",
    when: "Publisher of record",
    body: "This page is where presence lands. Twitch carries the live signal for now.",
  },
  {
    id: "c2",
    platform: "Twitch",
    handle: TWITCH_CHANNEL,
    when: "Live embed",
    body: "Primary live channel — embedded above, open on Twitch for chat and follows.",
    href: TWITCH_CHANNEL_URL,
  },
  {
    id: "c3",
    platform: "YouTube / X / Instagram",
    handle: "TBD",
    when: "Pending account lock",
    body: "Long-form VODs and short presence once accounts are locked.",
  },
] as const;

/**
 * Live presence. Twitch embeds the stream; VOD falls back to /videos.
 * The site is the publisher of record — platforms redistribute.
 */
export default function LivePage() {
  return (
    <PageShell app={app}>
      <div style={{ maxWidth: "80ch", display: "flex", flexDirection: "column", gap: 28 }}>
        <TwitchPlayer />

        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "#57534e" }}>
          When Matt is live, this is the page — stream via{" "}
          <a
            href={TWITCH_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#9146ff", fontWeight: 650 }}
          >
            twitch.tv/{TWITCH_CHANNEL}
          </a>
          . When offline, the walkthroughs on{" "}
          <Link href="/videos" style={{ color: "#ef4444", fontWeight: 650 }}>
            Videos
          </Link>{" "}
          are the record.
        </p>

        <section>
          <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>Social chain feed</h2>
          <p style={{ margin: "0 0 16px", fontSize: 14.5, lineHeight: 1.55, color: "#57534e" }}>
            Combined feed across platforms — Twitch is wired; other accounts still pending.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CHAIN.map((item) => (
              <article
                key={item.id}
                style={{
                  padding: "14px 16px",
                  borderRadius: 10,
                  border: "1px solid #e7e5e4",
                  background: "#fafaf9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    alignItems: "baseline",
                    marginBottom: 6,
                  }}
                >
                  <strong style={{ fontSize: 14 }}>{item.platform}</strong>
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 12.5, color: "#9146ff", fontWeight: 600 }}
                    >
                      {item.handle}
                    </a>
                  ) : (
                    <span style={{ fontSize: 12.5, color: "#78716c" }}>{item.handle}</span>
                  )}
                  <span style={{ fontSize: 12, color: "#a8a29e", marginLeft: "auto" }}>{item.when}</span>
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#44403c" }}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <a
            href={TWITCH_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              background: "#9146ff",
              color: "#fff",
              fontWeight: 650,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Open on Twitch
          </a>
          <Link
            href="/videos"
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              background: "#1c1917",
              color: "#fff",
              fontWeight: 650,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Watch recordings
          </Link>
          <Link
            href="/#walkthrough"
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid #d6d3d1",
              color: "#1c1917",
              fontWeight: 650,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Home walkthrough band
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
