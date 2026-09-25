import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/*
  1200×630 is the size every unfurler crops to. Twitter/X, Slack, Discord and
  iMessage all read the same og:image, so one card covers all of them — provided
  `metadataBase` is set in the root layout, which is what makes this resolve to
  an absolute URL.

  Text only, on purpose: a card has to stay legible at ~400px wide in a Slack
  sidebar, and screenshots of a dense UI do not survive that.
*/

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f172a",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              color: "#fafaf9",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 44, color: "#a8a29e", lineHeight: 1.3 }}>
            {SITE_TAGLINE}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 6, background: "#22c55e" }} />
          <div style={{ fontSize: 30, color: "#78716c" }}>Matthew McKeller</div>
        </div>
      </div>
    ),
    size,
  );
}
