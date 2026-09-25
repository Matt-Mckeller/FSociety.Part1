import { useEffect, useRef, useState } from 'react';
import { Box, Paper, IconButton, Tooltip, Typography } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  diagram: string;
  caption?: string;
}

// Initialize mermaid with dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
  },
  themeVariables: {
    primaryColor: '#1e3a5f',
    primaryTextColor: '#fff',
    primaryBorderColor: '#90caf9',
    lineColor: '#90caf9',
    secondaryColor: '#0d2137',
    tertiaryColor: '#1e3a5f',
  },
});

let diagramId = 0;

export function MermaidDiagram({ diagram, caption }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [id] = useState(() => `mermaid-${++diagramId}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;
      
      try {
        containerRef.current.innerHTML = '';
        const { svg } = await mermaid.render(id, diagram);
        containerRef.current.innerHTML = svg;
        setError(null);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderDiagram();
  }, [diagram, id]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  if (error) {
    return (
      <Paper sx={{ p: 2, bgcolor: 'error.dark' }}>
        <Typography color="error">Diagram Error: {error}</Typography>
        <Box component="pre" sx={{ mt: 1, fontSize: '0.75rem', overflow: 'auto' }}>
          {diagram}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, my: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 1 }}>
        <Tooltip title="Zoom Out">
          <IconButton size="small" onClick={handleZoomOut}>
            <ZoomOutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset Zoom">
          <IconButton size="small" onClick={handleResetZoom}>
            <FullscreenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom In">
          <IconButton size="small" onClick={handleZoomIn}>
            <ZoomInIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: '600px',
          '& svg': {
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            transition: 'transform 0.2s ease',
          },
        }}
      >
        <div ref={containerRef} />
      </Box>
      {caption && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
          {caption}
        </Typography>
      )}
    </Paper>
  );
}
