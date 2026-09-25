import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e3f2fd',
    primaryTextColor: '#1976d2',
    primaryBorderColor: '#1976d2',
    lineColor: '#1976d2',
    secondaryColor: '#f3e5f5',
    tertiaryColor: '#fff3e0',
    background: '#ffffff',
    mainBkg: '#e3f2fd',
    secondBkg: '#ffffff',
    nodeBorder: '#1976d2',
    clusterBkg: '#e8f5e9',
    titleColor: '#1976d2',
    actorBorder: '#1976d2',
    actorBkg: '#e3f2fd',
    actorTextColor: '#333',
    actorLineColor: '#1976d2',
    signalColor: '#1976d2',
    signalTextColor: '#333',
    labelBoxBkgColor: '#e3f2fd',
    labelBoxBorderColor: '#1976d2',
    labelTextColor: '#333',
    loopTextColor: '#333',
    noteBorderColor: '#9c27b0',
    noteBkgColor: '#f3e5f5',
    noteTextColor: '#333',
    activationBorderColor: '#1976d2',
    activationBkgColor: '#e3f2fd',
    sequenceNumberColor: '#333',
    edgeLabelBackground: '#ffffff',
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
  },
  sequence: {
    useMaxWidth: true,
    actorMargin: 80,
    messageMargin: 40,
  },
});

interface MermaidDiagramProps {
  chart: string;
  title?: string;
  description?: string;
}

export default function MermaidDiagram({ chart, title, description }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return;
      
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
        setError(null);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderChart();
  }, [chart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chart);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen?.();
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        mb: 3, 
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {title && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="h3" sx={{ color: 'primary.main' }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
          <Box>
            <Tooltip title="Copy Mermaid code">
              <IconButton size="small" onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Fullscreen">
              <IconButton size="small" onClick={handleFullscreen}>
                <FullscreenIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
      
      <Box 
        ref={containerRef}
        sx={{ 
          width: '100%', 
          overflow: 'auto',
          '& svg': {
            maxWidth: '100%',
            height: 'auto',
          },
        }}
      >
        {error ? (
          <Typography color="error" sx={{ p: 2 }}>
            Error: {error}
          </Typography>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        )}
      </Box>
    </Paper>
  );
}
