import { VIDEOS } from "@yen/content/media";
import cutlistJson from "./phenominal-cutlist.json";
import type { CutlistDoc, PublishClip, PublishPlatform } from "../types";
import { clipTier, seriesFromSource, shortPublicSrc } from "./catalog";

export const PHENOMINAL_CUTLIST = cutlistJson as CutlistDoc;

const VIDEO_BY_FILED = new Map(
  VIDEOS.filter((v) => v.filedAs?.includes("Phenominal/shorts/v2_edited/")).map((v) => [
    v.filedAs!,
    v,
  ]),
);

const DEFAULT_PLATFORMS: PublishPlatform[] = ["tiktok", "youtube"];

export function clipsForSource(source: string) {
  return PHENOMINAL_CUTLIST.clips.filter((c) => c.source === source);
}

export function allPublishClips(): PublishClip[] {
  return PHENOMINAL_CUTLIST.clips.map((c) => {
    const series = seriesFromSource(c.source);
    const src = shortPublicSrc(series, c.id);
    const filedAs = `Phenominal/shorts/v2_edited/${series}/${c.id}.mp4`;
    const video = VIDEO_BY_FILED.get(filedAs);
    return {
      id: `${series}/${c.id}`,
      title: video?.title ?? c.title,
      hook: c.hook,
      description: c.description ?? video?.description ?? c.hook,
      platforms: c.platforms?.length ? c.platforms : DEFAULT_PLATFORMS,
      series,
      fileId: c.id,
      src,
      tags: c.tags,
      tier: clipTier(c.id, c.tags),
      filedAs,
      videoId: video?.id ?? null,
      live: Boolean(video),
    };
  });
}

export function aTierClips(): PublishClip[] {
  return allPublishClips().filter((c) => c.tier === "A");
}

export function publishClipById(id: string): PublishClip | undefined {
  return allPublishClips().find((c) => c.id === id || c.fileId === id);
}

export const SOURCE_LABELS: Record<string, string> = {
  godtier: "Godtier · education",
  gov: "Future Gov War",
  vid3: "Vid3 · talking head",
};

export const SOURCE_ORDER = ["godtier", "gov", "vid3"] as const;
