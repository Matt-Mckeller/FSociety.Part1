"use client";

import { useState } from "react";
import {
  Box,
  ButtonBase,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import { useExploration } from "@4eye/web/components/exploration";
import type { TranslationMode } from "@4eye/web/Tiles/home/slides/see/state/seeTypes";

const MODE_LABELS: Record<TranslationMode, string> = {
  enable: "Enable",
  learn: "Learn",
};

/**
 * TranslationToggle — single-pill dropdown that lives beneath an ArrowFlow
 * arrow on rows that ship a translation reframe. Visually it keeps the
 * existing pill aesthetic; behaviorally it opens a small menu listing
 * Enable (primary, default) and Learn (secondary, "show context"). The
 * selected mode still drives the right-side WithCell content swap via the
 * `onChange` prop.
 */
export function TranslationToggle({
  mode,
  onChange,
  tintColor,
}: {
  mode: TranslationMode;
  onChange: (m: TranslationMode) => void;
  tintColor: string;
}) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);
  const { exploreOnce } = useExploration();

  const handleSelect = (m: TranslationMode) => {
    exploreOnce("action:lens-toggle");
    onChange(m);
    setAnchor(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <Typography
        sx={{
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          fontWeight: 600,
          textTransform: "uppercase",
          color: "text.disabled",
          lineHeight: 1,
        }}
      >
        Translation
      </Typography>
      <ButtonBase
        onClick={(e) => setAnchor(e.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Translation type"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          bgcolor: "background.paper",
          border: "1px solid rgba(15,23,42,0.10)",
          borderRadius: 999,
          px: 1.6,
          py: 0.4,
          fontSize: "0.78rem",
          fontWeight: 700,
          color: "text.primary",
          lineHeight: 1.3,
          boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
          transition: "all 0.15s",
          "&:hover": {
            bgcolor: `${tintColor}10`,
            borderColor: `${tintColor}55`,
            color: tintColor,
          },
          ...(open && {
            bgcolor: `${tintColor}10`,
            borderColor: `${tintColor}55`,
            color: tintColor,
          }),
        }}
      >
        {MODE_LABELS[mode]}
        <KeyboardArrowDownIcon
          sx={{
            fontSize: 16,
            transition: "transform 0.15s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </ButtonBase>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.75,
              minWidth: 180,
              borderRadius: 2,
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 6px 20px rgba(15,23,42,0.12)",
            },
          },

          list: { dense: true, sx: { py: 0.5 } }
        }}>
        <MenuItem
          selected={mode === "enable"}
          onClick={() => handleSelect("enable")}
          sx={{
            borderRadius: 1,
            mx: 0.5,
            px: 1.25,
            py: 0.75,
            "&.Mui-selected": {
              bgcolor: `${tintColor}14`,
              color: tintColor,
              fontWeight: 700,
              "&:hover": { bgcolor: `${tintColor}1f` },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: mode === "enable" ? 700 : 600 }}
            >
              Enable
            </Typography>
            {mode === "enable" ? (
              <CheckIcon sx={{ fontSize: 16, color: tintColor }} />
            ) : null}
          </Box>
        </MenuItem>

        <Divider sx={{ my: 0.5, mx: 1 }} />

        <MenuItem
          selected={mode === "learn"}
          onClick={() => handleSelect("learn")}
          sx={{
            borderRadius: 1,
            mx: 0.5,
            px: 1.25,
            py: 0.75,
            alignItems: "flex-start",
            "&.Mui-selected": {
              bgcolor: `${tintColor}14`,
              color: tintColor,
              fontWeight: 700,
              "&:hover": { bgcolor: `${tintColor}1f` },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 1.5,
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: mode === "learn" ? 700 : 500 }}
              >
                Learn
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: mode === "learn" ? tintColor : "text.secondary",
                  opacity: 0.75,
                  lineHeight: 1.2,
                }}
              >
                show context
              </Typography>
            </Box>
            {mode === "learn" ? (
              <CheckIcon sx={{ fontSize: 16, color: tintColor, mt: 0.25 }} />
            ) : null}
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}
