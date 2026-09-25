"use client";

import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Container, Stack, Typography } from "@mui/material";
import type { AppEntry } from "@yen/content";

import dynamic from "next/dynamic";

/*
  Loaded on demand. The switcher is built on MUI's Menu, which drags Popover,
  Modal and the focus trap behind it — roughly 30 kB that every page using this
  shell was paying for a control most visitors never open. Deferred, that weight
  arrives only when someone actually changes language.

  The placeholder reserves the same footprint so the top rule does not reflow.
*/
const LocaleSwitcher = dynamic(
  () => import("@/i18n/LocaleSwitcher").then((m) => m.LocaleSwitcher),
  { ssr: false, loading: () => <Box sx={{ width: 92, height: 28 }} /> },
);
import { useT } from "@/i18n/LocaleProvider";

import { MediaRecordNav } from "@/components/media/MediaRecordNav";

export interface PageShellProps {
  /**
   * The registry entry, resolved by the server component that renders this
   * shell. Taking the entry rather than an id is what keeps the registry itself
   * out of every client bundle — only the home grid needs all of it.
   */
  app: AppEntry;
  children?: React.ReactNode;
}

const RECORD_NAV_IDS = new Set(["photos", "videos", "social", "posts", "live"]);

export function PageShell({ app, children }: PageShellProps) {
  const t = useT();
  const showRecordNav = RECORD_NAV_IDS.has(app.id);
  return (
    <Box component="main" sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
        <Container maxWidth="laptopL" sx={{ py: { zero: 3, laptop: 5 } }}>
          {/*
            Back-link and language switcher share the top rule. The switcher
            belongs on the chrome rather than beside the content: it changes the
            whole interface, and putting it next to a section would suggest it
            only changes that section — which is exactly the confusion the
            per-video language picker inside the player has to avoid.
          */}
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between", gap: 2, mb: 2.5 }}
          >
            <Box
              component={Link}
              href="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                fontSize: 14,
                fontWeight: 600,
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": { color: "text.primary" },
              }}
            >
              {/* Mirrors under RTL, where "back" points the other way. */}
              <ArrowBackIcon sx={{ fontSize: 17, transform: "scaleX(var(--dir-flip, 1))" }} />
              {t("nav.allApps")}
            </Box>
            <LocaleSwitcher />
          </Stack>

          <Typography
            variant="h1"
            sx={{
              fontSize: { zero: 32, laptop: 44 },
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 1.1,
              borderLeft: `4px solid ${app.accent}`,
              pl: 2,
            }}
          >
            {app.title}
          </Typography>

          <Typography
            sx={{ mt: 2, pl: 2.5, fontSize: { zero: 16, laptop: 18 }, lineHeight: 1.6, color: "text.secondary", maxWidth: "70ch" }}
          >
            {app.lede}
          </Typography>

          {showRecordNav ? <MediaRecordNav /> : null}
        </Container>
      </Box>

      <Container maxWidth="laptopL" sx={{ py: { zero: 4, laptop: 6 } }}>
        {children ?? <NotBuiltYet />}
      </Container>
    </Box>
  );
}

function NotBuiltYet() {
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        border: "1px dashed",
        borderColor: "divider",
        color: "text.secondary",
        maxWidth: "70ch",
      }}
    >
      <Typography sx={{ fontSize: 15, lineHeight: 1.6 }}>
        This route exists and is reachable, but its content has not been wired
        up yet. The shell, routing and budgets are what milestone 1 covers.
      </Typography>
    </Box>
  );
}
