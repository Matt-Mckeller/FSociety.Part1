import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  alpha,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Section as SectionType } from '../../../types/plans';
import { ContentBlockRenderer } from './ContentBlockRenderer';

interface SectionProps {
  section: SectionType;
  level?: number;
}

export function Section({ section, level = 0 }: SectionProps) {
  const [expanded, setExpanded] = useState(!section.collapsed);
  const theme = useTheme();

  // Typography hierarchy: level 0 = h5, level 1 = subtitle1, level 2+ = body1
  const headingVariant = level === 0 ? 'h5' : level === 1 ? 'subtitle1' : 'body1';
  const headingWeight = level === 0 ? 700 : 600;

  return (
    <Accordion
      id={`section-${section.id}`}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      disableGutters
      sx={{
        mb: 2,
        ml: level * 2.5,
        '&:before': { display: 'none' },
        boxShadow: 'none',
        border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
        borderRadius: '12px !important',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.3),
          bgcolor: alpha(theme.palette.primary.main, 0.02),
          boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.08)}`,
        },
        '&.Mui-expanded': {
          borderColor: alpha(theme.palette.primary.main, 0.25),
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      }}
    >
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
        sx={{
          bgcolor: alpha(theme.palette.background.default, 0.5),
          minHeight: level === 0 ? 60 : 52,
          '&.Mui-expanded': {
            bgcolor: alpha(theme.palette.primary.main, 0.04),
          },
          '& .MuiAccordionSummary-content': {
            my: level === 0 ? 1.75 : 1.5,
          },
        }}
      >
        <Typography 
          variant={headingVariant} 
          sx={{ 
            fontWeight: headingWeight,
            letterSpacing: level === 0 ? '-0.01em' : 0,
            color: expanded ? 'primary.main' : 'text.primary',
            transition: 'color 0.2s ease',
          }}
        >
          {section.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 3.5, bgcolor: 'background.paper' }}>
        <Box>
          {section.content.map((block, index) => (
            <ContentBlockRenderer key={index} block={block} />
          ))}
          {section.subsections?.map((subsection) => (
            <Section key={subsection.id} section={subsection} level={level + 1} />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

interface SectionListProps {
  sections: SectionType[];
}

export function SectionList({ sections }: SectionListProps) {
  return (
    <Box>
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </Box>
  );
}
