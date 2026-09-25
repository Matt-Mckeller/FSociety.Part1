import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { MermaidDiagram } from './MermaidDiagram';

interface CollapsibleMermaidProps {
  title: string;
  diagram: string;
  defaultExpanded?: boolean;
  caption?: string;
}

export function CollapsibleMermaid({
  title,
  diagram,
  defaultExpanded = false,
  caption,
}: CollapsibleMermaidProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      disableGutters
      sx={{
        mb: 1,
        '&:before': { display: 'none' },
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '& .MuiAccordionSummary-content': {
            alignItems: 'center',
            gap: 1,
          },
        }}
      >
        <AccountTreeIcon sx={{ fontSize: 20, color: 'secondary.main' }} />
        <Typography variant="subtitle2">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <MermaidDiagram diagram={diagram} caption={caption} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
