'use client';

import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  Switch, 
  FormControlLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useWireframe } from './WireframeProvider';

// ============================================================================
// Section Control Row
// ============================================================================

function SectionControl({ 
  section, 
  index, 
  isFirst, 
  isLast,
}: { 
  section: { id: string; name: string; enabled: boolean; color: string };
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { toggleSection, reorderSections } = useWireframe();
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        py: 0.5,
        px: 1,
        borderRadius: 1,
        '&:hover': { bgcolor: '#f8fafc' },
      }}
    >
      {/* Color indicator */}
      <Box 
        sx={{ 
          width: 12, 
          height: 12, 
          borderRadius: 0.5, 
          bgcolor: section.color,
          opacity: section.enabled ? 1 : 0.3,
        }} 
      />
      
      {/* Section name */}
      <Typography 
        variant="body2" 
        sx={{ 
          flex: 1,
          color: section.enabled ? 'text.primary' : 'text.disabled',
        }}
      >
        {section.name}
      </Typography>
      
      {/* Reorder buttons */}
      <Box sx={{ display: 'flex' }}>
        <Tooltip title="Move up">
          <span>
            <IconButton 
              size="small" 
              disabled={isFirst}
              onClick={() => reorderSections(index, index - 1)}
              sx={{ p: 0.25 }}
            >
              <ArrowUpwardIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Move down">
          <span>
            <IconButton 
              size="small" 
              disabled={isLast}
              onClick={() => reorderSections(index, index + 1)}
              sx={{ p: 0.25 }}
            >
              <ArrowDownwardIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      
      {/* Toggle */}
      <Switch 
        size="small"
        checked={section.enabled}
        onChange={() => toggleSection(section.id)}
      />
    </Box>
  );
}

// ============================================================================
// Main Control Panel Component
// ============================================================================

export function WireframeControlPanel() {
  const { sections, config } = useWireframe();
  const enabledCount = sections.filter(s => s.enabled).length;
  
  return (
    <Paper 
      variant="outlined"
      sx={{ 
        p: 2,
        bgcolor: '#fafafa',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          {config.pageName} Sections
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {enabledCount}/{sections.length} enabled
        </Typography>
      </Box>
      
      <Stack spacing={0}>
        {sections.map((section, index) => (
          <SectionControl 
            key={section.id}
            section={section}
            index={index}
            isFirst={index === 0}
            isLast={index === sections.length - 1}
          />
        ))}
      </Stack>
    </Paper>
  );
}
