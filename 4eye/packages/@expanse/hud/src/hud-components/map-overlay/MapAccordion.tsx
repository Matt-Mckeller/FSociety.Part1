"use client";

/**
 * MapAccordion — single accordion row for the right-column context panel.
 *
 * Layout: [icon] [title + blurb] [count chip] | expand caret
 *
 * Replaces the duplicated accordion summary blocks previously inlined
 * twice in `MapContextPanel` (once for Goals, once mapped over the
 * Features / Problems headers).
 */

import type { ReactNode } from "react";
import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const accordionSx = {
  bgcolor: "transparent" as const,
  borderTop: "1px solid",
  borderColor: "divider",
  "&:last-of-type": {
    borderBottom: "1px solid",
    borderBottomColor: "divider",
  },
  "&::before": { display: "none" },
};

interface MapAccordionProps {
  /** Left-side header icon. */
  icon: ComponentType<SvgIconProps>;
  /** Bold header title. */
  title: string;
  /** Caption under the title. */
  blurb?: string;
  /**
   * Count badge. When a number, renders the count plain. When a string,
   * renders the string verbatim. When undefined, the chip is suppressed.
   */
  count?: number | string;
  /**
   * Optional bg color for the count chip. Used to highlight a non-zero
   * selection (e.g. "1 goal picked").
   */
  countAccentColor?: string;
  /** Whether this accordion is currently expanded. */
  expanded: boolean;
  /** Called when the user toggles open/close. */
  onChange: (expanded: boolean) => void;
  children: ReactNode;
}

export function MapAccordion({
  icon: Icon,
  title,
  blurb,
  count,
  countAccentColor,
  expanded,
  onChange,
  children,
}: MapAccordionProps) {
  return (
    <Accordion
      expanded={expanded}
      onChange={(_e, nextOpen) => onChange(nextOpen)}
      disableGutters
      elevation={0}
      sx={accordionSx}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreRoundedIcon sx={{ color: "text.secondary" }} />
        }
        sx={{
          px: 0,
          "& .MuiAccordionSummary-content": { gap: 1.25 },
        }}
      >
        <Icon
          fontSize="small"
          sx={{ color: "text.secondary" }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {blurb && (
            <Typography
              variant="caption"
              sx={{ color: "text.secondary" }}
            >
              {blurb}
            </Typography>
          )}
        </Box>
        {count !== undefined && (
          <Chip
            size="small"
            label={count}
            sx={{
              bgcolor: countAccentColor ?? "action.selected",
              color: countAccentColor ? "#fff" : "text.secondary",
              height: 20,
              "& .MuiChip-label": { px: 1, fontSize: "0.7rem" },
            }}
          />
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, pt: 0.5 }}>{children}</AccordionDetails>
    </Accordion>
  );
}

export default MapAccordion;
