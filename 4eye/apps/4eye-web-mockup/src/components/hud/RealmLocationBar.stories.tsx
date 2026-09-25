"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";
import { NavigationProvider } from "@expanse/map";
import { ActiveMapProvider } from "@expanse/hud";

import { APP_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/appNavigationConfig";
import { WEBSITE_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/websiteNavigationConfig";
import type { RealmKey } from "@4eye/web/lib/hud/realmRegistry";

import { RealmLocationBar } from "./RealmLocationBar";

// =============================================================================
// Provider shell
// =============================================================================

function RealmShell({
  realm,
  children,
}: {
  realm: RealmKey;
  children: React.ReactNode;
}) {
  const config =
    realm === "app" ? APP_HUD_NAV_CONFIG : WEBSITE_HUD_NAV_CONFIG;
  return (
    <ActiveMapProvider<RealmKey> defaultMap={realm}>
      <NavigationProvider config={config}>{children}</NavigationProvider>
    </ActiveMapProvider>
  );
}

// =============================================================================
// Story: Default
// =============================================================================

function DefaultStory() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0d1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 6,
        gap: 3,
      }}
    >
      <RealmShell realm="website">
        <RealmLocationBar />
      </RealmShell>

      <Typography
        variant="caption"
        sx={{
          color: "rgba(147,197,253,0.4)",
          fontFamily: "monospace",
          letterSpacing: 0.5,
          textAlign: "center",
        }}
      >
        Click the realm label to expand the realm picker · click a realm to
        switch · click the page swatch for tile info
      </Typography>
    </Box>
  );
}

// =============================================================================
// Story: AllRealms
// =============================================================================

const REALM_ROWS: { realm: RealmKey; label: string }[] = [
  { realm: "website", label: "Website realm" },
  { realm: "app", label: "App realm" },
  { realm: "technical", label: "Technical realm (no map grid)" },
];

function AllRealmsStory() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0d1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        py: 6,
      }}
    >
      {REALM_ROWS.map(({ realm, label }) => (
        <Box
          key={realm}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <RealmShell realm={realm}>
            <RealmLocationBar />
          </RealmShell>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(147,197,253,0.3)",
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: 0.4,
            }}
          >
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

// =============================================================================
// Story: InContext
// =============================================================================

const bracketArm = 28;
const bracketThickness = 1;
const bracketColor = "rgba(99,179,237,0.65)";

function CornerBracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const inset = 10;
  const h = {
    position: "absolute" as const,
    width: bracketArm,
    height: bracketThickness,
    bgcolor: bracketColor,
  };
  const v = {
    position: "absolute" as const,
    width: bracketThickness,
    height: bracketArm,
    bgcolor: bracketColor,
  };
  if (pos === "tl")
    return (
      <>
        <Box sx={{ ...h, top: inset, left: inset }} />
        <Box sx={{ ...v, top: inset, left: inset }} />
      </>
    );
  if (pos === "tr")
    return (
      <>
        <Box sx={{ ...h, top: inset, right: inset }} />
        <Box sx={{ ...v, top: inset, right: inset }} />
      </>
    );
  if (pos === "bl")
    return (
      <>
        <Box sx={{ ...h, bottom: inset, left: inset }} />
        <Box sx={{ ...v, bottom: inset, left: inset }} />
      </>
    );
  return (
    <>
      <Box sx={{ ...h, bottom: inset, right: inset }} />
      <Box sx={{ ...v, bottom: inset, right: inset }} />
    </>
  );
}

function InContextStory() {
  return (
    <Box sx={{ position: "fixed", inset: 0, bgcolor: "#080c12" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 16,
          borderRadius: 2,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, #0f1724 0%, #080c12 100%)",
          border: "1px solid rgba(99,179,237,0.12)",
        }}
      >
        {/* Corner brackets */}
        {(["tl", "tr", "bl", "br"] as const).map((p) => (
          <CornerBracket key={p} pos={p} />
        ))}

        {/* Top strip */}
        <Box
          sx={{
            pt: 1.5,
            pb: 1.5,
            display: "flex",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
            background:
              "linear-gradient(to bottom, rgba(99,179,237,0.06) 0%, transparent 100%)",
          }}
        >
          <RealmShell realm="website">
            <RealmLocationBar />
          </RealmShell>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,179,237,0.5) 25%, rgba(99,179,237,0.8) 50%, rgba(99,179,237,0.5) 75%, transparent 100%)",
            "@keyframes divPulse": {
              "0%, 100%": { opacity: 0.9 },
              "50%": { opacity: 0.3 },
            },
            animation: "divPulse 2.8s ease-in-out infinite",
          }}
        />

        {/* Placeholder map area */}
        <Box
          sx={{
            position: "absolute",
            top: 72,
            bottom: 0,
            left: 0,
            right: 0,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: 1.5,
            p: 3,
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Box
              key={i}
              sx={{
                borderRadius: 1.5,
                bgcolor: "rgba(99,179,237,0.03)",
                border: "1px solid rgba(99,179,237,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(99,179,237,0.25)",
                fontSize: 10,
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              {i + 1}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// =============================================================================
// Meta + exports
// =============================================================================

const meta: Meta = {
  title: "HUD / Map / RealmLocationBar",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#080c12" }],
    },
  },
};

export default meta;

export const Default: StoryObj = {
  name: "Default",
  render: () => <DefaultStory />,
};

export const AllRealms: StoryObj = {
  name: "All Realms",
  render: () => <AllRealmsStory />,
};

export const InContext: StoryObj = {
  name: "In Context",
  render: () => <InContextStory />,
};
