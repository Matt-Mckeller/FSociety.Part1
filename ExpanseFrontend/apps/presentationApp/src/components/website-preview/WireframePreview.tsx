'use client';

import { Box, Typography, Paper } from '@mui/material';
import { useWireframe, WireframeSection } from './WireframeProvider';

// ============================================================================
// Height Map
// ============================================================================

const heightMap: Record<string, number> = {
  small: 40,
  medium: 80,
  large: 120,
  xlarge: 180,
};

// ============================================================================
// Section Block Component
// ============================================================================

function SectionBlock({ section }: { section: WireframeSection }) {
  const height = heightMap[section.height];
  
  return (
    <Box
      sx={{
        height,
        bgcolor: section.color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        opacity: section.enabled ? 1 : 0.3,
        transition: 'all 0.2s ease',
        px: 2,
      }}
    >
      <Typography 
        variant="caption" 
        sx={{ 
          color: 'white', 
          fontWeight: 600,
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}
      >
        {section.name}
      </Typography>
      {section.content && (
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '0.6rem',
            textAlign: 'center',
            mt: 0.5,
          }}
        >
          {section.content}
        </Typography>
      )}
    </Box>
  );
}

// ============================================================================
// Main Wireframe Preview Component
// ============================================================================

export function WireframePreview() {
  const { sections, config } = useWireframe();
  const enabledSections = sections.filter(s => s.enabled);
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        overflow: 'hidden',
        border: '2px solid #e2e8f0',
        borderRadius: 2,
        bgcolor: '#f8fafc',
      }}
    >
      {/* Browser Chrome */}
      <Box 
        sx={{ 
          height: 32,
          bgcolor: '#f1f5f9',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          px: 1.5,
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
        </Box>
        <Box 
          sx={{ 
            flex: 1, 
            height: 20, 
            bgcolor: 'white', 
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            px: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
            yoursite.com/{config.pageName.toLowerCase()}
          </Typography>
        </Box>
      </Box>

      {/* Page Content */}
      <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
        {enabledSections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </Box>
    </Paper>
  );
}
