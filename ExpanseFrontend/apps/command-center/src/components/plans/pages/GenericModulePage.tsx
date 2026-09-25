import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { SectionList, RelatedLinks } from '../content';
import { ModulePage } from './ModulePage';
import type { PlanModule } from '../../../types/plans';

interface GenericModulePageProps {
  module: PlanModule;
}

export function GenericModulePage({ module }: GenericModulePageProps) {
  const theme = useTheme();
  const sections = module.sections || [];
  const showTOC = sections.length >= 3;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <ModulePage module={module}>
          <SectionList sections={module.sections} />
          {module.relatedDocuments && (
            <RelatedLinks documents={module.relatedDocuments} />
          )}
        </ModulePage>
      </Box>

      {/* Sticky Table of Contents */}
      {showTOC && (
        <Box
          sx={{
            width: 220,
            flexShrink: 0,
            display: { xs: 'none', xl: 'block' },
            position: 'sticky',
            top: 120,
            alignSelf: 'flex-start',
            maxHeight: 'calc(100vh - 160px)',
            overflowY: 'auto',
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              mb: 1.5,
              display: 'block',
            }}
          >
            On This Page
          </Typography>
          <List dense disablePadding>
            {sections.map((section) => (
              <ListItemButton
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                sx={{
                  py: 0.75,
                  px: 1.5,
                  borderRadius: 1,
                  mb: 0.5,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    '& .MuiListItemText-primary': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemText
                  primary={section.title}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontSize: '0.8125rem',
                    lineHeight: 1.4,
                    sx: {
                      transition: 'color 0.15s ease',
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
