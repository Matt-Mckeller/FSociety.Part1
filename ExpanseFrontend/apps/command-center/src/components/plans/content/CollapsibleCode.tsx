import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';

interface CollapsibleCodeProps {
  title: string;
  code: string;
  language?: string;
  defaultExpanded?: boolean;
  description?: string;
}

export function CollapsibleCode({
  title,
  code,
  language = 'typescript',
  defaultExpanded = false,
  description,
}: CollapsibleCodeProps) {
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
        <CodeIcon sx={{ fontSize: 20, color: 'primary.main' }} />
        <Typography variant="subtitle2">{title}</Typography>
        <Chip
          label={language}
          size="small"
          sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
        />
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {description && (
          <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        )}
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            overflow: 'auto',
            maxHeight: '500px',
            bgcolor: '#0d1117',
            fontSize: '0.8rem',
            lineHeight: 1.5,
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            '& code': {
              color: '#e6edf3',
            },
          }}
        >
          <code>{code}</code>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
