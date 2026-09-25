import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { RelatedDocument } from '../../../types/plans';
import { PLANS_BASE_PATH } from '../../../constants';

interface RelatedLinksProps {
  documents: RelatedDocument[];
  title?: string;
}

/**
 * Resolves relative module paths to full paths
 * Data files use portable paths like '/modules/generation/overview'
 * This converts them to '/docs/plans/modules/generation/overview'
 */
function resolvePath(path: string): string {
  // Already absolute with base path
  if (path.startsWith(PLANS_BASE_PATH)) {
    return path;
  }
  // Relative module path - prepend base
  if (path.startsWith('/modules/') || path.startsWith('/')) {
    return `${PLANS_BASE_PATH}${path}`;
  }
  // Fully relative path
  return path;
}

export function RelatedLinks({ documents, title = 'Related Documents' }: RelatedLinksProps) {
  if (documents.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List dense>
        {documents.map((doc) => (
          <ListItem key={doc.id} disablePadding>
            <ListItemButton component={RouterLink} to={resolvePath(doc.path)}>
              <ListItemText
                primary={doc.title}
                secondary={doc.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
