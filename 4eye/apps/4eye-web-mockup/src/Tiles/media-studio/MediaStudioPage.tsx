"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  ButtonBase,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import MovieFilterRoundedIcon from "@mui/icons-material/MovieFilterRounded";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";
import { TileContainer } from "@expanse/hud";
import { route } from "@4eye/web/lib/routes";
import { useOpenSceneStudio } from "@4eye/web/Tiles/scene-studio";
import type { MediaFolder, MediaStudioTab } from "./types";
import { MediaStudioTabs } from "./components/MediaStudioTabs";
import { LibraryPanel } from "./components/LibraryPanel";
import { CutPanel } from "./components/CutPanel";
import { PublishPanel } from "./components/PublishPanel";

const TAB_IDS: MediaStudioTab[] = ["library", "cut", "publish"];

function readTabFromHash(): MediaStudioTab {
  if (typeof window === "undefined") return "library";
  const raw = window.location.hash.replace(/^#/, "");
  return TAB_IDS.includes(raw as MediaStudioTab) ? (raw as MediaStudioTab) : "library";
}

/**
 * Media Studio — action destination for Make media.
 *
 * Separated from Sequences (roadmap) and Scene Studio (storyboard/gallery),
 * but linked from both. Tabs: Library · Cut · Publish.
 */
export default function MediaStudioPage() {
  const theme = useTheme();
  const openSceneStudio = useOpenSceneStudio();
  const [tab, setTab] = useState<MediaStudioTab>("library");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>("phenominal");
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);

  useEffect(() => {
    setTab(readTabFromHash());
    const onHash = () => setTab(readTabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const changeTab = useCallback((next: MediaStudioTab) => {
    setTab(next);
    if (typeof window !== "undefined") {
      const url = `${window.location.pathname}${window.location.search}#${next}`;
      window.history.replaceState(null, "", url);
    }
  }, []);

  const onSelectFolder = useCallback(
    (folder: MediaFolder) => {
      setSelectedFolderId(folder.id);
      if (folder.pipeline) changeTab("cut");
    },
    [changeTab],
  );

  const onSelectClipFromCut = useCallback(
    (clipKey: string) => {
      setSelectedClipId(clipKey);
      changeTab("publish");
    },
    [changeTab],
  );

  /** yen Videos lives at site root, not under /4eye. */
  const videosHref = "/videos";

  return (
    <TileContainer mode="fit">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            px: { xs: 2, md: 3 },
            pt: 2.5,
            pb: 1.75,
            borderBottom: "1px solid",
            borderColor: "divider",
            background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 100%)`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              mb: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
              <ButtonBase
                component={Link}
                href={route("/appRealm/map")}
                aria-label="Back to Sequences"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  color: "text.secondary",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { color: "text.primary", bgcolor: "action.hover" },
                }}
              >
                <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
              </ButtonBase>
              <MovieFilterRoundedIcon sx={{ fontSize: 22, color: "primary.main" }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
                  Media Studio
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  Action · library, cut, publish
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <MediaStudioTabs tab={tab} onChange={changeTab} />
              <ButtonBase
                onClick={() => openSceneStudio("gallery")}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.6,
                  px: 1.25,
                  py: 0.7,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.secondary",
                  fontSize: 11,
                  fontWeight: 700,
                  "&:hover": {
                    color: "text.primary",
                    bgcolor: "action.hover",
                  },
                }}
              >
                <MovieCreationRoundedIcon sx={{ fontSize: 14 }} />
                Scene Studio
              </ButtonBase>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          {tab === "library" && (
            <LibraryPanel selectedId={selectedFolderId} onSelect={onSelectFolder} />
          )}
          {tab === "cut" && (
            <CutPanel selectedClipId={selectedClipId} onSelectClip={onSelectClipFromCut} />
          )}
          {tab === "publish" && (
            <PublishPanel
              videosHref={videosHref}
              selectedClipId={selectedClipId}
              onSelectClip={setSelectedClipId}
            />
          )}
        </Box>
      </Box>
    </TileContainer>
  );
}
