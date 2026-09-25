"use client";

/**
 * Compact site-status banner — not full-bleed.
 * Collapsed: one summary line + expand control.
 * Expanded: description, status, release goals.
 * Fair-warning lives on the info tooltip, not in the hero body.
 */

import * as React from "react";
import { Box, Collapse, IconButton, Tooltip, Typography, alpha } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { DISCLAIMER, SITE_OFFER } from "@yen/content/overview";

export function SiteStatusBanner() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      sx={{
        mt: 2.5,
        maxWidth: { zero: "100%", tablet: 520 },
        borderRadius: 2,
        border: "1px solid",
        borderColor: (t) => alpha(t.palette.info.main, 0.35),
        bgcolor: (t) => alpha(t.palette.info.main, t.palette.mode === "dark" ? 0.12 : 0.06),
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 0.75,
          px: 1.5,
          py: 1.15,
        }}
      >
        <Tooltip title={DISCLAIMER} arrow placement="bottom-start" enterTouchDelay={0}>
          <IconButton
            size="small"
            aria-label="Fair warning about this site"
            sx={{ mt: 0.1, color: "info.main" }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>

        <Box sx={{ flex: 1, minWidth: 0, pt: 0.35 }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 750,
              letterSpacing: 1.05,
              textTransform: "uppercase",
              color: "info.main",
              mb: 0.35,
            }}
          >
            Site status
          </Typography>
          <Typography sx={{ fontSize: 13.5, lineHeight: 1.45, color: "text.primary" }}>
            {SITE_OFFER.summary}
          </Typography>
        </Box>

        <IconButton
          size="small"
          aria-expanded={open}
          aria-label={open ? "Collapse site status" : "Expand site status"}
          onClick={() => setOpen((v) => !v)}
          sx={{
            mt: 0.1,
            color: "text.secondary",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 160ms ease",
          }}
        >
          <ExpandMoreRoundedIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Box>

      <Collapse in={open}>
        <Box
          sx={{
            px: 1.75,
            pb: 1.75,
            pt: 0.25,
            borderTop: "1px solid",
            borderColor: (t) => alpha(t.palette.info.main, 0.22),
            ml: 5.25,
            mr: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 13.5, lineHeight: 1.55, color: "text.primary", mb: 1.1 }}>
            {SITE_OFFER.description}
          </Typography>
          <Typography sx={{ fontSize: 13, lineHeight: 1.5, color: "text.secondary", mb: 1.1 }}>
            <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
              Status ·{" "}
            </Box>
            {SITE_OFFER.status}
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.1 }}>
            {SITE_OFFER.goals.map((g) => (
              <Typography
                key={g}
                component="li"
                sx={{ fontSize: 13, lineHeight: 1.5, color: "text.secondary" }}
              >
                {g}
              </Typography>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
