"use client";

/**
 * Role dossier page — long-form description for a single equipped title.
 * Opened from Profile / Character title chips in a new tab.
 */

import * as React from "react";
import { Box, Link as MuiLink, Stack, Typography, alpha } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { BadgeIcon } from "@4eye/icons";
import { route } from "@4eye/web/lib/routes";
import type { RoleTitleOption } from "@4eye/web/Tiles/character/model/titles";

/** Match app-realm Profile jade so title chips → dossier stay continuous. */
const ACCENT = "#35c99b";

export function RoleDossierPage({ role }: { role: RoleTitleOption }) {
  const paragraphs = (role.description ?? role.hint ?? "").split(/\n\n+/).filter(Boolean);

  return (
    <Box
      sx={{
        maxWidth: 720,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
      }}
    >
      <MuiLink
        href={route("/appRealm/character")}
        underline="hover"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          fontSize: 13,
          fontWeight: 650,
          color: "text.secondary",
          mb: 2.5,
        }}
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 16 }} />
        Character
      </MuiLink>

      <Stack
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: alpha(ACCENT, 0.28),
          bgcolor: alpha(ACCENT, 0.04),
          gap: 2,
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(ACCENT, 0.14),
              color: ACCENT,
              border: `1px solid ${alpha(ACCENT, 0.28)}`,
            }}
          >
            <BadgeIcon size={22} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.1,
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              Role
            </Typography>
            <Typography sx={{ fontSize: 26, fontWeight: 800, lineHeight: 1.2, color: "text.primary" }}>
              {role.label}
            </Typography>
          </Box>
        </Stack>

        {role.hint && (
          <Typography sx={{ fontSize: 15.5, fontWeight: 650, lineHeight: 1.5, color: "text.primary" }}>
            {role.hint}
          </Typography>
        )}

        <Stack sx={{ gap: 1.5 }}>
          {paragraphs.map((p) => (
            <Typography
              key={p.slice(0, 48)}
              sx={{ fontSize: 15, lineHeight: 1.65, color: "text.secondary", whiteSpace: "pre-line" }}
            >
              {p}
            </Typography>
          ))}
        </Stack>

        <MuiLink
          href={route("/appRealm/profile")}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            mt: 1,
            fontSize: 13.5,
            fontWeight: 650,
            color: ACCENT,
            width: "fit-content",
          }}
        >
          Open profile
          <OpenInNewRoundedIcon sx={{ fontSize: 15 }} />
        </MuiLink>
      </Stack>
    </Box>
  );
}

export default RoleDossierPage;
