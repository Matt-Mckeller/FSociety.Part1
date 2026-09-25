"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FeedbackScreensExhibit } from "@/components/media/FeedbackScreensExhibit";
import { PhotoLightbox } from "@/components/media/PhotoLightbox";
import { PresentationToggle, usePresentation } from "@/components/media/PresentationMode";
import {
  MEDIA_PLATFORMS,
  detectSourceKind,
  formatDims,
  platformById,
  sizeFitsPlatform,
  type MediaPlatform,
} from "@/content/mediaPlatforms";

export interface Photo {
  id: string;
  title: string;
  description: string;
  src: string;
  width?: number | null;
  height?: number | null;
  sourceWidth?: number | null;
  sourceHeight?: number | null;
  sourceKind?: string | null;
}

export interface Album {
  id: string;
  title: string;
  blurb: string;
  nest?: string;
  kind?: string;
  aspect?: string;
  tags?: string[];
  exportable?: boolean;
  platform?: string | null;
  coverId?: string | null;
  photos: Photo[];
}

const FEEDBACK_PHOTO_IDS = new Set([
  "4up-4up-feedback",
  "4up-4up-feedback2",
  "4up-4up-feedback-v4",
  "4up-4up-feedback-varitions-and-transformations",
  "4up-4up-feedback-v5-compare",
  "4up-4up-feedback-v5-a-scoreoverview",
  "4up-4up-feedback-v5-b-sectionexplorer",
  "4up-4up-feedback-v5-c-actionfirst",
]);

export const NEST_META: Record<string, { label: string; blurb: string }> = {
  growth: {
    label: "Growth",
    blurb: "Instagram story packs — capture, mirror, date, LFM, venture, Heart.Evolve.",
  },
  personal: {
    label: "Personal",
    blurb: "Real presence and IG-ready 4×5 stills — the human Now layer.",
  },
  vision: {
    label: "Vision",
    blurb: "Expanse HQ · Tutorial Island · full-dive learning.",
  },
  design: {
    label: "Design",
    blurb: "Product UI archive — symbol grid, 4up, Web 4, and related studies.",
  },
};

const NEST_ORDER = ["growth", "personal", "vision", "design"] as const;
const KIND_ORDER = ["story", "stills", "vision", "export", "design"] as const;

type Mode = "nests" | "albums" | "exports" | "all";
type Density = "roomy" | "compact" | "mosaic";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "nests", label: "Nests", hint: "Grouped by Growth · Personal · Vision · Design" },
  { id: "albums", label: "Albums", hint: "Cover grid — open one album at a time" },
  { id: "exports", label: "Exports", hint: "Platform-sized packs — Feed, Stories, more" },
  { id: "all", label: "All", hint: "Flat library of every album" },
];

const DENSITIES: { id: Density; label: string }[] = [
  { id: "roomy", label: "Roomy" },
  { id: "compact", label: "Compact" },
  { id: "mosaic", label: "Mosaic" },
];

const MODE_IDS = new Set<Mode>(["nests", "albums", "exports", "all"]);

function albumPhotos(album: Album): Photo[] {
  if (album.id !== "4up") return album.photos;
  return album.photos.filter((p) => !FEEDBACK_PHOTO_IDS.has(p.id));
}

function coverSrc(album: Album): string | null {
  const photos = albumPhotos(album);
  if (!photos.length) return null;
  if (album.coverId) {
    const hit = photos.find((p) => p.id === album.coverId);
    if (hit) return hit.src;
  }
  return photos[0].src;
}

