"use client";

/**
 * One subject, two representations.
 *
 * The integration layers exist twice on this site and always have: as a flat
 * documentary ladder, and as the application surface inside 4eye with per-layer
 * panels, media stages, goals and the mini-HUD. Neither is a draft of the other
 * — the ladder is for reading and can be scanned in twenty seconds; the
 * application is for looking at and cannot. Splitting them across two routes
 * meant a reader found whichever one they were linked to and never learned the
 * other existed.
 *
 * ── Why this file sits beside its route ───────────────────────────────────
 * It imports `@4eye/web`, which carries pre-existing type errors that
 * `tsconfig.strict.json` deliberately keeps out of yen's own project. TS
 * exclusion only works when nothing in the program imports the excluded file,
 * so a component under `src/components` cannot do this — importing it anywhere
 * pulls the whole package's errors in. `src/app/4eye` was excluded for exactly
 * this reason; this route joins it, and the ladder stays in `src/components`
 * where it is still strictly checked.
 *
 * The application view is loaded on demand. It brings framer-motion, the HUD
 * and a stack of panels with it, and this route's first-load budget is 150 kB —
 * so it must not be in the bundle for the mode nobody switched to.
 */

import * as React from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { FourEyeBootScreen } from "@4eye/web/components/boot/FourEyeBootScreen";

import { IntegrationLadder } from "@/components/layers/IntegrationLadder";

const IntegrationLayersTile = dynamic(
  () => import("@4eye/web/Tiles/integration-layers").then((m) => m.IntegrationLayersTile),
  {
    ssr: false,
    loading: () => <FourEyeBootScreen label="Loading the application view" />,
  },
);

export type LayerMode = "docs" | "app";

const MODES: Array<{ id: LayerMode; label: string; note: string }> = [
  { id: "docs", label: "Documentation", note: "The eight layers as a read-through." },
  { id: "app", label: "Application", note: "The layer surface as it runs inside 4eye." },
];

export function LayerModes() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  /*
    Default is Application — that is the view people expect when they open
    Integration Layers. Documentation is opt-in via ?mode=docs.
  */
  const mode: LayerMode = params.get("mode") === "docs" ? "docs" : "app";

  const select = React.useCallback(
    (next: LayerMode) => {
      const query = new URLSearchParams(params.toString());
      if (next === "app") query.delete("mode");
      else query.set("mode", "docs");
      const qs = query.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  return (
    <Box>
      <Box
        role="tablist"
        aria-label="Layer view"
        sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}
      >
        {MODES.map((m) => {
          const on = m.id === mode;
          return (
            <Box
              key={m.id}
              component="button"
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => select(m.id)}
              sx={{
                px: 2,
                py: 1,
                textAlign: "left",
                cursor: "pointer",
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: on ? "#14b8a6" : "divider",
                borderLeft: `3px solid ${on ? "#14b8a6" : "transparent"}`,
                bgcolor: on ? "#14b8a610" : "background.paper",
                fontFamily: "inherit",
                "&:focus-visible": { outline: "2px solid #14b8a6", outlineOffset: 2 },
              }}
            >
              <Typography sx={{ fontSize: 14.5, fontWeight: 650, color: on ? "#0f766e" : "text.primary" }}>
                {m.label}
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.25 }}>
                {m.note}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {mode === "app" ? (
        /*
          TileContainer mode="fit" is position:absolute and expects HudShell.
          Under PageShell the absolute child collapses to ~0 height. Give it a
          sized relative host so the full application view actually paints.
        */
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "min(82dvh, 920px)",
            minHeight: 560,
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <IntegrationLayersTile />
          <Box
            sx={{
              position: "absolute",
              right: 12,
              bottom: 12,
              zIndex: 2,
              px: 1.25,
              py: 0.5,
              borderRadius: 1,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              fontSize: 12,
              fontWeight: 600,
            }}
            component="a"
            href="/4eye/integration-layers"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Open in 4eye HUD →
          </Box>
        </Box>
      ) : (
        <IntegrationLadder />
      )}
    </Box>
  );
}
