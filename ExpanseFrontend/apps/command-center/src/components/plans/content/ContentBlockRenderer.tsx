import { Box, Typography, Paper, alpha, useTheme } from '@mui/material';
import type { ContentBlock, ListBlock } from '../../../types/plans';
import { DataTable } from './DataTable';
import { MermaidDiagram } from './MermaidDiagram';
import { TaskList } from './TaskList';

// Consistent spacing unit for content blocks (20px = 2.5 * 8px)
const BLOCK_SPACING = 2.5;

interface ContentBlockRendererProps {
  block: ContentBlock;
}

function renderListItems(items: (string | ListBlock)[], ordered: boolean = false): React.ReactNode {
  const ListComponent = ordered ? 'ol' : 'ul';
  
  return (
    <Box 
      component={ListComponent} 
      sx={{ 
        pl: 3, 
        my: BLOCK_SPACING * 0.6,
        '& li': {
          mb: 1.25,
          lineHeight: 1.7,
          fontSize: '0.9375rem',
          '&::marker': {
            color: 'primary.main',
          },
        },
      }}
    >
      {items.map((item, index) => {
        if (typeof item === 'string') {
          return <li key={index}>{item}</li>;
        }
        // Nested list
        return (
          <li key={index}>
            {renderListItems(item.items, item.ordered)}
          </li>
        );
      })}
    </Box>
  );
}

export function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  const theme = useTheme();
  
  switch (block.type) {
    case 'text':
      return (
        <Typography sx={{ 
          whiteSpace: 'pre-wrap', 
          mb: BLOCK_SPACING, 
          lineHeight: 1.75, 
          fontSize: '0.9375rem',
          color: 'text.secondary' 
        }}>
          {block.value}
        </Typography>
      );

    case 'heading': {
      const variant = `h${block.level}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      return (
        <Typography 
          variant={variant} 
          gutterBottom 
          sx={{ 
            mt: BLOCK_SPACING * 1.5, 
            mb: BLOCK_SPACING * 0.6, 
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          {block.text}
        </Typography>
      );
    }

    case 'list':
      return renderListItems(block.items, block.ordered);

    case 'table':
      return <DataTable headers={block.headers} rows={block.rows} />;

    case 'mermaid':
      return <MermaidDiagram diagram={block.diagram} caption={block.caption} />;

    case 'tasks':
      return <TaskList tasks={block.items} />;

    case 'code':
      return (
        <Paper 
          sx={{ 
            p: 3, 
            my: BLOCK_SPACING, 
            bgcolor: '#0d1117',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            borderRadius: 2.5,
            overflow: 'auto',
          }}
        >
          <Box
            component="pre"
            sx={{
              m: 0,
              fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
              fontSize: '0.8125rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: '#e6edf3',
              lineHeight: 1.6,
            }}
          >
            <code>{block.code}</code>
          </Box>
        </Paper>
      );

    case 'quote':
      return (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            my: BLOCK_SPACING,
            borderLeft: 4,
            borderColor: 'primary.main',
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            borderRadius: '0 12px 12px 0',
          }}
        >
          <Typography variant="body1" sx={{ 
            fontStyle: 'italic', 
            lineHeight: 1.75, 
            fontSize: '1.0625rem',
            color: 'text.secondary' 
          }}>
            {block.value}
          </Typography>
        </Paper>
      );

    default:
      return null;
  }
}

interface ContentBlockListProps {
  blocks: ContentBlock[];
}

export function ContentBlockList({ blocks }: ContentBlockListProps) {
  return (
    <Box>
      {blocks.map((block, index) => (
        <ContentBlockRenderer key={index} block={block} />
      ))}
    </Box>
  );
}
