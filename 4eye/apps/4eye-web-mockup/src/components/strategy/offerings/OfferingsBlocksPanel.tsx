"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { useRef } from "react";
import gsap from "gsap";
import {
  filterOfferingBlocks,
  type OfferingGoalKey,
} from "./offerings-blocks";
import { useGsap } from "@4eye/web/hooks/animation";

export function OfferingsBlocksPanel({ active }: { active: OfferingGoalKey }) {
  const ref = useRef<HTMLDivElement>(null);
  const blocks = filterOfferingBlocks(active);

  useGsap(
    ref,
    () => {
      gsap.from(".off-block", {
        y: 16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    [active],
  );

  return (
    <Box
      ref={ref}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: 2.5,
      }}
    >
      {blocks.map((b) => (
        <Paper
          key={b.heading}
          className="off-block"
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: "0.18em" }}
          >
            {b.heading}
          </Typography>
          <List dense disablePadding sx={{ mt: 1 }}>
            {b.bullets.map((line) => (
              <ListItem key={line} disableGutters sx={{ py: 0.25 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <CheckCircleOutlineIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={line}
                  sx={{ "& .MuiListItemText-primary": { fontWeight: 500 } }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
}
