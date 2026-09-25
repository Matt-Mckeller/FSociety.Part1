"use client";

import { useEffect, useState } from "react";

import { TWITCH_CHANNEL } from "@/lib/site";

/**
 * Twitch player iframe. `parent` must match the hosting hostname or Twitch
 * refuses the embed — resolved on the client so localhost and production both work.
 */
export function TwitchPlayer() {
  const [parent, setParent] = useState<string | null>(null);

  useEffect(() => {
    setParent(window.location.hostname);
  }, []);

  if (!parent) {
    return (
      <div
        style={{
          aspectRatio: "16 / 9",
          borderRadius: 12,
          border: "1px solid #e7e5e4",
          background: "radial-gradient(80% 80% at 50% 40%, #1c1917 0%, #0c0a09 100%)",
        }}
        aria-hidden
      />
    );
  }

  const src = `https://player.twitch.tv/?channel=${encodeURIComponent(TWITCH_CHANNEL)}&parent=${encodeURIComponent(parent)}&autoplay=false`;

  return (
    <div
      style={{
        aspectRatio: "16 / 9",
        borderRadius: 12,
        border: "1px solid #e7e5e4",
        overflow: "hidden",
        background: "#0c0a09",
      }}
    >
      <iframe
        src={src}
        title={`${TWITCH_CHANNEL} on Twitch`}
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        style={{ display: "block", width: "100%", height: "100%", border: 0 }}
      />
    </div>
  );
}
