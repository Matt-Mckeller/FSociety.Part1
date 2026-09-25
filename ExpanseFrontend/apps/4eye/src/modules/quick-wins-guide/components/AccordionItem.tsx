"use client"

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export interface AccordionItemProps {
  title: string
  detail: string
  defaultExpanded?: boolean
}

export function AccordionItem({
  title,
  detail,
  defaultExpanded = false,
}: AccordionItemProps) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        bgcolor: "#e3f2fd",
        borderLeft: "4px solid #4285f4",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          ✓ {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" sx={{ color: "#555" }}>
          {detail}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
