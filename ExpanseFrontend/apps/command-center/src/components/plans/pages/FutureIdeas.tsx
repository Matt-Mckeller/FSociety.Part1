import { Box, Typography } from '@mui/material';
import { SectionList, RelatedLinks } from '../content';
import { futureIdeas } from '../../../data/plans';

export function FutureIdeas() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {futureIdeas.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {futureIdeas.description}
      </Typography>

      <SectionList sections={futureIdeas.sections} />

      {futureIdeas.relatedDocuments && (
        <RelatedLinks documents={futureIdeas.relatedDocuments} />
      )}
    </Box>
  );
}