function matchesQuery(album: Album, q: string): boolean {
  if (!q) return true;
  const hay = [
    album.title,
    album.blurb,
    album.kind,
    album.nest,
    ...(album.tags ?? []),
    ...albumPhotos(album).flatMap((p) => [p.title, p.description, p.id]),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function isInstagramPack(album: Album): boolean {
  return (album.tags ?? []).includes("instagram") || Boolean(album.exportable);
}

function parseMode(raw: string | null): Mode | null {
  if (!raw) return null;
  return MODE_IDS.has(raw as Mode) ? (raw as Mode) : null;
}

export function PhotoBrowse({ albums }: { albums: Album[] }) {
  const { app } = usePresentation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialMode = parseMode(searchParams.get("view")) ?? "nests";
  const [mode, setMode] = React.useState<Mode>(initialMode);
  const [density, setDensity] = React.useState<Density>("roomy");
  const [query, setQuery] = React.useState("");
  const [nestFilter, setNestFilter] = React.useState<string | null>(null);
  const [kindFilter, setKindFilter] = React.useState<string | null>(null);
  const [aspectFilter, setAspectFilter] = React.useState<string | null>(null);
  const [tagFilter, setTagFilter] = React.useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = React.useState<string | null>(null);
  const [focusAlbum, setFocusAlbum] = React.useState<string | null>(null);
  const [selecting, setSelecting] = React.useState(false);
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set());
  const [lb, setLb] = React.useState<{ photos: Photo[]; index: number } | null>(null);

  const q = query.trim().toLowerCase();

  React.useEffect(() => {
    const fromUrl = parseMode(searchParams.get("view"));
    if (fromUrl && fromUrl !== mode) setMode(fromUrl);
    // Only react to URL changes (back/forward / external links), not local mode clicks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setBrowseMode = React.useCallback(
    (next: Mode) => {
      setMode(next);
      setFocusAlbum(null);
      if (next === "exports") setTagFilter(null);
      const params = new URLSearchParams(searchParams.toString());
      if (next === "nests") params.delete("view");
      else params.set("view", next);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const allTags = React.useMemo(() => {
    const s = new Set<string>();
    for (const a of albums) for (const t of a.tags ?? []) s.add(t);
    return [...s].sort();
  }, [albums]);

  const filtered = React.useMemo(() => {
    return albums.filter((a) => {
      if (mode === "exports" && !a.exportable) return false;
      if (mode === "exports" && platformFilter) {
        // Exact platform packs for the selected target; hide other platform packs.
        if (a.tags?.includes("platform")) {
          if (a.platform !== platformFilter) return false;
        }
      }
      if (nestFilter && (a.nest ?? "design") !== nestFilter) return false;
      if (kindFilter && (a.kind ?? "design") !== kindFilter) return false;
      if (aspectFilter && (a.aspect ?? "landscape") !== aspectFilter) return false;
      if (tagFilter && !(a.tags ?? []).includes(tagFilter)) return false;
      if (!matchesQuery(a, q)) return false;
      return true;
    });
  }, [albums, mode, nestFilter, kindFilter, aspectFilter, tagFilter, platformFilter, q]);

  const exportInstagram = React.useMemo(
    () => filtered.filter((a) => isInstagramPack(a)),
    [filtered],
  );

  const exportPlatformPacks = React.useMemo(
    () => albums.filter((a) => a.exportable && a.tags?.includes("platform")),
    [albums],
  );

  const exportMasters = React.useMemo(
    () => exportInstagram.filter((a) => !a.tags?.includes("platform")),
    [exportInstagram],
  );

  const activePlatform: MediaPlatform | null = platformFilter
    ? platformById(platformFilter) ?? null
    : null;

  const exportCount = React.useMemo(
    () => albums.filter((a) => a.exportable).length,
    [albums],
  );

  const byNest = NEST_ORDER.map((nest) => ({
    nest,
    ...NEST_META[nest],
    albums: filtered.filter((a) => (a.nest ?? "design") === nest),
  })).filter((g) => g.albums.length > 0);

  const totalImages = filtered.reduce((n, a) => n + albumPhotos(a).length, 0);
  const photoById = React.useMemo(() => {
    const m = new Map<string, Photo>();
    for (const a of albums) for (const p of albumPhotos(a)) m.set(p.id, p);
    return m;
  }, [albums]);

  const clearFilters = () => {
    setQuery("");
    setNestFilter(null);
    setKindFilter(null);
    setAspectFilter(null);
    setTagFilter(null);
    setPlatformFilter(null);
    setFocusAlbum(null);
  };

  const openAlbum = (id: string) => {
    setBrowseMode("nests");
    setFocusAlbum(null);
    requestAnimationFrame(() => {
      document.getElementById(`album-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAlbum = (album: Album) => {
    setSelecting(true);
    setSelected((prev) => {
      const next = new Set(prev);
      for (const p of albumPhotos(album)) next.add(p.id);
      return next;
    });
  };

  const openSelected = () => {
    for (const id of selected) {
      const p = photoById.get(id);
      if (p) window.open(p.src, "_blank", "noopener,noreferrer");
    }
  };

  const copySelected = async () => {
    const urls = [...selected]
      .map((id) => photoById.get(id)?.src)
      .filter(Boolean)
      .join("\n");
    try {
      await navigator.clipboard.writeText(urls);
    } catch {
      /* ignore */
    }
  };

  const openLightbox = (photos: Photo[], index: number) => {
    setLb({ photos, index });
  };

  const exitSelect = () => {
    setSelecting(false);
    setSelected(new Set());
  };

  const displayAlbums =
    focusAlbum && mode === "albums"
      ? filtered.filter((a) => a.id === focusAlbum)
      : filtered;

  const layoutClass = [
    mode === "nests" ? "ph-layout" : "ph-layout ph-layout--wide",
    app ? "ph-layout--app" : "",
    `ph-density--${density}`,
    selecting || selected.size > 0 ? "ph-layout--selecting" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={layoutClass} data-presentation={app ? "app" : "site"}>
      {mode === "nests" && (
        <aside className="ph-rail" aria-label="Photo nests">
          <p className="ph-rail-title">Nests</p>
          <ul className="ph-rail-list">
            {byNest.map((g) => (
              <li key={g.nest}>
                <a className="ph-rail-link" href={`#nest-${g.nest}`}>
                  <span className="ph-rail-label">{g.label}</span>
                  <span className="ph-rail-count">
                    {g.albums.reduce((n, a) => n + albumPhotos(a).length, 0)}
                  </span>
                </a>
                <ul className="ph-rail-albums">
                  {g.albums.map((a) => (
                    <li key={a.id}>
                      <a className="ph-rail-album" href={`#album-${a.id}`}>
                        {a.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="ph-rail-exports">
            <p className="ph-rail-title">Instagram</p>
            <button type="button" className="ph-rail-export-btn" onClick={() => setBrowseMode("exports")}>
              Exports · {exportCount} packs
            </button>
            <p className="ph-rail-hint">
              Publish-ready frames synced from <code>Media/Instagram</code>
            </p>
          </div>
        </aside>
      )}

      <div className="ph-wrap">
        <div className="ph-toolbar">
          <p className="ph-count">
            {totalImages} images · {filtered.length} albums
            {mode === "nests" ? ` · ${byNest.length} nests` : ""}
            {mode === "exports" ? ` · platform exports` : ""}
          </p>

          <div className="ph-toolbar-right">
            <div className="ph-modes" role="tablist" aria-label="Browse perspective">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  title={m.hint}
                  aria-selected={mode === m.id}
                  className={mode === m.id ? "ph-mode ph-mode--active" : "ph-mode"}
                  onClick={() => setBrowseMode(m.id)}
                >
                  {m.label}
                  {m.id === "exports" ? (
                    <span className="ph-mode-badge">{exportCount}</span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="ph-modes ph-modes--density" role="tablist" aria-label="Grid density">
              {DENSITIES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={density === d.id}
                  className={density === d.id ? "ph-mode ph-mode--active" : "ph-mode"}
                  onClick={() => setDensity(d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <PresentationToggle />

            <button
              type="button"
              className={selecting ? "ph-select-toggle ph-select-toggle--on" : "ph-select-toggle"}
              aria-pressed={selecting}
              onClick={() => {
                if (selecting) exitSelect();
                else setSelecting(true);
              }}
            >
              {selecting ? "Done" : "Select"}
            </button>
          </div>
        </div>

        {mode !== "exports" && (
          <div className="ph-exports-banner">
            <div>
              <p className="ph-exports-banner-title">Looking for Instagram exports?</p>
              <p className="ph-exports-banner-blurb">
                Feed vs Stories need different pixels. Open <strong>Exports</strong> — pick a
                platform, use exact-size packs ({exportCount} albums).
              </p>
            </div>
            <button type="button" className="ph-exports-banner-btn" onClick={() => setBrowseMode("exports")}>
              Open Exports
            </button>
          </div>
        )}

        <div className="ph-filters">
          <label className="ph-search">
            <span className="ph-search-label">Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, blurb, tag, Instagram…"
              className="ph-search-input"
            />
          </label>

          <ChipRow
            label="Nest"
            options={NEST_ORDER.map((n) => ({ id: n, label: NEST_META[n].label }))}
            value={nestFilter}
            onChange={setNestFilter}
          />
          <ChipRow
            label="Kind"
            options={KIND_ORDER.map((k) => ({ id: k, label: k }))}
            value={kindFilter}
            onChange={setKindFilter}
          />
          <ChipRow
            label="Aspect"
            options={[
              { id: "portrait", label: "portrait" },
              { id: "landscape", label: "landscape" },
            ]}
            value={aspectFilter}
            onChange={setAspectFilter}
          />
          {allTags.length > 0 && (
            <ChipRow
              label="Tag"
              options={allTags.map((t) => ({ id: t, label: t }))}
              value={tagFilter}
              onChange={setTagFilter}
            />
          )}

          {(query || nestFilter || kindFilter || aspectFilter || tagFilter || platformFilter || focusAlbum) && (
            <button type="button" className="ph-clear" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>

        {(selecting || selected.size > 0) && (
          <div className="ph-select-bar" role="status">
            <span className="ph-select-count">
              {selecting && selected.size === 0
                ? "Tap frames to select — photos stay clean until chosen"
                : `${selected.size} selected`}
            </span>
            {selected.size > 0 && (
              <>
                <button type="button" className="ph-select-btn" onClick={openSelected}>
                  Open files
                </button>
                <button type="button" className="ph-select-btn" onClick={copySelected}>
                  Copy URLs
                </button>
              </>
            )}
            <button type="button" className="ph-select-btn" onClick={exitSelect}>
              Clear
            </button>
          </div>
        )}

        {filtered.length === 0 && <p className="ph-empty">No albums match these filters.</p>}

        {mode === "albums" && !focusAlbum && (
          <div className="ph-album-cards">
            {filtered.map((album) => {
              const cover = coverSrc(album);
              const n = albumPhotos(album).length;
              return (
                <button
                  key={album.id}
                  type="button"
                  className="ph-album-card"
                  onClick={() => setFocusAlbum(album.id)}
                >
                  <span className="ph-album-card-media">
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover} alt="" className="ph-album-card-img" loading="lazy" />
                    ) : (
                      <span className="ph-album-card-ph" />
                    )}
                  </span>
                  <span className="ph-album-card-body">
                    <span className="ph-album-card-title">{album.title}</span>
                    <span className="ph-album-card-meta">
                      {NEST_META[album.nest ?? "design"]?.label ?? album.nest} · {n}
                      {album.exportable ? " · IG export" : ""}
                    </span>
                    <span className="ph-album-card-blurb">{album.blurb}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {mode === "exports" && (
          <div className="ph-exports">
            <header className="ph-exports-head">
              <h2 className="ph-exports-title">Platform exports</h2>
              <p className="ph-exports-blurb">
                Masters in <code>Media/Instagram</code> were mostly <strong>1080×1350 (Feed 4×5)</strong> or{" "}
                <strong>1024×1536 (AI 2:3)</strong> — not Stories. Stories need{" "}
                <strong>1080×1920 (9:16)</strong>. Pick a platform to use the exact-size packs from{" "}
                <code>_exports/</code>, or review masters for fit.
              </p>
            </header>

            <div className="ph-platform-row" aria-label="Target platform">
              <span className="ph-chip-label">Platform</span>
              <button
                type="button"
                className={!platformFilter ? "ph-chip ph-chip--active" : "ph-chip"}
                onClick={() => setPlatformFilter(null)}
              >
                All
              </button>
              {MEDIA_PLATFORMS.filter((p) =>
                ["instagram", "linkedin", "x", "youtube"].includes(p.network),
              ).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={platformFilter === p.id ? "ph-chip ph-chip--active" : "ph-chip"}
                  onClick={() => setPlatformFilter(platformFilter === p.id ? null : p.id)}
                  title={p.blurb}
                >
                  {p.label}
                  <span className="ph-chip-dim">{p.width}×{p.height}</span>
                </button>
              ))}
            </div>

            {activePlatform && (
              <p className="ph-platform-note">
                Target: <strong>{activePlatform.label}</strong> · {activePlatform.width}×
                {activePlatform.height} ({activePlatform.ratio}) — {activePlatform.blurb}
              </p>
            )}

            {exportPlatformPacks.length > 0 && (
              <section className="ph-exports-section">
                <h3 className="ph-exports-section-title">Exact-size packs</h3>
                <div className="ph-album-cards">
                  {exportPlatformPacks
                    .filter((a) => !platformFilter || a.platform === platformFilter)
                    .map((album) => {
                      const cover = coverSrc(album);
                      const photos = albumPhotos(album);
                      const plat = album.platform ? platformById(album.platform) : null;
                      return (
                        <div key={album.id} className="ph-export-card" id={`export-${album.id}`}>
                          <button
                            type="button"
                            className="ph-album-card"
                            onClick={() => openAlbum(album.id)}
                          >
                            <span className="ph-album-card-media ph-album-card-media--story">
                              {cover ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={cover} alt="" className="ph-album-card-img" loading="lazy" />
                              ) : (
                                <span className="ph-album-card-ph" />
                              )}
                            </span>
                            <span className="ph-album-card-body">
                              <span className="ph-album-card-title">{album.title}</span>
                              <span className="ph-album-card-meta">
                                {photos.length} frames
                                {plat
                                  ? ` · ${plat.width}×${plat.height} · ${plat.ratio}`
                                  : " · platform pack"}
                                {" · exact"}
                              </span>
                              <span className="ph-album-card-blurb">{album.blurb}</span>
                            </span>
                          </button>
                          <div className="ph-export-actions">
                            {photos.slice(0, 4).map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                className="ph-export-thumb"
                                onClick={() => openLightbox(photos, photos.indexOf(p))}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.src} alt={p.title} loading="lazy" />
                              </button>
                            ))}
                            <button
                              type="button"
                              className="ph-export-open"
                              onClick={() => selectAlbum(album)}
                            >
                              Select all
                            </button>
                            <button
                              type="button"
                              className="ph-export-open"
                              onClick={() => openAlbum(album.id)}
                            >
                              Open album →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            )}

            <section className="ph-exports-section">
              <h3 className="ph-exports-section-title">Source masters · size check</h3>
              <div className="ph-album-cards">
                {exportMasters.map((album) => {
                  const cover = coverSrc(album);
                  const photos = albumPhotos(album);
                  const sample = photos[0];
                  const kind = detectSourceKind(
                    sample?.sourceWidth ?? sample?.width,
                    sample?.sourceHeight ?? sample?.height,
                  );
                  const fit = activePlatform
                    ? sizeFitsPlatform(
                        sample?.sourceWidth ?? sample?.width,
                        sample?.sourceHeight ?? sample?.height,
                        activePlatform,
                      )
                    : null;
                  return (
                    <div key={album.id} className="ph-export-card" id={`export-${album.id}`}>
                      <button
                        type="button"
                        className="ph-album-card"
                        onClick={() => openAlbum(album.id)}
                      >
                        <span className="ph-album-card-media">
                          {cover ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={cover} alt="" className="ph-album-card-img" loading="lazy" />
                          ) : (
                            <span className="ph-album-card-ph" />
                          )}
                        </span>
                        <span className="ph-album-card-body">
                          <span className="ph-album-card-title">{album.title}</span>
                          <span className="ph-album-card-meta">
                            {photos.length} frames ·{" "}
                            {formatDims(
                              sample?.sourceWidth ?? sample?.width,
                              sample?.sourceHeight ?? sample?.height,
                            )}
                            {kind ? ` · ${kind.label}` : ""}
                          </span>
                          <span className="ph-album-card-blurb">{album.blurb}</span>
                          {fit && fit !== "exact" && activePlatform && (
                            <span className={`ph-fit ph-fit--${fit}`}>
                              {fit === "needs-crop"
                                ? `Needs crop for ${activePlatform.label}`
                                : `Same ratio — scale to ${activePlatform.width}×${activePlatform.height}`}
                            </span>
                          )}
                          {fit === "exact" && activePlatform && (
                            <span className="ph-fit ph-fit--exact">Exact {activePlatform.label} size</span>
                          )}
                        </span>
                      </button>
                      <div className="ph-export-actions">
                        {photos.slice(0, 4).map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            className="ph-export-thumb"
                            onClick={() => openLightbox(photos, photos.indexOf(p))}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.src} alt={p.title} loading="lazy" />
                          </button>
                        ))}
                        <button
                          type="button"
                          className="ph-export-open"
                          onClick={() => selectAlbum(album)}
                        >
                          Select all
                        </button>
                        <button
                          type="button"
                          className="ph-export-open"
                          onClick={() => openAlbum(album.id)}
                        >
                          Open album →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {(mode === "nests" || mode === "all" || (mode === "albums" && focusAlbum)) && (
          <>
            {mode === "nests" || mode === "all"
              ? (mode === "nests"
                  ? byNest
                  : [{ nest: "all", label: "All", blurb: "", albums: displayAlbums }]
                ).map((group) => (
                  <div
                    className="ph-nest"
                    key={group.nest}
                    id={group.nest === "all" ? undefined : `nest-${group.nest}`}
                  >
                    {group.nest !== "all" && (
                      <header className="ph-nest-head">
                        <h2 className="ph-nest-title">{group.label}</h2>
                        <p className="ph-nest-blurb">{group.blurb}</p>
                      </header>
                    )}
                    {group.albums.map((album) => (
                      <AlbumSection
                        key={album.id}
                        album={album}
                        density={density}
                        selecting={selecting}
                        selected={selected}
                        onToggleSelect={toggleSelect}
                        onOpenLightbox={openLightbox}
                        onSelectAlbum={selectAlbum}
                      />
                    ))}
                  </div>
                ))
              : displayAlbums.map((album) => (
                  <AlbumSection
                    key={album.id}
                    album={album}
                    density={density}
                    selecting={selecting}
                    selected={selected}
                    onToggleSelect={toggleSelect}
                    onOpenLightbox={openLightbox}
                    onSelectAlbum={selectAlbum}
                  />
                ))}
          </>
        )}
      </div>

      {lb && (
        <PhotoLightbox
          photos={lb.photos}
          index={lb.index}
          onClose={() => setLb(null)}
          onIndex={(i) => setLb((cur) => (cur ? { ...cur, index: i } : cur))}
        />
      )}
    </div>
  );
}

function ChipRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="ph-chip-row" aria-label={label}>
      <span className="ph-chip-label">{label}</span>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={value === o.id ? "ph-chip ph-chip--active" : "ph-chip"}
          onClick={() => onChange(value === o.id ? null : o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function AlbumSection({
  album,
  density,
  selecting,
  selected,
  onToggleSelect,
  onOpenLightbox,
  onSelectAlbum,
}: {
  album: Album;
  density: Density;
  selecting: boolean;
  selected: Set<string>;
  onToggleSelect: (id: string) => void;
  onOpenLightbox: (photos: Photo[], index: number) => void;
  onSelectAlbum: (album: Album) => void;
}) {
  const photos = albumPhotos(album);
  const portrait = album.aspect === "portrait";
  const gridClass = [
    "ph-grid",
    portrait ? "ph-grid--portrait" : "",
    density === "compact" ? "ph-grid--compact" : "",
    density === "mosaic" ? "ph-grid--mosaic" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="ph-album" id={`album-${album.id}`}>
      <div className="ph-album-head">
        <h3 className="ph-album-title">{album.title}</h3>
        <div className="ph-album-pills">
          {album.kind && <span className="ph-pill">{album.kind}</span>}
          {album.exportable && <span className="ph-pill ph-pill--export">IG export</span>}
          {(album.tags ?? []).slice(0, 4).map((t) => (
            <span key={t} className="ph-pill ph-pill--tag">
              {t}
            </span>
          ))}
        </div>
        {album.exportable && photos.length > 0 && (
          <button type="button" className="ph-album-select" onClick={() => onSelectAlbum(album)}>
            Select album
          </button>
        )}
      </div>
      <p className="ph-album-blurb">{album.blurb}</p>

      {album.id === "4up" && <FeedbackScreensExhibit />}

      {photos.length > 0 && (
        <div className={gridClass}>
          {photos.map((photo, i) => {
            const isOn = selected.has(photo.id);
            return (
              <figure
                className={isOn ? "ph-item ph-item--selected" : "ph-item"}
                key={photo.id}
              >
                <div className="ph-thumb">
                  <button
                    type="button"
                    className="ph-link ph-link--btn"
                    aria-pressed={selecting ? isOn : undefined}
                    onClick={() => {
                      if (selecting) onToggleSelect(photo.id);
                      else onOpenLightbox(photos, i);
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="ph-img"
                      src={photo.src}
                      alt={photo.description || photo.title}
                      loading="lazy"
                      decoding="async"
                    />
                    {isOn && <span className="ph-selected-mark" aria-hidden />}
                  </button>
                </div>
                {density !== "mosaic" && (
                  <figcaption className="ph-cap">
                    <span className="ph-cap-title">{photo.title}</span>
                    {density === "roomy" && photo.description && (
                      <span className="ph-cap-desc">{photo.description}</span>
                    )}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      )}
    </section>
  );
}
